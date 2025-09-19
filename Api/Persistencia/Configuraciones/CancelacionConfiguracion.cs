using Api.Entidades;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.Persistencia.Configuraciones;

public class CancelacionConfiguracion : IEntityTypeConfiguration<Cancelacion>
{
    public void Configure(EntityTypeBuilder<Cancelacion> constructor)
    {
        constructor.HasKey(c => c.Id);

        constructor.Property(c => c.Motivo)
            .IsRequired()
            .HasMaxLength(500);

        constructor.HasOne(c => c.Venta)
            .WithOne(v => v.Cancelacion)
            .HasForeignKey<Cancelacion>(c => c.VentaId);
    }
}