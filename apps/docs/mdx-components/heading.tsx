import { Link2Icon } from 'lucide-react';

interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  as: `h${1 | 2 | 3}`;
}

export const Heading = (props: HeadingProps) => {
  const { as = 'h1', children, id, ...restProps } = props;

  const Component = as;

  return (
    <Component
      {...restProps}
      id={id}
      data-mdx-heading
      data-depth={as.replace('h', '')}
      className="group scroll-mt-20"
    >
      {children}

      <a
        tabIndex={-1}
        href={`#${id}`}
        className="ml-2 hidden cursor-pointer rounded border border-muted-6 bg-muted-3 px-1 py-px text-muted-11 hover:border-primary-6 hover:bg-primary-4 hover:text-primary-11 active:bg-primary-5 group-hover:inline-block"
      >
        <Link2Icon size={14} />
      </a>
    </Component>
  );
};
