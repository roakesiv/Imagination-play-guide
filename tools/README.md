# Local Production Helper Tools

These tools support the P4.5 Local Production Pipeline for Magic Creature Card Maker.

They are local desktop helpers for the production workflow after ChatGPT or another image generator has created activity-page images. They are not web-app features.

Generated images and generated PDFs should live outside this GitHub repo.

---

## Recommended Workspace

Recommended sibling folders:

```text
01 - Imagination-play-guide/  repo
02 - Activity Book/           local-only activity page workspace
```

Inside `02 - Activity Book`:

```text
02 - Activity Book/
  01_PDF Engine/
    Source Pages/
    PDF Output/
  02_Finished_Library/
    [Creature_name]/
      Source Pages/
      [creature_name]_activity_book.pdf
  00_archive/
```

- `01_PDF Engine/Source Pages/` is the temporary drop zone for the next PDF run.
- `01_PDF Engine/PDF Output/` is the temporary output area for a generated PDF.
- `02_Finished_Library/[Creature_name]/` stores finished source images and the printable PDF for one creature.
- `00_archive/` stores old tests or retired workspace experiments.

Generated images and PDFs should stay outside the repo. The repo includes `.gitignore` protection for common accidental local production folders and generated PDFs.

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
python .\tools\init_image_workspace.py "..\02 - Activity Book"
```

Create a creature folder:

```powershell
python .\tools\init_image_workspace.py "..\02 - Activity Book" --creature "Amor"
```

Make a PDF from a creature's `source_images` folder:

```powershell
python .\tools\make_activity_book_pdf.py "..\02 - Activity Book\01_PDF Engine\Source Pages" "..\02 - Activity Book\01_PDF Engine\PDF Output\activity_book.pdf"
```

Make a PDF sorted by modified time:

```powershell
python .\tools\make_activity_book_pdf.py "..\02 - Activity Book\01_PDF Engine\Source Pages" "..\02 - Activity Book\01_PDF Engine\PDF Output\activity_book.pdf" --sort modified
```

Preview importing the latest 10 ChatGPT PNG downloads for Amor:

```powershell
python .\tools\import_chatgpt_pages.py --creature "Amor" --count 10
```

Move and rename those files into the creature workspace:

```powershell
python .\tools\import_chatgpt_pages.py --creature "Amor" --count 10 --move --apply
```

This sorts the newest matching `ChatGPT*.png` files by modified time, oldest first, and names them:

```text
amor_01.png
amor_02.png
amor_03.png
...
```

Use `--output-folder` if you want the renamed files to go directly into another input folder, such as a PDF engine source-pages folder.

Make a PDF with a custom page margin:

```powershell
python .\tools\make_activity_book_pdf.py "..\02 - Activity Book\01_PDF Engine\Source Pages" "..\02 - Activity Book\01_PDF Engine\PDF Output\activity_book.pdf" --margin-inches 0.35
```

---

## macOS / Linux Examples

Initialize a workspace beside the repo:

```bash
python3 tools/init_image_workspace.py "../02 - Activity Book"
```

Create a creature folder:

```bash
python3 tools/init_image_workspace.py "../02 - Activity Book" --creature "Amor"
```

Make a PDF from a creature's `source_images` folder:

```bash
python3 tools/make_activity_book_pdf.py "../02 - Activity Book/01_PDF Engine/Source Pages" "../02 - Activity Book/01_PDF Engine/PDF Output/activity_book.pdf"
```

Make a PDF sorted by modified time:

```bash
python3 tools/make_activity_book_pdf.py "../02 - Activity Book/01_PDF Engine/Source Pages" "../02 - Activity Book/01_PDF Engine/PDF Output/activity_book.pdf" --sort modified
```

Make a PDF with a custom page margin:

```bash
python3 tools/make_activity_book_pdf.py "../02 - Activity Book/01_PDF Engine/Source Pages" "../02 - Activity Book/01_PDF Engine/PDF Output/activity_book.pdf" --margin-inches 0.35
```

---

## Page Fit

The PDF helper creates US Letter pages at 300 DPI and scales each image to fill as much of the printable area as possible while preserving the image aspect ratio.

The default margin is `0.25` inches on every side. Use `--margin-inches` to make the image area smaller or larger.

---

## Ordering

Files are sorted alphabetically by filename by default.

Use modified-time sorting if images were downloaded in page order:

```text
--sort modified
```

Ordering may be imperfect until a future rename/manifest workflow is implemented. For now, page-numbered filenames are the simplest reliable path.

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
