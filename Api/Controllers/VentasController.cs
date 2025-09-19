using Api.Comun.Interfaces;
using Api.Comun.Modelos.Ventas;
using Api.Entidades;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers;

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
            .Include(v => v.Sucursal)
            .Include(v => v.Usuario)
            .ToListAsync();

        return ventas.Select(v => new BuscarVentaDto
        {
            
            Id = v.Id,
            UsuarioId = v.UsuarioId,
            NombreUsuario = v.Usuario.Nombre,
            Fecha = v.Fecha,
            Cantidad = v.Cantidad,
            Total = v.Total,
            Producto = v.Producto?.Nombre ?? "",
            Sucursal = v.Sucursal?.Nombre ?? "",
            Cancelada = v.Cancelada
        }).ToList();
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<BuscarVentaDto>> ObtenerVenta(int id, CancellationToken ct)
    {
        var venta = await _contexto.Ventas
            .Include(v => v.Producto)
            .Include(v => v.Sucursal)
            .FirstOrDefaultAsync(v => v.Id == id, ct);

        if (venta == null)
            return NotFound();

        return new BuscarVentaDto
        {
            UsuarioId = venta.UsuarioId,
            ProductoId = venta.ProductoId,
            Id = venta.Id,
            Fecha = venta.Fecha,
            Cantidad = venta.Cantidad,
            Total = venta.Total,
            Producto = venta.Producto?.Nombre ?? "",
            Sucursal = venta.Sucursal?.Nombre ?? "",
            Cancelada = venta.Cancelada
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

        var sucursal = await _contexto.Sucursales.FirstOrDefaultAsync(s => s.Nombre == dto.NombreSucursal, ct);
        if (sucursal == null)
            return BadRequest("Sucursal no encontrada");

        var usuario = await _contexto.Usuarios.FindAsync(dto.UsuarioId);
        if (usuario == null)
            return BadRequest("Usuario no encontrado");

        producto.Stock -= dto.Cantidad;

        var venta = new Venta
        {
            UsuarioId = dto.UsuarioId,
            ProductoId = dto.ProductoId,
            SucursalId = sucursal.Id,
            Cantidad = dto.Cantidad,
            Fecha = DateTime.UtcNow,
            Total = producto.Precio * dto.Cantidad,
            Cancelada = false
        };

        await _contexto.Ventas.AddAsync(venta, ct);
        await _contexto.SaveChangesAsync(ct);

        return Ok(venta);
    }
}