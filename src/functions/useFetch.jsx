import { useEffect, useState } from "react";

function useFetch({ url }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    setLoading(true);
    setError(null);

    const fetchData = async () => {
      try {
        const response = await fetch(url, { signal });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const JSONdata = await response.json();
        setData(JSONdata);
      } catch (e) {
        if (e.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          setError(e);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();

    return () => {
      controller.abort();
    };
  }, [url]); // Dependencies array includes url to re-run fetchData when URL changes

  return { data, error, isLoading };
}

export default useFetch;
