
var shellIO = {
  title: "Input, Output & Pipes",
  description: "Master every aspect of shell I/O — file descriptors, redirection, heredocs, pipes, tee, process substitution, named pipes, and xargs. The plumbing that connects every command in a data pipeline.",
  content: `

<!-- ══════════════════════════════════════════════════════
     RAVI'S STORY — HOOK
══════════════════════════════════════════════════════ -->
<div class="story-panel">
  <div class="story-avatar">🧑‍💻</div>
  <div class="story-body">
    <div class="story-title">Ravi's Log File Mystery — Day 115</div>
    <br>
    <p>Ravi's pipeline script was running fine in his terminal — he could see all the output. But when it ran from cron at 2 AM, something failed silently. No logs. No error messages. Just a half-processed file and no clue what went wrong.</p>
    <br>
    <p>He asked Priya. She looked at his cron entry: <code>0 2 * * * ./pipeline.sh</code>. "Where did you tell it to write output?" Ravi blinked. "It… goes to the terminal?" Priya shook her head. "Cron has no terminal. Your stdout went nowhere. Your errors went nowhere. Your script ran blind."</p>
    <br>
    <p>She added four characters to his cron job: <code>&gt;&gt; /var/log/pipeline.log 2&gt;&amp;1</code>. Suddenly his logs appeared. "Everything in Linux is a stream," she said. "stdin, stdout, stderr — three streams every program has. Redirection controls where those streams flow. Once you understand file descriptors, you understand how every program communicates."</p>
    <br>
    <p>This module teaches exactly that — from the basic <code>&gt;</code> to named pipes, process substitution, and the kernel internals that make it all work.</p>
  </div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 1 — FILE DESCRIPTORS: THE FOUNDATION
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> File Descriptors — The Foundation of All I/O</h2>

<p>Every program in Linux communicates through <strong>file descriptors (fds)</strong> — small integers that represent open files, pipes, sockets, or devices. When your shell starts, it inherits three standard file descriptors automatically.</p>

<!-- FD table SVG -->
<div class="diagram-wrap">
<svg viewBox="0 0 820 280" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto;">
  <defs>
    <marker id="arr-g" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#3fb950"/></marker>
    <marker id="arr-r" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#f85149"/></marker>
    <marker id="arr-b" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#58a6ff"/></marker>
    <marker id="arr-y" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#ffa657"/></marker>
    <marker id="arr-p" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#bc8cff"/></marker>
  </defs>
  <rect width="820" height="280" fill="#0d1117" rx="12"/>
  <text x="410" y="24" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="13" font-weight="bold" fill="#8b949e">Standard File Descriptors — Every Process Starts With Three</text>

  <!-- Process box -->
  <rect x="270" y="40" width="280" height="200" rx="10" fill="#161b22" stroke="#30363d" stroke-width="1.5"/>
  <text x="410" y="62" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#e6edf3">Your Program</text>
  <text x="410" y="78" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">(bash, python3, grep, etc.)</text>

  <!-- FD table inside process -->
  <rect x="290" y="90" width="240" height="30" rx="4" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.5"/>
  <text x="350" y="110" font-family="'Courier New',monospace" font-size="12" fill="#3fb950">fd 0</text>
  <text x="420" y="110" font-family="'Segoe UI',sans-serif" font-size="11" fill="#3fb950">stdin</text>

  <rect x="290" y="128" width="240" height="30" rx="4" fill="#0e1824" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="350" y="148" font-family="'Courier New',monospace" font-size="12" fill="#58a6ff">fd 1</text>
  <text x="420" y="148" font-family="'Segoe UI',sans-serif" font-size="11" fill="#58a6ff">stdout</text>

  <rect x="290" y="166" width="240" height="30" rx="4" fill="#2a1a1a" stroke="#f85149" stroke-width="1.5"/>
  <text x="350" y="186" font-family="'Courier New',monospace" font-size="12" fill="#f85149">fd 2</text>
  <text x="420" y="186" font-family="'Segoe UI',sans-serif" font-size="11" fill="#f85149">stderr</text>

  <text x="410" y="228" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">fd 3+ = opened by program</text>

  <!-- Keyboard → stdin -->
  <rect x="30" y="90" width="130" height="30" rx="6" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.5"/>
  <text x="95" y="110" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" fill="#3fb950">⌨ Keyboard / file</text>
  <line x1="162" y1="105" x2="288" y2="105" stroke="#3fb950" stroke-width="2" marker-end="url(#arr-g)"/>
  <text x="225" y="98" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">read(fd 0, ...)</text>

  <!-- stdout → Terminal -->
  <rect x="556" y="90" width="130" height="30" rx="6" fill="#0e1824" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="621" y="110" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" fill="#58a6ff">🖥 Terminal screen</text>
  <line x1="532" y1="143" x2="554" y2="143" stroke="#58a6ff" stroke-width="2" marker-end="url(#arr-b)"/>
  <text x="543" y="136" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#58a6ff">write(fd 1, ...)</text>

  <!-- stderr → Terminal (red) -->
  <rect x="556" y="166" width="130" height="30" rx="6" fill="#2a1a1a" stroke="#f85149" stroke-width="1.5"/>
  <text x="621" y="186" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" fill="#f85149">🖥 Terminal screen</text>
  <line x1="532" y1="181" x2="554" y2="181" stroke="#f85149" stroke-width="2" marker-end="url(#arr-r)"/>
  <text x="543" y="175" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#f85149">write(fd 2, ...)</text>

  <!-- Note: stdout and stderr both go to terminal by default -->
  <text x="621" y="213" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">same terminal by default</text>
  <text x="621" y="226" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">redirection changes where</text>

  <!-- Labels -->
  <text x="30" y="148" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">stdin  = standard</text>
  <text x="30" y="162" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">input (fd 0)</text>
  <text x="30" y="186" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">stdout = standard</text>
  <text x="30" y="200" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">output (fd 1)</text>
  <text x="30" y="224" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">stderr = standard</text>
  <text x="30" y="238" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">error (fd 2)</text>

  <text x="410" y="265" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#30363d">Redirection changes which file/device/pipe an fd points to — the program doesn't need to know</text>
</svg>
</div>

<div class="table-wrap">
<table class="ref-table">
<thead><tr><th>fd</th><th>Name</th><th>Default</th><th>C constant</th><th>Bash symbol</th><th>Purpose</th></tr></thead>
<tbody>
<tr>
  <td style="font-family:monospace;color:#3fb950;">0</td>
  <td style="color:#3fb950;">stdin</td>
  <td>keyboard / terminal</td>
  <td><code>STDIN_FILENO</code></td>
  <td><code>&lt;</code></td>
  <td>Program reads input from here</td>
</tr>
<tr>
  <td style="font-family:monospace;color:#58a6ff;">1</td>
  <td style="color:#58a6ff;">stdout</td>
  <td>terminal screen</td>
  <td><code>STDOUT_FILENO</code></td>
  <td><code>&gt;</code> or <code>1&gt;</code></td>
  <td>Normal program output goes here</td>
</tr>
<tr>
  <td style="font-family:monospace;color:#f85149;">2</td>
  <td style="color:#f85149;">stderr</td>
  <td>terminal screen</td>
  <td><code>STDERR_FILENO</code></td>
  <td><code>2&gt;</code></td>
  <td>Error messages go here (separate from output!)</td>
</tr>
<tr>
  <td style="font-family:monospace;color:#8b949e;">3–1023</td>
  <td style="color:#8b949e;">other fds</td>
  <td>opened by program</td>
  <td>varies</td>
  <td><code>3&gt;</code>, <code>4&gt;</code>…</td>
  <td>Open files, pipes, sockets, etc.</td>
</tr>
</tbody>
</table>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Inspecting File Descriptors — /proc and lsof</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ─── WHAT FDs DOES YOUR SHELL HAVE? ──────────────────────────</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">ls</span> <span class="cb-flag">-la</span> /proc/self/fd
<span class="cb-out">lr-x------ 1 ravi ravi 64 fd/0 -> /dev/pts/0</span>
<span class="cb-out">lrwx------ 1 ravi ravi 64 fd/1 -> /dev/pts/0</span>
<span class="cb-out">lrwx------ 1 ravi ravi 64 fd/2 -> /dev/pts/0</span>
<span class="cb-cmt"># fd 0, 1, 2 all point to the same terminal (/dev/pts/0)
# That's why stdout and stderr appear in the same place</span>

<span class="cb-cmt">## ─── AFTER REDIRECTING stdout ─────────────────────────────────</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">ls</span> <span class="cb-flag">-la</span> /proc/self/fd > /tmp/out.txt
<span class="cb-cmt"># Inside the ls process, fd/1 now points to /tmp/out.txt:
# fd/0 -> /dev/pts/0     (stdin: still terminal)
# fd/1 -> /tmp/out.txt   (stdout: redirected to file)
# fd/2 -> /dev/pts/0     (stderr: still terminal)</span>

<span class="cb-cmt">## ─── SEE FDs OF A RUNNING PROCESS ────────────────────────────</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">lsof</span> <span class="cb-flag">-p</span> $$
<span class="cb-out">COMMAND   PID  USER   FD   TYPE DEVICE   NODE NAME</span>
<span class="cb-out">bash     4821  ravi  cwd    DIR    8,1    ... /home/ravi</span>
<span class="cb-out">bash     4821  ravi    0u   CHR  136,0    ... /dev/pts/0</span>
<span class="cb-out">bash     4821  ravi    1u   CHR  136,0    ... /dev/pts/0</span>
<span class="cb-out">bash     4821  ravi    2u   CHR  136,0    ... /dev/pts/0</span>
<span class="cb-cmt"># u = read+write, r = read-only, w = write-only</span>

<span class="cb-cmt">## ─── WHY STDOUT AND STDERR ARE SEPARATE ──────────────────────</span>
<span class="cb-prompt">$</span> python3 script.py > output.txt      <span class="cb-cmt"># stdout to file</span>
<span class="cb-cmt"># Normal output → output.txt
# Errors → still show on terminal (stderr not redirected)
# This lets you separate "data" from "error messages"</span>

<span class="cb-prompt">$</span> python3 script.py > output.txt 2> errors.txt
<span class="cb-cmt"># Normal output → output.txt
# Error messages → errors.txt (separate file!)</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 2 — OUTPUT: echo, printf, print to stderr
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Output — <code>echo</code>, <code>printf</code> &amp; Writing to stderr</h2>

<!-- CONSOLE 1 -->
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 1 of 8 — echo, printf, stderr, ANSI Colors</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ echo ════════════════════════════════════════════════════</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">echo</span> "Hello, World!"         <span class="cb-cmt"># print + newline</span>
<span class="cb-out">Hello, World!</span>

<span class="cb-prompt">$</span> <span class="cb-cmd">echo</span> <span class="cb-flag">-n</span> "Enter name: "      <span class="cb-cmt"># -n: NO newline (inline prompt)</span>
<span class="cb-out">Enter name: </span><span class="cb-cmt">← cursor stays here</span>

<span class="cb-prompt">$</span> <span class="cb-cmd">echo</span> <span class="cb-flag">-e</span> "Line1\nLine2\nLine3"  <span class="cb-cmt"># -e: interpret escape sequences</span>
<span class="cb-out">Line1</span>
<span class="cb-out">Line2</span>
<span class="cb-out">Line3</span>

<span class="cb-prompt">$</span> <span class="cb-cmd">echo</span> <span class="cb-flag">-e</span> "Tab:\there"         <span class="cb-cmt"># \t = tab</span>
<span class="cb-out">Tab:	here</span>

<span class="cb-cmt"># echo escape sequences (with -e):
# \n  = newline        \t  = tab
# \r  = carriage ret   \a  = alert/bell
# \b  = backspace      \e  = escape (ESC char)
# \\  = literal \       \0NN = octal char</span>

<span class="cb-cmt">## ═══ printf — MORE RELIABLE THAN echo ═══════════════════════</span>
<span class="cb-cmt"># printf doesn't add newline automatically — you control format</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">printf</span> "Hello, %s!\n" "Ravi"
<span class="cb-out">Hello, Ravi!</span>

<span class="cb-prompt">$</span> <span class="cb-cmd">printf</span> "Name: %-15s Age: %3d\n" "Ravi Kumar" 28
<span class="cb-out">Name: Ravi Kumar      Age:  28</span>
<span class="cb-cmt"># %-15s = left-align string in 15-char field
# %3d   = right-align integer in 3-char field</span>

<span class="cb-prompt">$</span> <span class="cb-cmd">printf</span> "Float: %.2f\n" 3.14159
<span class="cb-out">Float: 3.14</span>

<span class="cb-prompt">$</span> <span class="cb-cmd">printf</span> "Hex: %x  Oct: %o  Sci: %e\n" 255 255 1234.5
<span class="cb-out">Hex: ff  Oct: 377  Sci: 1.234500e+03</span>

<span class="cb-prompt">$</span> <span class="cb-cmd">printf</span> "%s\t%s\t%s\n" "date" "sales" "region"   <span class="cb-cmt"># TSV row</span>
<span class="cb-out">date	sales	region</span>

<span class="cb-cmt"># printf repeats format for multiple args:</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">printf</span> "Item: %s\n" "apple" "banana" "cherry"
<span class="cb-out">Item: apple</span>
<span class="cb-out">Item: banana</span>
<span class="cb-out">Item: cherry</span>

<span class="cb-cmt">## ═══ WRITING TO STDERR ═══════════════════════════════════════</span>
<span class="cb-cmt"># Everything sent to fd 2 = stderr</span>
echo "ERROR: file not found" >&2          <span class="cb-cmt"># >&2 sends to stderr</span>
printf "ERROR: %s\n" "connection failed" >&2

<span class="cb-cmt"># Standard logging functions:</span>
log_info()  { printf "[INFO]  %s %s\n" "$(date '+%T')" "$*"; }
log_warn()  { printf "[WARN]  %s %s\n" "$(date '+%T')" "$*" >&2; }
log_error() { printf "[ERROR] %s %s\n" "$(date '+%T')" "$*" >&2; }

log_info "Pipeline started"
log_warn "Row count low: 42"
log_error "DB connection failed"
<span class="cb-out">[INFO]  10:30:01 Pipeline started</span>
<span class="cb-out">[WARN]  10:30:02 Row count low: 42    ← goes to stderr</span>
<span class="cb-out">[ERROR] 10:30:03 DB connection failed ← goes to stderr</span>

<span class="cb-cmt">## ═══ ANSI COLOUR CODES ═══════════════════════════════════════</span>
<span class="cb-cmt"># \e[ = escape sequence start  m = end of colour code</span>
RED='\e[31m';  GREEN='\e[32m'; YELLOW='\e[33m'
BLUE='\e[34m'; BOLD='\e[1m';   RESET='\e[0m'

printf "\${GREEN}✅ SUCCESS\${RESET}: Pipeline complete\n"
printf "\${RED}❌ ERROR\${RESET}: Connection failed\n"
printf "\${YELLOW}⚠  WARN\${RESET}: Low disk space\n"
printf "\${BOLD}\${BLUE}INFO\${RESET}: Starting job\n"

<span class="cb-cmt"># Full colour reference:
# Foreground: 30=black 31=red 32=green 33=yellow
#             34=blue  35=magenta 36=cyan 37=white
# Add 60 for bright: 91=bright red, 92=bright green
# Background: 40-47 (add 60 for bright: 100-107)
# Attributes: 0=reset 1=bold 2=dim 3=italic 4=underline 7=reverse</span>

<span class="cb-cmt">## ═══ printf FORMAT SPECIFIERS REFERENCE ══════════════════════</span>
<span class="cb-cmt"># %s  = string          %d  = decimal integer
# %i  = integer         %u  = unsigned integer
# %f  = float           %e  = scientific notation
# %g  = shorter of f/e  %x  = hex lowercase
# %X  = hex uppercase   %o  = octal
# %c  = single char     %b  = interpret backslashes (like echo -e)
# %%  = literal %
#
# Width/precision:
# %10s   = right-pad to 10 chars
# %-10s  = left-pad to 10 chars
# %010d  = zero-pad integer to 10 digits
# %.2f   = 2 decimal places
# %8.2f  = 8 total width, 2 decimal places</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 3 — INPUT: read
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Input — The <code>read</code> Builtin</h2>

<!-- CONSOLE 2 -->
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 2 of 8 — read: All Flags, Patterns &amp; File Line-by-Line</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ BASIC read ═════════════════════════════════════════════</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">read</span> NAME                    <span class="cb-cmt"># wait for input, store in NAME</span>
<span class="cb-out">Ravi Kumar</span>                      <span class="cb-cmt">← user types this</span>
<span class="cb-prompt">$</span> echo "Hello, $NAME"
<span class="cb-out">Hello, Ravi Kumar</span>

<span class="cb-cmt">## ═══ read FLAGS ═════════════════════════════════════════════</span>
<span class="cb-prompt">$</span> read <span class="cb-flag">-p</span> "Enter DB host: " DB_HOST
<span class="cb-cmt"># -p: print prompt without newline before waiting</span>

<span class="cb-prompt">$</span> read <span class="cb-flag">-s</span> <span class="cb-flag">-p</span> "Password: " PASSWORD
<span class="cb-cmt"># -s: silent mode — input not echoed (for passwords)</span>
echo ""  <span class="cb-cmt"># print newline after silent input</span>

<span class="cb-prompt">$</span> read <span class="cb-flag">-t 10</span> <span class="cb-flag">-p</span> "Continue? [Y/n]: " ANSWER
<span class="cb-cmt"># -t 10: timeout after 10 seconds (returns exit code 1 on timeout)</span>
if [[ $? -ne 0 ]]; then echo "Timed out — using default"; fi

<span class="cb-prompt">$</span> read <span class="cb-flag">-n 1</span> <span class="cb-flag">-p</span> "Press any key..." KEY
<span class="cb-cmt"># -n 1: read exactly 1 character (no Enter needed)</span>

<span class="cb-prompt">$</span> read <span class="cb-flag">-r</span> LINE
<span class="cb-cmt"># -r: raw mode — backslashes are NOT escape chars (use ALWAYS)</span>
<span class="cb-cmt"># Without -r: "hello\nworld" would be read as "hellonworld"</span>

<span class="cb-prompt">$</span> read <span class="cb-flag">-d ':'</span> FIELD
<span class="cb-cmt"># -d ':': use ':' as delimiter instead of newline</span>
<span class="cb-cmt"># Reads until it sees a colon</span>

<span class="cb-cmt">## ═══ READ MULTIPLE FIELDS AT ONCE ════════════════════════════</span>
<span class="cb-prompt">$</span> read <span class="cb-flag">-r</span> FIRST LAST EMAIL <<< "Ravi Kumar ravi@data.io"
<span class="cb-prompt">$</span> echo "Name: $FIRST $LAST | Email: $EMAIL"
<span class="cb-out">Name: Ravi Kumar | Email: ravi@data.io</span>
<span class="cb-cmt"># read splits on IFS (default: space)
# Last var gets ALL remaining words</span>

<span class="cb-cmt"># Split a colon-delimited line:</span>
<span class="cb-prompt">$</span> IFS=':' read <span class="cb-flag">-r</span> USER PASS UID GID GECOS HOME SHELL <<< "ravi:x:1000:1000:Ravi:/home/ravi:/bin/bash"
<span class="cb-prompt">$</span> echo "User: $USER  Home: $HOME  Shell: $SHELL"
<span class="cb-out">User: ravi  Home: /home/ravi  Shell: /bin/bash</span>

<span class="cb-cmt">## ═══ READ INTO ARRAY ═════════════════════════════════════════</span>
<span class="cb-prompt">$</span> read <span class="cb-flag">-r -a</span> WORDS <<< "one two three four"
<span class="cb-prompt">$</span> echo "\${WORDS[0]} \${WORDS[2]}"
<span class="cb-out">one three</span>
<span class="cb-cmt"># -a: split into indexed array</span>

<span class="cb-cmt"># Split CSV into array:</span>
<span class="cb-prompt">$</span> IFS=',' read <span class="cb-flag">-r -a</span> FIELDS <<< "date,sales,region,qty"
<span class="cb-prompt">$</span> printf "Field: %s\n" "\${FIELDS[@]}"
<span class="cb-out">Field: date</span>
<span class="cb-out">Field: sales</span>
<span class="cb-out">Field: region</span>
<span class="cb-out">Field: qty</span>

<span class="cb-cmt">## ═══ READ FILE LINE BY LINE (canonical pattern) ══════════════</span>
while IFS= read <span class="cb-flag">-r</span> line; do
    echo "Processing: $line"
done < data.csv
<span class="cb-cmt"># IFS=  → preserves leading/trailing whitespace per line
# -r    → backslashes not interpreted
# < data.csv → stdin comes from the file</span>

<span class="cb-cmt"># Read file AND keep variable after loop (pipe would lose scope):</span>
COUNT=0
while IFS= read <span class="cb-flag">-r</span> line; do
    ((COUNT++))
done < data.csv
echo "Lines: $COUNT"    <span class="cb-cmt"># COUNT is accessible! (no subshell)</span>

<span class="cb-cmt"># Process CSV: split each line into fields</span>
while IFS=',' read <span class="cb-flag">-r</span> date sales region; do
    [[ "$date" == "date" ]] && continue    <span class="cb-cmt"># skip header</span>
    echo "$date: $$sales in $region"
done < sales.csv

<span class="cb-cmt">## ═══ READ WITH MAPFILE/readarray ════════════════════════════</span>
mapfile <span class="cb-flag">-t</span> LINES < data.csv        <span class="cb-cmt"># read ALL lines into array</span>
<span class="cb-cmt"># -t: strip trailing newlines</span>
echo "Total lines: \${#LINES[@]}"
echo "Line 3: \${LINES[2]}"

mapfile <span class="cb-flag">-t</span> SERVERS < servers.txt  <span class="cb-cmt"># read server list into array</span>
for server in "\${SERVERS[@]}"; do
    ping -c1 "$server" &>/dev/null && echo "$server: UP" || echo "$server: DOWN"
done
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 4 — REDIRECTION: FULL COVERAGE
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Redirection — Every Form &amp; Operator</h2>

<!-- Redirection map SVG -->
<div class="diagram-wrap">
<svg viewBox="0 0 820 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="200" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">Redirection Operators — What Goes Where</text>

  <!-- cmd box (center) -->
  <rect x="300" y="60" width="220" height="80" rx="8" fill="#161b22" stroke="#30363d" stroke-width="2"/>
  <text x="410" y="95" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="13" font-weight="bold" fill="#e6edf3">cmd</text>
  <text x="410" y="115" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">fd0 fd1 fd2</text>

  <!-- Input arrow (left) -->
  <line x1="155" y1="100" x2="298" y2="100" stroke="#3fb950" stroke-width="2" marker-end="url(#arr-g)"/>
  <rect x="15" y="68" width="138" height="22" rx="4" fill="#1a2a1a"/>
  <text x="84" y="84" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#3fb950">cmd &lt; file</text>
  <rect x="15" y="94" width="138" height="22" rx="4" fill="#1a2a1a"/>
  <text x="84" y="110" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#3fb950">cmd 0&lt; file</text>
  <rect x="15" y="120" width="138" height="22" rx="4" fill="#1a2a1a"/>
  <text x="84" y="136" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#3fb950">cmd &lt;&lt;&lt; "str"</text>
  <text x="84" y="160" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">stdin from file / string</text>

  <!-- stdout arrow (top right) -->
  <line x1="522" y1="88" x2="660" y2="68" stroke="#58a6ff" stroke-width="2" marker-end="url(#arr-b)"/>
  <rect x="662" y="38" width="145" height="22" rx="4" fill="#0e1824"/>
  <text x="734" y="54" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#58a6ff">cmd &gt; file   (overwrite)</text>
  <rect x="662" y="64" width="145" height="22" rx="4" fill="#0e1824"/>
  <text x="734" y="80" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#58a6ff">cmd &gt;&gt; file  (append)</text>
  <text x="734" y="100" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#58a6ff">stdout (fd 1)</text>

  <!-- stderr arrow (bottom right) -->
  <line x1="522" y1="112" x2="660" y2="132" stroke="#f85149" stroke-width="2" marker-end="url(#arr-r)"/>
  <rect x="662" y="118" width="145" height="22" rx="4" fill="#2a1a1a"/>
  <text x="734" y="134" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#f85149">cmd 2&gt; file</text>
  <rect x="662" y="144" width="145" height="22" rx="4" fill="#2a1a1a"/>
  <text x="734" y="160" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#f85149">cmd &amp;&gt; file  (both)</text>
  <text x="734" y="180" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#f85149">stderr (fd 2)</text>
</svg>
</div>

<!-- CONSOLE 3 -->
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 3 of 8 — All Redirection Operators with Examples</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ OUTPUT REDIRECTION ══════════════════════════════════════</span>
cmd > file             <span class="cb-cmt"># redirect stdout → file (OVERWRITE)</span>
cmd >> file            <span class="cb-cmt"># redirect stdout → file (APPEND)</span>
cmd 1> file            <span class="cb-cmt"># same as > (explicit fd 1)</span>
cmd 2> file            <span class="cb-cmt"># redirect stderr → file</span>
cmd 2>> file           <span class="cb-cmt"># redirect stderr → file (append)</span>
cmd &> file            <span class="cb-cmt"># redirect BOTH stdout+stderr → file</span>
cmd &>> file           <span class="cb-cmt"># redirect BOTH → file (append)</span>
cmd > out.txt 2> err.txt        <span class="cb-cmt"># stdout and stderr to separate files</span>
cmd > all.log 2>&1    <span class="cb-cmt"># stderr → stdout → file (order matters!)</span>
cmd 2>&1 > file       <span class="cb-cmt"># WRONG order: stderr→terminal, stdout→file</span>

<span class="cb-cmt">## ─── Why 2>&1 order matters ──────────────────────────────────</span>
<span class="cb-cmt"># cmd > file 2>&1   means:
#   1. fd1 → file          (stdout now goes to file)
#   2. fd2 → fd1 → file    (stderr copies fd1, which is now file)
#   Result: both go to file ✅
#
# cmd 2>&1 > file   means:
#   1. fd2 → fd1 → terminal  (stderr copies fd1, which is terminal)
#   2. fd1 → file             (stdout now goes to file)
#   Result: stdout→file, stderr→terminal ❌ (not what you want)</span>

<span class="cb-cmt">## ═══ INPUT REDIRECTION ════════════════════════════════════════</span>
cmd < file             <span class="cb-cmt"># stdin from file</span>
cmd 0< file            <span class="cb-cmt"># same (explicit fd 0)</span>
wc -l < data.csv       <span class="cb-cmt"># count lines (cat-less, efficient)</span>
sort < unsorted.txt > sorted.txt   <span class="cb-cmt"># input from file, output to file</span>

<span class="cb-cmt">## ═══ DISCARD OUTPUT (/dev/null) ══════════════════════════════</span>
cmd > /dev/null        <span class="cb-cmt"># discard stdout only</span>
cmd 2> /dev/null       <span class="cb-cmt"># discard stderr (suppress error messages)</span>
cmd &> /dev/null       <span class="cb-cmt"># discard ALL output (run silently)</span>
cmd > /dev/null 2>&1  <span class="cb-cmt"># same — discard everything</span>

<span class="cb-cmt"># /dev/null is a special file — anything written to it vanishes
# Any read from it returns EOF immediately</span>

<span class="cb-cmt">## ═══ OPEN CUSTOM FDs ══════════════════════════════════════════</span>
exec 3> output.log     <span class="cb-cmt"># open fd 3 for writing</span>
echo "log message" >&3 <span class="cb-cmt"># write to fd 3</span>
exec 3>&-              <span class="cb-cmt"># close fd 3</span>

exec 4< config.txt     <span class="cb-cmt"># open fd 4 for reading</span>
read -r line <&4       <span class="cb-cmt"># read from fd 4</span>
exec 4<&-              <span class="cb-cmt"># close fd 4</span>

<span class="cb-cmt"># Real-world: open log file once, write to it throughout script</span>
exec 3>> /var/log/pipeline.log   <span class="cb-cmt"># open log fd once</span>
echo "[INFO] Starting..." >&3
python3 step1.py >&3 2>&3        <span class="cb-cmt"># redirect step output to log</span>
python3 step2.py >&3 2>&3
echo "[INFO] Done" >&3
exec 3>&-                        <span class="cb-cmt"># close at end</span>

<span class="cb-cmt">## ═══ REDIRECT stdout AND stderr TO SAME FILE ═════════════════</span>
<span class="cb-cmt"># The three equivalent ways:</span>
cmd > file 2>&1        <span class="cb-cmt"># classic (works in sh too)</span>
cmd &> file            <span class="cb-cmt"># bash shorthand</span>
cmd |& tee file        <span class="cb-cmt"># pipe both to tee (see AND save)</span>

<span class="cb-cmt">## ═══ NOCLOBBER — PROTECT FILES FROM OVERWRITE ════════════════</span>
set -o noclobber       <span class="cb-cmt"># prevent > from overwriting existing files</span>
echo "data" > existing.txt
<span class="cb-out">bash: existing.txt: cannot overwrite existing file</span>
echo "data" >| existing.txt    <span class="cb-cmt"># >| forces overwrite even with noclobber</span>
set +o noclobber       <span class="cb-cmt"># turn off noclobber</span>

<span class="cb-cmt">## ═══ APPEND WITH VERIFICATION ════════════════════════════════</span>
<span class="cb-cmt"># Check file before appending:</span>
LOG=/var/log/pipeline.log
[[ -f "$LOG" ]] || touch "$LOG"
echo "[$(date +%T)] Step 1 done" >> "$LOG"
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 5 — HEREDOC & HERESTRING
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Here-Doc &amp; Here-String — Multi-line Input</h2>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 4 of 8 — Here-Doc, Here-String, All Variants</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ HERE-DOC BASICS ════════════════════════════════════════</span>
<span class="cb-cmt"># Syntax: cmd <<MARKER
#           content
#         MARKER
# MARKER can be any word (EOF, END, YAML, SQL are common)</span>

cat << EOF
Hello, $USER!
Today is $(date +%Y-%m-%d)
Variables ARE expanded (no quotes around EOF)
EOF

<span class="cb-out">Hello, ravi!</span>
<span class="cb-out">Today is 2024-01-15</span>
<span class="cb-out">Variables ARE expanded (no quotes around EOF)</span>

<span class="cb-cmt">## ═══ QUOTED HERE-DOC (no expansion) ════════════════════════</span>
cat << 'EOF'
Hello, $USER!
Today is $(date)
Variables are NOT expanded (single-quoted EOF)
Backslashes \n \t are LITERAL
EOF

<span class="cb-out">Hello, $USER!</span>
<span class="cb-out">Today is $(date)</span>
<span class="cb-out">Variables are NOT expanded (single-quoted EOF)</span>
<span class="cb-cmt"># Use quoted EOF for: template files, scripts within scripts</span>

<span class="cb-cmt">## ═══ INDENTED HERE-DOC (strip leading tabs) ══════════════════</span>
create_config() {
    cat <<- EOF
	# Config file — leading tabs stripped
	host=\${DB_HOST:-localhost}
	port=\${DB_PORT:-5432}
	EOF
    <span class="cb-cmt"># Note: MUST use actual TAB characters for indentation with <<-
    # <<- strips leading TABS only (not spaces)</span>
}
create_config

<span class="cb-cmt">## ═══ HERE-DOC TO FILE ════════════════════════════════════════</span>
cat > /tmp/spark-defaults.conf << EOF
spark.master=local[*]
spark.executor.memory=\${EXECUTOR_MEM:-4g}
spark.driver.memory=\${DRIVER_MEM:-2g}
spark.sql.shuffle.partitions=200
spark.log.level=\${LOG_LEVEL:-INFO}
EOF

<span class="cb-cmt"># With sudo:</span>
sudo tee /etc/myapp/config.yaml << 'EOF'
database:
  host: prod-db.internal
  port: 5432
EOF

<span class="cb-cmt">## ═══ HERE-DOC AS STDIN TO ANY COMMAND ════════════════════════</span>
<span class="cb-cmt"># SSH remote commands:</span>
ssh user@server << 'EOF'
cd /opt/app
git pull origin main
systemctl restart myapp
echo "Deployed on: $(hostname)"
EOF

<span class="cb-cmt"># SQL query to database:</span>
psql -d analytics << SQL
SELECT date, SUM(sales) as total
FROM sales_fact
WHERE date >= '2024-01-01'
GROUP BY date
ORDER BY date;
SQL

<span class="cb-cmt"># Python script inline:</span>
python3 << 'PYTHON'
import sys
import csv
reader = csv.reader(sys.stdin)
for row in reader:
    print(f"Fields: {len(row)}")
PYTHON

<span class="cb-cmt">## ═══ HERE-STRING <<< ═════════════════════════════════════════</span>
<span class="cb-cmt"># Single-line here-doc — passes one string as stdin</span>
<span class="cb-prompt">$</span> grep "error" <<< "this line has an error in it"
<span class="cb-out">this line has an error in it</span>

<span class="cb-prompt">$</span> wc -w <<< "count these words please"
<span class="cb-out">4</span>

<span class="cb-cmt"># Check if string matches pattern:</span>
<span class="cb-prompt">$</span> grep -q "^[0-9]" <<< "$INPUT" && echo "starts with digit"

<span class="cb-cmt"># Parse a single line:</span>
<span class="cb-prompt">$</span> read -r first rest <<< "hello world foo bar"
<span class="cb-prompt">$</span> echo "First: $first | Rest: $rest"
<span class="cb-out">First: hello | Rest: world foo bar</span>

<span class="cb-cmt"># Very useful for variable-based operations without temp files:</span>
<span class="cb-prompt">$</span> sed 's/prod/staging/' <<< "$CONNECTION_STRING"
<span class="cb-prompt">$</span> python3 -c "import json,sys; d=json.load(sys.stdin); print(d['host'])" <<< "$JSON_CONFIG"
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 6 — PIPES
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Pipes — Connecting Commands</h2>

<p>A pipe connects the stdout of one command directly to the stdin of the next — in memory, with no temp file. It is the most powerful composition tool in Unix.</p>

<!-- Pipe architecture SVG -->
<div class="diagram-wrap">
<svg viewBox="0 0 820 180" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="180" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">Pipe Architecture — Commands Run Concurrently, Data Flows in Memory</text>

  <!-- cmd1 -->
  <rect x="20" y="50" width="150" height="80" rx="8" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="95" y="82" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#3fb950">cmd1</text>
  <text x="95" y="98" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">cat data.csv</text>
  <text x="95" y="114" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">writes to fd1</text>

  <!-- Pipe 1 -->
  <rect x="172" y="78" width="90" height="24" rx="4" fill="#1f1f1f" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="217" y="95" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#58a6ff">kernel pipe</text>
  <line x1="172" y1="90" x2="135" y2="90" stroke="#3fb950" stroke-width="1.5" marker-end="url(#arr-g)"/>
  <line x1="264" y1="90" x2="282" y2="90" stroke="#3fb950" stroke-width="1.5"/>

  <!-- cmd2 -->
  <rect x="284" y="50" width="150" height="80" rx="8" fill="#0e1824" stroke="#58a6ff" stroke-width="2"/>
  <text x="359" y="82" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#58a6ff">cmd2</text>
  <text x="359" y="98" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">grep "error"</text>
  <text x="359" y="114" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#58a6ff">reads fd0 → writes fd1</text>

  <!-- Pipe 2 -->
  <rect x="436" y="78" width="90" height="24" rx="4" fill="#1f1f1f" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="481" y="95" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#58a6ff">kernel pipe</text>
  <line x1="436" y1="90" x2="399" y2="90" stroke="#58a6ff" stroke-width="1.5" marker-end="url(#arr-b)"/>
  <line x1="528" y1="90" x2="546" y2="90" stroke="#58a6ff" stroke-width="1.5"/>

  <!-- cmd3 -->
  <rect x="548" y="50" width="150" height="80" rx="8" fill="#2a2a1a" stroke="#ffa657" stroke-width="2"/>
  <text x="623" y="82" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#ffa657">cmd3</text>
  <text x="623" y="98" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">wc -l</text>
  <text x="623" y="114" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">reads fd0, writes fd1</text>

  <!-- Final output -->
  <line x1="700" y1="90" x2="780" y2="90" stroke="#ffa657" stroke-width="2" marker-end="url(#arr-y)"/>
  <text x="785" y="87" font-family="'Courier New',monospace" font-size="11" fill="#ffa657">42</text>
  <text x="770" y="103" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">terminal</text>

  <!-- PIDs label -->
  <text x="95" y="148" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#3fb950">PID 4821</text>
  <text x="359" y="148" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#58a6ff">PID 4822</text>
  <text x="623" y="148" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#ffa657">PID 4823</text>
  <text x="410" y="168" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">All three run CONCURRENTLY — data flows in memory — no temp files needed</text>
</svg>
</div>

<!-- CONSOLE 5 -->
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 5 of 8 — Pipes: Basic, |&amp;, pipefail, subshell scope, Pipeline Patterns</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ BASIC PIPE ═════════════════════════════════════════════</span>
<span class="cb-prompt">$</span> cat data.csv | grep "Mumbai" | wc -l
<span class="cb-out">42</span>
<span class="cb-cmt"># count lines matching "Mumbai"</span>

<span class="cb-prompt">$</span> ls *.log | sort | head -5            <span class="cb-cmt"># 5 oldest log files alphabetically</span>
<span class="cb-prompt">$</span> ps aux | grep python3 | grep -v grep  <span class="cb-cmt"># all Python processes</span>
<span class="cb-prompt">$</span> cat /etc/passwd | cut -d: -f1 | sort  <span class="cb-cmt"># sorted username list</span>
<span class="cb-prompt">$</span> history | awk '{print $2}' | sort | uniq -c | sort -rn | head -10
<span class="cb-cmt"># top 10 most used commands</span>

<span class="cb-cmt">## ═══ |& — PIPE BOTH STDOUT AND STDERR ═══════════════════════</span>
<span class="cb-prompt">$</span> python3 pipeline.py |& grep "ERROR"
<span class="cb-cmt"># |& pipes both stdout and stderr into grep
# Equivalent to: python3 pipeline.py 2>&1 | grep "ERROR"</span>

<span class="cb-cmt">## ═══ PIPESTATUS — EXIT CODE OF EACH COMMAND ══════════════════</span>
<span class="cb-prompt">$</span> cat data.csv | grep "Mumbai" | wc -l
<span class="cb-prompt">$</span> echo "\${PIPESTATUS[@]}"
<span class="cb-out">0 0 0</span>
<span class="cb-cmt"># PIPESTATUS = array of exit codes for each piped command
# 0 = success, non-zero = failure</span>

<span class="cb-prompt">$</span> cat missing.csv | grep "Mumbai" | wc -l
<span class="cb-cmt"># cat fails (no file), but wc still returns 0</span>
<span class="cb-prompt">$</span> echo "\${PIPESTATUS[@]}"
<span class="cb-out">1 1 0</span>
<span class="cb-cmt"># Without pipefail, pipe exit code = last command (0 here!)
# With set -o pipefail: pipe exits with first non-zero code</span>

set -o pipefail    <span class="cb-cmt"># ALWAYS use in production scripts</span>
cat missing.csv | grep "x" | wc -l
echo "Exit: $?"
<span class="cb-out">Exit: 1</span>          <span class="cb-cmt"># now correctly reports failure</span>

<span class="cb-cmt">## ═══ PIPE SCOPE ISSUE — VARIABLES IN SUBSHELL ════════════════</span>
COUNT=0
cat data.csv | while IFS= read -r line; do
    ((COUNT++))                    <span class="cb-cmt"># modifies COUNT in subshell</span>
done
echo "Count: $COUNT"               <span class="cb-cmt"># still 0! pipe runs in subshell</span>
<span class="cb-out">Count: 0</span>

<span class="cb-cmt"># Fix 1: use redirection (no subshell):</span>
COUNT=0
while IFS= read -r line; do
    ((COUNT++))
done < data.csv                   <span class="cb-cmt"># < instead of pipe — no subshell!</span>
echo "Count: $COUNT"
<span class="cb-out">Count: 2847</span>

<span class="cb-cmt"># Fix 2: process substitution (see section 8)</span>
<span class="cb-cmt"># Fix 3: lastpipe option (bash 4.2+)</span>
shopt -s lastpipe                 <span class="cb-cmt"># last command in pipe runs in current shell</span>
COUNT=0
cat data.csv | while IFS= read -r line; do ((COUNT++)); done
echo "Count: $COUNT"              <span class="cb-cmt"># works with lastpipe!</span>

<span class="cb-cmt">## ═══ PRACTICAL PIPE PATTERNS FOR DATA ENGINEERING ════════════</span>
<span class="cb-cmt"># Count unique values in CSV column 3:</span>
cut -d',' -f3 sales.csv | sort | uniq -c | sort -rn

<span class="cb-cmt"># Find and count log error types:</span>
grep "ERROR" app.log | awk '{print $NF}' | sort | uniq -c | sort -rn

<span class="cb-cmt"># Watch a log file for errors in real time:</span>
tail -f pipeline.log | grep --line-buffered "ERROR\|WARN"

<span class="cb-cmt"># Process in chunks of 100 lines:</span>
cat big.csv | split -l 100 - /tmp/chunk_
for chunk in /tmp/chunk_*; do
    python3 process.py "$chunk" &
done
wait

<span class="cb-cmt"># Parallel pipe processing with xargs:</span>
find . -name "*.csv" | xargs -P 4 -I{} python3 process.py {}

<span class="cb-cmt"># Pipeline with progress counter:</span>
total=$(wc -l < data.csv)
cat data.csv | pv -l -s "$total" | python3 loader.py
<span class="cb-cmt"># pv = pipe viewer (apt install pv) shows progress bar</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 7 — tee: SEE AND SAVE
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> tee — See Output AND Save It Simultaneously</h2>

<p><code>tee</code> reads from stdin and writes to <em>both</em> stdout and a file at the same time — like a T-junction in plumbing. Essential for logging pipeline output without losing it from your terminal.</p>

<!-- tee diagram SVG -->
<div class="diagram-wrap">
<svg viewBox="0 0 820 160" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="160" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">tee — T-Junction: stdin → stdout AND file simultaneously</text>

  <!-- Source cmd -->
  <rect x="20" y="55" width="150" height="50" rx="7" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="95" y="77" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#3fb950">python3</text>
  <text x="95" y="95" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">pipeline.py</text>

  <!-- Arrow to tee -->
  <line x1="172" y1="80" x2="255" y2="80" stroke="#3fb950" stroke-width="2" marker-end="url(#arr-g)"/>
  <text x="213" y="73" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">stdout</text>

  <!-- tee box -->
  <rect x="257" y="55" width="100" height="50" rx="7" fill="#161b22" stroke="#bc8cff" stroke-width="2.5"/>
  <text x="307" y="85" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="16" font-weight="bold" fill="#bc8cff">tee</text>

  <!-- tee → terminal -->
  <line x1="359" y1="70" x2="540" y2="70" stroke="#58a6ff" stroke-width="2" marker-end="url(#arr-b)"/>
  <rect x="542" y="50" width="130" height="28" rx="5" fill="#0e1824" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="607" y="69" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" fill="#58a6ff">🖥 Terminal (stdout)</text>

  <!-- tee → file -->
  <line x1="359" y1="95" x2="540" y2="95" stroke="#ffa657" stroke-width="2" marker-end="url(#arr-y)"/>
  <rect x="542" y="80" width="130" height="28" rx="5" fill="#2a1a1a" stroke="#ffa657" stroke-width="1.5"/>
  <text x="607" y="99" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" fill="#ffa657">📄 pipeline.log</text>

  <!-- tee → another command -->
  <line x1="307" y1="107" x2="307" y2="130" stroke="#f85149" stroke-width="1.5" stroke-dasharray="4,2" marker-end="url(#arr-r)"/>
  <rect x="230" y="130" width="160" height="24" rx="5" fill="#2a1a1a" stroke="#f85149" stroke-width="1"/>
  <text x="310" y="146" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#f85149">| grep ERROR (optional)</text>
</svg>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 6 of 8 — tee: All Options, Multiple Files, Sudo Pattern</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ BASIC tee ══════════════════════════════════════════════</span>
<span class="cb-prompt">$</span> python3 pipeline.py | tee pipeline.log
<span class="cb-cmt"># stdout appears on terminal AND is saved to pipeline.log
# If pipeline.log exists, it is OVERWRITTEN</span>

<span class="cb-prompt">$</span> python3 pipeline.py | tee <span class="cb-flag">-a</span> pipeline.log
<span class="cb-cmt"># -a: append to log file (don't overwrite)</span>

<span class="cb-cmt">## ═══ tee TO MULTIPLE FILES ════════════════════════════════════</span>
<span class="cb-prompt">$</span> python3 pipeline.py | tee run1.log run2.log run3.log
<span class="cb-cmt"># Write to multiple files at once</span>

<span class="cb-cmt">## ═══ tee IN A PIPELINE ════════════════════════════════════════</span>
<span class="cb-prompt">$</span> cat data.csv | tee raw.log | grep "Mumbai" | tee filtered.log | wc -l
<span class="cb-cmt"># raw.log:      all input lines
# filtered.log: only Mumbai lines
# terminal:     count of Mumbai lines</span>

<span class="cb-cmt">## ═══ CAPTURE BOTH STDOUT AND STDERR ════════════════════════</span>
<span class="cb-prompt">$</span> python3 pipeline.py 2>&1 | tee full.log
<span class="cb-cmt"># 2>&1 merges stderr into stdout, tee saves both</span>

<span class="cb-prompt">$</span> python3 pipeline.py 2>&1 | tee full.log | grep ERROR
<span class="cb-cmt"># Save everything, but only show errors on screen</span>

<span class="cb-cmt">## ═══ THE SUDO tee PATTERN ════════════════════════════════════</span>
<span class="cb-cmt"># Problem: sudo echo "text" > /etc/file   FAILS!
# The > redirect runs as your user, not as root</span>
<span class="cb-prompt">$</span> sudo echo "new line" >> /etc/hosts
<span class="cb-out">bash: /etc/hosts: Permission denied</span>

<span class="cb-cmt"># Solution: use tee with sudo</span>
<span class="cb-prompt">$</span> echo "10.0.0.5 prod-db.internal" | sudo tee -a /etc/hosts
<span class="cb-out">10.0.0.5 prod-db.internal</span>     <span class="cb-cmt">← echoed to terminal too</span>

<span class="cb-prompt">$</span> echo "new config" | sudo tee /etc/myapp/config.conf > /dev/null
<span class="cb-cmt"># > /dev/null: discard terminal output (only write to file)</span>

<span class="cb-prompt">$</span> cat << 'EOF' | sudo tee /etc/myapp/config.conf > /dev/null
host=prod-db.internal
port=5432
timeout=30
EOF
<span class="cb-cmt"># Write multi-line config as root using here-doc + sudo tee</span>

<span class="cb-cmt">## ═══ tee WITH PROCESS SUBSTITUTION ══════════════════════════</span>
<span class="cb-prompt">$</span> python3 pipeline.py | tee >(gzip > pipeline.log.gz) | grep ERROR
<span class="cb-cmt"># tee output goes to: gzip (saves compressed log) AND grep (shows errors)</span>

<span class="cb-prompt">$</span> python3 pipeline.py | tee >(grep ERROR > errors.log) >(grep WARN > warns.log) > all.log
<span class="cb-cmt"># Split one stream into three different files simultaneously!</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 8 — PROCESS SUBSTITUTION
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Process Substitution — <code>&lt;()</code> and <code>&gt;()</code></h2>

<p>Process substitution lets you use the output of a command <em>as if it were a file</em> — without creating temporary files. The syntax <code>&lt;(cmd)</code> creates a named pipe (<code>/dev/fd/N</code>) that the other command reads from.</p>

<!-- Process substitution SVG -->
<div class="diagram-wrap">
<svg viewBox="0 0 820 160" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="160" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">Process Substitution — &lt;(cmd) creates a temporary named pipe (fd)</text>

  <!-- diff command -->
  <rect x="280" y="50" width="260" height="60" rx="8" fill="#161b22" stroke="#bc8cff" stroke-width="2"/>
  <text x="410" y="77" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="13" font-weight="bold" fill="#bc8cff">diff</text>
  <text x="410" y="98" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">reads two "files"</text>

  <!-- Left: sort a.csv -->
  <rect x="15" y="60" width="150" height="40" rx="6" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.5"/>
  <text x="90" y="78" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#3fb950">sort a.csv</text>
  <text x="90" y="93" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">→ /dev/fd/3</text>
  <line x1="167" y1="80" x2="278" y2="80" stroke="#3fb950" stroke-width="1.5" marker-end="url(#arr-g)"/>
  <text x="220" y="73" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#3fb950">&lt;(sort a.csv)</text>

  <!-- Right: sort b.csv -->
  <rect x="655" y="60" width="150" height="40" rx="6" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.5"/>
  <text x="730" y="78" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#3fb950">sort b.csv</text>
  <text x="730" y="93" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">→ /dev/fd/4</text>
  <line x1="542" y1="80" x2="653" y2="80" stroke="#3fb950" stroke-width="1.5" marker-end="url(#arr-g)"/>
  <text x="600" y="73" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#3fb950">&lt;(sort b.csv)</text>

  <!-- Full command -->
  <text x="410" y="135" text-anchor="middle" font-family="'Courier New',monospace" font-size="12" fill="#e6edf3">diff &lt;(sort a.csv) &lt;(sort b.csv)</text>
  <text x="410" y="150" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">No temp files — diff sees two file descriptors backed by running sort processes</text>
</svg>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 7 of 8 — Process Substitution: &lt;() and &gt;() Patterns</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ &lt;() — INPUT PROCESS SUBSTITUTION ════════════════════════</span>
<span class="cb-cmt"># &lt;(cmd) = run cmd and provide its output as a file-like object</span>

<span class="cb-cmt"># Compare two sorted files without temp files:</span>
<span class="cb-prompt">$</span> diff &lt;(sort file1.csv) &lt;(sort file2.csv)

<span class="cb-cmt"># diff two remote files over SSH:</span>
<span class="cb-prompt">$</span> diff &lt;(ssh server1 "cat /etc/hosts") &lt;(ssh server2 "cat /etc/hosts")

<span class="cb-cmt"># comm: lines common to both files (both must be sorted):</span>
<span class="cb-prompt">$</span> comm &lt;(sort list1.txt) &lt;(sort list2.txt)

<span class="cb-cmt"># join without temp files:</span>
<span class="cb-prompt">$</span> join &lt;(sort -k1 sales.csv) &lt;(sort -k1 customers.csv)

<span class="cb-cmt"># while loop that can modify variables (solves pipe scope!):</span>
ERRORS=0
while IFS= read -r line; do
    [[ "$line" == *ERROR* ]] && ((ERRORS++))
done < &lt;(cat app.log | grep -v DEBUG)
<span class="cb-cmt"># &lt; &lt;(cmd): redirection from process substitution
# The while loop is NOT in a subshell — ERRORS is preserved!</span>
echo "Errors: $ERRORS"

<span class="cb-cmt"># Read from multiple sources simultaneously:</span>
while IFS= read -r line1 && IFS= read -r line2 <&3; do
    echo "A: $line1  |  B: $line2"
done < &lt;(cat file_a.txt) 3< &lt;(cat file_b.txt)

<span class="cb-cmt">## ═══ &gt;() — OUTPUT PROCESS SUBSTITUTION ═══════════════════════</span>
<span class="cb-cmt"># &gt;(cmd) = run cmd and send its stdin from the substituted "file"</span>

<span class="cb-cmt"># Log to two places at once:</span>
<span class="cb-prompt">$</span> python3 pipeline.py > >(tee pipeline.log) 2> >(tee errors.log >&2)
<span class="cb-cmt"># stdout → tee → screen AND pipeline.log
# stderr → tee → screen AND errors.log (with >&2 to keep stderr as stderr)</span>

<span class="cb-cmt"># Compress output on the fly:</span>
<span class="cb-prompt">$</span> python3 generate_report.py > >(gzip > report.gz)

<span class="cb-cmt"># Split output into multiple handlers:</span>
<span class="cb-prompt">$</span> python3 pipeline.py | tee >(grep ERROR > errors.log) \
                              >(grep WARN  > warns.log)  \
                              >(wc -l > linecount.txt)   \
                              > all.log

<span class="cb-cmt">## ═══ PRACTICAL: Variable-preserving pipeline pattern ═════════</span>
<span class="cb-cmt"># PROBLEM: pipe loses variables
# cat data.csv | while read line; do ((COUNT++)); done
# echo $COUNT  → 0 (subshell!)
#
# SOLUTION: process substitution</span>
COUNT=0
ERRORS=0
while IFS=',' read -r date sales region; do
    [[ "$date" == "date" ]] && continue
    ((COUNT++))
    (( sales > 10000 )) && ((ERRORS++))
done < &lt;(cat sales.csv | grep -v "^#")
echo "Processed: $COUNT rows, High-value: $ERRORS"
<span class="cb-cmt"># COUNT and ERRORS ARE accessible here — no subshell!</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 9 — NAMED PIPES (FIFOs)
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Named Pipes (FIFOs) — Persistent Pipe Files</h2>

<p>A named pipe (FIFO) is a pipe that exists as a file in the filesystem. Unlike regular pipes, it persists and can be used by unrelated processes — even across different shell sessions.</p>

<!-- FIFO diagram SVG -->
<div class="diagram-wrap">
<svg viewBox="0 0 820 150" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="150" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">Named Pipe (FIFO) — Two Separate Processes Communicating via Filesystem</text>

  <!-- Producer -->
  <rect x="20" y="50" width="200" height="70" rx="8" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="120" y="76" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#3fb950">Producer (Process A)</text>
  <text x="120" y="96" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">echo "data" > /tmp/mypipe</text>
  <text x="120" y="112" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">blocks until reader connects</text>

  <!-- FIFO -->
  <rect x="310" y="60" width="200" height="50" rx="8" fill="#161b22" stroke="#ffa657" stroke-width="2.5"/>
  <text x="410" y="82" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#ffa657">/tmp/mypipe (FIFO)</text>
  <text x="410" y="100" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">type=p in ls output</text>

  <!-- Consumer -->
  <rect x="600" y="50" width="200" height="70" rx="8" fill="#0e1824" stroke="#58a6ff" stroke-width="2"/>
  <text x="700" y="76" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#58a6ff">Consumer (Process B)</text>
  <text x="700" y="96" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">cat /tmp/mypipe</text>
  <text x="700" y="112" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">blocks until writer sends</text>

  <!-- Arrows -->
  <line x1="222" y1="85" x2="308" y2="85" stroke="#3fb950" stroke-width="2" marker-end="url(#arr-g)"/>
  <line x1="512" y1="85" x2="598" y2="85" stroke="#58a6ff" stroke-width="2" marker-end="url(#arr-b)"/>

  <text x="410" y="135" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Can be in different terminals, different scripts, or even different users</text>
</svg>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Named Pipes — mkfifo, Use Cases, Worker Pool Pattern</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ CREATE A NAMED PIPE ═════════════════════════════════════</span>
<span class="cb-prompt">$</span> mkfifo /tmp/mypipe              <span class="cb-cmt"># create named pipe</span>
<span class="cb-prompt">$</span> mkfifo -m 0600 /tmp/secpipe     <span class="cb-cmt"># with permissions</span>
<span class="cb-prompt">$</span> ls -la /tmp/mypipe
<span class="cb-out">prw-r--r-- 1 ravi ravi 0 /tmp/mypipe</span>
<span class="cb-cmt"># p at start = named pipe (FIFO)
# size is always 0 — data flows through, not stored</span>

<span class="cb-cmt">## ═══ BASIC USAGE (two terminals) ════════════════════════════</span>
<span class="cb-cmt"># Terminal 1 (writer — will BLOCK until reader connects):</span>
<span class="cb-prompt">$</span> echo "Hello from terminal 1" > /tmp/mypipe

<span class="cb-cmt"># Terminal 2 (reader — unblocks Terminal 1):</span>
<span class="cb-prompt">$</span> cat /tmp/mypipe
<span class="cb-out">Hello from terminal 1</span>

<span class="cb-cmt">## ═══ WORKER POOL PATTERN (advanced parallel processing) ══════</span>
<span class="cb-cmt"># Classic pattern: N workers process a queue in parallel</span>

WORKERS=4
PIPE=/tmp/worker_pipe_$$
mkfifo "$PIPE"
trap "rm -f $PIPE" EXIT           <span class="cb-cmt"># cleanup on exit</span>

<span class="cb-cmt"># Start the queue feeder (runs in background):</span>
(
    for file in *.csv; do
        echo "$file"
    done
) > "$PIPE" &

<span class="cb-cmt"># Start N workers reading from the pipe:</span>
for i in $(seq 1 $WORKERS); do
    (
        while IFS= read -r job; do
            echo "Worker $i processing: $job"
            python3 process.py "$job"
        done < "$PIPE"
    ) &
done

wait
echo "All workers done"

<span class="cb-cmt">## ═══ LOGGER PATTERN ══════════════════════════════════════════</span>
<span class="cb-cmt"># Multiple processes write to one log via named pipe:</span>
LOG_PIPE=/tmp/log_pipe_$$
mkfifo "$LOG_PIPE"
trap "rm -f $LOG_PIPE" EXIT

<span class="cb-cmt"># Start a single log writer (serializes concurrent writes):</span>
tee -a /var/log/pipeline.log < "$LOG_PIPE" &
LOG_PID=$!

<span class="cb-cmt"># Now any process can write to the log:</span>
echo "[INFO] Step 1 started" > "$LOG_PIPE"
python3 step1.py > "$LOG_PIPE" 2>&1
echo "[INFO] Step 2 started" > "$LOG_PIPE"
python3 step2.py > "$LOG_PIPE" 2>&1

<span class="cb-cmt"># Cleanup:</span>
exec 3> "$LOG_PIPE"; exec 3>&-   <span class="cb-cmt"># close the pipe</span>
wait $LOG_PID
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 10 — xargs: STDIN TO ARGUMENTS
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> xargs — Transform stdin Lines into Command Arguments</h2>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 8 of 8 — xargs: All Flags, Parallel Execution, find+xargs</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ xargs BASICS ═══════════════════════════════════════════</span>
<span class="cb-cmt"># xargs reads stdin (one item per line) and runs a command with those items</span>
<span class="cb-prompt">$</span> echo "file1.csv file2.csv file3.csv" | xargs rm
<span class="cb-cmt"># equivalent to: rm file1.csv file2.csv file3.csv</span>

<span class="cb-prompt">$</span> ls *.csv | xargs wc -l         <span class="cb-cmt"># count lines in all CSVs</span>
<span class="cb-prompt">$</span> ls *.log | xargs gzip           <span class="cb-cmt"># compress all logs</span>
<span class="cb-prompt">$</span> cat urls.txt | xargs wget       <span class="cb-cmt"># download all URLs</span>

<span class="cb-cmt">## ═══ -I: PLACEHOLDER ════════════════════════════════════════</span>
<span class="cb-prompt">$</span> ls *.csv | xargs <span class="cb-flag">-I{}</span> cp {} /backup/
<span class="cb-cmt"># -I{}: replace {} with each input item
# Like: cp file1.csv /backup/  then  cp file2.csv /backup/ ...</span>

<span class="cb-prompt">$</span> cat servers.txt | xargs <span class="cb-flag">-I HOST</span> ssh HOST "df -h"
<span class="cb-cmt"># Custom placeholder: -I HOST (easier to read than {})</span>

<span class="cb-prompt">$</span> find . -name "*.log" | xargs <span class="cb-flag">-I{}</span> mv {} {}.bak
<span class="cb-cmt"># Rename all logs to .log.bak — {} appears TWICE in command</span>

<span class="cb-cmt">## ═══ -P: PARALLEL EXECUTION ══════════════════════════════════</span>
<span class="cb-prompt">$</span> ls *.csv | xargs <span class="cb-flag">-P 4</span> <span class="cb-flag">-I{}</span> python3 process.py {}
<span class="cb-cmt"># -P 4: run up to 4 processes in parallel
# Best for CPU-bound tasks with multiple files</span>

<span class="cb-prompt">$</span> cat servers.txt | xargs <span class="cb-flag">-P 10</span> <span class="cb-flag">-I HOST</span> sh -c 'ping -c1 HOST &>/dev/null && echo "HOST: UP" || echo "HOST: DOWN"'
<span class="cb-cmt"># Ping 10 servers in parallel</span>

<span class="cb-cmt">## ═══ -n: MAX ARGS PER COMMAND ════════════════════════════════</span>
<span class="cb-prompt">$</span> echo "a b c d e f" | xargs <span class="cb-flag">-n 2</span> echo
<span class="cb-out">a b</span>
<span class="cb-out">c d</span>
<span class="cb-out">e f</span>
<span class="cb-cmt"># -n 2: pass at most 2 args per command invocation</span>

<span class="cb-prompt">$</span> find . -name "*.py" | xargs <span class="cb-flag">-n 50</span> pylint
<span class="cb-cmt"># Lint 50 files at a time (avoids "too many arguments" error)</span>

<span class="cb-cmt">## ═══ -0: NULL-SEPARATED (safe for spaces in filenames) ═══════</span>
<span class="cb-prompt">$</span> find . -name "*.csv" <span class="cb-flag">-print0</span> | xargs <span class="cb-flag">-0</span> wc -l
<span class="cb-cmt"># -print0: find uses NUL (\0) separator instead of newline
# -0: xargs reads NUL-separated items
# Result: handles filenames with spaces, tabs, newlines safely</span>

<span class="cb-prompt">$</span> find . -name "My Report*.csv" <span class="cb-flag">-print0</span> | xargs <span class="cb-flag">-0 -I{}</span> python3 load.py "{}"
<span class="cb-cmt"># Safe even if filename has spaces</span>

<span class="cb-cmt">## ═══ -t: TRACE (print command before running) ════════════════</span>
<span class="cb-prompt">$</span> ls *.log | xargs <span class="cb-flag">-t</span> gzip
<span class="cb-out">gzip access.log error.log app.log</span>
<span class="cb-cmt"># Shows the exact command being run — great for debugging</span>

<span class="cb-cmt">## ═══ FIND + XARGS PATTERNS ═══════════════════════════════════</span>
<span class="cb-cmt"># Delete files older than 30 days:</span>
find /tmp -name "*.tmp" -mtime +30 -print0 | xargs -0 rm -f

<span class="cb-cmt"># Compress all large logs:</span>
find /var/log -name "*.log" -size +10M -print0 | xargs -0 -P 4 gzip

<span class="cb-cmt"># Run tests on all Python files in parallel:</span>
find . -name "test_*.py" -print0 | xargs -0 -P 4 -I{} python3 -m pytest {}

<span class="cb-cmt"># Change permissions on all scripts:</span>
find . -name "*.sh" -print0 | xargs -0 chmod +x

<span class="cb-cmt">## ═══ WHEN NOT TO USE xargs ════════════════════════════════════</span>
<span class="cb-cmt"># Prefer a for loop when:
# - You need variables from inside the loop after it finishes
# - You need complex logic (if/case) per item
# - Order of processing matters

# Use xargs when:
# - Simple command with many items
# - Parallel execution needed (-P)
# - Max argument length could be hit (many files)</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 11 — KERNEL DEEP DIVE
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Kernel Deep Dive — How Pipes &amp; Redirection Work at OS Level</h2>

<div class="deepdive-box">
<div class="deepdive-title">⚙️ Pipes, Redirection &amp; File Descriptors — The Kernel Internals</div>
<pre style="margin:0;padding:16px;font-family:monospace;font-size:12px;color:#e6edf3;background:#010409;border-radius:0 0 8px 8px;overflow-x:auto;">
# HOW PIPES WORK IN THE KERNEL

1. PIPE CREATION — pipe(2) syscall
   When bash sees: cmd1 | cmd2
   It calls: int pipe(int pipefd[2]);
   Kernel creates:
   - pipefd[0] = read end (fd)
   - pipefd[1] = write end (fd)
   - An in-kernel ring buffer (typically 64KB on Linux)

2. FORK + EXEC FOR EACH COMMAND
   bash fork()s for cmd1:
   - Child: dup2(pipefd[1], STDOUT_FILENO)  ← stdout → pipe write end
   - Child: close(pipefd[0]); close(pipefd[1])
   - Child: exec(cmd1)  → cmd1 writes to stdout → goes into pipe buffer
   
   bash fork()s for cmd2:
   - Child: dup2(pipefd[0], STDIN_FILENO)   ← stdin ← pipe read end
   - Child: close(pipefd[0]); close(pipefd[1])
   - Child: exec(cmd2)  → cmd2 reads from stdin ← comes from pipe

3. DATA FLOW
   cmd1 calls write(1, data, len)
   → kernel puts data in pipe buffer
   → if buffer FULL (64KB): write BLOCKS until cmd2 reads
   
   cmd2 calls read(0, buf, len)
   → kernel copies data from pipe buffer to buf
   → if buffer EMPTY: read BLOCKS until cmd1 writes
   → if pipe write end closed AND buffer empty: read returns 0 (EOF)
   
   Both processes run CONCURRENTLY — the kernel schedules them

4. HOW REDIRECTION WORKS — dup2(2)
   For: cmd > file
   bash opens file: fd = open("file", O_WRONLY|O_CREAT|O_TRUNC, 0644)
   bash calls: dup2(fd, STDOUT_FILENO)
   → STDOUT_FILENO (1) now points to the same file as fd
   → close(fd)  (clean up extra reference)
   cmd writes to fd 1 → goes to the file, not the terminal
   
   For: cmd 2>&1
   bash calls: dup2(STDOUT_FILENO, STDERR_FILENO)
   → fd 2 now points to whatever fd 1 points to
   Both stdout and stderr go to the same place

5. /proc/PID/fd — REAL-TIME FD INSPECTION
   $ ls -la /proc/self/fd
   0 -> /dev/pts/0   (stdin: terminal)
   1 -> /dev/pts/0   (stdout: terminal)
   2 -> /dev/pts/0   (stderr: terminal)
   
   While running: cmd > file 2>&1
   ls -la /proc/$(pgrep cmd)/fd
   0 -> /dev/pts/0   (stdin: terminal)
   1 -> /path/to/file  (stdout: redirected)
   2 -> /path/to/file  (stderr: pointing to stdout → same file)

6. PIPE BUFFER SIZING
   Default: 65536 bytes (64KB) per pipe
   $ cat /proc/sys/fs/pipe-max-size   # max allowed (1MB default)
   $ fcntl(pipefd[1], F_SETPIPE_SZ, 1048576)  # set to 1MB in code
   
   For high-throughput pipelines, larger buffers = fewer context switches

7. splice() — ZERO-COPY PIPE DATA
   Modern kernels: splice(2) moves data between fds WITHOUT copying
   to userspace — data stays in kernel page cache
   Used by: dd, sendfile, high-performance servers
   Your shell pipelines automatically benefit from kernel optimizations

8. OPEN FILE DESCRIPTION vs FILE DESCRIPTOR
   fd = per-process integer (index into fd table)
   open file description = kernel object (has offset, flags, inode ref)
   dup2()/fork() create NEW fds pointing to SAME open file description
   That's why: cmd > file 2>&1 — both fd1 and fd2 share position/flags
</pre>
</div>

<div class="two-col-grid" style="margin-top:20px;">
  <div class="callout-box info-box">
    <strong>🔬 Inspect a Pipe in Real Time:</strong>
    <pre style="margin:8px 0 0;font-family:monospace;font-size:12px;background:transparent;border:none;padding:0;color:#e6edf3;"># See pipe fds while a pipeline runs:
$ sleep 100 | sleep 100 &
$ ls -la /proc/$(pgrep -n sleep)/fd
0 -> pipe:[12345]   ← reading from pipe
1 -> /dev/pts/0
$ ls -la /proc/$(pgrep sleep | head -1)/fd
1 -> pipe:[12345]   ← writing to same pipe</pre>
  </div>
  <div class="callout-box info-box">
    <strong>📊 Pipe Buffer — When it Fills:</strong>
    <p style="margin:8px 0 0;font-size:13px;">If cmd1 writes faster than cmd2 reads, the 64KB pipe buffer fills and cmd1's <code>write()</code> <strong>blocks</strong> — this is how backpressure works automatically in Unix pipelines. No data is lost. The pipeline slows to the speed of the slowest component.</p>
  </div>
</div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 12 — ADVANCED REDIRECTION PATTERNS
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Advanced Redirection — exec, swap fds, coprocess</h2>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Advanced Patterns — exec Redirection, fd Swapping, coproc</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ exec REDIRECTION (affect whole shell/script) ════════════</span>
<span class="cb-cmt"># exec with redirection but NO command = redirect for current shell</span>

exec > script.log 2>&1    <span class="cb-cmt"># ALL output from this point goes to log</span>
echo "This goes to log"   <span class="cb-cmt"># goes to script.log, not terminal</span>

<span class="cb-cmt"># Redirect entire script to log (common pattern):</span>
exec > >(tee -a "$LOG_FILE") 2>&1
<span class="cb-cmt"># All stdout+stderr: shown on terminal AND saved to log</span>

<span class="cb-cmt"># Restore stdout:</span>
exec 1>/dev/tty           <span class="cb-cmt"># redirect stdout back to terminal</span>
exec 2>/dev/tty           <span class="cb-cmt"># restore stderr too</span>

<span class="cb-cmt">## ═══ SAVE AND RESTORE FDs ════════════════════════════════════</span>
exec 3>&1                 <span class="cb-cmt"># save stdout to fd 3</span>
exec 1> output.log        <span class="cb-cmt"># redirect stdout to file</span>
echo "This goes to file"
exec 1>&3                 <span class="cb-cmt"># restore stdout from fd 3</span>
exec 3>&-                 <span class="cb-cmt"># close fd 3</span>
echo "This goes to terminal again"

<span class="cb-cmt">## ═══ SWAP STDOUT AND STDERR ══════════════════════════════════</span>
<span class="cb-cmt"># Swap fd1 and fd2 (stdout ↔ stderr)</span>
cmd 3>&1 1>&2 2>&3 3>&-   <span class="cb-cmt"># 3=save stdout; 1→stderr; 2→saved(old stdout); close 3</span>
<span class="cb-cmt"># Use case: pipe stderr through grep while stdout goes to terminal</span>

<span class="cb-cmt">## ═══ COPROC — BIDIRECTIONAL COMMUNICATION ════════════════════</span>
<span class="cb-cmt"># coproc starts a background command with read/write pipes</span>
coproc python3 calculator.py   <span class="cb-cmt"># starts python3 as coprocess</span>
<span class="cb-cmt"># COPROC[0] = read from python3's stdout
# COPROC[1] = write to python3's stdin
# COPROC_PID = python3's PID</span>

echo "2 + 3" >&\${COPROC[1]}       <span class="cb-cmt"># send to python3</span>
read RESULT <&\${COPROC[0]}        <span class="cb-cmt"># read from python3</span>
echo "Result: $RESULT"

<span class="cb-cmt"># Named coproc:</span>
coproc CALC python3 calculator.py
echo "10 * 5" >&\${CALC[1]}
read ANSWER <&\${CALC[0]}

<span class="cb-cmt">## ═══ OPEN FD TO DEVICE ═══════════════════════════════════════</span>
exec 3<> /dev/tcp/prod-db.internal/5432   <span class="cb-cmt"># open TCP socket as fd 3!</span>
<span class="cb-cmt"># /dev/tcp/HOST/PORT is a bash special — opens a TCP connection
# No netcat or curl needed for simple TCP communication</span>
echo "PING" >&3                  <span class="cb-cmt"># send to server</span>
read RESPONSE <&3                <span class="cb-cmt"># read from server</span>
exec 3>&-                        <span class="cb-cmt"># close connection</span>

<span class="cb-cmt"># Check if port is open:</span>
(echo >/dev/tcp/prod-db.internal/5432) 2>/dev/null && echo "Port open" || echo "Closed"
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 13 — REAL-WORLD DATA ENGINEERING PATTERNS
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Real-World I/O Patterns — Data Engineering</h2>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Production Data Engineering I/O Patterns</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ PATTERN 1: FULL LOGGING TO FILE + TERMINAL ════════════</span>
<span class="cb-out">#!/usr/bin/env bash</span>
<span class="cb-out">set -euo pipefail</span>
<span class="cb-out">LOG="/var/log/pipeline_$(date +%Y%m%d_%H%M%S).log"</span>
<span class="cb-out">exec > >(tee -a "$LOG") 2>&1</span>
<span class="cb-out">echo "[INFO] Pipeline started"       # goes to terminal AND log</span>
<span class="cb-out">python3 load.py                       # all its output too</span>
<span class="cb-out">echo "[INFO] Pipeline done"</span>

<span class="cb-cmt">## ═══ PATTERN 2: CSV PROCESSING PIPELINE ════════════════════</span>
process_csv() {
    local INPUT="$1" OUTPUT="$2"
    
    {   <span class="cb-cmt"># group: header + transformed body</span>
        head -1 "$INPUT"              <span class="cb-cmt"># pass header through unchanged</span>
        tail -n +2 "$INPUT"           <span class="cb-cmt"># skip header in data</span>
        | grep -v "^#"               <span class="cb-cmt"># remove comment rows</span>
        | awk -F',' 'NF == 5'        <span class="cb-cmt"># only rows with 5 fields</span>
        | sort -t',' -k3,3n          <span class="cb-cmt"># sort by column 3 numerically</span>
    } > "$OUTPUT"
}

<span class="cb-cmt">## ═══ PATTERN 3: STREAMING LARGE FILES ═══════════════════════</span>
<span class="cb-cmt"># Process 10GB file without loading into memory:</span>
zcat huge_data.csv.gz \
    | tail -n +2 \                  <span class="cb-cmt"># skip header</span>
    | awk -F',' '{sum[$3]+=$4} END {for(k in sum) print k","sum[k]}' \
    | sort -t',' -k2rn \
    | head -20                      <span class="cb-cmt"># top 20 regions by sales</span>

<span class="cb-cmt">## ═══ PATTERN 4: PARALLEL FILE PROCESSING ═══════════════════</span>
MAX_JOBS=4
PIDS=()
for file in data/raw/*.csv; do
    python3 transform.py "$file" > "data/processed/$(basename "$file")" &
    PIDS+=($!)
    (( \${#PIDS[@]} >= MAX_JOBS )) && { wait "\${PIDS[0]}"; PIDS=("\${PIDS[@]:1}"); }
done
wait
echo "All files processed"

<span class="cb-cmt">## ═══ PATTERN 5: SAFE ATOMIC WRITE ═══════════════════════════</span>
<span class="cb-cmt"># Write to temp file, then atomically rename (avoids partial reads)</span>
TMPOUT=$(mktemp "\${OUTPUT_FILE}.XXXXXX")
trap 'rm -f "$TMPOUT"' EXIT

python3 generate.py > "$TMPOUT"      <span class="cb-cmt"># write to temp file</span>
mv -f "$TMPOUT" "$OUTPUT_FILE"       <span class="cb-cmt"># atomic rename to final location</span>
trap - EXIT                          <span class="cb-cmt"># clear trap (file safely moved)</span>

<span class="cb-cmt">## ═══ PATTERN 6: SPLIT OUTPUT BY TYPE ════════════════════════</span>
python3 pipeline.py | tee \
    >(grep "^INFO"  > logs/info.log)  \
    >(grep "^WARN"  > logs/warn.log)  \
    >(grep "^ERROR" > logs/error.log) \
    > logs/full.log
<span class="cb-cmt"># One pass → four outputs. No re-reading the data.</span>

<span class="cb-cmt">## ═══ PATTERN 7: DATABASE LOAD VIA PIPE ══════════════════════</span>
<span class="cb-cmt"># Transform CSV and pipe directly into PostgreSQL COPY:</span>
tail -n +2 sales.csv \                <span class="cb-cmt"># skip header</span>
    | awk -F',' '{print $1","$2","$3}' \  <span class="cb-cmt"># select columns</span>
    | psql -d analytics -c "COPY sales_staging FROM STDIN CSV"

<span class="cb-cmt"># Decompress and load in one pipeline:</span>
zcat data.csv.gz | psql -d analytics -c "COPY sales FROM STDIN CSV HEADER"

<span class="cb-cmt">## ═══ PATTERN 8: MONITOR PIPELINE PROGRESS ═══════════════════</span>
TOTAL=$(wc -l < input.csv)
cat input.csv \
    | pv -l -s "$TOTAL" -N "Loading" \   <span class="cb-cmt"># progress bar</span>
    | python3 loader.py 2>&1 \
    | grep -E "ERROR|WARNING"             <span class="cb-cmt"># show only issues</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 14 — COMPLETE REFERENCE TABLE
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Complete I/O Reference — All Operators &amp; Commands</h2>

<div class="table-wrap">
<table class="ref-table">
<thead><tr><th style="width:22%">Syntax</th><th>What It Does</th><th style="width:30%">Example</th></tr></thead>
<tbody>
<tr><td colspan="3" style="background:#1a2a1a;color:#3fb950;font-family:'Segoe UI',sans-serif;font-weight:bold;">Output Redirection</td></tr>
<tr><td style="font-family:monospace;">cmd &gt; file</td><td>stdout → file (overwrite)</td><td><code>echo "hi" &gt; out.txt</code></td></tr>
<tr><td style="font-family:monospace;">cmd &gt;&gt; file</td><td>stdout → file (append)</td><td><code>date &gt;&gt; log.txt</code></td></tr>
<tr><td style="font-family:monospace;">cmd 2&gt; file</td><td>stderr → file</td><td><code>cmd 2&gt; err.log</code></td></tr>
<tr><td style="font-family:monospace;">cmd &amp;&gt; file</td><td>stdout+stderr → file (bash)</td><td><code>cmd &amp;&gt; all.log</code></td></tr>
<tr><td style="font-family:monospace;">cmd &gt; f 2&gt;&amp;1</td><td>stdout → file, stderr → stdout</td><td><code>cmd &gt; all.log 2&gt;&amp;1</code></td></tr>
<tr><td style="font-family:monospace;">cmd &gt; /dev/null</td><td>discard stdout</td><td><code>make &gt; /dev/null</code></td></tr>
<tr><td style="font-family:monospace;">cmd 2&gt;/dev/null</td><td>discard stderr (suppress errors)</td><td><code>rm file 2&gt;/dev/null</code></td></tr>
<tr><td colspan="3" style="background:#0e1824;color:#58a6ff;font-family:'Segoe UI',sans-serif;font-weight:bold;">Input Redirection</td></tr>
<tr><td style="font-family:monospace;">cmd &lt; file</td><td>stdin from file</td><td><code>sort &lt; data.csv</code></td></tr>
<tr><td style="font-family:monospace;">cmd &lt;&lt; EOF...EOF</td><td>here-doc: inline multi-line stdin</td><td>variables expand</td></tr>
<tr><td style="font-family:monospace;">cmd &lt;&lt; 'EOF'...EOF</td><td>here-doc: no expansion</td><td>literal text</td></tr>
<tr><td style="font-family:monospace;">cmd &lt;&lt;- EOF...EOF</td><td>here-doc: strip leading tabs</td><td>for indented code</td></tr>
<tr><td style="font-family:monospace;">cmd &lt;&lt;&lt; "string"</td><td>here-string: single-line stdin</td><td><code>grep x &lt;&lt;&lt; "$VAR"</code></td></tr>
<tr><td colspan="3" style="background:#1a1a3a;color:#bc8cff;font-family:'Segoe UI',sans-serif;font-weight:bold;">Pipes</td></tr>
<tr><td style="font-family:monospace;">cmd1 | cmd2</td><td>stdout of cmd1 → stdin of cmd2</td><td><code>cat f | grep x</code></td></tr>
<tr><td style="font-family:monospace;">cmd1 |&amp; cmd2</td><td>stdout+stderr of cmd1 → cmd2</td><td><code>cmd |&amp; grep ERROR</code></td></tr>
<tr><td style="font-family:monospace;">cmd | tee file</td><td>stdout → terminal AND file</td><td><code>make | tee build.log</code></td></tr>
<tr><td style="font-family:monospace;">cmd | tee -a file</td><td>stdout → terminal AND append file</td><td><code>script | tee -a log</code></td></tr>
<tr><td colspan="3" style="background:#2a2a1a;color:#ffa657;font-family:'Segoe UI',sans-serif;font-weight:bold;">Process Substitution</td></tr>
<tr><td style="font-family:monospace;">&lt;(cmd)</td><td>cmd output as a readable file</td><td><code>diff &lt;(sort a) &lt;(sort b)</code></td></tr>
<tr><td style="font-family:monospace;">&gt;(cmd)</td><td>cmd receives as writable file</td><td><code>tee &gt;(gzip &gt; f.gz)</code></td></tr>
<tr><td style="font-family:monospace;">cmd &lt; &lt;(cmd2)</td><td>redirect from process sub</td><td><code>while read; done &lt; &lt;(cmd)</code></td></tr>
<tr><td colspan="3" style="background:#1f2027;color:#8b949e;font-family:'Segoe UI',sans-serif;font-weight:bold;">File Descriptor Operations</td></tr>
<tr><td style="font-family:monospace;">exec N&gt; file</td><td>open fd N for writing</td><td><code>exec 3&gt; log.txt</code></td></tr>
<tr><td style="font-family:monospace;">exec N&lt; file</td><td>open fd N for reading</td><td><code>exec 4&lt; data.csv</code></td></tr>
<tr><td style="font-family:monospace;">exec N&gt;&amp;M</td><td>fd N → same as fd M</td><td><code>exec 3&gt;&amp;1</code></td></tr>
<tr><td style="font-family:monospace;">exec N&gt;&amp;-</td><td>close fd N</td><td><code>exec 3&gt;&amp;-</code></td></tr>
<tr><td style="font-family:monospace;">cmd &gt;&amp;N</td><td>cmd stdout → fd N</td><td><code>echo "x" &gt;&amp;2</code></td></tr>
<tr><td style="font-family:monospace;">cmd &lt;&amp;N</td><td>cmd stdin ← fd N</td><td><code>read line &lt;&amp;4</code></td></tr>
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
    <h4>Exercise 1 — Redirection Basics</h4>
    <p>Write a script <code>io_demo.sh</code> that demonstrates:</p>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Uses <code>printf</code> to print a formatted table: 3 rows of name/city/sales, right-aligned numbers</li>
      <li>Saves the table to <code>report.txt</code> using <code>&gt;</code></li>
      <li>Appends a "Total" line using <code>&gt;&gt;</code></li>
      <li>Sends an ERROR message to stderr using <code>&gt;&amp;2</code></li>
      <li>Redirects ONLY stderr to <code>errors.log</code> while stdout goes to terminal</li>
      <li>Then redirect BOTH stdout and stderr to <code>all.log</code> using <code>&amp;&gt;</code></li>
      <li>Reads back <code>report.txt</code> using <code>&lt;</code> and counts lines with <code>wc -l</code></li>
    </ol>
    <p><strong>Verify:</strong> <code>cat errors.log</code> shows only errors. <code>cat report.txt</code> shows only the table.</p>
  </div>
</div>

<div class="exercise-panel easy">
  <div class="ex-badge easy-badge">Easy</div>
  <div class="ex-body">
    <h4>Exercise 2 — Here-Doc &amp; read Mastery</h4>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Use a here-doc with variable expansion to generate a <code>docker-compose.yml</code> file using <code>$SERVICE_NAME</code>, <code>$DB_PORT</code>, <code>$IMAGE_TAG</code></li>
      <li>Use a quoted here-doc (<code>&lt;&lt; 'EOF'</code>) to create a Python script template where <code>$VAR</code> appears literally</li>
      <li>Use <code>read -p</code> to prompt for DB host and port, then use here-string to validate the port is numeric: <code>grep -qE '^[0-9]+$' &lt;&lt;&lt; "$PORT"</code></li>
      <li>Read <code>/etc/passwd</code> line by line, split on <code>:</code> with <code>IFS=':'</code>, and print only login shell for each user whose UID ≥ 1000</li>
      <li>Use <code>mapfile -t</code> to load all lines from <code>/etc/hosts</code> into an array, then print only non-comment lines</li>
    </ol>
  </div>
</div>

<div class="exercise-panel medium">
  <div class="ex-badge medium-badge">Medium</div>
  <div class="ex-body">
    <h4>Exercise 3 — Pipeline Architecture</h4>
    <p>Build a data analysis pipeline using only shell tools and pipes (no Python, no awk scripts in files):</p>
    <pre style="background:#161b22;padding:10px;border-radius:6px;font-family:monospace;font-size:12px;color:#e6edf3;margin:8px 0;">date,city,sales,qty
2024-01-01,Mumbai,15000,30
2024-01-01,Delhi,12000,25
2024-01-02,Mumbai,18000,35
2024-01-02,Bangalore,9000,20
2024-01-03,Delhi,14000,28</pre>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Count total rows (excluding header)</li>
      <li>Find unique cities and their count</li>
      <li>Find the highest sales value</li>
      <li>Calculate total sales using <code>awk</code> in the pipeline</li>
      <li>Show rows where sales &gt; 13000, sorted by date</li>
      <li>Save all results to <code>analysis.txt</code> using <code>tee</code> while displaying on terminal</li>
      <li>Use <code>PIPESTATUS</code> to check if every command in your longest pipeline succeeded</li>
    </ol>
  </div>
</div>

<div class="exercise-panel medium">
  <div class="ex-badge medium-badge">Medium</div>
  <div class="ex-body">
    <h4>Exercise 4 — Process Substitution &amp; Variable Scope</h4>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li><strong>Scope bug:</strong> Write a loop that reads a file with a pipe and tries to count lines — observe the variable is 0 after the loop. Then fix it using process substitution <code>&lt; &lt;(cat file)</code></li>
      <li><strong>diff without temp files:</strong> Use <code>&lt;()</code> to compare the output of two commands that both process the same input file differently (e.g., <code>sort file</code> vs <code>sort -r file</code>)</li>
      <li><strong>Multi-output:</strong> Use <code>tee &gt;(cmd1) &gt;(cmd2) &gt; file</code> to split one pipeline into three simultaneous outputs</li>
      <li><strong>sudotee:</strong> Create a file in <code>/etc/</code> that requires root permission using the <code>echo ... | sudo tee</code> pattern</li>
      <li><strong>Solved scope:</strong> Process a CSV file, accumulate statistics (line count, sum, max) — all variables must be accessible after the loop. Use process substitution correctly.</li>
    </ol>
  </div>
</div>

<div class="exercise-panel hard">
  <div class="ex-badge hard-badge">Hard</div>
  <div class="ex-body">
    <h4>Exercise 5 — Production Pipeline with Full I/O</h4>
    <p>Write <code>etl_pipeline.sh</code> — a complete ETL script with professional I/O:</p>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li><strong>Logging:</strong> Use <code>exec &gt; &gt;(tee -a "$LOG_FILE") 2&gt;&amp;1</code> so all output goes to both terminal and log</li>
      <li><strong>Structured output:</strong> Implement <code>log_info</code>, <code>log_warn</code>, <code>log_error</code> with timestamps; errors go to stderr</li>
      <li><strong>Config via heredoc:</strong> Generate a config file with variables expanded; a separate quoted heredoc creates a Python helper script</li>
      <li><strong>CSV pipeline:</strong> Chain at least 5 commands with pipes — decompress, skip header, validate fields, transform, load; use <code>set -o pipefail</code> and check <code>PIPESTATUS</code></li>
      <li><strong>Parallel processing:</strong> Use <code>xargs -P 4</code> to process multiple input files simultaneously</li>
      <li><strong>Atomic write:</strong> Write output to a temp file, then <code>mv</code> to final location</li>
      <li><strong>Named pipe:</strong> Use a FIFO for a producer-consumer pattern between two parts of your script</li>
      <li><strong>Summary:</strong> At the end, print a formatted table using <code>printf</code> showing files processed, rows loaded, errors found, elapsed time</li>
      <li><strong>Cleanup:</strong> Use <code>trap EXIT</code> to close fds, remove temp files, and send a completion notification</li>
    </ol>
    <p><strong>Constraint:</strong> The script must work correctly both interactively AND from cron (no terminal assumed).</p>
  </div>
</div>

<!-- Wrap-up story -->
<div class="story-panel" style="margin-top:32px;">
  <div class="story-avatar">🧑‍💻</div>
  <div class="story-body">
    <div class="story-title">Ravi's Cron Job — Day 120</div>
    <p>Ravi's cron job had been running perfectly for two weeks. Every night at 2 AM his pipeline ran silently, saved its logs with timestamps, and split its output into three files — full log, errors-only, and a summary. When something did fail, the error was captured exactly, with the line number and the command that failed.</p>
    <p>He had added those four characters — <code>&gt;&gt; /var/log/pipeline.log 2&gt;&amp;1</code> — and then built on that foundation: process substitution to avoid temp files, <code>tee</code> to see and save at once, named pipes to handle parallel workers, <code>xargs -P 4</code> to process files in parallel.</p>
    <p>"I/O is just plumbing," Priya had said. "Once you know where the pipes go, you can connect anything to anything." Ravi looked at his pipeline — three scripts, two named pipes, six redirections, twelve processes running concurrently — and understood what she meant.</p>
    <p><strong>In Linux, everything is a file. Every file is a stream. Every stream can be redirected. Master that, and you can build anything.</strong></p>
  </div>
</div>

</div><!-- /section-block -->
\`

`
};