import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import prismadb from "../../../../lib/prismadb";



export async function DELETE() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  
    await prismadb.notes.deleteMany({
      where: {
        userId: session.user.id,
        trash: true,
      },
    });
  
    return NextResponse.json({ success: true });
  }