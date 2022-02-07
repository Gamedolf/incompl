using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Shortlinks
{
    public class Details
    {
        public class Query : IRequest<Shortlink>
        {
            public Guid Id
            {
                get; set;
            }

            public class Handler : IRequestHandler<Query, Shortlink>
            {
                private readonly DataContext _context;
                public Handler(DataContext context)
                {
                    _context = context;
                }

                public async Task<Shortlink> Handle(Query request, CancellationToken cancellationToken)
                {
                    return await _context.Shortlinks.FindAsync(request.Id);
                }
            }
        }
    }
}