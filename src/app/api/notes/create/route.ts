import { NextResponse } from 'next/server'
import prismadb from '../../../../lib/prismadb'
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import {z} from 'zod'
import { errorResponse } from '../../../../lib/errorResponse';
import { logRequest } from '../../../../lib/logRequest';

const NoteCreateSchema = z.object({
  title: z.string().min(1).max(100, "Title must be between 1 and 100 characters"),
  noteContent: z
    .string()
    .min(1)
    .max(5000, "Note content must be between 1 and 5000 characters"),
  themeColor: z
    .string()
    .min(1, "Theme color is required")
    .regex(/^bg\[#([A-Fa-f0-9]{6})\]$/, "Invalid theme color format"),
});

export async function POST(req: Request) {
  const start = performance.now();
  const requestId = crypto.randomUUID();

  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id || !session?.user?.email) {
      return errorResponse({
        code: "UNAUTHORIZED",
        message: "You must be logged in to create a note",
        requestId,
      });
    }

    const body = await req.json()
    const parsed = NoteCreateSchema.safeParse(body);
    
    if (!parsed.success) {
      const details = parsed.error.issues.map((e) => ({
        path: e.path.join("."),
        message: e.message,
      }));
      const durationMs = (performance.now() - start)
      logRequest({
        method: 'POST',
        route: 'create',
        requestId,
        user: session.user.email,
        duration:durationMs,
        status:400,
        extra:{error:'validation failed'}
      })
       return errorResponse({
        code: "BAD_REQUEST",
        message: "Validation failed",
        requestId,
        details
      });
    }

    const { title, noteContent, themeColor} = parsed.data;


    const note = await prismadb.notes.create({
      data: {
        title,
        noteContent,
        themeColor,
        userId: session.user.id,  
      },
    })
    const durationMs = performance.now() - start;
    logRequest({
      method: 'POST',
      route: 'create',
      requestId,
      user: session.user.email,
      duration:durationMs,
      status:201,
      extra: {message:'note created'}
    })

    return NextResponse.json(
      {
        data: {
          ...note,
          createdAt: note.createdAt.toISOString(),
          updatedAt: note.updatedAt.toISOString(),
        },
        requestId,
      },
      { status: 201 }
    );
  } catch (err: any) {
    const durationMs = (performance.now() - start)
    logRequest({
      method: 'POST',
      route: 'create',
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
