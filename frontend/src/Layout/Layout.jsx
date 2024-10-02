import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'
import axios from 'axios'
import api from '../constant/api'

const Layout = () => {

  const [category, setCategory] = useState([])

  const fetchData = async () => {
    const response = await api.get("category")
    try{
      if (response){
        console.log(response.data)
        setCategory(response.data)
      }else{
        console.log(response.error)
      }
    }catch(err){
      console.log(err.message)
    }
  }

  useEffect(()=>{
    fetchData()
  }, [])

  return (
    <div>
      <NavBar category={category}/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Layout