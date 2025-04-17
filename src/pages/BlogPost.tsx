import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import BlogPostComponent, { BlogPostType } from '@/components/BlogPost';
import GridBackgroundDemo from '@/components/ui/aceternity/GridBackgroundDemo';
import NorthernLights from '@/components/ui/aceternity/NorthernLights';

// Sample blog posts data
const blogPosts: BlogPostType[] = [
  {
    id: 4,
    title: "Awesome Solana Security Checklist",
    content: `
      <p class="mb-4">A comprehensive collection of security best practices for Solana program development. This checklist covers common vulnerabilities and their prevention techniques to help developers build secure Solana applications.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Account Validations</h2>
      
      <h3 class="text-xl font-bold mt-6 mb-3">Signer Checks</h3>
      <p class="mb-4">Missing signer validation is a common vulnerability in Solana programs:</p>
      
      <pre class="bg-black/30 p-4 rounded-md mb-4 overflow-x-auto">
// ❌ Bad
let account = ctx.accounts.account;

// ✅ Good - Native
require!(account.is_signer, ErrorCode::MissingSigner);

// ✅ Good - Anchor
#[account(
    constraint = account.is_signer @ ErrorCode::MissingSigner
)]
pub account: Account<AccountType>,

// ✅ Good - Anchor 
pub creator: Signer<'info>,
      </pre>
      
      <p class="mb-4"><strong>Impact:</strong> Without signer validation, any account can be used in place of the intended signer, potentially allowing unauthorized access to program functions.</p>
      
      <h3 class="text-xl font-bold mt-6 mb-3">Writer Checks</h3>
      <p class="mb-4">Missing writer validation can lead to transaction failures:</p>
      
      <pre class="bg-black/30 p-4 rounded-md mb-4 overflow-x-auto">
// ❌ Bad
let account = ctx.accounts.account;

// ✅ Good - Native
require!(account.is_writable, ErrorCode::AccountNotWritable);

// ✅ Good - Anchor
#[account(
    mut,
    constraint = account.is_writable @ ErrorCode::AccountNotWritable
)]
pub account: Account<AccountType>,

// ✅ Good - Anchor 
#[account(mut)]
pub creator: AccountInfo<'info>,
      </pre>
      
      <p class="mb-4"><strong>Impact:</strong> Attempting to modify a non-writable account will cause transaction failure. Always verify account mutability before attempting modifications.</p>
      
      <h3 class="text-xl font-bold mt-6 mb-3">Owner Checks</h3>
      <p class="mb-4">Missing owner validation can allow malicious accounts to be used:</p>
      
      <pre class="bg-black/30 p-4 rounded-md mb-4 overflow-x-auto">
// ❌ Bad
let account = ctx.accounts.account;

// ✅ Good - Native
require!(account.owner == program_id, ErrorCode::InvalidOwner);

// ✅ Good - Anchor explicitly
#[account(
    constraint = account.owner == program_id @ ErrorCode::InvalidOwner
)]
pub account: Account<AccountType>,

// ✅ Good - Anchor: if you use system program accounts or PDA derived using the same program
pub pool: <Account<'info, Pool>>, // pool will be validated to be owned by our program id 
pub token_2022_program: Program<'info, Token2022>, // system owned accounts will be validated by anchor
      </pre>
      
      <p class="mb-4"><strong>Impact:</strong> Without owner validation, malicious accounts owned by other programs could be used, potentially leading to unauthorized state modifications or data theft.</p>
      
      <h3 class="text-xl font-bold mt-6 mb-3">PDA Validation</h3>
      <p class="mb-4">Missing proper PDA validation can compromise security:</p>
      
      <pre class="bg-black/30 p-4 rounded-md mb-4 overflow-x-auto">
// ❌ Bad
let pda = ctx.accounts.pda;

// ✅ Good - Native
let (expected_pda, _bump) = Pubkey::find_program_address(
    &[b"prefix", other_seed],
    program_id
);
require!(pda.key() == expected_pda, ErrorCode::InvalidPDA);

// ✅ Good - Anchor
#[account(
    seeds = [b"prefix", other_seed],
    bump,
    constraint = pda.key() == Pubkey::find_program_address(
        &[b"prefix", other_seed],
        program_id
    ).0 @ ErrorCode::InvalidPDA
)]
pub pda: Account<PdaAccount>,
      </pre>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Arithmetic and Data Handling Security</h2>
      
      <h3 class="text-xl font-bold mt-6 mb-3">Integer Overflow/Underflow Protection</h3>
      <p class="mb-4">Always use checked arithmetic operations:</p>
      
      <pre class="bg-black/30 p-4 rounded-md mb-4 overflow-x-auto">
// ❌ Bad: Unchecked arithmetic
let balance = account.balance + amount;

// ✅ Good: Checked arithmetic
let balance = account.balance.checked_add(amount)
    .ok_or(ProgramError::Overflow)?;
      </pre>
      
      <p class="mb-4"><strong>Note:</strong> Always verify your <code>Cargo.toml</code> has <code>overflow-checks = true</code> in the <code>[profile.release]</code> section.</p>
      
      <h3 class="text-xl font-bold mt-6 mb-3">Division Safety</h3>
      <p class="mb-4">Always check for zero before division:</p>
      
      <pre class="bg-black/30 p-4 rounded-md mb-4 overflow-x-auto">
// ❌ Bad: Unchecked division
let result = total / divisor;

// ✅ Good: Check for zero before division
if divisor == 0 {
    return Err(ProgramError::InvalidArgument);
}
let result = total / divisor;
      </pre>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Seed Collisions</h2>
      
      <p class="mb-4">Seed collisions occur when two different sets of seed values generate the same Program Derived Address (PDA):</p>
      
      <pre class="bg-black/30 p-4 rounded-md mb-4 overflow-x-auto">
// ❌ Bad - Using simple seeds that might collide
#[account(
    init,
    payer = user,
    space = 8 + size,
    seeds = [b"vote", session_id.as_bytes()],
    bump
)]
pub vote_account: Account<'info, VoteAccount>,

// ✅ Good - Using unique prefixes and additional context in seeds
#[account(
    init,
    payer = user,
    space = 8 + size,
    seeds = [b"vote_session", organizer.key().as_ref(), session_id.as_bytes()],
    bump
)]
pub vote_account: Account<'info, VoteAccount>,
      </pre>
      
      <p class="mb-4">To mitigate seed collision vulnerabilities:</p>
      <ul class="list-disc pl-5 mb-4">
        <li class="mb-2">Use unique prefixes for seeds across different PDAs in the same program</li>
        <li class="mb-2">Include additional contextual data in seeds (e.g., user public keys, timestamps)</li>
        <li class="mb-2">When using user-supplied data as seeds, validate its uniqueness</li>
        <li class="mb-2">Consider using a nonce value as part of the seed to ensure uniqueness</li>
      </ul>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">CPI Issues</h2>
      
      <p class="mb-4">Cross-Program Invocations (CPIs) must be performed carefully to avoid security issues. Always validate all accounts passed to CPIs and verify the program being called is the expected one.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Token Issues</h2>
      
      <p class="mb-4">Common token-related security issues include:</p>
      <ul class="list-disc pl-5 mb-4">
        <li class="mb-2">Missing check for mint close authority extension</li>
        <li class="mb-2">Missing check for mint freeze authority</li>
        <li class="mb-2">Fee on transfer extension not properly handled</li>
      </ul>
      
      <p class="mb-4">By following these security best practices, developers can significantly reduce the risk of vulnerabilities in their Solana programs and build more secure applications on the Solana blockchain.</p>
    `,
    coverImage: "bg-gradient-to-br from-purple-500/30 to-pink-500/30",
    date: "July 10, 2023",
    readTime: "12 min read",
    author: "Arjuna Security",
    tags: ["Security", "Solana", "Checklist"]
  },
  {
    id: 1,
    title: "Ultimate Solana Security Checklist",
    content: `
      <p class="mb-4">Smart contracts on Solana are written in Rust and compiled to Berkley Packet Filter (BPF) bytecode. This architecture offers high performance but introduces unique security considerations that differ from EVM-based blockchains like Ethereum.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Common Vulnerability Patterns</h2>
      
      <h3 class="text-xl font-bold mt-6 mb-3">1. Account Validation Flaws</h3>
      <p class="mb-4">One of the most common vulnerabilities in Solana programs is insufficient account validation. Unlike Ethereum, where contract calls are direct, Solana uses an account model where programs must validate all accounts passed to them.</p>
      <p class="mb-4">Consider this vulnerable code:</p>
      
      <pre class="bg-black/30 p-4 rounded-md mb-4 overflow-x-auto">
fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    let accounts_iter = &mut accounts.iter();
    let user = next_account_info(accounts_iter)?;
    let vault = next_account_info(accounts_iter)?;
    
    // Missing vault owner validation!
    
    // Transfer funds
    **vault.try_borrow_mut_lamports()? -= amount;
    **user.try_borrow_mut_lamports()? += amount;
    
    Ok(())
}
      </pre>
      
      <p class="mb-4">The correct implementation should verify that the vault account is owned by the expected program:</p>
      
      <pre class="bg-black/30 p-4 rounded-md mb-4 overflow-x-auto">
// Validate vault ownership
if vault.owner != program_id {
    return Err(ProgramError::IncorrectProgramId);
}
      </pre>
      
      <h3 class="text-xl font-bold mt-6 mb-3">2. Signer Verification Omissions</h3>
      <p class="mb-4">Another critical vulnerability is failing to verify that transaction signers actually signed the transaction:</p>
      
      <pre class="bg-black/30 p-4 rounded-md mb-4 overflow-x-auto">
// Vulnerable: Not checking if authority actually signed
let authority = next_account_info(accounts_iter)?;

// Secure: Verify authority signed the transaction
let authority = next_account_info(accounts_iter)?;
if !authority.is_signer {
    return Err(ProgramError::MissingRequiredSignature);
}
      </pre>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Preventing Vulnerabilities</h2>
      
      <p class="mb-4">To secure Solana smart contracts, we recommend the following best practices:</p>
      
      <ul class="list-disc pl-5 mb-4">
        <li class="mb-2">Always verify all account owners</li>
        <li class="mb-2">Check that required signers have signed the transaction</li>
        <li class="mb-2">Implement proper access control checks</li>
        <li class="mb-2">Use the Anchor framework to automate many security checks</li>
        <li class="mb-2">Always check for arithmetic overflow/underflow</li>
      </ul>
      
      <p class="mb-4">By following these guidelines, developers can significantly reduce the risk of vulnerabilities in their Solana programs.</p>
    `,
    coverImage: "bg-gradient-to-br from-primary/30 to-accent/30",
    date: "June 15, 2023",
    readTime: "8 min read",
    author: "Alex Johnson",
    tags: ["Security", "Solana"]
  },
  {
    id: 2,
    title: "Best Practices for Securing Rust Applications",
    content: `
      <p class="mb-4">Rust's ownership model and strong type system provide excellent protection against memory safety issues, but writing secure Rust code still requires attention to several important areas.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Memory Safety Best Practices</h2>
      
      <p class="mb-4">While Rust provides memory safety guarantees, improper use of unsafe code can introduce vulnerabilities:</p>
      
      <pre class="bg-black/30 p-4 rounded-md mb-4 overflow-x-auto">
// Avoid unnecessary unsafe blocks
unsafe {
    // Only use when absolutely necessary
    // Document why unsafe is needed
}
      </pre>
      
      <p class="mb-4">Always prefer safe Rust constructs and only use unsafe when absolutely necessary.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Proper Error Handling</h2>
      
      <p class="mb-4">Effective error handling is critical for security in Rust applications:</p>
      
      <pre class="bg-black/30 p-4 rounded-md mb-4 overflow-x-auto">
// Use Result for operations that can fail
fn process_data(input: &str) -> Result<Output, MyError> {
    // Implementation
}

// Handle errors appropriately
match process_data(user_input) {
    Ok(output) => {
        // Success case
    }
    Err(e) => {
        // Handle error properly
        log::error!("Process failed: {}", e);
        return Err(e);
    }
}
      </pre>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Input Validation</h2>
      
      <p class="mb-4">Always validate untrusted input:</p>
      
      <pre class="bg-black/30 p-4 rounded-md mb-4 overflow-x-auto">
// Validate user input
if !is_valid_input(user_data) {
    return Err(InputError::Invalid);
}

// Deserialize with caution
let config: Config = serde_json::from_str(input)?;
      </pre>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Conclusion</h2>
      
      <p class="mb-4">Rust provides excellent tools for writing secure code, but developers must still follow security best practices. By leveraging Rust's type system, proper error handling, and careful input validation, you can create secure and reliable applications.</p>
    `,
    coverImage: "bg-gradient-to-r from-blue-500/20 to-purple-500/20",
    date: "May 28, 2023",
    readTime: "6 min read",
    author: "Sarah Chen",
    tags: ["Rust", "Security"]
  },
  {
    id: 3,
    title: "Understanding Solana's Programming Model",
    content: `
      <p class="mb-4">Solana's programming model differs significantly from other blockchains, offering unique advantages and challenges for developers.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">The Account Model</h2>
      
      <p class="mb-4">Solana uses an account-based model where all state is stored in accounts:</p>
      
      <pre class="bg-black/30 p-4 rounded-md mb-4 overflow-x-auto">
// Accounts in Solana represent state
pub struct AccountInfo<'a> {
    pub key: &'a Pubkey,       // Account address
    pub is_signer: bool,       // Was this account a transaction signer?
    pub is_writable: bool,     // Is this account writable?
    pub lamports: &'a mut u64, // Account SOL balance
    pub data: &'a mut [u8],    // Account data
    pub owner: &'a Pubkey,     // Account owner (program)
    pub executable: bool,      // Is this account executable code?
    pub rent_epoch: u64,       // Next epoch when rent is due
}
      </pre>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Program Execution Flow</h2>
      
      <p class="mb-4">Solana programs are stateless and receive accounts as parameters:</p>
      
      <pre class="bg-black/30 p-4 rounded-md mb-4 overflow-x-auto">
// The entry point for all Solana programs
entrypoint!(process_instruction);

pub fn process_instruction(
    program_id: &Pubkey,      // Program's own public key
    accounts: &[AccountInfo], // Accounts passed to the program
    instruction_data: &[u8]   // Instruction data
) -> ProgramResult {
    // Process the instruction
    Ok(())
}
      </pre>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Cross-Program Invocation</h2>
      
      <p class="mb-4">Solana programs can call other programs:</p>
      
      <pre class="bg-black/30 p-4 rounded-md mb-4 overflow-x-auto">
// Invoke another program
invoke(
    &Instruction {
        program_id: token_program_id,
        accounts: vec![
            AccountMeta::new(*source, false),
            AccountMeta::new(*destination, false),
            AccountMeta::new_readonly(*authority, true),
        ],
        data: instruction_data,
    },
    &[source, destination, authority]
)?;
      </pre>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Conclusion</h2>
      
      <p class="mb-4">Understanding Solana's unique programming model is essential for developing secure and efficient applications on the platform. By mastering the account model, program execution flow, and cross-program invocation patterns, developers can leverage Solana's performance advantages while building robust applications.</p>
    `,
    coverImage: "bg-gradient-to-r from-green-500/20 to-blue-500/20",
    date: "May 15, 2023",
    readTime: "10 min read",
    author: "Michael Rodriguez",
    tags: ["Solana", "Development"]
  }
];

const BlogPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const postId = parseInt(id || '0');
  
  // Find the blog post with the matching ID
  const post = blogPosts.find(post => post.id === postId);
  
  // If post doesn't exist, redirect to the blog list
  if (!post) {
    return <Navigate to="/blog" />;
  }
  
  return (
    <div className="min-h-screen">
      <NorthernLights>
        <GridBackgroundDemo className="py-10">
          <div className="container px-4 mx-auto">
            <div className="flex items-center justify-center">
              <div className="bg-primary/20 px-4 py-1 rounded-full backdrop-blur-sm">
                <h2 className="text-sm font-medium tracking-wider uppercase">Security Insights</h2>
              </div>
            </div>
          </div>
        </GridBackgroundDemo>
      </NorthernLights>
      
      <BlogPostComponent post={post} />
    </div>
  );
};

export default BlogPostPage;
