using System.Configuration;
using System.Linq;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Cors;
using System.Web.Http.Cors;

namespace SecurityManager.Api.Filters
{
    public class SteelgoCorsPolicyProvider : ICorsPolicyProvider
    {
        private CorsPolicy _policy;

        public SteelgoCorsPolicyProvider()
        {
            _policy = new CorsPolicy
            {
                AllowAnyHeader = true,
                AllowAnyMethod = true,
                SupportsCredentials = true
            };

            foreach (string origin in ConfigurationManager.AppSettings.OfType<string>()
                .Where(k => k.StartsWith("PolicyOrigin.")))
            {
                _policy.Origins.Add(ConfigurationManager.AppSettings[origin]);
            }
        }

        public Task<CorsPolicy> GetCorsPolicyAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            return Task.FromResult(_policy);
        }
    }

    public class SteelgoCorsPolicyFactory : ICorsPolicyProviderFactory
    {
        ICorsPolicyProvider _provider = new SteelgoCorsPolicyProvider();

        public ICorsPolicyProvider GetCorsPolicyProvider(HttpRequestMessage request)
        {
            return _provider;
        }
    }
}