# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

바이브 코딩 2주차 실습 결과물을 한 저장소에 모은 프로젝트. 백엔드·빌드 도구·외부 라이브러리 없이 브라우저에서 바로 열리는 **정적 웹페이지 여러 개**로 구성되며, 동덕여자대학교 대표색인 와인/자주 계열을 공통 테마로 씁니다. GitHub Pages로 배포됩니다.

## Commands

### 로컬 웹 서버 실행 (택 1)
- Python 내장 서버: `python -m http.server 8000` (접속: http://localhost:8000)
- Node.js http-server: `npx http-server -p 8000` (접속: http://localhost:8000)
- 또는 `index.html`을 브라우저로 바로 열어도 동작합니다(외부 의존성 없음).

### Git 관련 기본 명령어
- 원격 저장소 최초 연동 및 푸시: `git push -u origin main`
- 독립된 히스토리를 가진 원격 브랜치 병합: `git pull origin main --allow-unrelated-histories`

## Architecture

여러 개의 독립 정적 페이지를 한 저장소에 모은 구조입니다. 각 페이지는 서로 참조하지 않고 홀로 열립니다(빌드·번들·외부 CDN 없음). `index.html`이 GitHub Pages 홈이라 **루트에 있어야 하며**, 나머지 페이지는 파일 위치가 곧 공개 URL이므로 함부로 하위 폴더로 옮기면 README의 링크가 깨집니다.

- **`index.html`**: 동덕여대 스타일 **LMS 대시보드**. 단일 파일(마크업 + 인라인 `<style>`/`<script>`). 상단 헤더 + 벤토(bento) 카드 그리드, 12컬럼 CSS Grid에서 카드마다 `.c3`~`.c12` 스팬 클래스로 배치. 요약 통계·출결 도넛·성적표·GPA·과제 진행바 등으로 구성되고, 예시 데이터는 HTML에 하드코딩.
- **`guestbook.html`**: 방명록. `localStorage`에 저장되어 새로고침해도 유지되고 글 삭제 가능.
- **`dragons.html`**: 드래곤 길들이기 인물·관계도. 자작 SVG 관계도(연인 노드 하트 팝)·인물 카드(최애 저장)·버크섬 밤 배경.
- **`hello/`**: 이름을 입력하면 인사하는 페이지. 자체 `index.html`/`styles.css`/`script.js` 3파일 구조라 폴더 안에 별도 `CLAUDE.md`가 있고, 그 폴더에서 작업할 때 추가로 로드됩니다.
- **데이터/상태**: 서버 연동 없음. 저장이 필요한 페이지만 `localStorage` 사용.

## Conventions

### 1. 코드 작성 및 설계 규칙
- **바닐라 스택 지향**: 프레임워크·외부 런타임 의존 없이 순수 HTML/CSS/JS로 가볍게 구현합니다.
- **단일 파일 유지**: 별도 지시가 없으면 CSS·JS를 분리하지 않고 `index.html` 한 파일 안에 유지합니다.
- **테마 색상**: 동덕여대 대표색인 와인/자주 계열을 사용합니다. 색상은 `:root`의 CSS 변수(`--ddwu-wine`, `--ddwu-gold` 등)로 정의하고 재사용합니다.
- **반응형**: 미디어 쿼리로 넓은 화면은 다열, 좁은 화면은 1열로 재배치합니다.

### 2. Git & 브랜치 규칙
- **단일 브랜치**: `main` 브랜치를 기준으로 실습을 진행하며, 원격(GitHub)과 로컬을 동기화합니다.
- **히스토리 병합**: 원격과 최초 커밋 기점이 다를 경우 `--allow-unrelated-histories` 플래그를 활용해 병합합니다.

### 3. 커밋 메시지 규칙
- 작업 목적을 한글로 기술합니다. 필요 시 가독성을 위해 대괄호 프리픽스를 사용할 수 있습니다:
  - `[출결]`, `[성적]`, `[과제]`: 각 기능 관련 변경
  - `[디자인]`: 레이아웃·스타일 수정
  - `[설정]`: CLAUDE.md·README 등 문서/설정 변경
