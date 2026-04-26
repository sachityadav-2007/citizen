# Citizen Information Dashboard

A modern, responsive Smart City administration portal providing real-time data integrations for weather, currency exchange rates, featured citizen profiles, and daily city facts. 

This project also features a built-in context-aware **AI Chatbot (Smart City Assistant)** capable of answering questions specifically based on the live dashboard data currently visible on the screen.

## 🌟 Key Features

### 1. Live Weather Tracking
- Fetches real-time weather data for Pune, India (Lat: 18.52, Lon: 73.86).
- Displays current temperature (°C), wind speed (km/h), and maps WMO weather codes to human-readable conditions (e.g., Clear Sky, Rain, Thunderstorm).
- **API Used**: [Open-Meteo API](https://open-meteo.com/)

### 2. Currency Exchange Rates
- Retrieves global currency exchange rates in real-time.
- Automatically calculates and converts base rates to display the value of 1 INR against USD, EUR, and GBP.
- **API Used**: [ExchangeRate-API](https://www.exchangerate-api.com/)

### 3. Featured Citizen Profile
- Simulates a city directory by fetching and displaying a random citizen profile.
- Shows a high-quality profile picture, full name (Title, First, Last), and contact email.
- **API Used**: [Random User Generator API](https://randomuser.me/)

### 4. City Fact of the Day
- Displays a random, interesting daily fact to keep the dashboard engaging for users.
- **API Used**: [Useless Facts API](https://uselessfacts.jsph.pl/)

### 5. Smart City AI Assistant
- A floating, interactive chatbot integrated directly into the portal.
- **Context-Aware**: The AI is injected with real-time variables from the dashboard (current weather, rates, displayed citizen, and fact). It will respond intelligently based *only* on the data currently on the screen.
- **API Used**: [Pollinations AI](https://pollinations.ai/) (Text Generation Proxy)

## 🛠️ Technical Architecture

- **Frontend**: Built utilizing HTML5, CSS3, and Vanilla JavaScript.
- **Styling**: Features a custom CSS design system using CSS Variables (`--teal`, `--orange-btn`, etc.) for consistent theming. It uses CSS Grid and Flexbox for a fully responsive layout that adapts from mobile to desktop.
- **Data Fetching**: Implements asynchronous JavaScript (`async/await`) and native `fetch`. It uses `Promise.allSettled()` to fetch all dashboard data concurrently on initial load, reducing wait times.
- **Build System**: Uses **Vite** for lightning-fast hot module replacement during development and optimized bundling for production. (Note: The repository also contains scaffolding for React and Tailwind CSS for future scalability).

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd citizen
   ```
3. Install the dependencies (Vite, Autoprefixer, etc.):
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## 🌍 Deployment on Netlify

This project is pre-configured for seamless deployment on Netlify as a Single Page Application (SPA).

1. Push your code to GitHub/GitLab.
2. Connect the repository to Netlify.
3. Netlify will automatically detect the configuration from the included `netlify.toml` file:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
4. A `public/_redirects` file is included to ensure all routing requests default back to `index.html`, preventing `404 Not Found` errors.

## 📄 License

This project is open-source and available under the MIT License.
