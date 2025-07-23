'use client'

import Image from "next/image";
import { ReactNode, useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";


const Menu = ({currentPage}:{currentPage?:ReactNode}) => {
    
    const [openMobileMenu, setOpenMobileMenu] = useState(false)
    const router = useRouter();
    const pathname = usePathname();  

    const handleSignOut = async () => {
      await signOut({
        redirect: false,          
      });
      router.push("/signin");    
    };

    const navItems = [
        { label: "Home",   icon: "/home.png", href: "/notes"   },
        { label: "Add New",   icon: "/new.png", href: "/notes/add-new"   },
        { label: "Archive",  icon: "/archive.png", href: "/notes/archive"  },
        { label: "Folders",   icon: "/folder.png", href: "/notes/folders" },
        { label: "Trash",     icon: "/trash.png", href: "/notes/trash"},
    ];

    return(
        <section className="flex flex-col h-screen overflow-hidden">
            {/* <div className='relative bg-gray-100 h-screen '> */}
                <header className="flex-shrink-0 h-[100px] bg-white flex items-center justify-between lg:justify-start shadow-sm ">
                    <Link className='w-[100px] h-[100px] lg:w-[200px] lg:h-[200px] relative lg:mt-[20px]' href='/notes'>
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
                <div className='flex flex-1 overflow-hidden'>
                    <aside 
                        className={`
                            fixed inset-y-0 right-0 transform transition-transform duration-300 ease-in-out
                            bg-white/95 shadow-lg z-50 lg:z-0
                            w-56
                            ${openMobileMenu ? "translate-x-0" : "translate-x-full"}
                            lg:relative lg:translate-x-0 lg:inset-auto
                        `}
                    >

                        <div className="flex justify-end p-4 lg:hidden cursor-pointer">
                            <button onClick={() => setOpenMobileMenu(false)} className='text-[30px]'>
                                ✕
                            </button>
                        </div>
                        <nav className=" pl-[20px] pt-[40px]">
                            <ul className="space-y-6">
                                {navItems.map(({ label, icon, href }) => {
                                    const isActive = pathname === href 
                                    return(
                                        <li key={href}>
                                            <Link
                                                href={href}
                                                className={`flex items-center space-x-3 px-4 py-2 
                                                        text-gray-900 hover:bg-gray-100 rounded 
                                                        path 
                                                        ${isActive
                                                            ? "bg-blue-100 font-medium text-blue-700"
                                                            : "text-gray-900 hover:bg-gray-100"}
                                                    `}
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
                                    )
                                })}
                                <li onClick={handleSignOut} className='absolute bottom-[50px] flex space-x-3 px-4 py-2 cursor-pointer'>
                                    <Image
                                        src={'/logout.png'}
                                        alt={`logout`}
                                        width={20}
                                        height={20}
                                        className="flex-shrink-0"
                                    />
                                    <span>Logout</span>
                                </li>
                            </ul>
                        </nav>
                    </aside>
                    <div className="flex-1 h-full overflow-hidden lg:-ml-6  z-10">
                        <main
                            className="
                            h-full overflow-auto bg-gray-200
                            lg:rounded-tl-[30px] 
                            px-4 lg:px-8 py-6 
                                
                            "
                        >
                            {currentPage}
                        </main>
                    </div>
                </div>
            {/* </div>  */}
        </section>
    )
}

export default Menu;