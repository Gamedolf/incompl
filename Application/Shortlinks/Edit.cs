using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Shortlinks
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Shortlink Shortlink { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var shortlink = await _context.Shortlinks.FindAsync(request.Shortlink.Id);

                _mapper.Map(request.Shortlink, shortlink);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}