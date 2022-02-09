using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Shortlink
    {
        public Guid Id { get; set; }
        public string LongUrl { get; set; }
        public string ShortUrl { get; set; }
        public int Token { get; set; }
        public DateTime CreationDate { get; set; } = DateTime.Now;
        public int Clicks { get; set; } = 0;
    }
}