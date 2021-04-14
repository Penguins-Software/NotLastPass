using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using NotLastPass.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Driver;
using MongoDB.Bson;
using System.Diagnostics;

namespace NotLastPass.Controllers
{
    public class MongoController : Controller
    {

        private readonly ILogger<MongoController> _logger;
        MongoClient dbClient;


        public MongoController(ILogger<MongoController> logger)
        {
            _logger = logger;

            dbClient = new MongoClient("mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false");

            //var dbList = dbClient.ListDatabases().ToList();

            /*Console.WriteLine("The list of databases on this server is: ");
            foreach (var db in dbList)
            {
                Console.WriteLine(db);
            }*/
        }

        // GET: MongoController
        public ActionResult Index()
        {
            return View();
        }

        // GET: MongoController/Details/5
        public JsonResult Details(string id)
        {
            var usersDB = dbClient.GetDatabase(id);
            var passwords = usersDB.GetCollection<BsonDocument>("PasswordCollection");

            return Json(passwords);
        }

        // GET: MongoController/Create
        /*public ActionResult Create()
        {
            return View();
        }*/

        // POST: MongoController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public bool Create(string newUserId)
        {
            try
            {
                var usersDB = dbClient.GetDatabase(newUserId);
                usersDB.CreateCollection("PasswordCollection");
                return true;
            }
            catch
            {
                return false;
            }
        }

        // GET: MongoController/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: MongoController/Edit/5
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

        // GET: MongoController/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: MongoController/Delete/5
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
