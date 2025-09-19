import {
    Dialog, DialogTitle, DialogContent,
    DialogActions, TextField, Button,
    FormControlLabel, Switch,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../services/api";
import "./ModalCrearProveedor.js";

const esquema = yup.object().shape({
    nombre: yup.string().required("Nombre obligatorio"),
    telefono: yup.string(),
    email: yup.string().email("Email invalido"),
});

export default function ModalCrearProveedor({ abierto, onClose, onGuardado }) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(esquema)
    });

    const onSubmit = async (data) => {
        try {
            await api.post("/proveedores", data);
            onGuardado();
            reset();
            onClose();
        } catch (err) {
            alert("Error al guardar proveedor");
            console.error(err);
        }
    };

    return (
        <Dialog open={abierto} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle className="modal-title">Nuevo Proveedor</DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent className="modal-content">
                    <TextField label="Nombre" fullWidth {...register("nombre")} error={!!errors.nombre} helperText={errors.nombre?.message} margin="normal" />
                    <TextField label="Telefono" fullWidth {...register("telefono")} margin="normal" />
                    <TextField label="Email" fullWidth {...register("email")} error={!!errors.email} helperText={errors.email?.message} margin="normal" />
                    <FormControlLabel control={<Switch {...register("habilitado")} defaultChecked />} label="Habilitado" className="switch-label" />
                </DialogContent>
                <DialogActions className="modal-actions">
                    <Button onClick={onClose} variant="outlined">Cancelar</Button>
                    <Button type="submit" variant="contained" color="primary">Guardar</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}