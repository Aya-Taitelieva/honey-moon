//todo contrast
const check = document.querySelector("#check-apple");
const navbar = document.querySelector(".no-active");
const btnMenu = document.querySelector(".btn-outline-dark");
const btnSingUpUser = document.querySelector(".sing-up-user");
const btnLogInUser = document.querySelector(".log-in-user");
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
    btnSingUpUser.classList.toggle("btn-outline-light");
    btnSingUpUser.classList.toggle("btn-outline-dark");
    btnLogInUser.classList.toggle("btn-outline-light");
    btnLogInUser.classList.toggle("btn-outline-dark");
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
    btnSingUpUser.classList.toggle("btn-outline-light");
    btnSingUpUser.classList.toggle("btn-outline-dark");
    btnLogInUser.classList.toggle("btn-outline-light");
    btnLogInUser.classList.toggle("btn-outline-dark");
    btnSingUp.classList.toggle("btn-outline-light");
    btnSingUp.classList.toggle("btn-outline-dark");
    footer.style.background = "hsl(0, 28%, 87%)";
    textLingerie.style.color = "black";
    textLingerie.style.color = "white";
  }
});

//todo registration

const API = "http://localhost:8000/profiles";

const signUp = document.querySelector(".signUp");
const logIn = document.querySelector(".logIn");
const nameUser = document.querySelector(".nameUser");

const regEmail = document.querySelector(".registration-email");
const regUser = document.querySelector(".registration-username");
const regPass = document.querySelector(".registration-password");
const signUpBtn = document.querySelector(".signUp-btn");

async function addProfile(newProfile) {
  await fetch(API, {
    method: "POST",
    body: JSON.stringify(newProfile),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

signUpBtn.addEventListener("click", (e) => {
  if (
    !regUser.value.trim() ||
    !regPass.value.trim() ||
    !regEmail.value.trim()
  ) {
    return;
  }

  const profile = {
    username: regUser.value,
    email: regEmail.value,
    password: regPass.value,
  };

  addProfile(profile);

  regUser.value = "";
  regEmail.value = "";
  regPass.value = "";

  signUp.classList.add("d-none");
  logIn.classList.add("d-none");
  nameUser.classList.add(".nameUser-active");
  nameUser.innerText = profile.username;
});

//todo autorization

const logUser = document.querySelector(".login-username");
const logPass = document.querySelector(".login-password");
const logBtn = document.querySelector(".login-btn");

async function getProfiles() {
  const res = await fetch(API);
  const data = await res.json();
  return data;
}
logBtn.addEventListener("click", async () => {
  const res = await getProfiles();
  const findElement = res.find((item) => {
    if (item.username == logUser.value && item.password == logPass.value) {
      return item;
    }
  });
  signUp.classList.add("d-none");
  logIn.classList.add("d-none");
  nameUser.classList.add(".nameUser-active");
  nameUser.innerText = findElement.username;
});
