import { useEffect, useState } from "react";
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

  if (isLoading) return <p>Loading...</p>;
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
