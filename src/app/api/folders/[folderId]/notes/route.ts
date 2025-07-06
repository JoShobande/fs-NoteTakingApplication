// src/app/api/folders/[folderId]/notes/route.ts
import { NextRequest, NextResponse } from "next/server";
import prismadb from "../../../../../lib/prismadb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../auth/[...nextauth]/options";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ folderId: string }> } 
) {
  // optional: auth check



  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { folderId } = await params;
  console.log("API got folderId:", folderId);
  
  const notes = await prismadb.notes.findMany({
    where: {
      folderId: folderId,
      userId: session.user.id,
      trash: false,
      archived: false
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(notes);
}

// export async function POST(
//   req: NextRequest,
//   { params }: { params: { folderId: string } }
// ) {
//   const session = await getServerSession(authOptions);
//   if (!session?.user?.id) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   const { title, noteContent, themeColor } = await req.json();
//   const note = await prismadb.notes.create({
//     data: {
//       title,
//       noteContent,
//       themeColor,
//       userId: session.user.id,
//       folderId: params.folderId,
//     },
//   });

//   return NextResponse.json(note, { status: 201 });
// }
