import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Button,
    Chip, TextField, Pagination
} from "@mui/material";
import { useEffect, useState } from "react";
import api from "../../services/api";
import ModalCrearProveedor from "../../Components/modals/ModalCrearProveedor"
import ModalEditarProveedor from "../../Components/modals/ModalEditarProveedor"
import './Proveedores.css';

export default function Proveedores() {
    const [proveedores, setProveedores] = useState([]);
    const [filtro, setFiltro] = useState("");
    const [pagina, setPagina] = useState(1);
    const [filtrados, setFiltrados] = useState([]);
    const [modalCrearAbierto, setModalCrearAbierto] = useState(false);
    const [modalEditarAbierto, setModalEditarAbierto] = useState(false);
    const [proveedorEditar, setProveedorEditar] = useState(null);

    const itemsPorPagina = 5;

    const cargarProveedores = () => {
        api.get("/proveedores?habilitado=true").then((res) => {
            setProveedores(res.data);
        });
    };

    useEffect(() => {
        cargarProveedores();
    }, []);

    useEffect(() => {
        const datos = proveedores.filter((p) =>
            p.nombre.toLowerCase().includes(filtro.toLowerCase())
        );
        setFiltrados(datos);
        setPagina(1);
    }, [filtro, proveedores]);

    const abrirEditar = (p) => {
        setProveedorEditar(p);
        setModalEditarAbierto(true);
    };

    const eliminarProveedor = async (slug) => {
        const confirmar = window.confirm("�Deshabilitar este proveedor?");
        if (!confirmar) return;

        try {
            await api.patch(`/proveedores/${slug}`, { habilitado: false });
            cargarProveedores();
        } catch (err) {
            alert("Error al deshabilitar proveedor");
            console.error(err);
        }
    };

    const proveedoresPaginados = filtrados.slice(
        (pagina - 1) * itemsPorPagina,
        pagina * itemsPorPagina
    );

    return (
        <div className="page-container">
            <div className="header">
                <h1>Proveedores</h1>
                <Button variant="contained" onClick={() => setModalCrearAbierto(true)}>
                    Nuevo
                </Button>
            </div>

            <div className="search-bar">
                <TextField
                    label="Buscar por nombre, contacto o telefono"
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
                            <TableCell className="actions-cell"><b>Nombre</b></TableCell>
                            <TableCell className="actions-cell"><b>Telefono</b></TableCell>
                            <TableCell className="actions-cell"><b>Email</b></TableCell>
                            <TableCell className="actions-cell"><b>Estado</b></TableCell>
                            <TableCell align="center" className="actions-cell"><b>Acciones</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {proveedoresPaginados.map((p) => (
                            <TableRow key={p.slug}>
                                <TableCell>{p.nombre}</TableCell>
                                <TableCell>{p.telefono}</TableCell>
                                <TableCell>{p.email}</TableCell>
                                <TableCell>
                                    <Chip label={p.habilitado ? "Habilitado" : "Deshabilitado"}
                                        color={p.habilitado ? "success" : "default"} />
                                </TableCell>
                                <TableCell align="center" className="actions-cell">
                                    <Button size="small" variant="contained" onClick={() => abrirEditar(p)}>
                                        Editar
                                    </Button>
                                    <Button size="small" color="error" variant="outlined" onClick={() => eliminarProveedor(p.slug)}>
                                        Eliminar
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {proveedoresPaginados.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} align="center">No hay proveedores.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <div className="pagination-container">
                <Pagination
                    count={Math.ceil(filtrados.length / itemsPorPagina)}
                    page={pagina}
                    onChange={(e, v) => setPagina(v)}
                />
            </div>

            <ModalCrearProveedor
                abierto={modalCrearAbierto}
                onClose={() => setModalCrearAbierto(false)}
                onGuardado={cargarProveedores}
            />

            <ModalEditarProveedor
                abierto={modalEditarAbierto}
                onClose={() => setModalEditarAbierto(false)}
                proveedor={proveedorEditar}
                onActualizado={cargarProveedores}
            />
        </div>
    );
}