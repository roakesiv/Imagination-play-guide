#!/usr/bin/env python3
"""Finalize one activity book from PDF Engine source pages into the library."""

from __future__ import annotations

import argparse
import re
import shutil
import sys
from pathlib import Path

import make_activity_book_pdf


SUPPORTED_EXTENSIONS = {".png", ".jpg", ".jpeg", ".webp"}


def slugify(value: str) -> str:
    slug = value.strip().lower()
    slug = re.sub(r"\s+", "_", slug)
    slug = re.sub(r"[^a-z0-9_-]+", "", slug)
    slug = re.sub(r"_+", "_", slug).strip("_-")
    return slug or "unnamed_creature"


def display_name(value: str) -> str:
    return value.strip() or "Unnamed Creature"


def image_files(folder: Path) -> list[Path]:
    return sorted(
        [
            path
            for path in folder.iterdir()
            if path.is_file() and path.suffix.lower() in SUPPORTED_EXTENSIONS
        ],
        key=lambda path: path.name.lower(),
    )


def assert_inside_workspace(workspace: Path, target: Path) -> None:
    resolved_workspace = workspace.resolve()
    resolved_target = target.resolve()

    try:
        resolved_target.relative_to(resolved_workspace)
    except ValueError as error:
        raise ValueError(f"target is outside activity workspace: {target}") from error


def copy_source_pages(source_pages: Path, library_source_pages: Path, files: list[Path], apply_changes: bool) -> None:
    if apply_changes:
        library_source_pages.mkdir(parents=True, exist_ok=True)
    elif not library_source_pages.exists():
        print(f"would create {library_source_pages}")

    for source in files:
        destination = library_source_pages / source.name
        print(f"copy source page {source.name} -> {destination}")
        if apply_changes:
            shutil.copy2(source, destination)


def create_pdf(source_pages: Path, output_pdf: Path, sort_mode: str, margin_inches: float, apply_changes: bool) -> None:
    print(f"create PDF -> {output_pdf}")
    if not apply_changes:
        return

    output_pdf.parent.mkdir(parents=True, exist_ok=True)
    pages = [
        make_activity_book_pdf.fit_image_to_letter_page(path, margin_inches)
        for path in make_activity_book_pdf.image_files(source_pages, sort_mode)
    ]
    make_activity_book_pdf.ensure_output_writable(output_pdf)
    make_activity_book_pdf.save_pdf(pages, output_pdf)


def copy_pdf_to_library(engine_pdf: Path, library_pdf: Path, apply_changes: bool) -> None:
    print(f"copy PDF {engine_pdf.name} -> {library_pdf}")
    if apply_changes:
        shutil.copy2(engine_pdf, library_pdf)


def clean_engine(source_pages: Path, pdf_output: Path, root_engine_files: list[Path], apply_changes: bool) -> None:
    cleanup_files = image_files(source_pages)
    cleanup_files.extend(path for path in pdf_output.iterdir() if path.is_file())
    cleanup_files.extend(root_engine_files)

    if not cleanup_files:
        print("PDF Engine is already clean")
        return

    for path in cleanup_files:
        print(f"delete engine file {path}")
        if apply_changes:
            path.unlink()


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Copy renamed pages to the finished library, make one PDF, then clean the PDF Engine."
    )
    parser.add_argument("--creature", required=True, help="Creature name, such as Amor.")
    parser.add_argument(
        "--workspace",
        default=str((Path(__file__).resolve().parents[2] / "02 - Activity Book").resolve()),
        help="Activity Book workspace folder.",
    )
    parser.add_argument("--sort", choices=["name", "modified"], default="name", help="PDF page sort mode.")
    parser.add_argument("--margin-inches", type=float, default=0.25, help="PDF page margin.")
    parser.add_argument("--clean", action="store_true", help="Delete PDF Engine working files after success.")
    parser.add_argument("--apply", action="store_true", help="Actually write/copy/delete files. Omit for a dry run.")
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    workspace = Path(args.workspace).expanduser().resolve()
    engine = workspace / "01_PDF Engine"
    source_pages = engine / "Source Pages"
    pdf_output = engine / "PDF Output"
    library = workspace / "02_Finished_Library" / display_name(args.creature)
    library_source_pages = library / "Source Pages"
    creature_slug = slugify(args.creature)
    engine_pdf = pdf_output / f"{creature_slug}_activity_book.pdf"
    library_pdf = library / f"{creature_slug}_activity_book.pdf"

    try:
      if not source_pages.is_dir():
          raise ValueError(f"source pages folder not found: {source_pages}")
      if not pdf_output.exists() and args.apply:
          pdf_output.mkdir(parents=True, exist_ok=True)
      elif not pdf_output.exists():
          print(f"would create {pdf_output}")

      for target in [engine, source_pages, pdf_output, library, library_source_pages]:
          assert_inside_workspace(workspace, target)

      files = image_files(source_pages)
      if not files:
          raise ValueError(f"no source images found in: {source_pages}")

      root_engine_files = [
          path
          for path in engine.iterdir()
          if path.is_file() and path.suffix.lower() in SUPPORTED_EXTENSIONS
      ]

      print(f"Creature: {display_name(args.creature)} ({creature_slug})")
      print(f"Workspace: {workspace}")
      print(f"Source pages: {len(files)}")
      print(f"Mode: {'apply' if args.apply else 'dry run'}")
      print()

      copy_source_pages(source_pages, library_source_pages, files, args.apply)
      create_pdf(source_pages, engine_pdf, args.sort, args.margin_inches, args.apply)
      copy_pdf_to_library(engine_pdf, library_pdf, args.apply)

      if args.clean:
          clean_engine(source_pages, pdf_output, root_engine_files, args.apply)
      else:
          print("skip PDF Engine cleanup; add --clean to delete working files after success")

      if not args.apply:
          print()
          print("Dry run only. Add --apply when this list looks right.")

      return 0
    except (OSError, ValueError) as error:
      print(f"Error: {error}", file=sys.stderr)
      return 1


if __name__ == "__main__":
    raise SystemExit(main())
