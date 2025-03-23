// -----------
// 分页配置
const PAGINATION_CONFIG = {
  itemsPerPage: 12,
  visiblePages: 5,
};

const menuItems = document.querySelectorAll(".category-list li a");
const productItems = document.querySelectorAll(".card-product");
const contentContainer = document.querySelector(".wg-shop-content");
let currentPage = 1;
let filteredProducts = [];

const paginationContainer = document.createElement("div");
paginationContainer.className = "pagination";
contentContainer.appendChild(paginationContainer);

menuItems.forEach((item) => {
  item.addEventListener("click", function (e) {
    e.preventDefault();
    const category = this.dataset.category;
    filteredProducts = Array.from(productItems).filter((product) => {
      const categories = product.dataset.categories
        .split(",")
        .map((c) => c.trim());
      return category === "全部" || categories.includes(category);
    });
    currentPage = 1;
    renderPage();
  });
});

function renderPage() {
  const start = (currentPage - 1) * PAGINATION_CONFIG.itemsPerPage;
  const end = start + PAGINATION_CONFIG.itemsPerPage;
  productItems.forEach((product) => (product.style.display = "none"));
  filteredProducts
    .slice(start, end)
    .forEach((product) => (product.style.display = "block"));
  renderPagination();
}

function renderPagination() {
  const totalPages = Math.ceil(
    filteredProducts.length / PAGINATION_CONFIG.itemsPerPage
  );
  paginationContainer.innerHTML = "";
  if (totalPages <= 1) return;

  const prevButton = document.createElement("button");
  prevButton.textContent = "上一页";
  prevButton.disabled = currentPage === 1;
  prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderPage();
    }
  });
  paginationContainer.appendChild(prevButton);

  const startPage = Math.max(
    1,
    currentPage - Math.floor(PAGINATION_CONFIG.visiblePages / 2)
  );
  const endPage = Math.min(
    totalPages,
    startPage + PAGINATION_CONFIG.visiblePages - 1
  );

  for (let i = startPage; i <= endPage; i++) {
    const pageButton = document.createElement("button");
    pageButton.textContent = i;
    pageButton.className = i === currentPage ? "active" : "";
    pageButton.addEventListener("click", () => {
      currentPage = i;
      renderPage();
    });
    paginationContainer.appendChild(pageButton);
  }

  const nextButton = document.createElement("button");
  nextButton.textContent = "下一页";
  nextButton.disabled = currentPage === totalPages;
  nextButton.addEventListener("click", () => {
    currentPage++;
    renderPage();
  });
  paginationContainer.appendChild(nextButton);
}

filteredProducts = Array.from(productItems);
renderPage();
