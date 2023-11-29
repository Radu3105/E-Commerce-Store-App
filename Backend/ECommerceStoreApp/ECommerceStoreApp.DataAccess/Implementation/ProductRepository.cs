using ECommerceStoreApp.DataAccess.Context;
using ECommerceStoreApp.Domain.Abstractions;
using ECommerceStoreApp.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerceStoreApp.DataAccess.Implementation
{
    public class ProductRepository : GenericRepository<Product>, IProductRepository
    {
        public ProductRepository(ECommerceStoreAppContext dbContext) : base(dbContext)
        {
        }

        public override async Task<Product> GetByIdAsync(Guid id)
        {
            // Include the Variants in the query
            return await DbContext.Products.Include(p => p.Variants)
                                           .SingleOrDefaultAsync(p => p.Id == id);
        }

        public override async Task<IEnumerable<Product>> GetAllAsync()
        {
            // Include the Variants in the query
            return await DbContext.Products.Include(p => p.Variants).ToListAsync();
        }
    }
}
