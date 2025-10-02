using Api.Comun.Interfaces;

namespace Api.Entidades;

public class Producto : ISlug
{
    public int Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public decimal Precio { get; set; }
    public int Stock { get; set; }
    public bool Habilitado { get; set; }
    public string Slug { get; set; } = string.Empty;

    public int ProveedorId { get; set; }
    public virtual Proveedor Proveedor { get; set; } = null!;

    public virtual List<Venta> Ventas { get; set; } = new List<Venta>();

    public string ObtenerDescripcionParaSlug() => Nombre;
}
