import type { Post } from "../types/BlogData.type";
import { useNavigate } from "react-router-dom";

type PostProps = {
  post: Post;
};

const BlogCard = ({ post }: PostProps) => {
  const navigate = useNavigate();

  return (
    <article
      className="
        bg-white
        rounded-2xl
        overflow-hidden
        shadow-md
        hover:shadow-2xl
        hover:-translate-y-2
        transition-all
        duration-300
      "
    >
      {/* Image */}
      <div className="overflow-hidden">
        <img
          src={post.featured_image}
          alt={post.title}
          className="
            w-full
            h-60
            object-cover
            hover:scale-105
            transition-transform
            duration-500
          "
        />
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category */}
        <span className="inline-block bg-indigo-100 text-zinc-700 text-sm px-3 py-1 rounded-full font-medium">
          {post.category}
        </span>

        {/* Title */}
        <h2 className="mt-4 text-2xl font-bold text-gray-800 line-clamp-2">
          {post.title}
        </h2>

        {/* Subtitle */}
        <p className="mt-3 text-gray-600 line-clamp-3">{post.subtitle}</p>

        {/* Author */}
        <div
          className="mt-6 flex items-center gap-3"
          onClick={() => navigate(`/user/${post.user_id}`)}
        >
          <img
            src={post.user.avatar}
            alt={post.user.last_name}
            className="w-10 h-10 rounded-full object-cover border-2"
          />

          <div>
            <p className="font-medium text-gray-800">
              {" "}
              {post.user.first_name} {post.user.middle_name}{" "}
              {post.user.last_name}
            </p>

            <p className="text-sm text-gray-500">
              {post.created_at} • {post.readTime}
            </p>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={() =>
            navigate(`/blog/${post.id}`, {
              state: { post },
            })
          }
          className="
            mt-6 w-full bg-zinc-900 text-white py-3 rounded-xl hover:bg-indigo-700 transition font-medium
          "
        >
          Read Article →
        </button>
      </div>
    </article>
  );
};

export default BlogCard;
