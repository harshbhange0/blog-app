import { Link } from "react-router-dom";
import { PostTypes } from "@harshbhange0/blogts-types";
import { getDate } from "../utils/getdate";
export default function Post({
  id,
  content,
  title,
  author,
  type,
  createdAt,
}: PostTypes) {
  const date = getDate(createdAt);
  return (
    <>
      <div className="flex h-full w-full flex-col  p-2 ">
        <div className="flex items-center justify-between border-b px-2 pb-1 ">
          <Avatar />
          <div className="flex items-center justify-center gap-2">
            <span className=" text-[10px]">{date}</span>
            <span className="hidden text-lg md:block">&#183;</span>
            <span className="capitalize"> {author.name}</span>
          </div>
        </div>
        <Link
          to={`/auth/feed/${
            type === "normal-post" ? "normal-post" : "update-post"
          }/${type === "normal-post" ? id : id + "/" + author.id}`}
          className={" h-auto rounded-md  transition" + author.email}
        >
          <div className="grid h-full grid-cols-1 grid-rows-2 overflow-hidden">
            <div className=" h-full text-xl">
              <div
                className="text-2xl"
                dangerouslySetInnerHTML={{ __html: title.slice(0, 30) + "..." }}
              />
            </div>
            <div
              className=" my-auto line-clamp-3 h-auto"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>{" "}
        </Link>
      </div>
    </>
  );
}

export function Avatar({ name = "A" }: { name?: string | "" }) {
  return (
    <div className=" flex h-7 w-7 items-center justify-center rounded-full border bg-stone-100/30 text-center text-sm font-bold capitalize">
      <span>
        {name.split(" ").length < 0
          ? name.split(" ")[0] + name.split(" ")[1]
          : name.split("")[0]}
      </span>
    </div>
  );
}
