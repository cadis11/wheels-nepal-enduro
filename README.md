# Wheels Nepal Enduro site

Plain static HTML/CSS/JS. No build step. Deploy the folder as-is (Vercel: framework "Other", no build command, output dir `.`).

Run locally: `python3 -m http.server 8000` then open http://localhost:8000

## Change brand, tagline, phones, social links
Edit `js/config.js` only. Header, footer, contact page and WhatsApp links update everywhere.
If the brand name changes, also search & replace "Wheels Nepal Enduro" in the `<title>`/meta tags of the `*.html` files, and set the real domain in `sitemap.xml`, `robots.txt` and the `og:url`/`canonical` tags (currently `https://wheels-nepal.vercel.app`).

## Add a new event
1. Add an object to `js/events-data.js` (copy an existing one; `status` is `upcoming` or `past`).
2. Copy `events/_template.html` to `events/<slug>.html`; set `data-slug` and the title/meta/OG tags.
3. Add the page to `sitemap.xml`. Cards on Home / Events / footer update automatically. Upcoming events flip to "past" automatically after their `end` date.
4. Images go in `assets/img/` as both `.webp` and `.jpg` (name without extension is used in the data file).

## Not provided yet (placeholders)
Email address and social links (`js/config.js`), real Monsoon Madness photos, camping/ride details.
