using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using Newtonsoft.Json.Linq;
using System.Text;

namespace NotLastPass.Controllers
{

    [Authorize]
    public class DataController : Controller
    {
        static HttpClient client = new HttpClient();
        // GET: DataController
        public ActionResult Index()
        {
            return View((object)"Hello data");
        }

        static async Task<JsonResult> CreateNewUserAsync(IdentityUser user)
        {
            var user_json = "\"id\": "+user.Id+"";

            var httpContext = new StringContent(user_json, Encoding.UTF8, "application/json");

            HttpResponseMessage response = await client.PostAsync(
                "http://localhost:5000/NewUser", httpContext
                );
            response.EnsureSuccessStatusCode();

            // return URI of the created resource.
            return new JsonResult(response.Content);
        }

        // GET: DataController/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: DataController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: DataController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: DataController/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: DataController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: DataController/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: DataController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}
