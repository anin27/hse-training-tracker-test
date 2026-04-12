let registrations = [];

loadTrainingEvents();
loadRegistrations();

async function loadTrainingEvents() {
    let dropdown = document.getElementById("trainingEvent");
    dropdown.innerHTML = '<option value="">Select Training Event</option>';

    let response = await fetch("/events");
    let events = await response.json();

    for (let i = 0; i < events.length; i++) {
        let option = "<option value='" + events[i].title + "'>" + events[i].title + "</option>";
        dropdown.innerHTML += option;
    }
}

async function loadRegistrations() {
    let response = await fetch("/registrations");
    registrations = await response.json();

    showRegistrations();
}

async function saveRegistration() {
    let name = document.getElementById("employeeName").value;
    let empId = document.getElementById("employeeId").value;
    let dept = document.getElementById("department").value;
    let event = document.getElementById("trainingEvent").value;
    let status = document.getElementById("status").value;

    if (name === "" && empId === "" && dept === "" && event === "" && status === "") {
        return;
    }

    let newRegistration = {
        employeeName: name,
        employeeId: empId,
        department: dept,
        trainingEvent: event,
        status: status
    };

    await fetch("/registrations", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newRegistration)
    });

    clearRegistrationForm();
    loadRegistrations();
}

function showRegistrations() {
    let table = document.getElementById("regTableBody");
    table.innerHTML = "";

    for (let i = 0; i < registrations.length; i++) {
        let r = registrations[i];

        let row = "<tr>";
        row += "<td>" + r.employee_name + "</td>";
        row += "<td>" + r.employee_id + "</td>";
        row += "<td>" + r.department + "</td>";
        row += "<td>" + r.training_event + "</td>";
        row += "<td>" + r.status + "</td>";
        row += "<td><button onclick='removeRegistration(" + r.id + ")'>Remove</button></td>";
        row += "</tr>";

        table.innerHTML += row;
    }
}

async function removeRegistration(id) {
    if (!confirm("Are you sure you want to remove this registration?")) {
        return;
    }

    await fetch("/registrations/" + id, {
        method: "DELETE"
    });

    alert("Registration removed successfully!");
    loadRegistrations();
}

function clearRegistrationForm() {
    document.getElementById("employeeName").value = "";
    document.getElementById("employeeId").value = "";
    document.getElementById("department").value = "";
    document.getElementById("trainingEvent").value = "";
    document.getElementById("status").value = "Pending";
}