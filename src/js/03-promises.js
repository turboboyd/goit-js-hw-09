import { Notify } from 'notiflix/build/notiflix-notify-aio';

document.querySelector('.form').addEventListener('submit', submitBtn);

function submitBtn(e) {
  e.preventDefault();
  const valueDelay = document.querySelector('input[name="delay"]').value;
  const valueStep = document.querySelector('input[name="step"]').value;
  const valueAmount = document.querySelector('input[name="amount"]').value;
  for (let index = 0; index < valueAmount; index++) {
    createPromise(valueDelay, valueStep)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
