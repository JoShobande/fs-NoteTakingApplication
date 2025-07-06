'use client'

import Card from "@components/components/Card"
import { useEffect, useState } from "react";
import { FoldersType } from "../page";
import { useRouter} from "next/navigation"
import { toast } from "sonner";
 
export default function Folders() {

  const [folders, setFolders] = useState<FoldersType[]>([]);
  const[loading, setLoading] = useState(false)

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

  useEffect(()=>{
    fetchFolders()
  },[])
  
  return (
    <section>
      <h1 className='text-[25px] mb-[20px] font-[500]'>Folders</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {
          folders.map((folder, index)=>{
              return(
                <Card
                  type='folder'
                  backgroundColor={folder.themeColor}
                  name={folder.name}
                  folderIconColor={folder.iconColor}
                  date={folder.createdAt}
                  key={index}
                  pageRedirect={`/notes/folders/${folder.id}`}
                  menuOptions={<FolderMenuOptions id={folder.id} refetchFolders={fetchFolders}/>}
              />
              )
          })
        }
      </div>
    </section>
  )
}

export const FolderMenuOptions = ({id, refetchFolders}:{id:string, refetchFolders:() => Promise<void>}) => {
  const router = useRouter()
  const [loadingDelete, setLoadingDelete]= useState(false)
  const [loadingArchiving, setLoadingArchiving]= useState(false)

  const handleEditNote = () => {
    // router.push(`/fode/add-new?id=${id}`)
  }

  const handleDeleteNote = async() => {
    try {
      setLoadingDelete(true);
      await fetch(`/api/folders/delete/${id}`, { method: "DELETE" });
      toast.success("folder moved to Trash");
      refetchFolders()
    } catch (err) {
      console.error(err);
      toast.error("Could not delete folder");
    } finally {
      setLoadingDelete(false);
    }
  }
  const handleArchiveNote = async() => {
    try {
      setLoadingArchiving(true);
      await fetch(`/api/folders/archive/${id}`, { method: "PUT" });
      toast.success("folder moved to Archive");
      refetchFolders()
    } catch (err) {
      console.error(err);
      toast.error("Could not archive folder");
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