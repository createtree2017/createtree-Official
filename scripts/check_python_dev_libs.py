#!/usr/bin/env python3
"""Verify Python development libraries declared in requirements-dev.txt."""

from __future__ import annotations

import importlib
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
LOCAL_PACKAGES = ROOT / ".python-packages"

if LOCAL_PACKAGES.exists():
    sys.path.insert(0, str(LOCAL_PACKAGES))


MODULES = [
    ("pyyaml", "yaml"),
    ("ruamel.yaml", "ruamel.yaml"),
    ("python-dotenv", "dotenv"),
    ("requests", "requests"),
    ("chardet", "chardet"),
    ("httpx", "httpx"),
    ("pydantic", "pydantic"),
    ("jsonschema", "jsonschema"),
    ("rich", "rich"),
    ("typer", "typer"),
    ("pytest", "pytest"),
    ("playwright", "playwright"),
]


def main() -> int:
    failures: list[str] = []

    print("Python dev library validation")
    print(f"Local package path: {LOCAL_PACKAGES}")

    for package_name, module_name in MODULES:
        try:
            importlib.import_module(module_name)
            print(f"[PASS] {package_name} -> {module_name}")
        except Exception as exc:
            failures.append(package_name)
            print(f"[FAIL] {package_name} -> {module_name}: {type(exc).__name__}: {exc}")

    if failures:
        print()
        print("Missing or broken packages:")
        for package_name in failures:
            print(f"- {package_name}")
        return 1

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
