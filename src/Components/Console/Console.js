import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { getSessionCookie } from "../auth/sessions";
import InnerNav from "../NavBar/InnerNav";

function ConsolePage() {
  return (
    <div id="Console">
      <h1>Welcome to Phone Phlinger</h1>

      <InnerNav />
    </div>
  );
}

export default ConsolePage;
