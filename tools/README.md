# Local Production Helper Tools

These tools support the P4.5 Local Production Pipeline for Magic Creature Card Maker.

They are local desktop helpers for the production workflow after ChatGPT or another image generator has created activity-page images. They are not web-app features.

Generated images and generated PDFs should live outside this GitHub repo.

---

## Recommended Workspace

Recommended sibling folders:

```text
Imagination-play-guide/       repo
Imagination-play-images/      local-only image workspace
```

Inside `Imagination-play-images`:

```text
Imagination-play-images/
  _incoming/
  _rename_manifests/
  creatures/
  pdf-output/
  README.md
```

Per creature:

```text
creatures/[creature_slug]/
  source_images/
  renamed_pages/
  pdf/
```

- `_incoming/` is for raw downloads.
- `_rename_manifests/` is for future rename manifests.
- `creatures/` is for per-creature production folders.
- `pdf-output/` is for finished PDFs.
- `source_images/` is for original downloaded images for one creature.
- `renamed_pages/` is for future page-numbered files.
- `pdf/` is for creature-specific PDFs.

---

## Setup

The PDF helper uses Pillow:

```powershell
python -m pip install Pillow
```

This installs a local Python dependency only. It does not add package or build tooling to the web app.

---

## Windows Examples

Initialize a workspace beside the repo:

```powershell
python .\tools\init_image_workspace.py "..\Imagination-play-images"
```

Create a creature folder:

```powershell
python .\tools\init_image_workspace.py "..\Imagination-play-images" --creature "Amor"
```

Make a PDF from a creature's `source_images` folder:

```powershell
python .\tools\make_activity_book_pdf.py "..\Imagination-play-images\creatures\amor\source_images" "..\Imagination-play-images\creatures\amor\pdf\amor_activity_book.pdf"
```

Make a PDF sorted by modified time:

```powershell
python .\tools\make_activity_book_pdf.py "..\Imagination-play-images\creatures\amor\source_images" "..\Imagination-play-images\creatures\amor\pdf\amor_activity_book.pdf" --sort modified
```

---

## macOS / Linux Examples

Initialize a workspace beside the repo:

```bash
python3 tools/init_image_workspace.py "../Imagination-play-images"
```

Create a creature folder:

```bash
python3 tools/init_image_workspace.py "../Imagination-play-images" --creature "Amor"
```

Make a PDF from a creature's `source_images` folder:

```bash
python3 tools/make_activity_book_pdf.py "../Imagination-play-images/creatures/amor/source_images" "../Imagination-play-images/creatures/amor/pdf/amor_activity_book.pdf"
```

Make a PDF sorted by modified time:

```bash
python3 tools/make_activity_book_pdf.py "../Imagination-play-images/creatures/amor/source_images" "../Imagination-play-images/creatures/amor/pdf/amor_activity_book.pdf" --sort modified
```

---

## Ordering

Files are sorted alphabetically by filename by default.

Use modified-time sorting if images were downloaded in page order:

```text
--sort modified
```

Ordering may be imperfect until the rename/manifest workflow is implemented. The next likely P4.5 work package is renaming downloaded images from a manifest so page order is explicit and reliable.

---

## Supported Images

The PDF helper includes:

- PNG
- JPG
- JPEG
- WEBP, if supported by the installed Pillow build

Non-image files are ignored.

---

## What These Tools Do Not Do

- They do not change the web app.
- They do not upload images.
- They do not call ChatGPT or any AI API.
- They do not print directly.
- They do not generate PDFs in the browser.
- They do not manage generated image storage inside the repo.

