//Home.js
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { getSessionCookie } from "../auth/sessions";
import Logout from "../LoginLogout/Logout";
import domainName from "../../domain";

function Home() {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  let effectCalled = useRef(false);
  const domain = domainName;

  useEffect(() => {
    if (effectCalled.current) {
      effectCalled.current = false;
      return;
    }
    try {
      fetch(`${domain}/@me`, {
        method: "GET",
        headers: {
          "x-access-token": getSessionCookie().token,
          "ngrok-skip-browser-warning": "skip",
        },
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else {
            return JSON.stringify({
              name: "not logged in",
              email: " ",
            });
          }
        })
        .then((data) => {
          setUser(data.name);
          setEmail(data.email);
        });
    } catch (error) {
      console.log("Not authenticated");
    }
    effectCalled.current = true;
  }, []);
  return (
    <div>
      <h1>will check if user is logged in or not</h1>
      {user != null ? (
        <div>
          <h2>Logged in</h2>
          <h3>Logged in as: {user}</h3>
          <h3>Email: {email}</h3>

          <Link to="/Console">
            <button>Console</button>
          </Link>

          <Logout setUser={setUser} setEmail={setEmail} />
        </div>
      ) : (
        <div>
          <p>You are not logged in</p>
          <div>
            <Link to="/login">
              <button>Log In</button>
            </Link>

            <Link to="/register">
              <button>Register</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
