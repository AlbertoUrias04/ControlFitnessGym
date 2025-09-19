using System.ComponentModel.DataAnnotations;

namespace Api.Comun.Modelos.Usuarios;

public class CrearUsuarioDto
{
    [Required] 
    public string Nombre { get; set; } = string.Empty;

    [Required]
    public string ApellidoPaterno { get; set; } = string.Empty;

    [Required]
    public string ApellidoMaterno { get; set; } = string.Empty;

    [Required]
    public string NombreUsuario { get; set; } = string.Empty;

    [Required]
    public string Contraseña { get; set; } = string.Empty;

    [Required]
    public bool Habilitado { get; set; }
}