// 'use client'

// app/notes/[noteId]/page.tsx
import { Edit2, Archive, Trash2 } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/options";
import prismadb from "../../../lib/prismadb";

import Link from "next/link";
// import { useRouter } from "next/navigation";

// const bgMap: Record<string,string> = {
//   blue:   "bg-blue-100",
//   green:  "bg-green-100",
//   yellow: "bg-yellow-200",
//   red:    "bg-red-100",
//   purple: "bg-purple-100",
// };

export default async function NoteDetailPage({
  params,

}: {
    params: Promise<{ noteId: string }>;
  
}) {
  // Guard & fetch
//   const session = await getServerSession(authOptions);
//   if (!session?.user?.id) redirect("/signin");
    const { noteId } = await params;

    // let router = useRouter()

    // const handleRedirectToEdit = () =>{
    //   router.push('/notes/add-new/123')
    // }

  const note = await prismadb.notes.findUnique({
    where: { id: noteId },
  });
  if (!note) {
    return <p className="p-6 text-center">Note not found.</p>;
  }

//   const bgClass = note.themeColor || "bg-white";

  return (
    <div className={`${note.themeColor} min-h-screen p-6 flex flex-col`}>
      {/* Actions */}
      <div className="flex justify-end space-x-4 mb-4">
        <Link
          aria-label="Edit note"
          href={`/notes/add-new?id=${note.id}`}
          // onClick={handleRedirectToEdit}
          className="p-2 rounded hover:bg-white/30"
        >
          <Edit2 size={20} />
        </Link>
        <button
          aria-label="Archive note"
        //   onClick={() => {/* archive handler */}}
          className="p-2 rounded hover:bg-white/30"
        >
          <Archive size={20} />
        </button>
        <button
          aria-label="Delete note"
        //   onClick={() => {/* delete handler */}}
          className="p-2 rounded hover:bg-white/30 text-red-600"
        >
          <Trash2 size={20} />
        </button>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-semibold text-gray-900 mb-4">
        {note.title}
      </h1>

       <textarea 
            value={note.noteContent}
            placeholder="Start writing your note..."
            required
            className="flex-1 w-full resize-none border-none focus:outline-none 
                   bg-transparent text-gray-800 text-base leading-6"
                   disabled
      />
    </div>
  );
}
