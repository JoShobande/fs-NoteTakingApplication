'use client'

import Card from "@components/components/Card"
import { useEffect, useState } from "react";
import { FoldersType } from "../page";


 
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
              />
              )
          })
        }
      </div>
    </section>
  )
}