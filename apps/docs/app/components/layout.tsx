interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return <div className="flex pt-16"> {children}</div>;
};

export default Layout;
