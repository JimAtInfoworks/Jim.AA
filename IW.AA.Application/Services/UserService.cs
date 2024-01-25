using IW.AA.Core.Entities;
using AutoMapper;
using IW.AA.Application.Interfaces;
using IW.AA.Application.Common.Exceptions;
using IW.AA.Application.Models.User;

namespace IW.AA.Application.Services
{
    public class UserService : IUserService
    {
        private IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UserService(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<UserResponse>> GetAll()
        {
            var users = await _userRepository.GetAll();
            return _mapper.Map<IEnumerable<UserResponse>>(users);
        }

        public async Task<UserResponse> GetById(int userId)
        {
            var user = await _userRepository.GetById(userId);

            if (user == null)
                throw new KeyNotFoundException("User not found");

            return _mapper.Map<UserResponse>(user);
        }

        public async Task Create(CreateRequest model)
        {
            // validate
            if (await _userRepository.GetByEmail(model.Email!) != null)
                throw new AppException("User with the email '" + model.Email + "' already exists");

            // map model to new user object
            var user = _mapper.Map<User>(model);

            // hash password
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(model.Password);

            // save user
            await _userRepository.Create(user);
        }

        public async Task Update(int userId, UpdateRequest model)
        {
            var user = await _userRepository.GetById(userId);

            if (user == null)
                throw new KeyNotFoundException("User not found");

            // validate
            var emailChanged = !string.IsNullOrEmpty(model.Email) && user.Email != model.Email;
            if (emailChanged && await _userRepository.GetByEmail(model.Email!) != null)
                throw new AppException("User with the email '" + model.Email + "' already exists");

            // hash password if it was entered
            if (!string.IsNullOrEmpty(model.Password))
                user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(model.Password);

            // copy model props to user
            _mapper.Map(model, user);

            // save user
            await _userRepository.Update(user);
        }

        public async Task Delete(int userId)
        {
            await _userRepository.Delete(userId);
        }
    }
}
