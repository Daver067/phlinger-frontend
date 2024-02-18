import React from "react";
import InnerNav from "../NavBar/InnerNav";

function CreateClient() {
  return (
    <div className="grid">
      <InnerNav />
      <div id="CreateClient">
        <h1>Create a new Client!</h1>
      </div>
    </div>
  );
}

export default CreateClient;
