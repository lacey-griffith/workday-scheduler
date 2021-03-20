// GIVEN I am using a daily planner to create a schedule
// WHEN I open the planner
// THEN the current day is displayed at the top of the calendar
var displayDayEl = document.querySelector("#currentDay");
var calendarContainer = document.querySelector("#container");
var taskEl = document.getElementById("#task-item");
var timeEl = document.getElementById("#time-hour");

var timeBlockContainer = document.createElement("div");
var taskElDisplay = document.createElement("div");
var timeElDisplay = document.createElement("div");

function displayDate() {
    var currentDay = moment().format("dddd[,] MMMM Do[,] YYYY");
    displayDayEl.textContent = currentDay;
    console.log(currentDay);
    plannerLayout();
}
// WHEN I scroll down
// THEN I am presented with time blocks for standard business hours
var hoursOfDay = [{
    time: 8,
    meridiem: "AM",
    military: 8
}, {
    time: 9,
    meridiem: "AM",
    military: 9,
}, {
    time: 10,
    meridiem: "AM",
    military: 10,
}, {
    time: 11,
    meridiem: "AM",
    military: 11
}, {
    time: 12,
    meridiem: "PM",
    military: 12
}, {
    time: 1,
    meridiem: "PM",
    military: 13
}, {
    time: 2,
    meridiem: "PM",
    military: 14
}, {
    time: 3,
    meridiem: "PM",
    military: 15
}, {
    time: 4,
    meridiem: "PM",
    military: 16
}, {
    time: 5,
    meridiem: "PM",
    military: 17
}];

function plannerLayout() {
    for (var i = 0; i < hoursOfDay.length; i++) {
        timeBlockContainer = document.createElement("div")
        timeBlockContainer.className = "row time-block";

        timeElDisplay = document.createElement("div")
        timeElDisplay.className = "col-2 time-block hour";
        timeElDisplay.id = "time-hour-" + hoursOfDay[i].time;
        timeElDisplay.textContent = hoursOfDay[i].time + hoursOfDay[i].meridiem;
        timeBlockContainer.appendChild(timeElDisplay);

        taskElDisplay = document.createElement("div")
        taskElDisplay.className = "col-10 time-block text-area";
        taskElDisplay.id = "task-item-" + hoursOfDay[i].time;
        timeBlockContainer.appendChild(taskElDisplay);

        calendarContainer.appendChild(timeBlockContainer);
        checkStatus();
    }
};

function checkStatus() {
    var currentTime = moment().hour();

    for (var i = 0; i < hoursOfDay.length; i++) {
        if (currentTime > hoursOfDay[i].military) {

            $(timeElDisplay)
            .removeClass("present")
            .removeClass("future")
            .addClass("past");

            $(taskElDisplay)
            .removeClass("present")
            .removeClass("future")
            .addClass("past");

            //console.log(timeElDisplay)
            console.log("working-past", hoursOfDay[i].military)
        }
        
        else if (currentTime === hoursOfDay[i].military) {

            $(timeElDisplay)
            .removeClass("past")
            .removeClass("future")
            .addClass("present");

            $(taskElDisplay)
            .removeClass("past")
            .removeClass("future")
            .addClass("present");

            //console.log(timeElDisplay)
            console.log("working-present", hoursOfDay[i].military);
        }
        
        else if (currentTime < hoursOfDay[i].military) {

            $(timeElDisplay)
            .removeClass("present")
            .removeClass("past")
            .addClass("future");

            $(taskElDisplay)
            .removeClass("present")
            .removeClass("past")
            .addClass("future");

            //console.log(timeElDisplay)
            console.log("working-future", hoursOfDay[i].time);
        }
    }

};
// WHEN I view the time blocks for that day
// THEN each time block is color-coded to indicate whether it is in the past, present, or future

// WHEN I click into a time block
// THEN I can enter an event
// WHEN I click the save button for that time block
// THEN the text for that event is saved in local storage
// WHEN I refresh the page
// THEN the saved events persist







displayDate();