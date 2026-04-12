# Petrofac HSE Training Tracker

This project is a simple web application built to manage HSE (Health, Safety, and Environment) training events and employee registrations. It allows users to create training events, register employees, and manage records using a basic CRUD system.

---

## Project Overview

The main goal of this project is to demonstrate a full-stack application using:

- Frontend: HTML, CSS, JavaScript  
- Backend: Python (Flask)  
- Database: SQLite  

The system stores data in a database and displays it dynamically on the web pages.

---

## Features

### Training Events
- Add new training events  
- View all events in a table  
- Edit existing events  
- Delete events  

### Employee Registrations
- Register employees for training events  
- Select events from dropdown (loaded dynamically)  
- View all registrations  
- Remove registrations  

---

## How the System Works

- The frontend sends data using JavaScript (`fetch`)
- Flask handles requests and processes the data
- SQLite database stores all records
- Data is retrieved and displayed dynamically on the web page

---

## Project Structure
hse-training-tracker/
│
├── app.py
├── hse_tracker.db
├── requirements.txt
│
├── templates/
│ ├── training_events.html
│ └── registrations.html
│
├── static/
│ ├── css/
│ │ └── style.css
│ └── js/
│ ├── training_events.js
│ └── registrations.js
