import {
    Dialog, DialogTitle, DialogContent,
    DialogActions, TextField, Button,
    FormControlLabel, Switch, MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../../services/api";
import "./ModalCrearProveedor.js";

const esquema = yup.object().shape({
    nombre: yup.string().required("Nombre obligatorio"),
    precio: yup.number().positive().required(),
    stock: yup.number().integer().min(0).required(),
    nombreProveedor: yup.string().required("Selecciona un proveedor"),
    habilitado: yup.boolean()
});

export default function ModalEditarProducto({ abierto, onClose, producto, onActualizado }) {
    const [proveedores, setProveedores] = useState([]);
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(esquema)
    });

    useEffect(() => {
        api.get("/proveedores?habilitado=true")
            .then(res => setProveedores(res.data))
            .catch(err => console.error("Error al cargar proveedores", err));
    }, []);

    useEffect(() => {
        if (producto) {
            reset({
                nombre: producto.nombre,
                precio: producto.precio,
                stock: producto.stock,
                nombreProveedor: producto.nombreProveedor || "",  // aseguramos que venga el nombre, no ID
                habilitado: producto.habilitado,
            });
        }
    }, [producto, reset]);

    const onSubmit = async (data) => {
        console.log("Datos enviados:", data);
        try {
            
            const { nombre, precio, stock, nombreProveedor, habilitado } = data;
            await api.put(`/productos/${producto.slug}`, {
                slug: producto.slug,
                nombre,
                precio,
                stock,
                nombreProveedor,
                habilitado
            });
            onActualizado();
            onClose();
        } catch (err) {
            console.error("Error al editar producto:", err);
            if (err.response) {
                alert(`Error: ${err.response.data}`);
            } else {
                alert("Error al conectar con el servidor");
            }
        }
    };

    return (
        <Dialog open={abierto} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle className="modal-title">Editar Producto</DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent className="modal-content">
                    <TextField label="Nombre" fullWidth {...register("nombre")} error={!!errors.nombre} helperText={errors.nombre?.message} margin="normal" />
                    <TextField label="Precio" fullWidth type="number" {...register("precio")} error={!!errors.precio} helperText={errors.precio?.message} margin="normal" />
                    <TextField label="Stock" fullWidth type="number" {...register("stock")} error={!!errors.stock} helperText={errors.stock?.message} margin="normal" />
                    <TextField
                        select
                        label="Proveedor"
                        fullWidth
                        {...register("nombreProveedor")}
                        error={!!errors.nombreProveedor}
                        helperText={errors.nombreProveedor?.message}
                        margin="normal"
                    >
                        {proveedores.map((p) => (
                            <MenuItem key={p.id} value={p.nombre}>{p.nombre}</MenuItem>
                        ))}
                    </TextField>
                    <FormControlLabel control={<Switch {...register("habilitado")} />} label="Habilitado" className="switch-label" />
                </DialogContent>
                <DialogActions className="modal-actions">
                    <Button onClick={onClose} variant="outlined">Cancelar</Button>
                    <Button type="submit" variant="contained" color="primary">Guardar</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}