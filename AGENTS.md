# CT_official Codex 프로젝트 지침

이 저장소는 Codex 개발을 기준으로 하며, 루트의 `AGENTS.md`를 단일 프로젝트 지침 파일로 사용한다.

`GEMINI.md`는 별도로 만들지 않는다. 모든 핵심 지침은 이 파일에 통합한다.

---

## 0. 최우선 적용 원칙

Codex는 작업을 시작하기 전에 사용자 메시지의 키워드를 가장 먼저 확인한다.

| 키워드 | 행동 규칙 |
| --- | --- |
| `!!질문!!` | 파일 또는 코드를 수정하지 않는다. 조사, 분석, 의견, 보고만 수행한다. |
| `!!승인!!` | 코드 및 파일 수정이 허용된다. 단, git add/commit/push는 제외한다. |
| `!!푸시!!` | 사용자가 명시한 범위 안에서 `git add`, `git commit`, `git push`를 수행할 수 있다. |
| `!!테스트!!` | 화면 검증이 필요한 작업이면 브라우저 기반 검증까지 수행한다. |

### `!!질문!!` 상세 규칙

`!!질문!!`이 포함된 요청에서는 다음을 지킨다.

- 파일 읽기, 검색, 로그 확인은 허용한다.
- 답변, 분석, 계획 제안은 허용한다.
- 파일 생성, 파일 수정, 코드 변경은 금지한다.
- 사용자가 질문 끝에 "가능해?", "해줄 수 있어?"라고 적어도 수정하지 않는다.
- 수정이 필요하면 사용자가 별도 메시지에 `!!승인!!`을 포함해야 한다.

### git 명령 제한

- 사용자가 `!!푸시!!`를 명시하지 않는 한 `git add`, `git commit`, `git push`를 실행하지 않는다.
- `!!승인!!`은 파일 수정 승인이지 git stage/commit/push 승인이 아니다.
- git 상태 확인, diff 확인 등 읽기 목적 명령은 가능하다.

---

## 1. 언어와 보고 규칙

- 모든 문서 작성, 작업 보고, 진행 상황 공유, 최종 답변은 한국어로 진행한다.
- 코드 식별자, 파일명, 명령어, 로그, 외부 API 명칭은 원문을 유지할 수 있다.
- 작업 중 변경한 파일과 변경 이유를 간단명료하게 보고한다.
- 사용자가 보지 못하는 터미널 출력은 중요한 내용만 요약해 전달한다.
- 불확실한 내용은 추측하지 말고 확인하거나 질문한다.

---

## 2. 프로젝트 목적

`CT_official`은 창조트리문화센터의 병원 영업용 랜딩페이지와 관련 운영 기능을 개발하기 위한 프로젝트다.

핵심 목표는 다음과 같다.

1. 산부인과, 산후조리원, 소아과, 여성병원 대상 B2B 도입 상담 전환
2. 창조트리문화센터를 병원 전용 AI 문화센터로 소개
3. 병원 상담 리드 수집 및 관리
4. Railway 기반 서버, DB, 배포 구조 구축
5. 의료광고 리스크를 피하는 안전한 문구와 운영 방식 유지

서비스 포지셔닝:

> 창조트리문화센터는 산모에게는 1년짜리 문화혜택을, 병원에는 다시 기억되는 고객 접점을 만들어주는 병원 전용 AI 문화센터다.

---

## 3. 필수 참조 문서

### 초기 구축 및 관련 작업 시 필수 참조

아래 작업을 수행할 때는 먼저 다음 문서를 읽고 따른다.

- `docs/06-hospital-sales-landing/20260501-병원영업용_랜딩페이지_제작계획.md`

필수 참조가 필요한 작업:

- 병원 영업용 랜딩페이지 초기 구축
- 랜딩페이지 섹션 구조 변경
- Hero, CTA, 패키지, FAQ, 상담 폼 문구 수정
- 병원 상담 리드 DB/API 구현 또는 변경
- Railway 배포 구조 변경
- 의료광고, 후기, 리워드, 선물 관련 표현 검토
- 디자인 방향, 색상, 레이아웃, 반응형 구조 변경

### MVP 이후 참조 기준

랜딩페이지 MVP 구축이 완료된 뒤에는 모든 작업에서 위 문서를 무조건 정독하지 않아도 된다. 단, 작업 범위가 랜딩페이지 기획, 병원 영업 문구, 상담 리드, 의료광고 리스크, 디자인 방향과 관련되면 필요한 섹션을 반드시 확인한다.

### 인수인계 문서

`docs/05-devlog/` 경로가 존재하면 작업 시작 전 최신 인수인계 문서를 확인한다. 경로가 없으면 생략한다.

---

## 4. 권장 기술 방향

프로젝트의 실제 구현 상황을 우선하되, 초기 구축 시에는 아래 방향을 기본값으로 둔다.

| 영역 | 권장 기술 |
| --- | --- |
| Frontend | React + TypeScript + Vite |
| UI | Tailwind CSS + shadcn/ui 또는 프로젝트 내 UI 시스템 |
| Backend | Express.js + TypeScript |
| Database | Railway PostgreSQL |
| ORM/Query | Drizzle ORM 또는 프로젝트에서 선택한 표준 방식 |
| Deploy | Railway |
| Analytics | GA4, Meta Pixel, 네이버 전환 추적 또는 서버 이벤트 로그 |
| Notification | 이메일, 카카오 채널, Slack/Discord/Webhook 중 선택 |

기술 선택이 이미 되어 있다면 기존 프로젝트 설정을 우선한다.

---

## 5. 병원 랜딩페이지 제작 원칙

### 핵심 설득 순서

1. 저출생 시대에는 산모 한 명의 경험 가치가 커졌다.
2. 병원은 진료 이후에도 고객 접점을 만들어야 한다.
3. 창조트리문화센터는 AI 이미지, 오프라인 문화센터, 선물 미션을 연결한다.
4. 산모는 즐겁게 참여하고 병원은 반복되는 브랜드 경험을 얻는다.
5. 운영은 병원 부담을 줄이는 방식으로 설계된다.
6. 의료광고 리스크가 있는 후기 보상 표현은 피한다.
7. 최종 CTA는 병원별 맞춤 구성 상담으로 연결한다.

### 권장 메인 카피

> 산모가 병원을 선택한 이유를, 출산 후에도 계속 기억하게 합니다.

### 디자인 방향

- 프리미엄 병원 B2B + AI 서비스 + 따뜻한 산모 감성을 함께 유지한다.
- Hero와 CTA에는 다크톤, 보라색 AI 포인트, 앱 화면 목업을 활용한다.
- 본문 구간은 밝은 배경과 신뢰감 있는 카드 구조를 충분히 사용한다.
- 랜딩페이지는 마케팅 설명문이 아니라 실제 상담 전환을 위한 화면이어야 한다.
- 모바일에서 CTA, 폼, 비교표, 타임라인이 읽기 쉽게 보여야 한다.

### 피해야 할 디자인

- 페이지 전체를 보라색/다크톤 하나로만 밀어붙이는 구성
- 산모 이벤트처럼만 보이는 과한 선물 프로모션 톤
- 병원 의사결정자에게 필요한 운영/리포트/안전성 설명이 부족한 구성
- 긴 설명만 있고 실제 앱 화면, 클래스, 선물, 폼 미리보기가 없는 구성

---

## 6. 의료광고·후기·리워드 표현 규칙

병원 영업용 페이지에서는 의료광고와 환자 유인 오해를 피해야 한다.

### 사용 권장 표현

- 문화센터 프로그램 만족도 조사
- 작품 후기
- 클래스 참여 인증
- 비의료 영역 중심의 참여 반응
- 미션 완료 혜택
- 문화센터 운영 혜택
- 출산 준비 선물 구성
- 병원별 운영 가이드 제공

### 사용 금지 표현

- 병원 후기 작성 시 상품권 지급
- 진료 후기 작성 시 선물 증정
- 치료 경험담 작성 리워드
- 병원 추천글 작성 보상
- 출산 후기 작성 시 백화점상품권 지급

### 주의 문구

필요 시 다음 방향으로 안내한다.

> 진료 후기나 치료경험담을 조건으로 한 보상은 의료광고 규정상 주의가 필요합니다. 창조트리문화센터는 문화센터 프로그램 만족도, 작품 후기, 참여 인증 등 비의료 영역 중심으로 운영 가이드를 제안합니다.

---

## 7. 서버·DB·상담 리드 운영 규칙

상담 폼은 단순 이메일 발송으로 끝내지 말고 DB에 저장하는 구조를 우선한다.

### 기본 데이터 구조

MVP에서 우선 고려할 테이블:

- `hospital_leads`: 상담 신청 본 데이터
- `hospital_lead_events`: 상태 변경, 알림 발송, 중복 제출 등 이벤트 이력
- `hospital_lead_notes`: 영업 담당자 상담 메모
- `hospital_landing_events`: CTA 클릭, 폼 시작, 제출 등 전환 이벤트 로그

### 필수 저장 항목

- 병원명
- 지역
- 담당자명
- 연락처
- 이메일
- 병원 유형
- 월평균 산모 고객 수
- 희망 서비스
- 문의 내용
- 상담 상태
- 유입 경로 및 UTM
- 개인정보 동의 여부
- 개인정보 동의 시각
- IP, user-agent
- 생성일, 수정일

### 상담 상태 예시

- `new`
- `contacted`
- `proposal_sent`
- `negotiating`
- `closed`
- `rejected`
- `spam`

### API 방향

공개 API:

- `POST /api/hospital-leads`
- `POST /api/hospital-landing-events`

관리자 API:

- `GET /api/admin/hospital-leads`
- `GET /api/admin/hospital-leads/:id`
- `PATCH /api/admin/hospital-leads/:id/status`
- `POST /api/admin/hospital-leads/:id/notes`
- `GET /api/admin/hospital-leads/export.csv`

### 개인정보와 보안

- 개인정보 수집 및 이용 동의 체크박스는 필수다.
- 동의 시각, IP, user-agent를 저장한다.
- 관리자 API는 인증된 관리자만 접근할 수 있어야 한다.
- 운영 로그에 연락처와 이메일을 과도하게 출력하지 않는다.
- CSV 다운로드는 관리자 또는 슈퍼관리자 권한으로 제한한다.

---

## 8. Railway 운영 규칙

Railway를 사용할 경우 다음 기준을 따른다.

### 권장 구조

- 랜딩 프로젝트는 별도 Railway 서비스로 배포한다.
- DB는 별도 Railway PostgreSQL을 우선 추천한다.
- 기존 창조트리 관리자와 통합해야 한다면 기존 DB에 테이블을 추가할 수 있다.
- 운영 DB 마이그레이션은 반드시 대상 DB URL을 확인한 뒤 진행한다.

### 환경변수 예시

```text
DATABASE_URL=
NODE_ENV=production
PUBLIC_SITE_URL=
ADMIN_JWT_SECRET=
CORS_ORIGIN=
LEAD_NOTIFY_EMAILS=
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
SMTP_FROM=
LEAD_WEBHOOK_URL=
GA_MEASUREMENT_ID=
META_PIXEL_ID=
NAVER_AD_CONVERSION_ID=
ENABLE_HOSPITAL_LEAD_EMAIL=true
ENABLE_HOSPITAL_EVENT_LOG=true
LEAD_RATE_LIMIT_PER_HOUR=5
```

### 배포 전 확인

- DB 마이그레이션 적용 여부
- 상담 폼 제출 성공 여부
- DB 저장값 확인
- 관리자 리드 목록 확인
- 알림 발송 확인
- 개인정보 동의 기록 확인
- 모바일 화면 확인
- CTA 전환 이벤트 확인

---

## 9. 코드 품질 규칙

- 기존 코드 패턴을 먼저 확인하고 따른다.
- 동일 로직이 2번 이상 등장하면 공통 함수나 컴포넌트로 분리한다.
- 하나의 함수와 컴포넌트는 하나의 책임을 갖게 한다.
- 하드코딩 대신 의미 있는 상수와 설정값을 사용한다.
- `any` 타입 사용을 최소화한다.
- API 응답 타입은 가능한 한 서버와 클라이언트에서 공유한다.
- 복잡한 UI 상태와 API 호출은 커스텀 훅으로 분리한다.
- 라우트 핸들러에는 입력 검증과 예외 처리를 둔다.
- DB 작업은 서비스 레이어 또는 명확한 함수로 분리한다.

### 파일 크기 기준

- 단일 파일이 1000줄에 가까워지면 분리를 검토한다.
- 큰 리팩토링은 한 번에 여러 영역을 건드리지 않는다.
- 복사, 검증, 정리 순서로 안전하게 진행한다.

---

## 10. 브라우저 테스트 규칙

- 사용자가 `!!테스트!!`를 포함했고 화면 검증이 필요한 작업이면 브라우저 기반 검증을 수행한다.
- 랜딩페이지 작업에서는 최소 데스크톱, 태블릿, 모바일 폭을 확인한다.
- Hero, CTA, 상담 폼, 패키지 카드, FAQ, Sticky CTA가 겹치지 않는지 확인한다.
- 폼 제출 성공/실패 상태를 확인한다.
- 텍스트가 버튼이나 카드 밖으로 넘치지 않는지 확인한다.

`!!테스트!!`가 없으면 가능한 코드 수준 검증을 수행하고, 필요한 수동 확인 절차를 안내한다.

---

## 11. 문서화와 인수인계

코드 또는 설정 변경이 발생한 작업은 필요 시 `docs/05-devlog/`에 인수인계 문서를 작성한다.

인수인계 문서에는 다음을 포함한다.

- 변경 파일 목록
- 핵심 변경 내용
- 왜 변경했는지
- 검증 결과
- 남은 이슈 또는 주의사항
- 다음 작업 참고사항

단순 질문 답변, 문서만 검토한 작업, 아주 작은 문구 수정은 인수인계 문서를 생략할 수 있다.

---

## 12. 완료 보고 형식

작업 완료 보고에는 다음을 포함한다.

- 변경한 파일
- 핵심 변경 내용
- 검증한 내용
- 실행하지 못한 검증이 있다면 그 이유
- git add/commit/push를 하지 않았는지 또는 사용자가 요청해 수행했는지

---

## 13. 우선순위

규칙 충돌 시 우선순위는 다음과 같다.

1. Codex 상위 시스템/개발자 지침
2. 사용자 최신 요청
3. 이 `AGENTS.md`
4. `docs/06-hospital-sales-landing/20260501-병원영업용_랜딩페이지_제작계획.md`
5. 기타 문서

모르는 것은 추측하지 않는다. 문서와 코드에서 확인하고, 그래도 불확실하면 사용자에게 질문한다.

---

## 14. Codex 스킬 사용 규칙

이 저장소는 repo 전용 스킬을 `.agents/skills/`에 둔다. Codex는 작업 내용이 스킬 설명과 맞으면 자동으로 사용할 수 있으며, 중요한 작업에서는 사용자가 `$스킬명`으로 직접 호출할 수 있다.

### 기본 자동 사용 스킬

병원 영업용 랜딩페이지, CTA, Hero, 패키지, FAQ, B2C Preview, 상담 폼, Sticky CTA, 반응형, 의료광고 안전 문구, 상담 리드 DB/API/관리자, Railway 배포 작업에서는 `$createtree-landing-polish`를 우선 사용한다.

기존 UI를 고도화하거나 디자인 감사를 할 때는 `$redesign-existing-projects`를 함께 사용한다.

긴 파일 작성, 큰 컴포넌트 분리, 전체 산출물 작성처럼 코드 생략이나 누락을 피해야 하는 작업에는 `$full-output-enforcement`를 함께 사용한다.

React 컴포넌트 성능, 컴포넌트 분리, props/API 구조, 재사용 패턴 작업에는 필요 시 `$vercel-react-best-practices`와 `$vercel-composition-patterns`를 명시적으로 함께 사용한다.

UI/UX, 접근성, 폼 사용성, 포커스 상태, 모바일 터치 영역 점검에는 필요 시 `$web-design-guidelines`를 명시적으로 함께 사용한다.

Express API, 관리자 인증, JWT, CORS, Helmet, 개인정보 리드 저장, 입력값 검증, 보안 리뷰 작업에는 필요 시 `$security-best-practices`를 명시적으로 함께 사용한다.

성능, 접근성, SEO, Core Web Vitals, Lighthouse 기준 품질 점검에는 필요 시 `$web-quality-audit`, `$performance`, `$core-web-vitals`, `$accessibility`, `$seo`를 명시적으로 함께 사용한다.

Railway 배포, 환경변수, DB 연결, 도메인, health check, build/start command, 배포 장애 점검에는 필요 시 `$use-railway`를 명시적으로 함께 사용한다.

### 참고용 디자인 스킬

`$gpt-taste`와 `$high-end-visual-design`은 설치되어 있지만 자동 사용을 제한한다. 이 두 스킬은 새 Hero, CTA, 앱 목업, 프리미엄 비주얼 방향을 탐색할 때만 명시적으로 참고한다.

두 스킬이 Tailwind, GSAP, Framer Motion, 특정 폰트, 특정 아이콘 도입을 요구하더라도 이 프로젝트에서는 기존 React + TypeScript + Vite + vanilla CSS 구조로 변환해 적용한다. 새 의존성은 사용자가 명시적으로 승인하기 전까지 추가하지 않는다.

### 스킬 충돌 시 우선순위

스킬 지침이 프로젝트 규칙과 충돌하면 다음 순서를 따른다.

1. Codex 상위 시스템/개발자 지침
2. 사용자 최신 요청
3. 이 `AGENTS.md`
4. `$createtree-landing-polish`
5. `docs/06-hospital-sales-landing/20260501-병원영업용_랜딩페이지_제작계획.md`
6. `$security-best-practices`, `$use-railway`
7. `$vercel-react-best-practices`, `$vercel-composition-patterns`, `$web-design-guidelines`
8. `$web-quality-audit`, `$performance`, `$core-web-vitals`, `$accessibility`, `$seo`
9. `$redesign-existing-projects`
10. `$full-output-enforcement`
11. `$gpt-taste`, `$high-end-visual-design` 등 참고용 외부 디자인 스킬

### 운영 방식

- `!!질문!!` 요청에서는 스킬이 있더라도 파일을 수정하지 않는다.
- `!!승인!!` 요청에서는 필요한 파일 수정은 가능하지만 `git add`, `git commit`, `git push`는 하지 않는다.
- `!!푸시!!` 요청에서만 사용자가 명시한 범위 안에서 git stage/commit/push를 수행한다.
- `!!테스트!!`가 있고 화면 검증이 필요한 작업이면 브라우저 기반 데스크톱, 태블릿, 모바일 검증을 수행한다.
- 스킬을 새로 설치하거나 수정한 뒤 Codex가 인식하지 못하면 Codex 세션을 재시작해 확인한다.

---

## 15. MCP 활용 규칙

MCP는 무조건 많이 연결하지 않고, 현재 프로젝트의 보안과 검증 목적에 맞는 범위에서만 사용한다.

### 기본 원칙

- 로컬 파일 읽기, 검색, 수정은 Codex 기본 파일 도구와 shell을 우선 사용한다. 별도 filesystem MCP는 필수로 두지 않는다.
- OpenAI API, 모델, Agents, Codex 관련 최신 문서 확인은 `openaiDeveloperDocs` MCP 또는 `$openai-docs`를 우선 사용한다.
- 브라우저 검증은 `!!테스트!!`가 포함된 화면 작업에서 Browser Use 플러그인 또는 `$playwright` 스킬을 사용한다.
- PostgreSQL/DB MCP는 기본 비활성으로 둔다. 병원 상담 리드 개인정보와 운영 DB URL 보호가 우선이므로, 필요 시 read-only, schema-only, production 금지 원칙으로 별도 승인 후 사용한다.
- Google Drive 등 외부 문서 MCP는 사용자가 명시적으로 Drive/Docs/Sheets/Slides 파일을 언급했을 때만 사용한다.

### 검증 자동화 기준

- 자동 검증은 MCP 의존보다 repo 내부 `scripts/quick_validate.py` 같은 로컬 스크립트를 우선한다.
- 기본 구조 검증은 `npm.cmd run validate` 또는 `python scripts/quick_validate.py`로 수행한다.
- 타입 검증은 `npm.cmd run typecheck`로 수행한다.
- 배포 전 빌드 검증은 `npm.cmd run build` 또는 `npm.cmd run verify:build`로 수행하되, 사용자가 요청하지 않은 작업에서 임의로 장시간 빌드를 반복하지 않는다.
- 브라우저 검증 절차는 `scripts/browser_smoke.md`를 따른다.

### MCP별 사용 전략

| 구분 | 사용 전략 |
| --- | --- |
| filesystem | 현재 Codex 파일 도구와 shell로 충분하므로 별도 MCP 설치를 기본값으로 하지 않는다. |
| openai docs | 이미 `openaiDeveloperDocs` MCP가 설정되어 있으므로 OpenAI 관련 최신 문서 확인에만 사용한다. |
| browser/playwright | 화면 검증, 폼 검증, 반응형 확인에 사용한다. 테스트 파일 생성보다 브라우저 실검증을 우선한다. |
| database/postgres | 지금은 정적 코드와 migration 검증을 우선한다. 실제 DB 연결 MCP는 운영 정보 보호를 위해 별도 승인 후 제한적으로 사용한다. |

---

## 16. 스킬 목록과 자동 갱신

### 스킬 위치와 목록

- Codex repo-local 스킬은 `.agents/skills/`에 둔다.
- 설치된 스킬 목록은 `.agents/skills/SKILLS_INDEX.md`에서 확인한다.
- 이 목록은 직접 편집하지 않고 `npm run skills:sync`로 재생성한다.
- 스킬 구조와 목록 최신성은 `npm run skills:check`로 검증한다.
- 기존 `npm run verify`는 스킬 검증을 포함한다.
- 자동 호출은 `$createtree-landing-polish`만 기본값으로 둔다.
- 공통 품질/참고 스킬은 컨텍스트와 속도 보호를 위해 `$스킬명`으로 명시 호출할 때만 사용한다.

### 자동 Skill Impact Check

기능 개발, 기존 기능 변경, 업데이트 완료 시 Codex는 아래 항목을 자동 확인한다.

1. 반복 작업 규칙이나 새 랜딩/리드 운영 흐름이 생겼는가?
2. API, DB, 컴포넌트, 검증 명령, 문서 위치가 바뀌었는가?
3. 기존 스킬 설명이 현재 코드와 달라졌는가?
4. 새 기능이 향후 반복 개발될 가능성이 큰가?

하나라도 해당하면 관련 스킬을 업데이트하고 `npm run skills:sync` 및 `npm run skills:check`를 실행한다.

### 사용자 확인이 필요한 운영 정책 변경

아래 변경은 자동 반영하지 않고 사용자 확인 후 스킬에 반영한다.

- 배포/인프라 기준 변경
- 운영 DB 접근 원칙 변경
- 개인정보/보안 기준 변경
- 의료광고/법무 표현 기준 변경
- AI provider/model 운영 기준 변경
- 금전/계약/영업 데이터 기준 변경
- 스킬 자동화 권한, `!!승인!!`, `!!푸시!!`, `!!테스트!!` 규칙 변경
