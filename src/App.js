import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.js";
import Usuarios from "./pages/Usuarios.js";
import Sucursales from "./pages/Sucursales.js";
import Ventas from "./pages/Ventas.js";
import Reembolso from "./pages/Reembolsos.js";
import Proveedores from "./pages/Proveedores.js";
import Productos from "./pages/Productos.js";
import Cancelaciones from "./pages/Cancelaciones.js";
import RutaPrivada from "./Components/RutaPrivada.js";
import Layout from "./Components/Layout.js";

export default function App() {
    return (
        <BrowserRouter>
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
                    <Route path="proveedores" element={<Proveedores />} />
                    <Route path="productos" element={<Productos />} />
                    <Route path="ventas" element={<Ventas />} />
                    <Route path="cancelaciones" element={<Cancelaciones />} />
                    <Route path="reembolsos" element={<Reembolso />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}