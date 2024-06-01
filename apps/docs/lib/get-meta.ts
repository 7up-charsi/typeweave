import grayMatter from 'gray-matter';

export const getMeta = (markdown: string) => {
  const { data } = grayMatter(markdown);

  return {
    title: data.title,
    description: data.description,
  };
};
