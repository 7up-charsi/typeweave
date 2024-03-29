import * as Disclosure from '@webbo-ui/disclosure';
import { Button } from '@webbo-ui/button';
import { Fragment } from 'react';
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

  if (!data) return;

  return (
    <Disclosure.Root className="mt-4 rounded border border-muted-6">
      {data.map(
        ({ default: defaultValue, description, name, type }, i, arr) => {
          const id = `props-${name}`;

          return (
            <Fragment key={i}>
              <Disclosure.Item
                value={'' + (i + 1)}
                className="first:mt-2 last:!mb-2"
              >
                <div className="flex items-center px-4 py-1">
                  <span className="group flex items-center">
                    <Prop id={id} className="scroll-mt-20">
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
                              <div className="flex items-center gap-3">
                                {value.map((ele, i, arr) => (
                                  <Fragment key={i}>
                                    <TsType>{ele}</TsType>

                                    {i !== arr.length - 1 ? (
                                      <div className="h-7 w-1 rounded-full bg-muted-6"></div>
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

              {i !== arr.length - 1 ? <hr className="border-muted-6" /> : null}
            </Fragment>
          );
        },
      )}
    </Disclosure.Root>
  );
};

Props.displayName = 'Props';
