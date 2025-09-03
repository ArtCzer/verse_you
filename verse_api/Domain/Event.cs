using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace verse_api.Domain
{
    public class Event
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; } // Changed from int to Guid
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        public string Location { get; set; } // Address or coordinates

        // Navigation property
        public ICollection<EventParticipant> Participants { get; set; }
    }

    public class EventParticipant
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; } // Changed from int to Guid
        public Guid EventId { get; set; } // Changed from int to Guid
        [ForeignKey("EventId")]
        public Event Event { get; set; }

        public string UserId { get; set; } // Changed from int to Guid
        [ForeignKey("UserId")]
        public User User { get; set; }

        public string RSVPStatus { get; set; } // e.g., "Going", "Maybe", "Not Going"
    }
}