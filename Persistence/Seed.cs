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
                    ShortUrl = "123",
                    CreationDate = DateTime.Now.AddDays(-1),
                    Clicks = 10,
                },
                new Shortlink
                {
                    LongUrl = "https://www.facebook.com",
                    ShortUrl = "124",
                    CreationDate = DateTime.Now.AddDays(-2),
                    Clicks = 9,
                },
                new Shortlink
                {
                    LongUrl = "https://www.amazon.com",
                    ShortUrl = "125",
                    CreationDate = DateTime.Now.AddDays(-2),
                    Clicks = 8,
                },
                new Shortlink
                {
                    LongUrl = "https://www.bing.com",
                    ShortUrl = "126",
                    CreationDate = DateTime.Now.AddDays(-4),
                    Clicks = 7,
                },
                new Shortlink
                {
                    LongUrl = "https://www.microsoft.com",
                    ShortUrl = "127",
                    CreationDate = DateTime.Now.AddDays(-5),
                    Clicks = 1,
                },
                new Shortlink
                {
                    LongUrl = "https://www.reddit.com",
                    ShortUrl = "128",
                    CreationDate = DateTime.Now.AddDays(-3),
                    Clicks = 2,
                },
                new Shortlink
                {
                    LongUrl = "https://www.twitter.com",
                    ShortUrl = "129",
                    CreationDate = DateTime.Now.AddDays(-1),
                    Clicks = 3,
                },
                new Shortlink
                {
                    LongUrl = "https://www.merkleinc.com/emea",
                    ShortUrl = "130",
                    CreationDate = DateTime.Now.AddDays(-6),
                    Clicks = 4,
                }
            };

            await context.Shortlinks.AddRangeAsync(activities);
            await context.SaveChangesAsync();
        }
    }
}