# 2026-05-04 필수 Codex 스킬 추가 설치

## 변경 파일

- `.agents/skills/security-best-practices/`
- `.agents/skills/react-best-practices/`
- `.agents/skills/web-design-guidelines/`
- `.agents/skills/composition-patterns/`
- `.agents/skills/web-quality-audit/`
- `.agents/skills/performance/`
- `.agents/skills/core-web-vitals/`
- `.agents/skills/accessibility/`
- `.agents/skills/seo/`
- `.agents/skills/use-railway/`
- `.agents/skills/*/agents/openai.yaml`
- `.agents/skills/createtree-landing-polish/SKILL.md`
- `AGENTS.md`

## 핵심 변경 내용

- 꼭 필요한 범위로 한정해 보안, React/UI 품질, 웹 품질 감사, Railway 운영 스킬을 repo 전용 `.agents/skills/`에 설치했다.
- 설치한 필수 스킬:
  - `$security-best-practices`
  - `$vercel-react-best-practices`
  - `$web-design-guidelines`
  - `$vercel-composition-patterns`
  - `$web-quality-audit`
  - `$performance`
  - `$core-web-vitals`
  - `$accessibility`
  - `$seo`
  - `$use-railway`
- 각 스킬에 `agents/openai.yaml`을 추가하거나 보강해 자동 판단 사용을 허용했다.
- `AGENTS.md`와 `$createtree-landing-polish`에 새 스킬의 사용 범위와 우선순위를 연결했다.

## 왜 변경했는지

- 병원 랜딩페이지의 실제 운영 품질에 필요한 보안, React 구조, 접근성, SEO, 성능, Railway 배포 점검을 Codex가 상황별로 자동 참고하도록 하기 위해서다.
- Postgres, Sentry, Supabase, Anthropic, Vercel 배포 등 조건부 또는 현재 환경과 덜 맞는 스킬은 이번 설치에서 제외했다.

## 검증 결과

- 설치된 스킬 폴더와 `SKILL.md` 존재 확인 완료
- 각 스킬의 실제 `name` 확인 완료
- `agents/openai.yaml` 및 `allow_implicit_invocation` 정책 확인 완료

## 남은 이슈 또는 주의사항

- Codex가 새 스킬을 즉시 인식하지 못하면 세션을 재시작해야 한다.
- 외부 스킬의 지시가 `AGENTS.md` 또는 `$createtree-landing-polish`와 충돌하면 프로젝트 지침을 우선한다.
- `git add`, `git commit`, `git push`는 수행하지 않았다.
