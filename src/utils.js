const getUserToken = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    return user.token;
  }
  return null;
};
const isAuth = () => getUserToken() !== null;

const getAuthHeader = () => {
  if (isAuth()) {
    return { Authorization: `Bearer ${getUserToken()}` };
  }

  return {};
};

const getUsername = () => {
  const userData = JSON.parse(localStorage.getItem('user'));
  if (userData) {
    return userData.username;
  }
  return null;
};

export { getUsername, isAuth, getAuthHeader };
