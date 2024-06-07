import { Button } from '@typeweave/react';
import Link from 'next/link';
import { InstallationCommand } from '@/(landing-page)/_components/installation-command';

const Page = () => {
  return (
    <>
      <main className="mt-0 flex w-full flex-col items-center px-8 text-center lg:mt-20 lg:px-14">
        <h1 className="p-6 text-[length:max(48px,min(5vw,76px))] font-extrabold">
          Type it safe, Style it right.
        </h1>

        <p className="w-full max-w-[750px] px-8 py-6 text-[length:max(15px,min(2vw,20px))] lg:px-8 lg:py-10">
          Unleash type safety & rapid UI dev. Pre-built,{' '}
          <strong>type-safe</strong> React components for effortless{' '}
          <strong>TailwindCSS</strong> integration. Write cleaner
          code, style UIs faster and ship features quicker.
        </p>

        <div className="not-prose flex flex-col items-center gap-4 py-10">
          <Button asChild variant="solid" color="primary">
            <Link href="/guides/installation">get started</Link>
          </Button>

          <InstallationCommand />
        </div>
      </main>

      <section className="mx-auto w-full max-w-screen-md px-10 py-5 pb-10">
        <h2 className="mb-5 text-2xl font-semibold">Features</h2>

        <dl className="">
          <dt className="mb-2 font-medium">Modular Design</dt>
          <dd className="mb-4 pl-6">
            Typeweave’s modular design allows you to pick and choose
            the components you need, making your projects lightweight
            and customizable.
          </dd>

          <dt className="mb-2 font-medium">TailwindCSS</dt>
          <dd className="mb-4 pl-6">
            Typeweave leverage the power of TailwindCSS for styling,
            ensuring your UI components are easy to customize, and
            maintainable.
          </dd>

          <dt className="mb-2 font-medium">TypeScript</dt>
          <dd className="mb-4 pl-6">
            Typeweave is built with TypeScript, providing strong type
            definitions and improving your development experience with
            better autocompletion and type checking.
          </dd>

          <dt className="mb-2 font-medium">Accessibility</dt>
          <dd className="mb-4 pl-6">
            All Typeweave components are developed following W3C
            accessibility guidelines, ensuring that your applications
            are usable by everyone, including those with disabilities.
            This commitment to accessibility helps you create
            inclusive and compliant web applications.
          </dd>

          <dt className="mb-2 font-medium">Developer Friendly</dt>
          <dd className="mb-4 pl-6">
            Typeweave is designed with developers in mind. All
            components are easy to use and integrate seamlessly into
            your projects. With comprehensive documentation and a
            focus on simplicity, you'll be up and running in no time.
          </dd>

          <dt className="mb-2 font-medium">Robust Components</dt>
          <dd className="pl-6">
            TypeWeave provides a variety of components to meet your
            needs, from buttons to modals, without any unnecessary
            extras.
          </dd>
        </dl>
      </section>
    </>
  );
};

export default Page;
