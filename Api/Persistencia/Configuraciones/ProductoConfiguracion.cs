using Api.Entidades;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace Api.Persistencia.Configuraciones;

public class ProductoConfiguracion : IEntityTypeConfiguration<Producto>
{
    public void Configure(EntityTypeBuilder<Producto> constructor)
    {
        constructor.HasKey(p => p.Id);

        constructor.Property(p => p.Nombre)
            .IsRequired()
            .HasMaxLength(100);

        constructor.Property(p => p.Precio)
            .HasColumnType("decimal(18,2)");

        constructor.Property(p => p.Stock)
            .IsRequired();

        constructor.HasOne(p => p.Proveedor)
            .WithMany(p => p.Productos)
            .HasForeignKey(p => p.ProveedorId);
    }
}