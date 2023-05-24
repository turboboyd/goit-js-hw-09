function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const btnStart = document.querySelector(`button[data-start]`);
const btnStop = document.querySelector(`button[data-stop]`);
const bodyEl = document.querySelector('body');

let timerId = null;
let isActivBtn = false;

btnStart.addEventListener('click', () => {
  if (isActivBtn) {
    return;
  }
  timerId = setInterval(() => {
    isActivBtn = true;
      console.log('fskfk');
    btnStart.disabled = true;
    btnStop.disabled = false;
      
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

btnStop.addEventListener('click', () => {
  clearInterval(timerId);
    isActivBtn = false;
    btnStart.disabled = false;
    btnStop.disabled = true;
  console.log('safasf');
});
