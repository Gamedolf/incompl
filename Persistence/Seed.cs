using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (context.Shortlinks.Any()) return;

            var activities = new List<Shortlink>
            {
                new Shortlink
                {
                    LongUrl = "https://www.google.com",
                    ShortUrl = "aaa",
                    Token = 100000000,
                    CreationDate = DateTime.Now.AddDays(-1),
                    Clicks = 10,
                },
                new Shortlink
                {
                    LongUrl = "https://www.facebook.com",
                    ShortUrl = "aab",
                    Token = 100000001,
                    CreationDate = DateTime.Now.AddDays(-2),
                    Clicks = 9
                }
            };

            await context.Shortlinks.AddRangeAsync(activities);
            await context.SaveChangesAsync();
        }
    }
}