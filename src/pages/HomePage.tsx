import  { useState, useEffect } from "react";
import BlogCard from "../components/BlogCard";
// import blogData from "../Data/BlogData.json";
import type { Post } from "../types/BlogData.type";
// import Pagination from "./Pagination";
import axios from "axios";
const ITEMS_PER_PAGE = 3;

const HomePage = () => {
  // const postData: Post[] = blogData.posts;
  const [currentPage, setCurrentPage] = useState<number>(1);
  // const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [postData, setPostData] = useState<Post[]>([]);

  useEffect(() => {
    const postCall = async () => {
      setLoading(true);
      try {
        // const skip = (currentPage - 1) * ITEMS_PER_PAGE;
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

    // console.log(postData);
  }, []);
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentPosts = postData.slice(start, start + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(postData.length / ITEMS_PER_PAGE);
  const totalPost = postData.length;
  console.log(totalPost);
  console.log(totalPages);
  return (
    <>
      <div>
        <div className="w-screen flex gap-4 justify-between p-10">
          <button
            className="bg-blue-300 p-1 rounded-lg  disabled:bg-zinc-100"
            // value={currentPage}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <p>{currentPage}</p>
          <button
            className="bg-blue-300 p-1 rounded-lg disabled:bg-zinc-100"
            // value={currentPage}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
         {error && <p className="text-4xl pt-24 text-center">Error</p>}
        <div>
          {loading && <p className="text-4xl pt-24 text-center">Loading....</p>}
        </div>
        <div>
          {postData && !loading && (
            <div className="w-full grid grid-rows-1 grid-cols-3 gap-1 justify-items-center p-4 overflow-auto">
              {currentPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-4 justify-between p-10">
          <button
            className="bg-blue-300 p-1 rounded-lg  disabled:bg-zinc-100"
            // value={currentPage}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <p>{currentPage}</p>
          <button
            className="bg-blue-300 p-1 rounded-lg disabled:bg-zinc-100"
            // value={currentPage}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default HomePage;
