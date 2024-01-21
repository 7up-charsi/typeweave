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
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    width={18}
    height={18}
  >
    <g fill="currentColor">
      <path d="M12 13.75a1.75 1.75 0 100-3.5 1.75 1.75 0 000 3.5zM19 13.75a1.75 1.75 0 100-3.5 1.75 1.75 0 000 3.5zM5 13.75a1.75 1.75 0 100-3.5 1.75 1.75 0 000 3.5z"></path>
    </g>
  </svg>
);

const first_svg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    width={20}
    height={20}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4 4v16m4-8h12M8 12l4-4m-4 4l4 4"
    ></path>
  </svg>
);

const last_svg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    width={20}
    height={20}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M20 4v16M4 12h12m0 0l-4-4m4 4l-4 4"
    ></path>
  </svg>
);

const next_svg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    width={20}
    height={20}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M6 12h12m0 0l-5-5m5 5l-5 5"
    ></path>
  </svg>
);

const prev_svg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    width={20}
    height={20}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M6 12h12M6 12l5-5m-5 5l5 5"
    ></path>
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
  showFirstButton?: boolean;
  showLastButton?: boolean;
  showPreviousButton?: boolean;
  showNextButton?: boolean;
  firstButtonIcon?: boolean;
  lastButtonIcon?: boolean;
  previousButtonIcon?: boolean;
  nextButtonIcon?: boolean;
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
      showFirstButton = true,
      showLastButton = true,
      showPreviousButton = true,
      showNextButton = true,
      firstButtonIcon = first_svg,
      lastButtonIcon = last_svg,
      previousButtonIcon = prev_svg,
      nextButtonIcon = next_svg,
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
        {showFirstButton && (
          <li>
            <PaginationItem
              className={styles.item({
                className: classNames?.item,
                isDisabled: page === 1,
              })}
              a11yLabel="first page"
              onPress={() => setPage(1)}
              isDisabled={!!isDisabled || page === 1}
            >
              {firstButtonIcon}
            </PaginationItem>
          </li>
        )}

        {showPreviousButton && (
          <li>
            <PaginationItem
              className={styles.item({
                className: classNames?.item,
                isDisabled: page === 1,
              })}
              a11yLabel="previous page"
              onPress={() => setPage((prev) => prev - 1)}
              isDisabled={!!isDisabled || page === 1}
            >
              {previousButtonIcon}
            </PaginationItem>
          </li>
        )}

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
                onPress={() => setPage(ele)}
                isDisabled={!!isDisabled}
              >
                {ele}
              </PaginationItem>
            </li>
          );
        })}

        {showNextButton && (
          <li>
            <PaginationItem
              className={styles.item({
                className: classNames?.item,
                isDisabled: page === count,
              })}
              a11yLabel="next page"
              onPress={() => setPage((prev) => prev + 1)}
              isDisabled={!!isDisabled || page === count}
            >
              {nextButtonIcon}
            </PaginationItem>
          </li>
        )}

        {showLastButton && (
          <li>
            <PaginationItem
              className={styles.item({
                className: classNames?.item,
                isDisabled: page === count,
              })}
              a11yLabel="last page"
              onPress={() => setPage(count)}
              isDisabled={!!isDisabled || page === count}
            >
              {lastButtonIcon}
            </PaginationItem>
          </li>
        )}
      </ul>
    );
  },
);

Pagination.displayName = 'gist-ui.Pagination';

export default Pagination;
