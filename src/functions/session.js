const setSession = (user, token = localStorage.getItem('x-authToken')) => {
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('x-authToken', token);
};

const clearSession = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('x-authToken');
};

export { setSession, clearSession };
