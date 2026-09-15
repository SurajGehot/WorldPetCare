# World Pet Care

A cleaned-up, completed version of the World Pet Care landing page.

## What changed from the original

- **Fixed broken/incomplete markup**: empty `href=""` links, a mistyped
  filename (`1 (1).jpg`), a typo ("VITERINERY"), and duplicate stray
  `image.html` test file were all removed or corrected.
- **Finished the site**, section by section, using the same nav labels
  as the original (Home, About, Services, Shop, Appointment, Contact):
  - Hero, "Why Choose Us," and the 3 service cards were kept and polished.
  - Added a real **About** section, **Shop** preview, working
    **Appointment** booking form (the original `.appoint` div was empty),
    a **Contact** section with a message form, and a full **footer**
    (none existed before).
  - Added a mobile nav menu, smooth-scroll + scroll-spy active links,
    a working service search box, a "Book this service" shortcut that
    pre-fills the appointment form, and a simple Log In / Sign Up modal.
- **Kept the original color palette and layout language**: cream nav
  (`#FFF7D7`), olive green brand color (`#688104`), teal/cyan accents,
  the same hero → "why choose us" → service cards structure.
- Reorganized files into `css/`, `js/`, and `images/` folders, gave
  images descriptive names, and wrote semantic, accessible HTML
  (labels, `aria-` attributes, focus states, `alt` text).

## Structure

```
WorldPetCare/
├── index.html
├── css/style.css
├── js/main.js
├── images/
└── README.md
```

## Running it

No build step needed — just open `index.html` in a browser, or serve
the folder with any static server, e.g.:

```
npx serve .
```

## Notes for whoever wires up the backend

The **Appointment** and **Contact** forms, and the **Log In / Sign Up**
modal, currently validate input and show a success message on the
front end only — there's no server behind them yet. To make them real:

- Point `appointmentForm` and `queryForm` at your booking/email API
  (or a service like Formspree) instead of the `preventDefault()` stub
  in `js/main.js`.
- Replace the demo Log In / Sign Up forms with real authentication.
- The "Shop" section is a preview with a "coming soon" message — wire
  it up to a product catalog when the store is ready.
