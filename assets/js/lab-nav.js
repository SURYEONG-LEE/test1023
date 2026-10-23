/**
 * ==========================================================================
 * Science Lab Hub - 공통 내비게이션 바 컴포넌트 (lab-nav.js)
 * ==========================================================================
 * 개별 실험 웹 앱의 상단에 자동으로 공통 네비게이션을 삽입해 줍니다.
 * 
 * 사용법:
 * <body data-lab-id="periodic-table">
 * ...
 * <script src="../../assets/js/labs-data.js"></script>
 * <script src="../../assets/js/lab-nav.js"></script>
 */

(function initLabNavigation() {
  document.addEventListener("DOMContentLoaded", function () {
    // 1. 현재 실험 ID 확인 (body 태그의 data-lab-id 속성 또는 URL 폴더명 기준)
    let currentLabId = document.body.dataset.labId;
    if (!currentLabId) {
      const pathSegments = window.location.pathname.split("/").filter(Boolean);
      const labsIndex = pathSegments.indexOf("labs");
      if (labsIndex !== -1 && pathSegments.length > labsIndex + 1) {
        currentLabId = pathSegments[labsIndex + 1];
      }
    }

    const labs = window.LABS_DATA || [];
    const currentIndex = labs.findIndex((lab) => lab.id === currentLabId);
    const currentLab = currentIndex !== -1 ? labs[currentIndex] : null;

    // 2. 이전 및 다음 수업 계산
    const prevLab = currentIndex > 0 ? labs[currentIndex - 1] : null;
    const nextLab = currentIndex !== -1 && currentIndex < labs.length - 1 ? labs[currentIndex + 1] : null;

    // 3. 상대 경로 기준 (개별 실험 폴더는 labs/xxxx/ 위치이므로 루트는 ../../)
    const rootPath = "../../";
    const lobbyUrl = rootPath + "index.html";

    const prevUrl = prevLab ? rootPath + prevLab.path : "#";
    const nextUrl = nextLab ? rootPath + nextLab.path : "#";

    // 4. 네비게이션 HTML 구조 생성
    const navElement = document.createElement("header");
    navElement.className = "lab-header";
    navElement.setAttribute("role", "banner");

    navElement.innerHTML = `
      <!-- 좌측: 홈 로고 및 로비 복귀 버튼 -->
      <div class="lab-header-left">
        <a href="${lobbyUrl}" class="lab-logo-link" title="메인 로비로 이동">
          <div class="lab-logo-icon">🔬</div>
          <span>Science Lab Hub</span>
        </a>
        <div class="lab-divider"></div>
        <a href="${lobbyUrl}" class="lab-back-lobby-btn" title="전체 수업 목록으로 돌아가기">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          <span>전체 수업 목록</span>
        </a>
      </div>

      <!-- 중앙: 현재 탐구 수업 정보 -->
      <div class="lab-header-center">
        ${currentLab ? `<span class="lab-current-tag">${currentLab.number} · ${currentLab.subject}</span>` : ""}
        <span class="lab-current-title">${currentLab ? currentLab.title : "과학 탐구 실험"}</span>
      </div>

      <!-- 우측: 이전 / 다음 수업 빠른 이동 버튼 -->
      <div class="lab-header-right">
        <a href="${prevUrl}" 
           class="lab-nav-btn ${!prevLab ? "disabled" : ""}" 
           title="${prevLab ? `이전 수업: ${prevLab.title}` : "이전 수업이 없습니다"}">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          <span>이전 수업</span>
        </a>

        <a href="${nextUrl}" 
           class="lab-nav-btn ${!nextLab ? "disabled" : ""}" 
           title="${nextLab ? `다음 수업: ${nextLab.title}` : "다음 수업이 없습니다"}">
          <span>다음 수업</span>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </a>
      </div>
    `;

    // 5. 페이지 최상단에 주입
    document.body.insertAdjacentElement("afterbegin", navElement);
  });
})();
