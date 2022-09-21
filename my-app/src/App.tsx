import "./App.css";
import { useContext } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Home } from "./pages/Home";
import { Private } from "./pages/Private";
import { RequireAuth } from "./contexts/Auth/RequireAuth";
import { AuthContext } from "./contexts/Auth/AuthContext";

function App() {
  const auth = useContext(AuthContext);

  async function handleLogout() {
    auth.signout();
    window.location.href = window.location.href;
  }

  return (
    <div className="App">
      <header>
        <h1>Header Do Site</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/private">Página Privada</Link>
          {auth.user && <button onClick={handleLogout}>Sair</button>}
        </nav>
        <hr />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/private"
            element={
              <RequireAuth>
                <Private />
              </RequireAuth>
            }
          />
        </Routes>
      </header>
    </div>
  );
}

export default App;
