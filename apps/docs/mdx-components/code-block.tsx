'use client';

import { Highlight, themes } from 'prism-react-renderer';

interface Props extends React.HTMLAttributes<HTMLElement> {
  meta?: string;
}

export const CodeBlock = ({ meta, className, children, ...props }: Props) => {
  const isInline = !className;

  if (isInline) {
    return (
      <code
        {...props}
        className="bg-muted-4 px-2 py-1 rounded text-muted-12 mx-1 dark:bg-mutedDark-4 dark:text-mutedDark-12"
      >
        {children}
      </code>
    );
  }

  return (
    <Highlight theme={themes.okaidia} code={children as string} language="tsx">
      {({ className, style, tokens, getLineProps, getTokenProps }) => {
        return (
          <code
            {...props}
            className={`${className} block rounded p-2`}
            style={style}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                <span className="inline-block w-14 text-right pr-6 select-none text-muted-9">
                  {i + 1}
                </span>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </code>
        );
      }}
    </Highlight>
  );
};
