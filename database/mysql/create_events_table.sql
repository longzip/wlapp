-- Create a new table called 'events' in schema 'SchemaName'
-- Drop the table if it already exists
IF OBJECT_ID('SchemaName.events', 'U') IS NOT NULL
DROP TABLE SchemaName.events
GO
-- Create the table in the specified schema
CREATE TABLE SchemaName.events
(
    id int IDENTITY(1, 1) PRIMARY KEY CLUSTERED NOT NULL
   , userId nvarchar(50) NOT NULL
   , title nvarchar(200) NOT NULL
   , description nvarchar(1000) NULL
   , startDate date NOT NULL
   , startTime time(0) NULL
   , endDate date NULL
   , endTime time(0) NULL
   , INDEX idx_events_userId ( userId )
);
GO