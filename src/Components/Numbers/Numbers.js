import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InnerNav from "../NavBar/InnerNav";
import { getSessionCookie } from "../auth/sessions";
import domainName from "../../domain";
function Numbers() {
  // TODO have to initialize an array or it breaks... fix this
  const [numbers, setNumbers] = useState([{ nickname: "", number: "" }]);
  const [nickname, setNickname] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [errormsg, setErrormsg] = useState("");
  const navigate = useNavigate();
  const domain = domainName;
  //  On Load fetch the users numbers loaded in the db
  useEffect(() => {
    fetch(`${domain}/numbers`, {
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
        setNumbers(data.numbers);
      });
  }, []);

  const addNewNum = async (nick, num) => {
    return fetch(`${domain}/numbers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": getSessionCookie().token,
        "ngrok-skip-browser-warning": "skip",
      },
      body: JSON.stringify({
        nickname: nick,
        number: num,
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
      <div id="Numbers">
        <h1>View and Add new Twilio Numbers</h1>
        <div className="tableDiv">
          <table id="demTable">
            <thead>
              <tr>
                <th>Number Nickname</th>
                <th>Phone Number</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {numbers.map((num) => {
                return (
                  <tr>
                    <td>{num.nickname}</td>
                    <td>{num.number}</td>
                    <td>Edit</td>
                    <td>Delete</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div>
          <h3>Add a new Number!</h3>
          <form>
            <div>
              <label>Nickname: </label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </div>
            <div>
              <label>Phone Number: </label>
              <input
                type="text"
                value={newNumber}
                onChange={(e) => setNewNumber(e.target.value)}
              />
            </div>
            <button
              type="button"
              onClick={() => {
                addNewNum(nickname, newNumber)
                  // TODO re render the component
                  .then(() => navigate("/Console"))
                  .catch((err) => setErrormsg(err.message));
              }}
            >
              Submit
            </button>
          </form>
          <p>{errormsg}</p>
        </div>
      </div>
    </div>
  );
}

export default Numbers;
