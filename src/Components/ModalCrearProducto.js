import {
    Dialog, DialogTitle, DialogContent,
    DialogActions, TextField, Button,
    FormControlLabel, Switch, MenuItem,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import * as yup from "yup";
import api from "../services/api";

const esquema = yup.object().shape({
    nombre: yup.string().required("Nombre obligatorio"),
    precio: yup.number().positive("Debe ser mayor a 0").required("Precio obligatorio"),
    stock: yup.number().integer("Debe ser entero").min(0, "No puede ser negativo").required("Stock obligatorio"),
    nombreProveedor: yup.string().required("Selecciona un proveedor"),
    habilitado: yup.boolean()
});

export default function ModalCrearProducto({ abierto, onClose, onGuardado }) {
    const [proveedores, setProveedores] = useState([]);

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(esquema)
    });

    useEffect(() => {
        api.get("/proveedores?habilitado=true")
            .then(res => setProveedores(res.data))
            .catch(err => console.error("Error al cargar proveedores", err));
    }, []);

    const onSubmit = async (data) => {
        try {
            console.log("Enviando producto:", data); // Puedes quitar esto luego
            await api.post("/productos", data); // <-- nombreProveedor incluido
            onGuardado();
            reset();
            onClose();
        } catch (err) {
            console.error("Error al crear producto:", err);

            if (err.response) {
                console.error("Respuesta del servidor:", err.response.data);
                alert(`Error: ${err.response.data}`);
            } else {
                alert("Error al conectar con el servidor");
            }
        }
    };

    return (
        <Dialog open={abierto} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Nuevo Producto</DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                    <TextField
                        label="Nombre"
                        fullWidth
                        {...register("nombre")}
                        error={!!errors.nombre}
                        helperText={errors.nombre?.message}
                        margin="normal"
                    />
                    <TextField
                        label="Precio"
                        fullWidth
                        type="number"
                        {...register("precio")}
                        error={!!errors.precio}
                        helperText={errors.precio?.message}
                        margin="normal"
                    />
                    <TextField
                        label="Stock"
                        fullWidth
                        type="number"
                        {...register("stock")}
                        error={!!errors.stock}
                        helperText={errors.stock?.message}
                        margin="normal"
                    />
                    <TextField
                        label="Proveedor"
                        fullWidth
                        select
                        {...register("nombreProveedor")}
                        error={!!errors.nombreProveedor}
                        helperText={errors.nombreProveedor?.message}
                        margin="normal"
                    >
                        {proveedores.map((p) => (
                            <MenuItem key={p.id} value={p.nombre}>
                                {p.nombre}
                            </MenuItem>
                        ))}
                    </TextField>
                    <FormControlLabel
                        control={<Switch {...register("habilitado")} defaultChecked />}
                        label="Habilitado"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} variant="outlined">Cancelar</Button>
                    <Button type="submit" variant="contained" color="primary">Guardar</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}