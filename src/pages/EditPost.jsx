import React, { useEffect } from 'react'
import { Container, PostForm } from '../components'
import dbService from "../appwrite/database"
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchPostsStart,
  fetchPostsSuccess,
  fetchPostsFailure,
} from '../store/postSlice'

function EditPost() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const posts = useSelector((state) => state.posts.posts)
  const loading = useSelector((state) => state.posts.loading)
  const error = useSelector((state) => state.posts.error)

  // Try to find the post in already-fetched posts
  const post = posts.find((p) => p.$id === slug) || null

  useEffect(() => {
    const fetchPost = async () => {
      dispatch(fetchPostsStart())

      try {
        const data = await dbService.getPost(slug)
        if (data) {
          dispatch(fetchPostsSuccess([data]))
        } else {
          dispatch(fetchPostsFailure("Post not found"))
          navigate("/")
        }
      } catch (err) {
        dispatch(fetchPostsFailure(err.message))
        navigate("/")
      }
    }

    if (slug) {
      fetchPost()
    } else {
      navigate("/")
    }

  }, [slug, dispatch, navigate])

  if (loading) {
    return (
      <div className="w-full py-8 text-center">
        <Container>
          <h1 className="text-xl font-semibold">Loading post...</h1>
        </Container>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full py-8 text-center">
        <Container>
          <h1 className="text-xl font-bold text-red-500">{error}</h1>
        </Container>
      </div>
    )
  }

  return post ? (
    <div className='py-8'>
      <Container>
        <PostForm post={post} /> {/*All logic for edit is handled in PostForm*/}
      </Container>
    </div>
  ) : null
}

export default EditPost
