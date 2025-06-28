import React from 'react'
import storageService from "../appwrite/storage"
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`} className="w-full max-w-sm">
      <div className="bg-white rounded-xl shadow-md p-4 h-full flex flex-col items-center justify-between">
        <div className="w-full h-48 flex items-center justify-center mb-4 overflow-hidden">
          <img
            src={storageService.getFileView(featuredImage)}
            alt={title}
            className="max-h-full max-w-full object-contain rounded-md"
          />
        </div>
        <h2 className="text-xl font-extrabold tracking-tight text-gray-900 leading-tight">
          {title}
        </h2>
      </div>
    </Link>
  )
}

export default PostCard
