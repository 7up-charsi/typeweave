import { Columns3Icon } from 'lucide-react';
import {
  TableRoot,
  TableSelectAllRows,
  TableSelectRow,
  TableColumnVisibility,
  TableSelectRowRoot,
  Table,
} from './';
import { Checkbox } from '../checkbox';
import {
  MenuCheckboxItem,
  MenuContent,
  MenuPortal,
  MenuRoot,
  MenuTrigger,
} from '../menu';
import { Button } from '../button';

const meta = {
  title: 'Components/Table',
};

export default meta;

const Template = () => {
  return (
    <TableRoot
      getRowKey={(row) => row.id}
      data={Array.from({ length: 25 }).map((_, i) => ({
        id: i + '',
        name: {
          first: { short: '', long: 33 },
          last: 33,
        },
        age: 0,
      }))}
      columns={[
        {
          identifier: 'select-row',
          visibilityTitle: 'select row',
          accessor: 'id',
          header: () => (
            <div className="flex items-center justify-center">
              <TableSelectAllRows>
                <Checkbox />
              </TableSelectAllRows>
            </div>
          ),
          cell: (val) => (
            <div className="flex items-center justify-center">
              <TableSelectRow identifier={val}>
                <Checkbox />
              </TableSelectRow>
            </div>
          ),
        },
        ...Array.from({ length: 8 }).map((_, i) => ({
          identifier: `${i + 1}`,
          header: () => `column ${i + 1}`,
          cell: () => `${i + 1}`,
        })),
      ]}
    >
      <TableSelectRowRoot>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <span className="text-muted-11 font-medium">Data table</span>
            <span className="grow"></span>

            <MenuRoot>
              <MenuTrigger>
                <Button isIconOnly aria-label="column visibility">
                  <Columns3Icon />
                </Button>
              </MenuTrigger>

              <TableColumnVisibility>
                {({ columns }) => (
                  <MenuPortal>
                    <MenuContent>
                      {columns.map((col, i) => (
                        <MenuCheckboxItem
                          key={i}
                          checked={col.visibility}
                          onChange={col.toggleVisibility}
                        >
                          {col.title}
                        </MenuCheckboxItem>
                      ))}
                    </MenuContent>
                  </MenuPortal>
                )}
              </TableColumnVisibility>
            </MenuRoot>
          </div>

          <Table variant="strip" />
        </div>
      </TableSelectRowRoot>
    </TableRoot>
  );
};

export const Default = {
  render: Template,
};
