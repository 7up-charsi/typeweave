import { Sidebar } from '@/components/sidebar';
import { Toc } from '@/components/toc';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="pt-16 grid grid-cols-[theme(spacing.72),_1fr_theme(spacing.60)]">
      <Sidebar />
      {children}
    </div>
  );
};

export default Layout;
