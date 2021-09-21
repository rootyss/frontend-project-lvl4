export const getUserToken = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    return user.token;
  }
  return null;
};

export const getUsername = () => {
  const userData = JSON.parse(localStorage.getItem('user'));
  if (userData) {
    return userData.username;
  }
  return null;
};

export const isAuth = () => getUserToken() !== null;

export const getAuthHeader = () => {
  if (isAuth()) {
    return { Authorization: `Bearer ${getUserToken()}` };
  }

  return {};
};
