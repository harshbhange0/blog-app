import React, { useContext, useEffect, useState } from "react";
import { authContext } from "../context/authcontext";
import LoadingIcon from "../components/LoadingIcon";
import Navbar from "../components/Navbar";
import axios from "axios";
import Post from "./Post";
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
  const { loading } = useContext(authContext);

  return loading ? (
    <LoadingIcon />
  ) : (
    <>
      <Navbar />
      {!posts.length ? (
        <div className="w-full flex items-center justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        posts.map((post: Post, i) => {
          console.log(post);
          return <Post key={i} title={post.title} content={post.content} />;
        })
      )}
    </>
  );
}
