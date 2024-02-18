import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errormsg, setErrormsg] = useState("");

  const navigate = useNavigate();

  const { login } = useAuth();

  useEffect(() => {
    console.log("this is how you use useEffect");
  });
  return (
    <div>
      <h1>LOGIN</h1>
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
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="button"
          onClick={() => {
            login(email, password)
              .then(() => navigate("/Console"))
              .catch((err) => setErrormsg(err.message));
          }}
        >
          Submit
        </button>
      </form>
      <p>{errormsg}</p>
    </div>
  );
}
export default LoginPage;
