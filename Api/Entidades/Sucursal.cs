using System.ComponentModel.DataAnnotations.Schema;

using Api.Comun.Interfaces;

namespace Api.Entidades;

public class Sucursal : ISlug
{
    [Column("idSucursal")]
    public int Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string Direccion { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public bool Habilitado { get; set; }

    public virtual List<Venta> Ventas { get; set; } = new List<Venta>();
    public virtual List<Reembolso> Reembolsos { get; set; } = new List<Reembolso>();

    public string ObtenerDescripcionParaSlug() => Nombre;
}