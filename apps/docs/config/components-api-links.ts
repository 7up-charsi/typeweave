import { NavigationLink } from '@/lib/types';
import { componentsLinks } from './components-links';

export const componentsApiLinks: NavigationLink[] = Object.values(
  componentsLinks,
)
  .flat()
  .sort()
  .map((ele) => ({ ...ele, href: ele.href.replace('components', 'api') }));
