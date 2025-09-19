import React, { Component } from 'react';
import './Login.css'; 
import Usuarios from '../../Components/Usuarios';

const Login = () => {
    return (
        <div className='login-container'>
            <h2>Acceso para empleados</h2>
            <form className='login-form'>
                <div>
                    <label>Id de Usuario:</label>
                    <input type='text' placeholder='Ingresa tu ID' required />
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input type='password' placeholder='Ingresa tu contraseña' required />
                </div>
                <button onClick={Usuarios} type='submit'>Iniciar sesión</button>
            </form>
            {/* <p>¿No tienes cuenta? <a href='/registro'>Regístrate aquí</a></p> */}
        </div>
    );
}

export default Login;