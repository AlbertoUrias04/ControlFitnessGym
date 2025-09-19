using Api.Comun.Interfaces;
using Api.Comun.Modelos;
using Api.Seguridad;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

public class InicioSesionController : ControllerBase
{
    private readonly ITokenIdentidadServicio _tokenIdentidadServicio;
    private readonly IdentidadAjuste _identidadAjuste;
    private readonly IUsuariosSesionServicio _usuariosSesionServicio;
    
    public InicioSesionController(ITokenIdentidadServicio tokenIdentidadServicio,
        IUsuariosSesionServicio usuariosSesionServicio, IdentidadAjuste identidadAjuste)
    {
        _identidadAjuste = identidadAjuste;
        _tokenIdentidadServicio = tokenIdentidadServicio;
        _usuariosSesionServicio = usuariosSesionServicio;
    }

    [Route("/login")]
    [HttpPost]
    public async Task<IActionResult> Login([FromBody] IniciarSesionVm iniciarSesionVm,
        CancellationToken cancelacionToken)
    {
        var usuario = await _usuariosSesionServicio.IniciarSesionAsync(iniciarSesionVm, cancelacionToken);

        if (usuario == null)
            return Unauthorized(); // usuario o contraseña incorrectos

        var tokenJwt = _tokenIdentidadServicio.Generar(new ReclamosTokenIdentidad
        {
            EsPersistente = iniciarSesionVm.MantenerSesion,
            EstampaSeguridad = _identidadAjuste.EstampaSeguridad,
            FechaTicks = DateTime.Now.Ticks
        });

        Response.Headers.Add("Authorization", tokenJwt);

        return NoContent();
    }
}
