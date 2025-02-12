import axios from "axios";
import { useEffect, useState } from "react";

const URL: string = "http://localhost:8000/api/v1";

function useGet(END_POINT) {
  console.log(END_POINT);
  const [data, setData] = useState<any>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await axios.get(`${URL}/${END_POINT}`);
        setData(response.data);
      } catch (err: any) {
        console.error("Error fetching data:", err);
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [END_POINT]);

  return {data, isLoading, error};
}

export default useGet;
