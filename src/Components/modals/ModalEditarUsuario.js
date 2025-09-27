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
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../../services/api";

const esquema = yup.object().shape({
    nombre: yup.string().required("El nombre es obligatorio"),
    apellidoPaterno: yup.string().required("El apellido paterno es obligatorio"),
    apellidoMaterno: yup.string().required("El apellido materno es obligatorio"),
    nombreUsuario: yup.string().required("El usuario es obligatorio"),
    password2: yup.string().nullable(),
});

export default function ModalEditarUsuario({ abierto, onClose, usuario, onActualizado }) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(esquema),
        defaultValues: {
            nombre: "",
            apellidoPaterno: "",
            apellidoMaterno: "",
            nombreUsuario: "",
            password2: "",
            habilitado: true,
        }
    });

    useEffect(() => {
        if (usuario) {
            reset({
                nombre: usuario.nombre,
                apellidoPaterno: usuario.apellidoPaterno,
                apellidoMaterno: usuario.apellidoMaterno,
                nombreUsuario: usuario.nombreUsuario,
                password2: "",
                habilitado: usuario.habilitado,
            });
        }
    }, [usuario, reset]);

    const onSubmit = async (data) => {
        try {
            const dto = { ...data, slug: usuario.slug };
            await api.put(`/usuarios/${usuario.slug}`, dto);
            onActualizado();
            onClose();
        } catch (err) {
            alert("Error al actualizar usuario");
            console.error(err);
        }
    };

    return (
        <Dialog open={abierto} onClose={onClose}>
            <DialogTitle>Editar Usuario</DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent className="flex flex-col gap-3 w-96">
                    <TextField label="Nombre" {...register("nombre")} error={!!errors.nombre} helperText={errors.nombre?.message} />
                    <TextField label="Apellido Paterno" {...register("apellidoPaterno")} error={!!errors.apellidoPaterno} helperText={errors.apellidoPaterno?.message} />
                    <TextField label="Apellido Materno" {...register("apellidoMaterno")} error={!!errors.apellidoMaterno} helperText={errors.apellidoMaterno?.message} />
                    <TextField label="Usuario" {...register("nombreUsuario")} error={!!errors.nombreUsuario} helperText={errors.nombreUsuario?.message} />
                    <TextField label="Password (dejar en blanco para no cambiar)" type="password" {...register("Password")} error={!!errors.password2} helperText={errors.password2?.message} />
                    <FormControlLabel control={<Switch {...register("habilitado")} />} label="Habilitado" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancelar</Button>
                    <Button type="submit" variant="contained">Guardar</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}