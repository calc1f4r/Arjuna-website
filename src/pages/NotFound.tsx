import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    // Center content within the Layout's main area
    <div className="flex flex-col items-center justify-center flex-grow py-20">
      <div className="text-center">
        {/* Use theme colors */}
        <h1 className="text-6xl font-bold mb-4 text-primary animate-pulse">
          404
        </h1>
        <p className="text-xl text-muted-foreground mb-6">
          Oops! Page not found
        </p>
        <p className="text-sm text-muted-foreground mb-8">
          The page you tried to access ({location.pathname}) does not exist.
        </p>
        <a href="/" className="text-primary hover:underline">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
