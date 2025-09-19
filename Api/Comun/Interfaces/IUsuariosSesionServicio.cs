using Api.Entidades;
using Api.Seguridad;

namespace Api.Comun.Interfaces;

public interface IUsuariosSesionServicio
{
    Task<SesionUsuario?> IniciarSesionAsync(IniciarSesionVm usuario, CancellationToken cancelacionToken);
}