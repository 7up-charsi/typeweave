export const wait = async (duration = 1000) =>
  await new Promise((resolve) =>
    setTimeout(() => {
      resolve(true);
    }, duration),
  );
