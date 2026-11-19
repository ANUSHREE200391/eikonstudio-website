"""
eikon studio — page builder.

Each page body lives in _src/pages/<name>.html. This script wraps every body
with the shared <head>, header and footer and writes the final static pages.
Run:  python _src/build.py
"""
import os, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "_src", "pages")
SITE = "https://eikonstudio.in"

PAGES = [
    # file in _src/pages, output path, nav key, <title>, meta description
    ("home", "index.html", "home",
     "eikon studio | Digital Marketing Agency, We Make Brands Stand Out",
     "eikon studio is a digital marketing agency for social media, content production, Meta ads, digital business setup and creator collaborations."),
    ("work", "work/index.html", "work",
     "Our Work | eikon studio",
     "Jewellery, fashion and food photography, reels and creative work by eikon studio, a digital marketing agency."),
    ("services", "services/index.html", "services",
     "Services | eikon studio",
     "Social media management, performance marketing and Meta ads, content production, digital business setup, influencer marketing and a creator network."),
    ("creator-network", "creator-network/index.html", "creator-network",
     "Creator Network | eikon studio",
     "The right creators. The right audience. eikon studio connects brands with relevant creators and coordinates collaborations end to end."),
    ("about", "about/index.html", "about",
     "About | eikon studio",
     "eikon studio is a digital marketing agency combining content, strategy, advertising and creator collaborations."),
    ("contact", "contact/index.html", "contact",
     "Contact | eikon studio",
     "Start a project with eikon studio. Send an enquiry, email hello@eikonstudio.in or message us on WhatsApp."),
    ("404", "404.html", "",
     "Page not found | eikon studio",
     "This page wandered off. Head back to eikon studio."),
]

NAV = [
    ("home", "Home", ""),
    ("work", "Our Work", "work/"),
    ("services", "Services", "services/"),
    ("creator-network", "Creator Network", "creator-network/"),
    ("about", "About", "about/"),
]

ICONS = {
    "mail": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    "whatsapp": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M20 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20l1.2-4.2A8.5 8.5 0 1 1 20 11.5Z"/><path d="M9 8.5c0 3.5 2.5 6.5 6.5 6.5l1-1.5-2-1-1 .8c-1-.5-2-1.5-2.5-2.5l.8-1-1-2L9 8.5Z" stroke-width="1.5"/></svg>',
    "instagram": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
    "facebook": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8Z"/></svg>',
}

CONTACT = {
    "email": "hello@eikonstudio.in",
    "wa": "https://wa.me/919062883144",
    "wa_label": "+91 90628 83144",
    "ig": "https://www.instagram.com/eikon_studios_stories/",
    "fb": "https://www.facebook.com/share/1A7EmL7HiE/",
}


def head(b, title, desc, canonical):
    return f"""<!doctype html>
<html lang="en-IN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<meta name="description" content="{desc}">
<link rel="canonical" href="{canonical}">
<meta name="theme-color" content="#171217">
<meta property="og:type" content="website">
<meta property="og:site_name" content="eikon studio">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{desc}">
<meta property="og:url" content="{canonical}">
<meta property="og:image" content="{SITE}/assets/img/og-cat.png">
<meta name="twitter:card" content="summary">
<link rel="icon" href="{b}favicon.ico" sizes="any">
<link rel="icon" type="image/png" href="{b}favicon.png">
<link rel="apple-touch-icon" href="{b}apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..900&family=Inter:wght@400;500;600;700&display=swap">
<link rel="stylesheet" href="{b}assets/css/style.css">
<script>document.documentElement.classList.add("js")</script>
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>
"""


def header(b, active):
    items = []
    for key, label, href in NAV:
        cur = ' aria-current="page"' if key == active else ""
        items.append(f'<li><a href="{b}{href or "./"}"{cur}>{label}</a></li>')
    cur = ' aria-current="page"' if active == "contact" else ""
    items.append(f'<li class="nav-cta"><a href="{b}contact/"{cur}>Contact</a></li>')
    home = b or "./"
    return f"""<header class="site-header">
  <div class="wrap">
    <a class="wordmark" href="{home}" aria-label="eikon studio, home">
      <img src="{b}assets/img/cat/cat-head.webp" alt="" width="38" height="38">
      <span>eikon studio<span class="dot">.</span></span>
    </a>
    <div class="header-actions">
      <a class="header-contact" href="{b}contact/">Contact</a>
      <button class="menu-btn" type="button" aria-expanded="false" aria-controls="site-nav">
        <span class="bars" aria-hidden="true"></span><span class="menu-label">Menu</span>
      </button>
    </div>
    <nav class="site-nav" id="site-nav" aria-label="Main">
      <ul class="nav-list">
        {chr(10).join("        " + i for i in items).strip()}
      </ul>
    </nav>
  </div>
</header>
"""


def footer(b, scripts):
    nav = "\n".join(f'          <li><a href="{b}{h or "./"}">{l}</a></li>' for _, l, h in NAV)
    s = "\n".join(f'<script src="{b}{x}" defer></script>' for x in scripts)
    return f"""<footer class="site-footer">
  <div class="wrap">
    <p class="foot-big" aria-hidden="true"><span>eikon</span> <span class="nw">studio<span class="dot">.</span></span><img class="peek" src="{b}assets/img/cat/cat-head.webp" alt="" width="120" height="120" loading="lazy"></p>
    <div class="foot-grid">
      <div>
        <h2>Digital marketing agency</h2>
        <p>Social media. Content. Advertising. Digital growth. We make brands stand out.</p>
        <a class="btn btn-pink" href="{b}contact/">Contact us <span class="arrow" aria-hidden="true">→</span></a>
      </div>
      <div>
        <h2>Explore</h2>
        <ul>
{nav}
          <li><a href="{b}contact/">Contact</a></li>
        </ul>
      </div>
      <div>
        <h2>Say hello</h2>
        <ul>
          <li><a href="mailto:{CONTACT['email']}">{CONTACT['email']}</a></li>
          <li><a href="{CONTACT['wa']}" target="_blank" rel="noopener">WhatsApp {CONTACT['wa_label']}</a></li>
          <li><a href="{CONTACT['ig']}" target="_blank" rel="noopener">Instagram</a></li>
          <li><a href="{CONTACT['fb']}" target="_blank" rel="noopener">Facebook</a></li>
        </ul>
      </div>
    </div>
    <div class="foot-bottom">
      <span>© <span data-year>2026</span> eikon studio. All rights reserved.</span>
      <span>Make it simple. Make it memorable.</span>
    </div>
  </div>
</footer>
<script src="{b}assets/js/main.js" defer></script>
{s}
</body>
</html>
"""


def fill(body, b):
    body = body.replace("{{B}}", b)
    for k, v in CONTACT.items():
        body = body.replace("{{" + k + "}}", v)
    for k, v in ICONS.items():
        body = body.replace("{{icon:" + k + "}}", v)
    left = re.findall(r"\{\{[^}]+\}\}", body)
    if left:
        raise SystemExit(f"Unfilled placeholders: {set(left)}")
    return body


def main():
    for name, out, key, title, desc in PAGES:
        depth = out.count("/")
        b = "../" * depth
        if name == "404":
            b = "/"  # 404 is served from any path, so use root-absolute links
        canonical = SITE + "/" + (out[:-len("index.html")] if out.endswith("index.html") else out)
        with open(os.path.join(SRC, name + ".html"), encoding="utf-8") as f:
            body = f.read()
        scripts = ["assets/js/projects.js", "assets/js/work.js"] if name == "work" else []
        html = head(b, title, desc, canonical) + header(b, key) + fill(body, b) + footer(b, scripts)
        path = os.path.join(ROOT, out)
        os.makedirs(os.path.dirname(path) or ROOT, exist_ok=True)
        with open(path, "w", encoding="utf-8", newline="\n") as f:
            f.write(html)
        print("built", out)


if __name__ == "__main__":
    main()
