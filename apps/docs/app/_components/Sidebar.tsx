import SidebarLink from './SidebarLink';

const docsLinks = [
  {
    title: 'introduction',
    href: '/docs/introduction',
  },
  {
    title: 'installation',
    href: '/docs/installation',
  },
  {
    title: 'theming',
    href: '/docs/theming',
  },
  {
    title: 'dark mode',
    href: '/docs/dark-mode',
  },
];

const componentsLinks = [
  {
    title: 'alert',
    href: '/components/alert',
  },
  {
    title: 'alert dialog',
    href: '/components/alert-dialog',
  },
];

const navHeadingStyles =
  'h-8 inline-flex items-center capitalize font-medium text-muted-11 dark:text-mutedDark-11';

function Sidebar() {
  return (
    <aside className="w-52 border-r border-r-muted-6 dark:border-r-mutedDark-6 pr-5">
      <nav className="flex flex-col gap-1 mt-5">
        <h2 className={navHeadingStyles}>getting started</h2>

        {docsLinks.map(({ title, href }, i) => (
          <SidebarLink key={i} href={href} title={title} />
        ))}
      </nav>

      <nav className="flex flex-col gap-1 mt-5">
        <h2 className={navHeadingStyles}>components</h2>

        {componentsLinks.map(({ title, href }, i) => (
          <SidebarLink key={i} href={href} title={title} />
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
