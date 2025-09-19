namespace Api.Comun.Modelos.Reembolsos;

public class BuscarReembolsoDto
{
    public int UsuarioId { get; set; }
    public DateTime Fecha { get; set; }
    public decimal Monto { get; set; }
    public int ProductoId { get; set; }
    public int SucursalId { get; set; }
    public string NombreSucursal { get; set; } = string.Empty;
}