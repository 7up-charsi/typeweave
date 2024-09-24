interface LayoutProps {
  children?: React.ReactNode;
}

export const generateStaticParams = () => {
  return [{ dir: 'getting-started' }, { dir: 'components' }];
};

export default function Layout(props: LayoutProps) {
  const { children } = props;

  return <>{children}</>;
}
