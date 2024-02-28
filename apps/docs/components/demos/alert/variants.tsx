const code = `import { Alert } from '@webbo-ui/alert';

export default function App() {
  return (
    <div className="w-full flex flex-col gap-3">
      <Alert>Lorem ipsum dolor sit, amet consectetur adipisicing elit</Alert>
      <Alert color="info" variant="border">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit
      </Alert>
    </div>
  );
}
`;

export default code;
