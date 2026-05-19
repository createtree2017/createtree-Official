# AI 검색 최적화 및 기술 SEO 보강 인수인계

## 변경 파일

- `server/src/index.ts`
- `index.html`
- `public/sitemap.xml`
- `public/og-hospital-culture-center.png`
- `client/src/pages/HospitalLandingPage.tsx`
- `client/src/components/hospital/FaqSection.tsx`
- `client/src/components/hospital/SafetyReportingSection.tsx`
- `client/src/components/hospital/SolutionSection.tsx`
- `client/src/data/hospitalLanding.ts`
- `client/src/styles.css`

## 핵심 변경 내용

- Google Search Central의 AI 검색 최적화 가이드 방향에 맞춰 기술 SEO와 고유 콘텐츠를 함께 보강했다.
- 서버에서 `/api`, `/admin` 경로에 `X-Robots-Tag: noindex, nofollow`를 적용했다.
- 존재하지 않는 공개 URL이 동일 SPA HTML을 200으로 반환하던 soft 404 리스크를 줄이고, `/`, `/admin`, `/admin/`만 SPA HTML을 반환하도록 제한했다.
- `index.html`의 title, description, OG/Twitter 메타, 대표 공유 이미지, JSON-LD `FAQPage`, 초기 HTML fallback 콘텐츠를 보강했다.
- FAQ를 `button` 기반 조건부 렌더링에서 `details/summary` 구조로 바꿔 접힌 답변도 DOM에 남도록 개선했다.
- 의료광고 안전 운영과 병원 리포트 예시를 담은 `SafetyReportingSection`을 추가했다.
- sitemap `lastmod`를 `2026-05-19`로 갱신했다.

## 변경 이유

- Google 공식 가이드는 생성형 AI 검색에서도 기존 SEO, 크롤링 가능성, 명확한 기술 구조, 좋은 페이지 경험, 고유하고 유용한 콘텐츠를 우선하라고 안내한다.
- 기존 운영 도메인에서는 없는 URL도 200으로 응답해 중복 URL 및 soft 404 리스크가 있었다.
- FAQ 답변이 열린 항목만 DOM에 렌더링되어 검색엔진과 접근성 측면에서 불리했다.
- 병원 의사결정자가 실제로 궁금해하는 의료광고 안전성, 운영 부담, 참여 리포트 정보를 본문에서 더 명확히 확인할 필요가 있었다.

## 검증 결과

- `npm run validate`: 통과
- `npm run typecheck`: 통과
- `npm run build`: 통과
- JSON-LD 파싱 확인: `Organization`, `WebSite`, `Service`, `FAQPage` 및 FAQ 8개 확인
- 로컬 프로덕션 서버 응답 확인:
  - `/`: 200
  - `/admin`: 200, `X-Robots-Tag: noindex, nofollow`
  - `/api/health`: 200, `X-Robots-Tag: noindex, nofollow`
  - `/api/unknown-seo-test`: 404, `X-Robots-Tag: noindex, nofollow`
  - `/does-not-exist-seo-test`: 404
  - `/robots.txt`: 200
  - `/sitemap.xml`: 200
  - `/og-hospital-culture-center.png`: 200
- 브라우저 검증:
  - Desktop 1440x900, Tablet 768x1024, Mobile 390x844에서 주요 섹션과 FAQ, 상담 폼 확인
  - FAQ 8개가 DOM에 존재하고 접힌 답변도 확인 가능
  - 새 안전 운영/리포트 섹션 텍스트 노출 확인
  - 모바일 빈 폼 제출 시 필수 항목 오류 메시지 확인
  - 확인용 스크린샷은 `test-results/seo-smoke-*.png`에 생성됨

## 남은 이슈 또는 주의사항

- 운영 배포 후 실제 `https://hospital.createtree.co.kr/`에서 같은 응답 상태와 `X-Robots-Tag`를 다시 확인해야 한다.
- Search Console에 sitemap 재제출 또는 URL 검사 요청을 진행하면 반영 확인이 빠르다.
- 실제 상담 폼 성공 제출은 로컬 DB 연결 없이 검증하지 않았다. 이번 작업에서는 빈 폼 오류 상태와 서버 응답 구조를 확인했다.
- `FAQPage` JSON-LD는 `client/src/data/hospitalLanding.ts`의 FAQ 문구와 같은 의미를 유지해야 한다. FAQ 문구를 바꿀 때 `index.html`도 함께 확인한다.

## Skill Impact Check

- 반복 작업 규칙이나 새 운영 정책 변경은 없었다.
- SEO/FAQ/서버 라우팅 구현은 기존 `$createtree-landing-polish`와 `$seo` 지침 범위 안에 있다.
- 스킬 설명과 현재 코드 사이의 불일치가 생기지 않았으므로 스킬 업데이트는 하지 않았다.
- git add, commit, push는 수행하지 않았다.
