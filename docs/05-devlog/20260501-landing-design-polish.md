# 2026-05-01 병원 랜딩페이지 디자인 개선

## 변경 파일

- `client/src/styles.css`
- `client/src/components/hospital/HeroSection.tsx`
- `client/src/pages/HospitalLandingPage.tsx`

## 핵심 변경 내용

- `Pretendard Variable` 웹폰트를 명시적으로 로딩해 한글 타이포그래피 품질을 개선했다.
- Hero 영역을 프리미엄 B2B 톤에 맞춰 배경, 라벨, 헤드라인 행간, CTA, 앱 목업 배치를 재정리했다.
- 카드, 패키지, 타임라인, FAQ, 상담 폼, Sticky CTA의 그림자/테두리/여백/폰트 굵기를 통일했다.
- 전체 팔레트를 다크 네이비, 퍼플, 시안, 코랄, 골드 포인트로 정리해 단조로운 보라색 화면이 되지 않도록 조정했다.
- 모바일에서 Hero 텍스트와 목업이 과하게 겹치지 않도록 반응형 기준을 다듬었다.

## 검증 결과

- `npm.cmd run typecheck`: 통과
- `npm.cmd run build`: 통과

## 남은 확인

- 실제 브라우저에서 데스크톱/모바일 폭별 Hero, 상담 폼, Sticky CTA 겹침 여부를 육안으로 확인하면 좋다.
- 운영 반영은 별도 commit/push 및 Railway 재배포가 필요하다.
