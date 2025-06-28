import React, {useState} from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Header() { 
  const [menuOpen, setMenuOpen] = useState(false);   //for responsive styling
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
    <header className="py-3 px-3 sticky top-0 z-50 bg-gray-500 shadow text-white">
      <Container>
        <nav className="flex items-center justify-between">
          {/* Left: Logo */}
          <div className="mr-4">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>

          {/* Hamburger Icon (Mobile only) */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <ul className="hidden md:flex ml-auto items-center space-x-4">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 hover:text-black rounded-full"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-4 bg-gray-400 rounded-xl p-4">
            <ul className="space-y-2">
              {navItems.map((item) =>
                item.active ? (
                  <li key={item.name}>
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        navigate(item.slug);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-blue-100 hover:text-black rounded-md"
                    >
                      {item.name}
                    </button>
                  </li>
                ) : null
              )}
              {authStatus && (
                <li>
                  <LogoutBtn />
                </li>
              )}
            </ul>
          </div>
        )}
      </Container>
    </header>
  );
}

export default Header