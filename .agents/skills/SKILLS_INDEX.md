# Codex 스킬 목록

> 이 문서는 `.agents/scripts/generate_skills_index.py`로 자동 생성됩니다. 스킬을 추가, 삭제, 수정한 뒤에는 `npm run skills:sync`를 실행하세요.

## 운영 규칙

- 스킬의 실제 내용은 각 폴더의 `SKILL.md`를 기준으로 합니다.
- 기능 개발, 기존 기능 변경, 업데이트 완료 시 AI는 `Skill Impact Check`를 수행합니다.
- 스킬이 추가, 삭제, 변경되면 `SKILLS_INDEX.md`를 재생성하고 `npm run skills:check`로 검증합니다.

## 설치된 스킬

| 폴더 | 스킬명 | 표시명 | 기능 요약 | 자동 호출 |
| --- | --- | --- | --- | --- |
| accessibility | accessibility | 접근성 점검 | WCAG·키보드·폼 접근성 점검 | false |
| composition-patterns | vercel-composition-patterns | React 구성 패턴 | 복잡한 컴포넌트 구조 정리 | false |
| core-web-vitals | core-web-vitals | Core Web Vitals | LCP·INP·CLS 리스크 점검 | false |
| createtree-landing-polish | createtree-landing-polish | 창조트리 랜딩 고도화 | 병원 랜딩 전환율·문구·UI 안전 기준 | true |
| gpt-tasteskill | gpt-taste | 고급 비주얼 아이디어 | 새 Hero·CTA 방향 참고용 | false |
| output-skill | full-output-enforcement | 전체 출력 보장 | 큰 파일과 산출물의 생략 방지 | false |
| performance | performance | 성능 최적화 | 로딩·번들·렌더링 성능 점검 | false |
| react-best-practices | vercel-react-best-practices | Vercel React 품질 | React 컴포넌트 성능·구조 점검 | false |
| redesign-skill | redesign-existing-projects | 기존 화면 고급화 | 기존 UI를 현재 스택 안에서 고도화 | false |
| security-best-practices | security-best-practices | Security Best Practices | Security reviews and secure-by-default guidance | false |
| seo | seo | SEO 점검 | 메타·헤딩·검색 노출 구조 점검 | false |
| soft-skill | high-end-visual-design | 하이엔드 디자인 참고 | 프리미엄 시각 디테일 참고용 | false |
| use-railway | use-railway | Railway 운영 | Railway 배포·환경변수·장애 점검 | false |
| web-design-guidelines | web-design-guidelines | 웹 디자인 가이드 | UI·UX·접근성 기본 품질 점검 | false |
| web-quality-audit | web-quality-audit | 웹 품질 감사 | 성능·접근성·SEO 종합 점검 | false |
