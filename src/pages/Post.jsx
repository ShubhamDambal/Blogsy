import React, { useEffect } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom"
import dbService from "../appwrite/database"
import storageService from "../appwrite/storage"
import { Button, Container } from "../components"
import parse from "html-react-parser"
import { useSelector, useDispatch } from "react-redux"
import {
  fetchPostsStart,
  fetchPostsSuccess,
  fetchPostsFailure,
} from "../store/postSlice"
import {
  uploadFileFailure,
} from "../store/fileSlice"

function Post() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const userData = useSelector((state) => state.auth.userData)
  const posts = useSelector((state) => state.posts.posts)
  const loading = useSelector((state) => state.posts.loading)
  const error = useSelector((state) => state.posts.error)

  const post = posts.find((p) => p.$id === slug) || null  //posts is an array cz, we storing it like this in slice

  useEffect(() => {
    const fetchPost = async () => {
      dispatch(fetchPostsStart())
      try {
        const fetched = await dbService.getPost(slug)
        if (fetched) {
          dispatch(fetchPostsSuccess([fetched])) // overwrite or add to posts
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

  const isAuthor = post && userData ? post.userId === userData.$id : false

  const deletePost = async () => {
    try {
      const deleted = await dbService.deletePost(post.$id)
      if (deleted) {
        await storageService.deleteFile(post.featuredImage)
        navigate("/")
      }
    } catch (err) {
      dispatch(uploadFileFailure(err.message))
    }
  }

  if (loading || !post) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <h1 className="text-xl font-medium">Loading...</h1>
        </Container>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <h1 className="text-xl font-bold text-red-500">{error}</h1>
        </Container>
      </div>
    )
  }

  return (
    <div className='py-8'>
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img
            src={storageService.getFileView(post.featuredImage)}
            alt={post.title}
            className="rounded-xl"
          />

          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>

        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div className="browser-css">
          {parse(post.content)}
        </div>
      </Container>
    </div>
  )
}

export default Post
