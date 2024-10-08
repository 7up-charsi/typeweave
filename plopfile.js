const capitalize = (/** @type {string} */ str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const camelCase = (/** @type {string} */ str) => {
  return str.replace(/[-_](\w)/g, (_, c) => c.toUpperCase());
};

module.exports = function main(
  /** @type {import('plop').NodePlopAPI} */
  plop,
) {
  plop.setHelper('capitalize', (text) => capitalize(camelCase(text)));

  plop.setHelper('camelCase', camelCase);

  plop.setGenerator('Package', {
    description: 'Generates a package',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Package name :',
        validate: (value) => {
          if (!value) return 'Package name is required';

          if (/[A-Z]+/.test(value)) return 'Package name must be in lowercase';

          if (/\s+/.test(value)) return 'Package name cannot have spaces';

          return true;
        },
      },
      {
        type: 'input',
        name: 'description',
        message: 'The description of this package',
      },
    ],
    actions(data) {
      return [
        {
          type: 'addMany',
          templateFiles: 'plop/package/**',
          destination: './packages/{{dashCase name}}',
          base: 'plop/package',
          data,
        },
      ];
    },
  });
};
