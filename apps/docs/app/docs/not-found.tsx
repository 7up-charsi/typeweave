// *-*-*-*-* NotFound *-*-*-*-*

const NotFound = () => {
  return (
    <div className="col-start-2 flex h-screen w-full flex-col items-center justify-center overflow-auto py-4">
      <h1 className="mb-8 text-9xl font-semibold text-muted-7">
        404
      </h1>
      <p className="mb-8 text-2xl">
        We can't seem to find the page you're looking for.
      </p>
    </div>
  );
};

NotFound.displayName = 'NotFound';

export default NotFound;
