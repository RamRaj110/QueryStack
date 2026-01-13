"use client";

import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  linkPlugin,
  linkDialogPlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
  tablePlugin,
  imagePlugin,
  toolbarPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  BlockTypeSelect,
  CodeToggle,
  CreateLink,
  InsertImage,
  InsertTable,
  InsertCodeBlock,
  ListsToggle,
} from "@mdxeditor/editor";
import "./darkEditor.css";
import "@mdxeditor/editor/style.css";
import { useTheme } from "next-themes";
import React, { useState, useEffect } from "react";
import { basicDark } from "cm6-theme-basic-dark";

// --- Types ---
interface EditorProps {
  value: string;
  fieldChange: (value: string) => void;
  editorRef?: React.MutableRefObject<any>;
}

const Editor = ({ value, fieldChange, editorRef }: EditorProps) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Conditionally load the dark theme extension for CodeMirror
  const themeExtensions = resolvedTheme === "dark" ? [basicDark] : [];

  // Prevent rendering until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="w-full min-h-[400px] rounded-xl border border-border/50 bg-secondary/10 animate-pulse flex items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading editor...</p>
      </div>
    );
  }

  try {
    return (
      <div className="relative w-full">
        <MDXEditor
          ref={editorRef}
          markdown={value || ""}
          onChange={(newValue) => {
            try {
              fieldChange(newValue);
            } catch (error) {
              console.error("Error updating editor content:", error);
            }
          }}
          className={`markdown-editor w-full ${
            resolvedTheme === "dark" ? "dark-theme" : ""
          }`}
          contentEditableClassName="prose dark:prose-invert max-w-none min-h-[400px] p-4 focus:outline-none"
          plugins={[
            headingsPlugin(),
            listsPlugin(),
            quotePlugin(),
            thematicBreakPlugin(),
            markdownShortcutPlugin(),
            linkPlugin(),
            linkDialogPlugin(),
            imagePlugin(),
            tablePlugin(),
            codeBlockPlugin({ defaultCodeBlockLanguage: "js" }),
            codeMirrorPlugin({
              codeBlockLanguages: {
                js: "JavaScript",
                ts: "TypeScript",
                tsx: "TypeScript (JSX)",
                jsx: "JavaScript (JSX)",
                css: "CSS",
                html: "HTML",
                python: "Python",
                java: "Java",
                cpp: "C++",
                c: "C",
                go: "Go",
                rust: "Rust",
                php: "PHP",
                ruby: "Ruby",
                swift: "Swift",
                kotlin: "Kotlin",
                json: "JSON",
                yaml: "YAML",
                sql: "SQL",
                bash: "Bash",
                powershell: "PowerShell",
              },
              codeMirrorExtensions: themeExtensions,
            }),
            toolbarPlugin({
              toolbarContents: () => (
                <div className="flex flex-wrap items-center gap-1 p-2 bg-secondary/20 rounded-t-xl border-b border-border/50">
                  <UndoRedo />
                  <div className="mx-2 h-6 w-[1px] bg-border" />
                  <BoldItalicUnderlineToggles />
                  <CodeToggle />
                  <div className="mx-2 h-6 w-[1px] bg-border" />
                  <ListsToggle />
                  <BlockTypeSelect />
                  <div className="mx-2 h-6 w-[1px] bg-border" />
                  <CreateLink />
                  <InsertImage />
                  <InsertTable />
                  <InsertCodeBlock />
                </div>
              ),
            }),
          ]}
        />
      </div>
    );
  } catch (error) {
    console.error("Error rendering MDX Editor:", error);
    return (
      <div className="w-full min-h-[400px] rounded-xl border-2 border-destructive/50 bg-destructive/5 p-6 flex flex-col items-center justify-center gap-4">
        <div className="text-center">
          <p className="text-destructive font-bold text-lg mb-2">
            Editor Error
          </p>
          <p className="text-sm text-muted-foreground max-w-md">
            There was a problem loading the editor. Please refresh the page or
            try again later.
          </p>
        </div>
        <details className="mt-4 p-4 bg-secondary/20 rounded-lg max-w-2xl w-full">
          <summary className="cursor-pointer text-sm font-semibold text-foreground mb-2">
            Technical Details
          </summary>
          <pre className="text-xs text-muted-foreground overflow-auto">
            {error instanceof Error ? error.message : String(error)}
          </pre>
        </details>
      </div>
    );
  }
};

export default Editor;
