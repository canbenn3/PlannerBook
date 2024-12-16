import mysql.connector
from mysql.connector import Error

# Replace PW and USER with your own credentials
PW = "password1"
USER = "Bennett"
DB_NAME = "plannerbook"

def create_server_connection(host_name, user_name, user_password):
    connection = None
    try:
        connection = mysql.connector.connect(
            host=host_name,
            user=user_name,
            passwd=user_password
        )
        print("MySQL Database connection successful")
    except Error as err:
        print(f"Error: '{err}'")
    
    return connection

def create_database(connection, query):
    cursor = connection.cursor()
    try:
        cursor.execute(query)
        print("DB created successfully")
    except Error as err:
        print(f"Error: `{err}`")

def create_db_connection(host_name, user_name, user_password, db_name):
    connection = None
    try:
        connection = mysql.connector.connect(
            host=host_name,
            user = user_name,
            passwd = user_password,
            database = db_name
        )
        print("DB connection successful")
    except Error as err:
        print(f"Error: '{err}'")
    
    return connection

def execute_query(connection, query):
    cursor = connection.cursor()
    try:
        cursor.execute(query)
        connection.commit()
        print("query successful")
    except Error as err:
        print(f"Error: '{err}'")

def read_query(connection, query):
    cursor = connection.cursor()
    result = None
    try:
        cursor.execute(query)
        result = cursor.fetchall()
        return result
    except Error as err:
        print(f"Error: '{err}'")

def insert_goal_query(connection, id, date, title, category):
    query = f"""
    INSERT INTO goals (goal_id, end_date, title, category)
    VALUES ({id}, {date}, {title}, {category})
    """
    execute_query(connection, query)

def update_goal_query(connection, id, options):
    query = f"""
    UPDATE goals
    SET {options}
    WHERE goal_id = {id}
    """
    execute_query(connection, query)

def delete_goal_query(connection, id):
    query = f"""
    DELETE FROM goals
    WHERE goal_id = {id}
    """
    execute_query(connection, query)

def insert_event_query(connection, options):
    query=f"""
    INSERT INTO events
    VALUES ({options})
    """
    execute_query(connection, query)

def update_event_query(connection, id, options):
    query=f"""
    UPDATE events
    SET {options}
    WHERE event_id = {id}
    """
    execute_query(connection, query)

def fetch_goal_query(connection, id):
    query = f"""
    SELECT * FROM goals
    WHERE goal_id = {id}
    """
    return read_query(connection, query)

def fetch_event_query(connection, id):
    query = f"""
    SELECT * FROM events
    WHERE event_id = {id}
    """
    return read_query(connection, query)

def delete_event_query(connection, id):
    query = f"""
    DELETE FROM events
    WHERE event_id = {id}
    """
    execute_query(connection, query)

if __name__ == '__main__':
    # Test the functions!
    connection = create_db_connection("localhost", USER, PW, DB_NAME)
    # Test goals:
    print("---- Testing Goals DB Management ----")
    id = 1
    date = "'2024-12-16'"
    title = "'Build PlannerBook!'"
    category = "'intellectual'"

    insert_goal_query(connection, id, date, title, category)
    result1 = fetch_goal_query(connection, id)
    print("Result1 from insert and fetch number 1:\n" + str(result1))

    options = """
    progress='{total: 2, completed: 1, percent_complete: .5, overdue: 0}',
    tasks='[{task_name: "insert query", end_date: "2024-12-25", complete: true}, {task_name: "update query", end_date: "2024-12-25", complete: false}]',
    events='[1, 2, 3]'
    """
    update_goal_query(connection, id, options)
    result2 = fetch_goal_query(connection, id)
    print("Result2 from update and fetch number 2:\n" + str(result2))

    delete_goal_query(connection, id)
    result3 = fetch_goal_query(connection, id)
    print("Result3 from delete and fetch number 3:\n" + str(result3))

    print("\n\n\n\n")

    # Test event table
    print("---- Testing Events DB Management ----")
    id = 1
    category = 'intellectual'
    title = 'Work on events queries'
    date = '2024-12-16'
    time = '1300'
    linked_goal = 1

    options = f"""
    {id},
    '{category}',
    '{title}',
    '{date}',
    '{time}',
    '{linked_goal}'
    """
    insert_event_query(connection, options)
    result = fetch_event_query(connection, id)
    print("Event result: " + str(result))

    options = f"""
    category='physical',
    date='2024-12-17',
    linked_goal=35
    """
    update_event_query(connection, id, options)
    result = fetch_event_query(connection, id)
    print("Event results after update: " + str(result))

    delete_event_query(connection, id)
    result = fetch_event_query(connection, id)
    print("Event results after Deletion: " + str(result))
