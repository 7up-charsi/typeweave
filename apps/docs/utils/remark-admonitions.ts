import { h } from 'hastscript';
import { visit } from 'unist-util-visit';

export const remarkAdmonitions = () => {
  // @ts-ignore
  return (tree) => {
    visit(tree, (node) => {
      if (
        node.type !== 'containerDirective' &&
        (node.name !== 'warning' ||
          node.name !== 'note' ||
          node.name !== 'alert' ||
          node.name !== 'info')
      )
        return;

      const heading = h(
        'p',
        { class: 'admonitionHeading' },
        'warning',
      );

      // dont know why but without data it renders `div` instead of `p`
      heading.data = {
        // @ts-ignore
        hName: 'p',
        hProperties: heading.properties,
      };

      const hast = h(
        'aside',
        {
          class: `not-prose native-pre admonition ${node.name}`,
        },
        heading,
        ...node.children,
      );

      // dont know why but without data it renders `div` instead of `aside`
      node.data = {
        hName: 'aside',
        hProperties: hast.properties,
      };

      node.children = hast.children;
    });
  };
};
