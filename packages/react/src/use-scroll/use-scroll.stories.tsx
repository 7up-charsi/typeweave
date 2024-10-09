import { useScroll } from './index';

const meta = {
  title: 'Hooks/use-scroll',
};

export default meta;

const content = Array.from({ length: 10 }).map((_) => ({
  length: Math.floor(Math.random() * (15 - 4 + 1)) + 4,
  lastLine: Math.floor(Math.random() * (70 - 10 + 1)) + 10,
}));

const Template = () => {
  const [scroll, scrollRef] = useScroll<HTMLDivElement>({
    onScrollDown: () => console.log('onScrollDown'),
    onScrollLeft: () => console.log('onScrollLeft'),
    onScrollRight: () => console.log('onScrollRight'),
    onScrollUp: () => console.log('onScrollUp'),
    onScrollX: () => console.log('onScrollX'),
    onScrollY: () => console.log('onScrollY'),
    onXDirectionChange: () => console.log('onXDirectionChange'),
    onYDirectionChange: () => console.log('onYDirectionChange'),
  });

  console.log(scroll);

  return (
    <>
      <div
        ref={scrollRef}
        className="h-96 rounded border border-muted-7 overflow-auto p-5"
      >
        {content.map(({ length, lastLine }, i) => (
          <div
            key={i}
            className="my-5 w-[200vw] space-y-3 first:mt-0 last:mb-0"
          >
            {Array.from({ length }).map((_, i, arr) => (
              <div
                key={i}
                style={{
                  width: i + 1 === arr.length ? `${lastLine}%` : '100%',
                }}
                className="h-3 rounded bg-gray-200"
              ></div>
            ))}
          </div>
        ))}
      </div>

      {content.map(({ length, lastLine }, i) => (
        <div key={i} className="my-5 space-y-3 first:mt-0 last:mb-0">
          {Array.from({ length }).map((_, i, arr) => (
            <div
              key={i}
              style={{
                width: i + 1 === arr.length ? `${lastLine}%` : '100%',
              }}
              className="h-3 rounded bg-gray-200"
            ></div>
          ))}
        </div>
      ))}
    </>
  );
};

export const Default = {
  render: Template,
};
