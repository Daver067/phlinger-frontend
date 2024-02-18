import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InnerNav from "../NavBar/InnerNav";
import { getSessionCookie } from "../auth/sessions";
import domainName from "../../domain";

function Assets() {
  const [assets, setAssets] = useState([{ nickname: "", number: "" }]);
  const [asset, setAsset] = useState("");
  const [client, setClient] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [errormsg, setErrormsg] = useState("");
  const domain = domainName;
  const navigate = useNavigate();

  //  On Load fetch the users assets loaded in the db
  useEffect(() => {
    fetch(`${domain}/assets`, {
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
        setAssets(data.assets);
      });
  }, []);

  const addNewClient = async (asset, client, number, email) => {
    return fetch(`${domain}/assets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": getSessionCookie().token,
        "ngrok-skip-browser-warning": "skip",
      },
      body: JSON.stringify({
        name: asset,
        client_id: client,
        number: number,
        email: email,
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
      <div id="Assets">
        <h1>Create and View Assets!</h1>
        <h3>Current Assets</h3>
        <div className="tableDiv">
          <table id="demTable">
            <thead>
              <tr>
                <th>Asset Name</th>
                <th>Client</th>
                <th>Asset Phone Number</th>
                <th>Asset Email</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((asset) => {
                return (
                  <tr>
                    <td>{asset.name}</td>
                    <td>{asset.client_id}</td>
                    <td>{asset.number}</td>
                    <td>{asset.email}</td>
                    <td>Edit</td>
                    <td>Delete</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <h3>Add a new Asset!</h3>
        <form>
          <div>
            <label>Asset: </label>
            <input
              type="text"
              value={asset}
              onChange={(e) => setAsset(e.target.value)}
            />
          </div>
          <div>
            <label>Client: </label>
            <input
              type="text"
              value={client}
              onChange={(e) => setClient(e.target.value)}
            />
          </div>
          <div>
            <label>Phone Number: </label>
            <input
              type="text"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>
          <div>
            <label>Email: </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            type="button"
            onClick={() => {
              addNewClient(asset, client, number, email)
                // TODO re render the component
                .then(() => navigate("/Console"))
                .catch((err) => setErrormsg(err.message));
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Assets;
