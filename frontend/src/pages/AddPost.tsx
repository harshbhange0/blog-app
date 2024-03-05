import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

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

  console.log(published);

  return (
    <form className="flex flex-col gap-y-5 w-full ">
      <h1 className="text-center mt-5 text-2xl">Add Blog</h1>
      <div>
        <label htmlFor="title" className="flex flex-col gap-y-2 ">
          <div className="flex">
            Title:{" "}
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
          <input
            type="text"
            id="title"
            name="title"
            required
            autoComplete="off"
            className="outline-none border px-3 py-2 w-full rounded-md"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
      </div>

      <div>
        <label htmlFor="content" className="flex flex-col gap-y-2 ">
          Content:
          <textarea
            name="content"
            id="content"
            cols={30}
            rows={10}
            required
            autoComplete="off"
            className="outline-none border px-3 py-2 w-full rounded-md"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
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
