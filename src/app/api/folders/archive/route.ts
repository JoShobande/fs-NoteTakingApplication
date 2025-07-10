import { NextResponse } from 'next/server'
import prismadb from '../../../../lib/prismadb'
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";


export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const folders = await prismadb.folder.findMany({
        where: { userId: session.user.id, archived: true, trash:false},
        orderBy: { createdAt: "desc" },
    });
    
    return NextResponse.json(folders);
  } catch (err: any) {
    console.log(err)
    return NextResponse.json(
      { message: err.message || "Unknown error" },
      { status: 500 }
    )
  }
}
