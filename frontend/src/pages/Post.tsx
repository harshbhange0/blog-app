
import { BiLike } from "react-icons/bi";
import { Link } from "react-router-dom";
interface Post {
  authorId?: string;
  content?: string;
  createdAt?: string;
  id?: string;
  published?: boolean;
  title?: string;
  updateAt?: string;
}
export default function Post(post: Post) {
  return !post ? (
    <span className="loading loading-spinner loading-lg"></span>
  ) : (
    <Link to={`/auth/feed/posts/${post.id}`}>
      <div className="flex px-3 mx-auto py-2 justify-between items-center flex-col rounded-md shadow-sm w-full sm:max-w-[100%] md:max-w-[70%] lg:max-w-[50%] border">
        <div className="w-full border-b my-2 flex flex-row items-center justify-between px-2 py-1">
          <span className="capitalize text-sm">{post.title}</span>
          <span className="uppercase rounded-full p-2 text-sm font-bold overflow-hidden border">
            {/* {post.author.split(" ")[0].charAt(0)}
            {post.author.split(" ")[1].charAt(0)} */}
          </span>
        </div>
        <div className="border-b pt-2 line-clamp-5 px-2 ">{post.content}</div>
        <div className="py-2">
          <button>
            <span className="text-2xl hover:text-blue-500 ">
              <BiLike />
            </span>
          </button>
        </div>
      </div>
    </Link>
  );
}
