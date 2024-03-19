import { Sidebar } from '@/components/sidebar';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="grid grid-cols-[theme(spacing.72),_1fr] pt-16">
      <Sidebar />
      {children}
    </div>
  );
};

export default Layout;
