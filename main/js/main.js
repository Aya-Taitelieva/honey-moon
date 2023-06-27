//todo contrast
const check = document.querySelector("#check-apple");
const navbar = document.querySelector(".no-active");
const btnMenu = document.querySelector(".btn-outline-dark");
const registr = document.querySelector(".registration");
const btnSingUp = document.querySelector(".sing-up");
const footer = document.querySelector(".text-centers");
const textLingerie = document.querySelector(".text-lingerie");
const textSwimwear = document.querySelector(".text-swimwear");
const secondWrapp = document.querySelector(".second-wrapper");
const wrapper = document.querySelector(".wrapper");

//todo contrast
let clicks = 0;
check.addEventListener("click", (e) => {
  clicks++;
  if (clicks % 2 !== 0) {
    wrapper.style.background = "rgba(0, 0, 0, 0.689)";
    document.body.style.color = "white";
    navbar.classList.toggle("no-active");
    navbar.classList.toggle("yes-active");
    btnMenu.classList.toggle("btn-outline-light");
    btnMenu.classList.toggle("btn-outline-dark");
    registr.classList.toggle("btn-outline-light");
    registr.classList.toggle("btn-outline-dark");
    btnSingUp.classList.toggle("btn-outline-light");
    btnSingUp.classList.toggle("btn-outline-dark");
    footer.style.background = "black";
    textLingerie.style.color = "black";
    textLingerie.style.color = "white";
  } else {
    document.body.style.background =
      "url(https://www.agentprovocateur.com/tco-images/unsafe/2595x1298/filters:upscale():fill(white):quality(80)/https://www.agentprovocateur.com/static/cms/media/SS23_CAMPAIGN_KATERYNA_RED_INEZZA_RED_RGB-4.jpg)";
    wrapper.style.background = "rgba(0, 0, 0, 0.0)";
    document.body.style.color = "black";
    navbar.classList.toggle("no-active");
    navbar.classList.toggle("yes-active");
    btnMenu.classList.toggle("btn-outline-dark");
    btnMenu.classList.toggle("btn-outline-light");
    registr.classList.toggle("btn-outline-light");
    registr.classList.toggle("btn-outline-dark");
    btnSingUp.classList.toggle("btn-outline-light");
    btnSingUp.classList.toggle("btn-outline-dark");
    footer.style.background = "hsl(0, 28%, 87%)";
    textLingerie.style.color = "black";
    textLingerie.style.color = "white";
  }
});
