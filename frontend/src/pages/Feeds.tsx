import {  useEffect, useState } from "react";
import axios from "axios";
import { PostTypes, PostsTypes } from "@harshbhange0/blogts-types";
import PostSkeleton from "../components/PostSkeleton";
import Post from "./Post";
import { Link } from "react-router-dom";
export default function Feeds() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getPosts();
  }, []);
  const [posts, setPosts] = useState<PostsTypes>();
  const baseurl = import.meta.env.VITE_BASE_POST_URL;
  const getPosts = async () => {
    try {
      const res = await axios.get(`${baseurl}all`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      setPosts(res.data.posts);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(posts);
  return (
    <>
      <div className="w-full h-full  flex flex-col gap-y-4 my-2 pe-[5px] overflow-x-auto ">
        {loading ? (
          <>
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
          </>
        ) : posts && posts?.length < 1 ? (
          <>
            <div className="text-center text-3xl">No Blog Found!</div>
            <Link className="mx-auto underline text-blue-900" to="/add-post">
              Add a Blog
            </Link>
          </>
        ) : (
          posts?.map((post: PostTypes) => {
            return (
              <Post
                author={post.author}
                key={post.id}
                title={post.title}
                content={post.content}
                createdAt={post.createdAt}
                updatedAt={post.updatedAt}
                id={post.id}
                type={"normal-post"}
              />
            );
          })
        )}
      </div>
    </>
  );
}
