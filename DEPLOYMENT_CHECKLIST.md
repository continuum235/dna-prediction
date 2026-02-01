# Quick Deployment Checklist

## ✅ Files Created/Updated:

### Backend Files:
- ✅ `requirements.txt` - Python dependencies
- ✅ `Procfile` - Gunicorn start command for Render
- ✅ `app.py` - Updated for production (PORT handling)

### Frontend Files:
- ✅ `.env.local` - Local environment variables
- ✅ `performance_analysis/page.js` - Uses environment variables
- ✅ `components/InputForm.js` - Uses environment variables

---

## 🚀 Deployment Steps:

### Step 1: Commit and Push to GitHub
```bash
cd c:\dna-prediction
git add .
git commit -m "Prepare for deployment - Vercel and Render"
git push origin main
```

### Step 2: Deploy Backend to Render

1. Go to **https://render.com**
2. Sign in with GitHub
3. Click **"New +"** → **"Web Service"**
4. Connect your **dna-prediction** repository
5. Configure:
   - **Name**: `dna-mutation-backend`
   - **Root Directory**: `dna-predicition-analysis/backend`
   - **Runtime**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`
   - **Instance Type**: Free
6. Click **"Create Web Service"**
7. Wait 3-5 minutes for deployment
8. **COPY YOUR BACKEND URL**: `https://dna-mutation-backend.onrender.com`

### Step 3: Deploy Frontend to Vercel

1. Go to **https://vercel.com**
2. Sign in with GitHub
3. Click **"Add New..."** → **"Project"**
4. Select **dna-prediction** repository
5. Configure:
   - **Root Directory**: Click Edit → `dna-predicition-analysis/frontend`
   - **Framework Preset**: Next.js (auto-detected)
6. **Add Environment Variable**:
   - Name: `NEXT_PUBLIC_API_URL`
   - Value: `https://YOUR-RENDER-URL-FROM-STEP-2.onrender.com` (NO trailing slash)
7. Click **"Deploy"**
8. Wait 2-3 minutes
9. **Your frontend is live!** Copy the Vercel URL

### Step 4: Update Backend CORS

1. Edit `backend/app.py` locally
2. Update CORS settings:
   ```python
   CORS(app, origins=[
       "http://localhost:3000",
       "https://YOUR-VERCEL-URL.vercel.app",
       "https://*.vercel.app"
   ])
   ```
3. Commit and push:
   ```bash
   git add .
   git commit -m "Update CORS for production"
   git push
   ```
4. Render will auto-deploy the update

### Step 5: Test Your Deployment

1. **Visit your Vercel URL**: `https://your-app.vercel.app/performance_analysis`
2. Click **"View Model Performance"**
3. Wait 30-60 seconds on first load (Render free tier wakes up)
4. You should see real metrics!

---

## 📝 Important URLs to Save:

**Backend (Render)**: _______________________________
**Frontend (Vercel)**: _______________________________

---

## ⚠️ Important Notes:

1. **First Load Delay**: Render free tier sleeps after 15 min inactivity. First request takes 30-60 seconds.

2. **Environment Variables**: 
   - Vercel: Dashboard → Project → Settings → Environment Variables
   - Render: Dashboard → Service → Environment

3. **Logs**:
   - Vercel: Deployments → Click deployment → Logs
   - Render: Dashboard → Service → Logs

4. **Auto Deployment**: 
   - Both platforms auto-deploy when you push to GitHub

---

## 🐛 Troubleshooting:

### CORS Error:
- Update backend CORS with your Vercel URL
- Make sure no trailing slash in environment variable

### Backend 500 Error:
- Check Render logs
- Verify `dna.csv` is in the repository
- Check Python dependencies in requirements.txt

### Frontend Build Error:
- Check Vercel logs
- Verify Root Directory is set correctly
- Check package.json dependencies

### API Not Connecting:
- Verify `NEXT_PUBLIC_API_URL` in Vercel
- Check backend is running on Render
- Test backend directly: `curl https://YOUR-RENDER-URL.onrender.com/`

---

## 💰 Cost:

**Total**: $0/month (Free tier for both services)

---

## 🎉 You're Done!

Your DNA Mutation Detection app is now live on the internet!
