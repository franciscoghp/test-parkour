import { getUserAuth } from "@/lib/auth/utils";
import { db } from "@/lib/db/index";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

// POST: Guarda la información personal del usuario
export async function POST(request: Request) {
  const { session } = await getUserAuth();

  if (!session || !session.user || !session.user.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const body = (await request.json()) as {
      name: string;
      cedula: number;
      telefono: number;
      direccion: string;
      salario: number;
    };

    // Inserta la información personal en la base de datos
    await db.personalInfo.create({
      data: {
        userId: Number(session.user.id),
        name: body.name,
        cedula: Number(body.cedula),
        telefono: Number(body.telefono),
        direccion: body.direccion,
        salario: body.salario,
      },
    });

    // Redirige a la ruta /dashboard
    revalidatePath('/dashboard')
    return NextResponse.redirect(new URL('/dashboard', request.url));

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
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const personalInfo = await db.personalInfo.findMany({
      where: {
        userId: Number(userId),
      },
    });

    const response = NextResponse.json(personalInfo);
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Access-Control-Allow-Origin', '*'); // Permite solicitudes desde cualquier origen

    return response;
  } catch (error) {
    return new Response("Failed to fetch data", { status: 500 });
  }
}

