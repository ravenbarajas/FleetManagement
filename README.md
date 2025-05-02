# Fleet Management Dashboard

The Fleet Management Dashboard is a comprehensive tool that allows businesses to track vehicles, maintenance schedules, and performance metrics in real-time.

## Features

- **Fleet Management**: Vehicle tracking, maintenance scheduling, and performance metrics.
- **Reporting**: Customizable reports and performance analysis.

## Technology Stack

- **Frontend**: React, TypeScript, Shadcn UI (based on Tailwind CSS)
- **State Management**: React Query
- **Routing**: Wouter
- **Visualization**: Recharts
- **Backend**: Express, Node.js
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM

## Prerequisites

- Node.js (v18 or later)
- PostgreSQL (v14 or later)
- npm (v9 or later)

## Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/fleet-management-dashboard.git
cd fleet-management-dashboard
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the application in development mode

```bash
npm run dev
```

The application should now be accessible at http://localhost:5000.

## Database Structure

The Fleet Management Dashboard uses a PostgreSQL database with the following tables:

- **users**: User accounts and authentication information
- **vehicles**: Fleet data including vehicle status and location
- **maintenance**: Maintenance schedules and records

## Production Deployment

To build and run the app in production mode:

```bash
# Build the application
npm run build

# Start the production server
npm start
```

## License

MIT
