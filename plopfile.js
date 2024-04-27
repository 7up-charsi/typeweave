const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const camelCase = (str) => {
  return str.replace(/[-_](\w)/g, (_, c) => c.toUpperCase());
};

const generators = ['package', 'component-docs'];

const defaultOutDirs = {
  package: './',
};

module.exports = function main(
  /** @type {import('plop').NodePlopAPI} */
  plop,
) {
  plop.setHelper('capitalize', (text) => {
    return capitalize(camelCase(text));
  });
  plop.setHelper('camelCase', camelCase);

  generators.forEach((gen) => {
    plop.setGenerator(gen, {
      description: `Generates a ${gen}`,
      prompts: [
        {
          type: 'input',
          name: 'name',
          message: `Enter ${gen} name :`,

          validate: (value) => {
            if (!value) return `${gen} name is required`;

            // check is case is correct
            if (value !== value.toLowerCase())
              return `${gen} name must be in lowercase`;

            // cannot have spaces
            if (value.includes(' ')) return `${gen} name cannot have spaces`;

            return true;
          },
        },
        {
          type: 'input',
          name: 'description',
          message: `The description of this ${gen} :`,
        },
      ],
      actions(answers) {
        const actions = [];

        if (!answers) return actions;

        if (gen === 'component-docs') {
          actions.push(
            // demo
            {
              type: 'add',
              templateFile: `plop/${gen}/demo.tsx.hbs`,
              path: `./apps/docs/components/demos/{{dashCase name}}.tsx`,
              base: `plop/${gen}`,
              abortOnFail: true,
            },

            // export demo from index.ts
            {
              type: 'append',
              path: `./apps/docs/components/demos/index.ts`,
              template:
                "export { default as {{capitalize name}}Demo } from './{{dashCase name}}';",
            },

            // content
            {
              type: 'addMany',
              templateFiles: `plop/${gen}/content/**`,
              destination: `./apps/docs/content/docs/components/{{dashCase name}}`,
              base: `plop/${gen}/content`,
              abortOnFail: true,
            },
          );

          return actions;
        }

        const data = {
          outDir: defaultOutDirs[gen],
        };

        actions.push({
          type: 'addMany',
          templateFiles: `plop/${gen}/**`,
          destination: `./packages/{{outDir}}/{{dashCase name}}`,
          base: `plop/${gen}`,
          data,
          abortOnFail: true,
        });

        return actions;
      },
    });
  });
};
