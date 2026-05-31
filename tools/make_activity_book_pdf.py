#!/usr/bin/env python3
"""Create one printable PDF from a folder of activity-page images."""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

try:
    from PIL import Image, ImageOps, UnidentifiedImageError
except ImportError:  # pragma: no cover - exercised manually when Pillow is absent.
    print("Error: Pillow is required. Install it with: python -m pip install Pillow")
    raise SystemExit(1)


SUPPORTED_EXTENSIONS = {".png", ".jpg", ".jpeg", ".webp"}
LETTER_SIZE_PIXELS = (2550, 3300)
PDF_RESOLUTION_DPI = 300


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Combine a folder of activity-page images into one printable PDF."
    )
    parser.add_argument("input_folder", help="Folder containing PNG, JPG, JPEG, or WEBP images.")
    parser.add_argument(
        "output_pdf",
        nargs="?",
        help="Optional output PDF path. Defaults to a name based on the input folder.",
    )
    parser.add_argument(
        "--sort",
        choices=["name", "modified"],
        default="name",
        help="Sort images by filename or modified time. Default: name.",
    )
    return parser.parse_args()


def image_files(input_folder: Path, sort_mode: str) -> list[Path]:
    files = [
        path
        for path in input_folder.iterdir()
        if path.is_file() and path.suffix.lower() in SUPPORTED_EXTENSIONS
    ]

    if sort_mode == "modified":
        return sorted(files, key=lambda path: (path.stat().st_mtime, path.name.lower()))

    return sorted(files, key=lambda path: path.name.lower())


def default_output_path(input_folder: Path) -> Path:
    safe_name = input_folder.name.strip() or "activity_book"
    return input_folder.parent / f"{safe_name}_activity_book.pdf"


def fit_image_to_letter_page(image_path: Path) -> Image.Image:
    try:
        with Image.open(image_path) as image:
            image = ImageOps.exif_transpose(image)
            image.thumbnail(LETTER_SIZE_PIXELS, Image.Resampling.LANCZOS)
            page = Image.new("RGB", LETTER_SIZE_PIXELS, "white")
            image = image.convert("RGB")
            x = (LETTER_SIZE_PIXELS[0] - image.width) // 2
            y = (LETTER_SIZE_PIXELS[1] - image.height) // 2
            page.paste(image, (x, y))
            return page
    except UnidentifiedImageError as error:
        raise ValueError(f"image cannot be opened: {image_path}") from error
    except OSError as error:
        raise ValueError(f"image cannot be opened: {image_path} ({error})") from error


def ensure_output_writable(output_pdf: Path) -> None:
    parent = output_pdf.parent
    if not parent.exists():
        raise ValueError(f"output folder does not exist: {parent}")
    if not parent.is_dir():
        raise ValueError(f"output parent is not a folder: {parent}")

    try:
        with output_pdf.open("ab"):
            pass
    except OSError as error:
        raise ValueError(f"output path is not writable: {output_pdf} ({error})") from error

    if output_pdf.exists() and output_pdf.stat().st_size == 0:
        try:
            output_pdf.unlink()
        except OSError as error:
            raise ValueError(f"output path is not writable: {output_pdf} ({error})") from error


def save_pdf(pages: list[Image.Image], output_pdf: Path) -> None:
    try:
        first_page, rest_pages = pages[0], pages[1:]
        first_page.save(
            output_pdf,
            "PDF",
            save_all=True,
            append_images=rest_pages,
            resolution=PDF_RESOLUTION_DPI,
        )
    except OSError as error:
        raise ValueError(f"output path is not writable: {output_pdf} ({error})") from error


def main() -> int:
    args = parse_args()
    input_folder = Path(args.input_folder).expanduser().resolve()
    output_pdf = (
        Path(args.output_pdf).expanduser().resolve()
        if args.output_pdf
        else default_output_path(input_folder)
    )

    try:
        if not input_folder.exists():
            raise ValueError(f"input folder not found: {input_folder}")
        if not input_folder.is_dir():
            raise ValueError(f"input path is not a folder: {input_folder}")

        files = image_files(input_folder, args.sort)
        if not files:
            raise ValueError(f"no images found in: {input_folder}")

        ensure_output_writable(output_pdf)
        pages = [fit_image_to_letter_page(path) for path in files]
        save_pdf(pages, output_pdf)

        print("Activity book PDF created")
        print(f"Images included: {len(files)}")
        print(f"Sort mode: {args.sort}")
        print(f"Output PDF: {output_pdf}")
        return 0
    except ValueError as error:
        print(f"Error: {error}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
