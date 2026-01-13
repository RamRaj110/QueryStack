import React from "react";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { Code } from "bright";
import { AlertCircle, FileText } from "lucide-react";
import "./codeBlock.css";

// Configure Bright theme for VSCode-like appearance
Code.theme = {
  light: "github-light",
  dark: "github-dark",
  lightSelector: "html.light",
  darkSelector: "html.dark",
};

// Custom code block component wrapper
const CodeBlock = ({ children, ...props }: any) => {
  return (
    <div className="not-prose my-4 rounded-xl overflow-hidden border border-border/40 shadow-sm">
      <Code {...props}>{children}</Code>
    </div>
  );
};

// Custom inline code component
const InlineCode = ({ children }: any) => {
  return (
    <code className="px-1.5 py-0.5 rounded bg-secondary/80 text-primary font-mono text-sm border border-border/30">
      {children}
    </code>
  );
};

interface Props {
  content: string;
}

function sanitizeForMDX(content: string): string {
  if (!content) return "";

  try {
    const codeBlockRegex = /(```[\s\S]*?```|`[^`\n]+`)/g;
    const parts = content.split(codeBlockRegex);

    return parts
      .map((part, index) => {
        // Don't sanitize code blocks (odd indices)
        if (index % 2 === 1) return part;

        return part
          .replace(/\{/g, "\\{")
          .replace(/\}/g, "\\}")
          .replace(/^import\s/gm, "\\import ")
          .replace(/^export\s/gm, "\\export ")
          .replace(/<(?![a-z]+;)/gi, "\\<");
      })
      .join("");
  } catch (error) {
    console.error("Sanitization error:", error);
    return content;
  }
}

const Preview = async ({ content }: Props) => {
  // Handle empty content
  if (!content?.trim()) {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-border/40 bg-secondary/20 p-6">
        <FileText className="h-5 w-5 text-muted-foreground" />
        <p className="text-sm text-muted-foreground italic">
          No content to preview. Start typing to see your content here.
        </p>
      </div>
    );
  }

  try {
    const sanitizedContent = sanitizeForMDX(content);

    const { content: MDXContent } = await compileMDX({
      source: sanitizedContent,
      options: {
        parseFrontmatter: false,
        mdxOptions: {
          format: "md",
          remarkPlugins: [remarkGfm],
        },
      },
      components: {
        // Code blocks with syntax highlighting
        pre: ({ children }: any) => {
          // Extract code element from pre
          const codeElement = React.Children.toArray(children).find(
            (child: any) => child?.type === "code"
          );

          if (
            codeElement &&
            React.isValidElement<{
              className?: string;
              children?: React.ReactNode;
            }>(codeElement)
          ) {
            const { className, children: codeChildren } = codeElement.props;
            const language = className?.replace("language-", "") || "text";

            return (
              <CodeBlock lang={language} className="my-6">
                {codeChildren}
              </CodeBlock>
            );
          }

          return <pre className="overflow-auto">{children}</pre>;
        },
        // Inline code
        code: ({ children, className }: any) => {
          // If it has a language class, it's a block (handled by pre)
          if (className?.startsWith("language-")) {
            return <code className={className}>{children}</code>;
          }
          // Otherwise it's inline code
          return <InlineCode>{children}</InlineCode>;
        },
      },
    });

    return (
      <article className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-pre:p-0 prose-pre:bg-transparent prose-pre:border-0 prose-img:rounded-xl prose-img:border prose-img:border-border/40 prose-blockquote:border-l-primary prose-blockquote:border-l-4 prose-blockquote:bg-secondary/20 prose-blockquote:py-1">
        {MDXContent}
      </article>
    );
  } catch (error) {
    console.error("=== MDX Compilation Error ===");
    console.error("Error:", error);
    console.error("Content preview:", content.substring(0, 300));

    return (
      <div className="rounded-xl border-2 border-destructive/50 bg-destructive/5 p-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
          <div className="flex-1 space-y-3">
            <div>
              <p className="font-bold text-destructive text-base mb-1">
                Content Rendering Error
              </p>
              <p className="text-sm text-muted-foreground">
                There was an issue rendering your content. This might be due to
                invalid markdown syntax or special characters.
              </p>
            </div>

            <details className="group">
              <summary className="cursor-pointer text-sm font-semibold text-foreground hover:text-primary transition-colors duration-300 select-none">
                View technical details →
              </summary>
              <div className="mt-3 rounded-lg bg-secondary/40 p-4 border border-border/40">
                <p className="text-xs font-semibold text-foreground mb-2">
                  Error Message:
                </p>
                <pre className="text-xs text-muted-foreground overflow-auto max-h-32 bg-background/50 p-3 rounded border border-border/30">
                  {error instanceof Error ? error.message : String(error)}
                </pre>
                {error instanceof Error && error.stack && (
                  <>
                    <p className="text-xs font-semibold text-foreground mb-2 mt-3">
                      Stack Trace:
                    </p>
                    <pre className="text-xs text-muted-foreground overflow-auto max-h-32 bg-background/50 p-3 rounded border border-border/30">
                      {error.stack}
                    </pre>
                  </>
                )}
              </div>
            </details>

            <div className="rounded-lg bg-secondary/20 p-4 border border-border/30">
              <p className="text-xs font-semibold text-foreground mb-2">
                Troubleshooting Tips:
              </p>
              <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                <li>Check for unmatched brackets or braces</li>
                <li>Ensure code blocks are properly closed with ```</li>
                <li>Verify that HTML tags are properly formatted</li>
                <li>Remove or escape special characters like {"{ } < >"}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Preview;
