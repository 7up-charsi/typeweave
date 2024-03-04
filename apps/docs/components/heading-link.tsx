export const HeadingLink = ({
  as = 'h1',
  children,
  id,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement> & {
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}) => {
  const Component = as;

  return (
    <div className="flex items-center group mt-10 mb-2">
      <Component
        {...props}
        data-mdx-heading
        data-depth={as.replace('h', '')}
        id={id}
        className="scroll-mt-20 text-xl font-medium first-letter:uppercase"
      >
        {children}
      </Component>
      <a href={`#${id}`} className="ml-4 hidden group-hover:flex">
        <div className="inline-flex items-center justify-center w-7 h-5 cursor-pointer rounded text-primary-11 bg-primary-3 hover:bg-primary-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            width={15}
            height={15}
          >
            <g stroke="currentColor" strokeLinecap="round" strokeWidth="1.5">
              <path d="M9 12h6M9 18H8A6 6 0 018 6h1M15 6h1a6 6 0 016 6m-7 6h1a5.973 5.973 0 003.318-1"></path>
            </g>
          </svg>
        </div>
      </a>
    </div>
  );
};
