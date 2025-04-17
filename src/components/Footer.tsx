import React from "react";
import { Link } from "react-router-dom";
import { Twitter, Github, Linkedin } from "lucide-react";
import Logo from "./Logo";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black/50 border-t border-border mt-20">
      <div className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <Logo className="h-8 w-8" />
              <span className="text-xl font-bold text-gradient">Arjuna</span>
            </Link>
            <p className="text-sm text-stone-500">
              Leading security and auditing services for Solana and Rust Based
              contracts.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://x.com/arjuna_sec"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-500 hover:text-primary"
              >
                <Twitter size={18} />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="https://github.com/ArjunaSec/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-500 hover:text-primary"
              >
                <Github size={18} />
                <span className="sr-only">GitHub</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-stone-400">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/blog"
                  className="text-stone-500 hover:text-primary text-sm"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="https://github.com/ArjunaSec/Audits"
                  className="text-stone-500 hover:text-primary text-sm"
                >
                  Audit Reports
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-stone-400">
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/ArjunaSec/Audits"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-500 hover:text-primary text-sm"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/calc1f4r"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-500 hover:text-primary text-sm"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-stone-600">
            &copy; {new Date().getFullYear()} Arjuna. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
