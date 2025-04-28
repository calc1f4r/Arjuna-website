import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Shield,
  CheckCircle,
  Zap,
  ArrowRight,
  Users,
  FileCode,
  Code,
  Eye,
  Award,
  ExternalLink,
  BookOpen,
  Trophy,
} from "lucide-react";
import GridBackgroundDemo from "@/components/ui/aceternity/GridBackgroundDemo";
import GlowingCard from "@/components/ui/aceternity/GlowingCard";
import MovingBorder from "@/components/ui/aceternity/MovingBorder";
import NorthernLights from "@/components/ui/aceternity/NorthernLights";
import Meteors from "@/components/ui/aceternity/Meteors";
import { Link } from "react-router-dom";
import postsData from "@/data/blog/posts.json"; // Import blog post data
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
      logo: "/images/audits/inclusive.png",
    },
    {
      protocol: "Reserve-Protocol",
      description: "Solana, Staking",
      findings: "1 High 1 Medium",
      rank: "🥇 4th",
      logo: "/images/audits/pump.png",
    },
    {
      protocol: "Soon-Labs/Soon",
      description: "SVM, cross-chain",
      findings: "3 Highs (1 solo)",
      rank: "🥇 10th",
      logo: "/images/audits/soon.png",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {" "}
        {/* Keep overflow-hidden */}
        {/* GridBackgroundDemo now wraps Meteors */}
        <Meteors number={40} className="absolute inset-0 z-20" />
        <GridBackgroundDemo className="py-20 md:py-32 relative">
          {" "}
          {/* Ensure GridBackgroundDemo is relative */}
          {/* Render Meteors first, inside GridBackgroundDemo but before its content */}
          {/* Give Meteors a higher z-index to appear above content */}
          {/* Content container needs lower z-index */}
          <div className="container px-4 mx-auto relative z-10">
            <div className="flex flex-col justify-center items-center text-center">
              {/* ... existing h1, p, buttons ... */}
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight animate-fade-up mb-6">
                <span className="text-gradient animate-gradient-flow">
                  Securing
                </span>{" "}
                the Future of <br />
                Solana & Rust Ecosystems
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mb-8 animate-fade-up [animation-delay:200ms]">
                Industry-leading security audits and consulting for Secure
                Solana smart contracts and Rust Ecosystems projects.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 animate-fade-up [animation-delay:400ms]">
                <MovingBorder duration={3000} containerClassName="rounded-lg">
                  <a
                    href="https://t.me/calc1f4r"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="relative z-10 px-8 py-6 rounded-lg group">
                      Request Quote{" "}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </a>
                </MovingBorder>
                <a
                  href="https://github.com/ArjunaSec/audits"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    className="px-8 py-6 hover:scale-105 transition-transform"
                  >
                    View Reports
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </GridBackgroundDemo>
      </div>

      {/* Why Choose Us */}
      <section className="py-20 bg-black/30 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[rgba(255,13,104,0.04)] to-transparent opacity-50"></div>
        <div className="container px-4 mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-up">
              Why Choose Arjuna
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto animate-fade-up [animation-delay:200ms]">
              We bring specialized expertise to secure your blockchain
              applications
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Item 1: Specialized Expertise */}
            <div className="flex gap-4 group bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-lg p-6 transition-all duration-300 animate-fade-up [animation-delay:300ms] hover:border-white/20 hover:bg-white/10 hover:shadow-xl hover:-translate-y-1">
              <div className="flex-shrink-0 mt-1 group-hover:scale-110 transition-transform">
                <Code className="h-6 w-6 text-primary" /> {/* Changed icon */}
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  Specialized Expertise in Solana & Rust
                </h3>{" "}
                {/* Updated title */}
                <p className="text-muted-foreground">
                  Deep focus on Solana's architecture and Rust ensures thorough
                  understanding and identification of platform-specific
                  vulnerabilities (e.g., missing signer checks, ownership
                  issues, unsafe Rust).
                </p>{" "}
                {/* Updated description */}
              </div>
            </div>

            {/* Item 2: Rigorous Methodology */}
            <div className="flex gap-4 group bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-lg p-6 transition-all duration-300 animate-fade-up [animation-delay:400ms] hover:border-white/20 hover:bg-white/10 hover:shadow-xl hover:-translate-y-1">
              <div className="flex-shrink-0 mt-1 group-hover:scale-110 transition-transform">
                <Award className="h-6 w-6 text-primary" /> {/* Changed icon */}
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  Rigorous Methodology
                </h3>
                <p className="text-muted-foreground">
                  Our audit process combines automated tools with manual review
                  to ensure comprehensive vulnerability detection.
                </p>
              </div>
            </div>

            {/* Item 3: Client-Focused Approach */}
            <div className="flex gap-4 group bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-lg p-6 transition-all duration-300 animate-fade-up [animation-delay:500ms] hover:border-white/20 hover:bg-white/10 hover:shadow-xl hover:-translate-y-1">
              <div className="flex-shrink-0 mt-1 group-hover:scale-110 transition-transform">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  Client-Focused Approach
                </h3>
                <p className="text-muted-foreground">
                  We work closely with development teams to understand project
                  goals and provide tailored security solutions.
                </p>
              </div>
            </div>

            {/* Item 4: Fast Turnaround */}
            <div className="flex gap-4 group bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-lg p-6 transition-all duration-300 animate-fade-up [animation-delay:600ms] hover:border-white/20 hover:bg-white/10 hover:shadow-xl hover:-translate-y-1">
              <div className="flex-shrink-0 mt-1 group-hover:scale-110 transition-transform">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  Proved record thorugh Audit competitions
                </h3>
                <p className="text-muted-foreground">
                  Demonstrated excellence through top placements in competitive
                  audit contests, showcasing our expertise in finding critical
                  vulnerabilities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Audit Portfolio Section */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-b from-background to-background/90">
        {" "}
        {/* Increased padding */}
        <div className="container px-4 mx-auto">
          <div className="text-center mb-20">
            {" "}
            {/* Increased bottom margin */}
            <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-up">
              Our Audit Portfolio
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto animate-fade-up [animation-delay:200ms]">
              Proven track record of securing Rust & Solana ecosystems
            </p>
          </div>

          {/* Audit Highlights - Enhanced Card Design */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {" "}
            {/* Increased bottom margin */}
            {auditHighlights.map((audit, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden shadow-lg hover:shadow-primary/25 bg-card/80 backdrop-blur-sm border border-white/10 
                           transition-all duration-300 animate-fade-up [animation-delay:300ms] hover:-translate-y-1"
              >
                {/* Top Accent */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/30 via-primary to-primary/30 opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>

                <CardHeader className="pt-8 pb-4 px-6">
                  {" "}
                  {/* Adjusted padding */}
                  <div className="flex justify-between items-center mb-2">
                    <CardTitle className="text-xl font-semibold tracking-tight group-hover:text-primary transition-colors">
                      {audit.protocol}
                    </CardTitle>
                    <Badge
                      variant="outline"
                      className={`ml-3 px-2.5 py-0.5 text-xs font-medium border-opacity-60 group-hover:border-opacity-100 transition-all rounded-full
                        ${
                          audit.rank.includes("2nd")
                            ? "border-slate-400 text-slate-400 bg-slate-900/50 group-hover:bg-slate-800/60"
                            : audit.rank.includes("4th") ||
                                audit.rank.includes("10th")
                              ? "border-yellow-500 text-yellow-500 bg-yellow-900/50 group-hover:bg-yellow-800/60"
                              : "border-primary/70 text-primary bg-primary/10 group-hover:bg-primary/20"
                        }`}
                    >
                      {audit.rank}
                    </Badge>
                  </div>
                  <CardDescription className="text-sm text-muted-foreground/90">
                    {audit.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="px-6 pb-5">
                  {" "}
                  {/* Adjusted padding */}
                  {/* Findings */}
                  <div className="flex items-start space-x-3 p-3.5 bg-black/20 rounded-lg border border-white/10 mb-5 shadow-inner">
                    <div className="mt-0.5">
                      <Trophy className="h-5 w-5 text-yellow-400/80" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground/95">
                        Findings
                      </div>
                      <div className="text-muted-foreground text-sm">
                        {audit.findings}
                      </div>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="px-6 pb-6">
                  {" "}
                  {/* Adjusted padding */}
                  {/* View report button */}
                  <a
                    href="https://github.com/ArjunaSec/Audits"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-medium text-primary/90 hover:text-primary transition-colors group/link"
                  >
                    <span className="border-b border-primary/40 group-hover/link:border-primary/70 pb-0.5 transition-all">
                      View full report
                    </span>
                    <ExternalLink className="ml-1.5 h-3.5 w-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                  </a>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Expertise Section - Enhanced Card Design */}
          <div className="mb-16 animate-fade-up [animation-delay:400ms]">
            <h3 className="text-2xl font-bold mb-10 text-center">
              Areas of Expertise
            </h3>{" "}
            {/* Increased margin */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Languages",
                  icon: Code,
                  items: ["Solidity", "Rust", "Move", "Cairo"],
                },
                {
                  title: "Blockchains",
                  icon: FileCode,
                  items: [
                    "Ethereum",
                    "Solana / SVM",
                    "Starknet",
                    "Aptos / Sui",
                  ],
                },
                {
                  title: "Expertise",
                  icon: BookOpen,
                  items: [
                    "Cross-chain bridges",
                    "MEV",
                    "DeFi protocols",
                    "Smart contracts",
                  ],
                },
                {
                  title: "Tools",
                  icon: Eye,
                  items: [
                    "Foundry",
                    "Anchor",
                    "Fuzzing frameworks",
                    "Symbolic execution",
                  ],
                },
              ].map((area, index) => (
                <Card
                  key={area.title}
                  className="group bg-card/80 backdrop-blur-sm border border-white/10 
                              hover:border-primary/30 hover:bg-secondary/20 transition-all duration-300 
                              transform hover:-translate-y-1.5 shadow-md hover:shadow-primary/15 rounded-xl overflow-hidden"
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 pt-5 px-5">
                    <CardTitle className="text-base font-medium text-foreground/90 group-hover:text-primary transition-colors">
                      {area.title}
                    </CardTitle>
                    <area.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </CardHeader>
                  <CardContent className="px-5 pb-5">
                    <ul className="text-muted-foreground text-sm space-y-2">
                      {area.items.map((item, itemIndex) => (
                        <li
                          key={itemIndex}
                          className="flex items-center gap-2 group/item animate-fade-in"
                          style={{
                            animationDelay: `${itemIndex * 100 + 500}ms`,
                          }} // Stagger delay, start after card fades up
                        >
                          <span className="h-1 w-1 rounded-full bg-primary/60 group-hover/item:bg-primary transition-colors inline-block shrink-0"></span>
                          <span className="group-hover/item:text-foreground/90 transition-colors duration-200 inline-block">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Link to full portfolio */}
          <div className="text-center animate-fade-up [animation-delay:500ms]">
            <a
              href="https://github.com/ArjunaSec/Audits"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-primary hover:underline group"
            >
              View our complete portfolio on GitHub
              <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <NorthernLights className="py-20">
        <div className="container px-4 mx-auto">
          <GlowingCard className="max-w-4xl mx-auto hover:scale-[1.02] transition-transform duration-300">
            <div className="flex flex-col items-center text-center p-4">
              <h2 className="text-3xl font-bold mb-4 animate-fade-up">
                Ready to secure your project?
              </h2>
              <p className="text-muted-foreground max-w-2xl mb-8 animate-fade-up [animation-delay:200ms]">
                Get in touch with our team to discuss your security needs and
                how Arjuna can help protect your blockchain application.
              </p>
              <a
                href="https://t.me/calc1f4r"
                target="_blank"
                rel="noopener noreferrer"
              >
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
              <h2 className="text-3xl md:text-4xl font-bold mb-2 animate-fade-up">
                Latest Insights
              </h2>
              <p className="text-muted-foreground animate-fade-up [animation-delay:200ms]">
                Security insights and best practices from our team
              </p>
            </div>
            <Link
              to="/blog"
              className="flex items-center text-primary hover:underline mt-4 md:mt-0 group animate-fade-up [animation-delay:300ms]"
            >
              Visit our blog{" "}
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {latestPosts.map((post, index) => (
              <Link
                to={`/blog/${post.id}`}
                key={post.id}
                className={`animate-fade-up [animation-delay:${400 + index * 200}ms]`}
              >
                {/* Apply glassmorphism styles here */}
                <div className="bg-card/90 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden transition-all hover:scale-[1.02] hover:bg-secondary/30 duration-300 h-full flex flex-col shadow-lg">
                  <div className="relative h-56 overflow-hidden">
                    {post.coverImage ? (
                      post.coverImage.endsWith('.mp4') ? (
                        <video
                          src={post.coverImage}
                          className="object-cover w-full h-full"
                          autoPlay
                          loop
                          muted
                          playsInline
                        />
                      ) : (
                        <>
                          <img
                            src={post.coverImage}
                            alt={post.title}
                            className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                        </>
                      )
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 flex items-center justify-center">
                        <Shield className="w-12 h-12 text-primary/50" />
                      </div>
                    )}
                  </div>
                  {/* Removed redundant bg-card/90 and backdrop-blur-sm from here */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-center mb-4">
                      {post.tags && post.tags.length > 0 && (
                        <span
                          className={`text-xs font-medium px-3 py-1 rounded-full ${
                            post.tags[0].toLowerCase() === "security"
                              ? "bg-primary/20 text-primary"
                              : post.tags[0].toLowerCase() === "rust"
                                ? "bg-accent/20 text-accent"
                                : "bg-secondary/20 text-secondary-foreground" // Default tag style
                          }`}
                        >
                          {post.tags[0]} {/* Display first tag */}
                        </span>
                      )}
                      <span className="text-xs text-muted-foreground">
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
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
