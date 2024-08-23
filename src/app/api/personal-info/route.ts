import { getUserAuth } from "@/lib/auth/utils";
import { db } from "@/lib/db/index";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

// POST: Guarda la información personal del usuario
export async function POST(request: Request) {
  const { session } = await getUserAuth();
  //console.log('hola marico',session)
  if (!session || !session.user || !session.user.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
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

  } catch (error) {
    console.error("Error al guardar la información personal:", error);
    return new Response("Error al guardar la información personal", { status: 500 });
  }
}

// GET: Obtiene la información personal del usuario
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const personalInfo = await db.personalInfo.findMany({
      where: {
        userId: Number(userId),
      },
    });

    return NextResponse.json(personalInfo);

  } catch (error) {
    console.error("Error al obtener la información personal:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
