'use client'
import { Edit2, Archive, Trash2, Loader } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { NoteProps } from "../add-new/page";
import { useRouter, useParams } from "next/navigation"
import Modal from "@components/components/Modal";

export default function NoteDetailPage() {

  const { noteId } = useParams();   
  const [note, setNote] = useState<NoteProps>()
  const [deleteModal, setDeleteModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [archiveModal, setArchiveModal] = useState(false)

  const router = useRouter()

  const handleGetNoteDetails = async() => {
    try {
      const res = await fetch(`/api/notes/${noteId}`)
      if (!res.ok) throw new Error('Not authorized')
      const data:NoteProps = await res.json()
      setNote(data)
    } catch (err: any) {
      console.error(err)
    } 
  }

  const handleDeleteNote = async() => {
    try {
      setLoading(true);
      await fetch(`/api/notes/delete/${noteId}`, { method: "DELETE" });
      toast.success("Note moved to Trash");
      router.push("/notes");
    } catch (err) {
      console.error(err);
      toast.error("Could not delete note");
    } finally {
      setLoading(false);
    }
  }
  const handleArchiveNote = async() => {
    try {
      setLoading(true);
      await fetch(`/api/notes/archive/${noteId}`, { method: "PUT" });
      toast.success("Note moved to Archive");
      router.push("/notes");
    } catch (err) {
      console.error(err);
      toast.error("Could not archive note");
    } finally {
      setLoading(false);
    }
  }

 useEffect(()=>{
  handleGetNoteDetails()
 },[noteId])

  return (
    <div className={`${note?.themeColor} min-h-screen p-6 flex flex-col`}>
      <div className="flex justify-end space-x-4 mb-4">
        <Link
          aria-label="Edit note"
          href={`/notes/add-new?id=${note?.id}`}
          className="p-2 rounded hover:bg-white/30"
        >
          <Edit2 size={20} />
        </Link>
        <button
          aria-label="Archive note"
          onClick={() => setArchiveModal(true)}
          className="p-2 rounded hover:bg-white/30 cursor-pointer"
        >
          <Archive size={20} />
        </button>
        <button
          aria-label="Delete note"
          onClick={() => setDeleteModal(true)}
          className="p-2 rounded hover:bg-white/30 text-red-600 cursor-pointer"
        >
          <Trash2 size={20} />
        </button>
      </div>

      <h1 className="text-3xl font-semibold text-gray-900 mb-4">
        {note?.title}
      </h1>

       <textarea 
          value={note?.noteContent}
          placeholder="Start writing your note..."
          required
          className="flex-1 w-full resize-none border-none focus:outline-none 
                  bg-transparent text-gray-800 text-base leading-6"
                  disabled
      />
      {
        deleteModal &&
          <Modal
            title='hello'
            children={
              <div>
                <p>Are you sure you want to move this item to trash?</p>
                <div className='mt-[10px] flex'>
                  <button 
                    className='border p-[8px] rounded-[10px] bg-[red] text-[white] text-[14px] cursor-pointer'
                    onClick={handleDeleteNote}
                    disabled={loading}
                  >
                    {
                      loading ? <Loader className='animate-spin'/> : 'Delete'
                    }
                  </button>
                  <button 
                    className='ml-[10px] border p-[8px] rounded-[10px] bg-blue-700 text-[white] text-[14px] cursor-pointer'
                    onClick={()=>setDeleteModal(false)}
                  > 
                    Cancel
                  </button>
                </div>
                
              </div>
              
            }
            onClose={()=>setDeleteModal(false)}
          />
      }
      {
        archiveModal &&
          <Modal
            title='hello'
            children={
              <div>
                <p>Are you sure you want to move this item your Archive?</p>
                <div className='mt-[10px] flex'>
                  <button 
                    className='border p-[8px] rounded-[10px] bg-[green] text-[white] text-[14px] cursor-pointer'
                    onClick={handleArchiveNote}
                    disabled={loading}
                  >
                    {loading ? <Loader className='animate-spin'/> : 'Archive'}
                  </button>
                  <button 
                    className='ml-[10px] border p-[8px] rounded-[10px] bg-blue-700 text-[white] text-[14px] cursor-pointer'
                    onClick={()=>setArchiveModal(false)}
                  > 
                    Cancel
                  </button>
                </div>
                
              </div>
              
            }
            onClose={()=>setDeleteModal(false)}
          />
      }
      
    </div>
  );
}
