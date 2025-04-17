import React from "react";

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return <img src="/logo.png" alt="Arjuna Logo" className={className} />;
};

export default Logo;
