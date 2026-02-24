# FinalProjectBCA

## 🎯 Project Overview

A modern, responsive web application built with **React** (Vite) for the frontend and **Node.js/Express** for the backend. It showcases a multi‑currency token marketplace, payment integrations (Cash on Delivery, eSewa, Khalti), and a sleek, premium UI. The app demonstrates advanced state‑management patterns, dynamic theming, and a polished user experience with micro‑animations, glass‑morphism, and dark‑mode support.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, JavaScript (ES2022)
- **Styling**: Tailwind CSS (with custom design tokens), vanilla CSS for fine‑grained control, Google Fonts (Inter)
- **State Management**: React Context & custom hooks (`useCurrency`, `useTokens`, etc.)
- **Backend**: Node.js 18+, Express, PostgreSQL (or MongoDB), JWT authentication
- **Payments**: Integrated with eSewa, Khalti, and Cash‑on‑Delivery
- **Build & Deploy**: Vite dev server (`npm run dev`) for frontend, `npm run start` for backend, production build (`npm run build`)

---

## 📦 Getting Started

### 1️⃣ Prerequisites

- **Node.js** (>= 18.x) – [Download](https://nodejs.org/)
- **npm** (comes with Node) or **yarn** if you prefer
- **Git** – for cloning the repository
- **Database**: PostgreSQL (or MongoDB) installed locally or accessible remotely

### 2️⃣ Clone the Repository

```bash
git clone https://github.com/your‑username/FinalProjectBCA.git
cd FinalProjectBCA
```

### 3️⃣ Install Dependencies (both frontend and backend)

```bash
# Install root-level dev tools (Vite, etc.)
npm install
# Install backend dependencies (inside server folder if separated)
# Assuming a monorepo structure where backend code lives in ./backend
cd backend && npm install && cd ..
```

### 4️⃣ Configure Environment Variables

Create a `.env.local` file at the project root (it is ignored by Git) and add the following keys:

```dotenv
# Frontend
VITE_API_BASE_URL=http://localhost:5000/api   # Backend base URL
VITE_ESewa_CLIENT_ID=your‑esewa‑client‑id
VITE_KHALTI_PUBLIC_KEY=your‑khalti‑public‑key

# Backend
PORT=5000
DATABASE_URL=postgres://user:password@localhost:5432/finalprojectbca
JWT_SECRET=your‑super‑secret
```

> **Tip**: The project uses Vite’s `import.meta.env` – any variable prefixed with `VITE_` will be exposed to the client.

### 5️⃣ Set Up the Database

```bash
# Example for PostgreSQL
psql -U postgres -c "CREATE DATABASE finalprojectbca;"
# Run migrations (if any) – adjust command to your migration tool
npm run migrate   # runs inside ./server
```

### 6️⃣ Build Tailwind CSS Assets

The Tailwind CSS pipeline is set up via `postcss` and `autoprefixer`. Run the following command to generate the CSS bundle:

```bash
npm run build:css   # Generates assets/css/tailwind.css
```

> If the `assets/css` folder is empty, this step will populate it.

### 7️⃣ Run the Development Servers

#### Backend (Express)
```bash
cd server
npm run dev   # Starts backend on http://localhost:5000
```

#### Frontend (Vite)
```bash
npm run dev   # Starts Vite dev server on http://localhost:5173
```

Both servers will watch for changes and hot‑reload accordingly.

### 8️⃣ Production Build

```bash
# Build frontend assets
npm run build   # Creates an optimized static bundle in `dist/`

# Build backend (if using TypeScript or bundler)
cd server && npm run build && cd ..
```

You can serve the `dist/` folder with any static file server (e.g., `npx serve dist`) and run the backend with `node server/dist/index.js`.

---

## 🧪 Testing

### Frontend Tests
```bash
npm run test          # Runs all Jest/RTL tests in watch mode
npm run test:ci       # Runs tests once (CI friendly)
```

### Backend Tests
```bash
cd server
npm run test          # Runs backend test suite (e.g., using Jest or Mocha)
```

Add new test files alongside components (`*.test.jsx`) or server modules (`*.test.js`).

---

## 📂 Project Structure (high‑level)

```
src/                     # Frontend source
├─ assets/                # Images, icons, compiled CSS
├─ components/            # Reusable UI components (Header, Footer, ContactModal, …)
├─ hooks/                 # Custom React hooks (useCurrency, useTokens, …)
├─ pages/                 # Page‑level components (TokensPage.jsx, PricingPage.jsx)
├─ utils/                 # Helper functions and stores
├─ App.jsx                # Root component
└─ main.jsx               # Entry point (Vite bootstraps here)

server/                  # Backend source
├─ src/                  # Express app source
│   ├─ routes/           # API route handlers
│   ├─ controllers/      # Business logic
│   ├─ models/           # DB models (e.g., Sequelize or Mongoose)
│   └─ middleware/       # Auth, error handling, etc.
├─ config/               # Configuration (db, env)
├─ tests/                # Backend test suite
└─ index.js              # Server entry point
```

---

## 🎨 Design & Aesthetics

- **Typography**: Inter (Google Fonts) – loaded via `@import` in `index.css`
- **Color Palette**: Dark‑mode primary #0d1117, accent #ff6b6b, gradient backgrounds for cards
- **Micro‑animations**: Framer Motion for button hover, modal fade‑in/out, and loading spinners
- **Glass‑morphism**: Applied to cards and modals using backdrop‑filter and translucent backgrounds

---

## 📚 Additional Resources

- **Tailwind Docs** – https://tailwindcss.com/docs
- **Vite Docs** – https://vitejs.dev/guide/
- **React Docs** – https://reactjs.org/docs/getting-started.html
- **Express Docs** – https://expressjs.com/
- **PostgreSQL Docs** – https://www.postgresql.org/docs/
- **Payment Integration Guides** – see `docs/payments.md` for eSewa & Khalti setup

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/awesome‑feature`)
3. Commit your changes with clear messages
4. Open a Pull Request against `main`

Please ensure linting passes (`npm run lint` for frontend, `cd server && npm run lint` for backend) and all tests succeed before submitting.

---

## 📜 License

This project is licensed under the **MIT License** – see the `LICENSE` file for details.

---

*Happy coding!*
