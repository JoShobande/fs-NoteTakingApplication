import { NextResponse } from "next/server";
import prismadb from "../../../../lib/prismadb";
import type { NextRequest } from "next/server";

export async function GET( req: NextRequest,  { params }: { params: Promise<{ folderId: string }> } ) {
    const { folderId } =  await params;
    const note = await prismadb.folder.findUnique({
        where: { id:folderId }
    });
 
  return NextResponse.json(note);
}


