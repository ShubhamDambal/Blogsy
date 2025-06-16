import React from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() { 
  //check status of user(logged in or not)
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const naItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus  //bcz if user is loggen in then do not show login & signup button
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus
    },
    {
      name: "All posts",
      slug: "/all-posts",
      active: authStatus
    },
    {
      name: "Add post",
      slug: "/add-post",
      active: authStatus
    }
  ]

  return (
    <header></header>
  )
}

export default Header