
# Sales Dashboard

A modern, responsive sales analytics dashboard for exploring revenue, sales performance, product rankings, and category breakdowns over a selected date range.

**Live demo:** [sales-dashboard-ebon-one.vercel.app](https://sales-dashboard-ebon-one.vercel.app/)

## Overview

Sales Dashboard presents business data through interactive KPI cards, charts, tables, and date-based filtering. It is built as a Next.js application with a component-based TypeScript frontend and API routes for sales and analytics data.

## Features

- Filter dashboard results by a custom date range.
- View key performance indicators for sales activity.
- Track revenue trends over time with a revenue chart.
- Review sales or revenue breakdowns by category.
- Inspect top-performing products in a dedicated table.
- Browse detailed sales records in a data table.
- Use responsive UI components suitable for desktop and smaller screens.
- Fetch dashboard information through application API routes.

## Tech Stack

- [Next.js](https://nextjs.org/) with the App Router.
- React and TypeScript.
- Tailwind CSS and PostCSS-based styling.
- Recharts for data visualizations.
- ESLint for code-quality checks.

## Project Structure

```text
.
├── app/
│   ├── api/
│   │   ├── analytics/
│   │   │   └── top/
│   │   └── sales/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── BreakdownChart.tsx
│   ├── ChartCard.tsx
│   ├── DataTable.tsx
│   ├── DateRangeFilter.tsx
│   ├── KPICard.tsx
│   ├── RevenueChart.tsx
│   └── TopProductsTable.tsx
├── lib/
├── public/
├── types/
│   └── analytics.ts
├── next.config.ts
├── package.json
└── tsconfig.json
```

## Getting Started

### Prerequisites

- Node.js 18.18 or later.
- npm, pnpm, yarn, or another compatible package manager.

### Installation

Clone the repository and install its dependencies:

```bash
git clone https://github.com/parthsingh23/SalesDashboard.git
cd SalesDashboard
npm install
```

### Run locally

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production build

Create and run a production build:

```bash
npm run build
npm run start
```

### Lint the project

```bash
npm run lint
```

## API Routes

The application organizes backend endpoints under `app/api`:

- `/api/sales` — sales-related dashboard data.
- `/api/analytics/top` — top-product or top-performance analytics.

The exact response shapes are defined in the TypeScript models under `types/analytics.ts`.

## Main Components

- `DateRangeFilter` controls the reporting period.
- `KPICard` displays a headline metric.
- `RevenueChart` visualizes revenue trends.
- `BreakdownChart` presents category or segment breakdowns.
- `TopProductsTable` ranks products by performance.
- `DataTable` displays detailed records.
- `ChartCard` provides a reusable container for chart sections.

## Deployment

The project is deployed on Vercel. To deploy your own instance:

1. Import the repository into [Vercel](https://vercel.com/).
2. Keep the default Next.js build settings unless your environment requires changes.
3. Configure any required environment variables in the Vercel project settings.
4. Deploy the application.

## License

No license file is currently included in the repository. Add an appropriate license before distributing or reusing the project publicly.

## Links

- [Live application](https://sales-dashboard-ebon-one.vercel.app/)