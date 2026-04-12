let registrations = JSON.parse(localStorage.getItem("registrations")) || [];

loadTrainingEvents();
showRegistrations();

function loadTrainingEvents() {
    let events = JSON.parse(localStorage.getItem("events")) || [];
    let trainingEventDropdown = document.getElementById("trainingEvent");

    trainingEventDropdown.innerHTML = '<option value="">Select Training Event</option>';

    for (let i = 0; i < events.length; i++) {
        trainingEventDropdown.innerHTML += `
            <option value="${events[i].title}">${events[i].title}</option>
        `;
    }
}

function saveRegistration() {
    let registrationId = document.getElementById("registrationId").value;
    let employeeName = document.getElementById("employeeName").value;
    let employeeId = document.getElementById("employeeId").value;
    let department = document.getElementById("department").value;
    let trainingEvent = document.getElementById("trainingEvent").value;
    let status = document.getElementById("status").value;

    if (
        employeeName === "" &&
        employeeId === "" &&
        department === "" &&
        trainingEvent === "" &&
        status === ""
    ){
        return;
    }
