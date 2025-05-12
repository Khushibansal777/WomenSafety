import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Dash/Sidebar";
import { useAuth } from "../context/auth";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [auth] = useAuth();
  const [emergencies, setEmergencies] = useState([]);
  const [chats, setChats] = useState([]);
  const [txt, setTxt] = useState("");
  const [acknowledgeFlag, setAcknowledgeFlag] = useState(false);

  // ✅ Fetch all emergencies
  useEffect(() => {
    const fetchEmergencies = async () => {
      try {
        const apiUrl = `${process.env.REACT_APP_API}/api/v1/emergency`;
        if (!process.env.REACT_APP_API) {
          console.warn("REACT_APP_API_URL is not defined.");
          return;
        }

        console.log("Fetching emergencies from:", apiUrl);

        const res = await fetch(apiUrl, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (res.status === 200) {
          const data = await res.json();
          setEmergencies(data);
        } else {
          const text = await res.text();
          console.error("Failed to fetch emergencies:", res.status, text);
        }
      } catch (err) {
        console.error("Error fetching emergencies:", err);
      }
    };

    fetchEmergencies();
  }, [acknowledgeFlag]);

  // ✅ Fetch chats for a selected emergency
  const getChats = async (emergId) => {
    try {
      const apiUrl = `${process.env.REACT_APP_API}/api/v1/chats/${auth?.user?._id}/emerg/${emergId}`;
      const res = await fetch(apiUrl, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (res.status === 200) {
        const data = await res.json();
        setChats(data || []);
      } else {
        const text = await res.text();
        console.error("Failed to fetch chats:", res.status, text);
      }
    } catch (err) {
      console.error("Error fetching chats:", err);
    }
  };

  // ✅ Add new chat message
  const addChat = async (receiverId, emergId) => {
    try {
      const payload = {
        senderId: auth?.user?._id,
        receiverId,
        text: txt,
        emergId,
      };

      const res = await fetch(`${process.env.REACT_APP_API}/api/v1/chats`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.status === 201) {
        toast.success("Chat added");
        setTxt(""); // clear input after sending

        // Optimistically update the chats list by adding the new message
        setChats((prevChats) => [
          ...prevChats,
          { senderId: auth?.user?._id, receiverId, text: txt, emergId }
        ]);
      } else {
        const text = await res.text();
        console.error("Failed to add chat:", res.status, text);
      }
    } catch (err) {
      console.error("Error adding chat:", err);
    }
  };

  // ✅ Acknowledge emergency
  const acknowledgeEmergency = async (uid) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API}/api/v1/emergency/${uid}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res.status === 200) {
        toast.success("Acknowledged Successfully");
        setAcknowledgeFlag(!acknowledgeFlag); // Toggle to re-fetch emergencies
      } else {
        toast.error("Error while Acknowledging");
      }
    } catch (err) {
      toast.error("Error while Acknowledging");
    }
  };

  return (
    <div className="d-flex justify-content-start">
      <Sidebar />
      <div className="container table-responsive mx-3">
        <div className="features_wrapper" style={{ marginTop: "-50px" }}>
          <div className="row">
            <div className="col-12 text-center">
              <p className="features_subtitle">Latest Women Emergency Alert!</p>
              <h2 className="features_title">Women Emergency Data</h2>
            </div>
          </div>
        </div>
        <table
          className="table table-striped table-bordered table-hover"
          style={{ marginTop: "-50px" }}
        >
          <thead className="table-dark text-center">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Address of Incident</th>
              <th scope="col">Map View</th>
              <th scope="col">Emergency No.</th>
              <th scope="col">Incident recorded at</th>
              <th scope="col">Acknowledgement Status</th>
              <th scope="col">Chat with victim</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {emergencies?.map((ee) => (
              <React.Fragment key={ee._id}>
                {ee.isResolved ? (
                  <tr>
                    <th scope="row" style={{ color: "green" }}>
                      {ee.username}
                    </th>
                    <td>{ee.addressOfInc}</td>
                    <td>
                      <a
                        href={`${ee.mapLct}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <button className="btn btn-primary">View in map</button>
                      </a>
                    </td>
                    <td>{ee.emergencyNo}</td>
                    <td>{ee.createdAt}</td>
                    <td>
                      <button className="btn btn-success">Acknowledged</button>
                    </td>
                    <td>
                      <button
                        className="btn btn-dark"
                        data-bs-toggle="modal"
                        data-bs-target={`#chatModal-${ee._id}`}
                        onClick={() => getChats(ee._id)}
                      >
                        Chat
                      </button>
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <th scope="row" style={{ color: "red" }}>
                      {ee.username}
                    </th>
                    <td>{ee.addressOfInc}</td>
                    <td>
                      <a
                        href={`${ee.mapLct}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <button className="btn btn-primary">View in map</button>
                      </a>
                    </td>
                    <td>{ee.emergencyNo}</td>
                    <td>{ee.createdAt}</td>
                    <td>
                      <button
                        onClick={() => acknowledgeEmergency(ee._id)}
                        className="btn btn-danger"
                      >
                        Acknowledge
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-dark"
                        data-bs-toggle="modal"
                        data-bs-target={`#chatModal-${ee._id}`}
                        onClick={() => getChats(ee._id)}
                      >
                        Chat
                      </button>
                    </td>
                  </tr>
                )}

                {/* Modal for chat */}
                <div
                  className="modal fade"
                  id={`chatModal-${ee._id}`}
                  tabIndex="-1"
                  aria-labelledby={`chatModalLabel-${ee._id}`}
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1 className="modal-title fs-5" id={`chatModalLabel-${ee._id}`}>
                          Chat with Victim
                        </h1>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <div className="chat-container">
                          {chats?.map((chat, index) => (
                            <div
                              key={index}
                              className={
                                chat.senderId === auth?.user?._id
                                  ? "chat-right"
                                  : "chat-left"
                              }
                            >
                              <p>{chat.text}</p>
                            </div>
                          ))}
                        </div>
                        <form>
                          <div className="d-flex">
                            <input
                              className="form-control mx-3"
                              value={txt}
                              onChange={(e) => setTxt(e.target.value)}
                              type="text"
                              placeholder="Enter your message"
                            />
                            <button
                              className="btn btn-primary"
                              onClick={() => addChat(ee.userId, ee._id)}
                              type="button"
                            >
                              Submit
                            </button>
                          </div>
                        </form>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
