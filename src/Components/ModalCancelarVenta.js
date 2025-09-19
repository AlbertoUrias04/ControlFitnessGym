import {
  Dialog, DialogTitle, DialogContent,
  DialogActions, Button, TextField, MenuItem
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import api from "../services/api";
import "./ModalCancelarVenta.js";

export default function ModalCancelarVenta({ abierto, onClose, onGuardado }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    api.get("/ventas").then((res) => {
      const ventasActivas = res.data.filter((v) => !v.cancelada);
      setVentas(ventasActivas);
    });
  }, []);

  const onSubmit = async (data) => {
    try {
      data.ventaId = parseInt(data.ventaId);
      await api.post("/cancelaciones", data);
      onGuardado();
      reset();
      onClose();
    } catch (err) {
      alert("Error al cancelar venta");
      console.error(err);
    }
  };

  return (
      <Dialog open={abierto} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle className="modal-title">Cancelar Venta</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent className="modal-content">
          <TextField
            select
            label="Venta"
            fullWidth
            {...register("ventaId", { required: true })}
            error={!!errors.ventaId}
            helperText={errors.ventaId ? "Seleccione una venta" : ""}
            margin="normal"
          >
            {ventas.map((v) => (
              <MenuItem key={v.id} value={v.id}>
                #{v.id} - {v.producto} ({v.sucursal})
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Motivo de cancelacion"
            fullWidth
            {...register("motivo", { required: true })}
            error={!!errors.motivo}
            helperText={errors.motivo ? "Ingrese un motivo" : ""}
            margin="normal"
          />
        </DialogContent>
        <DialogActions className="modal-actions">
          <Button onClick={onClose} variant="outlined">Cancelar</Button>
          <Button type="submit" variant="contained" color="primary">Confirmar</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}