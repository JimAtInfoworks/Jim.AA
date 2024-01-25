using Dapper;
using IW.AA.Application.Interfaces;
using IW.AA.Core.Entities;
using IW.AA.Infrastructure.Data;

namespace IW.AA.Infrastructure.Repositories
{
    public class UserRepository : BaseRepository, IUserRepository
    {
        private DataContext _context;

        public UserRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<User>> GetAll()
        {
            using var connection = _context.CreateConnection();
            var sql = """
                SELECT * FROM dbo.[Users]
            """;
            return await connection.QueryAsync<User>(sql);
        }

        public async Task<User> GetById(int userId)
        {
            using var connection = _context.CreateConnection();
            var sql = """
                SELECT * FROM Users 
                WHERE UserId = @userId
            """;
            return await connection.QuerySingleOrDefaultAsync<User>(sql, new { userId });
        }

        public async Task<User> GetByEmail(string email)
        {
            using var connection = _context.CreateConnection();
            var sql = """
                SELECT * FROM Users 
                WHERE Email = @email
            """;
            return await connection.QuerySingleOrDefaultAsync<User>(sql, new { email });
        }

        public async Task Create(User user)
        {
            using var connection = _context.CreateConnection();
            var sql = """
                INSERT INTO Users (FirstName, LastName, Email, Role, PasswordHash, CreatedBy, CreatedDate)
                VALUES (@FirstName, @LastName, @Email, @Role, @PasswordHash, @CreatedBy, @CreatedDate)
            """;
            await connection.ExecuteAsync(sql, new
            {
                user.FirstName,
                user.LastName,
                user.Email, 
                user.Role, 
                user.PasswordHash, 
                CreatedBy = 0,
                CreatedDate = DateTime.UtcNow
            });
        }

        public async Task Update(User user)
        {
            using var connection = _context.CreateConnection();
            var sql = """
                UPDATE Users 
                SET FirstName = @FirstName,
                    LastName = @LastName, 
                    Email = @Email, 
                    Role = @Role, 
                    PasswordHash = @PasswordHash,
                    IsActive = @IsActive,
                    UpdatedBy = @UpdatedBy,
                    UpdatedDate = @UpdatedDate
                WHERE UserId = @UserId
            """;
            await connection.ExecuteAsync(sql, new
            {
                user.UserId,
                user.FirstName,
                user.LastName,
                user.Email,
                user.Role,
                user.PasswordHash,
                user.IsActive,
                UpdatedBy = 0,
                UpdatedDate = DateTime.UtcNow
            });
        }

        public async Task Delete(int userId)
        {
            using var connection = _context.CreateConnection();
            var sql = """
                DELETE FROM Users 
                WHERE UserId = @userId
            """;
            await connection.ExecuteAsync(sql, new { userId });
        }
    }
}
