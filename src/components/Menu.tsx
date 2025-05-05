'use client'

import Image from "next/image";
import { ReactNode, useState } from "react";
import Link from "next/link";


const Menu = ({currentPage}:{currentPage?:ReactNode}) => {
    
    const [openMobileMenu, setOpenMobileMenu] = useState(false)

    const navItems = [
        { label: "Add New",   icon: "/new.png", href: "/add-new"   },
        { label: "Archive",  icon: "/archive.png", href: "/archive"  },
        { label: "Folders",   icon: "/folder.png", href: "/folders" },
        { label: "Trash",     icon: "/trash.png", href: "/trash"},
    ];

    return(
        <section>
            <div className='min-h-screen bg-gray-100'>
                <header className="h-[100px] bg-white flex items-center py-[20px]  justify-between lg:justify-start shadow-sm">
                    <Link className='w-[100px] h-[100px] lg:w-[200px] lg:h-[200px] relative mt-[20px]' href='/'>
                        <Image
                            src='/logoNoText.png'
                            alt='logo'
                            fill={true}
                            objectFit="contain" 
                            className='cursor-pointer'
                        />
                    </Link>
                  
                    <div className='lg:px-[80px]'>
                        <h1 className='text-[24px] lg:text-[38px] font-[500]'>MY NOTES</h1>
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
                            fixed inset-y-0 right-0 bg-white/95 h-screen z-50 lg:z-0
                            w-[250px] transition-transform duration-300 ease-in-out shadow-lg                      
                            ${openMobileMenu ? "translate-x-0" : "translate-x-full"}
                            lg:relative lg:translate-x-0 lg:inset-auto lg:w-64 lg:block
                        `}
                    >

                        <div className="flex justify-end p-4 lg:hidden cursor-pointer">
                            <button onClick={() => setOpenMobileMenu(false)} className='text-[30px]'>
                                ✕
                            </button>
                        </div>
                        <nav className="pl-[60px] pt-[40px]">
                            <ul className="space-y-6">
                                {navItems.map(({ label, icon, href }) => (
                                    <li key={href}>
                                        <Link
                                            href={href}
                                            className="flex items-center space-x-3 px-4 py-2 
                                                    text-gray-900 hover:bg-gray-100 rounded"
                                        >
                                            <Image
                                            src={icon}
                                            alt={`${label} icon`}
                                            width={20}
                                            height={20}
                                            className="flex-shrink-0"
                                            />
                                            <span>{label}</span>
                                        </Link>
                                    </li>
                                ))}
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