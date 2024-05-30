const redirects = async () => {
  return [
    {
      source: '/docs',
      destination: '/docs/guide/introduction',
      permanent: true,
    },
  ];
};

module.exports = redirects;
