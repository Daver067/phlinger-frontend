import React from "react";
import MenuItem from "./MenuItem";
import Logout from "../LoginLogout/Logout";

function NavBar() {
  return (
    <div id="NavBar">
      <MenuItem theLink="/" info="Home" />
      <MenuItem
        theLink="noLink"
        info="Droppy Downy"
        additionalClassNames={["dropdown"]}
        additionalMenuItems={[
          <div className="dropdown-content">
            <MenuItem theLink="/Console" info="Console" />
            <MenuItem theLink="/Login" info="Login" />
            <MenuItem theLink="/Call" info="Call" />
          </div>,
        ]}
      />
      <MenuItem theLink="/Login" info="Login" />
      <Logout />
    </div>
  );
}

export default NavBar;
