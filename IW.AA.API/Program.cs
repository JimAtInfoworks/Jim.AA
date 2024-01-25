using IW.AA.API.Extensions;
using IW.AA.Infrastructure;
using IW.AA.Application;
using IW.AA.API.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
const string CORS_POLICY_NAME = "CorsPolicy";
builder.Services.ConfigureCors(CORS_POLICY_NAME);

builder.Services.AddApplicationServices();
builder.Services.AddInfrastructureServices(builder.Configuration);

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(CORS_POLICY_NAME);

app.UseAuthorization();

// global error handler
app.UseMiddleware<ErrorHandlerMiddleware>();

app.MapControllers();

app.Run();
