using Api.Comun.Interfaces;
using Api.Comun.Modelos.Socios;
using Api.Comun.Utilidades;
using Api.Entidades;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers;

[Authorize]
[Route("socios")]
public class SociosController : ControllerBase
{
    private readonly IAplicacionBdContexto _contexto;

    public SociosController(IAplicacionBdContexto contexto)
    {
        _contexto = contexto;
    }

    [HttpGet]
    public async Task<List<BuscarSocioDto>> ObtenerSocios(string? nombre, bool? habilitado, int? sucursalId)
    {
        var query = _contexto.Socios
            .Include(s => s.Sucursal)
            .Include(s => s.SocioMembresias)
                .ThenInclude(sm => sm.Membresia)
            .AsQueryable();

        if (habilitado.HasValue)
        {
            query = query.Where(x => x.Activo == habilitado.Value);
        }

        if (sucursalId.HasValue)
        {
            query = query.Where(x => x.SucursalId == sucursalId.Value);
        }

        if (string.IsNullOrEmpty(nombre) == false)
        {
            query = query.Where(x => x.Nombre.Contains(nombre) ||
                                     x.ApellidoPaterno.Contains(nombre) ||
                                     x.ApellidoMaterno.Contains(nombre) ||
                                     x.Email.Contains(nombre));
        }

        var lista = await query.ToListAsync();

        return lista.ConvertAll(x => x.ConvertirDto());
    }

    [HttpGet("{slug}")]
    public async Task<BuscarSocioDto> ObtenerSocio(string slug, CancellationToken cancelacionToken)
    {
        var socio = await _contexto.Socios
            .Include(s => s.Sucursal)
            .Include(s => s.SocioMembresias)
                .ThenInclude(sm => sm.Membresia)
            .FirstOrDefaultAsync(x => x.Slug == slug, cancelacionToken);

        if (socio == null)
            return new BuscarSocioDto();

        return socio.ConvertirDto();
    }

    [HttpPost]
    public async Task<string> RegistrarSocio([FromBody] CrearSocioDto socioDto, CancellationToken cancelacionToken)
    {
        var nuevoSocio = new Socio()
        {
            Nombre = socioDto.Nombre,
            ApellidoPaterno = socioDto.ApellidoPaterno,
            ApellidoMaterno = socioDto.ApellidoMaterno,
            Email = socioDto.Email,
            Telefono = socioDto.Telefono,
            FechaNacimiento = socioDto.FechaNacimiento,
            Direccion = socioDto.Direccion,
            Activo = socioDto.Habilitado,
            SucursalId = socioDto.SucursalId
        };

        await _contexto.Socios.AddAsync(nuevoSocio, cancelacionToken);
        await _contexto.SaveChangesAsync(cancelacionToken);

        return nuevoSocio.Slug;
    }

    [HttpPut("{slug}")]
    public async Task<BuscarSocioDto> ModificarSocio([FromBody] ModificarSocioDto socioDto,
        CancellationToken cancelacionToken)
    {
        var socio = await _contexto.Socios
            .Include(s => s.Sucursal)
            .Include(s => s.SocioMembresias)
                .ThenInclude(sm => sm.Membresia)
            .FirstOrDefaultAsync(x => x.Slug == socioDto.Slug, cancelacionToken);

        if (socio == null)
            return new BuscarSocioDto();

        socio.Nombre = socioDto.Nombre;
        socio.ApellidoPaterno = socioDto.ApellidoPaterno;
        socio.ApellidoMaterno = socioDto.ApellidoMaterno;
        socio.Email = socioDto.Email;
        socio.Telefono = socioDto.Telefono;
        socio.FechaNacimiento = socioDto.FechaNacimiento;
        socio.Direccion = socioDto.Direccion;
        socio.Activo = socioDto.Habilitado;
        socio.SucursalId = socioDto.SucursalId;

        await _contexto.SaveChangesAsync(cancelacionToken);

        return socio.ConvertirDto();
    }

    [HttpPatch("{slug}")]
    public async Task<bool> CambiarHabilitado(string slug, [FromBody] HabilitadoSocioDto socioDto,
        CancellationToken cancelacionToken)
    {
        var entidad = await _contexto.Socios.FirstOrDefaultAsync(x => x.Slug == slug, cancelacionToken);

        if (entidad == null)
            return false;

        entidad.Activo = socioDto.Habilitado;

        await _contexto.SaveChangesAsync(cancelacionToken);

        return true;
    }
}
