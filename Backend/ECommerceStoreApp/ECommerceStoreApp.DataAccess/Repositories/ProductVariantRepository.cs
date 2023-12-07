using ECommerceStoreApp.DataAccess.Abstractions;
using ECommerceStoreApp.DataAccess.Context;
using ECommerceStoreApp.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerceStoreApp.DataAccess.Repositories
{
    public class ProductVariantRepository : GenericRepository<ProductVariant>, IProductVariantRepository
    {
        public ProductVariantRepository(ECommerceStoreAppContext dbContext) : base(dbContext)
        {
        }

        
    }
}
