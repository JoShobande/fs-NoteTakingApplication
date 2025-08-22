'use client'

import Image from "next/image"
import { useRouter } from "next/navigation";
import dayjs from 'dayjs';
import { EllipsisVertical } from "lucide-react"; 
import { ReactNode, useState } from "react";
import DropDown from '../components/DropDown'

interface cardProps{
    type: 'folder' | 'note'
    backgroundColor: string,
    name: string,
    date:string,
    folderIconColor?: string,
    noteDescription?: string,
    time?:string
    className?:string
    pageRedirect: string
    menuOptions?: ReactNode
}

const Card:React.FC<cardProps> = ({
    type, 
    backgroundColor, 
    folderIconColor, 
    className, 
    name,
    date,
    noteDescription,
    pageRedirect,
    menuOptions
}) => {
    const router = useRouter();

    const [menuOpen, setMenuOpen] = useState(false);

    const handleRedirect = () => {
       pageRedirect && router.push(pageRedirect);
    }

    const handleOpenCardDropDown = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        setMenuOpen(!menuOpen)
    }

    return(
        <div
            className={`${backgroundColor} ${type == 'note' ? 'lg:w-[250px] h-[300px]' : 'w-[250px] '} relative rounded-[20px] p-[20px] cursor-[pointer] ${className}`}
            onClick={handleRedirect}
        >
            {
                type == 'folder'
                ?
                    <div >
                        <div className='flex justify-between'>
                            <div
                                className={`${folderIconColor}
                                    w-16 h-12 relative
                                     rounded-lg
                                    [clip-path:polygon(0_0,70%_0,100%_30%,100%_100%,0_100%)]
                                    before:content-[''] before:absolute before:top-0 before:right-0
                                    before:w-[30%] before:h-[30%]
                                    before:bg-[#FEFBEB] before:rounded-bl-[6px]
                                `}
                            />
                        </div>
                       
                        <div className='mt-[20px] text-[24px] font-[600]'>
                            <h3 className='mb-0 pb-0 text-[20px] truncate'>{name}</h3>
                            <span className='text-[12px]'>{dayjs(date).format('hh:ma, dddd')}</span>
                        </div>
                    </div>
                :
                    <div >
                        <span className='text-[12px]'>{dayjs(date).format('MM/DD/YYYY')}</span>
                        <div className='flex justify-between items-center'>
                            <h3 className='text-[20px] font-[500] w-[70%] truncate'>{name}</h3>
                            
                        </div>
                        <hr className='mt-[15px] mb-[20px]'/>
                        <div className='flex-1 overflow-auto'>
                            <p className='font-[300] text-[15px] w-full break-words'>{noteDescription?.slice(0,120)}</p>
                        </div>
                        <div className='mt-[30px] flex items-center absolute bottom-[20px]'>
                            <Image
                                src={'/clock.png'}
                                alt='edit note'
                                width={24}
                                height={24}
                                className='cursor-pointer'
                            />
                            <p className='ml-[5px] text-[12px]'>{dayjs(date).format('hh:ma, dddd')}</p>
                        </div>
                    </div>
            }
            <button className='absolute top-8 right-5 cursor-pointer hover:bg-white/20' onClick={(e)=>{handleOpenCardDropDown(e)}}>
                <EllipsisVertical size={20} />
            </button>
            <div className='absolute top-15 right-[-150px] z-[9]' onClick={(e)=>e.stopPropagation()}>
                {
                    menuOpen &&
                    <DropDown
                        children={menuOptions}
                        
                    />    
                }
            </div>
        </div>
    )
}

export default Card;