import configs from 'src/configs';

const fetcher = (resource: string) => {
  const URL = `${configs.SERVER}${resource}`;

  return fetch(URL).then((res) => res.json());
};

export default fetcher;
