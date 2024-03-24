import { Icon } from '@webbo-ui/icon';
import { LinkIndicator } from './link-indicator';

const styles = {
  h1: 'text-2xl',
  h2: 'text-xl',
  h3: 'text-lg',
  h4: 'text-md',
  h5: 'text-base',
  h6: 'text-sm',
};

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
    <div className="group mb-2 mt-10 flex items-center">
      <Component
        {...props}
        data-mdx-heading
        data-depth={as.replace('h', '')}
        id={id}
        className={`scroll-mt-20 font-medium first-letter:uppercase ${styles[as]}`}
      >
        {children}
      </Component>

      <LinkIndicator id={id} />
    </div>
  );
};
