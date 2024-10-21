// To make all env input as String. To avoid code break
const conf = {
  serverUrl: String(import.meta.env.VITE_SERVER_URL),
};

export default conf;
