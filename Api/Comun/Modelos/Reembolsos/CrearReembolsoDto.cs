namespace Api.Comun.Modelos.Reembolsos;

public class CrearReembolsoDto
{
    public int VentaId { get; set; }
    public decimal Monto { get; set; }
    public string Motivo { get; set; } = string.Empty;
    public DateTime FechaReembolso { get; set; }
}