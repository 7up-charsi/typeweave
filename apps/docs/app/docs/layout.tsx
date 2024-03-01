import { Sidebar } from '@/components/sidebar';
import { Toc } from '@/components/toc';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="pt-16 grid grid-cols-[256px,_1fr_minmax(210px,230px)]">
      <Sidebar />
      {children}
      <Toc />
    </div>
  );
};

export default Layout;
