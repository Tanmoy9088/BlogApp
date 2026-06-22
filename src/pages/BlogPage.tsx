import BlogDetailsPage from "../components/BlogDetailsPage";

const BlogPage = () => {
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
            Explore thoughtful articles on technology, sports, programming,
            artificial intelligence, and the trends shaping tomorrow.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <button className="px-6 py-3 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition">
              Explore Articles
            </button>

            <button className="px-6 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 transition">
              Start Writing
            </button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-wrap gap-3">
          {[
            "Technology",
            "React",
            "JavaScript",
            "Sports",
            "AI",
            "Programming",
          ].map((category) => (
            <button
              key={category}
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

        <BlogDetailsPage />
      </section>
    </div>
  );
};

export default BlogPage;
