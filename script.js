$(document).ready(function() {
    
    // 1. 방탄(Bulletproof) Theme Manager
    let currentBg = 'dark';
    let currentColor = 'cyan';

    try {
        let savedBg = localStorage.getItem('labThemeBg');
        let savedColor = localStorage.getItem('labThemeColor');
        if (savedBg) currentBg = savedBg;
        if (savedColor) currentColor = savedColor;
    } catch (e) {
        console.warn("로컬 환경 제한으로 저장소 접근을 건너뜁니다.");
    }
    
    $('body').attr('data-bg', currentBg);
    $('body').attr('data-color', currentColor);

    $('#theme-toggle-btn').click(function(e) {
        e.preventDefault();
        $('.theme-select-btn').removeClass('active'); $(`.theme-select-btn[data-bg="${currentBg}"]`).addClass('active');
        $('.color-select-btn').removeClass('active'); $(`.color-select-btn[data-color="${currentColor}"]`).addClass('active');
        $('#theme-modal').fadeIn(300);
    });

    $('.theme-select-btn').click(function() { $('.theme-select-btn').removeClass('active'); $(this).addClass('active'); });
    $('.color-select-btn').click(function() { $('.color-select-btn').removeClass('active'); $(this).addClass('active'); });

    $('#apply-theme-btn').click(function() {
        currentBg = $('.theme-select-btn.active').attr('data-bg');
        currentColor = $('.color-select-btn.active').attr('data-color');
        $('body').attr('data-bg', currentBg);
        $('body').attr('data-color', currentColor);
        try {
            localStorage.setItem('labThemeBg', currentBg);
            localStorage.setItem('labThemeColor', currentColor);
        } catch(e) {}
        $('#theme-modal').fadeOut(300);
    });


    // 2. Live Search
    $('#card-search').on('input', function() {
        let query = $(this).val().toLowerCase();
        $('.prompt-card').each(function() {
            if ($(this).text().toLowerCase().includes(query)) $(this).css('display', 'flex'); 
            else $(this).css('display', 'none');
        });
    });


    // 3. Async Terminal Bot (단어 추가 및 글자색 버그 수정)
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    $('#terminal-input').on('keypress', async function(e) {
        if (e.which === 13) { 
            let userText = $(this).val().trim();
            if (userText === "") return;
            
            $(this).parent().before(`<p class="terminal-line"><span class="terminal-prompt terminal-prompt--active">$</span> <span style="color:var(--text-primary)">${userText}</span></p>`);
            $(this).val('');

            let $terminalBody = $('.terminal-body');
            $(this).parent().before('<p class="terminal-line terminal-line--warn ai-loading">[WAIT] AI 모델이 프롬프트를 분석 중입니다...</p>');
            $terminalBody.scrollTop($terminalBody[0].scrollHeight);

            await delay(1200);
            $('.ai-loading').remove();
            
            let aiResponse = "[SUCCESS] 훌륭한 프롬프트입니다! Role(역할)과 Format(형식)을 추가하면 더 완벽해집니다.";
            
            if (userText.includes("안녕") || userText.includes("하이")) {
                aiResponse = "[HELLO] 안녕하세요! 프롬프트 엔지니어링 실험실에 오신 것을 환영합니다. 무엇을 도와드릴까요?";
            } else if (userText.includes("추천") || userText.includes("예시")) {
                aiResponse = "[RECOMMEND] 추천 프롬프트: '당신은 10년 경력의 파이썬 개발자입니다. 다음 코드를 최적화해 주세요.'";
            } else if (userText.includes("이름") || userText.includes("누구")) {
                aiResponse = "[INFO] 저는 이 실험실을 안내하는 가상 AI 조수입니다. 다양한 프롬프트를 입력하며 테스트해 보세요!";
            } else if (userText.includes("고마워") || userText.includes("감사") || userText.includes("최고")) {
                aiResponse = "[SMILE] 별말씀을요! 도움이 되었다니 기쁩니다. 더 필요한 것이 있다면 언제든 말씀해 주세요.";
            } else if (userText.includes("오류") || userText.includes("버그")) {
                aiResponse = "[DEBUG] 앗, 오류를 발견하셨군요! 수석연구원(김민준)님께 즉시 리포트를 전송하겠습니다. 삐리릭- 🤖";
            } else if (userText.includes("날씨")) {
                aiResponse = "[WEATHER] 저는 인터넷망과 격리되어 있지만, 오늘 당신의 코딩 날씨는 '매우 맑음'일 것 같네요! ☀️";
            } else if (userText.includes("바보") || userText.includes("멍청")) {
                aiResponse = "[WARNING] 부정적인 단어가 감지되었습니다. 우리 모두 예쁜 말 고운 말을 사용하도록 합시다! 🚨";
            } else if (userText.length < 3) {
                aiResponse = "[HINT] 프롬프트가 너무 짧습니다. 육하원칙에 따라 조금 더 구체적으로 지시해 주시면 좋은 답변을 드릴 수 있습니다.";
            }

            $('#terminal-input').parent().before('<p class="terminal-line terminal-line--success"><span class="ai-response-typing"></span></p>');
            let $targetSpan = $('.ai-response-typing').last();
            
            for (let char of aiResponse) {
                $targetSpan.text($targetSpan.text() + char);
                $terminalBody.scrollTop($terminalBody[0].scrollHeight);
                await delay(40); 
            }
            $targetSpan.removeClass('ai-response-typing');
        }
    });


    // 4. Prompt Builder
    $('#generate-prompt-btn').click(async function() {
        let role = $('#builder-role').val();
        let task = $('#builder-task').val().trim();
        let format = $('#builder-format').val();
        if(task === "") { alert("⚠️ 수행할 작업을 입력해주세요!"); return; }

        $(this).text("프로토콜 빌딩 중... ⚡").prop('disabled', true);
        await delay(800); 

        $('#builder-output-text').text(`[SYSTEM PROMPT]\n당신은 "${role}" 입니다.\n\n[TASK]\n다음 작업을 절대 규칙으로 수행하세요:\n"${task}"\n\n[OUTPUT FORMAT]\n최종 답변의 형태는 반드시 "${format}"이어야 합니다.`);
        $('#builder-result-box').slideDown(300);
        $(this).text("구조화 프롬프트 생성 ⚡").prop('disabled', false);
    });

    $('#builder-output-text').click(function() {
        navigator.clipboard.writeText($(this).text()).then(() => alert("📋 완성된 프롬프트 프로토콜이 클립보드에 복사되었습니다!"));
    });


    // 5. Token & Cost Calculator
    $('#token-textarea').on('input', function() {
        let text = $(this).val();
        let charCount = text.length;
        let wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
        let estimatedTokens = Math.ceil(charCount * 0.7 + wordCount * 0.3);

        $('#stat-chars').text(charCount);
        $('#stat-tokens').text(estimatedTokens);
        $('#cost-gpt').text('$' + (estimatedTokens * 0.000005).toFixed(5));
        $('#cost-claude').text('$' + (estimatedTokens * 0.000015).toFixed(5));
    });


    // 6. Encyclopedia Modal
    const techDescriptions = {
        "TECHNIQUE": "가장 기본이 되는 핵심 기술 분류를 의미합니다.", "ADVANCED": "추론 능력을 극대화하는 심화 단계의 기법입니다.", "METHOD": "문제 해결을 위해 부여하는 방법론적 접근 방식입니다.", "FORMAT": "AI의 답변 출력 형식을 개발자가 원하는 대로 강제하는 기법입니다.", "RELIABILITY": "환각 현상을 줄이고 신뢰할 수 있는 답변을 얻어내는 기술입니다.", "NLP": "자연어 처리 태스크에 특화된 프롬프트 기법입니다.", "CLASSIFICATION": "텍스트의 카테고리 등을 분류하도록 제어하는 방식입니다.", "SENTIMENT": "문장에 담긴 감정 상태를 분석하게 하는 기법입니다.", "1-SHOT": "단 하나의 정답 예시만 제공하여 패턴을 학습시킵니다.", "3-SHOT": "3개의 예시를 제공하여 정확도와 일관성을 높입니다.", "5-SHOT": "5개의 예시를 주어 완벽하게 규칙을 이해하도록 유도합니다.", "IN-CONTEXT": "모델을 재학습시키지 않고, 문맥만으로 새로운 작업을 수행하게 합니다.", "JSON": "데이터를 저장하거나 전송할 때 널리 쓰이는 데이터 포맷입니다.", "MARKDOWN": "일반 텍스트로 문서의 서식을 지정할 수 있는 마크업 언어입니다.", "XML": "데이터의 구조를 태그로 정의하는 마크업 언어입니다.", "CSV": "필드를 쉼표(,)로 구분한 데이터 저장 방식입니다.", "글쓰기": "창의적이고 자연스러운 문장을 생성하는 능력입니다.", "추론": "정보를 바탕으로 논리적인 결론을 도출해내는 능력입니다.", "코드 생성": "코드를 작성하고 버그를 디버깅하는 기능입니다.", "분석": "복잡 데이터를 읽고 인사이트를 추출하는 능력입니다.", "데이터": "방대한 데이터를 처리하고 유의미한 수치를 뽑아내는 역량입니다.", "번역": "언어 장벽을 허물고 완벽하게 번역하는 역량입니다.", "오픈소스": "누구나 무료로 구조를 확인하고 수정, 배포할 수 있는 모델입니다.", "커스텀": "특정 목적에 맞게 모델을 튜닝하여 전문화시키는 방식입니다.", "CODE GENERATION": "코드를 자동 생성하는 기법입니다.", "CREATIVE WRITING": "인간의 창의력이 요구되는 텍스트를 작성하는 기법입니다.", "DATA ANALYSIS": "데이터를 분석하여 시각화나 인사이트 도출하는 기법입니다.", "TRANSLATION": "문맥과 문화적 뉘앙스를 살려 번역하는 기법입니다.", "SENTIMENT ANALYSIS": "리뷰 텍스트 등에 담긴 감정을 분석해내는 기법입니다.", "IMAGE CAPTIONING": "상황에 딱 맞는 텍스트 설명을 자동으로 생성하는 기법입니다.", "SUMMARIZATION": "핵심 주제와 내용만 유지한 채 간결하게 요약하는 기법입니다.", "SQL QUERYING": "데이터베이스 검색을 위한 완벽한 SQL 쿼리문을 작성해주는 기법입니다.", "데이터 분석": "비즈니스 인사이트를 도출하는 기법입니다.", "창의적 글쓰기": "인간의 창의력이 요구되는 텍스트를 생성하는 기법입니다.", "언어 번역": "문맥과 뉘앙스를 살려 번역하는 기법입니다.", "문서 요약": "긴 문서에서 핵심만 추출하여 요약하는 기법입니다.", "논리적 추론": "단계를 나누어 스스로 해결책을 찾도록 돕는 기법입니다.", "API 연동": "외부 기능(API)을 내 프로그램에 연결하는 코드를 작성하는 기법입니다.", "유닛 테스트 작성": "정상 작동하는지 확인하는 테스트 코드를 생성합니다.", "프롬프트 최적화": "질문의 구조와 단어 선택을 다듬는 과정입니다.", "시스템 아키텍처": "소프트웨어 시스템의 전체적인 밑그림을 설계하는 기법입니다.", "수학 문제 해결": "명확한 풀이 과정을 제시하는 기법입니다.", "역할극 (ROLE-PLAYING)": "실제 전문가와 대화하는 것처럼 시뮬레이션하는 기법입니다."
    };

    $(document).on('click', '.badge, .tag, .marquee-pill', function(e) {
        e.preventDefault();
        let searchKey = $(this).text().replace(/\n/g, '').replace(/\s+/g, ' ').trim().toUpperCase();
        $('#modal-title').text(searchKey + " 기법");
        $('#modal-desc').text(techDescriptions[searchKey] || "해당 기법에 대한 상세 설명이 아직 업데이트되지 않았습니다.");
        $('#tech-modal').fadeIn(300); 
    });


    // 7. Global Modal Closers
    $('.close-btn, .close-auth-btn, .close-terminal-btn, .close-builder-btn, .close-token-btn, .close-theme-btn, .modal-action-btn, .close-vault-btn, .close-duel-btn').click(function() {
        $(this).closest('.modal-overlay').fadeOut(300);
    });
    $('.modal-overlay').click(function(e) {
        if ($(e.target).hasClass('modal-overlay')) $(this).fadeOut(300);
    });


    // 8. Visual Interactions
    $(window).scroll(function() {
        let windowBottom = $(this).scrollTop() + $(this).innerHeight();
        $('.progress-bar-fill, .speed-bar__fill').each(function() {
            if ($(this).offset().top < windowBottom) $(this).css('width', $(this).attr('data-width'));
        });
        $('#scroll-progress').css('width', (($(window).scrollTop() / ($(document).height() - $(window).height())) * 100) + '%');
    }).scroll();

    $(document).on('mousemove', function(e) {
        let x = (e.clientX / $(window).width()) - 0.5; let y = (e.clientY / $(window).height()) - 0.5;
        $('.hero-title').css('transform', `perspective(1000px) rotateY(${x * 10}deg) rotateX(${y * -10}deg)`);
        $('.hero-description').css('transform', `perspective(1000px) rotateY(${x * 5}deg) rotateX(${y * -5}deg)`);
        $('.hero-badge').css('transform', `perspective(1000px) rotateY(${x * 15}deg) rotateX(${y * -15}deg)`);
        $('.custom-cursor').css({ top: e.clientY + 'px', left: e.clientX + 'px' });
    });

    $(document).on('mouseenter', 'a, button, input, select, textarea, .badge, .tag, .marquee-pill, .s8-panel, .flip-card', function() { $('.custom-cursor').addClass('hover-active'); })
               .on('mouseleave', 'a, button, input, select, textarea, .badge, .tag, .marquee-pill, .s8-panel, .flip-card', function() { $('.custom-cursor').removeClass('hover-active'); });


    // 9. Toolkit Triggers (새 페이지 이동 + 공식문서 이동 반영)
    $(document).on('click', '#start-lab-btn, .open-terminal-trigger', function() {
        window.location.href = "terminal.html";
    });
    $('.btn-secondary').click(function(e) {
        e.preventDefault();
        window.open('https://www.promptingguide.ai/kr', '_blank');
    });


    // 10. Copy API & Forms
    $('.card-code').each(function() {
        $(this).wrap('<div class="code-wrapper" style="position: relative; margin-top: auto; width: 100%;"></div>');
        $(this).before('<button class="copy-btn">복사</button>'); $(this).css('margin-top', '0');
    });
    $(document).on('click', '.copy-btn', function() {
        let $btn = $(this);
        navigator.clipboard.writeText($btn.next('.card-code').text().trim()).then(() => {
            $btn.text('복사 완료! ✔').addClass('copied'); setTimeout(() => { $btn.text('복사').removeClass('copied'); }, 2000);
        });
    });

    $('.subscribe-form').on('submit', function(e) {
        e.preventDefault();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($(this).find('.subscribe-form__input').val())) alert("⚠️ 올바른 이메일 형식을 입력해주세요.");
        else if (!$(this).find('.subscribe-form__checkbox').is(':checked')) alert("⚠️ 뉴스레터 수신에 동의하셔야 합니다.");
        else { alert("🎉 성공적으로 Prompt Lab 뉴스레터 구독원 등록이 완료되었습니다."); $(this)[0].reset(); }
    });

    $('a[href="#login"], a[href="#signup"]').click(function(e) {
        e.preventDefault(); let targetId = $(this).attr('href') === "#login" ? "login-form" : "signup-form";
        $('.auth-tab').removeClass('active'); $('.auth-form').removeClass('active');
        $(`button[data-target="${targetId}"]`).addClass('active'); $(`#${targetId}`).addClass('active');
        $('#auth-modal').fadeIn(300);
    });
    $('.auth-tab').click(function() { $('.auth-tab').removeClass('active'); $('.auth-form').removeClass('active'); $(this).addClass('active'); $(`#${$(this).attr('data-target')}`).addClass('active'); });
    $('.auth-form').on('submit', function(e) {
        e.preventDefault(); alert(`🎉 ${$(this).attr('id') === "login-form" ? "시스템 접속 성공" : "연구원 등록 완료"}`);
        $('#auth-modal').fadeOut(300); $('.auth-input').val('');
        $('.nav-auth').html(`<div class="user-profile"><span class="user-greeting">반갑습니다, <strong>수석연구원</strong>님!</span><button id="logout-btn" class="nav-btn nav-btn--ghost" style="border:1px solid var(--border-subtle);">로그아웃</button></div>`);
    });
    $(document).on('click', '#logout-btn', function() { alert("🔒 안전하게 세션이 종료되었습니다."); $('.nav-auth').html(`<a href="#login" class="nav-btn nav-btn--ghost">로그인</a><a href="#signup" class="nav-btn nav-btn--glow">회원가입</a>`); });

    
    // 11. [V2] Prompt Vault Logic
    let vaultData = JSON.parse(localStorage.getItem('promptVault')) || [];
    
    function renderVault() {
        let $list = $('#vault-list'); $list.empty();
        if(vaultData.length === 0) {
            $list.append('<p style="text-align:center; color:#64748b; padding: 20px 0;">아직 저장된 프롬프트가 없습니다.</p>');
            return;
        }
        vaultData.forEach((item, index) => {
            $list.append(`
                <div class="vault-item">
                    <div class="vault-text">${item}</div>
                    <div class="vault-actions">
                        <button class="vault-btn copy" data-text="${encodeURIComponent(item)}">복사</button>
                        <button class="vault-btn delete" data-index="${index}">삭제</button>
                    </div>
                </div>
            `);
        });
    }

    $('#save-to-vault-btn').click(function() {
        let text = $('#builder-output-text').text();
        vaultData.push(text);
        localStorage.setItem('promptVault', JSON.stringify(vaultData));
        let $btn = $(this);
        $btn.text("✅ 보관함에 안전하게 저장되었습니다!");
        setTimeout(() => $btn.text("💾 보관함에 저장하기"), 2000);
    });

    $(document).on('click', '.vault-btn.copy', function() {
        navigator.clipboard.writeText(decodeURIComponent($(this).attr('data-text'))).then(() => {
            let $btn = $(this); $btn.text('완료!'); setTimeout(() => $btn.text('복사'), 1500);
        });
    });

    $(document).on('click', '.vault-btn.delete', function() {
        let idx = $(this).attr('data-index');
        vaultData.splice(idx, 1);
        localStorage.setItem('promptVault', JSON.stringify(vaultData));
        renderVault();
    });

    $('#clear-vault-btn').click(function() {
        if(confirm('보관함의 모든 프롬프트를 삭제하시겠습니까?')) {
            vaultData = []; localStorage.removeItem('promptVault'); renderVault();
        }
    });


    // 12. [V2] Model Duel Simulator Logic
    async function typeDuelText($el, text, isClaude) {
        $el.empty().append(`<p><span class="ai-response-typing ${isClaude ? 'claude' : ''}"></span></p>`);
        let $target = $el.find('.ai-response-typing');
        
        for (let char of text) { 
            $target.text($target.text() + char); 
            $el.scrollTop($el[0].scrollHeight); 
            let speed = isClaude ? (Math.random() * 30 + 10) : (Math.random() * 20 + 20); 
            await delay(speed); 
        }
        $target.removeClass('ai-response-typing claude');
    }

    $('#duel-submit-btn').click(async function() {
        let input = $('#duel-input').val().trim();
        if(!input) return;
        
        $('#duel-input').val('');
        let gptResponse, claudeResponse;

        if (input.includes("장단점")) {
            gptResponse = "[GPT-4o 분석]\n\n장점:\n1. 압도적인 생태계와 커뮤니티\n2. 방대한 라이브러리 지원\n\n단점:\n1. 초기 학습 곡선이 가파름\n2. 렌더링 최적화 난이도 존재";
            claudeResponse = "[Claude 3.5 분석]\n\n저는 해당 기술의 아키텍처 관점에서 접근하겠습니다.\n\n👍 Pros:\n- Virtual DOM을 통한 효율적인 UI 업데이트\n- 컴포넌트 기반 재사용성\n\n👎 Cons:\n- 상태 관리(State)의 복잡성\n- 보일러플레이트 코드가 많아질 수 있음";
        } else if (input.includes("코드")) {
            gptResponse = "```javascript\nfunction helloWorld() {\n  console.log('Hello from GPT!');\n}\n```\n이 코드는 표준 콘솔 출력을 사용합니다.";
            claudeResponse = "```javascript\nconst helloWorld = () => {\n  console.log('Hello from Claude!');\n};\n```\nES6 화살표 함수를 사용하여 더 모던하게 작성해 보았습니다.";
        } else {
            gptResponse = `입력하신 "${input}"에 대한 제 답변입니다. 저는 OpenAI의 GPT-4o로서 논리적이고 구조화된 답변을 제공하는 데 특화되어 있습니다.`;
            claudeResponse = `"${input}"에 대해 물어보셨군요. 저는 Anthropic의 Claude 3.5입니다. 조금 더 인간적이고 맥락을 깊이 이해하는 자연스러운 답변을 드리고자 합니다.`;
        }

        typeDuelText($('#duel-gpt-output'), gptResponse, false);
        typeDuelText($('#duel-claude-output'), claudeResponse, true);
    });

    $('#duel-input').on('keypress', function(e) {
        if (e.which === 13) $('#duel-submit-btn').click();
    });

});