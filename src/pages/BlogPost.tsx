
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import BlogPostComponent, { BlogPostType } from '@/components/BlogPost';
import GridBackgroundDemo from '@/components/ui/aceternity/GridBackgroundDemo';

// Sample blog posts data
const blogPosts: BlogPostType[] = [
  {
    id: 1,
    title: "Exploiting Vulnerabilities in Solana Smart Contracts",
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
      <GridBackgroundDemo className="py-6">
        <div className="container px-4 mx-auto">
          <h2 className="text-xl font-semibold">Security Insights</h2>
        </div>
      </GridBackgroundDemo>
      
      <BlogPostComponent post={post} />
    </div>
  );
};

export default BlogPostPage;
