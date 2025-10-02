using Api.Comun.Interfaces;

namespace Api.Entidades;

public class Cancelacion : ISlug
{
    public int Id { get; set; }
    public string Slug { get; set; } = string.Empty;
    public int VentaId { get; set; }
    public string? Motivo { get; set; }
    public DateTime FechaCancelacion { get; set; }

    public virtual Venta Venta { get; set; } = null!;

    public string ObtenerDescripcionParaSlug() => $"cancelacion-{Id}";
}