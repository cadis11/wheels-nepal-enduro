/* ==========================================================================
   SITE CONFIG  -  the ONE place for brand, tagline, contact and social links.
   Change values here and every page updates (header, footer, contact page,
   CTAs, WhatsApp links). Leave a social link as "" to hide it.
   NOTE: <title> / meta / OG tags in each HTML file are static text; if the
   brand is renamed, search & replace "Wheels Nepal Enduro" across the *.html files
   as well (see README.md).
   ========================================================================== */
window.SITE = {
  brand: "Wheels Nepal Enduro",
  organiser: "Wheels Adventure Nepal",
  tagline: "Ride. Race. Camp. Pokhara, Nepal.",
  shortDescription:
    "Enduro races, bike rides and camping from Pokhara, Nepal. Events by Wheels Adventure Nepal.",
  city: "Pokhara, Nepal",
  /* Set to the real domain once known (used only for display/ICS). */
  url: "https://wheels-nepal.vercel.app",

  phones: [
    { display: "+977 9802822902", tel: "+9779802822902" }
  ],
  /* WhatsApp number, digits only, with country code. Uses the phone number above. */
  whatsapp: "9779802822902",
  /* No email address was provided. Fill in to enable the "Send by email"
     option on the contact form. */
  email: "",

  /* No social accounts were provided. Add full URLs to show them. */
  social: {
    facebook: "",
    instagram: "",
    youtube: "",
    tiktok: ""
  },

  nav: [
    { label: "Home", href: "index.html" },
    { label: "Events", href: "events.html" },
    { label: "Camping", href: "camping.html" },
    { label: "Bike Rides", href: "bike-rides.html" },
    { label: "Gallery", href: "gallery.html" },
    { label: "About", href: "about.html" },
    { label: "Partners", href: "partners.html" }
  ],
  navCta: { label: "Contact", href: "contact.html" }
};
