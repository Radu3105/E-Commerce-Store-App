
using ECommerceStoreApp.DataAccess.Abstractions;

namespace ECommerceStoreApp.Business.Services
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
