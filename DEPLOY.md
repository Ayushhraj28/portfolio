# Deploy Your Portfolio to Vercel

Your portfolio is ready to go live! Follow these simple steps:

## Option 1: Deploy via Vercel CLI (Fastest)

1. **Install Vercel CLI** (if you haven't already):
   ```bash
   npm install -g vercel
   ```

2. **Deploy from your project directory**:
   ```bash
   cd /Users/ayushraj/.gemini/antigravity/playground/infrared-cosmos
   vercel
   ```

3. **Follow the prompts**:
   - Login to your Vercel account
   - Confirm project settings (defaults are fine)
   - Your site will be live in seconds!

## Option 2: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your Git repository (or drag and drop the `infrared-cosmos` folder)
4. Vercel will auto-detect Vite settings
5. Click "Deploy"

## Build Information

- ✅ Production build completed successfully
- 📦 Build output: `dist/` folder
- 🚀 Framework: Vite + React
- 📊 Total bundle size: ~3.7 MB (gzipped: ~1.4 MB)

## Post-Deployment

After deployment, you'll get a live URL like:
`https://your-portfolio.vercel.app`

You can add a custom domain in Vercel settings if desired.

---

**Note**: The build warnings about chunk sizes are normal for 3D-heavy portfolios. Your site will still load fast thanks to code splitting and lazy loading.
