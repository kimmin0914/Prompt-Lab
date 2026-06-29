# Prompt-Lab 🧪

### Prompt Engineering Lab
**대형 언어 모델(LLM)과 소통하는 프롬프트 핵심 기법을 시각적으로 탐구하는 가상 실험실**

웹 프로그래밍 과제로 제작된 동적 웹 애플리케이션 포트폴리오입니다.

[![🚀 실험실 바로가기](https://img.shields.io/badge/🚀%20실험실%20바로가기-06b6d4?style=for-the-badge&logo=googlechrome&logoColor=white)](https://kimmin0914.github.io/Prompt-Lab/)

---

## 📌 Project Overview
최신 AI 모델을 다루기 위한 프롬프트 기법들을 직관적으로 학습할 수 있는 **'사이버펑크/해커 터미널' 테마**의 다중 페이지 웹 애플리케이션(MPA)입니다.

기존 순수 HTML/CSS 구조(V1)에서 나아가, **JavaScript(ES6+)와 jQuery, 최신 브라우저 API(Web Storage)**를 적극 도입하여(V2) 사용자가 직접 프롬프트를 조립하고, 실시간으로 AI와 상호작용하며, 데이터를 영구 보관할 수 있는 실무 수준의 애플리케이션으로 고도화했습니다.

---

## 📂 Folder Structure
모듈화 및 확장성을 고려하여 기능별로 HTML 페이지를 완벽하게 분리했습니다.

* `index.html` : 메인 랜딩 페이지
* `terminal.html` : 가상 터미널 봇 (키워드 챗봇)
* `builder.html` : AI 프롬프트 빌더 (템플릿 리터럴 조립)
* `token.html` : 라이브 토큰 계산기 (정규표현식 연산)
* `vault.html` : 프롬프트 보관함 (LocalStorage 연동)
* `duel.html` : AI 모델 듀얼 시뮬레이터 (비동기 타이핑 대결)
* `style.css` : 공통 스타일 및 테마, 애니메이션 제어
* `script.js` : 전역 이벤트 핸들링 및 핵심 비동기 로직

---

## ✨ Key Features & Technical Depth (V2 Updates)
기존의 시각적 UI에 더해, 새롭게 적용된 심화 자바스크립트 및 동적 로직입니다.

* **다중 페이지 라우팅 (MPA)** : 단일 페이지 모달의 한계를 벗어나 `window.location`을 활용해 독립된 5개의 도구 페이지로 모듈화.
* **Web Storage API 연동 (데이터 영속성)** : `localStorage` 및 `JSON.stringify/parse`를 활용하여 사용자 설정 테마와 보관함(Vault) 프롬프트 데이터를 브라우저에 영구 보존.
* **비동기(Async) 듀얼 시뮬레이션** : ES6 `Promise`와 `async/await` 문법을 활용해 난수 기반 지연(Delay) 함수를 설계, 두 개의 AI가 서로 다른 속도로 동시에 타이핑하는 병렬 비동기 애니메이션 구현.
* **실시간 데이터 파싱 (정규표현식)** : 입력창 텍스트를 정규식(`/\s+/`)으로 분석해 단어 수를 추출하고, `Math.ceil()` 등을 통해 실시간 토큰 및 API 예상 비용 산출 (토큰 계산기).
* **키워드 기반 챗봇 알고리즘** : `String.includes()`와 조건 분기문을 조합해 사용자 입력 명령어를 감지하고 이스터에그 답변을 출력하는 터미널 봇 구현.
* **최신 클립보드 API 연동** : 보안 규격을 준수하는 `navigator.clipboard.writeText()`와 프로미스 체이닝(`.then()`)을 사용한 직관적인 텍스트 복사 시스템.
* **실시간 라이브 검색 (Live Search)** : jQuery `.on('input')` 이벤트를 통해 검색어와 카드 데이터를 동적으로 비교, 즉각적인 화면 필터링(`display: none/flex`) 구현.

*(V1 주요 CSS 기법 : 글래스모피즘 네비게이션, 반응형 벤토 그리드, 3D 플립 카드, Flexbox 이미지 갤러리, 무한 롤링 마키 애니메이션)*

---

## 🚀 How to Run
별도의 설치 과정이나 복잡한 서버 세팅이 필요하지 않습니다.

1. 이 저장소를 Clone 하거나 `.zip` 파일로 다운로드합니다.
2. 폴더 내의 `index.html` 파일을 Chrome, Safari, Edge 등 모던 웹 브라우저로 엽니다.
3. [또는 여기를 클릭해 깃허브 페이지로 바로 접속하세요.](https://kimmin0914.github.io/Prompt-Lab/)
