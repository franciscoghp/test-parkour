import { PrismaClient } from '@prisma/client';

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var db: PrismaClient | undefined;
}

export const db =
  global.db ||
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") global.db = db;


// import { PrismaClient } from '@prisma/client';

// // Crear una instancia de PrismaClient
// const prisma = new PrismaClient();

// // Exportar prisma para que se pueda utilizar en otras partes del proyecto
// export { prisma };
