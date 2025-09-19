using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Api.Entidades;

public class Venta
{
    [Column("idVenta")]
    public int Id { get; set; }
    public DateTime Fecha { get; set; }
    public int Cantidad { get; set; }
    public decimal Total { get; set; }
    public bool Cancelada { get; set; }

    [Column("idProducto")]
    public int ProductoId { get; set; }
    [JsonIgnore]
    public virtual Producto Producto { get; set; } = null!;

    [Column("idSucursal")]
    public int SucursalId { get; set; }
    [JsonIgnore]
    public virtual Sucursal Sucursal { get; set; } = null!;


    [Column("idUsuario")]
    public int UsuarioId { get; set; }
    [JsonIgnore]
    public virtual Usuario Usuario { get; set; } = null!;

    public virtual Cancelacion? Cancelacion { get; set; }
}