'use client'

import Card from "@components/components/Card"
import { useEffect, useState } from "react"
import { FoldersType, Note } from "../page"


 
export default function Trash() {

  const [notes, setNotes] = useState<Note[]>([])
  const [folders, setFolders] = useState<FoldersType[]>([])

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

  useEffect(()=>{
    fetchDeletedNotes()
    fetchDeletedFolders()
  },[])




   

  const [view, setView] = useState('notes')
  
    return (
      <section className="min-h-screen">
        <div className="flex">
          <main className="flex-1 p-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-semibold">Trash</h1>
              <div className="space-x-2">
                <button
                  // onClick={restoreAll}
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
                className={`pb-2 ${view === "notes" ? "border-b-2 border-blue-600" : "text-gray-500"}`}
                onClick={() => setView("notes")}
              >
                Deleted Notes
              </button>
              <button
                className={`pb-2 ${view === "folders" ? "border-b-2 border-blue-600" : "text-gray-500"}`}
                onClick={() => setView("folders")}
              >
                Deleted Folders
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
    </section>
    
    )
}