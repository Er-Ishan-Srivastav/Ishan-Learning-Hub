var processes= {
    title: "Processes & Signals — Complete Guide",
    description: "Master Linux processes and signals from first principles — what a process IS at the kernel level, every state and transition, all monitoring tools, priority control, /proc intelligence, and the complete signal system: delivery, handling, trapping, and graceful shutdown patterns.",
    content: `
<style>
/* ── Keyframe animations for this module ── */
@keyframes ps-run    { 0%,100%{fill:#1a2a1a;stroke:#3fb950} 50%{fill:#0d1f0d;stroke:#238636} }
@keyframes ps-pulse  { 0%,100%{opacity:1} 50%{opacity:.25} }
@keyframes ps-flow   { 0%{stroke-dashoffset:24} 100%{stroke-dashoffset:0} }
@keyframes ps-zip    { 0%{transform:translateX(-60px);opacity:0} 100%{transform:translateX(0);opacity:1} }
@keyframes ps-blink  { 0%,100%{fill:#f85149} 50%{fill:#3d0000} }
@keyframes ps-bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
@keyframes ps-grow   { 0%{width:0} 100%{width:100%} }
@keyframes ps-scan   { 0%{transform:translateX(0%)} 100%{transform:translateX(560%)} }
@keyframes ps-spin   { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
@keyframes ps-mem    { 0%{transform:scaleY(1)} 50%{transform:scaleY(1.06)} 100%{transform:scaleY(1)} }

.ps-running  { animation: ps-run   2.4s ease-in-out infinite; }
.ps-pulse    { animation: ps-pulse 1.8s ease-in-out infinite; }
.ps-flow     { stroke-dasharray:6 4; animation: ps-flow .7s linear infinite; }
.ps-blink    { animation: ps-blink 1.2s ease-in-out infinite; }
.ps-bounce   { animation: ps-bounce 2s ease-in-out infinite; }
</style>

<!-- ══════════════════════════════════════════════════════
     RAVI'S STORY — HOOK
══════════════════════════════════════════════════════ -->
<div class="story-panel">
  <div class="story-avatar">🧑‍💻</div>
  <div class="story-body">
    <div class="story-title">Ravi's Two Crises — Day 330</div>
    <br>
    <p>Crisis one: an ETL job had been "running" for nine hours. The dashboard showed it alive. But zero output rows. Zero database changes. Ravi spent 45 minutes restarting things before Priya checked one file: <code>/proc/$(pgrep etl)/wchan</code>. Output: <code>futex_wait</code>. Deadlock. Fixed in 8 minutes once they knew what they were dealing with.</p>
    <br>
    <p>Crisis two, same week: Ctrl+C on a migration script. Fifty tables half-migrated. Lock files everywhere. Two hours of manual cleanup. Priya added 15 lines of <code>trap</code> handlers and it never happened again.</p>
    <br>
    <p>"Two things," she told Ravi. "First, you need to understand what a process actually IS — not just a name in <code>ps aux</code>, but a kernel structure with state, memory, signals, and a wait channel. Second, every script that touches files, locks, or databases needs signal handlers. These aren't edge cases. They are normal operations."</p>
    <br>
    <p>This module is both things together — processes and signals, the way they work in the kernel, and how to use that knowledge in production.</p>
    <br>
    </div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 1 — WHAT IS A PROCESS (KERNEL VIEW)
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> What Is a Process — Inside the Kernel's task_struct</h2>

<p>Every running program is represented by a <code>task_struct</code> — a large C structure in kernel memory that holds <em>everything</em> the kernel knows about a process. When you run <code>ps aux</code> or read <code>/proc/PID/status</code>, you're reading fields from this structure.</p>

<div class="diagram-wrap">
<svg viewBox="0 0 820 320" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 20px;">
  <defs>
    <linearGradient id="ps-grad-id" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0e1824"/><stop offset="100%" stop-color="#1a2a3a"/>
    </linearGradient>
    <linearGradient id="ps-grad-mem" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1a2a1a"/><stop offset="100%" stop-color="#0d1a0d"/>
    </linearGradient>
    <marker id="ps-arr" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#8b949e"/></marker>
    <marker id="ps-grn" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#3fb950"/></marker>
    <marker id="ps-blu" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#58a6ff"/></marker>
    <marker id="ps-orn" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#ffa657"/></marker>
    <marker id="ps-pur" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#bc8cff"/></marker>
    <marker id="ps-red" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#f85149"/></marker>
  </defs>
  <rect width="820" height="320" fill="#0d1117" rx="12"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="13" font-weight="bold" fill="#8b949e">task_struct — The Kernel's Process Descriptor (One Per Process)</text>

  <!-- Outer task_struct border -->
  <rect x="14" y="34" width="792" height="278" rx="10" fill="none" stroke="#30363d" stroke-width="1.5" stroke-dasharray="5,3"/>
  <text x="26" y="50" font-family="'Courier New',monospace" font-size="9" fill="#30363d">struct task_struct {   /* linux/sched.h */</text>

  <!-- IDENTITY -->
  <rect x="26" y="56" width="185" height="118" rx="8" fill="url(#ps-grad-id)" stroke="#58a6ff" stroke-width="1.8"/>
  <text x="118" y="75" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#58a6ff">① Identity</text>
  <text x="36" y="92"  font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">pid_t   pid   = 5001</text>
  <text x="36" y="108" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">pid_t   ppid  = 4820</text>
  <text x="36" y="124" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">uid_t   uid   = 1001</text>
  <text x="36" y="140" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">char    comm[16]</text>
  <text x="36" y="156" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">          = "python3"</text>
  <text x="36" y="168" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">gid, sid, tgid …</text>

  <!-- STATE & PRIO -->
  <rect x="223" y="56" width="185" height="118" rx="8" fill="#1f1a2e" stroke="#bc8cff" stroke-width="1.8"/>
  <text x="315" y="75" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#bc8cff">② State &amp; Priority</text>
  <text x="233" y="92"  font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">state  = TASK_RUNNING</text>
  <text x="233" y="108" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">prio   = 120</text>
  <text x="233" y="124" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">nice   = 0</text>
  <text x="233" y="140" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">policy = SCHED_OTHER</text>
  <text x="233" y="156" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">vruntime (CFS)</text>
  <text x="233" y="168" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">sched_class …</text>

  <!-- MEMORY -->
  <rect x="420" y="56" width="185" height="118" rx="8" fill="url(#ps-grad-mem)" stroke="#3fb950" stroke-width="1.8"/>
  <text x="512" y="75" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#3fb950">③ Memory (mm_struct)</text>
  <text x="430" y="92"  font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">pgd → page table root</text>
  <text x="430" y="108" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">start_code/end_code</text>
  <text x="430" y="124" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">start_stack</text>
  <text x="430" y="140" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">brk (heap top)</text>
  <text x="430" y="156" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">vm_area_struct list</text>
  <text x="430" y="168" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">mmap regions …</text>

  <!-- FILES -->
  <rect x="617" y="56" width="187" height="118" rx="8" fill="#2a1a1a" stroke="#ffa657" stroke-width="1.8"/>
  <text x="710" y="75" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#ffa657">④ Files (files_struct)</text>
  <text x="627" y="92"  font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">fd[0] → stdin</text>
  <text x="627" y="108" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">fd[1] → stdout</text>
  <text x="627" y="124" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">fd[2] → stderr</text>
  <text x="627" y="140" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">fd[3] → db socket</text>
  <text x="627" y="156" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">fd[4] → logfile</text>
  <text x="627" y="168" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">fd[5..N] → more …</text>

  <!-- CPU CONTEXT -->
  <rect x="26" y="188" width="185" height="114" rx="8" fill="#141824" stroke="#58a6ff" stroke-width="1.8"/>
  <text x="118" y="207" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#58a6ff">⑤ CPU Context</text>
  <text x="36" y="223" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">rip (instr pointer)</text>
  <text x="36" y="239" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">rsp (stack pointer)</text>
  <text x="36" y="255" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">rbp, rax, rbx …</text>
  <text x="36" y="271" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">Saved on each context</text>
  <text x="36" y="285" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">switch, restored next</text>
  <text x="36" y="297" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">time this proc runs</text>

  <!-- SIGNALS -->
  <rect x="223" y="188" width="185" height="114" rx="8" fill="#2a2a1a" stroke="#ffa657" stroke-width="1.8"/>
  <text x="315" y="207" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#ffa657">⑥ Signals</text>
  <text x="233" y="223" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">pending  (bitmask)</text>
  <text x="233" y="239" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">blocked  (bitmask)</text>
  <text x="233" y="255" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">sigaction[NSIG]</text>
  <text x="233" y="271" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">  SIG_DFL/IGN/fn</text>
  <text x="233" y="287" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">SigPnd / SigBlk</text>
  <text x="233" y="299" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">in /proc/PID/status</text>

  <!-- RESOURCES -->
  <rect x="420" y="188" width="385" height="114" rx="8" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.8"/>
  <text x="612" y="207" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#3fb950">⑦ Resource Accounting</text>
  <text x="430" y="223" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">utime    (user CPU time)          stime (kernel CPU time)</text>
  <text x="430" y="239" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">min_flt  (minor page faults)      maj_flt (major faults)</text>
  <text x="430" y="255" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">nvcsw    (voluntary switches)     nivcsw (involuntary)</text>
  <text x="430" y="271" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">oom_score_adj   — OOM killer preference</text>
  <text x="430" y="287" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">ulimits (stack, fds, cpu, mem)    cgroup membership</text>
  <text x="430" y="299" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">→ All exposed via /proc/PID/status  /proc/PID/stat  /proc/PID/fd/</text>
</svg>
<p class="diagram-caption">Every Linux process maps to one <code>task_struct</code>. Tools like <code>ps</code>, <code>top</code>, and <code>kill</code> ultimately read or modify fields in this structure via the <code>/proc</code> virtual filesystem. Understanding the structure makes every command make immediate sense.</p>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 1 of 10 — Process Identity: PID, PPID, PGID, SID, threads, tree</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ PROCESS IDENTITY VARIABLES ═════════════════════════════</span>
<span class="cb-prompt">$</span> echo "Shell PID: $$   Parent: $PPID"
<span class="cb-out">Shell PID: 4820   Parent: 4800</span>

<span class="cb-prompt">$</span> sleep 300 &
<span class="cb-out">[1] 5001</span>
<span class="cb-cmt"># [1] = job number (shell-local)   5001 = global PID</span>

<span class="cb-prompt">$</span> ps -o pid,ppid,pgid,sid,tty,stat,comm -p 5001
<span class="cb-out">  PID  PPID  PGID   SID TT   STAT COMMAND</span>
<span class="cb-out"> 5001  4820  5001  4800 pts/0 S    sleep</span>
<span class="cb-cmt"># PID  = this process's unique ID (kernel-assigned, never reused while alive)
# PPID = parent — forked us (bash = 4820)
# PGID = process group (for job control signaling)
# SID  = session ID (terminal session)
# STAT = S = sleeping (interruptible)</span>

<span class="cb-cmt">## ═══ PROCESS TREE ════════════════════════════════════════════</span>
<span class="cb-prompt">$</span> pstree -p $$
<span class="cb-out">bash(4820)───sleep(5001)</span>

<span class="cb-prompt">$</span> pstree -p 1 | head -8
<span class="cb-out">systemd(1)─┬─crond(1234)</span>
<span class="cb-out">           ├─sshd(2100)───sshd(4800)───bash(4820)───sleep(5001)</span>
<span class="cb-out">           ├─postgres(3100)─┬─postgres(3101)</span>
<span class="cb-out">           │                └─postgres(3102)</span>
<span class="cb-out">           └─systemd-journald(456)</span>
<span class="cb-cmt"># Every process traces its ancestry to PID 1 (systemd / init)</span>

<span class="cb-cmt">## ═══ THREADS vs PROCESSES ═══════════════════════════════════</span>
<span class="cb-prompt">$</span> ps -eLf | grep python3 | head -4
<span class="cb-out">UID    PID  PPID   LWP  C NLWP  CMD</span>
<span class="cb-out">ravi  5001  4820  5001  0    8  python3 etl.py</span>
<span class="cb-out">ravi  5001  4820  5002  1    8  python3 etl.py</span>
<span class="cb-out">ravi  5001  4820  5003  0    8  python3 etl.py</span>
<span class="cb-cmt"># Same PID=5001 but different LWP (thread IDs)
# NLWP=8 means 8 threads in this process
# Threads share memory/FDs; each has its own CPU registers</span>
<span class="cb-prompt">$</span> ls /proc/5001/task/
<span class="cb-out">5001  5002  5003  5004  5005  5006  5007  5008</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 2 — PROCESS STATES: ANIMATED
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Process States — The Complete Animated State Machine</h2>

<p>At every instant, each process is in exactly one of seven states. The state determines what the scheduler does with it, whether signals can wake it, and whether <code>kill -9</code> works.</p>

<div class="diagram-wrap">
<svg viewBox="0 0 820 360" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 20px;">
  <rect width="820" height="360" fill="#0d1117" rx="12"/>
  <text x="410" y="24" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="13" font-weight="bold" fill="#8b949e">Linux Process State Machine — 7 States, All Transitions</text>

  <!-- ── CREATED ── -->
  <rect x="310" y="38" width="200" height="46" rx="10" fill="#1a1a3a" stroke="#bc8cff" stroke-width="2"/>
  <text x="410" y="58" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#bc8cff">CREATED / NEW</text>
  <text x="410" y="74" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">fork() just called; not yet scheduled</text>

  <!-- ── RUNNABLE R ── -->
  <rect x="310" y="140" width="200" height="52" rx="10" fill="#1a2a1a" stroke="#3fb950" stroke-width="2.5" class="ps-running"/>
  <text x="410" y="162" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="13" font-weight="bold" fill="#3fb950">RUNNABLE  R</text>
  <text x="410" y="178" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">on CPU  OR  in run queue</text>
  <text x="410" y="190" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#238636">● scheduler may preempt anytime</text>

  <!-- ── SLEEPING S ── -->
  <rect x="60" y="230" width="190" height="52" rx="10" fill="#0e1824" stroke="#58a6ff" stroke-width="2"/>
  <text x="155" y="252" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#58a6ff">SLEEPING  S</text>
  <text x="155" y="268" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">interruptible wait</text>
  <text x="155" y="280" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#58a6ff">signals CAN wake it</text>

  <!-- ── DISK SLEEP D ── -->
  <rect x="570" y="230" width="190" height="52" rx="10" fill="#2a0e0e" stroke="#f85149" stroke-width="2.5" class="ps-blink"/>
  <text x="665" y="252" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#f85149">DISK SLEEP  D</text>
  <text x="665" y="268" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">uninterruptible I/O wait</text>
  <text x="665" y="280" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#f85149">kill -9 has NO effect!</text>

  <!-- ── STOPPED T ── -->
  <rect x="60" y="142" width="190" height="46" rx="10" fill="#2a2a14" stroke="#ffa657" stroke-width="2"/>
  <text x="155" y="162" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#ffa657">STOPPED  T</text>
  <text x="155" y="178" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">SIGSTOP or Ctrl+Z</text>

  <!-- ── ZOMBIE Z ── -->
  <rect x="570" y="142" width="190" height="46" rx="10" fill="#1e0e2e" stroke="#bc8cff" stroke-width="2"/>
  <text x="665" y="162" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#bc8cff">ZOMBIE  Z</text>
  <text x="665" y="178" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">exited; parent not reaped yet</text>

  <!-- ── DEAD ── -->
  <rect x="310" y="318" width="200" height="34" rx="10" fill="#1f2027" stroke="#30363d" stroke-width="1.5"/>
  <text x="410" y="339" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">DEAD — Gone</text>

  <!-- ── TRANSITIONS ── -->
  <!-- CREATED → RUNNABLE -->
  <line x1="410" y1="84" x2="410" y2="140" stroke="#bc8cff" stroke-width="2" marker-end="url(#ps-pur)"/>
  <text x="422" y="116" font-family="'Segoe UI',sans-serif" font-size="9" fill="#bc8cff">admitted</text>

  <!-- RUNNABLE → SLEEPING (animated) -->
  <path d="M310,162 Q200,162 155,230" fill="none" stroke="#58a6ff" stroke-width="2" marker-end="url(#ps-blu)" class="ps-flow"/>
  <text x="192" y="196" font-family="'Segoe UI',sans-serif" font-size="9" fill="#58a6ff">wait/sleep/select</text>

  <!-- SLEEPING → RUNNABLE -->
  <path d="M155,230 Q200,196 310,170" fill="none" stroke="#3fb950" stroke-width="1.5" stroke-dasharray="5,3" marker-end="url(#ps-grn)"/>
  <text x="160" y="210" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">event/signal wakes</text>

  <!-- RUNNABLE → DISK SLEEP (animated) -->
  <path d="M510,162 Q620,162 665,230" fill="none" stroke="#f85149" stroke-width="2" marker-end="url(#ps-red)" class="ps-flow"/>
  <text x="588" y="194" font-family="'Segoe UI',sans-serif" font-size="9" fill="#f85149">disk I/O starts</text>

  <!-- DISK SLEEP → RUNNABLE -->
  <path d="M665,230 Q620,200 510,170" fill="none" stroke="#3fb950" stroke-width="1.5" stroke-dasharray="5,3" marker-end="url(#ps-grn)"/>
  <text x="598" y="215" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">I/O complete</text>

  <!-- RUNNABLE → STOPPED -->
  <path d="M310,158 Q240,158 250,165" fill="none" stroke="#ffa657" stroke-width="1.5" marker-end="url(#ps-orn)"/>
  <text x="256" y="150" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">SIGSTOP/Ctrl+Z</text>

  <!-- STOPPED → RUNNABLE -->
  <path d="M250,175 Q240,185 310,172" fill="none" stroke="#3fb950" stroke-width="1.5" stroke-dasharray="5,3" marker-end="url(#ps-grn)"/>
  <text x="218" y="192" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">SIGCONT</text>

  <!-- RUNNABLE → ZOMBIE -->
  <path d="M510,160 Q580,160 570,160" fill="none" stroke="#bc8cff" stroke-width="1.5" marker-end="url(#ps-pur)"/>
  <text x="518" y="152" font-family="'Segoe UI',sans-serif" font-size="9" fill="#bc8cff">exit() called</text>

  <!-- ZOMBIE → DEAD -->
  <path d="M665,188 Q665,260 560,320 Q510,335 510,320" fill="none" stroke="#30363d" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#ps-arr)"/>
  <text x="700" y="270" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">wait() by parent</text>

  <!-- SLEEPING → DEAD (killed) -->
  <path d="M80,282 Q60,320 310,334" fill="none" stroke="#30363d" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#ps-arr)"/>
  <text x="70" y="320" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">signal+exit</text>
</svg>
<p class="diagram-caption">The <strong class="text-danger">D state (Disk Sleep / uninterruptible)</strong> is the critical one for debugging: a process waiting on hardware I/O cannot receive any signal — including SIGKILL. It will wake up when the I/O completes. If it never wakes, the hardware or driver has a problem. Check <code>/proc/PID/wchan</code> to see exactly what kernel function it's blocked in.</p>
</div>

<div class="table-wrap">
<table class="ref-table">
<thead><tr><th>Code</th><th>State</th><th>Meaning</th><th>kill -9 works?</th><th>Seen in ps STAT as</th></tr></thead>
<tbody>
<tr><td style="font-family:monospace;color:#3fb950;font-size:16px;font-weight:bold;">R</td><td>Running/Runnable</td><td>On CPU or in run queue — actively competing for CPU time</td><td>✅ Yes</td><td><code>R</code> or <code>R+</code></td></tr>
<tr><td style="font-family:monospace;color:#58a6ff;font-size:16px;font-weight:bold;">S</td><td>Sleeping (interruptible)</td><td>Waiting for event — timer, socket, pipe. Signals wake it immediately</td><td>✅ Yes</td><td><code>S</code> or <code>S+</code></td></tr>
<tr><td style="font-family:monospace;color:#f85149;font-size:16px;font-weight:bold;">D</td><td>Disk Sleep (uninterruptible)</td><td>Blocked on I/O. Cannot receive ANY signal. Most common cause of "unkillable" processes</td><td>❌ No</td><td><code>D</code></td></tr>
<tr><td style="font-family:monospace;color:#ffa657;font-size:16px;font-weight:bold;">T</td><td>Stopped</td><td>Paused by SIGSTOP or Ctrl+Z. Frozen — uses no CPU. Resume with SIGCONT</td><td>✅ Yes (kills it)</td><td><code>T</code></td></tr>
<tr><td style="font-family:monospace;color:#bc8cff;font-size:16px;font-weight:bold;">Z</td><td>Zombie</td><td>Has exited but parent hasn't called wait() yet. Holds only PID+exit code. No resources</td><td>❌ Kill parent instead</td><td><code>Z</code></td></tr>
<tr><td style="font-family:monospace;color:#8b949e;font-size:16px;font-weight:bold;">I</td><td>Idle (kernel thread)</td><td>Kernel thread sleeping — distinct from D state in newer kernels</td><td>N/A</td><td><code>I</code></td></tr>
</tbody>
</table>
</div>

<div class="deepdive-box" style="margin-top:16px;">
<div class="deepdive-title">🔍 Reading ps STAT Extra Flags</div>
<pre style="margin:0;padding:12px;font-family:monospace;font-size:12px;color:#e6edf3;background:#010409;border-radius:0 0 8px 8px;">
# After the main state letter, ps adds modifier letters:
#   <    high priority (nice < 0)     Ss<  = sleeping, session leader, high priority
#   N    low priority (nice > 0)      SN   = sleeping, low priority
#   L    locked pages in memory       Sl   = sleeping, multi-threaded (lock held)
#   s    session leader               Ss   = bash, sshd
#   l    multi-threaded               Rl   = postgres worker thread
#   +    in foreground process group  S+   = running in current terminal

# Common combinations you will see:
#   Ss     bash, sshd daemon — sleeping, session leader
#   R+     actively running in foreground
#   Sl     multi-threaded sleeping (most long-running daemons)
#   D      stuck on disk I/O — check /proc/PID/wchan
#   Zs     zombie session leader (parent of orphaned group)
</pre>
</div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 3 — FORK / EXEC / WAIT (ANIMATED)
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> fork() / exec() / wait() — The Process Birth Cycle</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 310" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 20px;">
  <rect width="820" height="310" fill="#0d1117" rx="12"/>
  <text x="410" y="24" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="13" font-weight="bold" fill="#8b949e">Process Birth: fork() → exec() → exit() → wait() with Copy-on-Write</text>

  <!-- Time axis -->
  <line x1="28" y1="52" x2="28" y2="292" stroke="#30363d" stroke-width="1.5"/>
  <text x="18" y="52"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#30363d" transform="rotate(-90,18,52)">time</text>
  <text x="18" y="292" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#30363d">↓</text>

  <!-- PARENT / bash box -->
  <rect x="48" y="50" width="150" height="36" rx="8" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="123" y="73" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#3fb950">bash (PID 4820)</text>
  <line x1="123" y1="86" x2="123" y2="262" stroke="#3fb950" stroke-width="2" stroke-dasharray="5,3"/>

  <!-- fork() syscall arrow -->
  <line x1="123" y1="114" x2="360" y2="136" stroke="#bc8cff" stroke-width="2.5" marker-end="url(#ps-pur)" class="ps-flow"/>
  <rect x="128" y="96" width="110" height="20" rx="5" fill="#1a1a3a"/>
  <text x="183" y="110" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" font-weight="bold" fill="#bc8cff">fork()</text>

  <!-- fork() returns annotation -->
  <rect x="30" y="148" width="200" height="34" rx="6" fill="#1a1a3a" stroke="#bc8cff" stroke-width="1"/>
  <text x="130" y="163" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#bc8cff">fork() returns:</text>
  <text x="130" y="176" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#e6edf3">parent → 5001  |  child → 0</text>

  <!-- CHILD box (appears after fork) -->
  <rect x="340" y="136" width="175" height="36" rx="8" fill="#0e1824" stroke="#58a6ff" stroke-width="2"/>
  <text x="427" y="156" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#58a6ff">child (PID 5001)</text>
  <text x="427" y="169" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">= exact copy of parent (CoW)</text>
  <line x1="427" y1="172" x2="427" y2="232" stroke="#58a6ff" stroke-width="2" stroke-dasharray="5,3"/>

  <!-- CoW annotation -->
  <rect x="340" y="182" width="175" height="44" rx="6" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="427" y="198" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">Copy-on-Write:</text>
  <text x="427" y="212" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Parent + child share physical</text>
  <text x="427" y="224" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">pages — copy only on write</text>

  <!-- exec() -->
  <line x1="515" y1="172" x2="580" y2="172" stroke="#ffa657" stroke-width="2" marker-end="url(#ps-orn)"/>
  <rect x="580" y="155" width="165" height="38" rx="6" fill="#2a2a14" stroke="#ffa657" stroke-width="1.5"/>
  <text x="662" y="171" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#ffa657">exec("python3")</text>
  <text x="662" y="185" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">replaces code + memory</text>

  <!-- After exec → python3 -->
  <rect x="580" y="200" width="165" height="36" rx="8" fill="#1f1a2e" stroke="#bc8cff" stroke-width="2"/>
  <text x="662" y="220" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#bc8cff">python3 (PID 5001)</text>
  <text x="662" y="232" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">same PID, new code/data</text>
  <line x1="662" y1="236" x2="662" y2="256" stroke="#bc8cff" stroke-width="2" stroke-dasharray="5,3"/>

  <!-- exit() -->
  <line x1="662" y1="256" x2="662" y2="268" stroke="#f85149" stroke-width="2"/>
  <rect x="690" y="258" width="80" height="22" rx="5" fill="#2a1a1a" stroke="#f85149" stroke-width="1.5"/>
  <text x="730" y="273" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#f85149">exit(0)</text>
  <line x1="662" y1="264" x2="690" y2="264" stroke="#f85149" stroke-width="1.5" marker-end="url(#ps-red)"/>
  <!-- ZOMBIE annotation -->
  <text x="662" y="285" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#bc8cff">→ ZOMBIE until parent wait()</text>

  <!-- Parent wait() -->
  <rect x="40" y="258" width="168" height="28" rx="6" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.5"/>
  <text x="124" y="276" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#3fb950">wait() / waitpid()</text>
  <!-- wait arc -->
  <path d="M124,258 Q124,296 427,296 Q580,296 650,285" fill="none" stroke="#3fb950" stroke-width="1.5" stroke-dasharray="5,3" marker-end="url(#ps-grn)"/>
  <text x="400" y="308" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">reaps zombie → [1]+ Done python3 etl.py</text>
</svg>
<p class="diagram-caption"><strong>fork()</strong> duplicates the process (Copy-on-Write — no real copy until a write happens, making fork() fast even for 4GB processes). <strong>exec()</strong> in the child replaces its code/data with the new program — the PID stays the same. When done, <strong>exit()</strong> converts the process to a zombie until the parent calls <strong>wait()</strong>.</p>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 2 of 10 — fork/exec/wait: strace, CoW proof, zombie demo, exec replace</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ STRACE TO SEE fork() AND exec() ═══════════════════════</span>
<span class="cb-prompt">$</span> strace -e trace=clone,execve,wait4 bash -c 'sleep 1' 2>&1 | head -5
<span class="cb-out">execve("/bin/bash", ["bash","-c","sleep 1"], ...) = 0</span>
<span class="cb-out">clone(child_stack=NULL, flags=CLONE_CHILD_CLEARTID|SIGCHLD) = 5001</span>
<span class="cb-out">wait4(-1, [{WIFEXITED(s) && WEXITSTATUS(s)==0}], 0, NULL) = 5001</span>
<span class="cb-cmt"># clone() IS fork() on Linux (with different flags)
# Return value of clone = new child's PID</span>

<span class="cb-cmt">## ═══ COPY-ON-WRITE: RSS stays low after fork ════════════════</span>
<span class="cb-prompt">$</span> cat /proc/5001/status | grep -E 'VmRSS|VmSize|VmPeak'
<span class="cb-out">VmPeak:   425680 kB   ← total virtual ever claimed</span>
<span class="cb-out">VmSize:   415200 kB   ← virtual now (all mapped regions)</span>
<span class="cb-out">VmRSS:     48320 kB   ← ACTUALLY in RAM right now</span>
<span class="cb-cmt"># RSS (48 MB) << VmSize (415 MB) — most pages are CoW-shared
# Only pages written after fork() are actually duplicated</span>

<span class="cb-cmt">## ═══ ZOMBIE DEMONSTRATION ════════════════════════════════════</span>
<span class="cb-prompt">$</span> bash -c 'sleep 0 & sleep 60' &    <span class="cb-cmt"># parent (sleep 60) won't reap child (sleep 0)</span>
<span class="cb-prompt">$</span> ps aux | awk '$8=="Z" {print $0}' | head -3
<span class="cb-out">ravi  5003  0.0  0.0      0     0 pts/0 Z+  10:30  [sleep] <defunct></span>
<span class="cb-cmt"># <defunct> = zombie — exited but parent hasn't called wait()
# Has no resources (memory freed) — just holds PID entry
# Fix: send SIGCHLD to parent, or kill parent so init reaps</span>

<span class="cb-cmt">## ═══ exec() REPLACING ITSELF ════════════════════════════════</span>
<span class="cb-prompt">$</span> strace -e trace=execve python3 -c 'import os; os.execv("/bin/ls",["/bin/ls"])' 2>&1
<span class="cb-out">execve("/bin/ls", ["/bin/ls"], 0x... /* env */) = 0</span>
<span class="cb-cmt"># Same PID, completely new program
# exec() = "keep my PID, become a different program"</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 4 — VIRTUAL MEMORY LAYOUT
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Virtual Memory Layout — What Every Process Sees</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 300" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 20px;">
  <rect width="820" height="300" fill="#0d1117" rx="12"/>
  <text x="410" y="24" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="13" font-weight="bold" fill="#8b949e">64-bit Linux Process Virtual Address Space — Every Segment Explained</text>

  <!-- Memory bar -->
  <rect x="100" y="38" width="220" height="256" rx="4" fill="#161b22" stroke="#30363d" stroke-width="1.5"/>
  <text x="100" y="34" text-anchor="start" font-family="'Courier New',monospace" font-size="8" fill="#30363d">0xFFFF…FF (128 TB virtual)</text>

  <!-- Segments from top to bottom (high address to low) -->
  <!-- Kernel space -->
  <rect x="100" y="38" width="220" height="38" rx="4" fill="#1a1a3a" stroke="#bc8cff" stroke-width="1.2"/>
  <text x="210" y="57" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#bc8cff">Kernel Space</text>
  <text x="210" y="70" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#8b949e">inaccessible from user mode</text>

  <!-- Stack -->
  <rect x="100" y="78" width="220" height="48" rx="0" fill="#2a1414" stroke="#f85149" stroke-width="1.2"/>
  <text x="210" y="96" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#f85149">Stack</text>
  <text x="210" y="110" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">↓ grows downward (local vars, return addrs)</text>
  <text x="330" y="102" font-family="'Segoe UI',sans-serif" font-size="14" fill="#f85149" class="ps-bounce">↓</text>

  <!-- mmap / shared libs -->
  <rect x="100" y="128" width="220" height="52" rx="0" fill="#1a2020" stroke="#ffa657" stroke-width="1.2"/>
  <text x="210" y="148" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#ffa657">mmap / Shared Libraries</text>
  <text x="210" y="162" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#8b949e">libc.so  libm.so  libpython.so</text>
  <text x="210" y="174" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#8b949e">anonymous mmap / file-backed mmap</text>

  <!-- Heap -->
  <rect x="100" y="182" width="220" height="48" rx="0" fill="#142014" stroke="#3fb950" stroke-width="1.2"/>
  <text x="210" y="200" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#3fb950">Heap</text>
  <text x="210" y="214" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">↑ grows upward (malloc/new)</text>
  <text x="330" y="208" font-family="'Segoe UI',sans-serif" font-size="14" fill="#3fb950" class="ps-bounce">↑</text>

  <!-- BSS -->
  <rect x="100" y="232" width="220" height="24" rx="0" fill="#141424" stroke="#58a6ff" stroke-width="1.2"/>
  <text x="210" y="248" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#58a6ff">BSS — uninitialised globals (zeroed)</text>

  <!-- Data -->
  <rect x="100" y="258" width="220" height="20" rx="0" fill="#0e1824" stroke="#58a6ff" stroke-width="1.2"/>
  <text x="210" y="272" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#58a6ff">Data — initialised globals &amp; statics</text>

  <!-- Text -->
  <rect x="100" y="280" width="220" height="14" rx="4" fill="#1f1428" stroke="#bc8cff" stroke-width="1.2"/>
  <text x="210" y="291" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" font-weight="bold" fill="#bc8cff">Text — program code (read-only, executable)</text>

  <!-- Address labels -->
  <text x="98" y="120" text-anchor="end" font-family="'Courier New',monospace" font-size="8" fill="#30363d">~0x7FFF…</text>
  <text x="98" y="186" text-anchor="end" font-family="'Courier New',monospace" font-size="8" fill="#30363d">heap brk</text>
  <text x="98" y="294" text-anchor="end" font-family="'Courier New',monospace" font-size="8" fill="#30363d">0x0040…</text>

  <!-- /proc/maps example -->
  <rect x="355" y="38" width="456" height="256" rx="8" fill="#161b22" stroke="#30363d" stroke-width="1.5"/>
  <text x="583" y="58" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#8b949e">cat /proc/5001/maps  (actual output)</text>
  <line x1="365" y1="64" x2="802" y2="64" stroke="#30363d" stroke-width="1"/>
  <text x="365" y="82"  font-family="'Courier New',monospace" font-size="9.5" fill="#bc8cff">5576b000-5576c000 r-xp python3 (text)</text>
  <text x="365" y="98"  font-family="'Courier New',monospace" font-size="9.5" fill="#58a6ff">5576c000-5576d000 r--p python3 (rodata)</text>
  <text x="365" y="114" font-family="'Courier New',monospace" font-size="9.5" fill="#58a6ff">5576d000-5576e000 rw-p python3 (data/bss)</text>
  <text x="365" y="130" font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950">5576f000-5579a000 rw-p [heap]</text>
  <text x="365" y="146" font-family="'Courier New',monospace" font-size="9.5" fill="#ffa657">7f1a400000-7f1b200000 r-xp libc.so.6</text>
  <text x="365" y="162" font-family="'Courier New',monospace" font-size="9.5" fill="#ffa657">7f1b200000-7f1b400000 r-xp libpython3.11.so</text>
  <text x="365" y="178" font-family="'Courier New',monospace" font-size="9.5" fill="#ffa657">7f1c000000-7f1c100000 rw-p (anon mmap)</text>
  <text x="365" y="194" font-family="'Courier New',monospace" font-size="9.5" fill="#f85149">7fff000000-7fff100000 rw-p [stack]</text>
  <text x="365" y="210" font-family="'Courier New',monospace" font-size="9.5" fill="#bc8cff">7fff100000-7fff101000 r--p [vvar]</text>
  <text x="365" y="226" font-family="'Courier New',monospace" font-size="9.5" fill="#bc8cff">7fff101000-7fff102000 r-xp [vdso]</text>
  <line x1="365" y1="236" x2="802" y2="236" stroke="#30363d" stroke-width="1"/>
  <text x="365" y="252" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">perms:  r=read  w=write  x=execute  p=private  s=shared</text>
  <text x="365" y="267" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">Each row = one vm_area_struct (VMA) in the kernel</text>
  <text x="365" y="282" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#3fb950">pmap -x 5001  →  same info, human-readable format</text>
</svg>
</div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 5 — ps: EVERY FLAG
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> <code>ps</code> — Every Flag, Format, and Column Decoded</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 220" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="220" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">ps aux Output — Every Column Labelled and Explained</text>

  <!-- Header row -->
  <rect x="12" y="34" width="796" height="24" rx="4" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="24"  y="51" font-family="'Courier New',monospace" font-size="11" fill="#ffa657">USER</text>
  <text x="88"  y="51" font-family="'Courier New',monospace" font-size="11" fill="#ffa657">PID</text>
  <text x="136" y="51" font-family="'Courier New',monospace" font-size="11" fill="#ffa657">%CPU</text>
  <text x="190" y="51" font-family="'Courier New',monospace" font-size="11" fill="#ffa657">%MEM</text>
  <text x="248" y="51" font-family="'Courier New',monospace" font-size="11" fill="#ffa657">VSZ</text>
  <text x="304" y="51" font-family="'Courier New',monospace" font-size="11" fill="#ffa657">RSS</text>
  <text x="352" y="51" font-family="'Courier New',monospace" font-size="11" fill="#ffa657">TTY</text>
  <text x="402" y="51" font-family="'Courier New',monospace" font-size="11" fill="#ffa657">STAT</text>
  <text x="454" y="51" font-family="'Courier New',monospace" font-size="11" fill="#ffa657">START</text>
  <text x="508" y="51" font-family="'Courier New',monospace" font-size="11" fill="#ffa657">TIME</text>
  <text x="558" y="51" font-family="'Courier New',monospace" font-size="11" fill="#ffa657">COMMAND</text>

  <!-- Data row (high CPU highlighted) -->
  <rect x="12" y="60" width="796" height="24" rx="4" fill="#2a1a1a" class="ps-pulse"/>
  <text x="24"  y="77" font-family="'Courier New',monospace" font-size="11" fill="#58a6ff">ravi</text>
  <text x="88"  y="77" font-family="'Courier New',monospace" font-size="11" fill="#3fb950">5001</text>
  <text x="136" y="77" font-family="'Courier New',monospace" font-size="11" fill="#f85149">98.2</text>
  <text x="190" y="77" font-family="'Courier New',monospace" font-size="11" fill="#ffa657">12.4</text>
  <text x="248" y="77" font-family="'Courier New',monospace" font-size="11" fill="#e6edf3">425680</text>
  <text x="304" y="77" font-family="'Courier New',monospace" font-size="11" fill="#e6edf3">48320</text>
  <text x="352" y="77" font-family="'Courier New',monospace" font-size="11" fill="#e6edf3">pts/0</text>
  <text x="402" y="77" font-family="'Courier New',monospace" font-size="11" fill="#bc8cff">Sl+</text>
  <text x="454" y="77" font-family="'Courier New',monospace" font-size="11" fill="#e6edf3">10:30</text>
  <text x="508" y="77" font-family="'Courier New',monospace" font-size="11" fill="#e6edf3">01:23</text>
  <text x="558" y="77" font-family="'Courier New',monospace" font-size="11" fill="#e6edf3">python3 etl.py --date 2024-01-15</text>

  <!-- Annotation arrows below -->
  <line x1="40"  y1="84" x2="40"  y2="108" stroke="#58a6ff" stroke-width="1" marker-end="url(#ps-blu)"/>
  <line x1="104" y1="84" x2="104" y2="108" stroke="#3fb950" stroke-width="1" marker-end="url(#ps-grn)"/>
  <line x1="155" y1="84" x2="155" y2="108" stroke="#f85149" stroke-width="1" marker-end="url(#ps-red)"/>
  <line x1="214" y1="84" x2="214" y2="108" stroke="#ffa657" stroke-width="1" marker-end="url(#ps-orn)"/>
  <line x1="270" y1="84" x2="270" y2="108" stroke="#e6edf3" stroke-width="1" marker-end="url(#ps-arr)"/>
  <line x1="320" y1="84" x2="320" y2="108" stroke="#e6edf3" stroke-width="1" marker-end="url(#ps-arr)"/>
  <line x1="420" y1="84" x2="420" y2="108" stroke="#bc8cff" stroke-width="1" marker-end="url(#ps-pur)"/>

  <text x="40"  y="122" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#58a6ff">owner</text>
  <text x="104" y="122" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#3fb950">process ID</text>
  <text x="155" y="122" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#f85149">CPU% since</text>
  <text x="155" y="133" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#f85149">start (avg)</text>
  <text x="214" y="122" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#ffa657">RAM % of</text>
  <text x="214" y="133" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#ffa657">total sys</text>
  <text x="270" y="122" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#e6edf3">virtual KB</text>
  <text x="270" y="133" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#e6edf3">(mapped)</text>
  <text x="320" y="122" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#e6edf3">resident KB</text>
  <text x="320" y="133" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#e6edf3">(in RAM now)</text>
  <text x="420" y="122" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#bc8cff">state+flags</text>

  <!-- VSZ vs RSS critical note -->
  <rect x="12" y="148" width="796" height="64" rx="6" fill="#1a1824" stroke="#ffa657" stroke-width="1.2"/>
  <text x="22" y="167" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">⚠  VSZ vs RSS — The Most Misunderstood Columns</text>
  <text x="22" y="183" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">VSZ (425 MB) = total virtual address space claimed — includes CoW-shared pages, mmap'd libs, not-yet-used heap, swap.</text>
  <text x="22" y="197" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">RSS (48 MB) = pages ACTUALLY in physical RAM right now. This is real memory usage. Often 5-10x smaller than VSZ.</text>
  <text x="22" y="211" font-family="'Segoe UI',sans-serif" font-size="10" fill="#3fb950">For OOM analysis, capacity planning, and memory leaks: watch RSS, not VSZ. High VSZ alone is not a problem.</text>
</svg>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 3 of 10 — ps: all formats, custom columns, filtering, sorting</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ THREE ps STYLES (all valid) ════════════════════════════</span>
ps aux              <span class="cb-cmt"># BSD: all users, user-oriented</span>
ps -ef              <span class="cb-cmt"># UNIX: all processes, full format</span>
ps --forest         <span class="cb-cmt"># GNU: tree view</span>
ps auxf             <span class="cb-cmt"># mix: all + tree</span>

<span class="cb-cmt">## ═══ ESSENTIAL ps COMMANDS ══════════════════════════════════</span>
<span class="cb-prompt">$</span> ps aux | grep python3        <span class="cb-cmt"># find by name</span>
<span class="cb-prompt">$</span> ps -ef --forest | head -20   <span class="cb-cmt"># process tree</span>
<span class="cb-prompt">$</span> ps -eLf                      <span class="cb-cmt"># show all threads (LWP column)</span>
<span class="cb-prompt">$</span> ps aux | awk '$8=="D"'       <span class="cb-cmt"># D-state (stuck on I/O)</span>
<span class="cb-prompt">$</span> ps aux | awk '$8=="Z"'       <span class="cb-cmt"># zombie processes</span>

<span class="cb-cmt">## ═══ CUSTOM COLUMNS WITH -o ══════════════════════════════════</span>
<span class="cb-prompt">$</span> ps -eo pid,ppid,user,stat,pcpu,pmem,vsz,rss,comm --sort=-pcpu | head -10
<span class="cb-out">  PID  PPID USER     STAT %CPU %MEM    VSZ    RSS COMMAND</span>
<span class="cb-out"> 5001  4820 ravi     Sl+  98.2 12.4 425680  48320 python3</span>
<span class="cb-cmt"># --sort=-pcpu = sort by CPU descending (- = descending)
# All -o format codes:
# pid ppid pgid sid    → identity
# uid user euid euser  → real/effective user
# stat s               → state
# pcpu pmem            → CPU/RAM percent
# vsz rss sz           → memory (KB, KB, pages)
# comm args cmd        → name only / with args / with path
# etime etimes         → elapsed time (formatted / seconds)
# lstart               → full start date+time
# wchan                → what kernel func it's blocked on
# pri ni               → priority, nice value</span>

<span class="cb-cmt">## ═══ KEY FILTERING FLAGS ═════════════════════════════════════</span>
<span class="cb-prompt">$</span> ps -p 5001 5002             <span class="cb-cmt"># specific PIDs</span>
<span class="cb-prompt">$</span> ps -u ravi                  <span class="cb-cmt"># all of ravi's processes</span>
<span class="cb-prompt">$</span> ps -C python3               <span class="cb-cmt"># by command name</span>
<span class="cb-prompt">$</span> ps -o pid,comm,lstart -p $$ <span class="cb-cmt"># exact start datetime</span>
<span class="cb-out">  PID COMMAND                  STARTED</span>
<span class="cb-out"> 4820 bash     Mon Jan 15 10:28:44 2024</span>

<span class="cb-cmt">## ═══ WCHAN — WHAT A PROCESS IS BLOCKED ON ═══════════════════</span>
<span class="cb-prompt">$</span> ps -eo pid,stat,wchan,comm | grep '^[0-9]* *[DS]'
<span class="cb-out"> 5001 D futex_wait python3    ← blocked on mutex/lock</span>
<span class="cb-out"> 5100 S pipe_wait  tail       ← waiting for pipe to be readable</span>
<span class="cb-out"> 5200 S sk_wait_d  curl       ← waiting for network data</span>
<span class="cb-cmt"># wchan column = the kernel function the process is sleeping in
# Matches /proc/PID/wchan  — the fastest diagnostic for "why is it stuck?"</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 6 — top: LIVE MONITOR ANNOTATED
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> <code>top</code> — Live Monitor, Every Line Decoded</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 280" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="280" fill="#0d1117" rx="10"/>

  <!-- Simulated top output -->
  <rect x="12" y="12" width="796" height="26" rx="4" fill="#1a2a1a"/>
  <text x="22" y="29" font-family="'Courier New',monospace" font-size="11" fill="#3fb950">top - 10:42:15 up 2:14,  2 users,  load average: </text>
  <text x="420" y="29" font-family="'Courier New',monospace" font-size="11" fill="#f85149">1.82</text>
  <text x="443" y="29" font-family="'Courier New',monospace" font-size="11" fill="#ffa657">, 1.45</text>
  <text x="484" y="29" font-family="'Courier New',monospace" font-size="11" fill="#3fb950">, 1.21</text>
  <!-- Annotation for load -->
  <rect x="636" y="8" width="174" height="32" rx="5" fill="#1a1a2a" stroke="#bc8cff" stroke-width="1"/>
  <text x="723" y="21" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#bc8cff">1min / 5min / 15min</text>
  <text x="723" y="33" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#8b949e">÷ nproc = saturation</text>

  <rect x="12" y="40" width="796" height="20" rx="2" fill="#161b22"/>
  <text x="22" y="54" font-family="'Courier New',monospace" font-size="10.5" fill="#e6edf3">Tasks: <tspan fill="#3fb950">182</tspan> total,  <tspan fill="#f85149">3</tspan> running,  <tspan fill="#58a6ff">178</tspan> sleeping,  <tspan fill="#ffa657">0</tspan> stopped,  <tspan fill="#bc8cff">1</tspan> zombie</text>

  <rect x="12" y="62" width="796" height="20" rx="2" fill="#161b22"/>
  <text x="22" y="76" font-family="'Courier New',monospace" font-size="10.5" fill="#e6edf3">%Cpu(s): <tspan fill="#f85149">82.4</tspan> us,  <tspan fill="#ffa657">5.1</tspan> sy,  <tspan fill="#8b949e">0.0</tspan> ni,  <tspan fill="#3fb950">11.2</tspan> id,  <tspan fill="#58a6ff">1.1</tspan> wa,  <tspan fill="#8b949e">0.1</tspan> hi,  <tspan fill="#8b949e">0.1</tspan> si,  <tspan fill="#8b949e">0.0</tspan> st</text>

  <rect x="12" y="84" width="796" height="20" rx="2" fill="#161b22"/>
  <text x="22" y="98" font-family="'Courier New',monospace" font-size="10.5" fill="#e6edf3">MiB Mem:  <tspan fill="#ffa657">15821</tspan> total,  <tspan fill="#3fb950">2451</tspan> free,  <tspan fill="#f85149">8432</tspan> used,  <tspan fill="#58a6ff">4937</tspan> buff/cache</text>

  <rect x="12" y="106" width="796" height="20" rx="2" fill="#161b22"/>
  <text x="22" y="120" font-family="'Courier New',monospace" font-size="10.5" fill="#e6edf3">MiB Swap:  <tspan fill="#8b949e">2048</tspan> total,  <tspan fill="#3fb950">1924</tspan> free,  <tspan fill="#ffa657">124</tspan> used.  <tspan fill="#58a6ff">7100</tspan> avail Mem</text>

  <!-- Column headers -->
  <rect x="12" y="128" width="796" height="18" rx="2" fill="#1f2027"/>
  <text x="22"  y="141" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">PID   USER    PR  NI    VIRT    RES    SHR S  %CPU  %MEM    TIME+  COMMAND</text>

  <!-- High-CPU row (animated) -->
  <rect x="12" y="148" width="796" height="18" rx="2" fill="#2a1515" class="ps-pulse"/>
  <text x="22"  y="161" font-family="'Courier New',monospace" font-size="10" fill="#f85149">5001  ravi    20   0  425.6m  47.2m   8.1m R  98.2  12.4   1:23.41  python3</text>

  <rect x="12" y="168" width="796" height="16" rx="2" fill="#161b22"/>
  <text x="22"  y="181" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">5100  postgr  20   0  234.1m  28.3m  12.0m S   2.3   7.1   0:12.05  postgres</text>

  <rect x="12" y="186" width="796" height="16" rx="2" fill="#161b22"/>
  <text x="22"  y="199" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">   1  root    20   0  169.5m   9.8m   8.2m S   0.0   0.6  15:32.11  systemd</text>

  <!-- CPU legend -->
  <rect x="12" y="210" width="796" height="60" rx="6" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="22" y="228" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">CPU % breakdown:</text>
  <text x="115" y="228" font-family="'Segoe UI',sans-serif" font-size="10" fill="#f85149">us=user  </text>
  <text x="183" y="228" font-family="'Segoe UI',sans-serif" font-size="10" fill="#ffa657">sy=kernel  </text>
  <text x="264" y="228" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">ni=niced  </text>
  <text x="336" y="228" font-family="'Segoe UI',sans-serif" font-size="10" fill="#3fb950">id=idle  </text>
  <text x="400" y="228" font-family="'Segoe UI',sans-serif" font-size="10" fill="#58a6ff">wa=iowait  </text>
  <text x="472" y="228" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">hi=hw irq  </text>
  <text x="546" y="228" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">si=sw irq  </text>
  <text x="620" y="228" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">st=VM steal</text>
  <text x="22" y="248" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">Interactive keys:  </text>
  <text x="130" y="248" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">M</text><text x="140" y="248" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">=sort mem  </text>
  <text x="210" y="248" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">P</text><text x="220" y="248" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">=sort cpu  </text>
  <text x="290" y="248" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">1</text><text x="300" y="248" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">=per-core view  </text>
  <text x="398" y="248" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">u</text><text x="408" y="248" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">=filter user  </text>
  <text x="492" y="248" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">k</text><text x="502" y="248" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">=kill  </text>
  <text x="542" y="248" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">r</text><text x="552" y="248" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">=renice  </text>
  <text x="620" y="248" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">H</text><text x="630" y="248" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">=threads  </text>
  <text x="700" y="248" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">q</text><text x="710" y="248" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">=quit</text>
  <text x="22" y="264" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">PR=kernel prio (20=normal)  NI=nice value (-20 to +19)  SHR=shared mem  RES=RSS</text>
</svg>
</div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 7 — /proc FILESYSTEM
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> The <code>/proc</code> Filesystem — Direct Kernel Intelligence</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 260" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="260" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">/proc Virtual Filesystem — Every Read Calls a Kernel Function</text>

  <!-- /proc root -->
  <rect x="330" y="34" width="160" height="32" rx="8" fill="#0e1824" stroke="#58a6ff" stroke-width="2"/>
  <text x="410" y="55" text-anchor="middle" font-family="'Courier New',monospace" font-size="14" font-weight="bold" fill="#58a6ff">/proc/</text>

  <!-- /proc/PID -->
  <line x1="410" y1="66" x2="410" y2="86" stroke="#3fb950" stroke-width="1.5"/>
  <rect x="310" y="86" width="200" height="30" rx="7" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="410" y="106" text-anchor="middle" font-family="'Courier New',monospace" font-size="12" font-weight="bold" fill="#3fb950">/proc/5001/</text>

  <!-- Per-process children -->
  <line x1="310" y1="102" x2="90"  y2="140" stroke="#3fb950" stroke-width="1.5"/>
  <line x1="340" y1="116" x2="215" y2="145" stroke="#3fb950" stroke-width="1.5"/>
  <line x1="380" y1="116" x2="330" y2="145" stroke="#3fb950" stroke-width="1.5"/>
  <line x1="420" y1="116" x2="430" y2="145" stroke="#3fb950" stroke-width="1.5"/>
  <line x1="460" y1="116" x2="550" y2="145" stroke="#3fb950" stroke-width="1.5"/>
  <line x1="500" y1="102" x2="680" y2="140" stroke="#3fb950" stroke-width="1.5"/>

  <!-- File nodes -->
  <rect x="14"  y="140" width="144" height="26" rx="5" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="86"  y="157" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">cmdline</text>
  <text x="86"  y="175" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#8b949e">full command (NUL-sep)</text>

  <rect x="166" y="145" width="100" height="26" rx="5" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="216" y="162" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">status</text>
  <text x="216" y="180" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#8b949e">state mem threads</text>

  <rect x="274" y="145" width="100" height="26" rx="5" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="324" y="162" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">fd/</text>
  <text x="324" y="180" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#8b949e">open file descriptors</text>

  <rect x="382" y="145" width="100" height="26" rx="5" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="432" y="162" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">maps</text>
  <text x="432" y="180" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#8b949e">memory layout</text>

  <rect x="490" y="145" width="100" height="26" rx="5" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="540" y="162" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">wchan</text>
  <text x="540" y="180" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#f85149">wait channel!</text>

  <rect x="598" y="140" width="100" height="26" rx="5" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="648" y="157" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">environ</text>
  <text x="648" y="175" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#8b949e">env at launch</text>

  <!-- System-wide files -->
  <rect x="12" y="200" width="796" height="50" rx="6" fill="#161b22" stroke="#58a6ff" stroke-width="1"/>
  <text x="22" y="218" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#58a6ff">System-wide /proc files:</text>
  <text x="162" y="218" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">meminfo</text>
  <text x="224" y="218" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">RAM stats  </text>
  <text x="290" y="218" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">loadavg</text>
  <text x="345" y="218" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">load  </text>
  <text x="384" y="218" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">cpuinfo</text>
  <text x="438" y="218" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">CPU  </text>
  <text x="468" y="218" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">net/dev</text>
  <text x="522" y="218" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">network  </text>
  <text x="574" y="218" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">diskstats</text>
  <text x="640" y="218" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">disk I/O  </text>
  <text x="694" y="218" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">version</text>
  <text x="22" y="242" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#30363d">/proc is a virtual filesystem — no data stored on disk. Reading a file executes a kernel function that generates the content live from kernel data structures.</text>
</svg>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 4 of 10 — /proc deep: wchan, status, fd, cmdline, environ, meminfo</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ /proc/PID/wchan — WHY IS IT STUCK? ════════════════════</span>
<span class="cb-prompt">$</span> cat /proc/5001/wchan
<span class="cb-out">futex_wait</span>
<span class="cb-cmt"># futex_wait   = waiting on a threading lock (mutex, semaphore)
# pipe_wait    = waiting for data in a pipe (producer slow)
# sk_wait_data = waiting for network data (socket read)
# do_wait      = parent waiting for child to exit
# disk_sync    = waiting for disk I/O to complete
# 0 / running  = actually on CPU right now</span>

<span class="cb-cmt">## ═══ /proc/PID/status — HUMAN READABLE STATE ════════════════</span>
<span class="cb-prompt">$</span> cat /proc/5001/status
<span class="cb-out">Name:     python3</span>
<span class="cb-out">State:    R (running)</span>
<span class="cb-out">Pid:      5001</span>
<span class="cb-out">PPid:     4820</span>
<span class="cb-out">Threads:  8</span>
<span class="cb-out">VmPeak:   425680 kB</span>
<span class="cb-out">VmRSS:     48320 kB</span>
<span class="cb-out">SigPnd:   0000000000000000   ← pending signals (bitmask)</span>
<span class="cb-out">SigBlk:   0000000000000000   ← blocked signals</span>
<span class="cb-out">SigIgn:   0000000001001000   ← ignored signals</span>
<span class="cb-out">SigCgt:   0000000180000000   ← caught (custom handler)</span>

<span class="cb-cmt">## ═══ /proc/PID/fd — OPEN FILE DESCRIPTORS ══════════════════</span>
<span class="cb-prompt">$</span> ls -la /proc/5001/fd
<span class="cb-out">lrwxrwxrwx /proc/5001/fd/0 -> /dev/pts/0     (stdin)</span>
<span class="cb-out">lrwxrwxrwx /proc/5001/fd/1 -> /dev/pts/0     (stdout)</span>
<span class="cb-out">lrwxrwxrwx /proc/5001/fd/2 -> /dev/pts/0     (stderr)</span>
<span class="cb-out">lrwxrwxrwx /proc/5001/fd/3 -> socket:[12345] (TCP socket)</span>
<span class="cb-out">lrwxrwxrwx /proc/5001/fd/4 -> /data/input.csv</span>
<span class="cb-prompt">$</span> ls /proc/5001/fd | wc -l    <span class="cb-cmt"># count open FDs</span>
<span class="cb-out">28</span>
<span class="cb-cmt"># ulimit -n shows the limit (default 1024)
# FD leaks = this number grows without bound</span>

<span class="cb-cmt">## ═══ /proc/PID/cmdline — EXACT COMMAND ══════════════════════</span>
<span class="cb-prompt">$</span> tr '\0' ' ' < /proc/5001/cmdline; echo
<span class="cb-out">python3 etl.py --date 2024-01-15 --env prod</span>
<span class="cb-cmt"># Args are NUL-separated in the file — tr makes readable</span>

<span class="cb-cmt">## ═══ /proc/PID/environ — ENVIRONMENT AT LAUNCH ═════════════</span>
<span class="cb-prompt">$</span> tr '\0' '\n' < /proc/5001/environ | grep -E 'DB_|AWS_'
<span class="cb-out">DB_HOST=prod-db.internal</span>
<span class="cb-out">DB_PORT=5432</span>
<span class="cb-out">AWS_REGION=ap-south-1</span>

<span class="cb-cmt">## ═══ SYSTEM-WIDE: meminfo and loadavg ═══════════════════════</span>
<span class="cb-prompt">$</span> cat /proc/meminfo | head -6
<span class="cb-out">MemTotal:     16199872 kB</span>
<span class="cb-out">MemFree:       2510592 kB</span>
<span class="cb-out">MemAvailable:  7281664 kB   ← includes reclaimable cache!</span>
<span class="cb-out">Buffers:       1024000 kB</span>
<span class="cb-out">Cached:        4012032 kB</span>
<span class="cb-cmt"># MemAvailable > MemFree — Linux uses spare RAM as disk cache
# For "how much can I allocate" → use MemAvailable, not MemFree</span>

<span class="cb-prompt">$</span> cat /proc/loadavg
<span class="cb-out">1.82 1.45 1.21 3/182 5010</span>
<span class="cb-cmt"># 1min  5min  15min  running/total  last-pid-assigned</span>
<span class="cb-prompt">$</span> LOAD=$(awk '{print $1}' /proc/loadavg)
<span class="cb-prompt">$</span> CORES=$(nproc)
<span class="cb-prompt">$</span> awk "BEGIN{printf \"Load: %.0f%% saturated\n\", $LOAD/$CORES*100}"
<span class="cb-out">Load: 46% saturated</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 8 — pgrep / pkill / kill
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Finding &amp; Targeting Processes — <code>pgrep</code>, <code>pkill</code>, <code>kill</code></h2>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 5 of 10 — pgrep, pkill, kill, pidof: every targeting option</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ pgrep — FIND BY NAME / PATTERN ════════════════════════</span>
<span class="cb-prompt">$</span> pgrep python3              <span class="cb-cmt"># PIDs matching name</span>
<span class="cb-out">5001</span>
<span class="cb-out">5002</span>
<span class="cb-prompt">$</span> pgrep -l  python3          <span class="cb-cmt"># -l: show name too</span>
<span class="cb-out">5001 python3</span>
<span class="cb-prompt">$</span> pgrep -a  python3          <span class="cb-cmt"># -a: full cmdline</span>
<span class="cb-out">5001 python3 etl.py --date 2024-01-15</span>
<span class="cb-prompt">$</span> pgrep -f  'etl.py'         <span class="cb-cmt"># -f: match full cmdline</span>
<span class="cb-prompt">$</span> pgrep -u  ravi python3     <span class="cb-cmt"># filter by user</span>
<span class="cb-prompt">$</span> pgrep -P  4820             <span class="cb-cmt"># children of PID 4820</span>
<span class="cb-prompt">$</span> pgrep -x  python3          <span class="cb-cmt"># -x: exact name match only</span>
<span class="cb-prompt">$</span> pgrep -c  python3          <span class="cb-cmt"># count only</span>
<span class="cb-out">2</span>
<span class="cb-prompt">$</span> pgrep -n  python3          <span class="cb-cmt"># newest match only</span>
<span class="cb-prompt">$</span> pgrep -o  python3          <span class="cb-cmt"># oldest match only</span>

<span class="cb-cmt">## ═══ pkill — SIGNAL BY PATTERN ══════════════════════════════</span>
<span class="cb-prompt">$</span> pkill    python3           <span class="cb-cmt"># SIGTERM all python3 (graceful)</span>
<span class="cb-prompt">$</span> pkill -9 python3           <span class="cb-cmt"># SIGKILL (force)</span>
<span class="cb-prompt">$</span> pkill -HUP nginx           <span class="cb-cmt"># reload config</span>
<span class="cb-prompt">$</span> pkill -f 'etl.py'          <span class="cb-cmt"># match full cmdline</span>
<span class="cb-prompt">$</span> pkill -u ravi python3      <span class="cb-cmt"># only ravi's python3</span>
<span class="cb-prompt">$</span> pkill --echo python3       <span class="cb-cmt"># print what was killed</span>
<span class="cb-out">python3 killed (pid 5001)</span>

<span class="cb-cmt">## ═══ kill — SIGNAL BY PID ════════════════════════════════════</span>
<span class="cb-prompt">$</span> kill    5001               <span class="cb-cmt"># SIGTERM (default)</span>
<span class="cb-prompt">$</span> kill -15 5001              <span class="cb-cmt"># SIGTERM by number</span>
<span class="cb-prompt">$</span> kill -TERM 5001            <span class="cb-cmt"># by name</span>
<span class="cb-prompt">$</span> kill -9 5001               <span class="cb-cmt"># SIGKILL — uncatchable</span>
<span class="cb-prompt">$</span> kill -0 5001               <span class="cb-cmt"># test existence (no signal sent)</span>
<span class="cb-prompt">$</span> kill -0 5001 && echo alive || echo dead
<span class="cb-prompt">$</span> kill -l                    <span class="cb-cmt"># list all signal names</span>
<span class="cb-prompt">$</span> kill -TERM -5001           <span class="cb-cmt"># negative = send to process GROUP</span>

<span class="cb-cmt">## ═══ GRACEFUL SHUTDOWN PATTERN ═══════════════════════════════</span>
graceful_shutdown() {
    local PID="$1" WAIT="\${2:-30}"
    echo "SIGTERM → $PID"
    kill -TERM "$PID" || return 1
    local N=0
    while kill -0 "$PID" 2>/dev/null; do
        (( ++N > WAIT )) && { echo "Timeout — SIGKILL" >&2; kill -KILL "$PID"; break; }
        sleep 1
    done
    echo "Process $PID done after \${N}s"
}
graceful_shutdown 5001 30
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 9 — nice / renice (ANIMATED SPECTRUM)
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Priority &amp; Niceness — <code>nice</code>, <code>renice</code>, <code>ionice</code></h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 180" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <defs>
    <linearGradient id="ps-prio" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%"   stop-color="#f85149"/>
      <stop offset="28%"  stop-color="#ffa657"/>
      <stop offset="50%"  stop-color="#3fb950"/>
      <stop offset="75%"  stop-color="#58a6ff"/>
      <stop offset="100%" stop-color="#30363d"/>
    </linearGradient>
  </defs>
  <rect width="820" height="180" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">Nice Value Spectrum — Lower Number = Higher Priority = More CPU Time</text>

  <!-- Gradient bar -->
  <rect x="40" y="48" width="740" height="20" rx="5" fill="url(#ps-prio)" opacity=".85"/>

  <!-- Tick marks and labels -->
  <line x1="40"  y1="44" x2="40"  y2="72" stroke="#f85149" stroke-width="2"/>
  <line x1="192" y1="44" x2="192" y2="72" stroke="#ffa657" stroke-width="2"/>
  <line x1="370" y1="44" x2="370" y2="72" stroke="#3fb950" stroke-width="2.5"/>
  <line x1="578" y1="44" x2="578" y2="72" stroke="#58a6ff" stroke-width="2"/>
  <line x1="780" y1="44" x2="780" y2="72" stroke="#30363d" stroke-width="2"/>

  <!-- nice value labels -->
  <text x="40"  y="38" text-anchor="middle" font-family="'Courier New',monospace" font-size="13" font-weight="bold" fill="#f85149">-20</text>
  <text x="192" y="38" text-anchor="middle" font-family="'Courier New',monospace" font-size="13" font-weight="bold" fill="#ffa657">-10</text>
  <text x="370" y="38" text-anchor="middle" font-family="'Courier New',monospace" font-size="13" font-weight="bold" fill="#3fb950">  0</text>
  <text x="578" y="38" text-anchor="middle" font-family="'Courier New',monospace" font-size="13" font-weight="bold" fill="#58a6ff">+10</text>
  <text x="780" y="38" text-anchor="middle" font-family="'Courier New',monospace" font-size="13" font-weight="bold" fill="#30363d">+19</text>

  <!-- Priority labels below bar -->
  <text x="40"  y="90" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#f85149">PR=100</text>
  <text x="370" y="90" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">PR=120 (default)</text>
  <text x="780" y="90" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#30363d">PR=139</text>

  <!-- Labels top -->
  <text x="40"  y="112" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#f85149">Highest Priority</text>
  <text x="40"  y="125" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">root only</text>
  <text x="780" y="112" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#8b949e">Lowest Priority</text>
  <text x="780" y="125" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">any user</text>

  <!-- Use cases -->
  <rect x="12"  y="140" width="185" height="32" rx="5" fill="#1a1a2a" stroke="#f85149" stroke-width="1"/>
  <text x="104" y="155" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#f85149">critical alerts / monitoring</text>
  <text x="104" y="167" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#8b949e">sudo nice -n -10 CMD</text>
  <rect x="270" y="140" width="185" height="32" rx="5" fill="#1a2a1a" stroke="#3fb950" stroke-width="1"/>
  <text x="362" y="155" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">normal interactive queries</text>
  <text x="362" y="167" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#8b949e">no nice (default)</text>
  <rect x="540" y="140" width="185" height="32" rx="5" fill="#0e1824" stroke="#58a6ff" stroke-width="1"/>
  <text x="632" y="155" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#58a6ff">batch jobs / backups</text>
  <text x="632" y="167" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#8b949e">nice -n 15 CMD</text>
</svg>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 6 of 10 — nice, renice, ionice, OOM adj, ulimit</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ nice — START WITH ADJUSTED PRIORITY ════════════════════</span>
<span class="cb-prompt">$</span> nice python3 etl.py          <span class="cb-cmt"># +10 (nice's default)</span>
<span class="cb-prompt">$</span> nice -n 19 python3 backup.py <span class="cb-cmt"># lowest priority</span>
<span class="cb-prompt">$</span> nice -n -10 python3 alert.py <span class="cb-cmt"># high priority (needs root)</span>
<span class="cb-prompt">$</span> sudo nice -n -20 python3 critical.py  <span class="cb-cmt"># maximum (root only)</span>

<span class="cb-cmt">## ═══ renice — CHANGE PRIORITY OF RUNNING PROCESS ════════════</span>
<span class="cb-prompt">$</span> renice 19 -p 5001             <span class="cb-cmt"># lower PID 5001's priority</span>
<span class="cb-prompt">$</span> renice 10 -u ravi             <span class="cb-cmt"># all of ravi's processes</span>
<span class="cb-prompt">$</span> sudo renice -5 -p 5001        <span class="cb-cmt"># raise priority (root only)</span>
<span class="cb-cmt"># Normal users can only RAISE nice (lower priority)
# Root can set any nice value</span>

<span class="cb-cmt">## ═══ ionice — I/O PRIORITY (separate from CPU) ═══════════════</span>
<span class="cb-cmt"># Class 1: real-time (guaranteed I/O)
# Class 2: best-effort (default, levels 0-7)
# Class 3: idle (only uses disk when nothing else needs it)</span>
<span class="cb-prompt">$</span> ionice -c 3 python3 backup.py      <span class="cb-cmt"># idle I/O class</span>
<span class="cb-prompt">$</span> ionice -c 2 -n 7 tar czf ...       <span class="cb-cmt"># best-effort, lowest level</span>
<span class="cb-prompt">$</span> ionice -p 5001                     <span class="cb-cmt"># show current I/O class</span>

<span class="cb-cmt"># Lowest-priority batch job (both CPU and I/O):</span>
<span class="cb-prompt">$</span> nice -n 19 ionice -c 3 bash archive.sh

<span class="cb-cmt">## ═══ OOM PROTECTION ══════════════════════════════════════════</span>
<span class="cb-cmt"># oom_score_adj: -1000 (never kill) to +1000 (kill first)</span>
<span class="cb-prompt">$</span> cat /proc/5001/oom_score         <span class="cb-cmt"># current OOM score</span>
<span class="cb-out">425</span>
<span class="cb-cmt"># Protect postgres from OOM killer:</span>
<span class="cb-prompt">$</span> echo -1000 | sudo tee /proc/$(pgrep postgres)/oom_score_adj
<span class="cb-cmt"># Make a big job die first during OOM:</span>
<span class="cb-prompt">$</span> echo 500 | sudo tee /proc/$(pgrep bigbatch)/oom_score_adj

<span class="cb-cmt">## ═══ ulimit — RESOURCE LIMITS ════════════════════════════════</span>
<span class="cb-prompt">$</span> ulimit -a                    <span class="cb-cmt"># show all limits</span>
<span class="cb-out">open files                (-n) 1024</span>
<span class="cb-out">stack size           (kbytes, -s) 8192</span>
<span class="cb-out">cpu time               (seconds, -t) unlimited</span>
<span class="cb-cmt"># Set limits for a subshell/process:</span>
(
    ulimit -v 2097152   <span class="cb-cmt"># virtual memory: 2 GB</span>
    ulimit -t 3600      <span class="cb-cmt"># CPU time: 1 hour max</span>
    ulimit -n 4096      <span class="cb-cmt"># open files: 4096</span>
    nice -n 10 python3 etl.py
)
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 10 — SIGNAL DELIVERY FLOW (ANIMATED)
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Signal Delivery — The Complete Flow from Source to Handler</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 290" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 20px;">
  <rect width="820" height="290" fill="#0d1117" rx="12"/>
  <text x="410" y="24" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="13" font-weight="bold" fill="#8b949e">Signal Delivery Pipeline — Animated: Source → Pending → Mask → Disposition → Handler</text>

  <!-- Sources -->
  <text x="80" y="52" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#ffa657">Signal Sources</text>
  <rect x="14"  y="60" width="132" height="24" rx="5" fill="#2a2214" stroke="#ffa657" stroke-width="1.5"/>
  <text x="80" y="76" text-anchor="middle" font-family="'Courier New',monospace" font-size="9.5" fill="#ffa657">kill -15 PID</text>
  <rect x="14"  y="90" width="132" height="24" rx="5" fill="#2a2214" stroke="#ffa657" stroke-width="1.5"/>
  <text x="80" y="106" text-anchor="middle" font-family="'Courier New',monospace" font-size="9.5" fill="#ffa657">Ctrl+C (tty driver)</text>
  <rect x="14" y="120" width="132" height="24" rx="5" fill="#2a2214" stroke="#ffa657" stroke-width="1.5"/>
  <text x="80" y="136" text-anchor="middle" font-family="'Courier New',monospace" font-size="9.5" fill="#ffa657">kill(2) syscall</text>
  <rect x="14" y="150" width="132" height="24" rx="5" fill="#2a2214" stroke="#ffa657" stroke-width="1.5"/>
  <text x="80" y="166" text-anchor="middle" font-family="'Courier New',monospace" font-size="9.5" fill="#ffa657">SIGSEGV (hw fault)</text>
  <rect x="14" y="180" width="132" height="24" rx="5" fill="#2a2214" stroke="#ffa657" stroke-width="1.5"/>
  <text x="80" y="196" text-anchor="middle" font-family="'Courier New',monospace" font-size="9.5" fill="#ffa657">SIGALRM (timer)</text>

  <!-- Animated flow arrows from sources to pending -->
  <line x1="146" y1="90" x2="210" y2="136" stroke="#ffa657" stroke-width="1.5" marker-end="url(#ps-orn)" class="ps-flow"/>
  <line x1="146" y1="114" x2="210" y2="138" stroke="#ffa657" stroke-width="1.5" marker-end="url(#ps-orn)" class="ps-flow"/>
  <line x1="146" y1="144" x2="210" y2="142" stroke="#ffa657" stroke-width="1.5" marker-end="url(#ps-orn)" class="ps-flow"/>

  <!-- Pending bitmask -->
  <rect x="210" y="108" width="150" height="60" rx="8" fill="#1a1a3a" stroke="#bc8cff" stroke-width="2"/>
  <text x="285" y="128" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#bc8cff">Pending Bitmask</text>
  <text x="285" y="144" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">signal_pending</text>
  <text x="285" y="160" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">in task_struct</text>

  <!-- Bitmask visual -->
  <rect x="214" y="180" width="142" height="22" rx="4" fill="#161b22"/>
  <text x="219" y="195" font-family="'Courier New',monospace" font-size="9" fill="#3fb950">0010000001000000</text>
  <text x="285" y="212" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#8b949e">bit 2=SIGINT set, bit 15=SIGTERM set</text>

  <!-- Arrow to signal mask -->
  <line x1="360" y1="138" x2="420" y2="138" stroke="#bc8cff" stroke-width="2" marker-end="url(#ps-pur)"/>

  <!-- Signal mask -->
  <rect x="420" y="108" width="150" height="60" rx="8" fill="#2a1a14" stroke="#f85149" stroke-width="2"/>
  <text x="495" y="128" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#f85149">Signal Mask</text>
  <text x="495" y="144" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">signal_blocked</text>
  <text x="495" y="160" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">sigprocmask(2)</text>

  <!-- Blocked path -->
  <line x1="495" y1="168" x2="495" y2="200" stroke="#f85149" stroke-width="1.5" stroke-dasharray="5,3" marker-end="url(#ps-red)"/>
  <rect x="420" y="200" width="150" height="26" rx="6" fill="#2a1a1a" stroke="#f85149" stroke-width="1"/>
  <text x="495" y="217" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#f85149">Stays pending (queued)</text>
  <text x="495" y="238" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">until mask cleared</text>

  <!-- Unblocked path to disposition -->
  <line x1="570" y1="138" x2="620" y2="138" stroke="#3fb950" stroke-width="2" marker-end="url(#ps-grn)"/>
  <text x="594" y="130" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">not blocked</text>

  <!-- Disposition box -->
  <rect x="620" y="80" width="188" height="170" rx="8" fill="#161b22" stroke="#30363d" stroke-width="1.5"/>
  <text x="714" y="100" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#8b949e">Disposition (sigaction)</text>

  <rect x="630" y="108" width="168" height="26" rx="5" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.2"/>
  <text x="714" y="125" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">SIG_DFL → default action</text>

  <rect x="630" y="140" width="168" height="26" rx="5" fill="#1f2027" stroke="#8b949e" stroke-width="1.2"/>
  <text x="714" y="157" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">SIG_IGN → ignore it</text>

  <rect x="630" y="172" width="168" height="26" rx="5" fill="#0e1824" stroke="#58a6ff" stroke-width="1.2"/>
  <text x="714" y="189" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#58a6ff">handler() → your function</text>

  <!-- SIGKILL/STOP special case (animated) -->
  <rect x="630" y="204" width="168" height="34" rx="5" fill="#2a1a1a" stroke="#f85149" stroke-width="1.8" class="ps-blink"/>
  <text x="714" y="220" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#f85149">SIGKILL / SIGSTOP</text>
  <text x="714" y="232" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#f85149">ALWAYS forced — bypass all</text>

  <!-- Bottom label -->
  <text x="410" y="268" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Signal delivery happens at every return from kernel mode — between any two user-space instructions</text>
  <text x="410" y="282" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">SIGKILL and SIGSTOP bypass the mask AND the disposition — they cannot be blocked, caught, or ignored</text>
</svg>
</div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 11 — ALL 31 SIGNALS GROUPED
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> All 31 Signals — Grouped by Purpose with Use Cases</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 240" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="240" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">Signal Groups — Termination / Stop-Resume / Child / Hardware / User-Defined</text>

  <!-- TERMINATION GROUP -->
  <rect x="12" y="36" width="200" height="196" rx="8" fill="#2a1414" stroke="#f85149" stroke-width="1.5"/>
  <text x="112" y="56" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#f85149">Termination</text>
  <text x="22" y="74"  font-family="'Courier New',monospace" font-size="10" fill="#f85149"> 1 SIGHUP </text>  <text x="112" y="74"  font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">tty close / reload</text>
  <text x="22" y="90"  font-family="'Courier New',monospace" font-size="10" fill="#f85149"> 2 SIGINT </text>  <text x="112" y="90"  font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Ctrl+C</text>
  <text x="22" y="106" font-family="'Courier New',monospace" font-size="10" fill="#f85149"> 3 SIGQUIT</text> <text x="112" y="106" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Ctrl+\ + core dump</text>
  <text x="22" y="122" font-family="'Courier New',monospace" font-size="10" fill="#f85149"> 6 SIGABRT</text> <text x="112" y="122" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">abort() call</text>
  <text x="22" y="138" font-family="'Courier New',monospace" font-size="10" fill="#f85149"> 9 SIGKILL</text> <text x="112" y="138" font-family="'Segoe UI',sans-serif" font-size="9" fill="#f85149">force — uncatchable!</text>
  <text x="22" y="154" font-family="'Courier New',monospace" font-size="10" fill="#f85149">13 SIGPIPE</text> <text x="112" y="154" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">broken pipe</text>
  <text x="22" y="170" font-family="'Courier New',monospace" font-size="10" fill="#f85149">15 SIGTERM</text> <text x="112" y="170" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">graceful, catchable</text>
  <text x="22" y="186" font-family="'Courier New',monospace" font-size="10" fill="#f85149">24 SIGXCPU</text> <text x="112" y="186" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">CPU limit exceeded</text>
  <text x="22" y="202" font-family="'Courier New',monospace" font-size="10" fill="#f85149">25 SIGXFSZ</text> <text x="112" y="202" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">file size limit</text>
  <text x="112" y="222" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8" fill="#f85149">default: TERMINATE</text>

  <!-- STOP/CONTINUE -->
  <rect x="222" y="36" width="186" height="120" rx="8" fill="#2a2a14" stroke="#ffa657" stroke-width="1.5"/>
  <text x="315" y="56" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#ffa657">Stop / Continue</text>
  <text x="232" y="74"  font-family="'Courier New',monospace" font-size="10" fill="#ffa657">18 SIGCONT</text> <text x="315" y="74"  font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">resume stopped proc</text>
  <text x="232" y="90"  font-family="'Courier New',monospace" font-size="10" fill="#ffa657">19 SIGSTOP</text> <text x="315" y="90"  font-family="'Segoe UI',sans-serif" font-size="9" fill="#f85149">pause — uncatchable!</text>
  <text x="232" y="106" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">20 SIGTSTP</text> <text x="315" y="106" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Ctrl+Z, catchable</text>
  <text x="232" y="122" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">21 SIGTTIN</text> <text x="315" y="122" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">bg read → stops</text>
  <text x="232" y="138" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">22 SIGTTOU</text> <text x="315" y="138" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">bg write → stops</text>
  <text x="315" y="148" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8" fill="#ffa657">SIGSTOP/CONT: uncatchable</text>

  <!-- CHILD/TIMER -->
  <rect x="222" y="164" width="186" height="68" rx="8" fill="#142a14" stroke="#3fb950" stroke-width="1.5"/>
  <text x="315" y="182" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#3fb950">Child / Timer</text>
  <text x="232" y="198" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">17 SIGCHLD</text> <text x="315" y="198" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">child exited/stopped</text>
  <text x="232" y="214" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">14 SIGALRM</text> <text x="315" y="214" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">alarm() timer fired</text>
  <text x="232" y="228" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">27 SIGPROF </text> <text x="315" y="228" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">profiling timer</text>

  <!-- HARDWARE FAULTS -->
  <rect x="418" y="36" width="186" height="120" rx="8" fill="#1a1428" stroke="#bc8cff" stroke-width="1.5"/>
  <text x="511" y="56" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#bc8cff">Hardware Faults</text>
  <text x="428" y="74"  font-family="'Courier New',monospace" font-size="10" fill="#bc8cff"> 4 SIGILL </text> <text x="511" y="74"  font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">illegal instruction</text>
  <text x="428" y="90"  font-family="'Courier New',monospace" font-size="10" fill="#bc8cff"> 5 SIGTRAP</text> <text x="511" y="90"  font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">breakpoint/debug</text>
  <text x="428" y="106" font-family="'Courier New',monospace" font-size="10" fill="#bc8cff"> 7 SIGBUS </text> <text x="511" y="106" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">bus error (alignment)</text>
  <text x="428" y="122" font-family="'Courier New',monospace" font-size="10" fill="#bc8cff"> 8 SIGFPE </text> <text x="511" y="122" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">float/div error</text>
  <text x="428" y="138" font-family="'Courier New',monospace" font-size="10" fill="#bc8cff">11 SIGSEGV</text> <text x="511" y="138" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">segmentation fault</text>
  <text x="511" y="150" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8" fill="#8b949e">default: core dump</text>

  <!-- USER-DEFINED -->
  <rect x="418" y="164" width="186" height="68" rx="8" fill="#0e1824" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="511" y="182" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#58a6ff">User-Defined</text>
  <text x="428" y="198" font-family="'Courier New',monospace" font-size="10" fill="#58a6ff">10 SIGUSR1</text> <text x="511" y="198" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">app-defined: toggle debug</text>
  <text x="428" y="214" font-family="'Courier New',monospace" font-size="10" fill="#58a6ff">12 SIGUSR2</text> <text x="511" y="214" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">app-defined: status dump</text>

  <!-- I/O + MISC -->
  <rect x="614" y="36" width="194" height="196" rx="8" fill="#1f2027" stroke="#30363d" stroke-width="1.5"/>
  <text x="711" y="56" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#8b949e">I/O &amp; Misc</text>
  <text x="624" y="74"  font-family="'Courier New',monospace" font-size="10" fill="#8b949e">23 SIGURG  </text> <text x="711" y="74"  font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">urgent socket data</text>
  <text x="624" y="90"  font-family="'Courier New',monospace" font-size="10" fill="#8b949e">26 SIGVTALRM</text><text x="711" y="90"  font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">virtual timer</text>
  <text x="624" y="106" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">28 SIGWINCH</text> <text x="711" y="106" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">terminal resized</text>
  <text x="624" y="122" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">29 SIGIO   </text> <text x="711" y="122" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">async I/O ready</text>
  <text x="624" y="138" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">30 SIGPWR  </text> <text x="711" y="138" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">power failure</text>
  <text x="624" y="154" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">31 SIGSYS  </text> <text x="711" y="154" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">bad syscall arg</text>
  <line x1="624" y1="166" x2="800" y2="166" stroke="#30363d" stroke-width="1"/>
  <text x="711" y="184" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" font-weight="bold" fill="#f85149">Cannot be caught or blocked:</text>
  <text x="624" y="200" font-family="'Courier New',monospace" font-size="10" fill="#f85149"> 9 SIGKILL</text>
  <text x="624" y="216" font-family="'Courier New',monospace" font-size="10" fill="#f85149">19 SIGSTOP</text>
  <text x="711" y="232" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8" fill="#8b949e">Kernel always delivers these</text>
</svg>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 7 of 10 — trap: EXIT, ERR, INT, TERM, HUP, SIGUSR, re-raise</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ trap SYNTAX ════════════════════════════════════════════</span>
trap 'command' SIGNAL  <span class="cb-cmt"># register handler</span>
trap ''        SIGNAL  <span class="cb-cmt"># ignore signal</span>
trap -         SIGNAL  <span class="cb-cmt"># reset to default</span>
trap                   <span class="cb-cmt"># print all current traps</span>

<span class="cb-cmt">## ═══ THE CANONICAL PRODUCTION CLEANUP PATTERN ═══════════════</span>
<span class="cb-out">#!/usr/bin/env bash</span>
<span class="cb-out">set -euo pipefail</span>
<span class="cb-out"></span>
<span class="cb-out">LOCKFILE="/tmp/etl-$(date +%Y%m%d).lock"</span>
<span class="cb-out">TMPDIR=$(mktemp -d /tmp/etl.XXXXXX)</span>
<span class="cb-out">PIDS=()</span>
<span class="cb-out">EXIT_CODE=0</span>
<span class="cb-out"></span>
<span class="cb-out">cleanup() {</span>
<span class="cb-out">    local CODE="\${EXIT_CODE:-$?}"</span>
<span class="cb-out">    echo "=== CLEANUP (exit $CODE) ===" >&2</span>
<span class="cb-out">    # Kill any background children:</span>
<span class="cb-out">    (( \${#PIDS[@]} > 0 )) && kill "\${PIDS[@]}" 2>/dev/null || true</span>
<span class="cb-out">    # Wait for them to finish:</span>
<span class="cb-out">    wait 2>/dev/null || true</span>
<span class="cb-out">    # Remove temp files:</span>
<span class="cb-out">    rm -rf "$TMPDIR"</span>
<span class="cb-out">    # Release lock:</span>
<span class="cb-out">    rm -f "$LOCKFILE"</span>
<span class="cb-out">}</span>
<span class="cb-out">trap cleanup EXIT          # always runs — even on error exit</span>
<span class="cb-out">trap 'EXIT_CODE=130; exit' INT   # Ctrl+C → exit code 130</span>
<span class="cb-out">trap 'EXIT_CODE=143; exit' TERM  # kill    → exit code 143</span>
<span class="cb-out">trap 'EXIT_CODE=129; exit' HUP   # hangup  → exit code 129</span>
<span class="cb-out"></span>
<span class="cb-out"># Acquire lock (atomically):</span>
<span class="cb-out">if ! mkdir "$LOCKFILE" 2>/dev/null; then</span>
<span class="cb-out">    echo "Already running (lock: $LOCKFILE)" >&2; exit 1</span>
<span class="cb-out">fi</span>
<span class="cb-out"></span>
<span class="cb-out">python3 etl.py &amp; PIDS+=($!)</span>
<span class="cb-out">wait "\${PIDS[@]}"   # waits and propagates exit codes</span>

<span class="cb-cmt">## ═══ ERR TRAP — TRACE EVERY FAILURE ═════════════════════════</span>
trap 'echo "ERROR at line $LINENO: $BASH_COMMAND" >&2' ERR
<span class="cb-cmt"># $LINENO       = line number that failed
# $BASH_COMMAND = the exact command that failed</span>

<span class="cb-cmt">## ═══ SIGUSR1 / SIGUSR2 — RUNTIME CONTROL ════════════════════</span>
<span class="cb-out">DEBUG=false</span>
<span class="cb-out">trap 'DEBUG=true;  echo "Debug ON"  >&2' USR1</span>
<span class="cb-out">trap 'DEBUG=false; echo "Debug OFF" >&2' USR2</span>
<span class="cb-cmt"># From another terminal:</span>
<span class="cb-prompt">$</span> kill -USR1 $(pgrep -f etl.py)    <span class="cb-cmt"># toggle debug on</span>
<span class="cb-prompt">$</span> kill -USR2 $(pgrep -f etl.py)    <span class="cb-cmt"># toggle debug off</span>

<span class="cb-cmt">## ═══ SIGHUP — RELOAD CONFIG WITHOUT RESTART ══════════════════</span>
<span class="cb-out">load_config() { source /etc/etl/config.env; }</span>
<span class="cb-out">load_config</span>
<span class="cb-out">trap 'echo "Reloading config..." >&2; load_config' HUP</span>
<span class="cb-cmt"># Trigger reload:</span>
<span class="cb-prompt">$</span> kill -HUP $(cat /var/run/etl.pid)

<span class="cb-cmt">## ═══ SIGPIPE — BROKEN PIPE ════════════════════════════════════</span>
<span class="cb-cmt"># SIGPIPE fires when writing to a pipe whose reader closed
# Default action: terminate (script dies silently!)
# Best practice: ignore it and check write return codes</span>
trap '' PIPE         <span class="cb-cmt"># ignore SIGPIPE — handle at code level</span>
<span class="cb-cmt"># Or use:  set -o pipefail  to catch pipe failures via exit codes</span>

<span class="cb-cmt">## ═══ SIGCHLD — BACKGROUND JOB COMPLETION ════════════════════</span>
<span class="cb-out">handle_child() {</span>
<span class="cb-out">    local PID STATUS</span>
<span class="cb-out">    while true; do</span>
<span class="cb-out">        PID=$(wait -n 2>/dev/null) || break</span>
<span class="cb-out">        STATUS=$?</span>
<span class="cb-out">        echo "Child $PID exited with $STATUS"</span>
<span class="cb-out">    done</span>
<span class="cb-out">}</span>
<span class="cb-out">trap handle_child CHLD</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 12 — KERNEL DEEP DIVE
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Kernel Deep Dive — CFS, fork/exec/wait, Signals, OOM</h2>

<div class="deepdive-box">
<div class="deepdive-title">⚙️ Processes: CFS Scheduler, fork/exec/wait Internals, Signal Delivery, OOM Killer</div>
<pre style="margin:0;padding:16px;font-family:monospace;font-size:12px;color:#e6edf3;background:#010409;border-radius:0 0 8px 8px;overflow-x:auto;">
1. CFS — COMPLETELY FAIR SCHEDULER (process scheduling)

   CFS uses a red-black tree sorted by "virtual runtime" (vruntime).
   The process with the LOWEST vruntime runs next.
   
   vruntime increases as the process runs:
     vruntime += actual_runtime × (base_weight / process_weight)
   
   nice=0  → weight=1024 → vruntime grows at rate 1.0×
   nice=10 → weight=110  → vruntime grows at rate 9.3×
   nice=10 process accumulates vruntime 9× faster → runs 9× less
   
   Context switch = save CPU registers into task_struct, load new ones.
   Scheduler picks leftmost red-black tree node (lowest vruntime).
   
   Timeslice min: /proc/sys/kernel/sched_min_granularity_ns (750μs)
   Target latency: /proc/sys/kernel/sched_latency_ns (6ms default)

2. fork() INTERNALS

   fork() → clone(CLONE_CHILD_CLEARTID | CLONE_CHILD_SETTID | SIGCHLD)
   
   What gets COPIED to child:
     task_struct           (process descriptor — full copy)
     files_struct          (new table, same underlying file objects)
     signal handlers       (sigaction array copied)
     credentials (uid/gid) (copied)
     rlimits               (copied)
   
   What uses Copy-on-Write:
     mm_struct + page tables (shared until first write)
     All memory pages         (marked read-only, faulted on write)
   
   After fork(), child gets a slight scheduling boost to run first
   — reduces CoW faults because child often calls exec() immediately.

3. exec() INTERNALS (execve syscall)

   1. Open the executable file
   2. Check ELF magic bytes (\\x7fELF)
   3. Parse ELF program headers (PT_LOAD segments)
   4. Release old mm_struct (drop all old memory)
   5. Create new mm_struct
   6. mmap() code, data, BSS segments
   7. mmap() interpreter (ld.so) if dynamically linked
   8. Set up new stack: argc, argv[], envp[], aux vectors
   9. ld.so loads shared libraries, resolves symbols
   10. Transfer control to program's entry point
   
   PID unchanged. Threads count resets to 1.
   Signal handlers with SIG_DFL/IGN preserved; custom handlers reset.
   File descriptors: kept (except those with O_CLOEXEC).

4. wait() AND ZOMBIE LIFECYCLE

   On exit():
     All threads terminated
     Memory freed (mm_struct released)
     File descriptors closed
     task_struct kept → exit code stored
     SIGCHLD sent to parent
     Process becomes ZOMBIE (Z state)
   
   On parent's wait()/waitpid():
     Exit code transferred from task_struct to parent
     task_struct deallocated
     PID released back to kernel pool
   
   If parent dies first → child re-parented to PID 1 (systemd)
   systemd continuously calls wait() → no orphan zombies in practice.

5. SIGNAL DELIVERY MECHANISM

   kill(2) syscall:
     Checks permissions (same UID, or root, or SIGCONT same session)
     Sets bit in target's signal_pending bitmask
     Wakes target from interruptible sleep if sleeping
   
   Delivery (on every kernel→userspace return):
     pending = task->signal_pending & ~task->signal_blocked
     if (pending == 0) continue
     sig = find_first_set_bit(pending)
     clear bit from pending
     check sigaction[sig]:
       SIG_DFL → execute default (terminate/stop/ignore)
       SIG_IGN → drop signal
       handler  → set up signal stack frame, call handler
   
   Signal stack frame:
     Kernel pushes siginfo_t + ucontext_t onto user stack
     Sets rip (instruction pointer) to signal handler address
     Handler returns → sigreturn(2) restores saved ucontext_t

6. OOM KILLER

   When kernel cannot allocate memory:
     Scans all processes and computes oom_score:
       oom_score ≈ (physical_pages_used / total_pages) × 1000
       + /proc/PID/oom_score_adj
     Sends SIGKILL to process with highest oom_score
     Logs to kernel ring buffer (dmesg)
   
   Protect critical process: echo -1000 > /proc/PID/oom_score_adj
   Make expendable:          echo  1000 > /proc/PID/oom_score_adj
   Watch for OOM events:     dmesg | grep -i 'oom\|killed process'
</pre>
</div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 13 — REAL-WORLD PATTERNS
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Real-World Patterns — Production Process &amp; Signal Management</h2>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 8 of 10 — Health monitor, zombie detector, graceful shutdown, process supervisor</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ PATTERN 1: PROCESS HEALTH CHECK FROM /proc ═════════════</span>
process_health() {
    local NAME="$1"
    local PID; PID=$(pgrep -xn "$NAME") || { echo "NOT FOUND"; return 1; }

    local STATE MEM FDS WCHAN
    STATE=$(awk '/^State:/{print $2}' /proc/"$PID"/status 2>/dev/null)
    MEM=$(awk '/^VmRSS:/{print $2" "$3}' /proc/"$PID"/status 2>/dev/null)
    FDS=$(ls /proc/"$PID"/fd 2>/dev/null | wc -l)
    WCHAN=$(cat /proc/"$PID"/wchan 2>/dev/null)

    printf "%-12s PID=%-6s STATE=%s MEM=%-12s FDs=%-4s WCHAN=%s\n" \
        "$NAME" "$PID" "$STATE" "$MEM" "$FDS" "$WCHAN"

    [[ $STATE == "D" ]] && echo "  ⚠ WARNING: D-state! Blocked on: $WCHAN" >&2
    [[ $FDS -gt 800  ]] && echo "  ⚠ WARNING: High FD count: $FDS" >&2
}
process_health python3

<span class="cb-cmt">## ═══ PATTERN 2: ZOMBIE DETECTOR AND REAPER ══════════════════</span>
reap_zombies() {
    local ZOMBIES
    ZOMBIES=$(ps -eo pid,ppid,stat,comm | awk '$3~/Z/')
    [[ -z "$ZOMBIES" ]] && return 0

    echo "Zombies found:" >&2
    echo "$ZOMBIES" >&2

    echo "$ZOMBIES" | awk '{print $2}' | sort -u | while read -r PPID; do
        echo "Sending SIGCHLD to parent $PPID"
        kill -CHLD "$PPID" 2>/dev/null || true
    done
}

<span class="cb-cmt">## ═══ PATTERN 3: COMPLETE PIPELINE SUPERVISOR ════════════════</span>
<span class="cb-out">#!/usr/bin/env bash</span>
<span class="cb-out"># Runs a command, restarts on failure, limits restart rate</span>
<span class="cb-out">supervise() {</span>
<span class="cb-out">    local CMD="$1" MAX_RESTARTS="\${2:-5}" BACKOFF=5</span>
<span class="cb-out">    local RESTART_COUNT=0 PID</span>
<span class="cb-out"></span>
<span class="cb-out">    cleanup_child() { kill "\${PID:-}" 2>/dev/null; wait "\${PID:-}" 2>/dev/null; }</span>
<span class="cb-out">    trap 'cleanup_child; exit' INT TERM EXIT</span>
<span class="cb-out"></span>
<span class="cb-out">    while (( RESTART_COUNT < MAX_RESTARTS )); do</span>
<span class="cb-out">        echo "$(date): Starting $CMD (attempt $((RESTART_COUNT+1)))"</span>
<span class="cb-out">        eval "$CMD" &amp;</span>
<span class="cb-out">        PID=$!</span>
<span class="cb-out">        echo $PID > /tmp/supervised.pid</span>
<span class="cb-out">        wait "$PID"</span>
<span class="cb-out">        local EXIT=$?</span>
<span class="cb-out">        echo "$(date): Exited with $EXIT"</span>
<span class="cb-out">        (( EXIT == 0 )) && break          # clean exit — don't restart</span>
<span class="cb-out">        (( RESTART_COUNT++ ))</span>
<span class="cb-out">        echo "Waiting \${BACKOFF}s before restart..."</span>
<span class="cb-out">        sleep "$BACKOFF"</span>
<span class="cb-out">        (( BACKOFF = BACKOFF < 60 ? BACKOFF * 2 : 60 ))</span>
<span class="cb-out">    done</span>
<span class="cb-out">    (( RESTART_COUNT >= MAX_RESTARTS )) && echo "Max restarts reached" >&2</span>
<span class="cb-out">}</span>
<span class="cb-out">supervise "python3 etl.py" 5</span>

<span class="cb-cmt">## ═══ PATTERN 4: OOM PROTECTION AT LAUNCH ════════════════════</span>
start_critical_service() {
    python3 api_server.py &
    local PID=$!
    echo "OOM-protecting PID $PID"
    echo -500 | sudo tee /proc/$PID/oom_score_adj > /dev/null
    echo $PID > /var/run/api_server.pid
    wait $PID
}
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 14 — ADVANCED SIGNAL PATTERNS
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Advanced Signal Patterns — SIGPIPE, SIGCHLD, Self-Signalling</h2>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 9 of 10 — SIGPIPE broken-pipe, SIGCHLD async reaping, timeout, alarm</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ SIGPIPE — BROKEN PIPE HANDLING ═════════════════════════</span>
<span class="cb-cmt"># SIGPIPE fires when writing to a closed pipe
# Default action: TERMINATE SILENTLY — dangerous in scripts!</span>

<span class="cb-cmt"># Scenario: producer | head -5
# head exits after 5 lines → producer gets SIGPIPE on next write</span>
<span class="cb-prompt">$</span> python3 generate.py | head -5    <span class="cb-cmt"># SIGPIPE terminates generator</span>

<span class="cb-cmt"># In scripts: ignore SIGPIPE and handle via exit codes instead</span>
trap '' PIPE
<span class="cb-cmt"># Or suppress the error (set -o pipefail catches pipe failures):</span>
python3 generate.py | head -5 || true

<span class="cb-cmt"># In Python: explicitly handle SIGPIPE</span>
<span class="cb-prompt">$</span> python3 -c "
import signal, sys
signal.signal(signal.SIGPIPE, signal.SIG_DFL)  # let it terminate cleanly
for i in range(10**6):
    try: print(i)
    except BrokenPipeError: sys.exit(0)
" | head -3

<span class="cb-cmt">## ═══ SIGALRM — TIMEOUT IMPLEMENTATION ════════════════════════</span>
<span class="cb-cmt"># Use SIGALRM to implement operation timeouts:</span>
run_with_timeout() {
    local TIMEOUT="$1"; shift
    (
        trap 'echo "TIMEOUT after \${TIMEOUT}s" >&2; exit 124' ALRM
        alarm "$TIMEOUT"    <span class="cb-cmt"># sets SIGALRM timer</span>
        "$@"
        alarm 0             <span class="cb-cmt"># cancel alarm on success</span>
    )
}
<span class="cb-cmt"># More portable timeout approach:</span>
<span class="cb-prompt">$</span> timeout 30 python3 slow_query.py
<span class="cb-prompt">$</span> timeout --signal=KILL 60 python3 etl.py  <span class="cb-cmt"># SIGKILL after 60s</span>

<span class="cb-cmt">## ═══ SIGCHLD — ASYNC CHILD MONITORING ════════════════════════</span>
<span class="cb-cmt"># Track when background children complete:</span>
declare -A JOB_NAMES

monitor_jobs() {
    local PID STATUS
    while true; do
        wait -n 2>/dev/null
        PID=$!; STATUS=$?
        [[ -n "\${JOB_NAMES[$PID]:-}" ]] && \
            echo "Job '\${JOB_NAMES[$PID]}' (PID $PID) exited: $STATUS"
    done
}
trap monitor_jobs CHLD

python3 load.py &      JOB_NAMES[$!]="data-load"
python3 validate.py &  JOB_NAMES[$!]="validate"
wait

<span class="cb-cmt">## ═══ SELF-SIGNALLING — CLEAN RE-RAISE ═══════════════════════</span>
<span class="cb-cmt"># After cleanup, re-raise signal so PARENT sees correct exit cause</span>
<span class="cb-cmt"># (exit code 130 for SIGINT, 143 for SIGTERM, etc.)</span>
cleanup_and_reraise() {
    local SIG="$1"
    cleanup_resources  <span class="cb-cmt"># your cleanup function</span>
    trap - "$SIG"      <span class="cb-cmt"># restore default disposition</span>
    kill -"$SIG" "$$"  <span class="cb-cmt"># send to ourselves — now terminates us</span>
}
trap 'cleanup_and_reraise INT'  INT
trap 'cleanup_and_reraise TERM' TERM
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 15 — COMPLETE REFERENCE TABLES
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Complete Reference — Processes &amp; Signals</h2>

<div class="table-wrap">
<table class="ref-table">
<thead><tr><th style="width:26%">Command / Tool</th><th>Purpose</th><th style="width:30%">Key options</th></tr></thead>
<tbody>
<tr><td colspan="3" style="background:#1a2a1a;color:#3fb950;font-weight:bold;font-family:'Segoe UI',sans-serif;">Process Listing &amp; Monitoring</td></tr>
<tr><td style="font-family:monospace;">ps aux</td><td>All processes, BSD format — the go-to snapshot</td><td><code>-o</code> custom cols, <code>--sort</code>, <code>-u</code>, <code>-C</code>, <code>-p</code></td></tr>
<tr><td style="font-family:monospace;">ps -ef --forest</td><td>All processes in tree format</td><td><code>-eLf</code> for threads, <code>-o pid,stat,wchan,comm</code></td></tr>
<tr><td style="font-family:monospace;">top / htop</td><td>Live monitor — top is everywhere, htop is nicer</td><td>M=mem sort, P=cpu sort, 1=per-core, k=kill</td></tr>
<tr><td style="font-family:monospace;">pstree -p $$</td><td>Visual process tree from given PID</td><td><code>-p</code> show PIDs, <code>-u</code> show users</td></tr>
<tr><td colspan="3" style="background:#0e1824;color:#58a6ff;font-weight:bold;font-family:'Segoe UI',sans-serif;">Finding Processes</td></tr>
<tr><td style="font-family:monospace;">pgrep -la python3</td><td>PIDs matching name pattern</td><td><code>-f</code> full cmdline, <code>-u</code> user, <code>-P</code> parent, <code>-n/-o</code> newest/oldest</td></tr>
<tr><td style="font-family:monospace;">pidof nginx</td><td>PIDs of named program (exact)</td><td>Simple alternative to pgrep for exact names</td></tr>
<tr><td colspan="3" style="background:#2a1a1a;color:#f85149;font-weight:bold;font-family:'Segoe UI',sans-serif;">Signals</td></tr>
<tr><td style="font-family:monospace;">kill -TERM PID</td><td>Send signal by PID — default is SIGTERM</td><td><code>-9/-KILL</code> force, <code>-HUP</code> reload, <code>-0</code> test existence, <code>-STOP/-CONT</code></td></tr>
<tr><td style="font-family:monospace;">pkill -f pattern</td><td>Signal by name/cmdline pattern</td><td><code>-9</code> kill, <code>-n/-o</code> newest/oldest, <code>--echo</code> verbose</td></tr>
<tr><td style="font-family:monospace;">killall -w nginx</td><td>Kill by exact name, wait for death</td><td><code>-u</code> user, <code>-I</code> case-insensitive</td></tr>
<tr><td colspan="3" style="background:#2a2a1a;color:#ffa657;font-weight:bold;font-family:'Segoe UI',sans-serif;">Priority</td></tr>
<tr><td style="font-family:monospace;">nice -n 19 CMD</td><td>Start at lowest priority</td><td>Range -20 (high) to +19 (low), default=10</td></tr>
<tr><td style="font-family:monospace;">renice 10 -p PID</td><td>Change priority of running process</td><td><code>-u</code> all user's procs, root needed for negative</td></tr>
<tr><td style="font-family:monospace;">ionice -c 3 CMD</td><td>Idle I/O — only when disk is free</td><td><code>-c 1</code>=RT, <code>-c 2</code>=best-effort, <code>-c 3</code>=idle</td></tr>
<tr><td colspan="3" style="background:#1a2a2a;color:#3fb950;font-weight:bold;font-family:'Segoe UI',sans-serif;">/proc Quick Reference</td></tr>
<tr><td style="font-family:monospace;">/proc/PID/wchan</td><td>What kernel function it's blocked in</td><td>futex_wait, pipe_wait, sk_wait_data, 0=running</td></tr>
<tr><td style="font-family:monospace;">/proc/PID/status</td><td>Human-readable state, memory, signals</td><td>State, VmRSS, Threads, SigPnd, SigBlk, SigCgt</td></tr>
<tr><td style="font-family:monospace;">/proc/PID/fd/</td><td>Open file descriptors (symlinks)</td><td><code>ls | wc -l</code> = count; compare to ulimit -n</td></tr>
<tr><td style="font-family:monospace;">/proc/PID/maps</td><td>Virtual memory layout (one VMA per line)</td><td><code>pmap -x PID</code> = formatted version</td></tr>
<tr><td style="font-family:monospace;">/proc/meminfo</td><td>System memory — use MemAvailable, not MemFree</td><td>MemTotal, MemFree, MemAvailable, Cached</td></tr>
<tr><td colspan="3" style="background:#1a1a3a;color:#bc8cff;font-weight:bold;font-family:'Segoe UI',sans-serif;">trap Pseudo-Signals</td></tr>
<tr><td style="font-family:monospace;">trap 'cmd' EXIT</td><td>Runs on ANY exit — cleanups, lock release</td><td>Most important trap. Always add this.</td></tr>
<tr><td style="font-family:monospace;">trap 'cmd' ERR</td><td>Runs after any failing command</td><td>$LINENO and $BASH_COMMAND available</td></tr>
<tr><td style="font-family:monospace;">trap 'cmd' INT</td><td>Ctrl+C — SIGINT</td><td>Set EXIT_CODE=130 before exit</td></tr>
<tr><td style="font-family:monospace;">trap 'cmd' TERM</td><td>kill signal — graceful shutdown</td><td>Set EXIT_CODE=143 before exit</td></tr>
<tr><td style="font-family:monospace;">trap 'cmd' HUP</td><td>Terminal closed or reload request</td><td>Reload config or cleanup</td></tr>
</tbody>
</table>
</div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 16 — EXERCISES
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Practice Exercises with Solutions</h2>

<div class="exercise-panel easy">
  <div class="ex-badge easy-badge">Easy</div>
  <div class="ex-body">
    <h4>Exercise 1 — Process Inspection Toolkit</h4>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Start <code>sleep 300 &amp;</code> and save its PID. Read its state, memory, and wait-channel directly from <code>/proc/PID/</code> without using <code>ps</code></li>
      <li>Use <code>ps -eo pid,ppid,stat,wchan,comm</code> to find any D-state processes on your system</li>
      <li>Count how many file descriptors the current bash shell has open via <code>/proc/self/fd</code></li>
      <li>Parse <code>/proc/meminfo</code> in bash to print: used RAM, available RAM, cache size — all in human-readable MB</li>
      <li>Parse <code>/proc/loadavg</code> and compare to <code>nproc</code> to print "System is X% saturated"</li>
      <li>Use <code>pgrep -a</code> to find all python3 processes and their full command lines</li>
      <li>Kill your sleep process: first try SIGTERM (verify it's gone), then start another and kill it with SIGKILL</li>
    </ol>
  </div>
</div>

<div class="exercise-panel easy">
  <div class="ex-badge easy-badge">Easy</div>
  <div class="ex-body">
    <h4>Exercise 2 — Process States Lab</h4>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Start <code>yes &gt; /dev/null &amp;</code>. Use <code>ps</code> and <code>top</code> to verify it's in R state, burning 100% CPU</li>
      <li>Renice it to +19. Watch CPU behaviour change in <code>top</code>. Confirm NI column.</li>
      <li>Send SIGSTOP to it. Verify T state in ps. Confirm it uses 0% CPU. Resume with SIGCONT.</li>
      <li>Demonstrate a zombie: create a child that exits before parent reaps, use <code>ps</code> to show Z state</li>
      <li>Create a D-state simulation: block a process on reading a FIFO with nothing writing to it. Observe state.</li>
      <li>Use <code>pstree -p $$</code> to visualise your current shell's process subtree</li>
    </ol>
  </div>
</div>

<div class="exercise-panel medium">
  <div class="ex-badge medium-badge">Medium</div>
  <div class="ex-body">
    <h4>Exercise 3 — Signal Handler Script</h4>
    <p>Write <code>safe_etl.sh INPUTFILE OUTPUTFILE</code>:</p>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Create a temp directory with <code>mktemp -d</code> for intermediate files</li>
      <li>Acquire a lock file with <code>mkdir</code> (atomic) — fail if already locked</li>
      <li>Set up a <code>trap cleanup EXIT INT TERM HUP</code> that: kills background jobs, removes temp dir, releases lock, logs exit reason</li>
      <li>Set up <code>trap '' PIPE</code> to handle broken pipes silently</li>
      <li>Set up <code>trap 'load_config' HUP</code> for config reload</li>
      <li>Set up <code>trap 'DEBUG=true' USR1</code> and <code>trap 'DEBUG=false' USR2</code></li>
      <li>Run a slow processing loop in background, use <code>wait $!</code> to collect exit code</li>
      <li>Test all signal handlers: Ctrl+C, kill, kill -HUP, kill -USR1</li>
    </ol>
  </div>
</div>

<div class="exercise-panel medium">
  <div class="ex-badge medium-badge">Medium</div>
  <div class="ex-body">
    <h4>Exercise 4 — Process Monitor from /proc</h4>
    <p>Write <code>procmon.sh PROCESS_NAME INTERVAL</code> using <strong>only /proc files</strong> (no ps, no top):</p>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Find PID via <code>pgrep</code>. If multiple: monitor the newest.</li>
      <li>Every INTERVAL seconds read from <code>/proc/PID/</code>: state, VmRSS, open FDs, wait channel, thread count</li>
      <li>Calculate CPU % between reads using <code>/proc/PID/stat</code> fields 13-14 (utime+stime) and <code>/proc/stat</code> total CPU time</li>
      <li>Alert (stderr) if: state=D, CPU &gt; threshold, FDs &gt; 800, RSS growing by &gt;10% per interval</li>
      <li>Track a 10-sample sliding window for RSS — print "LEAK DETECTED" if consistently growing</li>
      <li>On Ctrl+C: print summary table (min/max/avg CPU and RSS over all samples)</li>
    </ol>
  </div>
</div>

<div class="exercise-panel hard">
  <div class="ex-badge hard-badge">Hard</div>
  <div class="ex-body">
    <h4>Exercise 5 — Complete Process Supervisor</h4>
    <p>Build <code>supervisor.sh</code> — a production-grade process manager:</p>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li><strong>Launch:</strong> Start the managed command with nice+ionice. Write PID to file. Set oom_score_adj=-500. Redirect stdout/stderr to timestamped log files.</li>
      <li><strong>Health loop:</strong> Every 5s check via /proc: alive, not D-state, CPU &lt; 90%, FDs &lt; limit. Log any anomaly.</li>
      <li><strong>SIGUSR1:</strong> On USR1 — dump current health snapshot to log and stdout</li>
      <li><strong>SIGUSR2:</strong> On USR2 — rotate logs (compress old, open new)</li>
      <li><strong>SIGHUP:</strong> On HUP — reload the managed process's config (send HUP to managed process)</li>
      <li><strong>Auto-restart:</strong> On managed process death — exponential backoff (5, 10, 20, 40, max 60s). After 5 failures: alert and give up.</li>
      <li><strong>Clean stop:</strong> On SIGTERM/SIGINT — send SIGTERM to managed process, wait 30s, SIGKILL if still alive, clean up PID file and logs.</li>
      <li><strong>Status subcommand:</strong> Read /proc directly (not ps) to print state table.</li>
    </ol>
    <p><strong>Must pass shellcheck. Must handle race conditions (PID file exists but process dead, /proc race during exit).</strong></p>
  </div>
</div>

<div class="story-panel" style="margin-top:32px;">
  <div class="story-avatar">🧑‍💻</div>
  <div class="story-body">
    <div class="story-title">Ravi's Toolkit — Day 345</div>
    <p>Three months later, a new engineer asked Ravi how to check if a process was actually running or just pretending to. He didn't say "use ps aux." He pulled up a terminal and typed: <code>state=$(awk '/^State:/{print $2}' /proc/$(pgrep etl)/status)</code>. Then <code>wchan=$(cat /proc/$(pgrep etl)/wchan)</code>. Then explained the difference between R, S, D, and Z, and what each one means for "running."</p>
    <p>The new engineer's next question was about signal handlers for their new pipeline. Ravi showed them the canonical <code>trap cleanup EXIT INT TERM HUP</code> pattern, explained why EXIT is more important than INT and TERM, and demonstrated the lock file race condition that mkdir prevents.</p>
    <p>What changed was not the tools — ps and kill existed before Ravi learned any of this. What changed was understanding. A process is a kernel structure. A signal is a bit in a bitmask. A zombie is a task_struct waiting for its parent. When you understand what these things ARE, the commands stop being magic incantations and start being obvious.</p>
    <p><strong>The kernel is always telling you the truth. You just need to know where to look and what the words mean.</strong></p>
  </div>
</div>
</div><!-- /section-block -->
\`

`
};