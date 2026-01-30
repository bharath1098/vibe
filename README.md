# ✈️ Travibe Conference SPA

A stunning, modern Single-Page Application for **Travibe** designed for fundraising and partnership presentations at conferences.

## 🌟 Features

- **Hero Section** - Full-screen animated hero with parallax effects
- **Flight Showcase** - Interactive flight search with dummy data and animated results
- **Upcoming Services** - Beautiful grid showcasing future travel services
- **Platform Statistics** - Animated counters displaying key metrics
- **Technology & Innovation** - Feature highlights with smooth animations
- **Contact Form** - Lead capture form with Google Sheets integration
- **Responsive Design** - Mobile-first, works perfectly on all devices
- **Smooth Animations** - Powered by Framer Motion for delightful interactions

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

### Build for Production

```bash
npm run build
# or
yarn build
# or
pnpm build
```

The built files will be in the `dist` directory, ready for deployment.

## 📋 Google Sheets Integration Setup

The contact form is configured to save submissions to Google Sheets. Here's how to set it up:

### Option 1: Google Apps Script (Recommended)

1. **Create a Google Sheet:**
   - Go to [Google Sheets](https://sheets.google.com)
   - Create a new spreadsheet
   - Name it "Travibe Contact Form Submissions"
   - Add headers in Row 1: `Timestamp`, `Name`, `Email`, `Phone`, `Company`, `Message`, `Investing`, `Partnership`

2. **Create Apps Script:**
   - In your Google Sheet, go to `Extensions` → `Apps Script`
   - Replace the default code with the script from `google-apps-script.js` (see below)
   - Update the `SPREADSHEET_ID` variable with your sheet's ID (from the URL)

3. **Deploy as Web App:**
   - Click `Deploy` → `New deployment`
   - Choose type: `Web app`
   - Execute as: `Me`
   - Who has access: `Anyone`
   - Click `Deploy`
   - Copy the Web App URL

4. **Update the Contact Form:**
   - Open `src/components/ContactUs.tsx`
   - Replace `YOUR_GOOGLE_APPS_SCRIPT_URL` with your Web App URL

### Option 2: Zapier / Make.com

1. Create a Zap/Make automation
2. Trigger: Webhook (Catch Hook)
3. Action: Add Row to Google Sheets
4. Use the webhook URL in the contact form

## 🎨 Customization

### Colors

Edit `tailwind.config.js` to customize brand colors:

```js
colors: {
  primary: '#0047AB',  // Deep Blue
  accent: '#FFD700',   // Gold/Yellow
}
```

### Content

All content is in the component files:
- `src/components/Hero.tsx` - Hero section
- `src/components/FlightShowcase.tsx` - Flight search and results
- `src/components/UpcomingServices.tsx` - Service cards
- `src/components/PlatformStats.tsx` - Statistics
- `src/components/Technology.tsx` - Technology features
- `src/components/ContactUs.tsx` - Contact form
- `src/components/Footer.tsx` - Footer

## 📱 Responsive Breakpoints

- Mobile: 320px - 768px
- Tablet: 768px - 1024px
- Desktop: 1024px+

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📦 Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons

## 📄 License

© 2025 Travibe – All rights reserved

## 🤝 Support

For questions or support, contact: info@kandala.travel

---

**Built with ❤️ for Travibe**

