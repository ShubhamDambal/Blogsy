//this page is for how to render/show specific post on web page

import React, {useEffect, useState} from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } 
    else{
      navigate("/");
    } 
  }, [slug, navigate]);

  const isAuthor = post && userData ? post.userId === userData.$id : false;  //check user is author or not. If author then give access to delete & edit post

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {  //deletePost returns true if post gets deleted
      if (status) {
        appwriteService.deleteFile(post.featuredImage);  //if post deleted then remove corresponding image from storage
        navigate("/");
      }
    });
  };

  return post ? (
    <div className='py-8'>
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img
            src={appwriteService.getFileView(post.featuredImage)}
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
          {parse(post.content)}  {/*Converts html to react. Bcz content is generated from Tinymce text editor*/}
        </div>
      </Container>
    </div>
  ) : null;
}

export default Post