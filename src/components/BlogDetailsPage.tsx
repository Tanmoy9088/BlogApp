import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Post } from "../types/BlogData.type";
import axios from "axios";

const BlogDetailsPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState("");
  const [blogData, setBlogData] = useState<Post[]>([]);
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    console.log("ID from URL:", id);
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://jsonfakery.com/blogs`);
        console.log("response", res);
        setBlogData(res.data);
      } catch (error: any) {
        setIsError(error.message);
      }
    };

    fetchData();
  }, []);

  const blog = blogData.filter((b) => b.id === id);
  console.log("blog", blog);

  // const blog = blogData.find((b) => b.id === id); // find matching post
  // // console.log();

  if (!blogData) return <h2>Blog not found!</h2>;

  return (
    <>
      <div>
        {blog.map((b) => (
          <div>
            <img src={b.featured_image} alt="" />
            <p>{b.category}</p>
            <p className="text-xl font-bold">{b.title}</p>
            <p>{b.subtitle}</p>
            <p>{b.main_content}</p>

            <p>{b.summary}</p>
            <p>{b.readTime}</p>
            <p>{b.updated_at}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default BlogDetailsPage;

// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import type { Post } from "../types/BlogData.type";

// const BlogDetailsPage = () => {
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const post: Post | undefined = state?.post;

//   // Fallback: if user refreshes or visits URL directly
//   if (!post) {
//     return (
//       <div className="text-center pt-24">
//         <p className="text-xl">
//           Post not found. Please go back and click a post.
//         </p>
//         <button
//           onClick={() => navigate("/")}
//           className="mt-4 bg-blue-300 px-4 py-2 rounded-lg"
//         >
//           ← Back to Home
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="p-10 max-w-3xl mx-auto">
//       <button
//         onClick={() => navigate(-1)}
//         className="mb-6 bg-blue-300 px-4 py-2 rounded-lg"
//       >
//         ← Back
//       </button>
//       <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
//       <p className="text-gray-600 mb-2">{post.author}</p>
//       <p className="text-lg leading-relaxed">{post.body}</p>
//     </div>
//   );
// };

// export default BlogDetailsPage;
