export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: 'typeweave',
  solang:
    'Streamlining UI Development with TypeScript and Tailwind CSS',
  description:
    "TypeWeave streamlines UI development by providing robust TypeScript React components and efficient Tailwind CSS theming. My packages, @typeweave/react and @typeweave/plugin, enable developers to build maintainable, visually appealing applications quickly and easily. Enhance your development workflow with TypeWeave's powerful, type-safe, and beautifully styled solutions.",
  ogImage: `${process.env.NEXT_PUBLIC_SITE_URL}/og.png`,
  author: 'muhammad zeeshan',
  email: '7up.charsi@gmail.com',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
};
