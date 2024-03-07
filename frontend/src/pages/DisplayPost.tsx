import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PostTypes } from "@harshbhange0/blogts-types";
import { getDate } from "../utils/getdate";
import TextEditor from "../components/TextEditor";
import { FaEdit } from "react-icons/fa";

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
    <section className="mt-[66px] flex flex-col gap-y-4">
      <div className="flex gap-2 pb-2 flex-row justify-end items-center">
        <div className=" px-4 flex justify-end items-center tex">
          <span>{post?.author.name || ""}</span>
          <span>{post?.author.email || ""}</span>
          <span>{date || ""}</span>{" "}
        </div>
        <div>
          <button
            onClick={() => {
              setIsEditable(true);
            }}
            className="text-3xl"
          >
            <FaEdit />
          </button>
        </div>
      </div>
      <div className="post_body">
        <h1
          className="text-3xl font-semibold"
          dangerouslySetInnerHTML={{ __html: post?.title || "" }}
        ></h1>
        <p dangerouslySetInnerHTML={{ __html: post?.content || "" }}></p>
      </div>
    </section>
  );
}
