using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace mobilemancer.DroidWorx.Products
{
  public static class GetProductRecommendations
  {
    [FunctionName(nameof(GetProductRecommendations))]
    public static async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "product/recommendation")] HttpRequest req,
        ExecutionContext context,
        ILogger log)
    {
      log.LogInformation($"{nameof(GetProductRecommendations)} function processed a request.");
      var recommendations = await File.ReadAllTextAsync(Path.Combine(context.FunctionAppDirectory, "data", "product-recommendations.json"));
      return new OkObjectResult(recommendations);
    }
  }
}
