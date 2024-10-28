using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Text.Json;

namespace mobilemancer.DroidWorx.Products
{
    public static class GetLegends
    {
        [FunctionName(nameof(GetLegends))]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "Legends")] HttpRequest req,
            ExecutionContext context,
            ILogger log)
        {
            log.LogInformation($"{nameof(GetLegends)} function processed a request.");

            var data = await File.ReadAllTextAsync(Path.Combine(context.FunctionAppDirectory, "data", "legends.json"));
            var legends = JsonSerializer.Deserialize<IEnumerable<Legend>>(data, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
            return new OkObjectResult(legends);
        }
    }
}
