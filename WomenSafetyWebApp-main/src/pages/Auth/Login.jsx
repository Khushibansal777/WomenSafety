import React, { useEffect, useState } from "react";
import "../../styles/auth.css";
import { Link, useNavigate } from "react-router-dom";
import login from "../../images/login.png";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    return emailPattern.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validations
    if (!email.trim() || !password.trim()) {
      toast.error("All fields are required");
      return;
    }
    if (!validateEmail(email)) {
      toast.error("Invalid email format");
      return;
    }

    try {
      const BASE_URL = process.env.REACT_APP_API;
      const res = await axios.post(`${BASE_URL}/api/v1/users/login`, {
        email,
        password,
      });

      const { status, data } = res;

      if (status === 200) {
        toast.success("Login Successful");

        setAuth({
          ...auth,
          user: data.user,
          token: data.token,
        });
        localStorage.setItem("auth", JSON.stringify(data));
        console.log("Logged in user role:", data.user.role);

        // Redirect based on role or email
        const adminEmail = "admin@example.com"; // change if needed
        if (data.user.email === adminEmail) {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      } else {
        toast.error("Login failed, please try again");
      }
    } catch (error) {
      console.error(error);
      toast.error("Invalid Email or Password");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="marginStyle">
      <div className="container d-flex justify-content-center align-items-center">
        <div className="row border rounded-5 p-3 bg-white shadow box-area reverseCol">
          <div className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box">
            <div className="featured-image mb-3 animateImg">
              <img
                src={login}
                className="img-fluid"
                width={500}
                alt="Login Visual"
              />
            </div>
          </div>
          <div className="col-md-6 right-box">
            <div className="row align-items-center">
              <div className="header-text mb-4">
                <h2>Welcome</h2>
                <p>We are happy to have you back</p>
              </div>
              <div className="input-group d-flex align-items-center mb-3">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="form-control form-control-lg border-dark fs-6"
                  placeholder="Email Address"
                  required
                />
              </div>
              <div className="input-group d-flex align-items-center mb-3">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control form-control-lg border-dark fs-6"
                  placeholder="Password"
                  required
                />
              </div>
              <div className="d-flex flex-row align-items-center mt-4">
                <button
                  className="btn btn-lg text-white"
                  style={{ backgroundColor: "blueviolet", width: "100%" }}
                  onClick={handleSubmit}
                >
                  Login
                </button>
              </div>
              <div className="d-flex flex-row align-items-center my-3">
                <Link
                  to="/register"
                  className="btn btn-outline-dark btn-lg btn-block"
                  style={{ width: "100%" }}
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

// import React, { useEffect } from "react";
// import "../../styles/auth.css";
// import { Link, useNavigate } from "react-router-dom";
// import login from "../../images/login.png";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { useState } from "react";
// import { useAuth } from "../../context/auth";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [auth, setAuth] = useAuth();
//   const navigate = useNavigate();

//   const validateEmail = (email) => {
//     const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
//     return emailPattern.test(email);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateEmail(email)) {
//       toast.error("Invalid Email Format");
//       return false;
//     }
//     if (!email.trim()) {
//       toast.error("Email is required");
//       return false;
//     }
//     if (!password.trim()) {
//       toast.error("Password is required");
//       return false;
//     }
//     try {
//       const BASE_URL = process.env.REACT_APP_API;

//       const res = await axios.post(`${BASE_URL}/api/v1/users/login`, {
//         email,
//         password,
//       });

//       if (res.status === 200) {
//         toast.success("Login Successfully");
//         setAuth({
//           ...auth,
//           user: res.data.user,
//           token: res.data.token,
//         });
//         localStorage.setItem("auth", JSON.stringify(res.data));

//         // ✅ Admin check (replace with your real admin email)
//         const adminEmail = "admin@example.com";
//         if (res.data.user.email === adminEmail) {
//           navigate("/dashboard");
//         } else {
//           navigate("/");
//         }
//       }
//     } catch (err) {
//       toast.error("Invalid Email or Password");
//     }
//   };

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   return (
//     <div className="marginStyle">
//       <div class="container d-flex justify-content-center align-items-center">
//         <div class="row border rounded-5 p-3 bg-white shadow box-area reverseCol">
//           <div class="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box">
//             <div class="featured-image mb-3 animateImg">
//               <img src={login} class="img-fluid" width={500} />
//             </div>
//           </div>
//           <div class="col-md-6 right-box">
//             <div class="row align-items-center">
//               <div class="header-text mb-4">
//                 <h2>Welcome</h2>
//                 <p>We are happy to have you back</p>
//               </div>
//               <div class="input-group d-flex  align-items-center mb-3">
//                 <div class="form-outline flex-fill mb-0">
//                   <input
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     type="email"
//                     class="form-control form-control-lg border-dark  fs-6"
//                     placeholder="Email Address"
//                     required
//                   />
//                 </div>
//               </div>
//               <div class="input-group d-flex flex-row align-items-center mb-3">
//                 <div class="form-outline flex-fill mb-0">
//                   <input
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     class="form-control form-control-lg border-dark fs-6"
//                     placeholder="Password"
//                     required
//                   />
//                 </div>
//               </div>
//               <div class="d-flex flex-row align-items-center mt-4 ">
//                 <div class="form-outline flex-fill mb-0">
//                   <button
//                     class="btn btn-lg  text-white"
//                     type="button"
//                     onClick={handleSubmit}
//                     style={{ backgroundColor: "blueviolet", width: "100%" }}
//                   >
//                     Login
//                   </button>
//                 </div>
//               </div>
//               <div class="d-flex flex-row align-items-center my-3 ">
//                 <div class="form-outline flex-fill mb-0 ">
//                   <Link
//                     to="/register"
//                     class="btn btn-outline-dark btn-lg btn-block"
//                     style={{ width: "100%" }}
//                     type="button"
//                   >
//                     Register
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
// // import React, { useEffect } from "react";
// // import "../../styles/auth.css";
// // import { Link, useNavigate } from "react-router-dom";
// // import login from "../../images/login.png";
// // import axios from "axios";
// // import toast from "react-hot-toast";
// // import { useState } from "react";
// // import { useAuth } from "../../context/auth";

// // const Login = () => {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [auth, setAuth] = useAuth();
// //   const navigate = useNavigate();

// //   const validateEmail = (email) => {
// //     const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
// //     return emailPattern.test(email);
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!validateEmail(email)) {
// //       toast.error("Invalid Email Format");
// //       return false;
// //     }
// //     if (!email.trim()) {
// //       toast.error("Email is required");
// //       return false;
// //     }
// //     if (!password.trim()) {
// //       toast.error("Password is required");
// //       return false;
// //     }
// //     try {
// //       const BASE_URL = process.env.REACT_APP_API;

// //       const res = await axios.post(`${BASE_URL}/api/v1/users/login`, {
// //         email,
// //         password,
// //       });

// //       if (res.status === 200) {
// //         toast.success("Login Successfully");
// //         setAuth({
// //           ...auth,
// //           user: res.data.user,
// //           token: res.data.token,
// //         });
// //         localStorage.setItem("auth", JSON.stringify(res.data));
// //         navigate("/");
// //       }
// //     } catch (err) {
// //       toast.error("Invalid Email or Password");
// //     }
// //   };

// //   useEffect(() => {
// //     window.scrollTo(0, 0);
// //   }, []);
// //   return (
// //     <div className="marginStyle">
// //       <div class="container d-flex justify-content-center align-items-center">
// //         <div class="row border rounded-5 p-3 bg-white shadow box-area reverseCol">
// //           <div class="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box">
// //             <div class="featured-image mb-3 animateImg">
// //               <img src={login} class="img-fluid" width={500} />
// //             </div>
// //           </div>
// //           <div class="col-md-6 right-box">
// //             <div class="row align-items-center">
// //               <div class="header-text mb-4">
// //                 <h2>Welcome</h2>
// //                 <p>We are happy to have you back</p>
// //               </div>
// //               <div class="input-group d-flex  align-items-center mb-3">
// //                 <div class="form-outline flex-fill mb-0">
// //                   <input
// //                     value={email}
// //                     onChange={(e) => setEmail(e.target.value)}
// //                     type="email"
// //                     class="form-control form-control-lg border-dark  fs-6"
// //                     placeholder="Email Address"
// //                     required
// //                   />
// //                 </div>
// //               </div>
// //               <div class="input-group d-flex flex-row align-items-center mb-3">
// //                 <div class="form-outline flex-fill mb-0">
// //                   <input
// //                     type="password"
// //                     value={password}
// //                     onChange={(e) => setPassword(e.target.value)}
// //                     class="form-control form-control-lg border-dark fs-6"
// //                     placeholder="Password"
// //                     required
// //                   />
// //                 </div>
// //               </div>
// //               <div class="d-flex flex-row align-items-center mt-4 ">
// //                 <div class="form-outline flex-fill mb-0">
// //                   <button
// //                     class="btn btn-lg  text-white"
// //                     type="button"
// //                     onClick={handleSubmit}
// //                     style={{ backgroundColor: "blueviolet", width: "100%" }}
// //                   >
// //                     Login
// //                   </button>
// //                 </div>
// //               </div>
// //               <div class="d-flex flex-row align-items-center my-3 ">
// //                 <div class="form-outline flex-fill mb-0 ">
// //                   <Link
// //                     to="/register"
// //                     class="btn btn-outline-dark btn-lg btn-block"
// //                     style={{ width: "100%" }}
// //                     type="button"
// //                   >
// //                     Register
// //                   </Link>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Login;
