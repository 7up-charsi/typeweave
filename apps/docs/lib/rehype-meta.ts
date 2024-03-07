import { visit } from 'unist-util-visit';

export const rehypeMeta = () => (tree: any) => {
  visit(tree, 'element', (node, _, parent) => {
    if (node.tagName !== 'code' || !parent || parent.tagName !== 'pre') return;

    node.properties.meta = node.data?.meta;
  });
};
