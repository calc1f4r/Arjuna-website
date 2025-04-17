import React, { useState, useEffect, useMemo } from 'react';
import GridBackgroundDemo from '@/components/ui/aceternity/GridBackgroundDemo';
import { Button } from '@/components/ui/button';
import { Search, Tag, CalendarDays, Clock, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import postsData from '@/data/blog/posts.json'; // Import the JSON data

// Define the type for a blog post
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  contentPath: string;
  coverImage: string;
  date: string; // Keep as string for now, can format later
  readTime: string;
  author: string;
  authorImage: string;
  tags: string[];
  featured: boolean;
}

const Blog = () => {
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null);
  const [searchTerm, setSearchTerm] = useState(''); // State for search input
  const [selectedTag, setSelectedTag] = useState<string>('All'); // State for selected tag filter

  useEffect(() => {
    // In a real app, you might fetch this data
    // For now, we use the imported JSON
    const posts: BlogPost[] = postsData;
    setAllPosts(posts);

    const featured = posts.find(post => post.featured) || null;
    setFeaturedPost(featured);

  }, []);

  // Get all unique tags from posts
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    allPosts.forEach(post => {
      post.tags.forEach(tag => tagsSet.add(tag));
    });
    return ['All', ...Array.from(tagsSet)]; // Add 'All' at the beginning
  }, [allPosts]);

  // Filter posts based on search term AND selected tag
  const filteredPosts = useMemo(() => {
    let posts = allPosts;

    // Filter by search term first
    if (searchTerm) {
      posts = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Then filter by selected tag (if not 'All')
    if (selectedTag !== 'All') {
      posts = posts.filter(post => post.tags.includes(selectedTag));
    }

    // If not searching and no specific tag selected, exclude the featured post from the main list
    if (!searchTerm && selectedTag === 'All') {
      posts = posts.filter(post => !post.featured);
    } else if (searchTerm && featuredPost && posts.some(p => p.id === featuredPost.id)) {
       // If searching and the featured post matches the search, keep it in the results
       // No need to filter it out explicitly here if search is active
    } else if (selectedTag !== 'All' && featuredPost && posts.some(p => p.id === featuredPost.id) && !featuredPost.tags.includes(selectedTag)) {
        // If filtering by tag and the featured post doesn't have the tag, remove it
        posts = posts.filter(post => post.id !== featuredPost.id);
    }


    // Sort the final list by date
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  }, [allPosts, searchTerm, selectedTag, featuredPost]); // Add selectedTag and featuredPost to dependencies

  // Determine if we are actively searching or filtering by tag
  const isFiltering = searchTerm.length > 0 || selectedTag !== 'All';

  // Get the posts to display (either filtered results or latest non-featured)
  // Adjust logic slightly: if filtering, show filtered results. If not filtering, show non-featured.
  const postsToDisplay = isFiltering ? filteredPosts : allPosts.filter(post => !post.featured).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());


  // Check if there are posts to display in the main list
  const hasPostsToDisplay = postsToDisplay.length > 0;
  // Check if there's a featured post AND we are not actively filtering (by search or tag)
  const shouldShowFeaturedPost = !!featuredPost && !isFiltering;

  // Function to format date (optional)
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch (e) {
      return dateString; // Return original if formatting fails
    }
  };

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
                placeholder="Search articles by title..." // Updated placeholder
                className="pl-10 pr-4 py-3 rounded-md bg-secondary/20 border border-border w-full focus:outline-none focus:ring-1 focus:ring-primary"
                value={searchTerm} // Bind value to state
                onChange={(e) => setSearchTerm(e.target.value)} // Update state on change
              />
            </div>
          </div>
        </div>
      </GridBackgroundDemo>

      {/* Featured Post - Only show if featured post exists AND not filtering */}
      {shouldShowFeaturedPost && featuredPost && (
        <section className="py-12">
          <div className="container px-4 mx-auto">
            <h2 className="text-2xl font-bold mb-6">Featured Article</h2>
            
            <Link to={`/blog/${featuredPost.id}`} className="block">
              <div className="glass-card rounded-xl overflow-hidden transition-all hover:scale-[1.01] hover:bg-secondary/30 cursor-pointer">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                  {/* Use background image style for cover */}
                  <div 
                    className="col-span-2 bg-cover bg-center h-full min-h-[200px] md:min-h-[300px]"
                    style={{ backgroundImage: `url(${featuredPost.coverImage})` }}
                  />
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
                        {formatDate(featuredPost.date)}
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
      )}

      {/* Main Posts List (Latest or Filtered Results) */}
      {/* Show this section if filtering OR if not filtering and there are non-featured posts */}
      {(isFiltering || (!isFiltering && hasPostsToDisplay)) && (
        <section className={`py-12 ${!shouldShowFeaturedPost ? 'pt-12' : 'bg-black/30'}`}> {/* Adjust padding/bg if featured is hidden */}
          <div className="container px-4 mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              {/* Change title based on whether filtering */}
              <h2 className="text-2xl font-bold">{isFiltering ? (searchTerm ? 'Search Results' : `Tag: ${selectedTag}`) : 'Latest Articles'}</h2>
              {/* Tag Filters - Hide if searching, show otherwise */}
              {!searchTerm && (
                <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar flex-wrap">
                  {allTags.map(tag => {
                    const isActive = selectedTag === tag;
                    const isFilteringActive = selectedTag !== 'All';
                    
                    // Define base classes
                    let buttonClasses = isActive ? "bg-primary text-primary-foreground" : "";
                    
                    // Add conditional hover overrides ONLY when a specific tag filter is active
                    if (isFilteringActive) {
                      if (isActive) {
                        // Override hover for the active button to stay the same
                        buttonClasses += " hover:bg-primary"; 
                      } else {
                        // Override hover for inactive outline buttons to stay like the base outline
                        buttonClasses += " hover:bg-background hover:text-accent-foreground"; // Keep text color consistent with default outline hover text
                      }
                    }

                    return (
                      <Button
                        key={tag}
                        variant={isActive ? "default" : "outline"} // Highlight active tag
                        size="sm"
                        onClick={() => setSelectedTag(tag)} // Set selected tag on click
                        className={buttonClasses} // Apply combined classes
                      >
                        {tag}
                      </Button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Display filtered posts or message if no results */}
            {hasPostsToDisplay ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {postsToDisplay.map((post) => ( // Use postsToDisplay
                  <Link 
                    key={post.id} 
                    to={`/blog/${post.id}`}
                    className="block"
                  >
                    <div className="glass-card rounded-xl overflow-hidden transition-all hover:scale-[1.02] hover:bg-secondary/30 cursor-pointer h-full flex flex-col">
                      {/* Use background image style for cover */}
                      <div 
                        className="h-48 bg-cover bg-center"
                        style={{ backgroundImage: `url(${post.coverImage})` }}
                      />
                      <div className="p-5 flex flex-col flex-grow">
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
                        
                        <p className="text-muted-foreground mb-5 text-sm flex-grow">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex justify-between items-center text-xs text-muted-foreground mt-auto">
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
            ) : (
              // Show message if filtering and no results found
              isFiltering && (
                <div className="flex flex-col items-center justify-center text-center py-16">
                  <p className="text-lg font-semibold text-muted-foreground">
                    {searchTerm
                      ? "🤷‍♂️ No articles found matching your search. 🕵️‍♀️"
                      : `🤷‍♂️ No articles found with the tag "${selectedTag}". 🏷️`}
                  </p>
                </div>
              )
            )}

            {/* Pagination (Needs logic if many posts) - Hide if filtering for now */}
            {!isFiltering && hasPostsToDisplay && (
              <div className="mt-12 flex justify-center">
                <nav className="flex items-center gap-1">
                  <Button variant="outline" size="sm" disabled>Previous</Button>
                  <Button variant="outline" size="sm" className="bg-primary/10 text-primary">1</Button>
                  {/* Basic disable, needs proper logic */}
                  <Button variant="outline" size="sm" disabled={postsToDisplay.length < 10}>Next</Button> 
                </nav>
              </div>
            )}
          </div>
        </section>
      )}

    </div>
  );
};

export default Blog;
