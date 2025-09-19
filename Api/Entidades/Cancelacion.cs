using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Entidades;

public class Cancelacion
{
    [Column("idCancelacion")]
    public int Id { get; set; }
    public DateTime Fecha { get; set; }
    public string Motivo { get; set; } = string.Empty;

    [Column("idVenta")]
    public int VentaId { get; set; }
    public virtual Venta Venta { get; set; } = null!;
}