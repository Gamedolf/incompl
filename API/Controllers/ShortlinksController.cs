using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ShortlinksController : BaseApiController
    {
        private readonly DataContext _context;
        public ShortlinksController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Shortlink>>> GetShortlinks()
        {
            return await _context.Shortlinks.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Shortlink>> GetShortlink(Guid id)
        {
            return await _context.Shortlinks.FindAsync(id);
        }
    }
}