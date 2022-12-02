import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
const timerEl = document.querySelector('.timer');
const fieldElList = document.querySelectorAll('.field');
const startBtn = document.querySelector('[data-start]');

startBtn.disabled = true;

timerEl.style.marginTop = '20px';
timerEl.style.display = 'flex';
timerEl.style.gap = '20px';
fieldElList.forEach(el => {
  el.style.display = 'flex';
  el.style.flexDirection = 'column';
  el.style.alignItems = 'center';
  el.style.lineHeight = '1.5';
  el.style.fontWeight = '500';
  el.firstElementChild.style.fontSize = '30px';
  el.lastElementChild.style.textTransform = 'uppercase';
  el.lastElementChild.style.fontSize = '12px';
});
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] - Date.now() < 0) {
      alert('Please choose a date in the future');
    } else {
      startBtn.disabled = !startBtn.disabled;
    }
  },
};

const flatpickrDate = flatpickr('#datetime-picker', options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(num) {
  return String(num).padStart(2, 0);
}

let intervalId;

function onStartBtnClick() {
  intervalId = setInterval(() => {
    const diffInMs = flatpickrDate.selectedDates[0] - Date.now();
    if (diffInMs <= 0) {
      clearInterval(intervalId);
      return;
    }
    const { days, hours, minutes, seconds } = convertMs(diffInMs);
    document.querySelector('[data-days]').textContent = addLeadingZero(days);
    document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
    document.querySelector('[data-minutes]').textContent =
      addLeadingZero(minutes);
    document.querySelector('[data-seconds]').textContent =
      addLeadingZero(seconds);
  }, 1000);
}

startBtn.addEventListener('click', onStartBtnClick);
