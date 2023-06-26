//! json-server -w db.json -p 8000

const APIwish = "http://localhost:8000/wishlist";
const cards = document.querySelector(".cards");

//todo фильтрация по категории
const filter = document.querySelectorAll("input[type='radio']");
let category = "";
//todo поиск
const searchInp = document.querySelector(".search-inp");
let searchVal = "";

render();
async function getProducts() {
  const res = await fetch(
    `${APIwish}?q=${searchVal}&category_like=${category}`
  );
  const data = await res.json();
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
