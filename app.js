const API_BASE = "http://127.0.0.1:5000/api";

const fallbackItems = [
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
  },
  {
    name: "Handmade Paubha Painting of Tara",
    category: "Religious Art",
    rarity: "Very Rare",
    price: 62000,
    seller: "Patan Heritage Arts",
    rating: 4.8,
    time: 210,
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Paubha%20of%20Vasudhara.jpg"
  },
  {
    name: "Panchaloha Offering Bowl Set",
    category: "Memorabilia",
    rarity: "Very Rare",
    price: 32000,
    seller: "Bhaktapur Antique House",
    rating: 4.5,
    time: 260,
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Bronze%20ritual%20vessels%20Nepal.jpg"
  },
  {
    name: "Rana Era Family Photograph Album",
    category: "Photographs",
    rarity: "Extremely Rare",
    price: 78000,
    seller: "Archive Nepal Studio",
    rating: 4.9,
    time: 75,
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Chandra%20Shumsher%20Jang%20Bahadur%20Rana.jpg"
  },
  {
    name: "Early Nepal Postal Stamp Set",
    category: "Memorabilia",
    rarity: "Very Rare",
    price: 15500,
    seller: "Kathmandu Philately Club",
    rating: 4.6,
    time: 360,
    image: "https://commons.wikimedia.org/wiki/Special:FilePath:Nepal%20stamp%201907.jpg"
  },
  {
    name: "Palm Leaf Buddhist Manuscript Pages",
    category: "Books",
    rarity: "Extremely Rare",
    price: 120000,
    seller: "Himalayan Manuscript Trust",
    rating: 5,
    time: 45,
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Palm-leaf%20manuscript.jpg"
  }
];

let items = fallbackItems.map(normalizeListing);
let wishlistItems = [];
const LOCAL_WISHLIST_KEY = "collectifyWishlist";

const money = new Intl.NumberFormat("en-NP", {
  style: "currency",
  currency: "NPR",
  maximumFractionDigits: 0
});

async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || "The request could not be completed.");
  }

  return data;
}

function normalizeListing(listing) {
  return {
    id: listing.id,
    name: listing.name,
    category: listing.category,
    rarity: listing.rarity,
    price: Number(listing.price),
    seller: listing.seller,
    rating: Number(listing.rating || 5),
    time: Number(listing.time_left ?? listing.time ?? 300),
    image: listing.image || ""
  };
}

function getItemKey(item) {
  return item.id ? `id:${item.id}` : `name:${item.name}`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };
    return entities[character];
  });
}

function isWatched(item) {
  const itemKey = getItemKey(item);
  return wishlistItems.some((wishlistItem) => getItemKey(wishlistItem) === itemKey);
}

function saveLocalWishlist() {
  localStorage.setItem(LOCAL_WISHLIST_KEY, JSON.stringify(wishlistItems));
}

function loadLocalWishlist() {
  const savedWishlist = localStorage.getItem(LOCAL_WISHLIST_KEY);

  if (!savedWishlist) {
    return;
  }

  try {
    wishlistItems = JSON.parse(savedWishlist).map(normalizeListing);
  } catch (error) {
    wishlistItems = [];
  }
}

async function loadListings() {
  try {
    const listings = await apiRequest("/listings");
    items = listings.map(normalizeListing);
  } catch (error) {
    items = fallbackItems.map(normalizeListing);
    addNotification("Showing demo listings because the backend is offline.");
  }

  showItems();
}

async function loadCurrentUser() {
  const profile = document.getElementById("profile");
  const storedName = localStorage.getItem("collectifyUserName");

  if (storedName) {
    profile.textContent = storedName;
  }

  try {
    const data = await apiRequest("/auth/me");

    if (data.user) {
      localStorage.setItem("collectifyUserName", data.user.name);
      localStorage.setItem("collectifyUserEmail", data.user.email);
      profile.textContent = data.user.name;
    }
  } catch (error) {
    if (!storedName) {
      profile.textContent = "Guest User";
    }
  }
}

function renderWishlist() {
  const wishlist = document.getElementById("wishlist");
  wishlist.innerHTML = "";

  if (!wishlistItems.length) {
    const entry = document.createElement("li");
    entry.textContent = "No watched listings yet.";
    wishlist.appendChild(entry);
    return;
  }

  wishlistItems.forEach((item) => {
    const entry = document.createElement("li");
    entry.className = "wishlist-entry";
    entry.innerHTML = `
      <strong>${escapeHtml(item.name)}</strong>
      <span>${escapeHtml(item.category)} / ${money.format(item.price)}</span>
    `;
    wishlist.appendChild(entry);
  });
}

function watchItemLocally(item) {
  if (isWatched(item)) {
    return false;
  }

  wishlistItems.unshift(item);
  saveLocalWishlist();
  return true;
}

async function loadWishlist() {
  loadLocalWishlist();
  renderWishlist();

  try {
    const data = await apiRequest("/wishlist");
    const syncedItems = data.map(normalizeListing);

    syncedItems.forEach((item) => {
      if (!isWatched(item)) {
        wishlistItems.push(item);
      }
    });

    saveLocalWishlist();
  } catch (error) {
    return;
  }

  renderWishlist();
  showItems();
}

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
      const watched = isWatched(item);
      const itemName = escapeHtml(item.name);
      const itemCategory = escapeHtml(item.category);
      const itemRarity = escapeHtml(item.rarity);
      const itemSeller = escapeHtml(item.seller);
      return `
      <article class="item-card">
        <div class="item-image">${item.image ? `<img src="${escapeHtml(item.image)}" alt="${itemName}" loading="lazy">` : itemRarity}</div>
        <div class="item-content">
          <span>${itemCategory} / ${itemRarity}</span>
          <h3>${itemName}</h3>
          <p>${money.format(item.price)} current bid</p>
          <small>Seller ${itemSeller} - ${item.rating} rating - ${item.time} min left</small>
          <div class="watch-action">
            <button class="watch-button ${watched ? "watched" : ""}" type="button" onclick="addToWishlist(${originalIndex})">
              ${watched ? "Watching" : "Watch"}
            </button>
            <div class="watch-info" role="tooltip">
              <strong>${itemName}</strong>
              <span>${itemRarity} ${itemCategory}</span>
              <span>${money.format(item.price)} current bid</span>
              <span>${item.time} minutes left from ${itemSeller}</span>
            </div>
          </div>
        </div>
      </article>
    `;
    })
    .join("");
}

async function addToWishlist(index) {
  const item = items[index];

  if (!item) {
    addNotification("This listing could not be added to your wishlist.");
    return;
  }

  const wasAdded = watchItemLocally(item);
  renderWishlist();

  if (wasAdded) {
    addNotification(`${item.name} was added to your wishlist.`);
  } else {
    addNotification(`${item.name} is already in your wishlist.`);
  }

  showItems();

  if (item.id) {
    try {
      await apiRequest("/wishlist", {
        method: "POST",
        body: JSON.stringify({ listing_id: item.id })
      });
      await loadWishlist();
    } catch (error) {
      addNotification("Wishlist saved on this page. Log in to save it permanently.");
    }
  }
}

function addNotification(message) {
  const notifications = document.getElementById("notifications");
  const entry = document.createElement("li");
  entry.textContent = message;
  notifications.prepend(entry);
}

function loginUser() {
  localStorage.setItem("collectifyUserName", "Alin077");
  document.getElementById("profile").textContent = "Alin077";
  addNotification("Signed in as Alin077.");
}

async function addItem() {
  const name = document.getElementById("name").value.trim();
  const price = Number(document.getElementById("price").value);
  const category = document.getElementById("category").value;
  const rarity = document.getElementById("rarity").value;

  if (!name || price <= 0) {
    addNotification("Add an item name and a valid price before listing.");
    return;
  }

  const listing = {
    name,
    category,
    rarity,
    price,
    seller: localStorage.getItem("collectifyUserName") || "Guest Seller",
    rating: 5,
    time_left: 300,
    image: ""
  };

  try {
    const data = await apiRequest("/listings", {
      method: "POST",
      body: JSON.stringify(listing)
    });
    items.unshift(normalizeListing(data.listing));
    addNotification(`${name} was saved to live auctions.`);
  } catch (error) {
    items.unshift(normalizeListing(listing));
    addNotification(`${name} was added locally. Start the backend to save it permanently.`);
  }

  document.getElementById("listingForm").reset();
  showItems();
}

loadCurrentUser();
loadListings();
loadWishlist();
