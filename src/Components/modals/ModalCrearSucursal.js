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
import api from "../../services/api";
import './ModalCrearSucursal.css';

const esquema = yup.object().shape({
    nombre: yup.string().required("El nombre es obligatorio"),
    direccion: yup.string().required("La direcci�n es obligatoria"),
});

export default function ModalCrearSucursal({ abierto, onClose, onGuardado }) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ resolver: yupResolver(esquema) });

    const onSubmit = async (data) => {
        try {
            await api.post("/sucursales", data);
            onGuardado();
            reset();
            onClose();
        } catch (error) {
            alert("Error al guardar sucursal");
            console.error(error);
        }
    };

    return (
        <Dialog open={abierto} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle className="modal-title">Nueva Sucursal</DialogTitle>
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
                        label="Direccion"
                        fullWidth
                        {...register("direccion")}
                        error={!!errors.direccion}
                        helperText={errors.direccion?.message}
                        margin="normal"
                    />
                    <FormControlLabel
                        control={<Switch {...register("habilitado")} defaultChecked />}
                        label="Habilitada"
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