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
    public class GetLegends
    {
        private readonly ICosmosDbRepository<Legend> _cosmosDbRepository;

        public GetLegends(ICosmosDbRepository<Legend> cosmosDbRepository)
        {
            _cosmosDbRepository = cosmosDbRepository;
        }

        [FunctionName(nameof(GetLegends))]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "Legends")] HttpRequest req,
            ILogger log)
        {
            log.LogInformation($"{nameof(GetLegends)} function processed a request.");

            var legends = await _cosmosDbRepository.GetItemsAsync("SELECT * FROM c");
            return new OkObjectResult(legends);
        }
    }
}
