#!/usr/bin/env python3
"""Initialize a local image workspace for activity book production."""

from __future__ import annotations

import argparse
import re
from pathlib import Path


BASE_FOLDERS = [
    "_incoming",
    "_rename_manifests",
    "creatures",
    "pdf-output",
]

CREATURE_FOLDERS = [
    "source_images",
    "renamed_pages",
    "pdf",
]


WORKSPACE_README = """# Imagination Play Images Workspace

This folder is a local-only workspace for generated activity-page images and PDFs.

Do not commit this folder, generated images, or generated PDFs to the GitHub repo.

## Folders

- `_incoming/` - raw image downloads from ChatGPT or another image generator.
- `_rename_manifests/` - future manifest files for renaming downloaded images.
- `creatures/` - per-creature production folders.
- `pdf-output/` - finished PDFs that are ready to print or review.

## Per-Creature Folder Shape

When you create a creature workspace, it uses:

```text
creatures/[creature_slug]/
  source_images/
  renamed_pages/
  pdf/
```

- `source_images/` - original downloaded images for that creature.
- `renamed_pages/` - page-numbered images after a future rename step.
- `pdf/` - PDFs generated for that creature.
"""


def slugify(value: str) -> str:
    slug = value.strip().lower()
    slug = re.sub(r"\s+", "_", slug)
    slug = re.sub(r"[^a-z0-9_-]+", "", slug)
    slug = re.sub(r"_+", "_", slug).strip("_-")
    return slug or "unnamed_creature"


def ensure_folder(path: Path) -> str:
    existed = path.exists()
    if existed and not path.is_dir():
        raise ValueError(f"Path exists but is not a folder: {path}")

    path.mkdir(parents=True, exist_ok=True)
    return "existing" if existed else "created"


def write_readme(workspace: Path) -> str:
    readme_path = workspace / "README.md"
    if readme_path.exists():
        return "existing"

    readme_path.write_text(WORKSPACE_README, encoding="utf-8")
    return "created"


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Initialize a local image workspace outside the repo."
    )
    parser.add_argument(
        "workspace",
        help="Path to the local image workspace folder to create or update.",
    )
    parser.add_argument(
        "--creature",
        help="Optional creature name or slug for a per-creature folder.",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    workspace = Path(args.workspace).expanduser().resolve()
    created_count = 0
    existing_count = 0

    try:
        print(f"Workspace: {workspace}")

        for folder_name in BASE_FOLDERS:
            status = ensure_folder(workspace / folder_name)
            created_count += status == "created"
            existing_count += status == "existing"
            print(f"{status:8} {workspace / folder_name}")

        readme_status = write_readme(workspace)
        created_count += readme_status == "created"
        existing_count += readme_status == "existing"
        print(f"{readme_status:8} {workspace / 'README.md'}")

        if args.creature:
            creature_slug = slugify(args.creature)
            creature_root = workspace / "creatures" / creature_slug
            print(f"Creature: {creature_slug}")
            for folder_name in CREATURE_FOLDERS:
                status = ensure_folder(creature_root / folder_name)
                created_count += status == "created"
                existing_count += status == "existing"
                print(f"{status:8} {creature_root / folder_name}")

        print()
        print(f"Summary: {created_count} created, {existing_count} existing")
        return 0
    except OSError as error:
        print(f"Error: could not create workspace folder: {error}")
        return 1
    except ValueError as error:
        print(f"Error: {error}")
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
