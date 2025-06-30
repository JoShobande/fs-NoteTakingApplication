import Image from "next/image";
import { SetStateAction } from "react";

interface itemProps{
    type: 'note' | 'folder'
    openModal: () => void
}

const NewItem = ({type, openModal}: itemProps) =>{
    return(
        <div className='border border-dashed h-[100px] w-[100px] rounded-[20px] grid place-items-center cursor-pointer' onClick={openModal}>
            <div  className="grid gap-2 justify-items-center">
                {
                    type === 'folder'
                    ?
                        <div
                            className="
                                w-5 h-5 relative
                                bg-[black] rounded-lg
                                [clip-path:polygon(0_0,70%_0,100%_30%,100%_100%,0_100%)]
                                before:content-[''] before:absolute before:top-0 before:right-0
                                before:w-[30%] before:h-[30%]
                                before:bg-[white] before:rounded-bl-[6px]
                            "
                        />
                    :
                        <Image
                            src='/pencil.png'
                            alt='new note'
                            width={16}
                            height={16}
                        />
                }
                
                <span className='h-full font-[500] text-[12px]'>New {type}</span>
            </div>
        </div>
    )
}

export default NewItem;