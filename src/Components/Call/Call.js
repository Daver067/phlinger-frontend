import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { getSessionCookie } from "../auth/sessions";

function Call() {
  const authed = useAuth().authed;

  const navigate = useNavigate();
  const cookie = getSessionCookie();

  return (
    <div>
      <h1>Calling Someone! </h1>
    </div>
  );
}

export default Call;
