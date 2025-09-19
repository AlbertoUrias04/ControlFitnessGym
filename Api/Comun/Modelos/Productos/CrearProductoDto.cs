namespace Api.Comun.Modelos.Productos;

public class CrearProductoDto
{
    public string Nombre { get; set; } = string.Empty;
    public decimal Precio { get; set; }
    public int Stock { get; set; }
    public string NombreProveedor { get; set; }
    public bool Habilitado { get; set; }
}