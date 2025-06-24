import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'

function LogoutBtn() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    //authService has logout as promise so we can use .then()
    authService.logout().then(() => {
      dispatch(logout());  //(authSlice has method logout())dispatch to store such that state should be up to date
    })
  }

  return (
    <button className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full' onClick={logoutHandler}>Logout</button>
  )
}

export default LogoutBtn