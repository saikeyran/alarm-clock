// declare variables
const alarm_time_input = document.getElementById("alarm_time");
const set_alarm_button = document.getElementById("set_alarm");
const stop_alarm_button = document.getElementById("stop_alarm");
const alarm_sound = document.getElementById("alarm_sound");
const present_time = document.getElementById("current_time");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const am_pm = document.getElementById("am-pm");
const alarm_time_array = JSON.parse(localStorage.getItem("alarm_times")) || [];
const stored_alarm_time = localStorage.getItem("alarm_time");

// use to set dropdown selct options
document.addEventListener("DOMContentLoaded", (event) => {
  timeInputs(hours, 1, 12);
  timeInputs(minutes, 0, 59);
  timeInputs(seconds, 0, 59);
});

// function that sets options for select
function timeInputs(element, start, end) {
  for (let i = start; i <= end; i++) {
    const options = document.createElement("option");
    options.value = i < 10 ? "0" + i : i;
    options.innerHTML = i < 10 ? "0" + i : i;
    element.appendChild(options);
  }
}

// Get the current time in 24 hour format
function update_time() {
  present_time.innerText = new Date().toLocaleTimeString("en-US", {
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

update_time();
setInterval(update_time, 1000);

// add event listener on buttons
set_alarm_button.addEventListener("click", set_alarm);
stop_alarm_button.addEventListener("click", stop_alarm);

// set alarm button function
function set_alarm(e) {
  e.preventDefault();
  const alarm_time = `${hours.value}:${minutes.value}:${seconds.value} ${am_pm.value}`;
  if (alarm_time && !alarm_time_array.includes(alarm_time)) {
    alarm_time_array.push(alarm_time);
    localStorage.setItem("alarm_times", JSON.stringify(alarm_time_array));
    renderAlarms();
  }
}

// stop alarm button function
function stop_alarm() {
  alarm_sound.pause();
  //localStorage.clear();
  alarm_sound.currentTime = 0;
}

// check alarm function
function check_alarm() {
  const alarm_times = JSON.parse(localStorage.getItem("alarm_times")) || [];
  if (alarm_times.length === 0) return;
  const current_time = new Date().toLocaleTimeString("en-US", {
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  for (const alarm_time of alarm_times) {
    if (current_time === alarm_time) {
      play_alarm();
      alert("Alarm: Press OK To Stop");
      alarm_sound.pause();
    }
  }
}
setInterval(check_alarm, 1000);

// play alarm  function
function play_alarm() {
  alarm_sound.play();
}

// render alarm list  function
const alarmList = document.getElementById("alarmList");

function renderAlarms() {
  alarmList.innerHTML = "";
  const alarm_time_list = JSON.parse(localStorage.getItem("alarm_times")) || [];
  // const listItem = document.createElement('li');
  alarm_time_list.forEach((alarm_time, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
    <span>${alarm_time}</span>
    <button class="delete-button" data-index="${index}">Delete</button>
    `;
    const deleteButton = listItem.querySelector(".delete-button");
    deleteButton.addEventListener("click", function () {
      const index = this.dataset.index;
      alarm_time_array.splice(index, 1);
      localStorage.setItem("alarm_times", JSON.stringify(alarm_time_array));
      renderAlarms();
    });

    alarmList.appendChild(listItem);
  });
}

renderAlarms();
