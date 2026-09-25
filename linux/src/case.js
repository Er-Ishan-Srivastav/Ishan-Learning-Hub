// ============================================================
// myPathshala – Linux Programming Course
// Module: case_statement.js  |  Topic: The case Statement
// ============================================================
// EXPERT FACULTY APPROACH:
//  • 16 full sections — case end-to-end in depth
//  • 8 dedicated simulation consoles
//  • SVG diagrams: pattern matching tree, ;; vs ;& vs ;;&
//    flow, pattern priority, case vs if performance
//  • Kernel deep-dive: how bash evaluates case, fnmatch()
//  • All pattern types: exact, glob, alternation, char class,
//    extglob, character ranges
//  • nocasematch for case-insensitive matching
//  • ;; ;& ;;& terminators — all three explained
//  • case in functions, dispatch tables, menu systems
//  • case vs if/elif — when to use which
//  • Real-world data engineering patterns
//  • 5 exercises Easy → Hard with full solutions
//  • Ravi storyline throughout
//  • $ plain for display; \${VAR} only to escape JS template
// ============================================================

var case_statement = {
    title: "The <code>case</code> Statement",
    description: "Master Bash's case statement end-to-end — every pattern type, all three terminators, fall-through, dispatch tables, and the exact situations where case beats if/elif. Write cleaner, faster, more readable decision code.",
    content: `

<!-- ══════════════════════════════════════════════════════
     RAVI'S STORY — HOOK
══════════════════════════════════════════════════════ -->
<div class="story-panel">
  <div class="story-avatar">🧑‍💻</div>
  <div class="story-body">
    <div class="story-title">Ravi's if/elif Ladder — Day 285</div>
    <p>Ravi's pipeline configuration script had grown to 47 lines of if/elif. Every environment — dev, staging, prod, dr-prod, staging-eu, staging-ap — had its own block. Priya looked at it and said: "How long did it take you to find the staging-eu block just now?" Ravi admitted it had taken a minute.</p>
    <p>She replaced the whole thing with a <code>case</code> statement. It became 28 lines — more readable, harder to get wrong, and with a catch-all <code>*)</code> that caught typos the if/elif chain would have silently ignored. Then she added two more patterns: <code>staging-*)</code> to catch all staging variants in one block, and <code>;;&</code> so the prod block also ran the staging health checks.</p>
    <p>"case is not just 'a nicer if'," she said. "It's a pattern-matching engine. Once you treat it that way, it becomes one of your most powerful tools."</p>
  </div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 1 — ANATOMY & SYNTAX
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num">01</span> case Anatomy — Every Part of the Syntax</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 260" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <defs>
    <marker id="arr-g" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#3fb950"/></marker>
    <marker id="arr-b" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#58a6ff"/></marker>
    <marker id="arr-y" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#ffa657"/></marker>
    <marker id="arr-r" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#f85149"/></marker>
  </defs>
  <rect width="820" height="260" fill="#0d1117" rx="12"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="13" font-weight="bold" fill="#8b949e">case Statement Anatomy — Every Part Labelled</text>

  <!-- Left: code -->
  <rect x="15" y="34" width="420" height="214" rx="8" fill="#161b22" stroke="#30363d" stroke-width="1.5"/>
  <text x="30" y="58"  font-family="'Courier New',monospace" font-size="13" fill="#bc8cff">case</text>
  <text x="76" y="58"  font-family="'Courier New',monospace" font-size="13" fill="#ffa657">"$ENVIRONMENT"</text>
  <text x="230" y="58" font-family="'Courier New',monospace" font-size="13" fill="#bc8cff">in</text>
  <text x="30" y="82"  font-family="'Courier New',monospace" font-size="13" fill="#3fb950">production)</text>
  <text x="50" y="100" font-family="'Courier New',monospace" font-size="11" fill="#e6edf3">DB_HOST="prod-db"</text>
  <text x="50" y="116" font-family="'Courier New',monospace" font-size="11" fill="#e6edf3">LOG="WARN"</text>
  <text x="30" y="132" font-family="'Courier New',monospace" font-size="13" fill="#f85149">;;</text>
  <text x="30" y="156" font-family="'Courier New',monospace" font-size="13" fill="#3fb950">staging|staging-*)</text>
  <text x="50" y="174" font-family="'Courier New',monospace" font-size="11" fill="#e6edf3">DB_HOST="stg-db"</text>
  <text x="30" y="190" font-family="'Courier New',monospace" font-size="13" fill="#f85149">;;</text>
  <text x="30" y="214" font-family="'Courier New',monospace" font-size="13" fill="#8b949e">*)</text>
  <text x="50" y="232" font-family="'Courier New',monospace" font-size="11" fill="#e6edf3">echo "Unknown env" >&2</text>
  <text x="30" y="240" font-family="'Courier New',monospace" font-size="0" fill="#e6edf3">;</text>
  <text x="30" y="248" font-family="'Courier New',monospace" font-size="13" fill="#bc8cff">esac</text>

  <!-- Right: labels -->
  <line x1="78"  y1="58" x2="450" y2="50" stroke="#ffa657" stroke-width="1" stroke-dasharray="3,2" marker-end="url(#arr-y)"/>
  <rect x="450" y="36" width="358" height="22" rx="4" fill="#2a2a1a" stroke="#ffa657" stroke-width="1"/>
  <text x="460" y="51" font-family="'Segoe UI',sans-serif" font-size="10" fill="#ffa657">WORD — the value being tested (expand vars here)</text>

  <line x1="30"  y1="82" x2="450" y2="82" stroke="#3fb950" stroke-width="1" stroke-dasharray="3,2" marker-end="url(#arr-g)"/>
  <rect x="450" y="70" width="358" height="22" rx="4" fill="#1a2a1a" stroke="#3fb950" stroke-width="1"/>
  <text x="460" y="85" font-family="'Segoe UI',sans-serif" font-size="10" fill="#3fb950">PATTERN — glob matched against WORD (see sec 3)</text>

  <line x1="50"  y1="108" x2="450" y2="108" stroke="#58a6ff" stroke-width="1" stroke-dasharray="3,2" marker-end="url(#arr-b)"/>
  <rect x="450" y="96" width="358" height="22" rx="4" fill="#0e1824" stroke="#58a6ff" stroke-width="1"/>
  <text x="460" y="111" font-family="'Segoe UI',sans-serif" font-size="10" fill="#58a6ff">BODY — commands run when pattern matches</text>

  <line x1="42"  y1="132" x2="450" y2="132" stroke="#f85149" stroke-width="1" stroke-dasharray="3,2" marker-end="url(#arr-r)"/>
  <rect x="450" y="120" width="358" height="22" rx="4" fill="#2a1a1a" stroke="#f85149" stroke-width="1"/>
  <text x="460" y="135" font-family="'Segoe UI',sans-serif" font-size="10" fill="#f85149">;; TERMINATOR — exit case (see sec 5 for ;& and ;;&)</text>

  <line x1="30"  y1="156" x2="450" y2="158" stroke="#3fb950" stroke-width="1" stroke-dasharray="3,2" marker-end="url(#arr-g)"/>
  <rect x="450" y="146" width="358" height="22" rx="4" fill="#1a2a1a" stroke="#3fb950" stroke-width="1"/>
  <text x="460" y="161" font-family="'Segoe UI',sans-serif" font-size="10" fill="#3fb950">ALTERNATION — | joins multiple patterns (OR)</text>

  <line x1="30"  y1="214" x2="450" y2="196" stroke="#8b949e" stroke-width="1" stroke-dasharray="3,2" marker-end="url(#arr-b)"/>
  <rect x="450" y="184" width="358" height="22" rx="4" fill="#1f2027" stroke="#8b949e" stroke-width="1"/>
  <text x="460" y="199" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">* CATCH-ALL — matches anything not matched above</text>

  <line x1="56" y1="248" x2="450" y2="234" stroke="#bc8cff" stroke-width="1" stroke-dasharray="3,2" marker-end="url(#arr-b)"/>
  <rect x="450" y="222" width="358" height="22" rx="4" fill="#1a1a3a" stroke="#bc8cff" stroke-width="1"/>
  <text x="460" y="237" font-family="'Segoe UI',sans-serif" font-size="10" fill="#bc8cff">esac — closes case (case spelled backwards)</text>
</svg>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 1 of 8 — case Syntax: Rules, Forms &amp; One-liners</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ FULL SYNTAX ═══════════════════════════════════════════</span>
case WORD in
    pattern1)
        commands
        ;;
    pattern2 | pattern3)    <span class="cb-cmt"># alternation</span>
        commands
        ;;
    *)                       <span class="cb-cmt"># default / catch-all</span>
        commands
        ;;
esac

<span class="cb-cmt">## ═══ SYNTAX RULES ════════════════════════════════════════════</span>
<span class="cb-cmt"># 1. 'in' goes on same line as 'case WORD'
# 2. Each pattern ends with )
# 3. Each block ends with ;; (or ;& or ;;&)
# 4. Closing 'esac' is mandatory
# 5. The last ;; is optional but recommended
# 6. WORD is fully expanded before matching (variables, subst)
# 7. Patterns are NOT quoted — they are glob patterns
# 8. Patterns are tested in ORDER — first match wins
# 9. * as catch-all is optional but best practice</span>

<span class="cb-cmt">## ═══ ONE-LINE FORM ════════════════════════════════════════════</span>
case "$VAR" in a) echo "a";; b) echo "b";; *) echo "other";; esac

<span class="cb-cmt">## ═══ MULTI-LINE WITH COMMANDS ════════════════════════════════</span>
FILETYPE="csv"
case "$FILETYPE" in
    csv|tsv)
        PARSER="csv"
        DELIMITER=","
        [[ $FILETYPE == "tsv" ]] && DELIMITER="\t"
        echo "Text delimited: $DELIMITER"
        ;;
    json)
        PARSER="json"
        echo "JSON format"
        ;;
    parquet|orc)
        PARSER="columnar"
        echo "Columnar format: $FILETYPE"
        ;;
    *.gz|*.bz2|*.xz)
        echo "Compressed — decompress first"
        ;;
    *)
        echo "Unknown format: $FILETYPE" >&2
        exit 1
        ;;
esac

<span class="cb-cmt">## ═══ WORD EXPANSION ══════════════════════════════════════════</span>
<span class="cb-cmt"># The WORD in 'case WORD in' is fully expanded:
# Variables: case "$VAR" in      — $VAR is substituted
# Arithmetic: case $((X+1)) in  — expression evaluated
# Subshell:   case $(whoami) in  — output captured</span>
case "$(date +%u)" in     <span class="cb-cmt"># day of week: 1=Mon … 7=Sun</span>
    [1-5]) echo "Weekday — running incremental" ;;
    6)     echo "Saturday — running full load"  ;;
    7)     echo "Sunday — skipping"             ;;
esac

<span class="cb-cmt">## ═══ WORD IS EXPANDED; PATTERNS ARE NOT ══════════════════════</span>
PAT="prod"
case "$ENVIRONMENT" in
    "$PAT")   <span class="cb-cmt"># WRONG — quoted pattern: matches literal string "$PAT"</span>
        echo "never matches prod";;
    $PAT)     <span class="cb-cmt"># CORRECT — unquoted: variable expanded, matches "prod"</span>
        echo "matches production";;
esac
<span class="cb-cmt"># Patterns on the right side are GLOB patterns — do not quote them
# Exception: to match literal *, use [*] or \*</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 2 — PATTERN MATCHING FLOW
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num">02</span> Pattern Matching Flow — How case Tests Patterns</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 220" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="220" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">case Pattern Testing — Sequential, First Match Wins</text>

  <!-- WORD box -->
  <rect x="330" y="36" width="160" height="36" rx="7" fill="#2a2a1a" stroke="#ffa657" stroke-width="2"/>
  <text x="410" y="59" text-anchor="middle" font-family="'Courier New',monospace" font-size="13" fill="#ffa657">WORD = "staging-eu"</text>

  <!-- Arrow down -->
  <line x1="410" y1="72" x2="410" y2="88" stroke="#8b949e" stroke-width="1.5" marker-end="url(#arr-g)"/>

  <!-- Test 1 -->
  <polygon points="410,90 510,114 410,138 310,114" fill="#1a1a3a" stroke="#bc8cff" stroke-width="1.5"/>
  <text x="410" y="111" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#bc8cff">production</text>
  <text x="410" y="126" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">match?</text>
  <line x1="310" y1="114" x2="252" y2="114" stroke="#f85149" stroke-width="1.5" marker-end="url(#arr-r)"/>
  <text x="281" y="107" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#f85149">NO</text>

  <!-- Arrow down from test 1 -->
  <line x1="410" y1="138" x2="410" y2="152" stroke="#8b949e" stroke-width="1.5" marker-end="url(#arr-g)"/>
  <text x="420" y="148" font-family="'Segoe UI',sans-serif" font-size="9" fill="#f85149">NO</text>

  <!-- Test 2 -->
  <polygon points="410,154 510,178 410,202 310,178" fill="#1a1a3a" stroke="#bc8cff" stroke-width="1.5"/>
  <text x="410" y="173" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#bc8cff">staging | staging-*</text>
  <text x="410" y="188" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">match?</text>

  <!-- YES -->
  <line x1="510" y1="178" x2="620" y2="178" stroke="#3fb950" stroke-width="2" marker-end="url(#arr-g)"/>
  <text x="565" y="171" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#3fb950">YES — MATCH!</text>
  <rect x="622" y="162" width="184" height="32" rx="6" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="714" y="183" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" fill="#3fb950">Run staging body → ;;</text>

  <!-- Skip remaining -->
  <line x1="714" y1="194" x2="714" y2="210" stroke="#30363d" stroke-width="1.5" stroke-dasharray="4,2"/>
  <text x="714" y="215" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#30363d">remaining patterns SKIPPED — exit case</text>

  <!-- NO arrow continues down (dotted = never reached) -->
  <line x1="410" y1="202" x2="410" y2="215" stroke="#30363d" stroke-width="1.5" stroke-dasharray="4,2"/>
  <text x="425" y="212" font-family="'Segoe UI',sans-serif" font-size="9" fill="#30363d">*) catch-all...</text>
</svg>
</div>

<p style="margin:0 0 16px;">Patterns are tested <strong>in document order — top to bottom</strong>. As soon as one matches, its block runs and all remaining patterns are skipped. This has two important consequences: put the most specific patterns first, and the <code>*)</code> catch-all must be last.</p>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 3 — ALL PATTERN TYPES
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num">03</span> All Pattern Types — Exact, Glob, Class, Extglob</h2>

<!-- CONSOLE 2 -->
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 2 of 8 — Every Pattern Type with Working Examples</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ EXACT STRING MATCH ══════════════════════════════════════</span>
case "$COMMAND" in
    start)   service_start ;;
    stop)    service_stop  ;;
    restart) service_stop; service_start ;;
esac

<span class="cb-cmt">## ═══ ALTERNATION — | ═════════════════════════════════════════</span>
case "$ANSWER" in
    yes|y|Y|YES|Yes)   CONFIRMED=true  ;;
    no|n|N|NO|No)      CONFIRMED=false ;;
    *)                 echo "Please answer yes or no" ;;
esac

case "$EXT" in
    csv|CSV|tsv|TSV)   FORMAT="text"   ;;
    json|JSON)         FORMAT="json"   ;;
    parquet|PARQUET)   FORMAT="binary" ;;
esac

<span class="cb-cmt">## ═══ GLOB * — WILDCARD MATCH ════════════════════════════════</span>
FILE="sales_report_2024.csv.gz"
case "$FILE" in
    *.csv)       echo "Plain CSV"       ;;
    *.csv.gz)    echo "Gzipped CSV"     ;;
    *.tsv)       echo "Tab-separated"   ;;
    *.json)      echo "JSON"            ;;
    *.parquet)   echo "Parquet"         ;;
    *)           echo "Unknown: $FILE"  ;;
esac
<span class="cb-out">Gzipped CSV</span>
<span class="cb-cmt"># IMPORTANT: *.csv.gz must come BEFORE *.csv if both could match
# "more specific patterns first" rule</span>

<span class="cb-cmt">## ═══ GLOB ? — SINGLE CHARACTER ══════════════════════════════</span>
case "$CODE" in
    ???)   echo "Three-char code" ;;
    ??)    echo "Two-char code"   ;;
    ?)     echo "Single char"     ;;
esac

<span class="cb-cmt">## ═══ CHARACTER CLASSES [ ] ══════════════════════════════════</span>
case "$SEVERITY" in
    [Ee]rror|[Ee]RROR)   LEVEL=3 ;;
    [Ww]arn*)             LEVEL=2 ;;
    [Ii]nfo*)             LEVEL=1 ;;
    [Dd]ebug*)            LEVEL=0 ;;
esac

case "$FIRST_CHAR" in
    [0-9])     echo "Starts with digit"  ;;
    [a-z])     echo "Starts with lower"  ;;
    [A-Z])     echo "Starts with upper"  ;;
    [_])       echo "Starts with _"      ;;
    *)         echo "Other"              ;;
esac

<span class="cb-cmt">## ═══ POSIX CHARACTER CLASSES ════════════════════════════════</span>
case "$INPUT" in
    [[:digit:]]*)  echo "Starts with digit"       ;;
    [[:alpha:]]*)  echo "Starts with letter"      ;;
    [[:space:]]*)  echo "Leading whitespace"       ;;
    [[:punct:]]*)  echo "Starts with punctuation" ;;
esac

<span class="cb-cmt">## ═══ EXTGLOB PATTERNS (shopt -s extglob) ════════════════════</span>
shopt -s extglob
FILE="report.csv"
case "$FILE" in
    *.@(csv|tsv|txt))    echo "Text data"   ;;    <span class="cb-cmt"># @(a|b) = exactly one of</span>
    *.+(log|LOG))        echo "Log file"    ;;    <span class="cb-cmt"># +(a|b) = one or more of</span>
    !(*.*))              echo "No extension";;    <span class="cb-cmt"># !(pat) = anything except</span>
    ?(backup_)*.csv)     echo "Maybe backup CSV" ;; <span class="cb-cmt"># ?(pat) = zero or one</span>
esac

<span class="cb-cmt">## ═══ EMPTY STRING ═══════════════════════════════════════════</span>
case "\${VAR:-}" in
    '')    echo "Empty or unset" ;;
    *)     echo "Has value: $VAR" ;;
esac

<span class="cb-cmt">## ═══ LITERAL SPECIAL CHARACTERS ════════════════════════════</span>
case "$CHAR" in
    '?')   echo "Literal question mark" ;;  <span class="cb-cmt"># single-quote to prevent glob</span>
    '*')   echo "Literal asterisk"      ;;
    '[')   echo "Literal bracket"       ;;
    '|')   echo "Literal pipe"          ;;
    \*)    echo "Escaped asterisk"      ;;  <span class="cb-cmt"># backslash escape also works</span>
esac
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 4 — PATTERN PRIORITY & ORDERING
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num">04</span> Pattern Priority — Order Matters, Specific First</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 190" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="190" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">Pattern Priority — Specific Before General, More Specific = Higher</text>

  <!-- Wrong order -->
  <rect x="15" y="34" width="375" height="144" rx="8" fill="#2a1a1a" stroke="#f85149" stroke-width="2"/>
  <text x="202" y="54" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#f85149">❌ Wrong Order — General Before Specific</text>
  <text x="30"  y="76" font-family="'Courier New',monospace" font-size="11" fill="#e6edf3">*.csv)      echo "CSV"     ;;</text>
  <text x="30"  y="94" font-family="'Courier New',monospace" font-size="11" fill="#f85149">*.csv.gz)   echo "gzipped" ;; ← NEVER REACHED!</text>
  <text x="30" y="112" font-family="'Courier New',monospace" font-size="11" fill="#e6edf3">*)          echo "other"   ;;</text>
  <text x="202" y="140" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#f85149">file.csv.gz → "CSV" (wrong!)</text>
  <text x="202" y="158" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">*.csv also matches file.csv.gz</text>
  <text x="202" y="170" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">since *.csv = any chars + .csv (incl. .csv.gz)</text>

  <!-- Correct order -->
  <rect x="430" y="34" width="375" height="144" rx="8" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="617" y="54" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#3fb950">✅ Correct Order — Specific Before General</text>
  <text x="445" y="76" font-family="'Courier New',monospace" font-size="11" fill="#3fb950">*.csv.gz)   echo "gzipped" ;; ← tested first</text>
  <text x="445" y="94" font-family="'Courier New',monospace" font-size="11" fill="#e6edf3">*.csv)      echo "CSV"     ;;</text>
  <text x="445" y="112" font-family="'Courier New',monospace" font-size="11" fill="#e6edf3">*)          echo "other"   ;;</text>
  <text x="617" y="140" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#3fb950">file.csv.gz → "gzipped" (correct!)</text>
  <text x="617" y="158" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#3fb950">file.csv    → "CSV" (correct!)</text>
  <text x="617" y="170" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#3fb950">file.json   → "other" (correct!)</text>
</svg>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 3 of 8 — Pattern Priority: Ordering Rules &amp; nocasematch</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ ORDERING RULES ═════════════════════════════════════════</span>
<span class="cb-cmt"># Rule 1: More specific patterns FIRST
# Rule 2: Wildcard/glob patterns AFTER specific ones  
# Rule 3: * catch-all ALWAYS LAST
# Rule 4: Alternation | does not have ordering within one pattern</span>

<span class="cb-cmt"># CORRECT: specific → general → catch-all</span>
case "$FILE" in
    *.csv.gz)          DECOMPRESS=true;  FORMAT="csv" ;;
    *.csv)             DECOMPRESS=false; FORMAT="csv" ;;
    *.json.gz)         DECOMPRESS=true;  FORMAT="json";;
    *.json)            DECOMPRESS=false; FORMAT="json";;
    *.parquet)         FORMAT="parquet" ;;
    *)                 echo "Unsupported: $FILE" >&2; exit 1 ;;
esac

<span class="cb-cmt">## ═══ ENVIRONMENT SPECIFICITY ═════════════════════════════════</span>
<span class="cb-cmt"># Specific environments before wildcard groups:</span>
case "$ENV" in
    prod|production)   TIER="prod"    ;;   <span class="cb-cmt"># exact names first</span>
    staging-eu)        TIER="stg-eu"  ;;   <span class="cb-cmt"># specific region</span>
    staging-*)         TIER="staging" ;;   <span class="cb-cmt"># any other staging after</span>
    dev|development|"")TIER="dev"     ;;
    *)                 echo "Unknown env: $ENV" >&2; exit 1 ;;
esac

<span class="cb-cmt">## ═══ nocasematch — CASE-INSENSITIVE MATCHING ════════════════</span>
<span class="cb-cmt"># shopt -s nocasematch: patterns match case-insensitively</span>
shopt -s nocasematch
case "$ANSWER" in
    yes)   echo "Yes (matched: y Y ye Yes YES YeS...)" ;;
    no)    echo "No"    ;;
    *)     echo "Other" ;;
esac
shopt -u nocasematch   <span class="cb-cmt"># restore default (case-sensitive)</span>

<span class="cb-cmt"># Practical use — match any capitalisation of log level:</span>
shopt -s nocasematch
case "$LOG_LEVEL" in
    debug)   VERBOSITY=4 ;;
    info)    VERBOSITY=3 ;;
    warn)    VERBOSITY=2 ;;
    error)   VERBOSITY=1 ;;
    *)       VERBOSITY=1 ;;
esac
shopt -u nocasematch
<span class="cb-cmt"># Now matches: DEBUG debug Debug dEbUg etc.</span>
<span class="cb-cmt"># Without nocasematch you need: debug|DEBUG|Debug|...)</span>

<span class="cb-cmt">## ═══ PATTERN MATCHING SCOPE ══════════════════════════════════</span>
<span class="cb-cmt"># case patterns use bash glob matching (fnmatch)
# NOT regex — no ^, $, +, {n}, (?=) etc.
# For regex matching: use [[ $VAR =~ REGEX ]] with if/elif</span>

<span class="cb-cmt"># If you need regex in a branch, combine case + [[ ]]:
case "$FILE" in
    *.csv)
        if [[ $FILE =~ ^[0-9]{4}-[0-9]{2}-[0-9]{2}_.*\.csv$ ]]; then
            echo "Date-stamped CSV: $FILE"
        else
            echo "Other CSV: $FILE"
        fi
        ;;
    *)
        echo "Not CSV"
        ;;
esac
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 5 — TERMINATORS: ;; ;& ;;&
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num">05</span> Terminators — <code>;;</code> <code>;&</code> <code>;;&</code> Explained</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 210" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="210" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">Three case Terminators — What Happens After a Match</text>

  <!-- ;; -->
  <rect x="12"  y="36" width="258" height="162" rx="8" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="141" y="58" text-anchor="middle" font-family="'Courier New',monospace" font-size="18" font-weight="bold" fill="#3fb950">;;</text>
  <text x="141" y="76" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Exit case immediately</text>
  <line x1="22" y1="84" x2="262" y2="84" stroke="#30363d" stroke-width="1"/>
  <text x="22"  y="102" font-family="'Segoe UI',sans-serif" font-size="11" fill="#e6edf3">Match → run body → done</text>
  <text x="22"  y="120" font-family="'Segoe UI',sans-serif" font-size="11" fill="#e6edf3">Next pattern NOT tested</text>
  <text x="22"  y="138" font-family="'Segoe UI',sans-serif" font-size="11" fill="#e6edf3">Next body NOT run</text>
  <text x="141" y="170" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#3fb950">Use this 95% of the time</text>
  <text x="141" y="186" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">default, expected behaviour</text>

  <!-- ;& -->
  <rect x="282" y="36" width="258" height="162" rx="8" fill="#0e1824" stroke="#58a6ff" stroke-width="2"/>
  <text x="411" y="58" text-anchor="middle" font-family="'Courier New',monospace" font-size="18" font-weight="bold" fill="#58a6ff">;&</text>
  <text x="411" y="76" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Fall through — run next body</text>
  <line x1="292" y1="84" x2="532" y2="84" stroke="#30363d" stroke-width="1"/>
  <text x="292" y="102" font-family="'Segoe UI',sans-serif" font-size="11" fill="#e6edf3">Match → run body</text>
  <text x="292" y="120" font-family="'Segoe UI',sans-serif" font-size="11" fill="#58a6ff">→ run NEXT body unconditionally</text>
  <text x="292" y="138" font-family="'Segoe UI',sans-serif" font-size="11" fill="#e6edf3">Next pattern NOT tested</text>
  <text x="411" y="170" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#58a6ff">Like C switch fallthrough</text>
  <text x="411" y="186" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Use: OS families, shared setup</text>

  <!-- ;;& -->
  <rect x="552" y="36" width="256" height="162" rx="8" fill="#2a2a1a" stroke="#ffa657" stroke-width="2"/>
  <text x="680" y="58" text-anchor="middle" font-family="'Courier New',monospace" font-size="18" font-weight="bold" fill="#ffa657">;;&</text>
  <text x="680" y="76" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Continue testing patterns</text>
  <line x1="562" y1="84" x2="800" y2="84" stroke="#30363d" stroke-width="1"/>
  <text x="562" y="102" font-family="'Segoe UI',sans-serif" font-size="11" fill="#e6edf3">Match → run body</text>
  <text x="562" y="120" font-family="'Segoe UI',sans-serif" font-size="11" fill="#ffa657">→ TEST next pattern too</text>
  <text x="562" y="138" font-family="'Segoe UI',sans-serif" font-size="11" fill="#e6edf3">→ run it if matches</text>
  <text x="680" y="170" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#ffa657">Multiple categories per input</text>
  <text x="680" y="186" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Use: tagging, multi-classification</text>
</svg>
</div>

<!-- CONSOLE 4 -->
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 4 of 8 — ;; ;& ;;& with Real Working Examples</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ ;; — EXIT CASE (normal) ═══════════════════════════════</span>
case "$FRUIT" in
    apple)  echo "apple"  ;;
    banana) echo "banana" ;;
    *)      echo "other"  ;;
esac
<span class="cb-cmt"># FRUIT=apple → prints "apple", done. "banana" and "*" never tested.</span>

<span class="cb-cmt">## ═══ ;& — UNCONDITIONAL FALL-THROUGH ════════════════════════</span>
<span class="cb-cmt"># ;& runs the next body regardless of whether its pattern matches</span>
OS="ubuntu"
PKG_MGR="" FAMILY=""
case "$OS" in
    ubuntu)
        PKG_MGR="apt"
        ;&                      <span class="cb-cmt"># fall through to 'debian' body</span>
    debian)
        FAMILY="debian"
        ;;
    fedora)
        PKG_MGR="dnf"
        ;&
    centos|rhel)
        FAMILY="redhat"
        ;;
esac
echo "PKG=$PKG_MGR FAMILY=$FAMILY"
<span class="cb-out">PKG=apt FAMILY=debian</span>
<span class="cb-cmt"># ubuntu → set PKG_MGR=apt, fall through → set FAMILY=debian, done.
# 'debian' pattern was NOT tested — body ran unconditionally.</span>

<span class="cb-cmt">## ═══ ;;& — CONTINUE TESTING (conditional fall-through) ══════</span>
<span class="cb-cmt"># ;;& runs the next pattern test — runs body only if it matches</span>
LOG_LINE="ERROR timeout connection refused"
ERRORS=0; TIMEOUTS=0; CONNECTIONS=0

case "$LOG_LINE" in
    *ERROR*)
        (( ERRORS++ ))
        ;;&                     <span class="cb-cmt"># keep testing next patterns</span>
    *timeout*)
        (( TIMEOUTS++ ))
        ;;&                     <span class="cb-cmt"># keep testing</span>
    *connection*)
        (( CONNECTIONS++ ))
        ;;                      <span class="cb-cmt"># done</span>
esac
echo "errors=$ERRORS timeouts=$TIMEOUTS connections=$CONNECTIONS"
<span class="cb-out">errors=1 timeouts=1 connections=1</span>
<span class="cb-cmt"># All three matched → all three counters incremented.
# A single line can match multiple categories with ;;&</span>

<span class="cb-cmt">## ═══ MIXING TERMINATORS ══════════════════════════════════════</span>
EVENT="CRITICAL_DB_CONN_ERROR"
SEND_EMAIL=false; SEND_SMS=false; CALL_ONCALL=false; LOG=false

case "$EVENT" in
    CRITICAL_*)
        CALL_ONCALL=true
        ;;&                     <span class="cb-cmt"># also test: is it a DB event?</span>
    *_DB_*)
        SEND_SMS=true
        ;;&                     <span class="cb-cmt"># also test: does it have ERROR?</span>
    *ERROR*)
        SEND_EMAIL=true
        ;;&
    *)
        LOG=true                <span class="cb-cmt"># always log everything</span>
        ;;
esac
echo "email=$SEND_EMAIL sms=$SEND_SMS oncall=$CALL_ONCALL log=$LOG"
<span class="cb-out">email=true sms=true oncall=true log=true</span>

<span class="cb-cmt">## ═══ ;& VS ;;& SUMMARY ═══════════════════════════════════════</span>
<span class="cb-cmt"># ;;  → stop here (95% of use cases)
# ;&  → run next block regardless (OS family inheritance)
# ;;& → test next pattern, run if matches (multi-category tagging)
#
# All three can be mixed in the same case statement</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 6 — case VS if/elif
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num">06</span> <code>case</code> vs <code>if/elif</code> — When to Use Which</h2>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 5 of 8 — case vs if: Decision Guide &amp; Side-by-Side</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ USE case WHEN: ═════════════════════════════════════════</span>
<span class="cb-cmt"># 1. Matching ONE variable against MULTIPLE patterns
# 2. Patterns are strings, globs, or character classes
# 3. You have 3+ branches (readability gains kick in)
# 4. You need fall-through between related branches
# 5. You need a clean dispatch/routing table
# 6. Patterns have alternation (yes|y|YES is cleaner in case)</span>

<span class="cb-cmt">## ═══ USE if/elif WHEN: ════════════════════════════════════════</span>
<span class="cb-cmt"># 1. Comparing DIFFERENT variables in each branch
# 2. Using numeric comparisons (( )), -gt, -lt
# 3. Using regex =~ matches
# 4. Checking file tests (-f, -d, -s)
# 5. Running commands as conditions (grep, test, etc.)
# 6. Complex compound conditions (&&, ||)</span>

<span class="cb-cmt">## ═══ SIDE-BY-SIDE: SAME LOGIC ═══════════════════════════════</span>
<span class="cb-cmt"># if/elif version — works but noisy:</span>
if   [[ $ENV == "production" ]]; then
    DB_HOST="prod-db"
elif [[ $ENV == "staging" || $ENV == staging-* ]]; then
    DB_HOST="stg-db"
elif [[ $ENV == "dev" || $ENV == "development" || -z $ENV ]]; then
    DB_HOST="localhost"
else
    echo "Unknown env: $ENV" >&2; exit 1
fi

<span class="cb-cmt"># case version — cleaner for string matching:</span>
case "$ENV" in
    production)     DB_HOST="prod-db"    ;;
    staging|staging-*) DB_HOST="stg-db" ;;
    dev|development|"") DB_HOST="localhost" ;;
    *)              echo "Unknown env: $ENV" >&2; exit 1 ;;
esac

<span class="cb-cmt">## ═══ if/elif IS BETTER: MIXED CONDITIONS ════════════════════</span>
<span class="cb-cmt"># Each branch tests something different — if/elif is correct:</span>
if   [[ ! -f "$INPUT" ]]; then
    echo "File not found" >&2; exit 1
elif [[ ! -s "$INPUT" ]]; then
    echo "File is empty" >&2; exit 1
elif (( $(wc -l < "$INPUT") < 100 )); then
    echo "Too few rows — suspiciously small" >&2
elif grep -q "CORRUPT" "$INPUT"; then
    echo "Corruption marker found" >&2; exit 1
else
    echo "Input looks valid"
fi
<span class="cb-cmt"># Can't put these in case — different tests, different vars, command tests</span>

<span class="cb-cmt">## ═══ PERFORMANCE — CASE IS SLIGHTLY FASTER ══════════════════</span>
<span class="cb-cmt"># case uses fnmatch() internally — O(1) pattern lookup
# if/elif re-evaluates each condition in sequence
# For 10+ branches matching one variable: case is measurably faster
# For most scripts: difference is negligible

# Benchmark (illustrative):
# time for i in {1..100000}; do
#   case "$VAR" in a) ;; b) ;; c) ;; *) ;; esac
# done
# ~0.5s  (pattern dispatch table)
#
# time for i in {1..100000}; do
#   if [[ $VAR == a ]]; then :
#   elif [[ $VAR == b ]]; then :
#   elif [[ $VAR == c ]]; then :
#   fi
# done
# ~0.8s  (sequential evaluation)</span>

<span class="cb-cmt">## ═══ COMBINING: case WITH INNER if ═══════════════════════════</span>
<span class="cb-cmt"># Use case for the outer dispatch, if for inner detail:</span>
case "$FORMAT" in
    csv|tsv)
        PARSER="text"
        if [[ $FORMAT == "tsv" ]]; then
            DELIMITER=$'\t'
        else
            DELIMITER=","
        fi
        HEADERS=$(head -1 "$FILE" | tr "$DELIMITER" '\n' | wc -l)
        echo "Text format with $HEADERS columns"
        ;;
    json)
        if command -v jq &>/dev/null; then
            RECORDS=$(jq length "$FILE")
        else
            RECORDS=$(grep -c '^{' "$FILE")
        fi
        echo "JSON with ~$RECORDS records"
        ;;
esac
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 7 — COMMAND DISPATCH TABLES
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num">07</span> Command Dispatch — Building CLI Tools with <code>case</code></h2>

<p>The most powerful production use of <code>case</code> is implementing subcommand routing — the same pattern used by <code>git</code>, <code>docker</code>, <code>kubectl</code>, and every well-structured CLI script.</p>

<!-- CONSOLE 6 -->
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 6 of 8 — Dispatch Tables, CLI Subcommands, Help Systems</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ BASIC COMMAND DISPATCH ════════════════════════════════</span>
COMMAND="\${1:-help}"
shift 2>/dev/null            <span class="cb-cmt"># remove $1; remaining args available as $@</span>

case "$COMMAND" in
    start)
        pipeline_start "$@"
        ;;
    stop)
        pipeline_stop
        ;;
    status|info|show)
        pipeline_status
        ;;
    restart)
        pipeline_stop && pipeline_start "$@"
        ;;
    load)
        [[ -n "\${1:-}" ]] || { echo "load requires FILE arg" >&2; exit 1; }
        pipeline_load "$@"
        ;;
    validate)
        pipeline_validate "\${1:?validate requires FILE}"
        ;;
    --help|-h|help)
        show_help
        exit 0
        ;;
    --version|-V|version)
        echo "pipeline v2.1.0"
        exit 0
        ;;
    --dry-run|-n)
        DRY_RUN=true
        pipeline_start "$@"
        ;;
    "")
        echo "Error: no command given. Run '$0 help'" >&2
        exit 2
        ;;
    *)
        echo "Unknown command: $COMMAND" >&2
        echo "Run '$0 help' for usage" >&2
        exit 1
        ;;
esac

<span class="cb-cmt">## ═══ NESTED DISPATCH (subcommands with sub-subcommands) ══════</span>
COMMAND="$1"; shift
SUBCOMMAND="\${1:-}"; shift 2>/dev/null

case "$COMMAND" in
    db)
        case "$SUBCOMMAND" in
            connect)   db_connect "$@" ;;
            migrate)   db_migrate "$@" ;;
            backup)    db_backup  "$@" ;;
            restore)   db_restore "$@" ;;
            *)         echo "Unknown db command: $SUBCOMMAND" >&2; exit 1 ;;
        esac
        ;;
    job)
        case "$SUBCOMMAND" in
            list)    job_list    ;;
            run)     job_run "$@";;
            cancel)  job_cancel "$1" ;;
            status)  job_status "$1" ;;
            *)       echo "Unknown job command: $SUBCOMMAND" >&2; exit 1 ;;
        esac
        ;;
    help|--help|-h|"")
        show_main_help
        ;;
    *)
        echo "Unknown command: $COMMAND" >&2; exit 1
        ;;
esac

<span class="cb-cmt">## ═══ FUNCTION-BASED DISPATCH ═════════════════════════════════</span>
<span class="cb-cmt"># Map commands to functions using case as a whitelist</span>
dispatch() {
    local CMD="\${1:-}"; shift
    case "$CMD" in
        load|transform|validate|export|archive)
            "pipeline_\${CMD}" "$@"   <span class="cb-cmt"># call pipeline_load, pipeline_transform etc.</span>
            ;;
        help|--help|-h)
            show_help; return 0 ;;
        "")
            echo "No command" >&2; return 2 ;;
        *)
            echo "Unknown: $CMD" >&2; return 1 ;;
    esac
}
dispatch "$@"

<span class="cb-cmt">## ═══ ARGUMENT PARSING WITH case ══════════════════════════════</span>
<span class="cb-cmt"># Parse flags manually (alternative to getopts for long options):</span>
VERBOSE=false; DRY_RUN=false; ENV="dev"; DATE=""

while [[ $# -gt 0 ]]; do
    case "$1" in
        -v|--verbose)
            VERBOSE=true
            shift
            ;;
        -n|--dry-run)
            DRY_RUN=true
            shift
            ;;
        -e|--env)
            [[ -n "\${2:-}" ]] || { echo "--env requires value" >&2; exit 1; }
            ENV="$2"
            shift 2
            ;;
        --env=*)
            ENV="\${1#--env=}"   <span class="cb-cmt"># extract value after =</span>
            shift
            ;;
        -d|--date)
            DATE="$2"
            shift 2
            ;;
        --)
            shift; break        <span class="cb-cmt"># end of flags</span>
            ;;
        -*)
            echo "Unknown flag: $1" >&2; exit 1
            ;;
        *)
            break               <span class="cb-cmt"># first non-flag = positional args start</span>
            ;;
    esac
done
<span class="cb-cmt"># Remaining $@ are positional arguments after all flags</span>
echo "env=$ENV dry=$DRY_RUN verbose=$VERBOSE date=$DATE files: $@"
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 8 — case IN FUNCTIONS & select COMBOS
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num">08</span> <code>case</code> in Functions &amp; <code>select</code> Combinations</h2>

<!-- CONSOLE 7 -->
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 7 of 8 — case in Functions, select+case Menus, read+case</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ case IN FUNCTIONS ═══════════════════════════════════════</span>
<span class="cb-cmt"># Functions that dispatch based on arguments</span>
configure_env() {
    local ENV="\${1:-dev}"
    local -n _cfg="$2"      <span class="cb-cmt"># nameref to caller's config array</span>

    case "$ENV" in
        prod|production)
            _cfg[host]="prod-db.internal"
            _cfg[port]="5432"
            _cfg[ssl]="true"
            _cfg[pool]="20"
            ;;
        staging|stg)
            _cfg[host]="stg-db.internal"
            _cfg[port]="5432"
            _cfg[ssl]="true"
            _cfg[pool]="10"
            ;;
        dev|development|local)
            _cfg[host]="localhost"
            _cfg[port]="5432"
            _cfg[ssl]="false"
            _cfg[pool]="5"
            ;;
        test)
            _cfg[host]="localhost"
            _cfg[port]="5433"   <span class="cb-cmt"># different port for test DB</span>
            _cfg[ssl]="false"
            _cfg[pool]="2"
            ;;
        *)
            echo "Unknown environment: $ENV" >&2
            return 1
            ;;
    esac
    return 0
}

declare -A DB_CONFIG
configure_env "staging" DB_CONFIG
echo "Host: \${DB_CONFIG[host]}, Pool: \${DB_CONFIG[pool]}"
<span class="cb-out">Host: stg-db.internal, Pool: 10</span>

<span class="cb-cmt">## ═══ FILE TYPE HANDLER FUNCTION ══════════════════════════════</span>
get_loader() {
    local FILE="$1"
    local -n _loader="$2"

    case "\${FILE,,}" in             <span class="cb-cmt"># \${FILE,,} = lowercase for matching</span>
        *.csv.gz|*.csv.bz2)   _loader="compressed_csv"  ;;
        *.csv|*.txt)          _loader="plain_csv"        ;;
        *.tsv)                _loader="tsv"              ;;
        *.json|*.ndjson)      _loader="json"             ;;
        *.parquet)            _loader="parquet"          ;;
        *.avro)               _loader="avro"             ;;
        *.xlsx|*.xls)         _loader="excel"            ;;
        *)
            echo "Unsupported: $FILE" >&2
            return 1
            ;;
    esac
}

LOADER=""
get_loader "sales_2024.csv.gz" LOADER
echo "Loader: $LOADER"
<span class="cb-out">Loader: compressed_csv</span>

<span class="cb-cmt">## ═══ select + case: INTERACTIVE MENU SYSTEM ═════════════════</span>
PS3="Choose action: "
select ACTION in "Load data" "Transform" "Validate" "Export" "Config" "Quit"; do
    case "$ACTION" in
        "Load data")
            read -r -p "File path: " FILEPATH
            case "\${FILEPATH##*.}" in
                csv)     load_csv "$FILEPATH"     ;;
                json)    load_json "$FILEPATH"    ;;
                parquet) load_parquet "$FILEPATH" ;;
                *)       echo "Unsupported format" ;;
            esac
            ;;
        Transform)
            PS3="Transform type: "
            select TRANSFORM in "Normalise" "Aggregate" "Join" "Back"; do
                [[ $TRANSFORM == "Back" ]] && break
                [[ -n $TRANSFORM ]] && { run_transform "$TRANSFORM"; break; }
            done
            PS3="Choose action: "
            ;;
        Validate)
            run_validation && echo "✅ Valid" || echo "❌ Invalid"
            ;;
        Export)
            read -r -p "Output format (csv/json/parquet): " FMT
            case "$FMT" in
                csv)     export_csv     ;;
                json)    export_json    ;;
                parquet) export_parquet ;;
                *)       echo "Unknown format: $FMT" ;;
            esac
            ;;
        Config)
            show_config
            ;;
        Quit|"")
            echo "Goodbye"
            break
            ;;
    esac
done

<span class="cb-cmt">## ═══ read + case: INTERACTIVE PROMPT ════════════════════════</span>
while true; do
    read -r -p "Action [load/check/quit]: " CMD
    case "$CMD" in
        load)
            read -r -p "File: " FILE
            load_data "$FILE"
            ;;
        check)
            check_status
            ;;
        q|quit|exit)
            echo "Exiting"; break
            ;;
        "")
            ;;   <span class="cb-cmt"># ignore empty input — stay in loop</span>
        *)
            echo "Unknown: '$CMD'. Try: load check quit"
            ;;
    esac
done
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 9 — KERNEL DEEP DIVE
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num">09</span> Kernel Deep Dive — How <code>case</code> Works at the bash Level</h2>

<div class="deepdive-box">
<div class="deepdive-title">⚙️ case Internals — Parsing, fnmatch(), and Why case Is Fast</div>
<pre style="margin:0;padding:16px;font-family:monospace;font-size:12px;color:#e6edf3;background:#010409;border-radius:0 0 8px 8px;overflow-x:auto;">
# HOW bash PROCESSES case

1. PARSING — At script load time (not execution time)
   bash parses the entire case statement into an AST node:
     CASE_COMMAND {
       word:     the WORD to match
       clauses:  array of (patterns[], body, terminator)
     }
   
   Patterns are stored as raw strings at parse time.
   They are NOT compiled into regex — bash uses fnmatch() at runtime.

2. EXECUTION — When the case statement runs
   Step 1: Expand WORD
           case "$VAR" in → VAR is expanded: word splitting, glob
                            expansion, command substitution all applied.
   
   Step 2: For each clause (in order):
           For each pattern in the clause:
             result = execute_fnmatch(pattern, word, flags)
             if result == 0 (match):
               execute clause body
               handle terminator (;;, ;&, ;;&)
               stop (for ;; and ;&), or continue (for ;;&)

3. fnmatch() — THE PATTERN MATCHING FUNCTION
   fnmatch(const char *pattern, const char *string, int flags)
   
   This is a POSIX C library function (fnmatch.h).
   It implements glob-style matching:
   
   FNM_CASEFOLD  → set by shopt -s nocasematch
   FNM_EXTMATCH  → set by shopt -s extglob
   FNM_PATHNAME  → NOT set (so * matches / in case patterns)
   
   fnmatch() is much simpler than regex:
   - No backtracking needed
   - O(n*m) worst case but usually O(n) for simple patterns
   - Much faster than regexec() for glob patterns

4. TERMINATOR HANDLING
   ;; → CASE_ENDING:  execute body, then jump to esac
   ;& → CASE_FALLTHROUGH: execute body, then execute NEXT body
        (no pattern test for the next clause)
   ;;& → CASE_RETRIAL: execute body, then TEST next patterns from top
         (continues the fnmatch() loop)

5. NO FORK — case IS A BUILTIN CONSTRUCT
   case has NO external command involved.
   Every pattern test is a direct fnmatch() call inside bash.
   No fork(), no exec(), no pipe — pure in-process evaluation.
   
   Contrast with: if grep -q 'pattern' file — that forks grep!
   
   For large dispatch tables (20+ branches), case over a string
   variable is significantly faster than repeated grep/test calls.

6. nocasematch IMPLEMENTATION
   shopt -s nocasematch sets SHOPT_NOCASEMATCH flag in bash globals.
   When case evaluates patterns, it passes FNM_CASEFOLD to fnmatch().
   This makes the C library do locale-aware case folding per character.
   No overhead to check — fnmatch handles it internally.

7. EXTGLOB PATTERNS IN case
   shopt -s extglob sets SHOPT_EXTGLOB flag.
   fnmatch() receives FNM_EXTMATCH when this is set.
   This enables ?(pat) *(pat) +(pat) @(pat|...) !(pat) patterns.
   These are compiled to extended glob structures by bash before
   being passed to fnmatch(), but still no regex engine involved.
</pre>
</div>

<div class="two-col-grid" style="margin-top:20px;">
  <div class="callout-box info-box">
    <strong>⚡ Performance: case vs if/elif</strong>
    <pre style="margin:6px 0 0;font-family:monospace;font-size:12px;background:transparent;border:none;padding:0;color:#e6edf3;"># Pure string matching — case wins:
case "$VAR" in
  a) ;; b) ;; c) ;; d) ;; *) ;;
esac
# Each branch: one fnmatch() call, no fork

# if/elif equivalent:
if [[ $VAR == a ]]; then :
elif [[ $VAR == b ]]; then :
elif [[ $VAR == c ]]; then :
fi
# Each branch: bash keyword compare, same speed
# Difference is readability, not performance</pre>
  </div>
  <div class="callout-box info-box">
    <strong>🔬 Debug case pattern matching:</strong>
    <pre style="margin:6px 0 0;font-family:monospace;font-size:12px;background:transparent;border:none;padding:0;color:#e6edf3;"># Trace what case sees:
bash -x script.sh 2>&1 | grep 'case\|esac'

# Print which pattern matched:
case "$VAR" in
    prod*)
        echo "matched: prod* for '$VAR'"
        ;;
esac

# Test a pattern interactively:
[[ "staging-eu" == staging-* ]] && echo "glob matches"</pre>
  </div>
</div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 10 — REAL-WORLD PATTERNS
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num">10</span> Real-World Patterns — Data Engineering with <code>case</code></h2>

<!-- CONSOLE 8 -->
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 8 of 8 — Production case Patterns</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ PATTERN 1: COMPLETE CLI FRAMEWORK ══════════════════════</span>
<span class="cb-out">#!/usr/bin/env bash</span>
<span class="cb-out">set -euo pipefail</span>
<span class="cb-out">PROG="$(basename "$0")"</span>
<span class="cb-out"></span>
<span class="cb-out">usage() {</span>
<span class="cb-out">    cat << EOF</span>
<span class="cb-out">Usage: $PROG [OPTIONS] COMMAND [ARGS]</span>
<span class="cb-out">Commands: load transform validate export</span>
<span class="cb-out">Options:  -e ENV  -n (dry-run)  -v (verbose)</span>
<span class="cb-out">EOF</span>
<span class="cb-out">}</span>
<span class="cb-out"></span>
<span class="cb-out">ENV="dev"; VERBOSE=false; DRY_RUN=false</span>
<span class="cb-out">while [[ $# -gt 0 ]]; do</span>
<span class="cb-out">    case "$1" in</span>
<span class="cb-out">        -e) ENV="$2";       shift 2 ;;</span>
<span class="cb-out">        -v) VERBOSE=true;   shift   ;;</span>
<span class="cb-out">        -n) DRY_RUN=true;   shift   ;;</span>
<span class="cb-out">        --) shift; break              ;;</span>
<span class="cb-out">        -*) echo "Unknown: $1" >&2; exit 1 ;;</span>
<span class="cb-out">        *)  break                     ;;</span>
<span class="cb-out">    esac</span>
<span class="cb-out">done</span>
<span class="cb-out"></span>
<span class="cb-out">case "\${1:-help}" in</span>
<span class="cb-out">    load)      shift; cmd_load      "$@" ;;</span>
<span class="cb-out">    transform) shift; cmd_transform "$@" ;;</span>
<span class="cb-out">    validate)  shift; cmd_validate  "$@" ;;</span>
<span class="cb-out">    export)    shift; cmd_export    "$@" ;;</span>
<span class="cb-out">    help|-h)   usage; exit 0             ;;</span>
<span class="cb-out">    *)         echo "Unknown: $1" >&2; usage >&2; exit 1 ;;</span>
<span class="cb-out">esac</span>

<span class="cb-cmt">## ═══ PATTERN 2: DATE-BASED PROCESSING STRATEGY ═══════════════</span>
schedule_job() {
    local DOW
    DOW="$(date +%u)"   <span class="cb-cmt"># 1=Mon 2=Tue … 7=Sun</span>

    case "$DOW" in
        1)           STRATEGY="weekly_reset"   ;;   <span class="cb-cmt"># Monday: full refresh</span>
        [2-5])       STRATEGY="incremental"    ;;   <span class="cb-cmt"># Tue-Fri: incremental</span>
        6)           STRATEGY="full_weekend"   ;;   <span class="cb-cmt"># Saturday: full load</span>
        7)           echo "Sunday — skip"; return 0 ;;
    esac

    case "$(date +%d)" in
        01)          STRATEGY="\${STRATEGY}_month_start" ;;
    esac

    echo "Running strategy: $STRATEGY"
    run_pipeline "$STRATEGY"
}

<span class="cb-cmt">## ═══ PATTERN 3: MULTI-CATEGORY LOG TAGGER (;;&) ══════════════</span>
classify_log_line() {
    local LINE="$1"
    local -a TAGS=()

    case "$LINE" in
        *ERROR*|*FATAL*)   TAGS+=("error")      ;;&
        *WARN*)            TAGS+=("warning")    ;;&
        *timeout*)         TAGS+=("timeout")    ;;&
        *connect*)         TAGS+=("network")    ;;&
        *DB*|*database*)   TAGS+=("database")   ;;&
        *auth*|*token*)    TAGS+=("security")   ;;&
        *slow*|*duration*) TAGS+=("perf")       ;;
    esac

    printf '%s\n' "\${TAGS[@]}"
}

TAGS=()
while IFS= read -r TAG; do TAGS+=("$TAG"); done \
    < <(classify_log_line "ERROR DB connection timeout after 5000ms")
echo "Tags: \${TAGS[*]}"
<span class="cb-out">Tags: error timeout network database</span>

<span class="cb-cmt">## ═══ PATTERN 4: OSTYPE DETECTION ════════════════════════════</span>
setup_platform() {
    case "$OSTYPE" in
        linux*)
            PKG="apt-get"
            SED="sed"
            DATE_FMT="%Y-%m-%d"
            ;;
        darwin*)
            PKG="brew"
            SED="gsed"           <span class="cb-cmt"># macOS needs GNU sed</span>
            DATE_FMT="%Y-%m-%d"
            ;;
        cygwin*|msys*|mingw*)
            PKG="choco"
            SED="sed"
            DATE_FMT="%Y-%m-%d"
            echo "Warning: Windows environment" >&2
            ;;
        *)
            echo "Unknown OS: $OSTYPE" >&2
            exit 1
            ;;
    esac
}

<span class="cb-cmt">## ═══ PATTERN 5: RETRY WITH STRATEGY ═════════════════════════</span>
retry_with_strategy() {
    local STRATEGY="$1" CMD="$2"
    local MAX=3 DELAY=5

    case "$STRATEGY" in
        fast)        MAX=3;  DELAY=1  ;;
        standard)    MAX=5;  DELAY=5  ;;
        aggressive)  MAX=10; DELAY=2  ;;
        patient)     MAX=20; DELAY=30 ;;
        once)        MAX=1;  DELAY=0  ;;
        *)           echo "Unknown strategy: $STRATEGY" >&2; return 1 ;;
    esac

    local ATTEMPT=0
    until eval "$CMD"; do
        (( ++ATTEMPT >= MAX )) && { echo "All $MAX attempts failed" >&2; return 1; }
        echo "Retry $ATTEMPT/$MAX in \${DELAY}s..." >&2
        sleep "$DELAY"
    done
}
retry_with_strategy "patient" "psql -d analytics -f migration.sql"
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 11 — COMPLETE REFERENCE
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num">11</span> Complete Reference — Patterns, Terminators &amp; Options</h2>

<div class="table-wrap">
<table class="ref-table">
<thead><tr><th style="width:25%">Syntax / Option</th><th>What It Does</th><th style="width:28%">Example</th></tr></thead>
<tbody>
<tr><td colspan="3" style="background:#1a1a3a;color:#bc8cff;font-family:'Segoe UI',sans-serif;font-weight:bold;">Pattern Types</td></tr>
<tr><td style="font-family:monospace;">word)</td><td>Exact string match</td><td><code>production)</code></td></tr>
<tr><td style="font-family:monospace;">a|b|c)</td><td>Alternation: match any of the alternatives</td><td><code>yes|y|YES)</code></td></tr>
<tr><td style="font-family:monospace;">pre*)</td><td>Glob: starts with "pre", anything after</td><td><code>staging-*)</code></td></tr>
<tr><td style="font-family:monospace;">*.csv)</td><td>Glob: ends with .csv</td><td><code>*.csv|*.CSV)</code></td></tr>
<tr><td style="font-family:monospace;">file?.txt)</td><td>Glob: ? = exactly one char</td><td><code>chunk?.csv)</code></td></tr>
<tr><td style="font-family:monospace;">[abc])</td><td>Character class: one of a, b, c</td><td><code>[yY])</code></td></tr>
<tr><td style="font-family:monospace;">[a-z]*)</td><td>Range class + glob</td><td><code>[0-9]*)</code></td></tr>
<tr><td style="font-family:monospace;">[[:digit:]]*)</td><td>POSIX class: starts with digit</td><td><code>[[:alpha:]]*)</code></td></tr>
<tr><td style="font-family:monospace;">'')</td><td>Empty string match</td><td><code>'')</code> or <code>"")</code></td></tr>
<tr><td style="font-family:monospace;">*)</td><td>Catch-all: matches anything (place last)</td><td><code>*) echo "unknown" ;;</code></td></tr>
<tr><td colspan="3" style="background:#2a2a1a;color:#ffa657;font-family:'Segoe UI',sans-serif;font-weight:bold;">extglob Patterns (shopt -s extglob)</td></tr>
<tr><td style="font-family:monospace;">@(a|b))</td><td>Exactly one of a or b</td><td><code>*.@(csv|tsv))</code></td></tr>
<tr><td style="font-family:monospace;">*(pat))</td><td>Zero or more of pattern</td><td><code>*(0))</code></td></tr>
<tr><td style="font-family:monospace;">+(pat))</td><td>One or more of pattern</td><td><code>+(log))</code></td></tr>
<tr><td style="font-family:monospace;">?(pat))</td><td>Zero or one of pattern</td><td><code>?(backup_)*.csv)</code></td></tr>
<tr><td style="font-family:monospace;">!(pat))</td><td>Anything except pattern</td><td><code>!(*test*))</code></td></tr>
<tr><td colspan="3" style="background:#1a2a1a;color:#3fb950;font-family:'Segoe UI',sans-serif;font-weight:bold;">Terminators</td></tr>
<tr><td style="font-family:monospace;">;;</td><td>Exit case — normal, always use this</td><td>default for every branch</td></tr>
<tr><td style="font-family:monospace;">;&</td><td>Fall-through: execute next body unconditionally</td><td>OS family inheritance</td></tr>
<tr><td style="font-family:monospace;">;;&</td><td>Continue testing: test next pattern, run if matches</td><td>Multi-category tagging</td></tr>
<tr><td colspan="3" style="background:#0e1824;color:#58a6ff;font-family:'Segoe UI',sans-serif;font-weight:bold;">Shell Options</td></tr>
<tr><td style="font-family:monospace;">shopt -s nocasematch</td><td>Case-insensitive pattern matching</td><td><code>yes</code> matches YES Yes yEs</td></tr>
<tr><td style="font-family:monospace;">shopt -u nocasematch</td><td>Restore case-sensitive (default)</td><td>always restore after use</td></tr>
<tr><td style="font-family:monospace;">shopt -s extglob</td><td>Enable extended glob patterns</td><td>enables @() *() +() !() ?()</td></tr>
<tr><td colspan="3" style="background:#1f2027;color:#8b949e;font-family:'Segoe UI',sans-serif;font-weight:bold;">Syntax Rules</td></tr>
<tr><td style="font-family:monospace;">case WORD in</td><td>WORD is fully expanded before matching</td><td>vars, subst, arith all work</td></tr>
<tr><td style="font-family:monospace;">Do NOT quote patterns</td><td>Quoted pattern = literal string (glob disabled)</td><td><code>*.csv</code> not <code>"*.csv"</code></td></tr>
<tr><td style="font-family:monospace;">esac</td><td>Closes every case statement</td><td>mandatory</td></tr>
<tr><td style="font-family:monospace;">First match wins</td><td>Patterns tested in order; stop at first hit</td><td>specific patterns first</td></tr>
</tbody>
</table>
</div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 12 — COMMON MISTAKES
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num">12</span> Common Mistakes &amp; Gotchas</h2>

<div class="two-col-grid">
  <div class="card hard-card">
    <div class="type-badge badge-warn">❌ Quoting the glob pattern</div>
    <pre style="font-family:monospace;font-size:11px;color:#f85149;background:#0d1117;padding:8px;border-radius:4px;margin:8px 0 4px;">case "$FILE" in
    "*.csv")   # WRONG — matches only literal "*.csv"</pre>
    <p style="font-size:12px;color:#8b949e;margin:4px 0;">Quoting a pattern disables glob expansion — it becomes a literal string.</p>
    <pre style="font-family:monospace;font-size:11px;color:#3fb950;background:#0d1117;padding:8px;border-radius:4px;margin:4px 0;">case "$FILE" in
    *.csv)     # CORRECT — glob pattern unquoted</pre>
  </div>
  <div class="card hard-card">
    <div class="type-badge badge-warn">❌ General pattern before specific</div>
    <pre style="font-family:monospace;font-size:11px;color:#f85149;background:#0d1117;padding:8px;border-radius:4px;margin:8px 0 4px;">*.csv)    echo "CSV"     ;;
*.csv.gz) echo "gzipped" ;;  # NEVER reached</pre>
    <p style="font-size:12px;color:#8b949e;margin:4px 0;"><code>*.csv</code> matches <code>file.csv.gz</code> too. Put specific patterns before general ones.</p>
    <pre style="font-family:monospace;font-size:11px;color:#3fb950;background:#0d1117;padding:8px;border-radius:4px;margin:4px 0;">*.csv.gz) echo "gzipped" ;;
*.csv)    echo "CSV"     ;;</pre>
  </div>
  <div class="card hard-card">
    <div class="type-badge badge-warn">❌ Missing * catch-all</div>
    <pre style="font-family:monospace;font-size:11px;color:#f85149;background:#0d1117;padding:8px;border-radius:4px;margin:8px 0 4px;">case "$ENV" in
    dev)     ... ;;
    prod)    ... ;;
    # typo "prd" → silently does nothing!</pre>
    <p style="font-size:12px;color:#8b949e;margin:4px 0;">Without <code>*)</code>, an unmatched value is silently ignored. Always add a catch-all.</p>
    <pre style="font-family:monospace;font-size:11px;color:#3fb950;background:#0d1117;padding:8px;border-radius:4px;margin:4px 0;">*) echo "Unknown: $ENV" >&2; exit 1 ;;</pre>
  </div>
  <div class="card hard-card">
    <div class="type-badge badge-warn">❌ Forgetting to shift after case dispatch</div>
    <pre style="font-family:monospace;font-size:11px;color:#f85149;background:#0d1117;padding:8px;border-radius:4px;margin:8px 0 4px;">case "$1" in
    load) load_data "$@" ;;  # $@ includes "load"!
esac</pre>
    <p style="font-size:12px;color:#8b949e;margin:4px 0;">If you dispatch on <code>$1</code> and pass <code>$@</code> to the handler, the command name is in <code>$@</code> too.</p>
    <pre style="font-family:monospace;font-size:11px;color:#3fb950;background:#0d1117;padding:8px;border-radius:4px;margin:4px 0;">CMD="$1"; shift
case "$CMD" in
    load) load_data "$@" ;;  # ✅ $@ = args only</pre>
  </div>
  <div class="card hard-card">
    <div class="type-badge badge-warn">❌ Using regex operators in patterns</div>
    <pre style="font-family:monospace;font-size:11px;color:#f85149;background:#0d1117;padding:8px;border-radius:4px;margin:8px 0 4px;">case "$DATE" in
    ^[0-9]{4}-...)   # WRONG — ^ { } are literal in case</pre>
    <p style="font-size:12px;color:#8b949e;margin:4px 0;">case uses glob patterns, NOT regex. <code>^</code> <code>$</code> <code>+</code> <code>{n}</code> are literal characters in case.</p>
    <pre style="font-family:monospace;font-size:11px;color:#3fb950;background:#0d1117;padding:8px;border-radius:4px;margin:4px 0;">[[ $DATE =~ ^[0-9]{4}-[0-9]{2} ]] && ...
# Use [[ =~ ]] for regex, case for globs</pre>
  </div>
  <div class="card hard-card">
    <div class="type-badge badge-warn">❌ nocasematch left enabled</div>
    <pre style="font-family:monospace;font-size:11px;color:#f85149;background:#0d1117;padding:8px;border-radius:4px;margin:8px 0 4px;">shopt -s nocasematch
case "$VAR" in YES) echo "yes";; esac
# Forgot: shopt -u nocasematch
# Now ALL subsequent case statements are case-insensitive!</pre>
    <p style="font-size:12px;color:#8b949e;margin:4px 0;">Always restore <code>nocasematch</code> after use, or use a subshell to contain it.</p>
    <pre style="font-family:monospace;font-size:11px;color:#3fb950;background:#0d1117;padding:8px;border-radius:4px;margin:4px 0;">( shopt -s nocasematch
  case "$VAR" in YES) ;; esac
)  # subshell: nocasematch dies with it</pre>
  </div>
</div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 13 — EXERCISES
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num">13</span> Practice Exercises with Solutions</h2>

<div class="exercise-panel easy">
  <div class="ex-badge easy-badge">Easy</div>
  <div class="ex-body">
    <h4>Exercise 1 — Pattern Type Drill</h4>
    <p>Write a single <code>case</code> statement that handles all these inputs using different pattern types:</p>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li><strong>Exact:</strong> "start", "stop", "restart" → print the action name</li>
      <li><strong>Alternation:</strong> "yes|y|YES|Yes" → set CONFIRMED=true</li>
      <li><strong>Glob *:</strong> any file ending in <code>.csv.gz</code> → "compressed csv"</li>
      <li><strong>Glob *:</strong> any file ending in <code>.csv</code> → "plain csv" (after .csv.gz)</li>
      <li><strong>Char class:</strong> any string starting with a digit → "numeric input"</li>
      <li><strong>POSIX class:</strong> any string starting with whitespace → "leading space — strip it"</li>
      <li><strong>Empty:</strong> empty string → "nothing entered"</li>
      <li><strong>Catch-all:</strong> anything else → "unknown: $INPUT" to stderr</li>
    </ol>
    <p>Test each pattern by setting different values of <code>INPUT</code> and calling the case.</p>
  </div>
</div>

<div class="exercise-panel easy">
  <div class="ex-badge easy-badge">Easy</div>
  <div class="ex-body">
    <h4>Exercise 2 — Terminator Exploration</h4>
    <p>Demonstrate all three terminators with clear output:</p>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Write a <code>;;</code> case that shows a matched branch stops at <code>;;</code> and the rest are skipped</li>
      <li>Write a <code>;&</code> case implementing OS family detection: ubuntu → sets PKG_MGR=apt AND falls through to debian → sets FAMILY=debian</li>
      <li>Write a <code>;;&</code> case that classifies a log line into multiple categories (error, timeout, database, network) simultaneously — one line, multiple tags</li>
      <li>Demonstrate mixing all three in one <code>case</code> statement</li>
      <li>Demonstrate <code>shopt -s nocasematch</code> — show that "YES" "yes" "Yes" all match the same pattern <code>yes)</code></li>
    </ol>
  </div>
</div>

<div class="exercise-panel medium">
  <div class="ex-badge medium-badge">Medium</div>
  <div class="ex-body">
    <h4>Exercise 3 — Data File Router</h4>
    <p>Write <code>route_file.sh FILE</code> using <code>case</code> for all routing logic:</p>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Accept the filename as argument — validate it was provided</li>
      <li>Use <code>case</code> on the extension to set: PARSER, DECOMPRESS (true/false), MIME_TYPE</li>
      <li>Handle: <code>.csv</code>, <code>.csv.gz</code>, <code>.csv.bz2</code>, <code>.tsv</code>, <code>.json</code>, <code>.json.gz</code>, <code>.parquet</code>, <code>.avro</code>, <code>.xlsx</code>, <code>*</code> (unsupported)</li>
      <li>Specific before general — <code>.csv.gz</code> must not match <code>.csv</code></li>
      <li>Use <code>shopt -s nocasematch</code> so <code>.CSV</code> and <code>.csv</code> match the same branch</li>
      <li>After the case: print a summary table using <code>printf</code> showing file, parser, decompress, mime type</li>
      <li>Add a second <code>case</code> on the date prefix in the filename (if present like <code>2024-*</code>) to set PARTITION</li>
    </ol>
  </div>
</div>

<div class="exercise-panel medium">
  <div class="ex-badge medium-badge">Medium</div>
  <div class="ex-body">
    <h4>Exercise 4 — Complete CLI with Flag Parsing</h4>
    <p>Build <code>etl.sh</code> — a complete CLI tool using <code>case</code> for all argument handling:</p>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li><strong>Flag parsing:</strong> Use <code>while [[ $# -gt 0 ]]; do case "$1" in</code> to parse: <code>-e ENV</code>, <code>--env=ENV</code>, <code>-n/--dry-run</code>, <code>-v/--verbose</code>, <code>-j N/--jobs=N</code>, <code>--</code>, <code>-*</code> (unknown → error)</li>
      <li><strong>Command dispatch:</strong> After flags, use <code>case "\${1:-help}"</code> to dispatch to functions: <code>load</code>, <code>transform</code>, <code>validate</code>, <code>export</code>, <code>status</code>, <code>help</code></li>
      <li><strong>Environment case:</strong> Inside each command function, use <code>case "$ENV"</code> to set DB_HOST/PORT/SSL</li>
      <li><strong>Mixed terminators:</strong> For <code>prod</code> environment, use <code>;;&</code> to also run staging health checks</li>
      <li><strong>Error handling:</strong> Every <code>*)</code> catch-all prints the unknown value and exits with code 1</li>
    </ol>
  </div>
</div>

<div class="exercise-panel hard">
  <div class="ex-badge hard-badge">Hard</div>
  <div class="ex-body">
    <h4>Exercise 5 — Event-Driven Pipeline Controller</h4>
    <p>Build <code>controller.sh</code> — an event dispatcher using <code>case</code> as its core:</p>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li><strong>Event classifier:</strong> <code>classify_event EVENT</code> function using <code>;;&</code> to tag each event with multiple categories (severity, domain, action-needed)</li>
      <li><strong>Routing:</strong> <code>route_event EVENT TAGS</code> uses <code>case</code> on severity to decide: send_slack? call_pagerduty? write_log? retry_job?</li>
      <li><strong>Schedule dispatch:</strong> <code>case "$(date +%u)-$(date +%H)"</code> (day-hour) to dispatch to different pipeline strategies: weekday-morning (incremental), weekday-night (full), weekend (archive+report)</li>
      <li><strong>OS adaptation:</strong> <code>case "$OSTYPE"</code> to set platform-specific date, sed, stat commands</li>
      <li><strong>Interactive REPL:</strong> <code>while read CMD; do case "$CMD"</code> implementing a mini command shell with help, history, and graceful exit</li>
      <li><strong>Validation gate:</strong> Each sub-case for file type must also validate the file exists — combine <code>case</code> with <code>[[ -f ]]</code> guards inside each branch</li>
    </ol>
    <p><strong>Must pass <code>shellcheck</code>. Must handle empty input, unknown events, and Ctrl+C gracefully.</strong></p>
  </div>
</div>

<!-- Wrap-up story -->
<div class="story-panel" style="margin-top:32px;">
  <div class="story-avatar">🧑‍💻</div>
  <div class="story-body">
    <div class="story-title">Ravi's 28-Line Script — Day 290</div>
    <p>The 47-line if/elif ladder was now 28 lines. More importantly, when a new teammate needed to add a <code>dr-prod</code> environment, it took them 2 minutes. Three lines, in the obvious place. No risk of breaking any other branch.</p>
    <p>That was the thing about <code>case</code> that Ravi had missed when he thought it was just "a nicer if." Each branch is isolated. Adding a branch doesn't touch the others. The catch-all <code>*)</code> means typos fail loudly. The alternation <code>staging|staging-*</code> expresses intent clearly — you can read it in plain English.</p>
    <p>Priya had also shown him the <code>;;&</code> trick for the log classifier — one event line, tagged with four categories simultaneously, each driving a different notification path. That was a pattern he hadn't known existed in bash at all.</p>
    <p><strong>case is not just a prettier if. It is a pattern-matching dispatch engine. Learn to think in patterns, and you will write less code that does more.</strong></p>
  </div>
</div>

</div><!-- /section-block -->
\`

`
};