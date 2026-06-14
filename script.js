$(document).ready(function() {
    
    // 1. 거대 백과사전 모달 로직 (상단 마키 한글 단어들 모두 포함 완료!)
    const techDescriptions = {
        "TECHNIQUE": "프롬프트 엔지니어링의 가장 기본이 되는 핵심 기술 분류를 의미합니다.",
        "ADVANCED": "기본적인 지시를 넘어, AI의 추론 능력을 극대화하는 심화 단계의 기법입니다.",
        "METHOD": "특정 문제를 해결하기 위해 AI에게 부여하는 방법론적 접근 방식입니다.",
        "FORMAT": "JSON, Markdown, XML 등 AI의 답변 출력 형식을 개발자가 원하는 대로 강제하는 기법입니다.",
        "RELIABILITY": "환각 현상(Hallucination)을 줄이고 일관되고 신뢰할 수 있는 답변을 얻어내는 기술입니다.",
        "NLP": "자연어 처리(Natural Language Processing) 태스크에 특화된 프롬프트 기법입니다.",
        "CLASSIFICATION": "텍스트의 카테고리, 감정, 스팸 여부 등을 분류하도록 AI를 제어하는 방식입니다.",
        "SENTIMENT": "문장에 담긴 긍정, 부정, 중립 등의 감정 상태를 분석하게 하는 기법입니다.",
        "1-SHOT": "AI에게 단 하나의 정답 예시만 제공하여 패턴을 학습시키는 효율적인 기법입니다.",
        "3-SHOT": "3개의 다양한 예시를 제공하여 모델의 답변 정확도와 일관성을 높이는 방법입니다.",
        "5-SHOT": "복잡한 문제에서 5개의 예시를 주어 모델이 완벽하게 규칙을 이해하도록 유도합니다.",
        "IN-CONTEXT": "모델을 재학습시키지 않고, 프롬프트 내부의 문맥만으로 새로운 작업을 수행하게 합니다.",
        "JSON": "데이터를 저장하거나 전송할 때 널리 쓰이는 구조화된 데이터 포맷입니다.",
        "MARKDOWN": "일반 텍스트로 문서의 서식을 지정할 수 있는 가벼운 마크업 언어입니다.",
        "XML": "데이터의 구조를 태그로 정의하여 저장하고 전송하는 마크업 언어입니다.",
        "CSV": "몇 가지 필드를 쉼표(,)로 구분한 데이터 저장 방식입니다.",
        "글쓰기": "창의적이고 자연스러운 문장을 생성하는 텍스트 작성 능력입니다.",
        "추론": "주어진 정보를 바탕으로 논리적인 결론을 도출해내는 능력입니다.",
        "코드 생성": "다양한 언어로 코드를 작성하고 논리적 버그를 디버깅하는 기능입니다.",
        "분석": "복잡한 데이터나 문서를 읽고 핵심 인사이트를 추출하는 능력입니다.",
        "데이터": "방대한 데이터를 처리하고 유의미한 수치를 뽑아내는 역량입니다.",
        "번역": "언어 간의 장벽을 허물고 뉘앙스까지 완벽하게 번역하는 역량입니다.",
        "오픈소스": "누구나 무료로 내부 구조를 확인하고 수정, 배포할 수 있는 자유로운 AI 모델입니다.",
        "커스텀": "특정 기업이나 목적에 맞게 AI 모델을 직접 튜닝하여 고도로 전문화시키는 방식입니다.",
        "CODE GENERATION": "AI 모델을 활용하여 다양한 프로그래밍 언어로 코드를 자동 생성하는 기법입니다.",
        "CREATIVE WRITING": "소설, 시, 마케팅 카피 등 인간의 창의력이 요구되는 텍스트를 작성하는 기법입니다.",
        "DATA ANALYSIS": "주어진 숫자와 텍스트 데이터를 분석하여 시각화 코드나 인사이트를 도출하는 기법입니다.",
        "TRANSLATION": "단순 기계 번역을 넘어 문맥과 문화적 뉘앙스를 살려 번역하는 기법입니다.",
        "SENTIMENT ANALYSIS": "소셜 미디어 글이나 리뷰 텍스트에 담긴 사용자의 긍정/부정 감정을 분석해내는 기법입니다.",
        "IMAGE CAPTIONING": "이미지를 AI에게 보여주고, 상황에 딱 맞는 텍스트 설명을 자동으로 생성하는 기법입니다.",
        "SUMMARIZATION": "아무리 긴 문서라도 핵심 주제와 내용만 유지한 채 짧고 간결하게 요약하는 기법입니다.",
        "SQL QUERYING": "코딩을 몰라도 자연어로 질문하면 데이터베이스 검색을 위한 완벽한 SQL 쿼리문을 작성해주는 기법입니다.",
        "CHATBOT DESIGN": "고객센터, 튜터 등 특정 페르소나를 가진 챗봇의 시스템 프롬프트 뼈대를 설계하는 기법입니다.",
        "PERSONA CRAFTING": "AI에게 '당신은 10년 차 변호사입니다'와 같이 특정 인물이나 직업의 성격을 부여하는 기법입니다.",
        "LEGAL DOCUMENT REVIEW": "방대하고 복잡한 법률 문서를 AI가 대신 검토하고 독소 조항이나 핵심 내용을 추출하는 기법입니다.",
        "MEDICAL TRIAGE": "환자의 초기 증상 정보를 바탕으로 긴급도를 분류하고 의료진의 초기 대응을 돕는 기법입니다.",
        "EDUCATION TUTORING": "학생의 이해도 수준에 맞게 어려운 개념을 쉽게 설명하고 맞춤형 퀴즈를 내주는 AI 튜터 기법입니다.",
        "SEO OPTIMIZATION": "검색 엔진 상위 노출을 위해 블로그 글에 알맞은 키워드를 섞고 메타 태그를 생성하는 기법입니다.",
        "PRODUCT DESCRIPTIONS": "이커머스 쇼핑몰의 상품 특징을 분석하여 고객의 구매욕을 자극하는 상세 설명을 작성하는 기법입니다.",
        "BUG DEBUGGING": "에러가 난 코드와 로그를 AI에게 주어 원인을 분석하고 올바른 해결책 코드를 제시받는 기법입니다.",
        "API DOCUMENTATION": "개발자가 작성한 복잡한 코드를 바탕으로 깔끔하고 이해하기 쉬운 API 명세서를 자동 생성하는 기법입니다.",
        "UX COPYWRITING": "사용자 경험(UX)을 개선하기 위해 앱/웹 화면의 버튼, 에러 메시지 등 마이크로 텍스트를 작성하는 기법입니다.",
        "RESEARCH SYNTHESIS": "수십 편의 논문이나 연구 자료들을 종합하여 하나의 깔끔한 트렌드 리포트로 정리하는 기법입니다.",
        "GAME NARRATIVE": "게임의 세계관 구축부터 퀘스트 스토리라인, NPC들의 방대한 대사까지 기획하는 창의적 기법입니다.",
        
        // 🚨 상단 마키를 위해 새롭게 추가된 6개 키워드!
        "데이터 분석": "주어진 데이터를 분석하여 유의미한 시각화 자료나 비즈니스 인사이트를 도출하는 기법입니다.",
        "창의적 글쓰기": "단순한 답변을 넘어 소설, 카피라이팅 등 인간의 창의력이 요구되는 텍스트를 생성하도록 유도하는 기법입니다.",
        "언어 번역": "단순 기계 번역을 넘어 출발어와 도착어의 문맥, 문화적 뉘앙스까지 살려 자연스럽게 번역하는 기법입니다.",
        "문서 요약": "방대하고 긴 문서에서 핵심 주제와 내용만 추출하여 독자가 읽기 쉽게 간결하게 요약하는 기법입니다.",
        "논리적 추론": "단계를 나누어 복잡한 문제의 논리적 오류를 검증하고 스스로 해결책을 찾도록 돕는 고급 기법입니다.",
        
        "API 연동": "외부 서비스의 기능(API)을 분석하고 내 프로그램에 연결하는 코드를 작성하는 기법입니다.",
        "유닛 테스트 작성": "개발자가 짠 코드의 각 기능이 정상 작동하는지 꼼꼼하게 확인하는 테스트 코드를 생성합니다.",
        "프롬프트 최적화": "AI가 더 똑똑하고 정확한 답변을 하도록 질문의 구조와 단어 선택을 다듬는 전문가 과정입니다.",
        "시스템 아키텍처": "복잡한 소프트웨어 시스템의 전체적인 서버 구조와 기술 스택의 밑그림을 설계하는 기법입니다.",
        "수학 문제 해결": "복잡한 수학 공식을 이해하고 답만 내는 것이 아니라, 단계별로 명확한 풀이 과정을 제시하는 기법입니다.",
        "역할극 (ROLE-PLAYING)": "AI에게 특정 상황이나 인물의 역할을 부여해, 실제 전문가와 대화하는 것처럼 시뮬레이션하는 기법입니다."
    };

    $('.badge, .tag, .marquee-pill').click(function(e) {
        e.preventDefault();
        let originalText = $(this).text().replace(/\n/g, '').replace(/\s+/g, ' ').trim(); 
        let searchKey = originalText.toUpperCase();
        
        $('#modal-title').text(originalText + " 기법");
        
        let descriptionText = techDescriptions[searchKey];
        if (!descriptionText) {
            descriptionText = "해당 기법에 대한 상세 설명이 아직 업데이트되지 않았습니다.";
        }
        
        $('#modal-desc').text(descriptionText);
        $('#tech-modal').fadeIn(300); 
    });

    $('.close-btn, .modal-action-btn').click(function() {
        $('#tech-modal').fadeOut(300);
    });

    $('#tech-modal').click(function(event) {
        if ($(event.target).is('#tech-modal')) {
            $(this).fadeOut(300);
        }
    });

    // 2. 스크롤 애니메이션
    $(window).scroll(function() {
        let windowBottom = $(this).scrollTop() + $(this).innerHeight();
        $('.progress-bar-fill, .speed-bar__fill').each(function() {
            let elementTop = $(this).offset().top;
            if (elementTop < windowBottom) {
                let targetWidth = $(this).attr('data-width');
                $(this).css('width', targetWidth);
            }
        });
    }).scroll();

    // 3. 이메일 폼 검증
    $('#lab-subscribe-form').on('submit', function(e) {
        e.preventDefault();
        let emailVal = $('#subscribe-email').val();
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let isAgreed = $('#subscribe-agree').is(':checked');

        if (!emailRegex.test(emailVal)) {
            alert("⚠️ 올바른 이메일 형식을 입력해주세요. (예: user@example.com)");
        } else if (!isAgreed) {
            alert("⚠️ 뉴스레터 수신에 동의하셔야 합류가 가능합니다.");
        } else {
            alert("🎉 환영합니다! 성공적으로 Prompt Lab에 합류하셨습니다.");
            $('#subscribe-email').val('');
            $('#subscribe-agree').prop('checked', false);
        }
    });

    // 4. 가상 터미널 로직
    $('#terminal-input').on('keypress', function(e) {
        if (e.which === 13) { 
            let userText = $(this).val().trim();
            if (userText === "") return;

            let userLine = '<p class="terminal-line"><span class="terminal-prompt terminal-prompt--active">$</span> <span style="color:#ffffff">' + userText + '</span></p>';
            $(this).parent().before(userLine);
            $(this).val('');

            let $terminalBody = $('.terminal-body');
            let loadingLine = '<p class="terminal-line terminal-line--warn ai-loading">[WAIT] AI 모델이 프롬프트를 분석 중입니다...</p>';
            $(this).parent().before(loadingLine);
            $terminalBody.scrollTop($terminalBody[0].scrollHeight);

            setTimeout(function() {
                $('.ai-loading').remove();
                
                let aiResponse = "[SUCCESS] 훌륭한 프롬프트입니다! Role(역할)을 추가하면 더 완벽해집니다.";
                if (userText.includes("안녕")) {
                    aiResponse = "[HELLO] 안녕하세요! 프롬프트 엔지니어링 실험실에 오신 것을 환영합니다.";
                } else if (userText.includes("추천")) {
                    aiResponse = "[RECOMMEND] 추천 프롬프트: '당신은 10년 경력의 파이썬 개발자입니다. 다음 코드를 리뷰해 주세요.'";
                }

                let responseLine = '<p class="terminal-line terminal-line--success"><span class="ai-response-typing"></span></p>';
                $('#terminal-input').parent().before(responseLine);
                
                let i = 0;
                let $targetSpan = $('.ai-response-typing').last();
                let typingInterval = setInterval(function() {
                    $targetSpan.text($targetSpan.text() + aiResponse.charAt(i));
                    i++;
                    
                    if (i >= aiResponse.length) {
                        clearInterval(typingInterval);
                        $targetSpan.removeClass('ai-response-typing');
                    }
                    $terminalBody.scrollTop($terminalBody[0].scrollHeight);
                }, 50);

            }, 1200);
        }
    });

    // 5. 마우스 3D 무빙 (Hero 섹션 패럴랙스)
    $(document).on('mousemove', function(e) {
        let x = (e.clientX / $(window).width()) - 0.5;
        let y = (e.clientY / $(window).height()) - 0.5;

        $('.hero-title').css('transform', `perspective(1000px) rotateY(${x * 10}deg) rotateX(${y * -10}deg)`);
        $('.hero-description').css('transform', `perspective(1000px) rotateY(${x * 5}deg) rotateX(${y * -5}deg)`);
        $('.hero-badge').css('transform', `perspective(1000px) rotateY(${x * 15}deg) rotateX(${y * -15}deg)`);
    });

    // 💡 6. [신규 추가] 실험실 시작하기 버튼 클릭 시 스무스 스크롤 & 터미널 포커싱
    $('#start-lab-btn').click(function() {
        // 1. 화면 맨 아래의 터미널 구역으로 부드럽게 스크롤 이동
        $('html, body').animate({
            scrollTop: $('#terminal-section').offset().top - 80 // 헤더에 가려지지 않게 80px 여백
        }, 800); // 0.8초 동안 이동

        // 2. 이동이 끝난 후 터미널 창을 화려하게 빛나게 하고 입력창에 커서를 올려줌
        setTimeout(function() {
            // CSS에 추가해둔 네온 빛 클래스 켰다 끄기
            $('.terminal-panel').addClass('terminal-highlight');
            $('#terminal-input').focus(); // 입력창 자동 클릭(포커스)
            
            setTimeout(function() {
                $('.terminal-panel').removeClass('terminal-highlight');
            }, 1500); // 1.5초 뒤에 빛 꺼짐
        }, 800);
    });

    // 💡 7. [신규 추가] 원클릭 프롬프트 복사 기능 (HTML 수정 없이 자동 주입)
    
    // 1) 모든 코드 블록(.card-code)을 찾아서 부모 래퍼를 씌우고 복사 버튼을 달아줍니다.
    $('.card-code').each(function() {
        // 코드 블록을 감싸는 투명한 박스(래퍼) 생성 (기존 레이아웃 유지를 위해 margin-top: auto 적용)
        $(this).wrap('<div class="code-wrapper" style="position: relative; margin-top: auto; width: 100%;"></div>');
        
        // 코드 블록 바로 앞에 버튼을 생성하여 추가
        $(this).before('<button class="copy-btn">복사</button>');
        
        // 기존 코드 블록의 margin-top을 없애서 래퍼와 완벽하게 겹치게 만듭니다.
        $(this).css('margin-top', '0');
    });

    // 2) 생성된 복사 버튼을 클릭했을 때의 마법
    $('.copy-btn').click(function() {
        let $btn = $(this);
        
        // 버튼 바로 밑에 있는 실제 코드 블록의 텍스트만 긁어옵니다.
        let codeText = $btn.next('.card-code').text().trim();

        // 사용자의 클립보드(메모리)에 텍스트를 몰래 복사하는 최신 브라우저 API
        navigator.clipboard.writeText(codeText).then(function() {
            
            // 성공 시 버튼 디자인과 글씨를 바꿈
            $btn.text('복사 완료! ✔').addClass('copied');
            
            // 2초(2000ms) 뒤에 원래 '복사' 버튼으로 되돌려놓음
            setTimeout(function() {
                $btn.text('복사').removeClass('copied');
            }, 2000);
            
        }).catch(function(err) {
            // 혹시나 브라우저 보안 문제로 실패했을 때
            alert('복사에 실패했습니다 🥲');
        });
    });

    // 💡 8. [신규 추가] 상단 스크롤 진행도 (Reading Progress Bar)
    
    // 1) 자바스크립트가 몰래 HTML body 맨 첫 줄에 진행도 선(div)을 주입합니다.
    $('body').prepend('<div id="scroll-progress"></div>');

    // 2) 사용자가 마우스 휠을 굴려 화면을 스크롤할 때마다 실행됩니다.
    $(window).scroll(function() {
        // 현재 스크롤바가 내려온 위치
        let scrollTop = $(window).scrollTop(); 
        
        // 웹페이지의 전체 길이에서 현재 화면에 보이는 창의 높이를 뺍니다. (순수하게 스크롤 가능한 총 길이)
        let docHeight = $(document).height() - $(window).height(); 
        
        // (현재 스크롤 위치 / 총 스크롤 길이) * 100 = 현재 진행도를 퍼센트(%)로 계산
        let scrollPercent = (scrollTop / docHeight) * 100;

        // 계산된 퍼센트 수치를 선의 너비(width) CSS에 실시간으로 적용합니다.
        $('#scroll-progress').css('width', scrollPercent + '%');
    });

    // 💡 9. [신규 추가] 커스텀 마우스 커서 효과
    
    // 1) 자바스크립트가 HTML 맨 끝에 커서 역할을 할 동그라미(div)를 몰래 생성합니다.
    $('body').append('<div class="custom-cursor"></div>');
    let $cursor = $('.custom-cursor');

    // 2) 사용자가 마우스를 움직일 때마다 동그라미가 마우스 좌표를 따라다니게 합니다.
    $(document).mousemove(function(e) {
        $cursor.css({
            top: e.clientY + 'px',
            left: e.clientX + 'px'
        });
    });

    // 3) 클릭 가능한 모든 요소(버튼, 링크, 인풋창, 배지 등)에 마우스를 올렸을 때의 이벤트
    $('a, button, input, .badge, .tag, .marquee-pill, .s8-panel, .flip-card').on('mouseenter', function() {
        $cursor.addClass('hover-active'); // CSS에 만들어둔 커지는 효과 적용
    }).on('mouseleave', function() {
        $cursor.removeClass('hover-active'); // 마우스가 빠져나가면 원상복구
    });

    // 💡 10. [신규 추가] 로그인 & 회원가입 모달 및 상태 관리 (Mock 기능)
    
    // 1) 상단바의 로그인, 회원가입 버튼 클릭 시 모달 열기
    $('a[href="#login"], a[href="#signup"]').click(function(e) {
        e.preventDefault(); // 페이지 이동(새로고침) 방지
        
        // 클릭한 버튼이 로그인인지 회원가입인지 파악
        let targetId = $(this).attr('href') === "#login" ? "login-form" : "signup-form";
        
        // 탭과 폼 상태 변경
        $('.auth-tab').removeClass('active');
        $('.auth-form').removeClass('active');
        
        $(`button[data-target="${targetId}"]`).addClass('active');
        $(`#${targetId}`).addClass('active');
        
        $('#auth-modal').fadeIn(300);
    });

    // 2) 모달창 닫기
    $('.close-auth-btn').click(function() {
        $('#auth-modal').fadeOut(300);
    });
    $('#auth-modal').click(function(event) {
        if ($(event.target).is('#auth-modal')) {
            $(this).fadeOut(300);
        }
    });

    // 3) 모달 안에서 탭(로그인 <-> 회원가입) 전환
    $('.auth-tab').click(function() {
        $('.auth-tab').removeClass('active');
        $('.auth-form').removeClass('active');
        
        $(this).addClass('active');
        let targetForm = $(this).attr('data-target');
        $(`#${targetForm}`).addClass('active');
    });

    // 4) 폼 제출(가짜 로그인 성공) 시 상단바 UI 변경 마법
    $('.auth-form').on('submit', function(e) {
        e.preventDefault(); // 진짜 서버로 데이터가 날아가는 것을 막음
        
        let isLogin = $(this).attr('id') === "login-form";
        let message = isLogin ? "시스템에 성공적으로 접속했습니다." : "연구원 등록이 완료되었습니다.";
        
        alert("🎉 " + message);
        
        // 모달창 닫기 및 입력칸 초기화
        $('#auth-modal').fadeOut(300);
        $('.auth-input').val('');
        
        // 🚨 핵심: 상단바의 기존 버튼들을 지우고 로그인된 프로필로 바꿔치기 (DOM 조작)
        let loggedInHTML = `
            <div class="user-profile">
                <span class="user-greeting">반갑습니다, <strong>수석연구원</strong>님!</span>
                <button id="logout-btn" class="nav-btn nav-btn--ghost" style="border: 1px solid var(--border-subtle);">로그아웃</button>
            </div>
        `;
        $('.nav-auth').html(loggedInHTML);
    });

    // 5) 로그아웃 버튼 클릭 시 원래대로 되돌리기 (동적으로 생성된 버튼이므로 문서 전체에 이벤트 걸기)
    $(document).on('click', '#logout-btn', function() {
        alert("🔒 안전하게 로그아웃 되었습니다.");
        
        let loggedOutHTML = `
            <a href="#login" class="nav-btn nav-btn--ghost">로그인</a>
            <a href="#signup" class="nav-btn nav-btn--glow">회원가입</a>
        `;
        $('.nav-auth').html(loggedOutHTML);
    });

});