document.addEventListener("DOMContentLoaded", () => {
  let currentMode = "boyle";
  let pressure = 1.0;
  let temperature = 300;
  let volume = 10.0;

  const modeButtons = document.querySelectorAll(".mode-btn");
  const groupBoyle = document.getElementById("group-boyle");
  const groupCharles = document.getElementById("group-charles");
  const pressureSlider = document.getElementById("pressure-slider");
  const tempSlider = document.getElementById("temp-slider");
  const pressureSliderVal = document.getElementById("pressure-slider-val");
  const tempSliderVal = document.getElementById("temp-slider-val");

  const valPressure = document.getElementById("val-pressure");
  const valVolume = document.getElementById("val-volume");
  const valTemp = document.getElementById("val-temp");

  const pistonHead = document.getElementById("piston-head");
  const pistonWeight = document.getElementById("piston-weight");
  const heaterBar = document.getElementById("heater-bar");
  const heaterLabel = document.getElementById("heater-label");

  const formulaTitle = document.getElementById("formula-title");
  const formulaBox = document.getElementById("formula-box");
  const calcResult = document.getElementById("calc-result");
  const conceptText = document.getElementById("concept-text");

  const canvas = document.getElementById("gas-canvas");
  const ctx = canvas.getContext("2d");
  const W = canvas.width;
  const H = canvas.height;

  const numParticles = 28;
  const particles = [];
  for (let i = 0; i < numParticles; i++) {
    particles.push({
      x: 30 + Math.random() * (W - 60),
      y: 120 + Math.random() * (H - 160),
      vx: (Math.random() - 0.5) * 3,
      vy: (Math.random() - 0.5) * 3,
      radius: 5
    });
  }

  modeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      modeButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentMode = btn.dataset.mode;

      if (currentMode === "boyle") {
        groupBoyle.classList.remove("hidden");
        groupCharles.classList.add("hidden");
        temperature = 300;
        pressure = parseFloat(pressureSlider.value);
      } else {
        groupBoyle.classList.add("hidden");
        groupCharles.classList.remove("hidden");
        pressure = 1.0;
        temperature = parseFloat(tempSlider.value);
      }
      updateState();
    });
  });

  pressureSlider.addEventListener("input", (e) => {
    pressure = parseFloat(e.target.value);
    pressureSliderVal.textContent = `${pressure.toFixed(1)} atm`;
    updateState();
  });

  tempSlider.addEventListener("input", (e) => {
    temperature = parseFloat(e.target.value);
    tempSliderVal.textContent = `${temperature} K`;
    updateState();
  });

  function updateState() {
    if (currentMode === "boyle") {
      volume = 10.0 / pressure;
      formulaTitle.textContent = "보일의 법칙 (온도 일정)";
      formulaBox.textContent = "P × V = 일정 (10.0 atm·L)";
      calcResult.innerHTML = `${pressure.toFixed(1)} atm × ${volume.toFixed(1)} L = <strong>${(pressure * volume).toFixed(1)} (상수)</strong>`;
      conceptText.textContent = "온도가 일정할 때 외부 압력이 커지면 기체 부피는 정확히 반비례하여 줄어듭니다.";
      pistonWeight.textContent = `추 ${Math.round(pressure * 2)}개 (${pressure.toFixed(1)} atm)`;
      heaterBar.style.background = "#cbd5e1";
      heaterLabel.textContent = "온도 일정 (300 K)";
    } else {
      volume = (10.0 * (temperature / 300));
      formulaTitle.textContent = "샤를의 법칙 (압력 일정)";
      formulaBox.textContent = "V / T = 일정 (0.033 L/K)";
      calcResult.innerHTML = `${volume.toFixed(1)} L ÷ ${temperature} K = <strong>${(volume / temperature).toFixed(3)} (상수)</strong>`;
      conceptText.textContent = "압력이 일정할 때 온도가 높아지면 기체 분자의 운동이 활발해져 부피가 비례 팽창합니다.";
      pistonWeight.textContent = "추 1개 (1.0 atm 고정)";
      const heatIntensity = Math.min(1, Math.max(0, (temperature - 150) / 300));
      heaterBar.style.background = `rgb(${Math.round(200 + 55 * heatIntensity)}, ${Math.round(200 - 150 * heatIntensity)}, ${Math.round(200 - 150 * heatIntensity)})`;
      heaterLabel.textContent = `가열기 온도: ${temperature} K (${(temperature - 273.15).toFixed(0)} ℃)`;
    }

    valPressure.textContent = `${pressure.toFixed(1)} atm`;
    valVolume.textContent = `${volume.toFixed(1)} L`;
    valTemp.textContent = `${temperature} K`;

    const minPistonY = 40;
    const maxPistonY = 240;
    const pistonY = maxPistonY - ((volume - 2.5) / (15.0 - 2.5)) * (maxPistonY - minPistonY);
    pistonHead.style.top = `${pistonY}px`;
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    const pistonTop = parseFloat(pistonHead.style.top || "100") + 28;
    const bottomY = H - 25;
    const speedFactor = Math.sqrt(temperature / 300);

    particles.forEach((p) => {
      p.x += p.vx * speedFactor;
      p.y += p.vy * speedFactor;

      if (p.x - p.radius < 10) { p.x = 10 + p.radius; p.vx *= -1; }
      else if (p.x + p.radius > W - 10) { p.x = W - 10 - p.radius; p.vx *= -1; }

      if (p.y - p.radius < pistonTop) { p.y = pistonTop + p.radius; p.vy = Math.abs(p.vy); }
      if (p.y + p.radius > bottomY) { p.y = bottomY - p.radius; p.vy = -Math.abs(p.vy); }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = currentMode === "charles" && temperature > 320 ? "#ef4444" : "#3b82f6";
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  updateState();
  animate();
});
