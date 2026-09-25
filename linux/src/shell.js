

var shellIntro = {
    title: "Shell Programming — Introduction",
    description: "Master Bash shell scripting from first principles — variables, quoting, arithmetic, conditionals, loops, functions, and real-world automation. The skill that separates a Linux user from a Linux professional.",
    content: `

<!-- ══════════════════════════════════════════════════════
     RAVI'S STORY — HOOK
══════════════════════════════════════════════════════ -->
<div class="story-panel">
  <div class="story-avatar">🧑‍💻</div>
  <div class="story-body">
    <div class="story-title">Ravi's Monday Morning — Day 95</div>
    <br>
    <p>Every Monday, Ravi's team ran the same five commands manually: download the weekend data dump, decompress it, validate the row count, move it to the processing folder, and send a Slack notification. Each engineer spent 20 minutes doing this by hand. Fifteen Mondays × five engineers = 1,500 minutes of human time wasted on pure repetition.</p>
    <br>
    <p>Ravi had just learned shell scripting over the weekend. On Monday morning he created a 40-line script: <code>weekend_load.sh</code>. He ran it once. All five steps completed in 8 seconds. He set it on a cron job. It never needed to be done manually again.</p>
    <br>
    <p>His manager asked how long it took to write. "About two hours," said Ravi. "But it'll save us 100 hours over the next year." That's the ROI of shell scripting — <strong>write once, run forever.</strong></p>
    <br>
    <p>This module teaches you exactly what Ravi learned: how the shell works, how to write scripts that actually run in production, and the patterns every data engineer uses every day.</p>
  </div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 1 — WHAT IS THE SHELL?
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> What Is the Shell? — The Command Interpreter</h2>

<p>The <strong>shell</strong> is a program that reads your commands and executes them. It sits between you and the Linux kernel — translating your human-readable instructions into system calls that the OS understands.</p>

<!-- Shell Architecture SVG -->
<div class="diagram-wrap">
<svg viewBox="0 0 820 300" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto;">
  <defs>
    <marker id="arr-w" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#8b949e"/></marker>
    <marker id="arr-g" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#3fb950"/></marker>
    <marker id="arr-b" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#58a6ff"/></marker>
    <marker id="arr-y" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#ffa657"/></marker>
  </defs>
  <rect width="820" height="300" fill="#0d1117" rx="12"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="13" font-weight="bold" fill="#8b949e">Linux System Layers — Where the Shell Lives</text>

  <!-- User layer -->
  <rect x="30" y="38" width="760" height="52" rx="8" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="50" y="60" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#3fb950">You / User Space</text>
  <text x="50" y="80" font-family="'Courier New',monospace" font-size="11" fill="#8b949e">$ python3 pipeline.py   $ ls -la   $ vim config.py   $ ./weekend_load.sh</text>
  <text x="720" y="68" font-family="'Segoe UI',sans-serif" font-size="10" fill="#3fb950">Layer 4</text>

  <line x1="410" y1="92" x2="410" y2="108" stroke="#8b949e" stroke-width="2" marker-end="url(#arr-w)"/>

  <!-- Shell layer -->
  <rect x="30" y="110" width="760" height="52" rx="8" fill="#1a1a3a" stroke="#bc8cff" stroke-width="2"/>
  <text x="50" y="132" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#bc8cff">Shell (bash / sh / zsh / fish)</text>
  <text x="50" y="152" font-family="'Courier New',monospace" font-size="11" fill="#8b949e">Parses commands → expands variables → finds executables → forks processes → handles I/O</text>
  <text x="720" y="140" font-family="'Segoe UI',sans-serif" font-size="10" fill="#bc8cff">Layer 3</text>

  <line x1="410" y1="164" x2="410" y2="180" stroke="#8b949e" stroke-width="2" marker-end="url(#arr-w)"/>

  <!-- System calls layer -->
  <rect x="30" y="182" width="760" height="52" rx="8" fill="#1f2027" stroke="#58a6ff" stroke-width="2"/>
  <text x="50" y="204" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#58a6ff">System Call Interface (glibc / syscalls)</text>
  <text x="50" y="224" font-family="'Courier New',monospace" font-size="11" fill="#8b949e">fork()  exec()  open()  read()  write()  wait()  pipe()  dup2()  kill()</text>
  <text x="720" y="212" font-family="'Segoe UI',sans-serif" font-size="10" fill="#58a6ff">Layer 2</text>

  <line x1="410" y1="236" x2="410" y2="252" stroke="#8b949e" stroke-width="2" marker-end="url(#arr-w)"/>

  <!-- Kernel layer -->
  <rect x="30" y="254" width="760" height="36" rx="8" fill="#2a1a1a" stroke="#f85149" stroke-width="2"/>
  <text x="50" y="272" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#f85149">Linux Kernel</text>
  <text x="200" y="272" font-family="'Courier New',monospace" font-size="11" fill="#8b949e">Process mgmt · Filesystem · Memory · Networking · Device drivers</text>
  <text x="720" y="272" font-family="'Segoe UI',sans-serif" font-size="10" fill="#f85149">Layer 1</text>
</svg>
</div>

<div class="table-wrap">
<table class="ref-table">
<thead><tr><th>Shell</th><th>Full Name</th><th>Where Used</th><th>Key Feature</th></tr></thead>
<tbody>
<tr><td><code>bash</code></td><td>Bourne Again Shell</td><td>Default on Ubuntu, Debian, most Linux</td><td>Most common, rich scripting, arrays, <code>[[ ]]</code></td></tr>
<tr><td><code>sh</code></td><td>POSIX Shell</td><td>Minimal containers, system scripts</td><td>Portable, works everywhere, fewer features</td></tr>
<tr><td><code>zsh</code></td><td>Z Shell</td><td>Default on macOS, developers</td><td>Better autocomplete, themes (Oh My Zsh)</td></tr>
<tr><td><code>fish</code></td><td>Friendly Interactive Shell</td><td>Developer workstations</td><td>Auto-suggest, no quoting issues, not POSIX</td></tr>
<tr><td><code>dash</code></td><td>Debian Almquist Shell</td><td><code>/bin/sh</code> on Ubuntu/Debian</td><td>Very fast startup, minimal, POSIX only</td></tr>
<tr><td><code>ksh</code></td><td>Korn Shell</td><td>Older enterprise Unix, AIX</td><td>Basis for bash, still used in finance/infra</td></tr>
</tbody>
</table>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Identifying Your Shell Environment</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ─── WHICH SHELL ARE YOU USING? ──────────────────────────────</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">echo</span> <span class="cb-str">$SHELL</span>
<span class="cb-out">/bin/bash</span>
<span class="cb-cmt"># $SHELL = your LOGIN shell (set when account was created)</span>

<span class="cb-prompt">$</span> <span class="cb-cmd">echo</span> <span class="cb-str">$0</span>
<span class="cb-out">bash</span>
<span class="cb-cmt"># $0 = name of current running shell/script</span>

<span class="cb-prompt">$</span> <span class="cb-cmd">ps</span> <span class="cb-flag">-p</span> <span class="cb-str">$$</span>
<span class="cb-out">  PID TTY          TIME CMD</span>
<span class="cb-out"> 4821 pts/0    00:00:00 bash</span>
<span class="cb-cmt"># $$ = PID of current shell process</span>

<span class="cb-prompt">$</span> <span class="cb-cmd">bash</span> <span class="cb-flag">--version</span>
<span class="cb-out">GNU bash, version 5.2.15(1)-release (x86_64-pc-linux-gnu)</span>

<span class="cb-cmt">## ─── LIST ALL INSTALLED SHELLS ───────────────────────────────</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">cat</span> /etc/shells
<span class="cb-out">/bin/sh</span>
<span class="cb-out">/bin/bash</span>
<span class="cb-out">/usr/bin/bash</span>
<span class="cb-out">/bin/dash</span>
<span class="cb-out">/usr/bin/zsh</span>

<span class="cb-cmt">## ─── CHANGE YOUR DEFAULT LOGIN SHELL ─────────────────────────</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">chsh</span> <span class="cb-flag">-s</span> /bin/zsh     <span class="cb-cmt"># change to zsh (takes effect on next login)</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">chsh</span> <span class="cb-flag">-s</span> /bin/bash    <span class="cb-cmt"># change back to bash</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 2 — YOUR FIRST SHELL SCRIPT
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Your First Shell Script — From Zero to Running</h2>

<!-- Script execution flow SVG -->
<div class="diagram-wrap">
<svg viewBox="0 0 820 130" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="130" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">Script Execution Pipeline — From File to Running Process</text>

  <!-- Step boxes -->
  <rect x="15" y="38" width="130" height="58" rx="7" fill="#161b22" stroke="#3fb950" stroke-width="1.5"/>
  <text x="80" y="62" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#3fb950">① Write Script</text>
  <text x="80" y="78" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">nano script.sh</text>
  <text x="80" y="92" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">add #!/bin/bash</text>

  <line x1="147" y1="67" x2="167" y2="67" stroke="#8b949e" stroke-width="1.5" marker-end="url(#arr-w)"/>

  <rect x="169" y="38" width="130" height="58" rx="7" fill="#161b22" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="234" y="62" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#58a6ff">② Make Executable</text>
  <text x="234" y="78" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">chmod +x script.sh</text>
  <text x="234" y="92" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">sets execute bit</text>

  <line x1="301" y1="67" x2="321" y2="67" stroke="#8b949e" stroke-width="1.5" marker-end="url(#arr-w)"/>

  <rect x="323" y="38" width="130" height="58" rx="7" fill="#161b22" stroke="#bc8cff" stroke-width="1.5"/>
  <text x="388" y="62" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#bc8cff">③ Run Script</text>
  <text x="388" y="78" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">./script.sh</text>
  <text x="388" y="92" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">bash fork+exec</text>

  <line x1="455" y1="67" x2="475" y2="67" stroke="#8b949e" stroke-width="1.5" marker-end="url(#arr-w)"/>

  <rect x="477" y="38" width="130" height="58" rx="7" fill="#161b22" stroke="#ffa657" stroke-width="1.5"/>
  <text x="542" y="62" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#ffa657">④ Kernel Reads</text>
  <text x="542" y="78" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">reads shebang line</text>
  <text x="542" y="92" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">exec /bin/bash</text>

  <line x1="609" y1="67" x2="629" y2="67" stroke="#8b949e" stroke-width="1.5" marker-end="url(#arr-w)"/>

  <rect x="631" y="38" width="174" height="58" rx="7" fill="#0f2d1f" stroke="#3fb950" stroke-width="1.5"/>
  <text x="718" y="62" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#3fb950">⑤ Script Runs</text>
  <text x="718" y="78" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">bash reads+executes</text>
  <text x="718" y="92" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">line by line</text>

  <text x="410" y="118" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Alternative: bash script.sh (no chmod needed) or sh script.sh (uses sh instead)</text>
</svg>
</div>

<!-- CONSOLE 1 -->
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 1 of 8 — Writing &amp; Running Your First Scripts</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ─── THE SHEBANG LINE ─────────────────────────────────────────</span>
<span class="cb-cmt"># The FIRST line of every script must be the shebang (#!)
# It tells the kernel WHICH interpreter to use</span>

#!/bin/bash          <span class="cb-cmt"># use bash (most common for scripts)</span>
#!/bin/sh            <span class="cb-cmt"># use POSIX sh (more portable, fewer features)</span>
#!/usr/bin/env bash  <span class="cb-cmt"># find bash in PATH (best for portability across systems)</span>
#!/usr/bin/env python3  <span class="cb-cmt"># shell scripts can run ANY interpreter!</span>
#!/usr/bin/env node  <span class="cb-cmt"># even Node.js</span>

<span class="cb-cmt"># Without shebang: the current shell runs the script
# But ALWAYS add shebang — it documents intent and ensures consistency</span>

<span class="cb-cmt">## ─── HELLO WORLD — THE ANATOMY ───────────────────────────────</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">cat</span> hello.sh
<span class="cb-out">#!/usr/bin/env bash</span>
<span class="cb-out">#</span>
<span class="cb-out"># hello.sh — My first shell script</span>
<span class="cb-out"># Author: Ravi | Date: 2024-01-15</span>
<span class="cb-out">#</span>
<span class="cb-out">echo "Hello, World!"</span>
<span class="cb-out">echo "Today is: $(date)"</span>
<span class="cb-out">echo "Running as: $(whoami)"</span>
<span class="cb-out">echo "On machine: $(hostname)"</span>

<span class="cb-cmt">## ─── MAKE EXECUTABLE AND RUN ──────────────────────────────────</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">chmod</span> <span class="cb-flag">+x</span> hello.sh    <span class="cb-cmt"># add execute permission</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">./hello.sh</span>            <span class="cb-cmt"># run it (./ = current directory)</span>
<span class="cb-out">Hello, World!</span>
<span class="cb-out">Today is: Mon Jan 15 10:30:00 IST 2024</span>
<span class="cb-out">Running as: ravi</span>
<span class="cb-out">On machine: data-server-01</span>

<span class="cb-cmt">## ─── THREE WAYS TO RUN A SCRIPT ──────────────────────────────</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">./hello.sh</span>            <span class="cb-cmt"># method 1: run as executable (needs chmod +x)</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">bash</span> hello.sh         <span class="cb-cmt"># method 2: explicit bash (no chmod needed)</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">source</span> hello.sh       <span class="cb-cmt"># method 3: run IN current shell (no new process!)</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">.</span> hello.sh            <span class="cb-cmt"># method 3 alt: . is alias for source</span>

<span class="cb-cmt"># KEY DIFFERENCE:
# ./script.sh  → creates a CHILD process (changes don't affect parent)
# source ./script.sh → runs in CURRENT shell (changes DO affect parent)
# Use source for scripts that set environment variables or change directory</span>

<span class="cb-cmt">## ─── DEBUGGING A SCRIPT ──────────────────────────────────────</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">bash</span> <span class="cb-flag">-x</span> hello.sh      <span class="cb-cmt"># -x: trace mode — prints each command before running</span>
<span class="cb-out">+ echo 'Hello, World!'</span>
<span class="cb-out">Hello, World!</span>
<span class="cb-out">++ date</span>
<span class="cb-out">+ echo 'Today is: Mon Jan 15 10:30:00 IST 2024'</span>
<span class="cb-out">Today is: Mon Jan 15 10:30:00 IST 2024</span>
<span class="cb-cmt"># + prefix = command being executed, ++ = subshell command</span>

<span class="cb-prompt">$</span> <span class="cb-cmd">bash</span> <span class="cb-flag">-n</span> hello.sh      <span class="cb-cmt"># -n: syntax check only (don't run)</span>
<span class="cb-out"></span><span class="cb-cmt"># No output = no syntax errors ✓</span>

<span class="cb-prompt">$</span> <span class="cb-cmd">bash</span> <span class="cb-flag">-v</span> hello.sh      <span class="cb-cmt"># -v: verbose — print each line as it's read</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">bash</span> <span class="cb-flag">-xv</span> hello.sh     <span class="cb-cmt"># -xv: both trace and verbose</span>

<span class="cb-cmt">## ─── SAFE SCRIPTING: SET OPTIONS ─────────────────────────────</span>
<span class="cb-cmt"># ALWAYS add these to production scripts:</span>
<span class="cb-out">#!/usr/bin/env bash</span>
<span class="cb-out">set -e          # exit immediately if any command fails</span>
<span class="cb-out">set -u          # treat unset variables as errors</span>
<span class="cb-out">set -o pipefail # catch failures in pipes (not just last command)</span>
<span class="cb-out">set -x          # trace mode (remove for production)</span>
<span class="cb-cmt"># Or combine: set -euo pipefail (the standard "strict mode")</span>

<span class="cb-cmt">## ─── COMMENTS ─────────────────────────────────────────────────</span>
<span class="cb-out"># This is a comment — bash ignores everything after #</span>
<span class="cb-out">echo "running"  # inline comment — also valid</span>
<span class="cb-out"># echo "this won't run"</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 3 — VARIABLES
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Variables — Storing and Using Data</h2>

<p>Variables are the memory of your script. Bash variables are <em>untyped by default</em> — everything is a string unless you declare otherwise. Understanding variable assignment, expansion, and scope is the foundation of every script.</p>

<!-- Variable scope SVG -->
<div class="diagram-wrap">
<svg viewBox="0 0 820 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="200" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">Variable Scope — Local, Global, Environment, Special</text>

  <!-- Parent shell box -->
  <rect x="20" y="38" width="780" height="150" rx="8" fill="#0a0e14" stroke="#30363d" stroke-width="1.5"/>
  <text x="38" y="58" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#8b949e">Parent Shell (bash session or script)</text>
  <text x="38" y="74" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">LOCAL_VAR="only here"</text>
  <text x="38" y="90" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">export ENV_VAR="passed to children"</text>

  <!-- Child process box -->
  <rect x="200" y="105" width="420" height="72" rx="7" fill="#161b22" stroke="#bc8cff" stroke-width="1.5"/>
  <text x="220" y="124" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#bc8cff">Child Process (./script.sh or subshell)</text>
  <text x="220" y="142" font-family="'Courier New',monospace" font-size="10" fill="#f85149">LOCAL_VAR  → NOT visible here</text>
  <text x="220" y="158" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">ENV_VAR    → visible (inherited)</text>
  <text x="220" y="172" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">NEW_LOCAL  → not seen by parent</text>

  <!-- Arrow: env var passes down -->
  <line x1="180" y1="88" x2="300" y2="106" stroke="#ffa657" stroke-width="1.5" stroke-dasharray="4,2" marker-end="url(#arr-y)"/>
  <text x="190" y="96" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">export</text>

  <!-- Special variables box -->
  <rect x="640" y="105" width="150" height="72" rx="7" fill="#161b22" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="650" y="124" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#58a6ff">Special Variables</text>
  <text x="650" y="140" font-family="'Courier New',monospace" font-size="9" fill="#8b949e">$0  $1..$9  $@</text>
  <text x="650" y="154" font-family="'Courier New',monospace" font-size="9" fill="#8b949e">$#  $?  $$  $!</text>
  <text x="650" y="168" font-family="'Courier New',monospace" font-size="9" fill="#8b949e">$_  $*  $-</text>
</svg>
</div>

<!-- CONSOLE 2 -->
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 2 of 8 — Variables: Assignment, Expansion, Types &amp; Special Vars</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ VARIABLE ASSIGNMENT ════════════════════════════════════</span>
<span class="cb-cmt"># CRITICAL RULE: NO SPACES around = in assignment</span>
NAME="Ravi"              <span class="cb-cmt"># ✅ correct</span>
NAME = "Ravi"            <span class="cb-cmt"># ❌ ERROR — bash sees NAME as a command</span>
NAME ="Ravi"             <span class="cb-cmt"># ❌ ERROR</span>

<span class="cb-cmt"># Variable types:</span>
DB_HOST="localhost"      <span class="cb-cmt"># string (most common)</span>
PORT=5432                <span class="cb-cmt"># number (still stored as string!)</span>
IS_READY=true            <span class="cb-cmt"># boolean (just a string "true")</span>
FILES=()                 <span class="cb-cmt"># empty array</span>
declare -i COUNT=0       <span class="cb-cmt"># declare as integer (arithmetic auto-applied)</span>
declare -r MAX=100       <span class="cb-cmt"># declare as readonly (cannot be changed)</span>
declare -l lower="HELLO" <span class="cb-cmt"># declare as lowercase (stored as "hello")</span>
declare -u upper="hello" <span class="cb-cmt"># declare as uppercase (stored as "HELLO")</span>
declare -a ARRAY         <span class="cb-cmt"># declare as indexed array</span>
declare -A MAP           <span class="cb-cmt"># declare as associative array (dictionary)</span>

<span class="cb-cmt">## ═══ VARIABLE EXPANSION (using variables) ════════════════════</span>
echo "$NAME"             <span class="cb-cmt"># basic expansion</span>
echo "\${NAME}"           <span class="cb-cmt"># same with braces (explicit — use this)</span>
echo "\${NAME}Script"     <span class="cb-cmt"># braces required when followed by more text</span>
<span class="cb-out">RaviScript</span>

<span class="cb-cmt">## ═══ DEFAULT VALUES ══════════════════════════════════════════</span>
echo "\${VAR:-default}"   <span class="cb-cmt"># use default if VAR is unset or empty</span>
echo "\${VAR:=default}"   <span class="cb-cmt"># assign default if VAR is unset (sets VAR too)</span>
echo "\${VAR:+other}"     <span class="cb-cmt"># use 'other' if VAR is SET (reverse default)</span>
echo "\${VAR:?error msg}" <span class="cb-cmt"># exit with error if VAR is unset</span>

<span class="cb-cmt"># Practical example:</span>
LOG_LEVEL="\${LOG_LEVEL:-INFO}"  <span class="cb-cmt"># default to INFO if not set</span>
DB_HOST="\${1:?Usage: script.sh DB_HOST}"  <span class="cb-cmt"># require first argument</span>

<span class="cb-cmt">## ═══ STRING OPERATIONS ON VARIABLES ═════════════════════════</span>
FILENAME="report_2024-01-15.csv"

echo "\${#FILENAME}"         <span class="cb-cmt"># string LENGTH: 24</span>
echo "\${FILENAME^^}"        <span class="cb-cmt"># UPPERCASE: REPORT_2024-01-15.CSV</span>
echo "\${FILENAME,,}"        <span class="cb-cmt"># lowercase: report_2024-01-15.csv</span>
echo "\${FILENAME^}"         <span class="cb-cmt"># Capitalize first char: Report_2024-01-15.csv</span>

echo "\${FILENAME%.csv}"     <span class="cb-cmt"># remove SHORTEST match from end: report_2024-01-15</span>
echo "\${FILENAME%.*}"       <span class="cb-cmt"># remove extension: report_2024-01-15</span>
echo "\${FILENAME%%_*}"      <span class="cb-cmt"># remove LONGEST match from end: report</span>
echo "\${FILENAME#report_}"  <span class="cb-cmt"># remove SHORTEST match from start: 2024-01-15.csv</span>
echo "\${FILENAME##*/}"      <span class="cb-cmt"># remove up to last /: filename only (basename)</span>

echo "\${FILENAME/2024/2025}" <span class="cb-cmt"># replace first match: report_2025-01-15.csv</span>
echo "\${FILENAME//0/O}"      <span class="cb-cmt"># replace ALL: repOrt_2O24-O1-15.csv</span>

echo "\${FILENAME:7:10}"      <span class="cb-cmt"># substring: chars 7-16 → 2024-01-15</span>
echo "\${FILENAME: -4}"       <span class="cb-cmt"># last 4 chars: .csv (space before - is required)</span>

<span class="cb-cmt">## ═══ ENVIRONMENT VARIABLES ═══════════════════════════════════</span>
export MY_VAR="value"    <span class="cb-cmt"># export to child processes</span>
printenv                 <span class="cb-cmt"># show all environment variables</span>
printenv PATH            <span class="cb-cmt"># show specific env var</span>
env                      <span class="cb-cmt"># same as printenv</span>
unset MY_VAR             <span class="cb-cmt"># delete a variable</span>

<span class="cb-cmt">## ═══ SPECIAL VARIABLES ═══════════════════════════════════════</span>
<span class="cb-out">$0</span>    <span class="cb-cmt"># name of script: ./pipeline.sh</span>
<span class="cb-out">$1 $2 $3</span> <span class="cb-cmt"># positional parameters (script arguments)</span>
<span class="cb-out">$@</span>    <span class="cb-cmt"># ALL arguments as separate quoted strings: "$1" "$2" "$3"</span>
<span class="cb-out">$*</span>    <span class="cb-cmt"># ALL arguments as one string (don't use — loses quoting)</span>
<span class="cb-out">$#</span>    <span class="cb-cmt"># NUMBER of arguments passed</span>
<span class="cb-out">$?</span>    <span class="cb-cmt"># EXIT STATUS of last command (0=success, non-zero=fail)</span>
<span class="cb-out">$$</span>    <span class="cb-cmt"># PID of current shell process</span>
<span class="cb-out">$!</span>    <span class="cb-cmt"># PID of last background job (&amp;)</span>
<span class="cb-out">$_</span>    <span class="cb-cmt"># last argument of previous command</span>
<span class="cb-out">$-</span>    <span class="cb-cmt"># current shell option flags (himBH etc)</span>
<span class="cb-out">$IFS</span>  <span class="cb-cmt"># Internal Field Separator (default: space tab newline)</span>
<span class="cb-out">$LINENO</span> <span class="cb-cmt"># current line number in script</span>
<span class="cb-out">$FUNCNAME</span> <span class="cb-cmt"># name of current function</span>
<span class="cb-out">$SECONDS</span> <span class="cb-cmt"># seconds since shell started (useful for timing)</span>
<span class="cb-out">$RANDOM</span>  <span class="cb-cmt"># random number 0-32767 each time accessed</span>
<span class="cb-out">$OLDPWD</span>  <span class="cb-cmt"># previous working directory</span>

<span class="cb-cmt">## ═══ COMMAND SUBSTITUTION ════════════════════════════════════</span>
TODAY=$(date +%Y-%m-%d)      <span class="cb-cmt"># modern syntax — PREFERRED</span>
TODAY=\`date +%Y-%m-%d\`      <span class="cb-cmt"># old backtick syntax — avoid (harder to nest)</span>
LINES=$(wc -l &lt; data.csv)   <span class="cb-cmt"># count lines in file</span>
HOST=$(hostname)             <span class="cb-cmt"># get hostname</span>
FILES=$(ls *.csv)            <span class="cb-cmt"># list files (careful: breaks with spaces in names)</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 4 — QUOTING RULES
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Quoting Rules — The Most Misunderstood Part of Bash</h2>

<p>Quoting controls which characters the shell interprets and which it passes literally. Wrong quoting causes the most frustrating bugs in shell scripts — files with spaces break, variables expand when they shouldn't, or they don't expand when they should.</p>

<!-- Quoting rules SVG -->
<div class="diagram-wrap">
<svg viewBox="0 0 820 160" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="160" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">Quoting Quick Reference — What Each Quote Type Does</text>

  <!-- No quotes -->
  <rect x="15" y="36" width="183" height="110" rx="7" fill="#2a1a1a" stroke="#f85149" stroke-width="1.5"/>
  <text x="107" y="56" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#f85149">No Quotes</text>
  <text x="107" y="74" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#e6edf3">echo $NAME</text>
  <text x="107" y="92" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Word split on spaces</text>
  <text x="107" y="108" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Glob * expands</text>
  <text x="107" y="124" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Variable expands</text>
  <text x="107" y="140" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#f85149">⚠ Breaks with spaces</text>

  <!-- Double quotes -->
  <rect x="215" y="36" width="183" height="110" rx="7" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.5"/>
  <text x="307" y="56" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#3fb950">Double Quotes "..."</text>
  <text x="307" y="74" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#e6edf3">echo "$NAME"</text>
  <text x="307" y="92" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Prevents word split</text>
  <text x="307" y="108" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Prevents glob *</text>
  <text x="307" y="124" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#3fb950">✅ Variable DOES expand</text>
  <text x="307" y="140" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">Use for MOST situations</text>

  <!-- Single quotes -->
  <rect x="415" y="36" width="183" height="110" rx="7" fill="#1a1a3a" stroke="#bc8cff" stroke-width="1.5"/>
  <text x="507" y="56" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#bc8cff">Single Quotes '...'</text>
  <text x="507" y="74" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#e6edf3">echo '$NAME'</text>
  <text x="507" y="92" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Everything literal</text>
  <text x="507" y="108" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#bc8cff">Variable NOT expanded</text>
  <text x="507" y="124" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#bc8cff">No escape sequences</text>
  <text x="507" y="140" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#bc8cff">Use for literal strings</text>

  <!-- Dollar single quotes -->
  <rect x="615" y="36" width="190" height="110" rx="7" fill="#2a2a1a" stroke="#ffa657" stroke-width="1.5"/>
  <text x="710" y="56" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#ffa657">$'...' ANSI-C quotes</text>
  <text x="710" y="74" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#e6edf3">$'hello\nworld'</text>
  <text x="710" y="92" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Escape sequences work</text>
  <text x="710" y="108" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#ffa657">\n \t \r \\ \' etc</text>
  <text x="710" y="124" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#ffa657">Variable NOT expanded</text>
  <text x="710" y="140" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">Use for special chars</text>
</svg>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 3 of 8 — Quoting: Every Type with Real Examples</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ NO QUOTES — DANGEROUS WITH SPACES ══════════════════════</span>
NAME="Ravi Kumar"
FILE="my report.csv"

echo $NAME           <span class="cb-cmt"># outputs: Ravi Kumar  (2 words — might be OK here)</span>
cp $FILE /tmp/       <span class="cb-cmt"># ❌ BREAKS: tries to copy "my" and "report.csv" separately!</span>
for f in $(ls *.csv); do  <span class="cb-cmt"># ❌ breaks for filenames with spaces</span>
echo $UNDEFINED      <span class="cb-cmt"># empty string — no error (dangerous with set -u)</span>

<span class="cb-cmt">## ═══ DOUBLE QUOTES — USE THIS ALMOST ALWAYS ═════════════════</span>
echo "$NAME"          <span class="cb-cmt"># Ravi Kumar (one string, spaces preserved)</span>
cp "$FILE" /tmp/      <span class="cb-cmt"># ✅ correct: treated as one filename</span>
echo "Hello, $NAME!" <span class="cb-cmt"># variables expand: Hello, Ravi Kumar!</span>
echo "$(date)"        <span class="cb-cmt"># command substitution still works inside ""</span>
echo "$((2+2))"       <span class="cb-cmt"># arithmetic still works inside ""</span>
echo "Tab:\there"      <span class="cb-cmt"># \t is literal backslash+t in double quotes</span>

<span class="cb-cmt"># What doesn't expand inside double quotes:</span>
echo "$NAME"          <span class="cb-cmt"># ❌ No: this is single-quoted-style $NAME</span>
                       <span class="cb-cmt"># Wait — double quotes DO expand $NAME</span>
<span class="cb-cmt"># To put a literal $ in double quotes, escape it: \\$</span>
echo "Cost: \\$50"    <span class="cb-cmt"># outputs: Cost: $50</span>
echo "Globbing: *.csv" <span class="cb-cmt"># *.csv is NOT expanded — just printed literally</span>

<span class="cb-cmt">## ═══ SINGLE QUOTES — EVERYTHING IS LITERAL ══════════════════</span>
echo '$NAME'          <span class="cb-cmt"># outputs: $NAME (literally — no expansion)</span>
echo 'Hello, World!'  <span class="cb-cmt"># outputs: Hello, World!</span>
echo 'It'\''s easy'   <span class="cb-cmt"># embed single quote: close, escaped quote, reopen</span>
<span class="cb-out">It's easy</span>
echo 'Cost: $50'      <span class="cb-cmt"># outputs: Cost: $50 (no escaping needed)</span>

<span class="cb-cmt"># Use single quotes for: regex patterns, sed/awk patterns, SQL queries</span>
grep '\b[0-9]\+\b' file.txt          <span class="cb-cmt"># regex: no variable expansion needed</span>
sed 's/localhost/prod-db/' conf      <span class="cb-cmt"># sed pattern: safer in single quotes</span>

<span class="cb-cmt">## ═══ $'...' — ANSI-C QUOTING ════════════════════════════════</span>
echo $'Hello\nWorld'  <span class="cb-cmt"># \n = real newline</span>
<span class="cb-out">Hello</span>
<span class="cb-out">World</span>

echo $'col1\tcol2\tcol3'  <span class="cb-cmt"># \t = real tab</span>
echo $'Line1\r\nLine2'    <span class="cb-cmt"># \r\n = Windows CRLF line ending</span>
SEP=$'\t'                 <span class="cb-cmt"># tab character in a variable</span>
echo $'\a'                <span class="cb-cmt"># \a = bell/beep sound</span>

<span class="cb-cmt">## ═══ QUOTING WITH ARRAYS AND LOOPS ══════════════════════════</span>
FILES=("file one.csv" "file two.csv" "report.csv")

<span class="cb-cmt"># WRONG — word splits, breaks filenames with spaces:</span>
for f in \${FILES[@]}; do echo "$f"; done

<span class="cb-cmt"># CORRECT — quotes preserve array elements:</span>
for f in "\${FILES[@]}"; do echo "$f"; done
<span class="cb-out">file one.csv</span>
<span class="cb-out">file two.csv</span>
<span class="cb-out">report.csv</span>

<span class="cb-cmt">## ═══ THE GOLDEN RULE ════════════════════════════════════════</span>
<span class="cb-cmt"># "Always double-quote variable expansions and command substitutions"
#
# Use:     "$var"   "$(command)"   "\${array[@]}"
# Avoid:   $var     $(command)     \${array[@]}   (without quotes)
#
# The only exception: arithmetic [[ ]] comparisons don't need quotes</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 5 — INPUT / OUTPUT
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Input &amp; Output — Reading, Writing, Redirecting</h2>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 4 of 8 — I/O: echo, read, printf, Redirection, Here-doc, Pipes</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ OUTPUT: echo ════════════════════════════════════════════</span>
echo "Hello"             <span class="cb-cmt"># print with newline</span>
echo <span class="cb-flag">-n</span> "Enter: "        <span class="cb-cmt"># -n: no trailing newline</span>
echo <span class="cb-flag">-e</span> "Line1\nLine2"   <span class="cb-cmt"># -e: interpret escape sequences</span>
echo <span class="cb-flag">-e</span> "\e[32mGreen\e[0m"  <span class="cb-cmt"># ANSI colour codes</span>
echo ""                  <span class="cb-cmt"># print empty line</span>

<span class="cb-cmt">## ═══ OUTPUT: printf (more reliable than echo) ════════════════</span>
printf "Hello, %s!\n" "Ravi"          <span class="cb-cmt"># formatted output</span>
printf "Count: %d\n" 42               <span class="cb-cmt"># integer</span>
printf "Pi: %.2f\n" 3.14159           <span class="cb-cmt"># float with 2 decimal places</span>
printf "%-20s %5d\n" "Sales" 5421     <span class="cb-cmt"># left-align, right-align columns</span>
printf "%s\t%s\t%s\n" "date" "sales" "region"  <span class="cb-cmt"># TSV header</span>
printf "\e[31mERROR\e[0m: %s\n" "msg" <span class="cb-cmt"># coloured error</span>
<span class="cb-cmt"># printf does NOT add newline automatically — you must add \n</span>

<span class="cb-cmt">## ═══ INPUT: read ═════════════════════════════════════════════</span>
read NAME                 <span class="cb-cmt"># wait for user input, store in NAME</span>
read -p "Enter name: " NAME   <span class="cb-cmt"># -p: show prompt</span>
read -s -p "Password: " PASS  <span class="cb-cmt"># -s: silent (hide input — for passwords)</span>
read -t 10 -p "Continue? [y/n]: " ANS  <span class="cb-cmt"># -t: timeout in seconds</span>
read -n 1 KEY             <span class="cb-cmt"># -n 1: read only 1 character (no Enter needed)</span>
read -a WORDS <<< "one two three"  <span class="cb-cmt"># -a: read into array</span>
echo "\${WORDS[0]} \${WORDS[1]} \${WORDS[2]}"
<span class="cb-out">one two three</span>

<span class="cb-cmt"># Read a line from a file:</span>
read LINE &lt; /etc/hostname       <span class="cb-cmt"># read first line of file</span>
echo "$LINE"
<span class="cb-out">data-server-01</span>

<span class="cb-cmt">## ═══ REDIRECTION ═════════════════════════════════════════════</span>
<span class="cb-cmt"># fd 0 = stdin, fd 1 = stdout, fd 2 = stderr</span>

echo "hello" > file.txt        <span class="cb-cmt"># redirect stdout to file (OVERWRITE)</span>
echo "hello" >> file.txt       <span class="cb-cmt"># redirect stdout to file (APPEND)</span>
cat &lt; file.txt                 <span class="cb-cmt"># redirect file to stdin</span>

cmd 2> errors.log              <span class="cb-cmt"># redirect stderr only</span>
cmd > out.txt 2> err.txt       <span class="cb-cmt"># redirect stdout and stderr separately</span>
cmd > all.log 2>&amp;1            <span class="cb-cmt"># redirect BOTH to same file (stderr→stdout→file)</span>
cmd &amp;> all.log                 <span class="cb-cmt"># bash shorthand for above</span>
cmd 2>/dev/null                <span class="cb-cmt"># discard stderr (suppress error messages)</span>
cmd > /dev/null 2>&amp;1          <span class="cb-cmt"># discard ALL output (run silently)</span>

<span class="cb-cmt"># Redirect stdout to file AND keep on screen (tee):</span>
cmd | tee output.log           <span class="cb-cmt"># show AND save</span>
cmd | tee -a output.log        <span class="cb-cmt"># show AND append</span>
cmd 2>&amp;1 | tee full.log        <span class="cb-cmt"># show AND save stdout+stderr</span>

<span class="cb-cmt">## ═══ HERE-DOC (multi-line input) ════════════════════════════</span>
cat &lt;&lt; 'EOF'
This text is passed as stdin to cat.
Variables like $NAME are NOT expanded (single-quoted EOF).
EOF

cat &lt;&lt; EOF
User: $NAME
Date: $(date)
Variables ARE expanded (unquoted EOF).
EOF

<span class="cb-cmt"># Indented here-doc (bash 4+, strip leading tabs):</span>
cat &lt;&lt;- EOF
	This line has a tab that's stripped.
	$NAME is expanded.
	EOF

<span class="cb-cmt"># Here-doc into a file:</span>
cat &gt; /tmp/config.yaml &lt;&lt; EOF
database:
  host: \${DB_HOST:-localhost}
  port: \${DB_PORT:-5432}
  name: \${DB_NAME}
EOF

<span class="cb-cmt">## ═══ HERE-STRING (single-line here-doc) ══════════════════════</span>
grep "error" &lt;&lt;&lt; "this has an error in it"
read first rest &lt;&lt;&lt; "hello world foo"
echo "$first"   <span class="cb-cmt"># hello</span>

<span class="cb-cmt">## ═══ PIPES ════════════════════════════════════════════════════</span>
ls *.csv | wc -l            <span class="cb-cmt"># count CSV files</span>
cat data.csv | head -5      <span class="cb-cmt"># first 5 lines</span>
cat data.csv | sort | uniq  <span class="cb-cmt"># unique sorted lines</span>
<span class="cb-cmt"># Each command in a pipe runs in a SUBSHELL
# Variables set in a pipe don't persist in the parent!</span>

<span class="cb-cmt"># Process substitution (alternative to temp files):</span>
diff &lt;(sort file1.csv) &lt;(sort file2.csv)  <span class="cb-cmt"># diff two sorted files</span>
while read line; do echo "$line"; done &lt;(cat *.log)
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 6 — ARITHMETIC
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num">06</span> Arithmetic — Numbers in Bash</h2>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 5 of 8 — Arithmetic: All Forms, Operators &amp; bc for Floats</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ ARITHMETIC EXPANSION: $(( )) ═══════════════════════════</span>
echo $((2 + 3))           <span class="cb-cmt"># 5</span>
echo $((10 - 4))          <span class="cb-cmt"># 6</span>
echo $((3 * 4))           <span class="cb-cmt"># 12</span>
echo $((10 / 3))          <span class="cb-cmt"># 3  (INTEGER division — truncates)</span>
echo $((10 % 3))          <span class="cb-cmt"># 1  (modulo / remainder)</span>
echo $((2 ** 10))         <span class="cb-cmt"># 1024  (exponentiation)</span>

COUNT=5
echo $((COUNT + 1))       <span class="cb-cmt"># 6 (no $ needed for vars inside (( )))</span>
echo $((COUNT * 2))       <span class="cb-cmt"># 10</span>

<span class="cb-cmt">## ═══ ASSIGNMENT WITHIN ARITHMETIC ═══════════════════════════</span>
((COUNT++))               <span class="cb-cmt"># post-increment: COUNT = COUNT + 1</span>
((COUNT--))               <span class="cb-cmt"># post-decrement</span>
((COUNT += 5))            <span class="cb-cmt"># COUNT = COUNT + 5</span>
((COUNT -= 2))            <span class="cb-cmt"># COUNT = COUNT - 2</span>
((COUNT *= 3))            <span class="cb-cmt"># COUNT = COUNT * 3</span>
((COUNT /= 2))            <span class="cb-cmt"># COUNT = COUNT / 2</span>
((COUNT **= 2))           <span class="cb-cmt"># COUNT = COUNT ^ 2</span>

<span class="cb-cmt"># Alternative: let command</span>
let COUNT=COUNT+1
let "RESULT = 2 ** 8"

<span class="cb-cmt">## ═══ BITWISE OPERATORS ═══════════════════════════════════════</span>
echo $(( 5 &amp; 3 ))         <span class="cb-cmt"># AND:  5=101, 3=011 → 001 = 1</span>
echo $(( 5 | 3 ))         <span class="cb-cmt"># OR:   5=101, 3=011 → 111 = 7</span>
echo $(( 5 ^ 3 ))         <span class="cb-cmt"># XOR:  5=101, 3=011 → 110 = 6</span>
echo $(( ~5 ))            <span class="cb-cmt"># NOT:  bitwise complement = -6</span>
echo $(( 5 &lt;&lt; 1 ))        <span class="cb-cmt"># LEFT SHIFT: 5 * 2 = 10</span>
echo $(( 8 &gt;&gt; 1 ))        <span class="cb-cmt"># RIGHT SHIFT: 8 / 2 = 4</span>

<span class="cb-cmt">## ═══ COMPARISON IN ARITHMETIC ════════════════════════════════</span>
echo $(( 5 > 3 ))         <span class="cb-cmt"># 1 (true)</span>
echo $(( 5 &lt; 3 ))         <span class="cb-cmt"># 0 (false)</span>
echo $(( 5 == 5 ))        <span class="cb-cmt"># 1 (true)</span>
echo $(( 5 != 3 ))        <span class="cb-cmt"># 1 (true)</span>

<span class="cb-cmt">## ═══ FLOAT ARITHMETIC (bash can't do floats) ════════════════</span>
<span class="cb-cmt"># Bash integers only — use bc for floats:</span>
echo "3.14 * 2" | bc            <span class="cb-cmt"># 6.28</span>
echo "scale=4; 10/3" | bc       <span class="cb-cmt"># 3.3333 (scale=4 decimal places)</span>
echo "scale=2; 22/7" | bc       <span class="cb-cmt"># 3.14</span>
RESULT=$(echo "scale=2; $A / $B" | bc)

<span class="cb-cmt"># Python for complex math:</span>
python3 -c "print(round(22/7, 4))"  <span class="cb-cmt"># 3.1429</span>
python3 -c "import math; print(math.sqrt(2))"

<span class="cb-cmt">## ═══ PRACTICAL: SCRIPT TIMING ════════════════════════════════</span>
START=$SECONDS           <span class="cb-cmt"># $SECONDS = secs since shell started</span>
python3 pipeline.py
END=$SECONDS
echo "Elapsed: $((END - START)) seconds"

<span class="cb-cmt">## ═══ PRACTICAL: FILE SIZE CALCULATIONS ══════════════════════</span>
SIZE=$(du -sb data.csv | cut -f1)     <span class="cb-cmt"># size in bytes</span>
SIZE_MB=$(( SIZE / 1024 / 1024 ))     <span class="cb-cmt"># convert to MB</span>
echo "File size: \${SIZE_MB} MB"

<span class="cb-cmt">## ═══ GENERATE SEQUENCES ══════════════════════════════════════</span>
for i in $(seq 1 5); do echo "$i"; done      <span class="cb-cmt"># 1 2 3 4 5</span>
for i in $(seq 0 2 10); do echo "$i"; done   <span class="cb-cmt"># 0 2 4 6 8 10 (step 2)</span>
for i in {1..10}; do echo "$i"; done          <span class="cb-cmt"># brace expansion</span>
for i in {01..05}; do echo "$i"; done         <span class="cb-cmt"># 01 02 03 04 05 (zero-padded)</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 7 — CONDITIONALS
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Conditionals — <code>if</code>, <code>case</code>, and Test Expressions</h2>

<!-- if/else flow SVG -->
<div class="diagram-wrap">
<svg viewBox="0 0 820 180" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="180" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">Bash Conditional Flow — [ ] vs [[ ]] vs (( ))</text>

  <!-- [ ] box -->
  <rect x="20" y="38" width="245" height="128" rx="7" fill="#1f2027" stroke="#ffa657" stroke-width="1.5"/>
  <text x="142" y="58" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#ffa657">[ ] — POSIX test</text>
  <text x="30" y="78" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">if [ "$a" = "$b" ]; then</text>
  <text x="30" y="94" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Portable (works in sh)</text>
  <text x="30" y="110" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">= for strings (not ==)</text>
  <text x="30" y="126" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Must quote variables!</text>
  <text x="30" y="142" font-family="'Segoe UI',sans-serif" font-size="10" fill="#ffa657">Use for POSIX scripts</text>
  <text x="30" y="158" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">No regex, no &amp;&amp;/||</text>

  <!-- [[ ]] box -->
  <rect x="285" y="38" width="245" height="128" rx="7" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="407" y="58" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#3fb950">[[ ]] — Bash keyword</text>
  <text x="295" y="78" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">if [[ "$a" == "$b" ]]; then</text>
  <text x="295" y="94" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Bash only (not sh)</text>
  <text x="295" y="110" font-family="'Segoe UI',sans-serif" font-size="10" fill="#3fb950">== for strings, = also ok</text>
  <text x="295" y="126" font-family="'Segoe UI',sans-serif" font-size="10" fill="#3fb950">Regex: =~ operator</text>
  <text x="295" y="142" font-family="'Segoe UI',sans-serif" font-size="10" fill="#3fb950">Supports &amp;&amp; and || inside</text>
  <text x="295" y="158" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">✅ Use this for bash scripts</text>

  <!-- (( )) box -->
  <rect x="550" y="38" width="250" height="128" rx="7" fill="#1a1a3a" stroke="#bc8cff" stroke-width="1.5"/>
  <text x="675" y="58" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#bc8cff">(( )) — Arithmetic</text>
  <text x="560" y="78" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">if (( a &gt; b )); then</text>
  <text x="560" y="94" font-family="'Segoe UI',sans-serif" font-size="10" fill="#bc8cff">Numbers only</text>
  <text x="560" y="110" font-family="'Segoe UI',sans-serif" font-size="10" fill="#bc8cff">C-style: &gt; &lt; == != &gt;= &lt;=</text>
  <text x="560" y="126" font-family="'Segoe UI',sans-serif" font-size="10" fill="#bc8cff">No $ needed for variables</text>
  <text x="560" y="142" font-family="'Segoe UI',sans-serif" font-size="10" fill="#bc8cff">0=false, non-zero=true</text>
  <text x="560" y="158" font-family="'Segoe UI',sans-serif" font-size="9" fill="#bc8cff">Use for number comparisons</text>
</svg>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 6 of 8 — Conditionals: if/elif/else, case, test operators</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ BASIC IF / ELIF / ELSE ══════════════════════════════════</span>
if [[ "$ENVIRONMENT" == "production" ]]; then
    echo "Production mode — extra care!"
elif [[ "$ENVIRONMENT" == "staging" ]]; then
    echo "Staging mode"
else
    echo "Development mode"
fi
<span class="cb-cmt"># SYNTAX RULES:
# - space after [ and before ]  (required!)
# - then must be on same line as if (or on next line)
# - fi closes every if block</span>

<span class="cb-cmt">## ═══ STRING COMPARISONS [[ ]] ════════════════════════════════</span>
[[ "$a" == "$b" ]]      <span class="cb-cmt"># equal strings</span>
[[ "$a" != "$b" ]]      <span class="cb-cmt"># not equal</span>
[[ "$a" &lt; "$b" ]]       <span class="cb-cmt"># a before b alphabetically (escape &lt; in [ ])</span>
[[ "$a" &gt; "$b" ]]       <span class="cb-cmt"># a after b alphabetically</span>
[[ -z "$a" ]]           <span class="cb-cmt"># -z: string is EMPTY (zero length)</span>
[[ -n "$a" ]]           <span class="cb-cmt"># -n: string is NOT empty (non-zero)</span>
[[ "$a" =~ ^[0-9]+$ ]]  <span class="cb-cmt"># regex match: a is all digits</span>
[[ "$a" == *.csv ]]     <span class="cb-cmt"># glob pattern match (no quotes on pattern!)</span>

<span class="cb-cmt">## ═══ NUMERIC COMPARISONS ══════════════════════════════════════</span>
<span class="cb-cmt"># With [[ ]] — use -eq -ne -lt -gt -le -ge :</span>
[[ "$a" -eq "$b" ]]     <span class="cb-cmt"># equal numbers</span>
[[ "$a" -ne "$b" ]]     <span class="cb-cmt"># not equal</span>
[[ "$a" -lt "$b" ]]     <span class="cb-cmt"># less than</span>
[[ "$a" -gt "$b" ]]     <span class="cb-cmt"># greater than</span>
[[ "$a" -le "$b" ]]     <span class="cb-cmt"># less or equal</span>
[[ "$a" -ge "$b" ]]     <span class="cb-cmt"># greater or equal</span>

<span class="cb-cmt"># With (( )) — C-style (cleaner for numbers):</span>
(( a == b ))              <span class="cb-cmt"># equal</span>
(( a > b ))               <span class="cb-cmt"># greater than</span>
(( a >= 10 && a &lt;= 100 )) <span class="cb-cmt"># range check</span>

<span class="cb-cmt">## ═══ FILE TEST OPERATORS ══════════════════════════════════════</span>
[[ -e "$path" ]]     <span class="cb-cmt"># exists (file or directory)</span>
[[ -f "$path" ]]     <span class="cb-cmt"># is a regular FILE</span>
[[ -d "$path" ]]     <span class="cb-cmt"># is a DIRECTORY</span>
[[ -L "$path" ]]     <span class="cb-cmt"># is a SYMLINK</span>
[[ -r "$path" ]]     <span class="cb-cmt"># readable</span>
[[ -w "$path" ]]     <span class="cb-cmt"># writable</span>
[[ -x "$path" ]]     <span class="cb-cmt"># executable</span>
[[ -s "$path" ]]     <span class="cb-cmt"># size &gt; 0 (non-empty file)</span>
[[ -z "$path" ]]     <span class="cb-cmt"># string is empty (not file test)</span>
[[ "$a" -nt "$b" ]] <span class="cb-cmt"># a is NEWER THAN b (modification time)</span>
[[ "$a" -ot "$b" ]] <span class="cb-cmt"># a is OLDER THAN b</span>

<span class="cb-cmt">## ═══ LOGICAL OPERATORS ═══════════════════════════════════════</span>
[[ cond1 &amp;&amp; cond2 ]]  <span class="cb-cmt"># AND — both must be true</span>
[[ cond1 || cond2 ]]  <span class="cb-cmt"># OR  — at least one true</span>
[[ ! cond ]]          <span class="cb-cmt"># NOT — invert condition</span>

<span class="cb-cmt"># AND / OR on the command line:</span>
mkdir -p /data/output &amp;&amp; echo "Created"  <span class="cb-cmt"># run next only if first succeeded</span>
[ -f config.yaml ] || echo "Missing!"    <span class="cb-cmt"># run next only if first FAILED</span>

<span class="cb-cmt">## ═══ CASE STATEMENT ══════════════════════════════════════════</span>
case "$ENVIRONMENT" in
    production)
        LOG_LEVEL="WARN"
        DB_HOST="prod-db.cluster"
        ;;
    staging)
        LOG_LEVEL="INFO"
        DB_HOST="staging-db.internal"
        ;;
    dev|development)          <span class="cb-cmt"># match either "dev" or "development"</span>
        LOG_LEVEL="DEBUG"
        DB_HOST="localhost"
        ;;
    *)                        <span class="cb-cmt"># default: matches anything else</span>
        echo "Unknown environment: $ENVIRONMENT"
        exit 1
        ;;
esac
<span class="cb-cmt"># case supports glob patterns: *.csv) log.* ) [0-9]*)</span>

<span class="cb-cmt">## ═══ ONE-LINERS: SHORT CIRCUIT ═══════════════════════════════</span>
[[ -f "$FILE" ]] || { echo "File missing: $FILE"; exit 1; }
[[ -d "/data" ]] && echo "Data dir exists"
[[ -n "$DB_HOST" ]] || DB_HOST="localhost"   <span class="cb-cmt"># set default if unset</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 8 — LOOPS
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num">08</span> Loops — <code>for</code>, <code>while</code>, <code>until</code>, <code>select</code></h2>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 7 of 8 — All Loop Types with Real Data Engineering Examples</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ FOR LOOP ════════════════════════════════════════════════</span>
<span class="cb-cmt"># List form:</span>
for color in red green blue; do
    echo "Color: $color"
done

<span class="cb-cmt"># Range with brace expansion:</span>
for i in {1..10}; do
    echo "Processing day $i"
done

<span class="cb-cmt"># Range with seq:</span>
for i in $(seq 1 5 100); do  <span class="cb-cmt"># 1 6 11 16 ... (step=5)</span>
    echo "$i"
done

<span class="cb-cmt"># C-style for loop:</span>
for (( i=0; i&lt;10; i++ )); do
    echo "i = $i"
done

<span class="cb-cmt"># Iterate over files:</span>
for file in *.csv; do
    echo "Processing: $file"
    wc -l "$file"
done

<span class="cb-cmt"># Iterate over files safely (handles spaces in names):</span>
while IFS= read -r -d '' file; do
    echo "Found: $file"
done &lt; &lt;(find . -name "*.csv" -print0)

<span class="cb-cmt"># Iterate over command output:</span>
for server in $(cat servers.txt); do
    ping -c1 "$server" &amp;&gt;/dev/null &amp;&amp; echo "$server: UP" || echo "$server: DOWN"
done

<span class="cb-cmt"># REAL WORLD: Process daily data files:</span>
for date in 2024-01-{01..31}; do
    FILE="sales_\${date}.csv"
    [[ -f "$FILE" ]] || continue       <span class="cb-cmt"># skip if file doesn't exist</span>
    echo "Loading $FILE..."
    python3 load.py "$FILE"
done

<span class="cb-cmt">## ═══ WHILE LOOP ══════════════════════════════════════════════</span>
<span class="cb-cmt"># Basic while:</span>
COUNT=0
while [[ $COUNT -lt 5 ]]; do
    echo "Count: $COUNT"
    ((COUNT++))
done

<span class="cb-cmt"># Read file line by line (MOST IMPORTANT pattern):</span>
while IFS= read -r line; do    <span class="cb-cmt"># IFS= preserves leading spaces, -r: no backslash escape</span>
    echo "Line: $line"
done &lt; data.csv

<span class="cb-cmt"># Read CSV with field splitting:</span>
while IFS=',' read -r date sales region; do
    echo "Date: $date | Sales: $sales | Region: $region"
done &lt; sales.csv

<span class="cb-cmt"># Process with multiple files:</span>
while IFS= read -r file; do
    gzip "$file"
done &lt; files_to_compress.txt

<span class="cb-cmt"># Infinite loop with break:</span>
while true; do
    echo "Checking pipeline status..."
    STATUS=$(python3 check_status.py)
    [[ "$STATUS" == "DONE" ]] &amp;&amp; break
    [[ "$STATUS" == "FAILED" ]] &amp;&amp; { echo "Pipeline failed!"; exit 1; }
    sleep 30
done
echo "Pipeline completed!"

<span class="cb-cmt">## ═══ UNTIL LOOP (runs while condition is FALSE) ══════════════</span>
COUNT=0
until [[ $COUNT -ge 5 ]]; do
    echo "Count: $COUNT"
    ((COUNT++))
done
<span class="cb-cmt"># until is just while with inverted condition — less commonly used</span>

<span class="cb-cmt">## ═══ LOOP CONTROL ════════════════════════════════════════════</span>
break            <span class="cb-cmt"># exit the loop immediately</span>
break 2          <span class="cb-cmt"># break out of 2 nested loops</span>
continue         <span class="cb-cmt"># skip rest of this iteration, next iteration</span>
continue 2       <span class="cb-cmt"># continue to outer loop's next iteration</span>

<span class="cb-cmt">## ═══ SELECT LOOP (interactive menu) ════════════════════════</span>
select CHOICE in "Load Data" "Validate" "Export" "Quit"; do
    case "$CHOICE" in
        "Load Data")  python3 load.py ;;
        "Validate")   python3 validate.py ;;
        "Export")     python3 export.py ;;
        "Quit")       break ;;
        *)            echo "Invalid choice" ;;
    esac
done
<span class="cb-cmt"># select auto-shows numbered menu, reads user choice into CHOICE
# Prints PS3 prompt (set PS3="Choose: " to customise)</span>

<span class="cb-cmt">## ═══ PARALLEL LOOPS (background jobs) ══════════════════════</span>
for server in server1 server2 server3; do
    ssh "$server" "python3 pipeline.py" &amp;     <span class="cb-cmt"># &amp; = run in background</span>
done
wait                                          <span class="cb-cmt"># wait for ALL background jobs</span>
echo "All servers done"

<span class="cb-cmt"># Limited parallelism with xargs:</span>
ls *.csv | xargs -P 4 -I{} python3 process.py {}  <span class="cb-cmt"># max 4 parallel</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 9 — FUNCTIONS
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Functions — Reusable Code Blocks</h2>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 8 of 8 — Functions: Definition, Arguments, Return, Scope, Libraries</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ DEFINING FUNCTIONS ══════════════════════════════════════</span>
<span class="cb-cmt"># Method 1: function keyword (bash-specific)</span>
function greet() {
    echo "Hello, $1!"
}

<span class="cb-cmt"># Method 2: POSIX-compatible (preferred for portability)</span>
greet() {
    echo "Hello, $1!"
}

<span class="cb-cmt"># Must define BEFORE calling:</span>
greet "Ravi"      <span class="cb-cmt"># Hello, Ravi!</span>

<span class="cb-cmt">## ═══ ARGUMENTS ════════════════════════════════════════════</span>
process_file() {
    local FILE="$1"       <span class="cb-cmt"># first argument</span>
    local FORMAT="$2"     <span class="cb-cmt"># second argument</span>
    local OUTPUT="\${3:-/tmp/output}"  <span class="cb-cmt"># third arg with default</span>

    echo "Processing: $FILE (format: $FORMAT) → $OUTPUT"
    echo "Total args: $#"   <span class="cb-cmt"># number of arguments to THIS function</span>
    echo "All args: $@"     <span class="cb-cmt"># all arguments</span>
}

process_file data.csv parquet /data/processed

<span class="cb-cmt">## ═══ LOCAL VARIABLES — SCOPE ══════════════════════════════</span>
GLOBAL_VAR="I am global"

demo_scope() {
    local LOCAL_VAR="I am local"    <span class="cb-cmt"># only exists inside this function</span>
    GLOBAL_VAR="Modified by function"  <span class="cb-cmt"># modifies the global</    
    echo "Inside: $LOCAL_VAR"
    echo "Inside: $GLOBAL_VAR"
}

demo_scope
echo "Outside: $GLOBAL_VAR"   <span class="cb-cmt"># Modified by function</span>
echo "Outside: $LOCAL_VAR"    <span class="cb-cmt"># empty — LOCAL_VAR gone</span>

<span class="cb-cmt">## ═══ RETURN VALUES ═══════════════════════════════════════</span>
<span class="cb-cmt"># Method 1: return code (0=success, 1-255=error)</span>
is_valid_csv() {
    local FILE="$1"
    [[ -f "$FILE" ]] || return 1          <span class="cb-cmt"># file doesn't exist</span>
    [[ "$FILE" == *.csv ]] || return 2    <span class="cb-cmt"># not a csv</span>
    [[ -s "$FILE" ]] || return 3          <span class="cb-cmt"># empty file</span>
    return 0                              <span class="cb-cmt"># all checks passed</span>
}

if is_valid_csv "data.csv"; then
    echo "Valid CSV!"
else
    echo "Invalid — code: $?"
fi

<span class="cb-cmt"># Method 2: echo output (capture with $())</span>
get_row_count() {
    local FILE="$1"
    local COUNT=$(wc -l &lt; "$FILE")
    echo "$((COUNT - 1))"   <span class="cb-cmt"># subtract header</span>
}

ROWS=$(get_row_count "sales.csv")
echo "Rows: $ROWS"

<span class="cb-cmt"># Method 3: nameref — return into a named variable</span>
calculate() {
    local -n RESULT=$3          <span class="cb-cmt"># nameref: RESULT is an alias for arg 3's name</span>
    RESULT=$(( $1 + $2 ))
}

calculate 10 20 TOTAL
echo "$TOTAL"   <span class="cb-cmt"># 30 — populated by function without subshell</span>

<span class="cb-cmt">## ═══ RECURSIVE FUNCTIONS ══════════════════════════════════</span>
factorial() {
    local N=$1
    if (( N &lt;= 1 )); then
        echo 1
    else
        local SUB=$(factorial $((N - 1)))
        echo $((N * SUB))
    fi
}
echo "5! = $(factorial 5)"   <span class="cb-cmt"># 120</span>

<span class="cb-cmt">## ═══ FUNCTION LIBRARY PATTERN ════════════════════════════</span>
<span class="cb-cmt"># lib/logging.sh — shared logging functions</span>
log_info()  { echo "[INFO]  $(date '+%H:%M:%S') $*"; }
log_warn()  { echo "[WARN]  $(date '+%H:%M:%S') $*" >&amp;2; }
log_error() { echo "[ERROR] $(date '+%H:%M:%S') $*" >&amp;2; }
log_debug() { [[ "\${DEBUG:-false}" == "true" ]] &amp;&amp; echo "[DEBUG] $*" >&amp;2; }

<span class="cb-cmt"># Use in main script:</span>
source lib/logging.sh
log_info "Starting pipeline"
log_warn "Row count lower than expected"
log_error "Database connection failed"

<span class="cb-cmt">## ═══ REAL WORLD: DATA PIPELINE FUNCTIONS ════════════════</span>
validate_args() {
    (( $# &lt; 2 )) &amp;&amp; { echo "Usage: $0 INPUT_FILE OUTPUT_DIR"; exit 1; }
    [[ -f "$1" ]] || { echo "ERROR: Input not found: $1"; exit 1; }
    [[ -d "$2" ]] || mkdir -p "$2"
}

check_disk_space() {
    local REQUIRED_MB="\${1:-500}"
    local AVAILABLE=$(df /data --output=avail -m | tail -1)
    (( AVAILABLE &lt; REQUIRED_MB )) &amp;&amp; {
        log_error "Insufficient disk: \${AVAILABLE}MB < \${REQUIRED_MB}MB required"
        return 1
    }
    return 0
}

send_slack_alert() {
    local MESSAGE="$1"
    local WEBHOOK="\${SLACK_WEBHOOK:?SLACK_WEBHOOK not set}"
    curl -s -X POST "$WEBHOOK" \
        -H 'Content-type: application/json' \
        --data "{\"text\": \"$MESSAGE\"}" > /dev/null
}
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 10 — ARRAYS
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Arrays — Indexed &amp; Associative</h2>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Arrays — Indexed Arrays &amp; Associative Arrays (Dictionaries)</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ INDEXED ARRAYS ══════════════════════════════════════════</span>
<span class="cb-cmt"># Create:</span>
SERVERS=("server1" "server2" "server3")
SERVERS=()                          <span class="cb-cmt"># empty array</span>
declare -a SERVERS                  <span class="cb-cmt"># explicit declaration</span>
mapfile -t SERVERS &lt; servers.txt    <span class="cb-cmt"># read file into array (one per line)</span>
IFS=',' read -ra FIELDS &lt;&lt;&lt; "a,b,c" <span class="cb-cmt"># split CSV into array</span>

<span class="cb-cmt"># Access elements:</span>
echo "\${SERVERS[0]}"        <span class="cb-cmt"># first element: server1</span>
echo "\${SERVERS[1]}"        <span class="cb-cmt"># second: server2</span>
echo "\${SERVERS[-1]}"       <span class="cb-cmt"># last element: server3</span>
echo "\${SERVERS[@]}"        <span class="cb-cmt"># ALL elements (always quote this!)</span>
echo "\${#SERVERS[@]}"       <span class="cb-cmt"># length: 3</span>
echo "\${!SERVERS[@]}"       <span class="cb-cmt"># all indices: 0 1 2</span>

<span class="cb-cmt"># Slices:</span>
echo "\${SERVERS[@]:1:2}"    <span class="cb-cmt"># elements from index 1, count 2: server2 server3</span>

<span class="cb-cmt"># Modify:</span>
SERVERS+=("server4")         <span class="cb-cmt"># append</span>
SERVERS[0]="new-server"      <span class="cb-cmt"># replace element</span>
unset SERVERS[1]             <span class="cb-cmt"># delete element (leaves gap in indices!)</span>
SERVERS=("\${SERVERS[@]}")   <span class="cb-cmt"># re-index after deletion</span>

<span class="cb-cmt"># Loop over array:</span>
for server in "\${SERVERS[@]}"; do    <span class="cb-cmt"># ALWAYS quote \${ARRAY[@]}</span>
    echo "Checking: $server"
done

<span class="cb-cmt"># Loop with indices:</span>
for i in "\${!SERVERS[@]}"; do
    echo "[$i] \${SERVERS[$i]}"
done

<span class="cb-cmt">## ═══ ASSOCIATIVE ARRAYS (dictionaries / maps) ════════════════</span>
declare -A CONFIG                    <span class="cb-cmt"># MUST declare -A for associative</span>
CONFIG["host"]="localhost"
CONFIG["port"]="5432"
CONFIG["db"]="analytics"

<span class="cb-cmt"># Or all at once:</span>
declare -A CONFIG=(
    [host]="localhost"
    [port]="5432"
    [db]="analytics"
    [user]="ravi"
)

<span class="cb-cmt"># Access:</span>
echo "\${CONFIG[host]}"       <span class="cb-cmt"># localhost</span>
echo "\${CONFIG[@]}"          <span class="cb-cmt"># all values</span>
echo "\${!CONFIG[@]}"         <span class="cb-cmt"># all keys</span>
echo "\${#CONFIG[@]}"         <span class="cb-cmt"># number of entries: 4</span>

<span class="cb-cmt"># Check if key exists:</span>
[[ -v CONFIG[host] ]] &amp;&amp; echo "host key exists"

<span class="cb-cmt"># Loop over key-value pairs:</span>
for key in "\${!CONFIG[@]}"; do
    echo "$key = \${CONFIG[$key]}"
done
<span class="cb-out">host = localhost</span>
<span class="cb-out">port = 5432</span>
<span class="cb-out">db = analytics</span>
<span class="cb-out">user = ravi</span>

<span class="cb-cmt"># REAL WORLD: track server status</span>
declare -A STATUS
for server in server1 server2 server3; do
    if ping -c1 "$server" &amp;&gt;/dev/null; then
        STATUS["$server"]="UP"
    else
        STATUS["$server"]="DOWN"
    fi
done

for server in "\${!STATUS[@]}"; do
    printf "%-20s %s\n" "$server" "\${STATUS[$server]}"
done
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 11 — STRING OPERATIONS
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> String Operations — Manipulation &amp; Pattern Matching</h2>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">String Operations — All Bash Built-ins Plus sed/awk/tr</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ PURE BASH STRING OPS (no external commands) ════════════</span>
STR="Hello, World! 2024"

<span class="cb-cmt"># Length:</span>
echo "\${#STR}"              <span class="cb-cmt"># 18</span>

<span class="cb-cmt"># Substrings:</span>
echo "\${STR:0:5}"           <span class="cb-cmt"># Hello (start:length)</span>
echo "\${STR:7}"             <span class="cb-cmt"># World! 2024 (from pos 7 to end)</span>
echo "\${STR: -4}"           <span class="cb-cmt"># 2024 (last 4 chars)</span>

<span class="cb-cmt"># Case:</span>
echo "\${STR,,}"             <span class="cb-cmt"># all lowercase</span>
echo "\${STR^^}"             <span class="cb-cmt"># ALL UPPERCASE</span>
echo "\${STR^}"              <span class="cb-cmt"># First char uppercase</span>

<span class="cb-cmt"># Strip prefix/suffix:</span>
FILE="report_2024-01-15.csv"
echo "\${FILE%.csv}"         <span class="cb-cmt"># report_2024-01-15 (remove .csv)</span>
echo "\${FILE#report_}"      <span class="cb-cmt"># 2024-01-15.csv (remove prefix)</span>
echo "\${FILE##*_}"          <span class="cb-cmt"># 2024-01-15.csv (remove longest prefix up to _)</span>

<span class="cb-cmt"># Replace:</span>
echo "\${STR/World/Ravi}"    <span class="cb-cmt"># replace first: Hello, Ravi! 2024</span>
echo "\${STR//l/L}"          <span class="cb-cmt"># replace all l→L: HeLLo, WorLd! 2024</span>

<span class="cb-cmt"># Check if string contains substring:</span>
[[ "$STR" == *"World"* ]] &amp;&amp; echo "contains World"

<span class="cb-cmt"># Check if string starts with / ends with:</span>
[[ "$FILE" == report* ]] &amp;&amp; echo "starts with report"
[[ "$FILE" == *.csv ]]   &amp;&amp; echo "ends with .csv"

<span class="cb-cmt">## ═══ sed FOR COMPLEX SUBSTITUTION ═══════════════════════════</span>
echo "hello world" | sed 's/world/bash/'   <span class="cb-cmt"># hello bash</span>
echo "a:b:c:d" | sed 's/:/,/g'            <span class="cb-cmt"># a,b,c,d (global replace)</span>
sed -i 's/DEBUG/INFO/g' app.log            <span class="cb-cmt"># in-place file edit</span>
echo "   spaces   " | sed 's/^ *//;s/ *$//' <span class="cb-cmt"># trim whitespace</span>

<span class="cb-cmt">## ═══ awk FOR FIELD EXTRACTION ════════════════════════════════</span>
echo "Ravi,Mumbai,42" | awk -F',' '{print $1}'   <span class="cb-cmt"># Ravi</span>
echo "Ravi,Mumbai,42" | awk -F',' '{print $2}'   <span class="cb-cmt"># Mumbai</span>
awk -F',' 'NR>1 {print $1, $3}' sales.csv       <span class="cb-cmt"># skip header, print cols 1&amp;3</span>
awk -F',' '{sum+=$2} END{print "Total:", sum}' sales.csv  <span class="cb-cmt"># sum column 2</span>

<span class="cb-cmt">## ═══ tr FOR CHARACTER TRANSLATION ═══════════════════════════</span>
echo "hello" | tr 'a-z' 'A-Z'       <span class="cb-cmt"># HELLO (lowercase→uppercase)</span>
echo "hello world" | tr -d ' '      <span class="cb-cmt"># helloworld (delete spaces)</span>
echo "a,b,,c" | tr -s ','           <span class="cb-cmt"># a,b,c (squeeze repeated chars)</span>
echo "line1\nline2" | tr '\n' ' '   <span class="cb-cmt"># join lines with space</span>

<span class="cb-cmt">## ═══ PRACTICAL: Parse config file ═══════════════════════════</span>
<span class="cb-cmt"># Read KEY=VALUE config file into variables:</span>
while IFS='=' read -r key value; do
    [[ "$key" =~ ^#.*$ || -z "$key" ]] &amp;&amp; continue  <span class="cb-cmt"># skip comments/blank lines</span>
    key=$(echo "$key" | tr -d '[:space:]')   <span class="cb-cmt"># trim whitespace</span>
    value=$(echo "$value" | tr -d '[:space:]')
    export "$key"="$value"
    echo "Set: $key = $value"
done &lt; config.env
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 12 — PROCESS MANAGEMENT & SIGNALS
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Process Management &amp; Signals — Traps &amp; Background Jobs</h2>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Process Control — Background Jobs, Wait, Traps, Signals</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ BACKGROUND JOBS ══════════════════════════════════════════</span>
python3 pipeline.py &amp;       <span class="cb-cmt"># run in background, get PID</span>
echo "PID: $!"              <span class="cb-cmt"># $! = PID of last background job</span>
PID=$!                     <span class="cb-cmt"># save PID for later</span>

jobs                        <span class="cb-cmt"># list background jobs in current shell</span>
wait $PID                   <span class="cb-cmt"># wait for specific PID to finish</span>
wait                        <span class="cb-cmt"># wait for ALL background jobs</span>
fg %1                       <span class="cb-cmt"># bring job 1 to foreground</span>
bg %1                       <span class="cb-cmt"># send job 1 to background</span>
kill $PID                   <span class="cb-cmt"># send SIGTERM (graceful stop)</span>
kill -9 $PID                <span class="cb-cmt"># SIGKILL (force kill)</span>
kill -0 $PID 2>/dev/null &amp;&amp; echo "still running"  <span class="cb-cmt"># check if PID alive</span>

<span class="cb-cmt">## ═══ PARALLEL PROCESSING PATTERN ════════════════════════════</span>
MAX_PARALLEL=4
PIDS=()

for file in *.csv; do
    python3 process.py "$file" &amp;
    PIDS+=($!)

    <span class="cb-cmt"># Limit parallelism</span>
    if (( \${#PIDS[@]} >= MAX_PARALLEL )); then
        wait "\${PIDS[0]}"   <span class="cb-cmt"># wait for oldest job</span>
        PIDS=("\${PIDS[@]:1}")  <span class="cb-cmt"># remove from array</span>
    fi
done
wait   <span class="cb-cmt"># wait for remaining jobs</span>
echo "All files processed"

<span class="cb-cmt">## ═══ TRAP — CLEANUP ON EXIT/SIGNAL ══════════════════════════</span>
<span class="cb-cmt"># trap 'command' SIGNAL [SIGNAL...]</span>

<span class="cb-cmt"># Cleanup temp files on exit (most important pattern):</span>
TMPFILE=$(mktemp /tmp/pipeline.XXXXXX)
trap 'rm -f "$TMPFILE"; echo "Cleaned up"' EXIT

<span class="cb-cmt"># EXIT runs on: normal exit, error exit, Ctrl+C, kill
# After trap, TMPFILE is always cleaned up — no leaks!</span>

<span class="cb-cmt"># Full cleanup function pattern:</span>
cleanup() {
    local EXIT_CODE=$?
    echo "Cleaning up (exit code: $EXIT_CODE)..."
    rm -f /tmp/pipeline_*.tmp
    [[ -n "$PID" ]] &amp;&amp; kill "$PID" 2>/dev/null
    exit $EXIT_CODE
}
trap cleanup EXIT INT TERM

<span class="cb-cmt"># Signal reference:</span>
<span class="cb-cmt"># EXIT   → script exits (any reason)</span>
<span class="cb-cmt"># INT    → Ctrl+C (SIGINT)</span>
<span class="cb-cmt"># TERM   → kill command (SIGTERM)</span>
<span class="cb-cmt"># HUP    → terminal closed (SIGHUP)</span>
<span class="cb-cmt"># ERR    → any command fails (with set -e)</span>
<span class="cb-cmt"># DEBUG  → before every command</span>

<span class="cb-cmt"># Graceful shutdown handler:</span>
trap 'echo "Shutting down..."; cleanup_graceful; exit 0' SIGTERM SIGINT
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 13 — SCRIPT ARGUMENTS & GETOPTS
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Script Arguments — Positional Params &amp; <code>getopts</code></h2>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Argument Parsing — $1 $@, shift, getopts, Usage Patterns</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ POSITIONAL PARAMETERS ═══════════════════════════════════</span>
<span class="cb-out">#!/usr/bin/env bash</span>
<span class="cb-out"># Usage: ./pipeline.sh INPUT_FILE OUTPUT_DIR [LOG_LEVEL]</span>
<span class="cb-out"></span>
<span class="cb-out">INPUT="$1"</span>
<span class="cb-out">OUTPUT="$2"</span>
<span class="cb-out">LOG_LEVEL="\${3:-INFO}"   # default INFO if not provided</span>
<span class="cb-out"></span>
<span class="cb-out">echo "Input:  $INPUT"</span>
<span class="cb-out">echo "Output: $OUTPUT"</span>
<span class="cb-out">echo "Args:   $#"</span>
<span class="cb-out">echo "All:    $@"</span>

<span class="cb-cmt">## ═══ USAGE/HELP PATTERN ══════════════════════════════════════</span>
usage() {
    cat &lt;&lt; EOF
Usage: $(basename "$0") [OPTIONS] INPUT_FILE OUTPUT_DIR

Options:
  -e ENV        Environment (dev/staging/prod) [default: dev]
  -l LOG_LEVEL  Logging level (DEBUG/INFO/WARN) [default: INFO]
  -v            Verbose output
  -h            Show this help message

Examples:
  $(basename "$0") data.csv /output/
  $(basename "$0") -e prod -l WARN data.csv /output/

EOF
}

<span class="cb-cmt">## ═══ GETOPTS — PROPER FLAG PARSING ══════════════════════════</span>
ENV="dev"
LOG_LEVEL="INFO"
VERBOSE=false

while getopts "e:l:vh" opt; do
    case "$opt" in
        e)  ENV="$OPTARG" ;;        <span class="cb-cmt"># -e takes an argument (:)</span>
        l)  LOG_LEVEL="$OPTARG" ;;  <span class="cb-cmt"># -l takes an argument</span>
        v)  VERBOSE=true ;;          <span class="cb-cmt"># -v is a flag (no argument)</span>
        h)  usage; exit 0 ;;         <span class="cb-cmt"># -h shows help</span>
        \?) echo "Unknown: -$OPTARG"; usage; exit 1 ;;  <span class="cb-cmt"># unknown flag</span>
        :)  echo "-$OPTARG requires an argument"; exit 1 ;;  <span class="cb-cmt"># missing arg</span>
    esac
done
shift $((OPTIND - 1))   <span class="cb-cmt"># remove parsed flags, leave positional args</span>

<span class="cb-cmt"># After shift, $1 $2 etc are the remaining positional args:</span>
INPUT="\${1:?Input file required}"
OUTPUT="\${2:-/tmp/output}"

<span class="cb-cmt">## ═══ SHIFT — WALK THROUGH ARGUMENTS ═════════════════════════</span>
process_all_args() {
    while [[ $# -gt 0 ]]; do
        echo "Processing: $1"
        shift       <span class="cb-cmt"># removes $1, shifts $2→$1, $3→$2, etc.</span>    
    done
}
process_all_args file1.csv file2.csv file3.csv

<span class="cb-cmt">## ═══ VALIDATE ARGUMENTS ══════════════════════════════════════</span>
validate_args() {
    [[ $# -lt 2 ]] &amp;&amp; { usage; exit 1; }
    [[ -f "$1" ]]  || { echo "ERROR: Input not found: $1"; exit 1; }
    [[ -d "$2" ]]  || mkdir -p "$2" || { echo "ERROR: Can't create: $2"; exit 1; }
    [[ "$ENV" =~ ^(dev|staging|prod)$ ]] || { echo "ERROR: Bad ENV: $ENV"; exit 1; }
}
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 14 — ERROR HANDLING & DEBUGGING
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Error Handling &amp; Debugging — Robust Production Scripts</h2>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Error Handling — set -euo pipefail, Exit Codes, Debugging</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ THE PRODUCTION SCRIPT TEMPLATE ════════════════════════</span>
<span class="cb-out">#!/usr/bin/env bash</span>
<span class="cb-out">set -euo pipefail          # strict mode — always use in production</span>
<span class="cb-out">IFS=$'\n\t'               # safer IFS — only split on newline and tab</span>
<span class="cb-out"></span>
<span class="cb-out"># Global constants</span>
<span class="cb-out">readonly SCRIPT_NAME="$(basename "$0")"</span>
<span class="cb-out">readonly SCRIPT_DIR="$(cd "$(dirname "\${BASH_SOURCE[0]}")" &amp;&amp; pwd)"</span>
<span class="cb-out">readonly LOG_FILE="/var/log/\${SCRIPT_NAME%.sh}.log"</span>
<span class="cb-out">readonly TIMESTAMP="$(date +%Y%m%d_%H%M%S)"</span>
<span class="cb-out"></span>
<span class="cb-out"># Logging</span>
<span class="cb-out">log() { echo "[$(date '+%H:%M:%S')] $*" | tee -a "$LOG_FILE"; }</span>
<span class="cb-out">die() { log "FATAL: $*"; exit 1; }</span>

<span class="cb-cmt">## ═══ EXIT CODES ═══════════════════════════════════════════════</span>
<span class="cb-cmt"># Convention:</span>
<span class="cb-cmt"># 0   = success</span>
<span class="cb-cmt"># 1   = general error</span>
<span class="cb-cmt"># 2   = misuse of shell command / bad arguments</span>
<span class="cb-cmt"># 126 = command found but not executable</span>
<span class="cb-cmt"># 127 = command not found</span>
<span class="cb-cmt"># 128+N = killed by signal N (e.g., 130 = killed by Ctrl+C = 128+2)</span>

<span class="cb-cmt"># Custom exit codes for your script:</span>
readonly E_ARGS=2
readonly E_NO_FILE=3
readonly E_DB_FAIL=4
readonly E_TIMEOUT=5

<span class="cb-cmt">## ═══ set OPTIONS EXPLAINED ════════════════════════════════════</span>
set -e           <span class="cb-cmt"># exit on error (errexit)</span>
set +e           <span class="cb-cmt"># turn OFF exit on error (use when you handle errors)</span>
set -u           <span class="cb-cmt"># treat unset variables as errors (nounset)</span>
set -o pipefail  <span class="cb-cmt"># pipe fails if any command in pipe fails</span>
set -x           <span class="cb-cmt"># trace — print commands before running (debug)</span>
set +x           <span class="cb-cmt"># turn off trace</span>
set -n           <span class="cb-cmt"># dry run — syntax check only, don't execute</span>
set -v           <span class="cb-cmt"># verbose — print lines as they're read</span>

<span class="cb-cmt">## ═══ HANDLING EXPECTED FAILURES ══════════════════════════════</span>
<span class="cb-cmt"># Don't exit when grep finds nothing:</span>
grep "ERROR" app.log || true           <span class="cb-cmt"># || true prevents -e exit</span>
if grep -q "ERROR" app.log; then       <span class="cb-cmt"># or use -q + if</span>
    echo "Errors found"
fi

<span class="cb-cmt"># Run risky command, capture exit code:</span>
set +e
python3 risky_operation.py
EXIT_CODE=$?
set -e
if [[ $EXIT_CODE -ne 0 ]]; then
    log "WARN: risky_operation failed with code $EXIT_CODE"
fi

<span class="cb-cmt">## ═══ DEBUGGING TECHNIQUES ════════════════════════════════════</span>
<span class="cb-cmt"># 1. Trace specific sections:</span>
set -x
complex_function
set +x

<span class="cb-cmt"># 2. Print variable values:</span>
echo "DEBUG: FILE=$FILE, COUNT=$COUNT" >&amp;2

<span class="cb-cmt"># 3. Pause and inspect:</span>
read -p "Paused at line $LINENO. Press Enter to continue..."

<span class="cb-cmt"># 4. Run with debug from command line:</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">bash</span> <span class="cb-flag">-x</span> pipeline.sh input.csv output/
<span class="cb-prompt">$</span> <span class="cb-cmd">bash</span> <span class="cb-flag">-xv</span> pipeline.sh input.csv output/

<span class="cb-cmt"># 5. PS4: customize trace prefix:</span>
export PS4='[\${BASH_SOURCE}:\${LINENO}]: '
set -x   <span class="cb-cmt"># now shows: [pipeline.sh:47]: echo "Starting..."</span>

<span class="cb-cmt"># 6. Check syntax without running:</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">bash</span> <span class="cb-flag">-n</span> pipeline.sh
<span class="cb-prompt">$</span> <span class="cb-cmd">shellcheck</span> pipeline.sh     <span class="cb-cmt"># install: apt install shellcheck</span>
<span class="cb-cmt"># shellcheck is the gold standard — catches 100s of common bugs</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 15 — KERNEL DEEP DIVE
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Kernel Deep Dive — How Scripts Run at the OS Level</h2>

<div class="deepdive-box">
<div class="deepdive-title">⚙️ From ./script.sh to Running Process — The Full Kernel Story</div>
<pre style="margin:0;padding:16px;font-family:monospace;font-size:12px;color:#e6edf3;background:#010409;border-radius:0 0 8px 8px;overflow-x:auto;">
# When you type: ./pipeline.sh data.csv
# Here's everything the kernel does:

1. SHELL PARSING
   bash reads "./pipeline.sh data.csv"
   tokenizes: ["./pipeline.sh", "data.csv"]
   sees it's a command (not a builtin like cd or echo)

2. FORK — CREATE CHILD PROCESS
   bash calls fork(2):
     pid_t child = fork();
   Kernel creates an exact copy of the bash process
   Parent (bash): child's PID returned in child variable
   Child (new process): 0 returned in child variable
   Both processes now running — child will exec the script

3. SHEBANG PROCESSING
   Child process calls execve(2):
     execve("./pipeline.sh", ["./pipeline.sh", "data.csv"], environ)
   Kernel opens pipeline.sh, reads first 2 bytes: "#!"
   Sees it's a script → reads the rest of line 1: "/usr/bin/env bash"
   Kernel converts this to:
     execve("/usr/bin/env", ["/usr/bin/env", "bash", "./pipeline.sh", "data.csv"], env)
   env finds bash in PATH → execve("/bin/bash", ["bash", "./pipeline.sh", ...], env)

4. BASH STARTS — READS SCRIPT
   New bash process inherits:
   - File descriptors: stdin(0), stdout(1), stderr(2)
   - Environment variables (exported vars from parent)
   - Working directory
   bash opens pipeline.sh, reads it line by line

5. BUILTIN vs EXTERNAL COMMANDS
   For each command in script:
   - Builtins (cd, echo, export, [, read, source):
     executed directly by bash — NO fork/exec
   - External commands (python3, ls, grep, curl):
     bash fork()s + exec()s the command
     bash wait()s for child to complete
     bash reads exit code from wait()'s status

6. VARIABLE EXPANSION
   bash expands all \${VAR}, $(cmd), $(( arith )) BEFORE
   executing each command line — this is the expansion phase
   All done in bash memory, no kernel involvement

7. I/O REDIRECTION
   Before fork/exec, bash calls:
   open("output.log", O_WRONLY|O_CREAT, 0644) → fd=3
   dup2(3, 1)  → stdout now points to output.log
   close(3)    → close the original fd
   Child inherits fd 1 = output.log

8. PIPE CREATION
   For: cmd1 | cmd2
   Kernel creates a pipe:
     int pipefd[2];
     pipe(pipefd);  → pipefd[0]=read end, pipefd[1]=write end
   cmd1's stdout → pipefd[1]
   cmd2's stdin  → pipefd[0]
   Both commands run concurrently

9. WAIT AND EXIT CODE
   Parent bash calls wait(&amp;status) for each child
   WIFEXITED(status) → did it exit normally?
   WEXITSTATUS(status) → what was the exit code?
   Stored in $? for the script to check

10. SCRIPT COMPLETION
    Script's bash process exits with exit N or reaches end of file
    Kernel frees memory, closes file descriptors
    Parent bash (your terminal) unblocks from wait()
    $? in your terminal now holds the script's exit code
</pre>
</div>

<!-- Process tree SVG -->
<div class="diagram-wrap">
<svg viewBox="0 0 820 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:20px auto;">
  <rect width="820" height="200" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">Process Tree — Running a Script with Pipes and Background Jobs</text>

  <!-- Terminal / parent shell -->
  <rect x="20" y="38" width="160" height="50" rx="7" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.5"/>
  <text x="100" y="58" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#3fb950">bash (PID 1000)</text>
  <text x="100" y="75" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">your terminal</text>

  <!-- Script process -->
  <rect x="220" y="38" width="170" height="50" rx="7" fill="#1a1a3a" stroke="#bc8cff" stroke-width="1.5"/>
  <text x="305" y="58" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#bc8cff">bash (PID 1042)</text>
  <text x="305" y="75" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">pipeline.sh</text>

  <!-- fork arrow -->
  <line x1="182" y1="63" x2="218" y2="63" stroke="#3fb950" stroke-width="1.5" marker-end="url(#arr-g)"/>
  <text x="200" y="55" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">fork()</text>

  <!-- python3 child -->
  <rect x="430" y="30" width="150" height="40" rx="6" fill="#161b22" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="505" y="48" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#58a6ff">python3 (1043)</text>
  <text x="505" y="64" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#8b949e">load.py</text>

  <!-- grep child -->
  <rect x="430" y="82" width="150" height="40" rx="6" fill="#161b22" stroke="#ffa657" stroke-width="1.5"/>
  <text x="505" y="100" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#ffa657">grep (1044)</text>
  <text x="505" y="116" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#8b949e">pipe: stdout→stdin</text>

  <!-- background job -->
  <rect x="430" y="134" width="150" height="40" rx="6" fill="#161b22" stroke="#f85149" stroke-width="1.5" stroke-dasharray="4,2"/>
  <text x="505" y="152" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#f85149">curl (1045) &amp;</text>
  <text x="505" y="168" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#8b949e">background job</text>

  <!-- fork arrows from script -->
  <line x1="392" y1="52" x2="428" y2="50" stroke="#bc8cff" stroke-width="1.2" marker-end="url(#arr-b)"/>
  <line x1="392" y1="63" x2="428" y2="102" stroke="#bc8cff" stroke-width="1.2" marker-end="url(#arr-b)"/>
  <line x1="392" y1="74" x2="428" y2="154" stroke="#bc8cff" stroke-width="1.2" stroke-dasharray="3,2" marker-end="url(#arr-b)"/>

  <!-- wait labels -->
  <text x="610" y="50" font-family="'Segoe UI',sans-serif" font-size="10" fill="#3fb950">← wait() blocks script</text>
  <text x="610" y="102" font-family="'Segoe UI',sans-serif" font-size="10" fill="#3fb950">← wait() pipe complete</text>
  <text x="610" y="154" font-family="'Segoe UI',sans-serif" font-size="10" fill="#f85149">← no wait (background)</text>

  <text x="410" y="190" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">fork() = copy process | exec() = replace with new program | wait() = collect exit code</text>
</svg>
</div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 16 — REAL-WORLD SCRIPT PATTERNS
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Real-World Script Patterns — Data Engineering</h2>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Production Data Engineering Shell Scripts</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ PATTERN 1: DAILY DATA LOAD SCRIPT ══════════════════════</span>
<span class="cb-out">#!/usr/bin/env bash</span>
<span class="cb-out">set -euo pipefail</span>
<span class="cb-out">readonly DATE="\${1:-$(date +%Y-%m-%d)}"</span>
<span class="cb-out">readonly DATA_DIR="/data/raw/\${DATE}"</span>
<span class="cb-out">readonly LOG="/var/log/daily_load_\${DATE}.log"</span>
<span class="cb-out">log() { echo "[$(date '+%T')] $*" | tee -a "$LOG"; }</span>
<span class="cb-out">trap 'log "Script failed at line $LINENO"' ERR</span>
<span class="cb-out"></span>
<span class="cb-out">log "Starting load for $DATE"</span>
<span class="cb-out">mkdir -p "$DATA_DIR"</span>
<span class="cb-out">aws s3 sync "s3://my-bucket/\${DATE}/" "\${DATA_DIR}/"</span>
<span class="cb-out">ROWS=$(wc -l &lt; "\${DATA_DIR}/sales.csv")</span>
<span class="cb-out">(( ROWS > 100 )) || { log "ERROR: Only $ROWS rows!"; exit 1; }</span>
<span class="cb-out">python3 /opt/pipelines/load.py "\${DATA_DIR}/sales.csv"</span>
<span class="cb-out">log "Done. Loaded $ROWS rows."</span>

<span class="cb-cmt">## ═══ PATTERN 2: WAIT FOR DEPENDENCY ═════════════════════════</span>
wait_for_file() {
    local FILE="$1"
    local MAX_WAIT="\${2:-300}"      <span class="cb-cmt"># default 5 min</span>
    local INTERVAL="\${3:-10}"       <span class="cb-cmt"># check every 10s</span>
    local ELAPSED=0

    while [[ ! -f "$FILE" ]]; do
        (( ELAPSED >= MAX_WAIT )) &amp;&amp; { echo "Timeout waiting for $FILE"; return 1; }
        echo "Waiting for $FILE (\${ELAPSED}s)..."
        sleep "$INTERVAL"
        (( ELAPSED += INTERVAL ))
    done
    echo "File ready: $FILE"
}

wait_for_file "/data/source/input_$(date +%Y%m%d).csv"

<span class="cb-cmt">## ═══ PATTERN 3: RETRY LOGIC ══════════════════════════════════</span>
retry() {
    local MAX="$1"; shift
    local DELAY="\${1:-5}"; shift
    local CMD="$@"
    local ATTEMPT=1

    while (( ATTEMPT &lt;= MAX )); do
        echo "Attempt $ATTEMPT/$MAX: $CMD"
        "$@" &amp;&amp; return 0
        echo "Failed. Retrying in \${DELAY}s..."
        sleep "$DELAY"
        (( ATTEMPT++ ))
    done
    echo "All $MAX attempts failed"
    return 1
}

retry 3 10 curl -s https://api.example.com/data -o output.json
retry 5 30 python3 fragile_pipeline.py

<span class="cb-cmt">## ═══ PATTERN 4: LOCK FILE (prevent duplicate runs) ══════════</span>
LOCKFILE="/tmp/$(basename "$0").lock"
exec 200&gt;"$LOCKFILE"
flock -n 200 || { echo "Already running!"; exit 1; }
echo $$ >&amp;200
trap 'rm -f "$LOCKFILE"' EXIT
echo "Got lock. Running..."

<span class="cb-cmt">## ═══ PATTERN 5: SEND NOTIFICATION ON COMPLETION ════════════</span>
notify() {
    local STATUS="$1" MSG="$2"
    local ICON="$([[ $STATUS == success ]] &amp;&amp; echo ✅ || echo ❌)"
    curl -s -X POST "\${SLACK_WEBHOOK}" \
        -H "Content-type: application/json" \
        --data "{\"text\":\"$ICON $MSG\"}" &gt;/dev/null
}

trap 'notify failure "Pipeline FAILED at line $LINENO"' ERR
# ... pipeline code ...
notify success "Pipeline completed: $ROWS rows loaded"
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 17 — COMPLETE FLAG & SYNTAX REFERENCE
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Complete Reference — All Bash Special Syntax</h2>

<div class="table-wrap">
<table class="ref-table">
<thead><tr><th style="width:28%">Syntax</th><th>Meaning</th><th>Example</th></tr></thead>
<tbody>
<tr><td style="font-family:monospace;color:#3fb950;">\${var}</td><td>Variable expansion (explicit)</td><td><code>\${NAME}Script</code></td></tr>
<tr><td style="font-family:monospace;color:#3fb950;">\${var:-default}</td><td>Use default if unset/empty</td><td><code>\${LOG:-INFO}</code></td></tr>
<tr><td style="font-family:monospace;color:#3fb950;">\${var:=default}</td><td>Set &amp; use default if unset</td><td><code>\${PORT:=5432}</code></td></tr>
<tr><td style="font-family:monospace;color:#3fb950;">\${var:?error}</td><td>Exit with error if unset</td><td><code>\${DB:?DB required}</code></td></tr>
<tr><td style="font-family:monospace;color:#3fb950;">\${var:+alt}</td><td>Use alt if var IS set</td><td><code>\${DEBUG:+--verbose}</code></td></tr>
<tr><td style="font-family:monospace;color:#3fb950;">\${#var}</td><td>String length</td><td><code>\${#NAME}</code></td></tr>
<tr><td style="font-family:monospace;color:#3fb950;">\${var^^}</td><td>UPPERCASE</td><td><code>\${env^^}</code></td></tr>
<tr><td style="font-family:monospace;color:#3fb950;">\${var,,}</td><td>lowercase</td><td><code>\${ENV,,}</code></td></tr>
<tr><td style="font-family:monospace;color:#3fb950;">\${var:N:L}</td><td>Substring from N, length L</td><td><code>\${DATE:0:4}</code></td></tr>
<tr><td style="font-family:monospace;color:#3fb950;">\${var#pat}</td><td>Remove shortest prefix match</td><td><code>\${FILE#*/}</code></td></tr>
<tr><td style="font-family:monospace;color:#3fb950;">\${var##pat}</td><td>Remove longest prefix match</td><td><code>\${FILE##*/}</code></td></tr>
<tr><td style="font-family:monospace;color:#3fb950;">\${var%pat}</td><td>Remove shortest suffix match</td><td><code>\${FILE%.csv}</code></td></tr>
<tr><td style="font-family:monospace;color:#3fb950;">\${var%%pat}</td><td>Remove longest suffix match</td><td><code>\${FILE%%.*}</code></td></tr>
<tr><td style="font-family:monospace;color:#3fb950;">\${var/pat/rep}</td><td>Replace first match</td><td><code>\${URL/http/https}</code></td></tr>
<tr><td style="font-family:monospace;color:#3fb950;">\${var//pat/rep}</td><td>Replace all matches</td><td><code>\${STR// /_}</code></td></tr>
<tr><td style="font-family:monospace;color:#bc8cff;">$(command)</td><td>Command substitution</td><td><code>DATE=$(date +%F)</code></td></tr>
<tr><td style="font-family:monospace;color:#bc8cff;">$((expr))</td><td>Arithmetic expansion</td><td><code>$((A+B*2))</code></td></tr>
<tr><td style="font-family:monospace;color:#bc8cff;">((expr))</td><td>Arithmetic evaluation (no $)</td><td><code>((COUNT++))</code></td></tr>
<tr><td style="font-family:monospace;color:#bc8cff;">[[ cond ]]</td><td>Conditional test (bash)</td><td><code>[[ -f "$F" ]]</code></td></tr>
<tr><td style="font-family:monospace;color:#58a6ff;">&lt;(cmd)</td><td>Process substitution (read)</td><td><code>diff &lt;(sort a) &lt;(sort b)</code></td></tr>
<tr><td style="font-family:monospace;color:#58a6ff;">&gt;(cmd)</td><td>Process substitution (write)</td><td><code>tee &gt;(gzip&gt;log.gz)</code></td></tr>
<tr><td style="font-family:monospace;color:#58a6ff;">&lt;&lt;&lt; str</td><td>Here-string</td><td><code>grep x &lt;&lt;&lt; "$VAR"</code></td></tr>
<tr><td style="font-family:monospace;color:#ffa657;">\${array[@]}</td><td>All array elements</td><td><code>for x in "\${A[@]}"</code></td></tr>
<tr><td style="font-family:monospace;color:#ffa657;">\${!array[@]}</td><td>All array indices/keys</td><td><code>for i in "\${!A[@]}"</code></td></tr>
<tr><td style="font-family:monospace;color:#ffa657;">\${#array[@]}</td><td>Array length</td><td><code>\${#FILES[@]}</code></td></tr>
</tbody>
</table>
</div>

<div class="table-wrap" style="margin-top:16px;">
<table class="ref-table">
<thead><tr><th style="width:22%">Special Variable</th><th>Meaning</th></tr></thead>
<tbody>
<tr><td style="font-family:monospace;color:#3fb950;">$0</td><td>Script name / path</td></tr>
<tr><td style="font-family:monospace;color:#3fb950;">$1 .. $9</td><td>Positional parameters (script arguments)</td></tr>
<tr><td style="font-family:monospace;color:#3fb950;">\${10} \${11}</td><td>Positional parameters beyond 9 (need braces)</td></tr>
<tr><td style="font-family:monospace;color:#3fb950;">$@</td><td>All positional params as separate strings — always use this</td></tr>
<tr><td style="font-family:monospace;color:#3fb950;">$*</td><td>All positional params as one string — avoid (loses quoting)</td></tr>
<tr><td style="font-family:monospace;color:#3fb950;">$#</td><td>Number of positional parameters</td></tr>
<tr><td style="font-family:monospace;color:#58a6ff;">$?</td><td>Exit status of last command (0=success)</td></tr>
<tr><td style="font-family:monospace;color:#58a6ff;">$$</td><td>PID of current shell</td></tr>
<tr><td style="font-family:monospace;color:#58a6ff;">$!</td><td>PID of last background job</td></tr>
<tr><td style="font-family:monospace;color:#58a6ff;">$_</td><td>Last argument of previous command</td></tr>
<tr><td style="font-family:monospace;color:#bc8cff;">$LINENO</td><td>Current line number in script</td></tr>
<tr><td style="font-family:monospace;color:#bc8cff;">$FUNCNAME</td><td>Current function name (array of call stack)</td></tr>
<tr><td style="font-family:monospace;color:#bc8cff;">$BASH_SOURCE</td><td>Array of source file names in call stack</td></tr>
<tr><td style="font-family:monospace;color:#bc8cff;">$SECONDS</td><td>Seconds since shell started (use for timing)</td></tr>
<tr><td style="font-family:monospace;color:#bc8cff;">$RANDOM</td><td>Random integer 0–32767 on each access</td></tr>
<tr><td style="font-family:monospace;color:#ffa657;">$IFS</td><td>Internal Field Separator (space+tab+newline by default)</td></tr>
<tr><td style="font-family:monospace;color:#ffa657;">$PATH</td><td>Colon-separated list of directories to search for commands</td></tr>
<tr><td style="font-family:monospace;color:#ffa657;">$HOME</td><td>Current user's home directory</td></tr>
<tr><td style="font-family:monospace;color:#ffa657;">$PWD</td><td>Current working directory (same as pwd command)</td></tr>
<tr><td style="font-family:monospace;color:#ffa657;">$OLDPWD</td><td>Previous directory (what cd - goes back to)</td></tr>
</tbody>
</table>
</div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 18 — SHELLCHECK & BEST PRACTICES
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> ShellCheck &amp; Best Practices — Write Professional Scripts</h2>

<div class="two-col-grid">
  <div class="card info-card">
    <div class="type-badge badge-info">✅ ALWAYS DO THIS</div>
    <ul style="color:#e6edf3;padding-left:18px;line-height:2.4;font-size:13px;margin-top:8px;">
      <li>Start with <code>#!/usr/bin/env bash</code></li>
      <li>Use <code>set -euo pipefail</code> on every script</li>
      <li>Double-quote all variables: <code>"$var"</code></li>
      <li>Use <code>local</code> for all function variables</li>
      <li>Use <code>[[ ]]</code> not <code>[ ]</code> for tests</li>
      <li>Use <code>$()</code> not backticks for subshells</li>
      <li>Use <code>trap</code> for cleanup on exit</li>
      <li>Check <code>$?</code> after critical commands</li>
      <li>Use <code>shellcheck</code> before every commit</li>
      <li>Use <code>readonly</code> for constants</li>
    </ul>
  </div>
  <div class="card hard-card">
    <div class="type-badge badge-warn">❌ NEVER DO THIS</div>
    <ul style="color:#e6edf3;padding-left:18px;line-height:2.4;font-size:13px;margin-top:8px;">
      <li>Parse <code>ls</code> output (<code>for f in $(ls)</code> — breaks with spaces)</li>
      <li>Use <code>$*</code> (loses quoting — use <code>"$@"</code>)</li>
      <li>Use unquoted variables with spaces</li>
      <li>Use <code>[ ]</code> with <code>==</code> (use <code>=</code> in POSIX)</li>
      <li>Use backticks <code>\` \`</code> (use <code>$()</code> instead)</li>
      <li>Compare numbers with <code>==</code> in <code>[ ]</code> (use <code>-eq</code>)</li>
      <li>Use <code>echo</code> for variables with special chars (use <code>printf</code>)</li>
      <li>Store passwords in scripts (use env vars or vaults)</li>
      <li>Use <code>cat file | grep pattern</code> (use <code>grep pattern file</code>)</li>
    </ul>
  </div>
</div>

<div class="console-block" style="margin-top:20px;">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">ShellCheck — Find Bugs Before They Bite</span></div>
<div class="console-body"><pre>
<span class="cb-prompt">$</span> <span class="cb-cmd">sudo apt install</span> shellcheck       <span class="cb-cmt"># install</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">shellcheck</span> pipeline.sh            <span class="cb-cmt"># check a script</span>
<span class="cb-out"></span>
<span class="cb-out">In pipeline.sh line 12:</span>
<span class="cb-out">for file in $(ls *.csv); do</span>
<span class="cb-out">            ^-- SC2045: Iterating over ls output is fragile.</span>
<span class="cb-out">                        Use globs instead: for file in *.csv</span>
<span class="cb-out"></span>
<span class="cb-out">In pipeline.sh line 18:</span>
<span class="cb-out">if [ $COUNT == 0 ]; then</span>
<span class="cb-out">        ^-- SC2086: Double quote to prevent word splitting.</span>
<span class="cb-out">                ^-- SC2039: Use 'POSIX sh' compatible operator: =</span>
<span class="cb-out"></span>
<span class="cb-out">In pipeline.sh line 24:</span>
<span class="cb-out">RESULT=\`grep -c error $LOG\`</span>
<span class="cb-out">        ^-- SC2006: Use $(...) instead of legacy backtick \`cmd\`.</span>
<span class="cb-cmt"># Fix ALL these. Then re-run shellcheck until clean.</span>

<span class="cb-prompt">$</span> <span class="cb-cmd">shellcheck</span> <span class="cb-flag">-e SC2034</span> pipeline.sh  <span class="cb-cmt"># exclude specific check</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">shellcheck</span> <span class="cb-flag">-s sh</span> pipeline.sh      <span class="cb-cmt"># check for POSIX sh compatibility</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">shellcheck</span> <span class="cb-flag">-f json</span> pipeline.sh    <span class="cb-cmt"># JSON output (for CI integration)</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 19 — COMPLETE EXERCISES
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Practice Exercises with Solutions</h2>

<div class="exercise-panel easy">
  <div class="ex-badge easy-badge">Easy</div>
  <div class="ex-body">
    <h4>Exercise 1 — Your First Data Script</h4>
    <p>Write a script <code>file_info.sh</code> that takes a filename as argument and prints:</p>
    <ul style="color:#8b949e;font-size:13px;line-height:2;padding-left:20px;">
      <li>Whether the file exists (and exit with error if not)</li>
      <li>File size in bytes and KB</li>
      <li>Number of lines</li>
      <li>First and last line</li>
      <li>Date modified</li>
    </ul>
    <pre style="background:#161b22;padding:12px;border-radius:6px;font-family:monospace;font-size:12px;color:#e6edf3;margin:10px 0;">#!/usr/bin/env bash
set -euo pipefail
FILE="\${1:?Usage: $0 FILENAME}"
[[ -f "$FILE" ]] || { echo "Not found: $FILE"; exit 1; }
SIZE=$(wc -c &lt; "$FILE")
LINES=$(wc -l &lt; "$FILE")
echo "File:     $FILE"
echo "Size:     \${SIZE} bytes / $(( SIZE / 1024 )) KB"
echo "Lines:    $LINES"
echo "First:    $(head -1 "$FILE")"
echo "Last:     $(tail -1 "$FILE")"
echo "Modified: $(stat --format='%y' "$FILE")"</pre>
    <p><strong>Test:</strong> <code>./file_info.sh /etc/hosts</code></p>
  </div>
</div>

<div class="exercise-panel easy">
  <div class="ex-badge easy-badge">Easy</div>
  <div class="ex-body">
    <h4>Exercise 2 — Variable Manipulation</h4>
    <p>Given a filename like <code>sales_report_2024-01-15_final.csv.gz</code>, write a script that using ONLY bash string operations (no sed/awk) extracts:</p>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>The extension: <code>gz</code></li>
      <li>Without the .gz: <code>sales_report_2024-01-15_final.csv</code></li>
      <li>The date portion: <code>2024-01-15</code></li>
      <li>The basename without any extension: <code>sales_report_2024-01-15_final</code></li>
      <li>The year: <code>2024</code></li>
      <li>Convert to uppercase: <code>SALES_REPORT_2024-01-15_FINAL.CSV.GZ</code></li>
    </ol>
    <p><strong>Hint:</strong> Use <code>\${var%.*}</code>, <code>\${var##*.}</code>, <code>\${var:N:L}</code>, <code>\${var^^}</code></p>
  </div>
</div>

<div class="exercise-panel medium">
  <div class="ex-badge medium-badge">Medium</div>
  <div class="ex-body">
    <h4>Exercise 3 — CSV Processor</h4>
    <p>Write <code>process_csv.sh</code> that:</p>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Accepts: <code>-i INPUT -o OUTPUT [-d DELIMITER]</code> flags with getopts</li>
      <li>Validates: input exists, output directory exists (create if not), delimiter defaults to comma</li>
      <li>Reads the CSV line by line, splits into fields using IFS</li>
      <li>Skips header line</li>
      <li>For each data row: prints row number, field count, first and last field</li>
      <li>At the end: prints total rows processed</li>
      <li>Uses a function for each step (validate_args, process_row, summarize)</li>
      <li>Has a trap that logs "Script ended" with exit code on EXIT</li>
    </ol>
  </div>
</div>

<div class="exercise-panel medium">
  <div class="ex-badge medium-badge">Medium</div>
  <div class="ex-body">
    <h4>Exercise 4 — Server Health Check</h4>
    <p>Write <code>health_check.sh</code> that:</p>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Reads a list of servers from <code>servers.txt</code></li>
      <li>For each server, checks: ping reachable, port 22 open (nc -z), disk usage &lt; 90%</li>
      <li>Stores results in an associative array: <code>\${STATUS[server]}</code></li>
      <li>Runs checks in parallel (background &amp;) then waits</li>
      <li>Generates a summary report with pass/fail for each server</li>
      <li>Exits with code 1 if ANY server is unhealthy</li>
      <li>Has retry logic (3 attempts) for ping checks before marking as DOWN</li>
    </ol>
  </div>
</div>

<div class="exercise-panel hard">
  <div class="ex-badge hard-badge">Hard</div>
  <div class="ex-body">
    <h4>Exercise 5 — Production ETL Pipeline Script</h4>
    <p>Write the complete <code>weekend_load.sh</code> from Ravi's story with these features:</p>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li><strong>Strict mode:</strong> <code>set -euo pipefail</code>, custom PS4, full logging to file</li>
      <li><strong>Arguments:</strong> <code>-d DATE -e ENV -v (verbose) -h (help)</code> via getopts</li>
      <li><strong>Lock file:</strong> prevent duplicate runs</li>
      <li><strong>Steps:</strong> download → decompress → validate rowcount → transform → load → archive</li>
      <li><strong>Retry logic:</strong> wrap download in retry function (3 attempts)</li>
      <li><strong>Validation:</strong> check row count &gt; threshold, check for required columns in header</li>
      <li><strong>Parallel processing:</strong> process multiple region files in parallel</li>
      <li><strong>Trap:</strong> cleanup temp files and send failure notification on ERR/EXIT</li>
      <li><strong>Timing:</strong> log elapsed time for each step and total</li>
      <li><strong>Exit codes:</strong> meaningful codes (2=bad args, 3=download fail, 4=validation fail, 5=load fail)</li>
    </ol>
    <p><strong>The script should be usable on a real production server without modification.</strong></p>
  </div>
</div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 20 — WRAP-UP STORY
══════════════════════════════════════════════════════ -->
<!-- Wrap-up story -->
<div class="story-panel" style="margin-top:32px;">
  <div class="story-avatar">🧑‍💻</div>
  <div class="story-body">
    <div class="story-title">Ravi's Script Library — Day 180</div>
    <p>Six months after writing his first script, Ravi had a <code>~/scripts/</code> directory with 47 files. Each one was a solution to a real problem — a script to validate incoming data files, one to archive old logs, one to check server health across 12 nodes, one to generate weekly reports automatically.</p>
    <p>He never went back to running commands manually. When his manager asked him to set up a monitoring dashboard, he wrote a script. When the DevOps team needed to deploy configs to 30 servers, he wrote a script. When the data team needed to process 500 CSVs overnight, he wrote a script.</p>
    <p>The key insight Ravi shared with his team: <strong>"A shell script is documentation that runs."</strong> Every script says exactly what steps you're doing, in what order, with what checks. It's reproducible, auditable, and shareable. The 2 hours you spend writing a script saves 200 hours of manual work and eliminates human error entirely.</p>
    <p>That's the power of shell programming. Not just automation — <em>precision</em>.</p>
  </div>
</div>

</div><!-- /section-block -->
`
};