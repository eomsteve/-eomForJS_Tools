import { add } from './math/math.js'
const x = document.querySelector('#x'),
      y = document.querySelector('#y'),
      p = document.querySelector('#result'),
      btn = document.querySelector('#addBtn');

btn.addEventListener('click', (e) => {
  const result = add(parseInt(x.value), parseInt(y.value));
  p.innerText = result;
})


