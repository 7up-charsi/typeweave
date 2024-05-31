import { CopyCode } from '@/components/copy-code';
import { LandingNavbar } from '@/components/landing-navbar';

const Page = () => {
  return (
    <>
      <LandingNavbar />

      <h1 className="mt-10 text-center text-4xl font-medium text-primary-11">
        Develop with Confidence
      </h1>

      <p className="mx-auto mt-5 w-full max-w-md text-center text-lg">
        Develop <span className="font-medium">W3C-compliant</span>{' '}
        websites effortlessly with{' '}
        <span className="font-medium">React TypeScript</span> UI
        components featuring{' '}
        <span className="font-medium">TailwindCSS</span>{' '}
        customization.
      </p>

      <div className="mx-auto mt-5 flex w-full max-w-md flex-col items-center justify-center divide-y rounded border border-muted-6">
        {['pnpm add', 'npm install', 'yarn add'].map((pm) => (
          <pre className="group relative h-12 w-full content-center overflow-auto px-3">
            <code>$ {pm} @typeweave/react @typeweave/theme</code>

            <CopyCode
              code={`${pm} @typeweave/react @typeweave/theme`}
              className="absolute right-3 top-1/2 -translate-y-1/2 lg:hidden lg:group-hover:flex"
            />
          </pre>
        ))}
      </div>
    </>
  );
};

export default Page;
