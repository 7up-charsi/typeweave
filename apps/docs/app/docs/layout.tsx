import { Sidebar } from '@/components/sidebar';
import { Toc } from '@/components/toc';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="grid grid-cols-[theme(spacing.72),_1fr_theme(spacing.60)] pt-16">
      <Sidebar />
      {children}
    </div>
  );
};

export default Layout;
