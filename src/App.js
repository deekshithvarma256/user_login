import React, { useState } from "react";
import { StyledApp } from "./StyledApp.js";
import Login from "./components/login";
import UserList from "./components/userList";

function App() {
  const [user, setUser] = useState(null);
  return (
    <StyledApp className="App">
      {user ? <UserList user={user} /> : <Login setUser={setUser} />}
    </StyledApp>
  );
}

export default App;
