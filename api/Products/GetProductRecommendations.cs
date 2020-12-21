using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;

using System.Collections.Generic;
using System.IO;
using System.Text.Json;
using System.Threading.Tasks;

namespace mobilemancer.DroidWorx.Products
{
  public static class GetProductRecommendations
  {
    [FunctionName(nameof(GetProductRecommendations))]
    public static async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "product/recommendations")] HttpRequest req,
        ExecutionContext context,
        ILogger log)
    {
      log.LogInformation($"{nameof(GetProductRecommendations)} function processed a request.");
      var data = await File.ReadAllTextAsync(Path.Combine(context.FunctionAppDirectory, "data", "product-recommendations.json"));
      var recommendations = JsonSerializer.Deserialize<IEnumerable<ProductRecommendation>>(data, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
      return new OkObjectResult(recommendations);
    }
  }
}
