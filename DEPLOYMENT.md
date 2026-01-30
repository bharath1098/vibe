# 🚀 Deployment Guide

This guide covers deploying the Travibe SPA to various hosting platforms.

## 📦 Build the Project

First, create a production build:

```bash
npm run build
```

This creates an optimized `dist` folder with all static assets.

## 🌐 Deployment Options

### Vercel (Recommended - Easiest)

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```
   
   Or connect your GitHub repo to Vercel for automatic deployments.

3. **Configure:**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### Netlify

1. **Install Netlify CLI:**
   ```bash
   npm i -g netlify-cli
   ```

2. **Deploy:**
   ```bash
   netlify deploy --prod --dir=dist
   ```

3. **Or use Netlify Dashboard:**
   - Drag and drop the `dist` folder
   - Or connect your Git repository

### GitHub Pages

1. **Install gh-pages:**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add to package.json:**
   ```json
   "scripts": {
     "deploy": "npm run build && gh-pages -d dist"
   }
   ```

3. **Deploy:**
   ```bash
   npm run deploy
   ```

### AWS S3 + CloudFront

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Upload to S3:**
   ```bash
   aws s3 sync dist/ s3://your-bucket-name --delete
   ```

3. **Configure CloudFront:**
   - Point to your S3 bucket
   - Set default root object to `index.html`
   - Configure error pages (404 → index.html for SPA routing)

### Traditional Web Hosting

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Upload contents of `dist` folder:**
   - Via FTP/SFTP to your web server
   - Ensure `index.html` is in the root directory

3. **Configure server:**
   - Ensure all routes serve `index.html` (for client-side routing)
   - Enable gzip compression
   - Set proper cache headers

## ⚙️ Environment Variables

If you need environment variables:

1. **Create `.env` file:**
   ```
   VITE_GOOGLE_SHEETS_URL=your_url_here
   ```

2. **Access in code:**
   ```typescript
   const url = import.meta.env.VITE_GOOGLE_SHEETS_URL
   ```

3. **Build will include these variables**

## 🔒 Security Notes

- Never commit `.env` files with sensitive data
- Use environment variables for API keys
- Ensure Google Apps Script Web App is set to "Anyone" (or implement proper auth)
- Consider rate limiting for the contact form

## 📊 Performance Optimization

The build is already optimized, but you can further:

1. **Enable compression:**
   - Gzip/Brotli on your server
   - Most hosting platforms do this automatically

2. **CDN:**
   - Use a CDN for static assets
   - CloudFront, Cloudflare, etc.

3. **Caching:**
   - Set proper cache headers
   - Use service workers if needed

## ✅ Post-Deployment Checklist

- [ ] Test all sections load correctly
- [ ] Verify contact form submission works
- [ ] Check mobile responsiveness
- [ ] Test animations and interactions
- [ ] Verify Google Sheets integration
- [ ] Check page load speed (< 3s)
- [ ] Test on multiple browsers
- [ ] Verify SEO meta tags
- [ ] Check analytics (if added)

## 🐛 Troubleshooting

### 404 Errors on Refresh

If you get 404s when refreshing pages, configure your server to serve `index.html` for all routes (SPA routing).

### Contact Form Not Working

1. Verify Google Apps Script URL is correct
2. Check CORS settings
3. Verify sheet permissions
4. Check browser console for errors

### Build Errors

1. Clear `node_modules` and reinstall
2. Check Node.js version (18+)
3. Verify all dependencies are installed

---

**Need help?** Contact: info@kandala.travel

