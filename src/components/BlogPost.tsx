
import React from 'react';
import { CalendarDays, Clock, User, Tag, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import GlowingCard from './ui/aceternity/GlowingCard';
import { Button } from './ui/button';

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
        <Link to="/blog" className="flex items-center text-primary hover:underline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to all articles
        </Link>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags.map((tag, index) => (
          <span key={index} className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary">
            {tag}
          </span>
        ))}
      </div>
      
      <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>
      
      <div className="flex flex-wrap items-center text-sm text-muted-foreground mb-8 gap-4">
        <div className="flex items-center">
          <User className="h-4 w-4 mr-1" />
          {post.author}
        </div>
        <div className="flex items-center">
          <CalendarDays className="h-4 w-4 mr-1" />
          {post.date}
        </div>
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-1" />
          {post.readTime}
        </div>
      </div>
      
      {post.coverImage && (
        <div className={`w-full h-[300px] md:h-[400px] ${post.coverImage} rounded-xl mb-8`} />
      )}
      
      <div className="prose prose-invert max-w-none mb-12">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
      
      <GlowingCard className="mb-12">
        <div className="flex flex-col md:flex-row items-center gap-6 p-6">
          <div className="flex-shrink-0 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <User className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">About the author</h3>
            <p className="text-muted-foreground mb-4">
              {post.author} is a security researcher at Arjuna, specializing in Solana smart contract security.
            </p>
            <Button variant="outline" size="sm">View profile</Button>
          </div>
        </div>
      </GlowingCard>
      
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Share this article</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
            </svg>
          </Button>
          <Button variant="outline" size="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </Button>
          <Button variant="outline" size="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
