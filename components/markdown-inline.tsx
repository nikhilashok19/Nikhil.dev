import ReactMarkdown from "react-markdown";

export function MarkdownInline({ text }: { text: string }) {
  return (
    <span>
      <ReactMarkdown
        components={{
          p: ({ children }) => <>{children}</>,
          strong: ({ children }) => <strong className="font-semibold text-text">{children}</strong>,
          em: ({ children }) => <em className="italic">{children}</em>,
        }}
      >
        {text}
      </ReactMarkdown>
    </span>
  );
}
