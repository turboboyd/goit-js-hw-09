import { Notify } from 'notiflix/build/notiflix-notify-aio';

document.querySelector('.form').addEventListener('submit', submitBtn);

function submitBtn(e) {
  e.preventDefault();
  const valueDelay = Number(document.querySelector('input[name="delay"]').value);
  const valueStep = Number(document.querySelector('input[name="step"]').value);
  const valueAmount = Number(document.querySelector('input[name="amount"]').value);
  for (let i = 0; i < valueAmount; i++) {
    createPromise(i + 1 , valueDelay + i * valueStep)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
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

