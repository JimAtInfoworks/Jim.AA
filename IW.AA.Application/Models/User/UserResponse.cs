using IW.AA.Core.Enum;

namespace IW.AA.Application.Models.User
{
    public class UserResponse
    {
        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName => $"{FirstName} {LastName}";
        public string Email { get; set; }
        public bool IsActive { get; set; }
        public Role Role { get; set; }
    }
}
