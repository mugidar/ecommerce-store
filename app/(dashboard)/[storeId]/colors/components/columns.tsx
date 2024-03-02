"use client";
import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";

export type ColorColumn = {
  id: string;
  name: string;
  value: string;
  createdAt: string;
};

export const columns: ColumnDef<ColorColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    id: "value",
    accessorKey: "value",
    header: "Value",
    cell: ({ row }) => (
      <div className="flex gap-2">
        {row.original.value}{" "}
        <span
          className={`block w-5 h-5`}
          style={{ backgroundColor: `${row.original.value}` }}
        ></span>
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
