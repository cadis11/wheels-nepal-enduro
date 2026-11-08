/* ==========================================================================
   EVENTS DATA - add a new event by adding an object here, then copy
   events/_template.html to events/<slug>.html (see README.md).
   Home, Events index and each event page are all built from this list.
   `status` is "upcoming" or "past". An upcoming event with an `end` date in
   the past is shown as past automatically.
   `img` values are file names (no extension) in assets/img/ - a .webp and a
   .jpg of each must exist.  Only facts from the sponsor deck are used.
   ========================================================================== */
window.EVENTS = [
  {
    slug: "wheels-nepal-enduro-2027",
    status: "upcoming",
    name: "Wheels Nepal Enduro 2027",
    subtitle: "Camping & Music Festival",
    type: "Enduro race + camping & music festival",
    start: "2027-02-18",
    end: "2027-02-20",
    /* Nepal Standard Time. The start time of day has not been announced,
       so the countdown runs to 00:00 on the first day. */
    tz: "+05:45",
    dateText: "18-20 February 2027",
    duration: "2 nights / 3 days",
    venue: "Hemja Ammat (Bungee Area)",
    city: "Pokhara, Nepal",
    /* Venue pin (from the coordinates printed in the sponsor deck). */
    coords: [28.2792634, 83.9355409],
    organiser: "Wheels Adventure Nepal",
    logo: "logo-enduro",
    logoSize: [420, 376],
    cardImg: { name: "rider-lake", w: 877, h: 473, alt: "A rider kicks up dust on a berm above Phewa Lake and the Pokhara valley." },
    heroImg:  { name: "rider-lake", w: 877, h: 473, alt: "A rider kicks up dust on a berm above Phewa Lake and the Pokhara valley." },
    blurb:
      "A national enduro race wrapped in two nights of camping, live music, bonfires, local food and adventure tourism, just outside Pokhara.",
    about: [
      "Wheels Nepal Enduro is envisioned as Nepal's biggest bike and music festival. The event combines a national enduro race with 2 nights and 3 days of camping, live music, bonfire, adventure tourism, local food, exhibitions and outdoor experiences.",
      "Organised by Wheels Adventure Nepal, it is set at Hemja Ammat (Bungee Area) in Pokhara."
    ],
    vision:
      "To establish Nepal's premier annual enduro and adventure festival while promoting tourism, motorsports and local communities.",
    facts: [
      ["Dates", "18-20 February 2027"],
      ["Format", "2 nights / 3 days"],
      ["Venue", "Hemja Ammat (Bungee Area), Pokhara"],
      ["Organiser", "Wheels Adventure Nepal"],
      ["Programme", "National enduro race, camping, live music, bonfire, expo"]
    ],
    scheduleTitle: "Tentative schedule",
    scheduleNote: "The programme is tentative and may change. Confirmed timings will be announced here.",
    schedule: [
      { day: "Day 1", date: "Thu 18 Feb", text: "Registration, camping, expo and live music.", img: { name: "day1", w: 750, h: 457, alt: "Riders roll out under a Wheels Nepal start gate with spectators lining the track." } },
      { day: "Day 2", date: "Fri 19 Feb", text: "Qualifying, adventure activities, concert and bonfire.", img: { name: "day2", w: 746, h: 457, alt: "A rider in a hi-vis jersey descends a hillside above a river valley." } },
      { day: "Day 3", date: "Sat 20 Feb", text: "Enduro finals, prize ceremony and closing.", img: { name: "day3", w: 750, h: 457, alt: "A rider powers through dust past a line of spectators." } }
    ],
    objectivesTitle: "What the festival is for",
    objectives: [
      "Promote adventure tourism.",
      "Develop enduro motorsports.",
      "Support local businesses.",
      "Create an international-standard festival.",
      "Inspire youth participation."
    ],
    audience: {
      title: "Who it is for",
      stat: "20,000+",
      statLabel: "target audience over 3 days",
      text: "Riders, visitors, campers, adventure enthusiasts, motorcycle clubs, families, tourists, influencers and corporate partners."
    },
    media: "Social media campaigns, influencer marketing, professional photography and videography, press coverage, livestreams and brand activations.",
    gallery: [
      { name: "track-aerial", w: 584, h: 473, alt: "Aerial view of a looping dirt enduro track with a paddock and tents at its centre." },
      { name: "bonfire", w: 995, h: 514, alt: "Campers gather around a bonfire under string lights at night." },
      { name: "crowd-track", w: 485, h: 514, alt: "Aerial view of a track lined with spectators." },
      { name: "annapurna-road", w: 702, h: 1044, alt: "A road in the Pokhara valley with snow-capped Annapurna peaks behind." }
    ],
    galleryNote: "Promotional visuals from the event plan.",
    seo: "Wheels Nepal Enduro 2027: 18-20 Feb 2027 at Hemja Ammat (Bungee Area), Pokhara. National enduro race, camping, live music and bonfire."
  },

  {
    slug: "pokhara-monsoon-madness",
    status: "past",
    name: "Pokhara Monsoon Madness",
    subtitle: "Dirt bike race",
    type: "Off-road dirt bike race + monsoon adventure festival",
    start: null,
    end: null,
    dateText: "Monsoon 2026 (exact dates to be confirmed)",
    duration: "Two days",
    venue: "Pokhara",
    city: "Pokhara, Nepal",
    organiser: "Wheels Adventure Nepal",
    logo: "logo-monsoon",
    logoSize: [153, 145],
    cardImg: { name: "rider-mud", w: 701, h: 802, alt: "A mud-covered rider leans a dirt bike through a corner." , fallbackLogo: true },
    heroImg: null,
    blurb:
      "A monsoon adventure festival that combines Nepali culture, off-road motorsports, local traditions and outdoor entertainment.",
    about: [
      "Pokhara Monsoon Madness is a unique monsoon adventure festival that combines Nepalese culture, off-road motorsports, local traditions and outdoor entertainment into one unforgettable experience."
    ],
    facts: [
      ["When", "Monsoon 2026 (exact dates to be confirmed)"],
      ["Where", "Pokhara"],
      ["Format", "Off-road dirt bike race, over two days"],
      ["Organiser", "Wheels Adventure Nepal"]
    ],
    stats: [
      { n: "80+", l: "competing riders" },
      { n: "10,000+", l: "spectators over two days" },
      { n: "20M+", l: "online views across TikTok, Instagram & YouTube" }
    ],
    highlightsTitle: "What it achieved",
    highlights: [
      "High media coverage from Kantipur TV, OnlineKhabar and dozens of vloggers.",
      "Strong support from local government and communities.",
      "A boost in tourism and hospitality business in Pokhara."
    ],
    gallery: [],
    galleryNote: "Event photos are coming soon.",
    seo: "Pokhara Monsoon Madness: off-road dirt bike race and monsoon adventure festival in Pokhara. 80+ riders, 10,000+ spectators, 20M+ online views."
  }
];
