using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using mobilemancer.DroidWorx.Repositories;

namespace mobilemancer.DroidWorx.Products
{
    public class GetProducts
    {
        private readonly ICosmosDbRepository<Droid> _cosmosDbRepository;

        public GetProducts(ICosmosDbRepository<Droid> cosmosDbRepository)
        {
            _cosmosDbRepository = cosmosDbRepository;
        }

        [FunctionName(nameof(GetProducts))]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "Products")] HttpRequest req,
            ILogger log)
        {
            log.LogInformation($"{nameof(GetProducts)} function processed a request.");

            var products = await _cosmosDbRepository.GetItemsAsync("SELECT * FROM c");
            return new OkObjectResult(products);
        }
    }
}
