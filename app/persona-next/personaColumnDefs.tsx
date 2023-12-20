import { createColumnHelper } from "@tanstack/react-table";
import { Persona } from "@/types/Persona";

const columnHelper = createColumnHelper<Persona>();

export const personaColumnDefs = [
  columnHelper.accessor((row) => row.apellido, {
    id: "apellido",
    cell: (info) => info.getValue(),
    header: (info) => <span>Apellido</span>,
  }),
  columnHelper.accessor((row) => row.nombre, {
    id: "nombre",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>Nombre</span>,
  }),
  columnHelper.accessor((row) => row.fecha_nacimiento, {
    id: "gender",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>Fecha de Nacimiento</span>,
  }),
  columnHelper.accessor((row) => row.nro_documento, {
    id: "email",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>Documento</span>,
  }),
  columnHelper.accessor((row) => row.sexo, {
    id: "ip_address",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>Sexo</span>,
  }),
];
