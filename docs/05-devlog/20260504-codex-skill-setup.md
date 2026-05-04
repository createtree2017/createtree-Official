# 2026-05-04 Codex 스킬 설치 및 자동 사용 설정

## 변경 파일

- `.agents/skills/redesign-skill/`
- `.agents/skills/output-skill/`
- `.agents/skills/gpt-tasteskill/`
- `.agents/skills/soft-skill/`
- `.agents/skills/createtree-landing-polish/SKILL.md`
- `.agents/skills/*/agents/openai.yaml`
- `AGENTS.md`

## 핵심 변경 내용

- GitHub `Leonxlnx/taste-skill`에서 기존 화면 고도화, 전체 출력 보장, 고급 비주얼 참고용 스킬을 repo 전용 `.agents/skills/`에 설치했다.
- 창조트리 병원 영업용 랜딩페이지 전용 스킬인 `$createtree-landing-polish`를 추가했다.
- `$createtree-landing-polish`, `$redesign-existing-projects`, `$full-output-enforcement`는 자동 판단으로 사용될 수 있게 설정했다.
- `$gpt-taste`, `$high-end-visual-design`는 과한 Tailwind/GSAP/고강도 모션 전제가 있어 자동 사용을 제한하고 명시 호출 시 참고용으로만 쓰도록 설정했다.
- `AGENTS.md`에 스킬 사용 우선순위, 외부 디자인 스킬 제한, `!!질문!!`/`!!승인!!`/`!!푸시!!`/`!!테스트!!`와의 관계를 추가했다.

## 왜 변경했는지

- 랜딩페이지 작업에서 매번 같은 맥락을 길게 설명하지 않아도 병원 B2B 전환율, 의료광고 안전성, 기존 React/Vite/vanilla CSS 구조를 Codex가 우선 고려하도록 하기 위해서다.
- 일반 디자인 스킬의 과감한 스타일 지시가 프로젝트 스택과 병원 신뢰감에 맞지 않게 적용되는 것을 막기 위해서다.

## 검증 결과

- 스킬 폴더 설치 확인 완료
- `AGENTS.md` 스킬 규칙 추가 확인 완료
- 5개 스킬 모두 `SKILL.md`의 `name`/`description` 존재 확인 완료
- 5개 스킬 모두 `agents/openai.yaml` 및 `allow_implicit_invocation` 정책 확인 완료
- `quick_validate.py`는 로컬 Python에 `PyYAML`이 없어 실행하지 못했고, PowerShell 기반 구조 확인으로 대체했다.

## 남은 이슈 또는 주의사항

- Codex가 새 스킬을 즉시 인식하지 못하면 세션을 재시작해야 한다.
- 외부 스킬은 repo에 설치되어 있으므로, 추후 업데이트가 필요하면 다시 다운로드하거나 직접 수정해야 한다.
- `git add`, `git commit`, `git push`는 수행하지 않았다.
