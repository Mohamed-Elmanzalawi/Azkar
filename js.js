
const resetBtn = document.getElementById('resetBtn');

const countBtn = document.getElementById('countBtn');
const totalDisplay = document.getElementById('totalDisplay');
const circleContainer = document.getElementById('totalParts'); // outer div with .gradient-border

// Parse maxCount from HTML
let [count, maxCount] = totalDisplay.textContent.split('/').map(Number);


countBtn.addEventListener('click', () => {
  if (count < maxCount) {
    count++;
    totalDisplay.textContent = `${count}/${maxCount}`;

    // change text color to yellow with glow
    totalDisplay.style.color = 'yellow';
    totalDisplay.style.textShadow = '0 0 10px yellow';

    // if max reached, add highlight classes
    if (count === maxCount) {
      totalDisplay.classList.add('max-reached');  // circle highlight
      circleContainer.classList.add('max-reached'); // card highlight
    }  else {
  countBtn.disabled = false;
  }
  }
});

resetBtn.addEventListener('click', () => {
  count = 0;
  totalDisplay.textContent = `0/${maxCount}`;
  totalDisplay.style.color = 'white';
  totalDisplay.style.textShadow = 'none';
  circleContainer.classList.remove('max-reached');
  totalDisplay.classList.remove('max-reached');
});