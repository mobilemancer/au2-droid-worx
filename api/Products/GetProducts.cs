using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.Text.Json;
using System.Collections.Generic;

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

      var data = await File.ReadAllTextAsync(Path.Combine(context.FunctionAppDirectory, "data", "products.json"));
      var products = JsonSerializer.Deserialize<IEnumerable<Droid>>(data, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
      return new OkObjectResult(products);
    }
  }
}
