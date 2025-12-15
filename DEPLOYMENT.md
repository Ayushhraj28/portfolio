# Deployment Guide for ayushraj.co

Your portfolio is built and ready! To host it on **ayushraj.co**, I recommend using **Vercel** (it's free, fast, and built for React/Vite).

## Step 1: Deploy to Vercel
1.  Go to [Vercel.com](https://vercel.com) and sign up/login.
2.  Click **"Add New..."** -> **"Project"**.
3.  Import your GitHub repository (you'll need to push this code to GitHub first).
    - *If you haven't pushed yet:*
      ```bash
      git init
      git add .
      git commit -m "Initial commit"
      # Create a repo on GitHub.com, then run:
      git remote add origin <your-github-repo-url>
      git push -u origin main
      ```
4.  Vercel will detect `Vite` automatically. Click **Deploy**.

## Step 2: Connect Your Domain (ayushraj.co)
1.  Once deployed, go to your **Project Settings** on Vercel.
2.  Click **Domains** in the sidebar.
3.  Enter `ayushraj.co` and click **Add**.
4.  Vercel will give you DNS records (usually an **A Record** and a **CNAME**).
5.  Go to your domain registrar (GoDaddy, Namecheap, etc.) where you bought `ayushraj.co`.
6.  Update your DNS records to match what Vercel provided.

## Alternative: Netlify
If you prefer Netlify:
1.  Drag and drop the `dist` folder (created by the build command) into [Netlify Drop](https://app.netlify.com/drop).
2.  Go to **Domain Settings** -> **Add custom domain**.
3.  Enter `ayushraj.co` and follow the DNS instructions.

## Build Output
The production-ready files are in the `dist` folder in your project directory.
