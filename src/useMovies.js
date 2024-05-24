import { useEffect, useState } from "react";

export function useMovies(query, callback) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    callback?.();

    const controller = new AbortController();
    async function fetchMovies() {
      try {
        setError("");
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=${query}`,
          {
            signal: controller.signal,
          }
        );

        if (!res.ok) {
          throw new Error("Couldn't fetch movies, try again later.");
        }

        const data = await res.json();

        if (data.Response === "False") {
          throw new Error(data.Error);
        }
        setMovies(data.Search || []);
        setError("");
        // setIsLoading(false);
      } catch (error) {
        if (error.name !== "AbortError") setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }
    fetchMovies();

    return function () {
      controller.abort();
    };
  }, [query]);

  return { movies, isLoading, error };
}
export const KEY = "871f08c2";
