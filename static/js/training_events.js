let events = [];

let savedEvents = localStorage.getItem("events");
if (savedEvents) {

    events = JSON.parse(savedEvents);
}

showEvents();

function saveEvent() {
    let eventId = document.getElementById("eventId").value;
    let title = document.getElementById("title").value;
    let category = document.getElementById("category").value;
    let date = document.getElementById("date").value;
    let location = document.getElementById("location").value;
    let capacity = document.getElementById("capacity").value;

    if (eventId === "") {
        return;
    }

    let existingEvent = null;

    for (let i = 0; i < events.length; i++) {
        if (events[i].id === eventId) {
            existingEvent = events[i];
            break;
        }
    }

    if (existingEvent === null) {
        let event = {
            id: eventId,
            title: title,
            category: category,
            date: date,
            location: location,
            capacity: capacity
        };

        events.push(newEvent);
    } else {
        existingEvent.title = title;
        existingEvent.category = category;
        existingEvent.date = date;
        existingEvent.location = location;
        existingEvent.capacity = capacity;
    }

    localStorage.setItem("events", JSON.stringify(events));

    alert("Event saved successfully!");

    showEvents();
    clearForm();
}

function showEvents(){
    let tableBody = document.getElementById("eventTableBody");
    tableBody.innerHTML = "";

    for (let i = 0; i < events.length; i++){
        let event = events[i];

        let row = "<tr>";
        row += "<td>" + event.id + "</td>";
        row += "<td>" + event.title + "</td>";
        row += "<td>" + event.category + "</td>";
        row += "<td>" + event.date     + "</td>";
        row += "<td>" + event.location + "</td>";
        row += "<td>" + event.capacity + "</td>";
        row += "<td class='action-buttons'>";
        row += "<button onclick=\"editEvent('"   + event.id + "')\">Edit</button>";
        row += "<button onclick=\"deleteEvent('" + event.id + "')\">Delete</button>";
        row += "</td>";
        row += "</tr>";

        tableBody.innerHTML += row;

    }

}

function editEvent(id){
    for (let i = 0; i < events.length; i++){
        if (events[i].id === id){
            let event = events[i];
            document.getElementById("eventId").value = event.id;
            document.getElementById("title").value = event.title;
            document.getElementById("category").value = event.category;
            document.getElementById("date").value = event.date;
            document.getElementById("location").value = event.location;
            document.getElementById("capacity").value = event.capacity;

            break;

        }
    }
}


function deleteEvent(id) {
    for (let i = 0; i < events.length; i++) {
        if (events[i].id === id){
            events.splice(i, 1);
            break;
        }
    }

    localStorage.setItem("events", JSON.stringify(events));

    showEvents();
}

function clearForm() {
    document.getElementById("eventId").value = "";
    document.getElementById("title").value = "";
    document.getElementById("category").value = "";
    document.getElementById("date").value = "";
    document.getElementById("location").value = "";
    document.getElementById("capacity").value = "";
}