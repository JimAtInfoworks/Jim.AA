using IW.AA.Core.Enum;
using System.Text.Json.Serialization;

namespace IW.AA.Core.Entities
{
    public class User
    {
        public int UserId { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public Role Role { get; set; }
        public bool IsActive { get; set; }

        [JsonIgnore]
        public string? PasswordHash { get; set; }
    }
}
