'use client';

import {
  Button,
  DisclosureContent,
  DisclosureItem,
  DisclosureRoot,
  DisclosureTrigger,
} from '@typeweave/react';
import React, { Fragment } from 'react';
import { LinkIndicator } from './link-indicator';
import { Prop } from './prop';
import { TsType } from './ts-type';
import { ComponentProp } from '@/lib/types';
import { Link } from './Link';
import { ChevronDown } from 'lucide-react';

export interface PropsProps {
  data?: ComponentProp[];
}

const asChildProp: ComponentProp = {
  name: 'asChild',
  type: 'boolean',
  default: 'undefined',
  description: (
    <>
      Change the default rendered element for the one passed as a
      child, merging their props and behavior.
      <br />
      See how to{' '}
      <Link href="/docs/customization/asChild">
        customize rendered element
      </Link>
    </>
  ),
};

export const Props = (props: PropsProps) => {
  const { data } = props;

  const [items, setItems] = React.useState<string[]>([]);

  if (!data) return;

  const buttonLabel = items.length ? 'collapse all' : 'expand all';

  return (
    <div className="mt-4 flex flex-col gap-2">
      {data.length <= 2 ? null : (
        <div className="flex w-full items-center justify-end">
          <Button
            size="sm"
            onPress={() => {
              setItems(
                items.length ? [] : data.map((_, i) => `${i + 1}`),
              );
            }}
            aria-label={`${buttonLabel} props`}
          >
            {buttonLabel}
          </Button>
        </div>
      )}

      <DisclosureRoot
        value={items}
        onValueChange={setItems}
        className="rounded border border-muted-6"
      >
        {data.map((ele, i, arr) => {
          if (ele.name === 'asChild') ele = asChildProp;

          const {
            default: defaultValue,
            description,
            name,
            type,
            required,
          } = ele;
          const id = `props-${name}`;

          return (
            <Fragment key={i}>
              <DisclosureItem
                value={'' + (i + 1)}
                className="first:mt-2 last:!mb-2"
              >
                <div className="flex items-center px-4 py-1">
                  <DisclosureTrigger className="group mr-2">
                    <Button
                      isIconOnly
                      aria-label={`expand ${name} prop`}
                      size="sm"
                    >
                      <ChevronDown className="rotate-0 transition-transform group-data-[expanded=true]:-rotate-180" />
                    </Button>
                  </DisclosureTrigger>

                  <span className="group isolate flex items-center">
                    <Prop
                      id={id}
                      data-required={required}
                      className="relative -z-10 scroll-mt-20 after:absolute after:left-full after:top-1/2 after:ml-4 after:hidden after:-translate-y-1/2 after:font-sans after:text-sm after:uppercase after:text-danger-11 after:content-['required'] data-[required]:after:inline-block"
                    >
                      {name}
                    </Prop>

                    <LinkIndicator id={id} />
                  </span>
                </div>

                <DisclosureContent>
                  <div className="flex flex-col gap-2 pl-10">
                    {(
                      [
                        ['type', type],
                        ['default', defaultValue],
                        ['description', description],
                      ] as const
                    ).map(
                      ([key, value], i) =>
                        !!value && (
                          <div
                            key={i}
                            className="flex items-center gap-3"
                          >
                            <span className="place-self-start first-letter:uppercase">
                              {key}
                              <span className="ml-3 whitespace-pre">
                                --
                              </span>
                            </span>

                            {key === 'description' ? (
                              <span className="first-letter:uppercase">
                                {value}
                              </span>
                            ) : null}

                            {key === 'default' &&
                            !Array.isArray(value) ? (
                              <TsType>{value}</TsType>
                            ) : null}

                            {key === 'type' &&
                            !Array.isArray(value) ? (
                              <TsType>{value}</TsType>
                            ) : null}

                            {(key === 'type' || key === 'default') &&
                            Array.isArray(value) ? (
                              <div className="flex items-center gap-2">
                                {value.map((ele, i, arr) => (
                                  <Fragment key={i}>
                                    <TsType>{ele}</TsType>

                                    {i !== arr.length - 1 ? (
                                      <div className="h-5 w-[2px] rounded-full bg-muted-8"></div>
                                    ) : null}
                                  </Fragment>
                                ))}
                              </div>
                            ) : null}
                          </div>
                        ),
                    )}
                  </div>
                </DisclosureContent>
              </DisclosureItem>

              {i !== arr.length - 1 ? (
                <hr className="border-muted-6" />
              ) : null}
            </Fragment>
          );
        })}
      </DisclosureRoot>
    </div>
  );
};

Props.displayName = 'Props';
