# 🛸 RickDex - Rick and Morty Character Database

A modern Next.js application for browsing and exploring Rick and Morty characters with a custom Rick and Morty themed UI, complete dark/light mode support, advanced search and filtering capabilities, and favorites management.

![Next.js](https://img.shields.io/badge/Next.js-16.0.7-black?style=flat-square)
![React](https://img.shields.io/badge/React-19.2.0-blue?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=flat-square)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat-square)

---

## 📋 Table of Contents

- [Core Features](#-core-features)
- [Tech Stack](#-tech-stack)
- [Project Architecture](#-project-architecture)
- [How It Works](#-how-it-works-step-by-step)
- [Quick Start](#-quick-start)
- [Running with Docker](#-running-with-docker)
- [Local Development](#-local-development)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Available Commands](#-available-commands)

---

## ✨ Core Features

### 🎨 **Rick and Morty Themed UI**
- Custom color palette inspired by the show (Portal Green, Morty Yellow, Rick's Lab Blue)
- Animated portal effects in the background
- Status-based color coding (Green for Alive, Red for Dead, Gray for Unknown)
- Smooth transitions and hover effects
- Fully responsive design for mobile, tablet, and desktop

### 🌓 **Dark/Light Mode**
- Toggle between dark and light themes with a single click
- Theme preference saved in localStorage
- Smooth CSS transitions between modes
- Automatic system preference detection on first visit
- Persistent theme across all pages

### 🔍 **Advanced Search & Filters**
- **Search by Name**: Debounced search input (400ms) for optimal performance
- **Filter by Status**: Alive, Dead, or Unknown
- **Filter by Species**: Human, Alien, Humanoid, Robot, Animal, Cronenberg, and more
- Real-time results update
- Auto-reset to page 1 when filters change

### ⭐ **Favorites Management**
- Mark/unmark characters as favorites with a single click
- Favorites stored in browser localStorage
- Dedicated favorites page to view all saved characters
- Favorites persist across browser sessions
- Visual indicator on character cards

### 📄 **Pagination**
- Dynamic pagination with page windows
- Navigate to first, last, previous, and next pages
- Shows current page and total pages
- Responsive pagination controls
- Smart page window display (shows 5 pages at a time)

### 📱 **Character Details**
- Detailed character information page
- Character image with styled borders
- Status, Species, Gender, Type display
- Origin and last known location
- Episode appearance count
- Back navigation to main list

### 🚀 **Performance Optimizations**
- SWR for data fetching with automatic caching
- Client-side rendering for interactive components
- Server-side rendering for character details
- Next.js Image optimization for character images
- Debounced search input to reduce API calls
- Revalidation disabled on focus for better UX

---

## 🛠 Tech Stack

### **Frontend Framework**
- **Next.js 16.0.7** - React framework with App Router and Server Components
- **React 19.2.0** - Latest React with improved performance
- **TypeScript 5** - Type-safe development

### **Styling**
- **Tailwind CSS 4** - Utility-first CSS framework
- **Custom CSS** - Rick and Morty themed color variables
- **PostCSS** - CSS processing

### **Data Fetching**
- **SWR 2.3.7** - React Hooks for data fetching with caching
- **Axios** - HTTP client for API requests

### **DevOps**
- **Docker** - Containerization for consistent environments
- **Docker Compose** - Multi-container orchestration
- **Node.js 20 Alpine** - Lightweight base image

### **Code Quality**
- **ESLint** - Code linting
- **TypeScript** - Static type checking

---

## 🏗 Project Architecture

```
rickandmorty-next/
│
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── globals.css              # Global styles with theme variables
│   │   ├── layout.tsx               # Root layout with ThemeProvider
│   │   ├── page.tsx                 # Home page (character list)
│   │   ├── character/[id]/
│   │   │   └── page.tsx             # Dynamic character detail page
│   │   └── favorites/
│   │       └── page.tsx             # Favorites page
│   │
│   ├── components/                   # Reusable React components
│   │   ├── CharacterCard.tsx        # Character card with favorite toggle
│   │   ├── CharactersList.tsx       # Main character list with filters
│   │   ├── Pagination.tsx           # Pagination controls
│   │   ├── SearchFilters.tsx        # Search and filter inputs
│   │   └── ThemeProvider.tsx        # Dark/Light mode provider
│   │
│   ├── lib/                         # Utility functions
│   │   ├── api.ts                   # API helper functions
│   │   └── favs.ts                  # Favorites management
│   │
│   └── types/                       # TypeScript type definitions
│       └── rick.ts                  # Rick and Morty API types
│
├── public/                          # Static assets
│
├── Docker Files                     # Containerization
│   ├── Dockerfile                   # Multi-stage production build
│   ├── docker-compose.yml           # Service definitions
│   ├── .dockerignore               # Docker ignore patterns
│   └── docker.sh                    # Helper script
│
└── Configuration Files
    ├── next.config.ts              # Next.js configuration
    ├── tailwind.config.ts          # Tailwind CSS configuration
    ├── tsconfig.json               # TypeScript configuration
    ├── package.json                # Dependencies and scripts
    └── Makefile                    # Make commands
```

---

## 🔄 How It Works (Step-by-Step)

### **1. Application Initialization**

```typescript
// src/app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
```

- Next.js initializes with the root layout
- ThemeProvider wraps the entire app for theme management
- Custom fonts (Geist Sans, Geist Mono) are loaded
- Global CSS with Rick and Morty theme is applied

### **2. Theme Management**

```typescript
// src/components/ThemeProvider.tsx
- Checks localStorage for saved theme preference
- Falls back to system preference if no saved theme
- Applies "dark" class to HTML element
- Provides toggle button (☀️/🌙) in fixed position
- Saves theme changes to localStorage
```

**Flow:**
1. Component mounts → Check localStorage
2. No saved theme → Check system preference
3. Apply theme → Add/remove "dark" class
4. User clicks toggle → Update state → Save to localStorage → Apply theme

### **3. Data Fetching with SWR**

```typescript
// src/components/CharactersList.tsx
const url = buildCharacterUrl({ page, name, status, species });
const { data, error, isLoading } = useSWR(url, fetcher, {
  revalidateOnFocus: false
});
```

**Flow:**
1. Component builds API URL with current filters
2. SWR checks cache for existing data
3. If cached → Return immediately
4. If not cached → Fetch from API
5. Cache response for future use
6. When filters change → Build new URL → Fetch new data

### **4. Search and Filtering**

```typescript
// src/components/SearchFilters.tsx
- Name input → 400ms debounce → Update parent state
- Status/Species select → Immediate update
- Parent component detects filter change → Reset page to 1
- New URL built → SWR fetches filtered data
```

**Debouncing Logic:**
```typescript
useEffect(() => {
  const timer = setTimeout(() => onNameChange(localName.trim()), 400);
  return () => clearTimeout(timer);
}, [localName]);
```

### **5. Favorites System**

```typescript
// src/lib/favs.ts
localStorage key: "favs"
Data structure: Array of character IDs [1, 5, 12, 42]

toggleFav(characterId):
  1. Get current favorites from localStorage
  2. Check if character is already favorited
  3. If yes → Remove from array
  4. If no → Add to array
  5. Save updated array to localStorage
  6. Return new favorite status
```

**Character Card Integration:**
```typescript
// src/components/CharacterCard.tsx
- On mount → Check if character is in favorites
- User clicks favorite button → Toggle favorite
- Update UI immediately (optimistic update)
- Favorites page reads from same localStorage key
```

### **6. Pagination Logic**

```typescript
// src/components/Pagination.tsx
Window size: 5 pages
Current page: 8
Total pages: 42

Calculation:
- Show pages: 6, 7, [8], 9, 10
- Show "..." before if start > 1
- Show "..." after if end < total
- Show page 1 button if not in window
- Show last page button if not in window
```

### **7. Character Detail Page**

```typescript
// src/app/character/[id]/page.tsx
Server Component (async):
  1. Extract ID from URL params (await params)
  2. Fetch character data from API
  3. Server-side render the page
  4. Send HTML to client
  5. Client hydrates with interactivity
```

### **8. API Integration**

```typescript
// src/lib/api.ts
Base URL: https://rickandmortyapi.com/api

buildCharacterUrl():
  - Builds query string from filters
  - Example: /character?page=1&name=rick&status=alive

fetcher():
  - Makes fetch request
  - Checks response status
  - Parses JSON
  - Returns data or throws error
```

---

## 🚀 Quick Start

### **Prerequisites**
- Git installed
- Either:
  - **Docker** (Recommended - No other dependencies needed!)
  - OR **Node.js 18+** and npm/yarn

---

## 🐳 Running with Docker

Docker provides a consistent environment and requires NO Node.js installation!

### **Step 1: Clone the Repository**

```bash
git clone https://github.com/an1sshhh/RickAndMorty.git
cd rickandmorty-next
```

### **Step 2: Start Docker Service**

**Linux:**
```bash
sudo systemctl start docker
sudo systemctl enable docker  # Auto-start on boot
```

**macOS/Windows:**
- Open Docker Desktop application

### **Step 3: Build and Run**

**Option A: Using Helper Script (Easiest)**
```bash
# Make script executable (first time only)
chmod +x docker.sh

# Build the Docker image
./docker.sh build

# Start the container
./docker.sh start

# View logs
./docker.sh logs

# Stop the container
./docker.sh stop
```

**Option B: Using Docker Compose**
```bash
# Build and start in one command
docker compose up -d

# View logs
docker compose logs -f

# Stop containers
docker compose down
```

**Option C: Using Makefile**
```bash
make build    # Build image
make up       # Start container
make logs     # View logs
make down     # Stop container
```

### **Step 4: Access the Application**

Open your browser and navigate to:
```
http://localhost:3000
```

### **Docker Flow Diagram**

```
┌─────────────────────────────────────────────────────────────┐
│                     DOCKER BUILD FLOW                        │
└─────────────────────────────────────────────────────────────┘

Step 1: Base Image (node:20-alpine)
         ↓
Step 2: Install Dependencies (npm ci)
         ↓
Step 3: Copy Source Code
         ↓
Step 4: Build Next.js App (npm run build)
         ↓
Step 5: Create Production Image
         ↓
Step 6: Copy Built Files
         ↓
Step 7: Set User Permissions
         ↓
Step 8: Expose Port 3000
         ↓
Final: Run Production Server (node server.js)

┌─────────────────────────────────────────────────────────────┐
│                     DOCKER RUN FLOW                          │
└─────────────────────────────────────────────────────────────┘

docker compose up -d
         ↓
Container: rickdex-app
         ↓
Binds Port: 0.0.0.0:3000 → Container:3000
         ↓
Runs: node server.js
         ↓
Next.js Server Ready
         ↓
Access: http://localhost:3000
```

### **Development Mode with Docker**

For development with hot-reload:

```bash
# Using helper script
./docker.sh dev

# Or using docker compose
docker compose --profile dev up rickdex-dev
```

Access at: `http://localhost:3001`

This mounts your local files into the container, so changes are reflected immediately!

### **Useful Docker Commands**

```bash
# Check running containers
docker ps

# View all containers (including stopped)
docker ps -a

# View logs
docker logs rickdex-app

# Access container shell
docker exec -it rickdex-app sh

# Rebuild without cache
./docker.sh rebuild

# Clean up everything
./docker.sh clean

# Check Docker images
docker images

# Remove unused images
docker image prune -a
```

---

## 💻 Local Development

If you prefer to run without Docker:

### **Step 1: Clone the Repository**

```bash
git clone https://github.com/an1sshhh/RickAndMorty.git
cd rickandmorty-next
```

### **Step 2: Install Dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
```

### **Step 3: Run Development Server**

```bash
npm run dev
```

### **Step 4: Access the Application**

Open [http://localhost:3000](http://localhost:3000) in your browser.

The page auto-updates as you edit files!

### **Step 5: Build for Production**

```bash
npm run build
npm start
```

---

## 📁 Project Structure

### **Core Application Files**

| File | Purpose |
|------|---------|
| `src/app/layout.tsx` | Root layout with ThemeProvider integration |
| `src/app/page.tsx` | Home page with character list |
| `src/app/globals.css` | Global styles and CSS variables |
| `src/app/character/[id]/page.tsx` | Dynamic character detail page |
| `src/app/favorites/page.tsx` | Favorites management page |

### **Components**

| Component | Description |
|-----------|-------------|
| `ThemeProvider.tsx` | Manages dark/light mode state and persistence |
| `CharactersList.tsx` | Main list with search, filters, and pagination |
| `CharacterCard.tsx` | Individual character card with favorite toggle |
| `SearchFilters.tsx` | Search input and filter dropdowns |
| `Pagination.tsx` | Page navigation controls |

### **Utilities**

| File | Purpose |
|------|---------|
| `lib/api.ts` | API URL builders and fetch wrapper |
| `lib/favs.ts` | LocalStorage favorites management |
| `types/rick.ts` | TypeScript interfaces for API data |

### **Configuration Files**

| File | Purpose |
|------|---------|
| `next.config.ts` | Next.js configuration (standalone output) |
| `tailwind.config.ts` | Tailwind CSS theme customization |
| `tsconfig.json` | TypeScript compiler options |
| `package.json` | Dependencies and scripts |

---

## 🌐 API Documentation

### **Endpoints Used**

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/character` | GET | List all characters with pagination |
| `/character/:id` | GET | Get single character details |
| `/character/[1,2,3]` | GET | Get multiple characters by IDs |

### **Query Parameters**

| Parameter | Type | Example | Description |
|-----------|------|---------|-------------|
| `page` | number | `?page=2` | Pagination page number |
| `name` | string | `?name=rick` | Filter by character name |
| `status` | string | `?status=alive` | Filter by status (alive, dead, unknown) |
| `species` | string | `?species=human` | Filter by species |

### **Response Structure**

```typescript
{
  info: {
    count: number;    // Total number of characters
    pages: number;    // Total number of pages
    next: string | null;    // Next page URL
    prev: string | null;    // Previous page URL
  },
  results: Character[]  // Array of character objects
}
```

### **Character Object**

```typescript
{
  id: number;
  name: string;
  status: "Alive" | "Dead" | "unknown";
  species: string;
  type: string;
  gender: string;
  origin: { name: string; url: string; };
  location: { name: string; url: string; };
  image: string;      // Character image URL
  episode: string[];  // Array of episode URLs
  url: string;
  created: string;
}
```

---

## ⚡ Available Commands

### **Development Commands**

```bash
npm run dev        # Start development server (http://localhost:3000)
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
```

### **Docker Commands (Helper Script)**

```bash
./docker.sh build      # Build Docker image
./docker.sh start      # Start production container
./docker.sh stop       # Stop all containers
./docker.sh dev        # Start development container with hot-reload
./docker.sh logs       # View container logs (follow mode)
./docker.sh restart    # Restart containers
./docker.sh shell      # Open shell inside container
./docker.sh rebuild    # Rebuild from scratch (no cache)
./docker.sh clean      # Remove containers and clean up
```

### **Docker Compose Commands**

```bash
docker compose up -d              # Start in detached mode
docker compose down               # Stop and remove containers
docker compose logs -f            # Follow logs
docker compose ps                 # List running containers
docker compose build --no-cache   # Rebuild without cache
docker compose restart            # Restart services
```

### **Makefile Commands**

```bash
make help       # Show all available commands
make build      # Build Docker image
make up         # Start production container
make down       # Stop containers
make dev        # Start development container
make logs       # View logs
make restart    # Restart containers
make clean      # Clean up everything
make shell      # Access container shell
```

---

## 🎯 Features in Detail

### **Theme System**

**Light Mode Colors:**
- Background: `#f0f4f8` (Light gray-blue)
- Foreground: `#1a1a2e` (Dark text)
- Accent: `#82cd47` (Rick's portal green)

**Dark Mode Colors:**
- Background: `#0f1419` (Near black)
- Foreground: `#e8eef7` (Light text)
- Accent: `#65b741` (Darker portal green)

**Implementation:**
- CSS variables defined in `globals.css`
- Dark mode activated via `.dark` class on `<html>`
- Smooth transitions on all color properties
- LocalStorage key: `"theme"` with values `"dark"` or `"light"`

### **Search & Filter Logic**

**Debounced Search:**
```typescript
Input: "ric"
  ↓ Wait 400ms
Input: "rick"  
  ↓ Wait 400ms (no more typing)
  ↓ Execute search
API call with name="rick"
```

**Filter Combination:**
- All filters are combined with AND logic
- Example: `name=rick&status=alive&species=human`
- Changing any filter resets pagination to page 1

### **Favorites Persistence**

**Storage Format:**
```javascript
localStorage["favs"] = "[1, 5, 12, 42, 108]"
```

**Operations:**
- Add: Push ID to array, save to localStorage
- Remove: Filter out ID, save to localStorage
- Check: Read array, check if includes ID
- Load: Parse JSON from localStorage, handle errors

### **Pagination Strategy**

**Window Display:**
```
Page 1: [1] 2 3 4 5 ... 42
Page 5: 1 ... 3 4 [5] 6 7 ... 42
Page 42: 1 ... 38 39 40 41 [42]
```

**Navigation:**
- Previous: Disabled on page 1
- Next: Disabled on last page
- Jump to first: Always visible if not in window
- Jump to last: Always visible if not in window

---

## 🚢 Deployment Options

### **1. Docker Deployment**

Best for: VPS, Cloud VMs, Self-hosting

```bash
# On production server
git clone <repo-url>
cd rickandmorty-next
docker compose up -d
```

### **2. Vercel Deployment**

Best for: Fastest deployment, auto-scaling

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### **3. Traditional Node.js**

Best for: Shared hosting, custom servers

```bash
npm install
npm run build
npm start
```

---

## 📝 Environment Variables

Currently, no environment variables are required as the app uses the public Rick and Morty API.

**Optional for future:**
```env
NEXT_PUBLIC_API_URL=https://rickandmortyapi.com/api
```

---

## 🐛 Troubleshooting

### **Docker Issues**

**Error: Cannot connect to Docker daemon**
```bash
# Linux
sudo systemctl start docker

# Check status
sudo systemctl status docker
```

**Error: Port 3000 already in use**
```bash
# Find process using port
lsof -i :3000

# Kill process
kill -9 <PID>

# Or change port in docker-compose.yml
ports:
  - "3001:3000"
```

### **Build Issues**

**Error: Module not found**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json .next
npm install
```

**Docker build fails**
```bash
# Clean Docker cache
docker system prune -a
docker compose build --no-cache
```

### **Runtime Issues**

**Favorites not persisting**
- Check browser localStorage is enabled
- Clear browser cache and try again

**Images not loading**
- Check internet connection
- Verify image URLs in browser console

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Rick and Morty API](https://rickandmortyapi.com/documentation)
- [Docker Documentation](https://docs.docker.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [SWR Documentation](https://swr.vercel.app)

---

## 👥 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the MIT License.

---

## 🙏 Acknowledgments

- **[Rick and Morty API](https://rickandmortyapi.com/)** - Free REST API for Rick and Morty data
- **Adult Swim & Justin Roiland** - Rick and Morty character designs and concepts
- **Next.js Team** - Amazing React framework
- **Vercel** - SWR library for data fetching

---

## 📧 Contact

**Developer**: Anish  
**Repository**: [github.com/an1sshhh/RickAndMorty](https://github.com/an1sshhh/RickAndMorty)

---

<div align="center">

Made with 💚 using Next.js, React, and the Rick and Morty API

**Get schwifty and start exploring! 🛸**

</div>
