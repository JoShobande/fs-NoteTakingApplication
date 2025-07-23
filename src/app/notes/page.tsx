'use client'

import Card from "@components/components/Card";
import NewItem from "@components/components/NewItem";
import {  useEffect, useState } from "react";
import { Loader2 } from 'lucide-react' 
import { useRouter} from "next/navigation"
import { toast } from "sonner";
import Modal from '../../components/Modal'
import { FolderMenuOptions } from "./folders/page";
import CreateFolder from "@components/components/NewFolder";


export type Note = {
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

  const [folderId, setFolderId] = useState('')
  const [editMode, setEditMode] = useState(false)


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

  const handleOpenFolderModal = (id:string) =>{
    setFolderId(id)
    setEditMode(true)
    setOpenFolderModal(true)
   
  }

  useEffect(() => {
   fetchNotes()
   fetchFolders()
  }, [])



  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <Loader2 className="animate-spin h-[80px] w-[80px] mr-2 text-blue-600" />
        <span>Loading notes…</span>
      </div>
    )
  }

  return (
    <section className="h-full">
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
                    menuOptions={<FolderMenuOptions id={folder.id} refetchFolders={fetchFolders} handleOpenFolderModal={handleOpenFolderModal}/>}
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
          children={<CreateFolder notes={notes} openFolderModal={openFolderModal} setOpenFolderModal={setOpenFolderModal} editMode={editMode} folderId={folderId}/>}
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





