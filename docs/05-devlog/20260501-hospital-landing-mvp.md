# 2026-05-01 병원 영업용 랜딩페이지 MVP 구현 인수인계

## 변경 파일

- `package.json`, `package-lock.json`: React/Vite, Express, TypeScript 기반 단일 서비스 의존성 및 스크립트 구성
- `client/src/**`: 병원 영업용 랜딩페이지, 상담 폼, 관리자 로그인/리드 관리 화면 구현
- `server/src/**`: Express API, PostgreSQL 저장, 관리자 JWT 인증, 상태 변경 API 구현
- `shared/hospital.ts`: 병원 리드 상태, 병원 유형, 희망 서비스 타입과 라벨 정의
- `db/migrations/20260501_create_hospital_landing_leads.sql`: `hospital_leads` 테이블 마이그레이션
- `.env.example`: Railway 및 관리자 로그인 환경변수 예시
- `railway.json`: Railway Nixpacks 빌드/시작 명령 설정

## 핵심 변경 내용

- `/hospital-culture-center`를 포함한 모든 일반 경로에서 React 랜딩페이지를 제공한다.
- `/admin`에서 `.env` 기반 `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `ADMIN_JWT_SECRET` 로그인 후 리드 목록/상세/상태 변경을 처리한다.
- 상담 폼은 `POST /api/hospital-leads`로 전송되며 필수값, 개인정보 동의, 희망 서비스 검증 후 `hospital_leads`에 저장한다.
- 알림, CSV, 이벤트 로그, 카카오 연동은 2차 범위로 남겼다.

## 검증 결과

- `npm.cmd install`: 완료, 취약점 0건
- `npm.cmd run typecheck`: 통과
- `npm.cmd run build`: 통과
- 빌드 산출 서버에서 `/api/health`: 200 응답 확인
- 빌드 산출 서버에서 `/hospital-culture-center`, `/admin`: SPA HTML 200 응답 확인
- 관리자 로그인 API: 환경변수 주입 후 200 응답 및 JWT 발급 확인
- 상담 폼 API 검증 실패 케이스: 400 `VALIDATION_ERROR` 확인

## 남은 이슈

- 실제 Railway PostgreSQL `DATABASE_URL` 환경에서 마이그레이션 적용 후 상담 신청 저장 성공 여부를 확인해야 한다.
- 실제 운영용 관리자 계정/비밀번호/JWT secret을 Railway 환경변수에 등록해야 한다.
- 실제 전화번호, 카카오 상담 링크, 서비스 화면 이미지 또는 실제 앱 캡처는 추후 반영이 필요하다.
- `hospital_lead_events`, 알림, CSV 다운로드, 이벤트 로그, 카카오 연동은 2차 작업 범위다.

## 다음 작업 참고

1. Railway Web Service를 생성하고 GitHub 또는 수동 배포 방식으로 이 프로젝트를 연결한다.
2. Railway PostgreSQL에 `db/migrations/20260501_create_hospital_landing_leads.sql`을 적용한다.
3. `.env.example` 기준으로 Railway 환경변수를 등록한다.
4. 배포 후 상담 폼 제출, DB 저장값, 관리자 목록/상세/상태 변경을 실제 DB로 확인한다.
