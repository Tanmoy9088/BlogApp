import axios from "axios";
import { useEffect, useState } from "react";

// Joke data type
type Joke = {
  id: number;
  punchline: string;
  setup: string;
  type: string;
};

const JokePage = () => {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [joke, setJoke] = useState<Joke | null>(null);
  const [isClicked, setIsClicked] = useState<number>(0);

  const jokeRefresher = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://official-joke-api.appspot.com/random_joke`,
      );
      setJoke(response.data);
    } catch (err: any) {
      setError(err.message === 404 ? "Server not found" : "Error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    jokeRefresher();
  }, []);

  const jokesButton = () => {
    const nextCount = isClicked + 1;
    if (nextCount === 2) {
      jokeRefresher();
      setIsClicked(0);
    } else {
      setIsClicked(nextCount);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex flex-col justify-center items-center gap-3 text-center">
        <p className="w-10 h-10 border-4 border-zinc-400 border-t-transparent rounded-full animate-spin"></p>
        <p className="text-zinc-500">Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center gap-2">
        <p className="font-bold text-red-600">Oops, something went wrong</p>
        <p className="text-red-500 text-sm">{error}</p>
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col items-center bg-zinc-50 px-4 py-16">
      <h1 className="text-3xl font-serif font-semibold text-zinc-800 mb-10 text-center">
        A Joke to Make You Laugh
      </h1>

      {joke && !loading && (
        <div className="w-full max-w-xl bg-white border border-zinc-200 rounded-2xl shadow-sm p-8 flex flex-col items-center">
          {/* Setup */}
          <p className="text-xl text-zinc-800 text-center leading-relaxed mb-6">
            {joke.setup}
          </p>

          {/* Divider */}
          <div className="w-12 h-px bg-zinc-300 mb-6" />

          {/* Punchline */}
          <p
            className={`${
              isClicked >= 1 ? "block" : "hidden"
            } text-xl font-semibold text-zinc-900 text-center leading-relaxed mb-8`}
          >
            {joke.punchline}
          </p>

          {/* Button */}
          <button
            onClick={jokesButton}
            className="bg-zinc-900 text-white px-6 py-2.5 rounded-full text-base font-medium tracking-wide hover:bg-zinc-700 transition-colors"
          >
            {isClicked === 0 ? "Tell me" : "Another"}
          </button>
        </div>
      )}
    </div>
  );
};

export default JokePage;