namespace IW.AA.Infrastructure.Data;

using System.Data;
using Dapper;
using Microsoft.Data.SqlClient;


public class DataContext
{
    protected string _connectionString;

    public DataContext(string connectionString)
    {
        _connectionString = connectionString;
    }

    public IDbConnection CreateConnection()
    {
        return new SqlConnection(_connectionString);
    }

    public async Task Init()
    {
        await _initDatabase();
        await _initTables();
    }

    private async Task _initDatabase()
    {
        // create database if it doesn't exist
        using var connection = new SqlConnection(_connectionString);
        var sql = $"IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'IW_AA') CREATE DATABASE [IW_AA];";
        await connection.ExecuteAsync(sql);
    }

    private async Task _initTables()
    {
        // create tables if they don't exist
        using var connection = CreateConnection();
        await _initUsers();

        async Task _initUsers()
        {
            var sql = """
                IF OBJECT_ID('Users', 'U') IS NULL
                CREATE TABLE Users (
                    Id INT NOT NULL PRIMARY KEY IDENTITY,
                    Title NVARCHAR(MAX),
                    FirstName NVARCHAR(MAX),
                    LastName NVARCHAR(MAX),
                    Email NVARCHAR(MAX),
                    Role INT,
                    PasswordHash NVARCHAR(MAX)
                );
            """;
            await connection.ExecuteAsync(sql);
        }
    }
}
