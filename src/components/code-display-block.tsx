"use client";
import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";
import React from "react";
import { CodeBlock, dracula, github } from "react-code-blocks";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useTheme } from "next-themes";

interface CodeDisplayBlockProps {
  code: string;
  lang: string;
}

export default function CodeDisplayBlock({
  code,
  lang,
}: CodeDisplayBlockProps) {
  const [isCopied, setIsCopied] = React.useState(false);
  const { theme } = useTheme();

  const copyToClipboard = () => {
    // Copy only the code, not the language label
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    toast.success("Code copied to clipboard!");
    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };

  return (
    <div className="relative bg-black-100 dark:bg-black rounded-md overflow-hidden border border-gray-300 dark:border-black">
      {/* Top bar with language label and copy button */}
      <div className="flex items-center justify-between bg-black dark:bg-black p-2 text-sm font-medium text-gray-700 dark:text-gray-300 border-b border-gray-300 dark:border-gray-700">
        <span className="ml-2">{lang.toUpperCase()}</span>
        <Button
          onClick={copyToClipboard}
          variant="ghost"
          size="icon"
          className="h-5 w-5"
        >
          {isCopied ? (
            <CheckIcon className="w-4 h-4 text-green-500" />
          ) : (
            <CopyIcon className="w-4 h-4 text-gray-500" />
          )}
        </Button>
      </div>

      {/* Code block */}
      <div className="p-2">
        <CodeBlock
          customStyle={{
            background: theme === "dark" ? "#000000" : "#fcfcfc",
            fontFamily: "'Fira Code', monospace",
            fontSize: "14px",
            padding: "10px",
            minHeight: "100px",
          }}
          text={code}
          language={lang} // Correctly specify the language for syntax highlighting
          showLineNumbers={false}
          theme={theme === "dark" ? dracula : github}
        />
      </div>
    </div>
  );
}
