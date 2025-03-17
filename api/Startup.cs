using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Azure.Cosmos.Fluent;
using Microsoft.Extensions.Configuration;
using mobilemancer.DroidWorx.Repositories;

[assembly: FunctionsStartup(typeof(mobilemancer.DroidWorx.Startup))]

namespace mobilemancer.DroidWorx
{
    public class Startup : FunctionsStartup
    {
        public override void Configure(IFunctionsHostBuilder builder)
        {
            var configuration = builder.GetContext().Configuration;
            string cosmosDbConnectionString = configuration["CosmosDbConnectionString"];
            string databaseName = configuration["DatabaseName"];

            builder.Services.AddSingleton((s) =>
            {
                CosmosClientBuilder clientBuilder = new CosmosClientBuilder(cosmosDbConnectionString);
                return clientBuilder.WithConnectionModeDirect().Build();
            });

            builder.Services.AddSingleton<ICosmosDbRepository<Legend>>(s =>
            {
                var client = s.GetRequiredService<CosmosClient>();
                return new CosmosDbRepository<Legend>(client, databaseName, "Legends");
            });

            builder.Services.AddSingleton<ICosmosDbRepository<ProductRecommendation>>(s =>
            {
                var client = s.GetRequiredService<CosmosClient>();
                return new CosmosDbRepository<ProductRecommendation>(client, databaseName, "ProductRecommendations");
            });

            builder.Services.AddSingleton<ICosmosDbRepository<Droid>>(s =>
            {
                var client = s.GetRequiredService<CosmosClient>();
                return new CosmosDbRepository<Droid>(client, databaseName, "Products");
            });
        }
    }
}
