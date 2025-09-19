namespace Api.Comun.Modelos;

public class ReclamosTokenIdentidad
{
    public long FechaTicks { get; set; }
    public bool EsPersistente { get; set; }
    public string EstampaSeguridad { get; set; } = string.Empty;

    public DateTime Fecha
    {
        get
        {
            return new DateTime(FechaTicks);
        }
    }

}