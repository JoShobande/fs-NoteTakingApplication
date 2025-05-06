import Image from "next/image"


interface cardProps{
    type: 'folder' | 'note'
    backgroundColor: string
}

const Card:React.FC<cardProps> = ({type, backgroundColor}) => {
    return(
        <div className={`bg-[${backgroundColor}] ${type == 'note' ? 'w-[250px] h-[300px]' : 'w-[300px] h-[150px]'}  rounded-[20px] p-[20px] cursor-[pointer]`}>
            {
                type == 'folder'
                ?
                    <div>
                        
                    </div>
                :
                <div>
                     <span className='text-[12px]'>12/12/2021</span>
                    <div className='flex justify-between items-center'>
                        <h3 className='text-[22px] font-[500]'>Mid term exam</h3>
                        <Image
                            src={'/pencil.png'}
                            alt='edit note'
                            width={16}
                            height={16}
                            className='cursor-pointer'
                        />
                    </div>
                    <hr className='mt-[15px] mb-[20px]'/>
                    <div>
                        <p className='font-[300] text-[16px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti facere explicabo totam aspernatur asperiores atque quos vel ea, dicta id!</p>
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