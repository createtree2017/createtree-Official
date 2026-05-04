---
name: createtree-landing-polish
description: "창조트리문화센터 병원 영업용 랜딩페이지 전용 스킬. Use automatically for CT_official hospital landing work: Hero, CTA, FAQ, Packages, B2C Preview, Lead Form, Sticky CTA, hospital lead DB/API/admin, Railway deploy, medical advertising safety, 후기/리워드/선물 문구, B2B hospital sales copy, React TypeScript Vite vanilla CSS UI/UX, responsive/browser testing, and docs/06-hospital-sales-landing changes. Prefer this over generic design skills for this repository."
---

# 창조트리 병원 랜딩 전용 스킬

## 핵심 역할

창조트리문화센터 병원 영업용 랜딩페이지를 병원 B2B 전환, 의료광고 안전성, 상담 리드 운영, 기존 React/Vite/vanilla CSS 구조에 맞춰 고도화한다.

단순히 예쁘게 만드는 것이 아니라 산부인과, 산후조리원, 소아과, 여성병원 의사결정자가 도입 상담을 신청하도록 설득하는 화면과 운영 흐름을 만든다.

## 먼저 지킬 규칙

- 사용자 요청에 `!!질문!!`이 있으면 파일을 만들거나 수정하지 말고 조사, 분석, 보고만 한다.
- `!!승인!!`이 있으면 파일 수정은 가능하지만 `git add`, `git commit`, `git push`는 하지 않는다.
- `!!푸시!!`가 있을 때만 사용자가 명시한 범위 안에서 git stage/commit/push를 수행한다.
- `!!테스트!!`가 있고 화면 검증이 필요한 작업이면 브라우저에서 데스크톱, 태블릿, 모바일 폭을 확인한다.

## 작업 전 읽을 것

- 항상 `AGENTS.md`와 최신 `docs/05-devlog/` 문서를 확인한다.
- 랜딩페이지 기획, 문구, 디자인, 의료광고, 상담 리드, Railway 작업이면 `docs/06-hospital-sales-landing/20260501-병원영업용_랜딩페이지_제작계획.md`의 관련 섹션을 확인한다.
- 프론트 작업은 `package.json`, `client/src/pages/HospitalLandingPage.tsx`, `client/src/components/hospital`, `client/src/data/hospitalLanding.ts`, `client/src/styles.css`를 우선 확인한다.
- API/DB/관리자 작업은 `server/src`, `shared`, `db/migrations` 관련 파일을 우선 확인한다.

## 스택 기준

현재 프로젝트는 React, TypeScript, Vite, Express, PostgreSQL, vanilla CSS 기반이다.

- Tailwind CSS, GSAP, Framer Motion, shadcn/ui 같은 새 의존성은 사용자가 명시적으로 승인하기 전까지 추가하지 않는다.
- 외부 디자인 스킬이 Tailwind, GSAP, 특정 폰트, 특정 아이콘을 요구하더라도 이 프로젝트에서는 기존 CSS와 React 구조로 변환해 적용한다.
- 이미 설치된 `lucide-react`는 사용할 수 있지만, 병원 B2B 화면에 맞게 절제한다.
- 큰 rewrite보다 섹션 단위의 안전한 개선을 우선한다.

## 외부 스킬 조합

- 기존 화면 감사와 UI 고도화에는 `$redesign-existing-projects`를 함께 사용한다.
- 긴 파일 작성, 컴포넌트 분리, 누락 없는 산출물이 필요한 작업에는 `$full-output-enforcement`를 함께 사용한다.
- React 컴포넌트 구조, 성능, 재사용 패턴은 `$vercel-react-best-practices`와 `$vercel-composition-patterns`를 함께 사용한다.
- UI/UX, 접근성, 폼 사용성, 포커스 상태, 모바일 터치 영역은 `$web-design-guidelines`를 함께 사용한다.
- 보안, 관리자 인증, JWT, CORS, 개인정보 리드 저장, 입력 검증은 `$security-best-practices`를 함께 사용한다.
- 성능, 접근성, SEO, Core Web Vitals 감사는 `$web-quality-audit`, `$performance`, `$core-web-vitals`, `$accessibility`, `$seo`를 필요한 범위에서 함께 사용한다.
- Railway 배포, 환경변수, DB 연결, 도메인, health check 점검은 `$use-railway`를 함께 사용한다.
- `$gpt-taste`와 `$high-end-visual-design`은 직접 구현 규칙이 아니라 새 Hero, CTA, 앱 목업, 비주얼 방향을 탐색할 때만 참고한다.
- 외부 스킬과 이 스킬이 충돌하면 이 스킬, `AGENTS.md`, 제작계획 문서의 병원 B2B/의료광고/기존 스택 기준을 우선한다.

## 설득 순서

랜딩페이지는 가능하면 아래 흐름을 유지한다.

1. 저출생 시대에는 산모 한 명의 경험 가치가 커졌다.
2. 병원은 진료 이후에도 고객 접점을 만들어야 한다.
3. 창조트리문화센터는 AI 이미지, 오프라인 문화센터, 선물 미션을 연결한다.
4. 산모는 즐겁게 참여하고 병원은 반복되는 브랜드 경험을 얻는다.
5. 운영은 병원 부담을 줄이는 방식으로 설계된다.
6. 의료광고 리스크가 있는 후기 보상 표현은 피한다.
7. 최종 CTA는 병원별 맞춤 구성 상담으로 연결한다.

## 문구 안전 기준

사용 권장 표현:

- 문화센터 프로그램 만족도 조사
- 작품 후기
- 클래스 참여 인증
- 비의료 영역 중심의 참여 반응
- 미션 완료 혜택
- 문화센터 운영 혜택
- 출산 준비 선물 구성
- 병원별 운영 가이드 제공

사용 금지 표현:

- 병원 후기 작성 시 상품권 지급
- 진료 후기 작성 시 선물 증정
- 치료 경험담 작성 리워드
- 병원 추천글 작성 보상
- 출산 후기 작성 시 백화점상품권 지급

필요하면 다음 방향을 사용한다.

> 진료 후기나 치료경험담을 조건으로 한 보상은 의료광고 규정상 주의가 필요합니다. 창조트리문화센터는 문화센터 프로그램 만족도, 작품 후기, 참여 인증 등 비의료 영역 중심으로 운영 가이드를 제안합니다.

## UI 체크리스트

- 첫 화면에서 대상, 서비스 정의, 병원 도입 이유, CTA가 5초 안에 이해되어야 한다.
- Hero H1은 2~3줄 안에서 강하게 읽히게 한다.
- 산모 혜택은 병원 성과 언어로 번역한다.
- CTA는 Hero, 중간 설득 구간, Sticky CTA, Footer/Lead Form에 자연스럽게 반복한다.
- 실제 앱 화면, 클래스, 선물, 상담 폼 미리보기가 없는 추상 설명만으로 끝내지 않는다.
- 페이지 전체를 보라색/다크톤 하나로 밀지 않고 프리미엄 B2B, 따뜻한 산모 감성, AI 현대성, 의료기관 신뢰감을 함께 유지한다.
- 모바일에서 Hero, 목업, 패키지 카드, FAQ, Lead Form, Sticky CTA가 겹치지 않게 한다.
- 폼에는 required, email, phone, 개인정보 동의 validation과 loading/success/error 상태를 둔다.
- 버튼과 입력 요소에는 hover, active, focus-visible 상태를 둔다.

## 검증과 보고

- 가능한 범위에서 `npm run typecheck`와 `npm run build`를 실행한다.
- `!!테스트!!`가 있으면 브라우저 기반 화면 검증까지 수행한다.
- 최종 보고에는 변경 파일, 핵심 변경 내용, 검증 결과, 실행하지 못한 검증, git add/commit/push 여부를 포함한다.
