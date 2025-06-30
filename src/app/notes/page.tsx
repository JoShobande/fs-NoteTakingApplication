'use client'

import Card from "@components/components/Card";
import NewItem from "@components/components/NewItem";
import { useEffect, useState } from "react";
import { Loader2 } from 'lucide-react' 
import { useRouter} from "next/navigation"
import { toast } from "sonner";


type Note = {
  id: string;
  title: string;
  noteContent: string;
  themeColor: string;
  createdAt: string;
};

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const[loading, setLoading] = useState(false)


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

  useEffect(() => {
   fetchNotes()
  }, [])

  const folders = [
    {
      name:'Movie Review',
      date: '12/12/2021',
      bgColor: 'bg-[#DEF0FF]',
      folderIconColor:'bg-[#9398FB]',
    },
    {
      name:'Class Notes',
      date: '12/12/2021',
      bgColor: 'bg-[#FFD6D5]',
      folderIconColor: 'bg-[#C1774E]',
    },
    {
      name:'Book Lists',
      date: '12/12/2021',
      bgColor: 'bg-[#FEFBEB]',
      folderIconColor:'bg-[#E8E582]',
    },
  ] 

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
             folders.map((folder, index)=>{
               return(
                 <Card
                    type='folder'
                    backgroundColor={folder.bgColor}
                    name={folder.name}
                    folderIconColor={folder.folderIconColor}
                    date={folder.date}
                    key={index}
                    pageRedirect={''}
                 />
               )
             })
           }
           <NewItem type='folder'/>
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
    </section>
  );
}


const MenuOptions = ({id, refetchNotes}:{id:string, refetchNotes:() => Promise<void>}) => {
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
