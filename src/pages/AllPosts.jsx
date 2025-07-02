import React, { useEffect } from 'react'
import { Container, PostCard } from '../components'
import dbService from "../appwrite/database"
import { Query } from 'appwrite'
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
      const response = await dbService.getPosts([
        Query.orderDesc("$createdAt"),
        Query.equal("status", "active")
      ]) //getPosts() without any argument then fetches all active posts
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

  // Show all user's active posts
  const filteredPosts = posts.filter(
    (post) => post.status === 'active'
  )

  return (
    <div className='py-8 px-5'>
      <Container>
        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 max-w-7xl mx-auto'>
            {filteredPosts.map((post) => (
              <PostCard key={post.$id} {...post} />
            ))}
          </div>
        )}
      </Container>
    </div>
  )
}
 
export default AllPosts
