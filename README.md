# eikon studio website

The website for **eikon studio**, a digital marketing agency. Live at **https://eikonstudio.in** (hosted free on GitHub Pages).

## What's in this folder

| Folder / file | What it is |
|---|---|
| `index.html` | Home page |
| `work/`, `services/`, `creator-network/`, `about/`, `contact/` | The other pages |
| `assets/img/work/` | Portfolio photos |
| `assets/video/` | Portfolio reels |
| `assets/img/cat/` | eikon cat mascot poses |
| `assets/js/projects.js` | **The portfolio list.** Edit this to add, remove or reword work |
| `assets/css/style.css` | Colours, fonts and layout |
| `CNAME` | Tells GitHub to use the domain eikonstudio.in. Don't delete it |
| `_src/` | Page templates. After changing these, run `python _src/build.py` to rebuild the pages |

## Adding new portfolio work

1. Put the photo in `assets/img/work/` (or the video in `assets/video/`).
2. Open `assets/js/projects.js`, copy one of the existing blocks and change the title, category, file names and description.
3. To fill a "Coming soon" category (Product or Graphics), add real work with that category and delete its "Coming soon" line at the bottom of the file.
4. In GitHub Desktop, write a short note, click **Commit to main**, then **Push origin**. The site updates within a minute or two.

## Contact form

Enquiries are delivered to **hello@eikonstudio.in** through FormSubmit (formsubmit.co), a free form service.
The very first enquiry sends an **"Activate Form"** email to that inbox. Click it once and every enquiry after that arrives as a normal email.
Each form also has a **Send on WhatsApp** button that works straight away.
