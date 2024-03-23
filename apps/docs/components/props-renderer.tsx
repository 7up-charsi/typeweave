'use client';

import * as Disclosure from '@webbo-ui/disclosure';

// *-*-*-*-* PropsRenderer *-*-*-*-*

import { ComponentProp } from '@/lib/types';
import { Button } from '@webbo-ui/button';
import { Fragment } from 'react';

export interface PropsRendererProps {
  content?: ComponentProp[];
}

export const PropsRenderer = (props: PropsRendererProps) => {
  const { content } = props;

  return (
    <Disclosure.Root className="mt-4">
      {content?.map(
        ({ default: defaultValue, description, name, type }, i, arr) => (
          <Fragment key={i}>
            <Disclosure.Item value={'' + (i + 1)}>
              <div className="flex items-center p-2">
                <span>{name}</span>
                <div className="grow"></div>

                <Disclosure.Trigger>
                  <Button
                    isIconOnly
                    aria-label={`expand ${name} prop`}
                    size="sm"
                  >
                    <svg
                      className="rotate-0 transition-transform group-data-[state=expanded]/item:-rotate-180"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.5em"
                      height="1.5em"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m8 10 4 4 4-4"
                      />
                    </svg>
                  </Button>
                </Disclosure.Trigger>
              </div>

              <Disclosure.Content>
                <div className="flex flex-col gap-1">
                  {[
                    ['type', type],
                    ['default', defaultValue],
                    ['description', description],
                  ].map(
                    ([key, value], i) =>
                      !!value && (
                        <div key={i} className="flex items-center gap-3">
                          <span className="first-letter:uppercase">{key}</span>
                          <span>--</span>

                          {(key === 'description' && (
                            <span className="first-letter:uppercase">
                              {value}
                            </span>
                          )) ||
                            (key === 'default' && (
                              <span>{`\`${defaultValue}\``}</span>
                            )) ||
                            (key === 'type' &&
                              ((Array.isArray(value) && (
                                <div className="flex items-center gap-3">
                                  {value.map((ele, i, arr) => (
                                    <Fragment key={i}>
                                      <span>{`\`${ele}\``}</span>
                                      {i !== arr.length - 1 ? (
                                        <div className="h-7 w-1 rounded-full bg-muted-5"></div>
                                      ) : null}
                                    </Fragment>
                                  ))}
                                </div>
                              )) || <span>{`\`${value}\``}</span>))}
                        </div>
                      ),
                  )}
                </div>
              </Disclosure.Content>
            </Disclosure.Item>

            {i !== arr.length - 1 ? <hr className="border-muted-6" /> : null}
          </Fragment>
        ),
      )}
    </Disclosure.Root>
  );
};

PropsRenderer.displayName = 'PropsRenderer';
