# The Ultimate Solana Security Checklist: Keep Your Smart Contracts Safe

Solana's blazing speed and low transaction fees have fueled incredible growth in its DeFi and NFT ecosystems. But with great power comes great responsibility, especially when it comes to security. A single vulnerability in your Solana program can lead to devastating exploits and loss of user funds.

This post provides a comprehensive checklist covering common security pitfalls in Solana development, focusing on areas like account validation, CPI handling, arithmetic safety, and more. Whether you're a seasoned Solana dev or just starting, use this guide to audit your code and build more secure applications.

## Account Validations: The First Line of Defense

Properly validating accounts is fundamental to Solana program security. Failing to do so can open doors for attackers.

### Signer Checks

Ensure that accounts expected to sign a transaction actually have signed it.

- **Vulnerability:** Missing signer check.

```rust
// ❌ Bad: No check if 'account' signed the transaction
let account = ctx.accounts.account;

// ✅ Good - Native: Explicitly require the account to be a signer
require!(account.is_signer, ErrorCode::MissingSigner);

// ✅ Good - Anchor: Use constraints to enforce signer status
#[account(
    constraint = account.is_signer @ ErrorCode::MissingSigner
)]
pub account: Account<AccountType>,

// ✅ Good - Anchor: Use the Signer type for automatic validation
 pub creator: Signer<'info>,
```

- **Impact:** Without signer validation, any account can be passed off as the signer, allowing unauthorized actions.
- **Reference:** [Neodyme: Missing Signer Check](https://neodyme.io/en/blog/solana_common_pitfalls/#missing-signer-check)

### Writer Checks

Verify that accounts intended for modification are actually mutable.

- **Vulnerability:** Missing writer check.

```rust
// ❌ Bad: No check if 'account' is writable
let account = ctx.accounts.account;

// ✅ Good - Native: Explicitly require the account to be writable
require!(account.is_writable, ErrorCode::AccountNotWritable);

// ✅ Good - Anchor: Use 'mut' and constraints for writability
#[account(
    mut,
    constraint = account.is_writable @ ErrorCode::AccountNotWritable
)]
pub account: Account<AccountType>,

// ✅ Good - Anchor: Use 'mut' on AccountInfo for basic writability expectation
#[account(mut)]
pub creator: AccountInfo<'info>, // Note: This checks transaction-level mutability, not ownership/data modification rights.
```

- **Impact:** Attempting to write to a non-writable account will cause the transaction to fail. Explicit checks prevent unexpected failures.

### Owner Checks

Confirm that accounts being accessed are owned by the expected program (usually your own program or the system program).

- **Vulnerability:** Missing owner check.

```rust
// ❌ Bad: No check on the owner of 'account'
let account = ctx.accounts.account;

// ✅ Good - Native: Require the account owner to be the current program_id
require!(account.owner == program_id, ErrorCode::InvalidOwner);

// ✅ Good - Anchor (Explicit): Use constraints for owner validation
#[account(
    constraint = account.owner == program_id @ ErrorCode::InvalidOwner
)]
pub account: Account<AccountType>,

// ✅ Good - Anchor (Implicit): Anchor types often handle owner checks automatically
// For PDAs derived by your program or accounts owned by your program:
pub pool: Account<'info, Pool>, // Validates owner is the current program ID

// For system-owned accounts like token programs:
pub token_2022_program: Program<'info, Token2022>, // Validates owner is the Token 2022 program ID
```

- **Impact:** Without owner validation, malicious accounts owned by different programs could be supplied, leading to unauthorized state changes or data access.
- **Reference:** [Neodyme: Missing Ownership Check](https://neodyme.io/en/blog/solana_common_pitfalls/#missing-ownership-check)

### PDA Validation

Ensure that Program Derived Addresses (PDAs) match their expected derivation seeds and bump.

- **Vulnerability:** Missing PDA validation.

```rust
// ❌ Bad: Using a PDA without verifying its address
let pda = ctx.accounts.pda;

// ✅ Good - Native: Derive the expected PDA and compare keys
let (expected_pda, _bump) = Pubkey::find_program_address(
    &[b"prefix", other_seed],
    program_id
);
require!(pda.key() == expected_pda, ErrorCode::InvalidPDA);

// ✅ Good - Anchor: Use seeds and bump attributes for automatic validation
#[account(
    seeds = [b"prefix", other_seed],
    bump,
    // Optionally add an explicit constraint for belt-and-suspenders validation
    // constraint = pda.key() == Pubkey::find_program_address(&[b"prefix", other_seed], program_id).0 @ ErrorCode::InvalidPDA
)]
pub pda: Account<PdaAccount>,
```

- **Impact:** Supplying an incorrect PDA could grant access to or allow modification of the wrong program-controlled data.

## Account Data Reallocation Pitfalls

Reallocating account data requires careful memory management.

- **Vulnerability:** Unsafe reallocation without proper memory management (e.g., not zero-initializing new space).

```rust
// ❌ Bad: Directly reallocating without handling potential existing data or zeroing
account.realloc(new_size, false)?;

// ❌ Bad: Reallocating potentially larger space without zero-initializing the new portion
let current_data_size = account.data.borrow().len();
if current_data_size < new_size {
    account.realloc(new_size, false)?; // New memory region is uninitialized
}

// ✅ Good: Safely reallocating and zero-initializing the expanded memory region
let current_data_size = account.data.borrow().len();
account.realloc(new_size, false)?; // Allow realloc even if shrinking (though 'false' means don't zero)
if current_data_size < new_size {
    // Zero-initialize only the *new* part of the buffer
    let data = &mut account.data.borrow_mut();
    for i in current_data_size..new_size {
        data[i] = 0;
    }
}
```

- **Impact:** Improper memory handling during reallocation can lead to data corruption, use of uninitialized memory, or leaking sensitive data from previous memory usage.

- **Vulnerability:** Not handling memory allocation failures.

```rust
// ❌ Bad: Ignoring potential errors from realloc
account.realloc(new_size, false);

// ✅ Good: Handling potential reallocation errors
account.realloc(new_size, false)
    .map_err(|_| ProgramError::AccountDataTooSmall)?; // Or a more specific error
```

- **Impact:** Ignoring allocation failures can cause unexpected program termination or leave the program in an inconsistent state.

## Lamports Transfer Out of PDA

Transferring SOL out of PDAs requires specific checks.

- **Vulnerability:** Missing rent-exempt check after transfer.

```rust
// ❌ Bad: Decreasing lamports without checking rent exemption
let pda = ctx.accounts.pda;
**pda.try_borrow_mut_lamports()? -= amount; // Might fall below rent minimum

// ✅ Good: Check if remaining balance meets rent exemption
let pda = &ctx.accounts.pda;
let rent = Rent::get()?;
let min_rent = rent.minimum_balance(pda.data_len());
let current_lamports = pda.lamports();

require!(
    current_lamports.checked_sub(amount).ok_or(ErrorCode::CalculationFailure)? >= min_rent,
    ErrorCode::InsufficientFundsForRent
);

**pda.try_borrow_mut_lamports()? -= amount;
**recipient.try_borrow_mut_lamports()? += amount; // Don't forget the recipient!
```

- **Impact:** If a PDA's balance falls below the rent-exempt minimum, the Solana runtime will garbage collect it, leading to data loss.

- **Vulnerability:** Using signer seeds for PDA SOL transfers (incorrect method).

```rust
// ❌ Bad: Attempting system_program::transfer from a PDA using seeds - this won't work
let pda = &ctx.accounts.pda;
let seeds = &[b"prefix", other_seed];
let signer_seeds = &[&seeds[..]]; // Missing the bump!
system_program::transfer(
    CpiContext::new_with_signer(
        ctx.accounts.system_program.to_account_info(),
        system_program::Transfer {
            from: pda.to_account_info(),
            to: recipient.to_account_info(),
        },
        signer_seeds,
    ),
    amount,
)?;

// ✅ Good - Native: Directly modify lamports (requires account mutability)
let pda = &ctx.accounts.pda;
**pda.try_borrow_mut_lamports()? -= amount;
**recipient.try_borrow_mut_lamports()? += amount;
```

- **Impact:** Only the System Program can directly debit SOL from accounts. Programs must modify the `lamports` field directly for PDAs they own. Trying to use `system_program::transfer` with PDA seeds will fail.
- **Reference:** [Solana Cookbook: Transferring SOL](https://solanacookbook.com/references/programs.html#how-to-transfer-sol-in-a-program)

## CPI (Cross-Program Invocation) Issues

Interacting with other programs requires careful handling of accounts and seeds.

- **Vulnerability:** Incorrect order of accounts in CPI calls.

```rust
// ❌ Bad: Account order doesn't match the callee program's expectation
let accounts_vector = vec![
    ctx.accounts.account2.to_account_info(), // Wrong order
    ctx.accounts.account1.to_account_info(),
];
// This approach is generally discouraged; prefer strongly-typed CPI structs

// ✅ Good: Using generated CPI structs ensures correct ordering and types
other_program::cpi::some_instruction(
    CpiContext::new(
        ctx.accounts.other_program.to_account_info(),
        // This struct enforces the correct fields and types
        other_program::cpi::accounts::SomeInstruction {
            account1: ctx.accounts.account1.to_account_info(),
            account2: ctx.accounts.account2.to_account_info(),
        },
    ),
    // instruction arguments...
)?;
```

- **Impact:** Incorrect account ordering usually leads to transaction failures as the callee program receives unexpected accounts.

- **Vulnerability:** Missing bump seed in CPI signer seeds.

```rust
// ❌ Bad: Forgetting the bump seed when creating signer seeds for a PDA
let seeds = &[b"prefix", other_seed];
let signer_seeds = &[&seeds[..]]; // Missing the bump!

// Invoke CPI with signer_seeds... (This will fail signature verification)

// ✅ Good: Including the bump seed
let seeds = &[b"prefix", other_seed];
let bump = ctx.accounts.pda.bump; // Assuming bump is stored or passed
let signer_seeds = &[&seeds[..], &[bump]];

// Invoke CPI with correct signer_seeds...
```

- **Impact:** PDA signature verification will fail if the bump seed isn't included, causing the CPI call to revert.

- **Vulnerability:** Incorrect or missing seeds in CPI signer seeds.

```rust
// ❌ Bad - Missing a required seed:
let seeds = &[b"prefix"]; // Missing 'other_seed'
let signer_seeds = &[&seeds[..], &[bump]];

// ❌ Bad - Incorrect seed order:
let seeds = &[other_seed, b"prefix"]; // Wrong order
let signer_seeds = &[&seeds[..], &[bump]];

// ✅ Good - Correct seeds in the correct order:
let seeds = &[b"prefix", other_seed];
let bump = ctx.accounts.pda.bump;
let signer_seeds = &[&seeds[..], &[bump]];
```

- **Impact:** Using incorrect or wrongly ordered seeds will cause PDA signature verification to fail.

- **Vulnerability:** Arbitrary CPI (calling untrusted programs).

```rust
// ❌ Bad: Calling a program address provided directly by the user without validation
let arbitrary_program = &ctx.accounts.arbitrary_program; // Could be any program
// Call arbitrary_program...

// ✅ Good - Native: Check the program ID against a known constant
let known_program = &ctx.accounts.known_program;
require!(
    known_program.key() == KNOWN_PROGRAM_ID,
    ErrorCode::InvalidProgramId
);
// Call known_program...

// ✅ Good - Anchor: Use the Program<'info, T> type for automatic ID check
#[account(
    // Anchor automatically checks if known_program.key() == T::id()
    // Optionally add constraint for extra check or custom error
    // constraint = known_program.key() == KNOWN_PROGRAM_ID @ ErrorCode::InvalidProgramId
)]
pub known_program: Program<'info, KnownProgram>, // KnownProgram should implement anchor_lang::Id
```

- **Impact:** Allowing calls to arbitrary programs enables attackers to execute malicious code within the context of your transaction, potentially draining funds or corrupting state.

## Unvalidated System Accounts

Crucial system accounts like Rent, Token Program, etc., must be validated.

- **Vulnerability:** Missing check for the Rent sysvar account.

```rust
// ❌ Bad: Assuming the provided account is the correct Rent sysvar
let rent_account = &ctx.accounts.rent;

// ✅ Good - Native: Check against the known Rent sysvar ID
require!(
    ctx.accounts.rent.key() == sysvar::rent::ID,
    ErrorCode::InvalidRentAccount
);

// ✅ Good - Anchor: Use the Sysvar<'info, Rent> type
#[account(
    // Anchor automatically checks key == Rent::id()
    // constraint = rent.key() == sysvar::rent::ID @ ErrorCode::InvalidRentAccount // Optional explicit check
)]
pub rent: Sysvar<'info, Rent>,
```

- **Impact:** Using a fake Rent account could lead to incorrect rent calculations or bypass rent-exemption logic.

### Token Program Check

- **Vulnerability:** Missing check for the Token Program ID (SPL Token or Token-2022).

```rust
// ❌ Bad: Assuming the provided account is the correct Token Program
let token_program = &ctx.accounts.token_program;

// ✅ Good - Native: Check against the known SPL Token ID
require!(
    ctx.accounts.token_program.key() == spl_token::ID, // Or token_2022::ID
    ErrorCode::InvalidTokenProgram
);

// ✅ Good - Anchor: Use the Program<'info, Token> type (or Token2022)
#[account(
    // Anchor checks key == Token::id()
    // constraint = token_program.key() == spl_token::ID @ ErrorCode::InvalidTokenProgram // Optional
)]
pub token_program: Program<'info, Token>, // Or Program<'info, Token2022>
```

- **Impact:** An attacker could provide a malicious program disguised as the Token Program to execute arbitrary code during token operations.

### Sysvar Account Check

- **Vulnerability:** Missing checks for other Sysvar accounts (Clock, SlotHashes, etc.).

```rust
// List of common Sysvar IDs (example)
// Clock: SysvarC1ock11111111111111111111111111111111
// Rent: SysvarRent111111111111111111111111111111111

// ❌ Bad: Assuming the provided sysvar account is the correct one
let sysvar_account = &ctx.accounts.sysvar;

// ✅ Good - Native: Check against the specific required sysvar ID
require!(
    ctx.accounts.clock_sysvar.key() == sysvar::clock::ID,
    ErrorCode::InvalidSysvarAccount
);

// ✅ Good - Anchor: Use the specific Sysvar type (e.g., Sysvar<'info, Clock>)
pub clock: Sysvar<'info, Clock>, // Anchor validates key == Clock::id()
```

- **Impact:** Using incorrect sysvar accounts leads to invalid data (e.g., wrong timestamp from Clock) affecting program logic.

### Token Account Ownership Check

- **Vulnerability:** Missing check that a token account is actually owned by the Token Program.

```rust
// ❌ Bad: Assuming the account is a valid token account without checking owner
let token_account_info = &ctx.accounts.token_account; // Just an AccountInfo

// ✅ Good - Native: Check the owner field
require!(
    token_account_info.owner == &spl_token::ID, // Or token_2022::ID
    ErrorCode::InvalidTokenAccountOwner
);
// Also need to deserialize and check data, mint, authority etc.

// ✅ Good - Anchor: Use Account<'info, TokenAccount>
#[account(
    // Anchor validates owner == Token::id() and deserializes data
    // Add constraints for mint, authority, etc.
    constraint = token_account.mint == expected_mint.key() @ ErrorCode::InvalidMint,
    constraint = token_account.owner == user.key() @ ErrorCode::InvalidAuthority // Check token account authority if needed
)]
pub token_account: Account<'info, TokenAccount>,

// ✅ Good - Anchor (Token Specific): Use token::authority constraint
#[account(
    token::mint = mint_account,
    token::authority = user_authority, // Validates token_account.owner == user_authority.key()
)]
pub token_account: Account<'info, TokenAccount>,
```

- **Impact:** Without validating token account ownership by the SPL Token program, an attacker could provide a fake account, potentially leading to token theft or bypassing checks.

### Remaining Accounts Validation

- **Vulnerability:** Not validating accounts passed in the `remaining_accounts` slice.

```rust
// ❌ Bad: Accessing remaining_accounts without any validation
fn process_instruction(ctx: Context<Instruction>) -> Result<()> {
    for account in ctx.remaining_accounts {
        // Using 'account' without checking owner, type, etc.
    }
    Ok(())
}

// ✅ Good: Iterating and validating each remaining account based on expected properties
fn process_instruction(ctx: Context<Instruction>) -> Result<()> {
    for account in ctx.remaining_accounts {
        // Example: Check owner is token program or self
        require!(
            account.owner == &spl_token::ID || account.owner == ctx.program_id,
            ErrorCode::InvalidRemainingAccountOwner
        );
        // Add checks for writability, signer status, expected keys, data type, etc.
        // based on the instruction's specific needs.
    }
    Ok(())
}
```

- **Impact:** Attackers can pass malicious or unexpected accounts via `remaining_accounts`. Failure to validate them can lead to unauthorized access, fund manipulation, or state corruption. Always treat `remaining_accounts` as untrusted input.

## Account Reloading Issues

- **Vulnerability:** Not refreshing account data after it might have been modified by a CPI call within the same transaction.

```rust
// ❌ Bad: Using stale account data after a CPI potentially modified it
fn process_transfer(ctx: Context<TransferCtx>, amount: u64) -> Result<()> {
    // CPI call that transfers tokens FROM source_token
    token::transfer(
        CpiContext::new(...), // Details omitted
        amount,
    )?;

    // PROBLEM: ctx.accounts.source_token still holds data loaded at TX start.
    // Its 'amount' field is now outdated.
    let balance_after_transfer = ctx.accounts.source_token.amount; // Incorrect!
    // Logic based on this outdated balance will be flawed.
}

// ✅ Good: Reloading the account data after the CPI call
fn process_transfer(ctx: Context<TransferCtx>, amount: u64) -> Result<()> {
    // CPI call
    token::transfer(
        CpiContext::new(...),
        amount,
    )?;

    // RELOAD the account data from the network
    ctx.accounts.source_token.reload()?;

    // NOW the data is fresh
    let balance_after_transfer = ctx.accounts.source_token.amount; // Correct!
    // Proceed with logic...
}
```

- **Impact:** Solana only loads account data once at the start of a transaction. If a CPI modifies an account, your program's view becomes stale. Using this stale data leads to logic errors, incorrect calculations, and potential bypass of security checks (e.g., balance checks).

## Closing Accounts Securely

Closing accounts and reclaiming rent requires careful validation.

- **Vulnerability:** Missing validation during account closure (e.g., checking authority, owner).

```rust
// ❌ Bad: Closing an account without checking if the signer has authority
// (Native example, assumes direct lamport manipulation which is complex)
fn close_account_unsafe(ctx: Context<CloseCtx>) -> Result<()> {
    let account_to_close = &mut ctx.accounts.account_to_close;
    let destination = &mut ctx.accounts.destination;

    // Problem: No check that ctx.accounts.authority *should* be allowed to close this account.

    // Transfer lamports (simplified, requires care)
    // **destination.lamports += account_to_close.lamports;
    // **account_to_close.lamports = 0;
    // Zero out data...

    Ok(())
}


// ✅ Good - Anchor: Use the `close` constraint for safe closure
#[derive(Accounts)]
pub struct CloseAccountSafe<'info> {
    // The account receiving the rent lamports
    #[account(mut)]
    pub destination: SystemAccount<'info>, // Or specific receiver AccountInfo

    // The account being closed
    #[account(
        mut,
        // Constraint to check data within the account, e.g., an authority field
        constraint = account_data.authority == authority.key() @ ErrorCode::InvalidAuthority,
        // This tells Anchor to transfer lamports to 'destination' and assign owner to SystemProgram
        close = destination
    )]
    pub account_to_close: Account<'info, MyAccountData>,

    // The authority allowed to close the account
    pub authority: Signer<'info>,
}
```

- **Impact:** Improper closure can allow unauthorized users to close accounts, steal rent lamports, or destroy critical program data. Using Anchor's `close` constraint handles the lamport transfer and owner reassignment safely.

- **Vulnerability:** Not checking the receiver of lamports during account closure.

```rust
// ❌ Bad: Anchor close constraint sending lamports to an unvalidated 'destination'
#[derive(Accounts)]
pub struct CloseAccountUnsafeReceiver<'info> {
    // Problem: 'destination' could be any account provided by the caller
    #[account(mut)]
    pub destination: AccountInfo<'info>, // Too generic, could be anyone!

    #[account(mut, close = destination)]
    pub account_to_close: Account<'info, MyAccountData>,
    pub authority: Signer<'info>,
}

// ✅ Good - Anchor: Validate the destination account explicitly
#[derive(Accounts)]
pub struct CloseAccountSafeReceiver<'info> {
    #[account(
        mut,
        // Ensure the destination is the authority closing the account, or a known treasury etc.
        constraint = destination.key() == authority.key() @ ErrorCode::InvalidCloseDestination
    )]
    pub destination: SystemAccount<'info>, // Use SystemAccount or verify key

    #[account(mut, close = destination)]
    pub account_to_close: Account<'info, MyAccountData>,
    pub authority: Signer<'info>,
}
```

- **Impact:** If the destination account isn't validated, attackers can specify their own account to receive the rent lamports from closed accounts, effectively stealing those funds.
- **References:**
    - [Helius: Closing Accounts](https://www.helius.dev/blog/a-hitchhikers-guide-to-solana-program-security#closing-accounts)
    - [Solana Docs: Closing Accounts](https://solana.com/developers/courses/program-security/closing-accounts)

## Denial of Service (DoS) Vectors

Attackers can try to prevent legitimate users from interacting with your program.

### Associated Token Account (ATA) Initialization

- **Vulnerability:** Using `init` instead of `init_if_needed` for ATAs.

```rust
// ❌ Bad: Using 'init' will fail if the ATA already exists
#[account(
    init, // Fails if account exists
    payer = user,
    associated_token::mint = mint,
    associated_token::authority = user,
)]
pub token_account: Account<'info, TokenAccount>,

// ✅ Good: Using 'init_if_needed' is idempotent
#[account(
    init_if_needed, // Creates only if it doesn't exist
    payer = user,
    associated_token::mint = mint,
    associated_token::authority = user,
)]
pub token_account: Account<'info, TokenAccount>,
```

- **Impact:** Attackers can front-run users by creating their ATAs first. Subsequent legitimate transactions using `init` will fail, causing a DoS. `init_if_needed` avoids this.

### Account Pre-creation Attack (PDAs)

- **Vulnerability:** Using `init` for PDAs without handling potential pre-creation by an attacker.

```rust
// ❌ Bad: Vulnerable if attacker front-runs and creates the PDA first
#[account(
    init, // Fails if account exists
    payer = user,
    space = 8 + DataAccount::LEN,
    seeds = [b"data", user.key().as_ref()],
    bump
)]
pub data_account: Account<'info, DataAccount>,

// ✅ Good: Use 'init_if_needed' to handle pre-creation gracefully
#[account(
    init_if_needed, // Creates only if needed
    payer = user,
    space = 8 + DataAccount::LEN,
    seeds = [b"data", user.key().as_ref()],
    bump
)]
pub data_account: Account<'info, DataAccount>,

// ✅ Even Better: Add constraints if needed for existing accounts
#[account(
    init_if_needed,
    payer = user,
    space = 8 + DataAccount::LEN,
    seeds = [b"data", user.key().as_ref()],
    bump,
    // Add checks relevant if the account already existed, e.g., owner
    constraint = data_account.owner == *program_id @ ErrorCode::InvalidOwner // Example check
)]
pub data_account: Account<'info, DataAccount>,

```

- **Impact:** Similar to ATAs, if an attacker can predict PDA addresses, they can pre-create them. Programs using `init` will then fail for legitimate users trying to initialize the same PDA. Use `init_if_needed` and potentially add constraints to validate state if the account already exists.
- **Reference:** [Code4rena Pump.fun Report Example](https://code4rena.com/reports/2025-01-pump-science#h-01-the-lock_pool-operation-can-be-dos)

### Account Existence Check (Donation Attack)

- **Vulnerability:** Using lamport balance to check if an account exists or is initialized.

```rust
// ❌ Bad: Checking lamports > 0 is not a reliable existence check
if token_account_info.lamports() > 0 {
    // Problem: Attacker can send dust SOL to an uninitialized account
}

// ❌ Bad: Checking rent-exemption is also not foolproof
let rent = Rent::get()?;
if token_account_info.lamports() >= rent.minimum_balance(TokenAccount::LEN) {
     // Problem: Still vulnerable to donation attack
}

// ✅ Good: Check owner and if data is deserializable (Anchor does this implicitly)
// Native check:
if !token_account_info.data_is_empty() && token_account_info.owner == &spl_token::ID {
    // Attempt to deserialize
    match TokenAccount::try_deserialize(&mut &token_account_info.data.borrow()[..]) {
        Ok(token_data) => { /* Account is likely initialized */ },
        Err(_) => { /* Deserialization failed */ },
    }
}

// ✅ Good - Anchor: The Account<'info, T> deserializer handles these checks
pub token_account: Account<'info, TokenAccount>, // This automatically checks owner and deserializes
```

- **Impact:** Attackers can send a small amount of SOL (dust) to an uninitialized account address. Checks relying solely on lamport balance will mistakenly treat the account as initialized, potentially leading to operations on invalid data or bypassing initialization logic. Always check the account owner and attempt deserialization.

### Mint Issues (Token-2022 and SPL Token)

Validate mint account properties to avoid unexpected behavior.

- **Vulnerability:** Missing check for Mint Close Authority (Token-2022 extension).

```rust
// ❌ Bad: Using a mint without checking if it can be closed
let mint_info = &ctx.accounts.mint.to_account_info();

// ✅ Good: Check if the close_authority extension is set (requires Token-2022 crate)
use spl_token_2022::extension::StateWithExtensions;
use spl_token_2022::state::Mint;

let mint_account_info = &ctx.accounts.mint.to_account_info();
let mint_data = mint_account_info.try_borrow_data()?;
let mint_state = StateWithExtensions::<Mint>::unpack(&mint_data)?;
let extension_data = mint_state.get_extension::<spl_token_2022::extension::close_authority::CloseAuthority>()?;

require!(extension_data.authority.is_none(), ErrorCode::MintHasCloseAuthority);
```

- **Impact:** If a mint has a close authority set, that authority can permanently close the mint, potentially rendering all tokens of that mint unusable or worthless within your protocol.

- **Vulnerability:** Missing check for Mint Freeze Authority (SPL Token & Token-2022).

```rust
// ❌ Bad: Using a mint without checking freeze authority
let mint = &ctx.accounts.mint; // Assumes Account<'info, Mint>

// ✅ Good: Check the freeze_authority field on the Mint account data
require!(mint.freeze_authority.is_none(), ErrorCode::MintHasFreezeAuthority);
```

- **Impact:** If a mint has a freeze authority, that authority can freeze individual token accounts associated with that mint, preventing users from transferring their tokens. Protocols like Raydium often disallow mints with freeze authorities.

- **Vulnerability:** Fee-on-Transfer (Transfer Fee) extension not handled correctly (Token-2022).

```rust
// ❌ Bad: Using basic spl_token::transfer with a Token-2022 mint that has transfer fees enabled.
// Receiver gets amount - fee, but your program might record 'amount'.
spl_token::instruction::transfer(
    &spl_token::ID, // Wrong program ID for Token-2022
    source.key,
    destination.key,
    authority.key,
    &[],
    amount,
)?;


// ✅ Good: Using spl_token_2022::instruction::transfer_checked and the Token-2022 program ID.
// This instruction accounts for fees and decimals.
use spl_token_2022::instruction as token_2022_instruction;
invoke_signed(
    &token_2022_instruction::transfer_checked(
        &token_2022::ID, // Correct program ID
        source.key,
        mint.key, // Mint account required for checked instruction
        destination.key,
        authority.key,
        signer_pubkeys, // Signers if needed
        amount,
        decimals, // Mint decimals
    )?,
    &[source, mint, destination, authority], // Account infos
    signer_seeds, // PDA seeds if authority is PDA
)?;
```

- **Impact:** Using standard `transfer` with fee-enabled Token-2022 mints results in the receiver getting less than `amount` due to the fee deduction. This causes accounting discrepancies if your program assumes the full `amount` was transferred. Use `transfer_checked` with the correct Token-2022 program ID.
- **Reference:** [SPL Docs: Transfer Fees](https://spl.solana.com/token-2022/extensions#transfer-fees)

## Event Emission Issues

Events are crucial for off-chain monitoring and user feedback. Ensure they are accurate and comprehensive.

### Wrong Event Emission

- **Vulnerability:** Emitting incorrect or misleading data in events.

```rust
// ❌ Bad: Event data doesn't accurately reflect the state change
fn process_action(ctx: Context<Action>, fee: u64, value: u64) -> Result<()> {
    // ... logic ...
    emit!(ActionEvent {
        user: ctx.accounts.user.key(),
        value: value + fee, // Incorrectly includes fee in the value field
        timestamp: Clock::get()?.unix_timestamp,
    });
    Ok(())
}

// ✅ Good: Event data accurately reflects the relevant state
fn process_action(ctx: Context<Action>, fee: u64, value: u64) -> Result<()> {
    // ... logic ...
    emit!(ActionEvent {
        user: ctx.accounts.user.key(),
        value: value, // Correct value
        fee: fee,     // Separate field for fee
        timestamp: Clock::get()?.unix_timestamp,
    });
    Ok(())
}
```

- **Impact:** Incorrect event data misleads users, indexers, and monitoring tools, potentially causing downstream errors or hiding malicious activity.

### Missing Event Emission on Critical State Updates

- **Vulnerability:** Failing to emit events when critical program state changes (e.g., admin roles, fees, paused status).

```rust
// ❌ Bad: Updating critical state without emitting an event
fn update_fee(ctx: Context<UpdateFee>, new_fee: u64) -> Result<()> {
    ctx.accounts.config.fee = new_fee; // State changed, but no event emitted
    Ok(())
}

// ✅ Good: Emitting an event whenever critical state is updated
fn update_fee(ctx: Context<UpdateFee>, new_fee: u64) -> Result<()> {
    let old_fee = ctx.accounts.config.fee;
    ctx.accounts.config.fee = new_fee;

    emit!(FeeChangedEvent {
        old_fee: old_fee,
        new_fee: new_fee,
        admin: ctx.accounts.admin.key(),
        timestamp: Clock::get()?.unix_timestamp,
    });
    Ok(())
}
```

- **Impact:** Missing events for critical changes reduces transparency and makes it hard for users and off-chain systems to track important updates or detect unauthorized modifications.

## Arithmetic and Data Handling Security

Safe math operations are crucial, especially when dealing with funds.

### Integer Overflow/Underflow Protection

- **Vulnerability:** Performing arithmetic without checks for overflow/underflow.

```rust
// ❌ Bad: Unchecked addition, could overflow
let new_balance = balance + deposit_amount;

// ✅ Good: Using checked arithmetic methods
let new_balance = balance.checked_add(deposit_amount)
    .ok_or(ErrorCode::ArithmeticOverflow)?;
```

- **Note:** Ensure `overflow-checks = true` is enabled in your `Cargo.toml` under `[profile.release]` for runtime checks in release builds as a safety net. However, explicit `checked_*` methods are preferred for clarity and error handling.
- **Impact:** Overflows/underflows lead to incorrect calculations, potentially causing logic errors or loss/theft of funds.
- **Reference:** [Neodyme: Integer Overflow/Underflow](https://neodyme.io/en/blog/solana_common_pitfalls/#integer-overflow--underflow)

### Division Safety

- **Vulnerability:** Performing division without checking for a zero divisor.

```rust
// ❌ Bad: Potential panic if divisor is zero
let result = total_value / divisor;

// ✅ Good: Check for zero before dividing
if divisor == 0 {
    return err!(ErrorCode::DivisionByZero);
}
let result = total_value.checked_div(divisor)
    .ok_or(ErrorCode::ArithmeticOverflow)?; // Also check division result if needed
```

- **Impact:** Division by zero causes the program to panic and the transaction to fail.

### Precision Loss Prevention

- **Vulnerability:** Performing calculations (especially involving division) in an order that unnecessarily loses precision.

```rust
// ❌ Bad: Division before multiplication can lose precision
// If amount = 5, total = 10, rate_basis_points = 50 (0.5%)
// rate = (5 / 10) * 50 = 0 * 50 = 0 (Incorrect due to integer division)
let rate = (amount / total) * rate_basis_points;

// ✅ Good: Perform multiplication first to maintain precision
// rate = (5 * 50) / 10 = 250 / 10 = 25
let rate = amount.checked_mul(rate_basis_points)
    .ok_or(ErrorCode::ArithmeticOverflow)?
    .checked_div(total)
    .ok_or(ErrorCode::DivisionByZero)?; // Assume total can't be zero here
```

- **Impact:** Loss of precision leads to incorrect calculations, especially significant in financial contexts.

### Safe Type Casting

- **Vulnerability:** Unsafely casting between numeric types (e.g., `u128` to `u64`).

```rust
// ❌ Bad: `as` keyword truncates without warning if value exceeds target type's max
let big_num: u128 = 1_000_000_000_000;
let small_num = big_num as u64; // Potential truncation if big_num > u64::MAX

// ✅ Good: Use `try_from` or `try_into` for safe conversions
let small_num: u64 = u64::try_from(big_num)
    .map_err(|_| ErrorCode::TypeCastFailed)?;
```

- **Impact:** Unsafe casts can truncate values, leading to incorrect data and calculation errors.

### Rounding Considerations

- **Vulnerability:** Relying on implicit integer division rounding (truncation towards zero) when specific rounding (e.g., ceiling, floor, nearest) is needed.

```rust
// ❌ Bad: Implicit truncation might not be the desired rounding behavior
// If calculating shares: total_shares = 100, amount = 5, total_supply = 11
// shares = (100 * 5) / 11 = 500 / 11 = 45 (truncated)
let shares = total_shares.checked_mul(amount)?
    .checked_div(total_supply)?;

// ✅ Good: Explicitly implement the desired rounding (e.g., ceiling division)
// Ceiling division formula: (numerator + denominator - 1) / denominator
let numerator = total_shares.checked_mul(amount)?;
let shares_ceil = numerator
    .checked_add(total_supply.checked_sub(1)?)?
    .checked_div(total_supply)?; // shares_ceil = (500 + 11 - 1) / 11 = 510 / 11 = 46
```

- **Impact:** Incorrect rounding affects share calculations, reward distributions, and other precision-sensitive operations.

### Decimal Handling

- **Vulnerability:** Performing calculations directly on raw integer values representing fixed-point decimals without proper scaling.

```rust
// ❌ Bad: Direct integer math on values representing decimals (e.g., price with 6 decimals)
let raw_price: u64 = 5_000_000; // Represents $5.00
let quantity: u64 = 10;
let total_cost = raw_price * quantity; // Correct: 50_000_000 ($50.00)

// Example of bad scaling:
let discount_percentage = 10; // 10%
let discount_amount = (raw_price * discount_percentage) / 100; // 500_000 ($0.50) - Correct
// But complex calculations can easily go wrong.

// ✅ Good: Use dedicated decimal libraries or carefully manage scaling factors
// Example using hypothetical Decimal type (Anchor doesn't have a built-in one)
// let price = Decimal::new(raw_price, 6);
// let quantity = Decimal::from(quantity);
// let total_cost = price * quantity; // Library handles scaling
```

- **Impact:** Manually managing decimal scaling is error-prone. Incorrect scaling leads to vastly wrong calculation results. Consider using libraries designed for fixed-point arithmetic if complex decimal math is required.

## Seed Collisions

- **Vulnerability:** Different sets of seeds unintentionally producing the same PDA address.

```rust
// ❌ Bad: Seeds are too simple and might collide depending on input IDs
// If session_id can equal different_id, these two PDAs could collide
#[account(
    seeds = [b"vote", session_id.as_bytes()], bump
)]
pub vote_account: Account<'info, VoteAccount>,

#[account(
    seeds = [b"vote", different_id.as_bytes()], bump
)]
pub session_account: Account<'info, SessionAccount>,


// ✅ Good: Use distinct prefixes and include more context to ensure uniqueness
#[account(
    seeds = [
        b"vote_account_v1", // Unique prefix
        organizer.key().as_ref(), // Context: organizer
        session_id.as_bytes() // Specific ID
    ],
    bump
)]
pub vote_account: Account<'info, VoteAccount>,

#[account(
    seeds = [
        b"session_account_v1", // Different unique prefix
        organizer.key().as_ref(),
        session_id.as_bytes()
    ],
    bump
)]
pub session_account: Account<'info, SessionAccount>,
```

- **Mitigation Strategies:**
    1.  **Unique Prefixes:** Use distinct string prefixes (`b"user_data"`, `b"config_v1"`, etc.) for different account types.
    2.  **Contextual Seeds:** Include keys (like user pubkeys, mint addresses) or unique identifiers relevant to the specific PDA instance.
    3.  **Validate User Input:** If user input forms part of seeds, validate it carefully or combine it with program-controlled elements.
    4.  **Sequence/Nonce:** For PDAs created sequentially, consider including a nonce or sequence number in the seeds.
- **Impact:** Seed collisions allow one PDA account to be used where another was expected, potentially leading to state corruption, bypassing authorization checks, DoS, or allowing attackers to control unexpected parts of the program state.

## Essential Security Resources

Stay updated and learn from others:

### Official Documentation

- [Solana Program Security Course](https://solana.com/developers/courses/program-security)

### Security Best Practices & Research

- [Token-2022 Security Best Practices (Offside Blog Part 1)](https://blog.offside.io/p/token-2022-security-best-practices-part-1)
- [Token-2022 Security Best Practices (Offside Blog Part 2)](https://blog.offside.io/p/token-2022-security-best-practices-part-2)
- [Common Vulnerabilities in Anchor Programs (Zellic Blog)](https://www.zellic.io/blog/the-vulnerabilities-youll-write-with-anchor/)
- [A Hitchhiker's Guide to Solana Program Security (Helius Blog)](https://www.helius.dev/blog/a-hitchhikers-guide-to-solana-program-security)
- [Solana Program Security Research (Kudelski Security)](https://research.kudelskisecurity.com/2021/09/15/solana-program-security-part1/)
- [Solana Smart Contract Security Best Practices (SlowMist GitHub)](https://github.com/slowmist/solana-smart-contract-security-best-practices)

---

Building secure Solana programs requires diligence and attention to detail. This checklist covers many common pitfalls, but security is an ongoing process. Regularly audit your code, stay informed about new vulnerabilities, and leverage the tools and resources available in the ecosystem. Happy (secure) building!
