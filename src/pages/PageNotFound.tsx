import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
      <div className="text-center max-w-lg">
        <h1 className="text-8xl font-bold text-slate-900">404</h1>

        <h2 className="mt-4 text-3xl font-semibold text-slate-800">
          Page Not Found
        </h2>

        <p className="mt-4 text-slate-600">
          The page you're looking for doesn't exist or may have been moved.
          Let's get you back to exploring great articles.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition"
          >
            Go Home
          </button>

          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 border border-slate-300 rounded-xl hover:bg-slate-100 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
