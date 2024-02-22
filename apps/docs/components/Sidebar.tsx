import SidebarLink from './SidebarLink';
import { componentsLinks } from '@/config/componentsLinks';
import { docsLinks } from '@/config/docsLinks';

const navHeadingStyles =
  'h-8 inline-flex items-center capitalize font-medium text-muted-11 dark:text-mutedDark-11';

function Sidebar() {
  return (
    <div className="w-64 relative shrink-0">
      <aside className="w-64 fixed h-full border-r border-r-muted-6 dark:border-r-mutedDark-6 pr-5 pl-12 overflow-auto">
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
    </div>
  );
}

export default Sidebar;
