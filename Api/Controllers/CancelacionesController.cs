using Api.Comun.Interfaces;
using Api.Comun.Modelos.Cancelaciones;
using Api.Entidades;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers;

[Route("cancelaciones")]
public class CancelacionesController : ControllerBase
{
    private readonly IAplicacionBdContexto _contexto;

    public CancelacionesController(IAplicacionBdContexto contexto)
    {
        _contexto = contexto;
    }

    [HttpGet]
    public async Task<List<BuscarCancelacionDto>> ObtenerCancelaciones()
    {
        var cancelaciones = await _contexto.Cancelaciones.ToListAsync();

        return cancelaciones.Select(c => new BuscarCancelacionDto
        {
            Id = c.Id,
            Fecha = c.Fecha,
            Motivo = c.Motivo,
            VentaId = c.VentaId
        }).ToList();
    }

    [HttpPost]
    public async Task<int> CancelarVenta([FromBody] CrearCancelacionDto dto, CancellationToken ct)
    {
        var venta = await _contexto.Ventas
            .Include(v => v.Cancelacion)
            .FirstOrDefaultAsync(v => v.Id == dto.VentaId, ct);

        if (venta == null || venta.Cancelada)
            return -1;

        if (venta.Cancelacion != null)
            return venta.Cancelacion.Id;

        venta.Cancelada = true;

        var cancelacion = new Cancelacion
        {
            VentaId = dto.VentaId,
            Fecha = DateTime.UtcNow,
            Motivo = dto.Motivo
        };

        await _contexto.Cancelaciones.AddAsync(cancelacion, ct);
        await _contexto.SaveChangesAsync(ct);

        return cancelacion.Id;
    }
}