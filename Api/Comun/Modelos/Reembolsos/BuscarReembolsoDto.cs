namespace Api.Comun.Modelos.Reembolsos;

public class BuscarReembolsoDto
{
    public int Id { get; set; }
    public string Slug { get; set; } = string.Empty;
    public int VentaId { get; set; }
    public decimal Monto { get; set; }
    public string Motivo { get; set; } = string.Empty;
    public DateTime FechaReembolso { get; set; }
}