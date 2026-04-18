// ╔══════════════════════════════════════════════════════════════════╗
// ║         ✏️  CONFIG — EDIT THIS SECTION ONLY                     ║
// ║  • Add/remove players freely — schedule auto-adjusts           ║
// ║  • Fill in RESULTS as matches complete                         ║
// ╚══════════════════════════════════════════════════════════════════╝

const CONFIG = {
  tournamentName: "BCA VALHALLA",
  judge: "DHRUV",

  // ── PLAYERS — simply add or remove names here ──
  players: [
    "Aayush",
    "Atharva",
    "Dev",
    "Kunal",
    "Manas",
    "Satwik"
  ],

  // ── STREAM — YouTube embed URL (leave empty for placeholder) ──
  streamUrl: "",

  // ── BRAWLHALLA MAPS — used for arena rotation display ──
  maps: {
    groupStage: { name: "Brawlhaven", sub: "League Arena" },
    playoffsSemi: { name: "Thundergard Stadium", sub: "Main Stage" },
    playoffsLosers: { name: "Demon Island", sub: "Volcanic Arena" },
    winnersFinal: { name: "Mammoth Fortress", sub: "The Great Hall" },
    grandFinal: { name: "The Fangwild", sub: "Heart of the Forest" },
    bracketReset: { name: "Apocalypse", sub: "Sudden Death Arena" },
  },

  // ── RULES — customize freely ──
  rules: [
    { id: "R-01", title: "THE GAUNTLET (GROUP STAGE)", text: "Every fighter battles everyone else exactly once. Win to earn points.", sub: "// Zero early eliminations. 6 guaranteed matches." },
    { id: "R-02", title: "THE LEADERBOARD", text: "Fighters are ranked by total Wins. Top 4 advance to the Playoffs.", sub: "// Bottom fighters are eliminated." },
    { id: "R-03", title: "PLAYOFFS (TOP 4)", text: "The Top 4 battle in a Double Elimination bracket to decide the Champion.", sub: "// Seed 1 vs 4, Seed 2 vs 3." },
    { id: "R-04", title: "GRAND FINAL", text: "Playoffs Winners Champ vs Losers Champ.", sub: "// Winners Champ has a 1-series advantage." },
    { id: "R-05", title: "BRACKET RESET", text: "If the Losers Champ wins the Grand Final, a sudden-death reset match decides it all.", sub: "// Winner of reset = TOURNAMENT CHAMPION." },
    { id: "R-06", title: "JUDGE: DHRUV", text: "All rulings, disputes, tie-breakers, and final calls are made by the Judge.", sub: "// The Judge's word is law." },
  ],
};

// ╔══════════════════════════════════════════════════════════════════╗
// ║  RESULTS — Fill in as matches are played                       ║
// ║  Group Stage matchId format: "GS-D1-M1" (Match Day 1 Match 1)  ║
// ║  Playoffs matchId format: "W-R1-M1", "L-R1-M1", "GF", "RESET"  ║
// ║  Set winner to the player name string                           ║
// ╚══════════════════════════════════════════════════════════════════╝

const RESULTS = {
  // --- GROUP STAGE EXAMPLES ---
  // "GS-D1-M1": "Aayush",

  // --- PLAYOFFS EXAMPLES ---
  // "W-R1-M1": "Aayush", // Seed 1 vs Seed 4
  // "W-R1-M2": "Kunal",  // Seed 2 vs Seed 3
  // "GF": "Aayush",
};

// ╔══════════════════════════════════════════════════════════════════╗
// ║          ⚙️  ENGINE — DO NOT EDIT BELOW THIS LINE               ║
// ╚══════════════════════════════════════════════════════════════════╝

(function () {
  var players = CONFIG.players;
  var n = players.length;

  // ── Counts & Stream ──
  var countHead = document.getElementById('player-count-header');
  if (countHead) countHead.textContent = n;
  var countFoot = document.getElementById('player-count-footer');
  if (countFoot) countFoot.textContent = n;

  if (CONFIG.streamUrl) {
    var streamIframe = document.getElementById('stream-iframe');
    var streamPlaceholder = document.getElementById('stream-placeholder');
    if (streamIframe && streamPlaceholder) {
      streamIframe.src = CONFIG.streamUrl;
      streamPlaceholder.style.display = 'none';
    }
  }

  // ── Render Players ──
  var grid = document.getElementById('players-grid');
  if (grid) {
    grid.innerHTML = '';
    players.forEach(function (name, i) {
      var d = 'd' + Math.min(i + 1, 8);
      grid.innerHTML += '<div class="player-card animate-in ' + d + '">' +
        '<div class="player-tag">FIGHTER // ' + String(i + 1).padStart(2, '0') + '</div>' +
        '<div class="player-name">' + name.toUpperCase() + '</div>' +
        '<div class="player-num">' + String(i + 1).padStart(2, '0') + '</div></div>';
    });
  }

  // ── Render Judge Badge ──
  var judgeEl = document.getElementById('judge-display');
  if (judgeEl && CONFIG.judge) {
    judgeEl.innerHTML = '<div style="text-align:center;padding:20px;border-top:1px solid var(--border);margin-top:20px;">' +
      '<div style="font-family:\'Share Tech Mono\';font-size:10px;letter-spacing:3px;color:var(--purple);margin-bottom:6px;">// TOURNAMENT JUDGE</div>' +
      '<div style="font-family:\'Cinzel\';font-size:32px;letter-spacing:6px;color:var(--gold);font-weight:700;filter:drop-shadow(0 0 12px rgba(255,215,0,0.3));">⚖ ' + CONFIG.judge.toUpperCase() + '</div>' +
      '<div style="font-family:\'Share Tech Mono\';font-size:9px;letter-spacing:2px;color:var(--muted);margin-top:6px;">ALL RULINGS ARE FINAL</div></div>';
  }

  // ── Render Rules ──
  var rulesBody = document.getElementById('rules-body');
  if (rulesBody) {
    rulesBody.innerHTML = '';
    CONFIG.rules.forEach(function (r) {
      rulesBody.innerHTML += '<div class="rule-item"><span class="rule-num">' + r.id + '</span>' +
        '<div class="rule-text"><em>' + r.title + '</em> — ' + r.text +
        '<span class="sub">' + r.sub + '</span></div></div>';
    });
  }

  // ── Render Arenas ──
  var arenasBody = document.getElementById('arenas-body');
  if (arenasBody) {
    arenasBody.innerHTML = '';
    var arenaList = [
      { round: "GROUP STAGE", map: CONFIG.maps.groupStage, color: "var(--purple)" },
      { round: "PLAYOFF SEMIS", map: CONFIG.maps.playoffsSemi, color: "var(--blue)" },
      { round: "PLAYOFF LOSERS", map: CONFIG.maps.playoffsLosers, color: "var(--red)" },
      { round: "WINNERS FINAL", map: CONFIG.maps.winnersFinal, color: "var(--gold)" },
      { round: "GRAND FINAL", map: CONFIG.maps.grandFinal, color: "var(--gold)", glow: true },
      { round: "BRACKET RESET ⚡", map: CONFIG.maps.bracketReset, color: "var(--green)" },
    ];
    arenaList.forEach(function (a) {
      var glow = a.glow ? ';box-shadow:0 0 8px ' + a.color : '';
      var ns = a.glow ? ' style="color:var(--gold)"' : '';
      arenasBody.innerHTML += '<div class="arena-item"><div class="arena-round">' + a.round + '</div>' +
        '<div class="arena-bar" style="background:' + a.color + glow + '"></div>' +
        '<div class="arena-name"' + ns + '>' + a.map.name + '<small>' + a.map.sub + '</small></div></div>';
    });
  }

  // ═══════════════════════════════════════════════════
  //  ROUND ROBIN SCHEDULER
  // ═══════════════════════════════════════════════════

  var schedule = [];
  var isOdd = n % 2 !== 0;
  var numPlayers = isOdd ? n + 1 : n;
  var rPlayers = [];
  for (var i = 0; i < numPlayers; i++) {
    rPlayers.push(i < n ? players[i] : null); // null represents a BYE
  }

  var numDays = numPlayers - 1;
  var matchesPerDay = numPlayers / 2;

  for (var day = 0; day < numDays; day++) {
    var dayMatches = [];
    for (var m = 0; m < matchesPerDay; m++) {
      var p1 = rPlayers[m];
      var p2 = rPlayers[numPlayers - 1 - m];
      if (p1 !== null && p2 !== null) {
        dayMatches.push({ p1: p1, p2: p2 });
      }
    }
    schedule.push(dayMatches);
    // Rotate players (keep index 0 fixed)
    rPlayers.splice(1, 0, rPlayers.pop());
  }

  // ═══════════════════════════════════════════════════
  //  LEADERBOARD CALCULATOR
  // ═══════════════════════════════════════════════════
  var leaderboard = players.map(function (p) { return { name: p, wins: 0, losses: 0, played: 0 }; });

  // Assign match IDs to the schedule and count results
  var scheduleWithIDs = [];
  schedule.forEach(function (day, dIdx) {
    var dayMatches = [];
    day.forEach(function (match, mIdx) {
      var mid = 'GS-D' + (dIdx + 1) + '-M' + (mIdx + 1);
      var winner = RESULTS[mid] || null;
      dayMatches.push({ id: mid, p1: match.p1, p2: match.p2, winner: winner });

      if (winner) {
        var loser = winner === match.p1 ? match.p2 : match.p1;
        var wPlayer = leaderboard.find(function (p) { return p.name === winner; });
        var lPlayer = leaderboard.find(function (p) { return p.name === loser; });
        if (wPlayer) { wPlayer.wins++; wPlayer.played++; }
        if (lPlayer) { lPlayer.losses++; lPlayer.played++; }
      }
    });
    scheduleWithIDs.push({ day: dIdx + 1, matches: dayMatches });
  });

  // Sort Leaderboard: Wins (desc) -> Played (desc) -> Name (asc)
  leaderboard.sort(function (a, b) {
    if (b.wins !== a.wins) return b.wins - a.wins;
    if (b.played !== a.played) return b.played - a.played;
    return a.name.localeCompare(b.name);
  });

  // ═══════════════════════════════════════════════════
  //  TOP 4 DOUBLE ELIMINATION PLAYOFFS
  // ═══════════════════════════════════════════════════
  var top4 = leaderboard.slice(0, 4);
  var seed1 = top4[0] ? top4[0].name : null;
  var seed2 = top4[1] ? top4[1].name : null;
  var seed3 = top4[2] ? top4[2].name : null;
  var seed4 = top4[3] ? top4[3].name : null;

  // Winners Semis
  var wR1M1 = { id: 'W-R1-M1', p1: seed1, p2: seed4, winner: RESULTS['W-R1-M1'] || null };
  if (wR1M1.p1 && !wR1M1.p2) wR1M1.winner = wR1M1.p1;
  var wR1M2 = { id: 'W-R1-M2', p1: seed2, p2: seed3, winner: RESULTS['W-R1-M2'] || null };
  if (wR1M2.p1 && !wR1M2.p2) wR1M2.winner = wR1M2.p1;

  // Winners Final
  var wFP1 = wR1M1.winner || null;
  var wFP2 = wR1M2.winner || null;
  var wF = { id: 'W-F-M1', p1: wFP1, p2: wFP2, winner: RESULTS['W-F-M1'] || null };

  // Losers Semi
  var lR1P1 = (wR1M1.winner && wR1M1.p1 && wR1M1.p2) ? (wR1M1.winner === wR1M1.p1 ? wR1M1.p2 : wR1M1.p1) : null;
  var lR1P2 = (wR1M2.winner && wR1M2.p1 && wR1M2.p2) ? (wR1M2.winner === wR1M2.p1 ? wR1M2.p2 : wR1M2.p1) : null;
  var lR1 = { id: 'L-R1-M1', p1: lR1P1, p2: lR1P2, winner: RESULTS['L-R1-M1'] || null };

  // Losers Final
  var lFP1 = lR1.winner || null;
  var lFP2 = (wF.winner && wF.p1 && wF.p2) ? (wF.winner === wF.p1 ? wF.p2 : wF.p1) : null;
  var lF = { id: 'L-F-M1', p1: lFP1, p2: lFP2, winner: RESULTS['L-F-M1'] || null };

  // Grand Final
  var gfP1 = RESULTS['GF-P1'] || wF.winner;
  var gfP2 = RESULTS['GF-P2'] || lF.winner;
  var gfWinner = RESULTS['GF'] || null;
  var resetData = RESULTS['RESET'] || { triggered: false, winner: null };
  var champion = resetData.triggered ? resetData.winner : gfWinner;

  // ═══════════════════════════════════════════════════
  //  RENDER DOM
  // ═══════════════════════════════════════════════════

  // 1. Render Leaderboard
  var lbTbody = document.getElementById('leaderboard-tbody');
  if (lbTbody) {
    lbTbody.innerHTML = '';
    leaderboard.forEach(function (p, i) {
      var isTop4 = i < 4;
      var rowClass = isTop4 ? 'class="top4-row"' : '';
      var rankBadge = isTop4 ? '<div class="rank-badge top">' + (i + 1) + '</div>' : '<div class="rank-badge">' + (i + 1) + '</div>';
      var status = isTop4 ? '<span style="color:var(--gold);font-size:11px;">ADVANCES</span>' : '<span style="color:var(--red);font-size:11px;">ELIMINATED</span>';

      lbTbody.innerHTML += '<tr ' + rowClass + '>' +
        '<td>' + rankBadge + '</td>' +
        '<td style="font-weight:700;font-size:18px;">' + p.name.toUpperCase() + '</td>' +
        '<td style="color:var(--green);">' + p.wins + '</td>' +
        '<td style="color:var(--red);">' + p.losses + '</td>' +
        '<td>' + status + '</td>' +
        '</tr>';
    });
  }

  // 2. Render Match Schedule
  var schedGrid = document.getElementById('schedule-grid');
  if (schedGrid) {
    schedGrid.innerHTML = '';
    scheduleWithIDs.forEach(function (day) {
      var dayHtml = '<div class="schedule-day-card">' +
        '<div class="day-header">MATCH DAY ' + day.day + '</div><div class="day-matches">';

      day.matches.forEach(function (m) {
        var p1c = m.winner === m.p1 ? 'winner' : (m.winner ? 'loser' : '');
        var p2c = m.winner === m.p2 ? 'winner' : (m.winner ? 'loser' : '');
        dayHtml += '<div class="sched-match">' +
          '<div class="sched-id">' + m.id + '</div>' +
          '<div class="sched-player ' + p1c + '">' + m.p1.toUpperCase() + '</div>' +
          '<div class="sched-vs">VS</div>' +
          '<div class="sched-player ' + p2c + '">' + m.p2.toUpperCase() + '</div>' +
          '</div>';
      });
      dayHtml += '</div></div>';
      schedGrid.innerHTML += dayHtml;
    });
  }

  // 3. Render Playoff Bracket
  var playoffWrap = document.getElementById('playoff-bracket');
  if (playoffWrap) {
    function matchHTML(match, color, label) {
      var p1Text = match.p1 ? match.p1.toUpperCase() : 'TBD';
      var p2Text = match.p2 ? match.p2.toUpperCase() : 'TBD';
      var p1Class = (match.winner && match.winner === match.p1) ? 'match-slot winner-slot' : (match.p1 ? 'match-slot' : 'match-slot blank');
      var p2Class = (match.winner && match.winner === match.p2) ? 'match-slot winner-slot' : (match.p2 ? 'match-slot' : 'match-slot blank');
      return '<div class="match-box ' + color + '"><div class="match-label">' + label + '</div>' +
        '<div class="' + p1Class + '">' + p1Text + '</div><div class="' + p2Class + '">' + p2Text + '</div></div>';
    }

    var html = '<div class="bracket-grid">';

    // Winners Col
    html += '<div class="bracket-col"><div class="col-label blue">WINNERS SEMIS</div>';
    html += matchHTML(wR1M1, 'blue', 'SEED 1 VS SEED 4 — ' + wR1M1.id);
    html += matchHTML(wR1M2, 'blue', 'SEED 2 VS SEED 3 — ' + wR1M2.id);
    html += '</div>';

    // Winners Final & Losers Semi
    html += '<div class="bracket-col">';
    html += '<div class="col-label gold">WINNERS FINAL</div>';
    html += matchHTML(wF, 'gold', 'WINNERS CHAMPIONSHIP — ' + wF.id);
    html += '<div class="col-label red" style="margin-top:20px;">LOSERS SEMI</div>';
    html += matchHTML(lR1, 'red', 'ELIMINATION MATCH — ' + lR1.id);
    html += '</div>';

    // Losers Final
    html += '<div class="bracket-col"><div class="col-label red">LOSERS FINAL</div>';
    html += matchHTML(lF, 'red', 'LAST CHANCE — ' + lF.id);
    html += '</div>';

    // Grand Final
    html += '<div class="bracket-col" style="min-width:200px;">';
    html += '<div class="col-label final gold-glow" style="color:var(--gold);">GRAND FINAL</div>';
    html += '<div class="grand-final-box">' +
      '<div class="gf-label">⚔ ' + CONFIG.maps.grandFinal.name.toUpperCase() + ' — GRAND FINAL</div>' +
      '<div class="gf-slot slot-w">' + (gfP1 ? gfP1.toUpperCase() : 'TBD') + '</div>' +
      '<div class="gf-slot slot-l">' + (gfP2 ? gfP2.toUpperCase() : 'TBD') + '</div></div>';

    // Champion
    html += '<div class="champion-box" style="margin-top:14px;">' +
      '<div class="champ-label">// TOURNAMENT CHAMPION</div>' +
      '<div class="champ-text">' + (champion ? champion.toUpperCase() : 'TBD') + '</div></div>';

    // Reset
    if (resetData.triggered) {
      html += '<div class="reset-box" style="border-color:var(--green);">' +
        '<div class="reset-label">⚡ BRACKET RESET — TRIGGERED</div>' +
        '<div class="reset-text">Sudden Death — ' + CONFIG.maps.bracketReset.name + '.<br>Winner: <span style="color:var(--green);font-weight:700">' + (resetData.winner || 'TBD').toUpperCase() + '</span></div></div>';
    } else {
      html += '<div class="reset-box"><div class="reset-label">⚡ BRACKET RESET</div>' +
        '<div class="reset-text">If Losers Champ wins — Sudden Death on ' + CONFIG.maps.bracketReset.name + '.</div></div>';
    }

    html += '</div></div>';
    playoffWrap.innerHTML = html;
  }

  // ── Champion display ──
  var cd = document.getElementById('champion-display');
  if (champion && cd) { cd.textContent = champion.toUpperCase(); cd.style.color = 'var(--gold)'; }

  // ═══ PARTICLES ═══
  var canvas = document.getElementById('particles');
  if (canvas) {
    var ctx = canvas.getContext('2d');
    var parts = [];
    function rC() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    rC(); window.addEventListener('resize', rC);
    function cP() {
      return {
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5, speedY: -(Math.random() * 0.3 + 0.1),
        speedX: (Math.random() - 0.5) * 0.2, opacity: Math.random() * 0.4 + 0.1,
        color: ['rgba(155,89,230,', 'rgba(0,168,255,', 'rgba(255,215,0,'][Math.floor(Math.random() * 3)]
      };
    }
    for (var i = 0; i < 60; i++) parts.push(cP());
    function anim() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      parts.forEach(function (p) {
        p.y += p.speedY; p.x += p.speedX;
        if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
        ctx.fillStyle = p.color + p.opacity + ')';
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();
      });
      requestAnimationFrame(anim);
    }
    anim();
  }
})();
