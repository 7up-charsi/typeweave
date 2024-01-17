import { Button } from '@gist-ui/button';
import { pagination } from '@gist-ui/theme';
import { forwardRef, useMemo } from 'react';

export interface PaginationProps {
  count?: number;
  boundary?: number;
}

const Pagination = forwardRef<HTMLDivElement, PaginationProps>((props, ref) => {
  const { count = 10, boundary = 1 } = props;

  const startBoundary = useMemo(
    () => Array.from({ length: boundary }).map((_, i) => i + 1),
    [boundary],
  );

  const endBoundary = useMemo(
    () =>
      Array.from({ length: boundary })
        .map((_, i) => i)
        .reverse()
        .map((ele) => count - ele),
    [boundary, count],
  );

  const styles = pagination({});

  return (
    <div ref={ref} className={styles.base()}>
      {startBoundary.map((ele) => (
        <Button key={ele} isIconOnly className={styles.button()}>
          {ele}
        </Button>
      ))}

      {endBoundary.map((ele) => (
        <Button key={ele} isIconOnly className={styles.button()}>
          {ele}
        </Button>
      ))}
    </div>
  );
});

Pagination.displayName = 'gist-ui.Pagination';

export default Pagination;
