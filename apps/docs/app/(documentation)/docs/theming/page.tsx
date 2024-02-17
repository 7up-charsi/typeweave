import { wait } from '@/app/_lib/utils';
import React from 'react';

export default async function Page() {
  await wait();

  return <div>theming</div>;
}
