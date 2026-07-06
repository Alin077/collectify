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
  },
  {
    name: "Hand-Carved Wooden Prayer Wheel",
    category: "Religious Art",
    rarity: "Common",
    price: 4500,
    seller: "Boudha Craft Store",
    rating: 4.4,
    time: 420,
    image: "https://commons.wikimedia.org/wiki/Special:FilePath:Prayer%20wheels%20Swayambhunath%20Kathmandu.jpg"
  },
  {
    name: "Nepal Tourism Poster Reprint",
    category: "Memorabilia",
    rarity: "Common",
    price: 2800,
    seller: "Thamel Poster House",
    rating: 4.3,
    time: 390,
    image: "https://commons.wikimedia.org/wiki/Special:FilePath:Nepal%20Tourism%20Board%20Kathmandu.jpg"
  },
  {
    name: "Kathmandu Valley Photo Print Set",
    category: "Photographs",
    rarity: "Uncommon",
    price: 7200,
    seller: "Heritage Lens Nepal",
    rating: 4.5,
    time: 330,
    image: "https://commons.wikimedia.org/wiki/Special:FilePath:Patan%20Durbar%20Square%2C%20Kathmandu%20Valley%2C%20Nepal.jpg"
  },
  {
    name: "Traditional Dhaka Topi Collectors Piece",
    category: "Memorabilia",
    rarity: "Uncommon",
    price: 6500,
    seller: "Dhaka Heritage Wear",
    rating: 4.6,
    time: 270,
    image: "https://commons.wikimedia.org/wiki/Special:FilePath:Dhaka%20topi.jpg"
  },
  {
    name: "Commemorative Everest Expedition Coin",
    category: "Coins",
    rarity: "Rare",
    price: 22000,
    seller: "Summit Mint Collectors",
    rating: 4.7,
    time: 160,
    image: "https://commons.wikimedia.org/wiki/Special:FilePath:Mount%20Everest%20as%20seen%20from%20Drukair2%20PLW%20edit.jpg"
  },
  {
    name: "Signed Nepali Poetry Chapbook",
    category: "Books",
    rarity: "Rare",
    price: 12500,
    seller: "Lalitpur Literary Finds",
    rating: 4.8,
    time: 225,
    image: "https://commons.wikimedia.org/wiki/Special:FilePath:Bookshelf.jpg"
  }
];

const defaultImagesByCategory = {
  "Religious Art": "https://commons.wikimedia.org/wiki/Special:FilePath/Swayambhunath%20prayer%20wheels.jpg",
  Coins: "https://commons.wikimedia.org/wiki/Special:FilePath:Nepalese%20coins.jpg",
  Photographs: "https://commons.wikimedia.org/wiki/Special:FilePath:Kathmandu%20Durbar%20Square%20old%20photo.jpg",
  Memorabilia: "https://commons.wikimedia.org/wiki/Special:FilePath:Prayer%20flags%20Nepal.jpg",
  Books: "https://commons.wikimedia.org/wiki/Special:FilePath:Bookshelf.jpg"
};

let items = fallbackItems.map(normalizeListing);
let wishlistItems = [];
const LOCAL_WISHLIST_KEY = "collectifyWishlist";
const LOCAL_REMOVED_LISTINGS_KEY = "collectifyRemovedListings";
let removedListingKeys = [];
let pendingRemoveIndex = null;
let openDetailIndex = null;

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
  const category = listing.category;

  return {
    id: listing.id,
    name: listing.name,
    category,
    rarity: listing.rarity,
    price: Number(listing.price),
    seller: listing.seller,
    rating: Number(listing.rating || 5),
    time: Number(listing.time_left ?? listing.time ?? 300),
    image: listing.image || defaultImagesByCategory[category] || defaultImagesByCategory.Memorabilia
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

function formatTimeLeft(minutes) {
  if (minutes <= 0) {
    return "Ended";
  }

  if (minutes < 60) {
    return `${minutes} min left`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (!remainingMinutes) {
    return `${hours} hr left`;
  }

  return `${hours} hr ${remainingMinutes} min left`;
}

function getAuctionStatus(item) {
  if (item.time <= 0) {
    return "Closed";
  }

  if (item.time <= 60) {
    return "Ending Soon";
  }

  return "Live";
}

function isWatched(item) {
  const itemKey = getItemKey(item);
  return wishlistItems.some((wishlistItem) => getItemKey(wishlistItem) === itemKey);
}

function saveLocalWishlist() {
  localStorage.setItem(LOCAL_WISHLIST_KEY, JSON.stringify(wishlistItems));
}

function saveRemovedListings() {
  localStorage.setItem(LOCAL_REMOVED_LISTINGS_KEY, JSON.stringify(removedListingKeys));
}

function loadRemovedListings() {
  const savedRemovedListings = localStorage.getItem(LOCAL_REMOVED_LISTINGS_KEY);

  if (!savedRemovedListings) {
    return;
  }

  try {
    removedListingKeys = JSON.parse(savedRemovedListings);
  } catch (error) {
    removedListingKeys = [];
  }
}

function applyRemovedListings(listings) {
  return listings.filter((item) => !removedListingKeys.includes(getItemKey(item)));
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
  loadRemovedListings();

  try {
    const listings = await apiRequest("/listings");
    items = applyRemovedListings(listings.map(normalizeListing));
  } catch (error) {
    items = applyRemovedListings(fallbackItems.map(normalizeListing));
    addNotification("Showing demo listings because the backend is offline.");
  }

  showItems();
}

async function loadAdminStats() {
  document.getElementById("totalListings").textContent = items.length;
  const adminStatus = document.getElementById("adminStatus");

  try {
    const stats = await apiRequest("/admin/stats");
    document.getElementById("totalUsers").textContent = stats.users;
    document.getElementById("totalListings").textContent = stats.listings;
    document.getElementById("totalWishlist").textContent = stats.wishlist_items;
    adminStatus.textContent = "Admin dashboard is connected to backend data.";
  } catch (error) {
    document.getElementById("totalUsers").textContent = localStorage.getItem("collectifyUserName") ? "1" : "0";
    document.getElementById("totalWishlist").textContent = wishlistItems.length;
    adminStatus.textContent = error.message.includes("Admin")
      ? "Admin login is required to view protected backend totals."
      : "Backend stats are offline, so local demo totals are shown.";
  }
}

async function loadCurrentUser() {
  const profile = document.getElementById("profile");
  const authLink = document.getElementById("authLink");
  const logoutButton = document.getElementById("logoutButton");
  const storedName = localStorage.getItem("collectifyUserName");

  if (storedName) {
    profile.textContent = storedName;
    authLink.textContent = "Account";
    logoutButton.hidden = false;
  }

  try {
    const data = await apiRequest("/auth/me");

    if (data.user) {
      localStorage.setItem("collectifyUserName", data.user.name);
      localStorage.setItem("collectifyUserEmail", data.user.email);
      profile.textContent = data.user.name;
      authLink.textContent = "Account";
      logoutButton.hidden = false;
    }
  } catch (error) {
    if (!storedName) {
      profile.textContent = "Guest User";
      authLink.textContent = "Login";
      logoutButton.hidden = true;
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

  wishlistItems.forEach((item, index) => {
    const entry = document.createElement("li");
    entry.className = "wishlist-entry";
    entry.innerHTML = `
      <div>
        <strong>${escapeHtml(item.name)}</strong>
        <span>${escapeHtml(item.category)} / ${money.format(item.price)}</span>
      </div>
      <button class="wishlist-remove" type="button" onclick="removeFromWishlist(${index})" aria-label="Remove ${escapeHtml(item.name)} from wishlist">
        Remove
      </button>
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

function removeItemLocally(item) {
  const itemKey = getItemKey(item);
  removedListingKeys = [...new Set([...removedListingKeys, itemKey])];
  items = items.filter((currentItem) => getItemKey(currentItem) !== itemKey);
  wishlistItems = wishlistItems.filter((wishlistItem) => getItemKey(wishlistItem) !== itemKey);
  saveRemovedListings();
  saveLocalWishlist();
}

function unwatchItemLocally(item) {
  const itemKey = getItemKey(item);
  wishlistItems = wishlistItems.filter((wishlistItem) => getItemKey(wishlistItem) !== itemKey);
  saveLocalWishlist();
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

async function removeFromWishlist(index) {
  const item = wishlistItems[index];

  if (!item) {
    addNotification("This wishlist item could not be removed.");
    return;
  }

  unwatchItemLocally(item);
  renderWishlist();
  showItems();
  addNotification(`${item.name} was removed from your wishlist.`);

  if (!item.id) {
    return;
  }

  try {
    await apiRequest(`/wishlist/${item.id}`, {
      method: "DELETE"
    });
  } catch (error) {
    addNotification("Wishlist updated on this page. Log in to update it permanently.");
  }
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
  loadAdminStats();

  if (!filteredItems.length) {
    list.innerHTML = `
      <div class="empty-state">
        <h3>No matching collectibles found</h3>
        <p>Try another search term, category or rarity filter.</p>
      </div>
    `;
    return;
  }

  list.innerHTML = filteredItems
    .map((item) => {
      const originalIndex = items.indexOf(item);
      const watched = isWatched(item);
      const itemName = escapeHtml(item.name);
      const itemCategory = escapeHtml(item.category);
      const itemRarity = escapeHtml(item.rarity);
      const itemSeller = escapeHtml(item.seller);
      const timeLeft = formatTimeLeft(item.time);
      const status = getAuctionStatus(item);
      return `
      <article class="item-card" onclick="openDetailModal(${originalIndex})" tabindex="0" onkeydown="openDetailFromKeyboard(event, ${originalIndex})">
        <button class="remove-item" type="button" onclick="requestRemoveListing(event, ${originalIndex})" aria-label="Remove ${itemName}">
          X
        </button>
        <div class="item-image">${item.image ? `<img src="${escapeHtml(item.image)}" alt="${itemName}" loading="lazy">` : itemRarity}</div>
        <div class="item-content">
          <span>${itemCategory} / ${itemRarity}</span>
          <h3>${itemName}</h3>
          <p>${money.format(item.price)} current bid</p>
          <small>Seller ${itemSeller} - ${item.rating} rating - ${timeLeft}</small>
          <div class="item-meta">
            <span>${status}</span>
          </div>
          <div class="watch-action">
            <button class="watch-button ${watched ? "watched" : ""}" type="button" onclick="addToWishlist(event, ${originalIndex})">
              ${watched ? "Watching" : "Watch"}
            </button>
            <button class="edit-price-button" type="button" onclick="requestPriceUpdate(event, ${originalIndex})">
              Edit Bid
            </button>
            <div class="watch-info" role="tooltip">
              <strong>${itemName}</strong>
              <span>${itemRarity} ${itemCategory}</span>
              <span>${money.format(item.price)} current bid</span>
              <span>${timeLeft} from ${itemSeller}</span>
            </div>
          </div>
        </div>
      </article>
    `;
    })
    .join("");
}

async function requestPriceUpdate(event, index) {
  event.stopPropagation();
  const item = items[index];

  if (!item) {
    addNotification("This listing could not be updated.");
    return;
  }

  const nextPrice = Number(prompt(`Enter new bid for ${item.name}`, item.price));

  if (!nextPrice || nextPrice <= 0) {
    addNotification("Enter a valid bid amount before updating.");
    return;
  }

  const previousPrice = item.price;
  items[index] = {
    ...item,
    price: nextPrice
  };
  showItems();
  addNotification(`${item.name} bid updated to ${money.format(nextPrice)}.`);

  if (!item.id) {
    return;
  }

  try {
    const data = await apiRequest(`/listings/${item.id}`, {
      method: "PUT",
      body: JSON.stringify({ price: nextPrice })
    });
    items[index] = normalizeListing(data.listing);
    showItems();
  } catch (error) {
    items[index] = {
      ...items[index],
      price: previousPrice
    };
    showItems();
    addNotification(error.message.includes("Admin")
      ? "Only an admin can update backend listing bids."
      : "Backend update failed, so the bid was restored.");
  }
}

function openDetailFromKeyboard(event, index) {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    openDetailModal(index);
  }
}

function openDetailModal(index) {
  const item = items[index];

  if (!item) {
    return;
  }

  const modal = document.getElementById("detailModal");
  const content = document.getElementById("detailContent");
  const itemName = escapeHtml(item.name);
  const itemCategory = escapeHtml(item.category);
  const itemRarity = escapeHtml(item.rarity);
  const itemSeller = escapeHtml(item.seller);
  const timeLeft = formatTimeLeft(item.time);
  const status = getAuctionStatus(item);
  const watched = isWatched(item);
  openDetailIndex = index;

  content.innerHTML = `
    <div class="detail-grid">
      <div class="detail-image">
        ${item.image ? `<img src="${escapeHtml(item.image)}" alt="${itemName}">` : itemRarity}
      </div>
      <div class="detail-body">
        <span class="detail-status">${status}</span>
        <h2 id="detailTitle">${itemName}</h2>
        <p>${itemCategory} / ${itemRarity}</p>
        <dl>
          <div><dt>Current Bid</dt><dd>${money.format(item.price)}</dd></div>
          <div><dt>Seller</dt><dd>${itemSeller}</dd></div>
          <div><dt>Rating</dt><dd>${item.rating}</dd></div>
          <div><dt>Time Left</dt><dd>${timeLeft}</dd></div>
        </dl>
        <button class="watch-button ${watched ? "watched" : ""}" type="button" onclick="addToWishlist(event, ${index})">
          ${watched ? "Watching" : "Watch"}
        </button>
      </div>
    </div>
  `;

  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
}

function closeDetailModal() {
  const modal = document.getElementById("detailModal");
  openDetailIndex = null;
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
}

function requestRemoveListing(event, index) {
  event.stopPropagation();
  const item = items[index];

  if (!item) {
    addNotification("This listing could not be removed.");
    return;
  }

  pendingRemoveIndex = index;
  document.getElementById("confirmMessage").textContent = `Remove ${item.name} from collections?`;
  const modal = document.getElementById("confirmModal");
  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
}

function closeConfirmModal() {
  pendingRemoveIndex = null;
  const modal = document.getElementById("confirmModal");
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
}

async function confirmRemoveListing() {
  const index = pendingRemoveIndex;
  closeConfirmModal();
  await removeListing(index);
}

async function removeListing(index) {
  const item = items[index];

  if (!item) {
    addNotification("This listing could not be removed.");
    return;
  }

  removeItemLocally(item);
  renderWishlist();
  showItems();
  addNotification(`${item.name} was removed from collections.`);

  if (!item.id) {
    return;
  }

  try {
    await apiRequest(`/listings/${item.id}`, {
      method: "DELETE"
    });
  } catch (error) {
    addNotification(error.message.includes("Admin")
      ? "Only an admin can remove backend listings."
      : "Removed on this page. Start the backend to remove it permanently.");
  }
}

async function addToWishlist(event, index) {
  if (typeof event === "number") {
    index = event;
    event = null;
  }

  if (event) {
    event.stopPropagation();
  }

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

function updateAuctionTimers() {
  items = items.map((item) => ({
    ...item,
    time: Math.max(0, item.time - 1)
  }));

  showItems();

  if (openDetailIndex !== null) {
    openDetailModal(openDetailIndex);
  }
}

function setupModalControls() {
  document.getElementById("detailModal").addEventListener("click", (event) => {
    if (event.target.id === "detailModal") {
      closeDetailModal();
    }
  });

  document.getElementById("confirmModal").addEventListener("click", (event) => {
    if (event.target.id === "confirmModal") {
      closeConfirmModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeDetailModal();
      closeConfirmModal();
    }
  });
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

async function logoutUser() {
  localStorage.removeItem("collectifyUserName");
  localStorage.removeItem("collectifyUserEmail");
  document.getElementById("profile").textContent = "Guest User";
  document.getElementById("authLink").textContent = "Login";
  document.getElementById("logoutButton").hidden = true;
  wishlistItems = [];
  saveLocalWishlist();
  renderWishlist();
  showItems();

  try {
    await apiRequest("/auth/logout", {
      method: "POST"
    });
  } catch (error) {
    addNotification("Signed out locally. Backend session was already offline.");
    return;
  }

  addNotification("You have been logged out.");
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
    image: defaultImagesByCategory[category] || defaultImagesByCategory.Memorabilia
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
loadAdminStats();
setupModalControls();
setInterval(updateAuctionTimers, 60000);
