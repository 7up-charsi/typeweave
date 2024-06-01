import { NavigationLink } from '@/lib/types';
import { componentsLinks } from './components-links';

export const componentsApiLinks: NavigationLink[] = Object.values(
  componentsLinks,
)
  .flat()
  .sort((a, b) =>
    a.title[0].toLowerCase().localeCompare(b.title[0].toLowerCase()),
  )
  .map((ele) => ({
    ...ele,
    href: ele.href.replace('/components/', '/api/'),
  }));
