/* eikon studio — portfolio grid, filters and project viewer */
(function () {
  "use strict";
  var grid = document.getElementById("work-grid");
  var bar = document.getElementById("filters");
  if (!grid || !bar) return;

  var base = grid.getAttribute("data-base") || "";
  var projects = window.EIKON_PROJECTS || [];
  var cats = window.EIKON_CATEGORIES || [];
  var labels = {};
  cats.forEach(function (c) { labels[c.id] = c.label; });
  labels.food = "Food & Cafés";
  labels.graphics = "Graphic Design";

  function inFilter(p, f) {
    if (f === "all") return true;
    if (f === "reels") return p.type === "reel";
    return p.category === f;
  }
  function count(f) { return projects.filter(function (p) { return p.type !== "soon" && inFilter(p, f); }).length; }

  /* ---------- filter buttons ---------- */
  cats.forEach(function (c) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "filter";
    b.setAttribute("data-filter", c.id);
    b.setAttribute("aria-pressed", "false");
    var n = count(c.id);
    b.innerHTML = c.label + (n ? '<span class="count">' + n + "</span>" : '<span class="count">soon</span>');
    b.addEventListener("click", function () { apply(c.id, true); });
    bar.appendChild(b);
  });

  /* ---------- tiles ---------- */
  var tiles = projects.map(function (p, i) {
    var el;
    if (p.type === "soon") {
      el = document.createElement("div");
      el.className = "tile is-soon";
      el.innerHTML =
        '<div class="soon"><img class="pose" src="' + base + p.pose + '" alt="" loading="lazy" width="250" height="215">' +
        '<span class="soon-badge">Coming soon</span>' +
        '<span style="font-weight:600">' + p.title + "</span></div>";
    } else {
      el = document.createElement("button");
      el.type = "button";
      el.className = "tile" + (p.size ? " " + p.size : "");
      el.setAttribute("aria-label", "Open project: " + p.title);
      el.innerHTML =
        '<img src="' + base + p.thumb + '" alt="' + p.alt.replace(/"/g, "&quot;") + '" loading="lazy">' +
        '<span class="fmt">' + (p.type === "reel" ? "Reel" : "Photo") + "</span>" +
        (p.type === "reel" ? '<span class="play" aria-hidden="true"></span>' : "") +
        '<span class="meta"><span class="cat">' + labels[p.category] + "</span><h3>" + p.title + "</h3></span>";
      el.addEventListener("click", function () { openViewer(i); });
    }
    el._project = p;
    grid.appendChild(el);
    return el;
  });

  var empty = document.getElementById("work-empty");
  var current = "all";

  function apply(f, push) {
    if (!labels[f]) f = "all";
    current = f;
    bar.querySelectorAll(".filter").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-filter") === f));
    });
    var shown = 0;
    tiles.forEach(function (t) {
      var p = t._project;
      var show = p.type === "soon" ? (f === "all" || f === p.category) : inFilter(p, f);
      t.hidden = !show;
      if (show) shown++;
    });
    if (empty) empty.hidden = shown > 0;
    var status = document.getElementById("filter-status");
    if (status) status.textContent = "Showing " + (f === "all" ? "all work" : labels[f]);
    if (push && history.replaceState) {
      var url = new URL(location.href);
      if (f === "all") url.searchParams.delete("filter"); else url.searchParams.set("filter", f);
      history.replaceState(null, "", url);
    }
  }

  /* ---------- viewer ---------- */
  var dlg = document.getElementById("lightbox");
  var media = dlg.querySelector(".lb-media");
  var tCat = dlg.querySelector(".cat");
  var tTitle = dlg.querySelector("h2");
  var tDesc = dlg.querySelector(".lb-desc");
  var tCount = dlg.querySelector(".lb-count");
  var list = [], pos = 0;

  function render() {
    var p = projects[list[pos]];
    media.innerHTML = "";
    if (p.type === "reel") {
      var v = document.createElement("video");
      v.src = base + p.video; v.poster = base + p.thumb;
      v.controls = true; v.playsInline = true; v.preload = "metadata";
      v.setAttribute("aria-label", p.alt);
      media.appendChild(v);
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        v.muted = false;
        var pr = v.play(); if (pr && pr.catch) pr.catch(function () {});
      }
    } else {
      var img = document.createElement("img");
      img.src = base + p.image; img.alt = p.alt;
      media.appendChild(img);
    }
    tCat.textContent = labels[p.category] + " · " + (p.type === "reel" ? "Reel" : "Photo");
    tTitle.textContent = p.title;
    tDesc.textContent = p.description;
    tCount.textContent = (pos + 1) + " / " + list.length;
  }
  function openViewer(i) {
    list = [];
    projects.forEach(function (p, k) { if (p.type !== "soon" && inFilter(p, current)) list.push(k); });
    pos = Math.max(0, list.indexOf(i));
    render();
    if (dlg.showModal) dlg.showModal(); else dlg.setAttribute("open", "");
    document.body.style.overflow = "hidden";
  }
  function step(d) { pos = (pos + d + list.length) % list.length; render(); }
  function close() { if (dlg.close) dlg.close(); else dlg.removeAttribute("open"); }

  dlg.addEventListener("close", function () { media.innerHTML = ""; document.body.style.overflow = ""; });
  dlg.querySelector("[data-prev]").addEventListener("click", function () { step(-1); });
  dlg.querySelector("[data-next]").addEventListener("click", function () { step(1); });
  dlg.querySelector("[data-close]").addEventListener("click", close);
  dlg.addEventListener("click", function (e) { if (e.target === dlg) close(); });
  dlg.addEventListener("keydown", function (e) {
    if (e.target.tagName === "VIDEO") return;
    if (e.key === "ArrowRight") step(1);
    if (e.key === "ArrowLeft") step(-1);
  });

  var start = new URLSearchParams(location.search).get("filter") || "all";
  apply(start, false);
})();
