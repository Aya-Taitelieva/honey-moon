//! json-server -w db.json -p 8000

const APIwish = "http://localhost:8000/wishlist";
const cards = document.querySelector(".cards");
const check = document.querySelector("#check-apple");
// pagination btn
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const pageText = document.querySelector(".page");
const pagination = document.querySelector(".pagination");

const limit = 4;
let currentPage = 1;
let pageTotalCount = 1;

//todo contrast
const navbar = document.querySelector(".no-active");
const btnMenu = document.querySelector(".btn-outline-dark");
const footer = document.querySelector(".text-centers");

//todo фильтрация по категории
const filter = document.querySelectorAll("input[type='radio']");
let category = "";
//todo поиск
const searchInp = document.querySelector(".search-inp");
let searchVal = "";

render();
async function getProducts() {
  const res = await fetch(
    `${APIwish}?q=${searchVal}&category_like=${category}&_limit=${limit}&_page=${currentPage}`
  );
  const data = await res.json();
  const count = res.headers.get("x-total-count");
  pageTotalCount = Math.ceil(count / limit);
  return data;
}

//todo функция для отображения данных
async function render() {
  const data = await getProducts();
  cards.innerHTML = "";
  data.forEach((item) => {
    cards.innerHTML += `
      <div class="card" id="${item.id}">
      <div class="image">
        <img
          src="${item.img}"
          alt=""
        />
      </div>
      <span class="title">${item.title}</span>
      <span class="price">$${item.price}</span>
      <button class="btn-icon">
   <svg class="icon heart active" width="30" height="30" viewBox="0 0 24 24" id="${item.id}" xmlns="http://www.w3.org/2000/svg"><path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"></path></svg>
  </button>
    </div>
        `;
  });
}

//todo функция удаления
async function deleteProduct(id) {
  //? запрос на удаление
  await fetch(`${APIwish}/${id}`, {
    method: "DELETE",
  });
  //? стянуть и отобразить актуальные данные
  render();
}

//todo heart button
let id = null;
document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("heart")) {
    id = e.target.id;
    deleteProduct(id);
    e.target.classList.remove("active");
  }
});

//todo filter

filter.forEach((item) => {
  item.addEventListener("click", (e) => {
    category = e.target.id;
    render();
  });
});

//todo search
searchInp.addEventListener("input", () => {
  searchVal = searchInp.value;
  render();
});

//todo contrast
let clicks = 0;
check.addEventListener("click", (e) => {
  clicks++;
  if (clicks % 2 !== 0) {
    document.body.style.background = "rgba(0, 0, 0, 0.689)";
    document.body.style.color = "white";
    navbar.classList.toggle("no-active");
    navbar.classList.toggle("yes-active");
    btnMenu.classList.toggle("btn-outline-light");
    btnMenu.classList.toggle("btn-outline-dark");
    footer.style.background = "black";
    pagination.classList.toggle("pagination");
    pagination.classList.toggle("pagination-active");
  } else {
    document.body.style.background =
      "url(https://img.freepik.com/free-photo/gradient-peach-background-with-pink-shades_53876-105240.jpg?w=900&t=st=1687776700~exp=1687777300~hmac=1657fe5588c1a4af21882811a306af9e74e30c1a106eafab63241e7b7fe12c47)";
    document.body.style.color = "black";
    navbar.classList.toggle("no-active");
    navbar.classList.toggle("yes-active");
    btnMenu.classList.toggle("btn-outline-dark");
    btnMenu.classList.toggle("btn-outline-light");
    footer.style.background = "hsl(0, 28%, 87%)";
    pagination.classList.toggle("pagination-active");
    pagination.classList.toggle("pagination");
  }
});

//todo pagination

prev.addEventListener("click", () => {
  if (currentPage <= 1) {
    return;
  }
  currentPage--;
  pageText.innerText = currentPage;
  render();
});

next.addEventListener("click", () => {
  if (currentPage >= pageTotalCount) {
    return;
  }
  currentPage++;
  pageText.innerText = currentPage;
  render();
});

const totalPrice = document.querySelector(".price-container");
const ul = document.querySelector(".lists");
const li = document.querySelector(".list");

async function priceRender() {
  const data = await getProducts();
  let sum = 0;
  data.forEach((item) => {
    sum += item.price;
    totalPrice.innerText = `${sum}$`;
    ul.innerHTML += `
     <li class="list">
                        <span>
                          <svg
                            aria-hidden="true"
                            stroke="currentColor"
                            stroke-width="2"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M4.5 12.75l6 6 9-13.5"
                              stroke-linejoin="round"
                              stroke-linecap="round"></path>
                          </svg>
                        </span>
                        <p>${item.title}</p>
                      </li>
    `;
  });
}
priceRender();
