import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./views/Login";
import Register from "./views/Register";
import PrivateRoute from "./components/PrivateRoute";
import ClientLayout from "./components/Layout/ClientLayout";
import AdminLayout from "./components/Layout/AdminLayout";

const App: FC = () => {
  return (
    <Routes>
      <Route path="/*" element={
        <PrivateRoute>
          <ClientLayout />
        </PrivateRoute>
      } />
      <Route path="/admin/*" element={
        <PrivateRoute>
          <AdminLayout />
        </PrivateRoute>
      } />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
