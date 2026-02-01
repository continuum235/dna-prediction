# Deployment Guide - DNA Mutation Detection App

## Overview
- **Frontend**: Next.js → Deploy to Vercel
- **Backend**: Flask API → Deploy to Render

---

## Part 1: Deploy Backend to Render

### Step 1: Prepare Backend for Deployment

#### 1.1 Create `requirements.txt`
Create a file at `c:\dna-prediction\dna-predicition-analysis\backend\requirements.txt`:

```txt
flask==3.0.0
flask-cors==4.0.0
numpy==1.26.2
pandas==2.1.4
scikit-learn==1.3.2
gunicorn==21.2.0
```

#### 1.2 Create `Procfile`
Create a file at `c:\dna-prediction\dna-predicition-analysis\backend\Procfile`:

```
web: gunicorn app:app
```

#### 1.3 Update `app.py` for Production
The app is already configured, but ensure the last line is:
```python
if __name__ == "__main__":
    app.run(debug=False, host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))
```

### Step 2: Push Backend to GitHub

1. **Create a new repository for backend** (or use a folder in existing repo):
   ```bash
   cd c:\dna-prediction\dna-predicition-analysis\backend
   git init
   git add .
   git commit -m "Initial backend commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/dna-backend.git
   git push -u origin main
   ```

   OR if using the existing repo, just commit your changes:
   ```bash
   cd c:\dna-prediction
   git add .
   git commit -m "Prepare backend for deployment"
   git push
   ```

### Step 3: Deploy on Render

1. **Go to [Render.com](https://render.com)** and sign up/login with GitHub

2. **Click "New +" → "Web Service"**

3. **Connect your GitHub repository**
   - Select your repository (dna-prediction or dna-backend)
   - If using the main repo, set Root Directory to: `dna-predicition-analysis/backend`

4. **Configure the Web Service:**
   - **Name**: `dna-mutation-backend` (or your choice)
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `dna-predicition-analysis/backend` (if using main repo)
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`
   - **Instance Type**: Free

5. **Add Environment Variables** (if needed):
   - Click "Advanced"
   - Add any environment variables

6. **Click "Create Web Service"**

7. **Wait for deployment** (3-5 minutes)

8. **Copy your backend URL**: 
   - Example: `https://dna-mutation-backend.onrender.com`

---

## Part 2: Deploy Frontend to Vercel

### Step 1: Prepare Frontend for Deployment

#### 1.1 Create `.env.local` file
Create at `c:\dna-prediction\dna-predicition-analysis\frontend\.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

#### 1.2 Update API calls to use environment variable

Update `performance_analysis/page.js`:
```javascript
const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/performance_analysis`);
```

#### 1.3 Create `.gitignore` in frontend folder
Ensure `.env.local` is in `.gitignore`:

```
.env.local
.env*.local
node_modules
.next
```

### Step 2: Push Frontend to GitHub

If not already pushed:
```bash
cd c:\dna-prediction
git add .
git commit -m "Prepare frontend for deployment"
git push
```

### Step 3: Deploy on Vercel

1. **Go to [Vercel.com](https://vercel.com)** and sign up/login with GitHub

2. **Click "Add New..." → "Project"**

3. **Import your GitHub repository**
   - Select `dna-prediction` repository
   - Click "Import"

4. **Configure Project:**
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: Click "Edit" and set to `dna-predicition-analysis/frontend`
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `npm install` (default)

5. **Add Environment Variables:**
   - Click "Environment Variables"
   - Add variable:
     - **Name**: `NEXT_PUBLIC_API_URL`
     - **Value**: `https://YOUR-RENDER-URL.onrender.com` (from Step 3.8 above)
   - Click "Add"

6. **Click "Deploy"**

7. **Wait for deployment** (2-3 minutes)

8. **Your app is live!**
   - Vercel will provide a URL like: `https://dna-prediction.vercel.app`

---

## Part 3: Update Frontend with Backend URL

### After Backend is Deployed on Render:

1. **Copy your Render backend URL**
   - Example: `https://dna-mutation-backend.onrender.com`

2. **Update Vercel Environment Variables:**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Edit `NEXT_PUBLIC_API_URL`
   - Change value to your Render URL (without trailing slash)
   - Example: `https://dna-mutation-backend.onrender.com`
   - Click "Save"

3. **Redeploy Frontend:**
   - Go to Vercel Dashboard → Deployments
   - Click "..." on latest deployment → "Redeploy"

---

## Part 4: Update CORS in Backend

After deploying frontend, update your backend to allow requests from Vercel:

In `app.py`, update CORS:

```python
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=[
    "http://localhost:3000",  # Local development
    "https://YOUR-VERCEL-URL.vercel.app",  # Production
    "https://*.vercel.app"  # All Vercel preview deployments
])
```

Then commit and push to redeploy on Render.

---

## Testing Your Deployment

1. **Test Backend API:**
   ```bash
   curl https://YOUR-RENDER-URL.onrender.com/
   ```
   Should return: "Mutation Detection"

2. **Test Performance Analysis:**
   ```bash
   curl https://YOUR-RENDER-URL.onrender.com/performance_analysis
   ```
   Should return JSON with metrics

3. **Test Frontend:**
   - Visit: `https://YOUR-VERCEL-URL.vercel.app`
   - Navigate to Performance Analysis
   - Click "View Model Performance"
   - Should load real metrics from backend

---

## Important Notes

### Free Tier Limitations:

**Render Free Tier:**
- Sleeps after 15 minutes of inactivity
- First request after sleep takes 30-60 seconds to wake up
- 750 hours/month free

**Vercel Free Tier:**
- 100 GB bandwidth/month
- Unlimited deployments
- Serverless functions timeout: 10 seconds

### Handling Render Sleep:

Add a loading message in frontend:

```javascript
const [isWakingUp, setIsWakingUp] = useState(false);

// In handleViewPerformance:
setIsWakingUp(true);
// ... make API call
setIsWakingUp(false);

// Display:
{isWakingUp && (
  <p className="text-blue-500">
    Waking up the backend server (this may take 30-60 seconds on first load)...
  </p>
)}
```

---

## Continuous Deployment

Both Vercel and Render support automatic deployments:

- **Push to GitHub** → Automatically deploys to Vercel & Render
- **Pull Requests** → Get preview deployments on Vercel

---

## Troubleshooting

### Backend Issues:

1. **Check Render Logs:**
   - Render Dashboard → Your Service → Logs

2. **Common Issues:**
   - Missing `dna.csv` file → Make sure it's in the repo
   - Python version mismatch → Add `runtime.txt` with: `python-3.11.0`
   - Port binding → Render sets PORT env variable automatically

### Frontend Issues:

1. **Check Vercel Logs:**
   - Vercel Dashboard → Your Project → Deployments → Click deployment → Logs

2. **Common Issues:**
   - CORS errors → Update backend CORS settings
   - API URL wrong → Check environment variables
   - Build failures → Check package.json dependencies

### CORS Errors:

If you get CORS errors in production:
- Make sure backend CORS includes your Vercel URL
- Check that environment variable is set correctly
- Try adding `https://*.vercel.app` to allowed origins

---

## Custom Domains (Optional)

### Vercel:
1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

### Render:
1. Go to Service Settings → Custom Domain
2. Add your custom domain
3. Configure DNS with CNAME record

---

## Monitoring

### Vercel Analytics:
- Enable in Project Settings → Analytics
- Track visitor analytics, Web Vitals

### Render Metrics:
- View CPU, Memory, Request metrics in dashboard

---

## Cost Optimization

### Keep Using Free Tier:
- Use Render for backend (with sleep)
- Use Vercel for frontend
- Total cost: $0/month

### Upgrade Options:
- **Render**: $7/month for always-on instance
- **Vercel**: $20/month for Pro features

---

## Summary Checklist

### Backend (Render):
- [ ] Create `requirements.txt`
- [ ] Create `Procfile`
- [ ] Update `app.py` for production
- [ ] Push to GitHub
- [ ] Create Web Service on Render
- [ ] Copy Render URL

### Frontend (Vercel):
- [ ] Create `.env.local`
- [ ] Update API calls to use environment variable
- [ ] Push to GitHub
- [ ] Create Project on Vercel
- [ ] Set Root Directory to `dna-predicition-analysis/frontend`
- [ ] Add `NEXT_PUBLIC_API_URL` environment variable
- [ ] Deploy

### Post-Deployment:
- [ ] Update Vercel env variable with Render URL
- [ ] Update backend CORS with Vercel URL
- [ ] Test both endpoints
- [ ] Test complete flow

---

## Support

If you encounter issues:
1. Check deployment logs
2. Verify environment variables
3. Test API endpoints with curl/Postman
4. Check CORS configuration
5. Verify file paths and structure

Good luck with your deployment! 🚀
