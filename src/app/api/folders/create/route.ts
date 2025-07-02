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

    const { name, notes, themeColor, iconColor } = await req.json()

    const folder = await prismadb.folder.create({
      data: {
        name,
        notes: notes?.length
        ? {
            connect: notes.map((id: string) => ({ id })),
          }
        : undefined,
        themeColor,
        userId: session.user.id, 
        iconColor 
      },
      include: { notes: true },
    })
    return NextResponse.json(
      { message: 'Folder Created Successfully' },
      { status: 201 }
    )
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || "Unknown error" },
      { status: 500 }
    )
  }
}
