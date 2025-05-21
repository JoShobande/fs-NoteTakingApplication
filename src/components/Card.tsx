import Image from "next/image"
import { useRouter } from "next/navigation";

interface cardProps{
    type: 'folder' | 'note'
    backgroundColor: string,
    name: string,
    date:string,
    folderIconColor?: string,
    noteDescription?: string,
    time?:string
    className?:string
    pageRedirect?: string
}

const Card:React.FC<cardProps> = ({
    type, 
    backgroundColor, 
    folderIconColor, 
    className, 
    name,
    date,
    noteDescription,
    pageRedirect
}) => {
    const router = useRouter();

    const handleRedirect = () => {
       pageRedirect && router.push(pageRedirect);
    }

    return(
        <div 
            className={`${backgroundColor} ${type == 'note' ? 'lg:w-[250px] h-[300px]' : 'w-[250px] '}  rounded-[20px] p-[20px] cursor-[pointer] ${className}`}
            onClick={handleRedirect}
        >
            {
                type == 'folder'
                ?
                    <div>
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
                            <div className='flex space-x-1 cursor-pointer'>
                                <div className="w-1 h-1 bg-[black] rounded-full"></div>
                                <div className="w-1 h-1 bg-[black] rounded-full"></div>
                                <div className="w-1 h-1 bg-[black] rounded-full"></div>
                            </div>
                        </div>
                       
                        <div className='mt-[20px] text-[24px] font-[600]'>
                            <h3 className='mb-0 pb-0 text-[20px]'>{name}</h3>
                            <span className='text-[12px]'>{date}</span>
                        </div>
                    </div>
                :
                <div>
                    <span className='text-[12px]'>{date}</span>
                    <div className='flex justify-between items-center'>
                        <h3 className='text-[20px] font-[500]'>{name}</h3>
                        <div className='flex space-x-1 cursor-pointer'>
                                <div className="w-1 h-1 bg-[black] rounded-full"></div>
                                <div className="w-1 h-1 bg-[black] rounded-full"></div>
                                <div className="w-1 h-1 bg-[black] rounded-full"></div>
                        </div>
                    </div>
                    <hr className='mt-[15px] mb-[20px]'/>
                    <div>
                        <p className='font-[300] text-[15px]'>{noteDescription}</p>
                    </div>
                    <div className='mt-[30px] flex items-center'>
                        <Image
                            src={'/clock.png'}
                            alt='edit note'
                            width={24}
                            height={24}
                            className='cursor-pointer'
                        />
                        <p className='ml-[5px] text-[12px]'>10:30 PM Monday</p>
                    </div>
                </div>
            }  
        </div>
    )
}

export default Card;