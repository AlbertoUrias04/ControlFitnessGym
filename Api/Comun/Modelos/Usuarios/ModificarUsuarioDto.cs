using System.ComponentModel.DataAnnotations;

namespace Api.Comun.Modelos.Usuarios;

public class ModificarUsuarioDto
{
    [Required] 
    public string Slug { get; set; } = string.Empty;
    public string Nombre { get; set; } = string.Empty;
    public string ApellidoPaterno { get; set; } = string.Empty;
    public string ApellidoMaterno { get; set; } = string.Empty;
    public string NombreUsuario { get; set; } = string.Empty;
    public string Contraseña { get; set; } = string.Empty;
    public bool Habilitado { get; set; }
    
}