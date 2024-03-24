import { access, readFile } from 'fs/promises';
import path from 'path';
import * as Disclosure from '@webbo-ui/disclosure';
import { ComponentProp } from '@/lib/types';
import { Button } from '@webbo-ui/button';
import { Fragment } from 'react';
import { Icon } from '@webbo-ui/icon';
import { LinkIndicator } from './link-indicator';

export interface PropsProps {
  source?: string;
}

const typeStyles =
  'mx-1 inline-block rounded bg-muted-3 px-1 font-sans text-muted-11';

export const Props = async (props: PropsProps) => {
  const { source } = props;

  if (!source) return;

  const filePath = path.resolve(`content/docs/components/${source}/props.json`);

  try {
    await access(filePath);
  } catch (err) {
    return null;
  }

  const file = await readFile(filePath, { encoding: 'utf-8' });

  const content = JSON.parse(file) as ComponentProp[] | undefined;

  if (!Array.isArray(content) || !content.length)
    return <div className="p-2">No props found</div>;

  return (
    <Disclosure.Root className="mt-4">
      {content.map(
        ({ default: defaultValue, description, name, type }, i, arr) => {
          const id = `props-${name}`;

          return (
            <Fragment key={i}>
              <Disclosure.Item value={'' + (i + 1)}>
                <div className="flex items-center px-4 py-1">
                  <span className="group flex items-center">
                    <span id={id} className="scroll-mt-20">
                      {name}
                    </span>

                    <LinkIndicator id={id} />
                  </span>

                  <div className="grow"></div>

                  <Disclosure.Trigger>
                    <Button
                      isIconOnly
                      aria-label={`expand ${name} prop`}
                      size="sm"
                    >
                      <Icon>
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
                      </Icon>
                    </Button>
                  </Disclosure.Trigger>
                </div>

                <Disclosure.Content>
                  <div className="flex flex-col gap-2">
                    {[
                      ['type', type],
                      ['default', defaultValue],
                      ['description', description],
                    ].map(
                      ([key, value], i) =>
                        !!value && (
                          <div key={i} className="flex items-center gap-3">
                            <span className="first-letter:uppercase">
                              {key}
                            </span>
                            <span>--</span>

                            {key === 'description' ? (
                              <span className="first-letter:uppercase">
                                {value}
                              </span>
                            ) : null}

                            {key === 'default' ? (
                              <span className={typeStyles}>{defaultValue}</span>
                            ) : null}

                            {key === 'type' && !Array.isArray(value) ? (
                              <span className={typeStyles}>{value}</span>
                            ) : null}

                            {key === 'type' && Array.isArray(value) ? (
                              <div className="flex items-center gap-3">
                                {value.map((ele, i, arr) => (
                                  <Fragment key={i}>
                                    <span className={typeStyles}>{ele}</span>

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
