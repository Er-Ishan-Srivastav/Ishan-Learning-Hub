

var shell_variables = {
    title: "Variables &amp; Environment",
    description: "Master every aspect of Bash variables — assignment, expansion, scope, export, environment inheritance, and the full declare type system. The foundation of every shell script you will ever write.",
    content: `

<!-- ══════════════════════════════════════════════════════
     RAVI'S STORY — HOOK
══════════════════════════════════════════════════════ -->
<div class="story-panel">
  <div class="story-avatar">🧑‍💻</div>
  <div class="story-body">
    <div class="story-title">Ravi's Deployment Disaster — Day 102</div>
    <br>
    <p>Ravi ran his deployment script on Friday evening. It finished in 3 seconds — suspiciously fast. Then his manager called: "The production database is still pointing to localhost. Nothing deployed correctly."</p>
    <br>
    <p>Ravi looked at his script. He had set <code>DB_HOST="prod-db.internal"</code> at the top. But inside the function that ran the deployment, <code>$DB_HOST</code> was empty — because he had accidentally used <code>local DB_HOST</code> in an earlier function, which shadowed the global. The deployment script read an empty variable and silently used the default: localhost.</p>
    <br>
    <p>His senior Priya fixed it in one minute. "You need to understand variable <em>scope</em>," she said. "And <em>export</em>. And the difference between a shell variable and an environment variable. Once you know these three things, this bug is impossible."</p>
    <br>
    <p>This module teaches exactly what Priya taught Ravi that evening — the complete mental model of variables in Bash.</p>
  </div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 1 — WHAT IS A VARIABLE?
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> What Is a Variable? — Memory in the Shell</h2>

<p>A variable is a named storage location that holds a value. In Bash, <strong>every variable is a string by default</strong> — even if you store a number. This is the most important thing to understand about Bash variables.</p>

<!-- Variable anatomy SVG -->
<div class="diagram-wrap">
<svg viewBox="0 0 820 220" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto;">
  <defs>
    <marker id="arr-g" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#3fb950"/></marker>
    <marker id="arr-b" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#58a6ff"/></marker>
    <marker id="arr-y" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#ffa657"/></marker>
    <marker id="arr-p" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#bc8cff"/></marker>
  </defs>
  <rect width="820" height="220" fill="#0d1117" rx="12"/>
  <text x="410" y="24" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="13" font-weight="bold" fill="#8b949e">Variable Lifecycle — Create → Store → Expand → Export → Unset</text>

  <!-- Step 1: Assignment -->
  <rect x="20" y="44" width="148" height="72" rx="8" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="94" y="68" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#3fb950">① Assign</text>
  <text x="94" y="86" text-anchor="middle" font-family="'Courier New',monospace" font-size="12" fill="#e6edf3">NAME="Ravi"</text>
  <text x="94" y="104" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">no spaces around =</text>

  <line x1="170" y1="80" x2="194" y2="80" stroke="#3fb950" stroke-width="1.5" marker-end="url(#arr-g)"/>

  <!-- Step 2: Shell memory -->
  <rect x="196" y="44" width="148" height="72" rx="8" fill="#0e1824" stroke="#58a6ff" stroke-width="2"/>
  <text x="270" y="66" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#58a6ff">② Stored</text>
  <text x="270" y="82" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Shell's internal</text>
  <text x="270" y="96" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">variable table</text>
  <text x="270" y="110" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#58a6ff">NAME → "Ravi"</text>

  <line x1="346" y1="80" x2="370" y2="80" stroke="#58a6ff" stroke-width="1.5" marker-end="url(#arr-b)"/>

  <!-- Step 3: Expansion -->
  <rect x="372" y="44" width="148" height="72" rx="8" fill="#1a1a3a" stroke="#bc8cff" stroke-width="2"/>
  <text x="446" y="66" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#bc8cff">③ Expand</text>
  <text x="446" y="82" text-anchor="middle" font-family="'Courier New',monospace" font-size="12" fill="#e6edf3">echo $NAME</text>
  <text x="446" y="98" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">$ triggers</text>
  <text x="446" y="112" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">substitution</text>

  <line x1="522" y1="80" x2="546" y2="80" stroke="#bc8cff" stroke-width="1.5" marker-end="url(#arr-p)"/>

  <!-- Step 4: Export -->
  <rect x="548" y="44" width="148" height="72" rx="8" fill="#2a2a1a" stroke="#ffa657" stroke-width="2"/>
  <text x="622" y="66" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#ffa657">④ Export</text>
  <text x="622" y="82" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#e6edf3">export NAME</text>
  <text x="622" y="98" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">child processes</text>
  <text x="622" y="112" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">can see it</text>

  <line x1="698" y1="80" x2="722" y2="80" stroke="#ffa657" stroke-width="1.5" marker-end="url(#arr-y)"/>

  <!-- Step 5: Unset -->
  <rect x="724" y="44" width="80" height="72" rx="8" fill="#2a1a1a" stroke="#f85149" stroke-width="2"/>
  <text x="764" y="66" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#f85149">⑤ Unset</text>
  <text x="764" y="82" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">unset NAME</text>
  <text x="764" y="98" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">gone from</text>
  <text x="764" y="112" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">memory</text>

  <!-- Variable in memory visual -->
  <rect x="20" y="138" width="780" height="68" rx="8" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="30" y="158" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#8b949e">Bash's variable table (simplified):</text>
  <rect x="30" y="164" width="90" height="28" rx="4" fill="#1a2a1a" stroke="#3fb950" stroke-width="1"/>
  <text x="75" y="182" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">NAME="Ravi"</text>
  <rect x="130" y="164" width="120" height="28" rx="4" fill="#0e1824" stroke="#58a6ff" stroke-width="1"/>
  <text x="190" y="182" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#58a6ff">DB_HOST="localhost"</text>
  <rect x="260" y="164" width="100" height="28" rx="4" fill="#1a1a3a" stroke="#bc8cff" stroke-width="1"/>
  <text x="310" y="182" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#bc8cff">PORT=5432 [export]</text>
  <rect x="370" y="164" width="90" height="28" rx="4" fill="#2a1a1a" stroke="#f85149" stroke-width="1"/>
  <text x="415" y="182" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#f85149">MAX=100 [readonly]</text>
  <rect x="470" y="164" width="90" height="28" rx="4" fill="#2a2a1a" stroke="#ffa657" stroke-width="1"/>
  <text x="515" y="182" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">COUNT=0 [integer]</text>
  <text x="580" y="182" font-family="'Segoe UI',sans-serif" font-size="10" fill="#30363d">← each has: name, value, attributes (flags)</text>
</svg>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Variable Basics — Assignment, Expansion, Rules</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ─── THE GOLDEN RULE: NO SPACES AROUND = ─────────────────────</span>
NAME="Ravi"          <span class="cb-cmt"># ✅ correct assignment</span>
NAME = "Ravi"        <span class="cb-cmt"># ❌ ERROR: bash treats NAME as a command!</span>
NAME ="Ravi"         <span class="cb-cmt"># ❌ ERROR: same problem</span>
NAME= "Ravi"         <span class="cb-cmt"># ❌ this sets NAME="" then runs "Ravi" as a command</span>

<span class="cb-cmt">## ─── VALID VARIABLE NAMES ─────────────────────────────────────</span>
my_var="ok"          <span class="cb-cmt"># letters, numbers, underscores</span>
MY_VAR="ok"          <span class="cb-cmt"># convention: UPPER_CASE for env/constants</span>
_private="ok"        <span class="cb-cmt"># can start with underscore</span>
var2="ok"            <span class="cb-cmt"># can have numbers (not at start)</span>
<span class="cb-cmt"># 2var="bad"         # ❌ cannot start with a number</span>
<span class="cb-cmt"># my-var="bad"       # ❌ hyphens not allowed</span>
<span class="cb-cmt"># my var="bad"       # ❌ no spaces in name</span>

<span class="cb-cmt">## ─── ASSIGNING DIFFERENT VALUE TYPES ─────────────────────────</span>
NAME="Ravi Kumar"    <span class="cb-cmt"># string with spaces — use double quotes</span>
PORT=5432            <span class="cb-cmt"># number — stored as string "5432"</span>
FLAG=true            <span class="cb-cmt"># boolean — just a string "true"</span>
EMPTY=""             <span class="cb-cmt"># empty string</span>
UNSET_VAR            <span class="cb-cmt"># not set at all — different from empty!</span>
MULTILINE="line1
line2
line3"               <span class="cb-cmt"># multiline value — works!</span>

<span class="cb-cmt">## ─── EXPANDING VARIABLES ──────────────────────────────────────</span>
<span class="cb-prompt">$</span> NAME="Ravi"
<span class="cb-prompt">$</span> <span class="cb-cmd">echo</span> $NAME
<span class="cb-out">Ravi</span>

<span class="cb-prompt">$</span> <span class="cb-cmd">echo</span> \${NAME}          <span class="cb-cmt"># braces make boundaries explicit</span>
<span class="cb-out">Ravi</span>

<span class="cb-prompt">$</span> <span class="cb-cmd">echo</span> \${NAME}Script    <span class="cb-cmt"># REQUIRED: braces when followed by more text</span>
<span class="cb-out">RaviScript</span>

<span class="cb-prompt">$</span> <span class="cb-cmd">echo</span> $NAMEScript      <span class="cb-cmt"># WRONG: bash looks for var named NAMEScript</span>
<span class="cb-out"></span><span class="cb-cmt">               # empty — NAMEScript is not defined</span>

<span class="cb-cmt">## ─── CHECKING IF A VARIABLE IS SET ───────────────────────────</span>
<span class="cb-prompt">$</span> NAME="Ravi"
<span class="cb-prompt">$</span> [[ -v NAME ]] && echo "set" || echo "not set"
<span class="cb-out">set</span>

<span class="cb-prompt">$</span> [[ -v UNDEFINED ]] && echo "set" || echo "not set"
<span class="cb-out">not set</span>

<span class="cb-prompt">$</span> EMPTY=""
<span class="cb-prompt">$</span> [[ -v EMPTY ]] && echo "set" || echo "not set"
<span class="cb-out">set</span>
<span class="cb-cmt"># -v checks if the variable EXISTS (even if empty)
# -z checks if the value is empty
# -n checks if the value is non-empty</span>

<span class="cb-prompt">$</span> [[ -z "$EMPTY" ]] && echo "empty" || echo "has value"
<span class="cb-out">empty</span>

<span class="cb-prompt">$</span> [[ -n "$NAME" ]] && echo "has value" || echo "empty"
<span class="cb-out">has value</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 2 — VARIABLE TYPES & DECLARE
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Variable Types — The <code>declare</code> Command</h2>

<p>By default every Bash variable is an untyped string. The <code>declare</code> command lets you add <strong>attributes</strong> — making a variable integer-only, read-only, case-converting, or an array. Understanding these unlocks safer and more expressive scripts.</p>

<!-- declare type system SVG -->
<div class="diagram-wrap">
<svg viewBox="0 0 820 240" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto;">
  <rect width="820" height="240" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">declare Attribute System — Bash Variable Type Flags</text>

  <!-- -s (string default) -->
  <rect x="15"  y="36" width="110" height="88" rx="7" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="70" y="58" text-anchor="middle" font-family="'Courier New',monospace" font-size="14" font-weight="bold" fill="#3fb950">string</text>
  <text x="70" y="74" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">default (no flag)</text>
  <text x="70" y="90" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">X="hello"</text>
  <text x="70" y="108" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">any chars, any length</text>
  <text x="70" y="119" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">no flag needed</text>

  <!-- -i integer -->
  <rect x="135" y="36" width="110" height="88" rx="7" fill="#0e1824" stroke="#58a6ff" stroke-width="2"/>
  <text x="190" y="54" text-anchor="middle" font-family="'Courier New',monospace" font-size="13" font-weight="bold" fill="#58a6ff">-i integer</text>
  <text x="190" y="70" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">arithmetic auto-applied</text>
  <text x="190" y="88" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">declare -i N=10</text>
  <text x="190" y="104" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">N=N+5  # N=15</text>
  <text x="190" y="118" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">non-integer → 0</text>

  <!-- -r readonly -->
  <rect x="255" y="36" width="110" height="88" rx="7" fill="#2a1a1a" stroke="#f85149" stroke-width="2"/>
  <text x="310" y="54" text-anchor="middle" font-family="'Courier New',monospace" font-size="13" font-weight="bold" fill="#f85149">-r readonly</text>
  <text x="310" y="70" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">cannot be changed</text>
  <text x="310" y="88" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">declare -r MAX=100</text>
  <text x="310" y="104" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">MAX=200  # ERROR</text>
  <text x="310" y="118" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">use for constants</text>

  <!-- -x export -->
  <rect x="375" y="36" width="110" height="88" rx="7" fill="#2a2a1a" stroke="#ffa657" stroke-width="2"/>
  <text x="430" y="54" text-anchor="middle" font-family="'Courier New',monospace" font-size="13" font-weight="bold" fill="#ffa657">-x export</text>
  <text x="430" y="70" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">passes to children</text>
  <text x="430" y="88" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">declare -x ENV=prod</text>
  <text x="430" y="104" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#e6edf3">= export ENV=prod</text>
  <text x="430" y="118" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">env variable</text>

  <!-- -l lowercase -->
  <rect x="495" y="36" width="110" height="88" rx="7" fill="#1a1a3a" stroke="#bc8cff" stroke-width="2"/>
  <text x="550" y="54" text-anchor="middle" font-family="'Courier New',monospace" font-size="13" font-weight="bold" fill="#bc8cff">-l lower</text>
  <text x="550" y="70" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">auto-lowercased</text>
  <text x="550" y="88" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">declare -l tag</text>
  <text x="550" y="104" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">tag="HELLO" → hello</text>
  <text x="550" y="118" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">on every assign</text>

  <!-- -u uppercase -->
  <rect x="615" y="36" width="110" height="88" rx="7" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.5"/>
  <text x="670" y="54" text-anchor="middle" font-family="'Courier New',monospace" font-size="13" font-weight="bold" fill="#3fb950">-u upper</text>
  <text x="670" y="70" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">auto-uppercased</text>
  <text x="670" y="88" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">declare -u env</text>
  <text x="670" y="104" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">env="prod" → PROD</text>
  <text x="670" y="118" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">on every assign</text>

  <!-- -a and -A -->
  <rect x="735" y="36" width="72" height="88" rx="7" fill="#2a1a2a" stroke="#ff79c6" stroke-width="1.5"/>
  <text x="771" y="54" text-anchor="middle" font-family="'Courier New',monospace" font-size="12" font-weight="bold" fill="#ff79c6">-a / -A</text>
  <text x="771" y="70" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">arrays</text>
  <text x="771" y="84" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#e6edf3">-a indexed</text>
  <text x="771" y="98" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#e6edf3">-A assoc</text>
  <text x="771" y="112" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">collections</text>

  <!-- Combination row -->
  <rect x="15" y="140" width="790" height="88" rx="8" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="30" y="162" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#e6edf3">Combining Flags:</text>
  <text x="30" y="180" font-family="'Courier New',monospace" font-size="11" fill="#ffa657">declare -rx MAX_RETRIES=3</text>
  <text x="220" y="180" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">readonly + exported constant</text>
  <text x="30" y="198" font-family="'Courier New',monospace" font-size="11" fill="#58a6ff">declare -ix TIMEOUT=30</text>
  <text x="220" y="198" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">integer + exported</text>
  <text x="30" y="216" font-family="'Courier New',monospace" font-size="11" fill="#3fb950">declare -lx ENV_TAG</text>
  <text x="220" y="216" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">lowercase + exported — whatever you assign gets lowercased and passed to children</text>
</svg>
</div>

<!-- CONSOLE 1 -->
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 1 of 8 — declare: All Types, Attributes &amp; Listing Variables</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ declare -i  INTEGER ════════════════════════════════════</span>
<span class="cb-prompt">$</span> declare -i COUNT=10
<span class="cb-prompt">$</span> COUNT=COUNT+5        <span class="cb-cmt"># arithmetic WITHOUT $(( )) — just works!</span>
<span class="cb-prompt">$</span> echo $COUNT
<span class="cb-out">15</span>
<span class="cb-prompt">$</span> COUNT="hello"       <span class="cb-cmt"># non-integer string → treated as 0</span>
<span class="cb-prompt">$</span> echo $COUNT
<span class="cb-out">0</span>
<span class="cb-prompt">$</span> COUNT=COUNT*2        <span class="cb-cmt"># multiplication works directly</span>
<span class="cb-prompt">$</span> echo $COUNT
<span class="cb-out">0</span>

<span class="cb-cmt">## ═══ declare -r  READONLY ════════════════════════════════════</span>
<span class="cb-prompt">$</span> declare -r MAX_CONNECTIONS=100
<span class="cb-prompt">$</span> MAX_CONNECTIONS=200
<span class="cb-out">bash: MAX_CONNECTIONS: readonly variable</span>
<span class="cb-prompt">$</span> unset MAX_CONNECTIONS
<span class="cb-out">bash: unset: MAX_CONNECTIONS: cannot unset: readonly variable</span>

<span class="cb-cmt"># readonly is also a standalone command (same effect):</span>
<span class="cb-prompt">$</span> readonly API_KEY="abc123"
<span class="cb-cmt"># Use for: config constants, script version strings, paths</span>

<span class="cb-cmt">## ═══ declare -l  LOWERCASE  /  declare -u  UPPERCASE ═════════</span>
<span class="cb-prompt">$</span> declare -l ENVIRONMENT
<span class="cb-prompt">$</span> ENVIRONMENT="PRODUCTION"
<span class="cb-prompt">$</span> echo $ENVIRONMENT
<span class="cb-out">production</span>
<span class="cb-cmt"># Every assignment is auto-lowercased — input normalisation!</span>

<span class="cb-prompt">$</span> declare -u LOG_LEVEL
<span class="cb-prompt">$</span> LOG_LEVEL="warn"
<span class="cb-prompt">$</span> echo $LOG_LEVEL
<span class="cb-out">WARN</span>
<span class="cb-cmt"># Auto-uppercased — great for flag variables</span>

<span class="cb-cmt">## ═══ declare -p  PRINT DEFINITION ═══════════════════════════</span>
<span class="cb-prompt">$</span> declare -p MAX_CONNECTIONS
<span class="cb-out">declare -r MAX_CONNECTIONS="100"</span>

<span class="cb-prompt">$</span> declare -p ENVIRONMENT
<span class="cb-out">declare -l ENVIRONMENT="production"</span>

<span class="cb-prompt">$</span> declare -p PATH
<span class="cb-out">declare -x PATH="/usr/local/bin:/usr/bin:/bin"</span>
<span class="cb-cmt"># -p shows the exact type flags and current value</span>
<span class="cb-cmt"># Invaluable for debugging: "why does this variable behave weird?"</span>

<span class="cb-cmt">## ═══ LIST ALL VARIABLES ══════════════════════════════════════</span>
<span class="cb-prompt">$</span> declare -p              <span class="cb-cmt"># print ALL variables with their attributes</span>
<span class="cb-prompt">$</span> declare | head -20      <span class="cb-cmt"># same (without -p flag)</span>
<span class="cb-prompt">$</span> set                     <span class="cb-cmt"># list ALL variables AND functions</span>

<span class="cb-cmt">## ═══ REMOVE ATTRIBUTE ════════════════════════════════════════</span>
<span class="cb-prompt">$</span> declare -i COUNT=5
<span class="cb-prompt">$</span> declare +i COUNT        <span class="cb-cmt"># +flag REMOVES the attribute (+ instead of -)</span>
<span class="cb-prompt">$</span> COUNT="hello"           <span class="cb-cmt"># now it's a string again — no arithmetic</span>

<span class="cb-cmt">## ═══ declare -n  NAMEREF (variable alias) ════════════════════</span>
<span class="cb-prompt">$</span> ORIGINAL="hello"
<span class="cb-prompt">$</span> declare -n ALIAS=ORIGINAL  <span class="cb-cmt"># ALIAS is a reference to ORIGINAL</span>
<span class="cb-prompt">$</span> echo $ALIAS
<span class="cb-out">hello</span>
<span class="cb-prompt">$</span> ALIAS="world"           <span class="cb-cmt"># modifies ORIGINAL through the alias!</span>
<span class="cb-prompt">$</span> echo $ORIGINAL
<span class="cb-out">world</span>
<span class="cb-cmt"># Nameref is used to: return values from functions, create dynamic variable names</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 3 — PARAMETER EXPANSION (FULL)
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Parameter Expansion — Every <code>\${}</code> Form</h2>

<p>Parameter expansion is how you do string manipulation, set defaults, and extract substrings — <em>all without calling a single external command</em>. Mastering this is the difference between a slow script full of <code>sed/awk</code> calls and a fast, portable one.</p>

<!-- CONSOLE 2 -->
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 2 of 8 — Parameter Expansion: Every Form with Examples</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ DEFAULT VALUES ══════════════════════════════════════════</span>
<span class="cb-prompt">$</span> unset DB_HOST

<span class="cb-prompt">$</span> echo \${DB_HOST:-localhost}      <span class="cb-cmt"># use default if unset OR empty</span>
<span class="cb-out">localhost</span>
<span class="cb-prompt">$</span> echo $DB_HOST                   <span class="cb-cmt"># DB_HOST still unset (not modified)</span>
<span class="cb-out"></span>

<span class="cb-prompt">$</span> echo \${DB_HOST:=localhost}      <span class="cb-cmt"># use default AND SET the variable</span>
<span class="cb-out">localhost</span>
<span class="cb-prompt">$</span> echo $DB_HOST                   <span class="cb-cmt"># now DB_HOST IS set</span>
<span class="cb-out">localhost</span>

<span class="cb-prompt">$</span> DB_HOST=prod-db
<span class="cb-prompt">$</span> echo \${DB_HOST:+CONNECTED}      <span class="cb-cmt"># if SET: use alternate value</span>
<span class="cb-out">CONNECTED</span>
<span class="cb-cmt"># :+ is the reverse default — triggers only when variable HAS a value</span>
<span class="cb-cmt"># Useful for: optional flags  (e.g. \${VERBOSE:+--verbose})</span>

<span class="cb-prompt">$</span> unset REQUIRED_VAR
<span class="cb-prompt">$</span> echo \${REQUIRED_VAR:?ERROR: REQUIRED_VAR must be set}
<span class="cb-out">bash: REQUIRED_VAR: ERROR: REQUIRED_VAR must be set</span>
<span class="cb-cmt"># :? exits the script with the error message — perfect for validation</span>

<span class="cb-cmt">## ─── Colon vs No-Colon Difference ────────────────────────────</span>
<span class="cb-cmt"># :- tests for unset OR empty   → \${VAR:-default}  (most common)</span>
<span class="cb-cmt">#  - tests for unset only       → \${VAR-default}   (ignores empty)</span>
EMPTY_VAR=""
echo \${EMPTY_VAR:-"was empty"}    <span class="cb-cmt"># was empty (empty = unset with :-)</span>
echo \${EMPTY_VAR-"was unset"}     <span class="cb-cmt"># "" (empty but SET — no-colon ignores)</span>

<span class="cb-cmt">## ═══ STRING LENGTH ════════════════════════════════════════════</span>
<span class="cb-prompt">$</span> NAME="Ravi Kumar"
<span class="cb-prompt">$</span> echo \${#NAME}
<span class="cb-out">10</span>

<span class="cb-prompt">$</span> FILES=("a.csv" "b.csv" "c.csv")
<span class="cb-prompt">$</span> echo \${#FILES[@]}               <span class="cb-cmt"># length of array</span>
<span class="cb-out">3</span>
<span class="cb-prompt">$</span> echo \${#FILES[0]}               <span class="cb-cmt"># length of first element</span>
<span class="cb-out">5</span>

<span class="cb-cmt">## ═══ SUBSTRINGS ══════════════════════════════════════════════</span>
<span class="cb-prompt">$</span> STR="Hello, World! 2024"
<span class="cb-prompt">$</span> echo \${STR:0:5}                 <span class="cb-cmt"># start=0, length=5 → Hello</span>
<span class="cb-out">Hello</span>
<span class="cb-prompt">$</span> echo \${STR:7:5}                 <span class="cb-cmt"># start=7, length=5 → World</span>
<span class="cb-out">World</span>
<span class="cb-prompt">$</span> echo \${STR: -4}                 <span class="cb-cmt"># last 4 chars (space before - required!)</span>
<span class="cb-out">2024</span>
<span class="cb-prompt">$</span> echo \${STR: -4:2}               <span class="cb-cmt"># 2 chars starting from 4th-from-end</span>
<span class="cb-out">20</span>

<span class="cb-cmt">## ═══ CASE CONVERSION ══════════════════════════════════════════</span>
<span class="cb-prompt">$</span> STR="hello world"
<span class="cb-prompt">$</span> echo \${STR^^}                   <span class="cb-cmt"># ALL UPPERCASE</span>
<span class="cb-out">HELLO WORLD</span>
<span class="cb-prompt">$</span> echo \${STR^}                    <span class="cb-cmt"># Capitalize first char only</span>
<span class="cb-out">Hello world</span>
<span class="cb-prompt">$</span> STR="HELLO WORLD"
<span class="cb-prompt">$</span> echo \${STR,,}                   <span class="cb-cmt"># all lowercase</span>
<span class="cb-out">hello world</span>
<span class="cb-prompt">$</span> echo \${STR,}                    <span class="cb-cmt"># lowercase first char only</span>
<span class="cb-out">hELLO WORLD</span>

<span class="cb-cmt">## ═══ PREFIX / SUFFIX REMOVAL ══════════════════════════════════</span>
<span class="cb-prompt">$</span> FILE="report_2024-01-15.csv.gz"

<span class="cb-prompt">$</span> echo \${FILE%.gz}                <span class="cb-cmt"># remove SHORTEST match from END</span>
<span class="cb-out">report_2024-01-15.csv</span>
<span class="cb-prompt">$</span> echo \${FILE%%.*}                <span class="cb-cmt"># remove LONGEST match from end (greedy)</span>
<span class="cb-out">report_2024-01-15</span>

<span class="cb-prompt">$</span> echo \${FILE#report_}            <span class="cb-cmt"># remove SHORTEST match from START</span>
<span class="cb-out">2024-01-15.csv.gz</span>
<span class="cb-prompt">$</span> echo \${FILE##*_}                <span class="cb-cmt"># remove LONGEST match from start (greedy)</span>
<span class="cb-out">2024-01-15.csv.gz</span>

<span class="cb-cmt"># Practical: extract just the filename (no directory)</span>
<span class="cb-prompt">$</span> PATH_TO_FILE="/home/ravi/data/report.csv"
<span class="cb-prompt">$</span> echo \${PATH_TO_FILE##*/}        <span class="cb-cmt"># remove everything up to last /</span>
<span class="cb-out">report.csv</span>
<span class="cb-cmt"># Same as: basename "$PATH_TO_FILE" — but no fork/exec needed!</span>

<span class="cb-cmt"># Practical: extract directory path</span>
<span class="cb-prompt">$</span> echo \${PATH_TO_FILE%/*}         <span class="cb-cmt"># remove from last / to end</span>
<span class="cb-out">/home/ravi/data</span>
<span class="cb-cmt"># Same as: dirname "$PATH_TO_FILE" — but no fork/exec!</span>

<span class="cb-cmt">## ═══ FIND AND REPLACE ══════════════════════════════════════════</span>
<span class="cb-prompt">$</span> STR="hello world hello"
<span class="cb-prompt">$</span> echo \${STR/hello/hi}            <span class="cb-cmt"># replace FIRST match</span>
<span class="cb-out">hi world hello</span>
<span class="cb-prompt">$</span> echo \${STR//hello/hi}           <span class="cb-cmt"># replace ALL matches (//)  </span>
<span class="cb-out">hi world hi</span>
<span class="cb-prompt">$</span> echo \${STR/#hello/hi}           <span class="cb-cmt"># replace only at START of string</span>
<span class="cb-out">hi world hello</span>
<span class="cb-prompt">$</span> echo \${STR/%hello/hi}           <span class="cb-cmt"># replace only at END of string</span>
<span class="cb-out">hello world hi</span>

<span class="cb-cmt"># Delete by replacing with nothing:</span>
<span class="cb-prompt">$</span> echo \${STR/hello/}              <span class="cb-cmt"># delete first "hello"</span>
<span class="cb-out"> world hello</span>
<span class="cb-prompt">$</span> echo \${STR//hello/}             <span class="cb-cmt"># delete all "hello"</span>
<span class="cb-out"> world </span>
<span class="cb-cmt"># Real world: remove spaces from a string</span>
<span class="cb-prompt">$</span> NAME="Ravi  Kumar "
<span class="cb-prompt">$</span> echo \${NAME// /}
<span class="cb-out">RaviKumar</span>

<span class="cb-cmt">## ═══ INDIRECTION (variable of a variable) ════════════════════</span>
<span class="cb-prompt">$</span> COLOR="RED"
<span class="cb-prompt">$</span> RED="#FF0000"
<span class="cb-prompt">$</span> echo \${!COLOR}                  <span class="cb-cmt"># !: treat value of COLOR as variable name</span>
<span class="cb-out">#FF0000</span>
<span class="cb-cmt"># Powerful for: dynamic variable lookup, config dispatch tables</span>

<span class="cb-cmt">## ═══ FULL REFERENCE TABLE ════════════════════════════════════</span>
<span class="cb-cmt"># \${var}           value of var
# \${var:-default}  value if set, else default (does NOT set var)
# \${var:=default}  value if set, else default (SETS var)
# \${var:+alt}      alt if var set, else empty
# \${var:?msg}      value if set, else print msg and exit
# \${#var}          length of var
# \${var:N:L}       substring from N, length L
# \${var: -N}       last N characters
# \${var^^}         ALL UPPERCASE
# \${var,,}         all lowercase
# \${var^}          Capitalize first
# \${var,}          lowercase first
# \${var#pat}       remove shortest prefix matching pat
# \${var##pat}      remove longest prefix matching pat
# \${var%pat}       remove shortest suffix matching pat
# \${var%%pat}      remove longest suffix matching pat
# \${var/pat/rep}   replace first match of pat with rep
# \${var//pat/rep}  replace all matches
# \${var/#pat/rep}  replace if pat matches at start
# \${var/%pat/rep}  replace if pat matches at end
# \${!var}          value of variable whose name is in var</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 4 — SCOPE: LOCAL, GLOBAL, ENVIRONMENT
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Variable Scope — Local, Global &amp; Environment</h2>

<p>This is exactly what caused Ravi's deployment disaster. There are three distinct scopes in Bash. Understanding them prevents an entire class of bugs.</p>

<!-- Scope tree SVG -->
<div class="diagram-wrap">
<svg viewBox="0 0 820 270" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto;">
  <rect width="820" height="270" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">Variable Scope — Three Levels</text>

  <!-- Shell (global) scope -->
  <rect x="15" y="34" width="790" height="224" rx="8" fill="#0a0e14" stroke="#30363d" stroke-width="1.5"/>
  <text x="34" y="55" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#3fb950">Shell Scope (Global to this shell session)</text>
  <text x="34" y="72" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">GLOBAL="I am visible everywhere in this shell"</text>
  <text x="34" y="88" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">export ENV_VAR="I pass to child processes"</text>

  <!-- Function scope -->
  <rect x="30" y="100" width="370" height="148" rx="7" fill="#161b22" stroke="#bc8cff" stroke-width="1.5"/>
  <text x="48" y="118" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#bc8cff">Function Scope (my_function)</text>
  <text x="48" y="134" font-family="'Courier New',monospace" font-size="10" fill="#bc8cff">local LOCAL="only inside this function"</text>
  <text x="48" y="150" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">GLOBAL can be READ here</text>
  <text x="48" y="166" font-family="'Courier New',monospace" font-size="10" fill="#f85149">GLOBAL can be MODIFIED here ← danger!</text>
  <text x="48" y="182" font-family="'Courier New',monospace" font-size="10" fill="#bc8cff">LOCAL is gone after function exits</text>

  <!-- Nested function -->
  <rect x="44" y="192" width="340" height="48" rx="6" fill="#0e1824" stroke="#58a6ff" stroke-width="1"/>
  <text x="60" y="210" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#58a6ff">Nested function scope</text>
  <text x="60" y="226" font-family="'Courier New',monospace" font-size="10" fill="#58a6ff">local INNER — only here; can see parent's local too</text>

  <!-- Child process scope -->
  <rect x="420" y="100" width="375" height="148" rx="7" fill="#161b22" stroke="#ffa657" stroke-width="1.5"/>
  <text x="438" y="118" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#ffa657">Child Process (./script.sh)</text>
  <text x="438" y="134" font-family="'Courier New',monospace" font-size="10" fill="#f85149">GLOBAL → NOT visible (not exported)</text>
  <text x="438" y="150" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">ENV_VAR → visible (was exported)</text>
  <text x="438" y="166" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">Own new variables → NOT seen by parent</text>
  <text x="438" y="186" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Child gets a COPY of exported vars</text>
  <text x="438" y="200" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Modifying them doesn't affect parent</text>
</svg>
</div>

<!-- CONSOLE 3 -->
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 3 of 8 — Scope: local, global, subshell, the shadowing bug</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ GLOBAL SCOPE ════════════════════════════════════════════</span>
DEPLOY_ENV="production"       <span class="cb-cmt"># global — visible in whole script</span>

deploy() {
    echo "Deploying to: $DEPLOY_ENV"  <span class="cb-cmt"># reads global</span>
}
deploy
<span class="cb-out">Deploying to: production</span>

<span class="cb-cmt">## ═══ LOCAL SCOPE ══════════════════════════════════════════════</span>
setup_db() {
    local DB_HOST="localhost"     <span class="cb-cmt"># local — only inside this function</span>
    local DB_PORT=5432
    echo "Inside: $DB_HOST:$DB_PORT"
}

setup_db
<span class="cb-out">Inside: localhost:5432</span>

echo "Outside: $DB_HOST"          <span class="cb-cmt"># empty — not visible outside</span>
<span class="cb-out">Outside: </span>

<span class="cb-cmt">## ═══ THE SHADOWING BUG (Ravi's actual mistake) ════════════════</span>
DB_HOST="prod-db.internal"    <span class="cb-cmt"># global — set at script level</span>

prepare_connection() {
    local DB_HOST="localhost"  <span class="cb-cmt"># ← THIS shadows the global DB_HOST!</span>
    echo "prep: $DB_HOST"      <span class="cb-cmt"># uses local value</span>
}

run_deployment() {
    echo "deploy: $DB_HOST"    <span class="cb-cmt"># uses... which DB_HOST?</span>
}

prepare_connection            <span class="cb-cmt"># creates local, then destroys it</span>
<span class="cb-out">prep: localhost</span>

run_deployment                <span class="cb-cmt"># global is STILL prod-db.internal</span>
<span class="cb-out">deploy: prod-db.internal</span>      <span class="cb-cmt"># ✅ works correctly</span>

<span class="cb-cmt"># But if run_deployment is CALLED FROM INSIDE prepare_connection:</span>
prepare_and_deploy() {
    local DB_HOST="localhost"  <span class="cb-cmt"># local shadows global</span>
    run_deployment             <span class="cb-cmt"># called here — inherits local!</span>
}

run_deployment() {
    echo "deploy: $DB_HOST"    <span class="cb-cmt"># sees CALLER's local DB_HOST</span>
}

prepare_and_deploy
<span class="cb-out">deploy: localhost</span>              <span class="cb-cmt"># ← BUG! got local, not global!</span>
<span class="cb-cmt"># Lesson: Bash local vars are DYNAMICALLY scoped — 
# they're visible to functions called from within the owning function!</span>

<span class="cb-cmt">## ═══ SUBSHELL SCOPE (parentheses) ════════════════════════════</span>
COUNTER=0

(
    COUNTER=100               <span class="cb-cmt"># modified in subshell</span>
    echo "Inside subshell: $COUNTER"
)

echo "Outside subshell: $COUNTER"   <span class="cb-cmt"># unchanged!</span>
<span class="cb-out">Inside subshell: 100</span>
<span class="cb-out">Outside subshell: 0</span>
<span class="cb-cmt"># ( ) creates a subshell — all changes are lost when it exits
# Used for: temporary cd, temp variable changes, isolation</span>

<span class="cb-cmt"># Practical: change directory temporarily without affecting parent</span>
(
    cd /tmp
    ls *.log 2>/dev/null
)
echo "Still in: $PWD"        <span class="cb-cmt"># back to original dir</span>

<span class="cb-cmt">## ═══ MODIFYING GLOBAL FROM FUNCTION (careful!) ════════════════</span>
TOTAL=0

add_to_total() {
    TOTAL=$((TOTAL + $1))     <span class="cb-cmt"># modifies global directly (no local)</span>
}

add_to_total 10
add_to_total 20
echo "Total: $TOTAL"
<span class="cb-out">Total: 30</span>
<span class="cb-cmt"># If you WANT to modify a global from a function, just don't use local
# But document it clearly — it's a side effect</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 5 — ENVIRONMENT VARIABLES & EXPORT
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Environment Variables — <code>export</code>, Inheritance &amp; <code>env</code></h2>

<p>An <strong>environment variable</strong> is a shell variable that has been <em>exported</em> — it gets copied into the environment of every child process. This is how configuration passes from a script to the programs it launches.</p>

<!-- env inheritance SVG -->
<div class="diagram-wrap">
<svg viewBox="0 0 820 210" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="210" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">Environment Inheritance Chain — How Variables Pass to Children</text>

  <!-- Shell -->
  <rect x="15" y="36" width="200" height="130" rx="8" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="115" y="58" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#3fb950">bash (PID 1000)</text>
  <text x="30" y="78" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">DB_HOST=prod-db  [export]</text>
  <text x="30" y="94" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">PORT=5432        [export]</text>
  <text x="30" y="110" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">LOCAL_VAR=data   [no export]</text>
  <text x="30" y="126" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">PS1="$ "         [no export]</text>
  <text x="115" y="155" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">your terminal shell</text>

  <!-- Arrow: exported only -->
  <line x1="217" y1="90" x2="270" y2="90" stroke="#3fb950" stroke-width="2" marker-end="url(#arr-g)"/>
  <text x="244" y="82" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">export</text>
  <text x="244" y="110" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#f85149">only these</text>
  <line x1="217" y1="100" x2="270" y2="100" stroke="#3fb950" stroke-width="2"/>

  <!-- Python child -->
  <rect x="272" y="36" width="230" height="130" rx="8" fill="#1a1a3a" stroke="#bc8cff" stroke-width="2"/>
  <text x="387" y="58" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#bc8cff">python3 pipeline.py</text>
  <text x="287" y="78" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">os.environ["DB_HOST"] = "prod-db"  ✓</text>
  <text x="287" y="94" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">os.environ["PORT"]    = "5432"     ✓</text>
  <text x="287" y="110" font-family="'Courier New',monospace" font-size="10" fill="#f85149">os.environ["LOCAL_VAR"] → KeyError ✗</text>
  <text x="287" y="126" font-family="'Courier New',monospace" font-size="10" fill="#f85149">os.environ["PS1"]       → KeyError ✗</text>
  <text x="387" y="155" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">inherits COPY of exported vars</text>

  <!-- Arrow: child modifies -->
  <line x1="504" y1="90" x2="557" y2="90" stroke="#ffa657" stroke-width="1.5" stroke-dasharray="5,3" marker-end="url(#arr-y)"/>
  <text x="530" y="82" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">modifies copy</text>

  <!-- Child of child -->
  <rect x="559" y="36" width="245" height="130" rx="8" fill="#2a2a1a" stroke="#ffa657" stroke-width="1.5"/>
  <text x="682" y="58" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#ffa657">subprocess spawned by python</text>
  <text x="574" y="78" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">os.environ["DB_HOST"] = "prod-db"  ✓</text>
  <text x="574" y="96" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">inherits what python passed down</text>
  <text x="574" y="114" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">python's new vars ONLY if re-exported</text>
  <text x="682" y="155" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">grandchild process</text>

  <text x="410" y="195" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Key rule: modifications to env vars in a child process NEVER affect the parent</text>
</svg>
</div>

<!-- CONSOLE 4 -->
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 4 of 8 — export, env, printenv, unset, per-command env</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ EXPORTING VARIABLES ════════════════════════════════════</span>
<span class="cb-prompt">$</span> DB_HOST="prod-db.internal"
<span class="cb-prompt">$</span> export DB_HOST               <span class="cb-cmt"># export after creation</span>

<span class="cb-prompt">$</span> export PORT=5432             <span class="cb-cmt"># create AND export in one line</span>

<span class="cb-prompt">$</span> declare -x LOG_LEVEL="INFO"  <span class="cb-cmt"># declare -x = same as export</span>

<span class="cb-cmt">## ═══ VERIFY WHAT IS EXPORTED ════════════════════════════════</span>
<span class="cb-prompt">$</span> export -p                    <span class="cb-cmt"># list ALL exported variables</span>
<span class="cb-out">declare -x DB_HOST="prod-db.internal"</span>
<span class="cb-out">declare -x HOME="/home/ravi"</span>
<span class="cb-out">declare -x LANG="en_IN.UTF-8"</span>
<span class="cb-out">declare -x LOG_LEVEL="INFO"</span>
<span class="cb-out">declare -x PATH="/usr/local/bin:/usr/bin:/bin"</span>
<span class="cb-out">declare -x PORT="5432"</span>

<span class="cb-prompt">$</span> printenv DB_HOST             <span class="cb-cmt"># print one specific env var</span>
<span class="cb-out">prod-db.internal</span>

<span class="cb-prompt">$</span> printenv                     <span class="cb-cmt"># print ALL environment variables</span>
<span class="cb-prompt">$</span> env                          <span class="cb-cmt"># same as printenv</span>
<span class="cb-prompt">$</span> env | sort | grep DB         <span class="cb-cmt"># find DB-related vars</span>

<span class="cb-cmt">## ═══ PER-COMMAND ENVIRONMENT ════════════════════════════════</span>
<span class="cb-cmt"># Set env var ONLY for one command — not persistent</span>
<span class="cb-prompt">$</span> DEBUG=true python3 pipeline.py
<span class="cb-cmt"># DEBUG=true is set in python3's env ONLY
# Your shell's DEBUG variable is unchanged after this</span>

<span class="cb-prompt">$</span> DB_HOST=staging-db ENVIRONMENT=staging ./deploy.sh
<span class="cb-cmt"># Both vars set just for deploy.sh — clean and safe</span>

<span class="cb-prompt">$</span> env DB_HOST=test PORT=9999 python3 test_suite.py
<span class="cb-cmt"># Using env command explicitly — same effect</span>

<span class="cb-cmt">## ═══ env COMMAND — FULL POWER ════════════════════════════════</span>
<span class="cb-prompt">$</span> env                           <span class="cb-cmt"># list current environment</span>
<span class="cb-prompt">$</span> env -i bash                   <span class="cb-cmt"># start bash with EMPTY environment</span>
<span class="cb-prompt">$</span> env -i PATH=/usr/bin python3  <span class="cb-cmt"># run with minimal clean environment</span>
<span class="cb-prompt">$</span> env -u DB_HOST python3        <span class="cb-cmt"># -u: unset DB_HOST for this command</span>
<span class="cb-prompt">$</span> env DB_HOST=test -u PORT ./run.sh  <span class="cb-cmt"># set one, unset another</span>

<span class="cb-cmt">## ═══ UNEXPORT / UNSET ════════════════════════════════════════</span>
<span class="cb-prompt">$</span> export -n DB_HOST             <span class="cb-cmt"># remove export attribute (keep value)</span>
<span class="cb-prompt">$</span> declare -p DB_HOST            <span class="cb-cmt"># now it's just a regular variable</span>
<span class="cb-out">declare -- DB_HOST="prod-db.internal"</span>   <span class="cb-cmt"># no -x flag = not exported</span>

<span class="cb-prompt">$</span> unset DB_HOST                 <span class="cb-cmt"># delete variable entirely</span>
<span class="cb-prompt">$</span> echo $DB_HOST                 <span class="cb-cmt"># empty</span>
<span class="cb-out"></span>

<span class="cb-cmt">## ═══ CHILD PROCESS CANNOT MODIFY PARENT ════════════════════</span>
<span class="cb-prompt">$</span> export COUNTER=0
<span class="cb-prompt">$</span> bash -c 'COUNTER=999; echo "Child: $COUNTER"'
<span class="cb-out">Child: 999</span>
<span class="cb-prompt">$</span> echo "Parent: $COUNTER"
<span class="cb-out">Parent: 0</span>
<span class="cb-cmt"># Child got a COPY — its modifications never reach the parent
# This is fundamental Unix process isolation</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 6 — SPECIAL VARIABLES (COMPLETE)
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Special Variables — Every Built-in Bash Variable</h2>

<!-- CONSOLE 5 -->
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 5 of 8 — All Special Variables with Live Examples</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ SCRIPT / POSITIONAL PARAMETERS ════════════════════════</span>
<span class="cb-cmt"># (inside a script called: ./pipeline.sh data.csv output/ verbose)</span>
$0          <span class="cb-cmt"># script name:          ./pipeline.sh</span>
$1          <span class="cb-cmt"># first argument:       data.csv</span>
$2          <span class="cb-cmt"># second argument:      output/</span>
$3          <span class="cb-cmt"># third argument:       verbose</span>
\${10}       <span class="cb-cmt"># 10th+ need braces:    \${10} \${11} etc.</span>
$@          <span class="cb-cmt"># all args as separate words: "data.csv" "output/" "verbose"</span>
$*          <span class="cb-cmt"># all args as one word:  "data.csv output/ verbose" (avoid)</span>
$#          <span class="cb-cmt"># number of arguments:   3</span>

<span class="cb-cmt">## ─── $@ vs $* — The Critical Difference ─────────────────────</span>
show_args() {
    echo "--- Using $@: ---"
    for arg in "$@"; do echo "  arg: [$arg]"; done
    echo "--- Using $*: ---"
    for arg in "$*"; do echo "  arg: [$arg]"; done
}

show_args "hello world" "foo" "bar"
<span class="cb-out">--- Using $@: ---</span>
<span class="cb-out">  arg: [hello world]     ← kept as one arg (correct!)</span>
<span class="cb-out">  arg: [foo]</span>
<span class="cb-out">  arg: [bar]</span>
<span class="cb-out">--- Using $*: ---</span>
<span class="cb-out">  arg: [hello world foo bar]  ← all merged into one (wrong!)</span>
<span class="cb-cmt"># ALWAYS use "$@" — never "$*"</span>

<span class="cb-cmt">## ═══ PROCESS & SHELL INFO ════════════════════════════════════</span>
<span class="cb-prompt">$</span> echo $$
<span class="cb-out">4821</span>
<span class="cb-cmt"># $$ = PID of current shell (used for temp files: /tmp/myapp.$$)</span>

<span class="cb-prompt">$</span> sleep 60 &amp;
<span class="cb-prompt">$</span> echo $!
<span class="cb-out">4897</span>
<span class="cb-cmt"># $! = PID of last background job (&amp;)</span>

<span class="cb-prompt">$</span> echo $-
<span class="cb-out">himBHs</span>
<span class="cb-cmt"># $- = current shell options (h=hashing, i=interactive, m=monitor, B=brace, H=history)</span>

<span class="cb-prompt">$</span> echo $_
<span class="cb-cmt"># $_ = last argument of previous command</span>
<span class="cb-prompt">$</span> mkdir -p /data/output
<span class="cb-prompt">$</span> cd $_           <span class="cb-cmt"># cd /data/output — $_ held the path!</span>

<span class="cb-cmt">## ═══ EXIT STATUS ═════════════════════════════════════════════</span>
<span class="cb-prompt">$</span> ls /etc/hosts
<span class="cb-out">/etc/hosts</span>
<span class="cb-prompt">$</span> echo $?
<span class="cb-out">0</span>
<span class="cb-cmt"># $? = 0 means success</span>

<span class="cb-prompt">$</span> ls /nonexistent
<span class="cb-out">ls: cannot access '/nonexistent': No such file or directory</span>
<span class="cb-prompt">$</span> echo $?
<span class="cb-out">2</span>
<span class="cb-cmt"># $? = non-zero means failure (exact code depends on command)</span>

<span class="cb-cmt"># IMPORTANT: $? is reset by EVERY command — capture it immediately!</span>
run_pipeline
STATUS=$?                <span class="cb-cmt"># save BEFORE doing anything else</span>
echo "Status: $STATUS"   <span class="cb-cmt"># now echo won't clobber $?</span>

<span class="cb-cmt">## ═══ TIMING & RANDOM ════════════════════════════════════════</span>
<span class="cb-prompt">$</span> echo $SECONDS
<span class="cb-out">127</span>
<span class="cb-cmt"># $SECONDS = seconds since this shell started</span>

START=$SECONDS
python3 heavy_job.py
echo "Elapsed: $((SECONDS - START)) seconds"

<span class="cb-prompt">$</span> echo $RANDOM
<span class="cb-out">17284</span>
<span class="cb-prompt">$</span> echo $RANDOM
<span class="cb-out">5901</span>
<span class="cb-cmt"># $RANDOM = new random 0-32767 each access
# For temp filenames: TMPFILE="/tmp/job_\${$}_\${RANDOM}.tmp"</span>

<span class="cb-cmt">## ═══ DIRECTORY NAVIGATION ════════════════════════════════════</span>
<span class="cb-prompt">$</span> echo $PWD
<span class="cb-out">/home/ravi/project</span>
<span class="cb-prompt">$</span> cd /tmp
<span class="cb-prompt">$</span> echo $OLDPWD
<span class="cb-out">/home/ravi/project</span>
<span class="cb-prompt">$</span> cd -                  <span class="cb-cmt"># cd to $OLDPWD</span>
<span class="cb-out">/home/ravi/project</span>

<span class="cb-cmt">## ═══ SCRIPT INTROSPECTION ════════════════════════════════════</span>
<span class="cb-prompt">$</span> echo $LINENO          <span class="cb-cmt"># current line number in script</span>
<span class="cb-out">47</span>
<span class="cb-prompt">$</span> echo "\${BASH_SOURCE[0]}"  <span class="cb-cmt"># file name of current script (array!)</span>
<span class="cb-out">./pipeline.sh</span>
<span class="cb-prompt">$</span> echo "\${FUNCNAME[0]}"     <span class="cb-cmt"># name of current function (array!)</span>
<span class="cb-out">run_deployment</span>
<span class="cb-prompt">$</span> echo "\${BASH_LINENO[0]}"  <span class="cb-cmt"># line number of caller</span>
<span class="cb-out">83</span>
</pre></div></div>

<div class="table-wrap" style="margin-top:20px;">
<table class="ref-table">
<thead><tr><th style="width:14%">Variable</th><th>Meaning</th><th>Example Value</th><th>Key Use Case</th></tr></thead>
<tbody>
<tr><td style="font-family:monospace;color:#3fb950;">$0</td><td>Script/shell name</td><td><code>./pipeline.sh</code></td><td>Usage messages, log prefix</td></tr>
<tr><td style="font-family:monospace;color:#3fb950;">$1..$9</td><td>Positional parameters</td><td><code>data.csv</code></td><td>Script arguments</td></tr>
<tr><td style="font-family:monospace;color:#3fb950;">\${10}+</td><td>10th+ positional param</td><td><code>\${12}</code></td><td>Scripts with many args</td></tr>
<tr><td style="font-family:monospace;color:#3fb950;">$@</td><td>All args, separately quoted</td><td><code>"arg1" "arg2"</code></td><td>Pass all args to another command</td></tr>
<tr><td style="font-family:monospace;color:#3fb950;">$*</td><td>All args as one string</td><td><code>"arg1 arg2"</code></td><td>Avoid — use $@ instead</td></tr>
<tr><td style="font-family:monospace;color:#3fb950;">$#</td><td>Argument count</td><td><code>3</code></td><td>Validate required args</td></tr>
<tr><td style="font-family:monospace;color:#58a6ff;">$?</td><td>Last command exit status</td><td><code>0</code> or <code>1-255</code></td><td>Error checking after commands</td></tr>
<tr><td style="font-family:monospace;color:#58a6ff;">$$</td><td>Current shell PID</td><td><code>4821</code></td><td>Unique temp filenames</td></tr>
<tr><td style="font-family:monospace;color:#58a6ff;">$!</td><td>Last background job PID</td><td><code>4897</code></td><td>Wait for / kill background jobs</td></tr>
<tr><td style="font-family:monospace;color:#58a6ff;">$_</td><td>Last argument of last command</td><td><code>/data/output</code></td><td>Quick reuse of last path</td></tr>
<tr><td style="font-family:monospace;color:#58a6ff;">$-</td><td>Current shell flags</td><td><code>himBH</code></td><td>Check if interactive</td></tr>
<tr><td style="font-family:monospace;color:#bc8cff;">$LINENO</td><td>Current line number</td><td><code>47</code></td><td>Debug messages with location</td></tr>
<tr><td style="font-family:monospace;color:#bc8cff;">$SECONDS</td><td>Shell uptime in seconds</td><td><code>127</code></td><td>Script timing, elapsed time</td></tr>
<tr><td style="font-family:monospace;color:#bc8cff;">$RANDOM</td><td>Random 0–32767</td><td><code>17284</code></td><td>Temp filenames, test data</td></tr>
<tr><td style="font-family:monospace;color:#bc8cff;">$OLDPWD</td><td>Previous directory</td><td><code>/home/ravi</code></td><td><code>cd -</code> equivalent</td></tr>
<tr><td style="font-family:monospace;color:#ffa657;">$IFS</td><td>Internal Field Separator</td><td>space+tab+newline</td><td>Control word splitting</td></tr>
<tr><td style="font-family:monospace;color:#ffa657;">$HOME</td><td>Home directory</td><td><code>/home/ravi</code></td><td>Tilde expansion, config paths</td></tr>
<tr><td style="font-family:monospace;color:#ffa657;">$PATH</td><td>Command search path</td><td><code>/usr/bin:/bin</code></td><td>Find executables</td></tr>
<tr><td style="font-family:monospace;color:#ffa657;">$PWD</td><td>Current directory</td><td><code>/home/ravi/project</code></td><td>Current location in scripts</td></tr>
<tr><td style="font-family:monospace;color:#ffa657;">$SHELL</td><td>Login shell path</td><td><code>/bin/bash</code></td><td>Detect shell type</td></tr>
<tr><td style="font-family:monospace;color:#ffa657;">$USER</td><td>Current username</td><td><code>ravi</code></td><td>Personalisation, permissions</td></tr>
<tr><td style="font-family:monospace;color:#ffa657;">$HOSTNAME</td><td>System hostname</td><td><code>server-01</code></td><td>Environment detection</td></tr>
<tr><td style="font-family:monospace;color:#ffa657;">$LANG</td><td>Locale/language setting</td><td><code>en_IN.UTF-8</code></td><td>Unicode, date formats</td></tr>
</tbody>
</table>
</div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 7 — IFS & WORD SPLITTING
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> IFS — The Internal Field Separator</h2>

<p>$IFS controls how bash splits unquoted strings into words. It is the invisible force behind many confusing bugs — and behind several powerful patterns.</p>

<!-- CONSOLE 6 -->
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 6 of 8 — IFS: Word Splitting, Custom Delimiters, Safe Patterns</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ WHAT IS IFS? ════════════════════════════════════════════</span>
<span class="cb-prompt">$</span> echo "$IFS" | cat -A
<span class="cb-out"> ^I$</span>
<span class="cb-cmt"># Default IFS = space (  ) + tab (^I) + newline ($)
# Shell uses these chars to split unquoted expansions into words</span>

<span class="cb-cmt">## ═══ IFS IN ACTION — WORD SPLITTING ════════════════════════</span>
<span class="cb-prompt">$</span> FRUITS="apple banana cherry"
<span class="cb-prompt">$</span> for f in $FRUITS; do echo "$f"; done   <span class="cb-cmt"># unquoted — splits!</span>
<span class="cb-out">apple</span>
<span class="cb-out">banana</span>
<span class="cb-out">cherry</span>

<span class="cb-prompt">$</span> for f in "$FRUITS"; do echo "$f"; done  <span class="cb-cmt"># quoted — stays as one</span>
<span class="cb-out">apple banana cherry</span>

<span class="cb-cmt">## ═══ CUSTOM IFS — PARSING CSV/TSV ═══════════════════════════</span>
<span class="cb-prompt">$</span> CSV_LINE="Ravi,Mumbai,DataEngineer,5000"
<span class="cb-prompt">$</span> IFS=',' read -r NAME CITY ROLE SALARY <<< "$CSV_LINE"
<span class="cb-prompt">$</span> echo "Name: $NAME | City: $CITY | Role: $ROLE"
<span class="cb-out">Name: Ravi | City: Mumbai | Role: DataEngineer</span>
<span class="cb-cmt"># IFS=',' makes read split on commas instead of spaces</span>

<span class="cb-cmt"># Processing a whole CSV file:</span>
while IFS=',' read -r date sales region; do
    echo "Date=$date  Sales=$sales  Region=$region"
done < sales.csv

<span class="cb-cmt"># TSV (tab-separated):</span>
while IFS=$'\t' read -r col1 col2 col3; do
    echo "$col1 | $col2 | $col3"
done < report.tsv

<span class="cb-cmt">## ═══ IFS AND ARRAYS ══════════════════════════════════════════</span>
<span class="cb-prompt">$</span> IFS=':' read -ra PARTS <<< "/usr/local/bin:/usr/bin:/bin"
<span class="cb-prompt">$</span> for p in "\${PARTS[@]}"; do echo "$p"; done
<span class="cb-out">/usr/local/bin</span>
<span class="cb-out">/usr/bin</span>
<span class="cb-out">/bin</span>
<span class="cb-cmt"># Split PATH into array — IFS=':' read -ra splits on colons</span>

<span class="cb-cmt">## ═══ JOINING ARRAY WITH IFS ══════════════════════════════════</span>
<span class="cb-prompt">$</span> ITEMS=("a" "b" "c" "d")
<span class="cb-prompt">$</span> IFS=','
<span class="cb-prompt">$</span> echo "\${ITEMS[*]}"            <span class="cb-cmt"># $* uses first char of IFS as separator</span>
<span class="cb-out">a,b,c,d</span>
<span class="cb-prompt">$</span> IFS=' '                      <span class="cb-cmt"># restore</span>
<span class="cb-cmt"># "\${ARRAY[*]}" with custom IFS = join array with delimiter</span>

<span class="cb-cmt">## ═══ SAFE IFS PATTERN — RESTORE AFTER USE ═══════════════════</span>
OLD_IFS="$IFS"
IFS=','
<span class="cb-cmt"># ... do CSV processing ...</span>
IFS="$OLD_IFS"             <span class="cb-cmt"># restore — good practice</span>

<span class="cb-cmt"># Or use a subshell to isolate IFS change:</span>
(
    IFS=','
    read -ra FIELDS <<< "$CSV_LINE"
    echo "\${FIELDS[1]}"
)
<span class="cb-cmt"># IFS restored automatically when subshell exits</span>

<span class="cb-cmt">## ═══ IFS="" — SAFEST MODE FOR LINE READING ══════════════════</span>
while IFS= read -r line; do    <span class="cb-cmt"># IFS= = empty IFS</span>
    echo "[$line]"             <span class="cb-cmt"># leading/trailing spaces PRESERVED</span>
done < config.txt
<span class="cb-cmt"># IFS= (empty) prevents any word splitting and preserves whitespace</span>
<span class="cb-cmt"># The -r flag prevents backslash interpretation</span>
<span class="cb-cmt"># This combo is the CANONICAL way to read files line by line</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 8 — ARRAYS (COMPLETE)
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Arrays — Indexed &amp; Associative Variables</h2>

<!-- CONSOLE 7 -->
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 7 of 8 — Arrays: Indexed, Associative, All Operations</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ INDEXED ARRAYS ══════════════════════════════════════════</span>
<span class="cb-cmt"># Creation methods:</span>
SERVERS=("web-01" "web-02" "db-01")   <span class="cb-cmt"># literal</span>
SERVERS=()                             <span class="cb-cmt"># empty</span>
declare -a SERVERS                     <span class="cb-cmt"># explicit declaration</span>
SERVERS[0]="web-01"                    <span class="cb-cmt"># individual element</span>
SERVERS[5]="db-01"                     <span class="cb-cmt"># sparse: gaps OK</span>
mapfile -t SERVERS < servers.txt       <span class="cb-cmt"># one item per line from file</span>
IFS=',' read -ra SERVERS <<< "a,b,c"  <span class="cb-cmt"># split string into array</span>

<span class="cb-cmt"># Access:</span>
echo "\${SERVERS[0]}"       <span class="cb-cmt"># first element: web-01</span>
echo "\${SERVERS[-1]}"      <span class="cb-cmt"># last element: db-01</span>
echo "\${SERVERS[@]}"       <span class="cb-cmt"># ALL elements (always quote!)</span>
echo "\${#SERVERS[@]}"      <span class="cb-cmt"># count: 3</span>
echo "\${!SERVERS[@]}"      <span class="cb-cmt"># all indices: 0 1 2</span>
echo "\${SERVERS[@]:1:2}"   <span class="cb-cmt"># slice: elements 1 and 2</span>

<span class="cb-cmt"># Modify:</span>
SERVERS+=("cache-01")      <span class="cb-cmt"># append one element</span>
SERVERS+=("r1" "r2")       <span class="cb-cmt"># append multiple</span>
SERVERS[0]="web-new"       <span class="cb-cmt"># replace element</span>
unset "SERVERS[1]"         <span class="cb-cmt"># delete element (leaves gap)</span>
SERVERS=("\${SERVERS[@]}")  <span class="cb-cmt"># re-index to remove gaps</span>

<span class="cb-cmt"># Loop (ALWAYS quote \${ARRAY[@]}):</span>
for server in "\${SERVERS[@]}"; do
    echo "Checking: $server"
done

for i in "\${!SERVERS[@]}"; do
    echo "[$i] \${SERVERS[$i]}"
done

<span class="cb-cmt">## ═══ ASSOCIATIVE ARRAYS (dictionaries) ══════════════════════</span>
declare -A CONFIG          <span class="cb-cmt"># MUST declare -A first</span>
CONFIG["host"]="prod-db"
CONFIG["port"]="5432"
CONFIG["db"]="analytics"

<span class="cb-cmt"># Or inline:</span>
declare -A CONFIG=(
    [host]="prod-db.internal"
    [port]="5432"
    [db]="analytics"
    [user]="pipeline_user"
    [ssl]="true"
)

<span class="cb-cmt"># Access:</span>
echo "\${CONFIG[host]}"     <span class="cb-cmt"># prod-db.internal</span>
echo "\${CONFIG[@]}"        <span class="cb-cmt"># all values</span>
echo "\${!CONFIG[@]}"       <span class="cb-cmt"># all keys: host port db user ssl</span>
echo "\${#CONFIG[@]}"       <span class="cb-cmt"># count: 5</span>

<span class="cb-cmt"># Check key exists:</span>
[[ -v CONFIG["host"] ]] && echo "host key exists"

<span class="cb-cmt"># Loop over key-value pairs:</span>
for key in "\${!CONFIG[@]}"; do
    printf "%-12s = %s\n" "$key" "\${CONFIG[$key]}"
done
<span class="cb-out">host         = prod-db.internal</span>
<span class="cb-out">port         = 5432</span>
<span class="cb-out">db           = analytics</span>
<span class="cb-out">user         = pipeline_user</span>
<span class="cb-out">ssl          = true</span>

<span class="cb-cmt"># Modify:</span>
CONFIG["host"]="new-db.internal"   <span class="cb-cmt"># update value</span>
unset "CONFIG[ssl]"                <span class="cb-cmt"># delete key</span>
CONFIG+=([timeout]="30")           <span class="cb-cmt"># add new key</span>

<span class="cb-cmt">## ═══ PRACTICAL: Load config file into associative array ══════</span>
declare -A APP_CONFIG

while IFS='=' read -r key value; do
    [[ "$key" =~ ^[[:space:]]*# ]] && continue  <span class="cb-cmt"># skip comments</span>
    [[ -z "$key" ]] && continue                  <span class="cb-cmt"># skip blank lines</span>
    key="\${key// /}"                             <span class="cb-cmt"># trim spaces</span>
    value="\${value// /}"
    APP_CONFIG["$key"]="$value"
done < app.properties

echo "DB: \${APP_CONFIG[db.host]}:\${APP_CONFIG[db.port]}"
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 9 — SHELL INIT FILES & LOAD ORDER
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Shell Init Files — .bashrc, .bash_profile &amp; Load Order</h2>

<p>Your environment variables are set when shell starts — but <em>which file</em> runs depends on whether the shell is a <strong>login shell</strong> or an <strong>interactive shell</strong>. Getting this wrong is why "it works in my terminal but not in cron".</p>

<!-- Load order SVG -->
<div class="diagram-wrap">
<svg viewBox="0 0 820 260" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto;">
  <rect width="820" height="260" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">Shell Init File Load Order — Which File Runs When</text>

  <!-- Login Shell column -->
  <rect x="15"  y="36" width="370" height="210" rx="8" fill="#161b22" stroke="#3fb950" stroke-width="2"/>
  <text x="200" y="58" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#3fb950">Login Shell</text>
  <text x="200" y="74" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">SSH login, su -, console login, bash --login</text>
  <line x1="25" y1="82" x2="375" y2="82" stroke="#30363d" stroke-width="1"/>

  <rect x="30" y="90" width="340" height="26" rx="4" fill="#1a2a1a" stroke="#3fb950" stroke-width="1"/>
  <text x="200" y="107" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#3fb950">1. /etc/profile</text>
  <text x="395" y="107" text-anchor="start" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e"> ← system-wide</text>

  <text x="200" y="130" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">then FIRST found of:</text>

  <rect x="30" y="136" width="340" height="26" rx="4" fill="#1a2a1a" stroke="#3fb950" stroke-width="1"/>
  <text x="200" y="153" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#3fb950">2. ~/.bash_profile</text>

  <rect x="30" y="168" width="340" height="26" rx="4" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="200" y="185" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#8b949e">  OR ~/.bash_login</text>

  <rect x="30" y="200" width="340" height="26" rx="4" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="200" y="217" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#8b949e">  OR ~/.profile</text>

  <text x="200" y="240" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#3fb950">~/.bash_profile should source ~/.bashrc</text>

  <!-- Interactive Non-Login column -->
  <rect x="435" y="36" width="370" height="210" rx="8" fill="#161b22" stroke="#bc8cff" stroke-width="2"/>
  <text x="620" y="58" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#bc8cff">Interactive Non-Login Shell</text>
  <text x="620" y="74" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">New terminal tab, bash (without --login)</text>
  <line x1="445" y1="82" x2="795" y2="82" stroke="#30363d" stroke-width="1"/>

  <rect x="450" y="90" width="340" height="26" rx="4" fill="#1a1a3a" stroke="#bc8cff" stroke-width="1"/>
  <text x="620" y="107" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#bc8cff">1. /etc/bash.bashrc</text>
  <text x="795" y="107" text-anchor="start" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e"> ← system</text>

  <rect x="450" y="122" width="340" height="26" rx="4" fill="#1a1a3a" stroke="#bc8cff" stroke-width="1"/>
  <text x="620" y="139" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#bc8cff">2. ~/.bashrc</text>

  <text x="620" y="175" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">~/.bashrc = your main config file</text>
  <text x="620" y="192" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Put: aliases, functions, prompt (PS1)</text>
  <text x="620" y="208" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">and: export PATH, export EDITOR</text>

  <text x="620" y="240" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#f85149">NON-interactive (scripts, cron): NO files!</text>
</svg>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 8 of 8 — Init Files, PATH, Common Env Vars, .env Files</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ RECOMMENDED ~/.bash_profile CONTENT ════════════════════</span>
<span class="cb-out">#!/bin/bash</span>
<span class="cb-out"># ~/.bash_profile — runs on LOGIN (SSH, console)</span>
<span class="cb-out"># Best practice: just source .bashrc</span>
<span class="cb-out">if [[ -f ~/.bashrc ]]; then</span>
<span class="cb-out">    source ~/.bashrc</span>
<span class="cb-out">fi</span>

<span class="cb-cmt">## ═══ RECOMMENDED ~/.bashrc CONTENT (data engineer setup) ═════</span>
<span class="cb-out">#!/bin/bash</span>
<span class="cb-out"># ~/.bashrc — runs for every interactive non-login shell</span>
<span class="cb-out"></span>
<span class="cb-out"># ── PATH additions ─────────────────────────────────────────</span>
<span class="cb-out">export PATH="$HOME/.local/bin:$HOME/scripts:$PATH"</span>
<span class="cb-out">export PATH="/opt/spark/bin:$PATH"</span>
<span class="cb-out"></span>
<span class="cb-out"># ── Default editor ─────────────────────────────────────────</span>
<span class="cb-out">export EDITOR=nano</span>
<span class="cb-out">export VISUAL=nano</span>
<span class="cb-out"></span>
<span class="cb-out"># ── Data engineering defaults ─────────────────────────────</span>
<span class="cb-out">export PYTHONDONTWRITEBYTECODE=1</span>
<span class="cb-out">export PYTHONUNBUFFERED=1</span>
<span class="cb-out">export PYSPARK_PYTHON=python3</span>
<span class="cb-out"></span>
<span class="cb-out"># ── Java (for Spark) ──────────────────────────────────────</span>
<span class="cb-out">export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64</span>
<span class="cb-out">export SPARK_HOME=/opt/spark</span>
<span class="cb-out"></span>
<span class="cb-out"># ── Useful aliases ────────────────────────────────────────</span>
<span class="cb-out">alias ll='ls -lahF'</span>
<span class="cb-out">alias ..='cd ..'</span>
<span class="cb-out">alias grep='grep --color=auto'</span>
<span class="cb-out">alias py='python3'</span>
<span class="cb-out">alias activate='source .venv/bin/activate'</span>

<span class="cb-cmt">## ═══ RELOAD .bashrc WITHOUT LOGGING OUT ══════════════════════</span>
<span class="cb-prompt">$</span> source ~/.bashrc    <span class="cb-cmt"># reload in current shell</span>
<span class="cb-prompt">$</span> . ~/.bashrc         <span class="cb-cmt"># same — . is alias for source</span>

<span class="cb-cmt">## ═══ WHY SCRIPTS DON'T SEE YOUR .bashrc VARIABLES ══════════</span>
<span class="cb-cmt"># Scripts run as NON-INTERACTIVE NON-LOGIN shells
# They DON'T read ~/.bashrc or ~/.bash_profile !
# Solution 1: export the variable before running the script
# Solution 2: source the config inside the script:</span>
source ~/.bashrc
source /etc/environment
<span class="cb-cmt"># Solution 3: use /etc/environment (read by PAM, always available)</span>

<span class="cb-cmt">## ═══ .env FILE PATTERN (12-factor app style) ════════════════</span>
<span class="cb-cmt"># Store config in .env file (NOT committed to git!)</span>
<span class="cb-out"># .env file contents:</span>
<span class="cb-out">DB_HOST=prod-db.internal</span>
<span class="cb-out">DB_PORT=5432</span>
<span class="cb-out">DB_PASSWORD=secret123</span>
<span class="cb-out">API_KEY=abc-def-ghi</span>
<span class="cb-out">LOG_LEVEL=INFO</span>

<span class="cb-cmt"># Load .env file in script:</span>
set -a                       <span class="cb-cmt"># -a: auto-export ALL variables set</span>
source .env
set +a                       <span class="cb-cmt"># turn off auto-export</span>

<span class="cb-cmt"># Or safely (skip comments and blanks):</span>
while IFS='=' read -r key value; do
    [[ "$key" =~ ^[[:space:]]*#.*$ || -z "$key" ]] && continue
    export "\${key}"="\${value}"
done < .env

<span class="cb-cmt"># Then python reads them automatically:</span>
<span class="cb-out">import os</span>
<span class="cb-out">db_host = os.environ["DB_HOST"]   # from .env via shell export</span>

<span class="cb-cmt">## ═══ MANAGING PATH ════════════════════════════════════════════</span>
<span class="cb-cmt"># View current PATH:</span>
<span class="cb-prompt">$</span> echo $PATH
<span class="cb-out">/usr/local/bin:/usr/bin:/bin:/usr/local/sbin</span>

<span class="cb-prompt">$</span> echo $PATH | tr ':' '\n'        <span class="cb-cmt"># one per line — more readable</span>
<span class="cb-out">/usr/local/bin</span>
<span class="cb-out">/usr/bin</span>
<span class="cb-out">/bin</span>

<span class="cb-cmt"># Add to PATH safely (check first to avoid duplicates):</span>
add_to_path() {
    case ":\${PATH}:" in
        *":$1:"*) ;;                   <span class="cb-cmt"># already in PATH — skip</span>
        *) PATH="$1:\${PATH}" ;;        <span class="cb-cmt"># add to front</span>
    esac
}
add_to_path "$HOME/.local/bin"
add_to_path "/opt/spark/bin"
export PATH
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 10 — COMMON ENVIRONMENT VARIABLES
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Common Environment Variables — The Standard Set</h2>

<div class="table-wrap">
<table class="ref-table">
<thead>
  <tr>
    <th style="width:20%">Variable</th>
    <th style="width:40%">Meaning &amp; Example Value</th>
    <th>Data Engineering Use</th>
  </tr>
</thead>
<tbody>
<tr><td colspan="3" style="background:#1a2a1a;color:#3fb950;font-weight:bold;font-family:'Segoe UI',sans-serif;">System &amp; User</td></tr>
<tr><td style="font-family:monospace;color:#3fb950;">PATH</td><td><code>/usr/bin:/bin:/usr/local/bin</code></td><td>Add Spark, Python venv, custom scripts</td></tr>
<tr><td style="font-family:monospace;color:#3fb950;">HOME</td><td><code>/home/ravi</code></td><td>Config files, credentials, SSH keys</td></tr>
<tr><td style="font-family:monospace;color:#3fb950;">USER / LOGNAME</td><td><code>ravi</code></td><td>Log who ran the pipeline</td></tr>
<tr><td style="font-family:monospace;color:#3fb950;">HOSTNAME</td><td><code>data-server-01</code></td><td>Identify which node ran the job</td></tr>
<tr><td style="font-family:monospace;color:#3fb950;">SHELL</td><td><code>/bin/bash</code></td><td>Detect shell in polyglot environments</td></tr>
<tr><td style="font-family:monospace;color:#3fb950;">LANG / LC_ALL</td><td><code>en_IN.UTF-8</code></td><td>Character encoding for data files</td></tr>
<tr><td style="font-family:monospace;color:#3fb950;">TZ</td><td><code>Asia/Kolkata</code></td><td>Timezone for timestamps in logs/data</td></tr>
<tr><td style="font-family:monospace;color:#3fb950;">TERM</td><td><code>xterm-256color</code></td><td>Terminal capabilities (color support)</td></tr>
<tr><td colspan="3" style="background:#1a1a3a;color:#bc8cff;font-weight:bold;font-family:'Segoe UI',sans-serif;">Editor &amp; Pager</td></tr>
<tr><td style="font-family:monospace;color:#bc8cff;">EDITOR</td><td><code>nano</code> or <code>vim</code></td><td>Used by git commit, crontab -e, visudo</td></tr>
<tr><td style="font-family:monospace;color:#bc8cff;">VISUAL</td><td><code>nano</code></td><td>Full-screen editor (fallback to EDITOR)</td></tr>
<tr><td style="font-family:monospace;color:#bc8cff;">PAGER</td><td><code>less</code></td><td>Used by man, git log, etc.</td></tr>
<tr><td colspan="3" style="background:#2a2a1a;color:#ffa657;font-weight:bold;font-family:'Segoe UI',sans-serif;">Python &amp; Data</td></tr>
<tr><td style="font-family:monospace;color:#ffa657;">PYTHONPATH</td><td><code>/home/ravi/lib</code></td><td>Add custom modules to Python import path</td></tr>
<tr><td style="font-family:monospace;color:#ffa657;">PYTHONUNBUFFERED</td><td><code>1</code></td><td>Unbuffered output — see logs in real time</td></tr>
<tr><td style="font-family:monospace;color:#ffa657;">PYTHONDONTWRITEBYTECODE</td><td><code>1</code></td><td>Don't create .pyc files (cleaner containers)</td></tr>
<tr><td style="font-family:monospace;color:#ffa657;">VIRTUAL_ENV</td><td><code>/home/ravi/.venv</code></td><td>Set when a venv is activated</td></tr>
<tr><td colspan="3" style="background:#1f2027;color:#58a6ff;font-weight:bold;font-family:'Segoe UI',sans-serif;">Java &amp; Spark</td></tr>
<tr><td style="font-family:monospace;color:#58a6ff;">JAVA_HOME</td><td><code>/usr/lib/jvm/java-11-openjdk</code></td><td>Required for Spark, Kafka, Hadoop</td></tr>
<tr><td style="font-family:monospace;color:#58a6ff;">SPARK_HOME</td><td><code>/opt/spark</code></td><td>Spark installation directory</td></tr>
<tr><td style="font-family:monospace;color:#58a6ff;">PYSPARK_PYTHON</td><td><code>python3</code></td><td>Python interpreter for PySpark workers</td></tr>
<tr><td style="font-family:monospace;color:#58a6ff;">SPARK_MASTER</td><td><code>spark://host:7077</code></td><td>Spark cluster master URL</td></tr>
<tr><td colspan="3" style="background:#1a2a1a;color:#3fb950;font-weight:bold;font-family:'Segoe UI',sans-serif;">Database &amp; Cloud</td></tr>
<tr><td style="font-family:monospace;color:#3fb950;">PGHOST / PGPORT</td><td><code>localhost / 5432</code></td><td>PostgreSQL connection (psql reads these)</td></tr>
<tr><td style="font-family:monospace;color:#3fb950;">PGDATABASE / PGUSER</td><td><code>analytics / ravi</code></td><td>PostgreSQL defaults</td></tr>
<tr><td style="font-family:monospace;color:#3fb950;">AWS_DEFAULT_REGION</td><td><code>ap-south-1</code></td><td>AWS CLI default region</td></tr>
<tr><td style="font-family:monospace;color:#3fb950;">AWS_PROFILE</td><td><code>production</code></td><td>AWS credentials profile to use</td></tr>
<tr><td style="font-family:monospace;color:#3fb950;">GOOGLE_APPLICATION_CREDENTIALS</td><td><code>/home/ravi/sa-key.json</code></td><td>GCP service account key path</td></tr>
</tbody>
</table>
</div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 11 — KERNEL DEEP DIVE
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Kernel Deep Dive — Where Variables Live in the OS</h2>

<div class="deepdive-box">
<div class="deepdive-title">⚙️ Environment Variables in the Kernel — execve, /proc, and the environ Array</div>
<pre style="margin:0;padding:16px;font-family:monospace;font-size:12px;color:#e6edf3;background:#010409;border-radius:0 0 8px 8px;overflow-x:auto;">
# HOW ENVIRONMENT VARIABLES ARE STORED IN MEMORY

1. SHELL PROCESS MEMORY LAYOUT (simplified)
   Every running process has:
   ┌─────────────────────┐  ← high address
   │  Stack              │  (local vars, call frames)
   │  ...                │
   │  Environment        │  ← char *envp[] — pointer array to env strings
   │    PATH=...         │     "PATH=/usr/bin:/bin\0"
   │    HOME=...         │     "HOME=/home/ravi\0"
   │    DB_HOST=...      │     "DB_HOST=prod-db\0"
   │  Arguments (argv[]) │
   │  ...                │
   │  Heap               │
   │  BSS (uninit data)  │
   │  Data (init data)   │
   │  Text (code)        │
   └─────────────────────┘  ← low address

2. HOW ENVIRONMENT IS PASSED TO CHILD (execve syscall)
   execve(2) signature:
     int execve(const char *pathname,
                char *const argv[],
                char *const envp[]);
                         ^^^^^^^^^^^
                         This is the environment array

   When bash forks + execs a child:
   - bash builds an envp[] array from all exported variables
   - Each entry is a "NAME=VALUE" string (NUL-terminated)
   - This array is passed as the 3rd argument to execve()
   - The kernel places envp[] on the new process's stack
   - Non-exported bash variables are NOT in envp[] — they stay in bash

3. HOW PROGRAMS ACCESS ENVIRONMENT
   In C:
     extern char **environ;  // global pointer to env array
     // OR via main's third argument:
     int main(int argc, char *argv[], char *envp[]) { ... }
     // OR via getenv():
     char *db = getenv("DB_HOST");  // returns "prod-db.internal"

   In Python:
     import os
     os.environ["DB_HOST"]   # reads from process's environ
     os.environ.get("DB_HOST", "localhost")  # with default

4. /proc FILESYSTEM — INSPECT LIVE PROCESS ENVIRONMENT
   Every process has its environment readable via /proc:

   /proc/PID/environ — raw NUL-separated env strings for process PID
   /proc/self/environ — your own process's environment

   # View current shell's environment:
   cat /proc/self/environ | tr '\0' '\n' | sort
   # Output: same as 'env' but from the kernel's view

   # View another process's environment:
   cat /proc/4821/environ | tr '\0' '\n' | grep DB_HOST
   # Works for processes you own

5. MODIFYING ENVIRONMENT AT RUNTIME
   In bash:
     export NEW_VAR="value"  → adds to bash's export list
     
   In C/Python: can call setenv() / putenv() / os.environ[]=
   These modify the CURRENT process's environment
   They do NOT affect the parent process (copy-on-write isolation)
   They DO affect future children spawned by this process

6. BASH VARIABLE vs ENVIRONMENT VARIABLE
   Bash maintains TWO things:
   a) Internal variable table (all shell variables — local + exported)
   b) Export list (subset that goes into envp[] on exec)
   
   Shell variable only:   NAME="Ravi"      (in internal table only)
   Environment variable:  export DB_HOST   (in table + envp[])
   
   'set'    → shows ALL shell variables (both kinds)
   'env'    → shows ONLY exported variables (what children see)
   'declare -p' → shows all with their attributes
</pre>
</div>

<div class="two-col-grid" style="margin-top:20px;">
  <div class="callout-box info-box">
    <strong>🔬 Inspect a Running Process's Environment:</strong>
    <pre style="margin:8px 0 0;font-family:monospace;font-size:12px;background:transparent;border:none;padding:0;color:#e6edf3;">$ ps aux | grep pipeline
ravi  4821 ...

$ cat /proc/4821/environ | tr '\0' '\n' | grep -E "DB|LOG"
DB_HOST=prod-db.internal
LOG_LEVEL=INFO</pre>
  </div>
  <div class="callout-box warn-box">
    <strong>⚠️ Security: Env Vars Are Readable!</strong>
    <p style="margin:8px 0 0;font-size:13px;">Any user who can read <code>/proc/PID/environ</code> (typically the owner) can see ALL environment variables — including secrets like passwords and API keys. Never store truly sensitive values as env vars on shared servers. Use secrets managers (Vault, AWS Secrets Manager) in production.</p>
  </div>
</div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 12 — REAL WORLD PATTERNS
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Real-World Patterns — Data Engineering Variable Workflows</h2>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Production Variable Patterns — Data Engineering</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ PATTERN 1: SCRIPT CONSTANTS AT TOP ═════════════════════</span>
<span class="cb-out">#!/usr/bin/env bash</span>
<span class="cb-out">set -euo pipefail</span>
<span class="cb-out"></span>
<span class="cb-out">readonly SCRIPT_DIR="$(cd "$(dirname "\${BASH_SOURCE[0]}")" && pwd)"</span>
<span class="cb-out">readonly SCRIPT_NAME="$(basename "$0")"</span>
<span class="cb-out">readonly TIMESTAMP="$(date +%Y%m%d_%H%M%S)"</span>
<span class="cb-out">readonly LOG_FILE="/var/log/\${SCRIPT_NAME%.sh}_\${TIMESTAMP}.log"</span>
<span class="cb-out"></span>
<span class="cb-out"># Config with defaults (override via environment)</span>
<span class="cb-out">readonly DB_HOST="\${DB_HOST:-localhost}"</span>
<span class="cb-out">readonly DB_PORT="\${DB_PORT:-5432}"</span>
<span class="cb-out">readonly LOG_LEVEL="\${LOG_LEVEL:-INFO}"</span>
<span class="cb-out">readonly MAX_RETRIES="\${MAX_RETRIES:-3}"</span>

<span class="cb-cmt">## ═══ PATTERN 2: VALIDATE REQUIRED VARIABLES ═════════════════</span>
check_required_vars() {
    local missing=false
    for var in DB_HOST DB_NAME API_KEY S3_BUCKET; do
        if [[ -z "\${!var:-}" ]]; then    <span class="cb-cmt"># \${!var} = indirection</span>
            echo "ERROR: Required variable not set: $var" >&2
            missing=true
        fi
    done
    [[ "$missing" == true ]] && exit 2
}

check_required_vars

<span class="cb-cmt">## ═══ PATTERN 3: ENVIRONMENT DETECTION ════════════════════════</span>
ENVIRONMENT="\${ENVIRONMENT:-development}"

case "$ENVIRONMENT" in
    production)
        DB_HOST="\${DB_HOST:-prod-db.cluster.internal}"
        LOG_LEVEL="\${LOG_LEVEL:-WARN}"
        ;;
    staging)
        DB_HOST="\${DB_HOST:-staging-db.internal}"
        LOG_LEVEL="\${LOG_LEVEL:-INFO}"
        ;;
    development|dev)
        DB_HOST="\${DB_HOST:-localhost}"
        LOG_LEVEL="\${LOG_LEVEL:-DEBUG}"
        ;;
    *)
        echo "Unknown ENVIRONMENT: $ENVIRONMENT" >&2; exit 1
        ;;
esac

<span class="cb-cmt">## ═══ PATTERN 4: SAFE TEMP FILES ══════════════════════════════</span>
<span class="cb-cmt"># Use PID + random for unique names</span>
TMPFILE=$(mktemp "/tmp/\${SCRIPT_NAME%.sh}_XXXXXX")
trap 'rm -f "$TMPFILE"' EXIT    <span class="cb-cmt"># always cleaned up</span>

<span class="cb-cmt"># Or manually with PID:</span>
TMPFILE="/tmp/\${SCRIPT_NAME%.sh}_$$.\${RANDOM}.tmp"
trap 'rm -f "$TMPFILE"' EXIT

<span class="cb-cmt">## ═══ PATTERN 5: CONFIG VIA ASSOC ARRAY ══════════════════════</span>
declare -A DB=(
    [host]="\${DB_HOST:-localhost}"
    [port]="\${DB_PORT:-5432}"
    [name]="\${DB_NAME:?DB_NAME required}"
    [user]="\${DB_USER:-pipeline}"
)

CONN_STRING="postgresql://\${DB[user]}@\${DB[host]}:\${DB[port]}/\${DB[name]}"
echo "Connecting to: $CONN_STRING"

<span class="cb-cmt">## ═══ PATTERN 6: NAMEREF FOR FUNCTION RETURN ═════════════════</span>
get_db_config() {
    local -n _result=$1       <span class="cb-cmt"># nameref: _result IS the caller's var</span>
    _result[host]="prod-db"
    _result[port]="5432"
    _result[name]="analytics"
}

declare -A MY_DB
get_db_config MY_DB          <span class="cb-cmt"># fills MY_DB without subshell</span>
echo "Host: \${MY_DB[host]}"
<span class="cb-out">Host: prod-db</span>

<span class="cb-cmt">## ═══ PATTERN 7: DYNAMIC VARIABLE NAMES ══════════════════════</span>
<span class="cb-cmt"># When you need variable names built from other values:</span>
ENVIRONMENTS=("dev" "staging" "prod")
for env in "\${ENVIRONMENTS[@]}"; do
    varname="DB_HOST_\${env^^}"     <span class="cb-cmt"># e.g. DB_HOST_DEV</span>
    declare "\${varname}=db-\${env}.internal"
done

<span class="cb-cmt"># Read them back with indirection:</span>
for env in "\${ENVIRONMENTS[@]}"; do
    varname="DB_HOST_\${env^^}"
    echo "\${env}: \${!varname}"
done
<span class="cb-out">dev: db-dev.internal</span>
<span class="cb-out">staging: db-staging.internal</span>
<span class="cb-out">prod: db-prod.internal</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 13 — COMPLETE QUICK REFERENCE
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Complete Quick Reference — All Variable Syntax</h2>

<div class="table-wrap">
<table class="ref-table">
<thead><tr><th style="width:28%">Syntax</th><th>What It Does</th><th style="width:32%">Example → Output</th></tr></thead>
<tbody>
<tr><td colspan="3" style="background:#1a2a1a;color:#3fb950;font-family:'Segoe UI',sans-serif;font-weight:bold;">Assignment</td></tr>
<tr><td style="font-family:monospace;">VAR=value</td><td>Assign string value</td><td><code>NAME="Ravi"</code></td></tr>
<tr><td style="font-family:monospace;">declare -i VAR=N</td><td>Integer variable</td><td><code>declare -i C=10</code></td></tr>
<tr><td style="font-family:monospace;">declare -r VAR=val</td><td>Read-only constant</td><td><code>declare -r MAX=100</code></td></tr>
<tr><td style="font-family:monospace;">readonly VAR=val</td><td>Same as declare -r</td><td><code>readonly PI=3.14</code></td></tr>
<tr><td style="font-family:monospace;">export VAR=val</td><td>Set + export to children</td><td><code>export PATH=...</code></td></tr>
<tr><td style="font-family:monospace;">local VAR=val</td><td>Function-local variable</td><td><code>local tmp="x"</code></td></tr>
<tr><td style="font-family:monospace;">unset VAR</td><td>Delete variable</td><td><code>unset DB_HOST</code></td></tr>

<tr><td colspan="3" style="background:#0e1824;color:#58a6ff;font-family:'Segoe UI',sans-serif;font-weight:bold;">Expansion</td></tr>
<tr><td style="font-family:monospace;">\${VAR}</td><td>Expand variable</td><td><code>\${NAME}s</code> → <code>Ravis</code></td></tr>
<tr><td style="font-family:monospace;">\${VAR:-def}</td><td>Default if unset/empty</td><td><code>\${HOST:-localhost}</code></td></tr>
<tr><td style="font-family:monospace;">\${VAR:=def}</td><td>Default + set variable</td><td><code>\${PORT:=5432}</code></td></tr>
<tr><td style="font-family:monospace;">\${VAR:?msg}</td><td>Error if unset</td><td><code>\${DB:?required}</code></td></tr>
<tr><td style="font-family:monospace;">\${VAR:+alt}</td><td>Alt value if set</td><td><code>\${V:+--verbose}</code></td></tr>
<tr><td style="font-family:monospace;">\${#VAR}</td><td>String length</td><td><code>\${#NAME}</code> → <code>4</code></td></tr>

<tr><td colspan="3" style="background:#1a1a3a;color:#bc8cff;font-family:'Segoe UI',sans-serif;font-weight:bold;">String Manipulation</td></tr>
<tr><td style="font-family:monospace;">\${VAR:N:L}</td><td>Substring pos N, len L</td><td><code>\${DATE:0:4}</code> → <code>2024</code></td></tr>
<tr><td style="font-family:monospace;">\${VAR: -N}</td><td>Last N characters</td><td><code>\${FILE: -4}</code> → <code>.csv</code></td></tr>
<tr><td style="font-family:monospace;">\${VAR^^}</td><td>UPPERCASE all</td><td><code>\${env^^}</code> → <code>PROD</code></td></tr>
<tr><td style="font-family:monospace;">\${VAR,,}</td><td>lowercase all</td><td><code>\${ENV,,}</code> → <code>prod</code></td></tr>
<tr><td style="font-family:monospace;">\${VAR^}</td><td>Capitalize first char</td><td><code>\${name^}</code> → <code>Ravi</code></td></tr>
<tr><td style="font-family:monospace;">\${VAR#pat}</td><td>Remove shortest prefix</td><td><code>\${F#*/}</code> → <code>data/f.csv</code></td></tr>
<tr><td style="font-family:monospace;">\${VAR##pat}</td><td>Remove longest prefix</td><td><code>\${F##*/}</code> → <code>f.csv</code></td></tr>
<tr><td style="font-family:monospace;">\${VAR%pat}</td><td>Remove shortest suffix</td><td><code>\${F%.gz}</code> → <code>f.csv</code></td></tr>
<tr><td style="font-family:monospace;">\${VAR%%pat}</td><td>Remove longest suffix</td><td><code>\${F%%.*}</code> → <code>file</code></td></tr>
<tr><td style="font-family:monospace;">\${VAR/p/r}</td><td>Replace first match</td><td><code>\${S/a/A}</code> → <code>Apple</code></td></tr>
<tr><td style="font-family:monospace;">\${VAR//p/r}</td><td>Replace all matches</td><td><code>\${S// /_}</code></td></tr>
<tr><td style="font-family:monospace;">\${!VAR}</td><td>Indirection (var-of-var)</td><td><code>\${!COLOR}</code> → value of $RED</td></tr>

<tr><td colspan="3" style="background:#2a2a1a;color:#ffa657;font-family:'Segoe UI',sans-serif;font-weight:bold;">Arrays</td></tr>
<tr><td style="font-family:monospace;">\${ARR[N]}</td><td>Element at index N</td><td><code>\${SERVERS[0]}</code></td></tr>
<tr><td style="font-family:monospace;">\${ARR[-1]}</td><td>Last element</td><td><code>\${FILES[-1]}</code></td></tr>
<tr><td style="font-family:monospace;">"\${ARR[@]}"</td><td>All elements (quoted)</td><td>loop over all</td></tr>
<tr><td style="font-family:monospace;">\${#ARR[@]}</td><td>Array length</td><td><code>\${#FILES[@]}</code> → <code>5</code></td></tr>
<tr><td style="font-family:monospace;">\${!ARR[@]}</td><td>All indices / keys</td><td><code>for i in "\${!A[@]}"</code></td></tr>
<tr><td style="font-family:monospace;">\${ARR[@]:N:L}</td><td>Slice N length L</td><td><code>\${A[@]:1:3}</code></td></tr>
<tr><td style="font-family:monospace;">ARR+=(val)</td><td>Append to array</td><td><code>SERVERS+=("new")</code></td></tr>
</tbody>
</table>
</div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 14 — EXERCISES
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Practice Exercises with Solutions</h2>

<div class="exercise-panel easy">
  <div class="ex-badge easy-badge">Easy</div>
  <div class="ex-body">
    <h4>Exercise 1 — Parameter Expansion Drill</h4>
    <p>Given: <code>FILEPATH="/home/ravi/data/reports/sales_2024-01-15.csv.gz"</code></p>
    <p>Using ONLY bash parameter expansion (no external commands), extract:</p>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Just the filename: <code>sales_2024-01-15.csv.gz</code> → <code>\${FILEPATH##*/}</code></li>
      <li>Directory only: <code>/home/ravi/data/reports</code> → <code>\${FILEPATH%/*}</code></li>
      <li>Remove .gz extension: <code>sales_2024-01-15.csv</code> → <code>\${FILEPATH%.gz}</code> then <code>##*/</code></li>
      <li>Remove ALL extensions: <code>sales_2024-01-15</code> → <code>\${FILEPATH%%.*}</code> after getting basename</li>
      <li>Get the date: <code>2024-01-15</code> → use substring or strip prefix/suffix</li>
      <li>Replace the year 2024 with 2025 in the filename</li>
      <li>Convert entire path to uppercase</li>
      <li>Get length of just the filename</li>
    </ol>
    <p><strong>Challenge:</strong> Do all 8 in one script, no forks, no subprocesses, no external commands.</p>
  </div>
</div>

<div class="exercise-panel easy">
  <div class="ex-badge easy-badge">Easy</div>
  <div class="ex-body">
    <h4>Exercise 2 — declare Types in Action</h4>
    <p>Write a script that demonstrates all <code>declare</code> types:</p>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Declare <code>-i COUNTER=0</code> and increment using <code>COUNTER=COUNTER+1</code> (no <code>$(( ))</code>) 5 times in a loop</li>
      <li>Declare <code>-r VERSION="1.0.0"</code> and try to change it — handle the error gracefully</li>
      <li>Declare <code>-l TAG</code> then set it to "PRODUCTION" — verify it stores as "production"</li>
      <li>Declare <code>-u SEVERITY</code> then set it to "warning" — verify it stores as "WARNING"</li>
      <li>Declare <code>-rx MAX_SIZE=1024</code> (readonly + exported) — verify with <code>declare -p</code></li>
      <li>Use <code>declare -n REF=COUNTER</code> to create a reference to COUNTER and modify it through the reference</li>
      <li>At the end, use <code>declare -p</code> to show all your variables with their attributes</li>
    </ol>
  </div>
</div>

<div class="exercise-panel medium">
  <div class="ex-badge medium-badge">Medium</div>
  <div class="ex-body">
    <h4>Exercise 3 — Scope Bug Hunt &amp; Fix</h4>
    <p>This script has a scope bug. Find it, explain why it happens, and fix it:</p>
    <pre style="background:#161b22;padding:12px;border-radius:6px;font-family:monospace;font-size:12px;color:#e6edf3;margin:10px 0;">#!/usr/bin/env bash
ENVIRONMENT="production"
DB_HOST="prod-db.internal"

configure_logging() {
    local ENVIRONMENT="development"  # for testing
    local LOG_DIR="/tmp/logs"
    mkdir -p "$LOG_DIR"
}

get_connection_string() {
    echo "postgresql://$DB_HOST/analytics_\${ENVIRONMENT}"
}

configure_logging
CONN=$(get_connection_string)
echo "Connecting to: $CONN"
# Expected: postgresql://prod-db.internal/analytics_production
# Actual:   postgresql://prod-db.internal/analytics_development</pre>
    <p>Explain: (1) Why is ENVIRONMENT "development" in get_connection_string? (2) Fix it properly. (3) Write a version using <code>local -r</code> to prevent the bug class entirely.</p>
  </div>
</div>

<div class="exercise-panel medium">
  <div class="ex-badge medium-badge">Medium</div>
  <div class="ex-body">
    <h4>Exercise 4 — Environment Config Loader</h4>
    <p>Write a complete <code>config_loader.sh</code> that:</p>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Accepts a <code>-e ENV</code> flag (dev/staging/prod) with getopts</li>
      <li>Loads <code>config/\${ENV}.env</code> file into variables (skip comments and blanks)</li>
      <li>For each variable loaded, validate it's not empty</li>
      <li>Stores all in an associative array <code>CONFIG</code></li>
      <li>Has a <code>get_config KEY</code> function that returns the value with a default</li>
      <li>Exports all CONFIG values as environment variables</li>
      <li>Prints a summary: "Loaded N variables for ENV environment"</li>
      <li>Uses <code>declare -p</code> at the end to show all loaded variables</li>
    </ol>
    <p>Create sample <code>config/dev.env</code> and <code>config/prod.env</code> files to test with.</p>
  </div>
</div>

<div class="exercise-panel hard">
  <div class="ex-badge hard-badge">Hard</div>
  <div class="ex-body">
    <h4>Exercise 5 — Complete Variable-Driven Pipeline</h4>
    <p>Build <code>pipeline.sh</code> — a fully variable-driven data pipeline script:</p>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li><strong>Constants:</strong> <code>declare -rx</code> for SCRIPT_DIR, TIMESTAMP, LOG_FILE, VERSION="1.0.0"</li>
      <li><strong>Config from env:</strong> All DB settings use <code>\${VAR:-default}</code> pattern; DB_NAME uses <code>\${VAR:?error}</code></li>
      <li><strong>Arguments:</strong> Accept <code>-d DATE -e ENV -v</code> with getopts; validate ENV using regex <code>=~</code></li>
      <li><strong>Validation function:</strong> Uses indirection <code>\${!var}</code> to check a list of required vars in a loop</li>
      <li><strong>Config assoc array:</strong> Build <code>declare -A DB_CONFIG</code> from validated vars</li>
      <li><strong>IFS parsing:</strong> Read a multi-field config line using custom IFS; split PATH-like string into array</li>
      <li><strong>String ops:</strong> Use <code>\${VAR^^}</code>, <code>\${VAR%.*}</code>, <code>\${VAR/old/new}</code> to build output paths</li>
      <li><strong>Scope:</strong> All functions use <code>local</code> correctly; one function returns value via nameref</li>
      <li><strong>Special vars:</strong> Log with <code>$LINENO</code>, time with <code>$SECONDS</code>, temp files with <code>$$</code></li>
      <li><strong>Cleanup:</strong> trap EXIT to unset sensitive vars (DB_PASSWORD, API_KEY)</li>
    </ol>
    <p><strong>The script must pass <code>shellcheck pipeline.sh</code> with zero warnings.</strong></p>
  </div>
</div>

<!-- Wrap-up story -->
<div class="story-panel" style="margin-top:32px;">
  <div class="story-avatar">🧑‍💻</div>
  <div class="story-body">
    <div class="story-title">Ravi's Deployment — Fixed for Good</div>
    <p>The next Friday, Ravi ran his deployment script again. This time, every function used <code>local</code> for its own variables. DEPLOY_ENV was declared <code>readonly</code> at the top — no function could accidentally shadow it. The database host was loaded from a validated <code>.env</code> file and checked with <code>\${DB_HOST:?DB_HOST not set}</code>. The script would refuse to run without it.</p>
    <p>His senior Priya looked at the new script. "Good. You have the mental model now." She pointed at three lines: <code>readonly</code>, <code>local</code>, and <code>export -p</code> at the end to verify what's in the environment. "These three lines," she said, "prevent the entire class of variable bugs."</p>
    <p>The deployment ran perfectly. Variables don't just store data — they define the boundary between what a function owns, what the script owns, and what the world can see.</p>
  </div>
</div>

</div><!-- /section-block -->
\`

`
};