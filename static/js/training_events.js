let events = [];


function saveEvent()
{
    let eventId = document.getElementById("eventId").value;
    let title = document.getElementById("title").value;
    let category = document.getElementById("category").value;
    let date = document.getElementById("date").value;
    let location = document.getElementById("location").value;
    let capacity = document.getElementById("capacity").value;

    if (eventId === ""){
        return;

    }

    let existingEvent = null;

    for (let i =0; i < events.length; i++){
        if (events[i].id === eventId){
            existingEvent = events[i];
            break;
        }
    }

    if (existingEvent ===null){
        
        let event ={
            id: eventIdCounter,
            title: title,
            category: category,
            date: date,
            location: location,
            capacity: capacity

        };
        
        events.push(event);

    }   else{
        existingEvent.title = title;
        existingEvent.category = category;
        existingEvent.date = date;
        existingEvent.location = location;
        existingEvent.capacity = capacity;
    }

    showEvents();
    clearForm();
    
}

function showEvents(){
    let tableBody = document.getElementById("eventTableBody");
    tableBody.innerHTML = "";

    for (let i = 0; i < events.length; i++){
        let event = events[i];

        tableBody.innerHTML +=`
        <tr>
            <td>${event.id}</td>
            <td>${event.title}</td>
            <td>${event.category}</td>
            <td>${event.date}</td>
            <td>${event.location}</td>
            <td>${event.capacity}</td>
            <td class ="action-buttons">
            <button onclick="editEvent('${event.id}')">Edit</button>
            <button onclick="deleteEvent('${event.id}')">Delete</button>
            </td>

        </tr>
        `;
    }

}

function editEvent(id){
    for (let i = 0; i < events.length; i++){
        if (events[i].id === id){
            let event = events[i];
            document.getElementById("eventId").value = "";
            document.getElementById("title").value = "";
            document.getElementById("category").value = "";
            document.getElementById("date").value = "";
            document.getElementById("location").value = "";
            document.getElementById("capacity").value = "";

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