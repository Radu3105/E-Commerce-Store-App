using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerceStoreApp.DataAccess.Abstractions
{
    public interface IUnitOfWork
    {
        IProductRepository ProductRepository { get; }
        IProductVariantRepository ProductVariantRepository { get; }

        Task SaveAsync(CancellationToken cancellationToken);
    }
}
