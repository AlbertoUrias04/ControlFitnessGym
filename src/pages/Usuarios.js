import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Chip,
    TextField,
    Pagination,
} from "@mui/material";
import { useEffect, useState } from "react";
import api from "../services/api";
import ModalCrearUsuario from "../Components/ModalCrearUsuario";
import ModalEditarUsuario from "../Components/ModalEditarUsuario";
import './Usuarios.css';

export default function Usuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [filtro, setFiltro] = useState("");
    const [pagina, setPagina] = useState(1);
    const [filtrados, setFiltrados] = useState([]);
    const [modalAbierto, setModalAbierto] = useState(false);
    const [modalEditarAbierto, setModalEditarAbierto] = useState(false);
    const [usuarioEditar, setUsuarioEditar] = useState(null);

    const itemsPorPagina = 5;

    const cargarUsuarios = () => {
        api.get("/usuarios").then((res) => {
            setUsuarios(res.data);
        });
    };

    useEffect(() => {
        cargarUsuarios();
    }, []);

    useEffect(() => {
        const datosFiltrados = usuarios.filter((u) =>
            [u.nombre, u.apellidoPaterno, u.apellidoMaterno, u.nombreUsuario]
                .join(" ")
                .toLowerCase()
                .includes(filtro.toLowerCase())
        );
        setFiltrados(datosFiltrados);
        setPagina(1);
    }, [filtro, usuarios]);

    const usuariosPaginados = filtrados.slice(
        (pagina - 1) * itemsPorPagina,
        pagina * itemsPorPagina
    );

    const abrirEditar = (usuario) => {
        setUsuarioEditar(usuario);
        setModalEditarAbierto(true);
    };

    const eliminarUsuario = async (slug) => {
        const confirmacion = window.confirm("�Est�s seguro de deshabilitar este usuario?");
        if (!confirmacion) return;

        try {
            await api.patch(`/usuarios/${slug}`, {
                slug, // lo env�as tambi�n en el cuerpo
                habilitado: false
            });
            cargarUsuarios();
        } catch (error) {
            alert("Error al deshabilitar el usuario");
            console.error(error);
        }
    };

    return (
        <div className="page-container">
            <div className="header">
                <h1>Usuarios</h1>
                <Button variant="contained" color="primary" onClick={() => setModalAbierto(true)}>
                    Nuevo
                </Button>
            </div>

            <div className="search-bar">
                <TextField
                    label="Buscar por nombre o usuario"
                    variant="outlined"
                    fullWidth
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                />
            </div>

            <TableContainer component={Paper} className="table-container">
                <Table>
                    <TableHead>
                        <TableRow className="table-header">
                            <TableCell><b>Nombre</b></TableCell>
                            <TableCell><b>Apellido Paterno</b></TableCell>
                            <TableCell><b>Apellido Materno</b></TableCell>
                            <TableCell><b>Usuario</b></TableCell>
                            <TableCell><b>Estado</b></TableCell>
                            <TableCell align="center"><b>Acciones</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {usuariosPaginados.map((u) => (
                            <TableRow key={u.slug}>
                                <TableCell>{u.nombre}</TableCell>
                                <TableCell>{u.apellidoPaterno}</TableCell>
                                <TableCell>{u.apellidoMaterno}</TableCell>
                                <TableCell>{u.nombreUsuario}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={u.habilitado ? "Habilitado" : "Deshabilitado"}
                                        color={u.habilitado ? "success" : "error"}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell align="center" className="actions-cell">
                                    <Button
                                        variant="contained"
                                        size="small"
                                        color="primary"
                                        
                                        onClick={() => abrirEditar(u)}
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        color="error"
                                        onClick={() => eliminarUsuario(u.slug)}
                                    >
                                        Eliminar
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {usuariosPaginados.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} align="center">
                                    No hay usuarios.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <div className="pagination-container">
                <Pagination
                    count={Math.ceil(filtrados.length / itemsPorPagina)}
                    page={pagina}
                    onChange={(e, value) => setPagina(value)}
                    color="primary"
                />
            </div>
            <ModalCrearUsuario
                abierto={modalAbierto}
                onClose={() => setModalAbierto(false)}
                onGuardado={cargarUsuarios}
            />
            <ModalEditarUsuario
                abierto={modalEditarAbierto}
                onClose={() => setModalEditarAbierto(false)}
                usuario={usuarioEditar}
                onActualizado={cargarUsuarios}
            />
        </div>
    );
}