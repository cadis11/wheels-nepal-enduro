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
      { day: "Day 1", date: "Thu 18 Feb", text: "Registration, camping, expo and live music.", img: { name: "day1", w: 750, h: 457, alt: "Riders roll out under a Wheels Nepal Enduro start gate with spectators lining the track." } },
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
    start: "2026-06-30",
    end: "2026-06-30",
    tz: "+05:45",
    dateText: "30 June 2026",
    duration: "Race day",
    venue: "Pokhara",
    city: "Pokhara, Nepal",
    organiser: "Wheels Adventure Nepal",
    logo: "logo-monsoon",
    logoSize: [153, 145],
    cardImg: { name: "mm-rider-mud", w: 960, h: 536, alt: "A mud-covered rider leans a dirt bike through a rice-field corner as spectators watch from under umbrellas." },
    heroImg: { name: "mm-track-aerial", w: 1376, h: 768, alt: "Aerial view of a muddy dirt bike track looping through terraced rice fields beside a lake." },
    blurb:
      "Nepal's first monsoon dirt bike race: riders, mud and a Ropai Diwas rice-planting celebration on a track cut through the paddies.",
    about: [
      "Pokhara Monsoon Madness is a unique monsoon adventure festival that combines Nepalese culture, off-road motorsports, local traditions and outdoor entertainment into one unforgettable experience.",
      "The inaugural race turned monsoon-soaked rice paddies into a race circuit. Riders took on mud, rain and terraced fields, while the day doubled as a celebration of Ropai Diwas, the traditional rice-planting festival."
    ],
    facts: [
      ["Date", "30 June 2026"],
      ["Where", "Pokhara, Gandaki Province"],
      ["Format", "Off-road dirt bike race with a Ropai Diwas rice-planting celebration"],
      ["Classes", "Women Open, Men Open, Men Masters 40+"],
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
    classesTitle: "Race classes",
    classes: [
      ["Women Open", "Open to women riders of all skill levels. The women's race opened the day on the track."],
      ["Men Open", "The main event: monsoon mud and terraced rice fields, with a podium and prizes for the top finishers."],
      ["Men Masters 40+", "A separate class for riders aged 40 and above, with its own podium and prizes."]
    ],
    scheduleTitle: "Race day schedule",
    scheduleNote: "As planned for the day.",
    schedule: [
      { day: "6:00 AM", date: "Gates open", text: "Rider check-in, bike inspection and stall setup." },
      { day: "8:00 AM", date: "Ropai Festival", text: "Traditional rice planting ceremony and cultural festivities, open to all." },
      { day: "9:00 AM", date: "Women Open", text: "Women's race start." },
      { day: "11:00 AM", date: "Men Open", text: "Men Open race start." },
      { day: "1:00 PM", date: "Men Masters 40+", text: "Masters class race start." },
      { day: "3:30 PM", date: "Podium & prizes", text: "Awards, trophies and prize ceremony for the finishers." }
    ],
    gallery: [
      { name: "mm-track-aerial", w: 1376, h: 768, alt: "Aerial view of a muddy dirt bike track looping through terraced rice fields beside a lake." },
      { name: "mm-race-crowd", w: 960, h: 536, alt: "Two riders race side by side through mud while spectators with umbrellas line the track." },
      { name: "mm-rider-mud", w: 960, h: 536, alt: "A rider throws mud through a corner with misty hills behind." },
      { name: "mm-ropai-tug", w: 960, h: 536, alt: "A mud-covered team pulls on a rope in a flooded rice field during Ropai Diwas." },
      { name: "mm-ropai-planting", w: 960, h: 536, alt: "A man plants rice seedlings in a paddy as a rider passes behind him." },
      { name: "mm-ropai-filming", w: 960, h: 536, alt: "A cameraman films a farmer planting rice while riders race past." }
    ],
    galleryNote: "Event visuals from the Monsoon Madness promotion. Real photos from race day coming soon.",
    seo: "Pokhara Monsoon Madness: off-road dirt bike race and Ropai Diwas rice-planting festival in Pokhara on 30 June 2026. 80+ riders, 10,000+ spectators, 20M+ online views."
  }
];
