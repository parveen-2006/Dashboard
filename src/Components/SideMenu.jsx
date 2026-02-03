import { Menu } from 'antd'
import React from 'react'
import { AiOutlineAppstore } from "react-icons/ai";
import { CiShop , CiShoppingCart , CiUser } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';

export default function SideMenu() {
  const navigate = useNavigate()
  return (
    <div className='SideMenu'>
      <Menu 
      onClick={(item)=>{
        //item.key
        navigate(item.key)
      }}
      items={[{
        label:"Dashboard",
        key: '/',
        icon: <AiOutlineAppstore />
      },
      {
        label:"Inventory",
        key: '/inventory',
        icon: <CiShop />
      },
      {
        label:"Orders",
        key: '/orders',
        icon : <CiShoppingCart />
      },
      {
        label:"Customers",
        key: '/customers' ,
        icon: <CiUser />
      },
      ]}>

      </Menu>
    </div>
  )
}
