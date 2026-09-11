(() => {
  const shell = document.querySelector("[data-duobird]");
  const canvas = document.getElementById("duobird-canvas");
  if (
    !(shell instanceof HTMLElement) ||
    !(canvas instanceof HTMLCanvasElement)
  ) {
    return;
  }

  const context = canvas.getContext("2d");
  if (!context) return;

  const intro = shell.querySelector("[data-intro]");
  const result = shell.querySelector("[data-result]");
  const pauseCard = shell.querySelector("[data-pause-card]");
  const scoreNode = shell.querySelector("[data-score]");
  const finalScoreNode = shell.querySelector("[data-final-score]");
  const bestScoreNode = shell.querySelector("[data-best-score]");
  const liveNode = shell.querySelector("[data-live]");
  const startButton = shell.querySelector("[data-start]");
  const startLabel = shell.querySelector("[data-start-label]");
  const restartButton = shell.querySelector("[data-restart]");
  const pauseButton = shell.querySelector("[data-pause]");
  const soundButton = shell.querySelector("[data-sound]");

  const clamp = (value, minimum, maximum) =>
    Math.min(Math.max(value, minimum), maximum);
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  const bestKey = "duobird_lucky_best";
  const soundKey = "duobird_sound";

  let width = 0;
  let height = 0;
  let pixelRatio = 1;
  let lastTime = performance.now();
  let elapsed = 0;
  let crashTime = 0;
  let distance = 0;
  let spawnAt = 0;
  let score = 0;
  let bestScore = readNumber(bestKey);
  let mode = "loading";
  let audioContext;
  let soundEnabled = readSetting(soundKey, true);

  const player = {
    x: 0,
    y: 0,
    velocity: 0,
    rotation: 0,
    pulse: 0,
  };
  const gates = [];
  const petals = Array.from({ length: reducedMotion ? 0 : 24 }, (_, index) => ({
    x: (index * 127.4) % 1000,
    y: (index * 83.1) % 700,
    size: 2.5 + (index % 5) * 0.75,
    speed: 12 + (index % 7) * 3.4,
    drift: 8 + (index % 4) * 4,
    phase: index * 1.7,
  }));

  const backgroundImage = new Image();
  const playerImage = new Image();
  backgroundImage.decoding = "async";
  playerImage.decoding = "async";
  backgroundImage.src = "/games/duobird/spring-sky.webp";
  playerImage.src = "/games/duobird/mandarin-duo.webp";

  Promise.allSettled([backgroundImage.decode(), playerImage.decode()]).then(
    () => {
      mode = "ready";
      resetFlight();
      if (startButton instanceof HTMLButtonElement)
        startButton.disabled = false;
      if (startLabel) startLabel.textContent = "Tap or press Space";
      announce("DuoBird is ready. Press Space or tap to fly.");
    }
  );

  function readNumber(key) {
    try {
      return Math.max(
        0,
        Number.parseInt(localStorage.getItem(key) || "0", 10) || 0
      );
    } catch {
      return 0;
    }
  }

  function readSetting(key, fallback) {
    try {
      const value = localStorage.getItem(key);
      return value === null ? fallback : value !== "off";
    } catch {
      return fallback;
    }
  }

  function writeSetting(key, value) {
    try {
      localStorage.setItem(key, String(value));
    } catch {
      // The game remains fully playable when storage is unavailable.
    }
  }

  function announce(message) {
    if (liveNode) liveNode.textContent = message;
  }

  function updateScore(nextScore) {
    score = nextScore;
    if (scoreNode) scoreNode.textContent = String(score);
    canvas.setAttribute(
      "aria-label",
      `DuoBird flying game. Current score ${score}. Press Space or tap to fly upward. Press P or Escape to pause.`
    );
  }

  function randomGateCenter(previous) {
    const gap = gateGap();
    const topSafe = Math.max(126, gap * 0.55 + 40);
    const bottomSafe = Math.max(88, gap * 0.55 + 24);
    const minimum = topSafe + gap / 2;
    const maximum = height - bottomSafe - gap / 2;
    if (maximum <= minimum) return height / 2;
    if (typeof previous === "number") {
      return clamp(
        previous + (Math.random() - 0.5) * height * 0.28,
        minimum,
        maximum
      );
    }
    return minimum + Math.random() * (maximum - minimum);
  }

  function gateGap() {
    return clamp(height * 0.29, 150, 230);
  }

  function gateWidth() {
    return clamp(width * 0.09, 76, 112);
  }

  function gateSpacing() {
    return clamp(width * 0.44, 330, 520);
  }

  function flightSpeed() {
    return clamp(width * 0.2, 185, 270);
  }

  function resetFlight() {
    updateScore(0);
    elapsed = 0;
    crashTime = 0;
    distance = 0;
    player.x = clamp(width * 0.27, 92, 360);
    player.y = height * 0.46;
    player.velocity = 0;
    player.rotation = 0;
    player.pulse = 0;
    gates.length = 0;

    let x = width + Math.max(150, width * 0.18);
    let center = randomGateCenter();
    for (let index = 0; index < 5; index += 1) {
      gates.push({
        x,
        center,
        passed: false,
        shimmer: Math.random() * Math.PI * 2,
      });
      x += gateSpacing();
      center = randomGateCenter(center);
    }
    spawnAt = x;
  }

  function begin() {
    if (mode === "loading" || mode === "crashed") return;
    if (mode === "paused") {
      resume();
      return;
    }
    if (mode === "ready") {
      mode = "playing";
      if (intro instanceof HTMLElement) intro.hidden = true;
      if (result instanceof HTMLElement) result.hidden = true;
      if (pauseCard instanceof HTMLElement) pauseCard.hidden = true;
      announce("Flight started.");
      track("duobird_started");
    }
    player.velocity = -clamp(height * 0.72, 410, 545);
    player.pulse = 1;
    playFlap();
  }

  function restart() {
    mode = "ready";
    resetFlight();
    if (result instanceof HTMLElement) result.hidden = true;
    begin();
  }

  function pause() {
    if (mode === "playing") {
      mode = "paused";
      if (pauseCard instanceof HTMLElement) pauseCard.hidden = false;
      setPauseIcon(true);
      announce("Flight paused.");
      return;
    }
    if (mode === "paused") resume();
  }

  function resume() {
    mode = "playing";
    lastTime = performance.now();
    if (pauseCard instanceof HTMLElement) pauseCard.hidden = true;
    setPauseIcon(false);
    announce("Flight resumed.");
  }

  function setPauseIcon(paused) {
    if (!(pauseButton instanceof HTMLButtonElement)) return;
    pauseButton.setAttribute(
      "aria-label",
      paused ? "Resume game" : "Pause game"
    );
    pauseButton.title = paused ? "Resume (P)" : "Pause (P)";
    pauseButton.innerHTML = paused
      ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 6 9 6-9 6z"></path></svg>'
      : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.25 6.5v11M15.75 6.5v11"></path></svg>';
  }

  function crash() {
    if (mode !== "playing") return;
    mode = "crashed";
    crashTime = 0;
    playCrash();
    track("duobird_crashed", { score });
    if (score > bestScore) {
      bestScore = score;
      writeSetting(bestKey, bestScore);
    }
    announce(`Flight ended with a score of ${score}.`);
  }

  function showResult() {
    if (!(result instanceof HTMLElement) || !result.hidden) return;
    if (finalScoreNode) finalScoreNode.textContent = String(score);
    if (bestScoreNode) bestScoreNode.textContent = String(bestScore);
    result.hidden = false;
    if (restartButton instanceof HTMLButtonElement) restartButton.focus();
  }

  function tick(delta) {
    if (mode === "crashed") {
      crashTime += delta;
      player.velocity += height * 1.15 * delta;
      player.y += player.velocity * delta;
      player.rotation += delta * 4.7;
      if (crashTime > 0.62) showResult();
      return;
    }
    if (mode !== "playing") return;

    elapsed += delta;
    distance += flightSpeed() * delta;
    player.velocity = Math.min(
      player.velocity + clamp(height * 1.95, 1120, 1560) * delta,
      height * 1.1
    );
    player.y += player.velocity * delta;
    player.rotation +=
      (clamp(player.velocity / 900, -0.32, 0.64) - player.rotation) *
      (1 - Math.exp(-delta * 8));
    player.pulse = Math.max(0, player.pulse - delta * 4.5);

    const speed = flightSpeed();
    const columnWidth = gateWidth();
    const gap = gateGap();
    const hitRadiusX = clamp(width * 0.024, 24, 34);
    const hitRadiusY = clamp(height * 0.035, 21, 30);

    for (const gate of gates) {
      gate.x -= speed * delta;
      const overlapsX =
        player.x + hitRadiusX > gate.x &&
        player.x - hitRadiusX < gate.x + columnWidth;
      const outsideGap =
        player.y - hitRadiusY < gate.center - gap / 2 ||
        player.y + hitRadiusY > gate.center + gap / 2;
      if (overlapsX && outsideGap) {
        crash();
        return;
      }
      if (!gate.passed && gate.x + columnWidth < player.x - hitRadiusX) {
        gate.passed = true;
        updateScore(score + 1);
        playPoint();
        announce(`Score ${score}.`);
      }
    }

    if (player.y < 62 || player.y > height - 52) {
      crash();
      return;
    }

    while (gates.length && gates[0].x + columnWidth < -30) gates.shift();
    while (spawnAt - distance < width + gateSpacing() * 3) {
      const previousCenter = gates.at(-1)?.center;
      const previousX = gates.at(-1)?.x ?? width;
      gates.push({
        x: previousX + gateSpacing(),
        center: randomGateCenter(previousCenter),
        passed: false,
        shimmer: Math.random() * Math.PI * 2,
      });
      spawnAt += gateSpacing();
    }
  }

  function drawBackground() {
    context.clearRect(0, 0, width, height);
    if (backgroundImage.complete && backgroundImage.naturalWidth) {
      const sourceRatio =
        backgroundImage.naturalWidth / backgroundImage.naturalHeight;
      const destinationRatio = width / height;
      let sourceWidth = backgroundImage.naturalWidth;
      let sourceHeight = backgroundImage.naturalHeight;
      let sourceX = 0;
      let sourceY = 0;
      if (destinationRatio > sourceRatio) {
        sourceHeight = sourceWidth / destinationRatio;
        sourceY = (backgroundImage.naturalHeight - sourceHeight) * 0.38;
      } else {
        sourceWidth = sourceHeight * destinationRatio;
        sourceX = (backgroundImage.naturalWidth - sourceWidth) / 2;
      }
      const cameraLift = reducedMotion
        ? 0
        : clamp((player.y - height * 0.46) * -0.025, -8, 8);
      context.drawImage(
        backgroundImage,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
        -5,
        -5 + cameraLift,
        width + 10,
        height + 10
      );
    } else {
      const sky = context.createLinearGradient(0, 0, 0, height);
      sky.addColorStop(0, "#f8c9b6");
      sky.addColorStop(0.55, "#fff1d9");
      sky.addColorStop(1, "#c9dfcf");
      context.fillStyle = sky;
      context.fillRect(0, 0, width, height);
    }

    const veil = context.createLinearGradient(0, 0, 0, height);
    veil.addColorStop(0, "rgba(255,246,229,.08)");
    veil.addColorStop(0.55, "rgba(255,248,233,.03)");
    veil.addColorStop(1, "rgba(231,243,225,.16)");
    context.fillStyle = veil;
    context.fillRect(0, 0, width, height);
  }

  function roundedRect(x, y, rectangleWidth, rectangleHeight, radius) {
    const r = Math.min(
      radius,
      rectangleWidth / 2,
      Math.abs(rectangleHeight) / 2
    );
    context.beginPath();
    context.roundRect(x, y, rectangleWidth, rectangleHeight, r);
  }

  function drawGate(gate) {
    const columnWidth = gateWidth();
    const gap = gateGap();
    const topHeight = gate.center - gap / 2;
    const bottomY = gate.center + gap / 2;
    drawPillar(gate.x, -22, columnWidth, topHeight + 22, false, gate.shimmer);
    drawPillar(
      gate.x,
      bottomY,
      columnWidth,
      height - bottomY + 24,
      true,
      gate.shimmer + 1.4
    );
  }

  function drawPillar(x, y, columnWidth, pillarHeight, capAtTop, phase) {
    if (pillarHeight <= 0) return;
    const capY = capAtTop ? y : y + pillarHeight;
    const eaveHeight = clamp(height * 0.024, 13, 21);

    context.save();
    context.shadowColor = "rgba(77,56,44,.18)";
    context.shadowBlur = 12;
    context.shadowOffsetY = 7;
    roundedRect(x + 9, y, columnWidth - 18, pillarHeight, 10);
    const lacquer = context.createLinearGradient(x, 0, x + columnWidth, 0);
    lacquer.addColorStop(0, "#8f302d");
    lacquer.addColorStop(0.16, "#ce5748");
    lacquer.addColorStop(0.52, "#e17059");
    lacquer.addColorStop(0.86, "#b9433b");
    lacquer.addColorStop(1, "#7e2929");
    context.fillStyle = lacquer;
    context.fill();
    context.shadowColor = "transparent";

    const insetTop = y + 12;
    const insetHeight = Math.max(0, pillarHeight - 24);
    if (insetHeight > 10) {
      roundedRect(x + 18, insetTop, columnWidth - 36, insetHeight, 6);
      const jade = context.createLinearGradient(x, 0, x + columnWidth, 0);
      jade.addColorStop(0, "#466f68");
      jade.addColorStop(0.46, "#79a89a");
      jade.addColorStop(1, "#3f6a64");
      context.fillStyle = jade;
      context.fill();
      context.strokeStyle = "rgba(255,232,175,.52)";
      context.lineWidth = 1.4;
      context.stroke();
    }

    context.strokeStyle = "rgba(255,218,134,.7)";
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(x + 12, y + 7);
    context.lineTo(x + 12, y + pillarHeight - 7);
    context.moveTo(x + columnWidth - 12, y + 7);
    context.lineTo(x + columnWidth - 12, y + pillarHeight - 7);
    context.stroke();

    const medallionY = capAtTop
      ? Math.min(y + 55, y + pillarHeight * 0.38)
      : Math.max(y + pillarHeight - 55, y + pillarHeight * 0.62);
    if (pillarHeight > 86) {
      context.beginPath();
      context.arc(x + columnWidth / 2, medallionY, 10, 0, Math.PI * 2);
      context.fillStyle = "rgba(255,220,140,.92)";
      context.fill();
      context.beginPath();
      context.arc(x + columnWidth / 2, medallionY, 5.5, 0, Math.PI * 2);
      context.strokeStyle = "#a5513e";
      context.lineWidth = 1.4;
      context.stroke();
    }

    const eaveY = capAtTop ? capY : capY - eaveHeight;
    context.beginPath();
    context.moveTo(x - 13, eaveY + (capAtTop ? 6 : eaveHeight - 6));
    context.quadraticCurveTo(
      x - 5,
      eaveY + (capAtTop ? 0 : eaveHeight),
      x + 7,
      eaveY + (capAtTop ? 4 : eaveHeight - 4)
    );
    context.lineTo(
      x + columnWidth - 7,
      eaveY + (capAtTop ? 4 : eaveHeight - 4)
    );
    context.quadraticCurveTo(
      x + columnWidth + 5,
      eaveY + (capAtTop ? 0 : eaveHeight),
      x + columnWidth + 13,
      eaveY + (capAtTop ? 6 : eaveHeight - 6)
    );
    context.lineTo(x + columnWidth + 8, eaveY + (capAtTop ? eaveHeight : 0));
    context.lineTo(x - 8, eaveY + (capAtTop ? eaveHeight : 0));
    context.closePath();
    const roof = context.createLinearGradient(0, eaveY, 0, eaveY + eaveHeight);
    roof.addColorStop(0, "#8fb5a4");
    roof.addColorStop(0.48, "#4e8174");
    roof.addColorStop(1, "#335f59");
    context.fillStyle = roof;
    context.fill();
    context.strokeStyle = "rgba(255,229,162,.72)";
    context.lineWidth = 1.6;
    context.stroke();

    for (let tile = 0; tile < 5; tile += 1) {
      const tileX = x + 4 + (tile * (columnWidth - 8)) / 4;
      context.beginPath();
      context.moveTo(tileX, eaveY + 4);
      context.lineTo(tileX, eaveY + eaveHeight - 3);
      context.strokeStyle = "rgba(222,238,211,.32)";
      context.lineWidth = 1;
      context.stroke();
    }

    const glint = (Math.sin(elapsed * 1.8 + phase) + 1) / 2;
    context.fillStyle = `rgba(255,244,196,${0.05 + glint * 0.07})`;
    roundedRect(x + 20, insetTop + 4, 5, Math.max(0, insetHeight - 8), 3);
    context.fill();
    context.restore();
  }

  function drawPetals() {
    if (!petals.length) return;
    context.save();
    for (const petal of petals) {
      const travel = distance * (petal.speed / 55);
      const x =
        ((((petal.x - travel) % (width + 100)) + width + 100) % (width + 100)) -
        50;
      const y =
        ((petal.y + elapsed * petal.speed) % (height + 80)) -
        40 +
        Math.sin(elapsed * 1.2 + petal.phase) * petal.drift;
      context.translate(x, y);
      context.rotate(elapsed * 0.45 + petal.phase);
      context.beginPath();
      context.ellipse(
        0,
        0,
        petal.size * 1.55,
        petal.size,
        0.35,
        0,
        Math.PI * 2
      );
      context.fillStyle = "rgba(221,105,105,.45)";
      context.fill();
      context.rotate(-(elapsed * 0.45 + petal.phase));
      context.translate(-x, -y);
    }
    context.restore();
  }

  function drawPlayer() {
    const baseWidth = clamp(width * 0.108, 98, 148);
    const imageRatio =
      playerImage.naturalWidth && playerImage.naturalHeight
        ? playerImage.naturalWidth / playerImage.naturalHeight
        : 760 / 398;
    const baseHeight = baseWidth / imageRatio;
    const flutter =
      mode === "playing" && !reducedMotion ? Math.sin(elapsed * 12) * 0.018 : 0;
    const scale = 1 + player.pulse * 0.06 + flutter;

    context.save();
    context.translate(player.x, player.y);
    context.rotate(player.rotation);
    context.globalAlpha =
      mode === "crashed" ? clamp(1 - crashTime * 0.18, 0.7, 1) : 1;

    context.save();
    context.scale(1, 0.34);
    context.beginPath();
    context.ellipse(
      0,
      baseHeight * 0.8,
      baseWidth * 0.32,
      baseHeight * 0.18,
      0,
      0,
      Math.PI * 2
    );
    context.fillStyle = "rgba(73,73,53,.18)";
    context.filter = "blur(5px)";
    context.fill();
    context.restore();

    if (playerImage.complete && playerImage.naturalWidth) {
      context.drawImage(
        playerImage,
        0,
        0,
        playerImage.naturalWidth,
        playerImage.naturalHeight,
        (-baseWidth * scale) / 2,
        (-baseHeight * scale) / 2,
        baseWidth * scale,
        baseHeight * scale
      );
    } else {
      drawFallbackBirds(baseWidth, baseHeight);
    }
    context.restore();
  }

  function drawFallbackBirds(playerWidth, playerHeight) {
    for (const [offset, color] of [
      [-playerWidth * 0.18, "#e18a55"],
      [playerWidth * 0.18, "#76a08c"],
    ]) {
      context.beginPath();
      context.ellipse(
        offset,
        0,
        playerWidth * 0.23,
        playerHeight * 0.34,
        0,
        0,
        Math.PI * 2
      );
      context.fillStyle = color;
      context.fill();
      context.beginPath();
      context.arc(
        offset + playerWidth * 0.08,
        -playerHeight * 0.08,
        2.5,
        0,
        Math.PI * 2
      );
      context.fillStyle = "#3e322d";
      context.fill();
    }
  }

  function draw() {
    drawBackground();
    for (const gate of gates) drawGate(gate);
    drawPetals();
    drawPlayer();

    if (mode === "paused") {
      context.fillStyle = "rgba(255,245,226,.18)";
      context.fillRect(0, 0, width, height);
    }
  }

  function frame(now) {
    const delta = Math.min((now - lastTime) / 1000, 0.035);
    lastTime = now;
    tick(delta);
    draw();
    requestAnimationFrame(frame);
  }

  function resize() {
    const bounds = shell.getBoundingClientRect();
    const nextWidth = Math.max(320, bounds.width);
    const nextHeight = Math.max(420, bounds.height);
    const scaleX = width ? nextWidth / width : 1;
    const scaleY = height ? nextHeight / height : 1;
    width = nextWidth;
    height = nextHeight;
    pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * pixelRatio);
    canvas.height = Math.round(height * pixelRatio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

    if (mode !== "loading") {
      player.x = clamp(width * 0.27, 92, 360);
      player.y *= scaleY;
      for (const gate of gates) {
        gate.x *= scaleX;
        gate.center *= scaleY;
      }
    }
  }

  function ensureAudio() {
    if (!soundEnabled) return null;
    const AudioEngine = window.AudioContext || window.webkitAudioContext;
    if (!AudioEngine) return null;
    if (!audioContext) audioContext = new AudioEngine();
    if (audioContext.state === "suspended") audioContext.resume();
    return audioContext;
  }

  function note(startFrequency, endFrequency, duration, volume, wave = "sine") {
    const audio = ensureAudio();
    if (!audio) return;
    const oscillator = audio.createOscillator();
    const gain = audio.createGain();
    const now = audio.currentTime;
    oscillator.type = wave;
    oscillator.frequency.setValueAtTime(startFrequency, now);
    oscillator.frequency.exponentialRampToValueAtTime(
      endFrequency,
      now + duration
    );
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(volume, now + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    oscillator.connect(gain);
    gain.connect(audio.destination);
    oscillator.start(now);
    oscillator.stop(now + duration + 0.02);
  }

  function playFlap() {
    note(470, 710, 0.09, 0.035, "sine");
  }

  function playPoint() {
    note(660, 990, 0.16, 0.045, "sine");
    window.setTimeout(() => note(880, 1320, 0.18, 0.025, "sine"), 65);
  }

  function playCrash() {
    note(180, 70, 0.28, 0.045, "triangle");
  }

  function updateSoundButton() {
    if (!(soundButton instanceof HTMLButtonElement)) return;
    soundButton.setAttribute(
      "aria-label",
      soundEnabled ? "Mute sound" : "Turn sound on"
    );
    soundButton.title = soundEnabled ? "Mute sound" : "Turn sound on";
    soundButton.innerHTML = soundEnabled
      ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.5 14.5h3l4 3.25V6.25l-4 3.25h-3zM16 9.25c1.45 1.55 1.45 3.95 0 5.5M18.5 7c2.7 2.75 2.7 7.25 0 10"></path></svg>'
      : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.5 14.5h3l4 3.25V6.25l-4 3.25h-3zM16.5 9.5l4 5M20.5 9.5l-4 5"></path></svg>';
  }

  function track(eventName, properties = {}) {
    if (typeof window.gtag === "function")
      window.gtag("event", eventName, properties);
  }

  function isControl(target) {
    return target instanceof Element && Boolean(target.closest("button, a"));
  }

  shell.addEventListener("pointerdown", event => {
    if (isControl(event.target)) return;
    event.preventDefault();
    canvas.focus({ preventScroll: true });
    begin();
  });

  window.addEventListener("keydown", event => {
    if (event.code === "Space") {
      event.preventDefault();
      if (!event.repeat) begin();
    }
    if ((event.code === "KeyP" || event.code === "Escape") && !event.repeat) {
      event.preventDefault();
      pause();
    }
  });

  startButton?.addEventListener("click", event => {
    event.stopPropagation();
    begin();
  });
  restartButton?.addEventListener("click", event => {
    event.stopPropagation();
    restart();
  });
  pauseButton?.addEventListener("click", event => {
    event.stopPropagation();
    pause();
  });
  soundButton?.addEventListener("click", event => {
    event.stopPropagation();
    soundEnabled = !soundEnabled;
    writeSetting(soundKey, soundEnabled ? "on" : "off");
    updateSoundButton();
    if (soundEnabled) playPoint();
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden && mode === "playing") pause();
  });
  window.addEventListener("resize", resize, { passive: true });

  updateSoundButton();
  resize();
  resetFlight();
  requestAnimationFrame(frame);

  window.duoBird = Object.freeze({
    flap: begin,
    pause,
    restart,
    get state() {
      return {
        mode,
        score,
        bestScore,
        y: player.y,
        velocity: player.velocity,
        gates: gates.map(gate => ({ ...gate })),
      };
    },
  });
})();
