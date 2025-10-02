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

        constructor.Ignore(p => p.Telefono);
        constructor.Ignore(p => p.Email);
        constructor.Ignore(p => p.Productos);
    }
}