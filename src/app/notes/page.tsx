'use client'

import Card from "@components/components/Card";
import NewItem from "@components/components/NewItem";
import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react";
import { Loader2 } from 'lucide-react' 
import { useRouter} from "next/navigation"
import { toast } from "sonner";
import Modal from '../../components/Modal'
import { FolderMenuOptions } from "./folders/page";


type Note = {
  id: string;
  title: string;
  noteContent: string;
  themeColor: string;
  createdAt: string;
};

export type FoldersType = {
  id: string;
  name: string;
  notes: string[];
  themeColor: string;
  createdAt: string;
  iconColor:string
};


export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [folders, setFolders] = useState<FoldersType[]>([]);
  const[loading, setLoading] = useState(false)

  const [openFolderModal, setOpenFolderModal] = useState(false)


  const fetchNotes = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/notes', {method:'GET'})
      const data = await res.json()
      setNotes(data)
    } catch (err: any) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const fetchFolders = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/folders', {method:'GET'})
      const data = await res.json()
      setFolders(data)
    } catch (err: any) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
   fetchNotes()
   fetchFolders()
  }, [])



  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-10 ">
        <Loader2 className="animate-spin h-[80px] w-[80px] mr-2 text-blue-600" />
        <span>Loading notes…</span>
      </div>
    )
  }

  return (
    <section className="">
      <div className='hidden lg:block'>
        <h1 className='text-[25px] mb-[20px] font-[500]'>Recent Folders</h1>
        <div className='flex space-x-8 items-center'>
           {
             folders?.slice(0, 3).map((folder, index)=>{
               return(
                 <Card
                    type='folder'
                    backgroundColor={folder.themeColor}
                    name={folder.name}
                    folderIconColor={folder.iconColor}
                    date={folder.createdAt}
                    key={index}
                    pageRedirect={''}
                    menuOptions={<FolderMenuOptions id={folder.id} refetchFolders={fetchFolders}/>}
                 />
               )
             })
           }
           <NewItem 
              type='folder'
              openModal={()=>setOpenFolderModal(true)}

           />
        </div>
      </div>
      <div className='lg:mt-[50px] flex flex-col items-center lg:block'>
        <h1 className='hidden lg:block text-[25px] mb-[20px] font-[500]'>My Notes</h1>
        <div className=' lg:flex lg:space-x-8 items-center flex-wrap '>
           {
             notes?.map((note, index)=>{
               return(
                 <Card
                    type='note'
                    backgroundColor={note.themeColor}
                    name={note.title}
                    noteDescription={note.noteContent}
                    date={note.createdAt}
                    key={index}
                    className='mb-4'
                    pageRedirect={`/notes/${note.id}`}
                    menuOptions={<MenuOptions id={note.id} refetchNotes={fetchNotes}/>}
                 />
               )
             })
           } 
        </div>
      </div>
      {
        openFolderModal &&
        <Modal
          title='Create Folder'
          children={<CreateFolder notes={notes} openFolderModal={openFolderModal} setOpenFolderModal={setOpenFolderModal}/>}
          onClose={()=>setOpenFolderModal(false)}
        />
      }
    </section>
  );
}

export const MenuOptions = ({id, refetchNotes}:{id:string, refetchNotes:() => Promise<void>}) => {
  const router = useRouter()
  const [loadingDelete, setLoadingDelete]= useState(false)
  const [loadingArchiving, setLoadingArchiving]= useState(false)

  const handleEditNote = () => {
    router.push(`/notes/add-new?id=${id}`)
  }

  const handleDeleteNote = async() => {
    try {
      setLoadingDelete(true);
      await fetch(`/api/notes/delete/${id}`, { method: "DELETE" });
      toast.success("Note moved to Trash");
      refetchNotes()
    } catch (err) {
      console.error(err);
      toast.error("Could not delete note");
    } finally {
      setLoadingDelete(false);
    }
  }
  const handleArchiveNote = async() => {
    try {
      setLoadingArchiving(true);
      await fetch(`/api/notes/archive/${id}`, { method: "PUT" });
      toast.success("Note moved to Archive");
      refetchNotes()
    } catch (err) {
      console.error(err);
      toast.error("Could not archive note");
    } finally {
      setLoadingArchiving(false);
    }
  }

  return(
    <div className='p-[15px]'>
      <ul>
          <li className='p-2' onClick={handleEditNote}>Edit</li>
          <li className='p-2' onClick={handleArchiveNote}>{loadingArchiving ? 'wait...' : 'Archive'}</li>
          <li className='p-2' onClick={handleDeleteNote}>{loadingDelete ? 'wait...' : 'Delete'}</li>
      </ul>
    </div>
  )
}


interface NoteOption {
  id: string;
  title: string;
}

interface CreateFolderModalProps {
  notes: NoteOption[];
  openFolderModal: boolean
  setOpenFolderModal: Dispatch<SetStateAction<boolean>>
}

function CreateFolder({
  notes,
  setOpenFolderModal
}: CreateFolderModalProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const colorOptions = [
    { name: "blue", value: "bg-[#DEF0FF]", bg: "bg-[#DEF0FF]" },
    { name: "Pink", value: "bg-[#FFD6D5]", bg: "bg-[#FFD6D5]" },
    { name: "Blue", value: "bg-[#FEFBEB]", bg: "bg-[#FEFBEB]" },
  ];
  const [themeColor, setThemeColor] = useState(colorOptions[0].value);
  const [selectedNotes, setSelectedNotes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Close on ESC
  // useEffect(() => {
  //   function onKey(e: KeyboardEvent) {
  //     if (e.key === "Escape") onClose();
  //   }
  //   if (open) document.addEventListener("keydown", onKey);
  //   return () => document.removeEventListener("keydown", onKey);
  // }, [open, onClose]);

  // if (!open) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Folder name is required");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/folders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          themeColor,
          notes: selectedNotes,
          iconColor: themeColor === 'bg-[#DEF0FF]' ? 'bg-[#9398FB]' : themeColor === 'bg-[#FFD6D5]' ? 'bg-[#C1774E]' : 'bg-[#E8E582]'
        }),
      });
      if (!res.ok) throw new Error("Failed to create folder");
      toast.success("Folder created");
      setOpenFolderModal(false)
      router.refresh();
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Could not save folder");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label className="block mb-1 font-medium">Folder Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Class Notes"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <span className="block mb-1 font-medium mb-2 mt-6">Folder Theme Color</span>
          <div className="flex space-x-2">
            {colorOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setThemeColor(opt.value)}
                aria-label={opt.name}
                className={`
                  w-8 h-8 rounded-full
                  ${opt.bg}
                  ${themeColor === opt.value ? "ring-2 ring-offset-2 ring-gray-700" : ""}
                `}
              />
            ))}
          </div>
        </div>

        <div className="mb-6 mt-6">
          <label className="block mb-1 font-medium">Select Note(s)</label>
          <select
            multiple
            value={selectedNotes}
            onChange={(e) =>
              setSelectedNotes(
                Array.from(e.target.selectedOptions, (o) => o.value)
              )
            }
            className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {notes.map((n) => (
              <option key={n.id} value={n.id}>
                {n.title}
              </option>
            ))}
          </select>
          <p className="mt-1 text-xs text-gray-500">
            Hold Shift or Ctrl/Cmd to select multiple
          </p>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={()=>setOpenFolderModal(false)}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2 rounded-lg text-white ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Saving…" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
}
