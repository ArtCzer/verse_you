using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using verse_api.Domain;

namespace verse_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class UserProfileController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UserProfileController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetUserProfile()
        {
            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                return Unauthorized();
            }

            var userProfile = await _context.Set<UserProfile>().FirstOrDefaultAsync(up => up.UserId == userId);
            if (userProfile == null)
            {
                return NotFound();
            }

            return Ok(userProfile);
        }

        [HttpPost]
        public async Task<IActionResult> CreateUserProfile([FromBody] UserProfile userProfile)
        {
            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                return Unauthorized();
            }

            userProfile.UserId = userId;
            _context.Set<UserProfile>().Add(userProfile);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUserProfile), new { id = userProfile.Id }, userProfile);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateUserProfile([FromBody] UserProfile updatedProfile)
        {
            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                return Unauthorized();
            }

            var userProfile = await _context.Set<UserProfile>().FirstOrDefaultAsync(up => up.UserId == userId);
            if (userProfile == null)
            {
                return NotFound();
            }

            userProfile.FirstName = updatedProfile.FirstName;
            userProfile.LastName = updatedProfile.LastName;
            userProfile.Bio = updatedProfile.Bio;
            userProfile.Interests = updatedProfile.Interests;
            userProfile.Location = updatedProfile.Location;
            userProfile.DateOfBirth = updatedProfile.DateOfBirth;
            userProfile.ProfilePictureUrl = updatedProfile.ProfilePictureUrl;

            _context.Set<UserProfile>().Update(userProfile);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteUserProfile()
        {
            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                return Unauthorized();
            }

            var userProfile = await _context.Set<UserProfile>().FirstOrDefaultAsync(up => up.UserId == userId);
            if (userProfile == null)
            {
                return NotFound();
            }

            _context.Set<UserProfile>().Remove(userProfile);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}