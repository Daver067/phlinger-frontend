import React from "react";
import { useAuth } from "../auth/useAuth";
import { useNavigate } from "react-router-dom";

function Logout() {
  // Destructing our hook to get the `logout` function
  const { logout } = useAuth();
  const navigate = useNavigate();
  return (
    <button
      onClick={() => {
        logout();
        navigate("/");
      }}
    >
      Logout
    </button>
  );
}

export default Logout;
