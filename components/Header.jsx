import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <>
         <nav className='fixed top-0 right-0 bg-background/80 backdrop-blur-xl z-20 left-0 border-b'>
            <div className='max-w-7xl mx-auto px-6 py-4 flex items-center justify-between'>
                {/* Logo */}
                <Link href={"/"} className='flex items-center'>
                    <Image 
                        src={"/spott.png"} 
                        alt='Logo' 
                        width={500} 
                        height={500}
                        className='w-full h-11'
                        priority
                    />
                </Link>
                
                {/* Location Search */}

                {/* Side actions */}
            </div>

            {/* Mobile Actions */}
         </nav>
    </>
  )
}

export default Header
