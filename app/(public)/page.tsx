import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <main className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Seleccion lista</h1>
      <div className="">
        <Link href={"/config/estudiantes"}>
          <Card className="">
            <CardHeader>
              <CardTitle>Estudiantes</CardTitle>
              <CardDescription>Tabla de estudiantes</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </main>
  );
}
