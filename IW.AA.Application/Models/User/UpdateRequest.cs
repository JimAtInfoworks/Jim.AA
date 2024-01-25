using IW.AA.Core.Enum;
using System.ComponentModel.DataAnnotations;

namespace IW.AA.Application.Models.User
{
    public class UpdateRequest
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }

        [EnumDataType(typeof(Role))]
        public string? Role { get; set; }

        [EmailAddress]
        public string? Email { get; set; }

        // treat empty string as null for password fields to 
        // make them optional in front end apps
        private string? _password;
        [MinLength(6)]
        public string? Password
        {
            get => _password;
            set => _password = replaceEmptyWithNull(value);
        }

        private string? _confirmPassword;
        [Compare("Password")]
        public string? ConfirmPassword
        {
            get => _confirmPassword;
            set => _confirmPassword = replaceEmptyWithNull(value);
        }

        public bool IsActive {  get; set; }

        // Helpers

        private string? replaceEmptyWithNull(string? value)
        {
            // replace empty string with null to make field optional
            return string.IsNullOrEmpty(value) ? null : value;
        }
    }
}
