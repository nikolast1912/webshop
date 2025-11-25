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

const categories = {
  "iPhone 17 Series": iphones.slice(0, 4),
  "iPhone 16 Series": iphones.slice(4, 8),
  "iPhone 15 Series": iphones.slice(8, 12),
  "iPhone 14 Series": iphones.slice(12, 16),
  "iPhone 13 Series": iphones.slice(16, 20),
  "iPhone 12 Series": iphones.slice(20, 24)
};

for (let category in categories) {
  const section = document.createElement("section");
  section.className = "category-section";

  const title = document.createElement("h2");
  title.className = "category-title";
  title.textContent = category;

  const scrollContainer = document.createElement("div");
  scrollContainer.className = "scroll-container";

  categories[category].forEach((phone) => {
    const card = document.createElement("div");
    card.className = "iphone-card";
    card.innerHTML = `
      <img src="${phone.image}" alt="${phone.name}" />
      <h3>${phone.name}</h3>
      <button class="details-btn" data-index="${iphones.indexOf(phone)}">Details</button>
      <button class="add-cart-btn" data-name="${phone.name}">＋ Add to Cart</button>
    `;
    scrollContainer.appendChild(card);
  });

  section.appendChild(title);
  section.appendChild(scrollContainer);
  gallery.appendChild(section);
}


function showToast(message) {
  const toast = document.createElement("div");
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
  requestAnimationFrame(() => { toast.style.opacity = "1"; });
  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 300);
  }, 2000);
}

function isLoggedIn() {
  return localStorage.getItem('username') !== null;
}

function requireLogin() {
  if (!isLoggedIn()) {
    const authModal = document.getElementById("auth-modal");
    authModal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    const floatingCart = document.getElementById("floating-cart");
    if (floatingCart) floatingCart.style.pointerEvents = "none";
    return false;
  }
  return true;
}

let cart = {};
let username = localStorage.getItem('username') || null;


function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  cartItems.innerHTML = '';
  let total = 0;
  for (let name in cart) {
    const quantity = cart[name];
    const price = 999; 
    total += price * quantity;
    const li = document.createElement("li");
    li.innerHTML = `
      ${name} x${quantity}
      <div>
        <button class="inc-btn" data-name="${name}">＋</button>
        <button class="dec-btn" data-name="${name}">−</button>
      </div>
    `;
    cartItems.appendChild(li);
  }
  cartTotal.textContent = `Total: $${total}`;

  cartItems.querySelectorAll('.inc-btn').forEach(btn =>
    btn.addEventListener('click', () => changeQuantity(btn.dataset.name, 1))
  );
  cartItems.querySelectorAll('.dec-btn').forEach(btn =>
    btn.addEventListener('click', () => changeQuantity(btn.dataset.name, -1))
  );
}

function saveCartToServer() {
  if (!username) return;
  fetch('/api/cart/save', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username,
      items: Object.entries(cart).map(([name, quantity]) => ({ name, quantity }))
    })
  }).catch(() => {});
}

function addToCart(name) {
  if (!requireLogin()) return;
  cart[name] = cart[name] ? cart[name] + 1 : 1;
  updateCart();
  showToast(`${name} added to cart!`);
  saveCartToServer();
}

function changeQuantity(name, delta) {
  if (!cart[name]) return;
  cart[name] += delta;
  if (cart[name] <= 0) delete cart[name];
  updateCart();
  saveCartToServer();
}

function showDetails(index) {
  const phone = iphones[index];
  const modal = document.getElementById("details-modal");
  const modalImage = document.getElementById("modal-image");
  const modalSpecs = document.getElementById("modal-specs");
  modalImage.style.backgroundImage = `url('${phone.image}')`;
  modalSpecs.innerHTML = `
    <h2>${phone.name}</h2>
    <ul>${phone.specs.map(spec => `<li>${spec}</li>`).join('')}</ul>
  `;
  modal.classList.remove("hidden");
}


window.addEventListener('DOMContentLoaded', () => {
  const detailsModal = document.getElementById("details-modal");
  const closeBtn = document.getElementById("close-btn");
  const floatingCart = document.getElementById("floating-cart");
  const cartClose = document.getElementById("cart-close");
  const checkoutBtn = document.getElementById("checkout-btn");
  const themeToggle = document.getElementById('theme-toggle');
  const logoutBtn = document.getElementById('logout-btn');
  const welcomeBanner = document.getElementById('welcome-banner');
  const authModal = document.getElementById("auth-modal");
  const authClose = document.getElementById("authClose");
  const authForm = document.getElementById("authForm");
  const authModeLabel = document.getElementById("auth-mode-label");
  const authSubmitBtn = document.getElementById("authSubmitBtn");
  const toggleModeBtn = document.getElementById("toggleModeBtn");

  if (username && welcomeBanner) welcomeBanner.textContent = `Welcome ${username}`;


  document.querySelectorAll('.details-btn').forEach(btn => {
    btn.addEventListener('click', () => showDetails(Number(btn.dataset.index)));
  });
  document.querySelectorAll('.add-cart-btn').forEach(btn => {
    btn.addEventListener('click', () => addToCart(btn.dataset.name));
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      detailsModal.classList.add('hidden');
    });
  }


  if (floatingCart) {
    floatingCart.addEventListener('click', () => {
      if (!requireLogin()) return;
      document.getElementById('cart-sidebar').classList.toggle('hidden');
    });
  }

  if (cartClose) {
    cartClose.addEventListener('click', () => {
      document.getElementById('cart-sidebar').classList.add('hidden');
    });
  }

  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      showToast("Proceeding to checkout...");
    });
  }

  if (themeToggle) {
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-mode');
      themeToggle.textContent = '⛅';
    } else {
      document.body.classList.remove('dark-mode');
      themeToggle.textContent = '🌙';
    }
    themeToggle.addEventListener('click', () => {
      const isDark = document.body.classList.toggle('dark-mode');
      if (isDark) {
        themeToggle.textContent = '⛅';
        localStorage.setItem('theme', 'dark');
      } else {
        themeToggle.textContent = '🌙';
        localStorage.setItem('theme', 'light');
      }
    });
  }

 
  if (logoutBtn) {
  
    function updateLogoutButton() {
      if (isLoggedIn()) logoutBtn.classList.remove('hidden');
      else logoutBtn.classList.add('hidden');
    }
    updateLogoutButton();

    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('username');
      username = null;
      if (welcomeBanner) welcomeBanner.textContent = '';
      updateLogoutButton();
      document.getElementById('cart-items').innerHTML = '';
      window.location.reload();
    });
  }


  if (authClose) {
    authClose.addEventListener('click', () => {
      if (authModal) authModal.classList.add('hidden');
      document.body.style.overflow = "";
      if (floatingCart) floatingCart.style.pointerEvents = "";
    });
  }


  if (toggleModeBtn && authModeLabel && authSubmitBtn) {
    let isLoginMode = true;
    toggleModeBtn.addEventListener('click', () => {
      isLoginMode = !isLoginMode;
      authModeLabel.textContent = isLoginMode ? "Log In" : "Register";
      authSubmitBtn.textContent = isLoginMode ? "Log In" : "Register";
      toggleModeBtn.textContent = isLoginMode ? "Register" : "Back to Log In";
    });


    if (authSubmitBtn && authForm) {
      authSubmitBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        const form = new FormData(authForm);
        const endpoint = isLoginMode ? "/api/login" : "/api/register";
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: form.get("username"),
            password: form.get("password")
          })
        });

        if (res.ok) {
          username = form.get("username");
          localStorage.setItem("username", username);
          if (authModal) authModal.classList.add("hidden");
          document.body.style.overflow = "";
          if (floatingCart) floatingCart.style.pointerEvents = "";
          window.location.reload();
        } else {
          showToast("Login failed");
        }
      });
    }
  }


  if (username) {
    fetch(`/api/cart/${username}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.items) {
          data.items.forEach(item => { cart[item.name] = item.quantity; });
          updateCart();
          showToast(`Welcome back, ${username}`);
        }
      }).catch(() => {});
  }


  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const details = document.getElementById('details-modal');
      if (details && !details.classList.contains('hidden')) details.classList.add('hidden');
      if (authModal && !authModal.classList.contains('hidden')) {
        authModal.classList.add('hidden');
        document.body.style.overflow = "";
        if (floatingCart) floatingCart.style.pointerEvents = "";
      }
    }
  });
});


