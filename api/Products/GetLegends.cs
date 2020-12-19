using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace mobilemancer.DroidWorx.Products
{
  public static class GetLegends
  {
    [FunctionName(nameof(GetLegends))]
    public static async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "products/legends")] HttpRequest req,
        ExecutionContext context,
        ILogger log)
    {
      log.LogInformation($"{nameof(GetLegends)} function processed a request.");
      var legends = await File.ReadAllTextAsync(Path.Combine(context.FunctionAppDirectory, "data", "legends.json"));
      return new OkObjectResult(legends);
    }
  }
}
