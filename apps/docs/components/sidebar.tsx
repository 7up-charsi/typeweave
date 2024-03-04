import { SidebarLink } from './sidebar-link';
import { customizationLinks } from '@/config/customization-links';
import { guidesLinks } from '@/config/guides-links';
import { componentsLinks } from '@/config/components-links';

const navHeadingStyles = 'h-8 inline-flex items-center capitalize font-medium';

export const Sidebar = () => {
  return (
    <aside className="w-72 fixed top-16 h-[calc(100vh-theme(spacing.16))] pr-5 pl-12 overflow-auto border-r border-r-muted-6 py-5 flex flex-col gap-3">
      <nav className="flex flex-col gap-1">
        <h2 className={navHeadingStyles}>guides</h2>

        {guidesLinks.map(({ title, href }, i) => (
          <SidebarLink key={i} href={href} title={title} />
        ))}
      </nav>

      <nav className="flex flex-col gap-1">
        <h2 className={navHeadingStyles}>customization</h2>

        {customizationLinks.map(({ title, href }, i) => (
          <SidebarLink key={i} href={href} title={title} />
        ))}
      </nav>

      <nav className="flex flex-col gap-1">
        <h2 className={navHeadingStyles}>components</h2>

        {componentsLinks.map(({ title, href }, i) => (
          <SidebarLink key={i} href={href} title={title} />
        ))}
      </nav>
    </aside>
  );
};
