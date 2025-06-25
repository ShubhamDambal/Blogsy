import React, { useEffect } from 'react'
import { Container, PostCard } from '../components'
import dbService from '../appwrite/database'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchPostsStart,
  fetchPostsSuccess,
  fetchPostsFailure
} from '../store/postSlice'
import { Query } from 'appwrite'

function InactivePosts() {
  const dispatch = useDispatch()

  // Access posts and user data from Redux
  const { posts, loading, error } = useSelector((state) => state.posts)
  const userData = useSelector((state) => state.auth.userData)

  const fetchInactivePosts = async () => {
    if (!userData) return

    dispatch(fetchPostsStart())

    try {
      const response = await dbService.getPosts([
        Query.equal('status', 'inactive'),
        Query.equal('userId', userData.$id),
      ])

      if (response && response.documents.length > 0) {
        dispatch(fetchPostsSuccess(response.documents))
      } else {
        dispatch(fetchPostsFailure('No inactive posts found.'))
      }
    } catch (err) {
      dispatch(fetchPostsFailure(err.message))
    }
  }

  useEffect(() => {
    fetchInactivePosts()
  }, [dispatch, userData])

  if (!userData) {
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

  return (
    <div className="w-full py-8">
      <Container>
        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && posts.length > 0 && (
          <div className="flex flex-wrap">
            {posts.map((post) => (
              <div key={post.$id} className="p-2 w-1/4">
                <PostCard {...post} />
              </div>
            ))}
          </div>
        )}
        {!loading && !error && posts.length === 0 && (
          <p className="text-center text-gray-600">No inactive posts to show.</p>
        )}
      </Container>
    </div>
  )
}

export default InactivePosts
