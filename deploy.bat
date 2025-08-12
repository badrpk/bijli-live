@echo off
echo 🚀 Deploying bijli.live to GitHub Pages...
echo.

echo 📦 Building the project...
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Build failed! Please check the errors above.
    pause
    exit /b 1
)

echo ✅ Build successful!
echo.

echo 🔄 Deploying to GitHub Pages...
call npm run deploy
if %errorlevel% neq 0 (
    echo ❌ Deployment failed! Please check the errors above.
    pause
    exit /b 1
)

echo.
echo 🎉 Deployment successful!
echo 🌐 Your site will be available at: https://www.bijli.live
echo ⏰ Please wait 2-5 minutes for changes to propagate.
echo.
echo 📋 Next steps:
echo 1. Check GitHub Actions for deployment status
echo 2. Verify DNS settings in GoDaddy
echo 3. Test your site at www.bijli.live
echo.
pause
