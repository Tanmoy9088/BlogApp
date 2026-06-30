import { useState, useEffect } from "react";
import BlogCard from "../components/BlogCard";
import type { Post } from "../types/BlogData.type";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
const ITEMS_PER_PAGE = 9;

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState("");

  const [postData, setPostData] = useState<Post[]>([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get("sort") || "desc";

  const toggleSort = () => {
    setSearchParams({ sort: sort === "desc" ? "asc" : "desc" });
  };

  useEffect(() => {
    const postCall = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://jsonfakery.com/blogs?sort=${sort}`,
        );
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
  }, [sort]);
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentPosts = postData.slice(start, start + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(postData.length / ITEMS_PER_PAGE);
  const totalPost = postData.length;
  console.log(totalPost);
  console.log(totalPages);

  if (error) return <p className="text-4xl pt-24 text-center">Error</p>;
  return (
    <>
      <div>
        {/*Hero Sections */}
        <section className="bg-[#F7F4ED] border-b">
          <div className="max-w-7xl mx-auto px-6 py-24">
            <h1 className="text-6xl font-serif text-black max-w-3xl">
              Stay curious.
            </h1>

            <p className="mt-6 text-xl text-gray-700 max-w-xl">
              Discover articles, tutorials, and stories from developers,
              creators, and thinkers around the world.
            </p>

            <button className="mt-8 bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition">
              Start Reading
            </button>
          </div>
        </section>
        {/*stats */}
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="bg-white rounded-2xl shadow p-6 flex flex-wrap gap-8">
            <div>
              <p className="text-gray-500">Total Posts</p>
              <p className="text-3xl font-bold">{totalPost}</p>
            </div>

            <div>
              <p className="text-gray-500">Current Page</p>
              <p className="text-3xl font-bold">{currentPage}</p>
            </div>

            <div>
              <p className="text-gray-500">Pages</p>
              <p className="text-3xl font-bold">{totalPages}</p>
            </div>
          </div>
        </div>
        {/*buttons, handle next and previous */}
        <div className="flex justify-center items-center gap-4 py-10">
          <button
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1}
            className="px-5 py-2 rounded-xl bg-white border shadow hover:shadow-md disabled:opacity-50"
          >
            ← Previous
          </button>

          <div className="px-4 py-2 bg-zinc-700 text-white rounded-xl">
            {currentPage} / {totalPages}
          </div>

          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage === totalPages}
            className="px-5 py-2 rounded-xl bg-white border shadow hover:shadow-md disabled:opacity-50"
          >
            Next →
          </button>
          <button onClick={toggleSort}>Sort: {sort}</button>
        </div>
        {/*Main content */}
        <div>
          {loading ? (
            <div className="min-h-screen flex flex-col items-center justify-center">
              <div className="w-12 h-12 border-4 border-zinc-800 border-t-transparent rounded-full animate-spin" />
              <p className="mt-4 text-gray-600">Loading articles...</p>
            </div>
          ) : (
            <div className="w-full grid grid-rows-1 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center p-4 overflow-auto">
              {currentPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;
