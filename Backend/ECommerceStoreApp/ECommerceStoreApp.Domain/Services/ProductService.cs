using ECommerceStoreApp.Domain.Abstractions;
using ECommerceStoreApp.Domain.Common;
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

        public async Task<PagedResult<Product>> GetPagedProductsAsync(int pageNumber, int pageSize)
        {
            var queryTask = UnitOfWork.ProductRepository.GetAllAsync();

            var query = await queryTask;

            var totalCount = query.ToList().Count();

            var items = query.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();

            return new PagedResult<Product>
            {
                Items = items,
                TotalCount = totalCount,
                PageNumber = pageNumber,
                PageSize = pageSize
            };
        }

        public async Task<Product> GetProductByIdAsync(Guid id)
        {
            return await UnitOfWork.ProductRepository.GetByIdAsync(id);
        }

        public async Task<IEnumerable<Product>> GetAllProductsAsync()
        {
            return await UnitOfWork.ProductRepository.GetAllAsync();
        }

        public async Task<Product> AddProductAsync(Product product)
        {
            return await UnitOfWork.ProductRepository.AddAsync(product);
        }

        public async Task<IEnumerable<Product>> AddProductRangeAsync(IEnumerable<Product> products)
        {
            return await UnitOfWork.ProductRepository.AddRangeAsync(products);
        }

        public async Task RemoveProductByIdAsync(Guid id)
        {
            await UnitOfWork.ProductRepository.RemoveByIdAsync(id);
        }

        public async Task RemoveAllProductsAsync()
        {
            await UnitOfWork.ProductRepository.RemoveAllAsync();
        }
    }
}
