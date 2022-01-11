import axios from 'axios';
import { useState, useEffect } from 'react';

import configs from '../configs';

const useFetch = (url: string) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${configs.SERVER}${url}`)
      .then((result) => {
        setData(result.data);
        setLoading(false);
      })
      .catch((e) => {
        setError(e);
        setLoading(false);
      });
  }, [url]);

  return {
    data,
    error,
    loading,
  };
};

export default useFetch;
