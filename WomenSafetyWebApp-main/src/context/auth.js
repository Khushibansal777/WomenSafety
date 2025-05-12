import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

// Create AuthContext
const AuthContext = createContext();

// AuthProvider component
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
    role: null, // Track role separately for easier access
  });

  // Set default axios auth header
  axios.defaults.headers.common["Authorization"] = auth?.token;

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
        user: parseData.user,
        token: parseData.token,
        role: parseData.user?.role ?? 0, // fallback to 0 if role undefined
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };

// import axios from "axios";
// import { createContext, useContext, useEffect, useState } from "react";

// const AuthContext = createContext()

// const AuthProvider = ({children}) => {
//     const [auth,setAuth] = useState({
//         user:null,
//         token:''
//     })
//     axios.defaults.headers.common['Authorization'] = auth?.token

//     useEffect(() => {
//         const data = localStorage.getItem('auth')
//         if(data){
//             const parseData = JSON.parse(data)
//             setAuth({
//                 ...auth,
//                 user:parseData.user,
//                 token:parseData.token
//             })
//         }
//     },[])
//     return (
//         <AuthContext.Provider value={[auth,setAuth]}>
//             {children}
//         </AuthContext.Provider>
//     )
// }

// const useAuth = () => useContext(AuthContext)

// export {useAuth,AuthProvider}
