import Image from "next/image";
import { TablaEstudiantes } from "@/components/layout/tablaestudiantes";

export default function Home() {
  return (
    <main className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Sistema de Estudiantes</h1>
      <TablaEstudiantes />
    </main>
  );
}
