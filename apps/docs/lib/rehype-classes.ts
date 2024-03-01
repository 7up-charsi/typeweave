import { visit } from 'unist-util-visit';

export const rehypeClasses = () => (tree: any) => {
  visit(tree, 'element', function (node, _, parent) {
    if (node.tagName !== 'code' || !parent) return;

    const prefix = 'language-';

    // inline code
    if (parent.tagName !== 'pre') {
      const lang = prefix + 'txt';
      node.properties['data-lang'] = lang.replace(prefix, '');
      node.properties['data-inline'] = true;

      if (!node.properties.className) {
        node.properties.className = [lang];
      } else if (Array.isArray(node.properties.className)) {
        node.properties.className.push(lang);
      }

      return;
    }

    const classNames = node.properties.className;
    if (!Array.isArray(classNames)) return;

    // block code
    if (parent.tagName === 'pre') {
      const lang = classNames.find((cls) => cls.includes(prefix));
      node.properties['data-lang'] = lang.replace(prefix, '');

      if (!parent.properties.className) {
        parent.properties.className = [lang];
      } else if (Array.isArray(parent.properties.className)) {
        parent.properties.className.push(lang);
      }
    }
  });
};
