import axios from "axios";
import { useEffect, useState } from "react";
import type { Post } from "../types/BlogData.type";
import { useParams, useNavigate } from "react-router-dom";

const AuthorPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState("");
  const [blogData, setBlogData] = useState<Post[]>([]);
  const { userId } = useParams();
  // console.log(userId)
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
          <div className="w-10 h-10 border-4 border-zinc-800 border-t-transparent rounded-full animate-spin mx-auto" />
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
            className="mt-6 bg-zinc-800 text-white px-5 py-2 rounded-lg text-sm hover:bg-indigo-600 transition"
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
    <div className="min-h-screen bg-stone-50">
      {/* Author Header */}
      <section className="bg-white border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <img
            src={user.profile_pic || user.avatar}
            alt={user.first_name}
            className="w-28 h-28 rounded-full mx-auto object-cover border border-stone-200"
          />

          <h1 className="mt-6 text-4xl md:text-5xl font-serif font-bold text-stone-900">
            {user.first_name} {user.middle_name} {user.last_name}
          </h1>

          <p className="mt-2 text-stone-500">@{user.username}</p>

          <p className="mt-4 text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Writer and creator sharing thoughts about technology, programming,
            innovation and everyday learning.
          </p>

          <p className="mt-4 text-sm text-stone-400">Member since {joinDate}</p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-10">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="text-stone-600 hover:text-black transition"
        >
          ← Back
        </button>

        {/* Posts Header */}
        <div className="mt-10 border-b border-stone-200 pb-4">
          <h2 className="text-3xl font-serif font-bold text-stone-900">
            Articles
          </h2>

          <p className="text-stone-500 mt-1">
            {allUserBlogs.length} published posts
          </p>
        </div>

        {/* Posts */}
        <div className="divide-y divide-stone-200">
          {allUserBlogs.map((post) => (
            <article
              key={post.id}
              onClick={() => navigate(`/blog/${post.id}`)}
              className="py-8 cursor-pointer hover:bg-stone-100/50 transition"
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* Image */}
                <img
                  src={post.featured_image}
                  alt={post.title}
                  className="w-full md:w-52 h-40 object-cover rounded-md shrink-0"
                />

                {/* Content */}
                <div className="flex-1">
                  <p className="text-xs uppercase tracking-widest text-stone-500">
                    {post.category}
                  </p>

                  <h3 className="mt-2 text-2xl font-serif font-bold text-stone-900">
                    {post.title}
                  </h3>

                  <p className="mt-3 text-stone-600 line-clamp-3">
                    {post.excerpt || post.subtitle}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-stone-500">
                    <span>{post.readTime}</span>

                    <span>•</span>

                    <span>
                      {new Date(post.created_at).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>

                    <span>•</span>

                    <span>❤️ {post.likes}</span>

                    <span>•</span>

                    <span>💬 {post.comments?.length || 0}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AuthorPage;
