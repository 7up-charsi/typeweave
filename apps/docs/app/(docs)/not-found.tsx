const NotFound = () => {
  return (
    <div className="mt-12 flex w-full flex-col items-center justify-center overflow-auto py-4">
      <h1 className="mb-8 text-9xl font-semibold text-muted-7">
        404
      </h1>
      <p className="mb-8 text-center text-2xl">
        We can&apos;t seem to find the page you&apos;re looking for.
      </p>
    </div>
  );
};

NotFound.displayName = 'NotFound';

export default NotFound;
