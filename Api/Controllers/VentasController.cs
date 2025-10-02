using Api.Comun.Interfaces;
using Api.Comun.Modelos.Ventas;
using Api.Entidades;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers;

[Authorize]
[Route("ventas")]
public class VentasController : ControllerBase
{
    private readonly IAplicacionBdContexto _contexto;

    public VentasController(IAplicacionBdContexto contexto)
    {
        _contexto = contexto;
    }

    [HttpGet]
    public async Task<List<BuscarVentaDto>> ObtenerVentas()
    {
        var ventas = await _contexto.Ventas
            .Include(v => v.Producto)
            .ToListAsync();

        return ventas.Select(v => new BuscarVentaDto
        {

            Id = v.Id,
            UsuarioId = 0, // No disponible
            NombreUsuario = "",
            Fecha = v.FechaVenta,
            Cantidad = v.Cantidad,
            Total = v.Total,
            Producto = v.Producto?.Nombre ?? "",
            Sucursal = "",
            Cancelada = false
        }).ToList();
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<BuscarVentaDto>> ObtenerVenta(int id, CancellationToken ct)
    {
        var venta = await _contexto.Ventas
            .Include(v => v.Producto)
            .FirstOrDefaultAsync(v => v.Id == id, ct);

        if (venta == null)
            return NotFound();

        return new BuscarVentaDto
        {
            UsuarioId = 0,
            ProductoId = venta.ProductoId,
            Id = venta.Id,
            Fecha = venta.FechaVenta,
            Cantidad = venta.Cantidad,
            Total = venta.Total,
            Producto = venta.Producto?.Nombre ?? "",
            Sucursal = "",
            Cancelada = false
        };
    }

    [HttpPost]
    public async Task<IActionResult> RegistrarVenta([FromBody] CrearVentaDto dto, CancellationToken ct)
    {

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var producto = await _contexto.Productos.FindAsync(new object[] { dto.ProductoId }, ct);
        if (producto == null || producto.Stock < dto.Cantidad)
            return BadRequest("Producto no encontrado");

        producto.Stock -= dto.Cantidad;

        var venta = new Venta
        {
            ProductoId = dto.ProductoId,
            Cantidad = dto.Cantidad,
            PrecioUnitario = producto.Precio,
            FechaVenta = DateTime.UtcNow,
            Total = producto.Precio * dto.Cantidad
        };

        await _contexto.Ventas.AddAsync(venta, ct);
        await _contexto.SaveChangesAsync(ct);

        return Ok(venta);
    }
}