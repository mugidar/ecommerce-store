"use client";
import { ColumnDef, RowSelection } from "@tanstack/react-table";
import CellAction from "./cell-action";

export type ProductColumn = {
  id: string;
  name: string;
  createdAt: string;
  color: string;
  size: string;
  sizeShortName: string;
  isFeatured: boolean;
  isArchived: boolean;
  category: string;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "isArchived",
    header: "Archived",
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "size",
    header: "Size",
    cell: ({ row }) => (
      <span>
        {row.original.size} ( <b>{row.original.sizeShortName}</b> )
      </span>
    ),
  },
  {
    accessorKey: "color",
    header: "Color",
    cell: ({ row }) => (
      <div className="flex gap-2 items-center">
        <span
          className={`block w-5 h-5`}
          style={{ backgroundColor: `${row.original.color}` }}
        ></span>
        {row.original.color}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
