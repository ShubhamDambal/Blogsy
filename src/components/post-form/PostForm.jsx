import React, {useCallback, useEffect} from 'react'
import { useForm } from 'react-hook-form'
import {Button, Input, Select, RTE} from '../index'
import appwriteService from "../../appwrite/config"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PostForm({post}) {
  const {register, handleSubmit, watch, setValue, control, getValues} = useForm({
    defaultValues: {
      //2 cases: user editing his form or newly creating
      title: post?.title || '',
      slug: post?.slug || '',
      content: post?.content || '',
      status: post?.status || 'active',
    }
  })

  const navigate = useNavigate()
  const userData = useSelector(state => state.user.userData)

  //2 cases: user editing his form or newly creating
  const submit = async (data) => {
    //post already present
    if(post){
      const file = data.image[0] ? appwriteService.uploadFile(data.image[0]) : null   //taking image from storage

      if(file){
        //delete prev post image from storage
        appwriteService.deleteFile(post.featuredImage)
      }

      //update post
      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,   //rest data
        featuredImage: file ? file.$id : undefined
      })

      if(dbPost){
        navigate(`/post/${dbPost.$id}`)
      }
    }
    else{//post not exist
      const file = await appwriteService.uploadFile(data.image[0])

      if(file){
        const fileId = file.$id
        data.featuredImage = fileId
        const dbPost = await appwriteService.createPost({  //while creating post passing data like this not just like (data). when forms will form then we don't have access to userId
          ...data,
          userId: userData.$id
        })

        if(dbPost){
          navigate(`/post/${dbPost.$id}`)
        }
      }
    }
  }

  //creating slug for title(watch on title and convert space to '-')
  const slugTransform = useCallback((value) => {
    if(value && typeof value === 'string'){
      return value
        .trim()
        .toLowerCase()
        .replace(/\s/g, '-') /*/__/g =changeglobally*/
    }
    else{
      return ''
    }
  }, [])

  useEffect(() => {
    const subscription = watch((value, {name}) => {
      if(name === 'title'){
        setValue('slug', slugTransform(value.title, {shouldValidate: true}))
      }
    })

    return () => {
      subscription.unsubscribe()  //this is for optimization (like avoids looping around itself)
    }
  }, [watch, slugTransform, setValue])

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
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
        <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
      </div>
      <div className="w-1/3 px-2">
        <Input
            label="Featured Image :"
            type="file"
            className="mb-4"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
        />
        {post && (
            <div className="w-full mb-4">
                <img
                    src={appwriteService.getFilePreview(post.featuredImage)}
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
  )
}

export default PostForm