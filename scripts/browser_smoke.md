# Browser Smoke Check

이 문서는 `!!테스트!!`가 포함된 화면 작업에서 사용하는 브라우저 검증 절차다. 기본은 Codex Browser Use 플러그인 또는 `$playwright` 스킬을 사용한다.

## 사전 실행

PowerShell 또는 Git Bash에서 개발 서버를 실행한다.

```bash
npm.cmd run dev
```

브라우저 검증 대상:

```text
http://localhost:5173
```

## 필수 뷰포트

- Desktop: 1440 x 900
- Tablet: 768 x 1024
- Mobile: 390 x 844

## 랜딩페이지 확인 항목

- Hero H1, CTA, 앱 목업이 겹치지 않는다.
- Sticky CTA가 본문, FAQ, 상담 폼 입력 영역을 가리지 않는다.
- Packages 카드의 버튼과 텍스트가 카드 밖으로 넘치지 않는다.
- FAQ 문항과 답변이 모바일에서 읽기 쉽다.
- Lead Form의 required, email, phone, 개인정보 동의 validation이 동작한다.
- Lead Form의 loading, success, error 상태가 사용자에게 명확하다.
- 키보드 포커스가 CTA, 입력 필드, 제출 버튼에서 보인다.
- meaningful image 또는 mockup에 적절한 대체 텍스트가 있다.

## API/폼 확인 항목

- 상담 폼 제출 성공 시 성공 메시지가 표시된다.
- 필수값 누락 시 inline error가 표시된다.
- 개인정보 동의 없이는 제출되지 않는다.
- 개발 서버 콘솔에 연락처와 이메일이 과도하게 출력되지 않는다.

## Playwright CLI 참고

`$playwright` 스킬을 사용할 때는 snapshot을 먼저 뜨고 element ref를 기준으로 조작한다.

```bash
export CODEX_HOME="${CODEX_HOME:-$HOME/.codex}"
export PWCLI="$CODEX_HOME/skills/playwright/scripts/playwright_cli.sh"
"$PWCLI" open http://localhost:5173 --headed
"$PWCLI" snapshot
"$PWCLI" screenshot
```

Windows PowerShell에서 Git Bash wrapper가 불안정하면 Codex Browser Use 플러그인을 우선 사용한다.
