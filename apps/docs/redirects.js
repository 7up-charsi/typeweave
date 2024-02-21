async function redirect() {
  return [
    {
      source: '/docs',
      destination: '/docs/guide/introduction',
      permanent: true,
    },
  ];
}

module.exports = redirect;
