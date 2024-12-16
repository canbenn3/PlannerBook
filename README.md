#### PlannerBook

### Getting Started

## Initializing Database
- PlannerBook uses MySQL community server to manage a database on your local system.
- To initialize this database, run `python server/dbStart.py` from the main directory.
- Make sure you have MySQL community server running and update USER and PW within `dbManager.py`
- Running the above command should print the following response in the console

- ```MySQL Database connection successful
    DB created successfully
    DB connection successful
    query successful
    query successful
  ```
- The database is now set up and ready for use on your local computer.
- Note: if you want to delete your database after testing PlannerBook, open the MySQL command Line, connect to the server, and type `DROP DATABASE plannerbook`

## Server Startup
- Enter `python server/server.py` to start the server and be able to use PlannerBook.
