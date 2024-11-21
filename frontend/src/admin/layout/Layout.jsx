import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import AdminNavBar from '../components/AdminNavBar'
import style from "../css/Layout.module.css"
import { GlobalContext } from '../../context/GlobalContext'
import { MdMenu, MdOutlineClear } from 'react-icons/md'
const AdminLayout = () => {

  const {open, handleClick} = useContext(GlobalContext)
  return (
    <div className={style.layout}>
      <div className={style.menuDiv}>
        {open ? (
          <MdMenu onClick={handleClick} className={style.menu} />
        ) : (
          <MdOutlineClear onClick={handleClick} className={style.menu} />
        )}
      </div>
      <AdminNavBar />
      <Outlet />
    </div>
  );
}

export default AdminLayout
