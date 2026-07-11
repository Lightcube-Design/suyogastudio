# Su Yoga Studio — Static Website Clone

Exact static clone of [suyogastudio.in](https://www.suyogastudio.in/) — pure HTML, CSS and JavaScript. No framework, no build step. Upload directly to Hostinger.

## Pages

| File | URL (after deploy) | Original Wix URL |
|------|-------------------|------------------|
| `index.html` | `/` | `/` |
| `about.html` | `/about.html` or `/blank` | `/blank` |
| `packages.html` | `/packages.html` or `/blank-1` | `/blank-1` |
| `testimonials.html` | `/testimonials.html` or `/blank-2` | `/blank-2` |
| `resources.html` | `/resources.html` or `/blank-3` | `/blank-3` |
| `contact.html` | `/contact.html` or `/blank-6` | `/blank-6` |

## Deploy to Hostinger

### Step 1 — Point your domain

1. Log in to **Hostinger hPanel**
2. Go to **Domains** → select `suyogastudio.in`
3. Set nameservers to Hostinger (if not already):
   - `ns1.dns-parking.com`
   - `ns2.dns-parking.com`
   *(or the nameservers Hostinger shows for your plan)*
4. Wait 15 minutes to 24 hours for DNS to propagate

### Step 2 — Upload the website

1. In hPanel → **Websites** → **Manage** → **File Manager**
2. Open the `public_html` folder
3. Delete any default Hostinger files (e.g. `default.php`) if present
4. Upload **all files and folders** from this project into `public_html`:
   - `index.html`, `about.html`, `packages.html`, etc.
   - `assets/` folder (css, js, img)
   - `.htaccess`, `robots.txt`, `sitemap.xml`

**Or use FTP:**
- hPanel → **Files → FTP Accounts** → create/get credentials
- Connect with FileZilla/Cyberduck and upload to `public_html`

### Step 3 — Enable SSL

1. hPanel → **SSL** → enable free SSL for `suyogastudio.in` and `www.suyogastudio.in`
2. The `.htaccess` file auto-redirects HTTP → HTTPS and `suyogastudio.in` → `www.suyogastudio.in`

### Step 4 — Contact form setup

The contact form uses [Web3Forms](https://web3forms.com) (free, no backend needed):

1. Go to https://web3forms.com and enter `suyogastudio@gmail.com`
2. Copy the access key from your email
3. Replace `YOUR_WEB3FORMS_ACCESS_KEY` in:
   - `index.html`
   - `contact.html`
   - `testimonials.html`
4. Re-upload those files to Hostinger

### Step 5 — Verify

Visit https://www.suyogastudio.in and check all pages load correctly.

## Local preview

```bash
cd suyogastudio
python3 -m http.server 8000
```

Open http://localhost:8000

## Structure

```
index.html              Home page
about.html              About instructor
packages.html           Pricing & packages
testimonials.html       Client testimonials
resources.html          Wellness resources
contact.html            Contact form
404.html                Custom error page
assets/css/style.css    All styling
assets/js/main.js       Mobile nav + form handling
assets/img/             Logo, photos (from original Wix site)
.htaccess               HTTPS, redirects, caching
robots.txt, sitemap.xml SEO
```
