import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Button,
    TextField, Pagination
} from "@mui/material";
import { useEffect, useState } from "react";
import api from "../services/api";
import ModalCrearVenta from "../Components/ModalCrearVenta";
import "./Ventas.css";

export default function Ventas() {
    const [ventas, setVentas] = useState([]);
    const [filtro, setFiltro] = useState("");
    const [pagina, setPagina] = useState(1);
    const [filtradas, setFiltradas] = useState([]);
    const [modalAbierto, setModalAbierto] = useState(false);

    const itemsPorPagina = 5;

    const cargarVentas = () => {
        api.get("/ventas").then((res) => {
            setVentas(res.data);
        });
    };

    useEffect(() => {
        cargarVentas();
    }, []);

    useEffect(() => {
        const datos = ventas.filter((v) =>
            (v.producto + " " + v.sucursal).toLowerCase().includes(filtro.toLowerCase())
        );
        setFiltradas(datos);
        setPagina(1);
    }, [filtro, ventas]);

    const ventasPaginadas = filtradas.slice(
        (pagina - 1) * itemsPorPagina,
        pagina * itemsPorPagina
    );

    return (
        <div className="page-container">
            <div className="header">
                <h1>Ventas</h1>
                <Button variant="contained" onClick={() => setModalAbierto(true)}>
                    Nueva venta
                </Button>
            </div>

            <div className="search-bar">
                <TextField
                    label="Buscar por cliente, usuario o metodo de pago"
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
                            <TableCell className="actions-cell"><b>Usuario</b></TableCell>
                            <TableCell className="actions-cell"><b>Fecha</b></TableCell>
                            <TableCell className="actions-cell"><b>Producto</b></TableCell>
                            <TableCell className="actions-cell"><b>Sucursal</b></TableCell>
                            <TableCell className="actions-cell"><b>Cantidad</b></TableCell>
                            <TableCell className="actions-cell"><b>Total</b></TableCell>
                            <TableCell className="actions-cell"><b>Estado</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ventasPaginadas.map((v) => (
                            <TableRow key={v.id}>
                                <TableCell>{v.usuarioId}</TableCell>
                                <TableCell>{v.nombreUsuario}</TableCell>
                                <TableCell>{new Date(v.fecha).toLocaleString()}</TableCell>
                                <TableCell>{v.producto}</TableCell>
                                <TableCell>{v.sucursal}</TableCell>
                                <TableCell>{v.cantidad}</TableCell>
                                <TableCell>${v.total.toFixed(2)}</TableCell>
                                <TableCell>{v.cancelada ? "Cancelada" : "Activa"}</TableCell>
                            </TableRow>
                        ))}
                        {ventasPaginadas.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} align="center">No hay ventas.</TableCell>
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

            <ModalCrearVenta
                abierto={modalAbierto}
                onClose={() => setModalAbierto(false)}
                onGuardado={cargarVentas}
            />
        </div>
    );
}