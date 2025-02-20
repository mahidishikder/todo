import { createContext, useState, useEffect } from "react";
import { 
  createUserWithEmailAndPassword,  
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signOut, 
  updateProfile, 
  onAuthStateChanged 
} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
// import axios from "axios"; // Uncomment if using Axios

export const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const provider = new GoogleAuthProvider(); // ✅ Fixed GoogleAuthProvider

  // Create User Function
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login User Function
  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Logout Function
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // Update User Profile
  const updateUserProfile = (name, photo) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // Google Login Function
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  // ✅ Track Authentication State
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      // If using JWT authentication with Axios
      // if (currentUser) {
      //   const userInfo = { email: currentUser.email };
      //   axios.post("https://your-api.com/jwt", userInfo)
      //     .then((res) => {
      //       if (res.data.token) {
      //         localStorage.setItem("access-token", res.data.token);
      //       }
      //     });
      // } else {
      //   localStorage.removeItem("access-token");
      // }
    });

    return () => unSubscribe();
  }, []);

  // Context Value
  const authInfo = {
    user,
    loading,
    setLoading,
    createUser,
    loginUser,
    googleLogin,
    logOut,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
