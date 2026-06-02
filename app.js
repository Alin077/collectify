let items = [
  {
    name: "Vintage Thangka Painting (Hand-Painted, 1960s)",
    category: "Religious Art",
    rarity: "Extremely Rare",
    price: 85000,
    seller: "Buddha Art Gallery",
    rating: 4.9,
    time: 180,
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Contemporary%20Thangka%20Painting%2C%20c%201980%2C%20Nepal%2C%20V%26A%20Museum%2C%20London.jpg"
  },
  {
    name: "King Tribhuvan Silver Mohar Coin (1950)",
    category: "Coins",
    rarity: "Very Rare",
    price: 25000,
    seller: "Himalayan Collectibles",
    rating: 4.8,
    time: 120,
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/5%20Paise%20coin%20of%20the%20Nepal%201943%20featuring%20the%20Buddhist%20Treasure%20Vase%2C%20from%20the%20reign%20of%20Tribhuvana%20Bir%20Bikram.jpg"
  },
  {
    name: "Old Kathmandu Postcard Collection (1920-1940)",
    category: "Photographs",
    rarity: "Very Rare",
    price: 18000,
    seller: "Retro Nepal Collectibles",
    rating: 4.6,
    time: 240,
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Kathmandu%20Market%201920.jpg"
  },
  {
    name: "Gurkha Regiment Service Medal (WWII Era)",
    category: "Memorabilia",
    rarity: "Extremely Rare",
    price: 95000,
    seller: "Gurkha Heritage House",
    rating: 4.9,
    time: 90,
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Nepal%20Medal%2C%201814-1816.jpg"
  },
  {
    name: "First Edition Muna Madan (1936 Print)",
    category: "Books",
    rarity: "Very Rare",
    price: 40000,
    seller: "Nepal Book Collectors",
    rating: 4.7,
    time: 300,
    image: "https://covers.openlibrary.org/b/olid/OL25422917M-L.jpg"
  }
];

const money = new Intl.NumberFormat("en-NP", {
  style: "currency",
  currency: "NPR",
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
        <div class="item-image">${item.image ? `<img src="${item.image}" alt="${item.name}" loading="lazy">` : item.rarity}</div>
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

