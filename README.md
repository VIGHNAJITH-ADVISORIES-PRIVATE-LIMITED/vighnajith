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

1. Cloudflare dashboard > Workers & Pages > Create > Pages > Connect to Git > pick this repo, branch `main`.
2. Framework preset: None. Build command: leave empty. Build output directory: `site`.
3. Save and Deploy. You get a `*.pages.dev` URL.

## Connect vighnajith.com (GoDaddy)

Simplest: move DNS to Cloudflare.
1. Cloudflare > Add a site > `vighnajith.com` (Free plan). Cloudflare shows two nameservers.
2. GoDaddy > My Products > Domains > vighnajith.com > DNS > Nameservers > Change > "I'll use my own nameservers" > paste the two Cloudflare nameservers > Save. Wait until Cloudflare shows the site as Active.
3. Pages project > Custom domains > Set up a custom domain > `vighnajith.com`, then again for `www.vighnajith.com`. Cloudflare adds the DNS records and HTTPS automatically.
4. Optional: Cloudflare > Rules > Redirect Rules: send `www.vighnajith.com/*` to `https://vighnajith.com/$1` (301).

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
