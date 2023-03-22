import api from './apiHandler';

async function add(body) {
  return await api('post', '/admin/add-prod-brand', body, { auth: true });
}

async function getWpgn(skip, limit, search) {
  return await api('get', '/admin/get-prod-brands', { skip, limit, search }, { auth: true });
}

async function modify(body) {
  return await api('patch', '/admin/update-prod-brand', body, { auth: true });
}

export { add, getWpgn, modify };
