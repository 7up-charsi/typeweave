import { AppBar } from './app-bar';

const meta = {
  title: 'Components/AppBar',
  component: AppBar,
};

export default meta;

const DefaultTemplate = () => (
  <>
    <AppBar>
      <header className="h-16 bg-primary-3 flex items-center gap-2 px-5">
        <span className="text-xl capitalize">typeweave</span>
      </header>
    </AppBar>

    <main className="mt-16 space-y-3 p-5">
      {Array.from({ length: 150 }).map((_, i) => (
        <div
          key={i}
          style={{ width: `${Math.random() * 50 + 50}%` }}
          className="h-3 rounded bg-gray-200"
        ></div>
      ))}
    </main>
  </>
);

export const Default = {
  render: DefaultTemplate,
};
