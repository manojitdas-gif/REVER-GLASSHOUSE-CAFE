# Rever Glasshouse Cafe Web Platform

A luxury, high-performance web platform for **Rever Glasshouse Cafe** (Paris in Kolkata) featuring an elegant glassmorphic dark mode design, SEO optimization, real-time client-to-database state synchronization, and an fully editable administrative command console.

---

## 🌟 Key Features

1. **Elegant Visuals & Styling**: Built using highly refined glassmorphism, crimson & gold brand accents, and premium Google Fonts typography (`Playfair Display` and `Cormorant Garamond`).
2. **Speed & Load Performance**:
   - Zero-latency database queries by using browser **`localStorage`** caching.
   - Dynamic background synchronization.
   - **Image Lazy Loading** (`loading="lazy"`) and optimized resolution scaling for all menu and gallery images.
3. **Dynamic Administrative Console (`/admin`)**:
   - Accessible using passcode `admin123` or `admin`.
   - Admin can add, modify, or delete menu categories (sections) and menu recipes.
   - Edit cafe hours, address, phone numbers, social media links, active coupons, discount offers, and home marquee ticker banners.
   - Live website performance analytics and simulated ad campaign managers.
   - View live reservations and customer feedback.
4. **Resilient Dual Storage Architecture**:
   - **Local File System Database** (`data/*.json` files) when run locally.
   - **Supabase Cloud Tables** fallback for multi-tenant globally distributed deployments.
   - Fully fault-tolerant: operates offline or under network constraints with instant fallback.

---

## 🚀 Running Locally (Standalone Development / Client Delivery)

The platform is designed to run self-contained on any computer with Node.js installed without needing database configurations.

### 1. Build the Frontend
Compile the TypeScript and Vite assets:
```bash
npm run build
```

### 2. Launch the Web Server
Launch the standalone server that serves the compiled static files and runs the local JSON database:
```bash
npm start
```

### 3. Open in Browser
Visit the application at:
**[http://localhost:5000](http://localhost:5000)**

---

## 📁 Project Architecture & Files

* **`server.js`**: Standalone HTTP Node server providing static file serving (with SPA routing) and local file database APIs (`/api/state`, `/api/reservations`, `/api/reviews`).
* **`data/`**: Storage folder for the local JSON database:
  - `db.json`: Local site-wide dynamic settings (menu, gallery, SEO, info).
  - `reservations.json`: Log of user table bookings.
  - `reviews.json`: Log of submitted reviews.
* **`src/lib/state.ts`**: Unified client-side state machine. Exposes `getAppState()` and `saveAppStateField()` which handle localStorage sync, local Express server API updates, and Supabase cloud sync.
* **`src/App.tsx`**: React routing entry containing landing pages, search filters, SEO meta updates, and lightboxes.
* **`src/components/AdminPanel.tsx`**: Management panel containing content tables, category builders, and booking charts.

---

## 🛠️ SEO & Schema Integration
* **Document Title & Metadata**: Modified dynamically via React state. Any updates to Title/Description/Keywords in the Admin SEO console instantly rewrite the page `<head>`.
* **JSON-LD Schema Markup**: Automatically injected dynamic Schema (`@type: Restaurant` & `CafeOrCoffeeShop`) to describe phone, address, name, opening hours, and social media handles for crawler optimizations.
