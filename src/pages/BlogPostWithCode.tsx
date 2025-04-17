import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CalendarDays, Clock, User, Tag } from "lucide-react";
import CodeBlock from "@/components/ui/CodeBlock";
import "../styles/prism.css";

const BlogPostWithCode = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  // Sample code blocks for different languages
  const rustCode = `pub fn update_admin_settings(ctx: Context<UpdateAdminSettings>) {
    ctx.accounts.config_data.settings = new_settings;
    
    Ok(())
}

#[derive(Accounts)]
pub struct UpdateAdminSettings<'info> {
    #[account(mut)]
    pub config_data: Account<'info, ConfigData>,
    pub admin: Signer<'info>,
}

#[account]
pub struct ConfigData {
    admin: Pubkey,
    settings: AdminSettings
}`;

  const solanaJsCode = `import * as web3 from '@solana/web3.js';
import * as token from '@solana/spl-token';

async function createTokenAccount(
  connection: web3.Connection,
  payer: web3.Keypair,
  mint: web3.PublicKey,
  owner: web3.PublicKey
) {
  const tokenAccount = await token.getOrCreateAssociatedTokenAccount(
    connection,
    payer,
    mint,
    owner
  );
  
  console.log(
    \`Token Account: \${tokenAccount.address.toString()}\`
  );
  
  return tokenAccount;
}`;

  const solidityCode = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract VulnerableContract {
    mapping(address => uint256) private balances;
    
    function deposit() external payable {
        balances[msg.sender] += msg.value;
    }
    
    function withdraw(uint256 amount) external {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        
        // Vulnerability: State change after external call
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");
        
        balances[msg.sender] -= amount;
    }
}`;

  const bashCode = `#!/bin/bash
# Install Solana CLI tools
sh -c "$(curl -sSfL https://release.solana.com/v1.10.32/install)"

# Configure the CLI to the devnet
solana config set --url https://api.devnet.solana.com

# Generate a new keypair
solana-keygen new --no-passphrase

# Check your Solana balance
solana balance`;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
      <div className="mb-10">
        <Link
          to="/blog"
          className="inline-flex items-center text-primary hover:underline transition-all duration-200 text-sm font-medium"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          <span>Back to all articles</span>
        </Link>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {["Security", "Solana", "Smart Contracts", "Rust"].map((tag, index) => (
          <span
            key={index}
            className="text-xs px-3 py-1 rounded-full bg-primary/20 text-primary font-medium backdrop-blur-sm"
          >
            {tag}
          </span>
        ))}
      </div>

      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 tracking-tight leading-[1.1] text-gradient">
        Understanding Smart Contract Security with Code Examples
      </h1>

      <div className="flex flex-wrap items-center text-sm text-muted-foreground mb-12 gap-6">
        <div className="flex items-center">
          <User className="h-4 w-4 mr-2 text-primary/80" />
          <span>Alex Johnson</span>
        </div>
        <div className="flex items-center">
          <CalendarDays className="h-4 w-4 mr-2 text-primary/80" />
          <span>July 12, 2023</span>
        </div>
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-2 text-primary/80" />
          <span>12 min read</span>
        </div>
      </div>

      <div className="w-full h-[300px] md:h-[400px] lg:h-[500px] bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl mb-14 shadow-xl shadow-black/5"></div>

      <article className="prose prose-invert max-w-none lg:prose-xl mb-16 prose-headings:text-gradient prose-headings:font-bold prose-p:text-foreground/90 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-pre:bg-secondary/40 prose-pre:backdrop-blur-sm prose-headings:tracking-tight prose-headings:leading-tight prose-p:leading-relaxed prose-li:leading-relaxed">
        <p className="text-xl leading-relaxed mb-8 text-foreground/95">
          Smart contract security is a critical aspect of blockchain
          development. With millions of dollars at stake, understanding common
          vulnerabilities and implementing proper safeguards is essential. In
          this article, we'll explore smart contract security concepts with code
          examples across different blockchain platforms.
        </p>

        <h2 className="text-3xl font-bold mt-14 mb-6">
          Secure Rust Programming for Solana
        </h2>
        <p>
          Solana programs written in Rust require specific security patterns.
          Let's examine a basic admin settings update function:
        </p>

        <CodeBlock
          language="rust"
          code={rustCode}
          fileName="program/src/lib.rs"
        />

        <p>
          Notice how this code uses Solana's Account validation and Context
          pattern to ensure that only the authorized admin can update settings.
          The <code>#[account(mut)]</code> attribute ensures proper handling of
          account mutability.
        </p>

        <h2 className="text-3xl font-bold mt-14 mb-6">
          JavaScript Client for Solana Integration
        </h2>
        <p>
          When interacting with Solana from a client application, proper
          handling of accounts and transactions is crucial:
        </p>

        <CodeBlock
          language="javascript"
          code={solanaJsCode}
          fileName="client/token-account.js"
        />

        <p>
          The client code above demonstrates proper account creation using the
          SPL Token library, ensuring accounts are correctly initialized and
          associated.
        </p>

        <h2 className="text-3xl font-bold mt-14 mb-6">
          Common Vulnerabilities in Solidity Smart Contracts
        </h2>
        <p>
          When working with Ethereum-based blockchains, different security
          considerations apply. Here's an example of a reentrancy vulnerability
          in Solidity:
        </p>

        <CodeBlock
          language="solidity"
          code={solidityCode}
          fileName="contracts/Vulnerable.sol"
        />

        <p>
          This contract has a classic reentrancy vulnerability - it sends funds
          before updating the state. An attacker could recursively call the
          withdrawal function before the balance is updated, draining the
          contract. The proper fix would be to update the state before making
          the external call.
        </p>

        <h2 className="text-3xl font-bold mt-14 mb-6">
          Setting Up a Secure Development Environment
        </h2>
        <p>
          Security starts with a properly configured development environment.
          Here's a basic setup script for Solana:
        </p>

        <CodeBlock language="bash" code={bashCode} fileName="setup.sh" />

        <h2 className="text-3xl font-bold mt-14 mb-6">
          Key Security Principles
        </h2>
        <p>
          Regardless of the blockchain platform, several security principles
          remain constant:
        </p>

        <ul className="space-y-2 my-6">
          <li className="pl-1">Validate all inputs and user permissions</li>
          <li className="pl-1">
            Follow the checks-effects-interactions pattern
          </li>
          <li className="pl-1">
            Avoid complex business logic in smart contracts
          </li>
          <li className="pl-1">Implement proper state management</li>
          <li className="pl-1">
            Use platform-specific security tools and linters
          </li>
          <li className="pl-1">Always get an independent security audit</li>
        </ul>

        <h2 className="text-3xl font-bold mt-14 mb-6">Conclusion</h2>
        <p>
          Smart contract security is a never-ending process that requires
          vigilance and a deep understanding of the underlying blockchain
          platform. By studying common vulnerabilities and implementing best
          practices as shown in the examples above, developers can significantly
          reduce the risk of security incidents.
        </p>
      </article>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent my-20"></div>

      <div className="bg-secondary/20 backdrop-blur-sm p-8 rounded-xl border border-border/40 mb-16 shadow-lg shadow-black/5">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-shrink-0 w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
            <User className="h-10 w-10 text-primary" />
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-3">About the author</h3>
            <p className="text-muted-foreground mb-4 max-w-2xl leading-relaxed">
              Alex Johnson is a security researcher at Arjuna, specializing in
              Solana smart contract security with extensive experience
              identifying vulnerabilities in decentralized applications.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostWithCode;
