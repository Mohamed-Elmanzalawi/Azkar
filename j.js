document.addEventListener("DOMContentLoaded", async() => {

      await addDateToHtml();
      document.querySelector(".bottom-section").style.visibility = "visible";


      const clickSound = new Audio("click.wav");
      clickSound.preload = "auto";

      const containers = document.querySelectorAll('.totalParts');

      containers.forEach(container => {
        const countBtn = container.querySelector('.countBtn');
        const resetBtn = container.querySelector('.resetBtn');
        const totalDisplay = container.querySelector('.totalDisplay');

        let [count, maxCount] = totalDisplay.textContent.split('/').map(Number);

        countBtn.addEventListener('click', () => {
          if (count < maxCount) {
            count++;
            totalDisplay.textContent = `${count}/${maxCount}`;
            totalDisplay.classList.add("active");

            clickSound.currentTime = 0;
            clickSound.play();

            if (count === maxCount) {
              totalDisplay.classList.add('max-reached');
              container.classList.add('max-reached', 'shake');
            }
          }
        });

        resetBtn.addEventListener('click', () => {
          count = 0;
          totalDisplay.textContent = `0/${maxCount}`;
          totalDisplay.classList.remove('active', 'max-reached');
          container.classList.remove('max-reached', 'shake');

          clickSound.currentTime = 0;
          clickSound.play();
        });

        [countBtn, resetBtn].forEach(btn => {
          btn.addEventListener("keydown", e => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              btn.click();
            }
          });
        });
      });
    });


async function getJsonData() {
  const res = await fetch("Azkar_Almasaa.json");
  const data = await res.json();
  return data;
}

async function addDateToHtml() {
  const azkar = await getJsonData();
  const content = document.querySelector(".page-content");
  for (zikr of azkar) {
    
    content.innerHTML += `
    <div class="mt-4 totalParts circleContainer border gradient-border">
        <div class="d-flex justify-content-between">

    <span class="circle-order-btn fs-13">${zikr.max_count}</span>
    <span class="totalDisplay circle-total-btn fs-13">0/${zikr.max_count}</span>
    
    </div>
        <p class="mt-3 fs-4">${zikr.verse}</p>
        <p class="mt-3 text-white-50 fst-italic">${zikr.Eng_trans}</p>
        <p>${zikr.Tafsir}</p>
        <p class="mt-3 brown-text fst-italic">${zikr.Author}</p>
    <button class="resetBtn btn gradient-btn text-white px-4 py-2 fs-5" aria-label="Reset zikr counter"><i class="fa-solid fa-rotate-left"></i></button>
        <button class=" countBtn btn gradient-btn text-white px-4 py-2 clickedVoiceBtn"   aria-label="Tap to count zikr repetitions">Tap to Count</button>
    </div>
`
  }
}