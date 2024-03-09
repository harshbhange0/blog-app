import axios from "axios";
import { useEffect, useState } from "react";
import Post from "./Post";
import PostSkeleton from "../components/PostSkeleton";
import { PostTypes, PostsTypes } from "@harshbhange0/blogts-types";
import { Link } from "react-router-dom";

export default function MyPost() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getPosts();
  }, []);
  const [posts, setPosts] = useState<PostsTypes>([]);
  const baseurl = import.meta.env.VITE_BASE_POST_URL;
  const getPosts = async () => {
    try {
      const res = await axios.get(
        `${baseurl}my-post/${localStorage.getItem("id")}`,
        {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        }
      );
      setPosts(res.data.posts);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

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
                type={"update-post"}
              />
            );
          })
        )}
      </div>
    </>
  );
}
