  //sw
// if ("serviceWorker" in navigator) {
//   navigator.serviceWorker.register("sw.js")
//     .then(() => console.log("SW registered "))
//     .catch(err => console.log("SW error", err));
// }

  const clickSound = new Audio("click.wav");
  clickSound.preload = "auto";

 // function for both morning and evening azkar
  const loadAzkar = async function (file) {


    const cart = document.querySelector(".cart");
    cart.innerHTML = "";
try{
    const response = await fetch(file)
    // console.log(response);
    
      const data =await response.json()
      console.log(data)
      
       document.getElementsByClassName("divider")[0].innerHTML =`
                                              <div class="line"></div>
                                              <div class="circle"></div>
                                              <div class="line right"></div>`

        data.forEach(item => {

          cart.innerHTML += `
          <div class="mt-4 totalParts circleContainer border gradient-border">

            <div class="d-flex justify-content-between">
              <span class="circle-order-btn fs-13">${item.order}</span>
              <span class="totalDisplay circle-total-btn fs-13">${item.min}/${item.max}</span>
            </div>

            <p class="mt-3 fs-4">${item.verse}</p>

            <p class="mt-3 txt_white fst-italic">
              ${item.Tafsir}
            </p>

            <p>${item.Eng_trans}</p>

            <p class="mt-3 brown-text fst-italic">
              ${item.Author}
            </p>

            <button class="resetBtn btn gradient-btn text-light px-4 py-2 fs-5">
              <i class="fa-solid fa-rotate-left"></i>
            </button>

            <button class="countBtn btn gradient-btn text-white px-4 py-2">
              Tap to Count
            </button>

          </div>
          `;
        });

        attachLogic(); //after creating cards 
      }  catch (err){
          console.error("Error loading:", err);
  }}

  //cards logic of counting and styles
  function attachLogic() {

    const containers = document.querySelectorAll('.totalParts');

    containers.forEach(container => {

      const countBtn = container.querySelector('.countBtn');
      const resetBtn = container.querySelector('.resetBtn');
      const totalDisplay = container.querySelector('.totalDisplay');

      let [count, maxCount] = totalDisplay.textContent.split('/').map(Number);
//count
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
        } else {
          container.classList.add("shake");
          setTimeout(() => container.classList.remove("shake"), 400);
        }
      });

      //reset 
      resetBtn.addEventListener('click', () => {
        count = 0;
        totalDisplay.textContent = `0/${maxCount}`;
        totalDisplay.classList.remove('active', 'max-reached');
        container.classList.remove('max-reached', 'shake');

        clickSound.currentTime = 0;
        clickSound.play();
      });

    });
  }


  // Theme
  const setDark = function () {
    document.body.classList.add("dark");
    document.body.classList.remove("light");
    localStorage.setItem("theme", "dark");

    document.querySelector(".icon").classList.add("fa-moon");
    document.querySelector(".icon").classList.remove("fa-sun");

    document.querySelector(".icon-title").innerHTML = "أذكار المساء";
    document.querySelector(".evening").innerHTML = "Evening Remembrances";
    document.querySelector(".icon-desc").classList.add("text-light")
    document.querySelector(".icon-desc").innerHTML = "Recite these blessed words as the sun sets to seek Allah's protection and blessings";
  };

  const setLight = function () {
    document.body.classList.remove("dark");
    document.body.classList.add("light");
    localStorage.setItem("theme", "light");

    document.querySelector(".icon").classList.remove("fa-moon");
    document.querySelector(".icon").classList.add("fa-sun");

    document.querySelector(".icon-title").innerHTML = "أذكار الصباح";
    document.querySelector(".evening").innerHTML = "Morning Remembrances";
    document.querySelector(".icon-desc").classList.add("text-light")
    document.querySelector(".icon-desc").innerHTML = "Recite these blessed words as the sun raises to seek Allah's protection and blessings";
  };


 //saved theme
  // const savedTheme = localStorage.getItem("theme");

  // if (savedTheme === "dark") {
  //   setDark();
  //   loadAzkar("evening.json");
  // } else {
  //   setLight();
  //   loadAzkar("morning.json");
  // }


