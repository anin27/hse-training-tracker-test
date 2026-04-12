let registrations =[]

let savedRegistrations = localStorage.getItem("registrations");
if (savedRegistrations) {
    registrations = JSON.parsse(savedRegistrations);
    
}
loadTrainingEvents();
showRegistration();

function loadTrainingEvents() {
    let dropdown = document.getElementById("trainingEvent");
    dropdown.innerHTML = `<option value=""> Select Training Events</option>`;

    let savedEvents = localStorage.getItem("events");
    let events = [];
    if (savedEvents){
        events = JSON.parse(savedEvents);
        for (let i = 0, i <events.length; i++){
            let option = "<opion>" + events[1].title + "</options>";
            dropdown.innerHTML += option;
        }
    }
}