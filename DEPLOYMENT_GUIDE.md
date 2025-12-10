# Production Deployment Guide

## ✅ Code Status
Your code has been successfully pushed to GitHub:
- **Commit**: `e3e44b4` - "Add URL fallback mechanism for Hydrology links"
- **Repository**: https://github.com/anshikasharma148/cird

## 🚀 Deployment Options

### Option 1: Vercel (Recommended for Next.js)

If your site is deployed on **Vercel** (likely, since README mentions Vercel):

1. **Auto-Deployment**: Vercel should automatically deploy when you push to `main` branch
   - Go to: https://vercel.com/dashboard
   - Check your project's deployments
   - Look for the latest deployment (should be after your push)

2. **Manual Redeploy**:
   - Go to your Vercel dashboard
   - Select your project
   - Click "Deployments" tab
   - Click "Redeploy" on the latest deployment
   - Or go to Settings → Git → Redeploy

3. **Check Build Status**:
   - If deployment failed, check the build logs in Vercel
   - Common issues: Node.js version mismatch, build errors

### Option 2: Manual Deployment

If you're deploying manually:

1. **SSH into your server**
2. **Pull latest changes**:
   ```bash
   cd /path/to/cird
   git pull origin main
   ```

3. **Install dependencies** (if needed):
   ```bash
   npm install
   ```

4. **Build the project**:
   ```bash
   npm run build
   ```

5. **Restart the server**:
   ```bash
   npm start
   # or if using PM2:
   pm2 restart cird
   ```

### Option 3: Clear Cache & Check

1. **Clear browser cache**:
   - Hard refresh: `Ctrl + Shift + R` (Windows/Linux) or `Cmd + Shift + R` (Mac)
   - Or use incognito/private mode

2. **Verify the files are deployed**:
   - Check if `/src/utils/urlFallback.ts` exists
   - Check if `/src/components/FallbackLink.tsx` exists

## 🔍 Troubleshooting

### Build Failing?
If build fails on production, check:
- Node.js version (needs >= 20.9.0 for Next.js 16)
- Dependencies installation
- Build logs for specific errors

### Changes Not Visible?
- Wait 2-5 minutes for deployment to complete
- Clear browser cache completely
- Check if production is pointing to the correct branch (should be `main`)
- Verify the deployment URL matches your production domain

## 📋 Quick Checklist

- [ ] Code pushed to GitHub ✅ (Done)
- [ ] Deployment triggered (auto or manual)
- [ ] Build completed successfully
- [ ] Browser cache cleared
- [ ] Tested in incognito mode
- [ ] Verified files exist in production build

## 🔗 Useful Links

- GitHub Repository: https://github.com/anshikasharma148/cird
- Vercel Dashboard: https://vercel.com/dashboard (if using Vercel)



