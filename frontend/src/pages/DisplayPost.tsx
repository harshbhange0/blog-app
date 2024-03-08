import "../assets/display-post.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PostTypes } from "@harshbhange0/blogts-types";
import { getDate } from "../utils/getdate";
import TextEditor from "../components/TextEditor";
import { FaEdit } from "react-icons/fa";
import parse from "html-react-parser";
import { Avatar } from "./Post";

export default function DisplayPost() {
  const [post, setPost] = useState<PostTypes>();
  const { postid } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    getPost();
  }, []);

  const [isEditable, setIsEditable] = useState(false);

  const getPost = async () => {
    const baseurl = import.meta.env.VITE_BASE_POST_URL;
    try {
      const res = await axios.get(`${baseurl}get-post/${postid}`);
      setPost(res.data.post);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const date = getDate(post?.createdAt);
  return isEditable ? (
    <TextEditor
      title={post ? post?.title : ""}
      content={post ? post?.content : ""}
      isEditable={isEditable}
      setIsEditable={setIsEditable}
      published={post?.published}
    />
  ) : loading ? (
    <div className="w-full mt-52 flex justify-center items-center">
      <span className="loading loading-ball loading-lg"></span>
    </div>
  ) : (
    <>
      <section className="mt-[66px] flex flex-col gap-y-4 pb-10" id="top">
        <div className="flex gap-2 pb-2 flex-row justify-between px-2 md:px-5 items-center border-b border-slate-300 mb-3">
          <div className=" px-1 sm:px-4 flex justify-end items-center text-sm gap-2">
            <Avatar name={post?.author.name ? post?.author.name : ""} />
            <span className="hidden md:block">{post?.author.name || ""}</span>
            <span className="hidden md:block">{date || ""}</span>{" "}
          </div>
          {post?.author.id !== localStorage.getItem("id") ? (
            ""
          ) : (
            <div>
              <button
                onClick={() => {
                  setIsEditable(true);
                }}
                className="flex gap-2 items-center justify-center group"
              >
                <span className="text-sm">Update blog</span>
                <span className="text-sm md:text-xl group-hover:transform group-hover:scale-150 transition">
                  <FaEdit />
                </span>
              </button>
            </div>
          )}
        </div>
        <div className="post_body">
          <h1 className="text-2xl font-semibold mb-5">
            {parse(post?.title || "")}
          </h1>
          <p className="mt-3">{parse(post?.content || "")}</p>
        </div>
      </section>
    </>
  );
}
