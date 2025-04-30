import { TablaEstudiantes } from "@/app/components/layout/tablaestudiantes";
import { AgregarEstudiante } from "@/app/components/layout/agregarEstudiantes"

export default function Home() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Sistema de Estudiantes</h1>
      <AgregarEstudiante />
      <TablaEstudiantes />
    </div>
  );
}
