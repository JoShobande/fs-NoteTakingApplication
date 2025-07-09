'use client'

import Card from "@components/components/Card"
import { useEffect, useState } from "react"
import { FoldersType, Note } from "../page"
import { toast } from "sonner";
import Modal from "@components/components/Modal";
import { Loader } from "lucide-react";

 
export default function Trash() {

  const [notes, setNotes] = useState<Note[]>([])
  const [folders, setFolders] = useState<FoldersType[]>([])
  const [loadingRestore, setLoadingRestore] = useState(false)
  
  const [openRestoreAllModal, setOpenRestoreAllModal] = useState(false)

  const [view, setView] = useState<'notes'|'folders'>('notes')

  const fetchDeletedNotes = async () => {
    // setLoading(true)
    try {
      const res = await fetch('/api/notes/trash', {method:'GET'})
      const data = await res.json()
      setNotes(data)
    } catch (err: any) {
      console.error(err)
    } finally {
      // setLoading(false)
    }
  }

  const fetchDeletedFolders = async () => {
    // setLoading(true)
    try {
      const res = await fetch('/api/folders/trash', {method:'GET'})
      const data = await res.json()
      setFolders(data)
    } catch (err: any) {
      console.error(err)
    } finally {
      // setLoading(false)
    }
  }

  const handleRestoreIndividualNote = async(id:string) => {
    try {
      setLoadingRestore(true)
      await fetch(`/api/notes/trash/restore/${id}`, {method:'PUT'})
      toast.success('Successfully restored Note')
      fetchDeletedNotes()
    } catch (err: any) {
      console.error(err)
    } finally {
      setLoadingRestore(false)
    }
  }

  const handleRestoreAllNotes = async() => {
    try {
      setLoadingRestore(true)
      await fetch(`/api/notes/trash/restore`, {method:'PUT'})
      toast.success('Successfully restored all Note')
      fetchDeletedNotes()
    } catch (err: any) {
      console.error(err)
    } finally {
      setLoadingRestore(false)
    }
  }

  const handleRestoreIndividualFolder = async(id:string) => {
    try {
      setLoadingRestore(true)
      await fetch(`/api/folders/trash/restore/${id}`, {method:'PUT'})
      toast.success('Successfully restored folder')
      fetchDeletedFolders()
    } catch (err: any) {
      console.error(err)
    } finally {
      setLoadingRestore(true)
    }
  }

  const handleRestoreAllFolders = async() => {
    try {
      setLoadingRestore(true)
      await fetch(`/api/folders/trash/restore`, {method:'PUT'})
      toast.success('Successfully restored all Note')
      fetchDeletedFolders()
    } catch (err: any) {
      console.error(err)
    } finally {
      setLoadingRestore(false)
    }
  }

  useEffect(()=>{
    fetchDeletedNotes()
    fetchDeletedFolders()
  },[])

  
  
    return (
      <section className="min-h-screen">
        <div className="flex">
          <main className="flex-1 p-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-semibold">Trash</h1>
              <div className="space-x-2">
                <button
                  onClick={()=>setOpenRestoreAllModal(true)}
                  className="px-4 py-2 bg-green-600 text-white text-[14px] rounded hover:bg-green-700 rounded-[20px] cursor-pointer"
                >
                  Restore All
                </button>
                <button
                  // onClick={emptyTrash}
                  className="px-4 py-2 bg-red-600 text-white text-[14px] rounded hover:bg-red-700 rounded-[20px] cursor-pointer"
                >
                  Empty Trash
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
                        menuOptions={<MenuOptions id={note.id} handleRestore={handleRestoreIndividualNote} loadingRestore={loadingRestore} />}
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
                        menuOptions={<MenuOptions id={folder.id} handleRestore={handleRestoreIndividualFolder} loadingRestore={loadingRestore}  />}
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
        openRestoreAllModal &&
        <Modal
            title={`Restore all ${view}`}
            children={
              <div>
                <p>Are you sure you want to restore all {`${view}`}?</p>
                <div className='mt-[10px] flex'>
                  <button 
                    className='border p-[8px] rounded-[10px] bg-[green] text-[white] text-[14px] cursor-pointer'
                    onClick={view === 'notes' ? handleRestoreAllNotes: handleRestoreAllFolders}
                    disabled={loadingRestore}
                  >
                    {loadingRestore ? <Loader className='animate-spin'/> : 'Restore'}
                  </button>
                  <button 
                    className='ml-[10px] border p-[8px] rounded-[10px] bg-blue-700 text-[white] text-[14px] cursor-pointer'
                    onClick={()=>setOpenRestoreAllModal(false)}
                  > 
                    Cancel
                  </button>
                </div>
                
              </div>
              
            }
            onClose={()=>setOpenRestoreAllModal(false)}
          />
      }
    </section>
    
    )
}

export const MenuOptions = ({id, handleRestore, loadingRestore}:{id:string, handleRestore: (id: string) => Promise<void>, loadingRestore: boolean}) => {

  const handleRestoreItem = () =>{
    handleRestore(id)
  }

  return(
    <div className='p-[15px]'>
      <ul>
        <li className='p-2' onClick={handleRestoreItem}>{loadingRestore ? 'wait...' : 'Restore'}</li>
      </ul>
    </div>
  )
}