import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute/index.jsx";
import Equipments from "./pages/Equipments/Equipments.jsx";
import EquipmentDetails from "./pages/Equipments/EquipmentDetails.jsx";
import MyWorkOrder from "./pages/Work_Orders/MyWorkOrder.jsx";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext.jsx";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/equipments"
            element={
              <ProtectedRoute>
                <Equipments />
              </ProtectedRoute>
            }
          />

          <Route
            path="/equipments/:id"
            element={
              <ProtectedRoute>
                <EquipmentDetails />
              </ProtectedRoute>
            }
            />
          <Route
            path="/workorders"
            element={
              <ProtectedRoute>
                <MyWorkOrder />
              </ProtectedRoute>
            }
            />
        </Routes>

        <ToastContainer position="top-right" autoClose={2000} />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
