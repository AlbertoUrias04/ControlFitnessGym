using System.Text.Json.Serialization;

namespace Api.Entidades;

public class Reembolso
{
    public int Id { get; set; }
    public string Slug { get; set; } = string.Empty;
    public decimal Monto { get; set; }
    public string Motivo { get; set; } = string.Empty;
    public DateTime FechaReembolso { get; set; }

    public int VentaId { get; set; }
    [JsonIgnore]
    public virtual Venta Venta { get; set; } = null!;
}