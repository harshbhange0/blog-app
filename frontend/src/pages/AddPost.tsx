import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";

export default function AddPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);
  const createBlog = async (e: any) => {
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="flex flex-col gap-y-5 w-full ">
      <h1 className="text-center mt-5 text-2xl">Add Blog</h1>
      <div>
        <label htmlFor="title" className="flex flex-col gap-y-2 ">
          <div className="flex">
            <div className="ms-auto">
              <label htmlFor="publish" className="flex flex-row gap-4">
                Publish:
                <input
                  type="checkbox"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                />
              </label>
            </div>
          </div>
          <label htmlFor="title" className="flex flex-col gap-y-2 ">
            Title:
            <ReactQuill
              id="title"
              className="border"
              theme="bubble"
              value={title}
              placeholder="select to formate text"
              onChange={setTitle}
            />
          </label>
        </label>
      </div>

      <div>
        <label htmlFor="content" className="flex flex-col gap-y-2 ">
          Content:
          <ReactQuill
            id="content"
            placeholder="select to formate text"
            theme="snow"
            value={content}
            onChange={setContent}
          />
        </label>
      </div>
      <button
        className="bg-blue-500 mx-auto px-3 py-2 rounded-md text-white font-semibold"
        onClick={createBlog}
      >
        Submit
      </button>
    </form>
  );
}
