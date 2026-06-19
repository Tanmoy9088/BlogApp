import axios from "axios";
import { useEffect, useState } from "react";
import type { Post } from "../types/BlogData.type";
import { useParams, useNavigate } from "react-router-dom";

const AuthorPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState("");
  const [blogData, setBlogData] = useState<Post[]>([]);
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`https://jsonfakery.com/blogs`);
        setBlogData(res.data);
      } catch (error: any) {
        setIsError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const allUserBlogs = blogData.filter((b) => userId === b.user_id);
  const userFind = blogData.find((b) => userId === b.user_id);

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-gray-500 text-sm tracking-wide">
            Finding author...
          </p>
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-400 text-lg">Something went wrong: {isError}</p>
      </div>
    );

  if (!userFind)
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <div>
          <p className="text-5xl mb-4">👤</p>
          <p className="text-xl font-semibold text-gray-700">
            Author not found
          </p>
          <p className="text-gray-400 text-sm mt-1">
            The user ID in the URL doesn't match any author.
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-6 bg-indigo-500 text-white px-5 py-2 rounded-lg text-sm hover:bg-indigo-600 transition"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    );

  const user = userFind.user;
  const joinDate = new Date(user.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Hero Banner ── */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 h-48 relative" />

      <div className="max-w-4xl mx-auto px-6 pb-16">
        {/* ── Author Card ── */}
        <div className="bg-white rounded-2xl shadow-md p-6 -mt-16 relative z-10 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
          {/* Avatar */}
          <img
            src={user.profile_pic || user.avatar}
            alt={user.first_name}
            className="w-24 h-24 rounded-full object-cover ring-4 ring-white shadow-lg shrink-0"
          />

          {/* Info */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold text-gray-900">
                {user.first_name} {user.middle_name} {user.last_name}
              </h1>
              <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full font-medium capitalize">
                {user.role}
              </span>
            </div>
            <p className="text-gray-400 text-sm mt-0.5">@{user.username}</p>
            <p className="text-gray-500 text-sm mt-0.5">{user.email}</p>
            <p className="text-gray-400 text-xs mt-2">
              Member since {joinDate}
            </p>
          </div>
        </div>

        {/* ── Back Button ── */}
        <button
          onClick={() => navigate(-1)}
          className="mt-6 text-sm text-indigo-500 hover:text-indigo-700 flex items-center gap-1 transition"
        >
          ← Back
        </button>

        {/* ── Posts Section ── */}
        <h2 className="text-lg font-semibold text-gray-800 mt-6 mb-4">
          All Posts
          <span className="ml-2 text-sm font-normal text-gray-400">
            ({allUserBlogs.length})
          </span>
        </h2>

        {allUserBlogs.length === 0 ? (
          <p className="text-center text-gray-400 py-16">
            This author has no posts yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {allUserBlogs.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition cursor-pointer overflow-hidden group"
              >
                {/* Thumbnail */}
                <div className="overflow-hidden h-44">
                  <img
                    src={post.featured_image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-4 space-y-2">
                  {/* Category + Read time */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full capitalize">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-400">
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-semibold text-gray-800 leading-snug line-clamp-2 group-hover:text-indigo-600 transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-gray-500 text-sm line-clamp-2">
                    {post.excerpt}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-2 text-xs text-gray-400">
                    <span>
                      {new Date(post.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <div className="flex items-center gap-3">
                      <span>❤️ {post.likes}</span>
                      <span>💬 {post.comments?.length ?? 0}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthorPage;
