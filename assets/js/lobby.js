/**
 * ==========================================================================
 * Science Lab Hub - 메인 로비 상호작용 및 렌더링 스크립트 (lobby.js)
 * ==========================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  const labsGrid = document.getElementById("labs-grid");
  const countDisplay = document.getElementById("labs-count-display");
  const searchInput = document.getElementById("lab-search-input");
  const subjectTabs = document.querySelectorAll(".filter-tab");
  const gradeBtns = document.querySelectorAll(".grade-btn");

  let currentSubject = "all";
  let currentGrade = "all";
  let currentKeyword = "";

  const allLabs = window.LABS_DATA || [];

  // 카드 HTML 생성 함수
  function createLabCardHtml(lab) {
    const tagsHtml = (lab.tags || [])
      .map((tag) => `<span class="card-tag-item">#${tag}</span>`)
      .join("");

    return `
      <article class="lab-card" data-id="${lab.id}">
        <div class="card-top">
          <div class="card-icon-container">
            <span>${lab.icon || "🔬"}</span>
          </div>
          <div class="card-badges">
            <span class="card-number">${lab.number}</span>
            <span class="card-subject-badge ${lab.subject}">${lab.subject}</span>
          </div>
        </div>

        <div class="card-body">
          <div class="card-unit">${lab.grade} · ${lab.unit}</div>
          <h2 class="card-title">${lab.title}</h2>
          <p class="card-desc">${lab.description}</p>
          <div class="card-tags">
            ${tagsHtml}
          </div>
        </div>

        <div class="card-footer">
          <a href="${lab.path}" class="start-btn" aria-label="${lab.title} 탐구 시작하기">
            <span>탐구 시작하기</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>
      </article>
    `;
  }

  // 필터링 및 검색 적용 함수
  function renderLabs() {
    const filtered = allLabs.filter((lab) => {
      // 1. 과목 필터
      const matchSubject = currentSubject === "all" || lab.subject === currentSubject;

      // 2. 학년 필터
      const matchGrade = currentGrade === "all" || (lab.grade && lab.grade.includes(currentGrade));

      // 3. 검색어 필터 (제목, 설명, 단원, 태그)
      const q = currentKeyword.trim().toLowerCase();
      const matchKeyword =
        !q ||
        lab.title.toLowerCase().includes(q) ||
        lab.description.toLowerCase().includes(q) ||
        lab.unit.toLowerCase().includes(q) ||
        (lab.tags && lab.tags.some((t) => t.toLowerCase().includes(q)));

      return matchSubject && matchGrade && matchKeyword;
    });

    // 수업 개수 안내
    if (countDisplay) {
      countDisplay.textContent = `총 ${filtered.length}개의 탐구 수업`;
    }

    // 결과 렌더링
    if (filtered.length === 0) {
      labsGrid.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">🔍</div>
          <h3 class="empty-title">검색 조건에 맞는 탐구 수업이 없습니다</h3>
          <p class="empty-desc">검색어를 변경하거나 다른 과목/학년 필터를 선택해 보세요.</p>
        </div>
      `;
      return;
    }

    labsGrid.innerHTML = filtered.map(createLabCardHtml).join("");
  }

  // 과목 탭 이벤트 리스너
  subjectTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      subjectTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      currentSubject = tab.dataset.subject;
      renderLabs();
    });
  });

  // 학년 버튼 이벤트 리스너
  gradeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      gradeBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentGrade = btn.dataset.grade;
      renderLabs();
    });
  });

  // 검색어 입력 이벤트 리스너 (실시간)
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      currentKeyword = e.target.value;
      renderLabs();
    });
  }

  // 초기 렌더링
  renderLabs();
});
