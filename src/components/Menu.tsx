'use client'

import Image from "next/image";
import { ReactNode, useState } from "react";


const Menu = ({currentPage}:{currentPage?:ReactNode}) => {
    
    const [openMobileMenu, setOpenMobileMenu] = useState(false)

    return(
        <section>
            <div className='min-h-screen bg-gray-100'>
                <header className="h-[100px] bg-white flex items-center py-[20px]  justify-between lg:justify-start ">
                    <div className='w-[100px] h-[100px] lg:w-[200px] lg:h-[200px] relative mt-[20px]'>
                        <Image
                            src='/logoNoText.png'
                            alt='logo'
                            fill={true}
                            objectFit="contain" 
                            className='cursor-pointer'
                        />
                    </div>
                  
                    <div className='lg:px-[80px]'>
                        <h1 >MY NOTES</h1>
                    </div>
                    
                    <div 
                        className={`
                            
                            ${openMobileMenu 
                                ? 
                                    'hidden' 
                                : 
                                    'block ' 
                            } 
                            lg:hidden mr-[15px] cursor-pointer z-[1000] 
                        `}
                        onClick={()=>setOpenMobileMenu(true)}
                    >
                        <div className='w-[30px] h-[5px] rounded-[8px] bg-[grey] mb-[1px]'/>
                        <div className='w-[30px] h-[5px] rounded-[8px] bg-[grey] mb-[1px]'/>
                        <div className='w-[30px] h-[5px] rounded-[8px] bg-[grey] mb-[1px]'/>
                    </div>
                </header>
                <div className='block lg:flex'>
                    <aside 
                        className={`
                            ${
                                openMobileMenu 
                                ? 
                                    'block right-[0] static  top-0 w-[250px] h-auto' 
                                :
                                    'hidden'
                            } 
                            lg:block w-64 bg-white h-screen
                        `}
                    >
                        <nav className="pl-[60px] pt-[40px]">
                            <ul className="space-y-4">
                                <li>Add New</li>
                                <li>Calendar</li>
                                <li>Archive</li>
                                <li>Trash</li>
                            </ul>
                        </nav>
                    </aside>
                    <div className="flex-1 -ml-4 -mt-2 z-10">
                        <div className="rounded-tl-[30px] overflow-hidden">
                            <main className="px-8 py-6 bg-gray-200">
                                {currentPage}
                            </main>
                        </div>
                    </div>   
                </div>
            </div> 
        </section>
    )
}

export default Menu;