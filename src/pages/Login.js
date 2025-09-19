import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api.js"; // tu instancia axios configurada
import './Login.css';

const Login = () => {
    const [usuarioNombre, setUsuarioNombre] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = {
                usuarioNombre: usuarioNombre,   // que coincida con el DTO backend
                contrasena: contrasena,
                mantenerSesion: true
            };

            console.log("Datos enviados al login:", data);
            // Llama a la API con POST a /login
            const res = await api.post("/login", data);

            // Suponiendo que el token viene en res.data.token
            const token = res.headers.authorization;
            if (!token) throw new Error("Token no recibido");
            localStorage.setItem("token", token);

            // Navegamos a Usuarios
            navigate("/usuarios");
        } catch (err) {
            console.error("Error al iniciar sesion:", err);

            if (err.response) {
                console.log("Respuesta del servidor:", err.response);
                console.log("C�digo de estado:", err.response.status);
                console.log("Datos del error:", err.response.data);
            }

            setError("Usuario o contrasena incorrectos");
        }
    };

    return (
        <div className="login-container">
            <h2>Acceso para empleados</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <div>
                    <label>Id de Usuario:</label>
                    <input
                        type="text"
                        placeholder="Ingresa tu ID"
                        required
                        value={usuarioNombre}
                        onChange={(e) => setUsuarioNombre(e.target.value)}
                    />
                </div>
                <div>
                    <label>Contrasena:</label>
                    <input
                        type="password"
                        placeholder="Ingresa tu contrasena"
                        required
                        value={contrasena}
                        onChange={(e) => setContrasena(e.target.value)}
                    />
                </div>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <button type="submit">Iniciar sesion</button>
            </form>
        </div>
    );
};

export default Login;