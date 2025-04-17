
import React from 'react';
import GridBackgroundDemo from '@/components/ui/aceternity/GridBackgroundDemo';
import { Button } from '@/components/ui/button';
import { Search, Tag, CalendarDays, Clock, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const featuredPost = {
  id: 1,
  title: "Exploiting Vulnerabilities in Solana Smart Contracts",
  excerpt: "An in-depth analysis of common security flaws in Solana programs and best practices for prevention.",
  coverImage: "bg-gradient-to-br from-primary/30 to-accent/30",
  date: "June 15, 2023",
  readTime: "8 min read",
  author: "Alex Johnson",
  tags: ["Security", "Solana"]
};

const blogPosts = [
  {
    id: 2,
    title: "Best Practices for Securing Rust Applications",
    excerpt: "Learn essential techniques for writing secure Rust code for blockchain applications.",
    coverImage: "bg-gradient-to-r from-blue-500/20 to-purple-500/20",
    date: "May 28, 2023",
    readTime: "6 min read",
    author: "Sarah Chen",
    tags: ["Rust", "Security"]
  },
  {
    id: 3,
    title: "Understanding Solana's Programming Model",
    excerpt: "A deep dive into Solana's unique approach to smart contract development and execution.",
    coverImage: "bg-gradient-to-r from-green-500/20 to-blue-500/20",
    date: "May 15, 2023",
    readTime: "10 min read",
    author: "Michael Rodriguez",
    tags: ["Solana", "Development"]
  },
  {
    id: 3,
    title: "Common Attack Vectors in DeFi Protocols",
    excerpt: "Analyzing recent DeFi hacks and strategies to protect your protocol from similar exploits.",
    coverImage: "bg-gradient-to-r from-red-500/20 to-orange-500/20",
    date: "April 20, 2023",
    readTime: "12 min read",
    author: "David Kumar",
    tags: ["DeFi", "Security"]
  },
  {
    id: 4,
    title: "Implementing Secure Upgradeable Contracts",
    excerpt: "Methods for creating upgradeable smart contracts without compromising security.",
    coverImage: "bg-gradient-to-r from-purple-500/20 to-pink-500/20",
    date: "April 5, 2023",
    readTime: "7 min read",
    author: "Emma Wilson",
    tags: ["Smart Contracts", "Development"]
  },
  {
    id: 5,
    title: "Audit Case Study: Cross-chain Bridge Vulnerability",
    excerpt: "A detailed breakdown of how we identified and helped fix a critical vulnerability in a cross-chain bridge.",
    coverImage: "bg-gradient-to-r from-yellow-500/20 to-green-500/20",
    date: "March 22, 2023",
    readTime: "9 min read",
    author: "Alex Johnson",
    tags: ["Audit", "Case Study"]
  },
  {
    id: 6,
    title: "Optimizing Gas Usage in Solana Programs",
    excerpt: "Techniques for writing efficient Solana programs that minimize computational resource consumption.",
    coverImage: "bg-gradient-to-r from-teal-500/20 to-blue-500/20",
    date: "March 10, 2023",
    readTime: "5 min read",
    author: "Jessica Park",
    tags: ["Solana", "Optimization"]
  },
];

const Blog = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <GridBackgroundDemo className="py-16">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl font-bold mb-4">Security Insights</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mb-8">
              Expert analyses, guides, and insights on blockchain security
              from the Arjuna audit team.
            </p>
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                type="text"
                placeholder="Search articles..."
                className="pl-10 pr-4 py-3 rounded-md bg-secondary/20 border border-border w-full focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
        </div>
      </GridBackgroundDemo>

      {/* Featured Post */}
      <section className="py-12">
        <div className="container px-4 mx-auto">
          <h2 className="text-2xl font-bold mb-6">Featured Article</h2>
          
          <Link to={`/blog/${featuredPost.id}`} className="block">
            <div className="glass-card rounded-xl overflow-hidden transition-all hover:scale-[1.01] hover:bg-secondary/30 cursor-pointer">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                <div className={`col-span-2 ${featuredPost.coverImage} h-full min-h-[200px] md:min-h-[300px]`} />
                <div className="col-span-3 p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {featuredPost.tags.map(tag => (
                      <span key={tag} className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold mb-3">
                    {featuredPost.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-5">
                    {featuredPost.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap items-center text-sm text-muted-foreground mb-6 gap-4">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {featuredPost.author}
                    </div>
                    <div className="flex items-center">
                      <CalendarDays className="h-4 w-4 mr-1" />
                      {featuredPost.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {featuredPost.readTime}
                    </div>
                  </div>
                  
                  <Button>Read Article</Button>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Latest Posts */}
      <section className="py-12 bg-black/30">
        <div className="container px-4 mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Latest Articles</h2>
            <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
              <Button variant="outline" size="sm" className="bg-primary/10 text-primary">All</Button>
              <Button variant="outline" size="sm">Security</Button>
              <Button variant="outline" size="sm">Solana</Button>
              <Button variant="outline" size="sm">Rust</Button>
              <Button variant="outline" size="sm">DeFi</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Link 
                key={post.id} 
                to={`/blog/${post.id}`}
                className="block"
              >
                <div className="glass-card rounded-xl overflow-hidden transition-all hover:scale-[1.02] hover:bg-secondary/30 cursor-pointer h-full">
                  <div className={`h-48 ${post.coverImage}`} />
                  <div className="p-5">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.map(tag => (
                        <span key={`${post.id}-${tag}`} className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-3">
                      {post.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-5 text-sm">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <div className="flex items-center">
                        <User className="h-3 w-3 mr-1" />
                        {post.author}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-12 flex justify-center">
            <nav className="flex items-center gap-1">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm" className="bg-primary/10 text-primary">1</Button>
              <Button variant="outline" size="sm">2</Button>
              <Button variant="outline" size="sm">3</Button>
              <span className="mx-2">...</span>
              <Button variant="outline" size="sm">5</Button>
              <Button variant="outline" size="sm">Next</Button>
            </nav>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <div className="glass-card rounded-xl p-8 max-w-3xl mx-auto">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-3">Stay Updated</h2>
              <p className="text-muted-foreground mb-6">
                Subscribe to our newsletter for the latest security insights and audit reports
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-grow px-4 py-3 rounded-md bg-secondary/20 border border-border focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <Button className="whitespace-nowrap">Subscribe</Button>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                We'll never spam you or share your email. You can unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
