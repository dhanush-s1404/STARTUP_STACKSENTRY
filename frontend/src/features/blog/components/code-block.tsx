"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

type CodeBlockProps = {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
};

export function CodeBlock({ code, language = "typescript", showLineNumbers = false }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.trim().split("\n");

  return (
    <div className="group relative my-6 rounded-xl border border-white/[0.06] bg-black/50 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/[0.06] bg-white/[0.02]">
        <span className="text-xs text-white/40 font-mono">{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-white/40 hover:text-white/70 hover:bg-white/[0.06] transition-all"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <div className="overflow-x-auto p-4">
        <pre className="font-mono text-sm leading-relaxed">
          {lines.map((line, i) => (
            <div key={i} className="flex">
              {showLineNumbers && (
                <span className="select-none text-white/20 w-8 text-right mr-4 shrink-0">
                  {i + 1}
                </span>
              )}
              <code className="text-white/80 whitespace-pre">{line}</code>
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}
