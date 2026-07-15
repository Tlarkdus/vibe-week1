# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

바이브 코딩 2주차 실습 프로젝트. 학생의 출결·성적·과제를 한 화면에서 확인하는 동덕여자대학교 스타일의 학습관리(LMS) 대시보드 웹 페이지입니다.

## Commands

### 로컬 웹 서버 실행 (택 1)
- Python 내장 서버: `python -m http.server 8000` (접속: http://localhost:8000)
- Node.js http-server: `npx http-server -p 8000` (접속: http://localhost:8000)
- 또는 `index.html`을 브라우저로 바로 열어도 동작합니다(외부 의존성 없음).

### Git 관련 기본 명령어
- 원격 저장소 최초 연동 및 푸시: `git push -u origin main`
- 독립된 히스토리를 가진 원격 브랜치 병합: `git pull origin main --allow-unrelated-histories`

## Architecture

백엔드·빌드 도구·외부 라이브러리 없이 브라우저에서 바로 열리는 **단일 파일 정적 페이지**입니다.

- **`index.html`**: 페이지 전체(마크업 + `<style>` 인라인 CSS + 소량의 인라인 `<script>`)를 담은 단일 파일. CDN·외부 스타일시트·폰트 등 네트워크 의존성이 전혀 없습니다.
- **레이아웃**: 상단 헤더 + 벤토(bento) 카드 그리드. 12컬럼 CSS Grid에서 카드마다 `.c3`~`.c12` 스팬 클래스로 크기를 다르게 배치합니다.
- **구성 요소**: 요약 통계 카드 4개, 출결 현황(도넛 차트 + 칩), 성적표, 강조 GPA 카드, 진행 중 과제(진행바), 과목별 출결, 전체 과제 목록.
- **데이터**: 현재는 실습용 예시 데이터를 HTML에 하드코딩. 상태 저장(localStorage)이나 서버 연동은 없습니다.

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
