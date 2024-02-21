export default function Page() {
  return (
    <div className="">
      <h1 className="text-center leading-tight text-6xl font-bold mt-32 text-muted-11 dark:text-mutedDark-11">
        <span className="text-primary-11 dark:text-primaryDark-11">
          Fully featured
        </span>{' '}
        and{' '}
        <span className="text-secondary-11 dark:text-secondaryDark-11">
          accessible
        </span>
        <br />
        React components
      </h1>

      <p className="text-center mt-10 text-muted-11 dark:text-mutedDark-11 text-xl">
        Make fully functional accessible websites with power of Tailwindcss
      </p>

      <div className="flex justify-center gap-5 mt-10 text-muted-11 dark:text-mutedDark-11">
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
}

