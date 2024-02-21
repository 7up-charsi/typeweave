interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return <div className="pt-16 flex"> {children}</div>;
};

export default Layout;
