const redirects = async () => {
  return [
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

    // redirect guides
    ...[
      {
        source: '/intro',
        destination: '/guides/introduction',
        permanent: true,
      },
      {
        source: '/introduction',
        destination: '/guides/introduction',
        permanent: true,
      },
      {
        source: '/install',
        destination: '/guides/installation',
        permanent: true,
      },
      {
        source: '/installation',
        destination: '/guides/installation',
        permanent: true,
      },
    ],

    // redirect customization
    ...[
      {
        source: '/theme',
        destination: '/customization/theme',
        permanent: true,
      },
      {
        source: '/dark-mode',
        destination: '/customization/dark-mode',
        permanent: true,
      },
    ],
  ];
};

module.exports = redirects;
