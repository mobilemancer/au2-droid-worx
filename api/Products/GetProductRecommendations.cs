using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using mobilemancer.DroidWorx.Repositories;

namespace mobilemancer.DroidWorx.Products
{
    public class GetProductRecommendations
    {
        private readonly ICosmosDbRepository<ProductRecommendation> _cosmosDbRepository;

        public GetProductRecommendations(ICosmosDbRepository<ProductRecommendation> cosmosDbRepository)
        {
            _cosmosDbRepository = cosmosDbRepository;
        }

        [FunctionName(nameof(GetProductRecommendations))]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "ProductRecommendations")] HttpRequest req,
            ILogger log)
        {
            log.LogInformation($"{nameof(GetProductRecommendations)} function processed a request.");

            var recommendations = await _cosmosDbRepository.GetItemsAsync("SELECT * FROM c");
            return new OkObjectResult(recommendations);
        }
    }
}
