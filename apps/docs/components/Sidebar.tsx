import { SidebarLink } from './sidebar-link';
import { componentsLinks } from '@/config/components-links';
import { guidesLinks } from '@/config/guides-links';

const navHeadingStyles =
  'h-8 inline-flex items-center capitalize font-medium text-muted-11 dark:text-mutedDark-11';

export const Sidebar = () => {
  return (
    <aside className="w-64 fixed h-full pr-5 pl-12 overflow-auto">
      <nav className="flex flex-col gap-1 mt-5">
        <h2 className={navHeadingStyles}>getting started</h2>

        {guidesLinks.map(({ title, href }, i) => (
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
};
