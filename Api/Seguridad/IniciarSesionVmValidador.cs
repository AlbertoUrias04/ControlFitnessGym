using FluentValidation;
namespace Api.Seguridad;

public class IniciarSesionVmValidador : AbstractValidator<IniciarSesionVm>
{
    public IniciarSesionVmValidador()
    {
        RuleFor(i => i.UsuarioNombre)
            .NotEmpty();

        RuleFor(i => i.Contrasena)
            .NotEmpty();
    }
}