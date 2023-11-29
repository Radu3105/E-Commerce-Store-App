using ECommerceStoreApp.DataAccess.Context;
using ECommerceStoreApp.DataAccess.Implementation;
using ECommerceStoreApp.Domain.Abstractions;
using ECommerceStoreApp.Domain.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Add CORS services
builder.Services.AddCors(options =>
{
    options.AddPolicy("MyCorsPolicy", policy =>
    {
        policy.WithOrigins("http://86.123.41.253") // Your front-end application's URL
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Configure Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add Entity Framework Core
builder.Services.AddDbContext<ECommerceStoreAppContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

// Register UnitOfWork
builder.Services.AddTransient<IUnitOfWork, UnitOfWork>();

// Register Services
builder.Services.AddTransient<ProductService>();
builder.Services.AddTransient<ProductVariantService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Use CORS policy
app.UseCors("MyCorsPolicy");

app.UseAuthorization();

app.MapControllers();

app.Run();