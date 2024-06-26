'use client'
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { personaColumnDefs } from "../app/persona-next/personaColumnDefs";

export default async function PersonaTable({
  data,
  dataFilterColumns
}: {
  data: string;
  dataFilterColumns: []
}) {

  const table = useReactTable({
    columns: personaColumnDefs(dataFilterColumns),
    data: data ?? [],
    getCoreRowModel: getCoreRowModel(),
  });

  const headers = table.getFlatHeaders();
  const rows    = table.getRowModel().rows;

  return (
    <div className="overflow-x-auto h-100">
      <table className="table table-zebra my-4 w-full table-pin-rows">
        <thead>
          <tr>
            {headers.map((header) => {
              return (
                <th key={header.id}>
                  {header.isPlaceholder ? null : (
                    <span>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </span>
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
            {rows.map((row) => (
                <tr key={row.id} >
                {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                ))}
                </tr>
            ))}
        </tbody>
        </table>
    </div>
  );
};