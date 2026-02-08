const itemsGrid = document.getElementById('itemsGrid');
let allItems = []; // Store items globally for filtering

// 1. Fetch data from Firebase Realtime Database
function loadItems() {
    firebase.database().ref("items").on("value", (snapshot) => {
        const data = snapshot.val();
        if (!data) {
            itemsGrid.innerHTML = "<p style='text-align:center; width:100%;'>No items found in the registry.</p>";
            return;
        }

        // We need the Firebase Key (ID) to delete, so we map it here
        allItems = Object.keys(data).map(key => ({
            id: key, 
            ...data[key]
        })).reverse();
        
        displayItems(allItems);
    }, (error) => {
        console.error("Firebase Read Error:", error);
        itemsGrid.innerHTML = "<p>Error loading items. Check console.</p>";
    });
}

// 2. Display items in your HTML Grid
function displayItems(items) {
    itemsGrid.innerHTML = ""; 

    items.forEach(item => {
        const imgUrl = item.imageUrl || "https://via.placeholder.com/300?text=No+Image";
        const tagClass = item.status === "Found" ? "tag-found" : "tag-lost";

        itemsGrid.innerHTML += `
            <div class="item-card">
                <div style="width:100%; height:180px; overflow:hidden; border-radius:12px; margin-bottom:12px; background:#020617; position: relative;">
                    <img src="${imgUrl}" 
                         alt="${item.title}" 
                         style="width:100%; height:100%; object-fit:cover;"
                         onerror="this.src='https://via.placeholder.com/300?text=Image+Error'">
                    
                    <button onclick="deleteItem('${item.id}')" 
                            style="position:absolute; top:10px; right:10px; background:rgba(239, 68, 68, 0.9); color:white; border:none; border-radius:50%; width:30px; height:30px; cursor:pointer; font-size:14px; display:flex; align-items:center; justify-content:center; box-shadow: 0 2px 5px rgba(0,0,0,0.3);">
                        🗑️
                    </button>
                </div>

                <span class="item-tag ${tagClass}">${item.status}</span>
                <h3 style="margin-top:10px;">${item.title}</h3>
                <p>${item.description}</p>
                <p style="font-size: 12px; color: #38bdf8;">📍 ${item.location}</p>
                <button class="contact-btn" onclick="contactOwner('${item.phone}')">Contact: ${item.phone}</button>
            </div>
        `;
    });
}

// 3. Apply Filters
function applyFilters() {
    const searchText = document.getElementById('searchInput').value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter');
    const statusFilter = document.getElementById('statusFilter');

    const categoryText = categoryFilter ? categoryFilter.value.toLowerCase() : "";
    const statusText = statusFilter ? statusFilter.value : "";

    const filtered = allItems.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchText) || 
                              item.description.toLowerCase().includes(searchText);
        const matchesCategory = categoryText === "" || (item.category && item.category.toLowerCase() === categoryText);
        const matchesStatus = statusText === "" || item.status === statusText;

        return matchesSearch && matchesCategory && matchesStatus;
    });

    displayItems(filtered);
}

// 4. Contact Function
function contactOwner(phone) {
    alert("Contacting owner at: " + phone);
}

// 5. DELETE FUNCTION (Removes from Firebase)
function deleteItem(itemId) {
    if (confirm("Are you sure you want to delete this report?")) {
        firebase.database().ref("items/" + itemId).remove()
        .then(() => {
            alert("Item deleted successfully!");
            // No need to refresh, .on("value") updates the UI automatically
        })
        .catch((error) => {
            alert("Delete failed: " + error.message);
        });
    }
}

// Start loading when page opens
loadItems();