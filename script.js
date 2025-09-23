const iphones = [
  // iPhone 17 Series
  { name: "iPhone 17 Pro Max", image: "iphone17pm.png", specs: ["A19 Pro chip", "48MP Fusion camera", "Ceramic Shield 2", "3,000 nits brightness", "USB-C", "Titanium frame"] },
  { name: "iPhone 17 Pro", image: "iPhone-17-pro.png", specs: ["A19 chip", "Triple-lens camera", "Dynamic Island", "Always-On display", "USB-C"] },
  { name: "iPhone 17 Air", image: "iphone-17-air.png", specs: ["Ultra-thin design", "OLED display", "Face ID", "USB-C"] },
  { name: "iPhone 17", image: "iPhone-17.png", specs: ["Dual camera", "Ceramic Shield", "USB-C"] },

  // iPhone 16 Series
  { name: "iPhone 16 Pro Max", image: "iPhone-16-pm.png", specs: ["A18 chip", "ProMotion 120Hz", "Titanium frame", "USB-C", "48MP camera"] },
  { name: "iPhone 16 Pro", image: "iPhone-16-pro.png", specs: ["Triple camera", "Dynamic Island", "USB-C"] },
  { name: "iPhone 16 Plus", image: "iPhone-16-plus.png", specs: ["Large display", "Dual camera", "USB-C"] },
  { name: "iPhone 16", image: "iPhone-16.png", specs: ["Ceramic Shield", "Dual camera", "USB-C"] },

  // iPhone 15 Series
  { name: "iPhone 15 Pro Max", image: "iPhone-15-pm.png", specs: ["A17 Pro chip", "USB-C", "Titanium", "48MP camera", "5x optical zoom"] },
  { name: "iPhone 15 Pro", image: "15pro.png", specs: ["A17 chip", "USB-C", "Dynamic Island", "Always-On display"] },
  { name: "iPhone 15 Plus", image: "15plus.png", specs: ["Large display", "Dual camera", "USB-C"] },
  { name: "iPhone 15", image: "15.png", specs: ["Ceramic Shield", "USB-C", "Dual camera"] },

  // iPhone 14 Series
  { name: "iPhone 14 Pro Max", image: "14pm.png", specs: ["A16 chip", "Dynamic Island", "Always-On display", "48MP camera"] },
  { name: "iPhone 14 Pro", image: "14pro.png", specs: ["Triple camera", "Ceramic Shield", "Lightning port"] },
  { name: "iPhone 14 Plus", image: "14plus.png", specs: ["Large display", "Dual camera", "Lightning port"] },
  { name: "iPhone 14", image: "14.png", specs: ["Ceramic Shield", "Dual camera", "Lightning port"] },

  // iPhone 13 Series
  { name: "iPhone 13 Pro Max", image: "13pm.png", specs: ["A15 chip", "ProMotion", "Triple camera", "MagSafe"] },
  { name: "iPhone 13 Pro", image: "13pro.png", specs: ["Triple camera", "Ceramic Shield", "MagSafe"] },
  { name: "iPhone 13", image: "13.png", specs: ["Dual camera", "OLED display", "MagSafe"] },
  { name: "iPhone 13 Mini", image: "13mini.png", specs: ["Compact size", "Dual camera", "MagSafe"] },

  // iPhone 12 Series
  { name: "iPhone 12 Pro Max", image: "12pm.png", specs: ["A14 chip", "Triple camera", "5G", "MagSafe"] },
  { name: "iPhone 12 Pro", image: "12pro.png", specs: ["Triple camera", "Ceramic Shield", "MagSafe"] },
  { name: "iPhone 12", image: "12.png", specs: ["Dual camera", "5G", "MagSafe"] },
  { name: "iPhone 12 Mini", image: "12mini.png", specs: ["Compact size", "Dual camera", "5G"] }
];

const gallery = document.getElementById("iphone-gallery");
const modal = document.getElementById("details-modal");
const modalImage = document.getElementById("modal-image");
const modalSpecs = document.getElementById("modal-specs");
const closeBtn = document.getElementById("close-btn");

const cartButton = document.getElementById("cart-button");
const cartSidebar = document.getElementById("cart-sidebar");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");

let cart = {};

iphones.forEach((phone, index) => {
  const card = document.createElement("div");
  card.className = "iphone-card";
  card.innerHTML = `
    <img src="${phone.image}" alt="${phone.name}" />
    <h3>${phone.name}</h3>
    <button onclick="showDetails(${index})">Details</button>
    <button onclick="addToCart('${phone.name}')">＋ Add to Cart</button>
  `;
  gallery.appendChild(card);
});

function showDetails(index) {
  const phone = iphones[index];
  modalImage.style.backgroundImage = `url('${phone.image}')`;
  modalSpecs.innerHTML = `<h2>${phone.name}</h2><ul>${phone.specs.map(spec => `<li>${spec}</li>`).join('')}</ul>`;
  modal.classList.remove("hidden");
}

closeBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

function addToCart(name) {
  cart[name] = cart[name] ? cart[name] + 1 : 1;
  updateCart();
  showToast(`${name} added to cart!`);
}

function changeQuantity(name, delta) {
  cart[name] += delta;
  if (cart[name] <= 0) {
    delete cart[name];
  }
  updateCart();
}

function updateCart() {
  cartItems.innerHTML = '';
  let total = 0;
  for (let name in cart) {
    const quantity = cart[name];
    const price = 999; // placeholder price
    total += price * quantity;
    const li = document.createElement("li");
    li.innerHTML = `
      ${name} x${quantity}
      <div>
        <button onclick="changeQuantity('${name}', 1)">＋</button>
        <button onclick="changeQuantity('${name}', -1)">−</button>
      </div>
    `;
    cartItems.appendChild(li);
  }
  cartTotal.textContent = `Total: $${total}`;
}

cartButton.addEventListener("click", () => {
  cartSidebar.classList.toggle("hidden");
});

checkoutBtn.addEventListener("click", () => {
  showToast("Proceeding to checkout...");
});

// 🔔 Toast Notification
function showToast(message) {
  let toast = document.createElement("div");
  toast.textContent = message;
  toast.style.position = "fixed";
  toast.style.top = "20px";
  toast.style.left = "50%";
  toast.style.transform = "translateX(-50%)";
  toast.style.background = "#007aff";
  toast.style.color = "white";
  toast.style.padding = "10px 20px";
  toast.style.borderRadius = "6px";
  toast.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
  toast.style.zIndex = "1001";
  toast.style.opacity = "0";
  toast.style.transition = "opacity 0.3s ease";

  document.body.appendChild(toast);
  requestAnimationFrame(() => {
    toast.style.opacity = "1";
  });

  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 300);
  }, 2000);

const cartClose = document.getElementById("cart-close");

cartClose.addEventListener("click", () => {
  cartSidebar.classList.add("hidden");
});

}