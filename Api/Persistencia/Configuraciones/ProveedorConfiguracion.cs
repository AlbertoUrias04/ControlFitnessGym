using Api.Entidades;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.Persistencia.Configuraciones;

public class ProveedorConfiguracion : IEntityTypeConfiguration<Proveedor>
{
    public void Configure(EntityTypeBuilder<Proveedor> constructor)
    {
        constructor.HasKey(p => p.Id);

        constructor.Property(p => p.Nombre)
            .IsRequired()
            .HasMaxLength(100);

        constructor.Property(p => p.Telefono)
            .HasMaxLength(20);

        constructor.Property(p => p.Email)
            .HasMaxLength(100);
    }
}