const redirects = async () => {
  return [
    // redirect getting-started
    ...[
      {
        source: '/',
        destination: '/getting-started/introduction',
        permanent: true,
      },
      {
        source: '/intro',
        destination: '/getting-started/introduction',
        permanent: true,
      },
      {
        source: '/introduction',
        destination: '/getting-started/introduction',
        permanent: true,
      },
      {
        source: '/install',
        destination: '/getting-started/installation',
        permanent: true,
      },
      {
        source: '/installation',
        destination: '/getting-started/installation',
        permanent: true,
      },
    ],

    // redirect component
    ...[
      {
        source: '/combobox',
        destination: '/components/combobox',
        permanent: true,
      },
      {
        source: '/button',
        destination: '/components/button',
        permanent: true,
      },
      {
        source: '/checkbox',
        destination: '/components/checkbox',
        permanent: true,
      },
      {
        source: '/chip',
        destination: '/components/chip',
        permanent: true,
      },
      {
        source: '/input',
        destination: '/components/input',
        permanent: true,
      },
      {
        source: '/radio',
        destination: '/components/radio',
        permanent: true,
      },
      {
        source: '/select',
        destination: '/components/select',
        permanent: true,
      },
      {
        source: '/switch',
        destination: '/components/switch',
        permanent: true,
      },
      {
        source: '/toggle button',
        destination: '/components/toggle-button',
        permanent: true,
      },

      {
        source: '/alert',
        destination: '/components/alert',
        permanent: true,
      },
      {
        source: '/alert dialog',
        destination: '/components/alert-dialog',
        permanent: true,
      },
      {
        source: '/overlay',
        destination: '/components/overlay',
        permanent: true,
      },
      {
        source: '/skeleton',
        destination: '/components/skeleton',
        permanent: true,
      },

      {
        source: '/menu',
        destination: '/components/menu',
        permanent: true,
      },
      {
        source: '/pagination',
        destination: '/components/pagination',
        permanent: true,
      },

      {
        source: '/badge',
        destination: '/components/badge',
        permanent: true,
      },
      {
        source: '/dialog',
        destination: '/components/dialog',
        permanent: true,
      },
      {
        source: '/popover',
        destination: '/components/popover',
        permanent: true,
      },
      {
        source: '/table',
        destination: '/components/table',
        permanent: true,
      },
      {
        source: '/tooltip',
        destination: '/components/tooltip',
        permanent: true,
      },

      {
        source: '/accordion',
        destination: '/components/accordion',
        permanent: true,
      },
      {
        source: '/disclosure',
        destination: '/components/disclosure',
        permanent: true,
      },

      {
        source: '/focus trap',
        destination: '/components/focus-trap',
        permanent: true,
      },
      {
        source: '/popper',
        destination: '/components/popper',
        permanent: true,
      },
      {
        source: '/slot',
        destination: '/components/slot',
        permanent: true,
      },
      {
        source: '/visually hidden',
        destination: '/components/visually-hidden',
        permanent: true,
      },
    ],
  ];
};

module.exports = redirects;
