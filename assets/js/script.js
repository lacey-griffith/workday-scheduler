
var taskDataObj = [];
var tasks = [];

function displayDate() {
    var displayDayEl = document.querySelector("#currentDay");

    var currentDay = moment().format("dddd[,] MMMM Do[,] YYYY");
    displayDayEl.textContent = currentDay;
    console.log(currentDay);
    plannerLayout();
    checkStatus();
    loadTasks();
}

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
},  {
    time: 6,
    meridiem: "PM",
    military: 18
},{
    time: 7,
    meridiem: "PM",
    military: 19
}];

function plannerLayout() {
    for (var i = 0; i < hoursOfDay.length; i++) {
        var calendarContainer = document.querySelector("#container");

        //create div to hold HOUR and TASK
       var timeBlockContainer = document.createElement("div")
        timeBlockContainer.className = "row time-block";

        //create div to display HOUR
        var timeElDisplay = document.createElement("div")
        timeElDisplay.className = "col-2 time-block hour";
        timeElDisplay.id = "time-hour-" + hoursOfDay[i].time;
        timeElDisplay.textContent = hoursOfDay[i].time + hoursOfDay[i].meridiem;
        timeBlockContainer.appendChild(timeElDisplay);

        //create div to display TASK container
        var taskElDisplay = document.createElement("div")
        taskElDisplay.className = "col-9 time-block task-container";
        taskElDisplay.id = "task-container-" + hoursOfDay[i].time;


        //create text area for TASK events
        var taskEl = document.createElement("textarea")
        taskEl.setAttribute("type", "text")
        taskEl.setAttribute("name", "task")
        taskEl.className = "text-area"
        taskEl.id = "task-item-" + hoursOfDay[i].time
        taskEl.textContent = "test";
        taskElDisplay.appendChild(taskEl);

        //create div to hold SAVE button
        var saveContainer = document.createElement("div")
        saveContainer.className = "col-1 btn-container row"
        
        //create SAVE button for tasks
        var saveBtn = document.createElement("button")
        saveBtn.className = "saveBtn"
        saveBtn.textContent = "Save"
        saveBtn.id = "save"+ hoursOfDay[i].time
        saveBtn.addEventListener("click", saveTask);
        saveContainer.appendChild(saveBtn)
        
        timeBlockContainer.appendChild(taskElDisplay);
        timeBlockContainer.appendChild(saveContainer);
        calendarContainer.appendChild(timeBlockContainer);

        //put info as object
        var taskDataObj = {
            taskId: taskEl.id,
            saveBtnId: saveBtn.id,
            taskTime: hoursOfDay[i].time,
            taskInput: taskEl.textContent
        }
        tasks.push(taskDataObj)
    }
    checkStatus();
};

function checkStatus() {
    var currentTime = moment().hour();

    for (var i = 0; i < hoursOfDay.length; i++) {

        if (currentTime > hoursOfDay[i].military) {

            $("#time-hour-" + hoursOfDay[i].time)
            .removeClass("present")
            .removeClass("future")
            .addClass("past");

            $("#task-container-" + hoursOfDay[i].time)
            .removeClass("present")
            .removeClass("future")
            .addClass("past");
        }
        
        else if (currentTime === hoursOfDay[i].military) {

            $("#time-hour-" + hoursOfDay[i].time)
            .removeClass("past")
            .removeClass("future")
            .addClass("present");

            $("#task-container-" + hoursOfDay[i].time)
            .removeClass("past")
            .removeClass("future")
            .addClass("present");
        }
        
        else if (currentTime < hoursOfDay[i].military) {
            
            $("#time-hour-" + hoursOfDay[i].time)
            .removeClass("present")
            .removeClass("past")
            .addClass("future");

            $("#task-container-" + hoursOfDay[i].time)
            .removeClass("present")
            .removeClass("past")
            .addClass("future");
        }
    }
};

var taskList = [];

function saveTask(event, taskDataObj) {
    $(".saveBtn").on("click", console.log("working!"));
    
    if (event.target.id === "save8") {
        var taskInput = document.querySelector("#task-item-8").value
        taskList.push(taskInput);
        localStorage.setItem("task", taskInput)

        console.log(taskInput)
        console.log(taskList);
    }
    if (event.target.id === "save9") {
        var taskInput = document.querySelector("#task-item-9").value
        taskList.push(taskInput);
        localStorage.setItem("task", taskInput)
        
        console.log(taskInput)
        console.log(taskList);
    }
   
    console.log(event.target.id)
}

function loadTasks () {
    localStorage.getItem("task")
    console.log(localStorage.getItem("task"));
}
// WHEN I click into a time block
// THEN I can enter an event
// WHEN I click the save button for that time block
// THEN the text for that event is saved in local storage
// WHEN I refresh the page
// THEN the saved events persist

displayDate();

setInterval(checkStatus(), (1000 * 60) * 1);
