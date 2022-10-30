import { Bars3Icon } from '@heroicons/react/24/solid'
import React, { FC } from 'react'
import logo from '../../assets/images/react_logo.png'

const Header: FC = () => {
  return <div className='bg-white p-3 pl-10 fixed top-0 min-w-full z-50 flex'>
      <img src={logo} alt="logo" className='w-12'/>
      <Bars3Icon className='h-8 w-8 text-dark-500 mt-2 ml-64 cursor-pointer' onClick={()=>{}}/>
    </div>
}

export default Header
