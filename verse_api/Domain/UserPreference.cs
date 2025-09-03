using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace verse_api.Domain
{
    public class UserPreference
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; } // Changed from int to Guid

        public string UserId { get; set; } // Changed from int to Guid
        [ForeignKey("UserId")]
        public User User { get; set; }

        public int PreferredAgeMin { get; set; }
        public int PreferredAgeMax { get; set; }
        public int PreferredDistanceKm { get; set; }
        public string PreferredHobbies { get; set; } // Comma-separated list of hobby IDs
    }
}