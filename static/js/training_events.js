let events = [];
let eventEditMode = false;

// Changed: load events when the page opens
loadEvents();

// Changed: fetch all events from backend
async function loadEvents() {
    let response = await fetch("/events");
    events = await response.json();
    showEvents();
}

// Changed: use popup alerts and support both save and update
async function saveEvent() {
    let eventId = document.getElementById("eventId").value.trim();
    let title = document.getElementById("title").value.trim();
    let category = document.getElementById("category").value;
    let date = document.getElementById("date").value;
    let location = document.getElementById("location").value.trim();
    let capacity = document.getElementById("capacity").value.trim();

    if (!eventId || !title || !category || !date || !location || !capacity) {
        alert("Please fill in all event fields.");
        return;
    }

    let eventData = {
        id: eventId,
        title: title,
        category: category,
        date: date,
        location: location,
        capacity: capacity
    };

    let url = "/events";
    let method = "POST";

    if (eventEditMode) {
        url = `/events/${eventId}`;
        method = "PUT";
    }

    let response = await fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(eventData)
    });

    let result = await response.json();

    if (!response.ok) {
        alert(result.message);
        return;
    }

    alert(result.message || "Event saved successfully.");
    clearForm();
    loadEvents();
}

// Changed: show events in the table
function showEvents() {
    let tableBody = document.getElementById("eventTableBody");
    tableBody.innerHTML = "";

    for (let event of events) {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${event.id}</td>
            <td>${event.title}</td>
            <td>${event.category}</td>
            <td>${event.date}</td>
            <td>${event.location}</td>
            <td>${event.capacity}</td>
            <td class="action-buttons">
                <button onclick="editEvent('${event.id}')">Edit</button>
                <button class="danger-button" onclick="deleteEvent('${event.id}')">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    }
}

// Changed: added edit mode for events
function editEvent(id) {
    for (let event of events) {
        if (event.id === id) {
            document.getElementById("eventId").value = event.id;
            document.getElementById("eventId").disabled = true;
            document.getElementById("title").value = event.title;
            document.getElementById("category").value = event.category;
            document.getElementById("date").value = event.date;
            document.getElementById("location").value = event.location;
            document.getElementById("capacity").value = event.capacity;

            document.getElementById("saveEventButton").textContent = "Update Event";
            eventEditMode = true;
            break;
        }
    }
}

// Changed: added delete confirmation popup
async function deleteEvent(id) {
    let confirmed = confirm("Are you sure you want to delete this event?");
    if (!confirmed) {
        return;
    }

    let response = await fetch(`/events/${id}`, {
        method: "DELETE"
    });

    let result = await response.json();
    alert(result.message || "Event deleted successfully.");
    clearForm();
    loadEvents();
}

// Changed: reset form after save, update, or delete
function clearForm() {
    document.getElementById("eventId").value = "";
    document.getElementById("eventId").disabled = false;
    document.getElementById("title").value = "";
    document.getElementById("category").value = "";
    document.getElementById("date").value = "";
    document.getElementById("location").value = "";
    document.getElementById("capacity").value = "";

    document.getElementById("saveEventButton").textContent = "Save Event";
    eventEditMode = false;
}
