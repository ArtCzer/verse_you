using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace verse_api.Domain
{
    public class Hobby
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; } // Changed from int to Guid
        public string Name { get; set; }

        // Navigation property
        public ICollection<UserHobby> UserHobbies { get; set; }
    }

    public class UserHobby
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; } // Changed from int to Guid
        public string UserId { get; set; } // Changed from int to Guid
        [ForeignKey("UserId")]
        public User User { get; set; }

        public Guid HobbyId { get; set; } // Changed from int to Guid
        [ForeignKey("HobbyId")]
        public Hobby Hobby { get; set; }

        public string SkillLevel { get; set; } 

        public bool IsSubscribed { get; set; } 
    }
}