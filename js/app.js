/* Wheels Nepal Enduro site script. No dependencies, no build step.
   Reads js/config.js (window.SITE) and js/events-data.js (window.EVENTS). */
(function () {
  "use strict";
  var SITE = window.SITE || {};
  var EVENTS = window.EVENTS || [];
  var root = document.documentElement.getAttribute("data-root") || "";
  document.documentElement.classList.add("js");

  /* ---------- helpers ---------- */
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function img(path) { return root + "assets/img/" + path; }
  function pic(im, opts) {
    opts = opts || {};
    var loading = opts.eager ? 'loading="eager" fetchpriority="high"' : 'loading="lazy" decoding="async"';
    return '<picture><source type="image/webp" srcset="' + img(im.name + ".webp") + '">' +
      '<img src="' + img(im.name + ".jpg") + '" width="' + im.w + '" height="' + im.h + '" alt="' + esc(opts.alt != null ? opts.alt : im.alt) + '" ' + loading + "></picture>";
  }
  function waLink(text) {
    return "https://wa.me/" + (SITE.whatsapp || "") + (text ? "?text=" + encodeURIComponent(text) : "");
  }
  var ICON = {
    cal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 22s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg>',
    chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.7 7.1L3 21l1.9-5.8A8 8 0 1 1 21 12z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="square" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="square" aria-hidden="true"><path d="M5 5l14 14M19 5 5 19"/></svg>'
  };

  /* ---------- event status ---------- */
  function endMs(e) { return e.end ? new Date(e.end + "T23:59:59" + (e.tz || "+05:45")).getTime() : null; }
  function startMs(e) { return e.start ? new Date(e.start + "T00:00:00" + (e.tz || "+05:45")).getTime() : null; }
  function statusOf(e) {
    if (e.status === "past") return "past";
    var end = endMs(e);
    if (end && Date.now() > end) return "past";
    return "upcoming";
  }
  function byStart(a, b) { return (startMs(a) || 0) - (startMs(b) || 0); }
  function upcoming() { return EVENTS.filter(function (e) { return statusOf(e) === "upcoming"; }).sort(byStart); }
  function past() { return EVENTS.filter(function (e) { return statusOf(e) === "past"; }).sort(function (a, b) { return byStart(b, a); }); }
  function bySlug(s) { return EVENTS.filter(function (e) { return e.slug === s; })[0]; }
  function place(e) { return (e.city || "").toLowerCase().indexOf((e.venue || "").toLowerCase()) === 0 ? e.city : e.venue + ", " + e.city; }
  function eventHref(e, fromRoot) { return (fromRoot === false ? "" : root) + "events/" + e.slug + ".html"; }

  /* ---------- config-driven text ---------- */
  function applyConfig() {
    $$("[data-cfg]").forEach(function (el) {
      var k = el.getAttribute("data-cfg");
      if (SITE[k] != null) el.textContent = SITE[k];
    });
    $$("[data-tel]").forEach(function (el) {
      var p = (SITE.phones || [])[parseInt(el.getAttribute("data-tel"), 10) || 0];
      if (!p) { el.hidden = true; return; }
      el.href = "tel:" + p.tel;
    });
    $$("[data-tel-text]").forEach(function (el) {
      var p = (SITE.phones || [])[parseInt(el.getAttribute("data-tel-text"), 10) || 0];
      if (p) el.textContent = p.display;
    });
    $$("[data-email-text]").forEach(function (el) { el.textContent = SITE.email; });
    $$("[data-wa]").forEach(function (el) {
      el.href = waLink(el.getAttribute("data-wa") || "");
      el.target = "_blank"; el.rel = "noopener";
    });
    $$("[data-email]").forEach(function (el) {
      if (!SITE.email) { el.hidden = true; return; }
      el.href = "mailto:" + SITE.email;
      el.hidden = false;
    });
    $$(".year").forEach(function (el) { el.textContent = new Date().getFullYear(); });
  }

  /* ---------- header & footer ---------- */
  function renderHeader() {
    var host = $("#site-header");
    if (!host) return;
    var cur = document.body.getAttribute("data-nav") || "";
    var links = (SITE.nav || []).map(function (n) {
      return '<li><a href="' + root + n.href + '"' + (n.href === cur ? ' aria-current="page"' : "") + ">" + esc(n.label) + "</a></li>";
    }).join("");
    var cta = SITE.navCta ? '<li><a class="nav-cta" href="' + root + SITE.navCta.href + '"' + (SITE.navCta.href === cur ? ' aria-current="page"' : "") + ">" + esc(SITE.navCta.label) + "</a></li>" : "";
    host.className = "site-header";
    host.innerHTML =
      '<div class="wrap"><a class="brand" href="' + root + 'index.html">' +
      '<img src="' + img("mark.svg") + '" width="40" height="40" alt="">' +
      '<span class="brand-text"><span class="brand-name">' + esc(SITE.brand) + '</span><span class="brand-sub">Pokhara, Nepal</span></span></a>' +
      '<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Open menu">' + ICON.menu + "</button>" +
      '<nav class="nav" id="site-nav" aria-label="Main"><ul>' + links + cta + "</ul></nav></div>";
    var btn = $(".nav-toggle", host), nav = $("#site-nav", host);
    function set(open) {
      nav.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      btn.innerHTML = open ? ICON.close : ICON.menu;
    }
    btn.addEventListener("click", function () { set(!nav.classList.contains("is-open")); });
    document.addEventListener("keydown", function (ev) {
      if (ev.key === "Escape" && nav.classList.contains("is-open")) { set(false); btn.focus(); }
    });
    nav.addEventListener("click", function (ev) { if (ev.target.tagName === "A") set(false); });
  }

  function renderFooter() {
    var host = $("#site-footer");
    if (!host) return;
    host.className = "site-footer";
    var explore = (SITE.nav || []).concat(SITE.navCta ? [SITE.navCta] : []).map(function (n) {
      return '<li><a href="' + root + n.href + '">' + esc(n.label) + "</a></li>";
    }).join("");
    var evs = EVENTS.map(function (e) {
      return '<li><a href="' + eventHref(e) + '">' + esc(e.name) + "</a></li>";
    }).join("");
    var phones = (SITE.phones || []).map(function (p) {
      return '<li><a href="tel:' + p.tel + '">' + esc(p.display) + "</a></li>";
    }).join("");
    var wa = SITE.whatsapp ? '<li><a href="' + waLink("Hello! I found you on your website.") + '" target="_blank" rel="noopener">WhatsApp us</a></li>' : "";
    var mail = SITE.email ? '<li><a href="mailto:' + esc(SITE.email) + '">' + esc(SITE.email) + "</a></li>" : "";
    var labels = { facebook: "Facebook", instagram: "Instagram", youtube: "YouTube", tiktok: "TikTok" };
    var soc = Object.keys(SITE.social || {}).filter(function (k) { return SITE.social[k]; }).map(function (k) {
      return '<a href="' + esc(SITE.social[k]) + '" target="_blank" rel="noopener">' + labels[k] + "</a>";
    }).join("");
    host.innerHTML =
      '<div class="wrap"><div class="foot-grid">' +
      '<div><a class="brand" href="' + root + 'index.html"><img src="' + img("mark.svg") + '" width="40" height="40" alt=""><span class="brand-text"><span class="brand-name">' + esc(SITE.brand) + '</span><span class="brand-sub">' + esc(SITE.tagline) + "</span></span></a>" +
      '<p class="muted" style="margin-top:14px;max-width:34ch">Events by ' + esc(SITE.organiser) + ", " + esc(SITE.city) + ".</p>" +
      (soc ? '<div class="social" style="margin-top:12px">' + soc + "</div>" : "") + "</div>" +
      "<div><h2>Explore</h2><ul>" + explore + "</ul></div>" +
      "<div><h2>Events</h2><ul>" + evs + '<li><a href="' + root + 'events.html">All events</a></li></ul></div>' +
      "<div><h2>Contact</h2><ul>" + phones + wa + mail + "</ul></div></div>" +
      '<div class="foot-note"><span>&copy; <span class="year"></span> ' + esc(SITE.brand) + ". All rights reserved.</span><span>Pokhara, Nepal</span></div></div>";
  }

  /* ---------- cards ---------- */
  function badge(e) {
    return statusOf(e) === "past" ? '<span class="badge badge--past">Past event</span>' : '<span class="badge">Upcoming</span>';
  }
  function eventCard(e) {
    var media;
    if (e.cardImg && !e.cardImg.fallbackLogo) {
      media = '<div class="card-media">' + badge(e) + pic(e.cardImg) + "</div>";
    } else {
      media = '<div class="card-media card-media--logo">' + badge(e) +
        '<img src="' + img(e.logo + ".png") + '" width="' + e.logoSize[0] + '" height="' + e.logoSize[1] + '" alt="" loading="lazy"></div>';
    }
    return '<article class="card reveal">' + media + '<div class="card-body"><ul class="card-meta"><li>' + esc(e.dateText) + "</li><li>" + esc(e.venue) + "</li></ul>" +
      '<h3><a href="' + eventHref(e) + '">' + esc(e.name) + "</a></h3><p>" + esc(e.blurb) + '</p><span class="card-link" aria-hidden="true">View event &rarr;</span></div></article>';
  }
  function soonCard() {
    return '<article class="card card--soon reveal"><div class="card-body"><span class="badge badge--soon">Coming soon</span><h3 style="margin-top:14px">More events on the way</h3>' +
      '<p>New rides, races and camping trips will be announced here. Message us to hear first.</p>' +
      '<a class="btn btn--ghost" href="' + root + 'contact.html?topic=updates">Get updates</a></div></article>';
  }
  function renderCards() {
    $$("[data-event-cards]").forEach(function (host) {
      var kind = host.getAttribute("data-event-cards");
      var list = kind === "upcoming" ? upcoming() : kind === "past" ? past() : EVENTS.slice().sort(byStart);
      var html = list.map(eventCard).join("");
      if (kind === "upcoming") html += soonCard();
      if (!list.length && kind === "past") html = '<p class="empty">Past events will appear here.</p>';
      host.innerHTML = html;
    });
  }

  /* ---------- countdown ---------- */
  function pad(n) { return n < 10 ? "0" + n : "" + n; }
  function mountCountdown(host, e) {
    var t = startMs(e), end = endMs(e);
    if (!t) { host.hidden = true; return; }
    host.innerHTML =
      '<div class="countdown" role="timer" aria-label="Time until ' + esc(e.name) + ' starts">' +
      ["Days", "Hours", "Mins", "Secs"].map(function (l, i) {
        return '<div class="cd-cell"><span class="cd-num" data-cd="' + i + '">--</span><span class="cd-lab">' + l + "</span></div>";
      }).join("") + "</div>" +
      '<p class="sr-only" data-cd-sr></p>';
    var nums = $$("[data-cd]", host), box = $(".countdown", host), sr = $("[data-cd-sr]", host);
    var lastMin = -1;
    function tick() {
      var now = Date.now(), d = t - now;
      if (d <= 0) {
        host.innerHTML = '<p class="cd-done">' + (end && now > end ? "This event has finished" : "It is happening now") + "</p>";
        return clearInterval(timer);
      }
      var s = Math.floor(d / 1000), days = Math.floor(s / 86400), h = Math.floor(s % 86400 / 3600), m = Math.floor(s % 3600 / 60), sec = s % 60;
      nums[0].textContent = days; nums[1].textContent = pad(h); nums[2].textContent = pad(m); nums[3].textContent = pad(sec);
      if (m !== lastMin) { lastMin = m; sr.textContent = days + " days, " + h + " hours and " + m + " minutes to go"; }
    }
    var timer = setInterval(tick, 1000); tick();
  }
  function renderNextEvent() {
    $$("[data-next-event]").forEach(function (host) {
      var e = upcoming()[0];
      if (!e) { host.innerHTML = '<p class="empty">No upcoming events announced yet. Check back soon.</p>'; return; }
      host.innerHTML =
        '<div class="feature reveal tread"><div><img class="logo" src="' + img(e.logo + ".png") + '" width="' + e.logoSize[0] + '" height="' + e.logoSize[1] + '" alt="' + esc(e.name) + ' logo">' +
        '<p class="kicker" style="margin-top:18px">Next event</p><h2>' + esc(e.name) + "</h2>" +
        '<ul class="feature-meta"><li><strong>' + esc(e.dateText) + "</strong> &middot; " + esc(e.duration) + "</li><li>" + esc(place(e)) + "</li></ul>" +
        '<div class="btn-row"><a class="btn" href="' + eventHref(e) + '">Event details</a><a class="btn btn--ghost" href="' + root + 'partners.html">Partner with us</a></div></div>' +
        '<div><p class="kicker">Starts in</p><div data-countdown></div><p class="muted" style="font-size:.95rem">Countdown runs to 00:00 on the first day, Nepal time. Start time to be confirmed.</p></div></div>';
      mountCountdown($("[data-countdown]", host), e);
    });
  }
  function renderPastStats() {
    $$("[data-past-stats]").forEach(function (host) {
      var e = bySlug(host.getAttribute("data-past-stats"));
      if (!e || !e.stats) return;
      host.innerHTML = e.stats.map(function (s) {
        return '<div class="stat"><span class="stat-n">' + esc(s.n) + '</span><span class="stat-l">' + esc(s.l) + "</span></div>";
      }).join("");
    });
  }

  /* ---------- tabs (events index) ---------- */
  function initTabs() {
    var host = $("[data-tabs]");
    if (!host) return;
    var tabs = $$('[role="tab"]', host), panels = $$('[role="tabpanel"]');
    $$("[data-count]").forEach(function (el) {
      var k = el.getAttribute("data-count"); el.textContent = "(" + (k === "upcoming" ? upcoming().length : past().length) + ")";
    });
    function select(tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute("aria-selected", on ? "true" : "false");
        t.tabIndex = on ? 0 : -1;
        $("#" + t.getAttribute("aria-controls")).hidden = !on;
      });
      if (focus) tab.focus();
      try { history.replaceState(null, "", "#" + tab.getAttribute("data-key")); } catch (x) { /* file:// etc */ }
    }
    tabs.forEach(function (t, i) {
      t.addEventListener("click", function () { select(t); });
      t.addEventListener("keydown", function (ev) {
        var n = null;
        if (ev.key === "ArrowRight") n = tabs[(i + 1) % tabs.length];
        if (ev.key === "ArrowLeft") n = tabs[(i - 1 + tabs.length) % tabs.length];
        if (ev.key === "Home") n = tabs[0];
        if (ev.key === "End") n = tabs[tabs.length - 1];
        if (n) { ev.preventDefault(); select(n, true); }
      });
    });
    var h = location.hash.replace("#", "");
    var start = tabs.filter(function (t) { return t.getAttribute("data-key") === h; })[0] || tabs[0];
    select(start);
    window.addEventListener("hashchange", function () {
      var m = tabs.filter(function (t) { return t.getAttribute("data-key") === location.hash.replace("#", ""); })[0];
      if (m) select(m);
    });
  }

  /* ---------- event page template ---------- */
  function icsFor(e) {
    function d(s, add) { var x = new Date(s + "T00:00:00Z"); x.setUTCDate(x.getUTCDate() + add); return x.toISOString().slice(0, 10).replace(/-/g, ""); }
    var lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//" + SITE.brand + "//EN", "BEGIN:VEVENT",
      "UID:" + e.slug + "@" + SITE.brand.replace(/\s+/g, "").toLowerCase(),
      "DTSTAMP:" + new Date().toISOString().replace(/[-:]/g, "").slice(0, 15) + "Z",
      "DTSTART;VALUE=DATE:" + d(e.start, 0), "DTEND;VALUE=DATE:" + d(e.end, 1),
      "SUMMARY:" + e.name, "LOCATION:" + e.venue + "\\, " + e.city,
      "DESCRIPTION:" + e.blurb.replace(/,/g, "\\,") + " Organised by " + e.organiser + ".", "END:VEVENT", "END:VCALENDAR"];
    return lines.join("\r\n");
  }
  function renderEventPage() {
    var host = $("#event-root");
    if (!host) return;
    var e = bySlug(host.getAttribute("data-slug"));
    if (!e) { host.innerHTML = '<div class="wrap section"><h1>Event not found</h1><p><a href="' + root + 'events.html">Back to all events</a></p></div>'; return; }
    var isPast = statusOf(e) === "past";
    var h = "";

    /* hero */
    var heroBg = e.heroImg ? pic(e.heroImg, { eager: true, alt: "" }) : "";
    h += '<section class="hero hero--page tread' + (e.heroImg ? "" : " hero--plain") + '" aria-labelledby="ev-title">' + heroBg + '<div class="wrap">' +
      (!e.heroImg && e.logo ? '<img src="' + img(e.logo + ".png") + '" width="' + e.logoSize[0] + '" height="' + e.logoSize[1] + '" alt="' + esc(e.name) + ' logo" style="width:120px;height:auto;margin-bottom:18px">' : "") +
      (isPast ? '<span class="badge badge--past">Past event</span>' : '<span class="badge">Upcoming event</span>') +
      '<p class="kicker" style="margin-top:18px">' + esc(e.type) + '</p><h1 id="ev-title">' + esc(e.name) + "</h1>" +
      '<ul class="hero-meta"><li>' + ICON.cal + "<span>" + esc(e.dateText) + "</span></li><li>" + ICON.pin + "<span>" + esc(place(e)) + "</span></li></ul>";
    if (!isPast) {
      h += '<div data-countdown></div><div class="btn-row"><a class="btn" href="' + root + 'contact.html?topic=event&amp;event=' + encodeURIComponent(e.name) + '">Ask about this event</a>' +
        '<a class="btn btn--ghost" href="' + root + 'partners.html">Become a partner</a></div>';
    } else {
      h += '<div class="btn-row"><a class="btn" href="' + root + 'events.html#upcoming">See upcoming events</a></div>';
    }
    h += "</div></section>";

    /* stats */
    if (e.stats) {
      h += '<section class="section section--paper" aria-labelledby="ev-stats"><div class="edge"></div><div class="wrap"><p class="kicker">By the numbers</p><h2 id="ev-stats">What it delivered</h2><span class="swash"></span><div class="stats">' +
        e.stats.map(function (s) { return '<div class="stat"><span class="stat-n">' + esc(s.n) + '</span><span class="stat-l">' + esc(s.l) + "</span></div>"; }).join("") +
        "</div></div></section>";
    }

    /* about + facts */
    h += '<section class="section" aria-labelledby="ev-about"><div class="wrap split split--wide-left"><div class="reveal"><p class="kicker">About</p><h2 id="ev-about">The event</h2><span class="swash"></span>' +
      e.about.map(function (p) { return '<p class="lede" style="max-width:none">' + esc(p) + "</p>"; }).join("") +
      (e.vision ? '<p class="kicker" style="margin-top:28px">Vision</p><p class="quote">' + esc(e.vision) + "</p>" : "") + "</div>" +
      '<div class="reveal"><h3>Quick facts</h3><dl class="facts">' + e.facts.map(function (f) { return "<div><dt>" + esc(f[0]) + "</dt><dd>" + esc(f[1]) + "</dd></div>"; }).join("") + "</dl>";
    if (!isPast) {
      var ics = e.start && e.end;
      h += '<div class="btn-row">' + (ics ? '<button type="button" class="btn btn--ghost" data-ics>Add to calendar</button>' : "") +
        (e.coords ? '<a class="btn btn--ghost" href="https://www.google.com/maps?q=' + e.coords[0] + "," + e.coords[1] + '" target="_blank" rel="noopener">Open map pin<span class="sr-only"> (opens in a new tab)</span></a>' : "") + "</div>";
    }
    h += "</div></div></section>";

    /* highlights */
    if (e.highlights) {
      h += '<section class="section section--surface" aria-labelledby="ev-hl"><div class="edge"></div><div class="wrap"><p class="kicker">Impact</p><h2 id="ev-hl">' + esc(e.highlightsTitle || "Highlights") + '</h2><span class="swash"></span><ul class="ticks" style="max-width:62ch">' +
        e.highlights.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></div></section>";
    }

    /* classes */
    if (e.classes) {
      h += '<section class="section" aria-labelledby="ev-cls"><div class="wrap"><p class="kicker">Competition</p><h2 id="ev-cls">' + esc(e.classesTitle || "Classes") + '</h2><span class="swash"></span><dl class="facts" style="max-width:62ch">' +
        e.classes.map(function (c) { return "<div><dt>" + esc(c[0]) + "</dt><dd>" + esc(c[1]) + "</dd></div>"; }).join("") + "</dl></div></section>";
    }

    /* schedule */
    if (e.schedule) {
      h += '<section class="section section--surface" aria-labelledby="ev-sched"><div class="edge"></div><div class="wrap"><p class="kicker">Programme</p><h2 id="ev-sched">' + esc(e.scheduleTitle || "Schedule") + '</h2><span class="swash"></span><div class="days">' +
        e.schedule.map(function (d) {
          return '<article class="day reveal">' + (d.img ? pic(d.img) : "") + '<div class="day-body"><p class="day-tag"><b>' + esc(d.day) + "</b><span>" + esc(d.date || "") + "</span></p><p>" + esc(d.text) + "</p></div></article>";
        }).join("") + "</div>" + (e.scheduleNote ? '<p class="note">' + esc(e.scheduleNote) + "</p>" : "") + "</div></section>";
    }

    /* objectives + audience */
    if (e.objectives || e.audience) {
      h += '<section class="section section--paper" aria-labelledby="ev-obj"><div class="edge"></div><div class="wrap split">';
      if (e.objectives) h += '<div class="reveal"><p class="kicker">Purpose</p><h2 id="ev-obj">' + esc(e.objectivesTitle || "Objectives") + '</h2><span class="swash"></span><ul class="ticks">' + e.objectives.map(function (o) { return "<li>" + esc(o) + "</li>"; }).join("") + "</ul></div>";
      if (e.audience) h += '<div class="reveal"><p class="kicker">' + esc(e.audience.title) + '</p><div class="stat" style="border:0;padding:0"><span class="stat-n">' + esc(e.audience.stat) + '</span><span class="stat-l">' + esc(e.audience.statLabel) + '</span></div><p style="margin-top:14px">' + esc(e.audience.text) + "</p>" +
        (e.media ? '<h3 style="margin-top:1.4rem">Marketing &amp; media</h3><p>' + esc(e.media) + "</p>" : "") + "</div>";
      h += "</div></section>";
    }

    /* gallery */
    h += '<section class="section" aria-labelledby="ev-gal"><div class="wrap"><p class="kicker">Gallery</p><h2 id="ev-gal">Photos</h2><span class="swash"></span>';
    if (e.gallery && e.gallery.length) {
      h += '<div class="gallery">' + e.gallery.map(function (g) {
        return '<figure class="shot reveal"><button type="button" data-lightbox="' + esc(g.name) + '" aria-label="Enlarge photo: ' + esc(g.alt) + '">' + pic(g) + "</button></figure>";
      }).join("") + "</div>" + (e.galleryNote ? '<p class="note">' + esc(e.galleryNote) + "</p>" : "");
    } else {
      h += '<div class="placeholder"><p><strong>' + esc(e.galleryNote || "Photos coming soon.") + "</strong><br>Have photos from this event? Send them to us on WhatsApp.</p></div>";
    }
    h += "</div></section>";

    /* other events */
    var others = EVENTS.filter(function (x) { return x.slug !== e.slug; });
    if (others.length) {
      h += '<section class="section section--surface" aria-labelledby="ev-more"><div class="edge"></div><div class="wrap"><p class="kicker">More</p><h2 id="ev-more">Other events</h2><span class="swash"></span><div class="grid grid--2">' + others.map(eventCard).join("") + "</div></div></section>";
    }

    /* CTA */
    h += '<section class="cta-band tread" aria-labelledby="ev-cta"><div class="wrap section"><div><h2 id="ev-cta" style="margin-bottom:.2em">Questions? Let\'s talk.</h2><p>Call or message us about ' + esc(e.name) + ", partnerships or rider entries.</p></div>" +
      '<div class="btn-row" style="margin:0"><a class="btn" href="' + waLink("Hello! I have a question about " + e.name + ".") + '" target="_blank" rel="noopener">WhatsApp<span class="sr-only"> (opens in a new tab)</span></a><a class="btn btn--ghost" href="tel:' + ((SITE.phones && SITE.phones[0] && SITE.phones[0].tel) || "") + '">Call us</a></div></div></section>';

    host.innerHTML = h;

    var cd = $("[data-countdown]", host);
    if (cd && !isPast) mountCountdown(cd, e);
    var ib = $("[data-ics]", host);
    if (ib) ib.addEventListener("click", function () {
      var blob = new Blob([icsFor(e)], { type: "text/calendar" }), a = document.createElement("a");
      a.href = URL.createObjectURL(blob); a.download = e.slug + ".ics"; document.body.appendChild(a); a.click(); a.remove();
    });
    initLightbox(host);
  }

  /* ---------- gallery page ---------- */
  function renderGalleryPage() {
    var host = $("[data-gallery]");
    if (!host) return;
    var items = [];
    EVENTS.forEach(function (e) { (e.gallery || []).forEach(function (g) { items.push({ g: g, e: e }); }); });
    host.innerHTML = items.map(function (it) {
      return '<figure class="shot reveal"><button type="button" data-lightbox="' + esc(it.g.name) + '" aria-label="Enlarge photo: ' + esc(it.g.alt) + '">' + pic(it.g) + "</button><figcaption>" + esc(it.e.name) + "</figcaption></figure>";
    }).join("");
    initLightbox(document);
  }

  /* ---------- lightbox ---------- */
  function initLightbox(ctx) {
    var btns = $$("[data-lightbox]", ctx);
    if (!btns.length) return;
    var dlg = $("dialog.lightbox");
    if (!dlg) {
      dlg = document.createElement("dialog");
      dlg.className = "lightbox"; dlg.setAttribute("aria-label", "Photo viewer");
      dlg.innerHTML = '<div class="lb-inner"><img alt=""><p class="lb-cap"></p></div>' +
        '<button type="button" class="lb-close" aria-label="Close photo">&times;</button>' +
        '<button type="button" class="lb-nav lb-prev" aria-label="Previous photo">&lsaquo;</button>' +
        '<button type="button" class="lb-nav lb-next" aria-label="Next photo">&rsaquo;</button>';
      document.body.appendChild(dlg);
      dlg.addEventListener("click", function (ev) { if (ev.target === dlg || ev.target.classList.contains("lb-inner")) dlg.close(); });
      $(".lb-close", dlg).addEventListener("click", function () { dlg.close(); });
      dlg.addEventListener("close", function () { if (dlg._opener) dlg._opener.focus(); });
    }
    var all = $$("[data-lightbox]"), idx = 0;
    function show(i) {
      idx = (i + all.length) % all.length;
      var b = all[idx], im = $("img", b);
      var li = $("img", dlg);
      li.src = im.currentSrc || im.src; li.alt = im.alt;
      $(".lb-cap", dlg).textContent = im.alt;
      dlg._opener = b;
    }
    btns.forEach(function (b) {
      b.addEventListener("click", function () {
        show(all.indexOf(b));
        if (typeof dlg.showModal === "function") dlg.showModal(); else dlg.setAttribute("open", "");
      });
    });
    $(".lb-prev", dlg).onclick = function () { show(idx - 1); };
    $(".lb-next", dlg).onclick = function () { show(idx + 1); };
    dlg.onkeydown = function (ev) {
      if (ev.key === "ArrowLeft") show(idx - 1);
      if (ev.key === "ArrowRight") show(idx + 1);
    };
  }

  /* ---------- contact form (no backend: opens WhatsApp or mailto) ---------- */
  function initForm() {
    var f = $("#contact-form");
    if (!f) return;
    var status = $("#form-status"), params = new URLSearchParams(location.search);
    var topic = params.get("topic"), evName = params.get("event");
    var sel = f.elements.topic;
    var map = { sponsor: "Sponsorship / partnership", event: "An event", camp: "Camping", ride: "Bike rides", updates: "Get event updates" };
    if (topic && map[topic]) sel.value = map[topic];
    if (evName && !f.elements.message.value) f.elements.message.value = "Hello! I would like to know more about " + evName + ".";
    if (!SITE.email) { var mb = $("#send-mail"); if (mb) mb.hidden = true; }
    function compose() {
      var d = f.elements;
      return "Hello " + SITE.brand + "!\n\nName: " + d.name.value.trim() + "\nContact: " + (d.contact.value.trim() || "-") + "\nTopic: " + d.topic.value + "\n\n" + d.message.value.trim();
    }
    function valid() {
      if (!f.checkValidity()) { f.reportValidity(); return false; }
      return true;
    }
    f.addEventListener("submit", function (ev) {
      ev.preventDefault();
      if (!valid()) return;
      window.open(waLink(compose()), "_blank", "noopener");
      status.textContent = "Opening WhatsApp with your message. Just press send there.";
    });
    var mb2 = $("#send-mail");
    if (mb2) mb2.addEventListener("click", function () {
      if (!valid()) return;
      location.href = "mailto:" + SITE.email + "?subject=" + encodeURIComponent("Enquiry from " + f.elements.name.value.trim() + " (" + f.elements.topic.value + ")") + "&body=" + encodeURIComponent(compose());
      status.textContent = "Opening your email app.";
    });
  }

  /* ---------- reveal on scroll ---------- */
  function initReveal() {
    var els = $$(".reveal:not(.in)");
    if (!("IntersectionObserver" in window)) { els.forEach(function (e) { e.classList.add("in"); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (e) { io.observe(e); });
    /* safety net: never leave content hidden */
    setTimeout(function () { els.forEach(function (e) { e.classList.add("in"); }); }, 2500);
  }

  /* ---------- boot ---------- */
  renderHeader();
  renderFooter();
  renderNextEvent();
  renderCards();
  renderPastStats();
  renderEventPage();
  renderGalleryPage();
  initTabs();
  initForm();
  applyConfig();
  initReveal();
})();
