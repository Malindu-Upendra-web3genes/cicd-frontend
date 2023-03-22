import api from './apiHandler';

async function verifyOtp(body) {
  return await api('patch', '/admin/verify-otp', body, { auth: false });
}

async function login(body) {
  return await api('post', '/admin/login', body, { auth: false });
}

async function add(body) {
  return await api('post', '/admin/add', body, { auth: true });
}

async function addPass(body, authToken) {
  return await api('patch', '/admin/activate', body, { auth: true, authToken });
}

async function getSellers(skip, limit, from, to) {
  return await api('get', '/admin/get-sellers', { skip, limit, from, to }, { auth: true });
}

async function reviewSeller(body) {
  return await api('patch', '/admin/review-seller', body, { auth: true });
}

async function getUsers(skip, limit, search) {
  return await api('get', '/admin/get-users', { skip, limit, search }, { auth: true });
}

async function getCategories() {
  return await api('get', '/admin/get-prod-cats', {}, { auth: true });
}

async function getSubCategories(id) {
  return await api('get', '/admin/get-prod-sub-cats', { id }, { auth: true });
}

async function getGroups(id) {
  return await api('get', '/admin/get-prod-groups', { id }, { auth: true });
}

async function addCategory(body) {
  return await api('post', '/admin/add-prod-cat', body, { auth: true });
}

async function addSubCategory(body) {
  return await api('post', '/admin/add-prod-sub-cat', body, { auth: true });
}

async function addGroup(body) {
  return await api('post', '/admin/add-prod-group', body, { auth: true });
}

async function modifyCategory(body) {
  return await api('patch', '/admin/update-prod-cat', body, { auth: true });
}

async function modifySubCategory(body) {
  return await api('patch', '/admin/update-prod-sub-cat', body, { auth: true });
}

async function modifyGroup(body) {
  return await api('patch', '/admin/update-prod-group', body, { auth: true });
}

export {
  verifyOtp,
  login,
  add,
  addPass,
  getSellers,
  reviewSeller,
  getUsers,
  getCategories,
  getSubCategories,
  getGroups,
  addCategory,
  addSubCategory,
  addGroup,
  modifyCategory,
  modifySubCategory,
  modifyGroup
};
