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

        // Ignorar relación con Proveedor - la BD no tiene esta columna
        constructor.Ignore(p => p.ProveedorId);
        constructor.Ignore(p => p.Proveedor);
    }
}