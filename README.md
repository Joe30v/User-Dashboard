User Dashboard

A simple User Dashboard that fetches and displays user data from an API with search, filtering, and pagination features.

1. Technologies Used

- HTML5 - Page structure
- CSS3 — Responsive styling with Flexbox & Grid
- JavaScript (ES6+) - Core functionality

2. Features

- Fetch users from [JSONPlaceholder API](https://jsonplaceholder.typicode.com/users)
- Real-time search/filter by user name
- Pagination (5 users per page) *customizable in app.js  at row 11
- Modal popup for detailed user information
- Responsive design (mobile, tablet, desktop)
- Local storage caching (30-minute cache)
- Error handling and loading states

3. Implementation Details

3.1 How It Works

1. Fetch Data: Uses `async/await` to fetch users from the public API.
2. Cache Data: `localStorage` stores users for 30 minutes to reduce API calls.
3. Display Users: Grid layout shows 5 users per page.
4. Search: `filter()` method searches users by name (automatically converts to lowercase).
5. Modal: Click user card to view full details.
6. Pagination: Navigate between pages using buttons.

3.2 Key Functions

 - `fetchUsers()` - Fetches data from API or cache
 - `displayUsers()` - Renders users with pagination
 - `searchInput.addEventListener()` - Real-time search filter
 - `cacheUsers()` - Saves data to localStorage

***********************************************************************************************

4 Setup Instructions

            4.1 Prerequisites
            - Node.js and npm
            - Modern web browser

            4.2 Steps

            4.2.1. Clone/Download the project

            ```bash
            # If you haven't cloned the repo yet, clone it and enter the folder:
            git clone git@github.com:your-username/your-repo.git
            cd UserDashboard
            ```

            4.2.2. Install dependencies

            ```bash
            npm install
            ```

            4.2.3. Start the server (local)

            ```bash
            npm start
            ```

            This runs `npx http-server -p 8001 -o -c-1` (configured in `package.json`) and opens `http://localhost:8001`.

            4.2.4. Alternative: Use any HTTP server

            ```bash
            python -m http.server 8000
            ```

4.3 Running on GitHub Pages (fork & use as your project)
Quick steps (fork → publish):

         4.3.1. On GitHub, open the original repository and click **Fork** to create a copy under your account.

         4.3.2. Clone your fork locally (replace `your-username` and `your-repo`):

         ```bash
         *SSH*
         git clone git@github.com:your-username/your-repo.git
         *OR HTTPS*
         git clone https://github.com/your-username/your-repo.git
         cd your-repo


         4.3.3. Make changes, commit, and push:

         ```bash
         git add .
         git commit -m "Customize dashboard"
         git push
         ```

         4.3.4. Publish via GitHub Pages:

         - On GitHub, open your fork → Settings → Pages.
         - Under "Build and deployment" choose Branch: `main` and folder `/ (root)`, then click Save.

         4.3.5. Visit your site at: `https://your-username.github.io/your-repo`

         Notes:
         - For a user/organization site, name the repository `your-username.github.io` and push to `main`; the site will be `https://your-username.github.io`.
         - Making the repo public is optional; GitHub Pages works with public repos by default. Private repo Pages require a GitHub plan that supports Pages for private repos.
         - If you prefer automated deployments, see the `gh-pages` method earlier in this README and run `npm run deploy` from your fork.
   
***********************************************************************************************

5 Project Files


├── index.html    - HTML structure
├── app.js        - JavaScript logic
├── style.css     - Styling & responsive layout
└── package.json  - Dependencies


6 Quick Test

- View Users: Page loads and displays dashboard
- Search: Type a name in the search box to filter
- Click User: Click any card to see full details
- Paginate: Use page buttons to browse users
- Close Modal: Click × or outside modal to close


 