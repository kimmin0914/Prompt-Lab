# Prompt-Lab

Prompt Engineering Lab
대형 언어 모델(LLM)과 소통하는 프롬프트 핵심 기법을 시각적으로 탐구하는 가상 실험실

웹 프로그래밍 기초 과제로 제작된 순수 HTML/CSS 인터랙티브 포트폴리오입니다.

📌 Project Overview
최신 AI 모델을 다루기 위한 프롬프트 기법들을 직관적으로 학습할 수 있는 '사이버펑크/네온' 테마의 웹사이트입니다.

이 프로젝트의 가장 큰 특징은 JavaScript를 전혀 사용하지 않고, 오직 HTML5와 CSS3의 고급 애니메이션 및 레이아웃 속성만을 극한으로 활용하여 화려한 상호작용(Interaction)과 동적인 UI를 구현했다는 점입니다.

📂 Folder Structure
유지보수와 가독성을 위해 HTML 뼈대와 CSS 스타일을 완벽하게 분리하여 설계했습니다.

index.html : 메인 웹페이지 (시맨틱 마크업)

style.css : 스타일 및 전체 애니메이션 제어

✨ Key Features & CSS Techniques
본 프로젝트에서 실험하고 적용한 핵심 CSS 기술 목록입니다.

글래스모피즘 네비게이션 : backdrop-filter: blur()와 position: fixed를 활용한 반투명 상단 고정 바

반응형 벤토 그리드 : CSS Grid(grid-template-columns, span)를 활용한 다이나믹 카드 레이아웃

네온 테두리 슬라이드 : 가상요소, conic-gradient, @keyframes 회전을 조합하여 테두리에 빛이 흐르는 애니메이션

3D 플립 카드 (자주 하는 실수) : perspective, transform: rotateY(), backface-visibility를 활용한 입체 인터랙션

Flexbox 아코디언 갤러리 : Flexbox(flex-grow)와 transition 조합으로 부드럽게 가로로 확장되는 이미지 패널

스크립트 없는 FAQ : HTML5 <details>, <summary> 태그만을 활용하여 JS 없이 작동하는 아코디언 메뉴

무한 롤링 텍스트 (마키) : @keyframes와 transform: translateX()를 사용해 끊임없이 흘러가는 전광판 효과

🚀 How to Run
별도의 설치 과정이나 복잡한 서버 세팅이 필요하지 않습니다.

이 저장소를 Clone 하거나 .zip 파일로 다운로드합니다.

폴더 내의 index.html 파일을 Chrome, Safari, Edge 등 모던 웹 브라우저로 엽니다.
