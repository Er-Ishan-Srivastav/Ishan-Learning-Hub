

var conditionals = {
    title: "Conditionals — if / case",
    description: "Master every conditional form in Bash — if/elif/else, all test operators, [[ ]] vs [ ] vs (( )), case patterns, and short-circuit evaluation. Write scripts that make the right decisions every time.",
    content: `

<!-- ══════════════════════════════════════════════════════
     RAVI'S STORY — HOOK
══════════════════════════════════════════════════════ -->
<div class="story-panel">
  <div class="story-avatar">🧑‍💻</div>
  <div class="story-body">
    <div class="story-title">Ravi's Silent Failure — Day 128</div>
    <br>
    <p>Ravi's deployment script ran every night. Then one night the input file wasn't there — the upstream team had renamed it. The script ran anyway. It processed zero rows, wrote an empty output, and exited with code 0. Success. Everything downstream broke silently.</p>
    <br>
    <p>"Your script never asked any questions," Priya said. "Does the file exist? Is it non-empty? Is the environment right? Is the database reachable? A good script checks everything before it starts, not after it fails."</p>
    <br>
    <p>She showed him one fix: <code>if [[ ! -f "$INPUT_FILE" ]]; then echo "ERROR: file missing"; exit 1; fi</code>. "Three lines," she said. "That's the difference between a script that fails fast and one that fails quietly."</p>
    <br>
    <p>This module teaches the complete conditional system of Bash — from the simplest if/else to advanced case patterns and short-circuit idioms used in every production script.</p>
  </div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 1 — HOW CONDITIONS WORK: EXIT CODES
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> How Conditions Work — Exit Codes Are Everything</h2>

<p>In Bash, <strong>every command returns an exit code</strong>: <code>0</code> means success (true), any non-zero means failure (false). The <code>if</code> statement checks exit codes — not "true/false" values. This is the most important thing to understand about Bash conditionals.</p>

<!-- Exit code diagram SVG -->
<div class="diagram-wrap">
<svg viewBox="0 0 820 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto;">
  <defs>
    <marker id="arr-g" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#3fb950"/></marker>
    <marker id="arr-r" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#f85149"/></marker>
    <marker id="arr-b" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#58a6ff"/></marker>
    <marker id="arr-y" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#ffa657"/></marker>
  </defs>
  <rect width="820" height="200" fill="#0d1117" rx="12"/>
  <text x="410" y="24" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="13" font-weight="bold" fill="#8b949e">if Statement — Checks Exit Code of a Command</text>

  <!-- if block -->
  <rect x="20" y="44" width="780" height="140" rx="8" fill="#161b22" stroke="#30363d" stroke-width="1.5"/>
  <text x="40" y="66" font-family="'Courier New',monospace" font-size="13" fill="#bc8cff">if</text>
  <text x="72" y="66" font-family="'Courier New',monospace" font-size="13" fill="#ffa657">COMMAND</text>
  <text x="178" y="66" font-family="'Courier New',monospace" font-size="13" fill="#e6edf3">; then</text>

  <!-- exit 0 branch -->
  <rect x="40" y="80" width="180" height="36" rx="6" fill="#0f2d1f" stroke="#3fb950" stroke-width="1.5"/>
  <text x="130" y="97" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" fill="#3fb950">exit code = 0</text>
  <text x="130" y="110" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#3fb950">(success / true)</text>
  <line x1="130" y1="118" x2="130" y2="144" stroke="#3fb950" stroke-width="1.5" marker-end="url(#arr-g)"/>
  <rect x="40" y="146" width="180" height="28" rx="5" fill="#1a2a1a" stroke="#3fb950" stroke-width="1"/>
  <text x="130" y="164" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#3fb950">then-block runs</text>

  <!-- exit non-0 branch -->
  <rect x="260" y="80" width="200" height="36" rx="6" fill="#2a1a1a" stroke="#f85149" stroke-width="1.5"/>
  <text x="360" y="97" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" fill="#f85149">exit code ≠ 0</text>
  <text x="360" y="110" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#f85149">(failure / false)</text>
  <line x1="360" y1="118" x2="360" y2="144" stroke="#f85149" stroke-width="1.5" marker-end="url(#arr-r)"/>
  <rect x="260" y="146" width="200" height="28" rx="5" fill="#2a1a1a" stroke="#f85149" stroke-width="1"/>
  <text x="360" y="164" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#f85149">else/elif-block runs</text>

  <!-- Examples column -->
  <rect x="500" y="68" width="300" height="106" rx="6" fill="#0d1117" stroke="#30363d" stroke-width="1"/>
  <text x="510" y="86" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#8b949e">COMMAND can be:</text>
  <text x="510" y="104" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">[ -f file.csv ]</text>
  <text x="510" y="118" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">[[ $x == "yes" ]]</text>
  <text x="510" y="132" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">(( count > 0 ))</text>
  <text x="510" y="146" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">grep -q "error" log</text>
  <text x="510" y="160" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">python3 validate.py</text>
</svg>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Exit Codes — How if Really Works</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ─── EXIT CODES: THE FOUNDATION ──────────────────────────────</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">ls</span> /etc/hosts          <span class="cb-cmt"># file exists → exits 0</span>
<span class="cb-prompt">$</span> echo $?
<span class="cb-out">0</span>

<span class="cb-prompt">$</span> <span class="cb-cmd">ls</span> /nonexistent         <span class="cb-cmt"># doesn't exist → exits 2</span>
<span class="cb-prompt">$</span> echo $?
<span class="cb-out">2</span>

<span class="cb-prompt">$</span> <span class="cb-cmd">grep</span> -q "root" /etc/passwd   <span class="cb-cmt"># found → exits 0</span>
<span class="cb-prompt">$</span> echo $?
<span class="cb-out">0</span>

<span class="cb-prompt">$</span> <span class="cb-cmd">grep</span> -q "zzznope" /etc/passwd  <span class="cb-cmt"># not found → exits 1</span>
<span class="cb-prompt">$</span> echo $?
<span class="cb-out">1</span>

<span class="cb-cmt">## ─── if TESTS THE EXIT CODE OF ANY COMMAND ────────────────────</span>
if grep -q "ravi" /etc/passwd; then
    echo "User ravi exists"
fi
<span class="cb-out">User ravi exists</span>

<span class="cb-cmt"># if runs grep, checks its exit code:
# exit 0 → found → run then-block
# exit 1 → not found → skip</span>

<span class="cb-cmt">## ─── true AND false ARE COMMANDS ──────────────────────────────</span>
<span class="cb-prompt">$</span> true; echo $?
<span class="cb-out">0</span>
<span class="cb-prompt">$</span> false; echo $?
<span class="cb-out">1</span>

if true; then echo "always runs"; fi
<span class="cb-out">always runs</span>

if false; then echo "never"; else echo "always else"; fi
<span class="cb-out">always else</span>

<span class="cb-cmt">## ─── SCRIPT EXIT CODES ────────────────────────────────────────</span>
<span class="cb-cmt"># Use meaningful exit codes in your own scripts:</span>
exit 0    <span class="cb-cmt"># success</span>
exit 1    <span class="cb-cmt"># general error</span>
exit 2    <span class="cb-cmt"># bad arguments / misuse</span>
exit 3    <span class="cb-cmt"># file not found (custom)</span>
exit 4    <span class="cb-cmt"># db connection failed (custom)</span>
<span class="cb-cmt"># exit 126 = command not executable
# exit 127 = command not found
# exit 128+N = killed by signal N (e.g. 130 = Ctrl+C)</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 2 — if / elif / else SYNTAX
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> if / elif / else — Complete Syntax</h2>

<!-- if/elif/else flowchart SVG -->
<div class="diagram-wrap">
<svg viewBox="0 0 820 260" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="260" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">if / elif / else — Execution Flow</text>

  <!-- Start -->
  <ellipse cx="410" cy="46" rx="60" ry="18" fill="#161b22" stroke="#8b949e" stroke-width="1.5"/>
  <text x="410" y="51" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" fill="#e6edf3">Start</text>
  <line x1="410" y1="64" x2="410" y2="80" stroke="#8b949e" stroke-width="1.5" marker-end="url(#arr-b)"/>

  <!-- condition 1 diamond -->
  <polygon points="410,82 480,112 410,142 340,112" fill="#1a1a3a" stroke="#bc8cff" stroke-width="2"/>
  <text x="410" y="108" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#bc8cff">if COND1?</text>
  <text x="410" y="121" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#8b949e">exit code == 0?</text>

  <!-- yes → then block -->
  <line x1="410" y1="142" x2="410" y2="162" stroke="#3fb950" stroke-width="1.5" marker-end="url(#arr-g)"/>
  <text x="420" y="155" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">yes (0)</text>
  <rect x="330" y="164" width="160" height="30" rx="6" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.5"/>
  <text x="410" y="183" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#3fb950">then-block</text>
  <line x1="410" y1="194" x2="410" y2="240" stroke="#3fb950" stroke-width="1.5" marker-end="url(#arr-g)"/>

  <!-- no → elif diamond -->
  <line x1="480" y1="112" x2="570" y2="112" stroke="#f85149" stroke-width="1.5" marker-end="url(#arr-r)"/>
  <text x="524" y="106" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#f85149">no (≠0)</text>
  <polygon points="620,90 690,112 620,134 550,112" fill="#1a1a3a" stroke="#bc8cff" stroke-width="1.5"/>
  <text x="620" y="108" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#bc8cff">elif COND2?</text>
  <text x="620" y="119" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#8b949e">(optional)</text>

  <!-- elif yes → elif block -->
  <line x1="620" y1="134" x2="620" y2="164" stroke="#3fb950" stroke-width="1.5" marker-end="url(#arr-g)"/>
  <text x="630" y="152" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">yes</text>
  <rect x="548" y="164" width="145" height="30" rx="6" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.5"/>
  <text x="620" y="183" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#3fb950">elif-block</text>
  <line x1="620" y1="194" x2="620" y2="210" stroke="#3fb950" stroke-width="1"/>
  <line x1="620" y1="210" x2="410" y2="210" stroke="#3fb950" stroke-width="1"/>
  <line x1="410" y1="210" x2="410" y2="240" stroke="#3fb950" stroke-width="1"/>

  <!-- elif no → else block -->
  <line x1="690" y1="112" x2="740" y2="112" stroke="#f85149" stroke-width="1.5" marker-end="url(#arr-r)"/>
  <text x="715" y="106" font-family="'Segoe UI',sans-serif" font-size="9" fill="#f85149">no</text>
  <rect x="742" y="96" width="66" height="32" rx="6" fill="#1f2027" stroke="#8b949e" stroke-width="1.5"/>
  <text x="775" y="116" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">else-block</text>
  <line x1="775" y1="128" x2="775" y2="210" stroke="#8b949e" stroke-width="1"/>
  <line x1="775" y1="210" x2="410" y2="210" stroke="#8b949e" stroke-width="1"/>

  <!-- End -->
  <ellipse cx="410" cy="248" rx="60" ry="18" fill="#161b22" stroke="#8b949e" stroke-width="1.5"/>
  <text x="410" y="253" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" fill="#e6edf3">fi (end)</text>
</svg>
</div>

<!-- CONSOLE 1 -->
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 1 of 8 — if/elif/else: Syntax, Rules &amp; All Forms</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ BASIC if ════════════════════════════════════════════════</span>
if [[ -f /etc/hosts ]]; then
    echo "File exists"
fi

<span class="cb-cmt">## ═══ if / else ════════════════════════════════════════════════</span>
if [[ -f "$INPUT_FILE" ]]; then
    echo "Processing $INPUT_FILE"
else
    echo "ERROR: file not found" >&2
    exit 1
fi

<span class="cb-cmt">## ═══ if / elif / else (multiple conditions) ══════════════════</span>
if [[ "$ENVIRONMENT" == "production" ]]; then
    DB_HOST="prod-db.cluster.internal"
    LOG_LEVEL="WARN"
elif [[ "$ENVIRONMENT" == "staging" ]]; then
    DB_HOST="staging-db.internal"
    LOG_LEVEL="INFO"
elif [[ "$ENVIRONMENT" == "dev" ]]; then
    DB_HOST="localhost"
    LOG_LEVEL="DEBUG"
else
    echo "ERROR: Unknown environment: $ENVIRONMENT" >&2
    exit 2
fi
echo "Connecting to $DB_HOST"

<span class="cb-cmt">## ═══ SYNTAX RULES ════════════════════════════════════════════</span>
<span class="cb-cmt"># 1. 'then' can be on the same line as if (after semicolon):
if [[ cond ]]; then   # ← semicolon required before 'then'
#   or on next line:
if [[ cond ]]
then                  # ← no semicolon needed here

# 2. Closing 'fi' ends every if block
# 3. Multiple elif blocks allowed — no limit
# 4. else block is optional
# 5. Space INSIDE [ ] brackets is REQUIRED</span>

<span class="cb-cmt">## ═══ ONE-LINER if ═════════════════════════════════════════════</span>
if [[ -f data.csv ]]; then echo "Found"; fi

<span class="cb-cmt">## ═══ NEGATED CONDITION (!) ═══════════════════════════════════</span>
if [[ ! -f "$CONFIG_FILE" ]]; then
    echo "Config missing — creating default"
    cp /etc/default/myapp.conf "$CONFIG_FILE"
fi

<span class="cb-cmt">## ═══ NESTED if ════════════════════════════════════════════════</span>
if [[ -f "$FILE" ]]; then
    if [[ -s "$FILE" ]]; then          <span class="cb-cmt"># -s: non-empty</span>
        echo "File exists and has data"
    else
        echo "File exists but is empty"
    fi
else
    echo "File does not exist"
fi

<span class="cb-cmt">## ═══ if WITH ANY COMMAND ══════════════════════════════════════</span>
<span class="cb-cmt"># if works with ANY command that returns an exit code</span>
if grep -q "ERROR" app.log; then
    echo "Errors found in log!"
fi

if python3 -c "import pandas" 2>/dev/null; then
    echo "pandas available"
else
    echo "pandas not installed" >&2
    exit 1
fi

if ssh -q -o BatchMode=yes user@server exit 2>/dev/null; then
    echo "SSH connection OK"
fi

if psql -d analytics -c "SELECT 1" &>/dev/null; then
    echo "DB reachable"
fi
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 3 — [ ] vs [[ ]] vs (( ))
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> <code>[ ]</code> vs <code>[[ ]]</code> vs <code>(( ))</code> — Choosing the Right Test</h2>

<p>This is where most Bash beginners get confused. There are three ways to write conditions, and they behave differently. Understanding the difference prevents subtle bugs.</p>

<!-- Comparison SVG -->
<div class="diagram-wrap">
<svg viewBox="0 0 820 210" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="210" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">Test Constructs Compared — Pick the Right Tool</text>

  <!-- [ ] column -->
  <rect x="12" y="34" width="256" height="164" rx="8" fill="#1f2027" stroke="#ffa657" stroke-width="2"/>
  <text x="140" y="56" text-anchor="middle" font-family="'Courier New',monospace" font-size="15" font-weight="bold" fill="#ffa657">[ ]</text>
  <text x="140" y="72" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">POSIX test command</text>
  <line x1="22" y1="80" x2="258" y2="80" stroke="#30363d" stroke-width="1"/>
  <text x="26" y="97" font-family="'Segoe UI',sans-serif" font-size="11" fill="#3fb950">✅ Works in sh, dash, bash</text>
  <text x="26" y="113" font-family="'Segoe UI',sans-serif" font-size="11" fill="#3fb950">✅ POSIX portable</text>
  <text x="26" y="129" font-family="'Segoe UI',sans-serif" font-size="11" fill="#f85149">❌ No regex (=~)</text>
  <text x="26" y="145" font-family="'Segoe UI',sans-serif" font-size="11" fill="#f85149">❌ No glob patterns</text>
  <text x="26" y="161" font-family="'Segoe UI',sans-serif" font-size="11" fill="#f85149">❌ Must quote vars</text>
  <text x="26" y="177" font-family="'Segoe UI',sans-serif" font-size="11" fill="#f85149">❌ No &amp;&amp; || inside</text>
  <text x="140" y="194" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">Use: POSIX scripts only</text>

  <!-- [[ ]] column -->
  <rect x="282" y="34" width="256" height="164" rx="8" fill="#1a2a1a" stroke="#3fb950" stroke-width="2.5"/>
  <text x="410" y="56" text-anchor="middle" font-family="'Courier New',monospace" font-size="15" font-weight="bold" fill="#3fb950">[[ ]]</text>
  <text x="410" y="72" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Bash keyword (not a command)</text>
  <line x1="292" y1="80" x2="528" y2="80" stroke="#30363d" stroke-width="1"/>
  <text x="296" y="97" font-family="'Segoe UI',sans-serif" font-size="11" fill="#3fb950">✅ Bash/zsh (most systems)</text>
  <text x="296" y="113" font-family="'Segoe UI',sans-serif" font-size="11" fill="#3fb950">✅ Regex: =~ operator</text>
  <text x="296" y="129" font-family="'Segoe UI',sans-serif" font-size="11" fill="#3fb950">✅ Glob patterns: == *.csv</text>
  <text x="296" y="145" font-family="'Segoe UI',sans-serif" font-size="11" fill="#3fb950">✅ Safer: no word split</text>
  <text x="296" y="161" font-family="'Segoe UI',sans-serif" font-size="11" fill="#3fb950">✅ &amp;&amp; and || inside</text>
  <text x="296" y="177" font-family="'Segoe UI',sans-serif" font-size="11" fill="#3fb950">✅ No need to quote</text>
  <text x="410" y="194" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">Use: ALL bash scripts (recommended)</text>

  <!-- (( )) column -->
  <rect x="552" y="34" width="256" height="164" rx="8" fill="#1a1a3a" stroke="#bc8cff" stroke-width="2"/>
  <text x="680" y="56" text-anchor="middle" font-family="'Courier New',monospace" font-size="15" font-weight="bold" fill="#bc8cff">(( ))</text>
  <text x="680" y="72" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Arithmetic evaluation</text>
  <line x1="562" y1="80" x2="798" y2="80" stroke="#30363d" stroke-width="1"/>
  <text x="566" y="97" font-family="'Segoe UI',sans-serif" font-size="11" fill="#3fb950">✅ Numbers only</text>
  <text x="566" y="113" font-family="'Segoe UI',sans-serif" font-size="11" fill="#3fb950">✅ C-style: &gt; &lt; == != &gt;= &lt;=</text>
  <text x="566" y="129" font-family="'Segoe UI',sans-serif" font-size="11" fill="#3fb950">✅ No $ needed for vars</text>
  <text x="566" y="145" font-family="'Segoe UI',sans-serif" font-size="11" fill="#3fb950">✅ Arithmetic expressions</text>
  <text x="566" y="161" font-family="'Segoe UI',sans-serif" font-size="11" fill="#f85149">❌ Strings: not supported</text>
  <text x="566" y="177" font-family="'Segoe UI',sans-serif" font-size="11" fill="#f85149">❌ Not POSIX</text>
  <text x="680" y="194" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#bc8cff">Use: Number comparisons</text>
</svg>
</div>

<!-- CONSOLE 2 -->
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 2 of 8 — [ ] vs [[ ]] vs (( )): Side-by-Side Comparison</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ STRING COMPARISON ════════════════════════════════════════</span>
<span class="cb-cmt"># With [ ] (POSIX):</span>
if [ "$VAR" = "hello" ]; then echo "equal"; fi     <span class="cb-cmt"># use = not ==</span>
if [ "$VAR" != "world" ]; then echo "not equal"; fi
if [ -z "$VAR" ]; then echo "empty"; fi            <span class="cb-cmt"># -z: zero length</span>
if [ -n "$VAR" ]; then echo "non-empty"; fi        <span class="cb-cmt"># -n: non-zero</span>
<span class="cb-cmt"># MUST quote variables — unquoted $VAR with spaces causes errors</span>

<span class="cb-cmt"># With [[ ]] (bash — recommended):</span>
if [[ $VAR == "hello" ]]; then echo "equal"; fi    <span class="cb-cmt"># == or = both work</span>
if [[ $VAR != "world" ]]; then echo "not equal"; fi
if [[ -z $VAR ]]; then echo "empty"; fi            <span class="cb-cmt"># quotes optional</span>
if [[ $VAR == *.csv ]]; then echo "is CSV"; fi     <span class="cb-cmt"># glob pattern!</span>
if [[ $VAR =~ ^[0-9]+$ ]]; then echo "all digits"; fi  <span class="cb-cmt"># regex!</span>

<span class="cb-cmt">## ═══ NUMERIC COMPARISON ════════════════════════════════════════</span>
<span class="cb-cmt"># With [ ] — use -eq -ne -lt -gt -le -ge:</span>
if [ "$COUNT" -eq 0 ]; then echo "zero"; fi
if [ "$COUNT" -gt 100 ]; then echo "over 100"; fi

<span class="cb-cmt"># With [[ ]] — same operators:</span>
if [[ $COUNT -eq 0 ]]; then echo "zero"; fi
if [[ $COUNT -gt 100 ]]; then echo "over 100"; fi

<span class="cb-cmt"># With (( )) — C-style operators (cleanest for numbers):</span>
if (( COUNT == 0 )); then echo "zero"; fi
if (( COUNT > 100 )); then echo "over 100"; fi
if (( COUNT >= 10 && COUNT <= 100 )); then echo "in range"; fi
if (( COUNT % 2 == 0 )); then echo "even"; fi
<span class="cb-cmt"># Note: no $ needed inside (( )) for variables</span>

<span class="cb-cmt">## ═══ THE UNQUOTED VARIABLE BUG ([ ] specific) ════════════════</span>
FILE="my report.csv"

<span class="cb-cmt"># With [ ] — DANGEROUS if unquoted:</span>
if [ -f $FILE ]; then    <span class="cb-cmt"># ❌ BREAKS: becomes [ -f my report.csv ]</span>
                         <span class="cb-cmt">#    bash sees: -f my  AND  report.csv as extra args</span>
if [ -f "$FILE" ]; then  <span class="cb-cmt"># ✅ must quote in [ ]</span>

<span class="cb-cmt"># With [[ ]] — safe without quotes:</span>
if [[ -f $FILE ]]; then  <span class="cb-cmt"># ✅ [[ ]] doesn't word-split</span>
if [[ -f "$FILE" ]]; then  <span class="cb-cmt"># ✅ also fine quoted</span>

<span class="cb-cmt">## ═══ LOGICAL OPERATORS — KEY DIFFERENCE ══════════════════════</span>
<span class="cb-cmt"># In [ ] — use -a (AND) and -o (OR) INSIDE, or && || OUTSIDE:</span>
if [ -f "$FILE" -a -s "$FILE" ]; then   <span class="cb-cmt"># -a inside [ ]</span>
if [ -f "$FILE" ] && [ -s "$FILE" ]; then  <span class="cb-cmt"># && outside (safer)</span>

<span class="cb-cmt"># In [[ ]] — use && and || directly inside:</span>
if [[ -f $FILE && -s $FILE ]]; then     <span class="cb-cmt"># ✅ && inside [[ ]]</span>
if [[ -f $FILE || -L $FILE ]]; then     <span class="cb-cmt"># ✅ || inside [[ ]]</span>

<span class="cb-cmt">## ═══ REGEX WITH =~ ════════════════════════════════════════════</span>
EMAIL="ravi@data.io"
if [[ $EMAIL =~ ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$ ]]; then
    echo "Valid email: $EMAIL"
fi

DATE="2024-01-15"
if [[ $DATE =~ ^[0-9]{4}-[0-9]{2}-[0-9]{2}$ ]]; then
    echo "Valid ISO date"
fi

PORT="5432"
if [[ $PORT =~ ^[0-9]+$ ]]; then
    echo "Port is numeric"
fi

<span class="cb-cmt"># Capture regex groups with BASH_REMATCH:
VERSION="v2.14.3"
if [[ $VERSION =~ ^v([0-9]+)\.([0-9]+)\.([0-9]+)$ ]]; then
    echo "Major: \${BASH_REMATCH[1]}"  <span class="cb-cmt"># 2</span>
    echo "Minor: \${BASH_REMATCH[2]}"  <span class="cb-cmt"># 14</span>
    echo "Patch: \${BASH_REMATCH[3]}"  <span class="cb-cmt"># 3</span>
fi</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 4 — STRING TEST OPERATORS
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> String Test Operators — Every Form</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="200" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">String Test Operators — When to Use Each</text>
  <rect x="15" y="36" width="186" height="72" rx="7" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.5"/>
  <text x="108" y="58" text-anchor="middle" font-family="'Courier New',monospace" font-size="14" font-weight="bold" fill="#3fb950">-z  /  -n</text>
  <text x="108" y="76" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">-z = zero length (empty)</text>
  <text x="108" y="92" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">-n = non-zero (has value)</text>
  <text x="108" y="104" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">[[ -z $VAR ]]</text>
  <rect x="212" y="36" width="186" height="72" rx="7" fill="#0e1824" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="305" y="58" text-anchor="middle" font-family="'Courier New',monospace" font-size="14" font-weight="bold" fill="#58a6ff">==  /  !=</text>
  <text x="305" y="76" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">exact match or glob on right</text>
  <text x="305" y="92" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">quotes prevent glob expansion</text>
  <text x="305" y="104" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#58a6ff">[[ $F == *.csv ]]</text>
  <rect x="409" y="36" width="186" height="72" rx="7" fill="#1a1a3a" stroke="#bc8cff" stroke-width="2"/>
  <text x="502" y="58" text-anchor="middle" font-family="'Courier New',monospace" font-size="14" font-weight="bold" fill="#bc8cff">=~</text>
  <text x="502" y="76" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">POSIX ERE regex match</text>
  <text x="502" y="92" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">BASH_REMATCH captures groups</text>
  <text x="502" y="104" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#bc8cff">[[ $S =~ ^[0-9]+$ ]]</text>
  <rect x="606" y="36" width="199" height="72" rx="7" fill="#2a2a1a" stroke="#ffa657" stroke-width="1.5"/>
  <text x="705" y="58" text-anchor="middle" font-family="'Courier New',monospace" font-size="14" font-weight="bold" fill="#ffa657">&lt;  /  &gt;</text>
  <text x="705" y="76" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">lexicographic (alphabet) order</text>
  <text x="705" y="92" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#f85149">&#x26A0; NOT numeric — "9" &gt; "10"!</text>
  <text x="705" y="104" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">[[ $A &lt; $B ]]</text>
  <rect x="15" y="120" width="380" height="68" rx="7" fill="#161b22" stroke="#3fb950" stroke-width="1.5"/>
  <text x="30" y="140" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#3fb950">Glob  (in ==):</text>
  <text x="30" y="158" font-family="'Courier New',monospace" font-size="11" fill="#e6edf3">*  ?  [abc]  [a-z]</text>
  <text x="30" y="176" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Pattern on RIGHT side only — NO quotes around pattern</text>
  <rect x="406" y="120" width="399" height="68" rx="7" fill="#161b22" stroke="#bc8cff" stroke-width="1.5"/>
  <text x="420" y="140" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#bc8cff">Regex  (in =~):</text>
  <text x="420" y="158" font-family="'Courier New',monospace" font-size="11" fill="#e6edf3">^  $  .  +  *  ?  {n}  [abc]  (grp)</text>
  <text x="420" y="176" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">POSIX ERE — more powerful — NO quotes around pattern</text>
</svg>
<p class="diagram-caption">String operators in <code>[[ ]]</code> — use <code>==</code> with glob patterns, <code>=~</code> for regex, <code>-z</code>/<code>-n</code> for empty checks. Never use <code>&lt;</code> or <code>&gt;</code> for numeric comparisons.</p>
</div>






<!-- CONSOLE 3 -->






<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 3 of 8 — String Tests: All Operators with Examples</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ EQUALITY & COMPARISON ═══════════════════════════════════</span>
[[ $A == $B ]]      <span class="cb-cmt"># equal strings (also: =)</span>
[[ $A != $B ]]      <span class="cb-cmt"># not equal</span>
[[ $A < $B ]]       <span class="cb-cmt"># A before B alphabetically (lexicographic)</span>
[[ $A > $B ]]       <span class="cb-cmt"># A after B alphabetically</span>
<span class="cb-cmt"># Note: < and > in [ ] must be escaped: \< \>
# In [[ ]] they're fine without escaping</span>

<span class="cb-cmt">## ═══ EMPTY / NON-EMPTY ════════════════════════════════════════</span>
[[ -z $STR ]]       <span class="cb-cmt"># zero length (empty string or unset)</span>
[[ -n $STR ]]       <span class="cb-cmt"># non-zero length (has at least one char)</span>

<span class="cb-cmt"># Practical examples:</span>
NAME=""
if [[ -z $NAME ]]; then
    echo "Name is required" >&2; exit 1
fi

if [[ -n \${DB_PASSWORD:-} ]]; then     <span class="cb-cmt"># check without triggering -u error</span>
    echo "Password set"
fi

<span class="cb-cmt">## ═══ GLOB PATTERN MATCHING ════════════════════════════════════</span>
FILE="sales_report_2024.csv"

[[ $FILE == *.csv ]]        <span class="cb-cmt"># ends with .csv → true</span>
[[ $FILE == sales_* ]]      <span class="cb-cmt"># starts with sales_ → true</span>
[[ $FILE == *report* ]]     <span class="cb-cmt"># contains report → true</span>
[[ $FILE == *.gz ]]         <span class="cb-cmt"># ends with .gz → false</span>
[[ $FILE != *.gz ]]         <span class="cb-cmt"># does NOT end with .gz → true</span>

<span class="cb-cmt"># IMPORTANT: pattern (right side of ==) must NOT be quoted
# [[ $FILE == "*.csv" ]] → looks for literal string "*.csv"
# [[ $FILE == *.csv  ]] → glob pattern match ✅</span>

<span class="cb-cmt"># Multiple extensions check:</span>
if [[ $FILE == *.csv || $FILE == *.tsv || $FILE == *.txt ]]; then
    echo "Supported format"
fi

<span class="cb-cmt">## ═══ REGEX MATCHING =~ ════════════════════════════════════════</span>
<span class="cb-cmt"># Right side is POSIX Extended Regular Expression (ERE)
# No quotes around pattern (same as glob rule)</span>

[[ $STR =~ ^[0-9]+$ ]]          <span class="cb-cmt"># all digits</span>
[[ $STR =~ ^[a-z_][a-z0-9_]*$ ]] <span class="cb-cmt"># valid identifier</span>
[[ $IP =~ ^([0-9]{1,3}\.){3}[0-9]{1,3}$ ]] <span class="cb-cmt"># IPv4 address</span>
[[ $DATE =~ ^20[0-9]{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$ ]]

<span class="cb-cmt"># Store pattern in variable for readability:</span>
INT_PATTERN='^-?[0-9]+$'
FLOAT_PATTERN='^-?[0-9]+(\.[0-9]+)?$'
ISO_DATE='^[0-9]{4}-[0-9]{2}-[0-9]{2}$'

if [[ $INPUT =~ $INT_PATTERN ]]; then
    echo "$INPUT is an integer"
fi

<span class="cb-cmt">## ═══ PRACTICAL: VALIDATE INPUTS ══════════════════════════════</span>
validate_input() {
    local DATE="$1" ENV="$2" PORT="$3"

    [[ $DATE =~ ^[0-9]{4}-[0-9]{2}-[0-9]{2}$ ]] || {
        echo "ERROR: Invalid date: $DATE (expected YYYY-MM-DD)" >&2
        return 1
    }
    [[ $ENV =~ ^(dev|staging|prod)$ ]] || {
        echo "ERROR: Invalid env: $ENV" >&2
        return 1
    }
    [[ $PORT =~ ^[0-9]+$ ]] && (( PORT >= 1 && PORT <= 65535 )) || {
        echo "ERROR: Invalid port: $PORT" >&2
        return 1
    }
    return 0
}
</pre></div></div>
</div>


<!-- ══════════════════════════════════════════════════════
     NEW SECTION: -v, extglob, multi-line, portable
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Numeric Test Operators — All Forms &amp; Pitfalls</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 190" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="190" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">Numeric Comparison — Three Forms &amp; The String Pitfall</text>
  <rect x="15" y="36" width="240" height="100" rx="8" fill="#1f2027" stroke="#ffa657" stroke-width="1.5"/>
  <text x="135" y="56" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#ffa657">[ ] POSIX flags</text>
  <text x="30" y="76" font-family="'Courier New',monospace" font-size="11" fill="#e6edf3">[ "$A" -eq "$B" ]</text>
  <text x="30" y="94" font-family="'Courier New',monospace" font-size="11" fill="#e6edf3">[ "$A" -lt "$B" ]</text>
  <text x="30" y="112" font-family="'Courier New',monospace" font-size="11" fill="#e6edf3">[ "$A" -ge "$B" ]</text>
  <text x="135" y="130" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">POSIX portable — must quote vars</text>
  <rect x="290" y="36" width="240" height="100" rx="8" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.5"/>
  <text x="410" y="56" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#3fb950">[[ ]] bash flags</text>
  <text x="305" y="76" font-family="'Courier New',monospace" font-size="11" fill="#e6edf3">[[ $A -eq $B ]]</text>
  <text x="305" y="94" font-family="'Courier New',monospace" font-size="11" fill="#e6edf3">[[ $A -lt $B ]]</text>
  <text x="305" y="112" font-family="'Courier New',monospace" font-size="11" fill="#e6edf3">[[ $A -ge $B ]]</text>
  <text x="410" y="130" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">bash — quotes optional here</text>
  <rect x="565" y="36" width="240" height="100" rx="8" fill="#1a1a3a" stroke="#bc8cff" stroke-width="2"/>
  <text x="685" y="56" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#bc8cff">(( )) arithmetic</text>
  <text x="580" y="76" font-family="'Courier New',monospace" font-size="11" fill="#e6edf3">(( A == B ))</text>
  <text x="580" y="94" font-family="'Courier New',monospace" font-size="11" fill="#e6edf3">(( A &lt;  B  ))</text>
  <text x="580" y="112" font-family="'Courier New',monospace" font-size="11" fill="#e6edf3">(( A >= B ))</text>
  <text x="685" y="130" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#bc8cff">cleanest — C-style, no $ needed</text>
  <rect x="15" y="148" width="790" height="34" rx="6" fill="#2a1a1a" stroke="#f85149" stroke-width="2"/>
  <text x="30" y="162" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#f85149">&#x26A0; The String Pitfall:</text>
  <text x="185" y="162" font-family="'Courier New',monospace" font-size="11" fill="#e6edf3">A="9"  B="10"  →  [[ $A &gt; $B ]]</text>
  <text x="460" y="162" font-family="'Segoe UI',sans-serif" font-size="11" fill="#f85149">is TRUE  (lexicographic: "9" comes after "10")</text>
  <text x="30" y="177" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Fix: use  -gt  or  (( A &gt; B ))  for numbers. Never use &gt; or &lt; with numbers in [[ ]].</text>
</svg>
<p class="diagram-caption">Choose the right comparison form. The C-style <code>(( ))</code> is cleanest for numbers. Never use <code>&gt;</code>/<code>&lt;</code> inside <code>[[ ]]</code> for numeric comparison — it does lexicographic ordering.</p>
</div>

<!-- CONSOLE 4 -->
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 4 of 8 — Numeric Tests: Every Operator, Pitfalls &amp; Float Handling</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ [[ ]] / [ ] INTEGER OPERATORS ══════════════════════════</span>
[[ $A -eq $B ]]   <span class="cb-cmt"># equal</span>
[[ $A -ne $B ]]   <span class="cb-cmt"># not equal</span>
[[ $A -lt $B ]]   <span class="cb-cmt"># less than</span>
[[ $A -le $B ]]   <span class="cb-cmt"># less than or equal</span>
[[ $A -gt $B ]]   <span class="cb-cmt"># greater than</span>
[[ $A -ge $B ]]   <span class="cb-cmt"># greater than or equal</span>

<span class="cb-cmt">## ═══ (( )) ARITHMETIC — CLEANEST FOR NUMBERS ═════════════════</span>
(( A == B ))      <span class="cb-cmt"># equal (C-style, no $ needed)</span>
(( A != B ))      <span class="cb-cmt"># not equal</span>
(( A &lt; B ))       <span class="cb-cmt"># less than</span>
(( A &lt;= B ))      <span class="cb-cmt"># less or equal</span>
(( A &gt; B ))       <span class="cb-cmt"># greater than</span>
(( A &gt;= B ))      <span class="cb-cmt"># greater or equal</span>
(( A &gt; 0 &amp;&amp; A &lt; 100 ))   <span class="cb-cmt"># range check</span>
(( A % 2 == 0 ))         <span class="cb-cmt"># modulo — even number</span>

<span class="cb-cmt">## ═══ TRUTHY / FALSY IN (( )) ══════════════════════════════════</span>
<span class="cb-cmt"># (( )) exit code: 0 if expression NON-ZERO, 1 if ZERO</span>
(( 1 ))     <span class="cb-cmt"># exit 0 = true</span>
(( 0 ))     <span class="cb-cmt"># exit 1 = false</span>
COUNT=5
(( COUNT ))          <span class="cb-cmt"># exit 0 = true (5 is non-zero)</span>
(( COUNT - 5 ))      <span class="cb-cmt"># exit 1 = false (5-5=0)</span>

<span class="cb-cmt">## ═══ THE STRING-VS-INTEGER PITFALL ═══════════════════════════</span>
A="9"; B="10"
[[ $A &gt; $B ]] &amp;&amp; echo "9 &gt; 10"   <span class="cb-cmt"># PRINTS! "9" > "10" lexicographically!</span>
[[ $A -gt $B ]] &amp;&amp; echo "9 &gt; 10" <span class="cb-cmt"># silent — numeric comparison</span>
(( A &gt; B ))    &amp;&amp; echo "9 &gt; 10"  <span class="cb-cmt"># silent — numeric</span>

<span class="cb-cmt">## ═══ CHECK IF A STRING IS ACTUALLY NUMERIC ════════════════════</span>
is_integer() { [[ $1 =~ ^-?[0-9]+$ ]]; }
is_float()   { [[ $1 =~ ^-?[0-9]+(\.[0-9]+)?$ ]]; }

if is_integer "$INPUT"; then
    (( INPUT &gt; 100 )) &amp;&amp; echo "&gt; 100"
else
    echo "ERROR: expected integer" &gt;&amp;2; exit 1
fi

<span class="cb-cmt">## ═══ FLOAT COMPARISON — bc AND python3 ══════════════════════</span>
RATIO="0.87"
if (( $(echo "$RATIO &gt; 0.80" | bc -l) )); then echo "above threshold"; fi
if python3 -c "import sys; sys.exit(0 if float('$RATIO') &gt; 0.80 else 1)"; then
    echo "Ratio OK"
fi

<span class="cb-cmt">## ═══ PRACTICAL: DISK / SIZE CHECKS ══════════════════════════</span>
FREE_MB=$(df /data --output=avail -m | tail -1)
if (( FREE_MB &lt; 500 )); then
    echo "CRITICAL: only \${FREE_MB}MB free" &gt;&amp;2; exit 1
fi
</pre></div></div>
</div>


<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Advanced Test Techniques — <code>-v</code>, extglob, Multi-line &amp; Portable Patterns</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 190" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="190" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">extglob Patterns (shopt -s extglob) — Extended Glob Reference</text>

  <!-- 5 pattern boxes -->
  <rect x="12" y="36" width="152" height="110" rx="7" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="88" y="58" text-anchor="middle" font-family="'Courier New',monospace" font-size="16" font-weight="bold" fill="#3fb950">?(pat)</text>
  <text x="88" y="76" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">zero or ONE match</text>
  <text x="88" y="94" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">col?(o)ur</text>
  <text x="88" y="110" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">matches: colour colur</text>
  <text x="88" y="138" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">optional element</text>

  <rect x="173" y="36" width="152" height="110" rx="7" fill="#0e1824" stroke="#58a6ff" stroke-width="2"/>
  <text x="249" y="58" text-anchor="middle" font-family="'Courier New',monospace" font-size="16" font-weight="bold" fill="#58a6ff">*(pat)</text>
  <text x="249" y="76" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">zero or MORE matches</text>
  <text x="249" y="94" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">*(a)</text>
  <text x="249" y="110" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#58a6ff">matches: "" a aa aaa</text>
  <text x="249" y="138" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">like regex *</text>

  <rect x="334" y="36" width="152" height="110" rx="7" fill="#1a1a3a" stroke="#bc8cff" stroke-width="2"/>
  <text x="410" y="58" text-anchor="middle" font-family="'Courier New',monospace" font-size="16" font-weight="bold" fill="#bc8cff">+(pat)</text>
  <text x="410" y="76" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">ONE or more matches</text>
  <text x="410" y="94" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">+([0-9])</text>
  <text x="410" y="110" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#bc8cff">matches: 1 42 1234</text>
  <text x="410" y="138" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">like regex +</text>

  <rect x="495" y="36" width="152" height="110" rx="7" fill="#2a2a1a" stroke="#ffa657" stroke-width="2"/>
  <text x="571" y="58" text-anchor="middle" font-family="'Courier New',monospace" font-size="16" font-weight="bold" fill="#ffa657">@(p1|p2)</text>
  <text x="571" y="76" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">EXACTLY one alternative</text>
  <text x="571" y="94" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">@(csv|tsv)</text>
  <text x="571" y="110" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">matches: csv  tsv</text>
  <text x="571" y="138" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">like regex (a|b)</text>

  <rect x="656" y="36" width="152" height="110" rx="7" fill="#2a1a1a" stroke="#f85149" stroke-width="2"/>
  <text x="732" y="58" text-anchor="middle" font-family="'Courier New',monospace" font-size="16" font-weight="bold" fill="#f85149">!(pat)</text>
  <text x="732" y="76" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">anything EXCEPT pat</text>
  <text x="732" y="94" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">!(*csv*)</text>
  <text x="732" y="110" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#f85149">matches: anything not CSV</text>
  <text x="732" y="138" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">negation / exclusion</text>

  <!-- Example row -->
  <rect x="12" y="157" width="796" height="26" rx="5" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="25" y="174" font-family="'Courier New',monospace" font-size="11" fill="#ffa657">[[ "$FILE" == *.@(csv|tsv|txt).@(gz|bz2) ]]</text>
  <text x="430" y="174" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">matches: data.csv.gz  report.tsv.bz2  (compressed data files)</text>
</svg>
<p class="diagram-caption">Enable with <code>shopt -s extglob</code>. Use in <code>[[ $VAR == PATTERN ]]</code> and <code>case</code> statements. The <code>@(csv|tsv)</code> pattern is the most useful — matches one of several extensions cleanly.</p>



</div>





<!-- extglob pattern reference visual -->





<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">-v Variable-Set Test, extglob Patterns, Multi-line Conditions, Portability</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ -v: TEST IF VARIABLE IS SET ════════════════════════════</span>
<span class="cb-cmt"># -v tests whether a variable NAME exists at all (even if empty)
# Different from -z (which tests if the VALUE is empty)</span>

declare EMPTY_VAR=""
unset UNSET_VAR

[[ -v EMPTY_VAR  ]] && echo "EMPTY_VAR is set (even though empty)"
[[ -v UNSET_VAR  ]] || echo "UNSET_VAR is NOT set"
[[ -v PATH       ]] && echo "PATH is set"

<span class="cb-cmt"># -v vs -z vs -n — the three-way distinction:</span>
<span class="cb-cmt"># -v VAR   → true if VAR exists as a variable name (set or empty)</span>
<span class="cb-cmt"># -z "$V"  → true if value is empty (includes unset if no set -u)</span>
<span class="cb-cmt"># -n "$V"  → true if value is non-empty</span>

<span class="cb-cmt"># Safe config check pattern (works even with set -u):</span>
if [[ -v DB_PASSWORD ]]; then
    echo "Password configured"
else
    echo "DB_PASSWORD not set — will prompt"
fi
<span class="cb-cmt"># Without -v, [[ -n $DB_PASSWORD ]] would fail with set -u if unset</span>

<span class="cb-cmt"># Check array element exists:</span>
declare -A CONFIG=([host]="localhost")
[[ -v CONFIG[host] ]] && echo "host key exists in CONFIG"
[[ -v CONFIG[port] ]] || echo "port key missing in CONFIG"

<span class="cb-cmt">## ═══ EXTGLOB — EXTENDED GLOB PATTERNS IN [[ ]] ═══════════════</span>
<span class="cb-cmt"># Enable: shopt -s extglob
# Extglob patterns (only in [[ ]] and case, and pathname expansion):</span>
shopt -s extglob

<span class="cb-cmt"># ?(pattern)  = zero or one match</span>
[[ "colour" == col?(o)ur ]] && echo "matches colour or colur"

<span class="cb-cmt"># *(pattern)  = zero or more matches</span>
[[ "aaa" == *(a) ]]         && echo "matches any number of a's"

<span class="cb-cmt"># +(pattern)  = one or more matches</span>
[[ "abc123" == +([a-z])+([0-9]) ]] && echo "letters then digits"

<span class="cb-cmt"># @(pat1|pat2) = exactly one of the alternatives</span>
FILE="report.csv"
[[ $FILE == @(*.csv|*.tsv|*.txt) ]] && echo "text data file"

<span class="cb-cmt"># !(pattern)  = anything EXCEPT this pattern</span>
[[ "report.pdf" == !(*csv*) ]]      && echo "not a CSV file"
[[ "data.csv"   == !(*csv*) ]]      || echo "IS a CSV file"

<span class="cb-cmt"># Practical: match compressed data files</span>
[[ $FILE == *.@(csv|tsv|txt).@(gz|bz2|xz) ]] && echo "compressed data"

<span class="cb-cmt"># In case statements (extglob works naturally in case):</span>
case "$FILE" in
    *.@(csv|tsv))   echo "Delimited text" ;;
    *.@(gz|bz2|xz)) echo "Compressed" ;;
    !(*.*))         echo "No extension" ;;
esac

<span class="cb-cmt">## ═══ MULTI-LINE CONDITIONS ════════════════════════════════════</span>
<span class="cb-cmt"># Long conditions can be split across lines for readability</span>

<span class="cb-cmt"># Method 1: backslash line continuation</span>
if [[ -f "$INPUT_FILE" ]] && \
   [[ -s "$INPUT_FILE" ]] && \
   [[ -r "$INPUT_FILE" ]] && \
   (( $(wc -l < "$INPUT_FILE") > 100 )); then
    echo "Input file is valid"
fi

<span class="cb-cmt"># Method 2: inside [[ ]] with &&/||</span>
if [[   -f $INPUT_FILE  \
     && -s $INPUT_FILE  \
     && $ENVIRONMENT =~ ^(dev|staging|prod)$  \
     && -n $DB_HOST ]]; then
    echo "All good"
fi

<span class="cb-cmt"># Method 3: intermediate variables (most readable)</span>
input_ok=false
env_ok=false
db_ok=false

[[ -f $INPUT_FILE && -s $INPUT_FILE ]] && input_ok=true
[[ $ENVIRONMENT =~ ^(dev|staging|prod)$ ]] && env_ok=true
psql -d analytics -c "SELECT 1" &>/dev/null && db_ok=true

if [[ $input_ok == true && $env_ok == true && $db_ok == true ]]; then
    echo "All preconditions met — starting pipeline"
fi

<span class="cb-cmt">## ═══ PORTABLE PATTERNS (works in sh AND bash) ═════════════════</span>
<span class="cb-cmt"># When your shebang is #!/bin/sh (dash, busybox sh, POSIX sh):</span>

<span class="cb-cmt"># String tests — use [ ] with = (not ==):</span>
if [ "$ENV" = "production" ]; then echo "prod"; fi
if [ "$ENV" != "dev" ]; then echo "not dev"; fi
if [ -z "$VAR" ]; then echo "empty"; fi

<span class="cb-cmt"># Numeric tests — same operators work in [ ]:</span>
if [ "$COUNT" -gt 0 ] && [ "$COUNT" -lt 100 ]; then echo "in range"; fi

<span class="cb-cmt"># File tests — same as bash:</span>
if [ -f "$FILE" ] && [ -s "$FILE" ]; then echo "valid file"; fi

<span class="cb-cmt"># AVOID in portable scripts:
# [[ ]]         → bash only (not POSIX sh)
# (( ))         → bash only
# == in [ ]     → bash extension, use = in POSIX
# =~ regex      → bash only
# < > inside [] → must escape: [ "$a" \< "$b" ]
# && inside []  → use -a (POSIX) or separate [ ] tests with &&</span>

<span class="cb-cmt"># Portable AND in one test (use -a, though && is safer and clearer):</span>
if [ -f "$F" -a -s "$F" ]; then echo "exists and non-empty"; fi
<span class="cb-cmt"># Preferred portable form:</span>
if [ -f "$F" ] && [ -s "$F" ]; then echo "exists and non-empty"; fi
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     NEW SECTION: set -e INTERACTION
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Conditionals &amp; <code>set -e</code> — Strict Mode Interaction</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 180" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="180" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">set -e Interaction — Which Failures Trigger Script Exit</text>

  <!-- SAFE column -->
  <rect x="15" y="36" width="380" height="132" rx="8" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="205" y="56" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#3fb950">✅ SAFE — set -e ignores failure here</text>
  <text x="30" y="76" font-family="'Courier New',monospace" font-size="11" fill="#e6edf3">if grep -q "x" file; then ...    </text>
  <text x="30" y="93" font-family="'Courier New',monospace" font-size="11" fill="#e6edf3">while read line; do ...          </text>
  <text x="30" y="110" font-family="'Courier New',monospace" font-size="11" fill="#e6edf3">cmd || true                      </text>
  <text x="30" y="127" font-family="'Courier New',monospace" font-size="11" fill="#e6edf3">cmd1 && cmd2                     </text>
  <text x="30" y="144" font-family="'Courier New',monospace" font-size="11" fill="#e6edf3">cmd || handle_error               </text>
  <text x="205" y="161" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">in conditional context → failure expected → ok</text>

  <!-- DANGER column -->
  <rect x="425" y="36" width="380" height="132" rx="8" fill="#2a1a1a" stroke="#f85149" stroke-width="2"/>
  <text x="615" y="56" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#f85149">❌ DANGER — set -e exits script</text>
  <text x="440" y="76" font-family="'Courier New',monospace" font-size="11" fill="#e6edf3">grep -q "x" file            </text>
  <text x="440" y="93" font-family="'Courier New',monospace" font-size="11" fill="#e6edf3">python3 script.py           </text>
  <text x="440" y="110" font-family="'Courier New',monospace" font-size="11" fill="#e6edf3">(( COUNT-- ))  ← COUNT was 0!</text>
  <text x="440" y="127" font-family="'Courier New',monospace" font-size="11" fill="#e6edf3">false                       </text>
  <text x="440" y="144" font-family="'Courier New',monospace" font-size="11" fill="#e6edf3">[ -f missing_file ]         </text>
  <text x="615" y="161" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#f85149">standalone (not in conditional) → exit 1 → script dies</text>
</svg>
<p class="diagram-caption">With <code>set -e</code>: commands in <code>if</code>/<code>while</code>/<code>until</code> conditions or after <code>&amp;&amp;</code>/<code>||</code> are exempt — their failures are expected. Commands on their own line are NOT exempt. The <code>(( expr == 0 ))</code> gotcha is the most common silent killer.</p>
</div>


<p>One of the most common sources of bugs in production scripts is the interaction between <code>set -e</code> (exit on error) and conditionals. Understanding the rules prevents mysterious script exits.</p>
















<!-- set -e interaction visual -->



<!-- Numeric comparison visual — string vs integer pitfall -->



<!-- String operator visual map -->



<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">set -e Interaction — When Failing Conditions Exit the Script</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ THE RULE: set -e IGNORES FAILURES IN CONDITIONALS ═══════</span>
set -e

<span class="cb-cmt"># These do NOT trigger set -e (they're in conditional context):</span>
if grep -q "error" file.txt; then echo "found"; fi   <span class="cb-cmt"># grep failing = ok</span>
[[ -f missing.txt ]] && echo "exists"                <span class="cb-cmt"># false = ok</span>
false && echo "never"                                <span class="cb-cmt"># false = ok in && chain</span>
grep "x" file || true                                <span class="cb-cmt"># || true pattern</span>

<span class="cb-cmt"># These DO trigger set -e (not in conditional context):</span>
grep -q "error" missing_file.txt    <span class="cb-cmt"># ← EXITS if file missing!</span>
python3 broken_script.py            <span class="cb-cmt"># ← EXITS if python3 fails!</span>
(( COUNT-- ))                       <span class="cb-cmt"># ← EXITS if COUNT was 0 (result = 0 = false)!</span>

<span class="cb-cmt">## ═══ THE (( )) GOTCHA WITH set -e ════════════════════════════</span>
set -e
COUNT=5
(( COUNT-- ))    <span class="cb-cmt"># COUNT becomes 4, result non-zero → OK</span>
(( COUNT-- ))    <span class="cb-cmt"># COUNT becomes 3, result non-zero → OK</span>
COUNT=1
(( COUNT-- ))    <span class="cb-cmt"># COUNT becomes 0, result IS ZERO → EXIT! (set -e fires)</span>

<span class="cb-cmt"># Fix options:</span>
(( COUNT-- )) || true          <span class="cb-cmt"># suppress exit — always true overall</span>
(( COUNT-- , 1 ))              <span class="cb-cmt"># comma: last expr is 1 = non-zero = true</span>
(( COUNT = COUNT - 1 ))        <span class="cb-cmt"># assignment always succeeds</span>
COUNT=$(( COUNT - 1 ))         <span class="cb-cmt"># $() never triggers set -e</span>

<span class="cb-cmt">## ═══ COMMANDS USED AS CONDITIONS ARE EXEMPT ══════════════════</span>
set -e

<span class="cb-cmt"># Command in if condition = EXEMPT from set -e:</span>
if python3 -c "import sys; sys.exit(1)"; then
    echo "success"
else
    echo "failed — but script continues!"    <span class="cb-cmt"># ← set -e NOT triggered</span>
fi

<span class="cb-cmt"># Same with while/until:</span>
while read -r line; do
    process "$line"
done < file.txt
<span class="cb-cmt"># read exits 1 at EOF — but as while condition, set -e ignores it</span>

<span class="cb-cmt"># After &&/|| operator — EXEMPT:</span>
grep -q "pattern" file.txt || echo "not found"  <span class="cb-cmt"># grep fail = ok (after ||)</span>

<span class="cb-cmt">## ═══ HANDLING EXPECTED FAILURES WITH set -e ══════════════════</span>
set -e

<span class="cb-cmt"># Run a command that might fail, capture result safely:</span>
if result=$(some_command 2>&1); then
    echo "Success: $result"
else
    echo "Failed: $result"
fi

<span class="cb-cmt"># Or use || to handle failure inline:</span>
OUTPUT=$(python3 risky.py) || { echo "python3 failed" >&2; exit 1; }

<span class="cb-cmt"># Temporarily disable set -e for known-failing commands:</span>
set +e
grep -q "optional_pattern" file.txt
GREP_STATUS=$?
set -e
if (( GREP_STATUS == 0 )); then echo "pattern found"; fi

<span class="cb-cmt">## ═══ ERR TRAP — CATCH ANY UNEXPECTED FAILURE ═════════════════</span>
trap 'echo "ERROR at line $LINENO: command failed" >&2' ERR
<span class="cb-cmt"># ERR trap fires whenever a command fails AND is not in a conditional context
# Combine with set -e for maximum safety in production scripts</span>

set -eE  <span class="cb-cmt"># -E: ERR trap also fires in functions and subshells</span>
trap 'echo "FATAL: line $LINENO, exit $?" >&2; cleanup' ERR
</pre></div></div>
</div>
</div>


<!-- ══════════════════════════════════════════════════════
     SECTION 6 — FILE TEST OPERATORS
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> File Test Operators — Check Files Before Using Them</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 210" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="210" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">File Test Operators — Organised by Category</text>

  <!-- Type column -->
  <rect x="12" y="36" width="155" height="162" rx="7" fill="#161b22" stroke="#58a6ff" stroke-width="2"/>
  <text x="89" y="56" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#58a6ff">Type</text>
  <line x1="20" y1="62" x2="158" y2="62" stroke="#30363d" stroke-width="1"/>
  <text x="24" y="80" font-family="'Courier New',monospace" font-size="11" fill="#58a6ff">-e</text><text x="50" y="80" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">exists (any)</text>
  <text x="24" y="97" font-family="'Courier New',monospace" font-size="11" fill="#58a6ff">-f</text><text x="50" y="97" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">regular file</text>
  <text x="24" y="114" font-family="'Courier New',monospace" font-size="11" fill="#58a6ff">-d</text><text x="50" y="114" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">directory</text>
  <text x="24" y="131" font-family="'Courier New',monospace" font-size="11" fill="#58a6ff">-L</text><text x="50" y="131" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">symlink</text>
  <text x="24" y="148" font-family="'Courier New',monospace" font-size="11" fill="#58a6ff">-p</text><text x="50" y="148" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">named pipe</text>
  <text x="24" y="165" font-family="'Courier New',monospace" font-size="11" fill="#58a6ff">-S</text><text x="50" y="165" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">socket</text>
  <text x="24" y="182" font-family="'Courier New',monospace" font-size="11" fill="#58a6ff">-b / -c</text><text x="82" y="182" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">block/char dev</text>

  <!-- Size column -->
  <rect x="177" y="36" width="155" height="162" rx="7" fill="#161b22" stroke="#3fb950" stroke-width="2"/>
  <text x="254" y="56" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#3fb950">Size &amp; Age</text>
  <line x1="185" y1="62" x2="323" y2="62" stroke="#30363d" stroke-width="1"/>
  <text x="189" y="80" font-family="'Courier New',monospace" font-size="11" fill="#3fb950">-s</text><text x="215" y="80" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">non-empty file</text>
  <text x="189" y="97" font-family="'Courier New',monospace" font-size="11" fill="#3fb950">-nt</text><text x="221" y="97" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">newer than B</text>
  <text x="189" y="114" font-family="'Courier New',monospace" font-size="11" fill="#3fb950">-ot</text><text x="221" y="114" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">older than B</text>
  <text x="189" y="131" font-family="'Courier New',monospace" font-size="11" fill="#3fb950">-ef</text><text x="221" y="131" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">same inode</text>

  <!-- Permissions column -->
  <rect x="342" y="36" width="155" height="162" rx="7" fill="#161b22" stroke="#bc8cff" stroke-width="2"/>
  <text x="419" y="56" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#bc8cff">Permissions</text>
  <line x1="350" y1="62" x2="488" y2="62" stroke="#30363d" stroke-width="1"/>
  <text x="354" y="80" font-family="'Courier New',monospace" font-size="11" fill="#bc8cff">-r</text><text x="378" y="80" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">readable</text>
  <text x="354" y="97" font-family="'Courier New',monospace" font-size="11" fill="#bc8cff">-w</text><text x="378" y="97" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">writable</text>
  <text x="354" y="114" font-family="'Courier New',monospace" font-size="11" fill="#bc8cff">-x</text><text x="378" y="114" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">executable</text>
  <text x="354" y="131" font-family="'Courier New',monospace" font-size="11" fill="#bc8cff">-O</text><text x="378" y="131" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">owned by me</text>
  <text x="354" y="148" font-family="'Courier New',monospace" font-size="11" fill="#bc8cff">-G</text><text x="378" y="148" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">my group owns</text>
  <text x="354" y="165" font-family="'Courier New',monospace" font-size="11" fill="#bc8cff">-u</text><text x="378" y="165" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">setUID bit</text>
  <text x="354" y="182" font-family="'Courier New',monospace" font-size="11" fill="#bc8cff">-k</text><text x="378" y="182" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">sticky bit</text>

  <!-- Pattern box -->
  <rect x="507" y="36" width="300" height="162" rx="7" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.5"/>
  <text x="657" y="56" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#3fb950">Preflight Check Pattern</text>
  <line x1="515" y1="62" x2="799" y2="62" stroke="#30363d" stroke-width="1"/>
  <text x="520" y="80" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">[[ -f $FILE ]]  </text><text x="660" y="80" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">exists as file</text>
  <text x="520" y="97" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">[[ -s $FILE ]]  </text><text x="660" y="97" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">has content</text>
  <text x="520" y="114" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">[[ -r $FILE ]]  </text><text x="660" y="114" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">can read it</text>
  <text x="520" y="131" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">[[ -d $DIR  ]]  </text><text x="660" y="131" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">output dir exists</text>
  <text x="520" y="148" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">[[ -w $DIR  ]]  </text><text x="660" y="148" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">can write there</text>
  <text x="520" y="165" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">[[ -x $SCRIPT ]] </text><text x="660" y="165" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">script is runnable</text>
  <text x="520" y="185" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Chain with ||  { echo "ERR" >&amp;2; exit 1; }</text>
</svg>
<p class="diagram-caption">Check type first (<code>-f</code>/<code>-d</code>), then size (<code>-s</code>), then permissions (<code>-r</code>/<code>-w</code>/<code>-x</code>). The preflight pattern: chain all checks with <code>||</code> guard clauses at the top of every production script.</p>
</div>





<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 5 of 8 — All File Tests with Real Examples</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ EXISTENCE & TYPE ════════════════════════════════════════</span>
[[ -e $PATH ]]   <span class="cb-cmt"># EXISTS (file, dir, symlink, pipe — anything)</span>
[[ -f $PATH ]]   <span class="cb-cmt"># is a regular FILE</span>
[[ -d $PATH ]]   <span class="cb-cmt"># is a DIRECTORY</span>
[[ -L $PATH ]]   <span class="cb-cmt"># is a SYMBOLIC LINK</span>
[[ -p $PATH ]]   <span class="cb-cmt"># is a NAMED PIPE (FIFO)</span>
[[ -S $PATH ]]   <span class="cb-cmt"># is a SOCKET</span>
[[ -b $PATH ]]   <span class="cb-cmt"># is a BLOCK device (disk)</span>
[[ -c $PATH ]]   <span class="cb-cmt"># is a CHARACTER device (terminal, /dev/null)</span>

<span class="cb-cmt">## ═══ SIZE ════════════════════════════════════════════════════</span>
[[ -s $FILE ]]   <span class="cb-cmt"># non-empty (size > 0 bytes)</span>
<span class="cb-cmt"># -s is the ONLY size test; for specific sizes use du/stat:</span>
SIZE=$(stat -c %s "$FILE")
(( SIZE > 1024 * 1024 ))   <span class="cb-cmt"># larger than 1MB</span>

<span class="cb-cmt">## ═══ PERMISSIONS ════════════════════════════════════════════</span>
[[ -r $PATH ]]   <span class="cb-cmt"># current user can READ</span>
[[ -w $PATH ]]   <span class="cb-cmt"># current user can WRITE</span>
[[ -x $PATH ]]   <span class="cb-cmt"># current user can EXECUTE (or enter if dir)</span>
[[ -u $PATH ]]   <span class="cb-cmt"># has setUID bit</span>
[[ -g $PATH ]]   <span class="cb-cmt"># has setGID bit</span>
[[ -k $PATH ]]   <span class="cb-cmt"># has sticky bit</span>
[[ -O $PATH ]]   <span class="cb-cmt"># owned by current user (Owner)</span>
[[ -G $PATH ]]   <span class="cb-cmt"># owned by current user's Group</span>

<span class="cb-cmt">## ═══ MODIFICATION TIME ═══════════════════════════════════════</span>
[[ $A -nt $B ]]  <span class="cb-cmt"># A is newer than B (newer mtime)</span>
[[ $A -ot $B ]]  <span class="cb-cmt"># A is older than B</span>
[[ $A -ef $B ]]  <span class="cb-cmt"># A and B are the same file (same inode)</span>

<span class="cb-cmt">## ═══ PRACTICAL: PRE-FLIGHT CHECKS ════════════════════════════</span>
preflight_check() {
    local INPUT="$1" OUTPUT_DIR="$2"

    [[ -f $INPUT ]] || {
        echo "ERROR: Input file not found: $INPUT" >&2
        return 1
    }
    [[ -s $INPUT ]] || {
        echo "ERROR: Input file is empty: $INPUT" >&2
        return 1
    }
    [[ -r $INPUT ]] || {
        echo "ERROR: Cannot read: $INPUT" >&2
        return 1
    }
    [[ -d $OUTPUT_DIR ]] || mkdir -p "$OUTPUT_DIR" || {
        echo "ERROR: Cannot create output dir: $OUTPUT_DIR" >&2
        return 1
    }
    [[ -w $OUTPUT_DIR ]] || {
        echo "ERROR: Cannot write to: $OUTPUT_DIR" >&2
        return 1
    }
    return 0
}

preflight_check "$INPUT_FILE" "$OUTPUT_DIR" || exit 1

<span class="cb-cmt">## ═══ CHECKING COMMANDS EXIST ════════════════════════════════</span>
<span class="cb-cmt"># Check if a command is available:</span>
if [[ -x "$(command -v python3)" ]]; then
    echo "python3 available"
fi

<span class="cb-cmt"># Cleaner with 'command -v':</span>
command -v jq &>/dev/null || { echo "jq not installed"; exit 1; }
command -v aws &>/dev/null || { echo "aws cli missing"; exit 1; }

<span class="cb-cmt">## ═══ COMPLETE FILE TEST REFERENCE ═══════════════════════════</span>
<span class="cb-cmt"># Operator | True if...
# -e PATH  | path exists (any type)
# -f PATH  | regular file
# -d PATH  | directory
# -L PATH  | symbolic link
# -s FILE  | file is non-empty (size > 0)
# -r PATH  | readable by current user
# -w PATH  | writable by current user
# -x PATH  | executable / dir-traversable
# -O FILE  | owned by current user
# -G FILE  | group-owned by current user's group
# -p FILE  | named pipe (FIFO)
# -S FILE  | socket
# -b FILE  | block device
# -c FILE  | character device
# -u FILE  | has setUID bit
# -g FILE  | has setGID bit
# -k FILE  | has sticky bit
# A -nt B  | A newer than B
# A -ot B  | A older than B
# A -ef B  | A and B same inode</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 7 — COMPOUND CONDITIONS
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Compound Conditions — AND, OR, NOT</h2>

<!-- Short-circuit map SVG -->
<div class="diagram-wrap">
<svg viewBox="0 0 820 180" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <defs>
    <marker id="arr-g" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#3fb950"/></marker>
    <marker id="arr-r" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#f85149"/></marker>
    <marker id="arr-b" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#58a6ff"/></marker>
    <marker id="arr-y" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#ffa657"/></marker>
  </defs>
  <rect width="820" height="180" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">Short-Circuit Evaluation — Bash Stops Early When Result is Certain</text>

  <!-- && row -->
  <rect x="20" y="40" width="380" height="56" rx="7" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.5"/>
  <text x="210" y="60" text-anchor="middle" font-family="'Courier New',monospace" font-size="12" font-weight="bold" fill="#3fb950">A &amp;&amp; B</text>
  <text x="30" y="78" font-family="'Segoe UI',sans-serif" font-size="11" fill="#8b949e">A=true  → evaluates B  → result = B</text>
  <text x="30" y="92" font-family="'Segoe UI',sans-serif" font-size="11" fill="#f85149">A=false → STOPS, skips B → result = false</text>

  <!-- || row -->
  <rect x="420" y="40" width="380" height="56" rx="7" fill="#2a1a1a" stroke="#f85149" stroke-width="1.5"/>
  <text x="610" y="60" text-anchor="middle" font-family="'Courier New',monospace" font-size="12" font-weight="bold" fill="#f85149">A || B</text>
  <text x="430" y="78" font-family="'Segoe UI',sans-serif" font-size="11" fill="#3fb950">A=true  → STOPS, skips B → result = true</text>
  <text x="430" y="92" font-family="'Segoe UI',sans-serif" font-size="11" fill="#8b949e">A=false → evaluates B  → result = B</text>

  <!-- Bottom examples -->
  <rect x="20" y="108" width="380" height="60" rx="7" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="30" y="126" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#3fb950">Use &amp;&amp; for: "do B only if A succeeded"</text>
  <text x="30" y="143" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">mkdir /data &amp;&amp; cd /data</text>
  <text x="30" y="160" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">[[ -f file ]] &amp;&amp; process_file</text>

  <rect x="420" y="108" width="380" height="60" rx="7" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="430" y="126" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#f85149">Use || for: "do B only if A failed"</text>
  <text x="430" y="143" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">[[ -d /data ]] || mkdir /data</text>
  <text x="430" y="160" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">cmd || { echo "failed"; exit 1; }</text>
</svg>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 6 of 8 — Compound Conditions: &&, ||, !, grouping, all forms</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ LOGICAL AND: both must be true ══════════════════════════</span>
<span class="cb-cmt"># Inside [[ ]]:</span>
if [[ -f $FILE && -s $FILE ]]; then
    echo "File exists and is non-empty"
fi

<span class="cb-cmt"># Outside with &&:</span>
if [[ -f $FILE ]] && [[ -s $FILE ]]; then
    echo "Same result"
fi

<span class="cb-cmt"># Three conditions:</span>
if [[ -f $INPUT && -d $OUTPUT_DIR && -n $DB_HOST ]]; then
    echo "All preconditions met"
fi

<span class="cb-cmt"># Mixed types:</span>
if [[ -f $FILE ]] && (( ROWS > 0 )) && grep -q "header" "$FILE"; then
    echo "Valid data file"
fi

<span class="cb-cmt">## ═══ LOGICAL OR: at least one must be true ════════════════════</span>
if [[ $EXT == "csv" || $EXT == "tsv" || $EXT == "txt" ]]; then
    echo "Supported text format"
fi

if [[ $STATUS == "failed" || $STATUS == "error" || $STATUS == "aborted" ]]; then
    send_alert "Pipeline $STATUS"
fi

<span class="cb-cmt">## ═══ LOGICAL NOT: invert the condition ══════════════════════</span>
if [[ ! -f $FILE ]]; then
    echo "File missing"
fi

if ! grep -q "ERROR" app.log; then
    echo "No errors found"
fi

if [[ ! ($A == "yes" || $B == "yes") ]]; then  <span class="cb-cmt"># neither A nor B</span>
    echo "Both are not yes"
fi

<span class="cb-cmt">## ═══ INSIDE (( )) ════════════════════════════════════════════</span>
if (( COUNT > 0 && COUNT < 1000 )); then
    echo "Count in normal range"
fi

if (( ERRORS == 0 && WARNINGS < 5 )); then
    echo "Pipeline healthy"
fi

if (( !(COUNT % 2) )); then           <span class="cb-cmt"># even number</span>
    echo "Count is even"
fi

<span class="cb-cmt">## ═══ GROUPING WITH { } ═══════════════════════════════════════</span>
<span class="cb-cmt"># Run multiple commands on one branch of &&/||:</span>
[[ -f $FILE ]] || { echo "ERROR: Missing $FILE" >&2; exit 1; }
[[ -d $DIR  ]] || { mkdir -p "$DIR" && echo "Created $DIR"; }
<span class="cb-cmt"># Note: { } requires a semicolon or newline before the closing }
# And a space after the opening {</span>

<span class="cb-cmt">## ═══ COMMON PRODUCTION PATTERNS ══════════════════════════════</span>
<span class="cb-cmt"># Guard clause — exit early on failure:</span>
[[ $# -ge 2 ]]  || { echo "Usage: $0 INPUT OUTPUT" >&2; exit 2; }
[[ -f $1     ]] || { echo "Input not found: $1"   >&2; exit 3; }
[[ -n $2     ]] || { echo "Output path empty"      >&2; exit 2; }

<span class="cb-cmt"># Set default if variable is empty:</span>
[[ -n $ENVIRONMENT ]] || ENVIRONMENT="development"
[[ -n $LOG_LEVEL   ]] || LOG_LEVEL="INFO"
<span class="cb-cmt"># Cleaner version with :=</span>
: \${ENVIRONMENT:=development}
: \${LOG_LEVEL:=INFO}

<span class="cb-cmt"># Run next step only if previous succeeded:</span>
download_data && validate_data && transform_data && load_data \
    && echo "Pipeline complete" \
    || echo "Pipeline FAILED at some step" >&2
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 8 — case STATEMENT
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> The <code>case</code> Statement — Pattern Matching Switch</h2>

<p><code>case</code> is cleaner than long if/elif chains when matching one variable against multiple patterns. It supports glob patterns natively — no regex needed for most real-world cases.</p>




<!-- File test operator tree -->



<!-- case pattern tree SVG -->
<div class="diagram-wrap">
<svg viewBox="0 0 820 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="200" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">case Statement — Pattern Matching Tree</text>

  <!-- Variable box -->
  <rect x="330" y="38" width="160" height="36" rx="7" fill="#161b22" stroke="#bc8cff" stroke-width="2"/>
  <text x="410" y="61" text-anchor="middle" font-family="'Courier New',monospace" font-size="13" fill="#bc8cff">case "$VAR" in</text>

  <!-- Branch lines -->
  <line x1="410" y1="74" x2="100" y2="110" stroke="#30363d" stroke-width="1.2"/>
  <line x1="410" y1="74" x2="270" y2="110" stroke="#30363d" stroke-width="1.2"/>
  <line x1="410" y1="74" x2="450" y2="110" stroke="#30363d" stroke-width="1.2"/>
  <line x1="410" y1="74" x2="620" y2="110" stroke="#30363d" stroke-width="1.2"/>
  <line x1="410" y1="74" x2="760" y2="110" stroke="#30363d" stroke-width="1.2"/>

  <!-- Pattern boxes -->
  <rect x="20"  y="110" width="160" height="36" rx="5" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.5"/>
  <text x="100" y="132" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#3fb950">exact)</text>
  <text x="100" y="162" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">"production")</text>

  <rect x="195" y="110" width="150" height="36" rx="5" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.5"/>
  <text x="270" y="132" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#3fb950">glob)</text>
  <text x="270" y="162" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">*.csv | *.CSV)</text>

  <rect x="360" y="110" width="180" height="36" rx="5" fill="#0e1824" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="450" y="132" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#58a6ff">alt1|alt2)</text>
  <text x="450" y="162" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#58a6ff">yes|y|YES)</text>

  <rect x="555" y="110" width="130" height="36" rx="5" fill="#2a2a1a" stroke="#ffa657" stroke-width="1.5"/>
  <text x="620" y="132" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#ffa657">range)</text>
  <text x="620" y="162" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">[0-9]*)</text>

  <rect x="700" y="110" width="106" height="36" rx="5" fill="#1f2027" stroke="#8b949e" stroke-width="1.5"/>
  <text x="753" y="132" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#8b949e">*)</text>
  <text x="753" y="162" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">default/catch-all</text>

  <!-- Action label -->
  <text x="410" y="188" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#30363d">Each matching pattern runs its block, then ;; exits the case (or ;& falls through, ;;& tries next)</text>
</svg>
</div>

<!-- CONSOLE 7 -->
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 7 of 8 — case: Syntax, All Pattern Types, Fall-through</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ BASIC case SYNTAX ════════════════════════════════════════</span>
case "$ENVIRONMENT" in
    production)
        DB_HOST="prod-db.cluster"
        LOG_LEVEL="WARN"
        ;;                          <span class="cb-cmt"># ;; = end this branch, exit case</span>
    staging)
        DB_HOST="staging-db.internal"
        LOG_LEVEL="INFO"
        ;;
    dev|development)                <span class="cb-cmt"># | = OR: matches either</span>
        DB_HOST="localhost"
        LOG_LEVEL="DEBUG"
        ;;
    *)                              <span class="cb-cmt"># * = catch-all default</span>
        echo "Unknown environment: $ENVIRONMENT" >&2
        exit 1
        ;;
esac
<span class="cb-cmt"># Syntax rules:
# - case WORD in ... esac
# - Each pattern ends with ) 
# - Block ends with ;; (required even last one — good practice)
# - * as catch-all is optional but recommended
# - esac closes the case</span>

<span class="cb-cmt">## ═══ GLOB PATTERNS IN case ════════════════════════════════════</span>
case "$FILENAME" in
    *.csv|*.CSV)
        echo "CSV file — loading with csv parser"
        ;;
    *.json)
        echo "JSON file — loading with json parser"
        ;;
    *.gz|*.bz2|*.xz)
        echo "Compressed — decompressing first"
        ;;
    *.parquet)
        echo "Parquet — using spark reader"
        ;;
    *.yaml|*.yml)
        echo "YAML config file"
        ;;
    *)
        echo "Unsupported format: $FILENAME" >&2
        exit 1
        ;;
esac

<span class="cb-cmt">## ═══ case WITH CHARACTER CLASSES ══════════════════════════════</span>
case "$INPUT" in
    [yY]|[yY][eE][sS])    <span class="cb-cmt"># y, Y, yes, YES, Yes, YeS...</span>
        echo "Confirmed"
        ;;
    [nN]|[nN][oO])        <span class="cb-cmt"># n, N, no, NO, No</span>
        echo "Cancelled"
        ;;
    [0-9]*)               <span class="cb-cmt"># starts with a digit</span>
        echo "Numeric input: $INPUT"
        ;;
    '')                   <span class="cb-cmt"># empty string</span>
        echo "Nothing entered"
        ;;
    *)
        echo "Unrecognised: $INPUT"
        ;;
esac

<span class="cb-cmt">## ═══ case FOR COMMAND DISPATCH ════════════════════════════════</span>
<span class="cb-cmt"># Classic use: script subcommands</span>
COMMAND="\${1:-help}"
case "$COMMAND" in
    start)
        start_pipeline
        ;;
    stop)
        stop_pipeline
        ;;
    status|info)
        show_status
        ;;
    restart)
        stop_pipeline && start_pipeline
        ;;
    load)
        load_data "\${2:?load requires a file argument}"
        ;;
    --help|-h|help)
        show_usage
        exit 0
        ;;
    --version|-v)
        echo "pipeline v1.4.2"
        exit 0
        ;;
    *)
        echo "Unknown command: $COMMAND" >&2
        echo "Run '$0 --help' for usage" >&2
        exit 1
        ;;
esac

<span class="cb-cmt">## ═══ FALL-THROUGH WITH ;& AND ;;& ════════════════════════════</span>
<span class="cb-cmt"># ;; = exit case (default — use this most of the time)
# ;& = fall through to NEXT pattern's block (execute it unconditionally)
# ;;& = fall through to NEXT pattern (test its condition first)</span>

OS="ubuntu"
case "$OS" in
    ubuntu)
        PKG_MGR="apt"
        ;&                          <span class="cb-cmt"># fall through to debian block</span>
    debian)
        FAMILY="debian"
        ;;
    centos)
        PKG_MGR="yum"
        ;&
    rhel|fedora)
        FAMILY="redhat"
        ;;
esac
<span class="cb-cmt"># For ubuntu: PKG_MGR="apt", FAMILY="debian" (both blocks ran)</span>

<span class="cb-cmt"># ;;& continues testing patterns:</span>
LOG_LINE="ERROR connection timeout"
case "$LOG_LINE" in
    *ERROR*)
        ((ERROR_COUNT++))
        ;;&                         <span class="cb-cmt"># keep testing</span>
    *timeout*)
        ((TIMEOUT_COUNT++))
        ;;&                         <span class="cb-cmt"># keep testing</span>
    *connection*)
        ((CONNECTION_COUNT++))
        ;;
esac
<span class="cb-cmt"># All three counters incremented — one line matched multiple patterns</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 9 — SHORT-CIRCUIT & TERNARY IDIOMS
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Short-Circuit &amp; Ternary Idioms — Concise Conditionals</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 170" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="170" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">Short-Circuit Truth Table — When Does B Execute?</text>

  <!-- && table -->
  <rect x="15" y="34" width="385" height="124" rx="8" fill="#161b22" stroke="#3fb950" stroke-width="2"/>
  <text x="207" y="54" text-anchor="middle" font-family="'Courier New',monospace" font-size="14" font-weight="bold" fill="#3fb950">A &amp;&amp; B</text>
  <!-- header -->
  <rect x="24" y="60" width="180" height="22" rx="3" fill="#1a2a1a"/>
  <text x="114" y="75" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#3fb950">A result</text>
  <rect x="213" y="60" width="178" height="22" rx="3" fill="#1a2a1a"/>
  <text x="302" y="75" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#3fb950">B executes?</text>
  <!-- rows -->
  <text x="114" y="100" text-anchor="middle" font-family="'Courier New',monospace" font-size="12" fill="#3fb950">exit 0 (success)</text>
  <text x="302" y="100" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" fill="#3fb950">✅ YES — B runs</text>
  <line x1="24" y1="108" x2="391" y2="108" stroke="#30363d" stroke-width="1"/>
  <text x="114" y="128" text-anchor="middle" font-family="'Courier New',monospace" font-size="12" fill="#f85149">exit ≠ 0 (fail)</text>
  <text x="302" y="128" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" fill="#f85149">❌ NO — B skipped</text>
  <text x="207" y="152" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">"run B only if A succeeded"</text>

  <!-- || table -->
  <rect x="420" y="34" width="385" height="124" rx="8" fill="#161b22" stroke="#f85149" stroke-width="2"/>
  <text x="612" y="54" text-anchor="middle" font-family="'Courier New',monospace" font-size="14" font-weight="bold" fill="#f85149">A || B</text>
  <!-- header -->
  <rect x="429" y="60" width="180" height="22" rx="3" fill="#2a1a1a"/>
  <text x="519" y="75" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#f85149">A result</text>
  <rect x="618" y="60" width="178" height="22" rx="3" fill="#2a1a1a"/>
  <text x="707" y="75" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#f85149">B executes?</text>
  <!-- rows -->
  <text x="519" y="100" text-anchor="middle" font-family="'Courier New',monospace" font-size="12" fill="#3fb950">exit 0 (success)</text>
  <text x="707" y="100" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" fill="#f85149">❌ NO — B skipped</text>
  <line x1="429" y1="108" x2="795" y2="108" stroke="#30363d" stroke-width="1"/>
  <text x="519" y="128" text-anchor="middle" font-family="'Courier New',monospace" font-size="12" fill="#f85149">exit ≠ 0 (fail)</text>
  <text x="707" y="128" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" fill="#3fb950">✅ YES — B runs</text>
  <text x="612" y="152" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">"run B only if A failed"</text>
</svg>
<p class="diagram-caption">Short-circuit means B is <em>never evaluated</em> when the result is already determined. Use <code>&amp;&amp;</code> for guard "do B only when A succeeds" — use <code>||</code> for fallback "do B only when A fails". This drives the entire guard-clause idiom.</p>
</div>





<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 8 of 8 — Short-Circuit, Ternary Patterns &amp; Inline Decisions</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ SHORT-CIRCUIT AS if REPLACEMENT ═════════════════════════</span>
<span class="cb-cmt"># Instead of:
# if [[ -f file ]]; then do_something; fi
# Write:</span>
[[ -f file ]] && do_something

<span class="cb-cmt"># Instead of:
# if [[ ! -d dir ]]; then mkdir dir; fi
# Write:</span>
[[ -d dir ]] || mkdir -p dir

<span class="cb-cmt"># Guard clause pattern (most common in scripts):</span>
[[ $# -ge 1 ]]       || { echo "Usage: $0 FILE" >&2; exit 1; }
[[ -f $1    ]]       || { echo "File not found" >&2; exit 1; }
command -v python3 &>/dev/null || { echo "python3 required" >&2; exit 1; }

<span class="cb-cmt">## ═══ TERNARY IDIOM: value ? a : b ════════════════════════════</span>
<span class="cb-cmt"># Bash has no ternary operator — these are the idioms:</span>

<span class="cb-cmt"># Pattern 1: assignment using &&/||</span>
STATUS=$( [[ $ERRORS -eq 0 ]] && echo "OK" || echo "FAILED" )
echo "Status: $STATUS"

<span class="cb-cmt"># Pattern 2: parameter expansion default</span>
LEVEL="\${DEBUG:+DEBUG}"          <span class="cb-cmt"># "DEBUG" if DEBUG is set, else ""</span>
LOG_LEVEL="\${LOG_LEVEL:-INFO}"   <span class="cb-cmt"># "INFO" if LOG_LEVEL is unset</span>

<span class="cb-cmt"># Pattern 3: arithmetic ternary inside (( ))</span>
(( RESULT = A > B ? A : B ))     <span class="cb-cmt"># max(A, B)</span>
(( ABS = N < 0 ? -N : N ))       <span class="cb-cmt"># abs(N)</span>

<span class="cb-cmt"># Pattern 4: select-string idiom</span>
ICON=$( [[ $STATUS == "OK" ]] && echo "✅" || echo "❌" )
echo "$ICON Pipeline $STATUS"

<span class="cb-cmt">## ═══ INLINE if WITH COMMAND GROUPING ═════════════════════════</span>
<span class="cb-cmt"># Multi-step success/failure handling:</span>
[[ -f "$BACKUP" ]] && {
    echo "Backup exists: $BACKUP"
    ls -lh "$BACKUP"
    echo "Checksum: $(md5sum "$BACKUP")"
}

<span class="cb-cmt"># Error with cleanup:</span>
[[ -s "$OUTPUT" ]] || {
    echo "ERROR: output is empty" >&2
    rm -f "$OUTPUT"
    exit 1
}

<span class="cb-cmt">## ═══ CHAINED CONDITIONS (pipeline guard) ═════════════════════</span>
check_env()    { [[ -n $ENVIRONMENT ]]; }
check_input()  { [[ -f $INPUT_FILE && -s $INPUT_FILE ]]; }
check_db()     { psql -d analytics -c "SELECT 1" &>/dev/null; }
check_space()  { (( $(df /data --output=avail -m | tail -1) > 500 )); }

check_env   || { echo "ENVIRONMENT not set" >&2; exit 1; }
check_input || { echo "Input file missing or empty" >&2; exit 1; }
check_db    || { echo "Database unreachable" >&2; exit 1; }
check_space || { echo "Insufficient disk space" >&2; exit 1; }
echo "All checks passed — starting pipeline"

<span class="cb-cmt">## ═══ CONDITIONAL VARIABLE ASSIGNMENT ═════════════════════════</span>
<span class="cb-cmt"># Set verbosity flag based on DEBUG variable:</span>
VERBOSE_FLAG=$( [[ \${DEBUG:-} == "true" ]] && echo "--verbose" || echo "" )
python3 pipeline.py $VERBOSE_FLAG

<span class="cb-cmt"># Choose config file based on environment:</span>
CONFIG="config/\${ENVIRONMENT:-dev}.yaml"
[[ -f $CONFIG ]] || CONFIG="config/default.yaml"

<span class="cb-cmt"># Conditional command options:</span>
DRY_RUN_FLAG=$( (( \${DRY_RUN:-0} )) && echo "--dry-run" || echo "" )
rsync -av $DRY_RUN_FLAG source/ dest/
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 10 — THE test COMMAND
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> The <code>test</code> Command — What <code>[ ]</code> Really Is</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 160" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="160" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">test / [ ] / [[ ]] — What They Actually Are</text>

  <!-- test external command -->
  <rect x="15" y="38" width="230" height="108" rx="8" fill="#1f2027" stroke="#ffa657" stroke-width="2"/>
  <text x="130" y="60" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#ffa657">/usr/bin/test</text>
  <text x="130" y="78" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">External program on disk</text>
  <text x="130" y="96" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">$ ls -la /usr/bin/[</text>
  <text x="130" y="112" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">fork() + exec() for each call</text>
  <text x="130" y="130" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">Slowest — also a shell builtin</text>

  <!-- = arrow -->
  <text x="253" y="98" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="20" fill="#8b949e">=</text>

  <!-- [ ] builtin -->
  <rect x="265" y="38" width="230" height="108" rx="8" fill="#0e1824" stroke="#58a6ff" stroke-width="2"/>
  <text x="380" y="60" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#58a6ff">[ ] shell builtin</text>
  <text x="380" y="78" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Runs inside bash (faster)</text>
  <text x="380" y="96" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">$ type [</text>
  <text x="380" y="112" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Requires quoted variables</text>
  <text x="380" y="130" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#58a6ff">POSIX portable (sh, dash, bash)</text>

  <!-- vs -->
  <text x="502" y="98" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="16" font-weight="bold" fill="#8b949e">vs</text>

  <!-- [[ ]] keyword -->
  <rect x="520" y="38" width="285" height="108" rx="8" fill="#1a2a1a" stroke="#3fb950" stroke-width="2.5"/>
  <text x="662" y="60" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#3fb950">[[ ]] bash keyword</text>
  <text x="662" y="78" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Parsed at compile time — no fork</text>
  <text x="662" y="96" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">type [[  → keyword</text>
  <text x="662" y="112" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#3fb950">regex =~ glob == no word split</text>
  <text x="662" y="130" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">✅ Use this in all bash scripts</text>
</svg>
<p class="diagram-caption"><code>[ ]</code> and <code>test</code> are the same thing — one is a shell builtin, one is <code>/usr/bin/[</code> on disk. Both are POSIX. <code>[[ ]]</code> is a bash keyword — no subprocess forked, supports regex and glob, safer with unquoted variables. Always use <code>[[ ]]</code> in bash scripts.</p>
</div>


<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">test Command — POSIX Origins, Portability &amp; All Options</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ─── [ ] IS LITERALLY THE test COMMAND ───────────────────────</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">type</span> [
<span class="cb-out">[ is a shell builtin</span>

<span class="cb-prompt">$</span> <span class="cb-cmd">ls</span> -la /usr/bin/[
<span class="cb-out">-rwxr-xr-x 1 root root 59736 /usr/bin/[</span>
<span class="cb-cmt"># [ is also an actual program on disk!
# As a shell builtin it's faster, but the external version exists too</span>

<span class="cb-prompt">$</span> <span class="cb-cmd">type</span> test
<span class="cb-out">test is a shell builtin</span>

<span class="cb-cmt"># These are all identical:</span>
test -f /etc/hosts
[ -f /etc/hosts ]
/usr/bin/test -f /etc/hosts
/usr/bin/[ -f /etc/hosts ]

<span class="cb-cmt">## ─── test / [ ] — FULL OPTION LIST ─────────────────────────</span>
<span class="cb-cmt"># STRING tests:
# test -z STR     zero-length (empty)
# test -n STR     non-zero length
# test STR        STR is non-empty (same as -n STR)
# test S1 = S2    S1 equals S2 (use = not ==)
# test S1 != S2   S1 not equal S2
# test S1 < S2    S1 before S2 lexicographically (in bash: \<)
# test S1 > S2    S1 after S2 lexicographically

# INTEGER tests:
# test N1 -eq N2  equal
# test N1 -ne N2  not equal
# test N1 -lt N2  less than
# test N1 -le N2  less or equal
# test N1 -gt N2  greater than
# test N1 -ge N2  greater or equal

# FILE tests (same as in [[ ]]):
# test -e FILE    exists        test -f FILE  regular file
# test -d FILE    directory     test -L FILE  symlink
# test -r FILE    readable      test -w FILE  writable
# test -x FILE    executable    test -s FILE  non-empty
# test A -nt B    A newer than B
# test A -ot B    A older than B
# test A -ef B    same file (same inode)

# COMPOUND:
# test ! EXPR     NOT
# test E1 -a E2   AND (use && between two tests instead)
# test E1 -o E2   OR  (use || between two tests instead)</span>

<span class="cb-cmt">## ─── PORTABILITY — WHEN TO USE test vs [[ ]] ─────────────────</span>
<span class="cb-cmt"># Use test / [ ] when:
# - Script has #!/bin/sh (POSIX only)
# - Targeting minimal containers with dash instead of bash
# - Maximum portability across all Unix systems (AIX, HP-UX etc.)

# Use [[ ]] when:
# - Script has #!/bin/bash (99% of modern Linux scripts)
# - You need regex (=~) or glob patterns in tests
# - You want safer handling of unquoted variables

# Use (( )) when:
# - Comparing numbers — cleanest syntax</span>

<span class="cb-cmt">## ─── POSIX-COMPATIBLE PATTERNS ─────────────────────────────</span>
<span class="cb-cmt"># POSIX: use [ ] with quoted vars and -a/-o:</span>
#!/bin/sh
if [ -f "$FILE" ] && [ -s "$FILE" ]; then    <span class="cb-cmt"># preferred over -a</span>
    echo "exists and non-empty"
fi

<span class="cb-cmt"># Bash: use [[ ]] and &&/|| inside:</span>
#!/bin/bash
if [[ -f $FILE && -s $FILE ]]; then
    echo "exists and non-empty"
fi
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 11 — KERNEL DEEP DIVE
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2








 class="section-title"><span class="sec-num"></span> Kernel Deep Dive — Exit Codes, test(1) &amp; How if Works at OS Level</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="200" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">How the Kernel Sees Conditionals — fork / wait / exit code</text>
  <rect x="15" y="36" width="160" height="152" rx="8" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="95" y="58" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#3fb950">bash process</text>
  <text x="95" y="78" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">if COMMAND</text>
  <text x="95" y="96" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">1. fork()</text>
  <text x="95" y="114" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">2. exec(COMMAND)</text>
  <text x="95" y="132" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">3. waitpid()</text>
  <text x="95" y="150" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">4. check exit code</text>
  <text x="95" y="168" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">5. run then/else</text>
  <text x="95" y="180" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">bash manages flow</text>
  <line x1="177" y1="100" x2="245" y2="75" stroke="#58a6ff" stroke-width="1.5" stroke-dasharray="5,3" marker-end="url(#arr-b)"/>
  <rect x="248" y="40" width="160" height="100" rx="8" fill="#0e1824" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="328" y="62" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#58a6ff">child process</text>
  <text x="328" y="80" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">[ -f file ]</text>
  <text x="328" y="98" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">or grep / python</text>
  <text x="328" y="118" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">runs, then:</text>
  <text x="328" y="133" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">exit(0)  ← true</text>
  <line x1="248" y1="140" x2="180" y2="155" stroke="#3fb950" stroke-width="1.5" marker-end="url(#arr-g)"/>
  <text x="215" y="136" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">$? = 0</text>
  <rect x="430" y="36" width="375" height="152" rx="8" fill="#161b22" stroke="#30363d" stroke-width="1.5"/>
  <text x="617" y="56" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#e6edf3">Key difference: [[ ]] has NO child process</text>
  <line x1="440" y1="64" x2="796" y2="64" stroke="#30363d" stroke-width="1"/>
  <text x="445" y="84" font-family="'Segoe UI',sans-serif" font-size="10" fill="#ffa657">External cmd  [ ] test :</text>
  <text x="445" y="100" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">fork() + exec() + wait() per test</text>
  <text x="445" y="118" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">process overhead every call</text>
  <line x1="440" y1="130" x2="796" y2="130" stroke="#30363d" stroke-width="1"/>
  <text x="445" y="148" font-family="'Segoe UI',sans-serif" font-size="10" fill="#3fb950">Bash keyword  [[ ]] :</text>
  <text x="445" y="164" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">evaluated inside bash — no fork!</text>
  <text x="445" y="180" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">regex via regcomp/regexec in bash</text>
</svg>
<p class="diagram-caption">Every <code>if COMMAND</code> causes bash to <code>fork()</code> a child, run the command, and <code>wait()</code> for its exit code. <code>0 = true</code>, any other value <code>= false</code>. The key insight: <code>[[ ]]</code> is special — it is a bash keyword evaluated inside the bash process with <em>no child process forked</em>, making it faster and more powerful.</p>
</div>








<div class="deepdive-box">
<div class="deepdive-title">⚙️ Conditionals at the Kernel Level — Exit Codes, wait(2), and test as a Program</div>
<pre style="margin:0;padding:16px;font-family:monospace;font-size:12px;color:#e6edf3;background:#010409;border-radius:0 0 8px 8px;overflow-x:auto;">
# HOW if WORKS AT THE OS LEVEL

1. WHAT IS AN EXIT CODE?
   Every process ends by calling exit(2) with an integer 0-255.
   The kernel stores this in the process's "zombie" state.
   The parent retrieves it with wait(2) / waitpid(2).
   
   exit(0)      → success
   exit(1)      → general failure
   exit(2)      → misuse / bad arguments
   exit(128+N)  → killed by signal N
                  (e.g. SIGTERM=15 → exit 143, SIGINT=2 → exit 130)

2. HOW BASH IMPLEMENTS if
   Bash tokenises the command after if, runs it as a child process:
     fork() → exec(COMMAND) → waitpid() → check status
   
   If WEXITSTATUS(status) == 0:
     → run the then-block (which is more bash code)
   else:
     → skip then-block, check elif or run else-block

3. [ ] IS A PROGRAM (or builtin)
   [ -f /etc/hosts ] is parsed as:
     command: [
     args:    "-f", "/etc/hosts", "]"
   
   The [ program (or builtin) evaluates the test expression
   and calls exit(0) for true, exit(1) for false.
   
   Bash then sees exit 0 → true → runs then-block.
   
   /usr/bin/[ is actually on disk:
   $ ls -la /usr/bin/[
   -rwxr-xr-x 1 root root 59736 /usr/bin/[
   
   $ strace -e execve bash -c '[ -f /etc/hosts ] && echo yes'
   execve("/usr/bin/bash", ["bash", "-c", "..."], envp) = 0
   # bash evaluates [ ] as builtin — no exec needed for builtin
   # but the EXTERNAL /usr/bin/[ would show as execve

4. [[ ]] IS DIFFERENT — BASH KEYWORD, NOT A PROGRAM
   [[ ]] is parsed by bash at parse time — it's a compound command.
   No child process is forked.
   Bash evaluates the expression internally:
   - Handles =~ (regex) via regcomp(3) + regexec(3) in bash itself
   - Handles glob patterns via fnmatch(3)
   - Handles && and || with short-circuit inside the same bash process
   
   This is why [[ ]] is FASTER than [ ] for complex conditions:
   no fork/exec overhead.

5. (( )) IS AN ARITHMETIC COMPOUND COMMAND
   (( COUNT > 0 )) is evaluated entirely in bash's arithmetic engine.
   Exit code: 0 if expression is non-zero (true in C arithmetic sense)
              1 if expression is zero (false)
   
   (( 5 > 3 ))   → expr = true (non-zero) → exit 0 → if runs then-block
   (( 0 ))       → expr = zero → exit 1 → if runs else-block
   (( 1 ))       → expr = non-zero → exit 0 → if runs then-block

6. SHORT-CIRCUIT AT BASH LEVEL
   A && B:
   - Bash evaluates A (runs it, waits for exit code)
   - If exit code == 0: evaluate B
   - If exit code != 0: STOP — B is never run
   
   A || B:
   - Bash evaluates A
   - If exit code != 0: evaluate B
   - If exit code == 0: STOP — B is never run
   
   This is all done at the AST (Abstract Syntax Tree) level inside bash —
   no kernel involvement beyond running the individual commands.

7. $? IS SET BY EVERY COMMAND
   After EACH command, bash sets $? to the exit code.
   Important: $? is immediately overwritten by the next command.
   
   grep "x" file   → $? = 0 or 1
   echo $?         → now $? = 0 (echo's exit code!)
   
   Always save $? immediately:
   grep "x" file; STATUS=$?   ← correct
   grep "x" file; echo $?     ← $? is echo's exit code if you check it again
</pre>
</div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 12 — COMPLETE OPERATOR REFERENCE
══════════════════════════════════════════════════════ -->
<div class="section-block">
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Complete Reference — All Conditional Operators &amp; Forms</h2>

<div class="table-wrap">
<table class="ref-table">
<thead><tr><th style="width:22%">Operator</th><th>Test Type</th><th>True When</th><th style="width:30%">Example</th></tr></thead>
<tbody>
<tr><td colspan="4" style="background:#1a2a1a;color:#3fb950;font-family:'Segoe UI',sans-serif;font-weight:bold;">String Tests — in [[ ]] (recommended) or [ ] (POSIX)</td></tr>
<tr><td style="font-family:monospace;">-z STR</td><td>String</td><td>Empty string (zero length)</td><td><code>[[ -z $NAME ]]</code></td></tr>
<tr><td style="font-family:monospace;">-n STR</td><td>String</td><td>Non-empty string</td><td><code>[[ -n $NAME ]]</code></td></tr>
<tr><td style="font-family:monospace;">-v VAR</td><td>Variable</td><td>Variable VAR is set (even if empty)</td><td><code>[[ -v DB_HOST ]]</code></td></tr>
<tr><td style="font-family:monospace;">S1 == S2</td><td>String</td><td>Equal — glob OK on right side of ==</td><td><code>[[ $F == *.csv ]]</code></td></tr>
<tr><td style="font-family:monospace;">S1 != S2</td><td>String</td><td>Not equal</td><td><code>[[ $ENV != "prod" ]]</code></td></tr>
<tr><td style="font-family:monospace;">S1 &lt; S2</td><td>String</td><td>S1 before S2 lexicographically</td><td><code>[[ $A &lt; $B ]]</code></td></tr>
<tr><td style="font-family:monospace;">S1 &gt; S2</td><td>String</td><td>S1 after S2 lexicographically</td><td><code>[[ $A &gt; $B ]]</code></td></tr>
<tr><td style="font-family:monospace;">STR =~ REGEX</td><td>Regex</td><td>STR matches POSIX ERE pattern</td><td><code>[[ $DATE =~ ^[0-9]{4} ]]</code></td></tr>
<tr><td colspan="4" style="background:#1a1a3a;color:#bc8cff;font-family:'Segoe UI',sans-serif;font-weight:bold;">Integer Tests — use in [[ ]] or [ ]</td></tr>
<tr><td style="font-family:monospace;">N1 -eq N2</td><td>Integer</td><td>Equal</td><td><code>[[ $CNT -eq 0 ]]</code></td></tr>
<tr><td style="font-family:monospace;">N1 -ne N2</td><td>Integer</td><td>Not equal</td><td><code>[[ $CNT -ne 0 ]]</code></td></tr>
<tr><td style="font-family:monospace;">N1 -lt N2</td><td>Integer</td><td>Less than</td><td><code>[[ $CNT -lt 100 ]]</code></td></tr>
<tr><td style="font-family:monospace;">N1 -le N2</td><td>Integer</td><td>Less than or equal</td><td><code>[[ $CNT -le 100 ]]</code></td></tr>
<tr><td style="font-family:monospace;">N1 -gt N2</td><td>Integer</td><td>Greater than</td><td><code>[[ $CNT -gt 0 ]]</code></td></tr>
<tr><td style="font-family:monospace;">N1 -ge N2</td><td>Integer</td><td>Greater than or equal</td><td><code>[[ $CNT -ge 1 ]]</code></td></tr>
<tr><td colspan="4" style="background:#2a2a1a;color:#ffa657;font-family:'Segoe UI',sans-serif;font-weight:bold;">Arithmetic (( )) — C-style, no $ needed inside</td></tr>
<tr><td style="font-family:monospace;">(( A == B ))</td><td>Arithmetic</td><td>Equal</td><td><code>(( COUNT == 0 ))</code></td></tr>
<tr><td style="font-family:monospace;">(( A != B ))</td><td>Arithmetic</td><td>Not equal</td><td><code>(( ERRORS != 0 ))</code></td></tr>
<tr><td style="font-family:monospace;">(( A &lt; B ))</td><td>Arithmetic</td><td>Less than</td><td><code>(( SIZE &lt; 1024 ))</code></td></tr>
<tr><td style="font-family:monospace;">(( A &gt; B ))</td><td>Arithmetic</td><td>Greater than</td><td><code>(( ROWS &gt; 0 ))</code></td></tr>
<tr><td style="font-family:monospace;">(( A &gt;= B ))</td><td>Arithmetic</td><td>Greater than or equal</td><td><code>(( SCORE &gt;= 90 ))</code></td></tr>
<tr><td style="font-family:monospace;">(( A % N == 0 ))</td><td>Arithmetic</td><td>A is divisible by N</td><td><code>(( i % 2 == 0 ))</code></td></tr>
<tr><td style="font-family:monospace;">(( A &amp;&amp; B ))</td><td>Arithmetic</td><td>Both non-zero</td><td><code>(( A &amp;&amp; B ))</code></td></tr>
<tr><td style="font-family:monospace;">(( A || B ))</td><td>Arithmetic</td><td>At least one non-zero</td><td><code>(( A || B ))</code></td></tr>
<tr><td style="font-family:monospace;">(( expr ))</td><td>Arithmetic</td><td>expr result is non-zero (C truthy)</td><td><code>(( COUNT ))</code></td></tr>
<tr><td colspan="4" style="background:#1f2027;color:#58a6ff;font-family:'Segoe UI',sans-serif;font-weight:bold;">File Tests — work in both [ ] and [[ ]]</td></tr>
<tr><td style="font-family:monospace;">-e PATH</td><td>File</td><td>Exists (any type)</td><td><code>[[ -e $PATH ]]</code></td></tr>
<tr><td style="font-family:monospace;">-f FILE</td><td>File</td><td>Regular file</td><td><code>[[ -f $FILE ]]</code></td></tr>
<tr><td style="font-family:monospace;">-d DIR</td><td>File</td><td>Directory</td><td><code>[[ -d $DIR ]]</code></td></tr>
<tr><td style="font-family:monospace;">-L PATH</td><td>File</td><td>Symbolic link</td><td><code>[[ -L $LINK ]]</code></td></tr>
<tr><td style="font-family:monospace;">-p PATH</td><td>File</td><td>Named pipe (FIFO)</td><td><code>[[ -p /tmp/mypipe ]]</code></td></tr>
<tr><td style="font-family:monospace;">-S PATH</td><td>File</td><td>Socket file</td><td><code>[[ -S /tmp/mysql.sock ]]</code></td></tr>
<tr><td style="font-family:monospace;">-s FILE</td><td>File</td><td>Non-empty (size &gt; 0)</td><td><code>[[ -s $OUTPUT ]]</code></td></tr>
<tr><td style="font-family:monospace;">-r FILE</td><td>File</td><td>Readable by current user</td><td><code>[[ -r $CONFIG ]]</code></td></tr>
<tr><td style="font-family:monospace;">-w FILE</td><td>File</td><td>Writable by current user</td><td><code>[[ -w $LOGFILE ]]</code></td></tr>
<tr><td style="font-family:monospace;">-x FILE</td><td>File</td><td>Executable / dir-traversable</td><td><code>[[ -x $SCRIPT ]]</code></td></tr>
<tr><td style="font-family:monospace;">-O FILE</td><td>File</td><td>Owned by current user</td><td><code>[[ -O $FILE ]]</code></td></tr>
<tr><td style="font-family:monospace;">-G FILE</td><td>File</td><td>Owned by current user's group</td><td><code>[[ -G $FILE ]]</code></td></tr>
<tr><td style="font-family:monospace;">-u FILE</td><td>File</td><td>Has setUID bit</td><td><code>[[ -u /usr/bin/passwd ]]</code></td></tr>
<tr><td style="font-family:monospace;">-g FILE</td><td>File</td><td>Has setGID bit</td><td><code>[[ -g $DIR ]]</code></td></tr>
<tr><td style="font-family:monospace;">-k DIR</td><td>File</td><td>Has sticky bit set</td><td><code>[[ -k /tmp ]]</code></td></tr>
<tr><td style="font-family:monospace;">A -nt B</td><td>File</td><td>A newer than B (mtime)</td><td><code>[[ $A -nt $B ]]</code></td></tr>
<tr><td style="font-family:monospace;">A -ot B</td><td>File</td><td>A older than B (mtime)</td><td><code>[[ $A -ot $B ]]</code></td></tr>
<tr><td style="font-family:monospace;">A -ef B</td><td>File</td><td>Same file (hard link / same inode)</td><td><code>[[ $A -ef $B ]]</code></td></tr>
<tr><td colspan="4" style="background:#1a2a1a;color:#3fb950;font-family:'Segoe UI',sans-serif;font-weight:bold;">Compound / Logic</td></tr>
<tr><td style="font-family:monospace;">&amp;&amp;</td><td>Logic</td><td>Both sides true (short-circuit)</td><td><code>[[ -f $F &amp;&amp; -s $F ]]</code></td></tr>
<tr><td style="font-family:monospace;">||</td><td>Logic</td><td>At least one side true (short-circuit)</td><td><code>[[ -f $F || -L $F ]]</code></td></tr>
<tr><td style="font-family:monospace;">!</td><td>Logic</td><td>Negates the test</td><td><code>[[ ! -f $F ]]</code></td></tr>
<tr><td colspan="4" style="background:#1a1a3a;color:#bc8cff;font-family:'Segoe UI',sans-serif;font-weight:bold;">case Pattern Types</td></tr>
<tr><td style="font-family:monospace;">word)</td><td>case</td><td>Exact string match</td><td><code>production)</code></td></tr>
<tr><td style="font-family:monospace;">pat1|pat2)</td><td>case</td><td>Either pattern (OR)</td><td><code>yes|y|YES)</code></td></tr>
<tr><td style="font-family:monospace;">*.ext)</td><td>case</td><td>Glob — ends with .ext</td><td><code>*.csv|*.CSV)</code></td></tr>
<tr><td style="font-family:monospace;">[abc])</td><td>case</td><td>Character class</td><td><code>[yY])</code></td></tr>
<tr><td style="font-family:monospace;">*)</td><td>case</td><td>Catch-all default</td><td><code>*) echo "unknown" ;;</code></td></tr>
<tr><td style="font-family:monospace;">;;</td><td>case</td><td>End branch, exit case</td><td>normal terminator</td></tr>
<tr><td style="font-family:monospace;">;&amp;</td><td>case</td><td>Fall through to next block (run it)</td><td>unconditional fall-through</td></tr>
<tr><td style="font-family:monospace;">;;&amp;</td><td>case</td><td>Continue testing patterns</td><td>conditional fall-through</td></tr>
</tbody>
</table>
</div>
</div>

<h2 class="section-title"><span class="sec-num"></span> Real-World Patterns — Data Engineering Conditionals</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 160" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="160" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">Which Conditional Form to Choose — Decision Guide</text>

  <!-- Comparing strings -->
  <rect x="12" y="36" width="194" height="112" rx="7" fill="#161b22" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="109" y="54" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#58a6ff">Comparing strings?</text>
  <text x="22" y="72" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">[[ $A == $B ]]</text>
  <text x="22" y="88" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">[[ $A == *.csv ]]</text>
  <text x="22" y="104" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">[[ $A =~ ^[0-9]+$ ]]</text>
  <text x="22" y="120" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">[[ -z $A ]]</text>
  <text x="109" y="140" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#58a6ff">use [[ ]]</text>

  <!-- Comparing numbers -->
  <rect x="216" y="36" width="194" height="112" rx="7" fill="#161b22" stroke="#bc8cff" stroke-width="1.5"/>
  <text x="313" y="54" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#bc8cff">Comparing numbers?</text>
  <text x="226" y="72" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">(( A > B ))</text>
  <text x="226" y="88" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">(( A >= 10 && A &lt; 100 ))</text>
  <text x="226" y="104" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">or: [[ $A -gt $B ]]</text>
  <text x="226" y="120" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">never: [[ $A > $B ]]</text>
  <text x="313" y="140" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#bc8cff">use (( )) preferred</text>

  <!-- Checking files -->
  <rect x="420" y="36" width="194" height="112" rx="7" fill="#161b22" stroke="#ffa657" stroke-width="1.5"/>
  <text x="517" y="54" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">Checking files?</text>
  <text x="430" y="72" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">[[ -f $FILE ]]</text>
  <text x="430" y="88" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">[[ -d $DIR ]]</text>
  <text x="430" y="104" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">[[ -s $FILE &amp;&amp; -r $FILE ]]</text>
  <text x="430" y="120" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">[[ $A -nt $B ]]</text>
  <text x="517" y="140" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">use [[ ]] with file ops</text>

  <!-- Multiple values -->
  <rect x="624" y="36" width="184" height="112" rx="7" fill="#161b22" stroke="#3fb950" stroke-width="1.5"/>
  <text x="716" y="54" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#3fb950">Multiple values?</text>
  <text x="634" y="72" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">case "$VAR" in</text>
  <text x="634" y="88" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">  prod) ... ;;</text>
  <text x="634" y="104" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">  dev|test) ... ;;</text>
  <text x="634" y="120" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">  *.csv) ... ;;</text>
  <text x="716" y="140" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">use case (cleaner than elif)</text>
</svg>
</div>


<!-- Decision matrix for real-world use -->


<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Production Conditional Patterns for Data Engineers</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ PATTERN 1: FULL PREFLIGHT VALIDATION ════════════════════</span>
preflight() {
    local ERRORS=0

    [[ -n \${ENVIRONMENT:-} ]]         || { echo "ENVIRONMENT not set" >&2;       ((ERRORS++)); }
    [[ $ENVIRONMENT =~ ^(dev|staging|prod)$ ]] \
                                       || { echo "Invalid ENVIRONMENT" >&2;       ((ERRORS++)); }
    [[ -f \${INPUT_FILE:-} ]]           || { echo "INPUT_FILE missing" >&2;        ((ERRORS++)); }
    [[ -s \${INPUT_FILE:-} ]]           || { echo "INPUT_FILE is empty" >&2;       ((ERRORS++)); }
    command -v python3 &>/dev/null     || { echo "python3 not found" >&2;         ((ERRORS++)); }
    command -v psql    &>/dev/null     || { echo "psql not found" >&2;            ((ERRORS++)); }
    (( $(df /data --output=avail -m | tail -1) > 200 )) \
                                       || { echo "Low disk space on /data" >&2;   ((ERRORS++)); }

    (( ERRORS == 0 ))
}

preflight || { echo "Preflight failed — aborting" >&2; exit 1; }
echo "All preflight checks passed"

<span class="cb-cmt">## ═══ PATTERN 2: FILE FORMAT DISPATCH ════════════════════════</span>
load_file() {
    local FILE="$1"

    case "\${FILE,,}" in           <span class="cb-cmt"># \${FILE,,} = lowercase extension</span>
        *.csv)        python3 loaders/csv_loader.py    "$FILE" ;;
        *.json)       python3 loaders/json_loader.py   "$FILE" ;;
        *.parquet)    python3 loaders/parquet_loader.py "$FILE" ;;
        *.csv.gz|*.csv.bz2)
                      decompress "$FILE" | python3 loaders/csv_loader.py - ;;
        *.xlsx|*.xls) python3 loaders/excel_loader.py  "$FILE" ;;
        *)            echo "ERROR: Unsupported format: $FILE" >&2; return 1 ;;
    esac
}

<span class="cb-cmt">## ═══ PATTERN 3: ROW COUNT VALIDATION ════════════════════════</span>
validate_row_count() {
    local FILE="$1"
    local MIN="\${2:-100}"
    local MAX="\${3:-10000000}"
    local ROWS

    ROWS=$(wc -l < "$FILE")
    ROWS=$(( ROWS - 1 ))          <span class="cb-cmt"># subtract header</span>

    if (( ROWS < MIN )); then
        echo "ERROR: Only $ROWS rows — expected at least $MIN" >&2
        return 1
    elif (( ROWS > MAX )); then
        echo "WARN: $ROWS rows — unusually high (max expected $MAX)" >&2
        return 2
    else
        echo "Row count OK: $ROWS"
        return 0
    fi
}

<span class="cb-cmt">## ═══ PATTERN 4: ENVIRONMENT-AWARE CONFIG ════════════════════</span>
configure() {
    case "\${ENVIRONMENT:-dev}" in
        prod|production)
            DB_HOST="\${DB_HOST:-prod-db.cluster.internal}"
            DB_PORT="\${DB_PORT:-5432}"
            LOG_LEVEL="WARN"
            MAX_RETRIES=5
            PARALLEL_JOBS=8
            ;;
        staging)
            DB_HOST="\${DB_HOST:-staging-db.internal}"
            DB_PORT="\${DB_PORT:-5432}"
            LOG_LEVEL="INFO"
            MAX_RETRIES=3
            PARALLEL_JOBS=4
            ;;
        dev|development|"")
            DB_HOST="\${DB_HOST:-localhost}"
            DB_PORT="\${DB_PORT:-5432}"
            LOG_LEVEL="DEBUG"
            MAX_RETRIES=1
            PARALLEL_JOBS=2
            ;;
        *)
            echo "Unknown environment: $ENVIRONMENT" >&2; exit 1 ;;
    esac
    readonly DB_HOST DB_PORT LOG_LEVEL MAX_RETRIES PARALLEL_JOBS
}

<span class="cb-cmt">## ═══ PATTERN 5: SMART RETRY ══════════════════════════════════</span>
run_with_retry() {
    local CMD="$1"
    local MAX="\${2:-3}"
    local DELAY="\${3:-5}"
    local attempt=1

    while (( attempt <= MAX )); do
        if eval "$CMD"; then
            return 0
        fi
        if (( attempt < MAX )); then
            echo "Attempt $attempt/$MAX failed — retrying in \${DELAY}s" >&2
            sleep "$DELAY"
            (( DELAY *= 2 ))      <span class="cb-cmt"># exponential backoff</span>
        fi
        (( attempt++ ))
    done
    echo "All $MAX attempts failed" >&2
    return 1
}

run_with_retry "python3 fragile_loader.py" 3 10

<span class="cb-cmt">## ═══ PATTERN 6: PARALLEL HEALTH CHECK ═══════════════════════</span>
check_servers() {
    local -a SERVERS=("$@")
    local -A STATUS
    local PIDS=()

    for SERVER in "\${SERVERS[@]}"; do
        (
            if ping -c1 -W2 "$SERVER" &>/dev/null; then
                echo "$SERVER:UP"
            else
                echo "$SERVER:DOWN"
            fi
        ) &
        PIDS+=($!)
    done

    for PID in "\${PIDS[@]}"; do wait "$PID"; done | while IFS=: read -r host state; do
        STATUS["$host"]="$state"
    done

    local ALL_UP=true
    for SERVER in "\${SERVERS[@]}"; do
        if [[ "\${STATUS[$SERVER]:-UNKNOWN}" != "UP" ]]; then
            echo "WARN: $SERVER is \${STATUS[$SERVER]:-UNKNOWN}" >&2
            ALL_UP=false
        fi
    done
    [[ $ALL_UP == true ]]
}
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 14 — COMMON MISTAKES
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Common Mistakes &amp; Debugging Guide</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 130" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="130" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">Mistake Severity Map — What Goes Wrong &amp; How Badly</text>

  <!-- Axis labels -->
  <text x="28" y="50" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Mistake</text>
  <text x="255" y="50" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Symptom</text>
  <text x="470" y="50" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Severity</text>
  <text x="590" y="50" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Debug Hint</text>
  <line x1="15" y1="54" x2="805" y2="54" stroke="#30363d" stroke-width="1"/>

  <!-- Row 1 -->
  <text x="20" y="72" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">[ $X &gt; 5 ]</text>
  <text x="250" y="72" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Creates file "5", always true</text>
  <rect x="462" y="60" width="76" height="18" rx="3" fill="#2a1a1a" stroke="#f85149" stroke-width="1"/>
  <text x="500" y="73" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#f85149">SILENT BUG</text>
  <text x="585" y="72" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">ls -la; use (( )) or -gt</text>

  <!-- Row 2 -->
  <text x="20" y="90" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">[[ "9" &gt; "10" ]]</text>
  <text x="250" y="90" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Evaluates to true (wrong!)</text>
  <rect x="462" y="78" width="76" height="18" rx="3" fill="#2a1a1a" stroke="#f85149" stroke-width="1"/>
  <text x="500" y="91" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#f85149">LOGIC BUG</text>
  <text x="585" y="90" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Use -gt or (( )) for numbers</text>

  <!-- Row 3 -->
  <text x="20" y="108" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">(( COUNT-- )) set -e</text>
  <text x="250" y="108" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Script exits when COUNT=0</text>
  <rect x="462" y="96" width="76" height="18" rx="3" fill="#2a1a1a" stroke="#f85149" stroke-width="1"/>
  <text x="500" y="109" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#f85149">FATAL EXIT</text>
  <text x="585" y="108" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Add || true or (( C--, 1 ))</text>
</svg>
</div>


<!-- Mistake impact matrix -->


<div class="two-col-grid">
  <div class="card hard-card">
    <div class="type-badge badge-warn">❌ == in [ ] — not POSIX</div>
    <pre style="font-family:monospace;font-size:12px;color:#f85149;background:#0d1117;padding:10px;border-radius:4px;margin:8px 0 4px;">if [ "$VAR" == "yes" ]; then</pre>
    <p style="font-size:12px;color:#8b949e;margin:4px 0;">Use <code>=</code> in POSIX <code>[ ]</code>. Also quote <code>"$VAR"</code> — unquoted breaks on spaces.</p>










<!-- Kernel conditional evaluation diagram -->



<!-- test / [ ] / [[ ]] architecture visual -->



<!-- Short-circuit truth table visual -->


    <pre style="font-family:monospace;font-size:12px;color:#3fb950;background:#0d1117;padding:8px;border-radius:4px;margin:4px 0;">if [[ $VAR == "yes" ]]; then    # bash
if [ "$VAR" = "yes" ]; then     # POSIX</pre>
  </div>
  <div class="card hard-card">
    <div class="type-badge badge-warn">❌ &gt; inside [ ] = redirection</div>
    <pre style="font-family:monospace;font-size:12px;color:#f85149;background:#0d1117;padding:10px;border-radius:4px;margin:8px 0 4px;">if [ $COUNT > 5 ]; then</pre>
    <p style="font-size:12px;color:#8b949e;margin:4px 0;"><code>&gt;</code> inside <code>[ ]</code> redirects stdout to a file named <code>5</code>. Always creates file, condition is always "true".</p>
    <pre style="font-family:monospace;font-size:12px;color:#3fb950;background:#0d1117;padding:8px;border-radius:4px;margin:4px 0;">if (( COUNT > 5 )); then        # cleanest
if [[ $COUNT -gt 5 ]]; then     # also correct</pre>
  </div>
  <div class="card hard-card">
    <div class="type-badge badge-warn">❌ Quoted glob pattern</div>
    <pre style="font-family:monospace;font-size:12px;color:#f85149;background:#0d1117;padding:10px;border-radius:4px;margin:8px 0 4px;">if [[ $FILE == "*.csv" ]]; then</pre>
    <p style="font-size:12px;color:#8b949e;margin:4px 0;">Quoting the pattern prevents glob expansion — matches the literal string <code>*.csv</code> only.</p>
    <pre style="font-family:monospace;font-size:12px;color:#3fb950;background:#0d1117;padding:8px;border-radius:4px;margin:4px 0;">if [[ $FILE == *.csv ]]; then   # no quotes on pattern</pre>
  </div>
  <div class="card hard-card">
    <div class="type-badge badge-warn">❌ $? overwritten before check</div>
    <pre style="font-family:monospace;font-size:12px;color:#f85149;background:#0d1117;padding:10px;border-radius:4px;margin:8px 0 4px;">some_command
echo "result"
if [ $? -eq 0 ]; then</pre>
    <p style="font-size:12px;color:#8b949e;margin:4px 0;"><code>$?</code> holds <code>echo</code>'s exit code (0), not <code>some_command</code>'s. Save it immediately.</p>
    <pre style="font-family:monospace;font-size:12px;color:#3fb950;background:#0d1117;padding:8px;border-radius:4px;margin:4px 0;">some_command; STATUS=$?   # capture immediately
if (( STATUS == 0 )); then</pre>
  </div>
  <div class="card hard-card">
    <div class="type-badge badge-warn">❌ Forgetting then / missing fi</div>
    <pre style="font-family:monospace;font-size:12px;color:#f85149;background:#0d1117;padding:10px;border-radius:4px;margin:8px 0 4px;">if [[ -f $FILE ]]
    echo "exists"    # syntax error!
fi</pre>
    <p style="font-size:12px;color:#8b949e;margin:4px 0;"><code>then</code> is required. Must be on same line (after <code>;</code>) or next line. Every <code>if</code> needs a <code>fi</code>.</p>
    <pre style="font-family:monospace;font-size:12px;color:#3fb950;background:#0d1117;padding:8px;border-radius:4px;margin:4px 0;">if [[ -f $FILE ]]; then
    echo "exists"
fi</pre>
  </div>
  <div class="card hard-card">
    <div class="type-badge badge-warn">❌ String comparison for numbers</div>
    <pre style="font-family:monospace;font-size:12px;color:#f85149;background:#0d1117;padding:10px;border-radius:4px;margin:8px 0 4px;">if [[ $VERSION > "10" ]]; then</pre>
    <p style="font-size:12px;color:#8b949e;margin:4px 0;"><code>"9" &gt; "10"</code> is true lexicographically! Use numeric operators for numbers.</p>
    <pre style="font-family:monospace;font-size:12px;color:#3fb950;background:#0d1117;padding:8px;border-radius:4px;margin:4px 0;">if (( VERSION > 10 )); then     # numeric
if [[ $VERSION -gt 10 ]]; then  # also numeric</pre>
  </div>
  <div class="card hard-card">
    <div class="type-badge badge-warn">❌ (( expr )) exits with set -e</div>
    <pre style="font-family:monospace;font-size:12px;color:#f85149;background:#0d1117;padding:10px;border-radius:4px;margin:8px 0 4px;">set -e
COUNT=1
(( COUNT-- ))   # COUNT=0 → result 0 → EXIT!</pre>
    <p style="font-size:12px;color:#8b949e;margin:4px 0;"><code>(( ))</code> returns exit 1 when expression evaluates to zero. Silently kills script with <code>set -e</code>.</p>
    <pre style="font-family:monospace;font-size:12px;color:#3fb950;background:#0d1117;padding:8px;border-radius:4px;margin:4px 0;">(( COUNT-- )) || true      # safe
(( COUNT--, 1 ))           # comma ensures non-zero</pre>
  </div>
  <div class="card hard-card">
    <div class="type-badge badge-warn">❌ case ;;& vs ;& confusion</div>
    <pre style="font-family:monospace;font-size:12px;color:#f85149;background:#0d1117;padding:10px;border-radius:4px;margin:8px 0 4px;">case "$X" in
  a) echo "a" ;&   # runs b)'s block
  b) echo "b" ;;&  # tests next pattern
  *) echo "other" ;;</pre>
    <p style="font-size:12px;color:#8b949e;margin:4px 0;"><code>;&</code> = run next block unconditionally. <code>;;&</code> = test next pattern (only run if it matches). Most code should use <code>;;</code>.</p>
  </div>
  <div class="card hard-card">
    <div class="type-badge badge-warn">❌ -v test for array elements</div>
    <pre style="font-family:monospace;font-size:12px;color:#f85149;background:#0d1117;padding:10px;border-radius:4px;margin:8px 0 4px;"># Wrong way to check array key:
[[ -n "\${MAP[key]}" ]]   # fails if value is empty</pre>
    <p style="font-size:12px;color:#8b949e;margin:4px 0;">An array key can exist with an empty value. Use <code>-v</code> to check key existence.</p>
    <pre style="font-family:monospace;font-size:12px;color:#3fb950;background:#0d1117;padding:8px;border-radius:4px;margin:4px 0;">[[ -v MAP[key] ]]   # true if key exists (even empty)</pre>
  </div>
  <div class="card hard-card">
    <div class="type-badge badge-warn">❌ Regex anchors forgotten</div>
    <pre style="font-family:monospace;font-size:12px;color:#f85149;background:#0d1117;padding:10px;border-radius:4px;margin:8px 0 4px;"># Meant to check for pure digits:
[[ $X =~ [0-9]+ ]]   # matches "abc123" too!</pre>
    <p style="font-size:12px;color:#8b949e;margin:4px 0;">Without <code>^</code> and <code>$</code> anchors, the regex matches anywhere in the string.</p>
    <pre style="font-family:monospace;font-size:12px;color:#3fb950;background:#0d1117;padding:8px;border-radius:4px;margin:4px 0;">[[ $X =~ ^[0-9]+$ ]]  # full-string match</pre>
  </div>
</div>

<div class="console-block" style="margin-top:20px;">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Debugging Conditionals — Techniques When Things Don't Work</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ─── PRINT WHAT bash IS ACTUALLY TESTING ─────────────────────</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">bash</span> <span class="cb-flag">-x</span> script.sh        <span class="cb-cmt"># trace: shows each condition as evaluated</span>
<span class="cb-out">+ [[ -f report.csv ]]</span>
<span class="cb-out">+ [[ report.csv == *.csv ]]</span>
<span class="cb-out">+ echo 'Processing report.csv'</span>

<span class="cb-cmt">## ─── PRINT VARIABLE VALUES BEFORE TESTING ─────────────────────</span>
echo "DEBUG: FILE=[$FILE] ENV=[$ENVIRONMENT] COUNT=[$COUNT]" >&2
if [[ -f $FILE ]]; then ...

<span class="cb-cmt">## ─── TEST INTERACTIVELY IN THE SHELL ──────────────────────────</span>
<span class="cb-prompt">$</span> FILE="report.csv"
<span class="cb-prompt">$</span> [[ $FILE == *.csv ]] && echo "MATCH" || echo "NO MATCH"
<span class="cb-out">MATCH</span>

<span class="cb-prompt">$</span> COUNT=0
<span class="cb-prompt">$</span> (( COUNT )) && echo "true" || echo "false"
<span class="cb-out">false</span>

<span class="cb-cmt">## ─── USE declare -p TO SEE VARIABLE STATE ─────────────────────</span>
<span class="cb-prompt">$</span> declare -p FILE COUNT ENVIRONMENT
<span class="cb-out">declare -- FILE="report.csv"</span>
<span class="cb-out">declare -i COUNT="5"</span>
<span class="cb-out">declare -- ENVIRONMENT="staging"</span>
<span class="cb-cmt"># Reveals type attributes (integer, readonly, etc.) that affect conditionals</span>

<span class="cb-cmt">## ─── CHECK WHAT [[ ]] ACTUALLY SEES ──────────────────────────</span>
<span class="cb-prompt">$</span> V="  spaces  "
<span class="cb-prompt">$</span> [[ -n $V ]] && echo "has content"    <span class="cb-cmt"># fine — [[ ]] doesn't word-split</span>
<span class="cb-prompt">$</span> [ -n $V ] && echo "has content"      <span class="cb-cmt"># may break — word-split on spaces</span>

<span class="cb-cmt">## ─── SHELLCHECK CATCHES CONDITIONAL BUGS ─────────────────────</span>
<span class="cb-prompt">$</span> shellcheck script.sh
<span class="cb-out">SC2039: In POSIX sh, == in place of = is undefined.</span>
<span class="cb-out">SC2086: Double quote to prevent globbing and word splitting.</span>
<span class="cb-out">SC2166: Prefer [ p ] && [ q ] over [ p -a q ].</span>
</pre></div></div>
</div>

<div class="section-block">
<h2 class="section-title"><span class="sec-num">15</span> Practice Exercises with Solutions</h2>

<div class="exercise-panel easy">
  <div class="ex-badge easy-badge">Easy</div>
  <div class="ex-body">
    <h4>Exercise 1 — File Validator</h4>
    <p>Write <code>validate.sh</code> that takes a filename as argument and checks:</p>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Argument was provided (exit 2 with usage if not)</li>
      <li>File exists — <code>-e</code></li>
      <li>It is a regular file — <code>-f</code></li>
      <li>It is non-empty — <code>-s</code></li>
      <li>It is readable — <code>-r</code></li>
      <li>Filename ends with <code>.csv</code> — glob pattern <code>== *.csv</code></li>
      <li>First line (header) contains "date" — <code>grep -q</code></li>
    </ol>
    <p>Print a clear PASS or FAIL message for each check. Exit 0 only if all pass.</p>
    <p><strong>Bonus:</strong> Use a <code>case</code> on the extension to print which parser would be used (<code>.csv</code> → pandas, <code>.json</code> → json.load, <code>.parquet</code> → pyarrow, else → unsupported).</p>
  </div>
</div>

<div class="exercise-panel easy">
  <div class="ex-badge easy-badge">Easy</div>
  <div class="ex-body">
    <h4>Exercise 2 — Regex Input Validator</h4>
    <p>Write a <code>check_input.sh</code> function that validates user input using <code>[[ =~ ]]</code>:</p>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Date in YYYY-MM-DD format</li>
      <li>Email address (basic: user@domain.tld)</li>
      <li>Port number (1–65535)</li>
      <li>IP address (four 0-255 octets)</li>
      <li>A semantic version like <code>v1.2.3</code> — extract major, minor, patch into separate variables using <code>BASH_REMATCH</code></li>
    </ol>
    <p>For each, print "VALID: &lt;input&gt;" or "INVALID: &lt;input&gt; — expected &lt;format&gt;".</p>
  </div>
</div>

<div class="exercise-panel medium">
  <div class="ex-badge medium-badge">Medium</div>
  <div class="ex-body">
    <h4>Exercise 3 — Environment Config Dispatcher</h4>
    <p>Write <code>configure.sh</code> using <code>case</code> for full environment configuration:</p>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Accept <code>-e ENV</code> flag with getopts (dev/staging/prod)</li>
      <li>Use <code>case</code> to set: DB_HOST, DB_PORT, LOG_LEVEL, MAX_CONNECTIONS, BATCH_SIZE, ENABLE_CACHE</li>
      <li>Use a second <code>case</code> on <code>$OSTYPE</code> to set OS-specific variables (Linux vs macOS vs cygwin)</li>
      <li>Use <code>case</code> on the file extension of a provided data file to set the PARSER variable</li>
      <li>Use fall-through (<code>;&</code>) so "prod" also executes the "staging" health checks</li>
      <li>Validate all resulting variables with compound conditions using <code>&amp;&amp;</code> and <code>||</code></li>
      <li>Print a formatted summary table of all configuration values using <code>printf</code></li>
    </ol>
  </div>
</div>

<div class="exercise-panel medium">
  <div class="ex-badge medium-badge">Medium</div>
  <div class="ex-body">
    <h4>Exercise 4 — Smart Pipeline Guard</h4>
    <p>Write a <code>run_pipeline.sh</code> that uses all conditional forms:</p>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li><strong>if/elif/else:</strong> choose data source strategy based on day of week (<code>$(date +%u)</code> — 1=Mon, 7=Sun): weekday→incremental, Saturday→full, Sunday→skip</li>
      <li><strong>Compound [[ ]]:</strong> validate that input exists AND is non-empty AND was modified in the last 24 hours (<code>-nt</code> comparison with a temp file)</li>
      <li><strong>(( )):</strong> check row count is between MIN and MAX thresholds</li>
      <li><strong>Short-circuit:</strong> use guard clauses for all prerequisites</li>
      <li><strong>case:</strong> dispatch to the right loader based on file format</li>
      <li><strong>Ternary:</strong> set VERBOSE flag, DRY_RUN flag, and COMPRESSION_FLAG using inline conditional idioms</li>
    </ol>
  </div>
</div>

<div class="exercise-panel hard">
  <div class="ex-badge hard-badge">Hard</div>
  <div class="ex-body">
    <h4>Exercise 5 — Production Decision Engine</h4>
    <p>Build <code>decision_engine.sh</code> — a complete conditional-driven pipeline controller:</p>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li><strong>Input validation:</strong> Full preflight using a loop over required vars with indirection <code>\${!varname}</code> and regex checks for each</li>
      <li><strong>Environment branching:</strong> <code>case</code> on ENVIRONMENT with fall-through so prod runs staging's extra validations too</li>
      <li><strong>File routing:</strong> <code>case</code> on file extension using <code>;;$</code> fall-through so <code>.csv.gz</code> matches both <code>*.gz</code> (for decompression) AND <code>*.csv</code> (for parsing)</li>
      <li><strong>Numeric guards:</strong> Check rows <code>(( ))</code>, file age <code>-nt</code>, disk space, process count — all with meaningful exit codes</li>
      <li><strong>Retry logic:</strong> Wrap DB load in retry function using while loop + <code>if</code> on exit code + exponential backoff</li>
      <li><strong>Decision tree:</strong> Based on row count, error rate, and duration: classify run as SUCCESS, PARTIAL, or FAILED using nested if/elif with compound conditions</li>
      <li><strong>Report:</strong> Generate a formatted HTML summary file using a here-doc with variable expansion showing all decisions made</li>
    </ol>
    <p><strong>Must pass <code>shellcheck</code> with zero warnings.</strong></p>
  </div>
</div>

<!-- Wrap-up story -->
<div class="story-panel" style="margin-top:32px;">
  <div class="story-avatar">🧑‍💻</div>
  <div class="story-body">
    <div class="story-title">Ravi's Script — Day 145</div>
    <p>Ravi's pipeline script now had 14 conditional checks before it did a single unit of work. File exists. File non-empty. File readable. Format valid. Environment set. Database reachable. Disk space available. Python version correct. Required packages installed. Input row count in range. Today is a processing day. Lock file not held by another instance. Output directory writable. Network to S3 reachable.</p>
    <p>Every one of those was a bug he had seen before — not in his own code, but in the incident reports he read over three months. Someone's script ran on an empty file. Someone's pipeline wrote to a full disk. Someone's deployment pushed to the wrong environment because the ENVIRONMENT variable wasn't set.</p>
    <p>"A script that checks its preconditions," Priya told him early on, "is a script that fails fast and tells you exactly why." Ravi looked at his 14 guards and felt something new: confidence. <strong>Not because he trusted his code — but because his code didn't trust anything.</strong></p>
  </div>
</div>

</div><!-- /section-block -->
\`

`
};