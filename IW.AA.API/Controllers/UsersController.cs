using IW.AA.Application.Interfaces;
using IW.AA.Application.Models.User;
using Microsoft.AspNetCore.Mvc;

namespace IW.AA.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly ILogger<UsersController> _logger;
        private IUserService _userService;

        public UsersController(ILogger<UsersController> logger, IUserService userService)
        {
            _logger = logger;
            _userService = userService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var users = await _userService.GetAll();
            return Ok(users);
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetById(int userId)
        {
            var user = await _userService.GetById(userId);
            return Ok(user);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateRequest model)
        {
            await _userService.Create(model);
            return Ok(new { message = "User created" });
        }

        [HttpPut("{userId}")]
        public async Task<IActionResult> Update(int userId, UpdateRequest model)
        {
            await _userService.Update(userId, model);
            return Ok(new { message = "User updated" });
        }

        [HttpDelete("{userId}")]
        public async Task<IActionResult> Delete(int userId)
        {
            await _userService.Delete(userId);
            return Ok(new { message = "User deleted" });
        }
    }
}
