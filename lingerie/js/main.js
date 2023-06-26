//! json-server -w db.json -p 8000

const API = "http://localhost:8000/wear";
const APIwish = "http://localhost:8000/wishlist";

//todo элемент, куда мы добавляем  карточки
const wrapper = document.querySelector(".wrapper");
const btnPagination = document.querySelector(".btn-pagination");
const next = document.querySelector(".page");
const searchInp = document.querySelector(".search-inp");
let searchVal = "";

//todo фильтрация по категории
const filter = document.querySelectorAll("input[type='radio']");
let category = "";

//todo admin-panel
const btnPanel = document.querySelector(".show-panel");
const addForm = document.querySelector("#add-form");
const titleInp = document.querySelector("#title");
const priceInp = document.querySelector("#price");
const imageInp = document.querySelector("#image");
const categoryInp = document.querySelector("#category");

//todo edit-panel
const editForm = document.querySelector("#edit-form");
const editTitleInp = document.querySelector("#edit-title");
const editPriceInp = document.querySelector("#edit-price");
const editImageInp = document.querySelector("#edit-image");
const editCategoryInp = document.querySelector("#edit-category");
const editBtn = document.querySelector(".edit-btn");

render();

async function getProducts() {
  const res = await fetch(`${API}?q=${searchVal}&category_like=${category}`);
  const data = await res.json();
  return data;
}

//todo функция для отображения данных
async function render() {
  const data = await getProducts();
  wrapper.innerHTML = "";
  data.forEach((item) => {
    wrapper.innerHTML += `
        <div class="card" id="${item.id}">
        <button class="edit-button" data-bs-toggle="modal"
        data-bs-target="#exampleModal">
        <svg id="${item.id}" xmlns="http://www.w3.org/2000/svg" width="25" viewBox="0 0 20 20" height="25" fill="none" class="svg-edit-icon"><g stroke-width="1.5" stroke-linecap="round" stroke="#000000"><circle r="2.5" cy="10" cx="10"></circle><path fill-rule="evenodd" d="m8.39079 2.80235c.53842-1.51424 2.67991-1.51424 3.21831-.00001.3392.95358 1.4284 1.40477 2.3425.97027 1.4514-.68995 2.9657.82427 2.2758 2.27575-.4345.91407.0166 2.00334.9702 2.34248 1.5143.53842 1.5143 2.67996 0 3.21836-.9536.3391-1.4047 1.4284-.9702 2.3425.6899 1.4514-.8244 2.9656-2.2758 2.2757-.9141-.4345-2.0033.0167-2.3425.9703-.5384 1.5142-2.67989 1.5142-3.21831 0-.33914-.9536-1.4284-1.4048-2.34247-.9703-1.45148.6899-2.96571-.8243-2.27575-2.2757.43449-.9141-.01669-2.0034-.97028-2.3425-1.51422-.5384-1.51422-2.67994.00001-3.21836.95358-.33914 1.40476-1.42841.97027-2.34248-.68996-1.45148.82427-2.9657 2.27575-2.27575.91407.4345 2.00333-.01669 2.34247-.97026z" clip-rule="evenodd"></path></g></svg>
      </button>
              <div class="image">
              <img
            src="${item.img}"
            alt=""
          />
        </div>
        <span class="title">${item.title}</span>
        <span class="price">$${item.price}</span>
              <button class="btn-icon">
          <svg class="icon heart" width="30" height="30" viewBox="0 0 24 24" id="${item.id}" xmlns="http://www.w3.org/2000/svg"><path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"></path></svg>
          </button>
      </div>
      `;
  });
}

//todo pagination
let page = 2;
btnPagination.addEventListener("click", async () => {
  const data = await getProducts();
  if (page == 1) {
    page += 2;
  } else if (page >= data.length) {
    page = 1;
  } else {
    page++;
  }
  next.setAttribute("href", `#${page}`);
});

//todo search
searchInp.addEventListener("input", () => {
  searchVal = searchInp.value;
  render();
});

//todo добавить продукт в wishlist

async function addProductWish(newProduct) {
  await fetch(APIwish, {
    method: "POST",
    body: JSON.stringify(newProduct),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function getOneProduct(id) {
  const res = await fetch(`${API}/${id}`);
  const data = await res.json();
  return data;
}

//todo heart button
let id = null;
document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("heart")) {
    e.target.classList.toggle("active");
    id = e.target.id;
    const res = await getOneProduct(id);

    const wishProduct = {
      id: res.id,
      title: res.title,
      price: res.price,
      img: res.img,
      category: res.category,
    };
    addProductWish(wishProduct);
  }
});

//todo filter

filter.forEach((item) => {
  item.addEventListener("click", (e) => {
    category = e.target.id;
    render();
  });
});

//todo show/hide admin panel

btnPanel.addEventListener("click", () => {
  addForm.classList.toggle("d-none");
  addForm.classList.toggle("d-flex");
});

//todo добавить новый продукт
async function addProduct(newProduct) {
  await fetch(API, {
    method: "POST",
    body: JSON.stringify(newProduct),
    headers: {
      "Content-Type": "application/json",
    },
  });
  render();
}

//todo обработчик события для добавления
addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    !titleInp.value.trim() ||
    !priceInp.value.trim() ||
    !categoryInp.value.trim() ||
    !imageInp.value.trim()
  ) {
    return;
  }

  const product = {
    title: titleInp.value,
    price: priceInp.value,
    category: categoryInp.value,
    img: imageInp.value,
  };

  addProduct(product);

  titleInp.value = "";
  priceInp.value = "";
  categoryInp.value = "";
  imageInp.value = "";
});

//todo edit card

async function editProduct(id, newData) {
  await fetch(`${API}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(newData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  render();
}

let editId = null;

document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("svg-edit-icon")) {
    editId = e.target.id;
    const res = await getOneProduct(editId);
    editTitleInp.value = res.title;
    editPriceInp.value = res.price;
    editImageInp.value = res.img;
    editCategoryInp.value = res.category;
  }
});

//todo обработчик событий для изменений карточек
editBtn.addEventListener("click", (e) => {
  if (
    !editTitleInp.value.trim() ||
    !editPriceInp.value.trim() ||
    !editCategoryInp.value.trim() ||
    !editImageInp.value.trim()
  ) {
    return;
  }
  const newData = {
    title: editTitleInp.value,
    price: editPriceInp.value,
    img: editImageInp.value,
    category: editCategoryInp.value,
  };

  editProduct(editId, newData);
  let modal = bootstrap.Modal.getInstance(exampleModal);
  modal.hide();
});
