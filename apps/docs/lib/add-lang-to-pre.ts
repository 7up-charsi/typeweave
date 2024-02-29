import { visit } from 'unist-util-visit';

export const addLangToPre = () => (tree: any) => {
  visit(tree, 'element', function (node, _, parent) {
    if (node.tagName !== 'code' || !parent || parent.tagName !== 'pre') {
      return;
    }

    const classNames = node.properties.className;

    if (!Array.isArray(classNames)) return;

    const baseClassName = 'language-';
    const lang = classNames.find((cls) => cls.includes(baseClassName));
    node.properties['data-lang'] = lang.replace(baseClassName, '');

    if (!parent.properties.className) {
      parent.properties.className = [lang];
    } else if (Array.isArray(parent.properties.className)) {
      parent.properties.className.push(lang);
    }
  });
};
