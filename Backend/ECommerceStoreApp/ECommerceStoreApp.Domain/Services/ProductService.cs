using ECommerceStoreApp.Domain.Abstractions;
using ECommerceStoreApp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerceStoreApp.Domain.Services
{
    public class ProductService : GenericService
    {
        public ProductService(IUnitOfWork unitOfWork) : base(unitOfWork)
        {
        }

        public async Task<IEnumerable<Product>> GetAllProductsAsync()
        {
            return await UnitOfWork.ProductRepository.GetAllAsync();
        }

        public async Task<Product> AddProductAsync(Product product)
        {
            return await UnitOfWork.ProductRepository.AddAsync(product);
        }
    }
}
