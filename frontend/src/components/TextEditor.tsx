import { PostTypes } from "@harshbhange0/blogts-types";
import axios from "axios";
import { useState } from "react";
import ReactQuill from "react-quill";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
interface TextEditorProps {
  title?: string | "";
  content?: string;
  published?: boolean | undefined;
  isEditable?: boolean;
  setIsEditable?: React.Dispatch<React.SetStateAction<boolean | false>>;
}

export default function TextEditor({
  title = "",
  content = "",
  published = false,
  isEditable,
  setIsEditable,
}: TextEditorProps) {
  const { userid, postid } = useParams();
  const [inputTitle, setTitle] = useState<string>([...title].join(""));
  const [inputContent, setContent] = useState<string>([...content].join(""));
  const [inputPublished, inputSetPublished] = useState<boolean>(published);
  const baseurl = import.meta.env.VITE_BASE_POST_URL;
  const navigate = useNavigate();
  const deleteBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.delete(`${baseurl}auth/delete/${postid}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
          userid,
        },
      });
      if (!res) {
        return toast.error("Cannot Create Post");
      }
      toast.success("Successfully Post Deleted ");
      setTitle("");
      setContent("");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const updateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${baseurl}auth/update/${postid}`,
        {
          title: inputTitle,
          content: inputContent,
          published: inputPublished,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            userid,
          },
        }
      );
      if (!res) {
        return toast.error("Cannot Create Post");
      }
      toast.success("Successful Post Creation");
      setTitle("");
      setContent("");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const cancelEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (setIsEditable) {
      setIsEditable(false);
    }
  };
  const createBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${baseurl}auth/create/${localStorage.getItem("id")}`,
        {
          title: inputTitle,
          content: inputContent,
          published: inputPublished,
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
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form className="flex flex-col gap-y-5 w-full mb-5">
        <h1 className="text-center mt-5 text-2xl">Add Blog</h1>
        <div>
          <label htmlFor="title" className="flex flex-col gap-y-2 ">
            <div className="flex">
              <div className="ms-auto">
                <label htmlFor="publish" className="flex flex-row gap-4">
                  Publish:
                  <input
                    type="checkbox"
                    checked={inputPublished}
                    onChange={(e) => inputSetPublished(e.target.checked)}
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
                value={inputTitle}
                onChange={setTitle}
                placeholder="select to formate text"
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
              value={inputContent}
              onChange={setContent}
            />
          </label>
        </div>
        <div className="flex justify-between items-center">
          {isEditable ? (
            <>
              <button className="btn btn-error" onClick={deleteBlog}>
                Delete
              </button>

              <button
                className="btn btn-success text-white"
                onClick={updateBlog}
              >
                Update Blog
              </button>

              <button className="btn" onClick={cancelEdit}>
                Cancel
              </button>
            </>
          ) : (
            <button
              className="btn btn-success text-white mx-auto"
              onClick={createBlog}
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
