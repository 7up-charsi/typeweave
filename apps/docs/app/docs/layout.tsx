import { Sidebar } from '@/components/sidebar';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="pt-16 flex">
      <Sidebar />
      <div className="grow">{children}</div>
    </div>
  );
};

export default Layout;
