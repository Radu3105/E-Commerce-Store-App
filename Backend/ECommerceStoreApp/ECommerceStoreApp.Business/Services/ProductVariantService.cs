using ECommerceStoreApp.DataAccess.Abstractions;
using ECommerceStoreApp.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerceStoreApp.Business.Services
{
    public class ProductVariantService : GenericService
    {
        public ProductVariantService(IUnitOfWork unitOfWork) : base(unitOfWork)
        {
        }
        
        public async Task<ProductVariant> AddProductVariantAsync(ProductVariant productVariant)
        {
            return await UnitOfWork.ProductVariantRepository.AddAsync(productVariant);
        }
    }
}
