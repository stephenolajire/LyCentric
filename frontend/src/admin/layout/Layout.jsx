import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminNavBar from '../components/adminNavBar'
import style from "../css/Layout.module.css"

const AdminLayout = () => {
  return (
    <div className={style.layout}>
      <AdminNavBar/>
      <Outlet/>
    </div>
  )
}

export default AdminLayout
