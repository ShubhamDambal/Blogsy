import React from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() { 
  const navigate = useNavigate()
  //check status of user(logged in or not)
  const authStatus = useSelector((state) => state.auth.status)

  //things to shows on header
  //why created like this?(just production grade things. Makes easy to future updates)
  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus  //bcz if user is logged in then do not show login & signup button
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
    },
    {
      name: "Inactive posts",
      slug: "/inactive-posts",
      active: authStatus
    }
  ]

  return (
    <header className='py-3 shadow bg-gray-500'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='70px'/>
            </Link>
          </div>
          <ul className='flex ml-auto'>
            {navItems.map((item) => 
              item.active ? (
                <li key={item.name}>  
                  <button 
                    onClick={() => navigate(item.slug)} 
                    className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>
                    {item.name}
                  </button>
                </li>
              ) : null )}

              {authStatus && (
                <li>
                  <LogoutBtn />
                </li>
              )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header