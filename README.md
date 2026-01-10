# TrackMe

A mobile-first GPS tracking application built with React and TypeScript. Track your runs, walks, and cycling activities with real-time location tracking and detailed statistics.

## Features

- 🗺️ **Real-time GPS Tracking** - Live location tracking with interactive map visualization
- 📊 **Activity Statistics** - Distance, duration, pace, steps, calories, and elevation tracking
- 📱 **Mobile-First Design** - Optimized for mobile devices with responsive UI
- 🌐 **Offline Support** - Works offline with network status detection
- ⚡ **PWA Ready** - Progressive Web App capabilities for native-like experience

## Tech Stack

- **Frontend**: React 19, TypeScript
- **Build Tool**: Vite (with rolldown)
- **Styling**: Tailwind CSS, Konsta UI
- **Maps**: Leaflet, React-Leaflet
- **State Management**: Jotai
- **Geospatial**: Turf.js
- **PWA**: Vite PWA Plugin

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm, yarn, or bun

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd trackme

# Install dependencies
bun install  # or npm install
```

### Development

```bash
# Start development server
bun dev  # or npm run dev

# The app will be available at http://localhost:5173
```

### Build

```bash
# Build for production
bun build  # or npm run build

# Preview production build
bun preview  # or npm run preview
```

## Usage

1. **Start Tracking** - Open the app and tap "Start" to begin GPS tracking
2. **View Live Stats** - Monitor distance, duration, pace, and other metrics in real-time
3. **Map Visualization** - See your route plotted on an interactive map
4. **Activity Summary** - Review detailed statistics after completing your activity

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── icons.tsx       # Custom icon components
│   ├── tracker-map.tsx # Map component for GPS visualization
│   └── follow-user.tsx # User following functionality
├── hooks/              # Custom React hooks
│   ├── use-tracker.tsx # GPS tracking logic
│   ├── use-page.tsx    # Page navigation state
│   └── use-platform.ts # Platform detection
├── pages/              # Page components
│   ├── home.tsx        # Main landing page
│   └── tracker.tsx     # Tracking interface
└── lib/                # Utility functions
    └── utils.ts        # Helper functions
```

## Scripts

- `dev` - Start development server with hot reload
- `build` - Build production version
- `lint` - Run ESLint for code quality
- `preview` - Preview production build locally

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private. All rights reserved.