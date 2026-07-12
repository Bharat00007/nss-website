# JIT NSS Unit Portal - Premium Institutional Website

Welcome to the official digital portal of the **National Service Scheme (NSS) Unit of Jhulelal Institute of Technology (JIT), Nagpur**. 

This platform serves as a modern, accessible, responsive, and interactive website designed to motivate students toward social service, coordinate campaigns, maintain records of camp achievements, verify volunteer hours, and offer an administrative content management system (CMS) interface.

---

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router, Static & Server Side components)
- **Programming Language**: TypeScript (Strictly typed)
- **Styling & Theme**: Tailwind CSS v4 (Light/Dark mode using `next-themes`)
- **Animations**: Framer Motion (Transitions, custom Lightbox modal, parallax sliders, text outlines)
- **Icons**: Lucide Icons
- **Form Management**: React Hook Form
- **Form Validation**: Zod Resolvers
- **Query Caching**: TanStack React Query v5
- **Assets**: Custom transparent logos and JPEG photo gallery

---

## 🎨 Core Design Decisions

1. **Official NSS Color Palette**: Incorporates NSS Blue (`#003A8C`), NSS Red (`#D32F2F`), and Accent Gold (`#D4AF37`) for recognitions.
2. **Glassmorphism**: Glass-blur navigation bar (`glass-effect`), header blocks, and card shapes for a premium aesthetic.
3. **PWA Enabled**: Fully PWA-Ready with a configure `manifest.json` pointing to official NSS logos.
4. **Mock CMS Sync**: Utilizes a browser `localStorage` layer to synchronize frontend views with administrative actions. Approving applications, adding news, registering events, or validating certificates immediately updates the respective pages.
5. **A11y (Accessibility)**: Leverages semantic HTML elements, high contrast toggles, readable typography, and responsive grid layouts.

---

## 📂 Project Structure

```
├── public/                 # Static assets
│   ├── images/
│   │   ├── logos/          # Processed transparent logos (JIT, NSS, MyBharat)
│   │   └── gallery/        # Landscape & Instagram-ratio campaign photos
│   └── manifest.json       # PWA configurations
├── src/
│   ├── app/
│   │   ├── about-jit/      # About JIT Unit (Mission, Vision, Messages)
│   │   ├── about-nss/      # About NSS Movement (History, Motto, Timeline)
│   │   ├── achievements/   # Awards counter and award lists
│   │   ├── activities/     # Campaign directory with expandable outcomes
│   │   ├── admin/          # Secure Admin Panel
│   │   ├── camp-reports/   # Camp documents and outcomes dashboard
│   │   ├── certificates-verification/ # Search certificates portal
│   │   ├── contact/        # WhatsApp chat and validated contacts form
│   │   ├── downloads/      # NSS manuals and forms center
│   │   ├── events/         # Upcoming countdowns and event listings
│   │   ├── gallery/        # Masonry photos grid
│   │   ├── join-nss/       # Student enrollment multi-step forms
│   │   ├── news/           # Searchable announcements bulletins
│   │   ├── team/           # Faculty & student coordinator directories
│   │   ├── globals.css     # CSS variables, animations, custom scrollbars
│   │   └── layout.tsx      # Main layout, viewport meta, SEO tags
│   ├── components/
│   │   ├── navbar.tsx      # Sticky blur header with dropdowns
│   │   ├── footer.tsx      # Multi-column links & accreditions footer
│   │   ├── providers.tsx   # React Query and ThemeProvider wrappers
│   │   └── custom-lightbox.tsx # Custom Framer Motion lightbox gallery
│   ├── hooks/
│   │   └── use-nss-data.ts # Custom state sync and client database hooks
│   └── lib/
│       └── data/
│           ├── db.ts       # Type schemas & initial dataset JSON
│           └── storage.ts  # LocalStorage syncing layer
```

---

## ⚙️ How to Run Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 3. Build for Production
```bash
npm run build
```

---

## 🔐 Administrative Access

To access the **Admin Dashboard** (`/admin`), use the following simulated credentials:
- **Username**: `admin`
- **Password**: `jitnss`

### Admin Features:
- **Approve Student Registrations**: Clicking Approve on any registration request automatically adds them as a **Volunteer Leader** in the active JIT Team directory page!
- **Manage Events**: Add new events or delete completed ones.
- **Manage Circulars**: Post news updates or toggle featured announcements.
- **Issue Certificates**: Input unique certificate IDs, names, events, and hours served. Once saved, students can look them up on the **Certificate Verification Portal**!

---

## 🛡️ License & Accreditations

This portal is designed for academic presentation and represents the official NSS guidelines. Accreditations include NAAC and NBA endorsements.
