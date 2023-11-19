using ECommerceStoreApp.DataAccess.Context;
using ECommerceStoreApp.Domain.Abstractions;
using ECommerceStoreApp.Domain.Entities;
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
    }
}
