using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using NotLastPass.Data;

[assembly: HostingStartup(typeof(NotLastPass.Areas.Identity.IdentityHostingStartup))]
namespace NotLastPass.Areas.Identity
{
    public class IdentityHostingStartup : IHostingStartup
    {
        public void Configure(IWebHostBuilder builder)
        {
            builder.ConfigureServices((context, services) => {
                services.AddDbContext<NotLastPassContext>(options =>
                    options.UseSqlServer(
                        context.Configuration.GetConnectionString("NotLastPassContextConnection")));
            });
        }
    }
}