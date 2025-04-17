import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Prism from "prismjs"; // Import Prism
// Ensure languages are loaded (can be done in a central place like main.tsx or here)
import "prismjs/components/prism-rust";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-css";
import "prismjs/components/prism-scss";
import "prismjs/components/prism-solidity";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-json";
import "prismjs/components/prism-markdown";
import "prismjs/components/prism-yaml";
import "prismjs/components/prism-python";
// Import the Prism CSS theme (already done in main.tsx, but good to be aware)
// import 'prismjs/themes/prism-tomorrow.css'; // Or your preferred theme

import postsData from "@/data/blog/posts.json";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, User, ArrowLeft } from "lucide-react";
import NotFound from "./NotFound"; // Import NotFound component

// Define the type for a blog post (can be shared)
interface BlogPostData {
  id: string;
  title: string;
  excerpt: string;
  contentPath: string;
  coverImage: string;
  date: string;
  readTime: string;
  author: string;
  authorImage: string;
  tags: string[];
  featured: boolean;
}

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPostData | null | undefined>(undefined); // undefined initially, null if not found
  const [markdownContent, setMarkdownContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    setMarkdownContent("");

    // Find the post metadata
    const foundPost = postsData.find((p) => p.id === id) as
      | BlogPostData
      | undefined;

    if (foundPost) {
      setPost(foundPost);
      // Fetch the markdown content
      fetch(foundPost.contentPath)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.text();
        })
        .then((text) => {
          setMarkdownContent(text);
          setIsLoading(false);
          // Highlight code blocks after content is loaded
          // Use a timeout to ensure the DOM is updated
          setTimeout(() => {
            Prism.highlightAll();
          }, 0);
        })
        .catch((e) => {
          console.error("Error fetching markdown content:", e);
          setError("Failed to load article content.");
          setIsLoading(false);
        });
    } else {
      setPost(null); // Mark as not found
      setIsLoading(false);
    }
  }, [id]);

  // Function to format date (optional, same as in Blog.tsx)
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (e) {
      return dateString;
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        Loading article...
      </div>
    ); // Add a loading state
  }

  if (post === null) {
    // If post is explicitly null (not found), render NotFound
    return <NotFound />;
  }

  // If post is still undefined (shouldn't happen often with the logic, but safe check)
  if (!post) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        Article not available.
      </div>
    );
  }

  // Custom component for rendering code blocks with Prism highlighting
  const CodeBlock = ({ node, inline, className, children, ...props }: any) => {
    const match = /language-(\w+)/.exec(className || "");
    const lang = match ? match[1] : "markup"; // Default to markup if no language specified

    // For inline code, just render it simply
    if (inline) {
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    }

    // For block code, apply Prism highlighting
    const code = String(children).replace(/\n$/, ""); // Get the code content
    const html = Prism.highlight(
      code,
      Prism.languages[lang] || Prism.languages.markup,
      lang,
    );

    return (
      <pre className={`language-${lang}`}>
        <code
          className={`language-${lang}`}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </pre>
    );
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => navigate("/blog")}
        className="mb-8 text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Articles
      </Button>

      {/* Post Header */}
      <header className="mb-10 border-b border-border pb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
        <div className="flex flex-wrap items-center text-sm text-muted-foreground gap-x-6 gap-y-2 mb-6">
          <div className="flex items-center">
            <User className="h-4 w-4 mr-1.5" />
            {post.author}
          </div>
          <div className="flex items-center">
            <CalendarDays className="h-4 w-4 mr-1.5" />
            {formatDate(post.date)}
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1.5" />
            {post.readTime}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      {/* Cover Image (Optional) */}
      {post.coverImage && (
        <div className="mb-10 rounded-lg overflow-hidden">
          <img
            src={post.coverImage}
            alt={`${post.title} cover`}
            className="w-full h-auto object-cover"
          />
        </div>
      )}

      {/* Post Content */}
      <article className="prose prose-invert lg:prose-xl max-w-none prose-headings:font-bold prose-a:text-primary hover:prose-a:underline prose-img:rounded-md prose-img:mx-auto">
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code: CodeBlock, // Use the custom CodeBlock component
            }}
          >
            {markdownContent}
          </ReactMarkdown>
        )}
      </article>

      {/* Add other sections like Author bio, related posts etc. here later */}
    </div>
  );
};

export default BlogPost;
