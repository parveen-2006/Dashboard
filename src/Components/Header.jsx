import React from 'react'
import { Image, Space } from 'antd'
import Typography from 'antd/es/typography/Typography'
import { AiOutlineMail } from "react-icons/ai";
import { FaBell } from "react-icons/fa";
import Badge from 'antd/es/badge/Badge';

export default function Header() {
  return (
    <div className='Header'>
      <Image width={40}
        src='https://imgs.search.brave.com/1pBCjReNP4fzN_Pu1BmU_tw-h1W_d43JaSwaGxlzcVM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9zdHlsaXplZC1p/bWFnZS1jb2xvcmZ1/bC1sb2dvLXJlc2Vt/YmxpbmctYmlyZDM5/cy13aW5ncy1zdWl0/YWJsZS11c2UtYnJh/bmRpbmctbWFya2V0/aW5nLWRlc2lnbl8x/NTM5MTItMjk3ODQz/LmpwZz9zZW10PWFp/c19oeWJyaWQmdz03/NDAmcT04MA'>
      </Image>
      <Typography.Title>Dashboard</Typography.Title>
      <Space>
        <Badge count={10} dot >
        <AiOutlineMail style={{ fontSize: 24 }} />
      </Badge>
      <Badge count={20}>
        <FaBell style={{ fontSize: 24 }} />
      </Badge>
    </Space>
    </div >
  )
}
