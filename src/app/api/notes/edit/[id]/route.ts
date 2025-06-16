import { NextResponse } from "next/server";
import prismadb from "../../../../../lib/prismadb";
import type { NextRequest } from "next/server";

export async function PUT( req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = await params;
   
    const { title, noteContent, themeColor } = await req.json();
    if (!title || !noteContent || !themeColor) {
      return NextResponse.json(
        { error: "title, noteContent and themeColor are required" },
        { status: 400 }
      );
    }

    const note = await prismadb.notes.findUnique({
        where: { id }
    });
    if (!note) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    
    const updated = await prismadb.notes.update({
        where: { id: id },
        data: {
            title,
            noteContent,
            themeColor,
            updatedAt: new Date(),
        },
    });
    
    return NextResponse.json(updated);
}
