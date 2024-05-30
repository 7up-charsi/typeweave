import NextLink from 'next/link';

interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

export const Link = (props: LinkProps) => {
  const className = 'text-info-11 underline underline-offset-2';

  return props.href?.startsWith('#') ? (
    <a {...props} className={className} />
  ) : (
    // @ts-expect-error ----
    <NextLink {...props} className={className} />
  );
};

Link.displayName = 'Link';
