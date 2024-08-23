import { getUserAuth } from "@/lib/auth/utils";
import { db } from "@/lib/db/index";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  const { session } = await getUserAuth();
  console.log({session});
  if (!session) return new Response("Error", { status: 400 });

  const body = (await request.json()) as {
    name: string;
    cedula: string;
    telefono: string;
    direccion: string;
    salario: number;
  };

  // Inserta la información personal en la base de datos
  const data = await db.personalInfo.create({
    data: {
      userId: Number(session.user.id),
      name: body.name,
      cedula: body.cedula,
      telefono: body.telefono,
      direccion: body.direccion,
      salario: body.salario,
    },
  });

  // Opcional: revalidar la caché si es necesario
  revalidatePath("/dashboard");

  return new Response(JSON.stringify({ message: "Información personal guardada exitosamente", data }), { status: 200 });
}
