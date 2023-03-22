import api from './apiHandler';

async function init(body) {
  return await api('post', '/seller/init', body, { auth: false });
}

export { init };
