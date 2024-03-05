import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function DisplayPost() {
  const { id } = useParams();
  useEffect(() => {
    getPost();
  }, []);
  const getPost = async () => {
    const baseurl = import.meta.env.VITE_BASE_POST_URL;

    try {
      const res = await axios.get(`${baseurl}get-post/${id}`);
      console.log(res.data.post);
    } catch (error) {
      console.log(error);
    }
  };
  return <div>DisplayPost</div>;
}
