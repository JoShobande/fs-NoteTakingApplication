import { NextResponse } from "next/server";
import prismadb from "../../../../lib/prismadb";
import type { NextRequest } from "next/server";

export async function GET( req: NextRequest, { params }: { params: { id: string } }) {
    const { id } =  await params;
    const note = await prismadb.notes.findUnique({
        where: { id }
    });
 
  return NextResponse.json(note);
}
