const userGrid = document.getElementById('userGrid');
const statusMessage = document.getElementById('statusMessage');
const searchInput = document.getElementById('searchInput');
const modal = document.getElementById('userModal');
const modalBody = document.getElementById('modalBody');
const modalCloseBtn = document.getElementById('closeModal');

let usersData = [];
let filteredUsers = [];
let currentPage = 1;
const usersPerPage = 5;  /* Adjust this value to show more or less users per page (Pagination) */

// Local storage keys
const STORAGE_KEYS = {
    USERS: 'cachedUsers', 
    TIMESTAMP: 'usersTimestamp'
};

// Fetch users from API
async function fetchUsers() {
    try {
        statusMessage.textContent = 'Loading users...';
        
        // Check cache first (cache for 30m)
        const cached = getCachedUsers();
        if (cached && cached.users) {
            usersData = cached.users;
            filteredUsers = usersData;
            currentPage = 1;
            displayUsers(filteredUsers);
            statusMessage.textContent = '';
            return;
        }

        const response = await fetch('https://jsonplaceholder.typicode.com/users');

        if (!response.ok) {
            throw new Error(`Error fetching users: ${response.statusText}`); /* Check if request succeeded */
        }

        usersData = await response.json();
        filteredUsers = usersData;
        currentPage = 1;
        
        // Cache the users
        cacheUsers(usersData);
        
        displayUsers(filteredUsers);
        statusMessage.textContent = ''; /* Clear status message after successful load */
    }

    catch (error) { /* Handle errors when fail to fetch data from api */
        console.error(error);
        statusMessage.textContent = 'Failed to load users. Please try again later.';
    }
}

// Cache users to local storage
function cacheUsers(users) {
    try {
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users)); /* Convert array to text for local storage to save */
        localStorage.setItem(STORAGE_KEYS.TIMESTAMP, Date.now().toString()); /* record when data  was saved */
    } catch (error) {
        console.warn('Failed to cache users:', error);
    }
}

// Get cached users if available
function getCachedUsers() {
    try {
        const cached = localStorage.getItem(STORAGE_KEYS.USERS);
        const timestamp = localStorage.getItem(STORAGE_KEYS.TIMESTAMP);
        
        if (!cached || !timestamp) { // No cache or no timestamp found
            return null;
        }

        // Cache expires after 30 min
        const thirtyMinutesAgo = Date.now() - (30 * 60 * 1000);
        if (parseInt(timestamp) < thirtyMinutesAgo) {
            localStorage.removeItem(STORAGE_KEYS.USERS);
            localStorage.removeItem(STORAGE_KEYS.TIMESTAMP);
            return null;
        }

        return { users: JSON.parse(cached) }; /* convert text to array */
    } catch (error){
        console.warn('Failed to retrieve cached users:', error);
        return null;
    }
}

// Display users in grid with pagination
function displayUsers(users) {
    userGrid.innerHTML = '';

    if (users.length === 0) {
        statusMessage.textContent = 'No users found matching your search.';
        return;
    }

    // Calculate pagination
    const totalPages = Math.ceil(users.length / usersPerPage);
    const startIndex = (currentPage - 1) * usersPerPage; /* Calculate the starting index for the current page */
    const endIndex = startIndex + usersPerPage; /* Calculate the ending index for the current page */
    const paginatedUsers = users.slice(startIndex, endIndex); /* Get the users for the current page */

    // Display current page users
    paginatedUsers.forEach(user => {
        const userCard = document.createElement('div');
        userCard.classList.add('user-card');
        userCard.innerHTML = `
            <h3>${user.name}</h3>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Company:</strong> ${user.company.name}</p>
        `;

        userCard.addEventListener('click', () => showUserDetails(user));
        userGrid.appendChild(userCard);
    });

    // Display pagination controls
    displayPagination(users.length);
}

// Display pagination controls
function displayPagination(totalUsers) {
    // Remove existing pagination if any
    const existingPagination = document.querySelector('.pagination'); /* just to check if pagination exists, remove when exisit before creating new ones */
    if (existingPagination) {
        existingPagination.remove(); /* remove existing pagination controls before creating new ones */
    }

    const totalPages = Math.ceil(totalUsers / usersPerPage);

    if (totalPages <= 1) {
        return; /* when is only one page, pagination will not be displayed */
    }

    const paginationDiv = document.createElement('div'); /* use div for pagination controls container */
    paginationDiv.classList.add('pagination');

    // Previous button 
    const prevBtn = document.createElement('button');
    prevBtn.textContent = '← Previous';
    prevBtn.disabled = currentPage === 1;
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayUsers(filteredUsers);
            window.scrollTo(0, 0);
        }
    });
    paginationDiv.appendChild(prevBtn);

    // Page numbers with active state
    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.textContent = i;
        pageBtn.classList.toggle('active', i === currentPage); 
        pageBtn.addEventListener('click', () => { 
            currentPage = i;
            displayUsers(filteredUsers);
            window.scrollTo(0, 0);
        });
        paginationDiv.appendChild(pageBtn);
    }

    // Next button 
    const nextBtn = document.createElement('button');
    nextBtn.textContent = 'Next →';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            displayUsers(filteredUsers);
            window.scrollTo(0, 0);
        }
    });
    paginationDiv.appendChild(nextBtn);

    // Page info with current page and total pages
    const pageInfo = document.createElement('span'); 
    pageInfo.classList.add('page-info');
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    paginationDiv.appendChild(pageInfo);

    userGrid.parentElement.appendChild(paginationDiv);
}

// Show user details in modal when user card is clicked
function showUserDetails(user) {
    console.log('showUserDetails called with user:', user);
    const content = `
        <h2>${user.name}</h2>
        <p><strong>Username:</strong> ${user.username}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Phone:</strong> ${user.phone}</p>
        <p><strong>Website:</strong> ${user.website}</p>
        <p><strong>Company:</strong> ${user.company.name}</p>
        <p><strong>Address:</strong> ${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}</p>
    `;
    console.log('Setting innerHTML to:', content); // Log the content being set to the modal body
    modalBody.innerHTML = content; 
    console.log('Modal body innerHTML set, removing hidden class'); 
    modal.classList.remove('hidden'); 
}

/* Close modal when user clicks the X button */
modalCloseBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
});

// Search users by name
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase(); // Get what the user typed and convert to lowercase

    filteredUsers = usersData.filter(user => user.name.toLowerCase().includes(searchTerm)); 
    
    currentPage = 1; /* reset to page 1 */

    /* error handling message when no user found */
    if (filteredUsers.length === 0) {
        statusMessage.textContent = 'No users found matching your search.';
    } else {
        statusMessage.textContent = '';
    }
    
    displayUsers(filteredUsers);
});

// Close modal when clicking outside of the modal content
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.classList.add('hidden');
    }
});

// Toggle search input visibility on search icon click
const searchIcon = document.querySelector('.search-icon');
searchIcon.addEventListener('click', () => {
    searchInput.classList.toggle('search-hidden');
    if (!searchInput.classList.contains('search-hidden')) {
        searchInput.focus();
    } else {
        searchInput.value = '';
        filteredUsers = usersData;
        currentPage = 1;
        displayUsers(filteredUsers);
        statusMessage.textContent = '';
    }
});

// initialize
fetchUsers();
