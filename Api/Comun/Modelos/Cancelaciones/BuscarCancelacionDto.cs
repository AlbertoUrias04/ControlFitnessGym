namespace Api.Comun.Modelos.Cancelaciones;

public class BuscarCancelacionDto
{
    public int Id { get; set; }
    public DateTime Fecha { get; set; }
    public string Motivo { get; set; } = string.Empty;
    public int VentaId { get; set; }
}