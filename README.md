# vighnajith

Website and brand film for Vighnajith Advisories Private Limited, Bengaluru.

```
site/   the deployable website (static, no build step)
  index.html            the one-page site
  video/                brand film: web version (30 fps, ~9 MB), 1080p60 master, poster
  og-image.png          1200x630 share image
  robots.txt, sitemap.xml, _headers
film/   source of the 60 s motion-graphics video (canvas film, rendered from code)
```

## Deploy on Cloudflare Pages

The live Pages project `vighnajith` is a direct-upload project (Cloudflare cannot convert it to Git-connected). Every push to `main` deploys `site/` via [.github/workflows/deploy.yml](.github/workflows/deploy.yml), which needs the repo secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`. To deploy by hand from the repo root:

```
CLOUDFLARE_API_TOKEN=... CLOUDFLARE_ACCOUNT_ID=... npx wrangler pages deploy site --project-name vighnajith --branch main
```

- Always deploy the `site` folder (it must contain `index.html`) with `--branch main`; any other branch only makes a preview URL.
- A deploy never touches DNS or custom domains. The old GoDaddy "Launching Soon" page can only come back through DNS, never through a deploy.
- Keep the token in `.env` (git-ignored) as `CLOUDFLARE_API_TOKEN`; never paste it into commands or logs.

### Content-Security-Policy hashes

`site/_headers` allows the two inline `<script>` blocks in `index.html` by SHA-256 hash. After editing either inline script, regenerate the hashes or the script is blocked:

```
node -e "const h=require('fs').readFileSync('site/index.html','utf8');for(const m of h.matchAll(/<script(?![^>]*\bsrc=)(?![^>]*ld\+json)[^>]*>([\s\S]*?)<\/script>/g))console.log('sha256-'+require('crypto').createHash('sha256').update(m[1]).digest('base64'))"
```

Put the printed values in `script-src` in `site/_headers`. Test on a preview branch first and check the browser console for CSP errors.

## Connect vighnajith.com (GoDaddy)

Simplest: move DNS to Cloudflare.
1. Cloudflare > Add a site > `vighnajith.com` (Free plan). Cloudflare shows two nameservers.
2. GoDaddy > My Products > Domains > vighnajith.com > DNS > Nameservers > Change > "I'll use my own nameservers" > paste the two Cloudflare nameservers > Save. Wait until Cloudflare shows the site as Active.
3. Pages project > Custom domains > Set up a custom domain > `vighnajith.com`, then again for `www.vighnajith.com`. Cloudflare adds the DNS records and HTTPS automatically.
4. Redirect rule (already configured; lives in Cloudflare, not in this repo): `www.vighnajith.com` -> `https://vighnajith.com` + path, 301, query string kept. Zone settings in place: Always Use HTTPS, minimum TLS 1.2, HSTS (30 days, no subdomains, no preload).

Note: GoDaddy keeps answering for the zone with its old parking records after the nameserver change. Resolvers that cached the old delegation keep getting them until that cache expires (up to 48 h after the change). Remove the stale GoDaddy DNS records so the old placeholder is no longer served.

If the domain also has email (vijay@vighnajith.com), copy its MX/TXT records from GoDaddy DNS into Cloudflare DNS before changing nameservers, or email will stop.

## Embed the video on the site

```html
<video controls playsinline preload="metadata" poster="/video/vighnajith-brand-film-poster.png" style="width:100%;aspect-ratio:16/9">
  <source src="/video/vighnajith-brand-film.mp4" type="video/mp4">
</video>
```

## Rebuild the video (optional)

The film is `film/film.js` (a pure function of time, 120 bpm, 60 s) rendered with the motion-reel skill's `render.mjs`, `sfx.mjs` and `mix.mjs`.
`cd film && npm i && npx playwright install chromium`, then `node shots.mjs && node shots2.mjs` to re-capture the site UI into `assets/shots` (do this after any site change).
`audio/mix.m4a` is the mastered soundtrack.
