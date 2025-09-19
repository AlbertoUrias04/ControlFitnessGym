namespace Api.Comun.Modelos.Productos;

public class BuscarProductoDto
{
    public int Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public decimal Precio { get; set; }
    public int Stock { get; set; }
    public string Slug { get; set; } = string.Empty;
    public bool Habilitado { get; set; }
    public string NombreProveedor { get; set; } = string.Empty;
}