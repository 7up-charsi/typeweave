import { Heading } from './types';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import GithubSlugger from 'github-slugger';

// i used github-slugger coz rehype-slug uses it. rehype-slug is used to add ids on html headings
const slugger = new GithubSlugger();

export const getHeadings = async (content: string) => {
  slugger.reset();

  const tree = unified().use(remarkParse).parse(content);

  const headings = tree.children.map((ele) => {
    if (ele.type !== 'heading') return false;

    const value = ele.children[0].type === 'text' ? ele.children[0].value : '';

    return { depth: ele.depth, text: value, id: slugger.slug(value) };
  });

  return headings.filter(Boolean) as Heading[];
};
