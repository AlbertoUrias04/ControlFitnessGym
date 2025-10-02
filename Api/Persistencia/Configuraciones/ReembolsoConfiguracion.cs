using Api.Entidades;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace Api.Persistencia.Configuraciones;

public class ReembolsoConfiguracion : IEntityTypeConfiguration<Reembolso>
{
    public void Configure(EntityTypeBuilder<Reembolso> constructor)
    {
        constructor.ToTable("Reembolsos");

        constructor.HasKey(r => r.Id);

        constructor.Property(r => r.Slug)
            .IsRequired();

        constructor.Property(r => r.Monto)
            .HasColumnType("decimal(18,2)")
            .IsRequired();

        constructor.Property(r => r.Motivo)
            .IsRequired();

        constructor.Property(r => r.FechaReembolso)
            .IsRequired();

        constructor.HasOne(r => r.Venta)
            .WithMany()
            .HasForeignKey(r => r.VentaId);
    }
}