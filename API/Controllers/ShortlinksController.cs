using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using MediatR;
using Application.Shortlinks;

namespace API.Controllers
{
    
    public class ShortlinksController : BaseApiController
    {
        [NonAction]
        public string GenerateNextURL()
        {
            string Alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            int Base = Alphabet.Length;
            int i = new Random().Next(2147000000);
            var s = string.Empty;

            while (i > 0)
            {
                s += Alphabet[i % Base];
                i = i / Base;
            }
            
            return string.Join(string.Empty, s.Reverse());
        }

        [HttpGet]
        public async Task<ActionResult<List<Shortlink>>> GetShortlinks()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Shortlink>> GetShortlink(Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }

        [HttpPost]
        public async Task<IActionResult> CreateShortlink(Shortlink shortlink)
        {
            shortlink.ShortUrl = GenerateNextURL();
            return Ok(await Mediator.Send(new Create.Command { Shortlink = shortlink }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditShortlink(Guid id, Shortlink shortlink)
        {
            shortlink.Id = id;
            return Ok(await Mediator.Send(new Edit.Command { Shortlink = shortlink }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteShortlink(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}