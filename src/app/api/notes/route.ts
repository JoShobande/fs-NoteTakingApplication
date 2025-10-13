import { NextResponse } from 'next/server'
import prismadb from '../../../lib/prismadb'
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";


export async function GET() {
  const start = performance.now();
  const requestId = crypto.randomUUID();

  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email || !session?.user?.id) {
      return NextResponse.json(
        {
          error:{
            code: 'UNAUTHORIZED',
            message: "You must be logged in to access this resource"
          },
          requestId
        },
        {status: 401}
      );
    }

    const notes = await prismadb.notes.findMany({
        where: { 
          userId: session.user.id, 
          trash: false, 
          archived: false 
        },
        orderBy: { createdAt: "desc" },
    });

    const data = notes.map((note)=>({
      ...note,
      createdAt: note.createdAt.toISOString(),
      updatedAt: note.updatedAt.toISOString(),
      deletedAt: note.deletedAt ? note.deletedAt.toISOString() : null,

    }))
    
    const durationMs = (performance.now() - start).toFixed(2);
    console.info(
      `[GET /notes] requestId=${requestId} user=${session.user.email} count=${data.length} duration=${durationMs}ms`
    );

    return NextResponse.json(
      {
        data,
        meta:{count: data.length, page:1},
        requestId
      },
      {status:200}
    );
  } catch (err: any) {
    const durationMs = (performance.now() - start).toFixed(2);
    console.error(
      `[GET /notes] requestId=${requestId} duration=${durationMs}ms error=${err.message}`
    );
    
    return NextResponse.json(
      {
        error: {
          code: "INTERNAL_ERROR",
          message: "Unexpected server error",
          details: err.message || null,
        },
        requestId,
      },
      { status: 500 }
    );
  }
}
