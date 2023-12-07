using ECommerceStoreApp.DataAccess.Abstractions;
using ECommerceStoreApp.DataAccess.Context;
using ECommerceStoreApp.DataAccess.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerceStoreApp.DataAccess
{
    public class UnitOfWork : IUnitOfWork, IDisposable
    {
        private readonly ECommerceStoreAppContext _context;

        private IProductRepository _productRepository;
        private IProductVariantRepository _productVariantRepository;

        public UnitOfWork(ECommerceStoreAppContext context)
        {
            _context = context;
        }

        public IProductRepository ProductRepository => _productRepository ??= new ProductRepository(_context);
        public IProductVariantRepository ProductVariantRepository => _productVariantRepository ??= new ProductVariantRepository(_context);

        public async Task SaveAsync(CancellationToken cancellationToken = default)
        {
            await _context.SaveChangesAsync(cancellationToken);
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
