import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Button,
    TextField, Pagination
} from "@mui/material";
import { useEffect, useState } from "react";
import api from "../../services/api";
import ModalCrearReembolso from "../../Components/modals/ModalCrearReembolso"
import "./Reembolsos.css";

export default function Reembolsos() {
    const [reembolsos, setReembolsos] = useState([]);
    const [filtro, setFiltro] = useState("");
    const [pagina, setPagina] = useState(1);
    const [filtrados, setFiltrados] = useState([]);
    const [modalAbierto, setModalAbierto] = useState(false);

    const itemsPorPagina = 5;

    const cargarReembolsos = () => {
        api.get("/reembolsos").then((res) => {
            setReembolsos(res.data);
        });
    };

    useEffect(() => {
        cargarReembolsos();
    }, []);

    useEffect(() => {
        const datos = reembolsos.filter((r) =>
            (r.nombreSucursal + r.monto).toLowerCase().includes(filtro.toLowerCase())
        );
        setFiltrados(datos);
        setPagina(1);
    }, [filtro, reembolsos]);

    const reembolsosPaginados = filtrados.slice(
        (pagina - 1) * itemsPorPagina,
        pagina * itemsPorPagina
    );

    return (
        <div className="page-container">
            <div className="header">
                <h1>Reembolsos</h1>
                <Button className="botonVentas"  variant="contained" onClick={() => setModalAbierto(true)}>
                    Nuevo reembolso
                </Button>
            </div>

            <div className="search-bar">
                <TextField
                    label="Buscar por cliente, usuario o motivo"
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
                            <TableCell className="actions-cell"><b>IDUsuario</b></TableCell>
                            <TableCell className="actions-cell"><b>Sucursal</b></TableCell>
                            <TableCell className="actions-cell"><b>IDProducto</b></TableCell>
                            <TableCell className="actions-cell"><b>Monto</b></TableCell>
                            <TableCell className="actions-cell"><b>Fecha</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reembolsosPaginados.map((r) => (
                            <TableRow key={r.id}>
                                <TableCell>{r.usuarioId}</TableCell>
                                <TableCell>{r.nombreSucursal}</TableCell>
                                <TableCell>{r.productoId}</TableCell>
                                <TableCell>${r.monto.toFixed(2)}</TableCell>
                                <TableCell>{new Date(r.fecha).toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                        {reembolsosPaginados.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={3} align="center">No hay reembolsos.</TableCell>
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

            <ModalCrearReembolso
                abierto={modalAbierto}
                onClose={() => setModalAbierto(false)}
                onGuardado={cargarReembolsos}
            />
        </div>
    );
}