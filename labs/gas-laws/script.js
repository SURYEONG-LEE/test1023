/**
 * ==========================================================================
 * Science Lab Hub - 기체 법칙 가상 실험실 스크립트 (script.js)
 * ==========================================================================
 * 고등학교 과학 기체의 압력(P), 부피(V), 온도(T) 사이의 관계 시뮬레이션
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. 상태 변수
  let currentMode = "boyle"; // 'boyle', 'charles', 'combined'
  let pressure = 1.0;        // atm (0.5 ~ 3.0)
  let temperature = 300;     // K (150 ~ 600)
  let volume = 10.0;         // L (계산값)
  let recordedData = [];     // 실험 측정 데이터 저장 배열
  let chartInstance = null;  // Chart.js 인스턴스

  // 2. DOM 요소 참조
  const tabButtons = document.querySelectorAll(".law-tab-btn");
  const labelConstantVar = document.getElementById("label-constant-var");
  const labelManipulatedVar = document.getElementById("label-manipulated-var");
  const labelRespondingVar = document.getElementById("label-responding-var");

  const dispPressure = document.getElementById("disp-pressure");
  const dispVolume = document.getElementById("disp-volume");
  const dispTempK = document.getElementById("disp-temp-k");
  const dispTempC = document.getElementById("disp-temp-c");

  const pistonAssembly = document.getElementById("piston-assembly");
  const pistonWeightsContainer = document.getElementById("piston-weights-container");
  const pistonForceLabel = document.getElementById("piston-force-label");
  const thermalBar = document.getElementById("thermal-bar");
  const flameEffect = document.getElementById("flame-effect");
  const thermalStatusLabel = document.getElementById("thermal-status-label");

  const sliderPressure = document.getElementById("slider-pressure");
  const sliderTemp = document.getElementById("slider-temp");
  const valSliderPressure = document.getElementById("val-slider-pressure");
  const valSliderTemp = document.getElementById("val-slider-temp");
  const rowCtrlPressure = document.getElementById("row-ctrl-pressure");
  const rowCtrlTemp = document.getElementById("row-ctrl-temp");
  const btnReset = document.getElementById("btn-reset-values");

  const graphTitle = document.getElementById("graph-title");
  const graphSubtitle = document.getElementById("graph-subtitle");
  const formulaDisplay = document.getElementById("formula-display");
  const calcLiveResult = document.getElementById("calc-live-result");

  const btnRecordData = document.getElementById("btn-record-data");
  const recordCountText = document.getElementById("record-count-text");
  const tableBody = document.getElementById("table-body");
  const btnClearTable = document.getElementById("btn-clear-table");
  const thCalcLabel = document.getElementById("th-calc-label");

  // 탐구 워크북 탭 및 퀴즈
  const stepTabButtons = document.querySelectorAll(".step-tab-btn");
  const stepPanes = document.querySelectorAll(".step-pane");
  const quizQuestion = document.getElementById("quiz-question");
  const quizOptions = document.getElementById("quiz-options");
  const quizFeedback = document.getElementById("quiz-feedback");
  const analysisAns1 = document.getElementById("analysis-ans-1");
  const analysisAns2 = document.getElementById("analysis-ans-2");

  // 캔버스 초기화
  const canvas = document.getElementById("gas-canvas");
  const ctx = canvas.getContext("2d");
  const W = canvas.width;
  const H = canvas.height;

  // 35개 기체 입자 생성
  const numParticles = 35;
  const particles = [];
  for (let i = 0; i < numParticles; i++) {
    particles.push({
      x: 30 + Math.random() * (W - 60),
      y: 120 + Math.random() * (H - 160),
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4,
      radius: 5
    });
  }

  // ==========================================================================
  // 3. 기체 법칙 모드 변경 및 상태 계산
  // ==========================================================================
  tabButtons.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabButtons.forEach((b) => b.classList.remove("active"));
      tab.classList.add("active");
      currentMode = tab.dataset.mode;
      configureModeUI();
      updateSimulationState();
      updateQuizContent();
      buildChart();
    });
  });

  function configureModeUI() {
    if (currentMode === "boyle") {
      // 보일 법칙: 온도 일정 (300K), 압력 조작
      rowCtrlPressure.classList.remove("disabled");
      rowCtrlTemp.classList.add("disabled");
      temperature = 300;
      sliderTemp.value = 300;

      labelConstantVar.textContent = "온도 (T = 300 K 일정)";
      labelManipulatedVar.textContent = "외부 압력 (P, 조작)";
      labelRespondingVar.textContent = "기체 부피 (V, 결과 관찰)";
      thCalcLabel.textContent = "P × V";
      graphSubtitle.textContent = "보일 법칙: 압력(P) vs 부피(V) 반비례 곡선";
    } else if (currentMode === "charles") {
      // 샤를 법칙: 압력 일정 (1.0 atm), 온도 조작
      rowCtrlPressure.classList.add("disabled");
      rowCtrlTemp.classList.remove("disabled");
      pressure = 1.0;
      sliderPressure.value = 1.0;

      labelConstantVar.textContent = "외부 압력 (P = 1.0 atm 일정)";
      labelManipulatedVar.textContent = "절대 온도 (T, 조작)";
      labelRespondingVar.textContent = "기체 부피 (V, 결과 관찰)";
      thCalcLabel.textContent = "V ÷ T";
      graphSubtitle.textContent = "샤를 법칙: 절대온도(T) vs 부피(V) 비례 직선";
    } else {
      // 보일·샤를 법칙: 압력 및 온도 둘 다 조작
      rowCtrlPressure.classList.remove("disabled");
      rowCtrlTemp.classList.remove("disabled");

      labelConstantVar.textContent = "기체의 몰수 (n 일정)";
      labelManipulatedVar.textContent = "압력(P)과 온도(T) 동시 조작";
      labelRespondingVar.textContent = "기체 부피 (V, 결과 관찰)";
      thCalcLabel.textContent = "(P × V) ÷ T";
      graphSubtitle.textContent = "보일·샤를 법칙: 상태 변화에 따른 부피 궤적";
    }
  }

  // 슬라이더 입력 리스너
  sliderPressure.addEventListener("input", (e) => {
    pressure = parseFloat(e.target.value);
    valSliderPressure.textContent = `${pressure.toFixed(2)} atm`;
    updateSimulationState();
  });

  sliderTemp.addEventListener("input", (e) => {
    temperature = parseInt(e.target.value, 10);
    const tempC = (temperature - 273.15).toFixed(1);
    valSliderTemp.textContent = `${temperature} K (${tempC} ℃)`;
    updateSimulationState();
  });

  btnReset.addEventListener("click", () => {
    sliderPressure.value = 1.0;
    sliderTemp.value = 300;
    pressure = 1.0;
    temperature = 300;
    valSliderPressure.textContent = "1.00 atm";
    valSliderTemp.textContent = "300 K (26.9 ℃)";
    updateSimulationState();
  });

  // 상태 계산 및 화면 UI 동기화
  function updateSimulationState() {
    // 이상 기체 방정식 기반: V = (10.0 * (T / 300)) / P
    volume = (10.0 * (temperature / 300)) / pressure;

    // 디지털 계측기 수치 업데이트
    const tempC = (temperature - 273.15).toFixed(2);
    dispPressure.innerHTML = `${pressure.toFixed(2)} <small>atm</small>`;
    dispVolume.innerHTML = `${volume.toFixed(2)} <small>L</small>`;
    dispTempK.innerHTML = `${temperature} <small>K</small>`;
    dispTempC.textContent = `(${tempC} ℃)`;

    // 피스톤 위 '추(Weight)' 개수 및 누르는 힘 시각화
    pistonForceLabel.textContent = `누르는 힘: ${pressure.toFixed(2)} atm`;
    const numWeights = Math.max(1, Math.round(pressure * 2));
    pistonWeightsContainer.innerHTML = "";
    for (let w = 0; w < numWeights; w++) {
      const weightEl = document.createElement("div");
      weightEl.className = "weight-icon";
      weightEl.textContent = "0.5kg";
      pistonWeightsContainer.appendChild(weightEl);
    }

    // 피스톤 높이 계산 (실린더 상단: top=35px ~ 바닥: top=240px)
    // 부피 2.5L일 때 top=240px, 부피 20L일 때 top=35px
    const minPistonY = 35;
    const maxPistonY = 245;
    const normV = Math.max(2.5, Math.min(22.0, volume));
    const pistonY = maxPistonY - ((normV - 2.5) / (22.0 - 2.5)) * (maxPistonY - minPistonY);
    pistonAssembly.style.top = `${pistonY}px`;

    // 하단 버너 그래픽 (온도에 따른 냉기 / 상온 / 화염)
    if (temperature < 270) {
      thermalBar.style.background = "#bae6fd";
      flameEffect.style.opacity = "0";
      thermalStatusLabel.textContent = `냉각기 작동 중 (${temperature} K / ${tempC} ℃)`;
      thermalStatusLabel.style.color = "#0369a1";
    } else if (temperature > 330) {
      const heatFactor = Math.min(1, (temperature - 330) / 270);
      thermalBar.style.background = "#fee2e2";
      flameEffect.style.opacity = `${0.3 + heatFactor * 0.7}`;
      thermalStatusLabel.textContent = `가열 버너 작동 중 (${temperature} K / ${tempC} ℃)`;
      thermalStatusLabel.style.color = "#991b1b";
    } else {
      thermalBar.style.background = "#cbd5e1";
      flameEffect.style.opacity = "0";
      thermalStatusLabel.textContent = `상온 유지 중 (300 K / ${tempC} ℃)`;
      thermalStatusLabel.style.color = "#334155";
    }

    // 법칙 공식 및 실시간 계산 결과 배너
    if (currentMode === "boyle") {
      const pv = (pressure * volume).toFixed(2);
      formulaDisplay.textContent = "P × V = 일정 (k)";
      calcLiveResult.innerHTML = `${pressure.toFixed(2)} atm × ${volume.toFixed(2)} L = <strong>${pv} atm·L (상수 유지)</strong>`;
    } else if (currentMode === "charles") {
      const vt = (volume / temperature).toFixed(4);
      formulaDisplay.textContent = "V ÷ T = 일정 (k)";
      calcLiveResult.innerHTML = `${volume.toFixed(2)} L ÷ ${temperature} K = <strong>${vt} L/K (상수 유지)</strong>`;
    } else {
      const pvt = ((pressure * volume) / temperature).toFixed(4);
      formulaDisplay.textContent = "(P × V) ÷ T = 일정 (nR)";
      calcLiveResult.innerHTML = `(${pressure.toFixed(2)} atm × ${volume.toFixed(2)} L) ÷ ${temperature} K = <strong>${pvt} (상수)</strong>`;
    }

    // 그래프 내 현재 점 업데이트
    updateChartPoint();
  }

  // ==========================================================================
  // 4. Chart.js 실시간 과학 그래프
  // ==========================================================================
  function buildChart() {
    const chartCtx = document.getElementById("gas-law-chart").getContext("2d");
    if (chartInstance) {
      chartInstance.destroy();
    }

    if (currentMode === "boyle") {
      // 보일 법칙 이론 곡선: P: 0.5 ~ 3.5, V = 10 / P
      const theoryData = [];
      for (let p = 0.5; p <= 3.5; p += 0.1) {
        theoryData.push({ x: parseFloat(p.toFixed(2)), y: parseFloat((10.0 / p).toFixed(2)) });
      }

      chartInstance = new Chart(chartCtx, {
        type: "line",
        data: {
          datasets: [
            {
              label: "이론적 보일 곡선 (T=300K)",
              data: theoryData,
              borderColor: "#4f46e5",
              borderWidth: 2.5,
              fill: false,
              tension: 0.3,
              pointRadius: 0
            },
            {
              label: "현재 실험 측정 상태",
              data: [{ x: pressure, y: volume }],
              borderColor: "#ef4444",
              backgroundColor: "#ef4444",
              pointRadius: 7,
              pointHoverRadius: 9,
              showLine: false
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              type: "linear",
              title: { display: true, text: "압력 P (atm)", font: { weight: "bold", size: 12 } },
              min: 0,
              max: 3.5
            },
            y: {
              title: { display: true, text: "부피 V (L)", font: { weight: "bold", size: 12 } },
              min: 0,
              max: 22
            }
          },
          plugins: {
            legend: { position: "top", labels: { boxWidth: 12, font: { size: 11 } } },
            tooltip: {
              callbacks: {
                label: (ctx) => `압력: ${ctx.parsed.x} atm, 부피: ${ctx.parsed.y} L`
              }
            }
          }
        }
      });
    } else if (currentMode === "charles") {
      // 샤를 법칙 이론 직선: T: 0 ~ 650K, V = 10 * (T / 300)
      const theoryData = [
        { x: 0, y: 0 },
        { x: 150, y: 5.0 },
        { x: 300, y: 10.0 },
        { x: 450, y: 15.0 },
        { x: 600, y: 20.0 }
      ];

      chartInstance = new Chart(chartCtx, {
        type: "line",
        data: {
          datasets: [
            {
              label: "이론적 샤를 직선 (P=1.0atm)",
              data: theoryData,
              borderColor: "#059669",
              borderWidth: 2.5,
              fill: false,
              pointRadius: 0
            },
            {
              label: "절대영도 외삽선 (0K 수렴)",
              data: [{ x: 0, y: 0 }, { x: 150, y: 5.0 }],
              borderColor: "#94a3b8",
              borderWidth: 1.5,
              borderDash: [5, 5],
              pointRadius: 0
            },
            {
              label: "현재 실험 측정 상태",
              data: [{ x: temperature, y: volume }],
              borderColor: "#ef4444",
              backgroundColor: "#ef4444",
              pointRadius: 7,
              pointHoverRadius: 9,
              showLine: false
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              type: "linear",
              title: { display: true, text: "절대 온도 T (K)", font: { weight: "bold", size: 12 } },
              min: 0,
              max: 650
            },
            y: {
              title: { display: true, text: "부피 V (L)", font: { weight: "bold", size: 12 } },
              min: 0,
              max: 22
            }
          },
          plugins: {
            legend: { position: "top", labels: { boxWidth: 12, font: { size: 11 } } },
            tooltip: {
              callbacks: {
                label: (ctx) => `온도: ${ctx.parsed.x} K, 부피: ${ctx.parsed.y} L`
              }
            }
          }
        }
      });
    } else {
      // 보일·샤를 복합 모드: 누적 측정점 및 현재 상태 표시
      chartInstance = new Chart(chartCtx, {
        type: "scatter",
        data: {
          datasets: [
            {
              label: "누적 측정 데이터",
              data: recordedData.map(d => ({ x: d.p, y: d.v })),
              borderColor: "#6366f1",
              backgroundColor: "#6366f1",
              pointRadius: 5
            },
            {
              label: "현재 상태 (P vs V)",
              data: [{ x: pressure, y: volume }],
              borderColor: "#ef4444",
              backgroundColor: "#ef4444",
              pointRadius: 8,
              showLine: false
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              title: { display: true, text: "압력 P (atm)", font: { weight: "bold", size: 12 } },
              min: 0.3,
              max: 3.5
            },
            y: {
              title: { display: true, text: "부피 V (L)", font: { weight: "bold", size: 12 } },
              min: 0,
              max: 24
            }
          },
          plugins: {
            legend: { position: "top", labels: { boxWidth: 12, font: { size: 11 } } }
          }
        }
      });
    }
  }

  function updateChartPoint() {
    if (!chartInstance) return;

    if (currentMode === "boyle") {
      chartInstance.data.datasets[1].data = [{ x: pressure, y: volume }];
    } else if (currentMode === "charles") {
      chartInstance.data.datasets[2].data = [{ x: temperature, y: volume }];
    } else {
      chartInstance.data.datasets[1].data = [{ x: pressure, y: volume }];
    }
    chartInstance.update("none");
  }

  // ==========================================================================
  // 5. 기체 분자 물리 애니메이션 루프 (속도 v ∝ √T 구현)
  // ==========================================================================
  function animate() {
    ctx.clearRect(0, 0, W, H);

    // 피스톤 상단 기준선
    const pistonTop = parseFloat(pistonAssembly.style.top || "60") + 24;
    const bottomY = H - 10;

    // 절대온도(T)에 따른 분자 평균 속도 (루트 T 비례 법칙 적용)
    // 300K일 때 기준 속도 1.0, 150K일 때 약 0.7배, 600K일 때 1.414배로 눈에 띄게 빨라짐
    const speedMultiplier = Math.sqrt(temperature / 300);

    particles.forEach((p) => {
      p.x += p.vx * speedMultiplier;
      p.y += p.vy * speedMultiplier;

      // 좌우 벽면 충돌
      if (p.x - p.radius < 8) {
        p.x = 8 + p.radius;
        p.vx *= -1;
      } else if (p.x + p.radius > W - 8) {
        p.x = W - 8 - p.radius;
        p.vx *= -1;
      }

      // 피스톤 헤드 충돌
      if (p.y - p.radius < pistonTop) {
        p.y = pistonTop + p.radius;
        p.vy = Math.abs(p.vy); // 아래 방향으로 튕김
      }

      // 실린더 바닥 충돌
      if (p.y + p.radius > bottomY) {
        p.y = bottomY - p.radius;
        p.vy = -Math.abs(p.vy); // 위 방향으로 튕김
      }

      // 분자 그리기 (온도에 따라 입자 색상 변화: 저온 파랑 -> 고온 주황/빨강)
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      if (temperature > 380) {
        ctx.fillStyle = "#ef4444"; // 고온
      } else if (temperature < 250) {
        ctx.fillStyle = "#0284c7"; // 저온
      } else {
        ctx.fillStyle = "#3b82f6"; // 상온
      }
      ctx.fill();
      ctx.closePath();
    });

    requestAnimationFrame(animate);
  }

  // ==========================================================================
  // 6. 데이터 표에 기록하기 인터랙션
  // ==========================================================================
  btnRecordData.addEventListener("click", () => {
    let calcVal = "";
    if (currentMode === "boyle") {
      calcVal = (pressure * volume).toFixed(2);
    } else if (currentMode === "charles") {
      calcVal = (volume / temperature).toFixed(4);
    } else {
      calcVal = ((pressure * volume) / temperature).toFixed(4);
    }

    const newRecord = {
      id: recordedData.length + 1,
      p: parseFloat(pressure.toFixed(2)),
      v: parseFloat(volume.toFixed(2)),
      tK: temperature,
      tC: (temperature - 273.15).toFixed(1),
      calc: calcVal
    };
    recordedData.push(newRecord);
    renderDataTable();

    // 버튼 피드백 애니메이션
    btnRecordData.innerHTML = "<span>✅</span> 측정값 기록 완료!";
    setTimeout(() => {
      btnRecordData.innerHTML = "<span>📋</span> 현재 상태 데이터 표에 기록하기";
    }, 900);
  });

  btnClearTable.addEventListener("click", () => {
    recordedData = [];
    renderDataTable();
  });

  function renderDataTable() {
    recordCountText.textContent = `기록된 데이터: ${recordedData.length}개`;

    if (recordedData.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align:center; color:var(--text-light); padding:1.5rem;">
            기록된 데이터가 없습니다. 상단의 [현재 상태 데이터 표에 기록하기] 버튼을 눌러보세요.
          </td>
        </tr>
      `;
      return;
    }

    tableBody.innerHTML = recordedData
      .map(
        (r) => `
        <tr>
          <td>#${r.id}</td>
          <td><strong>${r.p}</strong></td>
          <td><strong style="color:#047857;">${r.v}</strong></td>
          <td>${r.tK}</td>
          <td>${r.tC}</td>
          <td style="color:var(--primary-700); font-weight:700;">${r.calc}</td>
        </tr>
      `
      )
      .join("");
  }

  // ==========================================================================
  // 7. 5단계 탐구 활동 탭 및 퀴즈
  // ==========================================================================
  stepTabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      stepTabButtons.forEach((b) => b.classList.remove("active"));
      stepPanes.forEach((p) => p.classList.remove("active"));

      btn.classList.add("active");
      const stepNum = btn.dataset.step;
      const targetPane = document.getElementById(`step-pane-${stepNum}`);
      if (targetPane) targetPane.classList.add("active");
    });
  });

  function updateQuizContent() {
    quizFeedback.classList.add("hidden");
    quizOptions.querySelectorAll(".quiz-opt-btn").forEach((b) => {
      b.classList.remove("selected-correct", "selected-wrong");
    });

    if (currentMode === "boyle") {
      quizQuestion.textContent = "온도가 일정할 때, 주사기(실린더)의 피스톤을 눌러 외부 압력을 2배로 증가시키면 기체의 부피는 어떻게 변할까요?";
      quizOptions.children[0].textContent = "부피가 1/2로 줄어든다.";
      quizOptions.children[0].dataset.ans = "correct";
      quizOptions.children[1].textContent = "부피가 2배로 늘어난다.";
      quizOptions.children[1].dataset.ans = "wrong";
      quizOptions.children[2].textContent = "부피는 변하지 않는다.";
      quizOptions.children[2].dataset.ans = "wrong";

      analysisAns1.innerHTML = "표에서 계산한 <strong>P × V 의 곱은 10.0 atm·L 로 거의 일정</strong>합니다. 압력이 2배 증가하면 부피는 1/2배가 되므로 두 변인은 <strong>반비례</strong> 관계입니다.";
      analysisAns2.innerHTML = "보일 법칙 그래프는 전형적인 <strong>직각쌍곡선(반비례 곡선)</strong> 형태를 보입니다.";
    } else if (currentMode === "charles") {
      quizQuestion.textContent = "압력이 일정할 때, 기체의 절대온도를 300K에서 600K로 2배 높이면 기체의 부피는 어떻게 변할까요?";
      quizOptions.children[0].textContent = "부피가 2배로 팽창한다.";
      quizOptions.children[0].dataset.ans = "correct";
      quizOptions.children[1].textContent = "부피가 1/2로 감소한다.";
      quizOptions.children[1].dataset.ans = "wrong";
      quizOptions.children[2].textContent = "부피는 변하지 않는다.";
      quizOptions.children[2].dataset.ans = "wrong";

      analysisAns1.innerHTML = "표에서 계산한 <strong>V ÷ T 의 비율은 0.033 L/K 로 일정</strong>합니다. 온도가 증가하면 입자의 운동이 활발해져 피스톤을 밀어내며 부피가 <strong>비례</strong>하여 팽창합니다.";
      analysisAns2.innerHTML = "샤를 법칙 그래프는 절대온도(K)를 가로축으로 할 때 <strong>원점(0K, 절대영도)을 지나는 직선</strong>이 되며, -273.15℃에서 이론상 부피가 0에 수렴함을 알 수 있습니다.";
    } else {
      quizQuestion.textContent = "압력을 2배로 높이고, 동시에 절대온도도 2배로 높이면 기체의 부피는 어떻게 될까요?";
      quizOptions.children[0].textContent = "부피는 처음과 동일하게 유지된다.";
      quizOptions.children[0].dataset.ans = "correct";
      quizOptions.children[1].textContent = "부피가 4배로 증가한다.";
      quizOptions.children[1].dataset.ans = "wrong";
      quizOptions.children[2].textContent = "부피가 1/4로 감소한다.";
      quizOptions.children[2].dataset.ans = "wrong";

      analysisAns1.innerHTML = "보일·샤를 법칙에 따라 $V = k \\cdot \\frac{T}{P}$ 이므로, 분자(온도)가 2배, 분모(압력)가 2배 증가하면 상쇄되어 부피는 <strong>변함없이 유지</strong>됩니다.";
      analysisAns2.innerHTML = "$(P \\times V) / T$ 계산값이 일정함을 통해 기체의 부피는 절대온도에 비례하고 압력에 반비례한다는 복합 관계를 한 번에 검증할 수 있습니다.";
    }
  }

  // 퀴즈 선택 리스너
  quizOptions.addEventListener("click", (e) => {
    const btn = e.target.closest(".quiz-opt-btn");
    if (!btn) return;

    quizOptions.querySelectorAll(".quiz-opt-btn").forEach((b) => {
      b.classList.remove("selected-correct", "selected-wrong");
    });

    const isCorrect = btn.dataset.ans === "correct";
    if (isCorrect) {
      btn.classList.add("selected-correct");
      quizFeedback.className = "quiz-feedback correct";
      quizFeedback.innerHTML = "🎉 <strong>정답입니다!</strong> 위의 조작기 슬라이더를 직접 움직여 예측한 결과가 맞는지 바로 실험해 보세요!";
    } else {
      btn.classList.add("selected-wrong");
      quizFeedback.className = "quiz-feedback wrong";
      quizFeedback.innerHTML = "🤔 <strong>다시 한 번 생각해 보세요.</strong> 슬라이더를 조작하여 피스톤이 어느 쪽으로 이동하는지 먼저 확인해 보세요.";
    }
    quizFeedback.classList.remove("hidden");
  });

  // 초기화 실행
  configureModeUI();
  updateSimulationState();
  updateQuizContent();
  buildChart();
  animate();
});
