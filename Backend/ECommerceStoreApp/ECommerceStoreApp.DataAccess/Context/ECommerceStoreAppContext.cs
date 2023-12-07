using ECommerceStoreApp.DataAccess.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerceStoreApp.DataAccess.Context
{
    public class ECommerceStoreAppContext : IdentityDbContext<ApplicationUser, IdentityRole<Guid>, Guid>
    {
        public ECommerceStoreAppContext(DbContextOptions<ECommerceStoreAppContext> options)
        : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<ProductVariant> ProductVariants { get; set; }
    }
}
