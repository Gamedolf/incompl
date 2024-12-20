using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Shortlinks
{
    public class List
    {
        public class Query : IRequest<List<Shortlink>> { }

        public class Handler : IRequestHandler<Query, List<Shortlink>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Shortlink>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Shortlinks.ToListAsync();
            }
        }
    }
}