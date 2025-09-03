using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using verse_api.Domain;

namespace verse_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class HobbyController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public HobbyController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetHobbies()
        {
            var hobbies = await _context.Set<Hobby>().ToListAsync();
            return Ok(hobbies);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetHobby(int id)
        {
            var hobby = await _context.Set<Hobby>().FindAsync(id);
            if (hobby == null)
            {
                return NotFound();
            }

            return Ok(hobby);
        }

        [HttpPost]
        public async Task<IActionResult> CreateHobby([FromBody] Hobby hobby)
        {
            _context.Set<Hobby>().Add(hobby);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetHobby), new { id = hobby.Id }, hobby);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateHobby(Guid id, [FromBody] Hobby updatedHobby)
        {
            if (updatedHobby.Id != id)
            {
                return BadRequest();
            }

            _context.Entry(updatedHobby).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HobbyExists(id))
                {
                    return NotFound();
                }

                throw;
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHobby(int id)
        {
            var hobby = await _context.Set<Hobby>().FindAsync(id);
            if (hobby == null)
            {
                return NotFound();
            }

            _context.Set<Hobby>().Remove(hobby);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool HobbyExists(Guid id)
        {
            return _context.Set<Hobby>().Any(e => e.Id == id);
        }
    }
}