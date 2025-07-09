import { NextResponse } from "next/server";
import prismadb from "../../../../../lib/prismadb";
import type { NextRequest } from "next/server";

export async function PUT( req: NextRequest, { params }: { params: { folderId: string } }) {
    const { folderId } = await params;
   
    const { name, themeColor, notes, iconColor,  } = await req.json();
    if (!name || !themeColor  ) {
      return NextResponse.json(
        { error: "name, and themeColor are required" },
        { status: 400 }
      );
    }

    const folder = await prismadb.folder.findUnique({
        where: { id:folderId }
    });
    if (!folder) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    
    const updated = await prismadb.folder.update({
        where: { id: folderId },
        data: {
            name,
            themeColor,
            notes: notes?.length
        ? {
            connect: notes.map((id: string) => ({ id })),
          }
        : undefined,
            iconColor,
            updatedAt: new Date(),
        },
    });
    
    return NextResponse.json(updated);
}
