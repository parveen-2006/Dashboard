import React from 'react'
import './app.css'
import Header from './Components/Header'
import SideMenu from './Components/SideMenu'
import PageContent from './Components/PageContent'
import Footer from './Components/Footer'
import { Space } from 'antd'

export default function App() {
  return (
    <div className='App'>
      <Header />
      <Space className='SideMenuAndPageContent'>
        <SideMenu></SideMenu>
        <PageContent></PageContent>
      </Space>
      <Footer />
    </div>
  )
}
