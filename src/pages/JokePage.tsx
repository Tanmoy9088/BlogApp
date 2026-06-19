import axios from "axios";
import { useEffect, useState } from "react";

//Joke data type
type Joke = {
  id: number;
  punchline: string;
  setup: string;
  type: string;
};
const JokePage = () => {
  //various states
  const [error, setError] = useState<string>(""); //error state
  const [loading, setLoading] = useState<boolean>(false); //loading state
  const [joke, setJoke] = useState<Joke | null>(null); // store jokes data
  const [isClicked, setIsClicked] = useState<number>(0);
  console.log(isClicked);
  //Joke generator function
  const jokeRefresher = async () => {
    setLoading(true);

    //Success
    try {
      const response = await axios.get(
        `https://official-joke-api.appspot.com/random_joke`,
      );
      console.log(response);
      const jokeData = response.data;
      setJoke(jokeData);

      //!Success
    } catch (err:any) {
      setError(err.message);

      //Always execute
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
    console.log(isClicked);
  };
  return (
    <div className="flex justify-center w-screen">
      {/*Loading*/}
      {loading && <p>Loading... </p>}

      {/*Error*/}
      {error && <p>Error:{error}</p>}

      {/*Show Joke here */}
      {joke && !loading && (
        <div className="relative w-[600px] h-[600px] mt-10">
          <div className="w-full">
            <div className="w-full flex justify-start">
              <p className="text-2xl text-left mb-10 bg-blue-200 w-fit rounded-xl px-2 py-1">
                <span className="font-bold text-2xl"></span>
                {joke?.setup}
              </p>
            </div>
            <div className="w-full flex justify-end">
              <p
                className={`
              ${isClicked === 0 ? "hidden" : isClicked === 1 ? "block" : ""}
             text-3xl font-bold text-right bg-green-200 w-fit rounded-xl px-2 py-1`}
              >
                <span className="font-bold"></span> {joke?.punchline}
              </p>
            </div>
          </div>
          <div className=" h-1/2 w-full text-center absolute bottom-0">
            <button
              onClick={jokesButton}
              className="bg-yellow-300 w-fit px-2 py-1 text-4xl rounded-xl"
            >
              {isClicked === 0 ? "Tell me" : isClicked === 1 ? "Another" : ""}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JokePage;
