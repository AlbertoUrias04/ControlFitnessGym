using System.ComponentModel.DataAnnotations;

namespace Api.Comun.Modelos.Sucursales;

public class CrearSucursalDto
{
    [Required]
    public string Nombre { get; set; } = string.Empty;

    [Required]
    public string Direccion { get; set; } = string.Empty;

    [Required]
    public string Telefono { get; set; } = string.Empty;

    [Required]
    public bool Habilitado { get; set; } = true;
}