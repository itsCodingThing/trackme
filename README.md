# TrackMe

A mobile-first GPS tracking application built with React and TypeScript. Track your runs, walks, and cycling activities with real-time location tracking and detailed statistics.

## Features

- 🗺️ **Real-time GPS Tracking** - Live location tracking with interactive map visualization
- 📊 **Activity Statistics** - Distance, duration, pace, steps, calories, and elevation tracking
- 📱 **Mobile-First Design** - Optimized for mobile devices with responsive UI
- 🌐 **Offline Support** - Works offline with network status detection
- ⚡ **PWA Ready** - Progressive Web App capabilities for native-like experience
- 🎨 **Dark/Light Theme** - Switch between color schemes based on preference

## Tech Stack

- **Frontend**: React 19, TypeScript
- **Build Tool**: Vite (with rolldown)
- **Styling**: Tailwind CSS
- **Maps**: Leaflet, React-Leaflet
- **State Management**: Jotai
- **Geospatial**: Turf.js
- **UI Components**: Konsta UI, Lucide React Icons
- **Routing**: TanStack Router
- **PWA**: Vite PWA Plugin
- **Linting**: Biome.js

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

## Available Scripts

- `dev` - Start development server with hot reload
- `build` - Build production version
- `lint` - Run Biome.js linter for code quality
- `preview` - Preview production build locally

## Project Structure

```
src/
├── app.tsx                 # Main application component
├── main.tsx                # Entry point
├── assets/                 # Static assets
│   └── react.svg          # React logo
├── components/             # Reusable UI components
│   ├── activities.tsx      # Activity history display
│   ├── bottom-nav.tsx      # Bottom navigation bar
│   ├── charts.tsx          # Data visualization components
│   ├── compact-stats.tsx   # Compact statistics display
│   ├── floating-tracking-ui.tsx # Floating tracking controls
│   ├── follow-user.tsx     # User location tracking
│   ├── goals.tsx           # Goals and achievements
│   ├── icons.tsx           # Custom icon components
│   ├── statistics.tsx      # Detailed statistics panel
│   ├── swipeable-bottom-sheet.tsx # Swipeable sheet component
│   ├── test-components.tsx # Testing components
│   ├── theme-toggle.tsx    # Theme switching component
│   └── tracker-map.tsx     # Map component for GPS visualization
├── hooks/                  # Custom React hooks
│   ├── motion-timer.ts     # Animation timer hook
│   ├── use-platform.ts     # Platform detection hook
│   └── use-tracker.tsx     # GPS tracking logic
├── lib/                    # Utility functions
│   └── utils.ts            # Helper functions
├── pages/                  # Page components
│   ├── appearance.tsx      # Appearance settings
│   ├── home.tsx            # Main landing page
│   ├── profile.tsx         # User profile
│   ├── settings.tsx        # Application settings
│   ├── test.tsx            # Test page
│   └── tracker.tsx         # Tracking interface
├── store/                  # Global state stores
│   └── theme.ts            # Theme state management
└── styles/                 # CSS files
    ├── app.css             # Application styles
    └── index.css           # Base styles
```

## Usage

1. **Start Tracking** - Open the app and tap "Start" to begin GPS tracking
2. **View Live Stats** - Monitor distance, duration, pace, and other metrics in real-time
3. **Map Visualization** - See your route plotted on an interactive map
4. **Activity Summary** - Review detailed statistics after completing your activity
5. **Theme Switching** - Toggle between light and dark themes in settings

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private. All rights reserved.