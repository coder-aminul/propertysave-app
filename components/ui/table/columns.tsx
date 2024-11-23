import { createColumnHelper } from '@tanstack/react-table';

const columnHelper = createColumnHelper();

export const defaultColumns = [
  columnHelper.accessor('id', {
    header: 'ID',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('name', {
    header: 'Name',
    cell: (info) => info.getValue(),
  }),
  // Add more columns as necessary
];
