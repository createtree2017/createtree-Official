#!/usr/bin/env python3
"""Project structure validation for CT_official.

This script intentionally uses only Python's standard library so it can run
before optional development dependencies are installed.
"""

from __future__ import annotations

import json
import re
import sys
from dataclasses import dataclass
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


@dataclass
class Check:
    name: str
    ok: bool
    detail: str


def rel(path: Path) -> str:
    try:
        return path.relative_to(ROOT).as_posix()
    except ValueError:
        return str(path)


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8-sig")


def add(checks: list[Check], name: str, ok: bool, detail: str) -> None:
    checks.append(Check(name=name, ok=ok, detail=detail))


def frontmatter(text: str) -> str | None:
    match = re.match(r"\A---\s*\n(.*?)\n---\s*(?:\n|\Z)", text, re.DOTALL)
    if not match:
        return None
    return match.group(1)


def has_yaml_key(yaml_text: str, key: str) -> bool:
    pattern = rf"(?m)^{re.escape(key)}\s*:"
    return re.search(pattern, yaml_text) is not None


def has_nested_yaml_key(yaml_text: str, path: tuple[str, ...]) -> bool:
    if not path:
        return False
    lines = yaml_text.splitlines()
    current_indent = -1
    index = 0

    for line in lines:
        if not line.strip() or line.lstrip().startswith("#"):
            continue
        indent = len(line) - len(line.lstrip(" "))
        stripped = line.strip()
        key = path[index]
        if re.match(rf"^{re.escape(key)}\s*:", stripped):
            if index == 0 or indent > current_indent:
                current_indent = indent
                index += 1
                if index == len(path):
                    return True
    return False


def validate_required_paths(checks: list[Check]) -> None:
    required_paths = [
        "AGENTS.md",
        "package.json",
        "client/src",
        "server/src",
        ".agents/skills",
        "railway.json",
        "db/migrations",
    ]
    for item in required_paths:
        path = ROOT / item
        add(checks, f"required path: {item}", path.exists(), rel(path))


def validate_package_json(checks: list[Check]) -> None:
    package_path = ROOT / "package.json"
    if not package_path.exists():
        add(checks, "package.json scripts", False, "package.json not found")
        return

    try:
        package = json.loads(read_text(package_path))
    except json.JSONDecodeError as exc:
        add(checks, "package.json parse", False, f"JSON parse failed: {exc}")
        return

    scripts = package.get("scripts")
    add(checks, "package.json has scripts", isinstance(scripts, dict), "scripts object")
    if not isinstance(scripts, dict):
        return

    for script_name in ("dev", "typecheck", "build", "start", "validate", "validate:python"):
        add(
            checks,
            f"package script: {script_name}",
            script_name in scripts,
            scripts.get(script_name, "missing"),
        )


def validate_agents_md(checks: list[Check]) -> None:
    agents_path = ROOT / "AGENTS.md"
    if not agents_path.exists():
        add(checks, "AGENTS.md exists", False, "missing")
        return

    text = read_text(agents_path)
    for keyword in ("!!질문!!", "!!승인!!", "!!푸시!!", "!!테스트!!"):
        add(checks, f"AGENTS keyword: {keyword}", keyword in text, keyword)

    for section in ("Codex 스킬 사용 규칙", "MCP 활용 규칙"):
        add(checks, f"AGENTS section: {section}", section in text, section)


def validate_skills(checks: list[Check]) -> None:
    skills_dir = ROOT / ".agents" / "skills"
    if not skills_dir.exists():
        add(checks, "skills directory", False, rel(skills_dir))
        return

    skill_dirs = sorted(path for path in skills_dir.iterdir() if path.is_dir())
    add(checks, "skills discovered", bool(skill_dirs), f"{len(skill_dirs)} skills")

    for skill_dir in skill_dirs:
        skill_md = skill_dir / "SKILL.md"
        openai_yaml = skill_dir / "agents" / "openai.yaml"
        add(checks, f"{skill_dir.name}: SKILL.md", skill_md.exists(), rel(skill_md))

        if skill_md.exists():
            text = read_text(skill_md)
            fm = frontmatter(text)
            add(checks, f"{skill_dir.name}: frontmatter", fm is not None, rel(skill_md))
            if fm is not None:
                add(checks, f"{skill_dir.name}: name", has_yaml_key(fm, "name"), "frontmatter name")
                add(
                    checks,
                    f"{skill_dir.name}: description",
                    has_yaml_key(fm, "description"),
                    "frontmatter description",
                )

        add(checks, f"{skill_dir.name}: agents/openai.yaml", openai_yaml.exists(), rel(openai_yaml))
        if openai_yaml.exists():
            yaml_text = read_text(openai_yaml)
            add(
                checks,
                f"{skill_dir.name}: openai interface",
                has_nested_yaml_key(yaml_text, ("interface",)),
                "interface",
            )
            add(
                checks,
                f"{skill_dir.name}: openai policy",
                "allow_implicit_invocation:" in yaml_text,
                "policy.allow_implicit_invocation",
            )


def validate_browser_docs(checks: list[Check]) -> None:
    browser_doc = ROOT / "scripts" / "browser_smoke.md"
    add(checks, "browser smoke checklist", browser_doc.exists(), rel(browser_doc))


def validate_mcp_guidance(checks: list[Check]) -> None:
    config_path = Path.home() / ".codex" / "config.toml"
    if config_path.exists():
        config_text = read_text(config_path)
        add(
            checks,
            "OpenAI docs MCP configured",
            "[mcp_servers.openaiDeveloperDocs]" in config_text,
            str(config_path),
        )
    else:
        add(checks, "OpenAI docs MCP configured", False, str(config_path))

    project_mcp = ROOT / ".mcp.json"
    add(
        checks,
        "project MCP override absent",
        not project_mcp.exists(),
        "project-level MCP is intentionally not required",
    )


def print_report(checks: list[Check]) -> int:
    failed = [check for check in checks if not check.ok]
    passed = len(checks) - len(failed)

    print("CT_official quick validation")
    print(f"Root: {ROOT}")
    print(f"Passed: {passed}")
    print(f"Failed: {len(failed)}")
    print()

    for check in checks:
        status = "PASS" if check.ok else "FAIL"
        print(f"[{status}] {check.name} - {check.detail}")

    return 1 if failed else 0


def main() -> int:
    checks: list[Check] = []
    validate_required_paths(checks)
    validate_package_json(checks)
    validate_agents_md(checks)
    validate_skills(checks)
    validate_browser_docs(checks)
    validate_mcp_guidance(checks)
    return print_report(checks)


if __name__ == "__main__":
    sys.exit(main())
