import {
  PaginationClassNames,
  PaginationVariantProps,
  pagination,
} from '@webbo-ui/theme';
import React from 'react';
import { useControllableState } from '@webbo-ui/use-controllable-state';
import { Button, ButtonProps } from '@webbo-ui/button';
import { Icon } from '@webbo-ui/icon';

const ellipsis_svg = (
  <Icon>
    <svg fill="none" viewBox="0 0 24 24">
      <g fill="currentColor">
        <path d="M12 13.75a1.75 1.75 0 100-3.5 1.75 1.75 0 000 3.5zM19 13.75a1.75 1.75 0 100-3.5 1.75 1.75 0 000 3.5zM5 13.75a1.75 1.75 0 100-3.5 1.75 1.75 0 000 3.5z"></path>
      </g>
    </svg>
  </Icon>
);

const first_svg = (
  <Icon>
    <svg fill="none" viewBox="0 0 24 24">
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 4v16m4-8h12M8 12l4-4m-4 4l4 4"
      ></path>
    </svg>
  </Icon>
);

const last_svg = (
  <Icon>
    <svg fill="none" viewBox="0 0 24 24">
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M20 4v16M4 12h12m0 0l-4-4m4 4l-4 4"
      ></path>
    </svg>
  </Icon>
);

const next_svg = (
  <Icon>
    <svg fill="none" viewBox="0 0 24 24">
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M6 12h12m0 0l-5-5m5 5l-5 5"
      ></path>
    </svg>
  </Icon>
);

const prev_svg = (
  <Icon>
    <svg fill="none" viewBox="0 0 24 24">
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M6 12h12M6 12l5-5m-5 5l5 5"
      ></path>
    </svg>
  </Icon>
);

export interface PaginationProps
  extends PaginationVariantProps,
    React.HTMLAttributes<HTMLUListElement> {
  count?: number;
  boundaryCount?: number;
  siblingCount?: number;
  page?: number;
  onPageChange?: (page: number) => void;
  defaultPage?: number;
  classNames?: PaginationClassNames;
  getItemA11yLabel?: (page: number) => string;
  showFirstButton?: boolean;
  showLastButton?: boolean;
  showPreviousButton?: boolean;
  showNextButton?: boolean;
  firstButtonIcon?: boolean;
  lastButtonIcon?: boolean;
  previousButtonIcon?: boolean;
  nextButtonIcon?: boolean;
  color: ButtonProps['color'];
  size: ButtonProps['size'];
  disabled?: boolean;
  firstPageA11yLabel?: string;
  lastPageA11yLabel?: string;
  nextPageA11yLabel?: string;
  previousPageA11yLabel?: string;
}

const range = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i);

const Pagination = React.forwardRef<HTMLUListElement, PaginationProps>(
  (props, ref) => {
    const {
      classNames,
      className,
      page: pageProp,
      onPageChange,
      getItemA11yLabel = (page: number) => `page ${page}`,
      color,
      disabled,
      showFirstButton = true,
      showLastButton = true,
      showPreviousButton = true,
      showNextButton = true,
      firstButtonIcon = first_svg,
      lastButtonIcon = last_svg,
      previousButtonIcon = prev_svg,
      nextButtonIcon = next_svg,
      firstPageA11yLabel = 'first page',
      lastPageA11yLabel = 'last page',
      nextPageA11yLabel = 'next page',
      previousPageA11yLabel = 'previous page',
      size = 'sm',
      defaultPage = 1,
      count = 10,
      boundaryCount = 1,
      siblingCount = 1,
      ...restProps
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

    const styles = pagination({});

    const buttonProps = {
      size,
      variant: 'text' as ButtonProps['variant'],
      isIconOnly: true,
      disabled,
      'data-selected': false,
    };

    return (
      <ul
        {...restProps}
        ref={ref}
        className={styles.base({ className: classNames?.base ?? className })}
        aria-label={restProps['aria-label'] || 'pagination navigation'}
      >
        {showFirstButton && (
          <li>
            <Button
              {...buttonProps}
              classNames={{
                base: styles.item({ className: classNames?.item }),
              }}
              aria-label={firstPageA11yLabel}
              onPress={() => setPage(1)}
              disabled={!!disabled || page === 1}
            >
              {firstButtonIcon}
            </Button>
          </li>
        )}

        {showPreviousButton && (
          <li>
            <Button
              {...buttonProps}
              classNames={{
                base: styles.item({ className: classNames?.item }),
              }}
              aria-label={previousPageA11yLabel}
              onPress={() => setPage((prev) => prev - 1)}
              disabled={!!disabled || page === 1}
            >
              {previousButtonIcon}
            </Button>
          </li>
        )}

        {[
          ...startPages,

          ...(siblingsStart > boundaryCount + 2
            ? ['ellipsis']
            : boundaryCount + 1 < count - boundaryCount
              ? [boundaryCount + 1]
              : []),

          ...range(siblingsStart, siblingsEnd),

          ...(siblingsEnd < count - boundaryCount - 1
            ? ['ellipsis']
            : count - boundaryCount > boundaryCount
              ? [count - boundaryCount]
              : []),

          ...endPages,
        ].map((ele, i) => {
          if (typeof ele === 'string') {
            if (ele === 'ellipsis')
              return (
                <li key={i}>
                  <Button
                    {...buttonProps}
                    classNames={{
                      base: styles.item({ className: classNames?.item }),
                    }}
                    asChild
                  >
                    <div>{ellipsis_svg}</div>
                  </Button>
                </li>
              );

            return;
          }

          const selected = page === ele;

          return (
            <li key={i}>
              <Button
                {...buttonProps}
                classNames={{
                  base: styles.item({ className: classNames?.item }),
                }}
                aria-label={getItemA11yLabel(ele)}
                onPress={() => setPage(ele)}
                disabled={disabled}
                data-selected={!!selected}
                variant={(selected && 'solid') || 'text'}
                color={((selected && color) ?? 'primary') || 'default'}
              >
                {ele}
              </Button>
            </li>
          );
        })}

        {showNextButton && (
          <li>
            <Button
              {...buttonProps}
              classNames={{
                base: styles.item({ className: classNames?.item }),
              }}
              aria-label={nextPageA11yLabel}
              onPress={() => setPage((prev) => prev + 1)}
              disabled={!!disabled || page === count}
            >
              {nextButtonIcon}
            </Button>
          </li>
        )}

        {showLastButton && (
          <li>
            <Button
              {...buttonProps}
              classNames={{
                base: styles.item({ className: classNames?.item }),
              }}
              aria-label={lastPageA11yLabel}
              onPress={() => setPage(count)}
              disabled={!!disabled || page === count}
            >
              {lastButtonIcon}
            </Button>
          </li>
        )}
      </ul>
    );
  },
);

Pagination.displayName = 'webbo-ui.Pagination';

export default Pagination;
