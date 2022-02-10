using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.Sqlite;


namespace API.Controllers
{
    public class RedirectController : Controller
    {
        public string GetData(string shortUrl)
        {
            using (var con = new SqliteConnection("Data Source=incompl.db"))
            {
                con.Open();

                var command = con.CreateCommand();
                command.CommandText =
                @"
                    SELECT id, longUrl, clicks
                    FROM Shortlinks
                    WHERE shortUrl = $shortUrl
                ";
                command.Parameters.AddWithValue("$shortUrl", shortUrl);

                var reader = command.ExecuteReader();
                reader.Read();
                var id = reader.GetString(0);
                var longUrl = reader.GetString(1);
                int clicks = Int32.Parse(reader.GetString(2));

                var command2 = con.CreateCommand();
                command2.CommandText =
                @"
                    UPDATE Shortlinks
                    SET Clicks = $clicks
                    WHERE Id = $id
                ";
                command2.Parameters.AddWithValue("$clicks", clicks + 1);
                command2.Parameters.AddWithValue("$id", id);
                command2.ExecuteNonQuery();

                return longUrl;
            }
        }

        [HttpGet("{shortUrl}")]
        public ActionResult RedirectToSite(string shortUrl)
        {
            return Redirect(GetData(shortUrl));
        }
    }
}