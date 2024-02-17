import Sidebar from '@/app/_components/Sidebar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grow flex px-12">
      <Sidebar />
      <main className="grow overflow-auto relative">{children}</main>
    </div>
  );
}

