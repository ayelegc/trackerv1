'use client';
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { FaBug } from "react-icons/fa6";
import classnames from 'classnames';
import classNames from 'classnames';


const NavBar = () => {
    const currentPath = usePathname();
    

    const links = [
        {label: 'Dashboard', href:'/'},
        {label: 'Issues', href:'/issues'},
    ]
  return (
    <nav className='flex space-x-6 border-b mb-5 px-6 h-16 items-center'>
        <Link href="/"> <FaBug /> </Link>
            <ul className='flex space-x-6'>

             {links.map(link=> 
                <Link 
                    key= {link.href} 
                    className={classNames ({
                      'text-zink-900': link.href === currentPath,
                      'text-zink-500': link.href !== currentPath,
                      'hover:text-zink-800 transition-colors' : true
                    }

                    )} 
                    href={link.href}>{link.label} 
                </Link>)}
            </ul>

    </nav>
  )
}

export default NavBar
