import { useState } from "react";
import type { Post } from "../types/BlogData.type";
import { useNavigate } from "react-router-dom";
type PostProps = {
  post: Post;
  //   handleClick: () => void;
  //   clicked: boolean;
};
const BlogCard = ({ post }: PostProps) => {
  const [clicked, setclicked] = useState<boolean>(false);
  const handleClick = () => {
    console.log("click");
    setclicked((prev) => !prev);
  };
  const navigate = useNavigate();
  return (
    <>
      <div className="max-w-[500px] mb-4 border-2 rounded-xl">
        <img
          src={post.featured_image}
          alt={post.title}
          className="h-[250px] w-[500px] rounded-t-xl py-1 px-1 "
        />
        <div className="p-2">
          {" "}
          <p className="bg-emerald-100 w-fit px-2 py-1 rounded-xl">
            {post.category}
          </p>
          <h1 className="text-xl font-semibold pb-2">{post.title}</h1>
          <p className={`${clicked ? "hidden" : "block"}`}>{post.subtitle}</p>
          <div
            className={`${clicked ? "block" : "hidden"}`}
            dangerouslySetInnerHTML={{ __html: post.main_content }}
          />
          <div className={`flex flex-wrap gap-2 font-thin pt-2`}>
            <img src={post.user.avatar} className="h-8 w-8 rounded-full" />
            <p className="">{post.user.name} •</p>
            <p>{post.created_at} •</p>
            <p>{post.readTime}</p>
            <button
              onClick={handleClick}
              className="bg-blue-400 rounded-2xl px-2 py-1"
            >
              {clicked ? "back" : "read more..."}
            </button>
            <button
              onClick={() => navigate(`/blog/${post.id}`, { state: { post } })}
            >
              Read More
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogCard;
