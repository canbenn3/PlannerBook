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

def insert_goal_query(connection, id, date, title, category):
    query = f"""
    INSERT INTO goals
    VALUES ({id}, {date}, {title}, {category})
    """
    execute_query(connection, query)

def update_goal_query(connection, id):
    # TODO: Finish this function
    query = f"""
    UPDATE goals
    SET ...
    WHERE id = {id}
    """
    execute_query(connection, query)