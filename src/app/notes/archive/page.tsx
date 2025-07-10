'use client'

import Card from "@components/components/Card"
import { useEffect, useState } from "react"
import { FoldersType, Note } from "../page"
import { toast } from "sonner";
import Modal from "@components/components/Modal";
import { Loader } from "lucide-react";
import { useRouter} from "next/navigation"
import CreateFolder from "@components/components/NewFolder";

 
export default function Archive() {

  const [notes, setNotes] = useState<Note[]>([])
  const [folders, setFolders] = useState<FoldersType[]>([])
  const [loadingAction, setLoadingAction] = useState(false)
  
  const [openUnarchiveAllModal, setOpenUnarchiveAllModal] = useState(false)
 
  const [view, setView] = useState<'notes'|'folders'>('notes')

  const [editMode, setEditMode] = useState(false)

  const [folderId, setFolderId] = useState('')
  const [openFolderModal, setOpenFolderModal] = useState(false)

  const fetchArchivedNotes = async () => {
    // setLoading(true)
    try {
      const res = await fetch('/api/notes/archive', {method:'GET'})
      const data = await res.json()
      setNotes(data)
    } catch (err: any) {
      console.error(err)
    } finally {
      // setLoading(false)
    }
  }

  const fetchArchivedFolders = async () => {
    // setLoading(true)
    try {
      const res = await fetch('/api/folders/archive', {method:'GET'})
      const data = await res.json()
      setFolders(data)
    } catch (err: any) {
      console.error(err)
    } finally {
      // setLoading(false)
    }
  }

  const handleUnarchiveIndividualNote = async(id:string) => {
    try {
      setLoadingAction(true)
      await fetch(`/api/notes/unarchive/${id}`, {method:'PUT'})
      toast.success('Successfully removed note from archive')
      fetchArchivedNotes()
    } catch (err: any) {
      console.error(err)
    } finally {
      setLoadingAction(false)
    }
  }

  const handleUnarchiveIndividualFolder = async(id:string) => {
    try {
      setLoadingAction(true)
      await fetch(`/api/folders/unarchive/${id}`, {method:'PUT'})
      toast.success('Successfully removed folder from archive')
      fetchArchivedFolders()
    } catch (err: any) {
      console.error(err)
    } finally {
      setLoadingAction(true)
    }
  }

  const handleUnarchiveAllNotes = async() => {
    try {
      setLoadingAction(true)
      await fetch(`/api/notes/unarchive`, {method:'PUT'})
      toast.success('Successfully restored all Note')
      setOpenUnarchiveAllModal(false)
      fetchArchivedNotes()
    } catch (err: any) {
      console.error(err)
    } finally {
      setLoadingAction(false)
    }
  }

  const handleUnarchiveAllFolders = async() => {
    try {
      setLoadingAction(true)
      await fetch(`/api/folders/unarchive`, {method:'PUT'})
      toast.success('Successfully restored all Note')
      setOpenUnarchiveAllModal(false)
      fetchArchivedFolders()
    } catch (err: any) {
      console.error(err)
    } finally {
      setLoadingAction(false)
    }
  }

  const handleOpenFolderModal = (id:string) =>{
    setFolderId(id)
    setEditMode(true)
    setOpenFolderModal(true)
  }


  useEffect(()=>{
    fetchArchivedFolders()
    fetchArchivedNotes()
  },[])


  
  return (
    <section className="min-h-screen">
      <div className="flex">
        <main className="flex-1 p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-semibold">Archive</h1>
            <div className="space-x-2">
              <button
                onClick={()=>setOpenUnarchiveAllModal(true)}
                className="px-4 py-2 bg-green-600 text-white text-[14px] rounded hover:bg-green-700 rounded-[20px] cursor-pointer"
              >
                {`Remove all ${view} from archive`}
              </button>
            </div>
          </div>
    
          <div className="flex justify-around lg:justify-start lg:space-x-12 border-b mb-6">
            <button
              className={`pb-2 ${view === "notes" ? "border-b-2 border-blue-600" : "text-gray-500"} cursor-pointer`}
              onClick={() => setView("notes")}
            >
              Notes
            </button>
            <button
              className={`pb-2 ${view === "folders" ? "border-b-2 border-blue-600" : "text-gray-500"} cursor-pointer`}
              onClick={() => setView("folders")}
            >
              Folders
            </button>
          </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6'>
              {view === "notes" ? (  
                notes.map((note, index)=>{
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
                      menuOptions={
                        <MenuOptions 
                          id={note.id} 
                          handleUnarchive={handleUnarchiveIndividualNote} 
                          loadingAction={loadingAction}
                          refetchItem={fetchArchivedNotes}
                          type='note'
                        />
                      }
                    />
                  )
                })
              ) : (       
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
                      menuOptions={
                        <MenuOptions 
                          id={folder.id} 
                          handleUnarchive={handleUnarchiveIndividualFolder} 
                          handleOpenFolderModal={handleOpenFolderModal}
                          refetchItem={fetchArchivedFolders}
                          loadingAction={loadingAction}
                          type='folder'
                        />
                      }
                    />
                  )
                })
              )}
            </div>
          
    
          {/* 4️⃣ Empty State */}
          {view === "notes" && notes.length === 0 && (
            <div className="text-center py-20 text-gray-500">
              No deleted notes here — you’re all caught up!
            </div>
          )}
          {view === "folders" && folders.length === 0 && (
            <div className="text-center py-20 text-gray-500">
              No deleted folders here — you’re all caught up!
            </div>
          )}
        </main>
    </div>
    {
      openFolderModal &&
        <Modal
          title='Create Folder'
          children={
            <CreateFolder  
              openFolderModal={openFolderModal} 
              setOpenFolderModal={setOpenFolderModal} 
              folderId={folderId} 
              editMode={editMode}  
              />
            }
          onClose={()=>setOpenFolderModal(false)}
        />
    }
    {
      openUnarchiveAllModal &&
        <Modal
          title={`Restore all ${view}`}
          children={
            <div>
              <p>Are you sure you want to remove all {`${view}`} from your archive?</p>
              <div className='mt-[10px] flex'>
                <button 
                  className='border p-[8px] rounded-[10px] bg-[green] text-[white] text-[14px] cursor-pointer'
                  onClick={view === 'notes' ? handleUnarchiveAllNotes: handleUnarchiveAllFolders}
                  disabled={loadingAction}
                >
                  {loadingAction ? <Loader className='animate-spin'/> : 'Remove'}
                </button>
                <button 
                  className='ml-[10px] border p-[8px] rounded-[10px] bg-blue-700 text-[white] text-[14px] cursor-pointer'
                  onClick={()=>setOpenUnarchiveAllModal(false)}
                > 
                  Cancel
                </button>
              </div>
              
            </div>
            
          }
          onClose={()=>setOpenUnarchiveAllModal(false)}
        />
      }
  </section>
  
  )
}

export const MenuOptions = (
  {
    id, 
    handleUnarchive, 
    loadingAction, 
    refetchItem, 
    type,
    handleOpenFolderModal,
  }:{
    id:string, 
    handleUnarchive: (id: string) => Promise<void>, 
    loadingAction: boolean,  
    type:'note' | 'folder',
    handleOpenFolderModal?: (id: string) => void, 
    refetchItem: () => Promise<void>  
  }
) => {
  const router = useRouter()
  const [action, setAction] = useState('')
  const [loadingDelete, setLoadingDelete]= useState(false)
 
  const handleUnarchiveItem = () =>{
    setAction('unarchive')
    handleUnarchive(id)
  }

  const handleEditItem = () => {
    setAction('edit')
    if(type ==='note'){
      router.push(`/notes/add-new?id=${id}`)
    }else{
      handleOpenFolderModal && handleOpenFolderModal(id)
    } 
  }

  const handleDeleteNote = async() => {
    try {
      setLoadingDelete(true);
      await fetch(`/api/notes/delete/${id}`, { method: "DELETE" });
      toast.success("Note moved to Trash");
      refetchItem()
    } catch (err) {
      console.error(err);
      toast.error("Could not delete note");
    } finally {
      setLoadingDelete(false);
    }
  }

  const handleDeleteFolder = async() => {
    try {
      setLoadingDelete(true);
      await fetch(`/api/folders/delete/${id}`, { method: "DELETE" });
      toast.success("Folder moved to Trash");
      refetchItem()
    } catch (err) {
      console.error(err);
      toast.error("Could not delete folder");
    } finally {
      setLoadingDelete(false);
    }
  }

  const handleDeleteItem = () => {
    type === 'note' ? handleDeleteNote() : handleDeleteFolder()
  }

  return(
    <div className='p-[15px]'>
      <ul>
        <li className='p-2' onClick={handleUnarchiveItem}>{(loadingAction && action === 'unarchive') ? 'wait...' : 'Unarchive'}</li>
        <li className='p-2' onClick={handleEditItem}>{(loadingAction && action ===' edit') ? 'wait...' : 'Edit'}</li>
        <li className='p-2' onClick={handleDeleteItem}>{loadingDelete ? 'wait...' : 'Delete'}</li>
      </ul>
    </div>
  )
}