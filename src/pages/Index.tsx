import React from 'react';
import { Button } from '@/components/ui/button';
import { Shield, CheckCircle, Zap, ArrowRight, Users, FileCode, Code, Eye } from 'lucide-react';
import GridBackgroundDemo from '@/components/ui/aceternity/GridBackgroundDemo';
import GlowingCard from '@/components/ui/aceternity/GlowingCard';
import MovingBorder from '@/components/ui/aceternity/MovingBorder';
import NorthernLights from '@/components/ui/aceternity/NorthernLights';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <GridBackgroundDemo className="py-20 md:py-32">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col justify-center items-center text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight animate-fade-up mb-6">
              <span className="text-gradient animate-gradient-flow">Securing</span> the Future of <br />
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
                <a href="https://t.me/calc1f4r" target="_blank" rel="noopener noreferrer">
                  <Button className="relative z-10 px-8 py-6 rounded-lg group">
                    Request Quote <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </a>
              </MovingBorder>
                <a href="https://github.com/ArjunaSec/audits" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="px-8 py-6 hover:scale-105 transition-transform">
                View Reports
              </Button>
                </a>
            </div>
          </div>
        </div>
      </GridBackgroundDemo>

      {/* Services Section */}
      <NorthernLights className="py-20">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-up">Our Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto animate-fade-up [animation-delay:200ms]">
              Comprehensive security assessment services tailored to blockchain projects
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="animate-fade-up [animation-delay:300ms]">
              <GlowingCard className="hover:scale-105 transition-all duration-300">
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 animate-pulse-glow">
                    <FileCode className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Smart Contract Audits</h3>
                  <p className="text-muted-foreground">
                    In-depth security reviews of Solana smart contracts to identify vulnerabilities and ensure safety.
                  </p>
                </div>
              </GlowingCard>
            </div>

            <div className="animate-fade-up [animation-delay:500ms]">
              <GlowingCard className="hover:scale-105 transition-all duration-300">
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 animate-pulse-glow">
                    <Code className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Rust Program Analysis</h3>
                  <p className="text-muted-foreground">
                    Thorough security assessment of Rust applications and libraries to detect and fix security flaws.
                  </p>
                </div>
              </GlowingCard>
            </div>

            <div className="animate-fade-up [animation-delay:700ms]">
              <GlowingCard className="hover:scale-105 transition-all duration-300">
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 animate-pulse-glow">
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
        </div>
      </NorthernLights>

      {/* Why Choose Us */}
      <section className="py-20 bg-black/30 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[rgba(255,13,104,0.04)] to-transparent opacity-50"></div>
        <div className="container px-4 mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-up">Why Choose Arjuna</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto animate-fade-up [animation-delay:200ms]">
              We bring specialized expertise to secure your blockchain applications
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-4 group hover:bg-secondary/10 p-4 rounded-lg transition-colors animate-fade-up [animation-delay:300ms]">
              <div className="flex-shrink-0 mt-1 group-hover:scale-110 transition-transform">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">Expert Team</h3>
                <p className="text-muted-foreground">
                  Our auditors have extensive experience in blockchain security, with specialized knowledge in Solana and Rust ecosystems.
                </p>
              </div>
            </div>

            <div className="flex gap-4 group hover:bg-secondary/10 p-4 rounded-lg transition-colors animate-fade-up [animation-delay:400ms]">
              <div className="flex-shrink-0 mt-1 group-hover:scale-110 transition-transform">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">Rigorous Methodology</h3>
                <p className="text-muted-foreground">
                  Our audit process combines automated tools with manual review to ensure comprehensive vulnerability detection.
                </p>
              </div>
            </div>

            <div className="flex gap-4 group hover:bg-secondary/10 p-4 rounded-lg transition-colors animate-fade-up [animation-delay:500ms]">
              <div className="flex-shrink-0 mt-1 group-hover:scale-110 transition-transform">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">Client-Focused Approach</h3>
                <p className="text-muted-foreground">
                  We work closely with development teams to understand project goals and provide tailored security solutions.
                </p>
              </div>
            </div>

            <div className="flex gap-4 group hover:bg-secondary/10 p-4 rounded-lg transition-colors animate-fade-up [animation-delay:600ms]">
              <div className="flex-shrink-0 mt-1 group-hover:scale-110 transition-transform">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">Fast Turnaround</h3>
                <p className="text-muted-foreground">
                  Quick response times and flexible scheduling to accommodate your project timeline without compromising quality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <NorthernLights className="py-20">
        <div className="container px-4 mx-auto">
          <GlowingCard className="max-w-4xl mx-auto hover:scale-[1.02] transition-transform duration-300">
            <div className="flex flex-col items-center text-center p-4">
              <h2 className="text-3xl font-bold mb-4 animate-fade-up">Ready to secure your project?</h2>
              <p className="text-muted-foreground max-w-2xl mb-8 animate-fade-up [animation-delay:200ms]">
                Get in touch with our team to discuss your security needs and how Arjuna can help protect your blockchain application.
              </p>
              <a href="https://t.me/calc1f4r" target="_blank" rel="noopener noreferrer">
                <Button className="px-8 py-6 text-lg group animate-fade-up [animation-delay:400ms] hover:bg-primary/90 transition-colors">
                  Request an Audit
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </a>
            </div>
          </GlowingCard>
        </div>
      </NorthernLights>

      {/* Blog Preview */}
      <section className="py-20">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2 animate-fade-up">Latest Insights</h2>
              <p className="text-muted-foreground animate-fade-up [animation-delay:200ms]">
                Security insights and best practices from our team
              </p>
            </div>
            <Link to="/blog" className="flex items-center text-primary hover:underline mt-4 md:mt-0 group animate-fade-up [animation-delay:300ms]">
              Visit our blog <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link to="/blog" className="animate-fade-up [animation-delay:400ms]">
              <div className="glass-card rounded-xl overflow-hidden transition-all hover:scale-[1.02] hover:bg-secondary/30 duration-300">
                <div className="h-48 bg-gradient-radial from-[rgba(255,13,104,0.16)] to-transparent relative overflow-hidden">
                  <div className="aurora-container absolute inset-0 opacity-40"></div>
                </div>
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
            
            <Link to="/blog" className="animate-fade-up [animation-delay:600ms]">
              <div className="glass-card rounded-xl overflow-hidden transition-all hover:scale-[1.02] hover:bg-secondary/30 duration-300">
                <div className="h-48 bg-gradient-radial from-[rgba(204,10,83,0.16)] to-transparent relative overflow-hidden">
                  <div className="aurora-container absolute inset-0 opacity-40"></div>
                </div>
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
