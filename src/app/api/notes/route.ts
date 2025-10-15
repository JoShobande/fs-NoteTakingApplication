import { NextResponse } from 'next/server'
import prismadb from '../../../lib/prismadb'
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { errorResponse } from '@components/lib/errorResponse';
import { logRequest } from '@components/lib/logRequest';


export async function GET() {
  const start = performance.now();
  const requestId = crypto.randomUUID();

  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email || !session?.user?.id) {
      return errorResponse({
        code: "UNAUTHORIZED",
        message: "Validation failed",
        requestId,
      });
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
    
    const durationMs = (performance.now() - start);
    logRequest({
      method: 'GET',
      route: 'notes',
      requestId,
      user: session.user.email,
      duration:durationMs,
      status:200
    })
    

    return NextResponse.json(
      {
        data,
        meta:{count: data.length, page:1},
        requestId
      },
      {status:200}
    );
  } catch (err: any) {
    const durationMs = (performance.now() - start);
    logRequest({
      method: 'GET',
      route: 'notes',
      requestId,
      duration:durationMs,
      status:500,
      extra: {error: err.message}
    })
    
    return errorResponse({
      code: 'INTERNAL_ERROR',
      message:'Unexpected server error',
      details: err.message || null,
      requestId
    })
  }
}
