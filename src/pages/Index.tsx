import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Shield, CheckCircle, Zap, ArrowRight, Users, FileCode, Code, Eye, Award, ExternalLink, BookOpen, Trophy } from 'lucide-react';
import GridBackgroundDemo from '@/components/ui/aceternity/GridBackgroundDemo';
import GlowingCard from '@/components/ui/aceternity/GlowingCard';
import MovingBorder from '@/components/ui/aceternity/MovingBorder';
import NorthernLights from '@/components/ui/aceternity/NorthernLights';
import { Link } from 'react-router-dom';
import postsData from '@/data/blog/posts.json'; // Import blog post data
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

// Add a basic BlogPost type definition if you don't have one
// You might want to place this in a separate types file (e.g., src/types.ts)
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  contentPath: string;
  coverImage?: string; // Make coverImage optional if not always present
  date: string;
  readTime: string;
  author: string;
  authorImage: string;
  tags: string[];
  featured: boolean;
}

// Define audit record type
interface AuditRecord {
  protocol: string;
  description: string;
  findings: string;
  rank: string;
  logo?: string;
}

const Index = () => {
  const [latestPosts, setLatestPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    // Sort posts by date descending and take the first two
    const sortedPosts = [...postsData]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 2);
    setLatestPosts(sortedPosts as BlogPost[]); // Cast to BlogPost[]
  }, []);

  // Audit highlights
  const auditHighlights: AuditRecord[] = [
    {
      protocol: "Inclusive-Monorepo",
      description: "Solana-native, Cross-chain",
      findings: "15 High, 2 Medium (13 solos)",
      rank: "🥈 2nd",
      logo: "/images/audits/inclusive.png"
    },
    {
      protocol: "Soon-Labs/Soon",
      description: "SVM, cross-chain",
      findings: "3 Highs (1 solo)",
      rank: "🥇 10th",
      logo: "/images/audits/soon.png"
    },
    {
      protocol: "Reserve-Protocol",
      description: "Solana, Staking",
      findings: "1 High 1 Medium",
      rank: "🥇 4th",
      logo: "/images/audits/pump.png"
    }
  ];

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
              Industry-leading security audits and consulting for Secure Solana smart contracts and Rust Ecosystems projects.
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

      {/* Audit Portfolio Section */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-b from-background to-background/80">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-up">Our Audit Portfolio</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto animate-fade-up [animation-delay:200ms]">
              Proven track record of securing Rust & Solana ecosystems
            </p>
          </div>

          {/* Audit Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {auditHighlights.map((audit, index) => (
              <Card key={index} className="overflow-hidden bg-secondary/5 border-secondary/20 hover:bg-secondary/10 transition-colors hover:scale-105 transform duration-300 animate-fade-up [animation-delay:300ms]">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl font-bold">{audit.protocol}</CardTitle>
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">{audit.rank}</Badge>
                  </div>
                  <CardDescription>{audit.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2 text-muted-foreground mb-2">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    <span>{audit.findings}</span>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <a 
                    href="https://github.com/ArjunaSec/Audits" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary text-sm flex items-center hover:underline"
                  >
                    View report <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Expertise */}
          <div className="glass-card rounded-xl p-8 bg-secondary/5 border border-secondary/20 animate-fade-up [animation-delay:400ms]">
            <h3 className="text-2xl font-bold mb-6">Areas of Expertise</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex flex-col space-y-2">
                <h4 className="font-medium flex items-center gap-2">
                  <Code className="h-5 w-5 text-primary" /> Languages
                </h4>
                <ul className="text-muted-foreground text-sm space-y-1">
                  <li className="flex items-center gap-1">
                    <span className="h-1 w-1 rounded-full bg-primary inline-block"></span> Solidity
                  </li>
                  <li className="flex items-center gap-1">
                    <span className="h-1 w-1 rounded-full bg-primary inline-block"></span> Rust
                  </li>
                  <li className="flex items-center gap-1">
                    <span className="h-1 w-1 rounded-full bg-primary inline-block"></span> Move
                  </li>
                  <li className="flex items-center gap-1">
                    <span className="h-1 w-1 rounded-full bg-primary inline-block"></span> Cairo
                  </li>
                </ul>
              </div>
              
              <div className="flex flex-col space-y-2">
                <h4 className="font-medium flex items-center gap-2">
                  <FileCode className="h-5 w-5 text-primary" /> Blockchains
                </h4>
                <ul className="text-muted-foreground text-sm space-y-1">
                  <li className="flex items-center gap-1">
                    <span className="h-1 w-1 rounded-full bg-primary inline-block"></span> Ethereum
                  </li>
                  <li className="flex items-center gap-1">
                    <span className="h-1 w-1 rounded-full bg-primary inline-block"></span> Solana / SVM
                  </li>
                  <li className="flex items-center gap-1">
                    <span className="h-1 w-1 rounded-full bg-primary inline-block"></span> Starknet
                  </li>
                  <li className="flex items-center gap-1">
                    <span className="h-1 w-1 rounded-full bg-primary inline-block"></span> Aptos / S
                  </li>
                </ul>
              </div>
              
              <div className="flex flex-col space-y-2">
                <h4 className="font-medium flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" /> Expertise
                </h4>
                <ul className="text-muted-foreground text-sm space-y-1">
                  <li className="flex items-center gap-1">
                    <span className="h-1 w-1 rounded-full bg-primary inline-block"></span> Cross-chain bridges
                  </li>
                  <li className="flex items-center gap-1">
                    <span className="h-1 w-1 rounded-full bg-primary inline-block"></span> MEV
                  </li>
                  <li className="flex items-center gap-1">
                    <span className="h-1 w-1 rounded-full bg-primary inline-block"></span> DeFi protocols
                  </li>
                  <li className="flex items-center gap-1">
                    <span className="h-1 w-1 rounded-full bg-primary inline-block"></span> Smart contracts
                  </li>
                </ul>
              </div>
              
              <div className="flex flex-col space-y-2">
                <h4 className="font-medium flex items-center gap-2">
                  <Eye className="h-5 w-5 text-primary" /> Tools
                </h4>
                <ul className="text-muted-foreground text-sm space-y-1">
                  <li className="flex items-center gap-1">
                    <span className="h-1 w-1 rounded-full bg-primary inline-block"></span> Foundry
                  </li>
                  <li className="flex items-center gap-1">
                    <span className="h-1 w-1 rounded-full bg-primary inline-block"></span> Anchor
                  </li>
                  <li className="flex items-center gap-1">
                    <span className="h-1 w-1 rounded-full bg-primary inline-block"></span> Fuzzing frameworks
                  </li>
                  <li className="flex items-center gap-1">
                    <span className="h-1 w-1 rounded-full bg-primary inline-block"></span> Symbolic execution
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <a 
              href="https://github.com/ArjunaSec/Audits"
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-primary hover:underline animate-fade-up [animation-delay:500ms]"
            >
              View our complete portfolio <ArrowRight className="ml-1 h-4 w-4" />
            </a>
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
            {latestPosts.map((post, index) => (
              <Link 
                to={`/blog/${post.id}`} 
                key={post.id} 
                className={`animate-fade-up [animation-delay:${400 + index * 200}ms]`}
              >
                <div className="glass-card rounded-xl overflow-hidden transition-all hover:scale-[1.02] hover:bg-secondary/30 duration-300 h-full flex flex-col shadow-lg border border-white/10">
                  <div className="relative h-56 overflow-hidden">
                    {post.coverImage ? (
                      <>
                        <img 
                          src={post.coverImage} 
                          alt={post.title} 
                          className="object-cover transform hover:scale-105 transition-transform duration-500" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                      </>
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 flex items-center justify-center">
                        <Shield className="w-12 h-12 text-primary/50" />
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-grow bg-card/90 backdrop-blur-sm">
                    <div className="flex justify-between items-center mb-4">
                      {post.tags && post.tags.length > 0 && (
                        <span className={`text-xs font-medium px-3 py-1 rounded-full ${ 
                          post.tags[0].toLowerCase() === 'security' ? 'bg-primary/20 text-primary' : 
                          post.tags[0].toLowerCase() === 'rust' ? 'bg-accent/20 text-accent' : 
                          'bg-secondary/20 text-secondary-foreground' // Default tag style
                        }`}>
                          {post.tags[0]} {/* Display first tag */}
                        </span>
                      )}
                      <span className="text-xs text-muted-foreground">
                        {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 flex-grow">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm"> 
                      {post.excerpt}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
