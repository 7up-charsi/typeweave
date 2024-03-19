interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="col-start-2 grid grid-cols-[_1fr_theme(spacing.60)]">{children}</div>
  );
};

export default Layout;
