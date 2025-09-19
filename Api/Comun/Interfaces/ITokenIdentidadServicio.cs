using System.Security.Claims;
using Api.Comun.Modelos;

namespace Api.Comun.Interfaces;

public interface ITokenIdentidadServicio
{
    string Generar(ReclamosTokenIdentidad reclamos);
    ReclamosTokenIdentidad? ObtenerReclamos(IEnumerable<Claim> reclamos);
    Task<bool> ValidarAsync(ReclamosTokenIdentidad reclamos, CancellationToken cancelacionToken = default);

}