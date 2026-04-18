// ╔══════════════════════════════════════════════════════════════════╗
// ║         ✏️  CONFIG — EDIT THIS SECTION ONLY                     ║
// ║  • Add/remove players freely — bracket auto-adjusts            ║
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
    "Satwik",
    "Urmi"
  ],

  // ── STREAM — YouTube embed URL (leave empty for placeholder) ──
  streamUrl: "",

  // ── BRAWLHALLA MAPS — used for arena rotation display ──
  maps: {
    winnersR1: { name: "Blackguard Keep", sub: "Castle Grounds" },
    winnersR2: { name: "Thundergard Stadium", sub: "Main Stage" },
    winnersFinal: { name: "Mammoth Fortress", sub: "The Great Hall" },
    losersR1: { name: "Brawlhaven", sub: "Shipwreck Falls" },
    losersSemi: { name: "Small Enigma", sub: "Mystic Ruins" },
    losersFinal: { name: "Demon Island", sub: "Volcanic Arena" },
    lastChanceR1: { name: "Grumpy Temple", sub: "Ancient Ruins" },
    lastChanceFinal: { name: "Twilight Grove", sub: "Shadow Arena" },
    grandFinal: { name: "The Fangwild", sub: "Heart of the Forest" },
    bracketReset: { name: "Apocalypse", sub: "Sudden Death Arena" },
  },

  // ── RULES — customize freely ──
  rules: [
    { id: "R-01", title: "3 STOCKS — TRIPLE ELIMINATION", text: "Every fighter starts with 3 stocks. You must lose THREE times to be eliminated.", sub: "// Three chances — make them count." },
    { id: "R-02", title: "WINNERS BRACKET", text: "Win your match to stay in Winners (3 stocks). Lose and you drop to Losers.", sub: "// Stay undefeated — stay on top." },
    { id: "R-03", title: "LOSERS BRACKET", text: "1 loss — you're in Losers Bracket (2 stocks left). Lose again and drop to Last Chance.", sub: "// Fight back or fall further." },
    { id: "R-04", title: "LAST CHANCE BRACKET", text: "2 losses — final life. One more loss here and you're OUT.", sub: "// Do or die. No more chances." },
    { id: "R-05", title: "GRAND FINAL", text: "Winners Champ vs Losers Champ vs Last Chance Champ converge for the ultimate showdown.", sub: "// The final battlefield." },
    { id: "R-06", title: "BRACKET RESET", text: "If WB Champ loses, resets may occur based on remaining stocks.", sub: "// Winner of reset = TOURNAMENT CHAMPION." },
    { id: "R-07", title: "JUDGE: DHRUV", text: "All rulings, disputes, and final calls are made by the Judge.", sub: "// The Judge's word is law." },
    { id: "R-08", title: "FIGHT FAIR", text: "No exploits, no intentional disconnects, no toxicity.", sub: "// Unsportsmanlike conduct = penalty at Judge's discretion." },
  ],
};

// ╔══════════════════════════════════════════════════════════════════╗
// ║  RESULTS — Fill in as matches are played                       ║
// ║  matchId format: "W-R1-M1" = Winners Round 1 Match 1           ║
// ║                  "L-R1-M1" = Losers Round 