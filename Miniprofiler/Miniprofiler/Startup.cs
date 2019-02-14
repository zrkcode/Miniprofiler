using System;
using System.IO;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MiniprofilerApi.MiniProfierHelp;
using Swashbuckle.AspNetCore.Swagger;

namespace Miniprofiler
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddHttpContextAccessor();

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            //跨域配置
            services.AddCors();

            #region 配置swagger
            services.AddSwaggerGen(options =>
            {
                //配置后可以将本项目的注释添加到SwaggerUI中
                var filePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "MiniprofilerApi.xml");
                options.IncludeXmlComments(filePath);

                options.SwaggerDoc("v1", new Info { Title = "Miniprofiler API" });

                options.DocumentFilter<InjectMiniProfiler>();
            });
            #endregion

            //配置miniprofiler
            services.AddMiniProfiler();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            #region 跨域配置
            app.UseCors(builder =>
            {
                builder
                    .AllowAnyOrigin()
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials()
                    .WithExposedHeaders("X-MiniProfiler-Ids");
            });
            #endregion

            //配置miniprofiler
            app.UseMiniProfiler();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseStaticFiles();

            app.UseHttpsRedirection();
            app.UseMvc();

            #region 配置swagger
            app.UseSwagger();

            app.UseSwaggerUI(options =>
            {
                options.InjectOnCompleteJavaScript("/swagger/ui/Customization.js");
                options.SwaggerEndpoint("/swagger/v1/swagger.json", "Miniprofiler API V1");
                //不展开swagger
                options.DocExpansion("None");
            }); // URL: /swagger
            #endregion
        }
    }
}
