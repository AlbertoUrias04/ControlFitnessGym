using Api.Entidades;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;


namespace Api.Persistencia.Configuraciones;

public class VentaConfiguracion : IEntityTypeConfiguration<Venta>
{
    public void Configure(EntityTypeBuilder<Venta> constructor)
    {
        constructor.HasKey(v => v.Id);

        constructor.Property(v => v.Fecha).IsRequired();
        constructor.Property(v => v.Cantidad).IsRequired();
        constructor.Property(v => v.Total)
            .IsRequired()
            .HasColumnType("decimal(18,2)");

        constructor.HasOne(v => v.Producto)
            .WithMany(p => p.Ventas)
            .HasForeignKey(v => v.ProductoId);

        constructor.HasOne(v => v.Sucursal)
            .WithMany(s => s.Ventas)
            .HasForeignKey(v => v.SucursalId);
    }
}