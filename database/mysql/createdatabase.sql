-- Create a new database called 'woodsland03'
-- Connect to the 'master' database to run this snippet
USE master
GO
-- Create the new database if it does not exist already
IF NOT EXISTS (
    SELECT name
        FROM sys.databases
        WHERE name = N'woodsland03'
)
CREATE DATABASE woodsland03
GO