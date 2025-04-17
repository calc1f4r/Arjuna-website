import React, { useEffect, useRef } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import Prism from "@/lib/prism";

interface CodeBlockProps {
  language: string;
  code: string;
  fileName?: string;
  showLineNumbers?: boolean;
  className?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  language,
  code,
  fileName,
  showLineNumbers = true,
  className,
}) => {
  const [copied, setCopied] = React.useState(false);
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [code, language]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderLineNumbers = () => {
    const lines = code.split("\n");
    return (
      <div className="select-none text-right mr-5 text-muted-foreground/40 text-xs font-mono">
        {lines.map((_, i) => (
          <div key={i} className="leading-relaxed">
            {i + 1}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div
      className={cn(
        "rounded-lg overflow-hidden my-8 shadow-lg shadow-black/5 border border-border/20",
        className,
      )}
    >
      {fileName && (
        <div className="px-5 py-3 bg-secondary/60 border-b border-border/40 text-sm text-muted-foreground flex items-center justify-between">
          <div className="flex items-center">
            <span className="font-mono text-xs tracking-tight">{fileName}</span>
            <div className="ml-3 px-2 py-0.5 rounded-md text-xs bg-primary/20 text-primary font-medium">
              {language}
            </div>
          </div>
          <button
            onClick={copyToClipboard}
            className="p-1.5 rounded hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground focus:outline-none focus:ring-1 focus:ring-primary/40"
            aria-label="Copy code"
          >
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        </div>
      )}

      <div className="relative bg-secondary/40 backdrop-blur-sm">
        {!fileName && (
          <div className="absolute right-3 top-3 z-10">
            <button
              onClick={copyToClipboard}
              className="p-1.5 rounded-md bg-secondary/80 backdrop-blur-sm hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground focus:outline-none focus:ring-1 focus:ring-primary/40"
              aria-label="Copy code"
            >
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
          </div>
        )}

        <div className="p-5 pt-6 pb-5 overflow-x-auto font-mono text-sm flex">
          {showLineNumbers && renderLineNumbers()}
          <pre className={`flex-1 overflow-visible`}>
            <code
              ref={codeRef}
              className={`language-${language} leading-relaxed`}
            >
              {code}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default CodeBlock;
