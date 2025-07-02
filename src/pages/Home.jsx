import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, PostCard } from '../components'
import dbService from "../appwrite/database"
import { Query } from 'appwrite'
import {
  fetchPostsStart,
  fetchPostsSuccess,
  fetchPostsFailure,
} from '../store/postSlice'

function Home() {
  const dispatch = useDispatch()
  const { posts, loading, error } = useSelector((state) => state.posts)

  useEffect(() => {
    const fetchPosts = async () => {
      dispatch(fetchPostsStart())

      try {
        const response = await dbService.getPosts([
          Query.limit(3),
          Query.orderDesc("$createdAt"),
          Query.equal("status", "active")
        ])

        if (response && response.documents) {
          dispatch(fetchPostsSuccess(response.documents))
        } else {
          dispatch(fetchPostsFailure("No posts found"))
        }
      } catch (err) {
        dispatch(fetchPostsFailure(err.message))
      }
    }

    fetchPosts()
  }, [dispatch])

  if (loading) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <p>Loading...</p>
        </Container>
      </div>
    )
  }

  if (error || posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <h1 className="text-2xl font-bold text-red-500 hover:text-gray-500">
            {error || "No posts found"}
          </h1>
        </Container>
      </div>
    )
  }

  return (
    <div className='w-full py-8 px-5'>
      <Container>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 max-w-7xl mx-auto'>
          {posts.map((post) => (
            <div key={post.$id} className='p-2'>
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default Home
