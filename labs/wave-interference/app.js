document.addEventListener("DOMContentLoaded", () => {
  const c1 = document.getElementById("canvas-wave1");
  const c2 = document.getElementById("canvas-wave2");
  const cComb = document.getElementById("canvas-combined");
  const ctx1 = c1.getContext("2d");
  const ctx2 = c2.getContext("2d");
  const ctxComb = cComb.getContext("2d");

  const sliderPhase = document.getElementById("slider-phase");
  const sliderAmp1 = document.getElementById("slider-amp1");
  const sliderAmp2 = document.getElementById("slider-amp2");
  const dispPhase = document.getElementById("disp-phase");
  const dispAmp1 = document.getElementById("disp-amp1");
  const dispAmp2 = document.getElementById("disp-amp2");
  const trackInfo1 = document.getElementById("track-info-1");
  const trackInfo2 = document.getElementById("track-info-2");
  const trackInfoCombined = document.getElementById("track-info-combined");
  const btnConstructive = document.getElementById("btn-constructive");
  const btnDestructive = document.getElementById("btn-destructive");
  const btnPause = document.getElementById("btn-pause");

  let amp1 = 30;
  let amp2 = 30;
  let phaseDeg = 0;
  let wavelength = 140;
  let speed = 2.5;
  let time = 0;
  let isPaused = false;

  sliderPhase.addEventListener("input", (e) => {
    phaseDeg = parseInt(e.target.value, 10);
    dispPhase.textContent = `${phaseDeg}°`;
    updateTrackLabels();
  });

  sliderAmp1.addEventListener("input", (e) => {
    amp1 = parseInt(e.target.value, 10);
    dispAmp1.textContent = `${amp1} px`;
    updateTrackLabels();
  });

  sliderAmp2.addEventListener("input", (e) => {
    amp2 = parseInt(e.target.value, 10);
    dispAmp2.textContent = `${amp2} px`;
    updateTrackLabels();
  });

  btnConstructive.addEventListener("click", () => {
    sliderPhase.value = 0;
    phaseDeg = 0;
    dispPhase.textContent = "0°";
    updateTrackLabels();
  });

  btnDestructive.addEventListener("click", () => {
    sliderPhase.value = 180;
    phaseDeg = 180;
    dispPhase.textContent = "180°";
    updateTrackLabels();
  });

  btnPause.addEventListener("click", () => {
    isPaused = !isPaused;
    btnPause.textContent = isPaused ? "▶️ 재생하기" : "⏸️ 일시 정지";
  });

  function updateTrackLabels() {
    trackInfo1.textContent = `진폭: ${amp1}px, 위상: 0°`;
    trackInfo2.textContent = `진폭: ${amp2}px, 위상차: ${phaseDeg}°`;

    if (phaseDeg === 0 || phaseDeg === 360) {
      trackInfoCombined.innerHTML = `<span style="color:#059669;">🟢 완전 보강 간섭 (최대 진폭: ${amp1 + amp2}px)</span>`;
    } else if (phaseDeg === 180) {
      const minA = Math.abs(amp1 - amp2);
      trackInfoCombined.innerHTML = `<span style="color:#dc2626;">🔴 완전 상쇄 간섭 (진폭: ${minA}px${minA === 0 ? " - 진동 소멸" : ""})</span>`;
    } else {
      trackInfoCombined.innerHTML = `<span>부분 간섭 (위상차: ${phaseDeg}°)</span>`;
    }
  }

  function drawWave(ctx, width, height, waveFunc, strokeColor, lineWidth = 2.5) {
    ctx.clearRect(0, 0, width, height);
    const centerY = height / 2;
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    for (let x = 0; x <= width; x += 2) {
      const y = centerY - waveFunc(x);
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  function animate() {
    if (!isPaused) time += speed;
    const k = (2 * Math.PI) / wavelength;
    const phaseRad = (phaseDeg * Math.PI) / 180;

    const wave1 = (x) => amp1 * Math.sin(k * x - time * 0.05);
    const wave2 = (x) => amp2 * Math.sin(k * x - time * 0.05 + phaseRad);
    const waveComb = (x) => wave1(x) + wave2(x);

    drawWave(ctx1, c1.width, c1.height, wave1, "#2563eb", 2.5);
    drawWave(ctx2, c2.width, c2.height, wave2, "#db2777", 2.5);
    drawWave(ctxComb, cComb.width, cComb.height, waveComb, "#7c3aed", 3.5);

    requestAnimationFrame(animate);
  }

  updateTrackLabels();
  animate();
});
