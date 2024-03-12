import axios from "axios";
import { useEffect, useState } from "react";
import Post from "./Post";
import PostSkeleton from "../components/PostSkeleton";
import { PostsTypes } from "@harshbhange0/blogts-types";
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
            Authorization: localStorage.getItem("authorization"),
          },
        },
      );
      setPosts(res.data.posts);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(posts);

  return (
    <>
      <div
        className={`grid auto-rows-[192px] grid-cols-1 gap-4 px-2 py-4 sm:grid-cols-3 sm:px-3 `}
      >
        {!loading ? (
          posts.length > 0 ? (
            posts?.map((post, i) => (
              <div
                key={i}
                className={`overflow-hidden rounded-md border shadow-md transition hover:shadow-lg sm:row-span-1 ${i === 3 || i === 6 ? "sm:col-span-2" : ""}`}
              >
                hfh
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
              </div>
            ))
          ) : (
            <div className="col-span-3 mt-40 flex w-full flex-row justify-center gap-2 text-center">
              <span>You Don't have any post yet</span>
              <Link className="text-blue-500 underline" to={"/add-post"}>
                Create A Post
              </Link>
            </div>
          )
        ) : (
          [...Array(7)].map((_, i) => {
            return (
              <div
                key={i}
                className={`row-span-1 overflow-hidden rounded-md border shadow-md transition hover:shadow-lg ${i === 3 || i === 6 ? "sm:col-span-2" : ""}`}
              >
                <PostSkeleton />
              </div>
            );
          })
        )}
      </div>
    </>
  );
}
