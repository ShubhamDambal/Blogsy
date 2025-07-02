import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, Select, RTE } from '../index'
import dbService from "../../appwrite/database"
import storageService from "../../appwrite/storage"
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'  //used to dispatch redux actions

// slices
import {
  fetchPostsStart,
  fetchPostsSuccess,
  fetchPostsFailure
} from '../../store/postSlice'

import {
  uploadFileStart,
  uploadFileSuccess,
  uploadFileFailure
} from '../../store/fileSlice'
 
function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      // 2 cases: user editing his form or newly creating
      title: post?.title || '',
      slug: post?.slug || '',
      content: post?.content || '',
      status: post?.status || 'active',
    }
  })

  const navigate = useNavigate()
  const dispatch = useDispatch()  // needed to call actions from postSlice & fileSlice
  const userData = useSelector((state) => state.auth.userData)

  // 2 cases: user editing his form or newly creating
  const submit = async (data) => {
    console.log("Form data:", data);

    //post already present
    if (post) {
      const fileInput = data.image?.[0];

      let file = null;
      if (fileInput) {
        dispatch(uploadFileStart())
        try {
          file = await storageService.uploadFile(fileInput);
          dispatch(uploadFileSuccess(file));
        } catch (error) {
          dispatch(uploadFileFailure(error.message));
        }
      }

      if (file) {
        storageService.deleteFile(post.featuredImage)
      }

      dispatch(fetchPostsStart())
      try {
        const dbPost = await dbService.updatePost(post.$id, {
          ...data,
          featuredImage: file ? file.$id : post.featuredImage  // fallback to existing image if no new image
        })

        if (dbPost) {
          dispatch(fetchPostsSuccess([dbPost]))  // if you want to update full list, use all posts here
          navigate(`/post/${dbPost.$id}`)
        }
      } catch (error) {
        dispatch(fetchPostsFailure(error.message))
      }

    } else {  // post not exist
      dispatch(uploadFileStart())
      try {
        const file = await storageService.uploadFile(data.image[0]);
        dispatch(uploadFileSuccess(file));

        if (file) {
          const fileId = file.$id;
          data.featuredImage = fileId;

          dispatch(fetchPostsStart())
          const dbPost = await dbService.createPost({
            ...data,
            userId: userData.$id
          })

          if (dbPost) {
            dispatch(fetchPostsSuccess([dbPost]))  // replace list or append based on logic
            navigate(`/post/${dbPost.$id}`)
          }
        }
      } catch (error) {
        dispatch(uploadFileFailure(error.message));
        dispatch(fetchPostsFailure(error.message));
      }
    }
  }

  // creating slug for title (watch on title and convert space to '-')
  const slugTransform = useCallback((value) => {
    if (value && typeof value === 'string') {
      return value
        .trim()
        .toLowerCase()
        .replace(/\s/g, '-') /*/__/g = check globally */
    } else {
      return ''
    }
  }, [])

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'title') {
        setValue('slug', slugTransform(value.title, { shouldValidate: true }))
      }
    })

    return () => {
      subscription.unsubscribe()  // this is for optimization (like avoids looping around itself)
    }
  }, [watch, slugTransform, setValue])

  return (
  <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
    <div className="w-full md:w-2/3 px-2">
      <Input
        label="Title :"
        placeholder="Title"
        className="mb-4"
        {...register("title", { required: true })}
      />
      <Input
        label="Slug :"
        placeholder="Slug"
        className="mb-4"
        {...register("slug", { required: true })}
        onInput={(e) => {
          setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
        }}
      />
      <RTE
        label="Content :"
        name="content"
        control={control}
        defaultValue={getValues("content")}
      />
    </div>

    <div className="w-full md:w-1/3 px-2 mt-6 md:mt-0">
      <Input
        label="Featured Image :"
        type="file"
        className="mb-4 cursor-pointer"
        accept="image/png, image/jpg, image/jpeg, image/gif"
        {...register("image", { required: !post })}
      />

      {post && post.featuredImage && (
        <div className="w-full mb-4">
          <img
            src={storageService.getFileView(post.featuredImage)}
            alt={post.title}
            className="rounded-lg"
          />
        </div>
      )}

      <Select
        options={["active", "inactive"]}
        label="Status"
        className="mb-4"
        {...register("status", { required: true })}
      />
      <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
        {post ? "Update" : "Submit"}
      </Button>
    </div>
  </form>
);

}

export default PostForm
