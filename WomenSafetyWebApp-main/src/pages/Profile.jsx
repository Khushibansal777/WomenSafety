import React, { useEffect, useState } from "react";
import "../styles/Profile.css";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import { useAuth } from "../context/auth";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  // State for user details
  const [uid, setUid] = useState(`${auth?.user?.uid}`); // Ensure it's the correct field (uid, not uname)
  const [uname, setUname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [emergencyMail, setEmergencyMail] = useState("");
  const [emergencyNo, setEmergencyNo] = useState("");
  const [extraEmail1, setExtraEmail1] = useState("");
  const [extraEmail2, setExtraEmail2] = useState("");
  const [extraPhone1, setExtraPhone1] = useState("");
  const [extraPhone2, setExtraPhone2] = useState("");

  useEffect(() => {
    if (auth?.user) {
      const {
        uname,
        email,
        phone,
        address,
        pincode,
        emergencyMail,
        emergencyNo,
        extraEmail1,
        extraEmail2,
        extraPhone1,
        extraPhone2,
      } = auth.user;

      setUname(uname);
      setEmail(email);
      setPhone(phone);
      setAddress(address);
      setPincode(pincode);
      setEmergencyMail(emergencyMail);
      setEmergencyNo(emergencyNo);
      setExtraEmail1(extraEmail1);
      setExtraEmail2(extraEmail2);
      setExtraPhone1(extraPhone1);
      setExtraPhone2(extraPhone2);
    }
  }, [auth?.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const BASE_URL = process.env.REACT_APP_API;
      const { data } = await axios.put(`${BASE_URL}/api/v1/users/update`, {
        uid,
        uname,
        email,
        phone,
        address,
        pincode,
        emergencyMail,
        emergencyNo,
        extraEmail1,
        extraEmail2,
        extraPhone1,
        extraPhone2,
      });

      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data.updatedUser });
        localStorage.setItem(
          "auth",
          JSON.stringify({ ...auth, user: data.updatedUser })
        );
        toast.success("Profile Updated Successfully");
        navigate("/"); // or wherever you'd like to navigate
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container marginStyle">
        <div className="main-body">
          <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar7.png"
                      //src={images / register.png}
                      alt="Admin"
                      className="rounded-circle"
                      width={150}
                    />
                    <div className="mt-3">
                      <h4>{auth?.user?.uname}</h4>
                      <p className="text-muted font-size-sm">
                        Pincode : {auth?.user?.pincode}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card mb-3">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Full Name</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <input
                        value={uname}
                        onChange={(e) => setUname(e.target.value)}
                        type="text"
                        id="form3Example1c"
                        className="form-control"
                        required
                      />
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Email</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        id="form3Example1c"
                        className="form-control"
                        required
                      />
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Emergency Email</h6>
                    </div>
                    <div className="col-sm-9 text-secondary mb-2">
                      <input
                        value={emergencyMail}
                        onChange={(e) => setEmergencyMail(e.target.value)}
                        type="email"
                        id="form3Example1c"
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="col-sm-3">
                      <h6 className="mb-0">Emergency Email 1</h6>
                    </div>
                    <div className="col-sm-9 text-secondary mb-2">
                      <input
                        value={extraEmail1}
                        onChange={(e) => setExtraEmail1(e.target.value)}
                        type="email"
                        id="form3Example1c"
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="col-sm-3">
                      <h6 className="mb-0">Emergency Email 2</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <input
                        value={extraEmail2}
                        onChange={(e) => setExtraEmail2(e.target.value)}
                        type="email"
                        id="form3Example1c"
                        className="form-control"
                        required
                      />
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Phone</h6>
                    </div>
                    <div className="col-sm-9 text-secondary mb-2">
                      <input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        type="text"
                        id="form3Example1c"
                        className="form-control"
                        required
                      />
                    </div>
                    <hr />
                    <div className="col-sm-3">
                      <h6 className="mb-0">Emergency Phone 1</h6>
                    </div>
                    <div className="col-sm-9 text-secondary mb-2">
                      <input
                        value={emergencyNo}
                        onChange={(e) => setEmergencyNo(e.target.value)}
                        type="text"
                        id="form3Example1c"
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="col-sm-3">
                      <h6 className="mb-0">Emergency Phone 2</h6>
                    </div>
                    <div className="col-sm-9 text-secondary mb-2">
                      <input
                        value={extraPhone1}
                        onChange={(e) => setExtraPhone1(e.target.value)}
                        type="text"
                        id="form3Example1c"
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="col-sm-3">
                      <h6 className="mb-0">Emergency Phone 3</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <input
                        value={extraPhone2}
                        onChange={(e) => setExtraPhone2(e.target.value)}
                        type="text"
                        id="form3Example1c"
                        className="form-control"
                        required
                      />
                    </div>
                  </div>

                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Address</h6>
                    </div>
                    <div className="col-sm-9 text-secondary mb-2">
                      <input
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        type="text"
                        id="form3Example1c"
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="col-sm-3">
                      <h6 className="mb-0">Pincode</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <input
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        type="text"
                        id="form3Example1c"
                        className="form-control"
                        required
                      />
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-12">
                      <button
                        onClick={handleSubmit}
                        className="btn btn-outline-dark"
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row gutters-sm"></div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
