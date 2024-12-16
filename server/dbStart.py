'''
The following file initializes the database and tables required for PlannerBook.
Requirements: MySQL Community Server, MySQL Connector Python Library
WARNING: This file will create files in other portions of your computer system, as it is designed to work with a local database for now.

Database: plannerbook
Tables: goals, events, tasks

goals table:
goal_id: A hash of the goal title
end_date: date the goal is set to be completed
title: name of the goal
category: social, physical, intellectual, or spiritual
progress: '{total: int, completed: int, percent_complete: int 0-1, overdue: int}'
tasks: [{task_name: string, end_date: string, complete: boolean}] Array of 'task' objects
events: [eventId1, eventId2, ...] array of eventId's corresponding to the event table

events table: Table containing all calendar events
event_id: First two digits of category, date, and a hash of title
    ex. 'SO_2024-12-15_1234' = social, Dec 12, 2024, title hash
category: social, physical, intellectual, spiritual, or none
title: event title
date: date event takes place
time: 'HourMinute'
    ex. '1630' = 4:30
linked_goal: id of associated goal

'''

from dbManager import create_database, create_server_connection, create_db_connection, execute_query, PW, USER, DB_NAME

if __name__ == '__main__':
    connection = create_server_connection("localhost", USER, PW)
    query_build_db = f"CREATE DATABASE {DB_NAME}"
    create_database(connection, query_build_db)
    connection = create_db_connection("localhost", USER, PW, DB_NAME)
    create_goal_table = """
    CREATE TABLE goals (
        goal_id INTEGER PRIMARY KEY,
        end_date DATE NOT NULL,
        title TEXT NOT NULL,
        category TEXT NOT NULL,
        progress TEXT,
        steps TEXT,
        events TEXT
    )
    """
    create_events_table = """
    CREATE TABLE events (
        event_id INTEGER PRIMARY KEY,
        category TEXT,
        title TEXT,
        date DATE,
        time TEXT,
        linked_goal INTEGER
    )
    """
    execute_query(connection, create_goal_table)
    execute_query(connection, create_events_table)
