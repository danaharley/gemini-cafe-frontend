const NODE_ENV = process.env.NODE_ENV;

const URL = process.env.REACT_APP_SERVER_ENDPOINT;
const IMAGE_URL = process.env.REACT_APP_SERVER_IMAGE_URL;

const DELIVERY_FEE = process.env.REACT_APP_DELIVERY_FEE;

export const config = {
  node_env: NODE_ENV,

  server: {
    url: URL,
    image_url: IMAGE_URL,
  },

  delivery_fee: DELIVERY_FEE,
};
