# Science Lab Hub — 과학 인터랙티브 수업 플랫폼

중·고등학교 과학 수업에서 활용할 수 있는 개별 과학 탐구 웹 앱들을 하나로 연결하는 교육용 웹 플랫폼입니다.  
교사가 **바이브 코딩(Vibe Coding)**을 통해 새로운 과학 탐구 실험을 지속적으로 추가하고, 학생들은 하나의 웹사이트에서 일관된 사용자 경험으로 다양한 탐구 활동에 참여할 수 있습니다.

---

## 📂 프로젝트 구조 (Directory Structure)

```text
├── index.html                   # 메인 포털 로비 (수업 목록, 필터링, 검색)
├── assets/
│   ├── css/
│   │   ├── common.css           # 공통 디자인 토큰 (색상, 그림자, 타이포그래피, 공통 네비게이션)
│   │   └── lobby.css            # 메인 로비 전용 카드 그리드 및 필터 스타일
│   └── js/
│       ├── labs-data.js         # ⭐ 탐구 수업 메타데이터 (새 실험 추가 시 등록하는 곳)
│       ├── lobby.js             # 메인 로비 동적 렌더링 및 필터링 로직
│       └── lab-nav.js           # 개별 실험 상단 공통 네비게이션 자동 생성 컴포넌트
└── labs/                        # 🔬 개별 탐구 수업 모듈 폴더
    ├── periodic-table/          # [LAB-01] 주기율표 원소 탐구
    │   ├── index.html
    │   ├── style.css
    │   └── app.js
    ├── gas-laws/                # [LAB-02] 기체 법칙 (보일·샤를) 탐구
    │   ├── index.html
    │   ├── style.css
    │   └── app.js
    └── wave-interference/       # [LAB-03] 파동의 중첩과 간섭 실험
        ├── index.html
        ├── style.css
        └── app.js
```

---

## 🚀 새로운 탐구 실험을 추가하는 3단계 방법

AI에게 새로운 실험 제작을 요청하거나 직접 실험을 추가할 때 다음 3단계만 진행하면 플랫폼에 자동으로 통합됩니다.

### Step 1. `labs/` 아래에 새로운 실험 폴더 생성
예를 들어 광합성 실험을 추가한다면:
- `labs/photosynthesis/index.html`
- `labs/photosynthesis/style.css`
- `labs/photosynthesis/app.js`

### Step 2. `index.html`에 공통 네비게이션 연결
실험 HTML의 `<body>` 태그에 실험 ID를 지정하고, 공통 스크립트 2개를 포함합니다:

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>새로운 실험 제목 | Science Lab Hub</title>
  <!-- 공통 스타일시트 연결 -->
  <link rel="stylesheet" href="../../assets/css/common.css">
  <link rel="stylesheet" href="./style.css">
</head>
<body data-lab-id="photosynthesis">
  <!-- 상단 공통 네비게이션이 자동으로 주입됩니다 -->

  <main>
    <!-- 여기에 실험 UI를 자유롭게 제작합니다 -->
  </main>

  <!-- 공통 스크립트 연결 (상대 경로) -->
  <script src="../../assets/js/labs-data.js"></script>
  <script src="../../assets/js/lab-nav.js"></script>
  <!-- 개별 실험 스크립트 -->
  <script src="./app.js"></script>
</body>
</html>
```

### Step 3. `assets/js/labs-data.js`에 수업 정보 등록
`LABS_DATA` 배열에 새 실험 객체를 추가합니다:

```javascript
{
  id: "photosynthesis",
  number: "LAB-04",
  title: "광합성과 빛의 세기 탐구",
  subject: "생명과학",            // 물리, 화학, 생명과학, 지구과학 중 선택
  grade: "중학교 / 고등학교",
  unit: "식물의 에너지 대사",
  icon: "🌿",
  description: "빛의 세기와 이산화탄소 농도에 따른 광합성 속도(기포 발생 수)를 측정하고 최적 조건을 탐구합니다.",
  tags: ["광합성", "빛의세기", "엽록체", "산소발생"],
  path: "labs/photosynthesis/index.html"
}
```

> **완료!**  
> 메인 로비에 자동으로 카드가 생성되고, 과목/학년 필터 및 [이전 수업 / 다음 수업] 네비게이션 링크가 자동으로 연결됩니다.

---

## 🎨 주요 특징 및 디자인 원칙

1. **완전 독립형 아키텍처 (Modular Architecture):**  
   어떤 실험을 수정하거나 삭제해도 다른 실험이나 메인 로비에 전혀 영향을 주지 않습니다.
2. **배포 친화적인 상대 경로 (Relative Paths):**  
   GitHub Pages의 하위 저장소 경로(`https://username.github.io/repository-name/`)에서도 링크 깨짐 없이 완벽하게 작동합니다.
3. **학습자 친화적인 인터페이스 (UI/UX):**  
   학교 현장에서 사용하는 크롬북, 아이패드/태블릿, 교사용 PC에 최적화된 반응형 레이아웃과 부드러운 호버 애니메이션이 적용되어 있습니다.
4. **무설치 / 빌드 프리 (No Build Step):**  
   별도의 npm 설치나 빌드 과정 없이 `index.html` 파일을 브라우저로 열거나 웹 서버에 올리기만 하면 즉시 작동합니다.

---

## 🌐 로컬 실행 및 확인 방법

컴퓨터에서 바로 확인하려면:
- 작업 폴더 내 `index.html` 파일을 더블 클릭하여 웹 브라우저(크롬, 엣지 등)로 열면 됩니다.
- 또는 VS Code의 `Live Server` 확장 프로그램이나 로컬 웹 서버(`http://localhost:5500` 등)를 통해 확인할 수 있습니다.
