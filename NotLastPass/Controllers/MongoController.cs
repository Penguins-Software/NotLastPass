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
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;

namespace NotLastPass.Controllers
{
    public class MongoController : Controller
    {

        private readonly ILogger<MongoController> _logger;
        private readonly UserManager<IdentityUser> _userManager;


        MongoClient dbClient;
        public MongoController(UserManager<IdentityUser> userManager, ILogger<MongoController> logger)
        {
            _logger = logger;
            _userManager = userManager;

            //TODO: Put connectionString in appsettings.json
            dbClient = new MongoClient("mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false");
        }

        // GET: MongoController/Details/5
        public string Details(string id)
        {
            var usersDB = dbClient.GetDatabase(id);
            var passwords = usersDB.GetCollection<BsonDocument>("PasswordCollection").Find(doc=>doc==doc).ToList();

            return BsonExtensionMethods.ToJson(passwords);
        }

        // GET: MongoController/Create
        /*public ActionResult Create()
        {
            return View();
        }*/

        // Used to create new Database for new users.
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
        public ActionResult Edit(int id, string passDoc)
        {
            try
            {
                if (User?.Identity.IsAuthenticated == true)
                {
                    var usersDB = dbClient.GetDatabase(_userManager.GetUserId(this.User));

                    var passColl = usersDB.GetCollection<Document>("PasswordCollection");

                    passColl.UpdateOne(doc => doc._id == id, passDoc);
                }
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


        public class Document
        {
            /// <summary>Gets or sets the _id.</summary>
            public int _id { get; set; }

            /// <summary>Gets or sets the website.</summary>
            public string website { get; set; }

            /// <summary>Gets or sets username.</summary>
            public string username { get; set; }

            /// <summary>Gets or sets password.</summary>
            public string password { get; set; }
        }

    }
}
