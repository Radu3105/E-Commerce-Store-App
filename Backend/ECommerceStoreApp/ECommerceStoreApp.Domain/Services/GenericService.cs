using ECommerceStoreApp.Domain.Abstractions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerceStoreApp.Domain.Services
{
    public class GenericService
    {
        protected IUnitOfWork UnitOfWork;

        public GenericService(IUnitOfWork unitOfWork)
        {
            UnitOfWork = unitOfWork;
        }

        public async Task SaveAsync(CancellationToken cancellationToken = default)
        {
            await UnitOfWork.SaveAsync(cancellationToken);
        }
    }
}
