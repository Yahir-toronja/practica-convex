import { useState, useEffect } from 'react';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  User, 
  Book, 
  Mail, 
  Award, 
  GraduationCap, 
  Printer, 
  Edit 
} from 'lucide-react';

export default function DashboardAlumno() {
  // Obtener la lista de alumnos usando Convex
  const alumnos = useQuery(api.alumnos.getAlumnos) || [];
  const [selectedMatricula, setSelectedMatricula] = useState("");
  const [loading, setLoading] = useState(true);

  // Obtener los detalles del alumno seleccionado
  const alumno = useQuery(
    api.alumnos.getAlumnoById, 
    selectedMatricula ? { matricula: selectedMatricula } : "skip"
  );

  // Inicializar el primer alumno al cargar los datos
  useEffect(() => {
    if (alumnos && alumnos.length > 0 && !selectedMatricula) {
      setSelectedMatricula(alumnos[0].matricula);
    }
    
    if (alumnos !== undefined) {
      setLoading(false);
    }
  }, [alumnos, selectedMatricula]);

  // Función para cambiar el alumno seleccionado
  const handleSelectAlumno = (matricula) => {
    setSelectedMatricula(matricula);
  };

  // Obtener el estado de desempeño según el promedio
  const getDesempenoInfo = (promedio) => {
    if (promedio >= 9) {
      return { texto: 'Excelente', color: 'bg-green-100 text-green-800' };
    } else if (promedio >= 8) {
      return { texto: 'Muy Bueno', color: 'bg-blue-100 text-blue-800' };
    } else if (promedio >= 7) {
      return { texto: 'Regular', color: 'bg-yellow-100 text-yellow-800' };
    } else {
      return { texto: 'Necesita Mejorar', color: 'bg-red-100 text-red-800' };
    }
  };

  // Mostrar pantalla de carga
  if (loading) {
    return (
      <div className="flex flex-col w-full max-w-4xl mx-auto p-4 space-y-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <div className="grid md:grid-cols-2 gap-4">
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full col-span-2" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Mostrar mensaje si no hay alumnos
  if (alumnos.length === 0) {
    return (
      <div className="flex flex-col w-full max-w-4xl mx-auto p-4">
        <Card>
          <CardContent className="flex items-center justify-center py-8">
            <p className="text-gray-500">No se encontraron alumnos en el sistema.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Dashboard de Estudiantes</CardTitle>
          <CardDescription>
            Visualiza y gestiona la información de los estudiantes
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Selector de estudiante */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Seleccionar Estudiante
            </label>
            <Select 
              value={selectedMatricula} 
              onValueChange={handleSelectAlumno}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccionar estudiante" />
              </SelectTrigger>
              <SelectContent>
                {alumnos.map((alumno) => (
                  <SelectItem key={alumno.matricula} value={alumno.matricula}>
                    {alumno.nombre} ({alumno.matricula})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Dashboard del alumno seleccionado */}
          {alumno ? (
            <div className="space-y-6">
              {/* Encabezado con información principal */}
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{alumno.nombre}</h2>
                  <p className="text-gray-500">Matrícula: {alumno.matricula}</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                {/* Información académica */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Book className="h-5 w-5 mr-2 text-blue-600" />
                      Información académica
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Carrera:</span>
                      <span className="font-medium">{alumno.carrera}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Grado:</span>
                      <span className="font-medium">{alumno.grado}° semestre</span>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Contacto */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Mail className="h-5 w-5 mr-2 text-blue-600" />
                      Contacto
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Correo electrónico:</span>
                      <span className="font-medium text-blue-600">{alumno.correo}</span>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Rendimiento académico */}
                <Card className="col-span-2">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Award className="h-5 w-5 mr-2 text-blue-600" />
                      Rendimiento académico
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Promedio general:</span>
                      <Badge variant="outline" className="text-lg font-semibold">
                        {alumno.promedio.toFixed(1)}
                      </Badge>
                    </div>
                    
                    {/* Barra de progreso para visualizar el promedio */}
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>0.0</span>
                        <span>10.0</span>
                      </div>
                      <Progress value={(alumno.promedio / 10) * 100} className="h-2" />
                    </div>
                    
                    {/* Calificación */}
                    <div className="flex justify-center">
                      <div className={`p-3 rounded-full ${getDesempenoInfo(alumno.promedio).color} flex items-center`}>
                        <GraduationCap className="mr-2 h-5 w-5" />
                        <span className="font-medium">
                          {getDesempenoInfo(alumno.promedio).texto}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : selectedMatricula ? (
            <div className="flex items-center justify-center p-8">
              <p className="text-gray-500">Cargando información del estudiante...</p>
            </div>
          ) : null}
        </CardContent>
        
        {/* Acciones */}
        {alumno && (
          <CardFooter className="flex justify-end space-x-2 bg-gray-50">
            <Button variant="outline" className="flex items-center">
              <Printer className="mr-2 h-4 w-4" />
              Imprimir kardex
            </Button>
            <Button className="flex items-center">
              <Edit className="mr-2 h-4 w-4" />
              Editar información
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}