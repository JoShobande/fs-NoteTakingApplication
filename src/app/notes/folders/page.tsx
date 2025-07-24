'use client'

import Card from "@components/components/Card"
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FoldersType } from "../page";
import { useRouter} from "next/navigation"
import { toast } from "sonner";
import Modal from "@components/components/Modal";
import CreateFolder from "@components/components/NewFolder";
import LoadingState from "@components/components/LoadingState";
 
export default function Folders() {

  const [folders, setFolders] = useState<FoldersType[]>([]);
  const[loading, setLoading] = useState(false)
  const [openFolderModal, setOpenFolderModal] = useState(false)
  const [editMode, setEditMode] = useState(false)

  const [folderId, setFolderId] = useState('')

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

  useEffect(()=>{
    fetchFolders()
  },[])

  if (loading) {
    return <LoadingState description='Loading Folders'/>
  }
  
  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Folders</h1>
        <button
          onClick={() => setOpenFolderModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
        >
          + New Folder
        </button>
      </div>
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
                  menuOptions={<FolderMenuOptions id={folder.id} refetchFolders={fetchFolders} handleOpenFolderModal={handleOpenFolderModal}/>}
              />
              )
          })
        }
      </div>
      {
        openFolderModal &&
        <Modal
          title='Create Folder'
          children={<CreateFolder  openFolderModal={openFolderModal} setOpenFolderModal={setOpenFolderModal} folderId={folderId} editMode={editMode} />}
          onClose={()=>setOpenFolderModal(false)}
        />
      }
    </section>
  )
}

export const FolderMenuOptions = ({id, refetchFolders, handleOpenFolderModal}:{id:string, refetchFolders:() => Promise<void>, handleOpenFolderModal:(id: string) => void}) => {
  const [loadingDelete, setLoadingDelete]= useState(false)
  const [loadingArchiving, setLoadingArchiving]= useState(false)

  const handleEditNote = () => {
    handleOpenFolderModal(id)
    // setOpenFolderModal(false)
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