import { Link } from "react-router-dom";
import { PostTypes } from "../config";
import { getDate } from "../utils/getdate";
import { useEffect, useState } from "react";

export default function Post({
  content,
  createdAt,
  title,
  updateAt,
  id,
  author: { name, email },
}: PostTypes) {
  const date = getDate(createdAt);
  const updateDate = getDate(updateAt);
  
  return (
    <Link to={`/auth/feed/posts/${id}`} className={"h-auto " + email}>
      <div className="w-full border-b flex flex-col pb-1">
        <div className="px-2 flex justify-start w-full  border-slate-100 pb-1">
          <div className="flex justify-between items-center w-full flex-row ">
            <div className="flex items-center gap-2 flex-row">
              <Avatar name={name} />
              <span className="text-sm text-slate-800 capitalize font-thin">
                {name}
              </span>
              <span className="text-lg">&#183;</span>
              <span className="text-sm text-slate-800 capitalize font-thin">
                {date}
              </span>
            </div>
            <span className="text-sm text-slate-800 capitalize font-thin">
              Updated At {updateDate}
            </span>
          </div>
        </div>
        <div className="flex flex-col px-4 lg:px-10">
          <h1
            dangerouslySetInnerHTML={{ __html: title }}
            className="text-lg lg:text-xl font-semibold capitalize pt-1 line-clamp-2 indent-2 "
          ></h1>
          <p
            dangerouslySetInnerHTML={{ __html: content }}
            className="text-sm font-normal first-letter:text-xl text-gray-700 pt-2 indent-1   line-clamp-3 lg:line-clamp-4"
          ></p>
        </div>
      </div>
    </Link>
  );
}
export function Avatar({ name = "someone" }: { name: string }) {
  return (
    <div className=" capitalize text-center text-sm font-bold rounded-full border w-7 h-7 flex justify-center items-center bg-stone-100/30">
      <span>
        {name.split(" ").length < 0
          ? name.split(" ")[0] + name.split(" ")[1]
          : name.split("")[0]}
      </span>
    </div>
  );
}
