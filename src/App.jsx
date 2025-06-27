import './App.css'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import authService from './appwrite/auth'
import {login, logout, setLoading} from './store/authSlice'
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

function App() {
  //create loading bcz some time need to fetch data fro appwrite
  const loading = useSelector((state) => state.auth.loading)
  const dispatch = useDispatch()  //getting current user from store

  //when app start using useEffect() we'll figure out user is logged in or not
  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData){
        dispatch(login({userData}))  //write directly {userData} bcz in authSlice file has same name userData
      }
      else{
        dispatch(logout())  //if no userData then logout
      }
    })
    .finally(() => setLoading(false))  //always runs  
  }, [])

  //conditional rendering(render iff user is logged in)
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App
