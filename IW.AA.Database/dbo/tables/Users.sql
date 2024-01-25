CREATE TABLE [dbo].[Users]
(
	UserId INT NOT NULL PRIMARY KEY IDENTITY,
    FirstName NVARCHAR(MAX) NOT NULL,
    LastName NVARCHAR(MAX) NOT NULL,
    Email NVARCHAR(MAX) NOT NULL,
    Role INT NOT NULL,
    PasswordHash NVARCHAR(MAX) NOT NULL,
    [IsActive]     BIT            CONSTRAINT [DF_User_IsActive] DEFAULT ((1)) NOT NULL,
    [CreatedBy]    NVARCHAR (36)  NOT NULL,
    [CreatedDate]  DATETIME       NOT NULL,
    [UpdatedBy]    NVARCHAR (36)  NULL,
    [UpdatedDate]  DATETIME       NULL,
)
