using IW.AA.Application.Models.User;
using IW.AA.Core.Entities;

namespace IW.AA.Application.Interfaces
{
    public interface IUserService
    {
        Task<IEnumerable<UserResponse>> GetAll();
        Task<UserResponse> GetById(int id);
        Task Create(CreateRequest model);
        Task Update(int id, UpdateRequest model);
        Task Delete(int id);
    }
}
