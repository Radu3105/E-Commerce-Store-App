using ECommerceStoreApp.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerceStoreApp.DataAccess.Abstractions
{
    public interface IGenericRepository<T> where T : GenericModel
    {
        Task<T> GetByIdAsync(Guid id);
        Task<IEnumerable<T>> GetAllAsync();
        Task<T> AddAsync(T entity);
        Task<IEnumerable<T>> AddRangeAsync(IEnumerable<T> entities);
        Task<T> UpdateAsync(T entity);
        Task RemoveByIdAsync(Guid id);
        Task RemoveAllAsync();
    }
}
