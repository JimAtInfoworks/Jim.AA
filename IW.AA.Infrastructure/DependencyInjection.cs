using IW.AA.Application.Common.Helpers;
using IW.AA.Application.Interfaces;
using IW.AA.Infrastructure.Data;
using IW.AA.Infrastructure.Repositories;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace IW.AA.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("DefaultConnection");
            Guard.AgainstNull(connectionString, "Connection string 'DefaultConnection' not found.");

            services.AddTransient<IUserRepository, UserRepository>();
            services.AddSingleton(x => new DataContext(connectionString));

            return services;
        }
    }
}
