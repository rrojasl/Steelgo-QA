using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace SecurityManager
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "SecurityManagerApi",
                routeTemplate: "securitymanager/{controller}/api/{parameter}/{user}/{token}",
                defaults: new {
                    user = RouteParameter.Optional,
                    token = RouteParameter.Optional,
                    parameter = RouteParameter.Optional
                }
            );
        }
    }
}
