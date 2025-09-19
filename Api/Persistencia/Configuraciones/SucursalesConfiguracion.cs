using Api.Entidades;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.Persistencia.Configuraciones;

public class SucursalConfiguracion : IEntityTypeConfiguration<Sucursal>
{
	public void Configure(EntityTypeBuilder<Sucursal> constructor)
	{
		constructor.HasKey(s => s.Id);

		constructor.Property(s => s.Nombre)
			.IsRequired()
			.HasMaxLength(100);

		constructor.Property(s => s.Direccion)
			.IsRequired()
			.HasMaxLength(200);
	}
}