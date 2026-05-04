# 2026-05-04 검증 스크립트 및 MCP 활용 규칙 정리

## 변경 파일

- `AGENTS.md`
- `package.json`
- `requirements-dev.txt`
- `scripts/quick_validate.py`
- `scripts/check_python_dev_libs.py`
- `scripts/browser_smoke.md`
- `docs/05-devlog/20260504-validation-mcp-strategy.md`

## 핵심 변경 내용

- MCP를 무조건 추가하지 않고 현재 환경에 맞게 역할을 나누는 규칙을 `AGENTS.md`에 추가했다.
- 로컬 구조 검증용 `scripts/quick_validate.py`를 추가했다.
- `package.json`에 `validate`, `verify`, `verify:build` 명령을 추가했다.
- 브라우저 기반 화면 검증 절차를 `scripts/browser_smoke.md`에 정리했다.
- Python 개발 검증용 `requirements-dev.txt`를 추가했다.
- Python 보조 라이브러리 import 검증용 `scripts/check_python_dev_libs.py`를 추가했다.
- Windows 샌드박스에서 Python user site 접근이 불안정해 프로젝트 로컬 `.python-packages` 설치 경로를 사용하도록 정리했다.

## 왜 변경했는지

- filesystem MCP는 현재 Codex 파일 도구와 shell로 충분하므로 기본 추가하지 않는 방향을 명확히 하기 위해서다.
- OpenAI docs MCP, Browser Use, Playwright 스킬, Postgres/DB 접근의 사용 경계를 명확히 해 개인정보와 운영 DB 위험을 줄이기 위해서다.
- 스킬과 프로젝트 구조가 늘어난 만큼 `AGENTS.md`, `.agents/skills`, `package.json`, `client/src`, `server/src`, `railway.json`, `db/migrations` 같은 핵심 구조를 빠르게 검증하기 위해서다.

## 검증 결과

- `npm.cmd run validate`: 통과, 129개 항목 PASS / 0개 FAIL
- `npm.cmd run validate:python`: 통과
  - `pyyaml`, `ruamel.yaml`, `python-dotenv`, `requests`, `chardet`, `httpx`, `pydantic`, `jsonschema`, `rich`, `typer`, `pytest`, `playwright` import 확인
- `npm.cmd run typecheck`: 통과
- `npm.cmd run build`: 통과
  - 일반 샌드박스에서는 Vite/esbuild 하위 프로세스 실행이 `spawn EPERM`으로 차단됐다.
  - 권한 허용 실행에서는 정상 빌드 완료.
- OpenAI docs MCP: 앱 내부 MCP 도구 호출 성공
- Codex CLI `codex mcp list`: WindowsApps `codex.exe` 실행 권한 문제로 실패

## 실행 명령

```bash
python scripts/quick_validate.py
python scripts/check_python_dev_libs.py
npm.cmd run validate
npm.cmd run validate:python
npm.cmd run typecheck
npm.cmd run build
npm.cmd run verify
npm.cmd run verify:build
```

브라우저 검증은 `npm.cmd run dev` 실행 후 `scripts/browser_smoke.md` 절차를 따른다.

## 남은 이슈 또는 주의사항

- Python 의존성은 `.python-packages`에 프로젝트 로컬로 설치되어 있으며, 해당 폴더는 `.gitignore`에 포함했다.
- `.venv` 생성은 Windows 임시 폴더 권한 문제로 사용하지 않았다. 현재 검증 흐름은 `.python-packages` 기준이다.
- Postgres MCP는 운영 DB URL과 개인정보 보호 때문에 아직 도입하지 않았다.
- 브라우저 화면 변경 작업이 아니어서 실제 브라우저 스모크 테스트는 실행하지 않았다. 화면 작업 시 `scripts/browser_smoke.md` 절차를 따른다.
- `git add`, `git commit`, `git push`는 수행하지 않았다.
