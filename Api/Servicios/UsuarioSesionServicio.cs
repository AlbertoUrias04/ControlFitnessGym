using Api.Comun.Interfaces;
using Microsoft.EntityFrameworkCore;
using Api.Comun.Modelos;
using Api.Entidades;
using Api.Seguridad;
using Api.Comun.Modelos.Usuarios;

namespace Api.Servicios;

public class UsuarioSesionServicio : IUsuariosSesionServicio
{
    private readonly IAplicacionBdContexto _contexto;

    public UsuarioSesionServicio(IAplicacionBdContexto contexto)
    {
        _contexto = contexto;
    }

    public async Task<SesionUsuario?> IniciarSesionAsync(IniciarSesionVm inicioSesion, CancellationToken cancelacionToken)
    {
        // Buscar usuario directamente por usuario y contraseña (texto plano)
        var usuario = await _contexto.Usuarios
            .FirstOrDefaultAsync(u =>
                u.NombreUsuario == inicioSesion.UsuarioNombre &&
                u.Contraseña == inicioSesion.Contrasena &&
                u.Habilitado,
                cancelacionToken);

        // Si no lo encontró, regresar null
        if (usuario == null)
            return null;

        // Crear nueva sesión
        var nuevaSesion = new SesionUsuario
        {
            EsPersistente = inicioSesion.MantenerSesion,
            FechaInicio = DateTime.UtcNow,
            UsuarioId = usuario.Id,
            UltimoUso = DateTime.UtcNow,
            Valido = true
        };

        _contexto.SesionesUsuario.Add(nuevaSesion);
        await _contexto.SaveChangesAsync(cancelacionToken); // usa tu método async si lo tienes

        return nuevaSesion;
    }
}