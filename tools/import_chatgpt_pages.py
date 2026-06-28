#!/usr/bin/env python3
"""Import ChatGPT-downloaded page images into a creature image folder."""

from __future__ import annotations

import argparse
import re
import shutil
import sys
from pathlib import Path


DEFAULT_PATTERN = "ChatGPT*.png"


def slugify(value: str) -> str:
    slug = value.strip().lower()
    slug = re.sub(r"\s+", "_", slug)
    slug = re.sub(r"[^a-z0-9_-]+", "", slug)
    slug = re.sub(r"_+", "_", slug).strip("_-")
    return slug or "unnamed_creature"


def default_downloads_folder() -> Path:
    return Path.home() / "Downloads"


def default_output_folder(workspace: Path, creature_slug: str) -> Path:
    return workspace / "creatures" / creature_slug / "renamed_pages"


def image_files(downloads: Path, pattern: str) -> list[Path]:
    return [
        path
        for path in downloads.glob(pattern)
        if path.is_file() and path.suffix.lower() == ".png"
    ]


def selected_files(downloads: Path, pattern: str, count: int) -> list[Path]:
    files = image_files(downloads, pattern)
    if count < 1:
        raise ValueError("count must be 1 or greater")
    if len(files) < count:
        raise ValueError(f"found {len(files)} matching PNG files, but count is {count}")

    newest_batch = sorted(files, key=lambda path: (path.stat().st_mtime, path.name.lower()))[-count:]
    return sorted(newest_batch, key=lambda path: (path.stat().st_mtime, path.name.lower()))


def page_name(creature_slug: str, page_number: int, extension: str) -> str:
    return f"{creature_slug}_{page_number:02d}{extension.lower()}"


def ensure_output_folder(path: Path, apply_changes: bool) -> None:
    if apply_changes:
        path.mkdir(parents=True, exist_ok=True)
        return

    if not path.exists():
        print(f"would create {path}")


def import_pages(
    files: list[Path],
    output_folder: Path,
    creature_slug: str,
    move_files: bool,
    apply_changes: bool,
) -> None:
    ensure_output_folder(output_folder, apply_changes)

    action = "move" if move_files else "copy"
    for index, source in enumerate(files, start=1):
        destination = output_folder / page_name(creature_slug, index, source.suffix)
        print(f"{index:02d}. {action:4} {source.name} -> {destination.name}")

        if not apply_changes:
            continue

        if destination.exists():
            raise ValueError(f"destination already exists: {destination}")

        if move_files:
            shutil.move(str(source), str(destination))
        else:
            shutil.copy2(source, destination)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Rename the latest ChatGPT PNG downloads by modified time for one creature."
    )
    parser.add_argument("--creature", required=True, help="Creature name, such as Amor.")
    parser.add_argument(
        "--workspace",
        help="Activity image workspace. Defaults to ../02 - Activity Book beside this repo.",
    )
    parser.add_argument(
        "--output-folder",
        help="Exact folder for renamed pages. Overrides --workspace.",
    )
    parser.add_argument(
        "--downloads",
        default=str(default_downloads_folder()),
        help="Downloads folder to scan. Defaults to the current user's Downloads folder.",
    )
    parser.add_argument(
        "--pattern",
        default=DEFAULT_PATTERN,
        help=f"Filename pattern to import. Default: {DEFAULT_PATTERN}",
    )
    parser.add_argument("--count", type=int, default=10, help="Number of latest matching PNGs to import.")
    parser.add_argument("--move", action="store_true", help="Move files instead of copying them.")
    parser.add_argument("--apply", action="store_true", help="Actually copy or move files. Omit for a dry run.")
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    script_path = Path(__file__).resolve()
    repo_root = script_path.parents[1]
    workspace = (
        Path(args.workspace).expanduser().resolve()
        if args.workspace
        else (repo_root.parent / "02 - Activity Book").resolve()
    )
    creature_slug = slugify(args.creature)
    output_folder = (
        Path(args.output_folder).expanduser().resolve()
        if args.output_folder
        else default_output_folder(workspace, creature_slug)
    )
    downloads = Path(args.downloads).expanduser().resolve()

    try:
        if not downloads.exists() or not downloads.is_dir():
            raise ValueError(f"downloads folder not found: {downloads}")

        files = selected_files(downloads, args.pattern, args.count)
        print(f"Creature: {args.creature} ({creature_slug})")
        print(f"Downloads: {downloads}")
        print(f"Output: {output_folder}")
        print(f"Mode: {'apply' if args.apply else 'dry run'}")
        print()

        import_pages(files, output_folder, creature_slug, args.move, args.apply)

        if not args.apply:
            print()
            print("Dry run only. Add --apply when this list looks right.")

        return 0
    except ValueError as error:
        print(f"Error: {error}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
