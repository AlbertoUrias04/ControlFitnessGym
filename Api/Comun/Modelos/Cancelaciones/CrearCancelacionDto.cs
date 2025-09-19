namespace Api.Comun.Modelos.Cancelaciones;

public class CrearCancelacionDto
{
    public int VentaId { get; set; }
    public string Motivo { get; set; } = string.Empty;
}