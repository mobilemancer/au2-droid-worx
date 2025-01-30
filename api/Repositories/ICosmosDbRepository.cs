using System.Collections.Generic;
using System.Threading.Tasks;

namespace mobilemancer.DroidWorx.Repositories
{
    public interface ICosmosDbRepository<T> where T : class
    {
        Task AddItemAsync(T item);
        Task DeleteItemAsync(string id);
        Task<T> GetItemAsync(string id);
        Task<IEnumerable<T>> GetItemsAsync(string queryString);
        Task UpdateItemAsync(string id, T item);
    }
}
