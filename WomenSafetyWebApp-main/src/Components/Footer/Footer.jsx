import React from "react";
import "../../styles/footer.css";
import { BsLinkedin, BsGithub } from "react-icons/bs";
import logo from "../../images/logo.png";
import { useAuth } from "../../context/auth";

const Footer = (props) => {
  const [auth, setAuth] = useAuth();

  return (
    <>
      {auth?.user?.role ? (
        <>
          <div>
            <section id="contact" className="footer_wrapper">
              <div className="container">
                <div className="row">
                  <div className="col-lg-5 footer_logo mb-4 mb-lg-0">
                    <img decoding="async" src={logo} width={150} />
                    {/* <h1 className='text-sm' style={{fontSize:'25px'}}>WOMEN SECURE</h1> */}

                    <p className="footer_text" style={{ textAlign: "justify" }}>
                      At SAFE SIREN , we're dedicated to making Secure website
                      for women saftey and we give our best at what we do
                    </p>
                  </div>
                  <div className="col-lg-4 px-lg-5 mb-4 mb-lg-0">
                    <h3 className="footer_title">Contact</h3>
                    <p className="footer_text">
                      <a>RANI041@gmail.com</a>
                      <br />
                      <a className="footer-address">
                        HMR Insitute of Technology & Management
                        <br />
                        Hamidpur, Delhi, India
                      </a>
                    </p>
                  </div>
                  <div className="col-lg-3 mb-4 mb-lg-0">
                    <h3 className="footer_title">Preferred NGO's</h3>
                    <p style={{ color: "black" }}>
                      <strong>Asha Deep Welfare Society</strong>
                      <br />
                      <em>Phone:</em>{" "}
                      <a href="tel:+919417251305" style={{ color: "black" }}>
                        +91-9417251305
                      </a>
                    </p>
                    <p style={{ color: "black" }}>
                      <strong>
                        Indo-Global Social Service Society (IGSSS)
                      </strong>
                      <br />
                      <em>Phone:</em>{" "}
                      <a
                        href="tel: +91 11 4570 5000 / +91 11 4570 5001
"
                        style={{ color: "black" }}
                      >
                        +91-9417251305
                      </a>
                    </p>
                  </div>

                  <div className="col-12 footer_credits text-center">
                    <span>
                      © 2025 <a>RANI(Real-time Alert & Navigation Interface)</a>
                      ™. All Rights Reserved.
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </>
      ) : (
        <>
          <div>
            <section id="contact" className="footer_wrapper">
              <div className="container">
                <div className="row">
                  <div className="col-lg-5 footer_logo mb-4 mb-lg-0">
                    <img decoding="async" src={logo} width={150} />
                    {/* <h1 className='text-sm' style={{fontSize:'25px'}}>WOMEN SECURE</h1> */}

                    <p className="footer_text" style={{ textAlign: "justify" }}>
                      At RANI , we're dedicated to making Secure website for
                      women saftey and we give our best at what we do
                    </p>
                  </div>
                  <div className="col-lg-4 px-lg-5 mb-4 mb-lg-0">
                    <h3 className="footer_title">Contact</h3>
                    <p className="footer_text">
                      <a>RANI041@gmail.com</a>
                      <br />
                      <a className="footer-address">
                        HMR Insitute of Technology & Management
                        <br />
                        Hamidpur, Delhi, India
                      </a>
                    </p>
                  </div>
                  <div className="col-lg-3 mb-4 mb-lg-0">
                    <h3 className="footer_title">Preferred NGO's</h3>
                    <p style={{ color: "black" }}>
                      <strong>Asha Deep Welfare Society</strong>
                      <br />
                      <em>Phone:</em>{" "}
                      <a href="tel:+919417251305" style={{ color: "black" }}>
                        +91-9417251305
                      </a>
                    </p>
                    <p style={{ color: "black" }}>
                      <strong>
                        Indo-Global Social Service Society (IGSSS)
                      </strong>
                      <br />
                      <em>Phone:</em>{" "}
                      <a
                        href="tel: +91 11 4570 5000 / +91 11 4570 5001
"
                        style={{ color: "black" }}
                      >
                        +91-9417251305
                      </a>
                    </p>
                  </div>

                  <div className="col-12 footer_credits text-center">
                    <span>
                      © 2025 <a>RANI(Real-time Alert & Navigation Interface)</a>
                      ™. All Rights Reserved.
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </>
      )}
    </>
  );
};

export default Footer;
