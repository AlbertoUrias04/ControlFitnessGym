namespace Api.Comun.Interfaces;

public interface ISlug
{
    public string Slug { get; set; }
    string ObtenerDescripcionParaSlug();
}