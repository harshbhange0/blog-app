import React, { useContext, useEffect, useState } from "react";
import { authContext } from "../context/authcontext";
import LoadingIcon from "../components/LoadingIcon";
import Navbar from "../components/Navbar";
import axios from "axios";
import Post from "./Post";
import { PostTypes } from "../config";
interface Post {
  authorId?: string;
  content?: string;
  createdAt?: string;
  id?: string;
  published?: boolean;
  title?: string;
  updateAt?: string;
}
export default function Feeds() {
  useEffect(() => {
    getPosts();
  }, []);
  const [posts, setPosts] = useState([]);
  const baseurl = import.meta.env.VITE_BASE_POST_URL;
  const getPosts = async () => {
    try {
      const res = await axios.get(`${baseurl}all`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      setPosts(res.data.posts);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="max-w-2xl w-full h-full  flex flex-col gap-y-4 my-2 pe-[5px] overflow-x-auto">
        {posts.map((post: PostTypes, i) => {
          return (
            <Post
              key={i}
              author={post.author}
              title={post.title}
              content={post.content}
              createdAt={post.createdAt}
              updateAt={post.updateAt}
              id={post.id}
            />
          );
        })}
      </div>
    </>
  );
}
