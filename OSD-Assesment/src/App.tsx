import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Login } from "./pages/Login";
import { ToDo } from "./pages/ToDo";
import { RequireAuth } from "./components/RequiredAuth";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <RequireAuth>
            <ToDo />
          </RequireAuth>
        }
      />
    </Routes>
  );
}

export default App;
