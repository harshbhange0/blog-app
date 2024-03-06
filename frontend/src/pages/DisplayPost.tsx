import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PostTypes } from "../config";

export default function DisplayPost() {
  const [post, setPost] = useState<PostTypes>();
  const { id } = useParams();
  useEffect(() => {
    getPost();
  }, []);
  const getPost = async () => {
    const baseurl = import.meta.env.VITE_BASE_POST_URL;
    try {
      const res = await axios.get(`${baseurl}get-post/${id}`);
      console.log(res.data.post);
      setPost(res.data.post);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="mt-[66px] flex flex-col gap-y-4">
      <div className="pb-2 px-4 flex justify-end items-center tex">
        <span>{post?.author.name}</span>
        <span>{post?.author.email}</span>
        <span>{post?.createdAt}</span>
      </div>
      <h1
        className="text-3xl font-semibold"
        dangerouslySetInnerHTML={{ __html: post?.title || "" }}
      ></h1>
      <p dangerouslySetInnerHTML={{ __html: post?.content || "" }}></p>
    </section>
  );
}
