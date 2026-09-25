const specimens = [
  {
    id: "amethyst",
    name: "紫水晶",
    family: "石英家族",
    location: "收藏箱 A1",
    foundAt: "2026.04.12",
    tag: "晶洞",
    hardness: "7",
    color: "紫色",
    story: "晶面像小山脈，適合拿來練習觀察透明度和光線反射。",
    art: ["#efe7f7", "#6b4aa2", "#c7a8ef"]
  },
  {
    id: "quartz",
    name: "溪谷石英",
    family: "石英家族",
    location: "郊山溪邊",
    foundAt: "2026.03.30",
    tag: "採集",
    hardness: "7",
    color: "透明白",
    story: "邊角被水磨得比較圓，可以拿來比較原生晶體和河床礫石。",
    art: ["#e5f0f3", "#6c9db7", "#f8ffff"]
  },
  {
    id: "pyrite",
    name: "黃鐵礦",
    family: "硫化物",
    location: "交換收藏",
    foundAt: "2026.02.08",
    tag: "金屬光澤",
    hardness: "6-6.5",
    color: "金黃",
    story: "常被叫做愚人金，最適合介紹金屬光澤和立方晶形。",
    art: ["#f7ead2", "#b47621", "#ffe196"]
  },
  {
    id: "calcite",
    name: "方解石",
    family: "碳酸鹽",
    location: "標本店",
    foundAt: "2026.01.15",
    tag: "解理",
    hardness: "3",
    color: "蜂蜜色",
    story: "很適合學習硬度差異，也可以用放大鏡觀察漂亮的解理面。",
    art: ["#fff1d5", "#d1913d", "#ffe2a7"]
  },
  {
    id: "malachite",
    name: "孔雀石",
    family: "碳酸鹽",
    location: "收藏箱 B2",
    foundAt: "2025.12.19",
    tag: "條紋",
    hardness: "3.5-4",
    color: "翠綠",
    story: "一圈一圈的綠色紋路像地圖，可以做成社群貼文的主角。",
    art: ["#e5f4ea", "#21735d", "#8bd8a6"]
  },
  {
    id: "obsidian",
    name: "黑曜石",
    family: "火山玻璃",
    location: "展示標本",
    foundAt: "2025.11.27",
    tag: "火成岩",
    hardness: "5-5.5",
    color: "黑色",
    story: "不是礦物但很適合放進岩石區，提醒大家分類也可以很有趣。",
    art: ["#e5e2dd", "#1e2424", "#6d7472"]
  }
];

const products = [
  {
    id: "label-kit",
    name: "標本標籤組",
    description: "防水貼紙和採集紀錄卡，幫每顆石頭建立名字。",
    price: 120,
    colors: ["#f0c36b", "#4f8c7a"]
  },
  {
    id: "postcards",
    name: "礦石明信片",
    description: "六張展櫃照片風格的明信片，適合寄給同好。",
    price: 180,
    colors: ["#8d70b8", "#e09064"]
  },
  {
    id: "field-zine",
    name: "野外觀察小誌",
    description: "一本 A5 小冊，記錄小Q本月最喜歡的礦石。",
    price: 220,
    colors: ["#5d94b8", "#d6a54d"]
  }
];

const timelineItems = [
  ["2026.04", "建立第一版網站，先放六顆代表性標本。"],
  ["2026.05", "拍攝每顆標本的近照，補上尺寸和重量。"],
  ["2026.06", "邀請同學留言，選出本月人氣礦石。"],
  ["2026.09｜虛構示範", "AI 生成的想像練習：畫一座不存在的星光洞，練習描述晶體的形狀與光澤。這不是實際採集、收藏或館長發言。"]
];

const starterMessages = [
  { name: "哥哥", message: "我想負責幫展品拍照，下一顆可以拍黃鐵礦。" },
  { name: "爸爸", message: "每週更新一顆就很好，網站會慢慢變成真的博物館。" }
];

const storageKeys = {
  cart: "little-q-museum-cart",
  messages: "little-q-museum-messages"
};

let activeFilter = "全部";
let cart = readStorage(storageKeys.cart, []);
let messages = readStorage(storageKeys.messages, starterMessages);

const money = new Intl.NumberFormat("zh-TW", {
  style: "currency",
  currency: "TWD",
  maximumFractionDigits: 0
});

const specimenGrid = document.querySelector("#specimenGrid");
const filters = document.querySelector("#filters");
const productGrid = document.querySelector("#productGrid");
const cartPanel = document.querySelector("#cartPanel");
const cartItems = document.querySelector("#cartItems");
const cartCount = document.querySelector("#cartCount");
const cartTotal = document.querySelector("#cartTotal");
const checkoutDialog = document.querySelector("#checkoutDialog");

function readStorage(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

function writeStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function renderFilters() {
  const tags = ["全部", ...new Set(specimens.map((item) => item.family))];
  filters.replaceChildren(
    ...tags.map((tag) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = tag;
      button.setAttribute("aria-pressed", String(tag === activeFilter));
      button.addEventListener("click", () => {
        activeFilter = tag;
        renderFilters();
        renderSpecimens();
      });
      return button;
    })
  );
}

function renderSpecimens() {
  const template = document.querySelector("#specimenTemplate");
  const visible = specimens.filter(
    (item) => activeFilter === "全部" || item.family === activeFilter
  );

  specimenGrid.replaceChildren(
    ...visible.map((item) => {
      const node = template.content.firstElementChild.cloneNode(true);
      const art = node.querySelector(".mineral-art");
      art.style.setProperty("--art-bg", item.art[0]);
      art.style.setProperty("--gem", item.art[1]);
      art.style.setProperty("--gem-light", item.art[2]);
      node.querySelector("h3").textContent = item.name;
      node.querySelector(".tag-pill").textContent = item.tag;
      node.querySelector(".meta").textContent = `${item.family} · ${item.location} · ${item.foundAt}`;
      node.querySelector(".story").textContent = item.story;

      const facts = [
        ["硬度", item.hardness],
        ["顏色", item.color]
      ];
      node.querySelector(".facts").replaceChildren(
        ...facts.map(([label, value]) => {
          const wrap = document.createElement("div");
          const dt = document.createElement("dt");
          const dd = document.createElement("dd");
          dt.textContent = label;
          dd.textContent = value;
          wrap.append(dt, dd);
          return wrap;
        })
      );
      return node;
    })
  );
}

function renderTimeline() {
  const timeline = document.querySelector("#timeline");
  timeline.replaceChildren(
    ...timelineItems.map(([date, text]) => {
      const item = document.createElement("article");
      item.className = "timeline-item";
      item.innerHTML = `<strong>${date}</strong><span>${text}</span>`;
      return item;
    })
  );
}

function renderProducts() {
  const template = document.querySelector("#productTemplate");
  productGrid.replaceChildren(
    ...products.map((product) => {
      const node = template.content.firstElementChild.cloneNode(true);
      const art = node.querySelector(".product-art");
      art.style.setProperty("--product-a", product.colors[0]);
      art.style.setProperty("--product-b", product.colors[1]);
      node.querySelector("h3").textContent = product.name;
      node.querySelector("p").textContent = product.description;
      node.querySelector("strong").textContent = money.format(product.price);
      const button = node.querySelector("button");
      button.addEventListener("click", () => addToCart(product.id));
      return node;
    })
  );
}

function addToCart(productId) {
  const existing = cart.find((item) => item.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id: productId, quantity: 1 });
  }
  writeStorage(storageKeys.cart, cart);
  renderCart();
  openCart();
}

function updateQuantity(productId, delta) {
  cart = cart
    .map((item) =>
      item.id === productId ? { ...item, quantity: item.quantity + delta } : item
    )
    .filter((item) => item.quantity > 0);
  writeStorage(storageKeys.cart, cart);
  renderCart();
}

function getCartRows() {
  return cart
    .map((item) => {
      const product = products.find((entry) => entry.id === item.id);
      return product ? { ...product, quantity: item.quantity } : null;
    })
    .filter(Boolean);
}

function renderCart() {
  const rows = getCartRows();
  const totalQuantity = rows.reduce((sum, item) => sum + item.quantity, 0);
  const total = rows.reduce((sum, item) => sum + item.quantity * item.price, 0);

  cartCount.textContent = totalQuantity;
  cartTotal.textContent = money.format(total);

  if (!rows.length) {
    cartItems.innerHTML = '<p class="empty-cart">購物車目前是空的。</p>';
    return;
  }

  cartItems.replaceChildren(
    ...rows.map((item) => {
      const row = document.createElement("article");
      row.className = "cart-item";
      row.innerHTML = `
        <div>
          <strong>${item.name}</strong>
          <p class="meta">${money.format(item.price)} · 小計 ${money.format(item.price * item.quantity)}</p>
        </div>
      `;

      const controls = document.createElement("div");
      controls.className = "quantity-controls";
      const minus = document.createElement("button");
      minus.type = "button";
      minus.textContent = "−";
      minus.setAttribute("aria-label", `減少 ${item.name}`);
      minus.addEventListener("click", () => updateQuantity(item.id, -1));
      const count = document.createElement("span");
      count.textContent = item.quantity;
      const plus = document.createElement("button");
      plus.type = "button";
      plus.textContent = "+";
      plus.setAttribute("aria-label", `增加 ${item.name}`);
      plus.addEventListener("click", () => updateQuantity(item.id, 1));
      controls.append(minus, count, plus);
      row.append(controls);
      return row;
    })
  );
}

function openCart() {
  cartPanel.classList.add("is-open");
  cartPanel.setAttribute("aria-hidden", "false");
}

function closeCart() {
  cartPanel.classList.remove("is-open");
  cartPanel.setAttribute("aria-hidden", "true");
}

function renderMessages() {
  const wall = document.querySelector("#messageWall");
  wall.replaceChildren(
    ...messages.map((item) => {
      const card = document.createElement("article");
      card.className = "message-card";
      const name = document.createElement("strong");
      const message = document.createElement("p");
      name.textContent = item.name;
      message.textContent = item.message;
      card.append(name, message);
      return card;
    })
  );
}

function setupEvents() {
  document.querySelector("#cartToggle").addEventListener("click", openCart);
  document.querySelector("#cartClose").addEventListener("click", closeCart);
  cartPanel.addEventListener("click", (event) => {
    if (event.target === cartPanel) closeCart();
  });

  document.querySelector("#messageForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    messages = [
      { name: form.get("name").trim(), message: form.get("message").trim() },
      ...messages
    ].slice(0, 8);
    writeStorage(storageKeys.messages, messages);
    event.currentTarget.reset();
    renderMessages();
  });

  document.querySelector("#checkoutButton").addEventListener("click", () => {
    const rows = getCartRows();
    if (!rows.length) return;
    const total = rows.reduce((sum, item) => sum + item.quantity * item.price, 0);
    document.querySelector("#checkoutSummary").textContent =
      `共 ${rows.length} 種品項，合計 ${money.format(total)}。`;
    checkoutDialog.showModal();
  });

  document.querySelector("#checkoutForm").addEventListener("submit", (event) => {
    if (event.submitter?.value === "cancel") return;
    event.preventDefault();
    const orderId = `SRM-${Date.now().toString().slice(-6)}`;
    cart = [];
    writeStorage(storageKeys.cart, cart);
    renderCart();
    closeCart();
    checkoutDialog.close();
    alert(`測試訂單已建立：${orderId}`);
  });
}

renderFilters();
renderSpecimens();
renderTimeline();
renderProducts();
renderCart();
renderMessages();
setupEvents();
