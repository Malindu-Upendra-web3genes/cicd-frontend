import axios from 'axios';

//let authToken;

export default async function request(method, url, params, { responseType, auth, authToken }) {
  const body = method === 'get' ? 'params' : 'data';

  const config = {
    method,
    url,
    baseURL: 'http://3.95.30.82:4000/api',
    [body]: params || {},
    responseType
  };
  if (auth) {
    if (!authToken) {
      const jwt = localStorage.getItem('x-authToken');
      if (jwt) authToken = jwt;
    }
    if (authToken) {
      config.headers = {
        'x-authToken': authToken
      };
    }
  }
  return await axios.request(config);
}
