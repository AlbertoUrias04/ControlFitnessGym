

namespace Api.Seguridad;

public class IniciarSesionVm
{
    public string UsuarioNombre { get; set; } = string.Empty;
    public string Contrasena { get; set; } = string.Empty;
    public bool MantenerSesion { get; set; }
}