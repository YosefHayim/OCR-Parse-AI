const DEPLOYED_URL = import.meta.env.VITE_API_BACKEND_DEPLOYED;
const LOCAL_URL = import.meta.env.VITE_API_BACKEND_LOCAL;
const NODE_ENV = import.meta.env.VITE_NODE_ENV;

export const envPaths = {
  DEPLOYED_URL,
  LOCAL_URL,
  NODE_ENV,
};
