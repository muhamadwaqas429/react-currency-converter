import { useEffect, useState } from "react";

function useCurrencyInfo(baseCurrency = "USD") {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!baseCurrency) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const API_KEY = "af11047e4c639ad62ac90697";
        const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${baseCurrency.toUpperCase()}`;

        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

        const result = await res.json();

        if (result.conversion_rates) {
          setData(result.conversion_rates);
        } else {
          throw new Error("Unexpected API response format");
        }
      } catch (err) {
        console.error("Error fetching currency data:", err);
        setError(err.message);
        setData({});
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [baseCurrency]);

  return { data, error, loading };
}

export default useCurrencyInfo;
