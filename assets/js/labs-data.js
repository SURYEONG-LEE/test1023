/**
 * ==========================================================================
 * Science Lab Hub - 탐구 수업 데이터베이스 (labs-data.js)
 * ==========================================================================
 * 새로운 탐구 수업을 추가할 때는 아래 LABS_DATA 배열에 새 객체를 추가하기만 하면 됩니다.
 * 메인 로비 목록 렌더링, 학년/과목별 필터링, 이전/다음 탐구 수업 이동이 자동으로 연동됩니다.
 */

const LABS_DATA = [
  {
    id: "periodic-table",
    number: "LAB-01",
    title: "전이금속 포함 표준 장주기율표 (1~118번)",
    subject: "화학",              // 분류: 물리, 화학, 생명과학, 지구과학
    grade: "중·고등학교 공통 / 심화",
    unit: "물질의 규칙성과 원소의 주기성",
    icon: "⚛️",
    description: "3~12족 전이금속(Fe, Cu, Au, Ti 등)과 란타넘·악티늄족을 포함한 118개 전체 원소 장주기율표입니다. 보어 모형, 다양한 산화수, 동위 원소, 상태별 경향성을 인터랙티브하게 탐구합니다.",
    tags: ["장주기율표", "전이금속", "보어원자모형", "산화수", "동위원소", "118원소"],
    path: "labs/periodic-table/index.html",
    featured: true
  },
  {
    id: "gas-laws",
    number: "LAB-02",
    title: "기체 법칙 가상 실험실 (보일·샤를·보일-샤를)",
    subject: "물리",              // 물리 / 화학 공통
    grade: "고등학교 (통합과학/화학I)",
    unit: "기체의 성질과 상태 변화",
    icon: "🎈",
    description: "피스톤 실린더에서 압력(P)과 온도(T)를 직접 조작하며 부피(V) 변화와 입자 운동을 관찰하고, 실시간 그래프 및 5단계 탐구 활동(예측-실험-분석-정리-적용)을 수행합니다.",
    tags: ["보일법칙", "샤를법칙", "보일샤를법칙", "이상기체", "실시간그래프", "절대온도"],
    path: "labs/gas-laws/index.html",
    featured: true
  },
  {
    id: "wave-interference",
    number: "LAB-03",
    title: "파동의 중첩과 간섭 실험",
    subject: "물리",
    grade: "고등학교",
    unit: "파동과 정보 통신",
    icon: "🌊",
    description: "두 파원에서 발생한 파동이 진행하면서 만드는 보강 간섭과 상쇄 간섭의 원리를 시각화된 파동 캔버스에서 주파수와 위상을 조절하며 탐구합니다.",
    tags: ["파동", "보강간섭", "상쇄간섭", "위상차", "진폭"],
    path: "labs/wave-interference/index.html",
    featured: true
  }
];

// 전역 객체로 내보내기 (브라우저 환경 지원)
if (typeof window !== 'undefined') {
  window.LABS_DATA = LABS_DATA;
}
