namespace Api.Comun.Modelos;

public class IdentidadAjuste
{
    public string Secreto { get; init; } = string.Empty;
    public int Expiracion { get; init; }
    public string EstampaSeguridad { get; init; } = string.Empty;
}