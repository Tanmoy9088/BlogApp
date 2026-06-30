import { useEffect, useState } from "react";
import type { Post } from "../types/BlogData.type";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import BlogWriteModal from "../components/BlogWriteModal";
const ITEM_PER_PAGE = 12;
const BlogPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [postData, setPostData] = useState<Post[]>([]);
  const [isClick, setIsClick] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const postCall = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://jsonfakery.com/blogs`);
        console.log(response);
        const data = response.data;
        console.log(data);
        setPostData(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    postCall();
  }, []);

  //
  const filteredPost =
    selectedCategory === ""
      ? postData
      : postData.filter(
          (post) =>
            post.category.toLowerCase() === selectedCategory.toLowerCase(),
        );
  console.log(filteredPost);
  const handleFilter = (category: string) => {
    console.log("clicked");
    setSelectedCategory(category);
  };

  const handleClick = () => {
    setIsClick((prev) => !prev);
  };

  const start = (currentPage - 1) * ITEM_PER_PAGE;
  const currentPosts = filteredPost.slice(start, start + ITEM_PER_PAGE);

  if (error) return <p className="text-4xl pt-24 text-center">Error</p>;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative bg-slate-50 border-b">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <span className="inline-block px-4 py-2 rounded-full bg-slate-200 text-slate-700 text-sm font-medium">
            Welcome to Our Blog ✨
          </span>

          <h1 className="mt-8 text-5xl md:text-7xl font-bold tracking-tight text-slate-900 leading-tight">
            Stories that inspire,
            <span className="block text-indigo-600">ideas that matter.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-slate-600 leading-relaxed">
            Explore thoughtful articles on technology, sports, fashions,
            artificial intelligence, and the trends shaping tomorrow.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <button className="px-6 py-3 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition">
              Explore Articles
            </button>

            <button
              className="px-6 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 transition"
              onClick={handleClick}
            >
              Start Writing
            </button>
          </div>
          <BlogWriteModal isOpen={isClick} onClose={() => setIsClick(false)} />
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-wrap gap-3">
          {[
            "Technology",
            "Education",
            "Travel",
            "Sports",
            "AI",
            "Foods",
            "Entertainment",
          ].map((category) => (
            <button
              key={category}
              onClick={() => handleFilter(category)}
              className="px-4 py-2 bg-white rounded-full shadow-sm border hover:bg-blue-50 hover:border-blue-500 transition"
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Search Bar */}
      <section className="max-w-7xl mx-auto px-6 pb-10">
        <div className="bg-white p-4 rounded-2xl shadow-md">
          <input
            type="text"
            placeholder="Search blogs..."
            className="w-full outline-none text-gray-700"
          />
        </div>
      </section>

      {/* Blog Section */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Latest Articles</h2>

          <button className="text-blue-600 font-semibold hover:text-blue-700">
            View All →
          </button>
        </div>
        <div>
          <div className="flex gap-2 p-4 w-full justify-center">
            <button
              onClick={() => setCurrentPage((prev) => prev - 1)}
              disabled={currentPage === 1}
              className="bg-blue-300 p-2 rounded-md shadow hover:shadow-md text-white disabled:bg-gray-500"
            >
              ⏮️Prev
            </button>
            <div className="p-2 bg-green-200 text-white rounded-xl shadow-md">
              {currentPage}
            </div>
            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="bg-blue-300 p-2 rounded-md shadow hover:shadow-md"
            >
              Next⏭️
            </button>
          </div>{" "}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-12 h-12 border-4 border-zinc-800 border-t-transparent rounded-full animate-spin" />
              <p className="mt-4 text-gray-600">Loading articles...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>

        {/* <BlogDetailsPage /> */}
      </section>
    </div>
  );
};

export default BlogPage;
