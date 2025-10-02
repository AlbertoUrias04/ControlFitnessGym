using Api.Comun.Interfaces;
using Api.Comun.Modelos.Proveedores;
using Api.Entidades;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers;

[Authorize]
[Route("proveedores")]
public class ProveedoresController : ControllerBase
{
    private readonly IAplicacionBdContexto _contexto;

    public ProveedoresController(IAplicacionBdContexto contexto)
    {
        _contexto = contexto;
    }

    [HttpGet]
    public async Task<List<BuscarProveedorDto>> ObtenerProveedores(string nombre, bool habilitado)
    {
        var query = _contexto.Proveedores.AsQueryable();

        if (habilitado != null)
        {
            query = query.Where(x => x.Habilitado == habilitado);
        }

        if (!string.IsNullOrEmpty(nombre))
        {
            query = query.Where(p => p.Nombre.Contains(nombre));
        }

        var lista = await query.ToListAsync();

        return lista.Select(p => new BuscarProveedorDto
        {
            Nombre = p.Nombre,
            Telefono = p.Telefono,
            Email = p.Email,
            Slug = p.Slug,
            Habilitado = p.Habilitado
        }).ToList();
    }

    [HttpGet("{slug}")]
    public async Task<BuscarProveedorDto> ObtenerProveedor(string slug, CancellationToken ct)
    {
        var proveedor = await _contexto.Proveedores.FirstOrDefaultAsync(p => p.Slug == slug, ct);

        if (proveedor == null)
            return new BuscarProveedorDto();

        return new BuscarProveedorDto
        {
            Nombre = proveedor.Nombre,
            Telefono = proveedor.Telefono,
            Email = proveedor.Email,
            Slug = proveedor.Slug,
            Habilitado = proveedor.Habilitado
        };
    }

    [HttpPost]
    public async Task<string> RegistrarProveedor([FromBody] CrearProveedorDto dto, CancellationToken ct)
    {
        var nuevo = new Proveedor
        {
            Nombre = dto.Nombre,
            Telefono = dto.Telefono,
            Email = dto.Email,
            Habilitado = dto.Habilitado
        };

        await _contexto.Proveedores.AddAsync(nuevo, ct);
        await _contexto.SaveChangesAsync(ct);

        return nuevo.Slug;
    }

    [HttpPut("{slug}")]
    public async Task<BuscarProveedorDto> ModificarProveedor([FromBody] ModificarProveedorDto dto, CancellationToken ct)
    {
        var proveedor = await _contexto.Proveedores.FirstOrDefaultAsync(x => x.Slug == dto.Slug, ct);

        if (proveedor == null)
            return new BuscarProveedorDto();

        proveedor.Nombre = dto.Nombre;
        proveedor.Telefono = dto.Telefono;
        proveedor.Email = dto.Email;
        proveedor.Habilitado = dto.Habilitado;

        await _contexto.SaveChangesAsync(ct);

        return new BuscarProveedorDto
        {
            Nombre = proveedor.Nombre,
            Telefono = proveedor.Telefono,
            Email = proveedor.Email,
            Slug = proveedor.Slug,
            Habilitado = proveedor.Habilitado
        };
    }

    [HttpPatch("{slug}")]
    public async Task<bool> CambiarHabilitado([FromBody] HabilitadoProveedorDto dto, CancellationToken ct)
    {
        var entidad = await _contexto.Proveedores.FirstOrDefaultAsync(x => x.Slug == dto.Slug, ct);

        if (entidad == null)
            return false;

        entidad.Habilitado = dto.Habilitado;
        await _contexto.SaveChangesAsync(ct);

        return true;
    }
}