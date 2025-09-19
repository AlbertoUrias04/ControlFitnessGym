using System.ComponentModel.DataAnnotations.Schema;
using Api.Comun.Interfaces;

namespace Api.Entidades
{



    public class Usuario : ISlug
    {
        [Column("idUsuario")]
        public int Id { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public string ApellidoPaterno { get; set; } = string.Empty;
        public string ApellidoMaterno { get; set; } = string.Empty;
        public string NombreUsuario { get; set; } = string.Empty;
        public string Contraseña { get; set; } = string.Empty;
        public bool Habilitado { get; set; }
        public string Slug { get; set; } = string.Empty;
        public virtual List<SesionUsuario> Sesiones { get; set; } = new List<SesionUsuario>();

        public string ObtenerDescripcionParaSlug()
        {
        return $"{NombreUsuario}";
        }
    }
}

