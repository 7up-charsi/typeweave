const HeadingLink = ({
  as,
  children,
  id,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement> & {
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}) => {
  const Component = as;

  return (
    <div className="mb-2 flex items-center group">
      <Component
        {...props}
        id={id}
        className="scroll-mt-20 text-xl text-muted-11 dark:text-mutedDark-11 font-medium first-letter:uppercase"
      >
        {children}
      </Component>
      <a href={`#${id}`} className="ml-4 hidden group-hover:flex">
        <div className="inline-flex items-center justify-center w-7 h-5 text-primary-11 rounded bg-primary-3 hover:bg-primary-4 cursor-pointer dark:text-primaryDark-11 dark:bg-primaryDark-3 dark:hover:bg-primaryDark-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            width={15}
            height={15}
          >
            <g stroke="#1C274C" strokeLinecap="round" strokeWidth="1.5">
              <path d="M9 12h6M9 18H8A6 6 0 018 6h1M15 6h1a6 6 0 016 6m-7 6h1a5.973 5.973 0 003.318-1"></path>
            </g>
          </svg>
        </div>
      </a>
    </div>
  );
};

export default HeadingLink;
