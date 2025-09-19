namespace Api.Comun.Modelos.Ventas;

public class CrearVentaDto
{
    public int UsuarioId { get; set; }
    public int ProductoId { get; set; }
    public string NombreSucursal { get; set; }
    public int SucursalId { get; set; }
    public int Cantidad { get; set; }
}