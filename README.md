# Petrofac HSE Tracker

Petrofac HSE Tracker is a web-based information system developed to manage training events and employee registrations for Health, Safety, and Environment activities.

The application provides a simple and structured platform where users can create training events, register employees, and manage saved records through a web interface. The project was developed using Python Flask for the backend, SQLite for data storage, and HTML, CSS, and JavaScript for the frontend.

The system allows users to:
- create, update, view, and delete training events
- register employees for training events
- view all registrations
- delete registrations
- store data in an SQLite database

## Objectives

The objectives of the project are:
- to create a system for managing training events
- to allow employees to be registered for training events
- to store event and registration data in a database
- to implement CRUD operations for managing records
- to validate user input before saving data

## Problem Statement

In many organisations, training event details and employee registrations are often managed manually or stored in separate files. This makes it difficult to organise records, update information, and track registrations efficiently.

This led to:
- data inconsistency
- difficulty in updating records
- limited visibility of training events and employee participation
- time-consuming manual management
- lack of a centralised digital system

A centralised system was required to manage training events and employee registrations in a more efficient and structured way.

## Proposed Solution

To address this problem, a web-based **Petrofac HSE Tracker** system was developed.

The system provides a simple dashboard where users can:
- add new training events
- view all training events
- update existing event details
- delete events
- register employees for training events
- view all employee registrations
- delete registrations

## Main Features

### Training Events Management
- Create new training events with a unique ID, title, category, date, location, and capacity
- Edit existing training events to update any of their details
- Delete training events, which also automatically removes all associated registrations
- View all training events in a sortable table, ordered by date

### Employee Registrations
- Register employees for specific training events by capturing their name, employee ID, department, and selected event
- Assign and update attendance status: Pending, Attended, or Absent
- Delete individual registrations
- View all registrations in a table displaying full employee and event details

### General Features
- Two-page navigation: Training Events and Registrations
- Form validation on both the frontend and backend to ensure all required fields are completed
- Persistent data storage using a local SQLite database
- REST API backend with clear success and error responses

## Non-Functional Requirements

### Usability
- Simple and user-friendly interface
- Easy navigation between pages
- Clear display of event and registration data

### Reliability
- Data stored securely in SQLite
- Validation reduces incorrect or incomplete data entry
- Consistent CRUD operations through backend routes

### Maintainability
- Clear separation between frontend and backend
- Modular structure with separate HTML, CSS, and JavaScript files
- Reusable backend routes for data operations

## Data Requirements and Storage

### Entity: Training Event

Each training event record contains:
- ID
- Title
- Category
- Date
- Location
- Capacity

### Entity: Registration

Each registration record contains:
- ID
- Employee Name
- Employee ID
- Department
- Training Event ID
- Status

### Database
- SQLite is used as the database
- Data is stored in two tables:
  - `training_events`
  - `registrations`

## Technologies Used

- **Programming Language:** Python
- **Backend Framework:** Flask
- **Database:** SQLite
- **Frontend:** HTML, CSS, JavaScript

### Frontend
- HTML – structure of the pages
- CSS – styling and layout
- JavaScript – user interaction and API communication

### Backend
- Python – backend development
- Flask – route handling and API development

### Database
- SQLite – data storage

### API
- REST-style API communication using GET, POST, PUT, and DELETE

The frontend communicates with the backend using API routes, and the backend interacts with the SQLite database.


## CRUD Operations

### Training Events
- **Create**: add a new event
- **Read**: view all events
- **Update**: edit event details
- **Delete**: remove an event

### Registrations
- **Create**: save a new registration
- **Read**: view all registrations
- **Delete**: remove a registration

## Project Structure
hse-training-tracker/
│
├── app.py
├── hse_tracker.db
├── README.md
├── requirements.txt
│
├── static/
│   ├── css/
│   │   └── style.css
│   └── js/
│       ├── registrations.js
│       └── training_events.js
│
├── templates/
│   ├── registrations.html
│   └── training_events.html
│
└── tests/
    └── test_app.py


## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/events` | Retrieve all training events |
| POST | `/events` | Create a new training event |
| PUT | `/events/<event_id>` | Update an existing training event |
| DELETE | `/events/<event_id>` | Delete a training event and its registrations |
| GET | `/registrations` | Retrieve all registrations |
| POST | `/registrations` | Create a new registration |
| DELETE | `/registrations/<id>` | Delete a registration |

## System Workflow

-  The user enters data in the frontend form
-  JavaScript collects the input data
-  A request is sent to the backend using the Fetch API
-  The Flask backend validates the input
-  The backend interacts with the SQLite database
-  The database stores or retrieves the data
-  The backend sends a JSON response
-  The frontend updates the user interface

## Use of AI Assistance

AI tools were used in a limited and supportive way during the development of this project, especially when resolving technical issues that were difficult to debug manually.

The main AI tools used were:
- Claude Ai

Links
- https://claude.ai/share/380be729-f668-457c-9cee-c51aefb5b02a
- https://claude.ai/share/9d15a261-8708-4426-adb2-0a0da17a427e
- https://claude.ai/share/f484609c-25bd-4d50-92c2-54410d151df4

AI support was used for:
- troubleshooting Flask backend errors
- improving frontend and backend consistency
- assisting with deployment issues in AWS Elastic Beanstalk

## Live Demo

The application is deployed and can be accessed here:  
[http://hse-tracker-new-env.eba-cchpksgt.eu-west-1.elasticbeanstalk.com/](http://hse-tracker-new-env.eba-cchpksgt.eu-west-1.elasticbeanstalk.com/)

## Conclusion

Petrofac HSE Tracker is a simple but complete web-based information system that demonstrates how training event and employee registration data can be managed digitally. The project combines frontend design, backend processing, database storage, and CRUD operations.

The system demonstrates the integration of Flask, SQLite, HTML, CSS, and JavaScript in building a small full-stack web application. It also shows the importance of proper validation, consistent database design, debugging, and deployment configuration.

Overall, the project provided practical experience in developing and deploying a working information system.
