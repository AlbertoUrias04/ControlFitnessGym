using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Api.Entidades;

public class Reembolso
{
    [Column("idReembolso")]
    public int Id { get; set; }
    public DateTime Fecha { get; set; }
    public decimal Monto { get; set; }

    [Column("idSucursal")]
    public int SucursalId { get; set; }
    [JsonIgnore]
    public virtual Sucursal Sucursal { get; set; } = null!;

    [Column("idProducto")]
    public int ProductoId { get; set; }
    [JsonIgnore]
    public virtual Producto Producto { get; set; } = null!;

    [Column("idUsuario")]
    public int UsuarioId { get; set; }
    [JsonIgnore]
    public virtual Usuario Usuario { get; set; } = null!;
}