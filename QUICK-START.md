# 🚀 Quick Start: Deploy bijli.live to GitHub Pages

## ⚡ 5-Minute Deployment Guide

### Step 1: Create GitHub Repository
1. Go to [github.com](https://github.com) and sign in
2. Click **"New repository"**
3. Repository name: `bijli-live`
4. **Make it PUBLIC** (required for free GitHub Pages)
5. Don't initialize with README
6. Click **"Create repository"**

### Step 2: Push Your Code
```bash
# In your project folder (D:\Cursor\Bijli.live)
git init
git add .
git commit -m "Initial commit: bijli.live marketplace"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/bijli-live.git
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username!**

### Step 3: Enable GitHub Pages
1. Go to your repository: `https://github.com/YOUR_USERNAME/bijli-live`
2. Click **Settings** tab
3. Scroll to **Pages** section
4. Source: **Deploy from a branch**
5. Branch: **gh-pages** (will be created automatically)
6. Click **Save**

### Step 4: Add Custom Domain
1. In the same Pages section
2. Add `www.bijli.live` to **Custom domain**
3. Check **Enforce HTTPS**
4. Click **Save**

### Step 5: Configure GoDaddy DNS
1. Log into GoDaddy account
2. Go to **Domain Management** > **bijli.live**
3. Click **Manage DNS**
4. Add these records:

```
Type: CNAME
Name: www
Value: YOUR_USERNAME.github.io
TTL: 600

Type: A
Name: @
Value: 185.199.108.153
TTL: 600

Type: A
Name: @
Value: 185.199.109.153
TTL: 600

Type: A
Name: @
Value: 185.199.110.153
TTL: 600

Type: A
Name: @
Value: 185.199.111.153
TTL: 600
```

## 🎯 Automatic Deployment

Your repository now has GitHub Actions set up! Every time you push to the `main` branch:
1. ✅ Code automatically builds
2. ✅ Deploys to GitHub Pages
3. ✅ Updates www.bijli.live

## 🧪 Test Your Deployment

1. **Wait 2-5 minutes** after pushing code
2. Visit [www.bijli.live](https://www.bijli.live)
3. Test all features:
   - Homepage loading
   - Product browsing
   - User login/register
   - Shopping cart
   - Mobile view

## 🔧 Manual Deployment (if needed)

```bash
# Build and deploy manually
npm run deploy
```

## 🆘 Common Issues & Solutions

### ❌ "Repository not found"
- Check repository name and username
- Ensure repository is public

### ❌ "Build failed"
- Check GitHub Actions logs
- Verify all dependencies are in package.json

### ❌ "Domain not working"
- Wait 24-48 hours for DNS propagation
- Double-check DNS records in GoDaddy

### ❌ "HTTPS not working"
- Ensure "Enforce HTTPS" is checked in GitHub Pages
- Wait for SSL certificate to be issued

## 📞 Need Help?

- **GitHub Pages**: [pages.github.com](https://pages.github.com)
- **GitHub Actions**: Check the Actions tab in your repository
- **DNS Issues**: Use [whatsmydns.net](https://whatsmydns.net) to check propagation

## 🎉 Success Checklist

- [ ] Repository created on GitHub
- [ ] Code pushed to main branch
- [ ] GitHub Pages enabled
- [ ] Custom domain configured
- [ ] DNS records updated
- [ ] Site accessible at www.bijli.live
- [ ] HTTPS working
- [ ] All functionality tested

---
**Your bijli.live marketplace will be live in minutes! 🚀**
