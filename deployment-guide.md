# 🚀 GitHub Pages Deployment Guide for www.bijli.live

## Prerequisites
- ✅ React app built successfully (`npm run build`)
- ✅ GoDaddy domain: `www.bijli.live`
- ✅ GitHub account
- ✅ API credentials ready

## 🎯 GitHub Pages Deployment (Recommended - FREE)

### Step 1: Create GitHub Repository
1. Go to [github.com](https://github.com) and sign in
2. Click "New repository"
3. Name: `bijli-live` or `bijli.live`
4. Make it **Public** (required for free GitHub Pages)
5. Don't initialize with README (we'll push existing code)

### Step 2: Push Your Code to GitHub
```bash
# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit: bijli.live marketplace"

# Add remote origin
git remote add origin https://github.com/YOUR_USERNAME/bijli-live.git

# Push to main branch
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **Deploy from a branch**
5. Select **gh-pages** branch (will be created by GitHub Actions)
6. Click **Save**

### Step 4: Configure Custom Domain
1. In the same Pages section, add `www.bijli.live` to **Custom domain**
2. Check **Enforce HTTPS**
3. Click **Save**

## 🌐 GoDaddy DNS Configuration

### Step 1: Access GoDaddy DNS
1. Log into your GoDaddy account
2. Go to **Domain Management** > **bijli.live**
3. Click **Manage DNS**

### Step 2: Add DNS Records
Add these records:

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

**Note:** Replace `YOUR_USERNAME` with your actual GitHub username.

## 🔧 Repository Configuration

### Branch Protection (Optional but Recommended)
1. Go to **Settings** > **Branches**
2. Add rule for `main` branch
3. Check **Require pull request reviews**
4. Check **Require status checks to pass**

### Environment Variables
Create `.env.production` in your repository:
```bash
REACT_APP_API_URL=https://api.bijli.live
REACT_APP_SITE_URL=https://www.bijli.live
REACT_APP_ENVIRONMENT=production
```

## 🚀 Automatic Deployment

### GitHub Actions Workflow
The `.github/workflows/deploy.yml` file will automatically:
1. Build your React app on every push to main
2. Deploy to GitHub Pages
3. Update the gh-pages branch

### Manual Deployment (if needed)
```bash
# Install gh-pages package
npm install --save-dev gh-pages

# Add to package.json scripts
"predeploy": "npm run build",
"deploy": "gh-pages -d build"

# Deploy manually
npm run deploy
```

## 🔒 SSL Certificate
- **GitHub Pages**: Automatic SSL certificate
- **Custom Domain**: HTTPS will be enforced automatically

## 📱 Performance Optimization
1. ✅ Gzip compression (handled by GitHub Pages)
2. ✅ CDN distribution (GitHub Pages uses CDN)
3. ✅ Cache headers (optimized by GitHub)
4. ✅ Image optimization (use WebP format)

## 🧪 Testing Deployment
1. Push changes to GitHub
2. Wait for GitHub Actions to complete (2-3 minutes)
3. Check your site at `https://www.bijli.live`
4. Test all functionality:
   - Homepage loading
   - Product browsing
   - User authentication
   - Shopping cart
   - Mobile responsiveness

## 📊 Monitoring & Analytics
1. **GitHub Insights**: Monitor repository activity
2. **Google Analytics**: Add tracking code
3. **Uptime Monitoring**: Use UptimeRobot (free)
4. **Performance**: Use Lighthouse in Chrome DevTools

## 🆘 Troubleshooting

### Common Issues:
- **404 errors**: Check CNAME file and DNS settings
- **Build failures**: Check GitHub Actions logs
- **Domain not working**: Wait 24-48 hours for DNS propagation
- **HTTPS issues**: Ensure "Enforce HTTPS" is checked

### DNS Propagation Check:
- Use [whatsmydns.net](https://whatsmydns.net) to check DNS propagation
- DNS changes can take up to 48 hours globally

## 📞 Support Resources
- **GitHub Pages**: [pages.github.com](https://pages.github.com)
- **GitHub Actions**: [docs.github.com/en/actions](https://docs.github.com/en/actions)
- **GoDaddy DNS**: [help.godaddy.com](https://help.godaddy.com)

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
*Last updated: January 2024*
