import Link from 'next/link';

const Page = () => {
  return (
    <>
      <main className="mt-0 flex flex-col items-center px-8 text-center lg:my-20 lg:px-14">
        <h1 className="p-6 text-[length:max(48px,min(5vw,76px))] font-extrabold">
          Type it safe, Style it right.
        </h1>

        <p className="px-8 py-6 lg:px-8 lg:py-10">
          Unleash type safety & rapid UI dev. Pre-built,{' '}
          <strong>type-safe</strong> React components for effortless{' '}
          <strong>TailwindCSS</strong> integration. Write cleaner
          code, style UIs faster and ship features quicker.
        </p>

        <h2 className="mt-10 text-center text-2xl">
          Get Started Quickly
        </h2>

        <p className="mx-auto mt-10 max-w-md text-center">
          Whether you're building a small project or a large-scale
          application, Typeweave provides a comprehensive set of
          components to get you started quickly. Follow our{' '}
          <Link
            className="italic text-info-11 underline underline-offset-2"
            href="/guides/installation"
          >
            installation
          </Link>{' '}
          guide to begin.
        </p>

        <h2 className="mt-10 text-center text-2xl">Features</h2>

        <dl className="mx-auto max-w-md">
          <dt className="mb-2 font-semibold">Modular Design</dt>
          <dd className="mb-4 pl-4">
            Typeweave’s modular design allows you to pick and choose
            the components you need, making your projects lightweight
            and customizable.
          </dd>

          <dt className="mb-2 font-semibold">TailwindCSS</dt>
          <dd className="mb-4 pl-4">
            Typeweave leverage the power of TailwindCSS for styling,
            ensuring your UI components are easy to customize, and
            maintainable.
          </dd>

          <dt className="mb-2 font-semibold">TypeScript</dt>
          <dd className="mb-4 pl-4">
            Typeweave is built with TypeScript, providing strong type
            definitions and improving your development experience with
            better autocompletion and type checking.
          </dd>

          <dt className="mb-2 font-semibold">Accessibility</dt>
          <dd className="mb-4 pl-4">
            All Typeweave components are developed following W3C
            accessibility guidelines, ensuring that your applications
            are usable by everyone, including those with disabilities.
            This commitment to accessibility helps you create
            inclusive and compliant web applications.
          </dd>

          <dt className="mb-2 font-semibold">Customizable Themes</dt>
          <dd className="mb-4 pl-4">
            Typeweave components are unstyled by default, giving you
            the freedom to style them as you see fit. Use the
            @typeweave/theme package to apply our default theme or
            bring your own theme to match your brand's identity.
          </dd>

          <dt className="mb-2 font-semibold">Developer Friendly</dt>
          <dd className="mb-4 pl-4">
            Typeweave is designed with developers in mind. All
            components are easy to use and integrate seamlessly into
            your projects. With comprehensive documentation and a
            focus on simplicity, you'll be up and running in no time.
          </dd>

          <dt className="mb-2 font-semibold">Robust Components</dt>
          <dd className="pl-4">
            TypeWeave provides a variety of components to meet your
            needs, from buttons to modals, without any unnecessary
            extras.
          </dd>
        </dl>

        {/* <div className="mx-auto mt-5 flex w-full max-w-[500px] flex-col items-center justify-center divide-y">
          {['pnpm add', 'npm install', 'yarn add'].map((pm) => (
            <pre className="group relative h-12 w-full content-center overflow-auto px-3">
              <code>
                <span className="select-none">$</span> {pm}{' '}
                @typeweave/react @typeweave/theme
              </code>
              <CopyButton
                code={`${pm} @typeweave/react @typeweave/theme`}
                className="absolute right-3 top-1/2 -translate-y-1/2 lg:hidden lg:group-hover:flex"
              />
            </pre>
          ))}
        </div> */}
      </main>
    </>
  );
};

export default Page;
