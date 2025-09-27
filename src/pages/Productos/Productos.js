import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Button,
    Chip, TextField, Pagination
} from "@mui/material";
import { useEffect, useState } from "react";
import api from "../../services/api";
import ModalCrearProducto from "../../Components/modals/ModalCrearProducto"
import ModalEditarProducto from "../../Components/modals/ModalEditarProducto"
import './Productos.css';

export default function Productos() {
    const [productos, setProductos] = useState([]);
    const [filtro, setFiltro] = useState("");
    const [pagina, setPagina] = useState(1);
    const [filtrados, setFiltrados] = useState([]);
    const [modalCrearAbierto, setModalCrearAbierto] = useState(false);
    const [modalEditarAbierto, setModalEditarAbierto] = useState(false);
    const [productoEditar, setProductoEditar] = useState(null);

    const itemsPorPagina = 5;

    const cargarProductos = () => {
        api.get("/productos?habilitado=true").then((res) => {
            setProductos(res.data);
        });
    };

    useEffect(() => {
        cargarProductos();
    }, []);

    useEffect(() => {
        const datos = productos.filter((p) =>
            p.nombre.toLowerCase().includes(filtro.toLowerCase())
        );
        setFiltrados(datos);
        setPagina(1);
    }, [filtro, productos]);

    const abrirEditar = (p) => {
        setProductoEditar(p);
        setModalEditarAbierto(true);
    };

    const eliminarProducto = async (slug) => {
        const confirmar = window.confirm("�Deshabilitar este producto?");
        if (!confirmar) return;
        try {
            await api.patch(`/productos/${slug}`, { habilitado: false });
            cargarProductos();
        } catch (err) {
            alert("Error al deshabilitar producto");
            console.error(err);
        }
    };

    const productosPaginados = filtrados.slice(
        (pagina - 1) * itemsPorPagina,
        pagina * itemsPorPagina
    );

    return (
        <div className="page-container">
            <div className="header">
                <h1>Productos</h1>
                <Button variant="contained" onClick={() => setModalCrearAbierto(true)}>
                    Nuevo
                </Button>
            </div>

            <div className="search-bar">
                <TextField
                    label="Buscar por nombre, proveedor"
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
                            <TableCell className="actions-cell"><b>IDProducto</b></TableCell>
                            <TableCell className="actions-cell"><b>Nombre</b></TableCell>
                            <TableCell className="actions-cell"><b>Precio</b></TableCell>
                            <TableCell className="actions-cell"><b>Stock</b></TableCell>
                            <TableCell className="actions-cell"><b>Proveedor</b></TableCell>
                            <TableCell className="actions-cell"><b>Estado</b></TableCell>
                            <TableCell align="center" className="actions-cell"><b>Acciones</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {productosPaginados.map((p) => (
                            <TableRow key={p.slug}>
                                <TableCell>{p.id}</TableCell>
                                <TableCell>{p.nombre}</TableCell>
                                <TableCell>${p.precio.toFixed(2)}</TableCell>
                                <TableCell>{p.stock}</TableCell>
                                <TableCell>{p.nombreProveedor}</TableCell>
                                <TableCell>
                                    <Chip label={p.habilitado ? "Habilitado" : "Deshabilitado"} color={p.habilitado ? "success" : "default"} />
                                </TableCell>
                                <TableCell align="center" className="actions-cell">
                                    <Button size="small" variant="contained" onClick={() => abrirEditar(p)}>
                                        Editar
                                    </Button>
                                    <Button size="small" color="error" variant="outlined" onClick={() => eliminarProducto(p.slug)}>
                                        Eliminar
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {productosPaginados.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} align="center">No hay productos.</TableCell>
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

            <ModalCrearProducto
                abierto={modalCrearAbierto}
                onClose={() => setModalCrearAbierto(false)}
                onGuardado={cargarProductos}
            />

            <ModalEditarProducto
                abierto={modalEditarAbierto}
                onClose={() => setModalEditarAbierto(false)}
                producto={productoEditar}
                onActualizado={cargarProductos}
            />
        </div>
    );
}