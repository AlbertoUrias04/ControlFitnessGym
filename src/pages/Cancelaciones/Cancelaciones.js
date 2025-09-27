import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Button,
    TextField, Pagination
} from "@mui/material";
import { useEffect, useState } from "react";
import api from "../../services/api";
import ModalCancelarVenta from "../../Components/modals/ModalCancelarVenta";
import "./Cancelaciones.css";

export default function Cancelaciones() {
    const [cancelaciones, setCancelaciones] = useState([]);
    const [filtro, setFiltro] = useState("");
    const [pagina, setPagina] = useState(1);
    const [filtradas, setFiltradas] = useState([]);
    const [modalAbierto, setModalAbierto] = useState(false);

    const itemsPorPagina = 5;

    const cargarCancelaciones = () => {
        api.get("/cancelaciones").then((res) => {
            setCancelaciones(res.data);
        });
    };

    useEffect(() => {
        cargarCancelaciones();
    }, []);

    useEffect(() => {
        const datos = cancelaciones.filter((c) =>
            (c.motivo + " " + c.ventaId).toLowerCase().includes(filtro.toLowerCase())
        );
        setFiltradas(datos);
        setPagina(1);
    }, [filtro, cancelaciones]);

    const cancelacionesPaginadas = filtradas.slice(
        (pagina - 1) * itemsPorPagina,
        pagina * itemsPorPagina
    );

    return (
        <div className="page-container">
            <div className="header">
                <h1>Cancelaciones</h1>
                <Button variant="contained" onClick={() => setModalAbierto(true)}>
                    Cancelar venta
                </Button>
            </div>

            <div className="search-bar">
                <TextField
                    label="Buscar por usuario, motivo o orden"
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
                            <TableCell className="actions-cell"><b>ID Venta</b></TableCell>
                            <TableCell className="actions-cell"><b>Motivo</b></TableCell>
                            <TableCell className="actions-cell"><b>Fecha</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cancelacionesPaginadas.map((c) => (
                            <TableRow key={c.id}>
                                <TableCell>{c.ventaId}</TableCell>
                                <TableCell>{c.motivo}</TableCell>
                                <TableCell>{new Date(c.fecha).toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                        {cancelacionesPaginadas.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={3} align="center">No hay cancelaciones.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <div className="pagination-container">
                <Pagination
                    count={Math.ceil(filtradas.length / itemsPorPagina)}
                    page={pagina}
                    onChange={(e, v) => setPagina(v)}
                />
            </div>

            <ModalCancelarVenta
                abierto={modalAbierto}
                onClose={() => setModalAbierto(false)}
                onGuardado={cargarCancelaciones}
            />
        </div>
    );
}