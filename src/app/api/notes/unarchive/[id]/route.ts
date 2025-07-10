import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../../auth/[...nextauth]/options";
import prismadb from "../../../../../lib/prismadb";


export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
  ) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  
    const existing = await prismadb.notes.findUnique({
      where: { id: params.id },
    });
    if (!existing || existing.userId !== session.user.id) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
  
    await prismadb.notes.update({
      where: { id: params.id },
      data: { archived: false },
     
    });
  
    return NextResponse.json({ success: true });
}
  