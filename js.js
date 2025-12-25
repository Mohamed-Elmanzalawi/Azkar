// select all counter containers
const containers = document.querySelectorAll('.totalParts');

containers.forEach(container => {
  const countBtn = container.querySelector('.countBtn');
  const resetBtn = container.querySelector('.resetBtn');
  const totalDisplay = container.querySelector('.totalDisplay');

  // parse count and maxCount from span text
  let [count, maxCount] = totalDisplay.textContent.split('/').map(Number);

  // Count button
  countBtn.addEventListener('click', () => {
    if (count < maxCount) {
      count++;
      totalDisplay.textContent = `${count}/${maxCount}`;

      // change text color to yellow with glow
      totalDisplay.style.color = '#f5e830ff';
      totalDisplay.style.textShadow = '0 0 10px #8a8320ff';

      // highlight when max reached
      if (count === maxCount) {
        totalDisplay.classList.add('max-reached');
        container.classList.add('max-reached');
      }
    }
  });

  // Reset button
  resetBtn.addEventListener('click', () => {
    count = 0;
    totalDisplay.textContent = `0/${maxCount}`;
    totalDisplay.style.color = 'white';
    totalDisplay.style.textShadow = 'none';
    totalDisplay.classList.remove('max-reached');
    container.classList.remove('max-reached');
  });
});


// Load the sound
// document.addEventListener("DOMContentLoaded", () => {
//   // Function to speak any text
//   function speak(text) {
//     window.speechSynthesis.cancel(); // stop any ongoing speech
//     const msg = new SpeechSynthesisUtterance(text);
//     msg.rate = 1;   // speed
//     msg.pitch = 1;  // pitch
//     msg.volume = 1; // volume

//     // Optional: choose English voice
//     const voices = window.speechSynthesis.getVoices();
//     const enVoice = voices.find(v => v.lang.startsWith("en"));
//     if (enVoice) msg.voice = enVoice;

//     window.speechSynthesis.speak(msg);
//   }

//   // Attach click to all buttons with class clickedVoiceBtn
//   const buttons = document.querySelectorAll(".clickedVoiceBtn");
//   buttons.forEach(btn => {
//     btn.addEventListener("click", () => {
//       const text = btn.innerText; // get button text
//       speak(text);
//     });
//   });
// });

document.addEventListener("DOMContentLoaded", () => {
  // Load click sound
  const clickSound = new Audio("click.mp3"); //path

  // Select buttons
  const buttons = document.querySelectorAll(".resetBtn, .countBtn");

  // Add click event
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      clickSound.currentTime = 0; // restart sound
      clickSound.play();
    });
  });
});
