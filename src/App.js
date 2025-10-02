import { Route, Routes } from "react-router-dom";
import Layout from "./Components/layout/Layout";
import Login from "./pages/Login/Login";
import Productos from "./pages/Productos/Productos";
import Ventas from "./pages/Ventas/Ventas";
import Proveedores from "./pages/Proveedores/Proveedores";
import Sucursales from "./pages/Sucursales/Sucursales";
import Usuarios from "./pages/Usuarios/Usuarios";
import Cancelaciones from "./pages/Cancelaciones/Cancelaciones";
import Reembolsos from "./pages/Reembolsos/Reembolsos";
import Socios from "./pages/Socios/Socios";
import Membresias from "./pages/Membresias/Membresias";
import RutaPrivada from "./Components/RutaPrivada";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <RutaPrivada>
            <Layout />
          </RutaPrivada>
        }
      >
        <Route path="usuarios" element={<Usuarios />} />
        <Route path="sucursales" element={<Sucursales />} />
        <Route path="socios" element={<Socios />} />
        <Route path="membresias" element={<Membresias />} />
        <Route path="proveedores" element={<Proveedores />} />
        <Route path="productos" element={<Productos />} />
        <Route path="ventas" element={<Ventas />} />
        <Route path="cancelaciones" element={<Cancelaciones />} />
        <Route path="reembolsos" element={<Reembolsos />} />
      </Route>
    </Routes>
  );
}