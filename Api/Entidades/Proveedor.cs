using Api.Comun.Interfaces;

namespace Api.Entidades;

public class Proveedor : ISlug
{
    public int Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string? Telefono { get; set; }
    public string? Email { get; set; }
    public bool Habilitado { get; set; }
    public string Slug { get; set; } = string.Empty;

    public virtual List<Producto> Productos { get; set; } = new List<Producto>();

    public string ObtenerDescripcionParaSlug() => Nombre;
}
