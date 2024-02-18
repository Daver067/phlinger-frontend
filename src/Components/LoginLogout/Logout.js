import React from "react";
import { useAuth } from "../auth/useAuth";
import { useNavigate } from "react-router-dom";

function Logout() {
  // Destructing our hook to get the `logout` function
  const { logout } = useAuth();
  const navigate = useNavigate();
  return (
    <a
      onClick={() => {
        logout();
        navigate("/");
      }}
    >
      Logout
    </a>
  );
}

export default Logout;
