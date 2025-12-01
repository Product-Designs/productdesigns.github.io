# Cloudflare Pages Configuration

## Required Settings

### Build Configuration

**Framework preset:** `None` or `Eleventy`

**Build command:**
```bash
npm run build
```

**Build output directory:**
```
_site
```

**Root directory (advanced):**
```
/
```
(Leave blank or use `/`)

---

## Environment Variables

### Node.js Version

**Variable name:** `NODE_VERSION`
**Value:** `25.2.1`

This matches the version specified in `.nvmrc`

---

## Build Verification Checklist

After deployment, verify:

1. **Build logs show:**
   - ✅ `npm run sass:build` completes
   - ✅ `npm run eleventy:build` completes
   - ✅ `npm run copy:images` completes
   - ✅ Images copied to `_site/assets/images/`

2. **Files are deployed:**
   - Visit: `https://productdesigns.net/assets/images/TimeTrackerPro.png`
   - Should load the image directly
   - Visit: `https://productdesigns.net/test-images.html`
   - Should show image test page with all images loaded

3. **Console debugging:**
   - Visit: `https://productdesigns.net`
   - Open browser DevTools Console (F12)
   - Click on any design card
   - Check console logs for:
     - `"Card data loaded: 6 cards"`
     - `"Loading screenshot: /assets/images/..."`
     - `"Image loaded successfully"` OR error details

---

## Common Issues & Solutions

### Issue: Images don't copy during build

**Solution:** Ensure build command is exactly:
```bash
npm run build
```

NOT:
- `npm run eleventy:build` (missing image copy)
- `eleventy` (missing both sass and images)

### Issue: Wrong Node version

**Symptom:** Build fails with module errors

**Solution:** Set `NODE_VERSION=25.2.1` in environment variables

### Issue: Wrong output directory

**Symptom:** Site shows 404 or blank page

**Solution:** Build output directory MUST be `_site` (not `dist`, `public`, or `build`)

---

## Current Build Process

```bash
npm run build
  ↓
prebuild: npm run sass:build
  ├── Creates: _site/assets/css/site.css
  ↓
eleventy:build
  ├── Generates: _site/index.html
  ├── Vite bundles JS
  ├── Creates: _site/assets/index-*.js
  ↓
copy:images
  ├── Copies: src/assets/images/* → _site/assets/images/
  └── Result: 8 PNG files in _site/assets/images/
```

---

## Quick Test Commands (Local)

```bash
# Clean build
rm -rf _site
npm run build

# Verify images copied
ls -la _site/assets/images/

# Should show 8 PNG files:
# - CollectSomeMore_games.png
# - CollectSomeMore_movies.png
# - MoonsilverWaypoints.png
# - Scouters.png
# - SoccerGameTracker.png
# - TaskStat.png
# - TimeTrackerPro.png
# - Timetrak.png
```

---

## Repository Info

- **GitHub:** Product-Designs/productdesigns.github.io
- **Live site:** https://productdesigns.net
- **Deploy:** Git push to `main` branch triggers Cloudflare Pages build
