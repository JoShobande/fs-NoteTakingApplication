"use client";

import { useState, useEffect } from "react";
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { useSearchParams } from "next/navigation";

export interface NoteProps{
  title:string,
  noteContent:string,
  themeColor:string,
  id:string
}

const colorOptions = [
  { name: "yellow",   value: "yellow",   bg: "bg-[#E8E582]"   },
  { name: "Pink",  value: "pink",  bg: "bg-[#EFAAAA]"  },
  { name: "Blue", value: "blue", bg: "bg-[#6CB5DF]" },
];

export default function NewNotePage() {
  const searchParams = useSearchParams();
  const editId = searchParams.get("id"); 
 
  const [title, setTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [themeColor, setThemeColor]  = useState(colorOptions[0].bg);
  const [loading, setLoading] = useState(false)

  const [loadingNoteDetails , setLoadingNoteDetails] = useState(false)


  const handleGetNoteToBeEdited =  async() => {
    setLoadingNoteDetails(true)
    try {
      const res = await fetch(`/api/notes/${editId}`)
      if (!res.ok) throw new Error('Not authorized')
      const data:NoteProps = await res.json()
      setTitle(data.title)
      setNoteContent(data.noteContent)
      setThemeColor(data.themeColor)
    } catch (err: any) {
      console.error(err)
    } finally {
      setLoadingNoteDetails(false)
    }
  }

  const handleCreateNewNote = async() => {
    if(title === '' || noteContent === ''){
      return
    }
    try{
      setLoading(true)
      const res = await fetch("/api/notes/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, noteContent, themeColor }),
      });
      toast.success('Successfully saved')
      console.log(res)
    }catch(error){
      console.log(error)
    }finally{
      setLoading(false)
    }
  }

  const handleEditExistingNote = async() => {
    if(title === '' || noteContent === ''){
      return
    }
    try{
      setLoading(true)
      const res = await fetch(`/api/notes/edit/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, noteContent, themeColor }),
      });
      toast.success('Successfully edited')
      console.log(res)
    }catch(error){
      console.log(error)
    }finally{
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    editId ? handleEditExistingNote() : handleCreateNewNote()
    
  };

  // find the bg class for current color
  const currentBg = colorOptions.find((o) => o.bg === themeColor)?.bg ?? "";

  useEffect(()=>{
    if(editId){
      handleGetNoteToBeEdited()
    }
  },[editId])

  return (
    <form
      onSubmit={handleSubmit}
      className={`
        flex flex-col min-h-screen p-6 
        ${currentBg} 
        transition-colors duration-200
      `}
    >

      <div className="flex items-center space-x-4 mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
          className="flex-1 text-2xl font-semibold text-gray-900 
                     border-none focus:outline-none bg-transparent"
        />

        <div className="flex space-x-2">
          {colorOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setThemeColor(opt.bg)}
              aria-label={opt.name}
              className={`
                w-6 h-6 rounded-full
                ${opt.bg.replace("-100","-500")}      /* solid circle */
                ${themeColor === opt.bg ? "ring-2 ring-offset-2 ring-gray-700" : ""}
              `}
            />
          ))}
        </div>
      </div>

  
      <textarea
        value={noteContent}
        onChange={(e) => setNoteContent(e.target.value)}
        placeholder="Start writing your note..."
        required
        className="flex-1 w-full resize-none border-none focus:outline-none 
                   bg-transparent text-gray-800 text-base leading-6"
      />

      <button
        type="submit"
        className={`mt-4 self-end px-6 py-2 bg-blue-600 text-white rounded-lg 
                   hover:bg-blue-700 transition  ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
        disabled={loading}
      >
         {loading ? (
          <Loader2 className="animate-spin mr-2 h-5 w-5"/>
        ) :
        editId ? 'Save Changes' : 'Save'
      }
        
      </button>
    </form>
  );
}
