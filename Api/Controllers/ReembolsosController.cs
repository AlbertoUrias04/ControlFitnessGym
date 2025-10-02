using Api.Comun.Interfaces;
using Api.Comun.Modelos.Reembolsos;
using Api.Entidades;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers;

[Authorize]
[Route("reembolsos")]
public class ReembolsosController : ControllerBase
{
    private readonly IAplicacionBdContexto _contexto;

    public ReembolsosController(IAplicacionBdContexto contexto)
    {
        _contexto = contexto;
    }

    [HttpGet]
    public async Task<List<BuscarReembolsoDto>> ObtenerReembolsos()
    {
        var reembolsos = await _contexto.Reembolsos
            .Include(r => r.Sucursal)
            .ToListAsync();

        return reembolsos.Select(r => new BuscarReembolsoDto
        {
            UsuarioId = r.UsuarioId,
            Fecha = r.Fecha,
            Monto = r.Monto,
            ProductoId = r.ProductoId,
            SucursalId = r.SucursalId,
            NombreSucursal = r.Sucursal?.Nombre ?? ""
        }).ToList();
    }

    [HttpPost]
    public async Task<IActionResult> CrearReembolso([FromBody] CrearReembolsoDto dto, CancellationToken ct)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var producto = await _contexto.Productos.FindAsync(new object[] { dto.ProductoId }, ct);
        if (producto == null)
            return BadRequest("Producto no encontrado");

        var sucursal = await _contexto.Sucursales.FirstOrDefaultAsync(s => s.Nombre == dto.NombreSucursal, ct);
        if (sucursal == null)
            return BadRequest("Sucursal no encontrada");

        var usuario = await _contexto.Usuarios.FindAsync(dto.UsuarioId);
        if (usuario == null)
            return BadRequest("Usuario no encontrado");

        var reembolso = new Reembolso
        {
            UsuarioId = dto.UsuarioId,
            Fecha = DateTime.UtcNow,
            Monto = dto.Monto,
            SucursalId = sucursal.Id,
            ProductoId = dto.ProductoId
        };

        await _contexto.Reembolsos.AddAsync(reembolso, ct);
        await _contexto.SaveChangesAsync(ct);

        return Ok(reembolso);
    }
}