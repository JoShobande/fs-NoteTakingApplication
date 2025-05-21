// src/app/api/notes/[noteId]/route.ts

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/options";
import prismadb from "../../../../../lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { noteId: string } }
) {
  // 1) Session check
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { noteId } = params;

  // 2) Fetch the single note, scoped to this user
  const note = await prismadb.notes.findUnique({
    where: { id: noteId },
  });

  // 3) Not found or not theirs?
  if (!note || note.userId !== session.user.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // 4) Return the note
  return NextResponse.json(note);
}
