namespace Api.Comun.Modelos.Proveedores;

public class CrearProveedorDto
{
    public string Nombre { get; set; } = string.Empty;
    public string Telefono { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public bool Habilitado { get; set; }
}