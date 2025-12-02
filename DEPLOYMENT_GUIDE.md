# 🚀 Synthetic Hearts - Deployment Guide

## Option 1: GitHub Pages (Recommended - FREE)

### Step 1: Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `synthetic-hearts` (or any name you prefer)
3. Make it **Public** (required for free GitHub Pages)
4. Don't initialize with README (you already have files)
5. Click "Create repository"

### Step 2: Push Your Code to GitHub
```bash
# Add the GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/synthetic-hearts.git

# Add all files
git add .

# Commit your changes
git commit -m "Complete website redesign with cyberpunk aesthetic and full bible integration"

# Push to GitHub
git push -u origin master
```

### Step 3: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** tab
3. Click **Pages** in the left sidebar
4. Under "Source", select **Deploy from a branch**
5. Under "Branch", select **master** and **/website** folder
6. Click **Save**

### Step 4: Access Your Site
- Your site will be live at: `https://YOUR_USERNAME.github.io/synthetic-hearts/`
- It may take 1-2 minutes to deploy
- GitHub will show you the URL in the Pages settings

### Important: Fix File Paths for GitHub Pages
Since your site is in the `/website` folder, you may need to update some paths. GitHub Pages will serve from `/website` as root, so your current setup should work!

---

## Option 2: Netlify (FREE - Easiest Deployment)

### Why Netlify?
- ✅ Free hosting
- ✅ Automatic HTTPS
- ✅ Custom domain support
- ✅ Continuous deployment from GitHub
- ✅ No configuration needed

### Steps:
1. Go to https://www.netlify.com/
2. Click "Sign up" (use GitHub account)
3. Click "Add new site" → "Import an existing project"
4. Connect to GitHub and select your repository
5. **Build settings:**
   - Base directory: `website`
   - Build command: (leave empty)
   - Publish directory: `.` (or leave empty)
6. Click "Deploy site"
7. Your site will be live at: `https://random-name-12345.netlify.app`
8. You can change the subdomain in Site settings

---

## Option 3: Vercel (FREE - Great Performance)

### Why Vercel?
- ✅ Free hosting
- ✅ Excellent performance
- ✅ Automatic HTTPS
- ✅ Custom domain support
- ✅ Edge network (fast worldwide)

### Steps:
1. Go to https://vercel.com/
2. Click "Sign up" (use GitHub account)
3. Click "Add New" → "Project"
4. Import your GitHub repository
5. **Build settings:**
   - Framework Preset: Other
   - Root Directory: `website`
   - Build Command: (leave empty)
   - Output Directory: (leave empty)
6. Click "Deploy"
7. Your site will be live at: `https://synthetic-hearts.vercel.app`

---

## Option 4: Cloudflare Pages (FREE - Fast & Secure)

### Steps:
1. Go to https://pages.cloudflare.com/
2. Sign up / Log in
3. Click "Create a project"
4. Connect to GitHub
5. Select your repository
6. **Build settings:**
   - Build command: (leave empty)
   - Build output directory: `website`
7. Click "Save and Deploy"

---

## Option 5: Custom Server (Advanced)

If you want full control, you can deploy to your own server:

### Requirements:
- A server (DigitalOcean, AWS, Linode, etc.)
- Domain name (optional)

### Steps:
1. Install Nginx or Apache
2. Upload your `website` folder to `/var/www/html/`
3. Configure your web server
4. Point your domain to the server

---

## 🎯 My Recommendation

**For you, I recommend GitHub Pages because:**
1. ✅ **100% Free** - No credit card needed
2. ✅ **Easy Setup** - Just 3 steps
3. ✅ **Reliable** - Hosted by GitHub
4. ✅ **Custom Domain** - You can add your own domain later
5. ✅ **HTTPS** - Automatic SSL certificate
6. ✅ **No Server Management** - GitHub handles everything

---

## 📝 Quick Start Commands

```bash
# 1. Commit your changes
git add .
git commit -m "Complete website redesign"

# 2. Create GitHub repo and push (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/synthetic-hearts.git
git push -u origin master

# 3. Then enable GitHub Pages in repository settings
```

---

## 🔧 Troubleshooting

### If chapters don't load on GitHub Pages:
The current setup should work, but if you have issues, check:
- Make sure `website/chapters/` folder is committed to git
- Check browser console for 404 errors
- Verify file paths are relative (they are!)

### If you want a custom domain:
1. Buy a domain (Namecheap, Google Domains, etc.)
2. Add a `CNAME` file to your website folder with your domain
3. Configure DNS settings in your domain registrar
4. Add custom domain in GitHub Pages settings

---

## 🎉 Next Steps After Deployment

1. Share your live URL!
2. Add custom domain (optional)
3. Set up analytics (Google Analytics, Plausible, etc.)
4. Add SEO meta tags
5. Submit to search engines

---

**Need help?** Let me know which option you choose and I can help you through the process!

