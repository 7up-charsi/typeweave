import {
  PaginationClassNames,
  PaginationVariantProps,
  pagination,
} from '@webbo-ui/theme';
import React from 'react';
import { useControllableState } from '../use-controllable-state';
import { Button, ButtonProps } from '../button';
import {
  Ellipsis,
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

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

const displayName = 'Pagination';

export const Pagination = React.forwardRef<HTMLUListElement, PaginationProps>(
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
      firstButtonIcon = <ChevronFirst />,
      lastButtonIcon = <ChevronLast />,
      previousButtonIcon = <ChevronLeft />,
      nextButtonIcon = <ChevronRight />,
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

    const styles = React.useMemo(() => pagination({}), []);

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
                    <div>
                      <Ellipsis />
                    </div>
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

Pagination.displayName = displayName;
