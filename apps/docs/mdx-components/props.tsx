'use client';

import { ComponentProp } from '@/lib/types';
import React from 'react';

export interface PropsProps {
  data?: ComponentProp[];
}

export const Props = (props: PropsProps) => {
  const { data } = props;

  if (!data) return;

  return (
    <div className="overflow-auto">
      <table className="mt-5 border-collapse">
        <thead>
          <tr className="border-b border-b-muted-7">
            {['name', 'type', 'default', 'description'].map(
              (header) => (
                <th
                  key={header}
                  className="px-1 py-3 text-left font-medium capitalize"
                >
                  {header}
                </th>
              ),
            )}
          </tr>
        </thead>
        <tbody>
          {data.map(
            (
              {
                default: defaultValue,
                description,
                name,
                type,
                required,
              },
              index,
            ) => {
              return (
                <tr key={index} className="border-b border-b-muted-7">
                  <td
                    className="min-w-36 px-1 py-3"
                    data-required={required}
                  >
                    {name}
                    {required ? (
                      <span className="ml-2 text-danger-11">*</span>
                    ) : null}
                  </td>

                  <td className="min-w-36 px-1 py-3">
                    {Array.isArray(type) ? (
                      <code className="border-primary-6 bg-primary-2 leading-relaxed text-primary-11">
                        {type.map((ele, index) => {
                          return (
                            <React.Fragment key={index}>
                              {ele}
                              {index === type.length - 1 ? null : (
                                <br />
                              )}
                              {index === type.length - 1
                                ? null
                                : ' | '}
                            </React.Fragment>
                          );
                        })}
                      </code>
                    ) : (
                      <code className="border-primary-6 bg-primary-2 text-primary-11">
                        {type}
                      </code>
                    )}
                  </td>

                  <td className="min-w-36 px-1 py-3">
                    {defaultValue ? <code>{defaultValue}</code> : '-'}
                  </td>

                  <td className="min-w-[300px] py-3">
                    {description}
                  </td>
                </tr>
              );
            },
          )}
        </tbody>
      </table>
    </div>
  );
};

Props.displayName = 'Props';
