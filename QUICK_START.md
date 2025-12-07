# 🚀 Quick Reference Card

## Essential Commands

### 🐳 Docker (Recommended)
```bash
# First time setup
./docker.sh build
./docker.sh start

# Daily use
./docker.sh logs    # View logs
./docker.sh stop    # Stop app
./docker.sh start   # Start app
./docker.sh restart # Restart app

# Development
./docker.sh dev     # Hot reload mode (port 3001)
```

### 💻 Local Development
```bash
# First time setup
npm install

# Daily use
npm run dev         # Start dev server
npm run build       # Build for production
npm start          # Run production build
```

## Access Points
- **Production**: http://localhost:3000
- **Development**: http://localhost:3001 (Docker dev mode)

## Features Checklist
- [x] Search by name
- [x] Filter by status (Alive/Dead/Unknown)
- [x] Filter by species
- [x] Add to favorites (star icon)
- [x] View character details (click card)
- [x] Toggle dark/light mode (sun/moon icon)
- [x] Navigate pages

## File Locations
- **Theme**: `src/components/ThemeProvider.tsx`
- **Home**: `src/app/page.tsx`
- **Character List**: `src/components/CharactersList.tsx`
- **Favorites**: `src/app/favorites/page.tsx`
- **Styles**: `src/app/globals.css`
- **Config**: `next.config.ts`, `tailwind.config.ts`

## Troubleshooting
```bash
# Docker not working?
sudo systemctl start docker

# Port already in use?
./docker.sh stop
lsof -i :3000
kill -9 <PID>

# Clean start
rm -rf node_modules .next
npm install
```

## Data Storage
- **Favorites**: `localStorage["favs"]` (JSON array of IDs)
- **Theme**: `localStorage["theme"]` ("light" or "dark")
- **API Cache**: SWR in-memory cache

## API Endpoints
- List: `GET /character?page=1&name=rick&status=alive`
- Detail: `GET /character/:id`
- Multiple: `GET /character/1,2,3`

## Deployment
```bash
# Vercel (fastest)
vercel

# Docker (anywhere)
docker compose up -d

# Traditional
npm run build && npm start
```
