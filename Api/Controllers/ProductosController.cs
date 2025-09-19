using Api.Comun.Interfaces;
using Api.Comun.Modelos.Productos;
using Api.Entidades;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers;

[Route("productos")]
public class ProductosController : ControllerBase
{
    private readonly IAplicacionBdContexto _contexto;

    public ProductosController(IAplicacionBdContexto contexto)
    {
        _contexto = contexto;
    }

    [HttpGet]
    public async Task<List<BuscarProductoDto>> ObtenerProductos(string nombre, bool habilitado)
    {
        var query = _contexto.Productos.AsQueryable();

        if (habilitado != null)
        {
            query = query.Where(x => x.Habilitado == habilitado);
        }

        if (!string.IsNullOrEmpty(nombre))
        {
            query = query.Where(p => p.Nombre.Contains(nombre));
        }

        var lista = await query.ToListAsync();

        return lista.Select(p => new BuscarProductoDto
        {
            Id = p.Id,
            Nombre = p.Nombre,
            Precio = p.Precio,
            Stock = p.Stock,
            Slug = p.Slug,
            Habilitado = p.Habilitado,
            NombreProveedor = p.Proveedor?.Nombre ?? ""
        }).ToList();
    }

    [HttpGet("{slug}")]
    public async Task<BuscarProductoDto> ObtenerProducto(string slug, CancellationToken ct)
    {
        var producto = await _contexto.Productos
            .Include(p => p.Proveedor)
            .FirstOrDefaultAsync(p => p.Slug == slug, ct);

        if (producto == null)
            return new BuscarProductoDto();

        return new BuscarProductoDto
        {
            Id = producto.Id,
            Nombre = producto.Nombre,
            Precio = producto.Precio,
            Stock = producto.Stock,
            Slug = producto.Slug,
            Habilitado = producto.Habilitado,
            NombreProveedor = producto.Proveedor?.Nombre ?? ""
        };
    }

    [HttpPost]
    public async Task<IActionResult> RegistrarProducto([FromBody] CrearProductoDto dto, CancellationToken ct)
    {
        var proveedor = await _contexto.Proveedores.FirstOrDefaultAsync(p => p.Nombre == dto.NombreProveedor, ct);
        if (proveedor == null)
        {
            return BadRequest($"No se encontró proveedor con nombre '{dto.NombreProveedor}'");
        }

        var nuevo = new Producto
        {
            Nombre = dto.Nombre,
            Precio = dto.Precio,
            Stock = dto.Stock,
            ProveedorId = proveedor.Id,
            Habilitado = dto.Habilitado
        };

        await _contexto.Productos.AddAsync(nuevo, ct);
        await _contexto.SaveChangesAsync(ct);

        return Ok(nuevo.Slug);
    }

    [HttpPut("{slug}")]
    public async Task<BuscarProductoDto> ModificarProducto([FromBody] ModificarProductoDto dto, CancellationToken ct)
    {
        var producto = await _contexto.Productos
        .FirstOrDefaultAsync(x => x.Slug == dto.Slug, ct);

        if (producto == null)
            return new BuscarProductoDto();

        
        var proveedor = await _contexto.Proveedores
            .FirstOrDefaultAsync(p => p.Nombre == dto.NombreProveedor, ct);
        if (proveedor == null)
            throw new Exception($"No se encontró proveedor con nombre '{dto.NombreProveedor}'");

       
        producto.Nombre = dto.Nombre;
        producto.Precio = dto.Precio;
        producto.Stock = dto.Stock;
        producto.ProveedorId = proveedor.Id; 
        producto.Habilitado = dto.Habilitado;

        await _contexto.SaveChangesAsync(ct);

        return new BuscarProductoDto
        {
            Id = producto.Id,
            Nombre = producto.Nombre,
            Precio = producto.Precio,
            Stock = producto.Stock,
            Slug = producto.Slug,
            Habilitado = producto.Habilitado,
            NombreProveedor = proveedor.Nombre // lo devolvemos por si lo necesitas en frontend
        };
    }

    [HttpPatch("{slug}")]
    public async Task<IActionResult> CambiarHabilitado(string slug, [FromBody] HabilitadoProductoDto dto, CancellationToken ct)
    {
        var entidad = await _contexto.Productos.FirstOrDefaultAsync(x => x.Slug == slug, ct);

        if (entidad == null)
            return NotFound();

        entidad.Habilitado = dto.Habilitado;
        await _contexto.SaveChangesAsync(ct);

        return Ok();
    }
}