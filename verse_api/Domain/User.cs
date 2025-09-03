using System;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace verse_api.Domain
{
    public class User : IdentityUser
    {
        // Additional properties for the User class can be added here
        public ICollection<UserRole> UserRoles { get; set; } // Navigation property for roles
    }

    public class UserRole
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; } // Changed from int to Guid

        [Required]
        public string Name { get; set; } // Role name, e.g., "user", "event organiser", "admin"

        // Navigation property
        public ICollection<User> Users { get; set; }
    }
}