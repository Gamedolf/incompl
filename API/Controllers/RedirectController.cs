using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class RedirectController : Controller
    {
        [HttpGet("{shortUrl}")]
        public ActionResult RedirectToSite(string shortUrl)
        {
            return Redirect($"https://www.google.co.uk/search?q={shortUrl}");
        }
    }
}