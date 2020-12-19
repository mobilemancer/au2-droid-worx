using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace mobilemancer.DroidWorx.Products
{
  public static class GetProducts
  {
    [FunctionName(nameof(GetProducts))]
    public static async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "product")] HttpRequest req,
        ExecutionContext context,
        ILogger log)
    {
      log.LogInformation($"{nameof(GetProducts)} function processed a request.");
      var products = await File.ReadAllTextAsync(Path.Combine(context.FunctionAppDirectory, "data", "products.json"));
      return new OkObjectResult(products);
    }
  }
}
