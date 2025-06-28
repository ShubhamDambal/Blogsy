import React, { useState, useEffect } from 'react'
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
  const [showModal, setShowModal] = useState(false);  //styling purpose
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

  const imageUrl = storageService.getFileView(post.featuredImage);
  return (
    <div className="py-8">
      <Container>
        {/* Image Section */}
        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-3xl border rounded-xl overflow-hidden shadow-md bg-white">
            <img
              src={imageUrl}
              alt={post.title}
              className="cursor-pointer max-h-full max-w-full object-contain rounded-md"
              onClick={() => setShowModal(true)}
            />

            {isAuthor && (
              <div className="absolute top-4 right-4 flex gap-2">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button bgColor="bg-green-500" className="transition-all duration-200 hover:scale-105 hover:brightness-110">
                    <span className="inline-flex items-center gap-1">
                      Edit
                    </span>
                  </Button>
                </Link>
                <Button bgColor="bg-red-500" className="transition-all duration-200 hover:scale-105 hover:brightness-110" onClick={deletePost}>
                  <span className="inline-flex items-center gap-1">
                    Delete
                  </span>
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Title */}
        <div className="max-w-3xl w-full mx-auto mb-6 text-center px-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 leading-tight">
            {post.title}
          </h1>
          <p className="mt-2 text-gray-600 text-sm">Posted on {new Date(post.$createdAt).toDateString()}</p>
        </div>

        {/* Content */}
        <div className="max-w-3xl w-full mx-auto prose prose-lg prose-img:rounded-lg prose-headings:font-semibold prose-a:text-blue-600 hover:prose-a:underline px-4">
          {parse(post.content)}
        </div>
      </Container>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-xl overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 z-50 bg-white text-black px-3 py-1 rounded-full font-semibold shadow hover:bg-gray-200"
            >
              ✕
            </button>

            {/* Image */}
            <img
              src={imageUrl}
              alt={post.title}
              className="w-full h-auto max-h-[80vh] object-contain rounded-xl"
            />
          </div>
        </div>
      )}

    </div>
  );
}

export default Post
