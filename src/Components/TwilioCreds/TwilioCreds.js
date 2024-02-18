import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InnerNav from "../NavBar/InnerNav";
import { getSessionCookie } from "../auth/sessions";
import domainName from "../../domain";

function TwilioCreds() {
  const [AccountSID, setAccountSID] = useState("");
  const [AuthToken, setAuthToken] = useState("");
  const [errormsg, setErrormsg] = useState("");
  const [currentSID, setCurrentSID] = useState("");
  const navigate = useNavigate();
  const domain = domainName;
  useEffect(() => {
    fetch(`${domain}/updateCreds`, {
      method: "GET",
      headers: {
        "x-access-token": getSessionCookie().token,
        "ngrok-skip-browser-warning": "skip",
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else throw new Error("error");
      })
      .then((data) => {
        setCurrentSID(data.sid);
      });
  }, []);

  const updateCreds = async (sid, auth) => {
    return fetch(`${domain}/updateCreds`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": getSessionCookie().token,
        "ngrok-skip-browser-warning": "skip",
      },
      body: JSON.stringify({
        sid: sid,
        auth: auth,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.error) {
          console.log(data.error);
          throw new Error(`error - ${data.error}`);
        } else {
          console.log("creds updated");
          return Promise.resolve();
        }
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject(err);
      });
  };

  return (
    <div className="grid">
      <InnerNav />
      <div id="TwilioCreds">
        <h1>Update Your Twilio Credentials</h1>
        <div className="tableDiv">
          <table id="demTable">
            <thead>
              <tr>
                <th>Current Twilio SID</th>
                <th>Current Twilio Auth Token</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{currentSID}</td>
                <td>*******************</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <h3>Change your Credentials:</h3>
          <form>
            <div>
              <label>Twilio Account SID: </label>
              <input
                type="text"
                value={AccountSID}
                onChange={(e) => setAccountSID(e.target.value)}
              />
            </div>
            <div>
              <label>AuthToken: </label>
              <input
                type="password"
                value={AuthToken}
                onChange={(e) => setAuthToken(e.target.value)}
              />
            </div>
            <button
              type="button"
              onClick={() => {
                updateCreds(AccountSID, AuthToken)
                  .then(() => navigate("/Console"))
                  .catch((err) => setErrormsg(err.message));
              }}
            >
              Submit
            </button>
          </form>
        </div>
        <p>{errormsg}</p>
      </div>
    </div>
  );
}

export default TwilioCreds;
