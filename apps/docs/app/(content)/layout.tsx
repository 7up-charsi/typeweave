import Sidebar from '@/components/Sidebar';

interface Props {
  children: React.ReactNode;
}

const layout = ({ children }: Props) => {
  return (
    <div className="grow flex px-12">
      <Sidebar />
      <main className="grow overflow-auto relative">{children}</main>
    </div>
  );
};

export default layout;
