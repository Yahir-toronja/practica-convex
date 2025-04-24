"use client";

import { useMutation, useQuery } from "convex/react";
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
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"
//import { alumnos } from "@/convex/schema";


export function TablaEstudiantes() {
  const estudiantes = useQuery(api.alumnos.getAlumnos);
  const eliminarEstuiantes = useMutation(api.alumnos.deleteAlumno);

  const handlerDeleteEstudiante = async (matricula: string) => {
    try {
      await eliminarEstuiantes({ matricula: matricula });
      // Puedes mostrar un toast aquí si quieres
      console.log("Estudiante eliminado");
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

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
      <TableCell colSpan={5} className="text-center">
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
        <TableCell>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Eliminar</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta acción eliminará permanentemente al estudiante <strong>{estudiante.nombre}</strong>.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={() => handlerDeleteEstudiante(estudiante.matricula)}>
                  Sí, eliminar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </TableCell>
      </TableRow>
    ))
  )}
</TableBody>

    </Table>
  );
}