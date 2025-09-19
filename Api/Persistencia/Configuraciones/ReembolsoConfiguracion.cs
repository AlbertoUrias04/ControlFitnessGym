using Api.Entidades;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace Api.Persistencia.Configuraciones;

public class ReembolsoConfiguracion : IEntityTypeConfiguration<Reembolso>
{
    public void Configure(EntityTypeBuilder<Reembolso> constructor)
    {
        constructor.HasKey(r => r.Id);

        constructor.Property(r => r.Monto)
            .HasColumnType("decimal(18,2)")
            .IsRequired();

        constructor.Property(r => r.Fecha)
            .IsRequired();

        constructor.HasOne(r => r.Sucursal)
            .WithMany(s => s.Reembolsos)
            .HasForeignKey(r => r.SucursalId);
    }
}