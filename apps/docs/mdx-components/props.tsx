'use client';

import {
  DisclosureContent,
  DisclosureItem,
  DisclosureRoot,
  DisclosureTrigger,
} from '@typeweave/react/disclosure';
import { Button } from '@typeweave/react/button';
import { ComponentProp } from '@/types/common';
import { ChevronDownIcon } from 'lucide-react';
import React from 'react';

export interface PropsProps {
  data?: ComponentProp[];
}

export const Props = (props: PropsProps) => {
  const { data } = props;

  if (!data) return;

  return (
    <DisclosureRoot className="not-prose space-y-3">
      {data.map((ele, i) => (
        <React.Fragment key={i}>
          <DisclosureItem value={i + ''}>
            <div className="flex items-center gap-2">
              <span className="font-medium text-info-11">
                {ele.name}
              </span>

              <div className="grow"></div>

              <DisclosureTrigger>
                <Button
                  isIconOnly
                  aria-label={`open content of ${ele.name}`}
                  size="sm"
                  className="text-lg"
                >
                  <ChevronDownIcon className="transition-transform group-data-[expanded=true]:rotate-180" />
                </Button>
              </DisclosureTrigger>
            </div>

            <DisclosureContent className="pt-2">
              {ele.description ? (
                <p className="mb-2">{ele.description}</p>
              ) : null}

              <div className="prose">
                {!!ele.typeAsNode && (
                  <p className="[&_a]:prose-a">
                    <span className="mr-2 text-sm font-medium text-muted-12">
                      Type:
                    </span>
                    <span className="">{ele.typeAsNode}</span>
                  </p>
                )}

                {!ele.typeAsNode && (
                  <p>
                    <span className="mr-2 text-sm font-medium text-muted-12">
                      Type:
                    </span>
                    <span className="inline-flex items-center gap-2">
                      {Array.isArray(ele.type) ? (
                        ele.type.map((type, i) => (
                          <React.Fragment key={i}>
                            <span className="inline-block rounded border border-info-7 bg-info-3 px-2 py-px font-code text-sm">
                              {type}
                            </span>
                            <span className="inline-block h-7 w-[2px] rounded-full bg-muted-7 last:hidden" />
                          </React.Fragment>
                        ))
                      ) : (
                        <span className="inline-block rounded border border-info-7 bg-info-3 px-2 py-px font-code text-sm">
                          {ele.type}
                        </span>
                      )}
                    </span>
                  </p>
                )}

                {!!ele.default && (
                  <p className="mt-1">
                    <span className="mr-2 text-sm font-medium text-muted-12">
                      Default:
                    </span>
                    <code>{ele.default}</code>
                  </p>
                )}
              </div>
            </DisclosureContent>
          </DisclosureItem>

          <hr className="border-muted-6" />
        </React.Fragment>
      ))}
    </DisclosureRoot>
  );
};

Props.displayName = 'Props';
