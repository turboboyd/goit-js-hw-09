import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const myInput = document.querySelector('input[type="text"]');
const btnStart = document.querySelector('button[data-start]');

btnStart.disabled = true;
let countDown = 0;
// let startTimer = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      return Notify.failure('Please choose a date in the future');
    } else {
      btnStart.disabled = false;
      startTimer = selectedDates[0];
      countDown = startTimer - Date.now();
    }
  },
};

btnStart.addEventListener('click', () => {
  timer.start();
});

flatpickr(myInput, options);


const timer = {
  timerId: null,
  isActive: false,
  start() {
    if (this.isActive) {
      return;
    }

    this.isActive = true;

    document.querySelector('#datetime-picker').disabled = true;
    this.timerId = setInterval(() => {
      const currentTime = Date.now();
      countDown = startTimer - currentTime;
      const { days, hours, minutes, seconds } = convertMs(countDown);
      displayCountDown(days, hours, minutes, seconds);
      btnStart.disabled = true;
      document.querySelector('#datetime-picker').disabled = true;
      if (countDown <= 0) {
        myInput.disabled = false;
        displayCountDown(0, 0, 0, 0);
        clearInterval(this.timerId);
      }
    }, 1000);
  },
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function displayCountDown(days, hours, minutes, seconds) {
  document.querySelector('span[data-days]').textContent = addLeadingZero(days);
  document.querySelector('span[data-hours]').textContent =
    addLeadingZero(hours);
  document.querySelector('span[data-minutes]').textContent =
    addLeadingZero(minutes);
  document.querySelector('span[data-seconds]').textContent =
    addLeadingZero(seconds);
}
