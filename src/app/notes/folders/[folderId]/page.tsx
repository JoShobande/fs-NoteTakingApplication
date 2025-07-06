// src/app/folders/[folderId]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Card from "@components/components/Card";
import { Edit2, Archive, Trash2 } from "lucide-react";
import { Loader2, Loader } from "lucide-react";
import { toast } from "sonner";
import Modal from "@components/components/Modal";
import { MenuOptions } from "../../page";

type Note = {
  id: string;
  title: string;
  noteContent: string;
  themeColor: string;
  createdAt: string;
};
type Folder = { id: string; name: string; themeColor: string };

export default function FolderDetailPage() {
  const { folderId } = useParams();
  const router = useRouter();
  const [folder, setFolder] = useState<Folder | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState(false)
  const [loadingAction, setLoadingAction] = useState(false)
  const [archiveModal, setArchiveModal] = useState(false)


  const fetchData = async() => {
    setLoading(true);
    const fRes = await fetch(`/api/folders/${folderId}`);
    const nRes = await fetch(`/api/folders/${folderId}/notes`);
    setFolder(await fRes.json());
    setNotes(await nRes.json());
    setLoading(false);
  }

  useEffect(() => {
    fetchData()
  }, [folderId]);

  const handleDeleteFolder = async() => {
    try {
      setLoadingAction(true);
      await fetch(`/api/folders/delete/${folderId}`, { method: "DELETE" });
      toast.success("Folder moved to Trash");
      router.push("/notes/folders");
    } catch (err) {
      console.error(err);
      toast.error("Could not delete folder. Try again later!");
    } finally {
      setLoadingAction(false);
    }
  }
  const handleArchiveFolder = async() => {
    try {
      setLoadingAction(true);
      await fetch(`/api/folders/archive/${folderId}`, { method: "PUT" });
      toast.success("Folder moved to Archive");
      router.push("/notes/folders");
    } catch (err) {
      console.error(err);
      toast.error("Could not archive folder. Try again later!");
    } finally {
      setLoadingAction(false);
    }
  }
  const handleEdit    = () => router.push(`/folders/edit/${folderId}`);

  if (loading) {
    return (
      
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="animate-spin h-12 w-12 text-blue-600" />
        </div>
      
    );
  }


  return (
      <section className={`p-8 min-h-screen ${folder?.themeColor} `}>
        <div
          className="flex items-center justify-between p-6 rounded-2xl mb-8"
          style={{ backgroundColor: folder?.themeColor }}
        >
          <h1 className="text-3xl font-semibold ">
            {folder?.name}
          </h1>
          <div className="flex space-x-4">
            <button
              onClick={handleEdit}
              className="p-2 rounded bg-white/30 hover:bg-white/50 cursor-pointer"
            >
              <Edit2 size={20} className="" />
            </button>
            <button
              onClick={()=>setArchiveModal(true)}
              className="p-2 rounded bg-white/30 hover:bg-white/50 cursor-pointer"
            >
              <Archive size={20} className="" />
            </button>
            <button
              onClick={()=>setDeleteModal(true)}
              className="p-2 rounded bg-white/30 hover:bg-white/50 cursor-pointer"
            >
              <Trash2 size={20} className="" />
            </button>
          </div>
        </div>

        {notes.length === 0 ? (
          <p className="text-center text-gray-500">No notes in this folder.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <Card
                key={note.id}
                type="note"
                backgroundColor={note.themeColor}
                name={note.title}
                noteDescription={note.noteContent}
                date={note.createdAt}
                pageRedirect={`/notes/${note.id}`}
                menuOptions={<MenuOptions id={note.id} refetchNotes={fetchData}/>}
              />
            ))}
          </div>
        )}

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
                    onClick={handleDeleteFolder}
                    disabled={loading}
                  >
                    {
                      loadingAction ? <Loader className='animate-spin'/> : 'Delete'
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
                    onClick={handleArchiveFolder}
                    disabled={loading}
                  >
                    {loadingAction ? <Loader className='animate-spin'/> : 'Archive'}
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
            onClose={()=>setArchiveModal(false)}
          />
      }
      </section>
    
  );
}
