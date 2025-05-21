import { NextResponse } from 'next/server'
import prismadb from '../../../../lib/prismadb'
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";


export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { title, noteContent, themeColor } = await req.json()

    await prismadb.notes.create({
      data: {
        title,
        noteContent,
        themeColor,
        userId: session.user.id,  
      },
    })

    return NextResponse.json(
      { message: 'Note Created Successfully' },
      { status: 201 }
    )
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || "Unknown error" },
      { status: 500 }
    )
  }
}
