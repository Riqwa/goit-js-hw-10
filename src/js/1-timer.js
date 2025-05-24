import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const input = document.querySelector("#datetime-picker");

let userSelectedDate;
let intervalId;

const btn = document.querySelector('[data-start]');
btn.setAttribute('disabled', true);



const timerElements = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};



const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    ;

    if (selectedDates[0] <= Date.now()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      btn.disabled = true;
    } else {
      btn.disabled = false;
      userSelectedDate = selectedDates[0];
      input.disabled = false;
    }
  }
}


flatpickr(input, options);




function addLeadingZero(ms) {
    const { days, hours, minutes, seconds } = convertMs(ms);
    let d = days.toString().padStart(2, '0');
    let h = hours.toString().padStart(2, '0');
    let m = minutes.toString().padStart(2, '0');
    let s = seconds.toString().padStart(2, '0');
return {d, h, m, s}
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}



btn.addEventListener('click', onClick);
function onClick() {
  input.disabled = true; 
  btn.disabled = true; 
    intervalId = setInterval(() => {
        const currentTime = Date.now();
        const diffMs = userSelectedDate - currentTime;
        const timeStr = addLeadingZero(diffMs);

        timerElements.days.textContent = timeStr.d;
        timerElements.hours.textContent = timeStr.h;
        timerElements.minutes.textContent = timeStr.m;
        timerElements.seconds.textContent = timeStr.s;

        btn.setAttribute('disabled', true); 

        if (diffMs < 1000) {
            clearInterval(intervalId);
            input.disabled = false; 
            // btn.setAttribute('disabled', true);
        }
   
    }, 1000)
    

}




