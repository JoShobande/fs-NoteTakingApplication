import Card from "@components/components/Card"

 
export default function Folders() {

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
  
    return (
     <section>
       <h1 className='text-[25px] mb-[20px] font-[500]'>Folders</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
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
        </div>
     </section>
    )
}