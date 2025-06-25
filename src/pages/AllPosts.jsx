import React, { useEffect } from 'react'
import { Container, PostCard } from '../components'
import dbService from "../appwrite/database"
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchPostsStart,
  fetchPostsSuccess,
  fetchPostsFailure
} from '../store/postSlice'

function AllPosts() {
  const dispatch = useDispatch()

  // Access Redux state
  const { posts, loading, error } = useSelector((state) => state.posts)

  const fetchPosts = async () => {
    dispatch(fetchPostsStart())

    try {
      const response = await dbService.getPosts()
      if (response) {
        dispatch(fetchPostsSuccess(response.documents))
      } else {
        dispatch(fetchPostsFailure("No posts found"))
      }
    } catch (err) {
      dispatch(fetchPostsFailure(err.message))
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [dispatch])

  return (
    <div className='w-full py-8'>
      <Container>
        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && (
          <div className='flex flex-wrap'>
            {posts.map((post) => (
              <div key={post.$id} className='p-2 w-1/4'>
                <PostCard {...post} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  )
}

export default AllPosts
