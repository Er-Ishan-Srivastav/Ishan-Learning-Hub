
var jobs = {
    title: "Job Control & bg/fg",
    description: "Master Linux job control completely — foreground, background, stopping and resuming, nohup/disown for persistence, and advanced parallel job patterns with wait, kill, and job pools. The toolkit for running and managing multiple processes from one terminal.",
    content: `
<style>
/* ── Keyframe animations for job control module ── */
@keyframes jc-run   { 0%,100%{fill:#1a2a1a;stroke:#3fb950} 50%{fill:#0d1f0d;stroke:#238636} }
@keyframes jc-pulse { 0%,100%{opacity:1} 50%{opacity:.2} }
@keyframes jc-flow  { 0%{stroke-dashoffset:24} 100%{stroke-dashoffset:0} }
@keyframes jc-slide { 0%{transform:translateX(-30px);opacity:0} 100%{transform:translateX(0);opacity:1} }
@keyframes jc-blink { 0%,100%{fill:#ffa657;opacity:1} 50%{fill:#7a4800;opacity:.4} }
@keyframes jc-scan  { 0%{transform:translateX(0)} 100%{transform:translateX(300px)} }
@keyframes jc-grow  { 0%{width:0%} 100%{width:100%} }
@keyframes jc-pop   { 0%{transform:scale(0);opacity:0} 80%{transform:scale(1.1)} 100%{transform:scale(1);opacity:1} }
@keyframes jc-dash  { 0%{stroke-dashoffset:20} 100%{stroke-dashoffset:0} }
@keyframes jc-spin  { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }

.jc-running { animation: jc-run   2.2s ease-in-out infinite; }
.jc-pulse   { animation: jc-pulse 1.8s ease-in-out infinite; }
.jc-flow    { stroke-dasharray:6 4; animation: jc-flow .7s linear infinite; }
.jc-blink   { animation: jc-blink 1.4s ease-in-out infinite; }
.jc-pop     { animation: jc-pop   .5s cubic-bezier(.34,1.56,.64,1) both; }
.jc-dash    { stroke-dasharray:5 3; animation: jc-dash .6s linear infinite; }
</style>

<!-- ══════════════════════════════════════════════════════
     RAVI'S STORY — HOOK
══════════════════════════════════════════════════════ -->
<div class="story-panel">
  <div class="story-avatar">🧑‍💻</div>
  <div class="story-body">
    <div class="story-title">Ravi's One-Terminal Problem — Day 350</div>
    <br>
    <p>Ravi had a problem. Five pipeline stages to run: extract, validate, transform, load, archive. He'd been running them one at a time, waiting for each to finish before starting the next. Six hours per full run.</p>
    <br>
    <p>Priya watched him finish the extract step and immediately type the validate command. "Stop," she said. "Let me show you something." She brought the extract process back to the foreground with <code>fg</code>, then Ctrl+Z'd it, typed <code>bg</code>, and then started validate in parallel. Then transform. Then load. "Now they're all running," she said. "Same terminal. You're watching them all."</p>
    <br>
    <p>Then she showed him the real version: a parallel pool with <code>wait -n</code> to collect results as each finished, exit code checking, and graceful shutdown if any step failed. The six-hour run became ninety minutes.</p>
    <br>
    <p>"Job control," she said, "is how you turn one terminal into an orchestration system." She paused. "Once you understand sessions and process groups, you'll also understand why Ctrl+C kills everything in a pipeline, why <code>nohup</code> keeps things running after logout, and how to detach jobs that need to outlive your SSH session."</p>
  </div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 1 — WHAT IS A JOB?
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> What Is a Job — Shell's View vs Kernel's View</h2>

<p>A <strong>job</strong> is bash's concept — not the kernel's. The kernel sees processes and process groups. Bash sees jobs: one or more processes launched as a unit (a command or a pipeline). Jobs get a job number <code>[1]</code>, <code>[2]</code>… that is local to your shell session and used with <code>fg</code>, <code>bg</code>, <code>kill %N</code>.</p>

<div class="diagram-wrap">
<svg viewBox="0 0 820 280" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 20px;">
  <defs>
    <marker id="jc-arr" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#8b949e"/></marker>
    <marker id="jc-grn" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#3fb950"/></marker>
    <marker id="jc-blu" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#58a6ff"/></marker>
    <marker id="jc-orn" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#ffa657"/></marker>
    <marker id="jc-pur" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#bc8cff"/></marker>
    <marker id="jc-red" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#f85149"/></marker>
  </defs>
  <rect width="820" height="280" fill="#0d1117" rx="12"/>
  <text x="410" y="24" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="13" font-weight="bold" fill="#8b949e">Job = Shell Concept | Process Group = Kernel Concept | Session = Terminal Concept</text>

  <!-- Session box -->
  <rect x="14" y="36" width="792" height="234" rx="10" fill="none" stroke="#bc8cff" stroke-width="1.5" stroke-dasharray="6,3"/>
  <text x="26" y="52" font-family="'Segoe UI',sans-serif" font-size="10" fill="#bc8cff">SESSION (SID=4800) — one terminal, one login shell</text>

  <!-- Bash (shell) -->
  <rect x="26" y="60" width="160" height="44" rx="8" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="106" y="78" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#3fb950">bash (PID 4820)</text>
  <text x="106" y="93" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">session leader, PGID=4820</text>

  <!-- Job 1: single process -->
  <rect x="220" y="60" width="180" height="80" rx="8" fill="#0e1824" stroke="#58a6ff" stroke-width="1.8"/>
  <text x="310" y="78" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#58a6ff">[1] Job — single process</text>
  <text x="310" y="92" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">python3 etl.py &</text>
  <rect x="234" y="100" width="152" height="32" rx="5" fill="#1a2a1a" stroke="#3fb950" stroke-width="1"/>
  <text x="310" y="114" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">python3 (PID 5001, PGID 5001)</text>
  <text x="310" y="126" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">one process = one process group</text>

  <!-- Job 2: pipeline (3 processes) -->
  <rect x="430" y="60" width="370" height="96" rx="8" fill="#1a1a2a" stroke="#bc8cff" stroke-width="1.8"/>
  <text x="615" y="78" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#bc8cff">[2] Job — pipeline (3 processes)</text>
  <text x="615" y="92" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#e6edf3">cat data.csv | python3 transform.py | psql -c "COPY..."</text>
  <!-- three process boxes in pipeline -->
  <rect x="442" y="100" width="100" height="46" rx="5" fill="#1a2a1a" stroke="#3fb950" stroke-width="1"/>
  <text x="492" y="117" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#3fb950">cat</text>
  <text x="492" y="130" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8" fill="#8b949e">PID 5010</text>
  <text x="492" y="140" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8" fill="#8b949e">PGID 5010</text>
  <line x1="542" y1="123" x2="560" y2="123" stroke="#ffa657" stroke-width="1.5" marker-end="url(#jc-orn)"/>
  <text x="551" y="116" font-family="'Segoe UI',sans-serif" font-size="8" fill="#ffa657">pipe</text>
  <rect x="560" y="100" width="110" height="46" rx="5" fill="#1a2a1a" stroke="#3fb950" stroke-width="1"/>
  <text x="615" y="117" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#3fb950">python3</text>
  <text x="615" y="130" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8" fill="#8b949e">PID 5011</text>
  <text x="615" y="140" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8" fill="#8b949e">PGID 5010</text>
  <line x1="670" y1="123" x2="688" y2="123" stroke="#ffa657" stroke-width="1.5" marker-end="url(#jc-orn)"/>
  <text x="679" y="116" font-family="'Segoe UI',sans-serif" font-size="8" fill="#ffa657">pipe</text>
  <rect x="688" y="100" width="100" height="46" rx="5" fill="#1a2a1a" stroke="#3fb950" stroke-width="1"/>
  <text x="738" y="117" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#3fb950">psql</text>
  <text x="738" y="130" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8" fill="#8b949e">PID 5012</text>
  <text x="738" y="140" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8" fill="#8b949e">PGID 5010</text>

  <!-- Key facts row -->
  <rect x="14" y="170" width="792" height="92" rx="6" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="26" y="190" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">Key Facts:</text>
  <text x="26" y="207" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">• Job number <tspan fill="#58a6ff">[N]</tspan> — assigned by bash, local to shell. Process group ID (PGID) — assigned by kernel, global.</text>
  <text x="26" y="224" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">• A pipeline is ONE job. All processes in a pipeline share the same PGID. Ctrl+C sends SIGINT to the entire PGID simultaneously.</text>
  <text x="26" y="240" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">• Foreground job = bash waits for it + it receives terminal I/O. Background job = bash continues + it cannot read stdin.</text>
  <text x="26" y="256" font-family="'Segoe UI',sans-serif" font-size="10" fill="#3fb950">• Job specs: <tspan fill="#58a6ff" font-family="'Courier New',monospace">%1  %2  %%  %+  %-  %python3  %?etl</tspan> — all ways to reference a job.</text>
</svg>
<p class="diagram-caption">When you run <code>python3 transform.py | psql ...</code>, bash creates ONE job <code>[2]</code> containing TWO processes — both get the same PGID. Every signal sent to that job (via <code>kill %2</code>, Ctrl+C, or Ctrl+Z) goes to the entire process group at once.</p>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 1 of 10 — Job basics: &amp;, jobs, job specs, [N] notation, PGID</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ STARTING A BACKGROUND JOB ══════════════════════════════</span>
<span class="cb-prompt">$</span> python3 etl.py &
<span class="cb-out">[1] 5001</span>
<span class="cb-cmt"># [1] = job number (bash-local)    5001 = PID (global)
# Bash immediately returns the prompt — job runs in background</span>

<span class="cb-prompt">$</span> python3 monitor.py &
<span class="cb-out">[2] 5002</span>

<span class="cb-cmt">## ═══ jobs COMMAND — INSPECT ALL JOBS ═════════════════════════</span>
<span class="cb-prompt">$</span> jobs
<span class="cb-out">[1]-  Running    python3 etl.py &</span>
<span class="cb-out">[2]+  Running    python3 monitor.py &</span>
<span class="cb-cmt"># +  = current job (most recently used/started)
# -  = previous job
# No marker = other jobs</span>

<span class="cb-prompt">$</span> jobs -l             <span class="cb-cmt"># -l: show PID too</span>
<span class="cb-out">[1]-  5001 Running    python3 etl.py &</span>
<span class="cb-out">[2]+  5002 Running    python3 monitor.py &</span>

<span class="cb-prompt">$</span> jobs -p             <span class="cb-cmt"># PIDs only (useful for scripting)</span>
<span class="cb-out">5001</span>
<span class="cb-out">5002</span>

<span class="cb-prompt">$</span> jobs -n             <span class="cb-cmt"># only jobs that have changed state since last check</span>
<span class="cb-prompt">$</span> jobs -r             <span class="cb-cmt"># only Running jobs</span>
<span class="cb-prompt">$</span> jobs -s             <span class="cb-cmt"># only Stopped jobs</span>

<span class="cb-cmt">## ═══ JOB SPECS — WAYS TO REFERENCE A JOB ════════════════════</span>
<span class="cb-cmt"># %N      = job number N
# %+  %%  = current job (most recent)
# %-      = previous job
# %str    = job whose name starts with "str"
# %?str   = job whose name contains "str"</span>
fg %1              <span class="cb-cmt"># bring job 1 to foreground</span>
fg %%              <span class="cb-cmt"># bring current job to foreground</span>
kill %2            <span class="cb-cmt"># send SIGTERM to job 2</span>
kill -9 %1         <span class="cb-cmt"># SIGKILL job 1</span>
kill %python3      <span class="cb-cmt"># kill job whose name starts with "python3"</span>
kill %?etl         <span class="cb-cmt"># kill job whose name contains "etl"</span>

<span class="cb-cmt">## ═══ PIPELINE AS ONE JOB ════════════════════════════════════</span>
<span class="cb-prompt">$</span> cat sales.csv | python3 transform.py | psql -d db -c "COPY..." &
<span class="cb-out">[3] 5010</span>
<span class="cb-cmt"># [3] is ONE job with THREE processes — PID 5010 is last in pipeline
# All three share PGID 5010 (the first process in the pipeline)</span>
<span class="cb-prompt">$</span> ps -o pid,pgid,comm --ppid 4820
<span class="cb-out">  PID  PGID COMMAND</span>
<span class="cb-out"> 5010  5010 cat</span>
<span class="cb-out"> 5011  5010 python3</span>
<span class="cb-out"> 5012  5010 psql</span>
<span class="cb-cmt"># All three: same PGID=5010
# kill %3 sends SIGTERM to PGID 5010 — kills all three</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 2 — JOB STATE MACHINE (ANIMATED)
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Job State Machine — Animated fg / bg / Ctrl+Z Flow</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 310" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 20px;">
  <rect width="820" height="310" fill="#0d1117" rx="12"/>
  <text x="410" y="24" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="13" font-weight="bold" fill="#8b949e">Job State Machine — All States and Transitions Animated</text>

  <!-- FOREGROUND -->
  <rect x="290" y="44" width="240" height="58" rx="12" fill="#1a2a1a" stroke="#3fb950" stroke-width="2.5" class="jc-running"/>
  <text x="410" y="68" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="14" font-weight="bold" fill="#3fb950">FOREGROUND</text>
  <text x="410" y="85" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">bash waits · terminal I/O connected</text>
  <text x="410" y="98" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#238636">● only one foreground job at a time</text>

  <!-- BACKGROUND -->
  <rect x="530" y="148" width="240" height="58" rx="12" fill="#0e1824" stroke="#58a6ff" stroke-width="2"/>
  <text x="650" y="172" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="14" font-weight="bold" fill="#58a6ff">BACKGROUND</text>
  <text x="650" y="188" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">bash continues · no terminal I/O</text>
  <text x="650" y="200" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#58a6ff">multiple bg jobs allowed</text>

  <!-- STOPPED -->
  <rect x="50" y="148" width="240" height="58" rx="12" fill="#2a2a14" stroke="#ffa657" stroke-width="2"/>
  <text x="170" y="172" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="14" font-weight="bold" fill="#ffa657">STOPPED</text>
  <text x="170" y="188" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">SIGSTOP/SIGTSTP · frozen</text>
  <text x="170" y="200" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">0% CPU · awaiting SIGCONT</text>

  <!-- DONE -->
  <rect x="290" y="254" width="240" height="44" rx="12" fill="#1f2027" stroke="#30363d" stroke-width="1.5"/>
  <text x="410" y="280" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="13" font-weight="bold" fill="#8b949e">DONE / Terminated</text>

  <!-- Transitions -->
  <!-- FG → STOPPED (Ctrl+Z) -->
  <path d="M290,84 Q180,84 170,148" fill="none" stroke="#ffa657" stroke-width="2.5" marker-end="url(#jc-orn)" class="jc-flow"/>
  <text x="185" y="106" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">Ctrl+Z (SIGTSTP)</text>

  <!-- STOPPED → FG (fg) -->
  <path d="M170,148 Q190,110 290,90" fill="none" stroke="#3fb950" stroke-width="2" stroke-dasharray="6,3" marker-end="url(#jc-grn)"/>
  <text x="158" y="128" font-family="'Courier New',monospace" font-size="11" font-weight="bold" fill="#3fb950">fg %N</text>
  <text x="158" y="142" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">SIGCONT + attach</text>

  <!-- STOPPED → BG (bg) -->
  <path d="M290,172 Q410,172 530,172" fill="none" stroke="#58a6ff" stroke-width="2.5" marker-end="url(#jc-blu)" class="jc-flow"/>
  <text x="390" y="165" font-family="'Courier New',monospace" font-size="11" font-weight="bold" fill="#58a6ff">bg %N</text>
  <text x="390" y="178" font-family="'Segoe UI',sans-serif" font-size="9" fill="#58a6ff">SIGCONT + detach</text>

  <!-- FG → BG (launch with &) -->
  <path d="M530,74 Q640,74 650,148" fill="none" stroke="#58a6ff" stroke-width="2" marker-end="url(#jc-blu)"/>
  <text x="632" y="100" font-family="'Courier New',monospace" font-size="11" font-weight="bold" fill="#58a6ff">cmd &amp;</text>
  <text x="640" y="113" font-family="'Segoe UI',sans-serif" font-size="9" fill="#58a6ff">starts in bg</text>

  <!-- BG → FG (fg) -->
  <path d="M650,148 Q640,100 530,82" fill="none" stroke="#3fb950" stroke-width="2" stroke-dasharray="6,3" marker-end="url(#jc-grn)"/>
  <text x="666" y="126" font-family="'Courier New',monospace" font-size="11" font-weight="bold" fill="#3fb950">fg %N</text>

  <!-- BG → STOPPED (SIGTTIN) -->
  <path d="M530,188 Q410,220 290,190" fill="none" stroke="#ffa657" stroke-width="1.5" stroke-dasharray="5,3" marker-end="url(#jc-orn)"/>
  <text x="400" y="218" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">SIGTTIN (tries to read terminal)</text>

  <!-- FG → DONE -->
  <line x1="410" y1="102" x2="410" y2="254" stroke="#30363d" stroke-width="1.5" stroke-dasharray="5,3" marker-end="url(#jc-arr)"/>
  <text x="422" y="185" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">normal exit</text>

  <!-- BG → DONE -->
  <path d="M650,206 Q650,250 530,270" fill="none" stroke="#30363d" stroke-width="1.5" stroke-dasharray="5,3" marker-end="url(#jc-arr)"/>

  <!-- Notification boxes -->
  <rect x="14" y="262" width="270" height="36" rx="6" fill="#1a1a3a" stroke="#bc8cff" stroke-width="1"/>
  <text x="149" y="278" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" font-weight="bold" fill="#bc8cff">When bg job completes, bash notifies:</text>
  <text x="149" y="292" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#e6edf3">[1]+ Done    python3 etl.py</text>
  <rect x="540" y="262" width="268" height="36" rx="6" fill="#2a1a1a" stroke="#f85149" stroke-width="1"/>
  <text x="674" y="278" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" font-weight="bold" fill="#f85149">BG process reads stdin → SIGTTIN → STOPS:</text>
  <text x="674" y="292" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#e6edf3">[2]+ Stopped    read_data.py</text>
</svg>
</div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 3 — bg, fg, Ctrl+Z DEEP DIVE
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> <code>fg</code>, <code>bg</code>, Ctrl+Z — Complete Usage Guide</h2>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 2 of 10 — fg, bg, Ctrl+Z, Ctrl+C, jobs, kill %N — every form</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ THE BASIC WORKFLOW ════════════════════════════════════</span>
<span class="cb-cmt"># Start a long command in foreground</span>
<span class="cb-prompt">$</span> python3 etl.py                <span class="cb-cmt"># running in foreground</span>
<span class="cb-out">Processing batch 1/100...</span>
<span class="cb-cmt">^Z                              # Ctrl+Z — STOP the job</span>
<span class="cb-out">[1]+  Stopped                 python3 etl.py</span>
<span class="cb-cmt"># Job is STOPPED (frozen, 0% CPU) — shell prompt returns</span>

<span class="cb-prompt">$</span> bg %1                         <span class="cb-cmt"># resume it IN THE BACKGROUND</span>
<span class="cb-out">[1]+ python3 etl.py &</span>
<span class="cb-cmt"># Now running in background — shell is free</span>

<span class="cb-prompt">$</span> jobs                          <span class="cb-cmt"># check what's running</span>
<span class="cb-out">[1]+  Running                 python3 etl.py &</span>

<span class="cb-prompt">$</span> fg %1                         <span class="cb-cmt"># bring it back to foreground</span>
<span class="cb-out">python3 etl.py</span>
<span class="cb-cmt">^C                              # Ctrl+C — SIGINT — terminate</span>
<span class="cb-out">Interrupted.</span>
<span class="cb-out">[1]+ Exit 1   python3 etl.py</span>

<span class="cb-cmt">## ═══ fg AND bg FORMS ════════════════════════════════════════</span>
fg              <span class="cb-cmt"># bring current job (%) to foreground</span>
fg %%           <span class="cb-cmt"># same as above</span>
fg %1           <span class="cb-cmt"># foreground job number 1</span>
fg %+           <span class="cb-cmt"># foreground current (+) job</span>
fg %-           <span class="cb-cmt"># foreground previous (-) job</span>
fg %python3     <span class="cb-cmt"># foreground job whose name starts with "python3"</span>
fg %?etl        <span class="cb-cmt"># foreground job whose name contains "etl"</span>

bg              <span class="cb-cmt"># resume current stopped job in background</span>
bg %1           <span class="cb-cmt"># resume specific job in background</span>
bg %1 %2 %3     <span class="cb-cmt"># resume multiple stopped jobs in background</span>

<span class="cb-cmt">## ═══ kill WITH JOB SPECS ════════════════════════════════════</span>
kill %1         <span class="cb-cmt"># SIGTERM job 1 (graceful)</span>
kill -9 %1      <span class="cb-cmt"># SIGKILL job 1 (force)</span>
kill -STOP %1   <span class="cb-cmt"># SIGSTOP job 1 (same as Ctrl+Z)</span>
kill -CONT %1   <span class="cb-cmt"># SIGCONT job 1 (same as bg %1)</span>
kill -HUP %1    <span class="cb-cmt"># send SIGHUP (reload config)</span>
kill %1 %2 %3   <span class="cb-cmt"># kill multiple jobs</span>

<span class="cb-cmt">## ═══ CTRL+Z vs CTRL+C vs CTRL+\ ═════════════════════════════</span>
<span class="cb-cmt"># Ctrl+C  → SIGINT  → interrupt (usually terminates)
# Ctrl+Z  → SIGTSTP → stop (suspend, resumable)
# Ctrl+\  → SIGQUIT → quit + core dump (debug crashes)
# Ctrl+D  → EOF     → NOT a signal — closes stdin
#
# These go to the FOREGROUND process group (all processes in pipeline)</span>

<span class="cb-cmt">## ═══ JOB COMPLETION NOTIFICATIONS ══════════════════════════</span>
<span class="cb-prompt">$</span> python3 etl.py &amp; sleep 2 &amp;
<span class="cb-out">[1] 5001</span>
<span class="cb-out">[2] 5002</span>
<span class="cb-prompt">$</span>
<span class="cb-out">[2]+  Done                    sleep 2</span>      <span class="cb-cmt">← appears before next prompt</span>
<span class="cb-cmt"># Bash checks for completed jobs before each prompt
# Notification format:
# [N]+ Done     CMD     ← exited normally (exit 0)
# [N]+ Exit 1   CMD     ← exited with error (exit N)
# [N]+ Killed   CMD     ← killed by signal
# [N]+ Stopped  CMD     ← stopped (Ctrl+Z)</span>

<span class="cb-cmt">## ═══ set -b: IMMEDIATE JOB NOTIFICATION ════════════════════</span>
<span class="cb-prompt">$</span> set -b                         <span class="cb-cmt"># notify immediately (not just before prompt)</span>
<span class="cb-prompt">$</span> sleep 1 &amp;
<span class="cb-out">[1] 5003</span>
<span class="cb-out">[1]+  Done                    sleep 1</span>       <span class="cb-cmt">← appears immediately after 1s</span>
<span class="cb-prompt">$</span> set +b                         <span class="cb-cmt"># restore default behaviour</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 4 — SESSIONS, PROCESS GROUPS, TTY (ANIMATED)
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Sessions, Process Groups &amp; the Terminal — The Full Picture</h2>

<p>To truly understand job control, you need the three-layer model: <strong>sessions</strong> (login scope), <strong>process groups</strong> (job scope), and the <strong>controlling terminal</strong> (TTY). This is the kernel machinery that makes Ctrl+C kill the right processes.</p>

<div class="diagram-wrap">
<svg viewBox="0 0 820 320" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 20px;">
  <rect width="820" height="320" fill="#0d1117" rx="12"/>
  <text x="410" y="24" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="13" font-weight="bold" fill="#8b949e">Session / Process Group / Terminal — Three-Layer Kernel Model</text>

  <!-- SESSION layer -->
  <rect x="14" y="36" width="792" height="274" rx="10" fill="#0e0e14" stroke="#bc8cff" stroke-width="1.5" stroke-dasharray="6,3"/>
  <text x="24" y="53" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#bc8cff">SESSION (SID=4800)  ←  one SSH connection, one login</text>

  <!-- TTY box (right side) -->
  <rect x="660" y="58" width="134" height="100" rx="8" fill="#1f1428" stroke="#bc8cff" stroke-width="2"/>
  <text x="727" y="78" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#bc8cff">TTY / pts/0</text>
  <text x="727" y="94" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">controlling terminal</text>
  <text x="727" y="110" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Ctrl+C → SIGINT</text>
  <text x="727" y="124" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">to foreground PGID</text>
  <text x="727" y="140" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Ctrl+Z → SIGTSTP</text>
  <text x="727" y="152" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">SIGHUP on close</text>

  <!-- Bash process group -->
  <rect x="26" y="62" width="210" height="60" rx="8" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="131" y="80" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#3fb950">Process Group PGID=4820</text>
  <text x="131" y="96" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">bash (PID 4820) ← session leader</text>
  <text x="131" y="110" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">This is FOREGROUND group</text>

  <!-- Job 1 process group -->
  <rect x="26" y="138" width="210" height="72" rx="8" fill="#0e1824" stroke="#58a6ff" stroke-width="2"/>
  <text x="131" y="156" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#58a6ff">[1] PGID=5001 (bg)</text>
  <text x="131" y="172" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">python3 etl.py (5001)</text>
  <text x="131" y="188" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">background — no terminal I/O</text>
  <text x="131" y="200" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#58a6ff">SIGTTIN if tries to read stdin</text>

  <!-- Job 2 process group (pipeline) -->
  <rect x="26" y="224" width="620" height="76" rx="8" fill="#1a1a2a" stroke="#bc8cff" stroke-width="2"/>
  <text x="336" y="242" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#bc8cff">[2] PGID=5010 (pipeline job — 3 processes in ONE process group)</text>
  <rect x="38" y="252" width="120" height="36" rx="5" fill="#1a2a1a" stroke="#3fb950" stroke-width="1"/>
  <text x="98" y="268" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#3fb950">cat (5010)</text>
  <text x="98" y="282" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8" fill="#8b949e">PGID=5010</text>
  <line x1="158" y1="270" x2="180" y2="270" stroke="#ffa657" stroke-width="1.5" marker-end="url(#jc-orn)"/>
  <text x="168" y="263" font-family="'Segoe UI',sans-serif" font-size="8" fill="#ffa657">|</text>
  <rect x="180" y="252" width="138" height="36" rx="5" fill="#1a2a1a" stroke="#3fb950" stroke-width="1"/>
  <text x="249" y="268" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#3fb950">python3 (5011)</text>
  <text x="249" y="282" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8" fill="#8b949e">PGID=5010</text>
  <line x1="318" y1="270" x2="340" y2="270" stroke="#ffa657" stroke-width="1.5" marker-end="url(#jc-orn)"/>
  <text x="328" y="263" font-family="'Segoe UI',sans-serif" font-size="8" fill="#ffa657">|</text>
  <rect x="340" y="252" width="120" height="36" rx="5" fill="#1a2a1a" stroke="#3fb950" stroke-width="1"/>
  <text x="400" y="268" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#3fb950">psql (5012)</text>
  <text x="400" y="282" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8" fill="#8b949e">PGID=5010</text>
  <text x="540" y="276" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#bc8cff">Ctrl+C → SIGINT → ALL 3 simultaneously</text>

  <!-- TTY connection line -->
  <line x1="236" y1="82" x2="660" y2="108" stroke="#bc8cff" stroke-width="1.5" stroke-dasharray="5,3"/>
  <text x="420" y="78" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#bc8cff">foreground group owns terminal</text>
</svg>
<p class="diagram-caption">The kernel tracks which process group is the <em>foreground group</em> for a terminal. Ctrl+C sends SIGINT to every member of that group simultaneously — that's why Ctrl+C on a pipeline kills all three processes at once. Background groups cannot read from the terminal (they get SIGTTIN instead).</p>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 3 of 10 — Sessions, PGID, SID, controlling terminal, setsid</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ INSPECT SESSION AND PROCESS GROUP ══════════════════════</span>
<span class="cb-prompt">$</span> ps -o pid,ppid,pgid,sid,tty,stat,comm -p $$ $(jobs -p)
<span class="cb-out">  PID  PPID  PGID   SID TT   STAT COMMAND</span>
<span class="cb-out"> 4820  4800  4820  4800 pts/0 Ss   bash       ← bash: PGID=SID=4820</span>
<span class="cb-out"> 5001  4820  5001  4800 pts/0 S    python3    ← bg job, own PGID</span>
<span class="cb-cmt"># SID=4800 for all — same session (same SSH connection)
# bash is session leader (PID=SID)
# bash is also its own process group leader (PID=PGID)</span>

<span class="cb-cmt">## ═══ setsid — CREATE NEW SESSION (detach from TTY) ══════════</span>
<span class="cb-prompt">$</span> setsid python3 daemon.py      <span class="cb-cmt"># run in new session (no terminal)</span>
<span class="cb-prompt">$</span> ps -o pid,pgid,sid,tty,comm -p $(pgrep python3)
<span class="cb-out">  PID  PGID   SID TT       COMMAND</span>
<span class="cb-out"> 5020  5020  5020 ?        python3</span>
<span class="cb-cmt"># TT=? means no controlling terminal
# Now SIGHUP from terminal close has NO EFFECT on this process</span>

<span class="cb-cmt">## ═══ WHY CLOSING TERMINAL KILLS BACKGROUND JOBS ═════════════</span>
<span class="cb-cmt"># When SSH disconnects or terminal window closes:
# 1. Terminal (pts/0) closes
# 2. Kernel sends SIGHUP to the session leader (bash)
# 3. Bash sends SIGHUP to all its job process groups
# 4. Default action of SIGHUP = terminate
# Result: all background jobs die!
#
# Fix options:
# - nohup CMD &       (ignore SIGHUP before starting)
# - disown %N         (remove from bash job table)
# - setsid CMD        (create new session — no TTY)
# - screen / tmux     (terminal multiplexer — survives disconnect)</span>

<span class="cb-cmt">## ═══ BASH_SUBSHELL AND JOB CONTROL IN SUBSHELLS ═════════════</span>
<span class="cb-prompt">$</span> (python3 etl.py &amp; wait)        <span class="cb-cmt"># subshell has its own job table</span>
<span class="cb-cmt"># Job control (%N, fg, bg) does NOT cross subshell boundaries
# In scripts: use PIDs directly ($!), not job specs</span>

<span class="cb-cmt">## ═══ MONITOR MODE (job control enabled in scripts) ══════════</span>
<span class="cb-cmt"># Job control is off by default in non-interactive scripts
# Enable with: set -m  (monitor mode)</span>
<span class="cb-cmt"># In scripts, prefer: CMD &amp; PID=$!; wait $PID</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 5 — nohup / disown (ANIMATED DETACH)
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> <code>nohup</code> &amp; <code>disown</code> — Surviving Terminal Close</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 230" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="230" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">Terminal Close → SIGHUP Flow — nohup vs disown vs setsid vs tmux</text>

  <!-- Terminal closes -->
  <rect x="14" y="36" width="120" height="44" rx="7" fill="#2a1a1a" stroke="#f85149" stroke-width="2" class="jc-blink"/>
  <text x="74" y="56" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#f85149">Terminal</text>
  <text x="74" y="70" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#f85149">CLOSES</text>

  <!-- SIGHUP -->
  <line x1="134" y1="58" x2="190" y2="58" stroke="#f85149" stroke-width="2" marker-end="url(#jc-red)" class="jc-flow"/>
  <text x="162" y="50" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#f85149">SIGHUP</text>

  <!-- Bash receives -->
  <rect x="190" y="36" width="130" height="44" rx="7" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="255" y="56" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#3fb950">bash</text>
  <text x="255" y="70" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">forwards SIGHUP</text>

  <!-- Bash forwards to jobs -->
  <line x1="320" y1="58" x2="380" y2="58" stroke="#f85149" stroke-width="2" marker-end="url(#jc-red)" class="jc-flow"/>
  <text x="350" y="50" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#f85149">to all jobs</text>

  <!-- Four outcome boxes -->
  <!-- Default - dies -->
  <rect x="380" y="28" width="160" height="52" rx="7" fill="#2a1a1a" stroke="#f85149" stroke-width="1.5"/>
  <text x="460" y="48" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#f85149">Default job</text>
  <text x="460" y="64" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#f85149">→ KILLED by SIGHUP ❌</text>

  <!-- nohup -->
  <rect x="380" y="94" width="160" height="52" rx="7" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.5"/>
  <text x="460" y="114" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" font-weight="bold" fill="#3fb950">nohup cmd &amp;</text>
  <text x="460" y="130" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">SIGHUP → ignored ✅</text>

  <!-- disown -->
  <rect x="556" y="28" width="160" height="52" rx="7" fill="#0e1824" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="636" y="48" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" font-weight="bold" fill="#58a6ff">disown %N</text>
  <text x="636" y="64" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#58a6ff">removed from job table ✅</text>

  <!-- setsid -->
  <rect x="556" y="94" width="160" height="52" rx="7" fill="#1f1428" stroke="#bc8cff" stroke-width="1.5"/>
  <text x="636" y="114" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" font-weight="bold" fill="#bc8cff">setsid cmd</text>
  <text x="636" y="130" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#bc8cff">new session, no TTY ✅</text>

  <!-- Comparison table -->
  <rect x="14" y="152" width="792" height="68" rx="6" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="26" y="170" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">Comparison:</text>
  <text x="120" y="170" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#f85149">Default bg job</text>
  <text x="254" y="170" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#3fb950">nohup cmd &amp;</text>
  <text x="388" y="170" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#58a6ff">cmd &amp; disown</text>
  <text x="522" y="170" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#bc8cff">setsid cmd</text>
  <text x="660" y="170" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">screen/tmux</text>

  <text x="26"  y="188" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Survives logout?</text>
  <text x="175" y="188" font-family="'Segoe UI',sans-serif" font-size="9" fill="#f85149">❌ No</text>
  <text x="295" y="188" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">✅ Yes</text>
  <text x="420" y="188" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">✅ Yes</text>
  <text x="553" y="188" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">✅ Yes</text>
  <text x="685" y="188" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">✅ Yes</text>

  <text x="26"  y="208" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">In bash job table?</text>
  <text x="175" y="208" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">✅ Yes</text>
  <text x="295" y="208" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">✅ Yes</text>
  <text x="420" y="208" font-family="'Segoe UI',sans-serif" font-size="9" fill="#f85149">❌ No</text>
  <text x="553" y="208" font-family="'Segoe UI',sans-serif" font-size="9" fill="#f85149">❌ No</text>
  <text x="685" y="208" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">separate session</text>
</svg>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 4 of 10 — nohup, disown, setsid — every form with output details</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ nohup — IGNORE SIGHUP AT LAUNCH ═══════════════════════</span>
<span class="cb-prompt">$</span> nohup python3 etl.py &amp;
<span class="cb-out">nohup: ignoring input and appending output to 'nohup.out'</span>
<span class="cb-out">[1] 5001</span>
<span class="cb-cmt"># nohup does THREE things:
# 1. Sets SIGHUP to SIG_IGN (ignore) in the child
# 2. Redirects stdin from /dev/null (no terminal)
# 3. Redirects stdout+stderr to nohup.out (if not redirected)
# Now you can logout — the process continues running</span>

<span class="cb-cmt"># Redirect output yourself (recommended):</span>
<span class="cb-prompt">$</span> nohup python3 etl.py > /var/log/etl.log 2>&amp;1 &amp;

<span class="cb-cmt"># nohup with custom log + PID file:</span>
<span class="cb-prompt">$</span> nohup python3 etl.py > /var/log/etl.log 2>&amp;1 &amp;
<span class="cb-prompt">$</span> echo $! > /tmp/etl.pid
<span class="cb-prompt">$</span> echo "ETL started: PID=$(cat /tmp/etl.pid)"
<span class="cb-out">ETL started: PID=5001</span>

<span class="cb-cmt">## ═══ disown — REMOVE FROM JOB TABLE AFTER STARTING ══════════</span>
<span class="cb-cmt"># Start normally, then detach:</span>
<span class="cb-prompt">$</span> python3 etl.py &amp;
<span class="cb-out">[1] 5001</span>
<span class="cb-prompt">$</span> disown %1           <span class="cb-cmt"># remove job 1 from bash's job table</span>
<span class="cb-cmt"># Now logout — bash won't send SIGHUP to it
# BUT process still receives SIGHUP from kernel (if terminal closes)
# disown -h: marks as SIGHUP-immune but keeps in job table</span>

<span class="cb-prompt">$</span> python3 etl.py &amp;
<span class="cb-out">[1] 5001</span>
<span class="cb-prompt">$</span> disown -h %1        <span class="cb-cmt"># keep in job table but don't send SIGHUP</span>
<span class="cb-prompt">$</span> jobs                <span class="cb-cmt"># still shows up in jobs</span>
<span class="cb-out">[1]+  Running    python3 etl.py &amp;</span>

<span class="cb-prompt">$</span> disown              <span class="cb-cmt"># disown ALL jobs</span>
<span class="cb-prompt">$</span> disown -a           <span class="cb-cmt"># same</span>
<span class="cb-prompt">$</span> disown -r           <span class="cb-cmt"># disown only running jobs</span>

<span class="cb-cmt">## ═══ THE COMPLETE IDIOM: START + DETACH ═════════════════════</span>
<span class="cb-cmt"># Best approach — immune to SIGHUP AND removed from job table:</span>
<span class="cb-prompt">$</span> nohup python3 etl.py > /var/log/etl.log 2>&amp;1 &amp;
<span class="cb-prompt">$</span> disown $!
<span class="cb-prompt">$</span> echo "Running as PID $!"

<span class="cb-cmt">## ═══ setsid — TRUE DETACH: NEW SESSION ══════════════════════</span>
<span class="cb-prompt">$</span> setsid python3 daemon.py &amp;     <span class="cb-cmt"># new session, new process group</span>
<span class="cb-prompt">$</span> ps -o pid,pgid,sid,tty -p $!
<span class="cb-out">  PID  PGID   SID TT</span>
<span class="cb-out"> 5050  5050  5050 ?</span>
<span class="cb-cmt"># TT=? = no controlling terminal
# SID=PID = is its own session leader
# Completely independent of your login session</span>

<span class="cb-cmt">## ═══ screen / tmux — RECONNECTABLE SESSIONS ════════════════</span>
<span class="cb-prompt">$</span> screen -S etl-job              <span class="cb-cmt"># create named session</span>
<span class="cb-cmt"># ... run your job ...
# Ctrl+A D                       # detach (session keeps running)
# logout and reconnect later:</span>
<span class="cb-prompt">$</span> screen -r etl-job              <span class="cb-cmt"># reattach to session</span>
<span class="cb-prompt">$</span> tmux new -s etl-job            <span class="cb-cmt"># tmux equivalent</span>
<span class="cb-prompt">$</span> tmux attach -t etl-job         <span class="cb-cmt"># reattach</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 6 — wait: COLLECTING JOB RESULTS
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> <code>wait</code> — Collecting Results from Background Jobs</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="200" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">wait — Three Forms: wait all / wait PID / wait -n (any)</text>

  <!-- Timeline -->
  <text x="40" y="44" font-family="'Segoe UI',sans-serif" font-size="9" fill="#30363d">Time →</text>
  <line x1="56" y1="48" x2="800" y2="48" stroke="#30363d" stroke-width="1"/>

  <!-- Job A bar -->
  <text x="56" y="70" font-family="'Segoe UI',sans-serif" font-size="9" fill="#58a6ff">Job A</text>
  <rect x="90" y="60" width="180" height="20" rx="4" fill="#0e1824" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="180" y="74" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#58a6ff">load.py (30s)</text>
  <circle cx="270" cy="70" r="5" fill="#3fb950"/>

  <!-- Job B bar -->
  <text x="56" y="100" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">Job B</text>
  <rect x="90" y="90" width="320" height="20" rx="4" fill="#2a2214" stroke="#ffa657" stroke-width="1.5"/>
  <text x="250" y="104" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#ffa657">transform.py (60s)</text>
  <circle cx="410" cy="100" r="5" fill="#3fb950"/>

  <!-- Job C bar -->
  <text x="56" y="130" font-family="'Segoe UI',sans-serif" font-size="9" fill="#bc8cff">Job C</text>
  <rect x="90" y="120" width="250" height="20" rx="4" fill="#1a1428" stroke="#bc8cff" stroke-width="1.5"/>
  <text x="215" y="134" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#bc8cff">validate.py (45s)</text>
  <circle cx="340" cy="130" r="5" fill="#3fb950"/>

  <!-- wait markers -->
  <!-- wait all = at max completion -->
  <line x1="410" y1="46" x2="410" y2="158" stroke="#ffa657" stroke-width="1.5" stroke-dasharray="5,3"/>
  <text x="412" y="165" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#ffa657">wait (all) = 60s</text>
  <text x="412" y="176" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#ffa657">blocks until ALL done</text>

  <!-- wait -n = at first completion -->
  <line x1="270" y1="46" x2="270" y2="148" stroke="#58a6ff" stroke-width="1.5" stroke-dasharray="5,3"/>
  <text x="160" y="160" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#58a6ff">wait -n = 30s (first done)</text>
  <text x="160" y="172" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#58a6ff">can process early results</text>

  <!-- wait PID -->
  <line x1="340" y1="46" x2="340" y2="148" stroke="#bc8cff" stroke-width="1.5" stroke-dasharray="5,3"/>
  <text x="500" y="160" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#bc8cff">wait $PID_C = 45s</text>
  <text x="500" y="172" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#bc8cff">specific job only</text>

  <!-- Legend -->
  <circle cx="660" cy="65" r="5" fill="#3fb950"/>
  <text x="670" y="69" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">= job completed</text>
  <text x="660" y="88" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Sequential total: 135s</text>
  <text x="660" y="103" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">Parallel total: 60s (2.25× faster)</text>
</svg>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 5 of 10 — wait: all forms, exit code collection, wait -n, timeout</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ wait — BASIC FORMS ═════════════════════════════════════</span>
wait             <span class="cb-cmt"># wait for ALL background jobs</span>
wait $PID        <span class="cb-cmt"># wait for specific PID, get its exit code</span>
wait %1          <span class="cb-cmt"># wait for job 1</span>
wait $PID1 $PID2 <span class="cb-cmt"># wait for multiple PIDs (returns when ALL done)</span>
wait -n          <span class="cb-cmt"># wait for ANY one job to complete (bash 5.1+)</span>

<span class="cb-cmt">## ═══ COLLECTING EXIT CODES ═══════════════════════════════════</span>
python3 load.py &amp;       LOAD_PID=$!
python3 validate.py &amp;   VAL_PID=$!
python3 transform.py &amp;  XFORM_PID=$!

wait $LOAD_PID;  LOAD_RC=$?
wait $VAL_PID;   VAL_RC=$?
wait $XFORM_PID; XFORM_RC=$?

echo "Load: $LOAD_RC  Validate: $VAL_RC  Transform: $XFORM_RC"
<span class="cb-cmt"># exit code 0 = success  non-zero = failure</span>

<span class="cb-cmt">## ═══ PARALLEL JOBS WITH FAILURE DETECTION ═══════════════════</span>
run_parallel() {
    local -a PIDS=() NAMES=()
    local -i FAILED=0

    for STEP in load validate transform; do
        python3 "\${STEP}.py" &amp;
        PIDS+=($!); NAMES+=("$STEP")
    done

    for i in "\${!PIDS[@]}"; do
        wait "\${PIDS[$i]}" || {
            echo "FAILED: \${NAMES[$i]} (PID \${PIDS[$i]})" >&2
            (( FAILED++ ))
        }
    done

    return "$FAILED"
}
run_parallel && echo "All succeeded" || echo "Some failed"

<span class="cb-cmt">## ═══ wait -n: PROCESS AS EACH FINISHES (bash 5.1+) ══════════</span>
<span class="cb-cmt"># Classic approach for processing results as they arrive:</span>
declare -A JOB_MAP            <span class="cb-cmt"># PID → name</span>
FAIL_COUNT=0

for FILE in /data/chunk_*.csv; do
    python3 process.py "$FILE" &amp;
    JOB_MAP[$!]="$FILE"
done

while (( \${#JOB_MAP[@]} > 0 )); do
    wait -n                   <span class="cb-cmt"># wait for next one to finish</span>
    PID=$!; RC=$?
    NAME="\${JOB_MAP[$PID]:-unknown}"
    unset "JOB_MAP[$PID]"
    if (( RC == 0 )); then
        echo "✅ Done: $NAME"
    else
        echo "❌ Failed (rc=$RC): $NAME" >&2
        (( FAIL_COUNT++ ))
    fi
done
echo "Total failures: $FAIL_COUNT"

<span class="cb-cmt">## ═══ TIMEOUT ON wait ═════════════════════════════════════════</span>
<span class="cb-cmt"># Wait with timeout (bash has no built-in timeout for wait):</span>
wait_timeout() {
    local PID="$1" TIMEOUT="$2"
    local ELAPSED=0
    while kill -0 "$PID" 2>/dev/null; do
        (( ELAPSED++ >= TIMEOUT )) && {
            echo "Timeout after \${TIMEOUT}s — killing $PID" >&2
            kill -TERM "$PID" 2>/dev/null
            sleep 2
            kill -KILL "$PID" 2>/dev/null
            return 124    <span class="cb-cmt"># standard timeout exit code</span>
        }
        sleep 1
    done
    wait "$PID"; return $?
}

python3 etl.py &amp; ETL_PID=$!
wait_timeout $ETL_PID 300 || echo "ETL timed out"
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 7 — PARALLEL JOB POOL (ANIMATED)
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Parallel Job Pool — Animated Concurrency Control</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 260" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 20px;">
  <rect width="820" height="260" fill="#0d1117" rx="12"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">Parallel Job Pool — 4 Workers Processing 10 Files (Animated)</text>

  <!-- Worker lanes -->
  <text x="56" y="50" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Worker</text>
  <line x1="90" y1="44" x2="800" y2="44" stroke="#30363d" stroke-width="1"/>

  <!-- Lane labels -->
  <text x="56" y="72"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#58a6ff">W1</text>
  <text x="56" y="108" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#3fb950">W2</text>
  <text x="56" y="144" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#ffa657">W3</text>
  <text x="56" y="180" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#bc8cff">W4</text>

  <!-- Worker 1 jobs -->
  <rect x="90"  y="58" width="120" height="26" rx="4" fill="#0e1824" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="150" y="75" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#58a6ff">chunk_01.csv</text>
  <rect x="222" y="58" width="140" height="26" rx="4" fill="#0e1824" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="292" y="75" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#58a6ff">chunk_05.csv</text>
  <rect x="374" y="58" width="110" height="26" rx="4" fill="#0e1824" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="429" y="75" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#58a6ff">chunk_09.csv</text>

  <!-- Worker 2 jobs -->
  <rect x="90"  y="94"  width="150" height="26" rx="4" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.5"/>
  <text x="165" y="111" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#3fb950">chunk_02.csv</text>
  <rect x="252" y="94"  width="120" height="26" rx="4" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.5"/>
  <text x="312" y="111" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#3fb950">chunk_06.csv</text>
  <rect x="384" y="94"  width="140" height="26" rx="4" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.5"/>
  <text x="454" y="111" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#3fb950">chunk_10.csv</text>

  <!-- Worker 3 jobs -->
  <rect x="90"  y="130" width="130" height="26" rx="4" fill="#2a2214" stroke="#ffa657" stroke-width="1.5"/>
  <text x="155" y="147" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#ffa657">chunk_03.csv</text>
  <rect x="232" y="130" width="160" height="26" rx="4" fill="#2a2214" stroke="#ffa657" stroke-width="1.5"/>
  <text x="312" y="147" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#ffa657">chunk_07.csv</text>

  <!-- Worker 4 jobs -->
  <rect x="90"  y="166" width="110" height="26" rx="4" fill="#1a1428" stroke="#bc8cff" stroke-width="1.5"/>
  <text x="145" y="183" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#bc8cff">chunk_04.csv</text>
  <rect x="212" y="166" width="150" height="26" rx="4" fill="#1a1428" stroke="#bc8cff" stroke-width="1.5"/>
  <text x="287" y="183" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#bc8cff">chunk_08.csv</text>

  <!-- Sequential reference -->
  <text x="660" y="70" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Sequential (1 worker):</text>
  <rect x="600" y="76" width="200" height="15" rx="3" fill="#30363d"/>
  <text x="700" y="88" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">100% CPU time</text>

  <text x="660" y="115" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">Parallel (4 workers):</text>
  <rect x="600" y="121" width="50"  height="15" rx="3" fill="#1a2a1a" stroke="#3fb950" stroke-width="1"/>
  <text x="700" y="133" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">~25% wall time</text>

  <!-- Stats -->
  <rect x="14" y="204" width="792" height="48" rx="6" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="26" y="222" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">Pool pattern rules:</text>
  <text x="158" y="222" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">MAX_JOBS = nproc (or nproc/2 to leave headroom)  •  Check remaining count with </text>
  <text x="632" y="222" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">jobs -p | wc -l</text>
  <text x="26" y="241" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Always collect exit codes  •  </text>
  <text x="202" y="241" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">wait -n</text>
  <text x="246" y="241" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e"> (bash 5.1+) processes results as each job finishes  •  Trap INT/TERM to kill all workers on error</text>
</svg>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 6 of 10 — Job pool: classic approach, wait -n streaming, xargs parallel</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ CLASSIC PARALLEL JOB POOL ══════════════════════════════</span>
<span class="cb-out">#!/usr/bin/env bash</span>
<span class="cb-out">set -euo pipefail</span>
<span class="cb-out"></span>
<span class="cb-out">MAX_JOBS=$(nproc)         # one worker per CPU core</span>
<span class="cb-out">FAILED=0</span>
<span class="cb-out">PIDS=()</span>
<span class="cb-out"></span>
<span class="cb-out">cleanup() { (( \${#PIDS[@]} > 0 )) && kill "\${PIDS[@]}" 2>/dev/null; }</span>
<span class="cb-out">trap cleanup EXIT INT TERM</span>
<span class="cb-out"></span>
<span class="cb-out">process_chunk() {</span>
<span class="cb-out">    local FILE="$1"</span>
<span class="cb-out">    python3 transform.py "$FILE" && echo "✅ $FILE" || { echo "❌ $FILE" >&2; return 1; }</span>
<span class="cb-out">}</span>
<span class="cb-out"></span>
<span class="cb-out">for FILE in /data/chunk_*.csv; do</span>
<span class="cb-out">    # Throttle: wait until pool has room</span>
<span class="cb-out">    while (( $(jobs -p | wc -l) >= MAX_JOBS )); do</span>
<span class="cb-out">        sleep 0.2</span>
<span class="cb-out">    done</span>
<span class="cb-out"></span>
<span class="cb-out">    process_chunk "$FILE" &amp;</span>
<span class="cb-out">    PIDS+=($!)</span>
<span class="cb-out">done</span>
<span class="cb-out"></span>
<span class="cb-out"># Collect all results</span>
<span class="cb-out">for PID in "\${PIDS[@]}"; do</span>
<span class="cb-out">    wait "$PID" || (( FAILED++ ))</span>
<span class="cb-out">done</span>
<span class="cb-out">echo "Done. Failures: $FAILED"</span>

<span class="cb-cmt">## ═══ STREAMING POOL WITH wait -n (bash 5.1+) ════════════════</span>
<span class="cb-out">declare -A JOB_FILES    # PID → filename map</span>
<span class="cb-out">MAX_JOBS=$(nproc)</span>
<span class="cb-out">FAILED=0</span>
<span class="cb-out"></span>
<span class="cb-out">submit() {</span>
<span class="cb-out">    python3 transform.py "$1" &amp;</span>
<span class="cb-out">    JOB_FILES[$!]="$1"</span>
<span class="cb-out">}</span>
<span class="cb-out"></span>
<span class="cb-out">collect_one() {</span>
<span class="cb-out">    wait -n; local RC=$? PID=$!</span>
<span class="cb-out">    local FILE="\${JOB_FILES[$PID]:-unknown}"</span>
<span class="cb-out">    unset "JOB_FILES[$PID]"</span>
<span class="cb-out">    (( RC == 0 )) && echo "✅ $FILE" || { echo "❌ $FILE (rc=$RC)" >&2; (( FAILED++ )); }</span>
<span class="cb-out">}</span>
<span class="cb-out"></span>
<span class="cb-out">for FILE in /data/chunk_*.csv; do</span>
<span class="cb-out">    while (( \${#JOB_FILES[@]} >= MAX_JOBS )); do collect_one; done</span>
<span class="cb-out">    submit "$FILE"</span>
<span class="cb-out">done</span>
<span class="cb-out">while (( \${#JOB_FILES[@]} > 0 )); do collect_one; done</span>
<span class="cb-out">echo "All done. Failures: $FAILED"</span>

<span class="cb-cmt">## ═══ xargs -P: SIMPLE PARALLEL (no bash job control needed) ═</span>
<span class="cb-prompt">$</span> ls /data/chunk_*.csv | xargs -P "$(nproc)" -I{} python3 transform.py {}
<span class="cb-cmt"># -P 4 = up to 4 parallel processes
# -I{} = replace {} with each argument
# Simpler than manual pool but less control over exit codes</span>

<span class="cb-cmt"># With exit code collection:</span>
<span class="cb-prompt">$</span> ls /data/chunk_*.csv | xargs -P "$(nproc)" -I{} \
    sh -c 'python3 transform.py "$1" || echo "FAILED: $1" >&2' -- {}
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 8 — PIPELINE JOBS
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Pipeline Jobs — Control and Monitor</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 180" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="180" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">Pipeline as a Job — Three Processes, One PGID, One Job Number</text>

  <!-- Pipeline flow -->
  <rect x="14"  y="42" width="140" height="50" rx="8" fill="#0e1824" stroke="#58a6ff" stroke-width="2"/>
  <text x="84"  y="62" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#58a6ff">cat (5010)</text>
  <text x="84"  y="78" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">reads file</text>
  <text x="84"  y="90" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#8b949e">PGID=5010</text>

  <line x1="154" y1="67" x2="200" y2="67" stroke="#ffa657" stroke-width="2" marker-end="url(#jc-orn)" class="jc-flow"/>
  <text x="177" y="60" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">stdout|stdin</text>

  <rect x="200" y="42" width="170" height="50" rx="8" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="285" y="62" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#3fb950">python3 (5011)</text>
  <text x="285" y="78" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">transforms data</text>
  <text x="285" y="90" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#8b949e">PGID=5010</text>

  <line x1="370" y1="67" x2="416" y2="67" stroke="#ffa657" stroke-width="2" marker-end="url(#jc-orn)" class="jc-flow"/>
  <text x="393" y="60" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">stdout|stdin</text>

  <rect x="416" y="42" width="150" height="50" rx="8" fill="#1f1428" stroke="#bc8cff" stroke-width="2"/>
  <text x="491" y="62" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#bc8cff">psql (5012)</text>
  <text x="491" y="78" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">loads to DB</text>
  <text x="491" y="90" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#8b949e">PGID=5010</text>

  <!-- Job label -->
  <rect x="570" y="42" width="240" height="50" rx="8" fill="#161b22" stroke="#30363d" stroke-width="1.5"/>
  <text x="690" y="60" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">[3] Running — ONE JOB</text>
  <text x="690" y="76" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#e6edf3">cat ... | python3 ... | psql</text>
  <text x="690" y="90" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#8b949e">kill %3 → kill PGID 5010 → all 3 die</text>

  <!-- Pipeline exit code note -->
  <rect x="14" y="104" width="792" height="66" rx="6" fill="#1a1a2a" stroke="#bc8cff" stroke-width="1"/>
  <text x="26" y="122" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#bc8cff">Pipeline exit code rules:</text>
  <text x="26" y="138" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Default: exit code = exit code of the LAST command (psql). Even if python3 failed, if psql succeeds, pipeline "succeeds".</text>
  <text x="26" y="154" font-family="'Segoe UI',sans-serif" font-size="10" fill="#3fb950">With <tspan font-family="'Courier New',monospace">set -o pipefail</tspan>: exit code = rightmost non-zero exit code. Catches failures anywhere in pipeline.</text>
  <text x="26" y="167" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e"><tspan font-family="'Courier New',monospace">PIPESTATUS</tspan> array holds exit code of every pipeline stage: check <tspan font-family="'Courier New',monospace">\${PIPESTATUS[@]}</tspan> after pipeline.</text>
</svg>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 7 of 10 — Pipeline job control, PIPESTATUS, set -o pipefail, tee</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ PIPELINE AS A JOB ═══════════════════════════════════════</span>
<span class="cb-prompt">$</span> cat data.csv | python3 transform.py | psql -d analytics -c "COPY t FROM STDIN" &amp;
<span class="cb-out">[3] 5012</span>
<span class="cb-cmt"># Last PID in pipeline ($!) is 5012 (psql)
# Ctrl+Z stops ALL three processes simultaneously
# fg %3 resumes all three</span>

<span class="cb-cmt">## ═══ PIPELINE EXIT CODE TRAP ══════════════════════════════════</span>
<span class="cb-prompt">$</span> false | true         <span class="cb-cmt"># false fails, true succeeds</span>
<span class="cb-prompt">$</span> echo \${PIPESTATUS[@]}
<span class="cb-out">1 0</span>
<span class="cb-cmt"># $? = 0 (last cmd)   BUT false failed!
# PIPESTATUS[0]=1 (false)  PIPESTATUS[1]=0 (true)</span>

<span class="cb-prompt">$</span> set -o pipefail
<span class="cb-prompt">$</span> false | true
<span class="cb-out">$ echo $?</span>
<span class="cb-out">1</span>
<span class="cb-cmt"># pipefail: exit code = first non-zero in pipeline
# Use in ALL scripts that have pipelines!</span>

<span class="cb-cmt">## ═══ CAPTURING PIPESTATUS FROM BACKGROUND PIPELINE ══════════</span>
cat data.csv | python3 transform.py | psql -d db -c "COPY t FROM STDIN"
PIPE_RC=("\${PIPESTATUS[@]}")
(( PIPE_RC[0] != 0 )) && echo "cat failed"
(( PIPE_RC[1] != 0 )) && echo "transform failed"
(( PIPE_RC[2] != 0 )) && echo "psql failed"

<span class="cb-cmt">## ═══ tee — BRANCH A PIPELINE ════════════════════════════════</span>
<span class="cb-prompt">$</span> python3 generate.py | tee raw.csv | python3 transform.py | psql -d db &amp;
<span class="cb-cmt"># tee copies to raw.csv AND passes on to transform.py
# Single pipeline does generate + save raw + transform + load</span>

<span class="cb-cmt">## ═══ process substitution — PARALLEL BRANCHES ═══════════════</span>
<span class="cb-prompt">$</span> python3 generate.py | tee \
    >(gzip > /archive/raw.csv.gz) \
    >(python3 validate.py > validation.log) \
    | python3 transform.py | psql -d db &amp;
<span class="cb-cmt"># ONE source → simultaneously: archive + validate + transform+load
# All happen in parallel as data flows through the pipeline</span>

<span class="cb-cmt">## ═══ RUNNING MULTIPLE PIPELINES IN PARALLEL ══════════════════</span>
for REGION in us eu ap; do
    ( cat "\${REGION}_data.csv" | python3 transform.py --region "$REGION" \
      | psql -d db -c "COPY \${REGION}_table FROM STDIN" ) &amp;
done
wait     <span class="cb-cmt"># wait for all three regional pipelines</span>
echo "All regions loaded"
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 9 — BASH JOB TABLE INTERNALS
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Bash Job Table — Internal Structure &amp; State</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 240" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="240" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">Bash Job Table — How jobs, fg, bg Track State Internally</text>

  <!-- Table header -->
  <rect x="14" y="34" width="792" height="24" rx="4" fill="#1f2027" stroke="#30363d" stroke-width="1"/>
  <text x="46"  y="51" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">job#</text>
  <text x="100" y="51" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">state</text>
  <text x="180" y="51" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">PGID</text>
  <text x="260" y="51" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">PIDs in job</text>
  <text x="400" y="51" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">SIGHUP-immune</text>
  <text x="530" y="51" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">command string</text>

  <!-- Job 1 -->
  <rect x="14" y="60" width="792" height="22" rx="2" fill="#0e1824"/>
  <text x="46"  y="75" font-family="'Courier New',monospace" font-size="10" fill="#58a6ff">[1]-</text>
  <text x="100" y="75" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">Running</text>
  <text x="180" y="75" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">5001</text>
  <text x="260" y="75" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">5001</text>
  <text x="400" y="75" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">No</text>
  <text x="530" y="75" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">python3 etl.py</text>

  <!-- Job 2 -->
  <rect x="14" y="84" width="792" height="22" rx="2" fill="#161b22"/>
  <text x="46"  y="99" font-family="'Courier New',monospace" font-size="10" fill="#58a6ff">[2]+</text>
  <text x="100" y="99" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">Stopped</text>
  <text x="180" y="99" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">5002</text>
  <text x="260" y="99" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">5002</text>
  <text x="400" y="99" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">No</text>
  <text x="530" y="99" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">python3 monitor.py</text>

  <!-- Job 3 (pipeline) -->
  <rect x="14" y="108" width="792" height="22" rx="2" fill="#0e1824"/>
  <text x="46"  y="123" font-family="'Courier New',monospace" font-size="10" fill="#58a6ff">[3]</text>
  <text x="100" y="123" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">Running</text>
  <text x="180" y="123" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">5010</text>
  <text x="260" y="123" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">5010 5011 5012</text>
  <text x="400" y="123" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">Yes (-h)</text>
  <text x="530" y="123" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">cat data.csv | python3 ... | psql</text>

  <!-- Annotations -->
  <rect x="14" y="142" width="792" height="90" rx="6" fill="#1a1a2a" stroke="#bc8cff" stroke-width="1"/>
  <text x="26" y="162" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#bc8cff">How bash manages jobs:</text>
  <text x="26" y="178" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">• Bash creates the job table entry when a command with <tspan fill="#3fb950" font-family="'Courier New',monospace">&amp;</tspan> is started or when Ctrl+Z stops a foreground command</text>
  <text x="26" y="194" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">• <tspan fill="#3fb950" font-family="'Courier New',monospace">fg %N</tspan> sends SIGCONT to PGID, moves group to foreground (tcsetpgrp), waits for it</text>
  <text x="26" y="210" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">• <tspan fill="#3fb950" font-family="'Courier New',monospace">bg %N</tspan> sends SIGCONT to PGID, leaves shell in foreground (no tcsetpgrp)</text>
  <text x="26" y="226" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">• <tspan fill="#3fb950" font-family="'Courier New',monospace">disown</tspan> removes from table. <tspan fill="#3fb950" font-family="'Courier New',monospace">disown -h</tspan> marks SIGHUP-immune but keeps in table. SIGHUP goes to non-immune jobs on bash exit.</text>
</svg>
</div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 10 — KERNEL DEEP DIVE
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Kernel Deep Dive — Sessions, Controlling TTY, SIGHUP, tcsetpgrp</h2>

<div class="deepdive-box">
<div class="deepdive-title">⚙️ Job Control Internals — POSIX Sessions, Process Groups, Kernel TTY Driver</div>
<pre style="margin:0;padding:16px;font-family:monospace;font-size:12px;color:#e6edf3;background:#010409;border-radius:0 0 8px 8px;overflow-x:auto;">
1. SESSIONS — THE OUTERMOST SCOPE

   A session is a set of process groups associated with one controlling terminal.
   Created by: setsid(2) syscall — usually called by the login daemon (sshd, login)
   
   Session leader = process that called setsid() = has SID == PID (bash, typically)
   Every process in a session has the same SID (inherits from parent via fork())
   
   A session has at most ONE controlling terminal (the TTY/pts device).
   Sessions WITHOUT a controlling terminal: TT=? in ps output.

2. PROCESS GROUPS — THE JOB SCOPE

   A process group is a set of processes sharing a PGID.
   Created by: setpgid(2) — bash calls this for each pipeline
   
   Bash calls setpgid(child_pid, child_pid) on each child to make it its own process group leader.
   For pipelines: first process gets setpgid(pid, pid), others get setpgid(pid, first_pid)
   This is why all pipeline members share PGID = PID of first command.

3. CONTROLLING TERMINAL AND FOREGROUND GROUP

   The TTY driver tracks which process group is the FOREGROUND group.
   Changed by: tcsetpgrp(tty_fd, pgid) — bash calls this on fg/bg
   
   fg %1:
     1. bash calls tcsetpgrp(0, job_pgid)  ← move job to foreground
     2. bash sends SIGCONT to job_pgid
     3. bash waits (wait/sigsuspend) until job terminates or stops
   
   bg %1:
     1. bash sends SIGCONT to job_pgid
     2. bash does NOT call tcsetpgrp — shell stays foreground
     3. bash returns to prompt
   
   Ctrl+C at terminal:
     1. TTY driver receives Ctrl+C
     2. Kernel sends SIGINT to the FOREGROUND process group (tcgetpgrp())
     3. Every process in that PGID receives SIGINT simultaneously
   
   Background process reads stdin:
     1. Process calls read(stdin_fd, ...)
     2. Kernel detects: caller's PGID ≠ terminal's foreground PGID
     3. Kernel sends SIGTTIN to the process group
     4. Default action: STOP (same as SIGSTOP)
     5. Bash detects stopped bg job → [N]+ Stopped

4. SIGHUP AND SESSION LIFECYCLE

   When terminal closes (user disconnects, SSH drops, window closed):
     1. Kernel sends SIGHUP to session leader (bash)
     2. bash's SIGHUP handler sends SIGHUP to all process groups in its job table
        (except those marked disown -h or nohup'd)
     3. Default SIGHUP action: terminate
   
   nohup mechanism:
     nohup uses signal(SIGHUP, SIG_IGN) in the child before exec()
     This survives exec() because exec() preserves SIG_IGN dispositions
     (but resets SIG_DFL and custom handlers to SIG_DFL)
   
   disown mechanism:
     Removes job from bash's job table
     bash simply never sends SIGHUP to it (doesn't know about it)
     The process still receives SIGHUP from kernel if it's in the same session
     
   setsid mechanism:
     Creates a brand new session — process has no controlling terminal
     No terminal → no SIGHUP from terminal close
     Completely independent of login session

5. WAIT IMPLEMENTATION

   wait PID → waitpid(PID, &status, 0)
     Returns when PID exits or stops
     Exit code in WEXITSTATUS(status)
   
   wait (all) → bash's internal loop calling waitpid(-1, &status, WNOHANG) 
     until no more children
   
   wait -n → waitpid(-1, &status, 0) — waits for ANY child
     Returns the PID that completed (stored in $!)
     Exit code in $?
</pre>
</div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 11 — ADVANCED PATTERNS
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Advanced Job Control Patterns</h2>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 8 of 10 — Fan-out, semaphore pattern, progress monitoring, coproc</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ FAN-OUT WITH LIVE PROGRESS ════════════════════════════</span>
<span class="cb-out">#!/usr/bin/env bash</span>
<span class="cb-out">TOTAL=$(ls /data/chunk_*.csv | wc -l)</span>
<span class="cb-out">DONE=0; FAILED=0</span>
<span class="cb-out">declare -A JOBS   # PID → filename</span>
<span class="cb-out"></span>
<span class="cb-out">print_progress() {</span>
<span class="cb-out">    local PCT=$(( DONE * 100 / TOTAL ))</span>
<span class="cb-out">    printf "\r[%-50s] %3d%% (%d/%d done, %d failed)" \</span>
<span class="cb-out">        "$(printf '#%.0s' $(seq 1 $((PCT/2))))" "$PCT" "$DONE" "$TOTAL" "$FAILED"</span>
<span class="cb-out">}</span>
<span class="cb-out"></span>
<span class="cb-out">for F in /data/chunk_*.csv; do</span>
<span class="cb-out">    python3 process.py "$F" &amp; JOBS[$!]="$F"</span>
<span class="cb-out">done</span>
<span class="cb-out"></span>
<span class="cb-out">while (( \${#JOBS[@]} > 0 )); do</span>
<span class="cb-out">    for PID in "\${!JOBS[@]}"; do</span>
<span class="cb-out">        if ! kill -0 "$PID" 2>/dev/null; then</span>
<span class="cb-out">            wait "$PID" && (( DONE++ )) || { (( FAILED++ )); (( DONE++ )); }</span>
<span class="cb-out">            unset "JOBS[$PID]"</span>
<span class="cb-out">            print_progress</span>
<span class="cb-out">        fi</span>
<span class="cb-out">    done</span>
<span class="cb-out">    sleep 0.5</span>
<span class="cb-out">done</span>
<span class="cb-out">echo; echo "Complete: $DONE done, $FAILED failed"</span>

<span class="cb-cmt">## ═══ SEMAPHORE PATTERN — STRICT PARALLEL LIMIT ══════════════</span>
<span class="cb-cmt"># Use a FIFO as a semaphore (N tokens = N concurrent slots)</span>
run_with_semaphore() {
    local MAX="$1"; shift
    local FIFO; FIFO=$(mktemp -u)
    mkfifo "$FIFO"
    exec 9<>"$FIFO"; rm "$FIFO"    <span class="cb-cmt"># open + delete (FD keeps it alive)</span>

    <span class="cb-cmt"># Fill semaphore with N tokens:</span>
    for _ in $(seq 1 "$MAX"); do echo >&9; done

    local -a PIDS=()
    for FILE in "$@"; do
        read -u 9                   <span class="cb-cmt"># acquire token (blocks if all taken)</span>
        ( python3 process.py "$FILE"; echo >&9 ) &amp;   <span class="cb-cmt"># release on done</span>
        PIDS+=($!)
    done
    for PID in "\${PIDS[@]}"; do wait "$PID"; done
    exec 9>&-
}
run_with_semaphore 4 /data/chunk_*.csv

<span class="cb-cmt">## ═══ coproc — BIDIRECTIONAL BACKGROUND PROCESS ══════════════</span>
<span class="cb-cmt"># coproc starts a process with two connected pipes (stdin AND stdout)</span>
coproc WORKER { python3 worker.py; }
<span class="cb-cmt"># WORKER[0] = FD to read worker's stdout
# WORKER[1] = FD to write to worker's stdin</span>

echo "process /data/chunk_01.csv" >&"\${WORKER[1]}"
read RESULT <&"\${WORKER[0]}"
echo "Result: $RESULT"

<span class="cb-cmt"># Bidirectional pool using coproc:</span>
coproc DB_PIPE { psql -d analytics; }
for SQL in "INSERT..." "UPDATE..." "SELECT..."; do
    echo "$SQL" >&"\${DB_PIPE[1]}"
    read RESPONSE <&"\${DB_PIPE[0]}"
    echo "DB: $RESPONSE"
done
echo "\\q" >&"\${DB_PIPE[1]}"
wait $DB_PIPE_PID

<span class="cb-cmt">## ═══ CHAINED PARALLEL STAGES ════════════════════════════════</span>
<span class="cb-cmt"># Stage 1 and Stage 2 run in parallel using a shared FIFO</span>
PIPE=$(mktemp -u); mkfifo "$PIPE"
python3 generate.py > "$PIPE" &amp;      <span class="cb-cmt"># producer</span>
python3 transform.py < "$PIPE" | psql -d db &amp;   <span class="cb-cmt"># consumer</span>
rm "$PIPE"
wait
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 12 — REAL-WORLD PATTERNS
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Real-World Data Engineering Job Patterns</h2>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 9 of 10 — Production parallel ETL, nohup long jobs, multi-stage orchestration</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ PATTERN 1: DAILY PARALLEL ETL RUNNER ═══════════════════</span>
<span class="cb-out">#!/usr/bin/env bash</span>
<span class="cb-out">set -euo pipefail</span>
<span class="cb-out">DATE="\${1:-$(date +%Y-%m-%d)}"</span>
<span class="cb-out">LOG_DIR="/var/log/etl/\${DATE}"</span>
<span class="cb-out">mkdir -p "$LOG_DIR"</span>
<span class="cb-out"></span>
<span class="cb-out">REGIONS=(us eu ap-south ap-east)</span>
<span class="cb-out">declare -A PIDS</span>
<span class="cb-out">FAILED=0</span>
<span class="cb-out"></span>
<span class="cb-out">cleanup() { for P in "\${PIDS[@]:-}"; do kill "$P" 2>/dev/null || true; done; }</span>
<span class="cb-out">trap cleanup EXIT INT TERM</span>
<span class="cb-out"></span>
<span class="cb-out">for REGION in "\${REGIONS[@]}"; do</span>
<span class="cb-out">    python3 etl.py --region "$REGION" --date "$DATE" \</span>
<span class="cb-out">        > "$LOG_DIR/\${REGION}.log" 2>&1 &amp;</span>
<span class="cb-out">    PIDS[$REGION]=$!</span>
<span class="cb-out">    echo "Started $REGION (PID \${PIDS[$REGION]})"</span>
<span class="cb-out">done</span>
<span class="cb-out"></span>
<span class="cb-out">for REGION in "\${REGIONS[@]}"; do</span>
<span class="cb-out">    if wait "\${PIDS[$REGION]}"; then</span>
<span class="cb-out">        echo "✅ $REGION"</span>
<span class="cb-out">    else</span>
<span class="cb-out">        echo "❌ $REGION — see $LOG_DIR/\${REGION}.log" >&2</span>
<span class="cb-out">        (( FAILED++ ))</span>
<span class="cb-out">    fi</span>
<span class="cb-out">done</span>
<span class="cb-out">exit "$FAILED"</span>

<span class="cb-cmt">## ═══ PATTERN 2: NOHUP LONG JOB WITH MONITORING ═════════════</span>
start_long_job() {
    local JOB="$1" LOG="/var/log/jobs/\${JOB}.log"
    local PIDFILE="/var/run/\${JOB}.pid"

    nohup python3 "\${JOB}.py" > "$LOG" 2>&amp;1 &amp;
    echo $! > "$PIDFILE"
    disown $!
    echo "Started $JOB (PID=$(cat "$PIDFILE"))"
    echo "Log: tail -f $LOG"
}

monitor_job() {
    local JOB="$1" PID
    PID=$(cat "/var/run/\${JOB}.pid" 2>/dev/null) || { echo "Not running"; return 1; }
    kill -0 "$PID" 2>/dev/null || { echo "Dead (PID $PID)"; return 1; }
    echo "Running: PID=$PID CPU=$(ps -o pcpu= -p "$PID")% RSS=$(ps -o rss= -p "$PID")KB"
}

start_long_job "full_reload"
sleep 5
monitor_job    "full_reload"

<span class="cb-cmt">## ═══ PATTERN 3: MULTI-STAGE WITH DEPENDENCY ════════════════</span>
<span class="cb-cmt"># Stage 1 (parallel) → Stage 2 (depends on Stage 1 success)</span>
run_stage() {
    local STAGE="$1"; shift
    local -a PIDS=()
    echo "=== Stage $STAGE starting ==="
    for CMD in "$@"; do
        eval "$CMD" &amp; PIDS+=($!)
    done
    for P in "\${PIDS[@]}"; do
        wait "$P" || { echo "Stage $STAGE FAILED" >&2; kill "\${PIDS[@]}" 2>/dev/null; return 1; }
    done
    echo "=== Stage $STAGE complete ==="
}

run_stage 1 \
    "python3 extract_sales.py" \
    "python3 extract_inventory.py" \
    "python3 extract_customers.py" \
&& run_stage 2 \
    "python3 transform.py" \
    "python3 validate.py" \
&& python3 load.py \
&& echo "Pipeline complete"
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 13 — COMPLETE REFERENCE
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Complete Job Control Reference</h2>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 10 of 10 — Every job control command, key binding, and option</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ COMPLETE jobs FLAGS ══════════════════════════════════════</span>
jobs            <span class="cb-cmt"># list all jobs</span>
jobs -l         <span class="cb-cmt"># with PIDs</span>
jobs -p         <span class="cb-cmt"># PIDs only</span>
jobs -n         <span class="cb-cmt"># only jobs changed since last notification</span>
jobs -r         <span class="cb-cmt"># only running jobs</span>
jobs -s         <span class="cb-cmt"># only stopped jobs</span>
jobs %1         <span class="cb-cmt"># show specific job</span>

<span class="cb-cmt">## ═══ COMPLETE fg / bg FORMS ═══════════════════════════════════</span>
fg              <span class="cb-cmt"># foreground current job</span>
fg %1           <span class="cb-cmt"># foreground job 1</span>
fg %+           <span class="cb-cmt"># foreground most recent job</span>
fg %-           <span class="cb-cmt"># foreground previous job</span>
fg %python3     <span class="cb-cmt"># foreground job starting with "python3"</span>
fg %?etl        <span class="cb-cmt"># foreground job containing "etl"</span>
bg %1 %2 %3     <span class="cb-cmt"># resume multiple stopped jobs</span>

<span class="cb-cmt">## ═══ COMPLETE disown FLAGS ════════════════════════════════════</span>
disown          <span class="cb-cmt"># disown current job (remove from table)</span>
disown %1       <span class="cb-cmt"># disown job 1</span>
disown -h %1    <span class="cb-cmt"># mark SIGHUP-immune (keep in table)</span>
disown -a       <span class="cb-cmt"># disown ALL jobs</span>
disown -ar      <span class="cb-cmt"># disown all running jobs</span>
disown $!       <span class="cb-cmt"># disown most recently started job (by PID)</span>

<span class="cb-cmt">## ═══ COMPLETE wait FORMS ══════════════════════════════════════</span>
wait            <span class="cb-cmt"># wait for ALL background jobs</span>
wait $PID       <span class="cb-cmt"># wait for specific PID</span>
wait %1         <span class="cb-cmt"># wait for job 1</span>
wait -n         <span class="cb-cmt"># wait for ANY one (bash 5.1+), PID in $!</span>
wait -f         <span class="cb-cmt"># wait including stopped jobs (bash 5.1+)</span>

<span class="cb-cmt">## ═══ KEY BINDINGS (readline/terminal) ════════════════════════</span>
<span class="cb-cmt"># Ctrl+C  → SIGINT  → terminate foreground job
# Ctrl+Z  → SIGTSTP → stop foreground job  
# Ctrl+\  → SIGQUIT → terminate + core dump
# Ctrl+D  → EOF     → end of input (not a signal)
# Ctrl+S  → XOFF    → pause terminal output (Ctrl+Q to resume)</span>

<span class="cb-cmt">## ═══ SPECIAL VARIABLES ════════════════════════════════════════</span>
<span class="cb-cmt"># $!     = PID of most recently backgrounded process
# $?     = exit code of most recently finished process/wait
# PIPESTATUS = array of exit codes from last pipeline</span>

<span class="cb-cmt">## ═══ QUICK REFERENCE: SURVIVE TERMINAL CLOSE ════════════════</span>
<span class="cb-cmt"># Start + survive:
nohup CMD > log 2>&1 &amp; disown $!
# Start already disconnected:
setsid CMD > log 2>&1 &amp;
# Start + reattach later:
tmux new -d -s NAME 'CMD'
# Make running job survive:
# Ctrl+Z → bg → disown %N  (or use reptyr to move to tmux)</span>
</pre></div></div>
</div>

<div class="table-wrap">
<table class="ref-table">
<thead><tr><th style="width:25%">Command / Action</th><th>What It Does</th><th style="width:26%">Key Option / Detail</th></tr></thead>
<tbody>
<tr><td colspan="3" style="background:#1a2a1a;color:#3fb950;font-weight:bold;font-family:'Segoe UI',sans-serif;">Starting &amp; Monitoring</td></tr>
<tr><td style="font-family:monospace;">CMD &amp;</td><td>Start command in background</td><td>Returns immediately; PID in <code>$!</code></td></tr>
<tr><td style="font-family:monospace;">jobs -l</td><td>List all jobs with PIDs and state</td><td><code>-r</code>=running only, <code>-s</code>=stopped only, <code>-p</code>=PIDs</td></tr>
<tr><td style="font-family:monospace;">Ctrl+Z</td><td>Stop (suspend) foreground job</td><td>SIGTSTP → state becomes Stopped</td></tr>
<tr><td colspan="3" style="background:#0e1824;color:#58a6ff;font-weight:bold;font-family:'Segoe UI',sans-serif;">Foreground / Background</td></tr>
<tr><td style="font-family:monospace;">fg %N</td><td>Bring job N to foreground</td><td>Also: <code>%%</code> <code>%+</code> <code>%-</code> <code>%name</code> <code>%?str</code></td></tr>
<tr><td style="font-family:monospace;">bg %N</td><td>Resume stopped job in background</td><td>Sends SIGCONT, shell stays foreground</td></tr>
<tr><td style="font-family:monospace;">kill %N</td><td>Send signal to job N by job spec</td><td><code>kill -9 %N</code>, <code>kill -STOP %N</code>, <code>kill -CONT %N</code></td></tr>
<tr><td colspan="3" style="background:#2a2a14;color:#ffa657;font-weight:bold;font-family:'Segoe UI',sans-serif;">Persistence / Detaching</td></tr>
<tr><td style="font-family:monospace;">nohup CMD &amp;</td><td>Immune to SIGHUP — survives terminal close</td><td>Redirects output to <code>nohup.out</code> by default</td></tr>
<tr><td style="font-family:monospace;">disown %N</td><td>Remove from job table (bash won't send SIGHUP)</td><td><code>-h</code> keep in table but SIGHUP-immune; <code>-a</code> all jobs</td></tr>
<tr><td style="font-family:monospace;">setsid CMD</td><td>Run in new session — truly detached</td><td>No controlling terminal; TT=? in ps</td></tr>
<tr><td colspan="3" style="background:#1a1a3a;color:#bc8cff;font-weight:bold;font-family:'Segoe UI',sans-serif;">Waiting &amp; Collecting</td></tr>
<tr><td style="font-family:monospace;">wait $PID</td><td>Wait for specific PID, get exit code in $?</td><td>Returns exit code of the process</td></tr>
<tr><td style="font-family:monospace;">wait</td><td>Wait for ALL background jobs</td><td>Returns when last job exits</td></tr>
<tr><td style="font-family:monospace;">wait -n</td><td>Wait for ANY one job (bash 5.1+)</td><td>PID of completed job in $!</td></tr>
<tr><td colspan="3" style="background:#1f2027;color:#8b949e;font-weight:bold;font-family:'Segoe UI',sans-serif;">Pipeline Control</td></tr>
<tr><td style="font-family:monospace;">set -o pipefail</td><td>Pipeline fails if ANY stage fails</td><td>Essential for safe scripting</td></tr>
<tr><td style="font-family:monospace;">\${PIPESTATUS[@]}</td><td>Exit codes of each pipeline stage</td><td>Available immediately after pipeline</td></tr>
<tr><td style="font-family:monospace;">xargs -P N</td><td>Run N parallel processes with xargs</td><td>Simpler than manual pool; limited control</td></tr>
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
    <h4>Exercise 1 — Job Control Fundamentals</h4>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Start three background jobs: <code>sleep 100</code>, <code>sleep 200</code>, <code>sleep 300</code></li>
      <li>Use <code>jobs -l</code> to view all three with their PIDs</li>
      <li>Bring job 2 to the foreground using its job spec. Then Ctrl+Z to stop it.</li>
      <li>Resume job 2 in the background with <code>bg</code></li>
      <li>Kill job 1 using <code>kill %1</code>, verify it's gone with <code>jobs</code></li>
      <li>Kill job 3 using its PID (from <code>jobs -p</code>)</li>
      <li>Use <code>kill %?sleep</code> to kill all remaining jobs matching "sleep"</li>
      <li>Demonstrate: start a long job, Ctrl+Z, <code>bg</code>, check it's running, <code>fg</code>, Ctrl+C</li>
    </ol>
  </div>
</div>

<div class="exercise-panel easy">
  <div class="ex-badge easy-badge">Easy</div>
  <div class="ex-body">
    <h4>Exercise 2 — nohup, disown, and Persistence</h4>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Start a job with <code>nohup sleep 600 &gt; /tmp/sleep.log 2&gt;&amp;1 &amp;</code></li>
      <li>Verify it's running with <code>jobs -l</code> and <code>ps aux | grep sleep</code></li>
      <li>Start another <code>sleep 700 &amp;</code> then <code>disown $!</code> — verify it disappears from <code>jobs</code></li>
      <li>Use <code>setsid sleep 800 &amp;</code> and check its SID and TTY in ps</li>
      <li>Compare: which of the three will survive terminal close? Why?</li>
      <li>Write the canonical "start + detach" one-liner using nohup + disown</li>
      <li>Find all three processes using <code>pgrep -a sleep</code> and kill them all</li>
    </ol>
  </div>
</div>

<div class="exercise-panel medium">
  <div class="ex-badge medium-badge">Medium</div>
  <div class="ex-body">
    <h4>Exercise 3 — Parallel Jobs with Exit Code Collection</h4>
    <p>Write <code>parallel_run.sh</code> that runs 5 commands in parallel:</p>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Start all 5 with <code>&amp;</code> and store each PID with a descriptive name in an associative array</li>
      <li>Wait for each one and collect its exit code</li>
      <li>Print a summary table: command name, PID, exit code, success/failure</li>
      <li>If any failed: print total failure count and exit with that count</li>
      <li>Add a cleanup trap that kills all running jobs on Ctrl+C</li>
      <li>Add a <code>wait -n</code> version that processes results as each finishes (bash 5.1+)</li>
      <li>Use <code>set -o pipefail</code> and test that pipeline failures are detected</li>
    </ol>
  </div>
</div>

<div class="exercise-panel medium">
  <div class="ex-badge medium-badge">Medium</div>
  <div class="ex-body">
    <h4>Exercise 4 — Parallel Job Pool</h4>
    <p>Build <code>pool.sh MAX_JOBS COMMAND FILES...</code>:</p>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Accept MAX_JOBS as first argument (default to nproc)</li>
      <li>Accept a command and list of files as remaining arguments</li>
      <li>Maintain at most MAX_JOBS running at any time (use <code>jobs -p | wc -l</code> to check)</li>
      <li>Track each job's filename so you can report which file failed</li>
      <li>Show a live progress indicator: "Processing: 3/10 done, 7 remaining"</li>
      <li>Collect all exit codes — fail if any failed</li>
      <li>Add a --timeout N option: kill any job running longer than N seconds</li>
    </ol>
  </div>
</div>

<div class="exercise-panel hard">
  <div class="ex-badge hard-badge">Hard</div>
  <div class="ex-body">
    <h4>Exercise 5 — Multi-Stage Parallel ETL Orchestrator</h4>
    <p>Build <code>orchestrate.sh</code> — a complete parallel pipeline manager:</p>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li><strong>Stage definition:</strong> Accept a YAML-like config file defining stages, their commands, parallelism, dependencies, and timeout</li>
      <li><strong>DAG execution:</strong> Parse dependencies — run stages in the correct order (stage B starts only when all its dependencies succeed)</li>
      <li><strong>Parallel within stage:</strong> Each stage runs its command on N input files in parallel with a configurable pool size</li>
      <li><strong>Logging:</strong> Each job's stdout/stderr goes to a separate log file. Summary log collects all exit codes.</li>
      <li><strong>Live dashboard:</strong> Print a continuously-updated status table showing each stage's progress</li>
      <li><strong>Failure handling:</strong> On any stage failure, skip dependent stages, collect all errors, exit with failure count</li>
      <li><strong>Cleanup:</strong> On Ctrl+C or SIGTERM, kill all running jobs in reverse dependency order, print partial results</li>
    </ol>
    <p><strong>Must handle: empty file lists, race conditions on job completion, SIGCHLD during wait, /proc race on killed jobs.</strong></p>
  </div>
</div>

<div class="story-panel" style="margin-top:32px;">
  <div class="story-avatar">🧑‍💻</div>
  <div class="story-body">
    <div class="story-title">Ravi's Ninety Minutes — Day 365</div>
    <p>The six-hour full pipeline run was now ninety minutes. But that wasn't the part Ravi was proud of.</p>
    <p>The part he was proud of was the cleanup trap. Every job he ran now had one: release the lock, kill the children, log the exit code. The part where he used <code>nohup ... & disown $!</code> before every long-running job so that an SSH disconnect couldn't kill a six-hour run forty minutes before it finished. The part where he used <code>wait -n</code> in the pool loop so results were processed as they arrived instead of at the end.</p>
    <p>A new engineer on the team asked him why there were so many <code>&amp;</code> symbols in the scripts. Ravi explained: each one was a parallel worker. Then he explained PGID, and why Ctrl+C killed whole pipelines. Then sessions, and why nohup worked. The engineer said it sounded complicated. Ravi said it was three concepts: jobs (bash's view), process groups (kernel's view), and sessions (terminal's view). Once you knew those three things, every other behaviour fell out of them logically.</p>
    <p><strong>Job control isn't complicated. It's three concepts and a handful of commands. Master those, and one terminal becomes an orchestration system.</strong></p>
  </div>
</div>

</div><!-- /section-block -->
\`

`
};