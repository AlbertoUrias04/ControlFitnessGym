namespace Api.Comun.Modelos.Ventas;

public class BuscarVentaDto
{
    public int UsuarioId { get; set; }
    public string NombreUsuario { get; set; } = string.Empty;
    public int ProductoId { get; set; }
    public int Id { get; set; }
    public DateTime Fecha { get; set; }
    public int Cantidad { get; set; }
    public decimal Total { get; set; }
    public string Producto { get; set; } = string.Empty;
    public string Sucursal { get; set; } = string.Empty;
    public bool Cancelada { get; set; }
}