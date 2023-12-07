using ECommerceStoreApp.DataAccess.Models;
using ECommerceStoreApp.DataAccess.Abstractions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerceStoreApp.DataAccess.Abstractions
{
    public interface IProductRepository : IGenericRepository<Product>
    {
    }
}
