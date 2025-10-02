import { Navigate } from "react-router-dom";

export default function RutaPrivada({ children }) {
  const token = localStorage.getItem("token");

  console.log("RutaPrivada - Verificando token:", token);

  if (!token) {
    console.log("RutaPrivada - No hay token, redirigiendo a login");
    return <Navigate to="/login" replace />;
  }

  // Verificación básica del formato del token JWT
  try {
    const parts = token.split('.');
    console.log("RutaPrivada - Partes del token:", parts.length);

    if (parts.length !== 3) {
      console.log("RutaPrivada - Token inválido (no tiene 3 partes), eliminando");
      localStorage.removeItem("token");
      return <Navigate to="/login" replace />;
    }
  } catch (error) {
    console.log("RutaPrivada - Error al validar token:", error);
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }

  console.log("RutaPrivada - Token válido, permitiendo acceso");
  return children;
}
