import React from 'react';

export const useRouteProgress = () => {
  const progressRef = React.useRef(0);
  const doneAnimationFrameRef = React.useRef(0);
  const startAnimationFrameRef = React.useRef(0);

  const [progress, setProgress] = React.useState(0);
  const [hide, setHide] = React.useState(true);

  React.useEffect(() => {
    const start = () => {
      // A similar explanation as previously mentioned in "done"
      cancelAnimationFrame(doneAnimationFrameRef.current);
      cancelAnimationFrame(startAnimationFrameRef.current);

      progressRef.current = 0;

      let speed = 0;

      const updateProgress = () => {
        const currProgress = progressRef.current;

        if (currProgress < 10) {
          speed = 0.5; // Slow speed
        } else if (currProgress < 20) {
          speed = 2; // Fast speed
        } else if (currProgress < 30) {
          speed = 1; // Normal speed
        } else if (currProgress < 50) {
          speed = 0.5; // Slow speed
        } else if (currProgress < 80) {
          speed = 2; // Fast speed
        } else {
          // at 80%
          cancelAnimationFrame(startAnimationFrameRef.current);
          return;
        }

        const nextProgress = currProgress + speed;

        progressRef.current = nextProgress;
        setProgress(nextProgress);
        setHide(false);

        startAnimationFrameRef.current = requestAnimationFrame(updateProgress);
      };

      updateProgress();
    };

    const done = () => {
      /*
         "I want to cancel the previously executing 'done' function because there are situations where 'done' is executed multiple times. For example, when a user clicks a link and a page download occurs from the server, Next.js pushes the URL into the browser's history stack, resulting in 'history.pushState' being called, which executes 'done'. However, if 'done' is still executing and the user interacts with the back/forth browser buttons, it calls 'history.replaceState', leading to 'done' being executed again. To prevent this, I need to stop the previous 'done' execution
         */
      cancelAnimationFrame(doneAnimationFrameRef.current);
      cancelAnimationFrame(startAnimationFrameRef.current);

      const speed = 3;

      const updateProgress = () => {
        const currProgress = progressRef.current;

        // Cancel animation and ( hide=true ) when progress exceeds 100 (read below)
        if (currProgress > 100) {
          cancelAnimationFrame(doneAnimationFrameRef.current);
          setHide(true);
          return;
        }

        // Allow nextProgress to exceed 100% so i can set hide=true on next frame
        const nextProgress = currProgress + speed;

        progressRef.current = nextProgress;
        setProgress(Math.min(100, nextProgress));

        doneAnimationFrameRef.current = requestAnimationFrame(updateProgress);
      };

      updateProgress();
    };

    // Wrap history methods to complete progress on adding new entry or replacing current entry of history stack
    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;

    const originalHistory = window.history;

    window.history.pushState = function (...args) {
      done();
      originalPushState.apply(originalHistory, args);
    };

    window.history.replaceState = function (...args) {
      done();
      originalReplaceState.apply(originalHistory, args);
    };

    const handleClick = (e: MouseEvent) => {
      try {
        const target = e.target as HTMLElement;
        const anchor = target.closest('a');

        if (anchor) {
          const currUrl = new URL(window.location.href);
          const newUrl = new URL(anchor.href);

          const isExternalLink = anchor.target === '_blank';

          // Check for Special Schemes
          const isSpecialScheme = [
            'tel:',
            'mailto:',
            'sms:',
            'blob:',
            'download:',
          ].some((scheme) => newUrl.toString().startsWith(scheme));

          if (
            isExternalLink ||
            isSpecialScheme ||
            e.ctrlKey ||
            e.metaKey ||
            e.shiftKey ||
            e.altKey
          )
            return;

          // different hostname mean external link
          if (currUrl.hostname !== newUrl.hostname) return;

          // This check is to verify if the user has navigated within the same page.
          if (
            currUrl.pathname === newUrl.pathname &&
            currUrl.search === newUrl.search &&
            currUrl.hash !== newUrl.hash
          )
            return;

          // This check confirms whether the user clicked a link with the same URL as the current active page.
          if (
            currUrl.pathname === newUrl.pathname &&
            currUrl.search === newUrl.search &&
            currUrl.hash === newUrl.hash
          )
            return;

          start();
        }
      } catch (err) {
        done();
      }
    };

    const handlePageHide = () => {
      cancelAnimationFrame(doneAnimationFrameRef.current);
      cancelAnimationFrame(startAnimationFrameRef.current);

      progressRef.current = 0;
      setHide(true);
      setProgress(0);
    };

    const handleBackAndForth = () => {
      start();
    };

    // Add the global click event listener
    document.addEventListener('click', handleClick); // TODO: add PointerEvents
    window.addEventListener('popstate', handleBackAndForth);
    window.addEventListener('pagehide', handlePageHide);

    // Clean up the global click event listener when the component is unmounted
    return (): void => {
      document.removeEventListener('click', handleClick);
      window.removeEventListener('popstate', handleBackAndForth);
      window.removeEventListener('pagehide', handlePageHide);

      cancelAnimationFrame(doneAnimationFrameRef.current);
      cancelAnimationFrame(startAnimationFrameRef.current);
    };
  }, []);

  return { hide, progress };
};
