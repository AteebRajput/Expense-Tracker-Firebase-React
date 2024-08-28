export const useGetUser = () => {
    const storedUser = localStorage.getItem('auth');
    
    if (!storedUser) {
      return null;  // Return null if no user is found in localStorage
    }
  
    const { uid, email, name, photo } = JSON.parse(storedUser);
  
    return {
      userID: uid,
      email,
      name,
      photoURL: photo,
      isAuth : true
    };
  };
export default useGetUser  