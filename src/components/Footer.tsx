
import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Github, Linkedin } from 'lucide-react';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black/50 border-t border-border mt-20">
      <div className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <Logo className="h-8 w-8" />
              <span className="text-xl font-bold text-gradient">Arjuna</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Leading security and auditing services for Solana and Rust applications.
            </p>
            <div className="flex space-x-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                <Twitter size={18} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                <Github size={18} />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                <Linkedin size={18} />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/audits" className="text-muted-foreground hover:text-primary text-sm">Smart Contract Audits</Link>
              </li>
              <li>
                <Link to="/audits" className="text-muted-foreground hover:text-primary text-sm">Rust Security Analysis</Link>
              </li>
              <li>
                <Link to="/audits" className="text-muted-foreground hover:text-primary text-sm">Solana Program Reviews</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-primary text-sm">Blog</Link>
              </li>
              <li>
                <Link to="/audits" className="text-muted-foreground hover:text-primary text-sm">Audit Reports</Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-primary text-sm">Security Best Practices</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary text-sm">About Us</Link>
              </li>
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary text-sm">Contact</Link>
              </li>
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary text-sm">Careers</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Arjuna Security. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/" className="text-xs text-muted-foreground hover:text-primary">
              Privacy Policy
            </Link>
            <Link to="/" className="text-xs text-muted-foreground hover:text-primary">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
