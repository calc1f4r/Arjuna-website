
import React from 'react';
import { CalendarDays, Clock, User, Tag, ArrowLeft, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import GlowingCard from './ui/aceternity/GlowingCard';
import { Button } from './ui/button';
import MovingBorder from './ui/aceternity/MovingBorder';

// Define the blog post type
export interface BlogPostType {
  id: number;
  title: string;
  content: string;
  coverImage?: string;
  date: string;
  readTime: string;
  author: string;
  tags: string[];
  excerpt?: string;
}

interface BlogPostProps {
  post: BlogPostType;
}

const BlogPost: React.FC<BlogPostProps> = ({ post }) => {
  return (
    <div className="container px-4 mx-auto py-12">
      <div className="mb-8">
        <Link to="/blog" className="flex items-center text-primary hover:underline transition-all duration-200">
          <ArrowLeft className="mr-2 h-4 w-4" />
          <span className="text-sm font-medium">Back to all articles</span>
        </Link>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {post.tags.map((tag, index) => (
          <span key={index} className="text-xs px-3 py-1 rounded-full bg-primary/20 text-primary font-medium backdrop-blur-sm">
            {tag}
          </span>
        ))}
      </div>
      
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight leading-tight text-gradient">
        {post.title}
      </h1>
      
      <div className="flex flex-wrap items-center text-sm text-muted-foreground mb-10 gap-6">
        <div className="flex items-center">
          <User className="h-4 w-4 mr-2 text-primary/80" />
          <span>{post.author}</span>
        </div>
        <div className="flex items-center">
          <CalendarDays className="h-4 w-4 mr-2 text-primary/80" />
          <span>{post.date}</span>
        </div>
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-2 text-primary/80" />
          <span>{post.readTime}</span>
        </div>
      </div>
      
      {post.coverImage && (
        <MovingBorder containerClassName="w-full mb-12 rounded-2xl overflow-hidden" className="p-0">
          <div className={`w-full h-[300px] md:h-[400px] lg:h-[500px] ${post.coverImage} rounded-xl`} />
        </MovingBorder>
      )}
      
      <article className="prose prose-invert max-w-none lg:prose-xl mb-16 prose-headings:text-gradient prose-headings:font-bold prose-p:text-foreground/90 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-pre:bg-secondary/40 prose-pre:backdrop-blur-sm">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
      
      <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent my-16"></div>
      
      <GlowingCard className="mb-16">
        <div className="flex flex-col md:flex-row items-center gap-8 p-8">
          <div className="flex-shrink-0 w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
            <User className="h-10 w-10 text-primary" />
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-3">About the author</h3>
            <p className="text-muted-foreground mb-4 max-w-2xl">
              {post.author} is a security researcher at Arjuna, specializing in Solana smart contract security with extensive experience identifying vulnerabilities in decentralized applications.
            </p>
            <Button variant="outline" size="sm" className="group">
              <span>View profile</span>
              <span className="inline-block transition-transform group-hover:translate-x-1 ml-1">→</span>
            </Button>
          </div>
        </div>
      </GlowingCard>
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h3 className="text-xl font-semibold">Share this article</h3>
        <div className="flex gap-3">
          <Button variant="outline" size="icon" className="rounded-full h-10 w-10 bg-secondary/40 hover:bg-primary/20 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
            </svg>
          </Button>
          <Button variant="outline" size="icon" className="rounded-full h-10 w-10 bg-secondary/40 hover:bg-primary/20 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </Button>
          <Button variant="outline" size="icon" className="rounded-full h-10 w-10 bg-secondary/40 hover:bg-primary/20 transition-colors">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
