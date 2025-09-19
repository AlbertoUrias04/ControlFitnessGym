import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    FormControlLabel,
    Switch,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../services/api";
import "./ModalCrearUsuario.js";

const esquema = yup.object().shape({
    nombre: yup.string().required("El nombre es obligatorio"),
    apellidoPaterno: yup.string().required("El apellido paterno es obligatorio"),
    apellidoMaterno: yup.string().required("El apellido materno es obligatorio"),
    nombreUsuario: yup.string().required("El usuario es obligatorio"),
    password: yup.string().required("La contraseña es obligatoria"),
});

export default function ModalCrearUsuario({ abierto, onClose, onGuardado }) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ resolver: yupResolver(esquema) });

    const onSubmit = async (data) => {
        try {
            await api.post("/usuarios", data);
            onGuardado();
            reset();
            onClose();
        } catch (error) {
            alert("Error al guardar usuario");
            console.error(error);
        }
    };

    return (
        <Dialog open={abierto} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle className="modal-title">Nuevo Usuario</DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent className="modal-content">
                    <TextField
                        label="Nombre"
                        fullWidth
                        {...register("nombre")}
                        error={!!errors.nombre}
                        helperText={errors.nombre?.message}
                        margin="normal"
                    />
                    <TextField
                        label="Apellido Paterno"
                        fullWidth
                        {...register("apellidoPaterno")}
                        error={!!errors.apellidoPaterno}
                        helperText={errors.apellidoPaterno?.message}
                        margin="normal"
                    />
                    <TextField
                        label="Apellido Materno"
                        fullWidth
                        {...register("apellidoMaterno")}
                        error={!!errors.apellidoMaterno}
                        helperText={errors.apellidoMaterno?.message}
                        margin="normal"
                    />
                    <TextField
                        label="Usuario"
                        fullWidth
                        {...register("nombreUsuario")}
                        error={!!errors.nombreUsuario}
                        helperText={errors.nombreUsuario?.message}
                        margin="normal"
                    />
                    <TextField
                        label="password"
                        fullWidth
                        type="password"
                        {...register("password")}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        margin="normal"
                    />
                    <FormControlLabel
                        control={<Switch {...register("habilitado")} defaultChecked />}
                        label="Habilitado"
                        className="switch-label"
                    />
                </DialogContent>
                <DialogActions className="modal-actions">
                    <Button onClick={onClose} variant="outlined">Cancelar</Button>
                    <Button type="submit" variant="contained" color="primary">Guardar</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}