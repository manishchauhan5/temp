import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PasswordResetFlow from "./pages/PasswordResetFlow";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      <Router>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/passwordResetFlow" element={<PasswordResetFlow />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
