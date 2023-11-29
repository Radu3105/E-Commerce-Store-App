using ECommerceStoreApp.Domain.Abstractions;
using ECommerceStoreApp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerceStoreApp.Domain.Services
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
