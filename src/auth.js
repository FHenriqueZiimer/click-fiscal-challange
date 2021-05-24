export const isAuthenticated = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = JSON.parse(localStorage.getItem('token'));

  if (user === null || token === null) {
    return false
  }

  return true
};
