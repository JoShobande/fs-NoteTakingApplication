'use client'

import Card from "@components/components/Card"
import { useState } from "react"

 
export default function Trash() {

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
    {
      name:'Book Lists',
      date: '12/12/2021',
      bgColor: 'bg-[#FEFBEB]',
      folderIconColor:'bg-[#E8E582]',
    },
    {
      name:'Book Lists',
      date: '12/12/2021',
      bgColor: 'bg-[#FEFBEB]',
      folderIconColor:'bg-[#E8E582]',
    },
    {
      name:'Book Lists',
      date: '12/12/2021',
      bgColor: 'bg-[#FEFBEB]',
      folderIconColor:'bg-[#E8E582]',
    },
    {
      name:'Book Lists',
      date: '12/12/2021',
      bgColor: 'bg-[#FEFBEB]',
      folderIconColor:'bg-[#E8E582]',
    },
    {
      name:'Book Lists',
      date: '12/12/2021',
      bgColor: 'bg-[#FEFBEB]',
      folderIconColor:'bg-[#E8E582]',
    },
    {
      name:'Book Lists',
      date: '12/12/2021',
      bgColor: 'bg-[#FEFBEB]',
      folderIconColor:'bg-[#E8E582]',
    },
    {
      name:'Book Lists',
      date: '12/12/2021',
      bgColor: 'bg-[#FEFBEB]',
      folderIconColor:'bg-[#E8E582]',
    },
    {
      name:'Book Lists',
      date: '12/12/2021',
      bgColor: 'bg-[#FEFBEB]',
      folderIconColor:'bg-[#E8E582]',
    },
    {
      name:'Book Lists',
      date: '12/12/2021',
      bgColor: 'bg-[#FEFBEB]',
      folderIconColor:'bg-[#E8E582]',
    },
    {
      name:'Book Lists',
      date: '12/12/2021',
      bgColor: 'bg-[#FEFBEB]',
      folderIconColor:'bg-[#E8E582]',
    },
    {
      name:'Book Lists',
      date: '12/12/2021',
      bgColor: 'bg-[#FEFBEB]',
      folderIconColor:'bg-[#E8E582]',
    },
  ] 

  const notes = [
    {
      name:'Mid term exam',
      date: '12/12/2021',
      bgColor: 'bg-[#E8E582]',
      description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod deleniti cupiditate nemo eveniet incidunt. Adipisci vitae a inventore iure laudantium tempora debitis! Harum iste rem neque, voluptatum quos ipsum laborum?',
      time: '10:30 PM Monday'
    },
    {
      name:'Mid term exam',
      date: '12/12/2021',
      bgColor: 'bg-[#EFAAAA]',
      description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod deleniti cupiditate nemo eveniet incidunt. Adipisci vitae a inventore iure laudantium tempora debitis! Harum iste rem neque, voluptatum quos ipsum laborum?',
      time: '10:30 PM Monday'
    },
    {
      name:'Mid term exam',
      date: '12/12/2021',
      bgColor: 'bg-[#6CB5DF]',
      description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod deleniti cupiditate nemo eveniet incidunt. Adipisci vitae a inventore iure laudantium tempora debitis! Harum iste rem neque, voluptatum quos ipsum laborum?',
      time: '10:30 PM Monday'
    },
    {
      name:'Mid term exam',
      date: '12/12/2021',
      bgColor: 'bg-[#6CB5DF]',
      description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod deleniti cupiditate nemo eveniet incidunt. Adipisci vitae a inventore iure laudantium tempora debitis! Harum iste rem neque, voluptatum quos ipsum laborum?',
      time: '10:30 PM Monday'
    },
  ]  

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
                          backgroundColor={note.bgColor}
                          name={note.name}
                          noteDescription={note.description}
                          date={note.date}
                          key={index}
                          className='mb-4'
                      />
                    )
                  })
                ) : (                
                  folders.map((folder, index)=>{
                    return(
                      <Card
                        type='folder'
                        backgroundColor={folder.bgColor}
                        name={folder.name}
                        folderIconColor={folder.folderIconColor}
                        date={folder.date}
                        key={index}
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