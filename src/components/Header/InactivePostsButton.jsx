import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Button from '../Button'
import dbService from '../../appwrite/database'
import { Query } from 'appwrite'

function InactivePostsButton() {
  const navigate = useNavigate()
  const userData = useSelector((state) => state.auth.userData)
  const [hasInactivePosts, setHasInactivePosts] = useState(false)  //used useState bcz we haven't created slice for inActivePosts

  useEffect(() => {
    const checkInactivePosts = async () => {
      if (userData) {
        try {
          const response = await dbService.getPosts([
            Query.equal('status', 'inactive'),
            Query.equal('userId', userData.$id)
          ])
          if (response?.documents?.length > 0) {
            setHasInactivePosts(true)
          }
        } catch (error) {
          console.error("Error checking inactive posts:", error)
        }
      }
    }

    checkInactivePosts()
  }, [userData])

  if (!hasInactivePosts) return null

  return (
    <button className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full' onClick={() => navigate('/inactive-posts')}>
      Inactive Posts
    </button>
  )
}

export default InactivePostsButton
