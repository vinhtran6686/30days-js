let countdown;
const timerDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time]");
const audio = document.querySelector(`audio`);

function timer(seconds) {
  const now = Date.now();
  const then = now + seconds * 1000;
  // clear any existing timers
  clearInterval(countdown);

  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft < 0) {
      clearInterval(countdown);
      audio.play();
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minute = Math.floor(seconds / 60);
  const second = seconds % 60;
  const remainMinute = minute % 60;
  const text = `
   ${minute >= 60 ? `${Math.floor(minute / 60)}:` : ""}${
    remainMinute < 10 ? "0" : ""
  }${remainMinute < 60 ? remainMinute : ""}:${second < 10 ? "0" : ""}${second}
  `;
  timerDisplay.textContent = text;
  document.title.textContent = text;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const adjustedHour = hour > 12 ? hour - 12 : hour;
  const AMPM = hour < 12 ? "AM" : "PM";
  const minute = end.getMinutes();
  const adjustedMinute = minute < 10 ? '0' : '';
  endTime.textContent = `Be back at ${adjustedHour}:${adjustedMinute}${minute}${AMPM}`;
}

function handleClickTimer(e) {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach((e) => {
  e.addEventListener("click", handleClickTimer);
});

document.customForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const minute = this.minutes.value;
  this.reset();
  timer(minute * 60);
});
