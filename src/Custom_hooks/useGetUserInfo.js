export const useGetUser = () => {
  const storedUser = localStorage.getItem('auth');

  if (!storedUser) {
    return {
      isAuth: false,
      userID: null,
      email: null,
      name: null,
      photoURL: null
    };
  }

  const { uid, email, name, photo } = JSON.parse(storedUser) || {};

  return {
    userID: uid,
    email,
    name,
    photoURL: photo,
    isAuth: true
  };
};

export default useGetUser;
