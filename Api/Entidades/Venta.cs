using Api.Comun.Interfaces;
using System.Text.Json.Serialization;

namespace Api.Entidades;

public class Venta : ISlug
{
    public int Id { get; set; }
    public string Slug { get; set; } = string.Empty;
    public int ProductoId { get; set; }
    public int Cantidad { get; set; }
    public decimal PrecioUnitario { get; set; }
    public decimal Total { get; set; }
    public DateTime FechaVenta { get; set; }

    [JsonIgnore]
    public virtual Producto Producto { get; set; } = null!;

    public virtual Cancelacion? Cancelacion { get; set; }

    public string ObtenerDescripcionParaSlug() => $"venta-{Id}";
}