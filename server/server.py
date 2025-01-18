import re
import os
from http.server import BaseHTTPRequestHandler, HTTPServer
import dbManager as db
import json

# Docs for BaseHTTPRequestHandler: https://docs.python.org/3/library/http.server.html#http.server.SimpleHTTPRequestHandler.do_GET

class HTTPRequestHandler(BaseHTTPRequestHandler):
    def do_PUT(self):
        DBconnection = db.create_db_connection("localhost", db.USER, db.PW, db.DB_NAME)
        if re.search('/api/add-goal', self.path) or re.search('/api/add-event', self.path):
            length = int(self.headers.get('content-length'))
            data = self.rfile.read(length).decode('utf-8')
            jObj = json.loads(data)
            options = ""
            for key in jObj:
                value = str(jObj[key]).replace("'", '"')
                options += f"'{value}',"
            if re.search('/api/add-goal', self.path):
                db.insert_goal_query(DBconnection, options.removesuffix(","))
            else:
                db.insert_event_query(DBconnection, options.removesuffix(","))
            self.send_response(200)
        else:
            self.send_response(403)
        self.end_headers()

    def do_PATCH(self):
        DBconnection = db.create_db_connection("localhost", db.USER, db.PW, db.DB_NAME)
        if re.search('/api/update-goal', self.path):
            length = int(self.headers.get('content-length'))
            data = self.rfile.read(length).decode('utf-8')
            jObj = json.loads(data)
            id = jObj["goal_id"]
            del jObj["goal_id"]
            options = ""
            for key in jObj:
                value = str(jObj[key]).replace("'", '"')
                options += f"{key}='{value}',"
            db.update_goal_query(DBconnection, id, options.removesuffix(","))
            self.send_response(200)
        elif re.search('/api/update-event', self.path):
            length = int(self.headers.get('content-length'))
            data = self.rfile.read(length).decode('utf-8')
            jObj = json.loads(data)
            id = jObj["event_Id"]
            del jObj["event_Id"]
            options = ""
            for key in jObj:
                value = str(jObj[key]).replace("'", '"')
                options += f"{key}='{value}',"
            db.update_event_query(DBconnection, id, options.removesuffix(","))
            self.send_response(200)
        else:
            self.send_response(403)
        self.end_headers()


    def do_GET(self):
        DBconnection = db.create_db_connection("localhost", db.USER, db.PW, db.DB_NAME)
        file_requested = self.path.split('/')[-1]
        if os.path.isfile(file_requested):
            self.send_response(200)
            self.send_header('Content-Type', 'text.html')
            self.end_headers()
            self.wfile.write(bytes(open(file_requested).read(), 'utf-8'))
        elif re.search('/api/get-all-category-goals', self.path) or re.search('/api/get-all-category-events', self.path):
            category = f"'{self.path.split("/")[-1]}'"
            if re.search('/api/get-all-category-goals', self.path):
                data = db.fetch_goal_category(DBconnection, category)
            else:
                data = db.fetch_event_category(DBconnection, category)
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(bytes(json.dumps(data, default=str), 'utf-8'))
        elif re.search('/api/get-all-goals', self.path) or re.search('/api/get-all-events', self.path):
            if re.search("/api/get-all-goals", self.path):
                data = db.fetch_all_goals(DBconnection)
            else:
                data = db.fetch_all_events(DBconnection)
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(bytes(json.dumps(data, default=str), 'utf-8'))
        elif re.search('/api/get-goal', self.path) or re.search('/api/get-event', self.path):
            id = self.path.split('/')[-1]
            if re.search('/api/get-goal', self.path):
                data = db.fetch_goal_query(DBconnection, id)
            else:
                data = db.fetch_event_query(DBconnection, id)
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(bytes(json.dumps(data, default=str), 'utf-8'))
        elif re.search('/api/remove-goal', self.path) or re.search('/api/remove-event', self.path):
            id = self.path.split('/')[-1]
            if re.search('/api/remove-goal', self.path):
                db.delete_goal_query(DBconnection, id)
            else:
                db.delete_event_query(DBconnection, id)
            self.send_response(200)
        else:
            self.send_response(404, 'Not Found: record does not exist')
        self.end_headers()
    
        
if __name__ == '__main__':
    server = HTTPServer(('localhost', 8000), HTTPRequestHandler)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    server.server_close()