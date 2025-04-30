'use client';

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
//import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { CheckCircle, AlertCircle } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Esquema de validación para el formulario
const formSchema = z.object({
  matricula: z.string().min(5, "La matrícula es requerida"),
  nombre: z.string().min(4, "El nombre es requerido"),
  carrera: z.string().min(1, "La carrera es requerida"),
  grado: z.coerce.number().min(1, "El grado debe ser mayor a 0"),
  correo: z.string().email("Correo electrónico inválido"),
  // Añadimos el promedio como opcional
  promedio: z.number().default(0).optional(),
});

// Definimos el tipo para nuestro formulario basado en el esquema
type FormValues = z.infer<typeof formSchema>;

export function AgregarEstudiante() {
  const [open, setOpen] = useState(false);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
    visible: boolean;
  } | null>(null);
  
  const agregarEstudiantes = useMutation(api.alumnos.crearAlumno);

  // Configuración del formulario con React Hook Form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      matricula: "",
      nombre: "",
      carrera: "",
      grado: 1,
      correo: "",
      promedio: 0,
    },
  });

  // Función para manejar el envío del formulario
  const onSubmit = async (data: FormValues) => {
    try {
      await agregarEstudiantes({
        matricula: data.matricula,
        nombre: data.nombre,
        carrera: data.carrera,
        grado: data.grado,
        correo: data.correo,
        promedio: data.promedio || 0, // Aseguramos que siempre haya un valor
      });

      // Mostrar notificación de éxito
      setNotification({
        type: 'success',
        message: 'El estudiante ha sido agregado con éxito.',
        visible: true
      });

      // Ocultar notificación después de 3 segundos
      setTimeout(() => {
        setNotification(null);
      }, 3000);

      // Resetear formulario y cerrar diálogo
      form.reset();
      setOpen(false);
    } catch (error) {
      console.error("Error al agregar estudiante:", error);
      setNotification({
        type: 'error',
        message: 'Ocurrió un error al agregar el estudiante.',
        visible: true
      });

      // Ocultar notificación después de 3 segundos
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }
  };

  // Lista de carreras para el selector
  const carreras = ["Ingeniería en Sistemas", "Administración", "Contaduría", "Psicología", "Derecho"];

  return (
    <div className="space-y-4">
      {/* Notificación */}
      {notification && notification.visible && (
        <Alert variant={notification.type === 'success' ? 'default' : 'destructive'} className="mb-4">
          {notification.type === 'success' ? (
            <CheckCircle className="h-4 w-4" />
          ) : (
            <AlertCircle className="h-4 w-4" />
          )}
          <AlertTitle>
            {notification.type === 'success' ? 'Éxito' : 'Error'}
          </AlertTitle>
          <AlertDescription>
            {notification.message}
          </AlertDescription>
        </Alert>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <div className="flex justify-end mb-6">
          <DialogTrigger asChild>
            <Button>Agregar Estudiante</Button>
          </DialogTrigger>
        </div>

        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Agregar Nuevo Estudiante</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="matricula"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Matrícula</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej. A12345" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nombre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre completo</FormLabel>
                    <FormControl>
                      <Input placeholder="Nombre del estudiante" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="carrera"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Carrera</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona una carrera" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {carreras.map((carrera) => (
                          <SelectItem key={carrera} value={carrera}>
                            {carrera}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="grado"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Grado</FormLabel>
                    <FormControl>
                      <Input type="number" min={1} max={12} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="correo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo electrónico</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="correo@ejemplo.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setOpen(false)} type="button">
                  Cancelar
                </Button>
                <Button type="submit">Guardar</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}