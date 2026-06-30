import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Post } from "../types/BlogData.type";
import axios from "axios";

const BlogDetailsPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState("");
  const [blogData, setBlogData] = useState<Post[]>([]);

  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`https://jsonfakery.com/blogs`);
        console.log("response", res);
        setBlogData(res.data);
      } catch (error: any) {
        setIsError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const blog = blogData.find((b) => String(b.id) === id);
  console.log("blog", blog);

  if (isLoading)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-zinc-800 border-t-transparent rounded-full animate-spin" />
        <p className="mt-4 text-gray-600">Loading articles...</p>
      </div>
    );
  if (isError) return <p>Error</p>;
  if (!blog)
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <div>
          <p className="text-5xl mb-4">🔤</p>
          <p className="text-xl font-semibold text-gray-700">Blog not found</p>
          <p className="text-gray-400 text-sm mt-1">
            The blog ID in the URL doesn't match any blog.
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

  return (
    <>
      <div className="p-4 w-screen min-h-screen">
        <div className="min-h-screen bg-slate-50">
          {/* Hero Image */}
          <div className="w-full h-[500px] overflow-hidden">
            <button onClick={() => navigate(`/blog`)}> ← back</button>
            <img
              src={blog.featured_image}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article */}
          <article className="max-w-4xl mx-auto px-6 py-12">
            {/* Category */}
            <span className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium">
              {blog.category}
            </span>

            {/* Title */}
            <h1 className="text-5xl font-bold mt-6 leading-tight">
              {blog.title}
            </h1>

            {/* Subtitle */}
            <p className="mt-4 text-xl text-gray-600">{blog.subtitle}</p>

            {/* Author */}
            <div className="flex items-center gap-4 mt-8 border-b pb-8">
              <img
                src={blog.user.avatar}
                alt={blog.user.first_name}
                className="w-14 h-14 rounded-full border"
              />

              <div>
                <p className="font-semibold">
                  {blog.user.first_name} {blog.user.middle_name}{" "}
                  {blog.user.last_name}
                </p>

                <p className="text-gray-500 text-sm">
                  {blog.created_at} • {blog.readTime}
                </p>
              </div>
            </div>

            {/* Summary */}
            <div className="my-10 p-6 bg-white rounded-2xl shadow-sm">
              <h3 className="font-semibold text-lg mb-2">Summary</h3>

              <p className="text-gray-700">{blog.summary}</p>
            </div>

            {/* Content */}
            <div
              className="
          prose
          prose-lg
          max-w-none
          prose-img:rounded-xl
          prose-headings:font-bold
        "
              dangerouslySetInnerHTML={{
                __html: blog.main_content,
              }}
            />

            {/* Footer */}
            <div className="mt-12 border-t pt-6 text-gray-500">
              Updated on: {blog.updated_at}
            </div>
          </article>
        </div>
      </div>
    </>
  );
};

export default BlogDetailsPage;
