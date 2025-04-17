import Prism from "prismjs";

// Import Prism core styles - we'll handle this with CSS
// Import languages
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-css";
import "prismjs/components/prism-scss";
import "prismjs/components/prism-rust";
import "prismjs/components/prism-solidity";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-json";
import "prismjs/components/prism-markdown";
import "prismjs/components/prism-yaml";
import "prismjs/components/prism-python";

export const highlightCode = (code: string, language: string): string => {
  try {
    // Use the specified language or default to markup
    const lang = Prism.languages[language] || Prism.languages.markup;
    return Prism.highlight(code, lang, language);
  } catch (error) {
    console.error("Error highlighting code:", error);
    return code;
  }
};

export default Prism;
