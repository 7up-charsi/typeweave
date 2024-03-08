import { Highlight } from './highlight';

interface Props {
  children?: React.ReactNode;
}

export const StylePaths = (props: Props) => {
  const { children } = props;

  return (
    <>
      <p>
        Copy and paste these <Highlight>style paths</Highlight> in{' '}
        <Highlight>tailwind.config.js</Highlight> content array
      </p>
      {children}
    </>
  );
};
