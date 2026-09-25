
var awk= {
    title: "Data Engineering Toolkit — awk, sed & grep Power",
    description: "Master the three Unix text processing powerhouses at expert depth — grep for pattern matching with every flag and regex variety, sed for stream editing with substitution, deletion, insertion, and hold space operations, and awk for structured data processing, aggregation, and reporting. The complete toolkit for log analysis, CSV processing, and ETL transformation.",
    content: `
<style>
/* ── Keyframe animations ── */
@keyframes ag-flow  { 0%{stroke-dashoffset:28} 100%{stroke-dashoffset:0} }
@keyframes ag-pulse { 0%,100%{opacity:1} 50%{opacity:.15} }
@keyframes ag-match { 0%{fill:#0d1117} 40%{fill:#1a2a1a} 60%{fill:#2a4a2a} 100%{fill:#1a3a1a} }
@keyframes ag-scan  { 0%{transform:translateX(0)} 100%{transform:translateX(580px)} }
@keyframes ag-pop   { 0%{transform:scale(0);opacity:0} 70%{transform:scale(1.12)} 100%{transform:scale(1);opacity:1} }
@keyframes ag-blink { 0%,100%{fill:#f85149;opacity:1} 50%{fill:#3d0000;opacity:.3} }
@keyframes ag-slide { 0%{transform:translateX(-20px);opacity:0} 100%{transform:translateX(0);opacity:1} }
@keyframes ag-spin  { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
@keyframes ag-glow  { 0%,100%{stroke:#3fb950;stroke-width:1.5} 50%{stroke:#52ff6e;stroke-width:3} }

.ag-flow  { stroke-dasharray:7 5; animation: ag-flow  .9s linear infinite; }
.ag-pulse { animation: ag-pulse 1.8s ease-in-out infinite; }
.ag-match { animation: ag-match  .8s ease-in-out forwards; }
.ag-blink { animation: ag-blink 1.4s ease-in-out infinite; }
.ag-pop   { animation: ag-pop   .5s cubic-bezier(.34,1.56,.64,1) both; }
.ag-glow  { animation: ag-glow  2s ease-in-out infinite; }
</style>

<!-- ══════════════════════════════════════════════════════
     RAVI'S STORY — HOOK
══════════════════════════════════════════════════════ -->
<div class="story-panel">
  <div class="story-avatar">🧑‍💻</div>
  <div class="story-body">
    <div class="story-title">Ravi's 20-Minute vs 3-Second Report — Day 460</div>
    <br>
    <p>The daily sales report took Ravi twenty minutes to generate. He'd open the 800MB log file in a text editor, copy out the relevant lines, paste them into a spreadsheet, manually calculate totals, format the numbers. Every day. Twenty minutes.</p>
    <br>
    <p>Priya watched him do it once and wrote four lines on a sticky note:</p>
    <br>
    <pre style="font-family:monospace;font-size:12px;background:#161b22;padding:8px;border-radius:4px;color:#3fb950;">grep "SALE" access.log | \
awk -F'|' '{sum[$3] += $5; count[$3]++} \
END {for(r in sum) printf "%-20s %8.2f (%d)\n", r, sum[r], count[r]}' | \
sort -k2 -rn | head -20</pre>
    <br>
    <p>"Run that," she said. Three seconds. Twenty lines of output: top 20 regions by revenue, formatted, sorted, counted.</p>
    <br>
    <p>Ravi stared at it. "How does awk know which column is which?" Priya explained field splitting. "What does <code>sum[$3]</code> mean?" Associative arrays. "Why <code>END{}</code>?" Pattern blocks. Each answer made the next question obvious. Within an hour he understood enough to build his own patterns — and he never opened the text editor for log analysis again.</p>
    <br>
    <p>This module is that hour, written down.</p>
  </div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 1 — GREP: PATTERN MATCHING ENGINE
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> grep — Pattern Matching Engine: How It Works</h2>

<p><code>grep</code> reads each line of input, tests it against a pattern (a regular expression), and outputs matching lines. The pattern is compiled into an NFA (Non-deterministic Finite Automaton) which processes each character in O(n) time. Understanding this tells you why some patterns are slow and how to write fast ones.</p>

<div class="diagram-wrap">
<svg viewBox="0 0 820 290" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 20px;">
  <defs>
    <marker id="ag-grn" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#3fb950"/></marker>
    <marker id="ag-blu" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#58a6ff"/></marker>
    <marker id="ag-orn" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#ffa657"/></marker>
    <marker id="ag-pur" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#bc8cff"/></marker>
    <marker id="ag-red" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#f85149"/></marker>
    <marker id="ag-arr" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#8b949e"/></marker>
  </defs>
  <rect width="820" height="290" fill="#0d1117" rx="12"/>
  <text x="410" y="24" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="13" font-weight="bold" fill="#8b949e">grep Pattern Matching — Three Regex Flavours Compared</text>

  <!-- BRE -->
  <rect x="14" y="36" width="245" height="240" rx="8" fill="#0e1824" stroke="#58a6ff" stroke-width="2"/>
  <text x="136" y="57" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#58a6ff">BRE — Basic Regex</text>
  <text x="136" y="72" text-anchor="middle" font-family="'Courier New',monospace" font-size="9.5" fill="#8b949e">grep 'pattern' file</text>
  <line x1="24" y1="80" x2="249" y2="80" stroke="#58a6ff" stroke-width="1" stroke-dasharray="4,2"/>

  <text x="24" y="100" font-family="'Segoe UI',sans-serif" font-size="9.5" font-weight="bold" fill="#58a6ff">Metacharacters:</text>
  <text x="24" y="117" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">. ^ $ * [ ] \</text>
  <text x="24" y="133" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Groups need escaping:</text>
  <text x="24" y="149" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">\( \)  \{ \}  \+  \?</text>
  <text x="24" y="165" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Backreference:</text>
  <text x="24" y="181" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">\\1  \\2  (first match)</text>
  <line x1="24" y1="190" x2="249" y2="190" stroke="#58a6ff" stroke-width="1" stroke-dasharray="4,2"/>
  <text x="24" y="207" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Example:</text>
  <text x="24" y="223" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">grep 'SALE\|ERROR'</text>
  <text x="24" y="239" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">grep '[0-9]\{3\}'</text>
  <text x="24" y="255" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">Legacy default</text>
  <text x="24" y="269" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">POSIX standard</text>

  <!-- ERE -->
  <rect x="291" y="36" width="245" height="240" rx="8" fill="#1a2a1a" stroke="#3fb950" stroke-width="2.5"/>
  <text x="413" y="57" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#3fb950">ERE — Extended Regex</text>
  <text x="413" y="72" text-anchor="middle" font-family="'Courier New',monospace" font-size="9.5" fill="#8b949e">grep -E 'pattern'  egrep</text>
  <line x1="301" y1="80" x2="526" y2="80" stroke="#3fb950" stroke-width="1" stroke-dasharray="4,2"/>

  <text x="301" y="100" font-family="'Segoe UI',sans-serif" font-size="9.5" font-weight="bold" fill="#3fb950">All BRE + no escaping for:</text>
  <text x="301" y="117" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">+  ?  |  ( )  { }</text>
  <text x="301" y="133" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Alternation (no backslash):</text>
  <text x="301" y="149" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">SALE|ERROR|WARN</text>
  <text x="301" y="165" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Quantifiers:</text>
  <text x="301" y="181" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">+  ?  {3}  {2,5}</text>
  <line x1="301" y1="190" x2="526" y2="190" stroke="#3fb950" stroke-width="1" stroke-dasharray="4,2"/>
  <text x="301" y="207" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Examples:</text>
  <text x="301" y="223" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">grep -E 'err(or)?'</text>
  <text x="301" y="239" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">grep -E '^[0-9]{4}-'</text>
  <text x="301" y="255" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">⭐ Recommended</text>
  <text x="301" y="269" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Most readable</text>

  <!-- PCRE -->
  <rect x="568" y="36" width="238" height="240" rx="8" fill="#2a2a14" stroke="#ffa657" stroke-width="2"/>
  <text x="687" y="57" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#ffa657">PCRE — Perl-Compatible</text>
  <text x="687" y="72" text-anchor="middle" font-family="'Courier New',monospace" font-size="9.5" fill="#8b949e">grep -P 'pattern'</text>
  <line x1="578" y1="80" x2="796" y2="80" stroke="#ffa657" stroke-width="1" stroke-dasharray="4,2"/>

  <text x="578" y="100" font-family="'Segoe UI',sans-serif" font-size="9.5" font-weight="bold" fill="#ffa657">All ERE + advanced:</text>
  <text x="578" y="117" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">\d \w \s \b</text>
  <text x="578" y="133" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Lookahead/behind:</text>
  <text x="578" y="149" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">(?=...) (?&lt;=...)</text>
  <text x="578" y="165" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Non-greedy:</text>
  <text x="578" y="181" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">.*?  .+?</text>
  <line x1="578" y1="190" x2="796" y2="190" stroke="#ffa657" stroke-width="1" stroke-dasharray="4,2"/>
  <text x="578" y="207" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Examples:</text>
  <text x="578" y="223" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">grep -P '\d{4}-\d{2}'</text>
  <text x="578" y="239" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">grep -P '(?&lt;=id=)\d+'</text>
  <text x="578" y="255" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">Most powerful</text>
  <text x="578" y="269" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">May not be available</text>
</svg>
<p class="diagram-caption">Always use <code>grep -E</code> for new scripts — ERE syntax is clean, readable, and available everywhere. Use <code>grep -P</code> when you need <code>\d</code>, <code>\w</code>, lookaheads, or non-greedy matching. Use plain <code>grep</code> (BRE) only when matching legacy scripts or POSIX portability is required.</p>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 1 of 12 — grep: every flag with real examples</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ ESSENTIAL FLAGS ══════════════════════════════════════════</span>
<span class="cb-prompt">$</span> grep -i "error" app.log        <span class="cb-cmt"># -i: case-insensitive</span>
<span class="cb-prompt">$</span> grep -v "DEBUG" app.log        <span class="cb-cmt"># -v: invert (lines NOT matching)</span>
<span class="cb-prompt">$</span> grep -c "ERROR" app.log        <span class="cb-cmt"># -c: count of matching lines</span>
<span class="cb-out">47</span>
<span class="cb-prompt">$</span> grep -n "ERROR" app.log        <span class="cb-cmt"># -n: show line numbers</span>
<span class="cb-out">142:ERROR: Connection timeout</span>
<span class="cb-out">389:ERROR: Disk full</span>
<span class="cb-prompt">$</span> grep -l "ERROR" /var/log/*.log <span class="cb-cmt"># -l: list files with matches</span>
<span class="cb-out">app.log</span>
<span class="cb-out">system.log</span>
<span class="cb-prompt">$</span> grep -L "ERROR" /var/log/*.log <span class="cb-cmt"># -L: list files WITHOUT matches</span>

<span class="cb-cmt">## ═══ CONTEXT FLAGS ════════════════════════════════════════════</span>
<span class="cb-prompt">$</span> grep -A 3 "ERROR" app.log      <span class="cb-cmt"># -A: 3 lines After match</span>
<span class="cb-prompt">$</span> grep -B 3 "ERROR" app.log      <span class="cb-cmt"># -B: 3 lines Before match</span>
<span class="cb-prompt">$</span> grep -C 3 "ERROR" app.log      <span class="cb-cmt"># -C: 3 lines of Context (both)</span>
<span class="cb-out">2024-01-15 10:32:01 INFO  Starting upload</span>
<span class="cb-out">2024-01-15 10:32:02 INFO  Processing batch 42</span>
<span class="cb-out">2024-01-15 10:32:03 ERROR Connection timeout</span>
<span class="cb-out">2024-01-15 10:32:03 ERROR Retrying...</span>
<span class="cb-out">2024-01-15 10:32:05 WARN  Fallback to cache</span>

<span class="cb-cmt">## ═══ EXTRACTION ══════════════════════════════════════════════</span>
<span class="cb-prompt">$</span> grep -o '[0-9]\+\.[0-9]\+\.[0-9]\+\.[0-9]\+' access.log  <span class="cb-cmt"># -o: only matching part</span>
<span class="cb-out">192.168.1.50</span>
<span class="cb-out">10.0.0.15</span>
<span class="cb-cmt"># -o prints ONLY the matching text (not the whole line)
# Essential for extraction tasks: IPs, dates, amounts, IDs</span>

<span class="cb-prompt">$</span> grep -oE '[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}' access.log
<span class="cb-cmt"># -E with -o: ERE pattern + extract only match</span>

<span class="cb-cmt">## ═══ RECURSIVE SEARCH ════════════════════════════════════════</span>
<span class="cb-prompt">$</span> grep -r "DB_HOST" /opt/         <span class="cb-cmt"># -r: recursive (follows symlinks)</span>
<span class="cb-prompt">$</span> grep -R "DB_HOST" /opt/         <span class="cb-cmt"># -R: recursive (follows symlinks)</span>
<span class="cb-prompt">$</span> grep -rl "DB_HOST" /opt/        <span class="cb-cmt"># list files only</span>
<span class="cb-prompt">$</span> grep -r --include="*.py" "import pandas" /opt/
<span class="cb-prompt">$</span> grep -r --exclude="*.pyc" "TODO" /opt/
<span class="cb-prompt">$</span> grep -r --exclude-dir=".git" "password" /opt/

<span class="cb-cmt">## ═══ WORD AND LINE ANCHORS ═══════════════════════════════════</span>
<span class="cb-prompt">$</span> grep -w "error" app.log         <span class="cb-cmt"># -w: whole word only (not "errors")</span>
<span class="cb-prompt">$</span> grep -x "ERROR" app.log         <span class="cb-cmt"># -x: whole line match only</span>
<span class="cb-prompt">$</span> grep "^ERROR" app.log           <span class="cb-cmt"># line starts with ERROR</span>
<span class="cb-prompt">$</span> grep "timeout$" app.log         <span class="cb-cmt"># line ends with timeout</span>
<span class="cb-prompt">$</span> grep "^$" app.log               <span class="cb-cmt"># empty lines</span>
<span class="cb-prompt">$</span> grep -v "^$" app.log            <span class="cb-cmt"># remove empty lines</span>

<span class="cb-cmt">## ═══ MULTIPLE PATTERNS ════════════════════════════════════════</span>
<span class="cb-prompt">$</span> grep -E "ERROR|WARN|FATAL" app.log    <span class="cb-cmt"># OR with ERE</span>
<span class="cb-prompt">$</span> grep -e "ERROR" -e "WARN" app.log     <span class="cb-cmt"># -e: multiple -e flags</span>
<span class="cb-prompt">$</span> grep -f patterns.txt app.log          <span class="cb-cmt"># -f: read patterns from file</span>

<span class="cb-cmt">## ═══ PERFORMANCE ════════════════════════════════════════════</span>
<span class="cb-prompt">$</span> LC_ALL=C grep "ERROR" huge.log  <span class="cb-cmt"># LC_ALL=C: 2-3x faster (ASCII mode)</span>
<span class="cb-prompt">$</span> grep -F "ERROR" huge.log        <span class="cb-cmt"># -F: fixed string (no regex, fastest)</span>
<span class="cb-prompt">$</span> grep -m 100 "ERROR" huge.log    <span class="cb-cmt"># -m 100: stop after 100 matches</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 2 — GREP REGEX PATTERNS VISUAL
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> grep Regex Patterns — All Character Classes &amp; Quantifiers</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 300" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 20px;">
  <rect width="820" height="300" fill="#0d1117" rx="12"/>
  <text x="410" y="24" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="13" font-weight="bold" fill="#8b949e">Character Classes, Quantifiers, Anchors &amp; Special Sequences</text>

  <!-- Character Classes -->
  <rect x="14" y="36" width="250" height="254" rx="8" fill="#0e1824" stroke="#58a6ff" stroke-width="2"/>
  <text x="139" y="56" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#58a6ff">Character Classes</text>
  <line x1="24" y1="62" x2="254" y2="62" stroke="#58a6ff" stroke-width="1" stroke-dasharray="4,2"/>

  <text x="24" y="80"  font-family="'Courier New',monospace" font-size="11" fill="#3fb950">.</text>   <text x="52" y="80"  font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> = any char except newline</text>
  <text x="24" y="97"  font-family="'Courier New',monospace" font-size="11" fill="#3fb950">[abc]</text><text x="78" y="97"  font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> = a, b, or c</text>
  <text x="24" y="114" font-family="'Courier New',monospace" font-size="11" fill="#3fb950">[^abc]</text><text x="84" y="114" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> = NOT a, b, or c</text>
  <text x="24" y="131" font-family="'Courier New',monospace" font-size="11" fill="#3fb950">[a-z]</text><text x="78" y="131" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> = lowercase letter</text>
  <text x="24" y="148" font-family="'Courier New',monospace" font-size="11" fill="#3fb950">[0-9]</text><text x="78" y="148" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> = digit</text>
  <text x="24" y="165" font-family="'Courier New',monospace" font-size="11" fill="#ffa657">[:alpha:]</text><text x="102" y="165" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> = letters (locale-aware)</text>
  <text x="24" y="182" font-family="'Courier New',monospace" font-size="11" fill="#ffa657">[:digit:]</text><text x="102" y="182" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> = digits</text>
  <text x="24" y="199" font-family="'Courier New',monospace" font-size="11" fill="#ffa657">[:alnum:]</text><text x="102" y="199" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> = letters + digits</text>
  <text x="24" y="216" font-family="'Courier New',monospace" font-size="11" fill="#ffa657">[:space:]</text><text x="102" y="216" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> = whitespace</text>
  <text x="24" y="233" font-family="'Courier New',monospace" font-size="11" fill="#ffa657">[:upper:]</text><text x="102" y="233" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> = uppercase</text>
  <text x="24" y="250" font-family="'Courier New',monospace" font-size="11" fill="#ffa657">[:lower:]</text><text x="102" y="250" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> = lowercase</text>
  <text x="24" y="267" font-family="'Courier New',monospace" font-size="11" fill="#bc8cff">\d \w \s</text><text x="96" y="267" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> = PCRE (-P) only</text>
  <text x="24" y="283" font-family="'Segoe UI',sans-serif" font-size="8" fill="#ffa657">POSIX classes: use inside [[ ]] like [[:digit:]]</text>

  <!-- Quantifiers -->
  <rect x="282" y="36" width="244" height="254" rx="8" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="404" y="56" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#3fb950">Quantifiers (greedy)</text>
  <line x1="292" y1="62" x2="516" y2="62" stroke="#3fb950" stroke-width="1" stroke-dasharray="4,2"/>

  <text x="292" y="80"  font-family="'Courier New',monospace" font-size="11" fill="#3fb950">*</text>   <text x="312" y="80"  font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> = 0 or more (greedy)</text>
  <text x="292" y="97"  font-family="'Courier New',monospace" font-size="11" fill="#3fb950">+</text>   <text x="312" y="97"  font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> = 1 or more</text>
  <text x="292" y="114" font-family="'Courier New',monospace" font-size="11" fill="#3fb950">?</text>   <text x="312" y="114" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> = 0 or 1 (optional)</text>
  <text x="292" y="131" font-family="'Courier New',monospace" font-size="11" fill="#3fb950">{n}</text> <text x="322" y="131" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> = exactly n times</text>
  <text x="292" y="148" font-family="'Courier New',monospace" font-size="11" fill="#3fb950">{n,}</text><text x="326" y="148" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> = n or more</text>
  <text x="292" y="165" font-family="'Courier New',monospace" font-size="11" fill="#3fb950">{n,m}</text><text x="334" y="165" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> = between n and m</text>
  <text x="292" y="182" font-family="'Courier New',monospace" font-size="11" fill="#bc8cff">*?  +?  ??</text><text x="360" y="182" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#bc8cff"> non-greedy (PCRE)</text>

  <text x="292" y="205" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#3fb950">Anchors:</text>
  <text x="292" y="222" font-family="'Courier New',monospace" font-size="11" fill="#3fb950">^</text>   <text x="312" y="222" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> = start of line</text>
  <text x="292" y="239" font-family="'Courier New',monospace" font-size="11" fill="#3fb950">$</text>   <text x="312" y="239" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> = end of line</text>
  <text x="292" y="256" font-family="'Courier New',monospace" font-size="11" fill="#3fb950">\b</text>  <text x="316" y="256" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> = word boundary (PCRE)</text>
  <text x="292" y="273" font-family="'Courier New',monospace" font-size="11" fill="#3fb950">\&lt;</text>  <text x="312" y="273" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> = word start (BRE/ERE)</text>
  <text x="292" y="285" font-family="'Courier New',monospace" font-size="11" fill="#3fb950">\&gt;</text>  <text x="312" y="285" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> = word end (BRE/ERE)</text>

  <!-- Real examples -->
  <rect x="544" y="36" width="262" height="254" rx="8" fill="#2a2a14" stroke="#ffa657" stroke-width="2"/>
  <text x="675" y="56" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#ffa657">Pattern Examples</text>
  <line x1="554" y1="62" x2="796" y2="62" stroke="#ffa657" stroke-width="1" stroke-dasharray="4,2"/>

  <text x="554" y="78" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">IPv4 address:</text>
  <text x="554" y="93" font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950">grep -E '\b([0-9]{1,3}\.){3}[0-9]{1,3}\b'</text>
  <text x="554" y="115" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">ISO date YYYY-MM-DD:</text>
  <text x="554" y="130" font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950">grep -E '[0-9]{4}-[0-9]{2}-[0-9]{2}'</text>
  <text x="554" y="152" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">Email address:</text>
  <text x="554" y="167" font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950">grep -E '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'</text>
  <text x="554" y="189" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">HTTP status code:</text>
  <text x="554" y="204" font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950">grep -E 'HTTP/[0-9.]+" [45][0-9]{2}'</text>
  <text x="554" y="226" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">Non-empty non-comment lines:</text>
  <text x="554" y="241" font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950">grep -Ev '^\s*(#|$)'</text>
  <text x="554" y="263" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">Currency amount $1,234.56:</text>
  <text x="554" y="278" font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950">grep -P '$[\d,]+\.\d{2}'</text>
</svg>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 2 of 12 — grep: advanced patterns, -o extraction, log analysis recipes</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ EXTRACT SPECIFIC FIELDS WITH -o ════════════════════════</span>
<span class="cb-cmt"># Extract all IP addresses:</span>
<span class="cb-prompt">$</span> grep -oE '\b([0-9]{1,3}\.){3}[0-9]{1,3}\b' access.log | sort -u

<span class="cb-cmt"># Extract timestamps:</span>
<span class="cb-prompt">$</span> grep -oE '[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}' app.log

<span class="cb-cmt"># Extract HTTP status codes (only the 3-digit codes):</span>
<span class="cb-prompt">$</span> grep -oP '(?<=HTTP/\d\.\d" )\d{3}' access.log | sort | uniq -c | sort -rn
<span class="cb-out">12543 200</span>
<span class="cb-out">  456 404</span>
<span class="cb-out">   89 500</span>

<span class="cb-cmt"># Extract values after a key:</span>
<span class="cb-prompt">$</span> grep -oP '(?<=user_id=)\d+' app.log | sort -u

<span class="cb-cmt">## ═══ LOG ANALYSIS RECIPES ════════════════════════════════════</span>
<span class="cb-cmt"># Errors in last hour:</span>
<span class="cb-prompt">$</span> grep "$(date -d '1 hour ago' '+%Y-%m-%d %H')" app.log | grep -c ERROR

<span class="cb-cmt"># Unique IPs that hit 500 errors:</span>
<span class="cb-prompt">$</span> grep ' 500 ' access.log | grep -oE '\b([0-9]{1,3}\.){3}[0-9]{1,3}' | sort -u

<span class="cb-cmt"># Lines between two patterns (inclusive):</span>
<span class="cb-prompt">$</span> grep -n "START" app.log       <span class="cb-cmt"># find line 45</span>
<span class="cb-prompt">$</span> sed -n '45,/END/p' app.log     <span class="cb-cmt"># print from line 45 to END pattern</span>

<span class="cb-cmt"># Count errors per hour:</span>
<span class="cb-prompt">$</span> grep ERROR app.log | grep -oE '[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}' | \
  sort | uniq -c
<span class="cb-out">  12 2024-01-15 08</span>
<span class="cb-out">  45 2024-01-15 09</span>
<span class="cb-out"> 189 2024-01-15 10</span>

<span class="cb-cmt"># Find files containing all of several patterns:</span>
<span class="cb-prompt">$</span> grep -rl "ERROR" /var/log/ | xargs grep -l "timeout" | xargs grep -l "db"

<span class="cb-cmt">## ═══ GREP IN SCRIPTS ════════════════════════════════════════</span>
<span class="cb-cmt"># Silent pattern test (exit code only):</span>
if grep -qE "^FAILED:" results.txt; then
    echo "Build failed!" >&2
    exit 1
fi
<span class="cb-cmt"># -q: quiet (suppress output)  exit 0=found  exit 1=not found</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 3 — SED: STREAM EDITOR ANATOMY
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> sed — Stream Editor: Anatomy &amp; Execution Model</h2>

<p>sed reads input line by line into a <strong>pattern space</strong>, optionally applies one or more commands, then writes the pattern space to output. This cycle repeats for every line. Understanding this model — pattern space, hold space, addresses, and commands — is the key to all sed operations.</p>

<div class="diagram-wrap">
<svg viewBox="0 0 820 300" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 20px;">
  <rect width="820" height="300" fill="#0d1117" rx="12"/>
  <text x="410" y="24" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="13" font-weight="bold" fill="#8b949e">sed Execution Model — Per-Line Cycle &amp; Address Anatomy</text>

  <!-- Execution cycle diagram (top) -->
  <text x="60" y="52" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#8b949e">Execution Cycle:</text>

  <rect x="14"  y="60" width="130" height="40" rx="7" fill="#0e1824" stroke="#58a6ff" stroke-width="2"/>
  <text x="79"  y="84" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#58a6ff">Read line</text>
  <text x="79"  y="96" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#8b949e">→ pattern space</text>

  <line x1="144" y1="80" x2="190" y2="80" stroke="#3fb950" stroke-width="2" marker-end="url(#ag-grn)" class="ag-flow"/>

  <rect x="190" y="60" width="150" height="40" rx="7" fill="#2a2a14" stroke="#ffa657" stroke-width="2"/>
  <text x="265" y="84" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#ffa657">Match address?</text>
  <text x="265" y="96" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#8b949e">line#, regex, range</text>

  <line x1="340" y1="80" x2="388" y2="80" stroke="#3fb950" stroke-width="2" marker-end="url(#ag-grn)" class="ag-flow"/>
  <text x="364" y="73" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#3fb950">yes</text>

  <rect x="388" y="60" width="150" height="40" rx="7" fill="#1f1428" stroke="#bc8cff" stroke-width="2"/>
  <text x="463" y="84" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#bc8cff">Execute cmd</text>
  <text x="463" y="96" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#8b949e">s, d, p, a, i…</text>

  <line x1="538" y1="80" x2="586" y2="80" stroke="#3fb950" stroke-width="2" marker-end="url(#ag-grn)" class="ag-flow"/>

  <rect x="586" y="60" width="150" height="40" rx="7" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="661" y="78" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#3fb950">Print (unless -n)</text>
  <text x="661" y="94" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#8b949e">pattern space → stdout</text>

  <!-- No match path -->
  <path d="M265,100 Q265,120 661,120 Q661,108 661,100" fill="none" stroke="#30363d" stroke-width="1.5" stroke-dasharray="4,2"/>
  <text x="463" y="132" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#30363d">no match → skip command, still print</text>

  <!-- Address anatomy -->
  <text x="410" y="158" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#8b949e">Address Types &amp; sed Command Anatomy:</text>

  <rect x="14" y="166" width="792" height="126" rx="8" fill="#161b22" stroke="#30363d" stroke-width="1.5"/>

  <!-- sed command line breakdown -->
  <text x="26" y="188" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">Full command structure:</text>
  <text x="26" y="208" font-family="'Courier New',monospace" font-size="13" fill="#e6edf3">sed  </text>
  <rect x="66" y="196" width="60" height="22" rx="4" fill="#0e1824" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="96" y="211" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#58a6ff">ADDR</text>
  <text x="130" y="208" font-family="'Courier New',monospace" font-size="13" fill="#e6edf3">{</text>
  <rect x="143" y="196" width="62" height="22" rx="4" fill="#1f1428" stroke="#bc8cff" stroke-width="1.5"/>
  <text x="174" y="211" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#bc8cff">CMD</text>
  <text x="209" y="208" font-family="'Courier New',monospace" font-size="13" fill="#e6edf3">}</text>

  <!-- Address types annotations -->
  <text x="26"  y="238" font-family="'Courier New',monospace" font-size="10" fill="#58a6ff">2</text>         <text x="44"  y="238" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> = line 2 only  </text>
  <text x="160" y="238" font-family="'Courier New',monospace" font-size="10" fill="#58a6ff">$</text>         <text x="172" y="238" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> = last line  </text>
  <text x="275" y="238" font-family="'Courier New',monospace" font-size="10" fill="#58a6ff">2,5</text>      <text x="305" y="238" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> = lines 2-5  </text>
  <text x="405" y="238" font-family="'Courier New',monospace" font-size="10" fill="#58a6ff">/regex/</text> <text x="455" y="238" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> = lines matching regex  </text>
  <text x="590" y="238" font-family="'Courier New',monospace" font-size="10" fill="#58a6ff">/START/,/END/</text><text x="686" y="238" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> = range</text>

  <text x="26"  y="258" font-family="'Courier New',monospace" font-size="10" fill="#bc8cff">2~3</text>      <text x="56"  y="258" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> = every 3rd line starting at 2  </text>
  <text x="230" y="258" font-family="'Courier New',monospace" font-size="10" fill="#bc8cff">0,/re/</text>   <text x="275" y="258" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> = line 0 to first match (GNU)  </text>
  <text x="470" y="258" font-family="'Courier New',monospace" font-size="10" fill="#bc8cff">!</text>         <text x="484" y="258" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> = negate address (2!d = delete all EXCEPT line 2)</text>

  <text x="26" y="278" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">⚡ Pro tip: sed -n '10,20p' file = print only lines 10-20 (like head/tail but flexible)</text>
</svg>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 3 of 12 — sed: s substitution, all flags, in-place editing, -n -i -e</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ THE s COMMAND — SUBSTITUTION ═══════════════════════════</span>
<span class="cb-cmt"># Syntax: s/PATTERN/REPLACEMENT/FLAGS</span>
<span class="cb-prompt">$</span> sed 's/foo/bar/'   file.txt    <span class="cb-cmt"># first occurrence per line</span>
<span class="cb-prompt">$</span> sed 's/foo/bar/g'  file.txt    <span class="cb-cmt"># -g: ALL occurrences per line</span>
<span class="cb-prompt">$</span> sed 's/foo/bar/2'  file.txt    <span class="cb-cmt"># only 2nd occurrence</span>
<span class="cb-prompt">$</span> sed 's/foo/bar/3g' file.txt    <span class="cb-cmt"># from 3rd occurrence to end</span>
<span class="cb-prompt">$</span> sed 's/foo/bar/I'  file.txt    <span class="cb-cmt"># -I: case-insensitive (GNU)</span>
<span class="cb-prompt">$</span> sed 's/foo/bar/p'  file.txt    <span class="cb-cmt"># print line when substitution made</span>
<span class="cb-prompt">$</span> sed -n 's/foo/bar/p' file.txt  <span class="cb-cmt"># print ONLY lines where sub happened</span>

<span class="cb-cmt">## ═══ DELIMITER ALTERNATIVES ═══════════════════════════════════</span>
<span class="cb-cmt"># Slash in pattern? Use different delimiter:</span>
<span class="cb-prompt">$</span> sed 's|/old/path|/new/path|g'  <span class="cb-cmt"># | as delimiter</span>
<span class="cb-prompt">$</span> sed 's#/old/path#/new/path#g'  <span class="cb-cmt"># # as delimiter</span>
<span class="cb-prompt">$</span> sed 's,/old/path,/new/path,g'  <span class="cb-cmt"># , as delimiter — any char works</span>

<span class="cb-cmt">## ═══ CAPTURE GROUPS — BACKREFERENCES ═════════════════════════</span>
<span class="cb-cmt"># Rearrange date from YYYY-MM-DD to DD/MM/YYYY:</span>
<span class="cb-prompt">$</span> echo "2024-01-15" | sed 's/\([0-9]\{4\}\)-\([0-9]\{2\}\)-\([0-9]\{2\}\)/\\3\/\\2\/\\1/'
<span class="cb-out">15/01/2024</span>
<span class="cb-cmt"># With ERE (-E):</span>
<span class="cb-prompt">$</span> echo "2024-01-15" | sed -E 's/([0-9]{4})-([0-9]{2})-([0-9]{2})/\\3\/\\2\/\\1/'
<span class="cb-out">15/01/2024</span>
<span class="cb-cmt"># -E: groups with ( ) not \( \), cleaner syntax</span>

<span class="cb-cmt">## ═══ & BACKREFERENCE — WHOLE MATCH ═══════════════════════════</span>
<span class="cb-cmt"># & = the entire matched text</span>
<span class="cb-prompt">$</span> echo "hello world" | sed 's/[a-z]\+/[&]/g'
<span class="cb-out">[hello] [world]</span>
<span class="cb-cmt"># Wrap numbers in quotes:</span>
<span class="cb-prompt">$</span> sed -E 's/[0-9]+/"&"/g' data.csv

<span class="cb-cmt">## ═══ IN-PLACE EDITING ════════════════════════════════════════</span>
<span class="cb-prompt">$</span> sed -i 's/localhost/prod-db.internal/g' config.env     <span class="cb-cmt"># modify file directly</span>
<span class="cb-prompt">$</span> sed -i.bak 's/localhost/prod-db.internal/g' config.env <span class="cb-cmt"># .bak keeps backup</span>
<span class="cb-cmt"># macOS: sed -i '' 's/foo/bar/' file  (empty string required on macOS)</span>

<span class="cb-cmt">## ═══ MULTIPLE COMMANDS ════════════════════════════════════════</span>
<span class="cb-prompt">$</span> sed -e 's/foo/bar/g' -e 's/baz/qux/g' file.txt   <span class="cb-cmt"># multiple -e</span>
<span class="cb-prompt">$</span> sed 's/foo/bar/g; s/baz/qux/g' file.txt           <span class="cb-cmt"># semicolon separator</span>
<span class="cb-prompt">$</span> sed -f commands.sed file.txt                       <span class="cb-cmt"># read commands from file</span>

<span class="cb-cmt">## ═══ LINE SELECTION ══════════════════════════════════════════</span>
<span class="cb-prompt">$</span> sed -n '1p' file.txt           <span class="cb-cmt"># print first line only (like head -1)</span>
<span class="cb-prompt">$</span> sed -n '$p' file.txt           <span class="cb-cmt"># print last line only (like tail -1)</span>
<span class="cb-prompt">$</span> sed -n '10,20p' file.txt       <span class="cb-cmt"># print lines 10-20</span>
<span class="cb-prompt">$</span> sed -n '/START/,/END/p' file.txt  <span class="cb-cmt"># between patterns</span>
<span class="cb-prompt">$</span> sed '1~2d' file.txt            <span class="cb-cmt"># delete every 2nd line (1,3,5...)</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 4 — SED COMMAND GALLERY (ANIMATED)
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> sed Command Gallery — d, p, a, i, c, y, =, q, D, N, P</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 280" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 20px;">
  <rect width="820" height="280" fill="#0d1117" rx="12"/>
  <text x="410" y="24" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="13" font-weight="bold" fill="#8b949e">sed Command Reference — Every Command with Effect</text>

  <!-- Grid of commands: 3 columns × 4 rows -->
  <!-- Row 1 -->
  <rect x="14"  y="36" width="248" height="54" rx="7" fill="#2a1a14" stroke="#f85149" stroke-width="1.8"/>
  <text x="138" y="56" text-anchor="middle" font-family="'Courier New',monospace" font-size="16" font-weight="bold" fill="#f85149">d</text>
  <text x="138" y="72" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Delete pattern space, next line</text>
  <text x="138" y="84" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#3fb950">sed '/^#/d' config.txt</text>

  <rect x="286" y="36" width="248" height="54" rx="7" fill="#1a2a14" stroke="#3fb950" stroke-width="1.8"/>
  <text x="410" y="56" text-anchor="middle" font-family="'Courier New',monospace" font-size="16" font-weight="bold" fill="#3fb950">p</text>
  <text x="410" y="72" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Print pattern space (use with -n)</text>
  <text x="410" y="84" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#3fb950">sed -n '/ERROR/p' log</text>

  <rect x="558" y="36" width="248" height="54" rx="7" fill="#1a2a14" stroke="#3fb950" stroke-width="1.8"/>
  <text x="682" y="56" text-anchor="middle" font-family="'Courier New',monospace" font-size="16" font-weight="bold" fill="#3fb950">q  Q</text>
  <text x="682" y="72" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Quit after Nth line (q prints, Q skips)</text>
  <text x="682" y="84" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#3fb950">sed '5q' file  (head -5)</text>

  <!-- Row 2 -->
  <rect x="14"  y="100" width="248" height="54" rx="7" fill="#0e1824" stroke="#58a6ff" stroke-width="1.8"/>
  <text x="138" y="120" text-anchor="middle" font-family="'Courier New',monospace" font-size="16" font-weight="bold" fill="#58a6ff">a</text>
  <text x="138" y="136" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Append line AFTER match</text>
  <text x="138" y="148" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#3fb950">sed '/^END/a ## appended'</text>

  <rect x="286" y="100" width="248" height="54" rx="7" fill="#0e1824" stroke="#58a6ff" stroke-width="1.8"/>
  <text x="410" y="120" text-anchor="middle" font-family="'Courier New',monospace" font-size="16" font-weight="bold" fill="#58a6ff">i</text>
  <text x="410" y="136" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Insert line BEFORE match</text>
  <text x="410" y="148" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#3fb950">sed '/^START/i ## header'</text>

  <rect x="558" y="100" width="248" height="54" rx="7" fill="#1f1428" stroke="#bc8cff" stroke-width="1.8"/>
  <text x="682" y="120" text-anchor="middle" font-family="'Courier New',monospace" font-size="16" font-weight="bold" fill="#bc8cff">c</text>
  <text x="682" y="136" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Change: replace matching line(s)</text>
  <text x="682" y="148" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#3fb950">sed '/old_line/c new_line'</text>

  <!-- Row 3 -->
  <rect x="14"  y="164" width="248" height="54" rx="7" fill="#2a2a14" stroke="#ffa657" stroke-width="1.8"/>
  <text x="138" y="184" text-anchor="middle" font-family="'Courier New',monospace" font-size="16" font-weight="bold" fill="#ffa657">y</text>
  <text x="138" y="200" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Transliterate characters (like tr)</text>
  <text x="138" y="212" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#3fb950">sed 'y/abc/ABC/' (to upper)</text>

  <rect x="286" y="164" width="248" height="54" rx="7" fill="#2a2a14" stroke="#ffa657" stroke-width="1.8"/>
  <text x="410" y="184" text-anchor="middle" font-family="'Courier New',monospace" font-size="16" font-weight="bold" fill="#ffa657">=</text>
  <text x="410" y="200" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Print current line number</text>
  <text x="410" y="212" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#3fb950">sed -n '/ERROR/=' log</text>

  <rect x="558" y="164" width="248" height="54" rx="7" fill="#1a1428" stroke="#bc8cff" stroke-width="1.8"/>
  <text x="682" y="184" text-anchor="middle" font-family="'Courier New',monospace" font-size="16" font-weight="bold" fill="#bc8cff">r  R  w  W</text>
  <text x="682" y="200" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Read/Write file at match point</text>
  <text x="682" y="212" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#3fb950">sed '/MARKER/r insert.txt'</text>

  <!-- Row 4: Multi-line -->
  <rect x="14"  y="228" width="248" height="42" rx="7" fill="#1a1a2a" stroke="#58a6ff" stroke-width="1.8"/>
  <text x="138" y="248" text-anchor="middle" font-family="'Courier New',monospace" font-size="14" font-weight="bold" fill="#58a6ff">N  D  P</text>
  <text x="138" y="264" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">Multi-line: append next line (N), delete first line of buf (D), print first line (P)</text>

  <rect x="286" y="228" width="248" height="42" rx="7" fill="#1a1a2a" stroke="#bc8cff" stroke-width="1.8"/>
  <text x="410" y="248" text-anchor="middle" font-family="'Courier New',monospace" font-size="14" font-weight="bold" fill="#bc8cff">H  G  h  g</text>
  <text x="410" y="264" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">Hold space: H=append to hold, G=append hold to pattern, h=copy to hold, g=copy hold to pattern</text>

  <rect x="558" y="228" width="248" height="42" rx="7" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.8"/>
  <text x="682" y="248" text-anchor="middle" font-family="'Courier New',monospace" font-size="14" font-weight="bold" fill="#3fb950">b  t  T  :label</text>
  <text x="682" y="264" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">Branch: b=jump to label, t=branch if sub succeeded, T=branch if NOT succeeded</text>
</svg>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 4 of 12 — sed: delete, insert, append, change, y, line numbers, hold space</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ DELETE COMMANDS ═══════════════════════════════════════</span>
<span class="cb-prompt">$</span> sed '/^#/d' config.env          <span class="cb-cmt"># delete comment lines</span>
<span class="cb-prompt">$</span> sed '/^$/d' file.txt             <span class="cb-cmt"># delete empty lines</span>
<span class="cb-prompt">$</span> sed '/^#/d; /^$/d' config.env   <span class="cb-cmt"># delete both</span>
<span class="cb-prompt">$</span> sed '1d' file.txt               <span class="cb-cmt"># delete first line (skip header)</span>
<span class="cb-prompt">$</span> sed '$d' file.txt               <span class="cb-cmt"># delete last line</span>
<span class="cb-prompt">$</span> sed '2~2d' file.txt             <span class="cb-cmt"># delete every even line</span>
<span class="cb-prompt">$</span> sed '/START/,/END/d' file.txt   <span class="cb-cmt"># delete block between patterns</span>
<span class="cb-cmt"># Delete matching lines and next 3 lines after them:</span>
<span class="cb-prompt">$</span> sed '/ERROR/{N;N;N;d}' log.txt

<span class="cb-cmt">## ═══ INSERT AND APPEND ═══════════════════════════════════════</span>
<span class="cb-cmt"># Insert CSV header:</span>
<span class="cb-prompt">$</span> sed '1i date,region,amount,status' data.csv

<span class="cb-cmt"># Append footer after last line:</span>
<span class="cb-prompt">$</span> sed '$a ## END OF FILE' config.txt

<span class="cb-cmt"># Insert a blank line before every section header:</span>
<span class="cb-prompt">$</span> sed '/^\[/i \\' config.ini

<span class="cb-cmt">## ═══ TRANSLITERATE WITH y ════════════════════════════════════</span>
<span class="cb-prompt">$</span> sed 'y/abcdefghijklmnopqrstuvwxyz/ABCDEFGHIJKLMNOPQRSTUVWXYZ/' <span class="cb-cmt"># uppercase</span>
<span class="cb-prompt">$</span> sed 'y/,/\t/' data.csv           <span class="cb-cmt"># CSV to TSV</span>
<span class="cb-prompt">$</span> sed 'y/:-/ /' timestamps.txt     <span class="cb-cmt"># replace separators</span>

<span class="cb-cmt">## ═══ PRINT LINE NUMBERS ═══════════════════════════════════════</span>
<span class="cb-prompt">$</span> sed -n '/ERROR/=' app.log        <span class="cb-cmt"># print line numbers of ERROR lines</span>
<span class="cb-out">142</span>
<span class="cb-out">389</span>
<span class="cb-prompt">$</span> sed '=' file.txt | sed 'N; s/\n/\t/'   <span class="cb-cmt"># prepend line numbers</span>
<span class="cb-out">1\tFirst line</span>
<span class="cb-out">2\tSecond line</span>

<span class="cb-cmt">## ═══ HOLD SPACE — REVERSE A FILE ════════════════════════════</span>
<span class="cb-prompt">$</span> sed -n '1!G; h; $p' file.txt    <span class="cb-cmt"># reverse file (like tac)</span>
<span class="cb-cmt"># 1!G = on all lines except 1st: append hold to pattern
# h    = copy pattern to hold
# $p   = on last line: print
# Net effect: reverses line order</span>

<span class="cb-cmt">## ═══ REAL-WORLD TRANSFORMATIONS ════════════════════════════</span>
<span class="cb-cmt"># Convert Windows CRLF to Unix LF:</span>
<span class="cb-prompt">$</span> sed 's/\r//' windows.txt > unix.txt

<span class="cb-cmt"># Remove trailing whitespace:</span>
<span class="cb-prompt">$</span> sed 's/[[:space:]]*$//' file.txt

<span class="cb-cmt"># Extract lines between two patterns (including markers):</span>
<span class="cb-prompt">$</span> sed -n '/^---BEGIN/,/^---END/p' file.txt

<span class="cb-cmt"># Join continuation lines (lines ending with backslash):</span>
<span class="cb-prompt">$</span> sed ':a; /\$/{N; s/\\\n//; ba}' file.txt

<span class="cb-cmt"># Double-space a file:</span>
<span class="cb-prompt">$</span> sed 'G' file.txt

<span class="cb-cmt"># Number only non-empty lines:</span>
<span class="cb-prompt">$</span> sed -n '/./=' file.txt | sed 'N; s/\n/ /'
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 5 — AWK ANATOMY (ANIMATED)
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> awk — Program Anatomy &amp; Execution Model</h2>

<p>awk is a complete programming language optimised for structured text processing. Every awk program consists of <strong>pattern-action pairs</strong>: for each line of input, awk tests the pattern — if it matches, the action runs. The patterns <code>BEGIN</code> and <code>END</code> run before any input and after all input respectively.</p>

<div class="diagram-wrap">
<svg viewBox="0 0 820 310" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 20px;">
  <rect width="820" height="310" fill="#0d1117" rx="12"/>
  <text x="410" y="24" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="13" font-weight="bold" fill="#8b949e">awk Program Anatomy — BEGIN / Pattern-Action / END</text>

  <!-- Code panel (left) -->
  <rect x="14" y="36" width="390" height="264" rx="8" fill="#161b22" stroke="#30363d" stroke-width="1.5"/>
  <text x="209" y="56" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#8b949e">awk Program Structure:</text>

  <rect x="26"  y="62" width="366" height="40" rx="6" fill="#0e1824" stroke="#58a6ff" stroke-width="2"/>
  <text x="209" y="80" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#58a6ff">BEGIN  {</text>
  <text x="209" y="96" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#58a6ff">  FS=","; OFS="\t"; print "Header"</text>

  <rect x="26"  y="110" width="366" height="44" rx="6" fill="#1a2a1a" stroke="#3fb950" stroke-width="2.5"/>
  <text x="209" y="128" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#3fb950">/pattern/  {</text>
  <text x="209" y="144" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#3fb950">  action executed for matching lines</text>

  <rect x="26"  y="162" width="366" height="44" rx="6" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.5" class="ag-pulse"/>
  <text x="209" y="180" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#3fb950">$5 > 1000  {</text>
  <text x="209" y="196" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#3fb950">  sum+=$5; count++</text>

  <rect x="26"  y="214" width="366" height="28" rx="6" fill="#1f2027" stroke="#8b949e" stroke-width="1.5"/>
  <text x="209" y="233" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#8b949e">{ print NR, $1, $5 }   # default: every line</text>

  <rect x="26"  y="250" width="366" height="40" rx="6" fill="#1f1428" stroke="#bc8cff" stroke-width="2"/>
  <text x="209" y="268" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#bc8cff">END  {</text>
  <text x="209" y="284" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#bc8cff">  printf "Total: %.2f avg: %.2f\n", sum, sum/count</text>

  <!-- Legend (right) -->
  <rect x="420" y="36" width="386" height="264" rx="8" fill="#1a1a2a" stroke="#30363d" stroke-width="1.5"/>
  <text x="613" y="56" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#8b949e">Pattern Types:</text>

  <rect x="432" y="62" width="362" height="40" rx="5" fill="#0e1824" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="456" y="78" font-family="'Courier New',monospace" font-size="10" font-weight="bold" fill="#58a6ff">BEGIN</text>
  <text x="518" y="78" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> runs once before any input. Set FS, OFS, print headers, init vars.</text>
  <text x="456" y="97" font-family="'Segoe UI',sans-serif" font-size="9" fill="#58a6ff">Never receives any input records.</text>

  <rect x="432" y="110" width="362" height="44" rx="5" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.5"/>
  <text x="456" y="126" font-family="'Courier New',monospace" font-size="10" font-weight="bold" fill="#3fb950">/regex/</text>
  <text x="508" y="126" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> runs when any field matches the regex</text>
  <text x="456" y="142" font-family="'Courier New',monospace" font-size="10" font-weight="bold" fill="#3fb950">expr</text>
  <text x="498" y="142" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">  runs when expression is truthy (non-zero, non-empty)</text>
  <text x="456" y="152" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Examples: NR>1, $5>0, $2~/ERROR/, NF==6</text>

  <rect x="432" y="162" width="362" height="44" rx="5" fill="#1f2027" stroke="#30363d" stroke-width="1.5"/>
  <text x="456" y="178" font-family="'Courier New',monospace" font-size="10" font-weight="bold" fill="#8b949e">empty / { }</text>
  <text x="536" y="178" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> runs on EVERY input line</text>
  <text x="456" y="194" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">pat1, pat2</text>
  <text x="518" y="194" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> range pattern: from pat1 to pat2 (inclusive)</text>
  <text x="456" y="202" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Example: /START/,/END/ { print }</text>

  <rect x="432" y="214" width="362" height="40" rx="5" fill="#1f1428" stroke="#bc8cff" stroke-width="1.5"/>
  <text x="456" y="230" font-family="'Courier New',monospace" font-size="10" font-weight="bold" fill="#bc8cff">END</text>
  <text x="490" y="230" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> runs once after all input. Print totals, summaries, close files.</text>
  <text x="456" y="248" font-family="'Segoe UI',sans-serif" font-size="9" fill="#bc8cff">NR and NF still set. $0 is last line processed.</text>

  <rect x="432" y="262" width="362" height="30" rx="5" fill="#2a1a14" stroke="#f85149" stroke-width="1.5"/>
  <text x="456" y="278" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#f85149">Multiple pattern-action pairs evaluated in ORDER for each line.</text>
  <text x="456" y="289" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">next = skip remaining pairs, go to next line. exit = stop processing.</text>
</svg>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 5 of 12 — awk: basic patterns, field access, print vs printf, -F, NR NF</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ BASIC AWK USAGE ════════════════════════════════════════</span>
<span class="cb-prompt">$</span> awk '{print}' file.txt           <span class="cb-cmt"># print every line (like cat)</span>
<span class="cb-prompt">$</span> awk '{print $1}' file.txt        <span class="cb-cmt"># print first field</span>
<span class="cb-prompt">$</span> awk '{print $NF}' file.txt       <span class="cb-cmt"># print last field ($NF = last)</span>
<span class="cb-prompt">$</span> awk '{print $1, $3}' file.txt    <span class="cb-cmt"># print fields 1 and 3</span>
<span class="cb-prompt">$</span> awk 'NR==1' file.txt             <span class="cb-cmt"># print first line only (like head -1)</span>
<span class="cb-prompt">$</span> awk 'END{print NR}' file.txt     <span class="cb-cmt"># count lines (like wc -l)</span>
<span class="cb-out">12543</span>

<span class="cb-cmt">## ═══ FIELD SEPARATOR ════════════════════════════════════════</span>
<span class="cb-prompt">$</span> awk -F',' '{print $1, $3}' data.csv    <span class="cb-cmt"># CSV: field sep = comma</span>
<span class="cb-prompt">$</span> awk -F'\t' '{print $2}' data.tsv       <span class="cb-cmt"># TSV: field sep = tab</span>
<span class="cb-prompt">$</span> awk -F'[,;|]' '{print $1}' mixed.txt   <span class="cb-cmt"># regex FS: comma or semicolon or pipe</span>
<span class="cb-prompt">$</span> awk -F': ' '{print $2}' /etc/passwd    <span class="cb-cmt"># colon-space separator</span>
<span class="cb-prompt">$</span> awk 'BEGIN{FS=","; OFS="\t"} {print $1,$3}' data.csv  <span class="cb-cmt"># in BEGIN</span>

<span class="cb-cmt">## ═══ print vs printf ═════════════════════════════════════════</span>
<span class="cb-prompt">$</span> awk '{print $1, $5}' data.csv       <span class="cb-cmt"># OFS between, newline at end</span>
<span class="cb-prompt">$</span> awk '{print $1 "\t" $5}' data.csv   <span class="cb-cmt"># explicit tab</span>

<span class="cb-cmt"># printf: C-style formatted output (no auto newline)</span>
<span class="cb-prompt">$</span> awk '{printf "%-20s %10.2f\n", $1, $5}' data.csv
<span class="cb-out">London               12345.67</span>
<span class="cb-out">Mumbai                8901.23</span>
<span class="cb-cmt"># %-20s = left-align string in 20 chars
# %10.2f = right-align float in 10 chars with 2 decimals
# Common: %d (int), %s (string), %f (float), %e (scientific)</span>

<span class="cb-cmt">## ═══ PATTERN MATCHING ═══════════════════════════════════════</span>
<span class="cb-prompt">$</span> awk '/ERROR/' app.log              <span class="cb-cmt"># lines matching regex</span>
<span class="cb-prompt">$</span> awk '!/ERROR/' app.log             <span class="cb-cmt"># lines NOT matching</span>
<span class="cb-prompt">$</span> awk '$5 > 1000' data.csv           <span class="cb-cmt"># field comparison</span>
<span class="cb-prompt">$</span> awk '$3 == "UK"' data.csv          <span class="cb-cmt"># string equality</span>
<span class="cb-prompt">$</span> awk '$3 ~ /^UK|US$/' data.csv      <span class="cb-cmt"># ~ = field matches regex</span>
<span class="cb-prompt">$</span> awk '$3 !~ /test/' data.csv        <span class="cb-cmt"># !~ = does NOT match</span>
<span class="cb-prompt">$</span> awk 'NR>1 && $5>0' data.csv        <span class="cb-cmt"># skip header AND filter</span>
<span class="cb-prompt">$</span> awk 'NR>=10 && NR<=20' data.csv    <span class="cb-cmt"># print lines 10-20</span>
<span class="cb-prompt">$</span> awk '/START/,/END/' file.txt       <span class="cb-cmt"># range pattern (START to END)</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 6 — AWK BUILT-IN VARIABLES (VISUAL)
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> awk Built-In Variables — The Complete Reference</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 270" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 20px;">
  <rect width="820" height="270" fill="#0d1117" rx="12"/>
  <text x="410" y="24" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="13" font-weight="bold" fill="#8b949e">awk Built-In Variables — Record, Field, Separator, and Counter Variables</text>

  <!-- Line anatomy top -->
  <rect x="14" y="36" width="792" height="56" rx="8" fill="#161b22" stroke="#30363d" stroke-width="1.5"/>
  <text x="26" y="54" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">Input line being processed:</text>

  <!-- Sample line broken into fields -->
  <rect x="26"  y="58" width="208" height="24" rx="4" fill="#2a1a14" stroke="#f85149" stroke-width="1.5"/>
  <text x="130" y="74" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#f85149">2024-01-15</text>
  <text x="130" y="88" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8" fill="#f85149">$1</text>

  <text x="240" y="73" font-family="'Courier New',monospace" font-size="11" fill="#30363d">FS</text>

  <rect x="256" y="58" width="120" height="24" rx="4" fill="#0e1824" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="316" y="74" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#58a6ff">London</text>
  <text x="316" y="88" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8" fill="#58a6ff">$2</text>

  <text x="382" y="73" font-family="'Courier New',monospace" font-size="11" fill="#30363d">FS</text>

  <rect x="398" y="58" width="120" height="24" rx="4" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.5"/>
  <text x="458" y="74" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#3fb950">SALE</text>
  <text x="458" y="88" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8" fill="#3fb950">$3</text>

  <text x="524" y="73" font-family="'Courier New',monospace" font-size="11" fill="#30363d">FS</text>

  <rect x="540" y="58" width="120" height="24" rx="4" fill="#2a2a14" stroke="#ffa657" stroke-width="1.5"/>
  <text x="600" y="74" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#ffa657">12345.67</text>
  <text x="600" y="88" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8" fill="#ffa657">$4 = $NF</text>

  <text x="782" y="68" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#bc8cff">$0 = whole line</text>
  <text x="782" y="81" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#bc8cff">NF = 4</text>

  <!-- Variable grid -->
  <text x="410" y="112" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#8b949e">All Built-In Variables:</text>

  <!-- Row 1 -->
  <rect x="14"  y="118" width="108" height="42" rx="5" fill="#2a1a14" stroke="#f85149" stroke-width="1.5"/>
  <text x="68"  y="136" text-anchor="middle" font-family="'Courier New',monospace" font-size="12" font-weight="bold" fill="#f85149">$0</text>
  <text x="68"  y="153" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#8b949e">entire current line</text>

  <rect x="130" y="118" width="108" height="42" rx="5" fill="#2a1a14" stroke="#f85149" stroke-width="1.5"/>
  <text x="184" y="136" text-anchor="middle" font-family="'Courier New',monospace" font-size="12" font-weight="bold" fill="#f85149">$1..$N</text>
  <text x="184" y="153" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#8b949e">field 1 to N</text>

  <rect x="246" y="118" width="108" height="42" rx="5" fill="#2a1a14" stroke="#f85149" stroke-width="1.5"/>
  <text x="300" y="136" text-anchor="middle" font-family="'Courier New',monospace" font-size="12" font-weight="bold" fill="#f85149">$NF</text>
  <text x="300" y="153" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#8b949e">last field</text>

  <rect x="362" y="118" width="108" height="42" rx="5" fill="#0e1824" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="416" y="136" text-anchor="middle" font-family="'Courier New',monospace" font-size="12" font-weight="bold" fill="#58a6ff">NR</text>
  <text x="416" y="153" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#8b949e">record (line) number</text>

  <rect x="478" y="118" width="108" height="42" rx="5" fill="#0e1824" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="532" y="136" text-anchor="middle" font-family="'Courier New',monospace" font-size="12" font-weight="bold" fill="#58a6ff">NF</text>
  <text x="532" y="153" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#8b949e">number of fields</text>

  <rect x="594" y="118" width="108" height="42" rx="5" fill="#0e1824" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="648" y="136" text-anchor="middle" font-family="'Courier New',monospace" font-size="12" font-weight="bold" fill="#58a6ff">FNR</text>
  <text x="648" y="153" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#8b949e">record# in current file</text>

  <rect x="710" y="118" width="96" height="42" rx="5" fill="#0e1824" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="758" y="136" text-anchor="middle" font-family="'Courier New',monospace" font-size="12" font-weight="bold" fill="#58a6ff">FILENAME</text>
  <text x="758" y="153" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#8b949e">current filename</text>

  <!-- Row 2 -->
  <rect x="14"  y="168" width="108" height="42" rx="5" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.5"/>
  <text x="68"  y="186" text-anchor="middle" font-family="'Courier New',monospace" font-size="12" font-weight="bold" fill="#3fb950">FS</text>
  <text x="68"  y="202" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#8b949e">input field sep (" ")</text>

  <rect x="130" y="168" width="108" height="42" rx="5" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.5"/>
  <text x="184" y="186" text-anchor="middle" font-family="'Courier New',monospace" font-size="12" font-weight="bold" fill="#3fb950">OFS</text>
  <text x="184" y="202" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#8b949e">output field sep (" ")</text>

  <rect x="246" y="168" width="108" height="42" rx="5" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.5"/>
  <text x="300" y="186" text-anchor="middle" font-family="'Courier New',monospace" font-size="12" font-weight="bold" fill="#3fb950">RS</text>
  <text x="300" y="202" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#8b949e">input record sep (\n)</text>

  <rect x="362" y="168" width="108" height="42" rx="5" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.5"/>
  <text x="416" y="186" text-anchor="middle" font-family="'Courier New',monospace" font-size="12" font-weight="bold" fill="#3fb950">ORS</text>
  <text x="416" y="202" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#8b949e">output record sep (\n)</text>

  <rect x="478" y="168" width="108" height="42" rx="5" fill="#2a2a14" stroke="#ffa657" stroke-width="1.5"/>
  <text x="532" y="186" text-anchor="middle" font-family="'Courier New',monospace" font-size="12" font-weight="bold" fill="#ffa657">SUBSEP</text>
  <text x="532" y="202" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#8b949e">multi-dim array sep</text>

  <rect x="594" y="168" width="108" height="42" rx="5" fill="#2a2a14" stroke="#ffa657" stroke-width="1.5"/>
  <text x="648" y="186" text-anchor="middle" font-family="'Courier New',monospace" font-size="12" font-weight="bold" fill="#ffa657">OFMT</text>
  <text x="648" y="202" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#8b949e">output number format</text>

  <rect x="710" y="168" width="96" height="42" rx="5" fill="#1f1428" stroke="#bc8cff" stroke-width="1.5"/>
  <text x="758" y="186" text-anchor="middle" font-family="'Courier New',monospace" font-size="12" font-weight="bold" fill="#bc8cff">ARGC/ARGV</text>
  <text x="758" y="202" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#8b949e">arg count/array</text>

  <rect x="14" y="220" width="792" height="40" rx="6" fill="#1a1a2a" stroke="#bc8cff" stroke-width="1"/>
  <text x="26" y="238" font-family="'Segoe UI',sans-serif" font-size="9.5" font-weight="bold" fill="#bc8cff">Key insight: </text>
  <text x="100" y="238" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">FS default is " " which means: split on ANY whitespace, ignore leading/trailing whitespace. FS="[[:space:]]+" is NOT the same!</text>
  <text x="26" y="254" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#ffa657">Changing $1 (or any field) causes awk to REBUILD $0 using OFS as separator. Use OFS="," to reformat CSV output.</text>
</svg>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 6 of 12 — awk: arithmetic, string functions, arrays, getline</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ ARITHMETIC OPERATORS ═══════════════════════════════════</span>
<span class="cb-cmt"># + - * / % ^ (power)  ++ --  += -= *= /=</span>
<span class="cb-prompt">$</span> awk '{sum += $4; count++} END{print sum/count}' sales.csv

<span class="cb-cmt">## ═══ BUILT-IN MATH FUNCTIONS ════════════════════════════════</span>
<span class="cb-cmt"># sin(x)  cos(x)  atan2(y,x)  exp(x)  log(x)  sqrt(x)
# int(x)  = truncate to integer
# rand()  = random 0-1   srand([seed]) = seed</span>
<span class="cb-prompt">$</span> awk 'BEGIN{srand(); for(i=1;i<=5;i++) print int(rand()*100)}'

<span class="cb-cmt">## ═══ BUILT-IN STRING FUNCTIONS ══════════════════════════════</span>
<span class="cb-prompt">$</span> awk '{print length($1)}' file.txt    <span class="cb-cmt"># string length</span>
<span class="cb-prompt">$</span> awk '{print toupper($1)}' file.txt   <span class="cb-cmt"># uppercase</span>
<span class="cb-prompt">$</span> awk '{print tolower($1)}' file.txt   <span class="cb-cmt"># lowercase</span>

<span class="cb-cmt"># substr(str, start, [len]): substring (1-indexed!)</span>
<span class="cb-prompt">$</span> awk '{print substr($1, 1, 4)}' dates.csv  <span class="cb-cmt"># year from YYYY-MM-DD</span>

<span class="cb-cmt"># index(str, target): find position (0 = not found)</span>
<span class="cb-prompt">$</span> awk 'index($0, "ERROR") > 0' app.log

<span class="cb-cmt"># split(str, array, [sep]): split into array</span>
<span class="cb-prompt">$</span> awk '{n=split($1,a,"-"); print a[1],a[2],a[3]}' dates.csv
<span class="cb-cmt"># a[1]=year a[2]=month a[3]=day, n=count of parts</span>

<span class="cb-cmt"># sub/gsub: substitute (like sed s//)</span>
<span class="cb-prompt">$</span> awk '{gsub(/,/, "\t"); print}' data.csv    <span class="cb-cmt"># CSV to TSV</span>
<span class="cb-prompt">$</span> awk '{sub(/^[ \t]+/, ""); print}' file.txt <span class="cb-cmt"># strip leading space</span>
<span class="cb-prompt">$</span> awk '{gsub(/[[:space:]]+/, "_"); print}' f  <span class="cb-cmt"># spaces to underscores</span>

<span class="cb-cmt"># sprintf: format without printing (returns string)</span>
<span class="cb-prompt">$</span> awk '{id = sprintf("%05d", NR); print id, $0}' file.txt
<span class="cb-out">00001 first line</span>
<span class="cb-out">00002 second line</span>

<span class="cb-cmt"># match(str, regex): returns position (sets RSTART, RLENGTH)</span>
<span class="cb-prompt">$</span> awk '{if(match($0,/[0-9]+\.[0-9]+/)) print substr($0,RSTART,RLENGTH)}' log

<span class="cb-cmt">## ═══ getline — READ FROM PIPE OR FILE ═══════════════════════</span>
<span class="cb-cmt"># Read a line from an external command:</span>
<span class="cb-prompt">$</span> awk 'BEGIN{"date +%Y-%m-%d" | getline today; print "Report:", today}'
<span class="cb-cmt"># Read from a different file:</span>
<span class="cb-prompt">$</span> awk '{while((getline line < "extra.csv") > 0) print line}' file.csv
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 7 — AWK ASSOCIATIVE ARRAYS (ANIMATED)
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> awk Associative Arrays — The Superpower for Aggregation</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 260" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 20px;">
  <rect width="820" height="260" fill="#0d1117" rx="12"/>
  <text x="410" y="24" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="13" font-weight="bold" fill="#8b949e">awk Associative Array — How GroupBy &amp; Aggregation Works</text>

  <!-- Input records streaming in -->
  <text x="110" y="50" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#8b949e">Input (sales.csv):</text>

  <rect x="14"  y="56" width="200" height="22" rx="4" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="114" y="71" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">2024-01-15,London,12345.00</text>

  <rect x="14"  y="82" width="200" height="22" rx="4" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="114" y="97" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">2024-01-15,Paris,8900.00</text>

  <rect x="14" y="108" width="200" height="22" rx="4" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="114" y="123" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">2024-01-16,London,5500.00</text>

  <rect x="14" y="134" width="200" height="22" rx="4" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="114" y="149" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">2024-01-16,Mumbai,9100.00</text>

  <rect x="14" y="160" width="200" height="22" rx="4" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="114" y="175" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">2024-01-17,Paris,7200.00</text>

  <!-- Arrow to array -->
  <line x1="214" y1="118" x2="280" y2="118" stroke="#ffa657" stroke-width="2.5" marker-end="url(#ag-orn)" class="ag-flow"/>
  <text x="247" y="108" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">sum[$2]+=$3</text>
  <text x="247" y="124" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">count[$2]++</text>

  <!-- Associative array (hash table visual) -->
  <rect x="280" y="46" width="260" height="166" rx="8" fill="#2a2a14" stroke="#ffa657" stroke-width="2"/>
  <text x="410" y="66" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#ffa657">Associative Array: sum[]</text>
  <line x1="290" y1="72" x2="530" y2="72" stroke="#ffa657" stroke-width="1" stroke-dasharray="4,2"/>

  <text x="295" y="92" font-family="'Courier New',monospace" font-size="11" fill="#e6edf3">sum["London"]</text>
  <text x="460" y="92" font-family="'Courier New',monospace" font-size="11" fill="#3fb950">= 17845.00</text>

  <text x="295" y="114" font-family="'Courier New',monospace" font-size="11" fill="#e6edf3">sum["Paris"]</text>
  <text x="460" y="114" font-family="'Courier New',monospace" font-size="11" fill="#3fb950">= 16100.00</text>

  <text x="295" y="136" font-family="'Courier New',monospace" font-size="11" fill="#e6edf3">sum["Mumbai"]</text>
  <text x="460" y="136" font-family="'Courier New',monospace" font-size="11" fill="#3fb950">= 9100.00</text>

  <text x="295" y="158" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">count["London"]=2, count["Paris"]=2</text>
  <text x="295" y="174" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">count["Mumbai"]=1</text>
  <text x="295" y="194" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">Key = any string. Auto-created. No pre-declaration.</text>
  <text x="295" y="207" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Numeric ops on missing keys treat as 0.</text>

  <!-- Arrow to output -->
  <line x1="540" y1="118" x2="600" y2="118" stroke="#3fb950" stroke-width="2.5" marker-end="url(#ag-grn)" class="ag-flow"/>
  <text x="570" y="108" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#3fb950">END{for(k in sum)</text>
  <text x="570" y="124" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#3fb950">  print k, sum[k]}</text>

  <!-- Output -->
  <rect x="600" y="68" width="206" height="76" rx="8" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="703" y="88" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#3fb950">Output:</text>
  <text x="610" y="106" font-family="'Courier New',monospace" font-size="11" fill="#e6edf3">London   17845.00</text>
  <text x="610" y="122" font-family="'Courier New',monospace" font-size="11" fill="#e6edf3">Paris    16100.00</text>
  <text x="610" y="138" font-family="'Courier New',monospace" font-size="11" fill="#e6edf3">Mumbai    9100.00</text>

  <!-- Patterns row: delete, test existence -->
  <rect x="14" y="200" width="792" height="52" rx="6" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="26" y="218" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">Array Operations:</text>
  <text x="175" y="218" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">a[key]</text>     <text x="215" y="218" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> = create/access  </text>
  <text x="322" y="218" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">key in a</text>    <text x="370" y="218" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> = test existence  </text>
  <text x="476" y="218" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">delete a[key]</text><text x="552" y="218" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> = remove  </text>
  <text x="626" y="218" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">for(k in a)</text>  <text x="694" y="218" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> = iterate (unordered)</text>
  <text x="26" y="238" font-family="'Courier New',monospace" font-size="10" fill="#bc8cff">a[r][c]</text>     <text x="74" y="238" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> = 2D array (simulated with a[r,c] using SUBSEP as separator)  </text>
  <text x="404" y="238" font-family="'Courier New',monospace" font-size="10" fill="#bc8cff">delete a</text>    <text x="454" y="238" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> = delete entire array  </text>
  <text x="556" y="238" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#ffa657">⚠ for(k in a) order is UNDEFINED — use | sort for sorted output</text>
</svg>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 7 of 12 — awk: aggregation, groupby, count, dedup, join, top-N</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ SUM AND COUNT BY GROUP ══════════════════════════════════</span>
<span class="cb-prompt">$</span> awk -F',' 'NR>1 {sum[$2]+=$4; count[$2]++}
  END {for(r in sum) printf "%-20s %12.2f %8d\n", r, sum[r], count[r]}
  ' sales.csv | sort -k2 -rn
<span class="cb-out">London                12345.67       42</span>
<span class="cb-out">Mumbai                 9876.54       38</span>

<span class="cb-cmt">## ═══ COUNT FREQUENCY ═════════════════════════════════════════</span>
<span class="cb-prompt">$</span> awk '{count[$0]++} END{for(l in count) print count[l], l}' file.txt | sort -rn
<span class="cb-cmt"># Count occurrences of each unique line</span>

<span class="cb-cmt"># Count HTTP status codes:</span>
<span class="cb-prompt">$</span> awk '{code=$9; cnt[code]++} END{for(c in cnt) print cnt[c], c}' access.log | \
  sort -rn | head -10
<span class="cb-out">12543 200</span>
<span class="cb-out">  456 404</span>

<span class="cb-cmt">## ═══ DEDUPLICATION ════════════════════════════════════════════</span>
<span class="cb-prompt">$</span> awk '!seen[$0]++' file.txt           <span class="cb-cmt"># remove duplicate lines (keeps first)</span>
<span class="cb-cmt"># seen[$0]++ = use current line as key
# !seen[$0]++ = true only FIRST time we see each line (0 = false)</span>

<span class="cb-prompt">$</span> awk -F',' '!seen[$1]++' data.csv     <span class="cb-cmt"># unique by first column only</span>

<span class="cb-cmt">## ═══ TOP-N ═══════════════════════════════════════════════════</span>
<span class="cb-prompt">$</span> awk -F',' 'NR>1{sum[$2]+=$4} END{for(r in sum) print sum[r], r}' \
  sales.csv | sort -rn | head -5

<span class="cb-cmt">## ═══ CONDITIONAL GROUPBY ════════════════════════════════════</span>
<span class="cb-prompt">$</span> awk -F',' 'NR>1 {
    if ($4 > 10000) tier = "high"
    else if ($4 > 5000) tier = "mid"
    else tier = "low"
    count[tier]++; total[tier]+=$4
  }
  END {
    for(t in count) printf "%-6s: %5d orders  %10.2f total\n", t, count[t], total[t]
  }' sales.csv

<span class="cb-cmt">## ═══ MULTI-FILE JOIN ═════════════════════════════════════════</span>
<span class="cb-cmt"># Pseudo-join: load lookup from file 1, apply to file 2</span>
<span class="cb-prompt">$</span> awk -F',' '
  FNR==NR {map[$1]=$2; next}       # load file1 into map (key→value)
  {print $0, map[$3]}              # print file2 with lookup
' regions.csv sales.csv
<span class="cb-cmt"># FNR==NR: true only while processing the FIRST file
# next: skip to next record without processing rest
# Classic awk join pattern — works for any two-file operation</span>

<span class="cb-cmt">## ═══ MULTI-DIMENSIONAL ARRAY ════════════════════════════════</span>
<span class="cb-prompt">$</span> awk -F',' 'NR>1{data[$2,$3]+=$4}
  END{for(k in data){split(k,a,SUBSEP); printf "%s\t%s\t%.2f\n",a[1],a[2],data[k]}}
  ' sales.csv | sort
<span class="cb-cmt"># data[region,product] = sales by region AND product</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 8 — AWK DATA ENGINEERING PATTERNS
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> awk Data Engineering Patterns — CSV, TSV, Log, ETL</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 220" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="220" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">awk ETL Pipeline — Input → Transform → Aggregate → Output</text>

  <!-- Pipeline stages -->
  <rect x="14" y="36" width="150" height="66" rx="8" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="89"  y="56" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#3fb950">BEGIN{}</text>
  <text x="89"  y="72" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Set FS, OFS</text>
  <text x="89"  y="87" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Print header</text>
  <text x="89"  y="99" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Init counters</text>

  <line x1="164" y1="69" x2="200" y2="69" stroke="#ffa657" stroke-width="2" marker-end="url(#ag-orn)" class="ag-flow"/>

  <rect x="200" y="36" width="150" height="66" rx="8" fill="#0e1824" stroke="#58a6ff" stroke-width="2"/>
  <text x="275" y="56" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#58a6ff">NR==1{}</text>
  <text x="275" y="72" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Skip header</text>
  <text x="275" y="87" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Detect columns</text>
  <text x="275" y="99" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Store schema</text>

  <line x1="350" y1="69" x2="386" y2="69" stroke="#ffa657" stroke-width="2" marker-end="url(#ag-orn)" class="ag-flow"/>

  <rect x="386" y="36" width="150" height="66" rx="8" fill="#2a2a14" stroke="#ffa657" stroke-width="2"/>
  <text x="461" y="56" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">NR>1 && filter{}</text>
  <text x="461" y="72" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Clean data</text>
  <text x="461" y="87" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Validate fields</text>
  <text x="461" y="99" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Transform values</text>

  <line x1="536" y1="69" x2="572" y2="69" stroke="#ffa657" stroke-width="2" marker-end="url(#ag-orn)" class="ag-flow"/>

  <rect x="572" y="36" width="150" height="66" rx="8" fill="#1a1a2a" stroke="#bc8cff" stroke-width="2"/>
  <text x="647" y="56" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#bc8cff">Accumulate{}</text>
  <text x="647" y="72" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">sum[$key]+=$val</text>
  <text x="647" y="87" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">count[$key]++</text>
  <text x="647" y="99" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">max/min tracking</text>

  <line x1="722" y1="69" x2="758" y2="69" stroke="#ffa657" stroke-width="2" marker-end="url(#ag-orn)" class="ag-flow"/>

  <rect x="658" y="116" width="148" height="60" rx="8" fill="#1f1428" stroke="#bc8cff" stroke-width="2"/>
  <line x1="770" y1="102" x2="770" y2="116" stroke="#bc8cff" stroke-width="2" marker-end="url(#ag-pur)"/>

  <!-- END box separate -->
  <rect x="758" y="36" width="48" height="66" rx="8" fill="#1f1428" stroke="#bc8cff" stroke-width="2"/>
  <text x="782" y="75" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#bc8cff" transform="rotate(-90,782,75)">END{}</text>

  <text x="732" y="136" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#bc8cff">Print report</text>
  <text x="732" y="152" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Sort | fmt output</text>
  <text x="732" y="166" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Close files</text>

  <!-- Pattern: 3 key data engineering patterns below -->
  <rect x="14" y="122" width="630" height="86" rx="6" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="26" y="140" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">3 Universal Data Engineering Patterns:</text>
  <text x="26"  y="158" font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950">FILTER:</text>
  <text x="76"  y="158" font-family="'Courier New',monospace" font-size="9.5" fill="#e6edf3">awk -F, 'NR>1 && $3=="UK" && $5>0' data.csv</text>
  <text x="26"  y="174" font-family="'Courier New',monospace" font-size="9.5" fill="#58a6ff">TRANSFORM:</text>
  <text x="104" y="174" font-family="'Courier New',monospace" font-size="9.5" fill="#e6edf3">awk 'BEGIN{FS=",";OFS="\t"} NR>1{$4=$4*1.15; print}' data.csv</text>
  <text x="26"  y="190" font-family="'Courier New',monospace" font-size="9.5" fill="#bc8cff">AGGREGATE:</text>
  <text x="112" y="190" font-family="'Courier New',monospace" font-size="9.5" fill="#e6edf3">awk -F, 'NR>1{s[$2]+=$5} END{for(k in s) print k,s[k]}' data.csv</text>
  <text x="26"  y="202" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">⚡ Chain these: filter | transform | aggregate — replace Python pandas for millions of rows</text>
</svg>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 8 of 12 — awk: complete ETL recipes — CSV processing, log parsing, reporting</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ COMPLETE CSV PROCESSOR ══════════════════════════════════</span>
<span class="cb-prompt">$</span> awk -F',' '
BEGIN {
    OFS = "\t"
    print "Region", "Total_Sales", "Orders", "Avg_Sale"
}
NR == 1 { next }     # skip header
$4 == "" { next }    # skip empty amount
$5 != "CONFIRMED" { next }  # only confirmed sales
{
    region = $2
    amount = $4 + 0  # force numeric
    sum[region]   += amount
    count[region] += 1
    if (amount > max[region]) max[region] = amount
}
END {
    for (r in sum) {
        avg = sum[r] / count[r]
        printf "%-20s %12.2f %8d %10.2f\n", r, sum[r], count[r], avg
    }
}
' sales.csv | sort -k2 -rn

<span class="cb-cmt">## ═══ NGINX LOG ANALYSIS ══════════════════════════════════════</span>
<span class="cb-prompt">$</span> awk '
{
    ip=$1; status=$9; bytes=$10; url=$7
    # Count by status code
    codes[status]++
    # Count by IP
    ips[ip]++
    # Sum bytes
    total_bytes += bytes + 0
    # Track errors
    if (status >= 400) errors[url]++
}
END {
    print "=== Status Codes ==="
    for (c in codes) print codes[c], c
    print "\n=== Top Errors ==="
    for (u in errors) print errors[u], u
    printf "\nTotal bytes: %.2f MB\n", total_bytes/1024/1024
}
' /var/log/nginx/access.log

<span class="cb-cmt">## ═══ GENERATE SUMMARY REPORT ════════════════════════════════</span>
<span class="cb-prompt">$</span> awk -F',' '
NR == 1 { next }
{
    date = substr($1, 1, 7)    # YYYY-MM (monthly grouping)
    monthly[date] += $4
    monthly_cnt[date]++
}
END {
    n = asorti(monthly, dates)   # sort date keys (gawk)
    print "Month        Revenue       Orders"
    print "----------  ----------  --------"
    for (i = 1; i <= n; i++) {
        d = dates[i]
        printf "%-12s %10.2f  %8d\n", d, monthly[d], monthly_cnt[d]
    }
}
' sales.csv

<span class="cb-cmt">## ═══ RESHAPE: WIDE TO LONG FORMAT ═══════════════════════════</span>
<span class="cb-cmt"># Input: id,Jan,Feb,Mar
# Output: id,month,value</span>
<span class="cb-prompt">$</span> awk -F',' 'NR==1{split($0,months,","); next}
  {id=$1; for(i=2;i<=NF;i++) print id, months[i], $i}
  ' OFS=, wide.csv
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 9 — AWK FUNCTIONS & ADVANCED
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> awk Functions, Pipes, and Output Redirection</h2>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 9 of 12 — awk: user functions, pipes, print to file, getline, OFMT</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ USER-DEFINED FUNCTIONS ═════════════════════════════════</span>
<span class="cb-prompt">$</span> awk '
function max(a, b) { return (a > b) ? a : b }
function min(a, b) { return (a < b) ? a : b }
function trim(s) {
    gsub(/^[ \t]+|[ \t]+$/, "", s)
    return s
}
function format_currency(n) {
    return sprintf("$%,.2f", n)
}
NR > 1 {
    city = trim($2)
    revenue = $4 + 0
    if (city != "") {
        hi[city] = max(hi[city] ? hi[city] : 0, revenue)
        lo[city] = (lo[city] ? min(lo[city], revenue) : revenue)
    }
}
END {
    for (c in hi)
        printf "%-20s hi=%-12s lo=%s\n", c, format_currency(hi[c]), format_currency(lo[c])
}
' -F',' sales.csv

<span class="cb-cmt">## ═══ PRINT TO MULTIPLE FILES ═════════════════════════════════</span>
<span class="cb-prompt">$</span> awk -F',' 'NR>1{print > ("output_" $2 ".csv")}' sales.csv
<span class="cb-cmt"># Creates output_London.csv, output_Paris.csv, etc.
# Each file gets only that region's rows</span>

<span class="cb-cmt"># Append to files:</span>
<span class="cb-prompt">$</span> awk '{print >> "/var/log/processed.log"}' data.csv

<span class="cb-cmt">## ═══ PIPE OUTPUT TO COMMANDS ════════════════════════════════</span>
<span class="cb-prompt">$</span> awk '{print | "sort -k2 -rn"}' data.csv           <span class="cb-cmt"># pipe to sort</span>
<span class="cb-prompt">$</span> awk '{print | "gzip > output.csv.gz"}' data.csv   <span class="cb-cmt"># pipe to gzip</span>
<span class="cb-prompt">$</span> awk 'END{close("sort")}' data.csv                 <span class="cb-cmt"># close pipe explicitly</span>

<span class="cb-cmt">## ═══ CONTROL FLOW ════════════════════════════════════════════</span>
<span class="cb-prompt">$</span> awk 'NR%1000==0{print NR, "lines processed"}' large.csv  <span class="cb-cmt"># progress</span>
<span class="cb-prompt">$</span> awk '{if(NF<3){print "Error line "NR": "NF" fields: "$0 >"/dev/stderr"; next} print}' data.csv

<span class="cb-cmt">## ═══ PROCESS SUBSTITUTION TRICK ═════════════════════════════</span>
<span class="cb-cmt"># Join two files side by side on matching key:</span>
<span class="cb-prompt">$</span> awk -F',' '
  FNR==NR{a[$1]=$2; next}     # load file1: a[id]=name
  ($1 in a){print $0, a[$1]}  # enrich file2 rows
' names.csv sales.csv

<span class="cb-cmt">## ═══ NUMERIC FORMATTING ════════════════════════════════════</span>
<span class="cb-prompt">$</span> awk 'BEGIN{OFMT="%.2f"; OFS=","} {$5=$5*1.1; print}' data.csv
<span class="cb-cmt"># OFMT = format for implicit numeric-to-string conversion</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 10 — COMBINED PIPELINES (ANIMATED)
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Combined Pipelines — grep + sed + awk Together</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 240" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 20px;">
  <rect width="820" height="240" fill="#0d1117" rx="12"/>
  <text x="410" y="24" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="13" font-weight="bold" fill="#8b949e">grep → sed → awk Pipeline — Each Tool at Its Strength</text>

  <!-- Stage 1: grep -->
  <rect x="14" y="36" width="210" height="150" rx="8" fill="#0e1824" stroke="#58a6ff" stroke-width="2"/>
  <text x="119" y="58" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#58a6ff">grep</text>
  <text x="119" y="74" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">Filter lines fast</text>
  <line x1="24" y1="80" x2="214" y2="80" stroke="#58a6ff" stroke-width="1" stroke-dasharray="4,2"/>
  <text x="24" y="97"  font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">✅ Find matching lines</text>
  <text x="24" y="114" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">✅ Extract with -o</text>
  <text x="24" y="131" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">✅ Count / list files</text>
  <text x="24" y="148" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">✅ Quick boolean test</text>
  <text x="24" y="165" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#f85149">❌ Restructure data</text>
  <text x="24" y="179" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#f85149">❌ Arithmetic</text>

  <line x1="224" y1="111" x2="268" y2="111" stroke="#ffa657" stroke-width="2.5" marker-end="url(#ag-orn)" class="ag-flow"/>

  <!-- Stage 2: sed -->
  <rect x="268" y="36" width="210" height="150" rx="8" fill="#2a2a14" stroke="#ffa657" stroke-width="2"/>
  <text x="373" y="58" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#ffa657">sed</text>
  <text x="373" y="74" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">Transform text</text>
  <line x1="278" y1="80" x2="468" y2="80" stroke="#ffa657" stroke-width="1" stroke-dasharray="4,2"/>
  <text x="278" y="97"  font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">✅ Substitution s///</text>
  <text x="278" y="114" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">✅ Delete/insert lines</text>
  <text x="278" y="131" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">✅ Line-range extract</text>
  <text x="278" y="148" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">✅ In-place file edit</text>
  <text x="278" y="165" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#f85149">❌ Arithmetic</text>
  <text x="278" y="179" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#f85149">❌ Groupby/aggregate</text>

  <line x1="478" y1="111" x2="522" y2="111" stroke="#3fb950" stroke-width="2.5" marker-end="url(#ag-grn)" class="ag-flow"/>

  <!-- Stage 3: awk -->
  <rect x="522" y="36" width="210" height="150" rx="8" fill="#1a2a1a" stroke="#3fb950" stroke-width="2.5"/>
  <text x="627" y="58" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#3fb950">awk</text>
  <text x="627" y="74" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">Process &amp; compute</text>
  <line x1="532" y1="80" x2="722" y2="80" stroke="#3fb950" stroke-width="1" stroke-dasharray="4,2"/>
  <text x="532" y="97"  font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">✅ Field operations</text>
  <text x="532" y="114" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">✅ Arithmetic/math</text>
  <text x="532" y="131" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">✅ GroupBy/aggregate</text>
  <text x="532" y="148" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">✅ Multi-file joins</text>
  <text x="532" y="165" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">✅ Reports + printf</text>
  <text x="532" y="179" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">✅ Arrays/functions</text>

  <!-- Decision guide box -->
  <rect x="14" y="196" width="792" height="36" rx="6" fill="#1a1a2a" stroke="#bc8cff" stroke-width="1"/>
  <text x="26" y="212" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#bc8cff">Decision rule:</text>
  <text x="120" y="212" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Need to find lines? → grep first.  Need to reformat text? → sed.  Need numbers, grouping, or reports? → awk.</text>
  <text x="26" y="228" font-family="'Segoe UI',sans-serif" font-size="10" fill="#ffa657">⚡ Often: grep (filter fast) | sed (clean format) | awk (compute) → 10x faster than Python for logs</text>
</svg>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 10 of 12 — Combined pipelines: log analysis, CSV ETL, multi-tool recipes</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ PRODUCTION PIPELINE RECIPES ════════════════════════════</span>

<span class="cb-cmt"># ── Recipe 1: Revenue report from messy logs ──────────────────</span>
grep 'TRANSACTION' app.log |
  grep -v 'REFUND' |
  sed 's/.*amount=\([0-9.]*\).*/\\1/' |
  awk '{sum+=$1; count++} END{printf "Total: $%.2f  Avg: $%.2f  Count: %d\n", sum, sum/count, count}'

<span class="cb-cmt"># ── Recipe 2: Top error URLs from nginx log ──────────────────</span>
grep '" [45]' /var/log/nginx/access.log |
  awk '{print $7, $9}' |
  sed 's/?.*//' |
  sort | uniq -c | sort -rn | head -20 |
  awk '{printf "%-50s  %5d  HTTP-%s\n", $2, $1, $3}'

<span class="cb-cmt"># ── Recipe 3: CSV quality check ───────────────────────────────</span>
awk -F',' '
NR==1{ncols=NF; next}
NF != ncols {print "Line "NR": expected "ncols" cols, got "NF > "/dev/stderr"; bad++; next}
$1=="" {print "Line "NR": empty key" > "/dev/stderr"; bad++; next}
$4+0 < 0 {print "Line "NR": negative amount "$4 > "/dev/stderr"; bad++; next}
{good++}
END{print "Good: "good"  Bad: "bad}
' sales.csv

<span class="cb-cmt"># ── Recipe 4: Hourly throughput from timestamps ───────────────</span>
grep 'PROCESSED' pipeline.log |
  grep -oP '\d{4}-\d{2}-\d{2}T\d{2}' |
  sort | uniq -c |
  awk '{printf "%-20s  %6d records\n", $2, $1}'

<span class="cb-cmt"># ── Recipe 5: ETL validation — rows in vs rows out ─────────────</span>
echo "Input rows:  $(awk 'END{print NR-1}' input.csv)"
echo "Output rows: $(awk 'END{print NR-1}' output.csv)"
echo "Rejected:    $(wc -l < rejected.log)"
awk -F',' 'NR>1{total+=$4} END{printf "Input total:  $%.2f\n",total}' input.csv
awk -F',' 'NR>1{total+=$4} END{printf "Output total: $%.2f\n",total}' output.csv

<span class="cb-cmt"># ── Recipe 6: Config file to environment variables ─────────────</span>
eval "$(grep -v '^#' /etc/app.conf | grep '=' | sed 's/ *= */=/' | \
  awk -F= '{printf "export %s=%s\n", $1, $2}')"

<span class="cb-cmt"># ── Recipe 7: Find and replace across many files ───────────────</span>
grep -rl "localhost:5432" /opt/app/ |
  xargs sed -i 's/localhost:5432/db.internal:5432/g'

<span class="cb-cmt"># ── Recipe 8: Stream large file with transformation ─────────────</span>
<span class="cb-cmt"># Process 10GB CSV without loading into memory:</span>
pv 10gb_sales.csv |
  LC_ALL=C grep -v '^#' |
  awk -F',' 'NR>1 && $5=="CONFIRMED" {$4=$4*1.15; OFS=","; print}' |
  gzip > output.csv.gz
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 11 — PERFORMANCE COMPARISON (ANIMATED)
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Performance — Speed Tips &amp; Tool Comparison</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 230" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="230" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">Relative Performance — Processing 1GB Text File</text>

  <!-- Y axis label -->
  <text x="20" y="130" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#30363d" transform="rotate(-90,20,130)">Faster ↑</text>

  <!-- Bar chart -->
  <!-- LC_ALL=C grep (fastest) -->
  <rect x="60" y="44" width="80" height="140" rx="4" fill="#3fb950" opacity=".9"/>
  <text x="100" y="38" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" font-weight="bold" fill="#3fb950">LC_ALL=C</text>
  <text x="100" y="193" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">grep -F</text>
  <text x="100" y="52" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" font-weight="bold" fill="#fff">1.0s</text>

  <!-- grep ERE -->
  <rect x="160" y="74" width="80" height="110" rx="4" fill="#3fb950" opacity=".7"/>
  <text x="200" y="193" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">grep -E</text>
  <text x="200" y="82" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#fff">1.3s</text>

  <!-- grep PCRE -->
  <rect x="260" y="94" width="80" height="90" rx="4" fill="#58a6ff" opacity=".8"/>
  <text x="300" y="193" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#58a6ff">grep -P</text>
  <text x="300" y="102" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#fff">1.8s</text>

  <!-- awk -->
  <rect x="360" y="104" width="80" height="80" rx="4" fill="#ffa657" opacity=".8"/>
  <text x="400" y="193" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">awk</text>
  <text x="400" y="112" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#fff">2.1s</text>

  <!-- sed -->
  <rect x="460" y="114" width="80" height="70" rx="4" fill="#ffa657" opacity=".7"/>
  <text x="500" y="193" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">sed s///</text>
  <text x="500" y="122" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#fff">2.5s</text>

  <!-- Python pandas -->
  <rect x="560" y="154" width="80" height="30" rx="4" fill="#bc8cff" opacity=".7"/>
  <text x="600" y="193" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#bc8cff">Python</text>
  <text x="600" y="162" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#fff">8s</text>

  <!-- Python no pandas -->
  <rect x="660" y="164" width="80" height="20" rx="4" fill="#f85149" opacity=".7"/>
  <text x="700" y="193" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#f85149">Python pure</text>
  <text x="700" y="172" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#fff">15s</text>

  <!-- Baseline -->
  <line x1="40" y1="184" x2="780" y2="184" stroke="#30363d" stroke-width="1"/>

  <!-- Performance tips -->
  <rect x="40" y="198" width="740" height="24" rx="4" fill="#1a2a1a" stroke="#3fb950" stroke-width="1"/>
  <text x="56" y="213" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#3fb950">Speed tips: </text>
  <text x="120" y="213" font-family="'Courier New',monospace" font-size="9.5" fill="#e6edf3">LC_ALL=C</text>
  <text x="178" y="213" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> (3x faster)  </text>
  <text x="250" y="213" font-family="'Courier New',monospace" font-size="9.5" fill="#e6edf3">grep -F</text>
  <text x="296" y="213" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> fixed string  </text>
  <text x="376" y="213" font-family="'Courier New',monospace" font-size="9.5" fill="#e6edf3">grep -m N</text>
  <text x="440" y="213" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> stop early  </text>
  <text x="510" y="213" font-family="'Courier New',monospace" font-size="9.5" fill="#e6edf3">grep first</text>
  <text x="576" y="213" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> (reduce data before awk)  </text>
  <text x="690" y="213" font-family="'Courier New',monospace" font-size="9.5" fill="#ffa657">awk -F ','</text>
  <text x="743" y="213" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> not regex</text>
</svg>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 11 of 12 — Performance tips, LC_ALL=C, sed in-place, awk BEGIN FS</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ PERFORMANCE TIPS ════════════════════════════════════════</span>

<span class="cb-cmt"># 1. LC_ALL=C makes grep 2-5x faster (forces byte comparison)</span>
<span class="cb-prompt">$</span> LC_ALL=C grep "ERROR" huge.log > /dev/null
<span class="cb-cmt"># 2. grep -F = fixed string, no regex engine = fastest search</span>
<span class="cb-prompt">$</span> LC_ALL=C grep -F "2024-01-15" access.log | wc -l

<span class="cb-cmt"># 3. Set FS in BEGIN (not -F) for complex separators:</span>
<span class="cb-prompt">$</span> awk 'BEGIN{FS=","} {print $1}' huge.csv     <span class="cb-cmt"># -F faster for simple sep</span>

<span class="cb-cmt"># 4. Avoid calling external commands in awk loops:</span>
<span class="cb-cmt"># SLOW: awk '{cmd="date -d "$1" +%s"; cmd | getline ts; close(cmd)}' file</span>
<span class="cb-cmt"># FAST: pre-process dates once in Python, then use awk for aggregation</span>

<span class="cb-cmt"># 5. Filter first, process second:</span>
<span class="cb-cmt"># SLOW: awk -F',' '{if($5=="UK" && $4>0) sum+=$4} END{print sum}' 10GB.csv</span>
<span class="cb-cmt"># FAST: LC_ALL=C grep -F ",UK," 10GB.csv | awk -F',' '$4>0{sum+=$4} END{print sum}'</span>

<span class="cb-cmt"># 6. For in-place sed, avoid temp file creation overhead:</span>
<span class="cb-cmt"># SLOW: sed 's/foo/bar/' file > tmp && mv tmp file</span>
<span class="cb-cmt"># FAST: sed -i 's/foo/bar/' file  (atomic rename internally)</span>

<span class="cb-cmt"># 7. Benchmark comparison:</span>
<span class="cb-prompt">$</span> time LC_ALL=C grep -c "SALE" 1gb_log.log
<span class="cb-out">real    0m0.843s</span>
<span class="cb-prompt">$</span> time grep -c "SALE" 1gb_log.log
<span class="cb-out">real    0m2.156s</span>
<span class="cb-prompt">$</span> time python3 -c "print(sum(1 for l in open('1gb_log.log') if 'SALE' in l))"
<span class="cb-out">real    0m8.432s</span>

<span class="cb-cmt">## ═══ PARALLEL PROCESSING WITH GNU PARALLEL ══════════════════</span>
<span class="cb-cmt"># Process multiple files in parallel:</span>
<span class="cb-prompt">$</span> ls /data/chunk_*.csv | \
  parallel 'LC_ALL=C awk -F"," "NR>1{s[$2]+=$4} END{for(k in s) print k, s[k]}" {}' | \
  awk '{sum[$1]+=$2} END{for(k in sum) print k, sum[k]}' | sort -k2 -rn
<span class="cb-cmt"># 1. Process each chunk file in parallel with awk
# 2. Final awk merges all partial results
# 4x speedup on 4-core machine for independent partitions</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 12 — COMPREHENSIVE REAL-WORLD PATTERNS
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Real-World Data Engineering Recipes</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="200" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">Data Engineering Use Cases — Which Tool Handles Each</text>

  <!-- Grid 3x3 of use cases -->
  <rect x="14"  y="34" width="250" height="46" rx="6" fill="#0e1824" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="139" y="52" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#58a6ff">Filter log lines by time</text>
  <text x="139" y="68" text-anchor="middle" font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950">grep -E '2024-01-15 1[5-9]:'</text>

  <rect x="286" y="34" width="250" height="46" rx="6" fill="#2a2a14" stroke="#ffa657" stroke-width="1.5"/>
  <text x="411" y="52" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">Rename CSV columns</text>
  <text x="411" y="68" text-anchor="middle" font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950">sed '1s/old_col/new_col/g'</text>

  <rect x="558" y="34" width="248" height="46" rx="6" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.5"/>
  <text x="682" y="52" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#3fb950">Sum revenue by region</text>
  <text x="682" y="68" text-anchor="middle" font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950">awk -F, '{s[$2]+=$4}'</text>

  <rect x="14"  y="90" width="250" height="46" rx="6" fill="#1f1428" stroke="#bc8cff" stroke-width="1.5"/>
  <text x="139" y="108" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#bc8cff">Extract JSON field values</text>
  <text x="139" y="124" text-anchor="middle" font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950">grep -oP '"id":\K[0-9]+'</text>

  <rect x="286" y="90" width="250" height="46" rx="6" fill="#2a1a14" stroke="#f85149" stroke-width="1.5"/>
  <text x="411" y="108" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#f85149">Strip HTML tags</text>
  <text x="411" y="124" text-anchor="middle" font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950">sed 's/&lt;[^&gt;]*&gt;//g'</text>

  <rect x="558" y="90" width="248" height="46" rx="6" fill="#0e1824" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="682" y="108" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#58a6ff">Join two CSVs on key</text>
  <text x="682" y="124" text-anchor="middle" font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950">awk FNR==NR{..} pattern</text>

  <rect x="14"  y="146" width="250" height="46" rx="6" fill="#2a2a14" stroke="#ffa657" stroke-width="1.5"/>
  <text x="139" y="164" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">Convert date format</text>
  <text x="139" y="180" text-anchor="middle" font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950">sed -E 's/(\d{4})-(\d{2})-(\d{2})/\\3.\\2.\\1/'</text>

  <rect x="286" y="146" width="250" height="46" rx="6" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.5"/>
  <text x="411" y="164" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#3fb950">Validate CSV row count</text>
  <text x="411" y="180" text-anchor="middle" font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950">awk -F, 'NF!=6{print NR}' file</text>

  <rect x="558" y="146" width="248" height="46" rx="6" fill="#1a1a2a" stroke="#bc8cff" stroke-width="1.5"/>
  <text x="682" y="164" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#bc8cff">Percentile / histogram</text>
  <text x="682" y="180" text-anchor="middle" font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950">awk + sort + NR/total</text>
</svg>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 12 of 12 — Complete production recipes: percentiles, histograms, validation</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ PERCENTILE / HISTOGRAM ════════════════════════════════</span>
<span class="cb-prompt">$</span> awk -F',' 'NR>1{print $4}' sales.csv | sort -n | \
  awk '
    BEGIN{
        buckets[0]=0; buckets[1000]=0; buckets[5000]=0;
        buckets[10000]=0; buckets[99999999]=0
    }
    {vals[NR]=$1}
    END{
        n=NR
        # Percentiles:
        p50=vals[int(n*.5)]
        p90=vals[int(n*.9)]
        p99=vals[int(n*.99)]
        printf "P50: $%.2f  P90: $%.2f  P99: $%.2f\n", p50, p90, p99
    }'

<span class="cb-cmt">## ═══ DATA QUALITY REPORT ════════════════════════════════════</span>
<span class="cb-prompt">$</span> awk -F',' '
NR==1{header=$0; ncols=NF; next}
{
    total++
    if(NF!=ncols){bad_cols++}
    if($1=="")   {null_key++}
    if($4+0<=0)  {zero_amt++}
    if($4+0>1e7) {huge_amt++}
    if($3!~/^[A-Z]{2}$/) {bad_country++}
}
END{
    printf "Total rows:      %d\n", total
    printf "Bad column count:%d\n", bad_cols
    printf "Null key:        %d\n", null_key
    printf "Zero/neg amount: %d\n", zero_amt
    printf "Huge amount:     %d\n", huge_amt
    printf "Bad country:     %d\n", bad_country
    printf "Clean rows:      %d (%.1f%%)\n", \
        total-bad_cols-null_key-zero_amt-bad_country, \
        100*(total-bad_cols-null_key-zero_amt-bad_country)/total
}' sales.csv

<span class="cb-cmt">## ═══ ROLLING 7-DAY AVERAGE ══════════════════════════════════</span>
<span class="cb-prompt">$</span> awk -F',' 'NR>1{sum[$1]+=$4; cnt[$1]++}
  END{for(d in sum) print d, sum[d]/cnt[d]}
  ' daily_sales.csv | sort -k1 | \
  awk '{
    vals[NR]=$2; dates[NR]=$1
    if(NR>=7){
        sum=0; for(i=NR-6;i<=NR;i++) sum+=vals[i]
        printf "%s  %.2f\n", dates[NR], sum/7
    }
  }'

<span class="cb-cmt">## ═══ MULTI-FILE AUDIT: MATCH ROW COUNTS ════════════════════</span>
<span class="cb-prompt">$</span> for f in /data/daily/*.csv; do
    echo -n "$f: "
    awk 'END{print NR-1, "rows"}' "$f"
  done | awk '{total+=$2} END{print "Grand total:", total, "rows"}'

<span class="cb-cmt">## ═══ EXTRACT JSON FIELDS WITH grep -P ══════════════════════</span>
<span class="cb-prompt">$</span> cat events.jsonl | grep -oP '"user_id":\K[0-9]+' | sort -u | wc -l
<span class="cb-prompt">$</span> cat events.jsonl | grep -oP '"amount":\K[0-9.]+' |
  awk '{sum+=$1; n++} END{printf "Total: %.2f Avg: %.2f\n", sum, sum/n}'
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 13 — SED ADVANCED: HOLD SPACE, BRANCHES
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> sed Advanced — Hold Space, Multi-Line, Labels &amp; Branches</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="200" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">sed Two-Buffer Model — Pattern Space &amp; Hold Space</text>

  <!-- Pattern space -->
  <rect x="14" y="36" width="380" height="80" rx="8" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="204" y="58" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#3fb950">Pattern Space (active)</text>
  <text x="204" y="78" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">Current line being processed</text>
  <text x="204" y="96" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">Auto-printed at end of cycle (unless -n or d used)</text>
  <text x="204" y="108" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">Cleared between lines. Overwritten when new line read.</text>

  <!-- Hold space -->
  <rect x="426" y="36" width="380" height="80" rx="8" fill="#1f1428" stroke="#bc8cff" stroke-width="2"/>
  <text x="616" y="58" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#bc8cff">Hold Space (persistent)</text>
  <text x="616" y="78" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">Accumulator / scratch buffer</text>
  <text x="616" y="96" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">Persists across lines (starts empty)</text>
  <text x="616" y="108" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">Never auto-printed. Survives to END.</text>

  <!-- Transfer arrows -->
  <line x1="394" y1="65" x2="426" y2="65" stroke="#ffa657" stroke-width="2" marker-end="url(#ag-orn)"/>
  <text x="410" y="57" text-anchor="middle" font-family="'Courier New',monospace" font-size="9.5" fill="#ffa657">h/H</text>
  <line x1="426" y1="78" x2="394" y2="78" stroke="#58a6ff" stroke-width="2" marker-end="url(#ag-blu)"/>
  <text x="410" y="88" text-anchor="middle" font-family="'Courier New',monospace" font-size="9.5" fill="#58a6ff">g/G</text>

  <!-- Commands table -->
  <rect x="14" y="128" width="792" height="62" rx="6" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="26" y="146" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">Buffer Commands:</text>
  <text x="130" y="146" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">h</text><text x="145" y="146" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> copy pattern→hold  </text>
  <text x="260" y="146" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">H</text><text x="275" y="146" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> append pattern→hold  </text>
  <text x="395" y="146" font-family="'Courier New',monospace" font-size="10" fill="#58a6ff">g</text><text x="410" y="146" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> copy hold→pattern  </text>
  <text x="520" y="146" font-family="'Courier New',monospace" font-size="10" fill="#58a6ff">G</text><text x="535" y="146" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> append hold→pattern  </text>
  <text x="640" y="146" font-family="'Courier New',monospace" font-size="10" fill="#bc8cff">x</text><text x="655" y="146" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> exchange pattern⟷hold</text>

  <text x="26" y="164" font-family="'Courier New',monospace" font-size="10" fill="#f85149">:label  b label</text><text x="145" y="164" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> branch to label  </text>
  <text x="270" y="164" font-family="'Courier New',monospace" font-size="10" fill="#f85149">t label</text><text x="318" y="164" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> branch if s/// succeeded  </text>
  <text x="465" y="164" font-family="'Courier New',monospace" font-size="10" fill="#f85149">T label</text><text x="513" y="164" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> branch if s/// did NOT succeed  </text>
  <text x="670" y="164" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">N</text><text x="685" y="164" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> append next line to pattern</text>

  <text x="26" y="183" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">Use cases: reverse file (h;G reverse trick), join multi-line records (N), collect lines into hold for END processing</text>
</svg>
</div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 14 — COMPLETE REFERENCE
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Complete Reference — grep, sed, awk Quick Lookup</h2>

<div class="table-wrap">
<table class="ref-table">
<thead><tr><th style="width:26%">Command / Syntax</th><th>What It Does</th><th style="width:26%">Key Option / Variant</th></tr></thead>
<tbody>
<tr><td colspan="3" style="background:#0e1824;color:#58a6ff;font-weight:bold;font-family:'Segoe UI',sans-serif;">grep — Find Lines</td></tr>
<tr><td style="font-family:monospace;">grep -E 'pat' f</td><td>ERE pattern match (recommended)</td><td><code>-i</code> case, <code>-v</code> invert, <code>-c</code> count</td></tr>
<tr><td style="font-family:monospace;">grep -o 'pat' f</td><td>Print only matching part</td><td>Combine with <code>-E</code> for extraction</td></tr>
<tr><td style="font-family:monospace;">grep -n 'pat' f</td><td>Show line numbers</td><td><code>-A/-B/-C N</code> context lines</td></tr>
<tr><td style="font-family:monospace;">grep -rl 'pat' dir/</td><td>List files with matches</td><td><code>--include='*.py'</code> filter extensions</td></tr>
<tr><td style="font-family:monospace;">grep -P 'pat' f</td><td>PCRE: \d \w lookahead etc.</td><td>Not always available; use sparingly</td></tr>
<tr><td style="font-family:monospace;">LC_ALL=C grep -F</td><td>Fastest possible string match</td><td>2-5x speedup for fixed strings</td></tr>
<tr><td colspan="3" style="background:#2a2a14;color:#ffa657;font-weight:bold;font-family:'Segoe UI',sans-serif;">sed — Transform Text</td></tr>
<tr><td style="font-family:monospace;">sed 's/old/new/g'</td><td>Replace all occurrences per line</td><td><code>/2</code> nth only, <code>/I</code> case-insensitive</td></tr>
<tr><td style="font-family:monospace;">sed -E 's/(a)(b)/\\2\\1/'</td><td>ERE capture groups</td><td><code>\\1..\\9</code> backrefs; <code>&</code> = whole match</td></tr>
<tr><td style="font-family:monospace;">sed -i.bak 's/.../.../'</td><td>Edit file in-place with backup</td><td>macOS needs: <code>sed -i ''</code></td></tr>
<tr><td style="font-family:monospace;">sed '/pat/d'</td><td>Delete matching lines</td><td><code>sed '1d'</code> skip header, <code>sed '$d'</code> last</td></tr>
<tr><td style="font-family:monospace;">sed -n '10,20p'</td><td>Print lines 10-20 only</td><td><code>sed -n '/START/,/END/p'</code></td></tr>
<tr><td style="font-family:monospace;">sed '1i header line'</td><td>Insert before line 1</td><td><code>a</code>=after, <code>c</code>=change line</td></tr>
<tr><td colspan="3" style="background:#1a2a1a;color:#3fb950;font-weight:bold;font-family:'Segoe UI',sans-serif;">awk — Process &amp; Compute</td></tr>
<tr><td style="font-family:monospace;">awk -F, '{print $2,$4}'</td><td>Print columns 2 and 4 of CSV</td><td><code>$NF</code>=last, <code>$0</code>=whole line, <code>NF</code>=count</td></tr>
<tr><td style="font-family:monospace;">awk 'NR>1 && $4>0'</td><td>Skip header, filter by value</td><td>Combine with: <code>||</code> <code>&&</code> <code>!</code></td></tr>
<tr><td style="font-family:monospace;">awk '{sum[$2]+=$4}'</td><td>Sum $4 grouped by $2</td><td>Add count[$2]++ for averaging</td></tr>
<tr><td style="font-family:monospace;">awk '!seen[$0]++'</td><td>Unique lines (preserve order)</td><td>Or: <code>!seen[$1]++</code> unique by first col</td></tr>
<tr><td style="font-family:monospace;">awk 'FNR==NR{a[$1]=$2;next}'</td><td>Load file1, apply to file2 (join)</td><td>Then: <code>{print $0, a[$key]}</code></td></tr>
<tr><td style="font-family:monospace;">awk 'BEGIN{} /pat/{} END{}'</td><td>Full program with all phases</td><td>BEGIN sets up; END reports/closes</td></tr>
</tbody>
</table>
</div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 15 — EXERCISES
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Practice Exercises with Solutions</h2>

<div class="exercise-panel easy">
  <div class="ex-badge easy-badge">Easy</div>
  <div class="ex-body">
    <h4>Exercise 1 — grep Pattern Mastery</h4>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Extract all lines from <code>/var/log/syslog</code> containing "error" (case-insensitive) — show line numbers</li>
      <li>Count how many lines in <code>/etc/passwd</code> contain <code>/bin/bash</code></li>
      <li>Find all Python files recursively under <code>/opt</code> that import pandas</li>
      <li>Extract all IPv4 addresses from any log file using <code>grep -oE</code></li>
      <li>Find lines that do NOT start with <code>#</code> and are NOT empty in <code>/etc/ssh/sshd_config</code></li>
      <li>Use <code>grep -P</code> to extract all values after <code>user_id=</code> in a log file</li>
      <li>Show 3 lines of context around each ERROR in <code>app.log</code></li>
      <li>Measure: compare speed of <code>grep</code> vs <code>LC_ALL=C grep -F</code> on a large file using <code>time</code></li>
    </ol>
  </div>
</div>

<div class="exercise-panel easy">
  <div class="ex-badge easy-badge">Easy</div>
  <div class="ex-body">
    <h4>Exercise 2 — sed Transformations</h4>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Delete all comment lines (starting with <code>#</code>) and blank lines from a config file</li>
      <li>Replace all occurrences of <code>localhost</code> with <code>prod.db.internal</code> in-place with backup</li>
      <li>Add a CSV header line before the first line of a file</li>
      <li>Convert dates from YYYY-MM-DD to DD/MM/YYYY using sed capture groups</li>
      <li>Strip all trailing whitespace from every line in a file</li>
      <li>Print only lines 50 through 100 of a file</li>
      <li>Remove all HTML tags from a file</li>
      <li>Convert Windows CRLF line endings to Unix LF</li>
    </ol>
  </div>
</div>

<div class="exercise-panel medium">
  <div class="ex-badge medium-badge">Medium</div>
  <div class="ex-body">
    <h4>Exercise 3 — awk Data Processing</h4>
    <p>Given a CSV file <code>sales.csv</code> with columns: date, region, product, amount, status:</p>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Print total and average amount per region, sorted by total descending</li>
      <li>Print only rows where status is "CONFIRMED" and amount &gt; 1000</li>
      <li>Count unique products per region using a 2D associative array</li>
      <li>Find the top-3 regions by transaction count</li>
      <li>Print a monthly summary (YYYY-MM grouping) with total, count, and avg</li>
      <li>Validate the file: report rows with wrong column count, empty keys, negative amounts</li>
      <li>Convert to TSV, strip leading/trailing spaces from each field, sort by date then region</li>
    </ol>
  </div>
</div>

<div class="exercise-panel medium">
  <div class="ex-badge medium-badge">Medium</div>
  <div class="ex-body">
    <h4>Exercise 4 — Combined Pipeline Challenge</h4>
    <p>Build a complete log analysis pipeline for nginx access logs:</p>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Filter to only 4xx and 5xx responses using grep</li>
      <li>Use sed to clean up the URL field — remove query strings, strip trailing slashes</li>
      <li>Use awk to group by (status code, URL), count occurrences, sum bytes</li>
      <li>Sort by count descending, show top 20</li>
      <li>Add a final awk step to format as a table with headers and right-aligned numbers</li>
      <li>Bonus: add per-hour breakdown for the top 3 error URLs</li>
    </ol>
  </div>
</div>

<div class="exercise-panel hard">
  <div class="ex-badge hard-badge">Hard</div>
  <div class="ex-body">
    <h4>Exercise 5 — Complete ETL Toolkit</h4>
    <p>Build a complete data quality and transformation pipeline as a shell script:</p>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li><strong>Ingest:</strong> Accept any of: CSV, TSV, or pipe-delimited files. Auto-detect delimiter with awk.</li>
      <li><strong>Schema check:</strong> Verify column count consistency. Report bad rows to stderr, continue on good rows.</li>
      <li><strong>Clean:</strong> Strip leading/trailing whitespace from all fields (awk gsub). Normalize dates to ISO format (sed regex). Remove duplicate rows (awk !seen).</li>
      <li><strong>Validate:</strong> Check numeric fields are actually numeric. Check date fields match YYYY-MM-DD. Check required fields are non-empty. Output validation report.</li>
      <li><strong>Transform:</strong> Apply a user-defined transformation (awk script passed as argument). Convert output to TSV.</li>
      <li><strong>Report:</strong> Print summary: total rows, rejected rows, pass rate, distribution of each categorical column (top 10 values), numeric stats (min/max/mean/p50/p90).</li>
    </ol>
    <p><strong>Must handle: files with no header, files with BOM, files with embedded commas in quoted fields, empty files, files with millions of rows.</strong></p>
  </div>
</div>

<div class="story-panel" style="margin-top:32px;">
  <div class="story-avatar">🧑‍💻</div>
  <div class="story-body">
    <div class="story-title">Ravi's Toolkit — Day 480</div>
    <p>The sticky note was still on his monitor. But now, instead of a magic spell he couldn't explain, Ravi could read every part of it: the <code>grep "SALE"</code> filtered 800MB to the relevant lines, the <code>awk -F'|'</code> told awk to split on pipe, <code>sum[$3] += $5</code> added field 5 to the accumulator keyed on field 3, the <code>END{}</code> block ran after all input was read, and <code>printf</code> formatted the output.</p>
    <p>He'd added his own variations to the pipeline. One for daily error rate by service. One for revenue by country from the transaction log. One for the nightly data quality check that caught 12 different validation failures before the pipeline ran. None of them were more than five lines. None of them needed Python or pandas or a Jupyter notebook.</p>
    <p>"The command line is a data engineering platform," Priya had said. And Ravi finally understood what she meant. Not because he'd memorised commands, but because he understood the model: grep filters, sed transforms line by line, awk processes fields and accumulates state. Compose them. Chain them. Each tool doing what it does best.</p>
    <p><strong>Three tools, infinite combinations, any data.</strong></p>
  </div>
</div>

</div><!-- /section-block -->
\`

`
};