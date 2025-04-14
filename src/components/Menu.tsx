import Image from "next/image";


const Menu = () => {
    return(
        <section>
            <div className='min-h-screen bg-gray-100'>
                <header className="h-[100px] bg-white flex items-center py-[20px] ">
                    <Image
                        src='/logoNoText.png'
                        alt='logo'
                        height={200}
                        width={200}
                        className='pt-[30px]'
                    />
                    <div className='px-[80px]'>
                        <h1 >MY NOTES</h1>
                    </div>
                </header>
                <div className='flex'>
                    <aside className="w-64 bg-white h-screen">
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
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, at quia. 
                                    Iusto nisi vero cumque id animi voluptatem iste perferendis est...
                                </p>
                                <p>Additional content …</p>
                                <p>More content …</p>
                                <p>Even more content …</p>
                            </main>
                        </div>
                    </div>   
                </div>
            </div>
            
        </section>
    )
}

export default Menu;