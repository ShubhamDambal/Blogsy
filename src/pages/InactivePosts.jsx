import React, { useEffect, useState } from 'react'
import { Container, PostCard } from '../components'
import { useDispatch, useSelector } from 'react-redux'
import dbService from '../appwrite/database'
import authService from '../appwrite/auth'
import { Query } from 'appwrite'

import {
  fetchPostsStart,
  fetchPostsSuccess,
  fetchPostsFailure,
} from '../store/postSlice'

import { login, logout } from '../store/authSlice'

function InactivePosts() {
  const dispatch = useDispatch()
  const { posts, loading: postsLoading, error } = useSelector((state) => state.posts)
  const { userData } = useSelector((state) => state.auth)

  const [hasFetched, setHasFetched] = useState(false)
  const [checkingAuth, setCheckingAuth] = useState(true)

  useEffect(() => {
    const fetchAllPosts = async () => {
      dispatch(fetchPostsStart())

      try {
        const response = await dbService.getPosts([
          Query.orderDesc("$createdAt")
        ])

        if (response?.documents) {
          dispatch(fetchPostsSuccess(response.documents))
        } else {
          dispatch(fetchPostsFailure("No posts found."))
        }
      } catch (err) {
        dispatch(fetchPostsFailure(err.message || "Failed to fetch posts."))
      }

      setHasFetched(true)
    }

    const checkAuthAndFetch = async () => {
      try {
        if (!userData?.$id) {
          const currentUser = await authService.getCurrentUser()
          if (currentUser) {
            dispatch(login({ userData: currentUser }))
          } else {
            dispatch(logout())
          }
        }

        setCheckingAuth(false) // done checking

        if (!hasFetched && userData?.$id) {
          fetchAllPosts()
        }
      } catch (err) {
        dispatch(logout())
        setCheckingAuth(false)
      }
    }

    checkAuthAndFetch()
  }, [dispatch, userData, hasFetched])

  // Filter posts: only inactive + current user
  const filteredPosts = posts.filter(
    (post) => post.status === 'inactive' && post.userId === userData?.$id
  )

  // Show loading while checking auth
  if (checkingAuth) {
    return (
      <div className="w-full py-8">
        <Container>
          <p className="text-center text-gray-500">Checking authentication...</p>
        </Container>
      </div>
    )
  }

  // If still no userData after check
  if (!userData?.$id) {
    return (
      <div className="w-full py-8">
        <Container>
          <p className="text-center text-gray-500">
            Please log in to view your inactive posts.
          </p>
        </Container>
      </div>
    )
  }

  // Final render
  return (
    <div className="w-full py-8">
      <Container>
        {postsLoading && <p className="text-center">Loading posts...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!postsLoading && !error && filteredPosts.length === 0 && (
          <p className="text-center text-gray-600">No inactive posts to show.</p>
        )}

        {!postsLoading && !error && filteredPosts.length > 0 && (
          <div className="flex flex-wrap">
            {filteredPosts.map((post) => (
              <div key={post.$id} className="p-2 w-1/4">
                <PostCard {...post} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  )
}

export default InactivePosts
