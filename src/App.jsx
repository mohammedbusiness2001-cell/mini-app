import { useState } from "react";
import Login from "./pages/Login";
import "./App.css";

import Process from "./pages/Process";

function App() {
  const [user, setUser] = useState(null);

  function handleLogin(userData) {
    setUser(userData);
  }

  function handleLogout() {
    setUser(null);
  }

  return (
    <div className="container">
      {user ? (
        <Process user={user} onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
