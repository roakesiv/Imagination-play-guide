#!/usr/bin/env python3
"""Run the full local activity-book production pipeline."""

from __future__ import annotations

import argparse
import re
import shutil
import subprocess
import sys
from pathlib import Path


SUPPORTED_EXTENSIONS = {".png", ".jpg", ".jpeg", ".webp"}


def slugify(value: str) -> str:
    slug = value.strip().lower()
    slug = re.sub(r"\s+", "_", slug)
    slug = re.sub(r"[^a-z0-9_-]+", "", slug)
    slug = re.sub(r"_+", "_", slug).strip("_-")
    return slug or "unnamed_creature"


def image_files(folder: Path) -> list[Path]:
    return sorted(
        [
            path
            for path in folder.iterdir()
            if path.is_file() and path.suffix.lower() in SUPPORTED_EXTENSIONS
        ],
        key=lambda path: (path.stat().st_mtime, path.name.lower()),
    )


def clear_folder_files(folder: Path) -> None:
    folder.mkdir(parents=True, exist_ok=True)
    for path in folder.iterdir():
        if path.is_file():
            path.unlink()


def copy_renamed_pages(raw_files: list[Path], source_pages: Path, creature_slug: str) -> None:
    clear_folder_files(source_pages)

    for index, source in enumerate(raw_files, start=1):
        destination = source_pages / f"{creature_slug}_{index:02d}{source.suffix.lower()}"
        print(f"{index:02d}. rename for PDF {source.name} -> {destination.name}")
        shutil.copy2(source, destination)


def run_finalize(repo_root: Path, creature: str, workspace: Path) -> None:
    finalize_script = repo_root / "tools" / "finalize_activity_book.py"
    command = [
        sys.executable,
        str(finalize_script),
        "--creature",
        creature,
        "--workspace",
        str(workspace),
        "--clean",
        "--apply",
    ]
    subprocess.run(command, check=True)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Rename raw ChatGPT images, make one PDF, save to library, and clean the PDF Engine."
    )
    parser.add_argument("--creature", required=True, help="Creature name, such as Amor.")
    parser.add_argument(
        "--workspace",
        default=str((Path(__file__).resolve().parents[2] / "02 - Activity Book").resolve()),
        help="Activity Book workspace folder.",
    )
    parser.add_argument(
        "--pattern",
        default="ChatGPT*.png",
        help="Raw image filename pattern in 01_PDF Engine. Default: ChatGPT*.png",
    )
    parser.add_argument(
        "--expected-count",
        type=int,
        default=10,
        help="Expected number of activity page images. Default: 10.",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    repo_root = Path(__file__).resolve().parents[1]
    workspace = Path(args.workspace).expanduser().resolve()
    engine = workspace / "01_PDF Engine"
    source_pages = engine / "Source Pages"
    creature_slug = slugify(args.creature)

    try:
        if not engine.is_dir():
            raise ValueError(f"PDF Engine folder not found: {engine}")

        raw_files = [
            path
            for path in sorted(engine.glob(args.pattern), key=lambda item: (item.stat().st_mtime, item.name.lower()))
            if path.is_file() and path.suffix.lower() in SUPPORTED_EXTENSIONS
        ]

        if not raw_files:
            raw_files = image_files(engine)

        if not raw_files:
            raise ValueError(f"no raw image files found in: {engine}")
        if len(raw_files) != args.expected_count:
            raise ValueError(
                f"expected {args.expected_count} raw image files in {engine}, but found {len(raw_files)}. "
                "Add or remove files before finalizing."
            )

        print(f"Creature: {args.creature} ({creature_slug})")
        print(f"Raw image files: {len(raw_files)}")
        print()

        copy_renamed_pages(raw_files, source_pages, creature_slug)
        print()
        run_finalize(repo_root, args.creature, workspace)
        print()
        print("Activity book pipeline complete.")
        return 0
    except subprocess.CalledProcessError as error:
        print(f"Error: finalize step failed with exit code {error.returncode}", file=sys.stderr)
        return error.returncode
    except (OSError, ValueError) as error:
        print(f"Error: {error}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
