let items = [
  {
    name: "1962 Rookie Card",
    category: "Cards",
    rarity: "Legendary",
    price: 8650,
    seller: "Ava",
    rating: 4.9,
    time: 90,
    image: ""
  },
  {
    name: "Astro Knight Comic",
    category: "Comics",
    rarity: "Epic",
    price: 1200,
    seller: "Mira",
    rating: 4.7,
    time: 240,
    image: ""
  },
  {
    name: "Old Silver Coin",
    category: "Coins",
    rarity: "Rare",
    price: 450,
    seller: "Theo",
    rating: 4.6,
    time: 160,
    image: ""
  }
];

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});

function showItems() {
  const list = document.getElementById("itemList");
  const totalListings = document.getElementById("totalListings");
  const search = document.getElementById("searchBox").value.toLowerCase();
  const category = document.getElementById("categoryFilter").value;
  const rarity = document.getElementById("rarityFilter").value;
  const sort = document.getElementById("sortFilter").value;

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search);
    const matchesCategory = category === "All" || item.category === category;
    const matchesRarity = rarity === "All" || item.rarity === rarity;
    return matchesSearch && matchesCategory && matchesRarity;
  });

  filteredItems.sort((firstItem, secondItem) => {
    if (sort === "highestBid") {
      return secondItem.price - firstItem.price;
    }

    if (sort === "topRated") {
      return secondItem.rating - firstItem.rating;
    }

    return firstItem.time - secondItem.time;
  });

  totalListings.textContent = items.length;
  list.innerHTML = filteredItems
    .map((item) => {
      const originalIndex = items.indexOf(item);
      return `
      <article class="item-card">
        <div class="item-image">${item.image ? `<img src="${item.image}" alt="${item.name}">` : item.rarity}</div>
        <div class="item-content">
          <span>${item.category} / ${item.rarity}</span>
          <h3>${item.name}</h3>
          <p>${money.format(item.price)} current bid</p>
          <small>Seller ${item.seller} - ${item.rating} rating - ${item.time} min left</small>
          <button type="button" onclick="addToWishlist(${originalIndex})">Watch</button>
        </div>
      </article>
    `;
    })
    .join("");
}

function addToWishlist(index) {
  const wishlist = document.getElementById("wishlist");
  const item = items[index];
  const entry = document.createElement("li");
  entry.textContent = item.name;
  wishlist.appendChild(entry);
}

function addNotification(message) {
  const notifications = document.getElementById("notifications");
  const entry = document.createElement("li");
  entry.textContent = message;
  notifications.prepend(entry);
}

function loginUser() {
  document.getElementById("profile").textContent = "Alin077";
  addNotification("Signed in as Alin077.");
}

function addItem() {
  const name = document.getElementById("name").value.trim();
  const price = Number(document.getElementById("price").value);
  const category = document.getElementById("category").value;
  const rarity = document.getElementById("rarity").value;

  if (!name || !price) {
    addNotification("Add an item name and price before listing.");
    return;
  }

  items.unshift({
    name,
    category,
    rarity,
    price,
    seller: "Alin077",
    rating: 5,
    time: 300,
    image: ""
  });

  document.getElementById("listingForm").reset();
  addNotification(`${name} was added to live auctions.`);
  showItems();
}

showItems();

