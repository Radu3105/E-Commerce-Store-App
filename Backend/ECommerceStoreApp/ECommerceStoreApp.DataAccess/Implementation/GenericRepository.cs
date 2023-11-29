using ECommerceStoreApp.DataAccess.Context;
using ECommerceStoreApp.Domain.Abstractions;
using ECommerceStoreApp.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerceStoreApp.DataAccess.Implementation
{
    public abstract class GenericRepository<T> : IGenericRepository<T> where T : GenericEntity
    {
        protected readonly ECommerceStoreAppContext DbContext;

        public GenericRepository(ECommerceStoreAppContext dbContext)
        {
            DbContext = dbContext;
        }

        public virtual async Task<T> GetByIdAsync(Guid id)
        {
            var result = await DbContext.Set<T>().FindAsync(id);
            return result;
        }

        public virtual async Task<IEnumerable<T>> GetAllAsync()
        {
            var result = DbContext.Set<T>().AsEnumerable();
            return result;
        }

        public virtual async Task<T> AddAsync(T entity)
        {
            var addedEntity = await DbContext.Set<T>().AddAsync(entity);
            return addedEntity.Entity;
        }

        public virtual async Task<IEnumerable<T>> AddRangeAsync(IEnumerable<T> entities)
        {
            await DbContext.Set<T>().AddRangeAsync(entities);
            return entities;
        }
        
        public async Task<T> UpdateAsync(T entity)
        {
            var existingEntity = await DbContext.Set<T>().FindAsync(entity.Id);
            if (existingEntity == null)
            {
                throw new KeyNotFoundException("Entity with the specified ID not found.");
            }
            DbContext.Entry(existingEntity).CurrentValues.SetValues(entity);
            return existingEntity;
        }

        public virtual async Task RemoveAsync(Guid id)
        {
            var toRemove = await DbContext.Set<T>()
                .FirstOrDefaultAsync(entity => entity.Id.Equals(id));

            DbContext.Remove(toRemove);
        }

        public virtual async Task RemoveByIdAsync(Guid id)
        {
            var entityToRemove = await DbContext.Set<T>().FindAsync(id);
            if (entityToRemove != null)
            {
                DbContext.Remove(entityToRemove);
            }
        }

        public virtual async Task RemoveAllAsync()
        {
            var entitiesToRemove = await DbContext.Set<T>().ToListAsync();
            if (entitiesToRemove.Count > 0)
            {
                DbContext.RemoveRange(entitiesToRemove);
            }
        }
    }
}
