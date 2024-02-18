import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./Components/NavBar/Navbar";
import { useAuth } from "./Components/auth/useAuth";

function App() {
  const authed = useAuth().authed;
  const navigate = useNavigate();

  useEffect(() => {
    if (!authed) {
      navigate("/");
    }
  }, []);

  return (
    <div className="App">
      <Outlet />
    </div>
  );
}
export default App;
