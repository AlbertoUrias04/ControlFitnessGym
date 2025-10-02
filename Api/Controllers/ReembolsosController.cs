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
            .Include(r => r.Venta)
            .ToListAsync();

        return reembolsos.Select(r => new BuscarReembolsoDto
        {
            Id = r.Id,
            Slug = r.Slug,
            VentaId = r.VentaId,
            Monto = r.Monto,
            Motivo = r.Motivo,
            FechaReembolso = r.FechaReembolso
        }).ToList();
    }

    [HttpPost]
    public async Task<IActionResult> CrearReembolso([FromBody] CrearReembolsoDto dto, CancellationToken ct)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var venta = await _contexto.Ventas.FindAsync(new object[] { dto.VentaId }, ct);
        if (venta == null)
            return BadRequest("Venta no encontrada");

        var reembolso = new Reembolso
        {
            VentaId = dto.VentaId,
            Monto = dto.Monto,
            Motivo = dto.Motivo,
            FechaReembolso = dto.FechaReembolso,
            Slug = Guid.NewGuid().ToString()
        };

        await _contexto.Reembolsos.AddAsync(reembolso, ct);
        await _contexto.SaveChangesAsync(ct);

        return Ok(reembolso);
    }
}