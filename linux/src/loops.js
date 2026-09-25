

var loops = {
    title: "Loops",
    description: "Master every loop form in Bash — for lists, C-style for, while, until, select, loop control, nested loops, and parallel execution. The engine that drives every data pipeline and batch operation.",
    content: `

<!-- ══════════════════════════════════════════════════════
     RAVI'S STORY — HOOK
══════════════════════════════════════════════════════ -->
<div class="story-panel">
  <div class="story-avatar">🧑‍💻</div>
  <div class="story-body">
    <div class="story-title">Ravi's Midnight Run — Day 190</div>
    <br>
    <p>Ravi's manager dropped 847 CSV files on the server at 11 PM and asked for them all transformed and loaded by morning. Ravi looked at the folder. One script could do one file. He needed to do all 847.</p>
    <br>
    <p>His first instinct was to write 847 lines. His second instinct was to run the script manually 847 times. Priya, still at her desk, watched him stare at the terminal.</p>
    <br>
    <p>"One loop," she said. "Three lines." She typed: <code>for f in /data/incoming/*.csv; do python3 transform.py "$f"; done</code>. All 847 files, in sequence. Then she added <code>&amp;</code> after the command and <code>wait</code> at the end. All 847 files, in parallel, 8 at a time.</p>
    <
    <p>By midnight everything was loaded. Ravi had watched the loop run and understood something fundamental: <strong>a loop is not just a shortcut — it is the only sane way to process data at scale.</strong></p>
  </div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 1 — LOOP ANATOMY & FORMS
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Loop Anatomy — The Four Forms</h2>

<p>Bash has four loop constructs. Each tests a condition in a different way and serves a different use case. Understanding when to reach for each one is the first skill.</p>

<div class="diagram-wrap">
<svg viewBox="0 0 820 220" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <defs>
    <marker id="arr-g" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#3fb950"/></marker>
    <marker id="arr-b" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#58a6ff"/></marker>
    <marker id="arr-y" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#ffa657"/></marker>
    <marker id="arr-p" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#bc8cff"/></marker>
  </defs>
  <rect width="820" height="220" fill="#0d1117" rx="12"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="13" font-weight="bold" fill="#8b949e">Four Loop Forms — Choose by Use Case</text>

  <!-- for list -->
  <rect x="12" y="36" width="192" height="172" rx="8" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="108" y="58" text-anchor="middle" font-family="'Courier New',monospace" font-size="14" font-weight="bold" fill="#3fb950">for … in</text>
  <text x="108" y="76" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Iterate over a list</text>
  <line x1="22" y1="82" x2="196" y2="82" stroke="#30363d" stroke-width="1"/>
  <text x="22" y="100" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">for f in *.csv</text>
  <text x="22" y="116" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">for n in 1 2 3</text>
  <text x="22" y="132" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">for s in "\${ARR[@]}"</text>
  <text x="108" y="158" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">Use: files, arrays,</text>
  <text x="108" y="170" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">words, cmd output</text>
  <text x="108" y="198" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">most common loop</text>

  <!-- C-style for -->
  <rect x="214" y="36" width="192" height="172" rx="8" fill="#0e1824" stroke="#58a6ff" stroke-width="2"/>
  <text x="310" y="58" text-anchor="middle" font-family="'Courier New',monospace" font-size="14" font-weight="bold" fill="#58a6ff">for (( ))</text>
  <text x="310" y="76" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">C-style counter</text>
  <line x1="224" y1="82" x2="398" y2="82" stroke="#30363d" stroke-width="1"/>
  <text x="224" y="100" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">for (( i=0; i&lt;n; i++ ))</text>
  <text x="224" y="116" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">for (( i=10; i&gt;0; i-- ))</text>
  <text x="224" y="132" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">for (( i=0; i&lt;n; i+=2 ))</text>
  <text x="310" y="158" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#58a6ff">Use: numeric ranges,</text>
  <text x="310" y="170" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#58a6ff">index access, step</text>
  <text x="310" y="198" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">like C/Java for loop</text>

  <!-- while -->
  <rect x="416" y="36" width="192" height="172" rx="8" fill="#2a2a1a" stroke="#ffa657" stroke-width="2"/>
  <text x="512" y="58" text-anchor="middle" font-family="'Courier New',monospace" font-size="14" font-weight="bold" fill="#ffa657">while</text>
  <text x="512" y="76" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Loop while condition true</text>
  <line x1="426" y1="82" x2="600" y2="82" stroke="#30363d" stroke-width="1"/>
  <text x="426" y="100" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">while [[ condition ]]</text>
  <text x="426" y="116" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">while read -r line</text>
  <text x="426" y="132" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">while true; do ... done</text>
  <text x="512" y="158" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">Use: reading files,</text>
  <text x="512" y="170" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">polling, unknown count</text>
  <text x="512" y="198" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">test BEFORE each iter</text>

  <!-- until -->
  <rect x="618" y="36" width="190" height="172" rx="8" fill="#1a1a3a" stroke="#bc8cff" stroke-width="2"/>
  <text x="713" y="58" text-anchor="middle" font-family="'Courier New',monospace" font-size="14" font-weight="bold" fill="#bc8cff">until</text>
  <text x="713" y="76" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Loop until condition true</text>
  <line x1="628" y1="82" x2="800" y2="82" stroke="#30363d" stroke-width="1"/>
  <text x="628" y="100" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">until [[ condition ]]</text>
  <text x="628" y="116" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">until ping -c1 host</text>
  <text x="628" y="132" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">until (( COUNT == 0 ))</text>
  <text x="713" y="158" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#bc8cff">Use: wait-for patterns,</text>
  <text x="713" y="170" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#bc8cff">retry, polling ready</text>
  <text x="713" y="198" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">inverse of while</text>
</svg>
<p class="diagram-caption">Pick <code>for…in</code> for known lists, <code>for(( ))</code> for numeric counters, <code>while</code> for condition-driven loops, <code>until</code> for wait-until-ready patterns. <code>select</code> (section 7) is a special menu loop.</p>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Loop Syntax — Every Form at a Glance</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ─── for … in ─────────────────────────────────────────────</span>
for ITEM in LIST; do
    commands
done

<span class="cb-cmt">## ─── C-style for ───────────────────────────────────────────</span>
for (( INIT; CONDITION; INCREMENT )); do
    commands
done

<span class="cb-cmt">## ─── while ─────────────────────────────────────────────────</span>
while CONDITION; do
    commands
done

<span class="cb-cmt">## ─── until ─────────────────────────────────────────────────</span>
until CONDITION; do
    commands
done

<span class="cb-cmt">## ─── select (interactive menu) ─────────────────────────────</span>
select ITEM in LIST; do
    commands
done

<span class="cb-cmt"># ALL loops can be written on one line (semicolons instead of newlines):
for f in *.csv; do echo "$f"; done
while [[ -f lock ]]; do sleep 1; done

# Closing 'done' is like 'fi' for if — required
# 'do' must follow condition (same line with ; or next line)</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 2 — for … in: LIST LOOPS
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> <code>for … in</code> — Iterating Over Lists</h2>

<p>The most-used loop in shell scripting. The list can be literal words, a glob, an array expansion, a command substitution, or a brace expansion — Bash handles them all the same way after word splitting.</p>

<!-- CONSOLE 1 -->
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 1 of 8 — for…in: Literals, Globs, Arrays, Brace, Command Output</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ LITERAL LIST ════════════════════════════════════════════</span>
for ENV in dev staging prod; do
    echo "Deploying to: $ENV"
done
<span class="cb-out">Deploying to: dev</span>
<span class="cb-out">Deploying to: staging</span>
<span class="cb-out">Deploying to: prod</span>

<span class="cb-cmt">## ═══ GLOB EXPANSION ══════════════════════════════════════════</span>
<span class="cb-cmt"># Shell expands globs BEFORE the loop starts</span>
for FILE in /data/incoming/*.csv; do
    echo "Processing: $(basename "$FILE")"
    python3 transform.py "$FILE"
done

<span class="cb-cmt"># Handle the case where glob matches nothing:</span>
shopt -s nullglob              <span class="cb-cmt"># glob returns empty if no match</span>
for FILE in /data/*.csv; do
    echo "$FILE"
done
shopt -u nullglob              <span class="cb-cmt"># restore</span>

<span class="cb-cmt"># Or check explicitly:</span>
FILES=( /data/*.csv )
if (( \${#FILES[@]} == 0 )); then
    echo "No CSV files found" >&2; exit 1
fi
for FILE in "\${FILES[@]}"; do echo "$FILE"; done

<span class="cb-cmt">## ═══ BRACE EXPANSION ════════════════════════════════════════</span>
for N in {1..10}; do
    echo "Chunk $N"
done

for N in {0..100..10}; do      <span class="cb-cmt"># 0 10 20 30 ... 100 (step 10)</span>
    echo "Offset: $N"
done

for LETTER in {a..z}; do
    mkdir -p /data/partition_$LETTER
done

<span class="cb-cmt"># Brace expansion with variables — NOTE: {1..$N} does NOT work!</span>
N=5
for i in $(seq 1 $N); do      <span class="cb-cmt"># seq for variable-based ranges</span>
    echo "Item $i"
done
for (( i=1; i<=N; i++ )); do  <span class="cb-cmt"># C-style is cleaner for this</span>
    echo "Item $i"
done

<span class="cb-cmt">## ═══ ARRAY ITERATION ════════════════════════════════════════</span>
SERVERS=("web-01" "web-02" "db-01" "cache-01")

<span class="cb-cmt"># Values only:</span>
for SERVER in "\${SERVERS[@]}"; do
    ping -c1 "$SERVER" &>/dev/null && echo "$SERVER: UP" || echo "$SERVER: DOWN"
done

<span class="cb-cmt"># Index and value:</span>
for I in "\${!SERVERS[@]}"; do
    echo "[$I] \${SERVERS[$I]}"
done
<span class="cb-out">[0] web-01</span>
<span class="cb-out">[1] web-02</span>
<span class="cb-out">[2] db-01</span>
<span class="cb-out">[3] cache-01</span>

<span class="cb-cmt">## ═══ COMMAND SUBSTITUTION AS LIST ════════════════════════════</span>
<span class="cb-cmt"># Loop over command output — words (split on whitespace):</span>
for USER in $(cut -d: -f1 /etc/passwd); do
    echo "User: $USER"
done

<span class="cb-cmt"># DANGER: word splitting breaks on spaces in filenames!
# This is WRONG for filenames with spaces:</span>
for FILE in $(ls /data/*.csv); do   <span class="cb-cmt"># ❌ breaks on spaces</span>
    process "$FILE"
done
<span class="cb-cmt"># Use glob instead:</span>
for FILE in /data/*.csv; do         <span class="cb-cmt"># ✅ safe</span>
    process "$FILE"
done

<span class="cb-cmt">## ═══ LOOP OVER LINES OF COMMAND OUTPUT ═══════════════════════</span>
<span class="cb-cmt"># Use while+read for line-by-line (preserves spaces):</span>
while IFS= read -r line; do
    echo "Line: $line"
done < <(find /data -name "*.csv" -newer checkpoint.txt)
<span class="cb-cmt"># < <(cmd) = process substitution — no subshell scope issue</span>

<span class="cb-cmt">## ═══ ASSOCIATIVE ARRAY ITERATION ═════════════════════════════</span>
declare -A CONFIG=([host]="prod-db" [port]="5432" [db]="analytics")

for KEY in "\${!CONFIG[@]}"; do
    printf "%-10s = %s\n" "$KEY" "\${CONFIG[$KEY]}"
done
<span class="cb-out">host       = prod-db</span>
<span class="cb-out">port       = 5432</span>
<span class="cb-out">db         = analytics</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 3 — C-STYLE FOR (( ))
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> C-Style <code>for (( ))</code> — Numeric Counter Loops</h2>

<p>When you need a numeric counter with precise control over start, end, and step, the C-style <code>for</code> is cleaner than <code>seq</code> and more flexible than brace expansion.</p>

<div class="diagram-wrap">
<svg viewBox="0 0 820 140" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="140" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">C-Style for (( )) — Three Parts</text>

  <!-- Three boxes -->
  <rect x="15" y="36" width="240" height="90" rx="8" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="135" y="58" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#3fb950">① INIT</text>
  <text x="135" y="76" text-anchor="middle" font-family="'Courier New',monospace" font-size="13" fill="#e6edf3">i=0</text>
  <text x="135" y="96" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Run once at start</text>
  <text x="135" y="114" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">No $ needed inside (( ))</text>

  <rect x="290" y="36" width="240" height="90" rx="8" fill="#0e1824" stroke="#58a6ff" stroke-width="2"/>
  <text x="410" y="58" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#58a6ff">② CONDITION</text>
  <text x="410" y="76" text-anchor="middle" font-family="'Courier New',monospace" font-size="13" fill="#e6edf3">i &lt; 10</text>
  <text x="410" y="96" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Checked BEFORE each iteration</text>
  <text x="410" y="114" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#58a6ff">False → loop ends</text>

  <rect x="565" y="36" width="240" height="90" rx="8" fill="#2a2a1a" stroke="#ffa657" stroke-width="2"/>
  <text x="685" y="58" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#ffa657">③ INCREMENT</text>
  <text x="685" y="76" text-anchor="middle" font-family="'Courier New',monospace" font-size="13" fill="#e6edf3">i++</text>
  <text x="685" y="96" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Run AFTER each iteration</text>
  <text x="685" y="114" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">Any arithmetic expression</text>
</svg>
</div>

<!-- CONSOLE 2 -->
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 2 of 8 — C-Style for: Counters, Steps, Index Access, Patterns</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ BASIC COUNTER ═══════════════════════════════════════════</span>
for (( i=1; i<=10; i++ )); do
    printf "Step %2d: processing\n" $i
done

<span class="cb-cmt">## ═══ COUNTDOWN ═══════════════════════════════════════════════</span>
for (( i=10; i>0; i-- )); do
    echo "T-minus $i..."
done
echo "Launch!"

<span class="cb-cmt">## ═══ STEP SIZE ════════════════════════════════════════════════</span>
for (( i=0; i<=100; i+=10 )); do
    echo "Progress: \${i}%"
done

for (( i=0; i<1000; i+=100 )); do
    python3 process.py --offset $i --limit 100
done

<span class="cb-cmt">## ═══ ARRAY INDEX ACCESS ══════════════════════════════════════</span>
FILES=("a.csv" "b.csv" "c.csv" "d.csv")
for (( i=0; i<\${#FILES[@]}; i++ )); do
    echo "File $i: \${FILES[$i]}"
done

<span class="cb-cmt"># Process pairs of array elements:</span>
PAIRS=("src1" "dst1" "src2" "dst2" "src3" "dst3")
for (( i=0; i<\${#PAIRS[@]}; i+=2 )); do
    cp "\${PAIRS[$i]}" "\${PAIRS[$i+1]}"
    echo "Copied \${PAIRS[$i]} → \${PAIRS[$i+1]}"
done

<span class="cb-cmt">## ═══ MULTIPLE VARIABLES ══════════════════════════════════════</span>
for (( i=0, j=10; i<10; i++, j-- )); do
    printf "i=%d  j=%d\n" $i $j
done
<span class="cb-out">i=0  j=10</span>
<span class="cb-out">i=1  j=9</span>
<span class="cb-out">...</span>

<span class="cb-cmt">## ═══ CHUNK PROCESSING ════════════════════════════════════════</span>
<span class="cb-cmt"># Split a large job into chunks of 1000 rows</span>
TOTAL_ROWS=50000
CHUNK_SIZE=1000
for (( OFFSET=0; OFFSET<TOTAL_ROWS; OFFSET+=CHUNK_SIZE )); do
    echo "Processing rows $OFFSET-$((OFFSET+CHUNK_SIZE-1))"
    python3 loader.py --offset $OFFSET --limit $CHUNK_SIZE
done

<span class="cb-cmt">## ═══ INFINITE LOOP ════════════════════════════════════════════</span>
for (( ; ; )); do              <span class="cb-cmt"># all three parts empty = infinite</span>
    echo "tick"
    sleep 1
done

<span class="cb-cmt">## ═══ RETRY COUNTER ═══════════════════════════════════════════</span>
MAX=3
for (( attempt=1; attempt<=MAX; attempt++ )); do
    echo "Attempt $attempt/$MAX..."
    python3 fragile_loader.py && break    <span class="cb-cmt"># success → stop</span>
    (( attempt < MAX )) && sleep $((attempt * 2))
done
if (( attempt > MAX )); then
    echo "All $MAX attempts failed" >&2; exit 1
fi
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 4 — while LOOP
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> <code>while</code> — Condition-Driven Loops</h2>

<p><code>while</code> runs as long as a condition stays true. It is the natural choice for reading files line by line, polling a system state, and any situation where you don't know upfront how many iterations you need.</p>

<div class="diagram-wrap">
<svg viewBox="0 0 820 160" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="160" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">while vs until — Condition Checked BEFORE Each Iteration</text>

  <!-- while flow -->
  <rect x="20" y="36" width="370" height="112" rx="8" fill="#161b22" stroke="#ffa657" stroke-width="2"/>
  <text x="205" y="56" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#ffa657">while CONDITION; do ... done</text>
  <text x="205" y="76" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" fill="#8b949e">Check condition → true?  → run body → repeat</text>
  <text x="205" y="96" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" fill="#8b949e">Check condition → false? → exit loop</text>
  <text x="205" y="116" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#ffa657">while [[ -f lockfile ]]; do sleep 1; done</text>
  <text x="205" y="136" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">runs 0 or more times (may not run at all if condition starts false)</text>

  <!-- until flow -->
  <rect x="430" y="36" width="370" height="112" rx="8" fill="#161b22" stroke="#bc8cff" stroke-width="2"/>
  <text x="615" y="56" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#bc8cff">until CONDITION; do ... done</text>
  <text x="615" y="76" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" fill="#8b949e">Check condition → false? → run body → repeat</text>
  <text x="615" y="96" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" fill="#8b949e">Check condition → true?  → exit loop</text>
  <text x="615" y="116" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#bc8cff">until ping -c1 server; do sleep 5; done</text>
  <text x="615" y="136" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">exact inverse of while — use for wait-until-ready patterns</text>
</svg>
</div>

<!-- CONSOLE 3 -->
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 3 of 8 — while: File Reading, Polling, Counter, Infinite Loop</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ THE CANONICAL FILE-READING LOOP ════════════════════════</span>
<span class="cb-cmt"># IFS=  → preserve leading/trailing whitespace
# -r    → backslash not treated as escape</span>
while IFS= read -r line; do
    echo "[$line]"
done < data.csv

<span class="cb-cmt"># Count lines while reading (no subshell — variables persist):</span>
COUNT=0
while IFS= read -r line; do
    ((COUNT++))
    [[ $line == *ERROR* ]] && echo "Error at line $COUNT: $line"
done < app.log
echo "Total lines: $COUNT"

<span class="cb-cmt"># Read CSV fields per line:</span>
while IFS=',' read -r DATE SALES REGION; do
    [[ $DATE == "date" ]] && continue      <span class="cb-cmt"># skip header</span>
    echo "$DATE: $$SALES in $REGION"
done < sales.csv

<span class="cb-cmt">## ═══ while WITH COUNTER ══════════════════════════════════════</span>
COUNT=1
while (( COUNT <= 5 )); do
    echo "Iteration $COUNT"
    ((COUNT++))
done

<span class="cb-cmt">## ═══ POLLING / WAIT-FOR PATTERN ══════════════════════════════</span>
<span class="cb-cmt"># Wait for a file to appear (polling every 2 seconds):</span>
while [[ ! -f /data/trigger.flag ]]; do
    echo "Waiting for trigger file..."
    sleep 2
done
echo "Trigger found — starting pipeline"

<span class="cb-cmt"># Wait for DB to become ready (max 60 seconds):</span>
TIMEOUT=60
ELAPSED=0
while ! psql -d analytics -c "SELECT 1" &>/dev/null; do
    if (( ELAPSED >= TIMEOUT )); then
        echo "ERROR: DB not ready after \${TIMEOUT}s" >&2; exit 1
    fi
    echo "DB not ready, waiting... (\${ELAPSED}s)"
    sleep 5; ((ELAPSED+=5))
done
echo "DB ready!"

<span class="cb-cmt">## ═══ INFINITE LOOP WITH CONTROLLED EXIT ══════════════════════</span>
while true; do
    JOB=$(dequeue_job)
    [[ -z $JOB ]] && { echo "Queue empty"; break; }
    process_job "$JOB"
done

<span class="cb-cmt">## ═══ while WITH MULTIPLE CONDITIONS ══════════════════════════</span>
RETRIES=0
MAX_RETRIES=3
while [[ $RETRIES -lt $MAX_RETRIES ]] && ! python3 loader.py; do
    ((RETRIES++))
    echo "Retry $RETRIES/$MAX_RETRIES in $((RETRIES * 5))s..."
    sleep $((RETRIES * 5))
done

<span class="cb-cmt">## ═══ while READ FROM COMMAND ══════════════════════════════════</span>
<span class="cb-cmt"># Read from a command via process substitution (preserves scope):</span>
TOTAL=0
while IFS=',' read -r date sales region; do
    [[ $date == "date" ]] && continue
    (( TOTAL += sales ))
done < <(grep "Mumbai" sales.csv)
echo "Mumbai total: $TOTAL"
<span class="cb-cmt"># Using < <(cmd) keeps the while in the current shell (no subshell)
# Variables set inside ARE accessible after the loop</span>

<span class="cb-cmt">## ═══ READING MULTIPLE FILES IN SEQUENCE ══════════════════════</span>
while IFS= read -r file; do
    while IFS=',' read -r date sales region; do
        echo "$file: $date $sales"
    done < "$file"
done < file_list.txt
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 5 — until LOOP
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> <code>until</code> — Wait-Until-True Loops</h2>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 4 of 8 — until: Wait-for Patterns, Timeout, Service Readiness</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ BASIC until ════════════════════════════════════════════</span>
<span class="cb-cmt"># until = while NOT — runs while condition is FALSE</span>
COUNT=0
until (( COUNT >= 5 )); do
    echo "Count: $COUNT"
    ((COUNT++))
done
<span class="cb-cmt"># Identical to: while (( COUNT < 5 )); do ...</span>

<span class="cb-cmt">## ═══ WAIT FOR NETWORK SERVICE ════════════════════════════════</span>
until nc -z prod-db.internal 5432; do
    echo "Waiting for PostgreSQL..."
    sleep 3
done
echo "PostgreSQL is accepting connections"

<span class="cb-cmt"># Wait for HTTP service:</span>
until curl -sf http://api.internal/health; do
    echo "API not ready..."
    sleep 2
done

<span class="cb-cmt"># Wait for Kafka:</span>
until kafka-topics.sh --bootstrap-server kafka:9092 --list &>/dev/null; do
    echo "Waiting for Kafka..."; sleep 5
done

<span class="cb-cmt">## ═══ UNTIL WITH TIMEOUT ══════════════════════════════════════</span>
wait_for_service() {
    local HOST="$1" PORT="$2" TIMEOUT="\${3:-60}"
    local ELAPSED=0
    until nc -z "$HOST" "$PORT" 2>/dev/null; do
        if (( ELAPSED >= TIMEOUT )); then
            echo "ERROR: $HOST:$PORT not ready after \${TIMEOUT}s" >&2
            return 1
        fi
        printf "Waiting for %s:%s... (%ds)\n" "$HOST" "$PORT" "$ELAPSED"
        sleep 5; (( ELAPSED += 5 ))
    done
    echo "$HOST:$PORT is ready (after \${ELAPSED}s)"
}

wait_for_service prod-db.internal 5432 120 || exit 1
wait_for_service kafka.internal 9092 60 || exit 1
wait_for_service redis.internal 6379 30 || exit 1

<span class="cb-cmt">## ═══ UNTIL FILE IS STABLE (written completely) ════════════════</span>
wait_for_stable_file() {
    local FILE="$1"
    local PREV_SIZE=-1
    until [[ -f $FILE ]]; do sleep 1; done     <span class="cb-cmt"># wait for file to appear</span>
    until (( $(stat -c %s "$FILE") == PREV_SIZE )); do
        PREV_SIZE=$(stat -c %s "$FILE")
        sleep 2                                <span class="cb-cmt"># wait until size stops changing</span>
    done
    echo "File stable: $FILE (\${PREV_SIZE} bytes)"
}

<span class="cb-cmt">## ═══ UNTIL LOCK IS RELEASED ══════════════════════════════════</span>
LOCKFILE="/var/lock/pipeline.lock"
until ( set -o noclobber; echo $$ > "$LOCKFILE" ) 2>/dev/null; do
    echo "Pipeline already running (PID $(cat "$LOCKFILE")), waiting..."
    sleep 10
done
trap 'rm -f "$LOCKFILE"' EXIT
echo "Lock acquired — running pipeline"
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 6 — LOOP CONTROL: break/continue
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Loop Control — <code>break</code>, <code>continue</code> &amp; <code>break N</code></h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 160" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="160" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">break vs continue — Flow Control Inside Loops</text>

  <!-- Loop box -->
  <rect x="160" y="36" width="500" height="112" rx="8" fill="#161b22" stroke="#30363d" stroke-width="1.5"/>
  <text x="410" y="56" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#8b949e">for FILE in *.csv; do</text>

  <!-- continue arrow -->
  <rect x="200" y="68" width="180" height="30" rx="5" fill="#2a2a1a" stroke="#ffa657" stroke-width="1.5"/>
  <text x="290" y="88" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#ffa657">continue</text>
  <path d="M 290 68 Q 290 44 410 44" stroke="#ffa657" stroke-width="1.5" fill="none" stroke-dasharray="4,3" marker-end="url(#arr-y)"/>
  <text x="340" y="42" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">skip rest, next iteration</text>

  <!-- break arrow -->
  <rect x="440" y="68" width="180" height="30" rx="5" fill="#2a1a1a" stroke="#f85149" stroke-width="1.5"/>
  <text x="530" y="88" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#f85149">break</text>
  <line x1="530" y1="98" x2="530" y2="150" stroke="#f85149" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#arr-r)"/>
  <text x="580" y="120" font-family="'Segoe UI',sans-serif" font-size="9" fill="#f85149">exit loop entirely</text>

  <text x="410" y="138" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" fill="#8b949e">  process "$FILE"  ← rest of body</text>
  <text x="410" y="152" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" fill="#8b949e">done</text>
</svg>
</div>

<!-- CONSOLE 5 -->
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 5 of 8 — break, continue, break N for nested loops</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ continue — SKIP THIS ITERATION ═════════════════════════</span>
for FILE in /data/*.csv; do
    [[ ! -s $FILE ]] && { echo "Skipping empty: $FILE"; continue; }
    [[ $FILE == *_backup* ]] && continue       <span class="cb-cmt"># skip backups</span>
    python3 transform.py "$FILE"
done

<span class="cb-cmt">## ═══ break — EXIT THE LOOP ════════════════════════════════════</span>
FOUND=""
for FILE in /data/incoming/*.csv; do
    if grep -q "CRITICAL" "$FILE"; then
        FOUND="$FILE"
        break                                  <span class="cb-cmt"># stop at first match</span>
    fi
done
[[ -n $FOUND ]] && echo "Critical file: $FOUND"

<span class="cb-cmt"># break with while — exit when done:</span>
while true; do
    read -r -p "Enter command (q to quit): " CMD
    [[ $CMD == "q" ]] && break
    execute_command "$CMD"
done

<span class="cb-cmt">## ═══ break N / continue N — NESTED LOOPS ════════════════════</span>
<span class="cb-cmt"># N = number of loop levels to break/continue</span>

<span class="cb-cmt"># break 2: exit BOTH loops from inside inner loop:</span>
FOUND=false
for DIR in /data/*/; do
    for FILE in "$DIR"*.csv; do
        [[ ! -f $FILE ]] && continue
        if grep -q "ALERT" "$FILE"; then
            echo "Alert in: $FILE"
            FOUND=true
            break 2                            <span class="cb-cmt"># exit both for loops</span>
        fi
    done
done
$FOUND && echo "Alert found — stopping search"

<span class="cb-cmt"># continue 2: skip to next iteration of OUTER loop:</span>
for DATE in 2024-01 2024-02 2024-03; do
    for REGION in north south east west; do
        FILE="/data/\${DATE}_\${REGION}.csv"
        [[ ! -f $FILE ]] && { echo "Missing: $FILE"; continue 2; }
        process "$FILE"
    done
    echo "All regions done for $DATE"
done

<span class="cb-cmt">## ═══ LOOP EXIT CODE ══════════════════════════════════════════</span>
<span class="cb-cmt"># A loop's exit code = exit code of last command in body
# break makes exit code 0
# An empty loop body also exits 0</span>
for i in 1 2 3; do false; done
echo "Loop exit: $?"
<span class="cb-out">1</span>                                              <span class="cb-cmt"># last cmd was false</span>

for i in 1 2 3; do true; done
echo "Loop exit: $?"
<span class="cb-out">0</span>                                              <span class="cb-cmt"># last cmd was true</span>

<span class="cb-cmt">## ═══ continue VS if/else ══════════════════════════════════════</span>
<span class="cb-cmt"># These are equivalent, but continue is cleaner (guard clause):</span>

<span class="cb-cmt"># With nested if — hard to read:</span>
for FILE in *.csv; do
    if [[ -s $FILE ]]; then
        if [[ $FILE != *backup* ]]; then
            process "$FILE"
        fi
    fi
done

<span class="cb-cmt"># With continue — guard clause style:</span>
for FILE in *.csv; do
    [[ ! -s $FILE  ]] && continue
    [[ $FILE == *backup* ]] && continue
    process "$FILE"                            <span class="cb-cmt"># only valid files reach here</span>
done
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 7 — select: INTERACTIVE MENU
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> <code>select</code> — Interactive Menu Loops</h2>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 6 of 8 — select: Menus, PS3, Validation, Nested Menus</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ BASIC select ════════════════════════════════════════════</span>
<span class="cb-cmt"># select displays a numbered menu, waits for input
# The chosen item is stored in the variable
# REPLY holds the raw number typed</span>

PS3="Choose environment: "              <span class="cb-cmt"># custom prompt</span>
select ENV in dev staging prod quit; do
    case $ENV in
        dev|staging|prod)
            echo "Deploying to: $ENV"
            break
            ;;
        quit)
            echo "Cancelled"; break
            ;;
        *)
            echo "Invalid: $REPLY — choose 1-4"
            ;;
    esac
done
<span class="cb-out">1) dev</span>
<span class="cb-out">2) staging</span>
<span class="cb-out">3) prod</span>
<span class="cb-out">4) quit</span>
<span class="cb-out">Choose environment: 2</span>
<span class="cb-out">Deploying to: staging</span>

<span class="cb-cmt">## ═══ select FROM ARRAY ════════════════════════════════════════</span>
DATABASES=("analytics" "reporting" "staging" "test")
PS3="Select database: "
select DB in "\${DATABASES[@]}" "Cancel"; do
    if [[ $DB == "Cancel" ]]; then
        echo "Cancelled"; break
    elif [[ -n $DB ]]; then
        echo "Connecting to: $DB"
        psql -d "$DB"
        break
    else
        echo "Please enter a number 1-$((\${#DATABASES[@]}+1))"
    fi
done

<span class="cb-cmt">## ═══ select FROM DYNAMIC LIST ════════════════════════════════</span>
PS3="Select file to process: "
select FILE in /data/incoming/*.csv "All files" "Cancel"; do
    case "$FILE" in
        "All files")
            for f in /data/incoming/*.csv; do python3 process.py "$f"; done
            break ;;
        "Cancel")
            break ;;
        *)
            [[ -n $FILE ]] && python3 process.py "$FILE" && break
            echo "Invalid choice"
            ;;
    esac
done

<span class="cb-cmt">## ═══ NESTED select MENU ══════════════════════════════════════</span>
PS3="Main menu: "
select ACTION in "Load data" "Transform" "Export" "Quit"; do
    case $ACTION in
        "Load data")
            PS3="Load from: "
            select SOURCE in "CSV" "JSON" "Parquet" "Back"; do
                [[ $SOURCE == "Back" ]] && break
                [[ -n $SOURCE ]] && { load_data "$SOURCE"; break; }
            done
            PS3="Main menu: "
            ;;
        "Quit")
            break ;;
        *)
            [[ -n $ACTION ]] && run_action "$ACTION"
            ;;
    esac
done
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 8 — NESTED LOOPS & SCOPE
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Nested Loops &amp; Variable Scope</h2>

<!-- CONSOLE 7 -->
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 7 of 8 — Nested Loops, Scope, Pipeline Scope Bug &amp; Fix</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ NESTED for LOOPS ═══════════════════════════════════════</span>
<span class="cb-cmt"># Matrix iteration:</span>
for ROW in {1..3}; do
    for COL in {1..3}; do
        printf "(%d,%d) " $ROW $COL
    done
    echo ""
done
<span class="cb-out">(1,1) (1,2) (1,3)</span>
<span class="cb-out">(2,1) (2,2) (2,3)</span>
<span class="cb-out">(3,1) (3,2) (3,3)</span>

<span class="cb-cmt"># Date × Region cross product:</span>
for YEAR in 2022 2023 2024; do
    for REGION in north south east west; do
        FILE="/data/\${YEAR}_\${REGION}.csv"
        [[ -f $FILE ]] && python3 process.py "$FILE"
    done
done

<span class="cb-cmt">## ═══ OUTER LOOP VARIABLE VISIBLE IN INNER ════════════════════</span>
TOTAL=0
for MONTH in {1..12}; do
    MONTH_TOTAL=0
    for DAY in {1..28}; do
        VALUE=$(get_daily_value $YEAR $MONTH $DAY)
        (( MONTH_TOTAL += VALUE ))
    done
    (( TOTAL += MONTH_TOTAL ))
    printf "Month %02d: %d  (running: %d)\n" $MONTH $MONTH_TOTAL $TOTAL
done
<span class="cb-cmt"># Inner loop can read/modify outer loop's variables</span>

<span class="cb-cmt">## ═══ THE PIPE SCOPE TRAP ═════════════════════════════════════</span>
<span class="cb-cmt"># Piping into a loop creates a SUBSHELL — variables lost!</span>
TOTAL=0
cat sales.csv | while IFS=',' read -r date sales region; do
    (( TOTAL += sales ))
done
echo "Total: $TOTAL"
<span class="cb-out">Total: 0</span>              <span class="cb-cmt"># ← WRONG! TOTAL modified in subshell</span>

<span class="cb-cmt"># Fix 1: redirect instead of pipe (no subshell)</span>
TOTAL=0
while IFS=',' read -r date sales region; do
    (( TOTAL += sales ))
done < sales.csv
echo "Total: $TOTAL"
<span class="cb-out">Total: 847293</span>        <span class="cb-cmt"># ✅ correct</span>

<span class="cb-cmt"># Fix 2: process substitution (no subshell)</span>
TOTAL=0
while IFS=',' read -r date sales region; do
    (( TOTAL += sales ))
done < <(grep "Mumbai" sales.csv)
echo "Mumbai total: $TOTAL"

<span class="cb-cmt"># Fix 3: shopt -s lastpipe (bash 4.2+)</span>
shopt -s lastpipe
TOTAL=0
cat sales.csv | while IFS=',' read -r date sales region; do
    (( TOTAL += sales ))
done
echo "Total: $TOTAL"   <span class="cb-cmt"># works with lastpipe</span>

<span class="cb-cmt">## ═══ LOOP INSIDE A FUNCTION ══════════════════════════════════</span>
sum_column() {
    local FILE="$1" COL="\${2:-2}"
    local TOTAL=0
    local LINE
    while IFS=',' read -r -a FIELDS; do
        [[ \${FIELDS[0]} == "date" ]] && continue    <span class="cb-cmt"># skip header</span>
        (( TOTAL += \${FIELDS[$((COL-1))]} ))
    done < "$FILE"
    echo $TOTAL
}

SALES_TOTAL=$(sum_column sales.csv 2)
echo "Sales total: $SALES_TOTAL"
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 9 — PARALLEL LOOPS
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Parallel Loops — Background Jobs &amp; <code>wait</code></h2>

<p>Running loop iterations in parallel is how you scale a shell script from processing one file at a time to saturating all CPU cores. The pattern is: launch background jobs with <code>&amp;</code>, throttle with a job pool, collect results with <code>wait</code>.</p>

<div class="diagram-wrap">
<svg viewBox="0 0 820 180" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="180" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">Parallel Loop — Job Pool Pattern (max N concurrent)</text>

  <!-- Sequential vs parallel -->
  <rect x="15" y="36" width="370" height="130" rx="8" fill="#2a1a1a" stroke="#f85149" stroke-width="1.5"/>
  <text x="200" y="56" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#f85149">Sequential (one at a time)</text>
  <text x="30" y="78" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">file1 ████████</text>
  <text x="30" y="96" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">file2         ████████</text>
  <text x="30" y="114" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">file3                 ████████</text>
  <text x="30" y="132" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">file4                         ████████</text>
  <text x="200" y="156" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#f85149">Total time = sum of all file times</text>

  <rect x="435" y="36" width="370" height="130" rx="8" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="620" y="56" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#3fb950">Parallel (max 4 concurrent)</text>
  <text x="450" y="78" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">file1 ████████</text>
  <text x="450" y="96" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">file2 ██████</text>
  <text x="450" y="114" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">file3 █████████</text>
  <text x="450" y="132" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">file4 ████</text>
  <text x="620" y="156" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">Total time = longest single file time</text>
</svg>
</div>

<!-- CONSOLE 8 -->
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 8 of 8 — Parallel: &amp;, wait, job pool, xargs -P, GNU parallel</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ BASIC BACKGROUND JOBS ═══════════════════════════════════</span>
<span class="cb-cmt"># & launches each iteration as a background process</span>
for FILE in /data/*.csv; do
    python3 transform.py "$FILE" &     <span class="cb-cmt"># launch in background</span>
done
wait                                   <span class="cb-cmt"># wait for ALL to finish</span>
echo "All files processed"

<span class="cb-cmt">## ═══ CAPTURE EXIT CODES FROM PARALLEL JOBS ════════════════════</span>
PIDS=()
for FILE in /data/*.csv; do
    python3 transform.py "$FILE" &
    PIDS+=($!)                         <span class="cb-cmt"># $! = PID of last background job</span>
done

FAILED=0
for PID in "\${PIDS[@]}"; do
    wait $PID || ((FAILED++))          <span class="cb-cmt"># wait for specific PID, check exit</span>
done
(( FAILED > 0 )) && echo "$FAILED jobs failed" >&2

<span class="cb-cmt">## ═══ JOB POOL — MAX N CONCURRENT ════════════════════════════</span>
<span class="cb-cmt"># Most important parallel pattern — controls resource usage</span>
MAX_JOBS=4

for FILE in /data/*.csv; do
    python3 transform.py "$FILE" &

    <span class="cb-cmt"># Throttle: if we have MAX_JOBS running, wait for one to finish</span>
    while (( $(jobs -r | wc -l) >= MAX_JOBS )); do
        wait -n 2>/dev/null || wait    <span class="cb-cmt"># -n = wait for any one job (bash 4.3+)</span>
    done
done
wait                                   <span class="cb-cmt"># wait for remaining jobs</span>
echo "All done"

<span class="cb-cmt">## ═══ JOB POOL WITH ERROR TRACKING ═══════════════════════════</span>
MAX_JOBS=8
FAILED_FILES=()

process_file() {
    local FILE="$1"
    if ! python3 transform.py "$FILE"; then
        echo "$FILE" >> /tmp/failed_$$
    fi
}

for FILE in /data/*.csv; do
    process_file "$FILE" &
    while (( $(jobs -r | wc -l) >= MAX_JOBS )); do
        wait -n 2>/dev/null || sleep 0.1
    done
done
wait

<span class="cb-cmt"># Collect failures written by background processes:</span>
if [[ -f /tmp/failed_$$ ]]; then
    echo "Failed files:"
    cat /tmp/failed_$$
    rm -f /tmp/failed_$$
fi

<span class="cb-cmt">## ═══ xargs -P — PARALLEL WITH ARGUMENT LIST ══════════════════</span>
<span class="cb-cmt"># Cleaner for simple command + argument patterns</span>
find /data -name "*.csv" | xargs -P 8 -I{} python3 transform.py {}
<span class="cb-cmt"># -P 8: up to 8 parallel processes
# -I{}: replace {} with each line from stdin</span>

<span class="cb-cmt"># With null-delimited (safe for spaces in filenames):</span>
find /data -name "*.csv" -print0 | xargs -0 -P 8 -I{} python3 transform.py {}

<span class="cb-cmt">## ═══ PARALLEL TIMING ═════════════════════════════════════════</span>
START=$SECONDS

MAX_JOBS=4
for FILE in /data/*.csv; do
    python3 transform.py "$FILE" &
    while (( $(jobs -r | wc -l) >= MAX_JOBS )); do wait -n 2>/dev/null; done
done
wait

echo "Elapsed: $((SECONDS - START))s with $MAX_JOBS parallel workers"

<span class="cb-cmt">## ═══ PARALLEL WITH TIMEOUT PER JOB ══════════════════════════</span>
for FILE in /data/*.csv; do
    (
        timeout 300 python3 transform.py "$FILE"
        if (( $? == 124 )); then
            echo "TIMEOUT: $FILE" >&2
        fi
    ) &
    while (( $(jobs -r | wc -l) >= MAX_JOBS )); do wait -n 2>/dev/null; done
done
wait

<span class="cb-cmt">## ═══ SEMAPHORE PATTERN (named pipes as tokens) ════════════════</span>
<span class="cb-cmt"># Advanced: use a FIFO as a counting semaphore</span>
JOBS=4
PIPE=$(mktemp -u)
mkfifo "$PIPE"
exec 3<>"$PIPE"
rm "$PIPE"

<span class="cb-cmt"># Put N tokens in the pipe:</span>
for (( i=0; i<JOBS; i++ )); do printf '%s' "x" >&3; done

for FILE in /data/*.csv; do
    read -n1 -u3 TOKEN                 <span class="cb-cmt"># acquire token (blocks if all taken)</span>    
    (
        python3 transform.py "$FILE"
        printf '%s' "x" >&3            <span class="cb-cmt"># release token when done</span>
    ) &
done
wait
exec 3>&-
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 10 — LOOP OVER FILES & PATHS
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Looping Over Files &amp; Paths — Correct Patterns</h2>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">File Loop Patterns — Safe Handling of Spaces, find, Recursive</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ GOLD STANDARD: GLOB FOR SIMPLE CASES ════════════════════</span>
for FILE in /data/*.csv; do
    [[ -f $FILE ]] || continue         <span class="cb-cmt"># skip if glob matched nothing</span>
    echo "Processing: $FILE"
done

<span class="cb-cmt">## ═══ FILES WITH SPACES — ALWAYS QUOTE $FILE ══════════════════</span>
for FILE in "/data/my reports"/*.csv; do
    echo "File: [$FILE]"               <span class="cb-cmt"># quotes required!</span>
    python3 process.py "$FILE"         <span class="cb-cmt"># quotes required!</span>
done

<span class="cb-cmt">## ═══ RECURSIVE: find + while read (safest) ═══════════════════</span>
find /data -name "*.csv" -print0 | while IFS= read -r -d '' FILE; do
    echo "Found: $FILE"
    python3 process.py "$FILE"
done
<span class="cb-cmt"># -print0 + read -d '' uses NUL as separator
# Handles filenames with spaces, tabs, and newlines safely</span>

<span class="cb-cmt"># Or with process substitution (variables persist after loop):</span>
COUNT=0
while IFS= read -r -d '' FILE; do
    ((COUNT++))
    python3 process.py "$FILE"
done < <(find /data -name "*.csv" -print0)
echo "Processed: $COUNT files"

<span class="cb-cmt">## ═══ FIND WITH CONDITIONS ════════════════════════════════════</span>
<span class="cb-cmt"># Files modified in last 24 hours:</span>
while IFS= read -r -d '' FILE; do
    python3 load.py "$FILE"
done < <(find /data -name "*.csv" -mtime 0 -print0)

<span class="cb-cmt"># Large files (>10MB):</span>
while IFS= read -r -d '' FILE; do
    echo "Large: $FILE ($(du -h "$FILE" | cut -f1))"
done < <(find /data -name "*.csv" -size +10M -print0)

<span class="cb-cmt">## ═══ LOOP WITH PATH MANIPULATION ════════════════════════════</span>
for FILE in /data/raw/*.csv.gz; do
    [[ -f $FILE ]] || continue
    BASE="\${FILE##*/}"                 <span class="cb-cmt"># sales_2024.csv.gz</span>
    NAME="\${BASE%.csv.gz}"             <span class="cb-cmt"># sales_2024</span>
    OUTPUT="/data/processed/\${NAME}.parquet"
    echo "$FILE → $OUTPUT"
    python3 convert.py "$FILE" "$OUTPUT"
done

<span class="cb-cmt">## ═══ DIRECTORY TRAVERSAL ════════════════════════════════════</span>
for DIR in /data/*/; do                <span class="cb-cmt"># trailing / = directories only</span>
    [[ -d $DIR ]] || continue
    DATE="\${DIR%/}"; DATE="\${DATE##*/}" <span class="cb-cmt"># extract dir name</span>
    echo "Processing date: $DATE"
    for FILE in "\${DIR}"*.csv; do
        [[ -f $FILE ]] && python3 process.py "$FILE"
    done
done

<span class="cb-cmt">## ═══ RENAME BATCH ════════════════════════════════════════════</span>
<span class="cb-cmt"># Rename all .txt to .csv:</span>
for FILE in /data/*.txt; do
    [[ -f $FILE ]] || continue
    mv "$FILE" "\${FILE%.txt}.csv"
done

<span class="cb-cmt"># Add date prefix to all files:</span>
DATE=$(date +%Y%m%d)
for FILE in /data/incoming/*; do
    [[ -f $FILE ]] || continue
    BASENAME=$(basename "$FILE")
    mv "$FILE" "/data/incoming/\${DATE}_\${BASENAME}"
done
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 11 — KERNEL DEEP DIVE
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Kernel Deep Dive — How Loops Run at OS Level</h2>

<div class="deepdive-box">
<div class="deepdive-title">⚙️ Loops, fork/exec, Signals &amp; /proc — What the Kernel Sees</div>
<pre style="margin:0;padding:16px;font-family:monospace;font-size:12px;color:#e6edf3;background:#010409;border-radius:0 0 8px 8px;overflow-x:auto;">
# HOW BASH LOOPS EXECUTE AT THE KERNEL LEVEL

1. PURE BASH LOOPS — NO FORK
   for i in 1 2 3; do echo $i; done
   
   echo is a bash BUILTIN — no fork() needed.
   Bash evaluates the entire loop without spawning child processes.
   This makes pure-bash loops very fast.
   
   Measured cost: ~0.001ms per iteration (no fork overhead)

2. LOOPS CALLING EXTERNAL COMMANDS — FORK PER ITERATION
   for FILE in *.csv; do
       python3 process.py "$FILE"   ← fork() + exec() here
   done
   
   Each iteration:
     a) bash calls fork() → creates child process (copy of bash)
     b) child calls execve("/usr/bin/python3", ["python3", "process.py", ...], envp)
     c) bash calls waitpid(child_pid, &status, 0) → blocks until done
     d) bash reads exit status from status
     e) moves to next iteration
   
   Cost: ~1-5ms per iteration just for fork/exec overhead
   With 1000 files: 1-5 seconds of pure process creation overhead

3. BACKGROUND JOBS — FORK WITHOUT WAIT
   for FILE in *.csv; do
       python3 process.py "$FILE" &   ← & = don't waitpid immediately
   done
   wait                                ← waitpid(-1, ...) for ALL children
   
   Bash forks each child but doesn't block.
   The wait builtin calls waitpid(-1, ...) to reap all children.
   This is how you get true parallelism in shell loops.
   
   Internally bash maintains a JOB TABLE:
   Job 1: PID 4821, state=Running, cmd="python3 process.py a.csv"
   Job 2: PID 4822, state=Running, cmd="python3 process.py b.csv"
   ...

4. CHECKING RUNNING JOBS — jobs / $(jobs -r | wc -l)
   jobs builtin reads bash's job table (no syscall needed).
   Each entry in jobs -r is a running background process.
   The wc -l counts lines — but $(jobs -r | wc -l) creates TWO processes
   plus a pipe!  For tight loops, better to track PIDs manually.

5. SIGNALS IN LOOPS
   When you press Ctrl+C in a loop:
   SIGINT → sent to the foreground process group
   Bash receives SIGINT → sets a flag → checks after current command
   If inside for/while → exits the loop
   
   To trap Ctrl+C and clean up:
   cleanup() { echo "Interrupted — cleaning up"; kill 0; exit 1; }
   trap cleanup SIGINT SIGTERM
   
   kill 0 sends signal to the ENTIRE PROCESS GROUP
   This kills all background jobs spawned by this bash process.

6. /proc VISIBILITY
   Each background job gets a /proc/PID entry.
   
   $ for f in *.csv; do python3 process.py "$f" & done
   $ ls /proc/ | grep -E '^[0-9]' | while read pid; do
       cmd=$(cat /proc/$pid/cmdline 2>/dev/null | tr '\0' ' ')
       [[ $cmd == *python3* ]] && echo "$pid: $cmd"
   done
   
   /proc/PID/status: VmRSS shows memory per job
   /proc/PID/stat:   state (R=running, S=sleeping, Z=zombie)

7. ZOMBIE PROCESSES IN LOOPS
   A "zombie" = process that finished but parent hasn't called wait() yet.
   In a loop with & but no wait: all background jobs become zombies
   until the loop ends and the parent calls wait.
   
   Fix: call wait regularly, or use wait -n (bash 4.3+) to reap one at a time.
   
   $ for f in *.csv; do python3 process.py "$f" & done
   $ ps aux | grep defunct   ← zombies visible here before wait
   $ wait                    ← reaps all zombies
</pre>
</div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 12 — REAL-WORLD PATTERNS
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Real-World Patterns — Data Engineering Loops</h2>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Production Loop Patterns for Data Engineers</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ PATTERN 1: DAILY PARTITION PROCESSOR ════════════════════</span>
process_date_range() {
    local START="$1" END="$2"
    local CURRENT="$START"

    while [[ $CURRENT < $END || $CURRENT == $END ]]; do
        local YEAR MONTH DAY FILE
        YEAR="\${CURRENT:0:4}"
        MONTH="\${CURRENT:5:2}"
        DAY="\${CURRENT:8:2}"
        FILE="/data/raw/\${YEAR}/\${MONTH}/\${DAY}/sales.csv"

        if [[ -f $FILE ]]; then
            echo "Processing $CURRENT..."
            python3 daily_etl.py --date "$CURRENT" --input "$FILE" \
                || echo "WARN: $CURRENT failed, continuing" >&2
        else
            echo "SKIP: no data for $CURRENT"
        fi
        CURRENT=$(date -d "$CURRENT + 1 day" +%Y-%m-%d)
    done
}

process_date_range "2024-01-01" "2024-03-31"

<span class="cb-cmt">## ═══ PATTERN 2: BATCH FILE PROCESSOR WITH PROGRESS ══════════</span>
process_batch() {
    local DIR="$1"
    local FILES=( "$DIR"/*.csv )
    local TOTAL="\${#FILES[@]}"
    local DONE=0 ERRORS=0

    echo "Processing $TOTAL files from $DIR"

    for FILE in "\${FILES[@]}"; do
        [[ -f $FILE ]] || continue
        DONE=$((DONE + 1))
        printf "\r[%d/%d] %-40s" "$DONE" "$TOTAL" "$(basename "$FILE")"

        if python3 transform.py "$FILE" &>/dev/null; then
            :                               <span class="cb-cmt"># success — null command</span>
        else
            ((ERRORS++))
            echo ""                         <span class="cb-cmt"># newline after progress</span>
            echo "ERROR: $(basename "$FILE")" >&2
        fi
    done
    echo ""
    echo "Done: $((DONE - ERRORS)) success, $ERRORS errors"
}

<span class="cb-cmt">## ═══ PATTERN 3: PARALLEL LOAD WITH CHECKPOINT ════════════════</span>
CHECKPOINT="/tmp/loaded_files_$$.txt"
touch "$CHECKPOINT"
trap 'rm -f "$CHECKPOINT"' EXIT

MAX_JOBS=8
for FILE in /data/incoming/*.csv; do
    <span class="cb-cmt"># Skip if already loaded (idempotent):</span>
    grep -qxF "$FILE" "$CHECKPOINT" && continue

    (
        if python3 loader.py "$FILE"; then
            echo "$FILE" >> "$CHECKPOINT"
        else
            echo "FAILED: $FILE" >&2
        fi
    ) &

    while (( $(jobs -r | wc -l) >= MAX_JOBS )); do
        wait -n 2>/dev/null || sleep 0.1
    done
done
wait
echo "Checkpoint: $(wc -l < "$CHECKPOINT") files loaded"

<span class="cb-cmt">## ═══ PATTERN 4: RETRY LOOP ═══════════════════════════════════</span>
retry() {
    local CMD="$@"
    local MAX=3 DELAY=5 ATTEMPT=0

    until eval "$CMD"; do
        ((ATTEMPT++))
        if (( ATTEMPT >= MAX )); then
            echo "ERROR: failed after $MAX attempts: $CMD" >&2
            return 1
        fi
        echo "Retry $ATTEMPT/$MAX in \${DELAY}s..." >&2
        sleep $DELAY
        (( DELAY *= 2 ))          <span class="cb-cmt"># exponential backoff</span>
    done
}

retry python3 fragile_api_loader.py --date 2024-01-15
retry psql -d analytics -f migration.sql

<span class="cb-cmt">## ═══ PATTERN 5: ROLLING WINDOW AGGREGATION ══════════════════</span>
WINDOW=7                              <span class="cb-cmt"># 7-day rolling window</span>
for DAY in $(seq 1 $((TOTAL_DAYS - WINDOW + 1))); do
    END_DAY=$((DAY + WINDOW - 1))
    python3 aggregate.py --start $DAY --end $END_DAY &
    (( $(jobs -r | wc -l) >= MAX_JOBS )) && wait -n
done
wait

<span class="cb-cmt">## ═══ PATTERN 6: MULTI-ENV DEPLOY LOOP ═══════════════════════</span>
ENVIRONMENTS=("dev" "staging" "prod")
PREVIOUS_STATUS=0

for ENV in "\${ENVIRONMENTS[@]}"; do
    echo "=== Deploying to $ENV ==="

    if ! deploy_to "$ENV"; then
        echo "FAILED: $ENV deployment" >&2
        echo "Rolling back $ENV..." >&2
        rollback "$ENV"

        <span class="cb-cmt"># Skip subsequent environments:</span>
        for REMAINING in "\${ENVIRONMENTS[@]:$((\${#ENVIRONMENTS[@]}-1))}"; do
            echo "SKIPPED: $REMAINING (blocked by $ENV failure)"
        done
        exit 1
    fi

    echo "SUCCESS: $ENV deployed"
    [[ $ENV != "prod" ]] && sleep 10   <span class="cb-cmt"># pause between envs</span>
done
echo "All environments deployed successfully"
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 13 — COMPLETE REFERENCE
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Complete Reference — All Loop Syntax &amp; Commands</h2>

<div class="table-wrap">
<table class="ref-table">
<thead><tr><th style="width:30%">Syntax</th><th>What It Does</th><th style="width:30%">Best Use Case</th></tr></thead>
<tbody>
<tr><td colspan="3" style="background:#1a2a1a;color:#3fb950;font-family:'Segoe UI',sans-serif;font-weight:bold;">for … in — List Iteration</td></tr>
<tr><td style="font-family:monospace;">for X in a b c; do</td><td>Iterate literal list</td><td>Small fixed sets, env names</td></tr>
<tr><td style="font-family:monospace;">for X in *.csv; do</td><td>Iterate glob matches</td><td>Files in a directory</td></tr>
<tr><td style="font-family:monospace;">for X in "\${ARR[@]}"; do</td><td>Iterate array values</td><td>Processing array elements</td></tr>
<tr><td style="font-family:monospace;">for I in "\${!ARR[@]}"; do</td><td>Iterate array indices</td><td>Index + value access</td></tr>
<tr><td style="font-family:monospace;">for X in {1..10}; do</td><td>Brace expansion range</td><td>Fixed numeric ranges</td></tr>
<tr><td style="font-family:monospace;">for X in {0..100..5}; do</td><td>Brace expansion with step</td><td>Stepped fixed ranges</td></tr>
<tr><td style="font-family:monospace;">for X in $(cmd); do</td><td>Command output (word-split)</td><td>Simple words (not filenames)</td></tr>
<tr><td colspan="3" style="background:#0e1824;color:#58a6ff;font-family:'Segoe UI',sans-serif;font-weight:bold;">for (( )) — C-Style Counter</td></tr>
<tr><td style="font-family:monospace;">for (( i=0; i&lt;N; i++ ))</td><td>Count up</td><td>Numeric index access</td></tr>
<tr><td style="font-family:monospace;">for (( i=N; i&gt;0; i-- ))</td><td>Count down</td><td>Countdown, reverse iterate</td></tr>
<tr><td style="font-family:monospace;">for (( i=0; i&lt;N; i+=S ))</td><td>Custom step size</td><td>Chunk processing, stride</td></tr>
<tr><td style="font-family:monospace;">for (( i=0,j=N; i&lt;N; i++,j-- ))</td><td>Multiple variables</td><td>Parallel counters</td></tr>
<tr><td style="font-family:monospace;">for (( ; ; ))</td><td>Infinite loop</td><td>Event loops, daemons</td></tr>
<tr><td colspan="3" style="background:#2a2a1a;color:#ffa657;font-family:'Segoe UI',sans-serif;font-weight:bold;">while — Condition-Driven</td></tr>
<tr><td style="font-family:monospace;">while [[ cond ]]; do</td><td>Loop while condition true</td><td>Counter, polling</td></tr>
<tr><td style="font-family:monospace;">while IFS= read -r line; do</td><td>Read file line by line</td><td>File processing (canonical)</td></tr>
<tr><td style="font-family:monospace;">while IFS=',' read -r a b; do</td><td>Read and split fields</td><td>CSV processing</td></tr>
<tr><td style="font-family:monospace;">while true; do ... break</td><td>Loop with internal exit</td><td>Menu, event loop</td></tr>
<tr><td colspan="3" style="background:#1a1a3a;color:#bc8cff;font-family:'Segoe UI',sans-serif;font-weight:bold;">until — Wait-Until-True</td></tr>
<tr><td style="font-family:monospace;">until [[ cond ]]; do</td><td>Loop until condition true</td><td>Wait for service/file</td></tr>
<tr><td style="font-family:monospace;">until nc -z host port; do</td><td>Wait for network service</td><td>Service readiness check</td></tr>
<tr><td colspan="3" style="background:#1f2027;color:#8b949e;font-family:'Segoe UI',sans-serif;font-weight:bold;">Loop Control</td></tr>
<tr><td style="font-family:monospace;">break</td><td>Exit current loop</td><td>Early exit on success/error</td></tr>
<tr><td style="font-family:monospace;">break N</td><td>Exit N levels of loops</td><td>Nested loop early exit</td></tr>
<tr><td style="font-family:monospace;">continue</td><td>Skip to next iteration</td><td>Skip invalid items (guard)</td></tr>
<tr><td style="font-family:monospace;">continue N</td><td>Skip N levels</td><td>Skip outer iteration from inner</td></tr>
<tr><td colspan="3" style="background:#1a2a1a;color:#3fb950;font-family:'Segoe UI',sans-serif;font-weight:bold;">Parallel Execution</td></tr>
<tr><td style="font-family:monospace;">cmd &amp;</td><td>Run in background</td><td>Start parallel job</td></tr>
<tr><td style="font-family:monospace;">wait</td><td>Wait for ALL background jobs</td><td>Synchronise parallel work</td></tr>
<tr><td style="font-family:monospace;">wait $PID</td><td>Wait for specific job</td><td>Check individual job status</td></tr>
<tr><td style="font-family:monospace;">wait -n</td><td>Wait for ANY one job (4.3+)</td><td>Job pool throttling</td></tr>
<tr><td style="font-family:monospace;">jobs -r | wc -l</td><td>Count running background jobs</td><td>Throttle job pool</td></tr>
<tr><td style="font-family:monospace;">xargs -P N -I{} cmd {}</td><td>N parallel xargs workers</td><td>Simple parallel with stdin</td></tr>
</tbody>
</table>
</div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 14 — COMMON MISTAKES
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Common Mistakes &amp; How to Avoid Them</h2>

<div class="two-col-grid">
  <div class="card hard-card">
    <div class="type-badge badge-warn">❌ Word-splitting filenames</div>
    <pre style="font-family:monospace;font-size:11px;color:#f85149;background:#0d1117;padding:8px;border-radius:4px;margin:8px 0 4px;">for FILE in $(ls *.csv); do  # BROKEN for spaces</pre>
    <p style="font-size:12px;color:#8b949e;margin:4px 0;">ls output is word-split on spaces — "my file.csv" becomes two items.</p>
    <pre style="font-family:monospace;font-size:11px;color:#3fb950;background:#0d1117;padding:8px;border-radius:4px;margin:4px 0;">for FILE in *.csv; do        # glob is safe</pre>
  </div>
  <div class="card hard-card">
    <div class="type-badge badge-warn">❌ Pipe scope trap</div>
    <pre style="font-family:monospace;font-size:11px;color:#f85149;background:#0d1117;padding:8px;border-radius:4px;margin:8px 0 4px;">cat file | while read line; do
    ((COUNT++))
done; echo $COUNT  # always 0!</pre>
    <p style="font-size:12px;color:#8b949e;margin:4px 0;">The pipe runs <code>while</code> in a subshell — variables set inside are lost.</p>
    <pre style="font-family:monospace;font-size:11px;color:#3fb950;background:#0d1117;padding:8px;border-radius:4px;margin:4px 0;">while read line; do ((COUNT++))
done < file           # redirect, no subshell</pre>
  </div>
  <div class="card hard-card">
    <div class="type-badge badge-warn">❌ Forgetting to quote loop var</div>
    <pre style="font-family:monospace;font-size:11px;color:#f85149;background:#0d1117;padding:8px;border-radius:4px;margin:8px 0 4px;">for FILE in *.csv; do
    python3 process.py $FILE  # unquoted!</pre>
    <p style="font-size:12px;color:#8b949e;margin:4px 0;">If <code>$FILE</code> contains spaces, it splits into multiple arguments.</p>
    <pre style="font-family:monospace;font-size:11px;color:#3fb950;background:#0d1117;padding:8px;border-radius:4px;margin:4px 0;">python3 process.py "$FILE"  # always quote</pre>
  </div>
  <div class="card hard-card">
    <div class="type-badge badge-warn">❌ Variable range in braces</div>
    <pre style="font-family:monospace;font-size:11px;color:#f85149;background:#0d1117;padding:8px;border-radius:4px;margin:8px 0 4px;">N=10
for i in {1..$N}; do  # BROKEN: literal "{1..10}"</pre>
    <p style="font-size:12px;color:#8b949e;margin:4px 0;">Brace expansion happens before variable expansion — <code>$N</code> is not substituted.</p>
    <pre style="font-family:monospace;font-size:11px;color:#3fb950;background:#0d1117;padding:8px;border-radius:4px;margin:4px 0;">for (( i=1; i<=N; i++ )); do  # C-style works
for i in $(seq 1 $N); do       # seq works</pre>
  </div>
  <div class="card hard-card">
    <div class="type-badge badge-warn">❌ Unlimited background jobs</div>
    <pre style="font-family:monospace;font-size:11px;color:#f85149;background:#0d1117;padding:8px;border-radius:4px;margin:8px 0 4px;">for FILE in *.csv; do
    python3 process.py "$FILE" &  # 1000 jobs!
done; wait</pre>
    <p style="font-size:12px;color:#8b949e;margin:4px 0;">Launches ALL files simultaneously — OOM, overloaded CPU, open file limits hit.</p>
    <pre style="font-family:monospace;font-size:11px;color:#3fb950;background:#0d1117;padding:8px;border-radius:4px;margin:4px 0;">MAX=8  # throttle with job pool
while (( $(jobs -r|wc -l) >= MAX )); do wait -n; done</pre>
  </div>
  <div class="card hard-card">
    <div class="type-badge badge-warn">❌ Infinite loop no exit</div>
    <pre style="font-family:monospace;font-size:11px;color:#f85149;background:#0d1117;padding:8px;border-radius:4px;margin:8px 0 4px;">while true; do
    check_service || echo "down"
done  # spins 100% CPU, no sleep</pre>
    <p style="font-size:12px;color:#8b949e;margin:4px 0;">Busy-wait burns CPU. Always add <code>sleep</code> and a timeout to polling loops.</p>
    <pre style="font-family:monospace;font-size:11px;color:#3fb950;background:#0d1117;padding:8px;border-radius:4px;margin:4px 0;">while true; do
    check_service && break
    sleep 5; (( elapsed+=5 ))
    (( elapsed > 60 )) && exit 1
done</pre>
  </div>
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
    <h4>Exercise 1 — Loop Forms Drill</h4>
    <p>Write a script that uses all four loop forms for the same task — printing numbers 1-10:</p>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>With <code>for … in {1..10}</code></li>
      <li>With <code>for (( i=1; i&lt;=10; i++ ))</code></li>
      <li>With <code>while (( i &lt;= 10 ))</code></li>
      <li>With <code>until (( i &gt; 10 ))</code></li>
      <li>Add a version that prints only even numbers using <code>continue</code></li>
      <li>Add a version that stops at 7 using <code>break</code></li>
      <li>Using <code>for (( ))</code>, print a multiplication table (1–5 × 1–5) as a formatted grid</li>
    </ol>
  </div>
</div>

<div class="exercise-panel easy">
  <div class="ex-badge easy-badge">Easy</div>
  <div class="ex-body">
    <h4>Exercise 2 — File Processing Loop</h4>
    <p>Create 5 test CSV files and write a loop that:</p>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Uses glob to find all <code>.csv</code> files, skips empty ones with <code>continue</code></li>
      <li>For each file: prints filename, line count (<code>wc -l</code>), and file size (<code>du -h</code>)</li>
      <li>Reads each CSV line by line using <code>while IFS=',' read -r</code>, counting rows</li>
      <li>Uses <code>while IFS= read -r -d '' FILE</code> with <code>find -print0</code> (safe for spaces)</li>
      <li>Accumulates a total line count across all files (variable persists after loop)</li>
      <li>Uses <code>break</code> to stop after the first file that has more than 100 lines</li>
    </ol>
  </div>
</div>

<div class="exercise-panel medium">
  <div class="ex-badge medium-badge">Medium</div>
  <div class="ex-body">
    <h4>Exercise 3 — Parallel Processor with Job Pool</h4>
    <p>Write <code>parallel_process.sh</code>:</p>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Accept <code>-j N</code> flag for max parallel jobs (default 4)</li>
      <li>Accept <code>-d DIR</code> flag for input directory</li>
      <li>Process all <code>.csv</code> files in the directory using a job pool</li>
      <li>Track each file's PID in an array</li>
      <li>After all jobs finish, report: total files, succeeded, failed</li>
      <li>Print elapsed time using <code>$SECONDS</code></li>
      <li>Set a trap to kill all background jobs on Ctrl+C</li>
      <li>If any job fails, print which file failed (use a temp file to communicate from subshell)</li>
    </ol>
  </div>
</div>

<div class="exercise-panel medium">
  <div class="ex-badge medium-badge">Medium</div>
  <div class="ex-body">
    <h4>Exercise 4 — Date Range Loop</h4>
    <p>Write <code>date_range.sh START_DATE END_DATE</code> that:</p>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Validates both dates match <code>YYYY-MM-DD</code> format using <code>[[ =~ ]]</code></li>
      <li>Uses a <code>while</code> loop to iterate day by day from start to end</li>
      <li>For each date: constructs the expected data file path <code>/data/YYYY/MM/DD/sales.csv</code></li>
      <li>Reports: found / missing / empty for each date</li>
      <li>Uses a nested <code>for</code> loop to check multiple regions per date</li>
      <li>Counts total days, found files, missing files</li>
      <li>At the end prints a summary table using <code>printf</code> formatting</li>
    </ol>
  </div>
</div>

<div class="exercise-panel hard">
  <div class="ex-badge hard-badge">Hard</div>
  <div class="ex-body">
    <h4>Exercise 5 — Production ETL Pipeline Loop</h4>
    <p>Build <code>etl_loop.sh</code> — a complete loop-driven ETL pipeline:</p>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li><strong>Discovery:</strong> Use <code>find</code> with <code>-print0</code> to discover all <code>*.csv.gz</code> files recursively, load into an array with <code>mapfile</code></li>
      <li><strong>Deduplication:</strong> Load a checkpoint file into an associative array; skip already-processed files in the loop</li>
      <li><strong>Parallel processing:</strong> Use a job pool (max 8) — each job: decompress, validate headers, transform, load to DB</li>
      <li><strong>Progress tracking:</strong> Use a <code>while true</code> monitor loop in the background that prints progress every 10s using a shared counter file</li>
      <li><strong>Error handling:</strong> Failed files go to a retry queue; after the main loop, retry queue items up to 3 times with exponential backoff using <code>until</code></li>
      <li><strong>Cleanup:</strong> Trap <code>EXIT</code> to kill monitor, close FDs, and save checkpoint</li>
      <li><strong>Summary:</strong> Nested loop over results array to print per-file status table with timing</li>
    </ol>
    <p><strong>Must pass <code>shellcheck</code> with zero warnings.</strong></p>
  </div>
</div>

<!-- Wrap-up story -->
<div class="story-panel" style="margin-top:32px;">
  <div class="story-avatar">🧑‍💻</div>
  <div class="story-body">
    <div class="story-title">Ravi's 847 Files — Done by Midnight</div>
    <p>The loop finished at 11:47 PM. 847 files. Transformed, validated, loaded. Ravi stared at the terminal. 13 minutes for a job that would have taken him two days manually.</p>
    <p>He had started with a simple <code>for f in *.csv; do</code>. Then Priya showed him the job pool — <code>while (( $(jobs -r | wc -l) >= 8 ))</code> — and it finished four times faster. Then the <code>wait</code>. Then the checkpoint file so it could resume if it died halfway. Then the progress counter.</p>
    <p>Three lines had become thirty. But those thirty lines were not complexity — they were <em>control</em>. Control over how many things ran at once, which ones had already succeeded, what to do when one failed, how long the whole thing took.</p>
    <p><strong>"A loop is not a shortcut,"</strong> Priya had said. Ravi understood now. A loop is a machine. You build it once. It works at any scale.</p>
  </div>
</div>

</div><!-- /section-block -->
\`

`
};