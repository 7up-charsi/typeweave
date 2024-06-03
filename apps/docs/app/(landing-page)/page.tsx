const Page = () => {
  return (
    <main>
      <h1>Empower Your UI with Typeweave</h1>

      <p>
        Welcome to TypeWeave, your go-to source for high-quality and
        W3C compliant React components. Developed to bring efficiency
        and flexibility to your development process.
      </p>

      <h2>Get Started Quickly</h2>

      <p>
        Whether you're building a small project or a large-scale
        application, Typeweave provides a comprehensive set of tools
        and components to get you started quickly. Follow our
        installation guide to begin.
      </p>

      <h2>Features</h2>

      <dl>
        <dt>
          Modular Design
          <dd>
            Typeweave’s modular design allows you to pick and choose
            the components you need, making your projects lightweight
            and customizable.
          </dd>
        </dt>

        <dt>
          TailwindCSS
          <dd>
            Typeweave leverage the power of TailwindCSS for styling,
            ensuring your UI components are easy to customize, and
            maintainable.
          </dd>
        </dt>

        <dt>
          TypeScript
          <dd>
            Typeweave is built with TypeScript, providing strong type
            definitions and improving your development experience with
            better autocompletion and type checking.
          </dd>
        </dt>

        <dt>
          Accessibility
          <dd>
            All Typeweave components are developed following W3C
            accessibility guidelines, ensuring that your applications
            are usable by everyone, including those with disabilities.
            This commitment to accessibility helps you create
            inclusive and compliant web applications.
          </dd>
        </dt>

        <dt>
          Customizable Themes
          <dd>
            Typeweave components are unstyled by default, giving you
            the freedom to style them as you see fit. Use the
            @typeweave/theme package to apply our default theme or
            bring your own theme to match your brand's identity.
          </dd>
        </dt>

        <dt>
          Developer Friendly
          <dd>
            Typeweave is designed with developers in mind. All
            components are easy to use and integrate seamlessly into
            your projects. With comprehensive documentation and a
            focus on simplicity, you'll be up and running in no time.
          </dd>
        </dt>

        <dl>
          <dt>
            Robust Components
            <dd>
              TypeWeave provides a variety of components to meet your
              needs, from buttons to modals, without any unnecessary
              extras.
            </dd>
          </dt>
        </dl>
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
  );
};

export default Page;
