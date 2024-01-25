using IW.AA.Application.Interfaces;
using IW.AA.Application.Services;
using Microsoft.Extensions.DependencyInjection;

namespace IW.AA.Application
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
            services.AddScoped<IUserService, UserService>();

            return services;
        }
    }
}
