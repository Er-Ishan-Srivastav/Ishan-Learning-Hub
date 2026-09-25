
var data_pipelines = {
    title: "Data Pipelines in Shell",
    description: "Master the art of building production-grade data pipelines in shell — from the kernel-level mechanics of pipes to complete ETL workflows with error handling, progress monitoring, parallel processing, checkpointing, and fan-out architectures. Transform the shell into a streaming data engineering platform.",
    content: `
<style>
/* ── Keyframe animations ── */
@keyframes dp-flow  { 0%{stroke-dashoffset:30} 100%{stroke-dashoffset:0} }
@keyframes dp-pulse { 0%,100%{opacity:1} 50%{opacity:.15} }
@keyframes dp-pop   { 0%{transform:scale(0);opacity:0} 70%{transform:scale(1.1)} 100%{transform:scale(1);opacity:1} }
@keyframes dp-fill  { 0%{width:0%} 100%{width:100%} }
@keyframes dp-blink { 0%,100%{fill:#3fb950;stroke:#3fb950} 50%{fill:#0a1a0a;stroke:#238636} }
@keyframes dp-slide { 0%{transform:translateX(-24px);opacity:0} 100%{transform:translateX(0);opacity:1} }
@keyframes dp-spin  { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
@keyframes dp-wave  { 0%,100%{transform:scaleY(1)} 50%{transform:scaleY(1.6)} }
@keyframes dp-scan  { 0%{transform:translateX(0)} 100%{transform:translateX(400px)} }

.dp-flow  { stroke-dasharray:8 5; animation: dp-flow  1s linear infinite; }
.dp-pulse { animation: dp-pulse 1.8s ease-in-out infinite; }
.dp-blink { animation: dp-blink 2.4s ease-in-out infinite; }
.dp-pop   { animation: dp-pop   .5s cubic-bezier(.34,1.56,.64,1) both; }
.dp-wave  { animation: dp-wave  .6s ease-in-out infinite; }
</style>

<!-- ══════════════════════════════════════════════════════
     RAVI'S STORY — HOOK
══════════════════════════════════════════════════════ -->
<div class="story-panel">
  <div class="story-avatar">🧑‍💻</div>
  <div class="story-body">
    <div class="story-title">Ravi Builds a Pipeline — Day 490</div>
    <p>The new data source sent daily dumps: a gzipped CSV with twelve million rows, mixed encodings, some rows with embedded newlines in quoted fields, timestamps in three different formats, and a handful of null bytes scattered through the file. The requirement: ingest it, validate it, enrich it from a lookup table, aggregate by region and product, and load the result into postgres — all by 06:00.</p>
    <p>Priya watched Ravi's first attempt: a Python script that loaded the entire file into memory. On the 4GB server it ran out of RAM at row three million. She put her hand up. "Stop. You don't need to load the whole file."</p>
    <p>What she wrote instead was a shell pipeline. Twelve commands connected by pipes, each one processing a stream of bytes — never more than a few megabytes in memory at any moment. Twelve million rows. Four minutes. Two hundred megabytes peak RAM.</p>
    <p>"A pipeline," she said, "is a streaming computation graph. Each stage reads from its predecessor and writes to its successor. The operating system handles the buffering. You handle the logic."</p>
    <p>Ravi spent that afternoon understanding how pipes work at the kernel level. By the end of the week, he had rebuilt the pipeline with proper error handling, progress monitoring, and a checkpoint that let it resume from any failure point. It ran every night, unattended, for six months without a single manual intervention.</p>
  </div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 1 — PIPE MECHANICS (ANIMATED KERNEL LEVEL)
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num">01</span> Pipe Mechanics — How the Kernel Connects Processes</h2>

<p>A pipe is a kernel-managed, fixed-size circular buffer (64KB on Linux) connecting the stdout of one process to the stdin of the next. Understanding this explains <em>why</em> pipelines are memory-efficient, what backpressure is, and what happens when you have a slow stage in the middle.</p>

<div class="diagram-wrap">
<svg viewBox="0 0 820 320" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 20px;">
  <defs>
    <marker id="dp-grn" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#3fb950"/></marker>
    <marker id="dp-blu" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#58a6ff"/></marker>
    <marker id="dp-orn" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#ffa657"/></marker>
    <marker id="dp-pur" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#bc8cff"/></marker>
    <marker id="dp-red" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#f85149"/></marker>
    <marker id="dp-arr" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#8b949e"/></marker>
  </defs>
  <rect width="820" height="320" fill="#0d1117" rx="12"/>
  <text x="410" y="24" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="13" font-weight="bold" fill="#8b949e">cmd1 | cmd2 | cmd3 — Kernel Pipe Internals</text>

  <!-- Process boxes -->
  <rect x="14"  y="44" width="160" height="76" rx="8" fill="#1a2a1a" stroke="#3fb950" stroke-width="2.5" class="dp-blink"/>
  <text x="94"  y="68" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#3fb950">cmd1 / Producer</text>
  <text x="94"  y="84" text-anchor="middle" font-family="'Courier New',monospace" font-size="9.5" fill="#8b949e">writes to fd[1]</text>
  <text x="94"  y="98" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">(stdout → pipe)</text>
  <text x="94" y="112" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#ffa657">blocks if pipe full</text>

  <!-- Pipe buffer 1 -->
  <rect x="188" y="56" width="140" height="52" rx="6" fill="#2a2a14" stroke="#ffa657" stroke-width="2"/>
  <text x="258" y="76" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">Kernel Pipe Buffer</text>
  <text x="258" y="92" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#e6edf3">64KB circular buffer</text>
  <text x="258" y="104" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#8b949e">→ backpressure ←</text>
  <!-- Buffer fill animation -->
  <rect x="196" y="96" width="124" height="8" rx="3" fill="#30363d"/>
  <rect x="196" y="96" width="90" height="8" rx="3" fill="#ffa657" class="dp-pulse"/>

  <rect x="342" y="44" width="160" height="76" rx="8" fill="#0e1824" stroke="#58a6ff" stroke-width="2"/>
  <text x="422" y="68" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#58a6ff">cmd2 / Transformer</text>
  <text x="422" y="84" text-anchor="middle" font-family="'Courier New',monospace" font-size="9.5" fill="#8b949e">reads fd[0], writes fd[1]</text>
  <text x="422" y="98" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">(stdin → process → stdout)</text>
  <text x="422" y="112" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#ffa657">blocks if output pipe full</text>

  <!-- Pipe buffer 2 -->
  <rect x="516" y="56" width="140" height="52" rx="6" fill="#2a2a14" stroke="#ffa657" stroke-width="2"/>
  <text x="586" y="76" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">Kernel Pipe Buffer</text>
  <text x="586" y="92" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#e6edf3">64KB circular buffer</text>
  <rect x="524" y="96" width="124" height="8" rx="3" fill="#30363d"/>
  <rect x="524" y="96" width="30" height="8" rx="3" fill="#3fb950" class="dp-pulse"/>

  <rect x="670" y="44" width="136" height="76" rx="8" fill="#1f1428" stroke="#bc8cff" stroke-width="2"/>
  <text x="738" y="68" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#bc8cff">cmd3 / Consumer</text>
  <text x="738" y="84" text-anchor="middle" font-family="'Courier New',monospace" font-size="9.5" fill="#8b949e">reads fd[0]</text>
  <text x="738" y="98" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">(pipe → stdin)</text>
  <text x="738" y="112" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#8b949e">blocks if pipe empty</text>

  <!-- Animated flow arrows -->
  <line x1="174" y1="82" x2="188" y2="82" stroke="#3fb950" stroke-width="2.5" marker-end="url(#dp-grn)" class="dp-flow"/>
  <line x1="328" y1="82" x2="342" y2="82" stroke="#ffa657" stroke-width="2.5" marker-end="url(#dp-orn)" class="dp-flow"/>
  <line x1="502" y1="82" x2="516" y2="82" stroke="#58a6ff" stroke-width="2.5" marker-end="url(#dp-blu)" class="dp-flow"/>
  <line x1="656" y1="82" x2="670" y2="82" stroke="#bc8cff" stroke-width="2.5" marker-end="url(#dp-pur)" class="dp-flow"/>

  <!-- Key facts -->
  <rect x="14" y="136" width="792" height="172" rx="8" fill="#161b22" stroke="#30363d" stroke-width="1.5"/>
  <text x="410" y="158" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#ffa657">4 Critical Properties of Unix Pipes:</text>

  <rect x="26" y="167" width="370" height="60" rx="6" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.2"/>
  <text x="211" y="187" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#3fb950">① Streaming (no temp files)</text>
  <text x="211" y="204" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">Data flows continuously — producer and consumer</text>
  <text x="211" y="219" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">run SIMULTANEOUSLY. No need to wait for cmd1 to finish.</text>

  <rect x="414" y="167" width="380" height="60" rx="6" fill="#2a2a14" stroke="#ffa657" stroke-width="1.2"/>
  <text x="604" y="187" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">② Backpressure (flow control)</text>
  <text x="604" y="204" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">Producer blocks when buffer is full. Automatically</text>
  <text x="604" y="219" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">throttles fast producers to match slow consumers.</text>

  <rect x="26" y="237" width="370" height="60" rx="6" fill="#0e1824" stroke="#58a6ff" stroke-width="1.2"/>
  <text x="211" y="257" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#58a6ff">③ Constant memory</text>
  <text x="211" y="274" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">Pipeline memory = buffer size × stages (≈MB)</text>
  <text x="211" y="289" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">NOT proportional to file size. 12GB file = same RAM.</text>

  <rect x="414" y="237" width="380" height="60" rx="6" fill="#2a1a14" stroke="#f85149" stroke-width="1.2"/>
  <text x="604" y="257" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#f85149">④ SIGPIPE on broken pipe</text>
  <text x="604" y="274" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">When consumer closes its end, producer gets SIGPIPE.</text>
  <text x="604" y="289" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">Default: terminates. Trap '' PIPE to ignore it.</text>
</svg>
<p class="diagram-caption">All three processes run <strong>simultaneously</strong> — this is what makes pipelines efficient. cmd1 produces data, cmd2 transforms it, cmd3 consumes it, all in parallel. The kernel's pipe buffers act as a bounded queue between each pair.</p>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 1 of 12 — Pipe fundamentals: stdin/stdout/stderr, redirection operators</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ THE THREE STANDARD FILE DESCRIPTORS ═══════════════════</span>
<span class="cb-cmt"># fd 0 = stdin  (read from keyboard / pipe)
# fd 1 = stdout (write to terminal / pipe)
# fd 2 = stderr (write to terminal, NOT pipe)
# A pipe connects stdout(fd1) of left → stdin(fd0) of right</span>

<span class="cb-cmt">## ═══ BASIC REDIRECTIONS ═════════════════════════════════════</span>
<span class="cb-prompt">$</span> cmd > file        <span class="cb-cmt"># stdout to file (overwrite)</span>
<span class="cb-prompt">$</span> cmd >> file       <span class="cb-cmt"># stdout to file (append)</span>
<span class="cb-prompt">$</span> cmd < file        <span class="cb-cmt"># stdin from file</span>
<span class="cb-prompt">$</span> cmd 2> err.log    <span class="cb-cmt"># stderr to file</span>
<span class="cb-prompt">$</span> cmd 2>> err.log   <span class="cb-cmt"># stderr to file (append)</span>
<span class="cb-prompt">$</span> cmd > out.log 2>&1  <span class="cb-cmt"># both stdout and stderr to file</span>
<span class="cb-prompt">$</span> cmd 2>&1 | tee out.log  <span class="cb-cmt"># both to pipe AND file</span>
<span class="cb-prompt">$</span> cmd > /dev/null   <span class="cb-cmt"># discard stdout</span>
<span class="cb-prompt">$</span> cmd > /dev/null 2>&1  <span class="cb-cmt"># discard everything</span>
<span class="cb-prompt">$</span> cmd1 2>&1 | cmd2  <span class="cb-cmt"># stderr into pipe (redirect BEFORE pipe)</span>

<span class="cb-cmt">## ═══ ORDER MATTERS WITH REDIRECTIONS ═══════════════════════</span>
<span class="cb-cmt"># WRONG — redirects stderr to the old stdout, THEN stdout to file:</span>
cmd 2>&1 > out.log   <span class="cb-cmt"># stderr still goes to terminal!</span>
<span class="cb-cmt"># RIGHT — redirect stdout first, then merge stderr into new stdout:</span>
cmd > out.log 2>&1   <span class="cb-cmt"># both go to file</span>

<span class="cb-cmt">## ═══ ADVANCED REDIRECTION ═══════════════════════════════════</span>
<span class="cb-prompt">$</span> exec 3> debug.log              <span class="cb-cmt"># open fd 3 for writing</span>
<span class="cb-prompt">$</span> echo "debug" >&3               <span class="cb-cmt"># write to fd 3</span>
<span class="cb-prompt">$</span> exec 3>&-                      <span class="cb-cmt"># close fd 3</span>

<span class="cb-cmt"># Redirect both stdout and stderr separately:</span>
<span class="cb-prompt">$</span> cmd > out.log 2> err.log

<span class="cb-cmt"># Redirect stderr to stdout and suppress stdout:</span>
<span class="cb-prompt">$</span> cmd 2>&1 1>/dev/null | grep ERROR

<span class="cb-cmt">## ═══ PIPE EXIT CODES — CRITICAL! ════════════════════════════</span>
<span class="cb-prompt">$</span> false | true          <span class="cb-cmt"># false fails, true succeeds</span>
<span class="cb-prompt">$</span> echo $?               <span class="cb-cmt"># shows exit code of LAST command (true=0)</span>
<span class="cb-out">0</span>                       <span class="cb-cmt">← FALSE POSITIVE! false failed but we don't see it</span>

<span class="cb-prompt">$</span> echo "\${PIPESTATUS[@]}"  <span class="cb-cmt"># exit codes of ALL commands in last pipeline</span>
<span class="cb-out">1 0</span>                       <span class="cb-cmt">← PIPESTATUS[0]=1 (false) PIPESTATUS[1]=0 (true)</span>

<span class="cb-cmt"># set -o pipefail: pipeline fails if ANY stage fails:</span>
<span class="cb-prompt">$</span> set -o pipefail
<span class="cb-prompt">$</span> false | true; echo $?
<span class="cb-out">1</span>                         <span class="cb-cmt">← NOW we see the failure</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 2 — STDIN/STDOUT PATTERNS (ANIMATED)
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num">02</span> stdin/stdout Patterns — Here-Docs, Here-Strings, /dev/stdin</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 250" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 20px;">
  <rect width="820" height="250" fill="#0d1117" rx="12"/>
  <text x="410" y="24" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="13" font-weight="bold" fill="#8b949e">Input Sources — Six Ways to Feed Data into a Command</text>

  <!-- 6 input source boxes -->
  <!-- From file -->
  <rect x="14"  y="40" width="240" height="64" rx="7" fill="#0e1824" stroke="#58a6ff" stroke-width="1.8"/>
  <text x="134" y="60" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#58a6ff">From File (&lt;)</text>
  <text x="134" y="76" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">cmd < input.csv</text>
  <text x="134" y="94" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Reads file as stdin. Most common.</text>

  <!-- From pipe -->
  <rect x="290" y="40" width="240" height="64" rx="7" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="410" y="60" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#3fb950">From Pipe (|)</text>
  <text x="410" y="76" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">producer | cmd</text>
  <text x="410" y="94" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Streaming — memory efficient.</text>

  <!-- Here-doc -->
  <rect x="566" y="40" width="240" height="64" rx="7" fill="#2a2a14" stroke="#ffa657" stroke-width="1.8"/>
  <text x="686" y="60" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">Here-Document (&lt;&lt;EOF)</text>
  <text x="686" y="76" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">cmd &lt;&lt;'EOF'</text>
  <text x="686" y="94" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Inline multi-line input in script.</text>

  <!-- Here-string -->
  <rect x="14"  y="120" width="240" height="64" rx="7" fill="#1f1428" stroke="#bc8cff" stroke-width="1.8"/>
  <text x="134" y="140" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#bc8cff">Here-String (&lt;&lt;&lt;)</text>
  <text x="134" y="156" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">cmd &lt;&lt;&lt; "string"</text>
  <text x="134" y="174" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Single string as stdin. bash only.</text>

  <!-- Process substitution -->
  <rect x="290" y="120" width="240" height="64" rx="7" fill="#2a1a14" stroke="#f85149" stroke-width="1.8"/>
  <text x="410" y="140" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#f85149">Process Substitution (&lt;(...))</text>
  <text x="410" y="156" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">cmd &lt;(other_cmd)</text>
  <text x="410" y="174" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Command output as filename.</text>

  <!-- /dev/stdin -->
  <rect x="566" y="120" width="240" height="64" rx="7" fill="#161b22" stroke="#30363d" stroke-width="1.8"/>
  <text x="686" y="140" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#8b949e">/dev/stdin, /dev/fd/N</text>
  <text x="686" y="156" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">cat /dev/stdin</text>
  <text x="686" y="174" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Virtual FD as filename.</text>

  <!-- Key insight -->
  <rect x="14" y="200" width="792" height="40" rx="6" fill="#1a1a2a" stroke="#bc8cff" stroke-width="1"/>
  <text x="26" y="218" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#bc8cff">Key distinction: </text>
  <text x="130" y="218" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Here-doc/here-string: bash creates temp file, passes as fd. Process substitution: creates named pipe (/dev/fd/N), passes path.</text>
  <text x="26" y="234" font-family="'Segoe UI',sans-serif" font-size="10" fill="#ffa657">Use &lt;&lt;'EOF' (quoted delimiter) to prevent variable expansion inside. Use &lt;&lt;EOF (unquoted) to allow $VAR expansion.</text>
</svg>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 2 of 12 — Here-docs, here-strings, /dev/stdin, xargs -I, mapfile</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ HERE-DOCUMENT — MULTI-LINE INLINE INPUT ═══════════════</span>
<span class="cb-prompt">$</span> cat << 'EOF'             <span class="cb-cmt"># quoted: NO variable expansion</span>
<span class="cb-out">INSERT INTO users VALUES ('ravi', '$2b$12$...');</span>
<span class="cb-out">EOF</span>

<span class="cb-prompt">$</span> cat << EOF               <span class="cb-cmt"># unquoted: variable expansion happens</span>
<span class="cb-out">Host: \${HOSTNAME}</span>
<span class="cb-out">Date: $(date +%Y-%m-%d)</span>
<span class="cb-out">EOF</span>

<span class="cb-cmt"># Here-doc to a command:</span>
<span class="cb-prompt">$</span> psql -d analytics << 'EOSQL'
<span class="cb-out">BEGIN;</span>
<span class="cb-out">TRUNCATE staging.sales;</span>
<span class="cb-out">COPY staging.sales FROM STDIN (FORMAT csv, HEADER);</span>
<span class="cb-out">EOSQL</span>

<span class="cb-cmt"># Strip leading tabs (<<-):
cat <<- 'EOF'
    indented content here   # tabs stripped, spaces kept
EOF</span>

<span class="cb-cmt">## ═══ HERE-STRING ════════════════════════════════════════════</span>
<span class="cb-prompt">$</span> wc -w <<< "hello world"       <span class="cb-cmt"># count words in string</span>
<span class="cb-out">2</span>
<span class="cb-prompt">$</span> base64 -d <<< "aGVsbG8="      <span class="cb-cmt"># decode a value</span>
<span class="cb-out">hello</span>
<span class="cb-prompt">$</span> python3 <<< "import sys; print(sys.version)"  <span class="cb-cmt"># one-liner</span>

<span class="cb-cmt">## ═══ READING STDIN IN SCRIPTS ═══════════════════════════════</span>
<span class="cb-cmt"># Read stdin line by line:</span>
while IFS= read -r line; do
    echo "Processing: $line"
done < /dev/stdin

<span class="cb-cmt"># Or from a file OR stdin (common pattern):</span>
process_input() {
    local INPUT="\${1:-/dev/stdin}"  <span class="cb-cmt"># use arg or stdin</span>
    while IFS= read -r line; do
        process "$line"
    done < "$INPUT"
}
process_input data.csv              <span class="cb-cmt"># from file</span>
echo "data" | process_input         <span class="cb-cmt"># from pipe</span>

<span class="cb-cmt">## ═══ mapfile — READ STDIN INTO ARRAY ════════════════════════</span>
<span class="cb-prompt">$</span> mapfile -t lines < data.csv      <span class="cb-cmt"># read all lines into array</span>
<span class="cb-prompt">$</span> echo "\${#lines[@]} lines"         <span class="cb-cmt"># count</span>
<span class="cb-prompt">$</span> mapfile -t PIDS < <(jobs -p)      <span class="cb-cmt"># from command output</span>

<span class="cb-cmt">## ═══ xargs — COMMAND FROM STDIN ════════════════════════════</span>
<span class="cb-prompt">$</span> echo "file1 file2 file3" | xargs rm         <span class="cb-cmt"># args from stdin</span>
<span class="cb-prompt">$</span> find /data -name "*.csv" | xargs wc -l       <span class="cb-cmt"># count lines</span>
<span class="cb-prompt">$</span> cat ids.txt | xargs -I{} curl http://api.example.com/{}  <span class="cb-cmt"># -I{} replace</span>
<span class="cb-prompt">$</span> find . -name "*.log" | xargs -d'\n' gzip     <span class="cb-cmt"># -d: newline delimiter</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 3 — tee: PIPELINE BRANCHING (ANIMATED)
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num">03</span> <code>tee</code> — Splitting the Pipeline Stream</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 230" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="230" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">tee — Read stdin, Write to stdout AND One or More Files</text>

  <!-- Input -->
  <rect x="14" y="50" width="150" height="46" rx="8" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="89" y="70" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#3fb950">Input Stream</text>
  <text x="89" y="86" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#8b949e">pipe | producer</text>

  <!-- Arrow to tee -->
  <line x1="164" y1="73" x2="230" y2="73" stroke="#3fb950" stroke-width="2.5" marker-end="url(#dp-grn)" class="dp-flow"/>

  <!-- tee box -->
  <rect x="230" y="44" width="130" height="58" rx="8" fill="#2a2a14" stroke="#ffa657" stroke-width="2.5"/>
  <text x="295" y="67" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="14" font-weight="bold" fill="#ffa657">tee</text>
  <text x="295" y="84" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">copies to N outputs</text>
  <text x="295" y="96" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#ffa657">simultaneously</text>

  <!-- Output 1: stdout (continue pipeline) -->
  <line x1="360" y1="62" x2="430" y2="50" stroke="#3fb950" stroke-width="2" marker-end="url(#dp-grn)" class="dp-flow"/>
  <rect x="430" y="36" width="180" height="38" rx="6" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.5"/>
  <text x="520" y="58" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#3fb950">stdout → next pipeline stage</text>

  <!-- Output 2: log file -->
  <line x1="360" y1="73" x2="430" y2="86" stroke="#58a6ff" stroke-width="2" marker-end="url(#dp-blu)" class="dp-flow"/>
  <rect x="430" y="72" width="180" height="38" rx="6" fill="#0e1824" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="520" y="94" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#58a6ff">pipeline.log (append)</text>

  <!-- Output 3: another file -->
  <line x1="360" y1="84" x2="430" y2="122" stroke="#bc8cff" stroke-width="2" marker-end="url(#dp-pur)"/>
  <rect x="430" y="108" width="180" height="38" rx="6" fill="#1f1428" stroke="#bc8cff" stroke-width="1.5"/>
  <text x="520" y="130" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#bc8cff">raw_copy.csv (archive)</text>

  <!-- tee -a note -->
  <rect x="14" y="128" width="200" height="42" rx="6" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="114" y="146" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" font-weight="bold" fill="#ffa657">Flags:</text>
  <text x="114" y="162" text-anchor="middle" font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950">-a = append (not overwrite)</text>

  <!-- Process substitution with tee -->
  <rect x="14" y="178" width="792" height="42" rx="6" fill="#1a1a2a" stroke="#bc8cff" stroke-width="1"/>
  <text x="26" y="196" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#bc8cff">Power pattern — tee with process substitution:</text>
  <text x="26" y="212" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">producer | tee &gt;(gzip &gt; raw.csv.gz) &gt;(wc -l &gt; count.txt) | transformer | consumer</text>
</svg>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 3 of 12 — tee: logging, archiving, fan-out, process substitution branches</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ BASIC tee ══════════════════════════════════════════════</span>
<span class="cb-prompt">$</span> cat data.csv | tee raw_backup.csv | wc -l    <span class="cb-cmt"># save copy AND count</span>
<span class="cb-prompt">$</span> pipeline.sh | tee -a pipeline.log | grep ERROR  <span class="cb-cmt"># log all, show errors</span>
<span class="cb-prompt">$</span> cmd | tee file1.txt file2.txt file3.txt      <span class="cb-cmt"># tee to multiple files</span>

<span class="cb-cmt">## ═══ tee WITH PROCESS SUBSTITUTION ═════════════════════════</span>
<span class="cb-cmt"># Fan-out: send stream to multiple processors simultaneously:</span>
<span class="cb-prompt">$</span> cat 10gb.csv | tee \
    >(gzip > /archive/raw.csv.gz) \
    >(wc -l > /metrics/row_count.txt) \
    >(grep ERROR > /logs/errors.csv) \
    | python3 transform.py
<span class="cb-cmt"># All four branches run in parallel!
# Main stream goes to transform.py
# Simultaneously: compress to archive, count rows, collect errors</span>

<span class="cb-cmt">## ═══ tee FOR PIPELINE DEBUGGING ════════════════════════════</span>
<span class="cb-cmt"># Inspect intermediate state without breaking the pipeline:</span>
<span class="cb-prompt">$</span> producer | tee /dev/stderr | consumer 2> debug.log
<span class="cb-cmt"># /dev/stderr: intermediate data visible on terminal
# (producer output shown to debug, pipeline continues)</span>

<span class="cb-cmt"># Or use a named debug file:</span>
<span class="cb-prompt">$</span> producer |
    tee >(head -5 > /tmp/debug_stage1.txt) |
    transform |
    tee >(head -5 > /tmp/debug_stage2.txt) |
    consumer

<span class="cb-cmt">## ═══ CHECKPOINT WITH tee ════════════════════════════════════</span>
<span class="cb-cmt"># Save a checkpoint so pipeline can resume if consumer fails:</span>
<span class="cb-prompt">$</span> produce_data |
    tee /tmp/checkpoint_raw.csv |
    validate |
    tee /tmp/checkpoint_validated.csv |
    transform |
    load_to_db
<span class="cb-cmt"># If load_to_db fails, re-run from checkpoint_validated.csv</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 4 — PROCESS SUBSTITUTION (ANIMATED)
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num">04</span> Process Substitution — <code>&lt;(...)</code> and <code>&gt;(...)</code></h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 240" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="240" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">Process Substitution — Command Output as a Filename</text>

  <!-- Left: input substitution -->
  <rect x="14" y="36" width="390" height="160" rx="8" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="209" y="56" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#3fb950">Input Substitution: &lt;(command)</text>

  <text x="24"  y="78" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">bash creates a named pipe /dev/fd/63</text>
  <text x="24"  y="96" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">diff &lt;(sort file1.csv) &lt;(sort file2.csv)</text>
  <text x="24" y="116" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">diff sees TWO filenames, not stdin</text>
  <text x="24" y="132" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">join &lt;(sort a.csv) &lt;(sort b.csv)</text>
  <text x="24" y="148" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">comm &lt;(sort f1) &lt;(sort f2)</span></text>
  <text x="24" y="164" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">wc -l &lt;(grep ERROR app.log)</text>
  <text x="24" y="183" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">⚡ Use when command expects a filename but you have a stream</text>

  <!-- Right: output substitution -->
  <rect x="416" y="36" width="390" height="160" rx="8" fill="#0e1824" stroke="#58a6ff" stroke-width="2"/>
  <text x="611" y="56" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#58a6ff">Output Substitution: &gt;(command)</text>

  <text x="426" y="78" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">bash creates a named pipe /dev/fd/63</text>
  <text x="426" y="96" font-family="'Courier New',monospace" font-size="10" fill="#58a6ff">tee &gt;(gzip &gt; archive.gz) &gt;(wc -l)</text>
  <text x="426" y="116" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">writes go TO the substituted command</text>
  <text x="426" y="132" font-family="'Courier New',monospace" font-size="10" fill="#58a6ff">cmd 1&gt; &gt;(ts &gt;&gt; run.log)</span></text>
  <text x="426" y="148" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">stdout redirected to command input</text>
  <text x="426" y="164" font-family="'Courier New',monospace" font-size="10" fill="#58a6ff">producer | tee &gt;(filter1) &gt;(filter2)</text>
  <text x="426" y="183" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">⚡ Use for fan-out — send stream to multiple consumers</text>

  <!-- Comparison row -->
  <rect x="14" y="204" width="792" height="30" rx="5" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="26" y="222" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">Key difference from pipes: </text>
  <text x="196" y="222" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">process substitution passes a FILENAME. Regular pipes connect via stdin/stdout. Use &lt;() when command needs a seekable file (diff, join, sort -m).</text>
</svg>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 4 of 12 — Process substitution: diff, join, comm, multi-output, logging</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ INPUT SUBSTITUTION — &lt;(cmd) ════════════════════════════</span>
<span class="cb-cmt"># Compare sorted versions without temp files:</span>
<span class="cb-prompt">$</span> diff <(sort file1.csv) <(sort file2.csv)

<span class="cb-cmt"># Join two CSVs on sorted key (join requires sorted input):</span>
<span class="cb-prompt">$</span> join -t, -1 1 -2 1 <(sort -t, -k1 sales.csv) <(sort -t, -k1 regions.csv)

<span class="cb-cmt"># Find lines in file1 NOT in file2 (comm -23):</span>
<span class="cb-prompt">$</span> comm -23 <(sort file1.txt) <(sort file2.txt)

<span class="cb-cmt"># Merge-sort multiple sorted files:</span>
<span class="cb-prompt">$</span> sort -m <(sort chunk1.csv) <(sort chunk2.csv) <(sort chunk3.csv)

<span class="cb-cmt"># Word count on command output:</span>
<span class="cb-prompt">$</span> wc -l <(grep -r "TODO" /opt/app)

<span class="cb-cmt">## ═══ OUTPUT SUBSTITUTION — &gt;(cmd) ═══════════════════════════</span>
<span class="cb-cmt"># Log with timestamps while passing through:</span>
<span class="cb-prompt">$</span> producer | tee >(ts '%Y-%m-%d %H:%M:%S' >> pipeline.log) | consumer

<span class="cb-cmt"># Fan-out: simultaneously compress, validate, and load:</span>
<span class="cb-prompt">$</span> cat raw.csv |
    tee >(gzip > /archive/raw.csv.gz) \
        >(python3 validate.py > /logs/validation.txt) \
    | python3 transform.py \
    | tee >(wc -l > /metrics/output_rows.txt) \
    | psql -d db -c "COPY output FROM STDIN (FORMAT csv)"

<span class="cb-cmt"># Redirect stdout with timestamp logging:</span>
<span class="cb-prompt">$</span> { long_running_command; } 1> >(ts '%H:%M:%S' | tee run.log)

<span class="cb-cmt">## ═══ COMBINING BOTH ═════════════════════════════════════════</span>
<span class="cb-cmt"># Compare today's report with yesterday's:</span>
<span class="cb-prompt">$</span> diff \
    <(generate_report 2024-01-14 | sort) \
    <(generate_report 2024-01-15 | sort)

<span class="cb-cmt"># Three-way diff:</span>
<span class="cb-prompt">$</span> diff3 \
    <(awk -F, '{print $1,$3}' file1.csv | sort) \
    <(awk -F, '{print $1,$3}' file2.csv | sort) \
    <(awk -F, '{print $1,$3}' file3.csv | sort)
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 5 — NAMED PIPES (FIFOs) ANIMATED
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num">05</span> Named Pipes (FIFOs) — Persistent Pipeline Connectors</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 230" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="230" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">Named Pipe (FIFO) — A Pipe with a Filesystem Name</text>

  <!-- Regular pipe -->
  <rect x="14" y="38" width="380" height="78" rx="8" fill="#161b22" stroke="#30363d" stroke-width="1.5"/>
  <text x="204" y="58" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#8b949e">Anonymous Pipe (|)</text>
  <text x="24"  y="76" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">• Only between related processes</text>
  <text x="24"  y="93" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">• Both ends must be open simultaneously</text>
  <text x="24" y="110" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">• Lives only as long as the processes</text>

  <!-- Named pipe -->
  <rect x="426" y="38" width="380" height="78" rx="8" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="616" y="58" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#3fb950">Named Pipe / FIFO (mkfifo)</text>
  <text x="436" y="76" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">• Appears in filesystem: ls shows it with p</text>
  <text x="436" y="93" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">• Any process can open by name</text>
  <text x="436" y="110" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#3fb950">• Survives until deleted (rm myfifo)</text>

  <!-- Lifecycle diagram -->
  <rect x="14" y="126" width="792" height="94" rx="8" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="410" y="146" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">Named Pipe Lifecycle:</text>

  <rect x="26"  y="154" width="140" height="54" rx="6" fill="#1f1428" stroke="#bc8cff" stroke-width="1.5"/>
  <text x="96"  y="174" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#bc8cff">mkfifo mypipe</text>
  <text x="96"  y="190" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">creates FIFO on disk</text>
  <text x="96"  y="202" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#bc8cff">prw-r--r-- mypipe</text>

  <line x1="166" y1="181" x2="204" y2="181" stroke="#ffa657" stroke-width="2" marker-end="url(#dp-orn)" class="dp-flow"/>

  <rect x="204" y="154" width="170" height="54" rx="6" fill="#2a2a14" stroke="#ffa657" stroke-width="1.5"/>
  <text x="289" y="174" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">producer > mypipe &amp;</text>
  <text x="289" y="190" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">blocks until reader</text>
  <text x="289" y="202" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#ffa657">opens the other end</text>

  <line x1="374" y1="181" x2="412" y2="181" stroke="#ffa657" stroke-width="2" marker-end="url(#dp-orn)" class="dp-flow"/>

  <rect x="412" y="154" width="170" height="54" rx="6" fill="#0e1824" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="497" y="174" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#58a6ff">consumer &lt; mypipe</text>
  <text x="497" y="190" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">data flows through</text>
  <text x="497" y="202" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#3fb950">pipe is now active</text>

  <line x1="582" y1="181" x2="620" y2="181" stroke="#3fb950" stroke-width="2" marker-end="url(#dp-grn)"/>

  <rect x="620" y="154" width="170" height="54" rx="6" fill="#2a1a14" stroke="#f85149" stroke-width="1.5"/>
  <text x="705" y="174" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#f85149">rm mypipe</text>
  <text x="705" y="190" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">removes FIFO entry</text>
  <text x="705" y="202" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#8b949e">running procs unaffected</text>
</svg>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 5 of 12 — Named pipes: mkfifo, producer-consumer, semaphore pattern</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ BASIC NAMED PIPE ═══════════════════════════════════════</span>
<span class="cb-prompt">$</span> mkfifo /tmp/mypipe              <span class="cb-cmt"># create named pipe</span>
<span class="cb-prompt">$</span> ls -la /tmp/mypipe
<span class="cb-out">prw-r--r-- 1 ravi ravi 0 Jan 15 /tmp/mypipe  ← 'p' = pipe</span>

<span class="cb-cmt"># Terminal 1 (producer — blocks until reader opens):</span>
<span class="cb-prompt">$</span> gzip -dc huge_file.csv.gz > /tmp/mypipe &amp;

<span class="cb-cmt"># Terminal 2 (consumer):</span>
<span class="cb-prompt">$</span> python3 process.py < /tmp/mypipe
<span class="cb-prompt">$</span> rm /tmp/mypipe                   <span class="cb-cmt"># clean up when done</span>

<span class="cb-cmt">## ═══ PARALLEL PRODUCER → CONSUMERS ═════════════════════════</span>
<span class="cb-out">#!/bin/bash</span>
<span class="cb-out">PIPE=$(mktemp -u)                  # unique temp name (no file yet)</span>
<span class="cb-out">mkfifo "$PIPE"</span>
<span class="cb-out">trap "rm -f '$PIPE'" EXIT          # always clean up</span>
<span class="cb-out"></span>
<span class="cb-out"># Start producer in background (blocks on pipe):</span>
<span class="cb-out">generate_data | gzip > "$PIPE" &amp;</span>
<span class="cb-out">PROD_PID=$!</span>
<span class="cb-out"></span>
<span class="cb-out"># Consumer reads from pipe:</span>
<span class="cb-out">gzip -dc "$PIPE" | python3 process.py</span>
<span class="cb-out">wait $PROD_PID</span>

<span class="cb-cmt">## ═══ SEMAPHORE WITH NAMED PIPE ══════════════════════════════</span>
<span class="cb-cmt"># Classic parallel limiting pattern using FIFO as token pool:</span>
<span class="cb-out">#!/bin/bash</span>
<span class="cb-out">MAX_PARALLEL=4</span>
<span class="cb-out">SEMAPHORE=$(mktemp -u); mkfifo "$SEMAPHORE"</span>
<span class="cb-out">trap "rm -f '$SEMAPHORE'" EXIT</span>
<span class="cb-out">exec 9<>"$SEMAPHORE"               # open FIFO read-write on fd 9</span>
<span class="cb-out"></span>
<span class="cb-out"># Fill with N tokens:</span>
<span class="cb-out">for _ in $(seq 1 $MAX_PARALLEL); do echo >&9; done</span>
<span class="cb-out"></span>
<span class="cb-out">process_file() {</span>
<span class="cb-out">    read -u 9                      # acquire token (blocks if empty)</span>
<span class="cb-out">    {</span>
<span class="cb-out">        python3 process.py "$1"</span>
<span class="cb-out">        echo >&9                   # release token when done</span>
<span class="cb-out">    } &amp;</span>
<span class="cb-out">}</span>
<span class="cb-out"></span>
<span class="cb-out">for FILE in /data/chunk_*.csv; do</span>
<span class="cb-out">    process_file "$FILE"</span>
<span class="cb-out">done</span>
<span class="cb-out">wait</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 6 — ERROR HANDLING IN PIPELINES
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num">06</span> Error Handling — <code>set -euo pipefail</code>, PIPESTATUS, Traps</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 220" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="220" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">Pipeline Error Handling — What Each Option Does</text>

  <!-- set -e -->
  <rect x="14"  y="36" width="188" height="90" rx="7" fill="#2a1a14" stroke="#f85149" stroke-width="2"/>
  <text x="108" y="56" text-anchor="middle" font-family="'Courier New',monospace" font-size="12" font-weight="bold" fill="#f85149">set -e</text>
  <text x="108" y="72" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">Exit immediately if any</text>
  <text x="108" y="88" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">command returns non-zero</text>
  <text x="108" y="106" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">Does NOT catch pipe failures!</text>
  <text x="108" y="120" text-anchor="middle" font-family="'Courier New',monospace" font-size="8.5" fill="#f85149">errtrace / errexit</text>

  <!-- set -u -->
  <rect x="214" y="36" width="188" height="90" rx="7" fill="#2a1a14" stroke="#f85149" stroke-width="2"/>
  <text x="308" y="56" text-anchor="middle" font-family="'Courier New',monospace" font-size="12" font-weight="bold" fill="#f85149">set -u</text>
  <text x="308" y="72" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">Treat unset variables</text>
  <text x="308" y="88" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">as errors</text>
  <text x="308" y="106" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">$VAR_MISSING → exit 1</text>
  <text x="308" y="120" text-anchor="middle" font-family="'Courier New',monospace" font-size="8.5" fill="#f85149">nounset</text>

  <!-- set -o pipefail -->
  <rect x="414" y="36" width="202" height="90" rx="7" fill="#1a2a1a" stroke="#3fb950" stroke-width="2.5"/>
  <text x="515" y="56" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" font-weight="bold" fill="#3fb950">set -o pipefail</text>
  <text x="515" y="72" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">Pipeline fails if ANY</text>
  <text x="515" y="88" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">stage returns non-zero</text>
  <text x="515" y="106" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">$? = rightmost failure</text>
  <text x="515" y="120" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">ESSENTIAL for pipelines!</text>

  <!-- set -E -->
  <rect x="628" y="36" width="178" height="90" rx="7" fill="#0e1824" stroke="#58a6ff" stroke-width="2"/>
  <text x="717" y="56" text-anchor="middle" font-family="'Courier New',monospace" font-size="12" font-weight="bold" fill="#58a6ff">set -E</text>
  <text x="717" y="72" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">ERR trap inherited by</text>
  <text x="717" y="88" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">functions and subshells</text>
  <text x="717" y="106" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">Use with trap ERR</text>
  <text x="717" y="120" text-anchor="middle" font-family="'Courier New',monospace" font-size="8.5" fill="#58a6ff">errtrace</text>

  <!-- PIPESTATUS diagram -->
  <rect x="14" y="136" width="792" height="76" rx="6" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="26" y="154" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">PIPESTATUS — Know which stage failed:</text>
  <text x="26" y="172" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">produce | validate | transform | load</text>
  <text x="26" y="190" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">PIPE=("\${PIPESTATUS[@]}")</text>
  <text x="26" y="206" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3"># PIPE[0]=produce_exit  PIPE[1]=validate_exit  PIPE[2]=transform_exit  PIPE[3]=load_exit</text>
</svg>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 6 of 12 — Error handling: set -euo pipefail, trap, PIPESTATUS, retry</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ THE ESSENTIAL PIPELINE HEADER ══════════════════════════</span>
<span class="cb-out">#!/usr/bin/env bash</span>
<span class="cb-out">set -euo pipefail</span>
<span class="cb-out">IFS=$'\n\t'                  # safer word splitting</span>

<span class="cb-cmt">## ═══ COMPLETE ERROR HANDLER PATTERN ═════════════════════════</span>
<span class="cb-out">#!/usr/bin/env bash</span>
<span class="cb-out">set -Eeuo pipefail</span>
<span class="cb-out">SCRIPT_DIR="$(cd "$(dirname "\${BASH_SOURCE[0]}")" && pwd)"</span>
<span class="cb-out">LOGFILE="/var/log/pipeline/$(date +%Y%m%d_%H%M%S).log"</span>
<span class="cb-out">TMPDIR=$(mktemp -d)</span>
<span class="cb-out">trap 'cleanup $?' EXIT</span>
<span class="cb-out">trap 'echo "ERROR at line $LINENO: $BASH_COMMAND" >&2' ERR</span>
<span class="cb-out"></span>
<span class="cb-out">cleanup() {</span>
<span class="cb-out">    local EXIT_CODE="$1"</span>
<span class="cb-out">    echo "=== Cleanup (exit: $EXIT_CODE) ===" | tee -a "$LOGFILE"</span>
<span class="cb-out">    rm -rf "$TMPDIR"</span>
<span class="cb-out">    [[ $EXIT_CODE -ne 0 ]] && alert_slack "PIPELINE FAILED (exit $EXIT_CODE)"</span>
<span class="cb-out">    exit "$EXIT_CODE"</span>
<span class="cb-out">}</span>

<span class="cb-cmt">## ═══ PIPESTATUS — CHECK WHICH STAGE FAILED ═══════════════════</span>
<span class="cb-out">produce_data | validate | transform | psql -d db -c "COPY t FROM STDIN"</span>
<span class="cb-out">PIPE=("\${PIPESTATUS[@]}")</span>
<span class="cb-out">STAGES=(produce validate transform load)</span>
<span class="cb-out">FAILED=0</span>
<span class="cb-out">for i in "\${!PIPE[@]}"; do</span>
<span class="cb-out">    if (( PIPE[i] != 0 )); then</span>
<span class="cb-out">        echo "Stage '\${STAGES[i]}' FAILED (exit \${PIPE[i]})" >&2</span>
<span class="cb-out">        (( FAILED++ ))</span>
<span class="cb-out">    fi</span>
<span class="cb-out">done</span>
<span class="cb-out">(( FAILED > 0 )) && exit 1</span>

<span class="cb-cmt">## ═══ RETRY WITH BACKOFF ══════════════════════════════════════</span>
<span class="cb-out">retry() {</span>
<span class="cb-out">    local MAX="\${1:-3}" WAIT="\${2:-5}"</span>
<span class="cb-out">    shift 2</span>
<span class="cb-out">    local ATTEMPT=0</span>
<span class="cb-out">    until "$@"; do</span>
<span class="cb-out">        (( ++ATTEMPT >= MAX )) && { echo "Max retries ($MAX) exceeded" >&2; return 1; }</span>
<span class="cb-out">        echo "Retry $ATTEMPT/$MAX in \${WAIT}s..." >&2</span>
<span class="cb-out">        sleep "$WAIT"</span>
<span class="cb-out">        (( WAIT = WAIT * 2 < 60 ? WAIT * 2 : 60 ))  # exponential backoff</span>
<span class="cb-out">    done</span>
<span class="cb-out">}</span>
<span class="cb-out">retry 5 10 curl -f "https://api.example.com/data" > data.json</span>

<span class="cb-cmt">## ═══ IGNORE PIPEFAIL SELECTIVELY ════════════════════════════</span>
<span class="cb-cmt"># head will cause SIGPIPE when it gets enough — that's OK:</span>
<span class="cb-out">{ produce_huge_stream || true; } | head -1000 | process</span>
<span class="cb-cmt"># Or: use a subshell to isolate pipefail behaviour:</span>
<span class="cb-out">result=$(set +o pipefail; produce | head -100)</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 7 — xargs AND parallel: PARALLEL PIPELINES
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num">07</span> xargs &amp; GNU parallel — Parallelising Pipeline Stages</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 230" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="230" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">Parallel Pipeline — N Workers Processing Data Simultaneously</text>

  <!-- Input queue -->
  <rect x="14" y="40" width="130" height="140" rx="7" fill="#0e1824" stroke="#58a6ff" stroke-width="2"/>
  <text x="79" y="62" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#58a6ff">Input Queue</text>
  <text x="79" y="78" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#8b949e">chunk_01.csv</text>
  <text x="79" y="94" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#8b949e">chunk_02.csv</text>
  <text x="79" y="110" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#8b949e">chunk_03.csv</text>
  <text x="79" y="126" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#8b949e">chunk_04.csv</text>
  <text x="79" y="142" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#30363d">chunk_05.csv</text>
  <text x="79" y="158" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#30363d">chunk_06.csv</text>
  <text x="79" y="174" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#58a6ff">waiting...</text>

  <!-- Dispatcher -->
  <line x1="144" y1="110" x2="182" y2="80" stroke="#ffa657" stroke-width="2" marker-end="url(#dp-orn)" class="dp-flow"/>
  <line x1="144" y1="110" x2="182" y2="110" stroke="#ffa657" stroke-width="2" marker-end="url(#dp-orn)" class="dp-flow"/>
  <line x1="144" y1="110" x2="182" y2="140" stroke="#ffa657" stroke-width="2" marker-end="url(#dp-orn)" class="dp-flow"/>
  <line x1="144" y1="110" x2="182" y2="170" stroke="#ffa657" stroke-width="2" marker-end="url(#dp-orn)" class="dp-flow"/>

  <!-- 4 workers -->
  <rect x="182" y="54" width="200" height="42" rx="6" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.8" class="dp-blink"/>
  <text x="282" y="73" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#3fb950">Worker 1: chunk_01.csv</text>
  <text x="282" y="88" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#8b949e">python3 process.py</text>

  <rect x="182" y="104" width="200" height="42" rx="6" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.8" class="dp-blink"/>
  <text x="282" y="123" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#3fb950">Worker 2: chunk_02.csv</text>
  <text x="282" y="138" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#8b949e">python3 process.py</text>

  <rect x="182" y="154" width="200" height="42" rx="6" fill="#0e1824" stroke="#58a6ff" stroke-width="1.8"/>
  <text x="282" y="173" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#58a6ff">Worker 3: chunk_03.csv</text>
  <text x="282" y="188" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#8b949e">python3 process.py</text>

  <!-- Output collection -->
  <line x1="382" y1="76"  x2="440" y2="110" stroke="#3fb950" stroke-width="2" marker-end="url(#dp-grn)"/>
  <line x1="382" y1="126" x2="440" y2="116" stroke="#3fb950" stroke-width="2" marker-end="url(#dp-grn)"/>
  <line x1="382" y1="176" x2="440" y2="124" stroke="#58a6ff" stroke-width="2" marker-end="url(#dp-blu)"/>

  <rect x="440" y="72" width="200" height="80" rx="7" fill="#1f1428" stroke="#bc8cff" stroke-width="2"/>
  <text x="540" y="95" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#bc8cff">Output Merge</text>
  <text x="540" y="113" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">results collected</text>
  <text x="540" y="129" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#bc8cff">--results / cat</text>
  <text x="540" y="145" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">in order or as ready</text>

  <!-- Stats -->
  <rect x="656" y="40" width="150" height="140" rx="7" fill="#161b22" stroke="#30363d" stroke-width="1.5"/>
  <text x="731" y="60" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">Performance</text>
  <text x="731" y="80" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Sequential:</text>
  <text x="731" y="96" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#f85149">6 × 10min = 60min</text>
  <text x="731" y="118" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">3 Workers (parallel):</text>
  <text x="731" y="134" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#3fb950">≈ 20min (3× faster)</text>
  <text x="731" y="156" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">nproc workers =</text>
  <text x="731" y="170" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">maximum CPU use</text>

  <rect x="14" y="192" width="792" height="28" rx="5" fill="#1a1a2a" stroke="#bc8cff" stroke-width="1"/>
  <text x="26" y="208" font-family="'Segoe UI',sans-serif" font-size="9.5" font-weight="bold" fill="#bc8cff">Tools: </text>
  <text x="72" y="208" font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950">xargs -P N</text><text x="138" y="208" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> (N parallel workers, simple)  </text>
  <text x="306" y="208" font-family="'Courier New',monospace" font-size="9.5" fill="#ffa657">parallel -j N</text><text x="384" y="208" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> (GNU parallel, advanced: progress, retry, throttle, ETA)</text>
</svg>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 7 of 12 — xargs -P, GNU parallel: patterns, throttle, ETA, retry</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ xargs -P — SIMPLE PARALLEL ════════════════════════════</span>
<span class="cb-prompt">$</span> ls /data/chunk_*.csv | xargs -P "$(nproc)" -I{} python3 process.py {}
<span class="cb-cmt"># -P nproc = use all CPU cores
# -I{} = placeholder for each argument</span>

<span class="cb-prompt">$</span> find /data -name "*.csv" | xargs -P 4 -n 1 process_file.sh
<span class="cb-cmt"># -n 1 = one argument per invocation</span>

<span class="cb-cmt"># With null-delimited files (handle filenames with spaces):</span>
<span class="cb-prompt">$</span> find /data -name "*.csv" -print0 | xargs -0 -P 4 -I{} python3 process.py {}

<span class="cb-cmt">## ═══ GNU parallel — FULL-FEATURED ══════════════════════════</span>
<span class="cb-prompt">$</span> parallel -j "$(nproc)" python3 process.py {} ::: /data/chunk_*.csv
<span class="cb-cmt"># ::: = input sources  --jobs/-j = parallelism</span>

<span class="cb-cmt"># With progress bar and ETA:</span>
<span class="cb-prompt">$</span> ls /data/chunk_*.csv |
  parallel --bar --eta -j 4 python3 process.py {}
<span class="cb-out">43% 172:00 ETA 00:12 [==========>          ] 43/100</span>

<span class="cb-cmt"># Retry failed jobs (up to 3 times):</span>
<span class="cb-prompt">$</span> parallel --retries 3 -j 4 process.sh {} ::: /data/*.csv

<span class="cb-cmt"># Keep output in order (collate results):</span>
<span class="cb-prompt">$</span> parallel --keep-order -j 4 process.sh {} ::: /data/*.csv > output.csv

<span class="cb-cmt"># Throttle input rate (max 10 jobs/s):</span>
<span class="cb-prompt">$</span> parallel --delay 0.1 -j 4 curl {} ::: "\${URLS[@]}"

<span class="cb-cmt"># Log results to file, show progress:</span>
<span class="cb-prompt">$</span> parallel --results /tmp/job_results/ -j 4 process.sh {} ::: /data/*.csv
<span class="cb-cmt"># Creates /tmp/job_results/1/, /tmp/job_results/2/ etc with stdout/stderr</span>

<span class="cb-cmt">## ═══ PARALLEL PIPELINE WITH MERGE ═══════════════════════════</span>
<span class="cb-cmt"># Process chunks in parallel, merge results:</span>
<span class="cb-out">#!/bin/bash</span>
<span class="cb-out">OUTDIR=$(mktemp -d)</span>
<span class="cb-out">trap "rm -rf '$OUTDIR'" EXIT</span>
<span class="cb-out"></span>
<span class="cb-out"># Step 1: parallel processing</span>
<span class="cb-out">ls /data/chunk_*.csv | parallel -j "$(nproc)" \
    'python3 process.py {} > '"$OUTDIR"'/{/.}.result.csv'</span>
<span class="cb-out"></span>
<span class="cb-out"># Step 2: merge results</span>
<span class="cb-out">head -1 "$OUTDIR"/$(ls "$OUTDIR" | head -1) > output.csv  # header</span>
<span class="cb-out">for f in "$OUTDIR"/*.result.csv; do tail -n +2 "$f"; done | sort -t, -k1 >> output.csv</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 8 — pv: PIPELINE PROGRESS MONITORING
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num">08</span> <code>pv</code> — Pipeline Progress Monitoring</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 180" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="180" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">pv — Pipe Viewer: Rate, Progress, and ETA for Any Pipeline</text>

  <!-- pv output simulation -->
  <rect x="14" y="34" width="792" height="34" rx="6" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.5"/>
  <text x="26"  y="56" font-family="'Courier New',monospace" font-size="12" fill="#e6edf3">4.23GiB 0:01:12 [</text>
  <text x="216" y="56" font-family="'Courier New',monospace" font-size="12" fill="#3fb950">60.0MiB/s</text>
  <text x="318" y="56" font-family="'Courier New',monospace" font-size="12" fill="#e6edf3">] [</text>
  <rect x="338" y="44" width="200" height="14" rx="3" fill="#30363d"/>
  <rect x="338" y="44" width="160" height="14" rx="3" fill="#3fb950" class="dp-pulse"/>
  <text x="338" y="56" font-family="'Courier New',monospace" font-size="11" fill="#0d1117" font-weight="bold">==========&gt;</text>
  <text x="550" y="56" font-family="'Courier New',monospace" font-size="12" fill="#e6edf3">] </text>
  <text x="564" y="56" font-family="'Courier New',monospace" font-size="12" fill="#ffa657">82%</text>
  <text x="600" y="56" font-family="'Courier New',monospace" font-size="12" fill="#e6edf3"> ETA </text>
  <text x="640" y="56" font-family="'Courier New',monospace" font-size="12" fill="#58a6ff">0:00:15</text>

  <!-- Column labels -->
  <text x="118" y="82" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">bytes transferred</text>
  <text x="220" y="82" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">elapsed time</text>
  <text x="330" y="82" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#3fb950">throughput rate</text>
  <text x="440" y="82" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#3fb950">progress bar</text>
  <text x="565" y="82" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#ffa657">percent done</text>
  <text x="665" y="82" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#58a6ff">ETA</text>

  <!-- pv flags reference -->
  <rect x="14" y="96" width="792" height="76" rx="6" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="26" y="114" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">Key pv flags:</text>
  <text x="120" y="114" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">-s SIZE</text><text x="175" y="114" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> set expected size (enables %) </text>
  <text x="390" y="114" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">-l</text><text x="406" y="114" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> count lines instead of bytes </text>
  <text x="600" y="114" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">-n</text><text x="616" y="114" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> numeric output (for dialog)</text>
  <text x="120" y="132" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">-L RATE</text><text x="183" y="132" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> throttle to max rate (bytes/s) </text>
  <text x="390" y="132" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">-W</text><text x="406" y="132" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> wait for first byte </text>
  <text x="560" y="132" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">-N NAME</text><text x="620" y="132" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> label this pv stage</text>
  <text x="26" y="164" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">pv is transparent — passes all bytes through unchanged. Drop it anywhere in a pipeline for instant progress monitoring.</text>
</svg>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 8 of 12 — pv: progress, rate-limiting, multi-stage, line counting</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ BASIC pv USAGE ════════════════════════════════════════</span>
<span class="cb-prompt">$</span> pv huge_file.csv | python3 process.py           <span class="cb-cmt"># add progress to any pipe</span>
<span class="cb-prompt">$</span> pv -s $(wc -c < huge_file.csv) < huge_file.csv | gzip > out.gz
<span class="cb-cmt"># -s: provide expected size → enables % and ETA</span>

<span class="cb-prompt">$</span> pv -l data.csv | awk '...' | pv -l > output.csv
<span class="cb-cmt"># -l: count LINES. Show lines/second throughput.</span>

<span class="cb-cmt">## ═══ RATE LIMITING ═══════════════════════════════════════════</span>
<span class="cb-cmt"># Don't overwhelm an API or database — limit to 10 MB/s:</span>
<span class="cb-prompt">$</span> pv -L 10M data.csv | python3 loader.py
<span class="cb-cmt"># Limit to 1000 lines/s:</span>
<span class="cb-prompt">$</span> pv -l -L 1000 requests.txt | xargs -I{} curl {}

<span class="cb-cmt">## ═══ MULTI-STAGE MONITORING ═════════════════════════════════</span>
<span class="cb-prompt">$</span> pv -N "read" data.csv |
    pv -N "decompress" -l |
    python3 transform.py |
    pv -N "load" -l |
    psql -d db -c "COPY t FROM STDIN (FORMAT csv)"
<span class="cb-cmt"># -N NAME labels each pv stage for clarity:
# read:       4.23GiB 0:01:12 [60.0MiB/s]
# decompress: 12.5M rows 0:01:12 [180k rows/s]
# load:        8.2M rows 0:01:12 [118k rows/s]</span>

<span class="cb-cmt">## ═══ pv IN SCRIPTS (with progress bar) ══════════════════════</span>
<span class="cb-out">#!/bin/bash</span>
<span class="cb-out">FILE="$1"</span>
<span class="cb-out">SIZE=$(stat -c %s "$FILE")</span>
<span class="cb-out">echo "Processing $FILE ($(numfmt --to=iec $SIZE))..."</span>
<span class="cb-out">pv -s "$SIZE" "$FILE" |</span>
<span class="cb-out">    gzip -dc |</span>
<span class="cb-out">    python3 /opt/etl/process.py --date "$(date +%Y-%m-%d)" |</span>
<span class="cb-out">    pv -l -N "load" |</span>
<span class="cb-out">    psql -d analytics -c "COPY staging.events FROM STDIN (FORMAT csv, HEADER)"</span>

<span class="cb-cmt">## ═══ MONITOR PROGRESS OF RUNNING PROCESS ════════════════════</span>
<span class="cb-cmt"># Attach pv to a running process via its /proc/PID/fd:</span>
<span class="cb-prompt">$</span> PID=$(pgrep -n python3)
<span class="cb-prompt">$</span> lsof -p $PID | grep data.csv    <span class="cb-cmt"># find which FD is the input file</span>
<span class="cb-prompt">$</span> pv -d $PID                       <span class="cb-cmt"># watch all FDs of that process</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 9 — CHECKPOINT AND RESUME
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num">09</span> Checkpoint &amp; Resume — Fault-Tolerant Pipelines</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 220" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="220" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">Checkpoint Pattern — Resume from Last Successful Stage</text>

  <!-- Pipeline stages with checkpoints -->
  <rect x="14"  y="40" width="130" height="50" rx="7" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.8"/>
  <text x="79"  y="62" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#3fb950">1. Ingest</text>
  <text x="79"  y="78" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">download + decompress</text>

  <line x1="144" y1="65" x2="180" y2="65" stroke="#ffa657" stroke-width="2" marker-end="url(#dp-orn)" class="dp-flow"/>

  <rect x="180" y="52" width="120" height="26" rx="5" fill="#2a2a14" stroke="#ffa657" stroke-width="1.5"/>
  <text x="240" y="69" text-anchor="middle" font-family="'Courier New',monospace" font-size="9.5" fill="#ffa657">📌 checkpoint_raw/</text>

  <line x1="300" y1="65" x2="336" y2="65" stroke="#ffa657" stroke-width="2" marker-end="url(#dp-orn)" class="dp-flow"/>

  <rect x="336" y="40" width="130" height="50" rx="7" fill="#0e1824" stroke="#58a6ff" stroke-width="1.8"/>
  <text x="401" y="62" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#58a6ff">2. Validate</text>
  <text x="401" y="78" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">schema + quality</text>

  <line x1="466" y1="65" x2="502" y2="65" stroke="#ffa657" stroke-width="2" marker-end="url(#dp-orn)" class="dp-flow"/>

  <rect x="502" y="52" width="130" height="26" rx="5" fill="#2a2a14" stroke="#ffa657" stroke-width="1.5"/>
  <text x="567" y="69" text-anchor="middle" font-family="'Courier New',monospace" font-size="9.5" fill="#ffa657">📌 checkpoint_validated/</text>

  <line x1="632" y1="65" x2="668" y2="65" stroke="#ffa657" stroke-width="2" marker-end="url(#dp-orn)" class="dp-flow"/>

  <rect x="668" y="40" width="138" height="50" rx="7" fill="#1f1428" stroke="#bc8cff" stroke-width="1.8"/>
  <text x="737" y="62" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#bc8cff">3. Transform</text>
  <text x="737" y="78" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">enrich + aggregate</text>

  <!-- Failure at transform -->
  <rect x="668" y="100" width="138" height="30" rx="5" fill="#2a1a14" stroke="#f85149" stroke-width="2" class="dp-blink"/>
  <text x="737" y="119" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#f85149">⚠ FAILURE at 3</text>

  <!-- Resume arrow -->
  <path d="M567,78 Q567,120 668,115" fill="none" stroke="#3fb950" stroke-width="2" stroke-dasharray="6,3" marker-end="url(#dp-grn)"/>
  <text x="610" y="130" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#3fb950">Resume from</text>
  <text x="610" y="144" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#3fb950">checkpoint!</text>

  <!-- Skip re-work arrows -->
  <path d="M79,90 Q79,170 401,170 Q401,95 401,90" fill="none" stroke="#30363d" stroke-width="1.5" stroke-dasharray="5,3"/>
  <text x="240" y="185" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#30363d">stages 1-2 skipped (already done)</text>

  <!-- State file -->
  <rect x="14" y="190" width="792" height="22" rx="4" fill="#1a1a2a" stroke="#bc8cff" stroke-width="1"/>
  <text x="26" y="206" font-family="'Segoe UI',sans-serif" font-size="9.5" font-weight="bold" fill="#bc8cff">State tracking: </text>
  <text x="120" y="206" font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950">echo "3" > .pipeline_state</text>
  <text x="290" y="206" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> — persist which stage completed. On next run: read state, skip completed stages.</text>
</svg>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 9 of 12 — Checkpoint/resume pattern, state files, idempotent stages</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ CHECKPOINT / RESUME PATTERN ════════════════════════════</span>
<span class="cb-out">#!/usr/bin/env bash</span>
<span class="cb-out">set -euo pipefail</span>
<span class="cb-out">DATE="\${1:-$(date +%Y-%m-%d)}"</span>
<span class="cb-out">WORKDIR="/data/pipeline/$DATE"</span>
<span class="cb-out">STATEFILE="$WORKDIR/.state"</span>
<span class="cb-out">mkdir -p "$WORKDIR"</span>
<span class="cb-out"></span>
<span class="cb-out">current_stage() { cat "$STATEFILE" 2>/dev/null || echo "0"; }</span>
<span class="cb-out">mark_done()     { echo "$1" > "$STATEFILE"; }</span>
<span class="cb-out"></span>
<span class="cb-out">run_stage() {</span>
<span class="cb-out">    local STAGE_NUM="$1" STAGE_NAME="$2"</span>
<span class="cb-out">    shift 2</span>
<span class="cb-out">    if [[ $(current_stage) -ge $STAGE_NUM ]]; then</span>
<span class="cb-out">        echo "Skipping stage $STAGE_NUM ($STAGE_NAME) — already done"</span>
<span class="cb-out">        return 0</span>
<span class="cb-out">    fi</span>
<span class="cb-out">    echo "=== Stage $STAGE_NUM: $STAGE_NAME ==="</span>
<span class="cb-out">    "$@"                              # run the stage command(s)</span>
<span class="cb-out">    mark_done "$STAGE_NUM"</span>
<span class="cb-out">    echo "Stage $STAGE_NUM done ✓"</span>
<span class="cb-out">}</span>
<span class="cb-out"></span>
<span class="cb-out">run_stage 1 "ingest" \</span>
<span class="cb-out">    bash -c "curl -sf 'https://api.example.com/data?date=$DATE' |</span>
<span class="cb-out">             pv | gzip > '$WORKDIR/raw.csv.gz'"</span>
<span class="cb-out"></span>
<span class="cb-out">run_stage 2 "validate" \</span>
<span class="cb-out">    python3 validate.py "$WORKDIR/raw.csv.gz" "$WORKDIR/validated.csv"</span>
<span class="cb-out"></span>
<span class="cb-out">run_stage 3 "transform" \</span>
<span class="cb-out">    python3 transform.py "$WORKDIR/validated.csv" "$WORKDIR/transformed.csv"</span>
<span class="cb-out"></span>
<span class="cb-out">run_stage 4 "load" \</span>
<span class="cb-out">    bash -c "pv '$WORKDIR/transformed.csv' |</span>
<span class="cb-out">             psql -d analytics -c 'COPY events FROM STDIN (FORMAT csv, HEADER)'"</span>
<span class="cb-out"></span>
<span class="cb-out">rm -f "$STATEFILE"                # clean state when fully done</span>
<span class="cb-out">echo "Pipeline complete for $DATE"</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 10 — COMPLETE ETL PIPELINE (ANIMATED)
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num">10</span> Complete ETL Pipeline — Production Architecture</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 300" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 20px;">
  <rect width="820" height="300" fill="#0d1117" rx="12"/>
  <text x="410" y="24" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="13" font-weight="bold" fill="#8b949e">Production ETL Architecture — Streaming Shell Pipeline</text>

  <!-- Stage 1: Extract -->
  <rect x="14" y="44" width="130" height="70" rx="8" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="79" y="66" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#3fb950">① EXTRACT</text>
  <text x="79" y="82" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#8b949e">curl / sftp</text>
  <text x="79" y="96" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#8b949e">gzip -dc</text>
  <text x="79" y="110" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#3fb950">12GB → stream</text>

  <!-- Progress -->
  <line x1="144" y1="79" x2="164" y2="79" stroke="#3fb950" stroke-width="2" marker-end="url(#dp-grn)" class="dp-flow"/>
  <rect x="164" y="66" width="52" height="26" rx="4" fill="#2a2a14" stroke="#ffa657" stroke-width="1"/>
  <text x="190" y="83" text-anchor="middle" font-family="'Courier New',monospace" font-size="9.5" fill="#ffa657">pv</text>

  <!-- Stage 2: Clean -->
  <line x1="216" y1="79" x2="236" y2="79" stroke="#ffa657" stroke-width="2" marker-end="url(#dp-orn)" class="dp-flow"/>
  <rect x="236" y="44" width="130" height="70" rx="8" fill="#0e1824" stroke="#58a6ff" stroke-width="2"/>
  <text x="301" y="66" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#58a6ff">② CLEAN</text>
  <text x="301" y="82" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#8b949e">iconv encoding</text>
  <text x="301" y="96" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#8b949e">sed clean fields</text>
  <text x="301" y="110" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#58a6ff">null bytes / CRLF</text>

  <!-- Tee to archive -->
  <line x1="366" y1="68" x2="406" y2="50" stroke="#58a6ff" stroke-width="1.5" stroke-dasharray="4,2"/>
  <rect x="406" y="36" width="100" height="26" rx="5" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="456" y="53" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#8b949e">archive.csv.gz</text>

  <!-- Stage 3: Validate -->
  <line x1="366" y1="79" x2="414" y2="79" stroke="#58a6ff" stroke-width="2" marker-end="url(#dp-blu)" class="dp-flow"/>
  <rect x="414" y="44" width="130" height="70" rx="8" fill="#1f1428" stroke="#bc8cff" stroke-width="2"/>
  <text x="479" y="66" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#bc8cff">③ VALIDATE</text>
  <text x="479" y="82" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#8b949e">awk schema check</text>
  <text x="479" y="96" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#8b949e">reject bad rows</text>
  <text x="479" y="110" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#bc8cff">tee rejected.csv</text>

  <!-- Stage 4: Transform -->
  <line x1="544" y1="79" x2="580" y2="79" stroke="#bc8cff" stroke-width="2" marker-end="url(#dp-pur)" class="dp-flow"/>
  <rect x="580" y="44" width="140" height="70" rx="8" fill="#2a2a14" stroke="#ffa657" stroke-width="2"/>
  <text x="650" y="66" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">④ TRANSFORM</text>
  <text x="650" y="82" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#8b949e">python3 enrich</text>
  <text x="650" y="96" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#8b949e">awk aggregate</text>
  <text x="650" y="110" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#ffa657">join lookups</text>

  <!-- Stage 5: Load -->
  <line x1="720" y1="79" x2="748" y2="79" stroke="#ffa657" stroke-width="2" marker-end="url(#dp-orn)" class="dp-flow"/>
  <rect x="748" y="44" width="58" height="70" rx="8" fill="#2a1a14" stroke="#f85149" stroke-width="2"/>
  <text x="777" y="72" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#f85149">⑤</text>
  <text x="777" y="86" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#f85149">LOAD</text>
  <text x="777" y="102" text-anchor="middle" font-family="'Courier New',monospace" font-size="8.5" fill="#8b949e">psql</text>
  <text x="777" y="114" text-anchor="middle" font-family="'Courier New',monospace" font-size="8.5" fill="#8b949e">COPY</text>

  <!-- Code box below -->
  <rect x="14" y="132" width="792" height="158" rx="8" fill="#161b22" stroke="#30363d" stroke-width="1.5"/>
  <text x="410" y="152" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">Pipeline Shell Code:</text>

  <text x="24" y="172" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">curl -sf "https://api.example.com/data.csv.gz" |</text>
  <text x="24" y="188" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">pv -N "download" -s "$(curl -sI .../data.csv.gz | grep -i content-length | tr -d '\r' | awk '{print $2}')" |</text>
  <text x="24" y="204" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">gzip -dc |</text>
  <text x="24" y="220" font-family="'Courier New',monospace" font-size="10" fill="#58a6ff">iconv -f latin1 -t utf8 |</text>
  <text x="24" y="236" font-family="'Courier New',monospace" font-size="10" fill="#58a6ff">LC_ALL=C sed 's/\r//g; /^$/d' |</text>
  <text x="24" y="252" font-family="'Courier New',monospace" font-size="10" fill="#bc8cff">tee &gt;(gzip &gt; /archive/raw-$(date +%Y%m%d).csv.gz) |</text>
  <text x="24" y="268" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">awk -F, 'NR==1{print;next} NF==6 &amp;&amp; $4+0&gt;0{print} NF!=6{print &gt; "/logs/rejected.csv"}' |</text>
  <text x="24" y="284" font-family="'Courier New',monospace" font-size="10" fill="#f85149">pv -N "load" -l | psql -d analytics -c "COPY events FROM STDIN (FORMAT csv, HEADER)"</text>
</svg>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 10 of 12 — Complete production ETL with error handling, monitoring, alerting</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ COMPLETE PRODUCTION ETL SCRIPT ════════════════════════</span>
<span class="cb-out">#!/usr/bin/env bash</span>
<span class="cb-out">set -Eeuo pipefail</span>
<span class="cb-out">DATE="\${1:-$(date +%Y-%m-%d)}"</span>
<span class="cb-out">LOGFILE="/var/log/etl/$(date +%Y%m%d_%H%M%S).log"</span>
<span class="cb-out">TMPDIR=$(mktemp -d)</span>
<span class="cb-out">METRICS=/var/log/etl/metrics.csv</span>
<span class="cb-out">START=$(date +%s)</span>
<span class="cb-out"></span>
<span class="cb-out">exec 1> >(ts '%Y-%m-%d %H:%M:%S' | tee -a "$LOGFILE")</span>
<span class="cb-out">exec 2>&1</span>
<span class="cb-out"></span>
<span class="cb-out">cleanup() {</span>
<span class="cb-out">    local EXIT="$1"</span>
<span class="cb-out">    local DURATION=$(( $(date +%s) - START ))</span>
<span class="cb-out">    rm -rf "$TMPDIR"</span>
<span class="cb-out">    echo "$DATE,\${EXIT},\${DURATION}" >> "$METRICS"</span>
<span class="cb-out">    if (( EXIT != 0 )); then</span>
<span class="cb-out">        tail -50 "$LOGFILE" | \</span>
<span class="cb-out">            curl -s -X POST "$SLACK_WEBHOOK" \</span>
<span class="cb-out">                 -H "Content-Type: application/json" \</span>
<span class="cb-out">                 -d "{\"text\":\"ETL FAILED for $DATE (exit $EXIT, \${DURATION}s)\"}"</span>
<span class="cb-out">    fi</span>
<span class="cb-out">    exit "$EXIT"</span>
<span class="cb-out">}</span>
<span class="cb-out">trap 'cleanup $?' EXIT</span>
<span class="cb-out">trap 'echo "ERROR at $LINENO: $BASH_COMMAND"' ERR</span>
<span class="cb-out"></span>
<span class="cb-out">echo "=== ETL Pipeline: $DATE ==="</span>
<span class="cb-out"></span>
<span class="cb-out">INPUT_URL="https://api.example.com/data?date=\${DATE}"</span>
<span class="cb-out">ARCHIVE="/data/archive/raw-\${DATE}.csv.gz"</span>
<span class="cb-out">REJECTED="$TMPDIR/rejected.csv"</span>
<span class="cb-out"></span>
<span class="cb-out"># Download size for progress:</span>
<span class="cb-out">SIZE=$(curl -sI "$INPUT_URL" | grep -i content-length | awk '{print $2}' | tr -d '\r')</span>
<span class="cb-out">echo "Input size: $(numfmt --to=iec "\${SIZE:-0}")"</span>
<span class="cb-out"></span>
<span class="cb-out"># Main pipeline:</span>
<span class="cb-out">curl -sf "$INPUT_URL" |</span>
<span class="cb-out">    pv -N "download" \${SIZE:+-s $SIZE} |</span>
<span class="cb-out">    gzip -dc |</span>
<span class="cb-out">    iconv -f latin1 -t utf8 2>/dev/null |</span>
<span class="cb-out">    LC_ALL=C sed 's/\r//g; /^[[:space:]]*$/d; s/[[:cntrl:]]//g' |</span>
<span class="cb-out">    tee >(gzip > "$ARCHIVE") |</span>
<span class="cb-out">    awk -F, -v rej="$REJECTED" '</span>
<span class="cb-out">        NR==1{print; next}</span>
<span class="cb-out">        NF!=6       {print > rej; next}</span>
<span class="cb-out">        $4+0 <= 0   {print > rej; next}</span>
<span class="cb-out">        $3==""      {print > rej; next}</span>
<span class="cb-out">        {print}' |</span>
<span class="cb-out">    python3 /opt/etl/transform.py --date "$DATE" |</span>
<span class="cb-out">    pv -N "load" -l |</span>
<span class="cb-out">    psql -d analytics -c "COPY events FROM STDIN (FORMAT csv, HEADER)"</span>
<span class="cb-out"></span>
<span class="cb-out">PIPE_STATUS=("\${PIPESTATUS[@]}")</span>
<span class="cb-out">for i in "\${!PIPE_STATUS[@]}"; do</span>
<span class="cb-out">    (( PIPE_STATUS[i] != 0 )) && echo "Stage $i failed: \${PIPE_STATUS[i]}" >&2</span>
<span class="cb-out">done</span>
<span class="cb-out"></span>
<span class="cb-out">REJ_COUNT=$(wc -l < "$REJECTED" 2>/dev/null || echo 0)</span>
<span class="cb-out">echo "Rejected rows: $REJ_COUNT"</span>
<span class="cb-out">(( REJ_COUNT > 0 )) && cp "$REJECTED" "/data/rejected/$DATE.csv"</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 11 — SPLIT AND MERGE PATTERNS
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num">11</span> Split &amp; Merge — Partitioned Parallel Processing</h2>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 11 of 12 — split, cat, sort -m, shuf, head/tail pipelines</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ SPLIT LARGE FILE INTO CHUNKS ═══════════════════════════</span>
<span class="cb-prompt">$</span> split -l 100000 data.csv chunk_          <span class="cb-cmt"># 100k lines per chunk</span>
<span class="cb-out">chunk_aa  chunk_ab  chunk_ac  ...</span>

<span class="cb-prompt">$</span> split -b 512M large.bin segment_         <span class="cb-cmt"># 512MB per chunk (binary)</span>
<span class="cb-prompt">$</span> split -n 8 data.csv part_                <span class="cb-cmt"># exactly 8 equal parts</span>
<span class="cb-prompt">$</span> split -C 100M --additional-suffix=.csv data.csv chunk_  <span class="cb-cmt"># with extension</span>

<span class="cb-cmt"># Split by pattern (round-robin to N files):</span>
<span class="cb-prompt">$</span> awk 'NR%4==0{f="p4"} NR%4==1{f="p1"} NR%4==2{f="p2"} NR%4==3{f="p3"} {print > f}' data.csv
<span class="cb-cmt"># Or elegantly:</span>
<span class="cb-prompt">$</span> awk -v n=4 '{f=int((NR-1)%n); print > ("part"f".csv")}' data.csv

<span class="cb-cmt">## ═══ PROCESS CHUNKS IN PARALLEL + MERGE ═════════════════════</span>
<span class="cb-out">#!/bin/bash</span>
<span class="cb-out">HEADER=$(head -1 data.csv)</span>
<span class="cb-out">tail -n +2 data.csv | split -l 100000 - /tmp/chunk_</span>
<span class="cb-out"></span>
<span class="cb-out">ls /tmp/chunk_* | parallel -j "$(nproc)" \</span>
<span class="cb-out">    'python3 process.py <(echo "'"$HEADER"'"; cat {}) > {}.result'</span>
<span class="cb-out"></span>
<span class="cb-out">echo "$HEADER" > output.csv</span>
<span class="cb-out">cat /tmp/chunk_*.result >> output.csv</span>
<span class="cb-out">rm /tmp/chunk_*</span>

<span class="cb-cmt">## ═══ MERGE SORTED FILES ══════════════════════════════════════</span>
<span class="cb-cmt"># sort -m merges pre-sorted files efficiently (no re-sorting):</span>
<span class="cb-prompt">$</span> sort -m -t, -k1 chunk_aa.sorted chunk_ab.sorted chunk_ac.sorted > merged.csv

<span class="cb-cmt"># Merge with process substitution (when files aren't pre-sorted):</span>
<span class="cb-prompt">$</span> sort -m \
    <(sort -t, -k1 part0.csv) \
    <(sort -t, -k1 part1.csv) \
    <(sort -t, -k1 part2.csv) > merged_sorted.csv

<span class="cb-cmt">## ═══ SAMPLING AND SHUFFLING ══════════════════════════════════</span>
<span class="cb-prompt">$</span> shuf data.csv | head -10000 > sample.csv  <span class="cb-cmt"># random 10k rows</span>
<span class="cb-prompt">$</span> shuf -n 10000 data.csv > sample.csv        <span class="cb-cmt"># same with -n</span>
<span class="cb-prompt">$</span> head -1 data.csv > sample.csv && shuf -n 10000 <(tail -n +2 data.csv) >> sample.csv
<span class="cb-cmt"># ^ preserve header + sample body rows</span>

<span class="cb-cmt">## ═══ WINDOW / BATCH PROCESSING ═══════════════════════════════</span>
<span class="cb-cmt"># Process in batches of 1000 lines:</span>
<span class="cb-out">#!/bin/bash</span>
<span class="cb-out">BATCH_SIZE=1000</span>
<span class="cb-out">BATCH=0</span>
<span class="cb-out">while IFS= read -r line; do</span>
<span class="cb-out">    BATCH_LINES+=("$line")</span>
<span class="cb-out">    if (( \${#BATCH_LINES[@]} >= BATCH_SIZE )); then</span>
<span class="cb-out">        printf '%s\n' "\${BATCH_LINES[@]}" | process_batch.py</span>
<span class="cb-out">        BATCH_LINES=()</span>
<span class="cb-out">        echo "Processed batch $((++BATCH))"</span>
<span class="cb-out">    fi</span>
<span class="cb-out">done < data.csv</span>
<span class="cb-out"># Process remaining:</span>
<span class="cb-out">(( \${#BATCH_LINES[@]} > 0 )) && printf '%s\n' "\${BATCH_LINES[@]}" | process_batch.py</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 12 — KERNEL DEEP DIVE
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num">12</span> Kernel Deep Dive — Pipe Implementation, Buffering, and Scheduling</h2>

<div class="deepdive-box">
<div class="deepdive-title">⚙️ Anonymous Pipes, Kernel Buffer, copy_to_user, Process Scheduling</div>
<pre style="margin:0;padding:16px;font-family:monospace;font-size:12px;color:#e6edf3;background:#010409;border-radius:0 0 8px 8px;overflow-x:auto;">
1. PIPE IMPLEMENTATION IN THE LINUX KERNEL

   Pipe = a pair of file descriptors backed by a kernel buffer:
   - pipe_read_fd  → read end (fd[0] returned to user)
   - pipe_write_fd → write end (fd[1] returned to user)
   
   Internal: struct pipe_inode_info
     - Circular buffer of 16 pages (64KB = 16 × 4096)
     - head/tail pointers for producer/consumer
     - wait queues for blocked readers and writers
   
   pipe(2) syscall:
     1. Allocate pipe_inode_info in kernel memory
     2. Create two file structs (one each for read/write end)
     3. Return two new file descriptors to the calling process
   
   For cmd1 | cmd2:
     1. Shell calls pipe(fd)
     2. fork() for cmd1, fork() for cmd2
     3. cmd1: dup2(fd[1], STDOUT_FILENO), close(fd[0])
     4. cmd2: dup2(fd[0], STDIN_FILENO),  close(fd[1])
     5. exec() both commands

2. WRITE PATH (producer)

   write(fd[1], buf, count):
   1. Lock the pipe
   2. If free space < count: block (sleep on write wait queue)
      → Scheduler runs consumer, which frees space
      → Producer wakes up and retries
   3. Copy data from user space into pipe buffer pages
      (zero-copy path: pipe_write can splice pages directly)
   4. Wake up any waiting readers
   5. Unlock pipe, return bytes written
   
   SIGPIPE: if write end is open but read end is closed,
   write(2) returns -EPIPE and sends SIGPIPE to the process.
   Default SIGPIPE action: terminate the process.

3. READ PATH (consumer)

   read(fd[0], buf, count):
   1. Lock the pipe
   2. If no data in buffer: block (sleep on read wait queue)
      → Scheduler runs producer, which fills buffer
      → Consumer wakes up
   3. Copy data from pipe buffer pages to user space
   4. Wake up any waiting writers
   5. Unlock pipe, return bytes read
   
   EOF: when all write ends are closed and buffer is empty,
   read() returns 0 (EOF signal to consumer).

4. SPLICE AND ZERO-COPY

   splice(2) syscall can move data between pipes without
   copying to user space:
   
   splice(fd_in, NULL, fd_out, NULL, len, SPLICE_F_MOVE);
   
   This is how programs like 'cat' are so fast:
   they use sendfile/splice to move data between FDs
   without copying through user space buffers.
   
   For pipeline performance:
   - write() → user-space copy → kernel buffer
   - splice() → kernel-to-kernel (zero copy!)
   - pv uses splice internally for high throughput

5. PROCESS SCHEDULING WITH PIPES

   When cmd1 writes and fills the pipe buffer:
   - cmd1 is moved to "pipe_wait" wait queue (TASK_INTERRUPTIBLE)
   - Scheduler picks cmd2 to run (it's ready to read)
   - cmd2 empties buffer, wakes cmd1
   
   This creates natural load balancing:
   - Fast producer + slow consumer → producer sleeps often
   - Slow producer + fast consumer → consumer sleeps often
   - Matched speed → both run continuously, buffer stays partially full
   
   The 64KB buffer size is tunable:
   fcntl(fd, F_SETPIPE_SZ, 1024*1024);  // set to 1MB
   cat /proc/sys/fs/pipe-max-size        // system maximum
</pre>
</div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 13 — REAL-WORLD PATTERNS
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num">13</span> Real-World Pipeline Patterns</h2>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 12 of 12 — Production patterns: streaming ETL, API batch, monitoring</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ PATTERN 1: STREAMING JSON-LINES TO DB ══════════════════</span>
<span class="cb-cmt"># Process JSONL events file → extract fields → load to postgres</span>
<span class="cb-out">curl -sf "https://api.example.com/events.jsonl" |</span>
<span class="cb-out">    gzip -dc |</span>
<span class="cb-out">    pv -N "events" -l |</span>
<span class="cb-out">    python3 -c "
import sys, json
print('event_id,user_id,ts,action,amount')
for line in sys.stdin:
    try:
        ev = json.loads(line)
        print(','.join([
            str(ev.get('id','')),
            str(ev.get('user_id','')),
            str(ev.get('timestamp','')),
            str(ev.get('action','')).replace(',',''),
            str(ev.get('amount',0))
        ]))
    except: pass
    " |</span>
<span class="cb-out">    psql -d analytics -c "COPY events FROM STDIN (FORMAT csv, HEADER)"</span>

<span class="cb-cmt">## ═══ PATTERN 2: RATE-LIMITED API BATCH ══════════════════════</span>
<span class="cb-out">#!/bin/bash</span>
<span class="cb-out"># Call API for each ID, rate limited to 10 req/s, retry on failure</span>
<span class="cb-out">cat entity_ids.txt |</span>
<span class="cb-out">    pv -l -L 10 |                    # max 10 lines/second</span>
<span class="cb-out">    parallel --retries 3 --delay 0.1 -j 10 \</span>
<span class="cb-out">        'curl -sf "https://api.example.com/entity/{}" >> /tmp/results.jsonl'</span>

<span class="cb-cmt">## ═══ PATTERN 3: CONTINUOUS STREAM MONITOR ════════════════════</span>
<span class="cb-out">#!/bin/bash</span>
<span class="cb-out"># Tail a log and aggregate stats in real-time</span>
<span class="cb-out">tail -f /var/log/app/events.log |</span>
<span class="cb-out">    grep --line-buffered "TRANSACTION" |</span>
<span class="cb-out">    awk -F'|' -v OFS=',' '</span>
<span class="cb-out">        {</span>
<span class="cb-out">            region = $3; amount = $5 + 0</span>
<span class="cb-out">            total[region] += amount; cnt[region]++</span>
<span class="cb-out">            # Every 1000 transactions, print running totals</span>
<span class="cb-out">            if(++n % 1000 == 0) {</span>
<span class="cb-out">                for(r in total)</span>
<span class="cb-out">                    printf "[%s] %-20s %10.2f (%d txns)\n",</span>
<span class="cb-out">                        strftime("%H:%M:%S"), r, total[r], cnt[r]</span>
<span class="cb-out">                print "---"</span>
<span class="cb-out">            }</span>
<span class="cb-out">        }'</span>

<span class="cb-cmt">## ═══ PATTERN 4: IDEMPOTENT DAILY LOADER ══════════════════════</span>
<span class="cb-out">#!/bin/bash</span>
<span class="cb-out">DATE="\${1:-$(date +%Y-%m-%d)}"</span>
<span class="cb-out"></span>
<span class="cb-out"># Check if already loaded (idempotent):</span>
<span class="cb-out">COUNT=$(psql -At -d analytics -c "SELECT COUNT(*) FROM events WHERE event_date='$DATE'")</span>
<span class="cb-out">if (( COUNT > 0 )); then</span>
<span class="cb-out">    echo "Already loaded $COUNT rows for $DATE — skipping"</span>
<span class="cb-out">    exit 0</span>
<span class="cb-out">fi</span>
<span class="cb-out"></span>
<span class="cb-out"># Delete and reload in transaction:</span>
<span class="cb-out">psql -d analytics << EOSQL</span>
<span class="cb-out">BEGIN;</span>
<span class="cb-out">DELETE FROM events WHERE event_date = '$DATE';</span>
<span class="cb-out">COPY events FROM STDIN (FORMAT csv, HEADER);</span>
<span class="cb-out">EOSQL</span>
<span class="cb-out"># The COPY is fed via the pipeline...</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 14 — COMPLETE REFERENCE
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num">14</span> Complete Pipeline Reference</h2>

<div class="table-wrap">
<table class="ref-table">
<thead><tr><th style="width:26%">Construct / Command</th><th>Purpose</th><th style="width:25%">Key Options</th></tr></thead>
<tbody>
<tr><td colspan="3" style="background:#1a2a1a;color:#3fb950;font-weight:bold;font-family:'Segoe UI',sans-serif;">Core Pipeline</td></tr>
<tr><td style="font-family:monospace;">cmd1 | cmd2</td><td>Connect stdout→stdin. Both run simultaneously.</td><td>PIPESTATUS captures each exit code</td></tr>
<tr><td style="font-family:monospace;">cmd > file</td><td>Redirect stdout to file (overwrite)</td><td><code>>></code> append, <code>2></code> stderr, <code>2>&1</code> merge</td></tr>
<tr><td style="font-family:monospace;">cmd &lt;&lt; 'EOF'</td><td>Here-document: inline multi-line stdin</td><td>Quoted = no expansion. Unquoted = expands $VAR</td></tr>
<tr><td style="font-family:monospace;">cmd &lt;&lt;&lt; "str"</td><td>Here-string: single string as stdin</td><td>Bash only. Adds trailing newline.</td></tr>
<tr><td style="font-family:monospace;">set -euo pipefail</td><td>Safe defaults: exit on error, unset var, pipe fail</td><td>Add to every production script</td></tr>
<tr><td colspan="3" style="background:#2a2a14;color:#ffa657;font-weight:bold;font-family:'Segoe UI',sans-serif;">Branching &amp; Substitution</td></tr>
<tr><td style="font-family:monospace;">tee file [file...]</td><td>Copy stream to stdout AND files simultaneously</td><td><code>-a</code> append; supports multiple files</td></tr>
<tr><td style="font-family:monospace;">&lt;(command)</td><td>Process substitution: command output as filename</td><td>Use with diff, join, comm, sort -m</td></tr>
<tr><td style="font-family:monospace;">&gt;(command)</td><td>Process substitution: filename as command stdin</td><td>Fan-out: tee >(cmd1) >(cmd2) | cmd3</td></tr>
<tr><td style="font-family:monospace;">mkfifo pipe; cmd > pipe &amp;</td><td>Named pipe: persistent, cross-process connector</td><td>Blocks until both ends open</td></tr>
<tr><td colspan="3" style="background:#0e1824;color:#58a6ff;font-weight:bold;font-family:'Segoe UI',sans-serif;">Parallel &amp; Progress</td></tr>
<tr><td style="font-family:monospace;">xargs -P N -I{} cmd {}</td><td>N parallel workers from stdin arguments</td><td><code>-n 1</code> one arg per worker, <code>-0</code> null delimited</td></tr>
<tr><td style="font-family:monospace;">parallel -j N cmd ::: args</td><td>GNU parallel with progress, retry, ETA</td><td><code>--bar --eta --retries 3 --results dir</code></td></tr>
<tr><td style="font-family:monospace;">pv [-s SIZE] [-L RATE]</td><td>Progress, rate, ETA; optionally throttle</td><td><code>-l</code> lines, <code>-N name</code> label, <code>-d PID</code> monitor</td></tr>
<tr><td style="font-family:monospace;">split -l N / -b SIZE</td><td>Split large file into chunks</td><td><code>-n N</code> equal parts, <code>--additional-suffix=.csv</code></td></tr>
<tr><td colspan="3" style="background:#1f1428;color:#bc8cff;font-weight:bold;font-family:'Segoe UI',sans-serif;">Error &amp; State</td></tr>
<tr><td style="font-family:monospace;">\${PIPESTATUS[@]}</td><td>Exit code of each command in last pipeline</td><td>Capture immediately: <code>PS=("\${PIPESTATUS[@]}")</code></td></tr>
<tr><td style="font-family:monospace;">trap 'cleanup $?' EXIT</td><td>Run cleanup function on any exit</td><td>Add ERR trap for per-error logging</td></tr>
<tr><td style="font-family:monospace;">retry N DELAY cmd</td><td>Retry with exponential backoff</td><td>Custom function, or: GNU parallel --retries</td></tr>
</tbody>
</table>
</div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 15 — EXERCISES
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num">15</span> Practice Exercises with Solutions</h2>

<div class="exercise-panel easy">
  <div class="ex-badge easy-badge">Easy</div>
  <div class="ex-body">
    <h4>Exercise 1 — Pipe Fundamentals</h4>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Build a pipeline: generate 1000 random numbers (use <code>shuf -i 1-10000 -n 1000</code>), sort them numerically, find the median (hint: <code>awk 'NR==500'</code>)</li>
      <li>Demonstrate the difference between <code>cmd &gt; out 2>&1</code> and <code>cmd 2>&1 &gt; out</code> — explain why order matters</li>
      <li>Use <code>tee</code> to simultaneously display output AND save to a file</li>
      <li>Write a pipeline that: reads a CSV, removes the header, sorts by column 3, takes the top 10, re-adds the header</li>
      <li>Demonstrate <code>PIPESTATUS</code>: create a pipeline where the middle stage fails. Use PIPESTATUS to detect which stage failed.</li>
      <li>Use a here-document to run 3 SQL statements in a single <code>psql</code> call</li>
      <li>Use <code>&lt;(sort file1) &lt;(sort file2)</code> with <code>diff</code> to compare two files without creating temp files</li>
    </ol>
  </div>
</div>

<div class="exercise-panel easy">
  <div class="ex-badge easy-badge">Easy</div>
  <div class="ex-body">
    <h4>Exercise 2 — tee and Process Substitution</h4>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Use <code>tee</code> to: count lines AND save to file simultaneously in one pipeline</li>
      <li>Build a fan-out pipeline that processes data AND simultaneously: gzips it to archive, counts lines to metrics file, filters errors to separate file</li>
      <li>Use <code>&gt;(...)</code> to add timestamps to pipeline output: <code>cmd 1&gt; &gt;(ts '%H:%M:%S' >> run.log)</code></li>
      <li>Use <code>comm</code> with <code>&lt;(sort ...)</code> to find: lines in file1 only, lines in file2 only, lines in both</li>
      <li>Create and use a named pipe (FIFO) to connect two independent processes in separate terminals</li>
      <li>Build the semaphore pattern using a named pipe to limit parallel workers to exactly 4</li>
    </ol>
  </div>
</div>

<div class="exercise-panel medium">
  <div class="ex-badge medium-badge">Medium</div>
  <div class="ex-body">
    <h4>Exercise 3 — Error Handling and Progress</h4>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Write a pipeline script with: <code>set -Eeuo pipefail</code>, a <code>cleanup</code> function on EXIT trap, an ERR trap that logs the failing line</li>
      <li>Build a <code>retry</code> function with exponential backoff (5s, 10s, 20s, max 60s). Test it with a command that fails the first 2 times.</li>
      <li>Add <code>pv</code> to a large file copy to show progress, rate, and ETA. Use <code>-s</code> to provide the expected size.</li>
      <li>Build a pipeline where stage 2 is slow — use <code>pv</code> to confirm that stage 1 is blocking due to backpressure</li>
      <li>Implement PIPESTATUS checking: build a 4-stage pipeline, have stage 2 randomly fail (use <code>bash -c 'exit $((RANDOM%2))'</code>), report which stage failed</li>
      <li>Build a rate-limiter using <code>pv -L</code> that ensures a curl-based pipeline makes at most 100 requests per second</li>
    </ol>
  </div>
</div>

<div class="exercise-panel medium">
  <div class="ex-badge medium-badge">Medium</div>
  <div class="ex-body">
    <h4>Exercise 4 — Parallel Processing</h4>
    <p>Process a directory of CSV files in parallel:</p>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Use <code>xargs -P 4</code> to process 20 CSV files in parallel — collect all output into one merged file</li>
      <li>Rewrite using GNU <code>parallel</code> with: progress bar, ETA, 3 retries on failure, results saved per-file</li>
      <li>Split a 10M-row CSV into 8 equal parts, process in parallel (preserving header in each chunk), merge sorted output</li>
      <li>Build a parallel pipeline with the semaphore pattern (named pipe as token pool) — verify exactly 4 workers at a time using <code>ps aux | grep process</code></li>
      <li>Measure the actual speedup: time the sequential version vs the 4-worker parallel version. Calculate efficiency (actual speedup / theoretical max)</li>
    </ol>
  </div>
</div>

<div class="exercise-panel hard">
  <div class="ex-badge hard-badge">Hard</div>
  <div class="ex-body">
    <h4>Exercise 5 — Production ETL Pipeline</h4>
    <p>Build a complete fault-tolerant ETL pipeline <code>etl.sh DATE</code>:</p>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li><strong>Ingest:</strong> Download gzipped CSV from an API. Handle network failures with retry and backoff. Show download progress with pv.</li>
      <li><strong>Archive:</strong> Simultaneously save raw compressed copy to archive directory using tee+process substitution.</li>
      <li><strong>Clean:</strong> Fix encoding (iconv), remove CRLF, strip null bytes, remove blank lines, all in the same pipeline.</li>
      <li><strong>Validate:</strong> Use awk to validate schema (column count), check required fields non-empty, check amounts positive. Reject bad rows to a separate file. Report rejection count.</li>
      <li><strong>Transform:</strong> Enrich with a lookup CSV (awk join), apply business rules, aggregate to summary.</li>
      <li><strong>Load:</strong> Stream into postgres using COPY with a transaction. If COPY fails, rollback.</li>
      <li><strong>Checkpoint:</strong> Each stage writes a state file. On re-run, skip already-completed stages.</li>
      <li><strong>Monitor:</strong> Log all output with timestamps (ts command). Send Slack alert on failure with last 50 log lines. Write duration and row count to metrics CSV.</li>
    </ol>
    <p><strong>Must handle: 12GB input, 64MB RAM server, partial downloads, malformed rows, DB downtime, Ctrl+C cleanup, concurrent runs (use flock), and idempotent re-runs.</strong></p>
  </div>
</div>

<div class="story-panel" style="margin-top:32px;">
  <div class="story-avatar">🧑‍💻</div>
  <div class="story-body">
    <div class="story-title">Ravi's Pipeline — Six Months Later</div>
    <p>The pipeline had run every night for six months. Twelve million rows. Four minutes. Two hundred megabytes. Not once had anyone needed to touch it manually. The checkpoint system had saved two runs when the database was briefly unreachable — the pipeline resumed from stage 4 when the database came back, without re-downloading, re-cleaning, or re-validating twelve gigabytes of data it had already processed.</p>
    <p>A new engineer joined the team and asked how the pipeline worked. Ravi drew it on a whiteboard: a horizontal line with five boxes connected by arrows. In each arrow he wrote a small "|" symbol. "Each box is a process," he said. "Each arrow is a kernel pipe. They all run simultaneously. The OS manages the buffering. The data flows from left to right, never touching disk except at the checkpoints."</p>
    <p>"Why not Python?" the engineer asked. "Pandas could do all of this."</p>
    <p>"Pandas could do this," Ravi said. "But it would need 48GB of RAM to load twelve gigabytes and transform it. This pipeline needs two hundred megabytes. And it's faster — because it never waits for stage 1 to finish before stage 2 can start."</p>
    <p>He paused. "A shell pipeline is a streaming computation graph. Each stage processes rows as fast as they arrive. The OS handles everything else."</p>
    <p><strong>The pipe is the most elegant data structure in computing — a bounded queue with automatic backpressure, shared between processes by the operating system, that costs almost nothing to create and requires no coordination from the programmer.</strong></p>
  </div>
</div>

</div><!-- /section-block -->
\`

`
};