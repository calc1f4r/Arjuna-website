
import React from 'react';
import { Button } from '@/components/ui/button';
import { Shield, CheckCircle, Zap, ArrowRight, Users, FileCode, Code, Eye } from 'lucide-react';
import GridBackgroundDemo from '@/components/ui/aceternity/GridBackgroundDemo';
import GlowingCard from '@/components/ui/aceternity/GlowingCard';
import MovingBorder from '@/components/ui/aceternity/MovingBorder';
import { Link } from 'react-router-dom';

const clients = [
  { name: "SolanaChain" },
  { name: "RustFi" },
  { name: "Anchor Protocol" },
  { name: "Serum DEX" },
  { name: "Marinade Finance" },
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <GridBackgroundDemo className="py-20 md:py-32">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col justify-center items-center text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight animate-fade-up mb-6">
              <span className="text-gradient">Securing</span> the Future of <br />
              Solana & Rust Ecosystems
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mb-8 animate-fade-up [animation-delay:200ms]">
              Industry-leading security audits and consulting for Solana smart contracts
              and Rust applications by expert auditors with a proven track record.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-up [animation-delay:400ms]">
              <MovingBorder 
                duration={3000} 
                containerClassName="rounded-lg"
              >
                <Button className="relative z-10 px-8 py-6 rounded-lg">
                  Request Audit <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </MovingBorder>
              <Button variant="outline" className="px-8 py-6">
                View Reports
              </Button>
            </div>

            <div className="mt-16 grid grid-cols-2 md:grid-cols-5 gap-4 items-center justify-center opacity-70">
              {clients.map((client) => (
                <div 
                  key={client.name} 
                  className="flex items-center justify-center p-4 hover:opacity-100 transition-opacity"
                >
                  <p className="text-sm font-semibold text-muted-foreground">{client.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </GridBackgroundDemo>

      {/* Services Section */}
      <section className="py-20">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive security assessment services tailored to blockchain projects
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <GlowingCard>
              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <FileCode className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Smart Contract Audits</h3>
                <p className="text-muted-foreground">
                  In-depth security reviews of Solana smart contracts to identify vulnerabilities and ensure safety.
                </p>
              </div>
            </GlowingCard>

            <GlowingCard>
              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Rust Program Analysis</h3>
                <p className="text-muted-foreground">
                  Thorough security assessment of Rust applications and libraries to detect and fix security flaws.
                </p>
              </div>
            </GlowingCard>

            <GlowingCard>
              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Eye className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Protocol Review</h3>
                <p className="text-muted-foreground">
                  Comprehensive evaluation of blockchain protocol designs to identify architectural weaknesses.
                </p>
              </div>
            </GlowingCard>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-black/30">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Arjuna</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We bring specialized expertise to secure your blockchain applications
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0 mt-1">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Expert Team</h3>
                <p className="text-muted-foreground">
                  Our auditors have extensive experience in blockchain security, with specialized knowledge in Solana and Rust ecosystems.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 mt-1">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Rigorous Methodology</h3>
                <p className="text-muted-foreground">
                  Our audit process combines automated tools with manual review to ensure comprehensive vulnerability detection.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 mt-1">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Client-Focused Approach</h3>
                <p className="text-muted-foreground">
                  We work closely with development teams to understand project goals and provide tailored security solutions.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 mt-1">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Fast Turnaround</h3>
                <p className="text-muted-foreground">
                  Quick response times and flexible scheduling to accommodate your project timeline without compromising quality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20">
        <div className="container px-4 mx-auto">
          <GlowingCard className="max-w-4xl mx-auto">
            <div className="flex flex-col items-center text-center p-4">
              <h2 className="text-3xl font-bold mb-4">Ready to secure your project?</h2>
              <p className="text-muted-foreground max-w-2xl mb-8">
                Get in touch with our team to discuss your security needs and how Arjuna can help protect your blockchain application.
              </p>
              <Button className="px-8 py-6 text-lg">
                Request an Audit
              </Button>
            </div>
          </GlowingCard>
        </div>
      </section>

      {/* Recent Audits Preview */}
      <section className="py-20 bg-black/30">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Recent Audits</h2>
              <p className="text-muted-foreground">
                Our latest security assessments and findings
              </p>
            </div>
            <Link to="/audits" className="flex items-center text-primary hover:underline mt-4 md:mt-0">
              View all audits <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <Link to="/audits" key={item}>
                <div className="glass-card rounded-xl p-6 transition-all hover:scale-[1.02] hover:bg-secondary/30">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary">Solana</span>
                    <span className="text-xs text-muted-foreground">May {item + 10}, 2023</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-1">DecentraDEX Protocol</h3>
                  <p className="text-sm text-muted-foreground mb-4">Decentralized exchange on Solana</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">12 vulnerabilities found</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-accent/20 text-accent">Completed</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Blog Preview */}
      <section className="py-20">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Latest Insights</h2>
              <p className="text-muted-foreground">
                Security insights and best practices from our team
              </p>
            </div>
            <Link to="/blog" className="flex items-center text-primary hover:underline mt-4 md:mt-0">
              Visit our blog <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link to="/blog">
              <div className="glass-card rounded-xl overflow-hidden transition-all hover:scale-[1.02] hover:bg-secondary/30">
                <div className="h-48 bg-gradient-radial from-primary/20 to-transparent" />
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary">Security</span>
                    <span className="text-xs text-muted-foreground">June 2, 2023</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Common Vulnerabilities in Solana Smart Contracts
                  </h3>
                  <p className="text-muted-foreground">
                    An overview of recurring security issues we've identified in Solana contracts and how to avoid them.
                  </p>
                </div>
              </div>
            </Link>
            
            <Link to="/blog">
              <div className="glass-card rounded-xl overflow-hidden transition-all hover:scale-[1.02] hover:bg-secondary/30">
                <div className="h-48 bg-gradient-radial from-accent/20 to-transparent" />
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs px-2 py-1 rounded-full bg-accent/20 text-accent">Rust</span>
                    <span className="text-xs text-muted-foreground">May 24, 2023</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Secure Coding Practices for Rust Blockchain Applications
                  </h3>
                  <p className="text-muted-foreground">
                    Best practices for writing secure Rust code in blockchain contexts to minimize security risks.
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
