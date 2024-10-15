'use client';

import { usePathname } from 'next/navigation';
import { Link2Icon } from 'lucide-react';
import { clearTimeout } from 'timers';
import React from 'react';

interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  as: `h${1 | 2 | 3}`;
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const Heading = (props: HeadingProps) => {
  const { as = 'h1', children, id, ...restProps } = props;

  const Component = as;

  const pathname = usePathname();

  const timerRef = React.useRef<NodeJS.Timeout>();

  const [isCopied, setIsCopied] = React.useState(false);

  React.useEffect(() => {
    return () => {
      clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <Component
      {...restProps}
      id={id}
      data-mdx-heading
      data-depth={as.replace('h', '')}
      className="group flex scroll-mt-20 items-center"
    >
      <span className="first-letter:uppercase">{children}</span>

      <button
        tabIndex={-1}
        onClick={async () => {
          if (!siteUrl) throw new Error('site url is not defined');

          const newPathname = `${siteUrl?.replace(/\/+$/, '')}${pathname}/#${id}`;

          await navigator.clipboard.writeText(newPathname);

          setIsCopied(true);

          clearTimeout(timerRef.current);

          timerRef.current = setTimeout(() => {
            setIsCopied(false);
            timerRef.current = undefined;
          }, 2000);
        }}
        className="ml-2 hidden cursor-pointer rounded px-1 py-px group-hover:block hover:bg-muted-4"
      >
        <Link2Icon size={20} />
      </button>

      {isCopied ? (
        <div className="group ml-2 hidden text-sm font-normal text-success-11 group-hover:block">
          Link copied
        </div>
      ) : null}
    </Component>
  );
};
