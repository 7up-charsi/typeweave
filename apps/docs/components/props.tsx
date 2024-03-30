'use client';

import * as Disclosure from '@webbo-ui/disclosure';
import { Button } from '@webbo-ui/button';
import React, { Fragment } from 'react';
import { Icon } from '@webbo-ui/icon';
import { LinkIndicator } from './link-indicator';
import { Prop } from './prop';
import { TsType } from './ts-type';
import { ComponentProp } from '@/lib/types';

export interface PropsProps {
  data?: ComponentProp[];
}

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
              setItems(items.length ? [] : data.map((_, i) => `${i + 1}`));
            }}
            aria-label={`${buttonLabel} props`}
          >
            {buttonLabel}
          </Button>
        </div>
      )}

      <Disclosure.Root
        value={items}
        onValueChange={setItems}
        className="rounded border border-muted-6"
      >
        {data.map(
          (
            { default: defaultValue, description, name, type, required },
            i,
            arr,
          ) => {
            const id = `props-${name}`;

            return (
              <Fragment key={i}>
                <Disclosure.Item
                  value={'' + (i + 1)}
                  className="first:mt-2 last:!mb-2"
                >
                  <div className="flex items-center px-4 py-1">
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

                    <Disclosure.Trigger className="group ml-auto">
                      <Button
                        isIconOnly
                        aria-label={`expand ${name} prop`}
                        size="sm"
                      >
                        <Icon>
                          <svg
                            className="rotate-0 transition-transform group-data-[expanded=true]:-rotate-180"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 9l6 6 6-6"
                            ></path>
                          </svg>
                        </Icon>
                      </Button>
                    </Disclosure.Trigger>
                  </div>

                  <Disclosure.Content>
                    <div className="flex flex-col gap-2 pl-10">
                      {[
                        ['type', type],
                        ['default', defaultValue],
                        ['description', description],
                      ].map(
                        ([key, value], i) =>
                          !!value && (
                            <div key={i} className="flex items-center gap-3">
                              <span className="place-self-start first-letter:uppercase">
                                {key}
                                <span className="ml-3 whitespace-pre">--</span>
                              </span>

                              {key === 'description' ? (
                                <span className="first-letter:uppercase">
                                  {value}
                                </span>
                              ) : null}

                              {key === 'default' && !Array.isArray(value) ? (
                                <TsType>{value}</TsType>
                              ) : null}

                              {key === 'type' && !Array.isArray(value) ? (
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
                  </Disclosure.Content>
                </Disclosure.Item>

                {i !== arr.length - 1 ? (
                  <hr className="border-muted-6" />
                ) : null}
              </Fragment>
            );
          },
        )}
      </Disclosure.Root>
    </div>
  );
};

Props.displayName = 'Props';
