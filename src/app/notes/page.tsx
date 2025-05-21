'use client'

import Card from "@components/components/Card";
import NewItem from "@components/components/NewItem";
import { useEffect, useState } from "react";


type Note = {
  id: string;
  title: string;
  noteContent: string;
  themeColor: string;
  createdAt: string;
};

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    fetch("/api/notes/all")
      .then((res) => {
        if (!res.ok) throw new Error("Not authorized");
        return res.json();
      })
      .then(setNotes)
      .catch(console.error);
  }, []);

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
  
  // const notes = [
  //   {
  //     name:'Mid term exam',
  //     date: '12/12/2021',
  //     bgColor: 'bg-[#E8E582]',
  //     description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod deleniti cupiditate nemo eveniet incidunt. Adipisci vitae a inventore iure laudantium tempora debitis! Harum iste rem neque, voluptatum quos ipsum laborum?',
  //     time: '10:30 PM Monday'
  //   },
  //   {
  //     name:'Mid term exam',
  //     date: '12/12/2021',
  //     bgColor: 'bg-[#EFAAAA]',
  //     description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod deleniti cupiditate nemo eveniet incidunt. Adipisci vitae a inventore iure laudantium tempora debitis! Harum iste rem neque, voluptatum quos ipsum laborum?',
  //     time: '10:30 PM Monday'
  //   },
  //   {
  //     name:'Mid term exam',
  //     date: '12/12/2021',
  //     bgColor: 'bg-[#6CB5DF]',
  //     description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod deleniti cupiditate nemo eveniet incidunt. Adipisci vitae a inventore iure laudantium tempora debitis! Harum iste rem neque, voluptatum quos ipsum laborum?',
  //     time: '10:30 PM Monday'
  //   },
  //   {
  //     name:'Mid term exam',
  //     date: '12/12/2021',
  //     bgColor: 'bg-[#6CB5DF]',
  //     description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod deleniti cupiditate nemo eveniet incidunt. Adipisci vitae a inventore iure laudantium tempora debitis! Harum iste rem neque, voluptatum quos ipsum laborum?',
  //     time: '10:30 PM Monday'
  //   },
  // ]  

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
           } 
        </div>
      </div>
    </section>
  );
}
