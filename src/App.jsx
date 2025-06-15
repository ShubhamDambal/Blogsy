import './App.css'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import {login, logout} from './store/authSlice'
import { Footer, Header } from './components'

function App() {
  //create loading bcz some time needed to fetch data fro appwrite
  const [loading, setLoading] = useState(true)  //initially loading is true
  const dispatch = useDispatch()  //getting current user from store

  //when app start using useEffect() we'll figure out user is logged in or not
  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData){
        dispatch(login({userData}))
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
          {/*<Outlet />*/}
          TODO
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App
