'use client';

interface Props {
  package?: string;
}

export const Installation = (props: Props) => {
  const { package: pkg } = props;

  return <div>{pkg}</div>;
};
