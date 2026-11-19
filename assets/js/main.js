/* eikon studio — shared behaviour for every page */
(function () {
  "use strict";

  var CONTACT = {
    email: "hello@eikonstudio.in",
    whatsapp: "919062883144",
    // Form delivery service (FormSubmit). The first submission sends an
    // activation email to the inbox above — click "Activate" once.
    formEndpoint: "https://formsubmit.co/ajax/hello@eikonstudio.in"
  };
  window.EIKON_CONTACT = CONTACT;

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- mobile menu ---------- */
  var menuBtn = document.querySelector(".menu-btn");
  var nav = document.getElementById("site-nav");
  if (menuBtn && nav) {
    var setOpen = function (open) {
      menuBtn.setAttribute("aria-expanded", String(open));
      menuBtn.querySelector(".menu-label").textContent = open ? "Close" : "Menu";
      nav.classList.toggle("open", open);
      document.body.classList.toggle("nav-open", open);
    };
    menuBtn.addEventListener("click", function () {
      setOpen(menuBtn.getAttribute("aria-expanded") !== "true");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) { setOpen(false); menuBtn.focus(); }
    });
    nav.addEventListener("click", function (e) { if (e.target.closest("a")) setOpen(false); });
    window.addEventListener("resize", function () { if (window.innerWidth > 960) setOpen(false); });
  }

  /* ---------- reveal on scroll ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- mascot reactions ---------- */
  var lines = [
    "Hi, I'm eikon cat. Click me again.",
    "Make it simple. Make it memorable.",
    "Scroll-stopping content? That's my thing.",
    "Shoot. Create. Promote. Repeat.",
    "Psst, the work is one click away.",
    "Brands that stand out get remembered."
  ];
  document.querySelectorAll(".mascot").forEach(function (m) {
    var bubble = m.querySelector(".speech");
    var i = 0, timer;
    m.addEventListener("click", function () {
      i = (i + 1) % lines.length;
      if (bubble) bubble.textContent = lines[i];
      m.classList.remove("bump");
      void m.offsetWidth;
      if (!reduceMotion) m.classList.add("bump");
      m.classList.add("talk");
      clearTimeout(timer);
      timer = setTimeout(function () { m.classList.remove("talk"); }, 3200);
    });
  });

  /* ---------- footer year ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---------- forms ---------- */
  var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function validate(form) {
    var firstBad = null;
    form.querySelectorAll("[required]").forEach(function (input) {
      var field = input.closest(".field");
      var v = (input.value || "").trim();
      var ok = v.length > 0;
      if (ok && input.type === "email") ok = emailRe.test(v);
      if (field) field.classList.toggle("invalid", !ok);
      input.setAttribute("aria-invalid", String(!ok));
      if (!ok && !firstBad) firstBad = input;
    });
    if (firstBad) firstBad.focus();
    return !firstBad;
  }

  function collect(form) {
    var data = {};
    new FormData(form).forEach(function (v, k) { data[k] = typeof v === "string" ? v.trim() : v; });
    return data;
  }

  function showStatus(form, kind, html, noFocus) {
    var box = form.querySelector(".form-status");
    if (!box) return;
    box.className = "form-status show " + kind;
    box.innerHTML = html;
    box.setAttribute("tabindex", "-1");
    if (!noFocus) box.focus({ preventScroll: false });
  }

  function whatsappText(data) {
    var skip = { _subject: 1, _template: 1, _captcha: 1, _honey: 1, form: 1 };
    var parts = ["Hi eikon studio! I'd like to enquire."];
    Object.keys(data).forEach(function (k) {
      if (skip[k] || !data[k]) return;
      parts.push(k.replace(/_/g, " ").replace(/^\w/, function (c) { return c.toUpperCase(); }) + ": " + data[k]);
    });
    return "https://wa.me/" + CONTACT.whatsapp + "?text=" + encodeURIComponent(parts.join("\n"));
  }

  document.querySelectorAll("form[data-enquiry]").forEach(function (form) {
    form.setAttribute("novalidate", "");

    form.querySelectorAll("[required]").forEach(function (input) {
      input.addEventListener("input", function () {
        var field = input.closest(".field");
        if (field && field.classList.contains("invalid")) {
          var v = input.value.trim();
          var ok = v.length > 0 && (input.type !== "email" || emailRe.test(v));
          field.classList.toggle("invalid", !ok);
          input.setAttribute("aria-invalid", String(!ok));
        }
      });
    });

    var waBtn = form.querySelector("[data-whatsapp]");
    if (waBtn) {
      waBtn.addEventListener("click", function () {
        if (!validate(form)) return;
        window.open(whatsappText(collect(form)), "_blank", "noopener");
      });
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validate(form)) {
        showStatus(form, "err", "Please fill in the highlighted fields.", true);
        return;
      }
      var data = collect(form);
      if (data._honey) return; // bot
      var btn = form.querySelector("button[type=submit]");
      btn.disabled = true; btn.classList.add("loading");

      fetch(CONTACT.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(data)
      })
        .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return { ok: r.ok, body: j }; }); })
        .then(function (res) {
          var success = res.ok && String(res.body.success) === "true";
          if (success) {
            form.reset();
            showStatus(form, "ok", "<strong>Thank you, your enquiry has been sent.</strong> We'll get back to you at the email you shared. For anything urgent, <a href=\"" + whatsappText({}) + "\" target=\"_blank\" rel=\"noopener\">message us on WhatsApp</a>.");
          } else {
            throw new Error(res.body && res.body.message || "Not sent");
          }
        })
        .catch(function () {
          showStatus(form, "err",
            "<strong>Sorry, your enquiry didn't go through.</strong> Nothing was sent. Please try again, or reach us directly: " +
            "<a href=\"mailto:" + CONTACT.email + "\">" + CONTACT.email + "</a> · " +
            "<a href=\"" + whatsappText(data) + "\" target=\"_blank\" rel=\"noopener\">WhatsApp</a>.");
        })
        .then(function () { btn.disabled = false; btn.classList.remove("loading"); });
    });
  });

  /* ---------- creator network pathways ---------- */
  var pathBtns = document.querySelectorAll("[data-path]");
  pathBtns.forEach(function (b) {
    b.addEventListener("click", function () {
      var id = b.getAttribute("data-path");
      document.querySelectorAll(".form-panel").forEach(function (p) {
        var on = p.id === id;
        p.classList.toggle("active", on);
        p.hidden = !on;
      });
      pathBtns.forEach(function (x) { x.setAttribute("aria-expanded", String(x === b)); });
      var panel = document.getElementById(id);
      if (panel) {
        panel.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
        var first = panel.querySelector("input, select, textarea");
        if (first) setTimeout(function () { first.focus({ preventScroll: true }); }, reduceMotion ? 0 : 450);
      }
    });
  });
  // open a pathway from the URL, e.g. creator-network/#creator-form
  if (location.hash) {
    var target = document.querySelector('[data-path="' + location.hash.slice(1) + '"]');
    if (target) target.click();
  }

  /* ---------- service dropdown preselect, e.g. contact/?service=... ---------- */
  var params = new URLSearchParams(location.search);
  var svc = params.get("service");
  var sel = document.getElementById("c-service");
  if (svc && sel) {
    Array.prototype.forEach.call(sel.options, function (o) { if (o.value === svc) sel.value = svc; });
  }
})();
