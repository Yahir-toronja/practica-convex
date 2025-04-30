"use client";

import { useState } from "react";
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
} from "@/app/components/ui/table";
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
} from "@/app/components/ui/alert-dialog"
import { Dialog, DialogContent } from "@/app/components/ui/dialog";
import { Estudiante } from "./estudiante";
import { Id } from "@/convex/_generated/dataModel";

// Definir el tipo para un estudiante
interface EstudianteType {
  _id: Id<"alumnos">;
  _creationTime: number;
  matricula: string;
  nombre: string;
  carrera: string; 
  grado: number;
  correo: string;
  promedio?: number;
}



export function TablaEstudiantes() {
  const estudiantes = useQuery(api.alumnos.getAlumnos);
  const eliminarEstuiantes = useMutation(api.alumnos.deleteAlumno);
  const [estudianteSeleccionado, setEstudianteSeleccionado] = useState<EstudianteType | null>(null);
  const [dialogoEdicionAbierto, setDialogoEdicionAbierto] = useState(false);

  const handlerEstudiante = async (matricula: string)=>{
    
  }

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
    <>
    <Table>
      <TableCaption>Lista de estudiantes registrados</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Matrícula</TableHead>
          <TableHead>Nombre</TableHead>
          <TableHead>Correo</TableHead>
          <TableHead>Grado</TableHead>
          <TableHead>Acciones</TableHead>
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
      <TableRow key={estudiante._id} >
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
          <Button onClick={() => {
            setEstudianteSeleccionado(estudiante);
            setDialogoEdicionAbierto(true);
          }}>Editar</Button>
        </TableCell>
      </TableRow>
    ))
  )}
</TableBody>
    </Table>
    <Dialog open={dialogoEdicionAbierto} onOpenChange={setDialogoEdicionAbierto}>
      <DialogContent className="sm:max-w-md">
        <Estudiante 
          estudiante={estudianteSeleccionado}
          onClose={() => setDialogoEdicionAbierto(false)}
        />
      </DialogContent>
    </Dialog>
   </>
  );
}