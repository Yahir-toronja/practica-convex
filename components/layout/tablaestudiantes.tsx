"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";

export function TablaEstudiantes() {
  const estudiantes = useQuery(api.alumnos.getAlumnos);

  if (estudiantes === undefined) {
    return <div>Cargando estudiantes...</div>;
  }

  return (
    <Table>
      <TableCaption>Lista de estudiantes registrados</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Matrícula</TableHead>
          <TableHead>Nombre</TableHead>
          <TableHead>Correo</TableHead>
          <TableHead>Grado</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {estudiantes.length === 0 ? (
          <TableRow>
            <TableCell colSpan={3} className="text-center">
              No hay estudiantes registrados
            </TableCell>
          </TableRow>
        ) : (
          estudiantes.map((estudiante) => (
            <TableRow key={estudiante._id}>
              <TableCell>{estudiante.matricula}</TableCell>
              <TableCell>{estudiante.nombre}</TableCell>
              <TableCell>{estudiante.correo}</TableCell>
              <TableCell>{estudiante.grado}</TableCell>
              <TableCell><Button>eliminar</Button></TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}