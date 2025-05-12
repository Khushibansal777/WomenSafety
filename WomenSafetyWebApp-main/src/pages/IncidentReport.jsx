import React, { useState, useEffect } from "react";
import Sidebar from "../Components/Dash/Sidebar";
import toast from "react-hot-toast";

const Dashboard = (props) => {
  const [incidentreport, setincidentreport] = useState([]);
  const [report, setReport] = useState("");

  // Fetch all incidents from the server
  const getAllIncident = async () => {
    try {
      const BASE_URL = process.env.REACT_APP_API;
      const res = await fetch(`${BASE_URL}/api/v1/incidents`, {
        method: "GET",
        headers: { "Content-type": "application/json" },
      });

      if (res.status === 200) {
        const data = await res.json();
        setincidentreport(data);
      } else {
        toast.error("Failed to fetch incidents");
      }
    } catch (err) {
      console.error("Error fetching incidents:", err);
      toast.error("Error fetching incidents");
    }
  };

  // Acknowledge an incident
  const acknowledge = async (inc) => {
    try {
      const BASE_URL = process.env.REACT_APP_API;
      const res = await fetch(`${BASE_URL}/api/v1/incidents/${inc}`, {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ isSeen: true }),  // Only send 'isSeen' field to update
      });
  
      if (res.status === 200) {
        toast.success("Incident acknowledged successfully");
  
        // Update the state directly to reflect the change in UI
        setincidentreport((prevReports) =>
          prevReports.map((report) =>
            report._id === inc ? { ...report, isSeen: true } : report
          )
        );
      } else {
        const response = await res.json();
        toast.error(`Error: ${response.message || "Unknown error"}`);
      }
    } catch (e) {
      toast.error("Error while updating!");
      console.error("Error during acknowledge:", e);
    }
  };
  
  useEffect(() => {
    getAllIncident();
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="d-flex justify-content-start">
      <Sidebar />
      <div className="container table-responsive mx-3">
        <div className="features_wrapper" style={{ marginTop: "-50px" }}>
          <div className="row">
            <div className="col-12 text-center">
              <p className="features_subtitle">
                Latest Women Incident Reported!
              </p>
              <h2 className="features_title">Women Incident Data</h2>
            </div>
          </div>
        </div>

        {/* Table displaying incident data */}
        <table
          className="table table-striped table-bordered table-hover"
          style={{ marginTop: "-50px" }}
        >
          <thead className="table-dark text-center">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Report</th>
              <th scope="col">Address</th>
              <th scope="col">Pincode</th>
              <th scope="col">Incident recorded Date & Time</th>
              <th scope="col">Acknowledgement Status</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {incidentreport.map((p) => (
              <tr key={p._id}>
                <th style={{ color: p.isSeen ? "green" : "red" }} scope="row">
                  {p.uname} {p.isSeen && "Acknowledged"}
                </th>
                <td>
                  {p.isSeen ? (
                    p.report
                  ) : (
                    <button
                      type="button"
                      className="btn btn-dark"
                      onClick={() => setReport(p.report)}
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      View Report
                    </button>
                  )}
                </td>
                <td>{p.address}</td>
                <td>{p.pincodeOfIncident}</td>
                <td>
                  {p.createdAt.split("T")[0]} -{" "}
                  {p.createdAt.split("T")[1].split(".")[0]}
                </td>
                <td>
                  {p.isSeen ? (
                    <button className="btn btn-success" disabled>
                      Acknowledged
                    </button>
                  ) : (
                    <button
                      className="btn btn-danger"
                      onClick={() => acknowledge(p._id)}
                    >
                      Acknowledge
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal to display report */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Incident Report
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">{report}</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


// import React from "react";
// import Sidebar from "../Components/Dash/Sidebar";
// import { useState } from "react";
// import axios from "axios";
// import { useEffect } from "react";

// const Dashboard = (props) => {
//   const [incidentreport, setincidentreport] = useState([]);

//   const getAllIncident = async () => {
//     try {
//       const BASE_URL = process.env.REACT_APP_API;
//       const { data } = await axios.get(`${BASE_URL}/api/v1/incidents`);

//       if (data) {
//         setincidentreport(data);
//       }
//       console.log(data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     getAllIncident();
//     window.scrollTo(0, 0);
//   }, []);

//   return (
//     <div className="d-flex justify-content-start">
//       <Sidebar />
//       <div className="container table-responsive mx-3">
//         <div className="features_wrapper" style={{ marginTop: "-50px" }}>
//           <div className="row">
//             <div className="col-12 text-center">
//               <p className="features_subtitle">
//                 Latest Women Incident Reported !
//               </p>
//               <h2 className="features_title">Women Incident Data</h2>
//             </div>
//           </div>
//         </div>
//         <table
//           class="table table-striped table-bordered table-hover"
//           style={{ marginTop: "-50px" }}
//         >
//           <thead className="table-dark text-center">
//             <tr>
//               <th scope="col">Complainant Id</th>
//               <th scope="col">Report</th>
//               <th scope="col">Address</th>
//               <th scope="col">Pincode</th>
//             </tr>
//           </thead>
//           <tbody className="text-center">
//             {incidentreport.map((p) => (
//               <tr>
//                 <th scope="row">{p.uname}</th>
//                 <td>{p.report}</td>
//                 <td>{p.address}</td>
//                 <td>{p.pincodeOfIncident}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
