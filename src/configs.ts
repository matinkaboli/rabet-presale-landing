const isDev: string = process.env.NODE_ENV;

const configs = {
  SERVER: 'https://presale-api.rabet.io',
};

if (isDev) {
  configs.SERVER = 'http://localhost:4567';
}

export default configs;
