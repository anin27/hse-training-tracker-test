let registrations = [];

loadTrainingEvents();
loadRegistrations();

async function loadTrainingEvents() {
    let dropdown = document.getElementById("trainingEvent");
    dropdown.innerHTML = '<option value="">Select Training Event</option>';

    let response = await fetch("/events");
    let events = await response.json();

    for (let event of events) {
        let option = document.createElement("option");
        option.value = event.id;
        option.textContent = event.title;
        dropdown.appendChild(option);
    }
}

async function loadRegistrations() {
    let response = await fetch("/registrations");
    registrations = await response.json();
    showRegistrations();
}

async function saveRegistration() {
    let employeeName = document.getElementById("employeeName").value.trim();
    let employeeId = document.getElementById("employeeId").value.trim();
    let department = document.getElementById("department").value;
    let trainingEvent = document.getElementById("trainingEvent").value;
    let status = document.getElementById("status").value;

    if (!employeeName || !employeeId || !department || !trainingEvent || !status) {
        alert("Please fill in all registration fields.");
        return;
    }

    let registrationData = {
        employeeName: employeeName,
        employeeId: employeeId,
        department: department,
        trainingEvent: trainingEvent,
        status: status
    };

    let response = await fetch("/registrations", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(registrationData)
    });

    let result = await response.json();

    if (!response.ok) {
        alert(result.message);
        return;
    }

    alert(result.message || "Registration saved successfully.");
    clearRegistrationForm();
    loadRegistrations();
    loadTrainingEvents();
}

function showRegistrations() {
    let tableBody = document.getElementById("regTableBody");
    tableBody.innerHTML = "";

    for (let registration of registrations) {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${registration.employee_name}</td>
            <td>${registration.employee_id}</td>
            <td>${registration.department}</td>
            <td>${registration.training_event}</td>
            <td>${registration.status}</td>
            <td class="action-buttons">
                <button class="danger-button" onclick="removeRegistration(${registration.id})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    }
}

async function removeRegistration(id) {
    let confirmed = confirm("Are you sure you want to delete this registration?");
    if (!confirmed) {
        return;
    }

    let response = await fetch(`/registrations/${id}`, {
        method: "DELETE"
    });

    let result = await response.json();
    alert(result.message || "Registration removed successfully.");
    clearRegistrationForm();
    loadRegistrations();
}

function clearRegistrationForm() {
    document.getElementById("employeeName").value = "";
    document.getElementById("employeeId").value = "";
    document.getElementById("department").value = "";
    document.getElementById("trainingEvent").value = "";
    document.getElementById("status").value = "Pending";
}
