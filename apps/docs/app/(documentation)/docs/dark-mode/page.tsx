import { wait } from '@/app/_lib/utils';

export default async function Page() {
  await wait();

  return <div>dark mode</div>;
}
