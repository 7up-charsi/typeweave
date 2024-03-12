const Page = () => {
  return (
    <div className="pt-16">
      <h1 className="mt-32 text-center text-6xl font-bold leading-tight text-muted-11 ">
        <span className="text-primary-11">Fully featured</span> and{' '}
        <span className="text-secondary-11">accessible</span>
        <br />
        React components
      </h1>

      <p className="mt-10 text-center text-xl text-muted-11">
        Make fully functional accessible websites with power of Tailwindcss
      </p>

      <div className="mt-10 flex justify-center gap-5 text-muted-11">
        <div className="flex flex-col items-center gap-1">
          <h2 className="font-semibold " aria-describedby="des-r1">
            Free and open source
          </h2>
          <p id="des-r1" className="w-72 text-center">
            All components are MIT licensed. You can use any component anywhere
          </p>
        </div>

        <div className="flex flex-col items-center gap-1">
          <h2 className="font-semibold" aria-describedby="des-r2">
            Typescript based
          </h2>
          <p id="des-r2" className="w-72 text-center">
            All components and hooks are developed with Typescript.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
