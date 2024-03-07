import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import TextEditor from "../components/TextEditor";

export default function AddPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);
  const createBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    const baseurl = import.meta.env.VITE_BASE_POST_URL;
    try {
      const res = await axios.post(
        `${baseurl}auth/create/${localStorage.getItem("id")}`,
        {
          title: title,
          content: content,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      if (!res) {
        return toast.error("Cannot Create Post");
      }
      toast.success("Successful Post Creation");
      setTitle("");
      setContent("");
    } catch (error) {
      console.log(error);
    }
  };

  return <TextEditor />;
}
