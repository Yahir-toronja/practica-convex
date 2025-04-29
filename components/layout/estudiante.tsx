'use client';

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Id } from "@/convex/_generated/dataModel";

interface EstudianteProps {
  estudiante: {
    _id: Id<"alumnos">;
    matricula: string;
    nombre: string;
    correo: string;
    grado: number;
    carrera: string;
  } | null;
  onClose: () => void;
}

export function Estudiante({ estudiante, onClose }: EstudianteProps) {
  const [formData, setFormData] = useState({
    matricula: estudiante?.matricula || '',
    nombre: estudiante?.nombre || '',
    correo: estudiante?.correo || '',
    grado: estudiante?.grado || 0,
    carrera: estudiante?.carrera || ''
  });

  const actualizarEstudiante = useMutation(api.alumnos.actualizarAlumnos);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'grado' ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (estudiante) {
      try {
        await actualizarEstudiante({
          id: estudiante._id, // Añadir el ID aquí
          matricula: formData.matricula,
          nombre: formData.nombre,
          correo: formData.correo,
          grado: formData.grado,
          carrera: formData.carrera
        });
        onClose();
      } catch (error) {
        console.error("Error al actualizar estudiante:", error);
      }
    }
  };

  if (!estudiante) {
    return null;
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Editar Estudiante</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="matricula">Matrícula</Label>
            <Input
              id="matricula"
              name="matricula"
              value={formData.matricula}
              onChange={handleInputChange}
              disabled
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre</Label>
            <Input
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="correo">Correo</Label>
            <Input
              id="correo"
              name="correo"
              type="email"
              value={formData.correo}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="grado">Grado</Label>
            <Input
              id="grado"
              name="grado"
              type="number"
              value={formData.grado}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="carrera">Carrera</Label>
            <Input
              id="carrera"
              name="carrera"
              value={formData.carrera}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              Guardar Cambios
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}