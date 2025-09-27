import {
    Dialog, DialogTitle, DialogContent,
    DialogActions, Button, TextField, MenuItem
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller } from "react-hook-form";
import * as yup from "yup";
import api from "../../services/api";
import "./ModalCrearVenta.js";


const esquema = yup.object().shape({
    productoId: yup.string().required("Seleccione un producto"),
    nombreSucursal: yup.string().required("Seleccione una sucursal"),
    cantidad: yup
        .number()
        .typeError("Debe ser un n�mero")
        .integer("Debe ser entero")
        .min(1, "Debe ser mayor a 0")
        .required("Cantidad obligatoria"),
    usuarioId: yup
        .number()
        .typeError("Debe ser un n�mero")
        .required("Usuario requerido")
});

export default function ModalCrearVenta({ abierto, onClose, onGuardado }) {
    const { register, handleSubmit, reset, control, formState: { errors } } = useForm({
        resolver: yupResolver(esquema),
        defaultValues: {
            productoId: "",
            nombreSucursal: "",
            cantidad: "",
            usuarioId: ""
        }
    });
    const [productos, setProductos] = useState([]);
    const [sucursales, setSucursales] = useState([]);

    useEffect(() => {
        api.get("/productos?habilitado=true").then((res) => setProductos(res.data));
        api.get("/sucursales?habilitado=true").then((res) => setSucursales(res.data));
    }, []);

    const onSubmit = async (data) => {
        try {
            console.log("Datos enviados:", data);
            data.cantidad = parseInt(data.cantidad);
            await api.post("/ventas", data);
            onGuardado();
            reset();
            onClose();
        } catch (err) {
            console.error("Error al registrar venta:", err.response?.data || err.message);
            alert(err.response?.data || "Error al registrar venta");
        }
    };

    return (
        <Dialog open={abierto} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle className="modal-title">Nueva Venta</DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent className="modal-content">
                    <TextField
                        label="ID Usuario"
                        fullWidth
                        type="number"
                        {...register("usuarioId", { required: true })}
                        error={!!errors.usuarioId}
                        helperText={errors.usuarioId ? "Ingrese el ID de usuario" : ""}
                        margin="normal"
                    />

                    <TextField
                        label="Producto"
                        fullWidth
                        select
                        {...register("productoId", { required: true })}
                        error={!!errors.productoId}
                        helperText={errors.productoId ? "Seleccione un producto" : ""}
                        margin="normal"
                    >
                        {productos.map(p => (
                            <MenuItem key={p.id} value={p.id}>{p.nombre}</MenuItem>
                        ))}
                    </TextField>

                    <Controller
                        name="nombreSucursal"
                        control={control}
                        rules={{ required: "Seleccione una sucursal" }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Sucursal"
                                fullWidth
                                select
                                error={!!errors.nombreSucursal}
                                helperText={errors.nombreSucursal?.message}
                                margin="normal"
                            >
                                {sucursales.map((s) => (
                                    <MenuItem key={s.id} value={s.nombre}>{s.nombre}</MenuItem>
                                ))}
                            </TextField>
                        )}
                    />

                    <TextField
                        label="Cantidad"
                        fullWidth
                        type="number"
                        {...register("cantidad", { required: true, min: 1 })}
                        error={!!errors.cantidad}
                        helperText={errors.cantidad ? "Ingrese una cantidad v�lida" : ""}
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions className="modal-actions">
                    <Button onClick={onClose} variant="outlined">Cancelar</Button>
                    <Button type="submit" variant="contained" color="primary">Registrar</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}