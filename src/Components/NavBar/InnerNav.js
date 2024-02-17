import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { getSessionCookie } from "../auth/sessions";

function InnerNav() {
  return (
    <div id="InnerNav">
      <div className="nav">
        <h3>Navigation</h3>
        <Link to="/TwilioCreds">TwilioCreds </Link>
        <Link to="/Numbers">Numbers </Link>
        <Link to="/Assets">Assets </Link>
        <Link to="/CallLogs">CallLogs </Link>
        <Link to="/Clients">Clients </Link>
      </div>
    </div>
  );
}

export default InnerNav;
