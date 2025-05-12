import React, { useEffect } from "react";
import "../styles/about.css";
import about from "../images/aboutUs.png";
import about2 from "../images/aboutUs2.png";
import "../styles/features.css";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import { Link } from "react-router-dom";

const AboutUs2 = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Navbar />
      <section id="about" className="about_wrapper">
        <div className="container">
          <div className="features_wrapper" style={{ marginTop: "-90px" }}>
            <div className="row">
              <div className="col-12 text-center">
                <p className="features_subtitle">Our Team for your safety</p>
                <h2 className="features_title">About Us</h2>
              </div>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-sm-12 col-lg-5 text-center text-lg-start">
              <p className="about_number">1</p>
              <h2 className="about_title">
                Welcome to RANI <br />
                Real-time Alert & Navigation Interface
              </h2>
              <p className="about_text " style={{ textAlign: "justify" }}>
                At RANI, our mission is simple yet powerful: to create a world
                where women feel safe, heard, and protected—no matter where they
                are. Born from real-world challenges and inspired by the urgent
                need for instant, secure support, RANI is more than just a
                platform—it's a digital safety companion. We understand the
                unique vulnerabilities women face, especially in unfamiliar or
                high-risk environments. That’s why we’ve built a solution that
                works instantly, without installation, connects women with their
                emergency contacts and local community, and offers a
                privacy-first way to report incidents.
              </p>
              {/* <div className="my-5">
                <Link to="/" className="learn-more-btn">
                  Safe Siren
                </Link>
              </div> */}
            </div>
            <div className="col-sm-12 col-lg-7 text-center text-md-start">
              <img decoding="async" src={about} className="img-fluid" />
            </div>
          </div>
        </div>
        <div className="innovate mt-5">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-sm-12 col-lg-6 px-5 text-center text-md-start">
                <img decoding="async" src={about2} className="img-fluid" />
              </div>
              <div className="col-sm-12 col-lg-6 text-center text-lg-start">
                <p className="about_number">2</p>
                <h2 className="about_title">Why Choose Rani ?</h2>
                <p className="about_text" style={{ textAlign: "justify" }}>
                  RANI (Real-time Alert & Navigation Interface) is a web-based
                  safety platform designed to protect users during emergencies
                  through instant SOS alerts and secure incident reporting.
                  After a quick signup, users can trigger real-time alerts that
                  are sent via email to both their emergency contacts and users
                  within the same PIN code area, enabling immediate local
                  response.
                  <br />
                  The platform allows users to upload optional photo or video
                  evidence, which is securely stored with timestamps and
                  location data—never shared publicly. Authorized admins can
                  view and acknowledge reports through a secure dashboard,
                  ensuring timely action. RANI offers a privacy-first,
                  community-powered solution for responsible and effective
                  emergency response.
                </p>
                <div className="mt-5">
                  <Link to="/contact" className="learn-more-btn btn-header">
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AboutUs2;
