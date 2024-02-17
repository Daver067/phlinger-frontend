import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import domainName from "../../domain";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errormsg, setErrormsg] = useState("");
  const [redirect, setRedirect] = useState(false);
  const domain = domainName;
  const navigate = useNavigate();

  const registerUser = () => {
    try {
      fetch(`${domain}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "skip",
        },
        body: JSON.stringify({
          password: password,
          email: email,
          name: name,
        }),
      })
        .then((response) => {
          if (response.status === 200) {
            setRedirect(true);
          }
          return response.json();
        })
        .then((data) => {});
    } catch (error) {
      if (error.response.status === 401) {
        alert("Invalid credentials");
      }
    }
  };

  useEffect(() => {
    if (redirect === true) {
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }
  });

  return (
    <div>
      <h1>REGISTER</h1>
      <form>
        <div>
          <label>Email: </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Name: </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button" onClick={() => registerUser()}>
          Submit
        </button>
      </form>
      <p>{errormsg}</p>
    </div>
  );
}

export default RegisterPage;
