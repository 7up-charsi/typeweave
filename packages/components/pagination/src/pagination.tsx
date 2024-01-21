import {
  PaginationClassNames,
  PaginationVariantProps,
  pagination,
} from '@gist-ui/theme';
import { forwardRef } from 'react';
import { useControllableState } from '@gist-ui/use-controllable-state';
import PaginationItem from './pagination-item';

const ellipsis_svg = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
  >
    <g strokeWidth="0"></g>
    <g strokeLinecap="round" strokeLinejoin="round"></g>
    <g>
      <path
        d="M12 13.75C12.9665 13.75 13.75 12.9665 13.75 12C13.75 11.0335 12.9665 10.25 12 10.25C11.0335 10.25 10.25 11.0335 10.25 12C10.25 12.9665 11.0335 13.75 12 13.75Z"
        fill="currentColor"
      ></path>
      <path
        d="M19 13.75C19.9665 13.75 20.75 12.9665 20.75 12C20.75 11.0335 19.9665 10.25 19 10.25C18.0335 10.25 17.25 11.0335 17.25 12C17.25 12.9665 18.0335 13.75 19 13.75Z"
        fill="currentColor"
      ></path>
      <path
        d="M5 13.75C5.9665 13.75 6.75 12.9665 6.75 12C6.75 11.0335 5.9665 10.25 5 10.25C4.0335 10.25 3.25 11.0335 3.25 12C3.25 12.9665 4.0335 13.75 5 13.75Z"
        fill="currentColor"
      ></path>
    </g>
  </svg>
);

export interface PaginationProps extends PaginationVariantProps {
  count?: number;
  boundaryCount?: number;
  siblingCount?: number;
  page?: number;
  onPageChange?: (page: number) => void;
  defaultPage?: number;
  classNames?: PaginationClassNames;
  getItemA11yLabel?: (page: number) => string;
  a11yLabel?: string;
}

const range = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i);

const Pagination = forwardRef<HTMLUListElement, PaginationProps>(
  (props, ref) => {
    const {
      classNames,
      page: pageProp,
      onPageChange,
      getItemA11yLabel = (page: number) => `page ${page}`,
      a11yLabel,
      color,
      isDisabled,
      size,
      variant,
      defaultPage = 1,
      count = 10,
      boundaryCount = 1,
      siblingCount = 1,
    } = props;

    const [page, setPage] = useControllableState({
      value: pageProp,
      defaultValue: defaultPage,
      onChange: onPageChange,
    });

    // if boundaryCount is greater than count then render all pages from 1 to count
    const startPages = range(1, Math.min(boundaryCount, count));

    // if boundaryCount is greater than count then dont render any page because all pages have shown above by startPages
    const endPages =
      boundaryCount > count
        ? []
        : range(Math.max(count - boundaryCount + 1, boundaryCount + 1), count);

    const siblingsStart = Math.max(
      Math.min(
        page - siblingCount,
        count - (siblingCount * 2 + 1 + boundaryCount),
      ),
      boundaryCount + 2,
    );

    const siblingsEnd = Math.min(
      Math.max(page + siblingCount, boundaryCount + 2 + siblingCount * 2),
      endPages.length > 0 ? endPages[0] - 2 : count - 1,
    );

    const styles = pagination({ color, isDisabled, size, variant });

    return (
      <ul
        ref={ref}
        className={styles.base({ className: classNames?.base })}
        aria-label={a11yLabel || 'pagination navigation'}
      >
        {[
          ...startPages,

          ...(siblingsStart > boundaryCount + 2
            ? ['start-ellipsis']
            : boundaryCount + 1 < count - boundaryCount
            ? [boundaryCount + 1]
            : []),

          ...range(siblingsStart, siblingsEnd),

          ...(siblingsEnd < count - boundaryCount - 1
            ? ['end-ellipsis']
            : count - boundaryCount > boundaryCount
            ? [count - boundaryCount]
            : []),

          ...endPages,
        ].map((ele, i) => {
          if (typeof ele === 'string') {
            if (ele === 'start-ellipsis')
              return (
                <li key={i}>
                  <span
                    className={styles.ellipsis({
                      className: classNames?.ellipsis,
                    })}
                  >
                    {ellipsis_svg}
                  </span>
                </li>
              );

            if (ele === 'end-ellipsis')
              return (
                <li key={i}>
                  <span
                    className={styles.ellipsis({
                      className: classNames?.ellipsis,
                    })}
                  >
                    {ellipsis_svg}
                  </span>
                </li>
              );

            return;
          }

          return (
            <li key={i}>
              <PaginationItem
                className={styles.item({ className: classNames?.item })}
                a11yLabel={getItemA11yLabel(ele)}
                selected={page === ele}
                onSelect={() => setPage(ele)}
                isDisabled={!!isDisabled}
              >
                {ele}
              </PaginationItem>
            </li>
          );
        })}
      </ul>
    );
  },
);

Pagination.displayName = 'gist-ui.Pagination';

export default Pagination;
