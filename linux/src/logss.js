
var log_analysis = {
    title: "Log Analysis & Monitoring",
    description: "Master Linux log analysis at expert depth — parse nginx and syslog formats, build real-time monitoring dashboards with tail and watch, extract metrics with awk and grep, correlate events across multiple log files, manage log rotation with logrotate, query systemd journals with journalctl, and build alerting scripts that detect anomalies and notify on failures.",
    content: `
<style>
/* ── Keyframe animations ── */
@keyframes la-flow  { 0%{stroke-dashoffset:28} 100%{stroke-dashoffset:0} }
@keyframes la-pulse { 0%,100%{opacity:1} 50%{opacity:.15} }
@keyframes la-pop   { 0%{transform:scale(0);opacity:0} 70%{transform:scale(1.12)} 100%{transform:scale(1);opacity:1} }
@keyframes la-blink { 0%,100%{fill:#3fb950;stroke:#3fb950} 50%{fill:#0a1a0a;stroke:#238636} }
@keyframes la-slide { 0%{transform:translateY(20px);opacity:0} 100%{transform:translateY(0);opacity:1} }
@keyframes la-bar   { 0%{height:0;y:200} 100%{height:var(--h);y:var(--y)} }
@keyframes la-scan  { 0%{transform:translateX(0);opacity:.9} 80%{opacity:.9} 100%{transform:translateX(560px);opacity:0} }
@keyframes la-count { 0%{opacity:1} 50%{opacity:.3;fill:#ffa657} 100%{opacity:1} }
@keyframes la-alert { 0%,100%{fill:#2a1a14;stroke:#f85149} 50%{fill:#1a0000;stroke:#ff6b6b} }

.la-flow  { stroke-dasharray:7 5; animation: la-flow  .9s linear infinite; }
.la-pulse { animation: la-pulse 1.8s ease-in-out infinite; }
.la-blink { animation: la-blink 2.4s ease-in-out infinite; }
.la-pop   { animation: la-pop   .5s cubic-bezier(.34,1.56,.64,1) both; }
.la-alert { animation: la-alert 1.2s ease-in-out infinite; }
.la-count { animation: la-count 1s ease-in-out infinite; }
</style>

<!-- ══════════════════════════════════════════════════════
     RAVI'S STORY — HOOK
══════════════════════════════════════════════════════ -->
<div class="story-panel">
  <div class="story-avatar">🧑‍💻</div>
  <div class="story-body">
    <div class="story-title">Ravi's 3 AM Alert — Day 500</div>
    <br>
    <p>The PagerDuty alert came at 3:14 AM: "Error rate elevated — p99 latency 8.4s." Ravi opened his laptop, connected to the server, and for the first time in his career, he wasn't guessing. He knew exactly what to look at.</p>
    <br>
    <p>First: <code>journalctl -u app --since "10 minutes ago" | grep -E "ERROR|WARN" | tail -20</code>. He saw it immediately — "Connection pool exhausted." But where from?</p>
    <br>
    <p>Second: <code>grep "$(date +%H:%M)" /var/log/nginx/access.log | awk '{print $7}' | sort | uniq -c | sort -rn | head -10</code>. One endpoint dominated: <code>/api/reports/generate</code> — 847 calls in the last minute, up from the usual 12.</p>
    <br>
    <p>Third: <code>awk '$9 >= 500' /var/log/nginx/access.log | awk '{print $1}' | sort | uniq -c | sort -rn | head -5</code>. Three IP addresses, all from the same /24 range, responsible for 96% of the 500 errors.</p>
    <br>
    <p>Total diagnosis time: four minutes. Cause: a new customer's integration was running report generation in a tight loop. Fix: rate limit that endpoint. Root cause: clear from three log queries.</p>
    <br>
    <p>Priya had once said: "Logs are the audit trail of everything your system ever did. Learn to read them fast and you'll diagnose anything." Ravi had learned. Now he taught.</p>
  </div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 1 — LOG ANATOMY (ANIMATED)
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Log Anatomy — Parsing Every Field</h2>

<p>Every log entry follows a structured format. Understanding which field means what is the foundation of all log analysis. Here are the three most common formats you'll encounter in production.</p>

<div class="diagram-wrap">
<svg viewBox="0 0 820 340" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 20px;">
  <defs>
    <marker id="la-grn" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#3fb950"/></marker>
    <marker id="la-blu" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#58a6ff"/></marker>
    <marker id="la-orn" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#ffa657"/></marker>
    <marker id="la-pur" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#bc8cff"/></marker>
    <marker id="la-red" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#f85149"/></marker>
    <marker id="la-arr" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#8b949e"/></marker>
  </defs>
  <rect width="820" height="340" fill="#0d1117" rx="12"/>
  <text x="410" y="24" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="13" font-weight="bold" fill="#8b949e">Log Format Anatomy — Three Common Formats Decoded</text>

  <!-- FORMAT 1: nginx Combined Log -->
  <rect x="14" y="36" width="792" height="92" rx="8" fill="#161b22" stroke="#3fb950" stroke-width="1.5"/>
  <text x="26" y="54" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#3fb950">nginx Combined Log Format:</text>
  <!-- Log line broken into colored segments -->
  <text x="26" y="74" font-family="'Courier New',monospace" font-size="10.5">
    <tspan fill="#f85149">192.168.1.42</tspan>
    <tspan fill="#8b949e"> - </tspan>
    <tspan fill="#8b949e">ravi</tspan>
    <tspan fill="#8b949e"> [</tspan>
    <tspan fill="#58a6ff">15/Jan/2024:10:32:01</tspan>
    <tspan fill="#8b949e">] "</tspan>
    <tspan fill="#3fb950">GET</tspan>
    <tspan fill="#e6edf3"> /api/data?date=2024-01-15 </tspan>
    <tspan fill="#e6edf3">HTTP/2.0</tspan>
    <tspan fill="#8b949e">" </tspan>
    <tspan fill="#ffa657">200</tspan>
    <tspan fill="#8b949e"> </tspan>
    <tspan fill="#bc8cff">54321</tspan>
    <tspan fill="#8b949e"> "https://app.example.com" "Mozilla/5.0..."</tspan>
  </text>
  <!-- Field labels -->
  <text x="26"  y="94" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#f85149">$1=IP</text>
  <text x="120" y="94" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#8b949e">$2=ident</text>
  <text x="188" y="94" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#8b949e">$3=auth</text>
  <text x="246" y="94" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#58a6ff">$4=timestamp</text>
  <text x="390" y="94" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#3fb950">method</text>
  <text x="450" y="94" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#e6edf3">$7=URL</text>
  <text x="570" y="94" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#8b949e">proto</text>
  <text x="634" y="94" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#ffa657">$9=status</text>
  <text x="700" y="94" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#bc8cff">$10=bytes</text>
  <text x="760" y="94" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#8b949e">referer  user-agent</text>

  <!-- FORMAT 2: Syslog -->
  <rect x="14" y="140" width="792" height="82" rx="8" fill="#161b22" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="26" y="158" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#58a6ff">Syslog / /var/log/syslog Format:</text>
  <text x="26" y="178" font-family="'Courier New',monospace" font-size="10.5">
    <tspan fill="#58a6ff">Jan 15 10:32:01</tspan>
    <tspan fill="#e6edf3"> </tspan>
    <tspan fill="#3fb950">prod-server-01</tspan>
    <tspan fill="#e6edf3"> </tspan>
    <tspan fill="#ffa657">sshd</tspan>
    <tspan fill="#bc8cff">[12345]</tspan>
    <tspan fill="#8b949e">:</tspan>
    <tspan fill="#e6edf3"> Accepted publickey for ravi from 10.0.0.5 port 54321</tspan>
  </text>
  <text x="26"  y="208" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#58a6ff">timestamp (no year!)</text>
  <text x="218" y="208" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#3fb950">hostname</text>
  <text x="340" y="208" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#ffa657">process/service</text>
  <text x="480" y="208" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#bc8cff">PID</text>
  <text x="540" y="208" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#e6edf3">message (structured or free-text)</text>

  <!-- FORMAT 3: Structured App Log -->
  <rect x="14" y="232" width="792" height="96" rx="8" fill="#161b22" stroke="#ffa657" stroke-width="1.5"/>
  <text x="26" y="250" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">Application / Structured Log (common format):</text>
  <text x="26" y="270" font-family="'Courier New',monospace" font-size="10.5">
    <tspan fill="#58a6ff">2024-01-15T10:32:01.123Z</tspan>
    <tspan fill="#e6edf3"> </tspan>
    <tspan fill="#f85149">ERROR</tspan>
    <tspan fill="#e6edf3"> </tspan>
    <tspan fill="#3fb950">app.pipeline</tspan>
    <tspan fill="#8b949e"> - </tspan>
    <tspan fill="#e6edf3">Connection pool exhausted</tspan>
    <tspan fill="#bc8cff"> {user_id=4521, req_id=abc123}</tspan>
  </text>
  <text x="26" y="300" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#58a6ff">ISO-8601 timestamp (with TZ)</text>
  <text x="270" y="300" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#f85149">level</text>
  <text x="348" y="300" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#3fb950">logger/component</text>
  <text x="480" y="300" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#e6edf3">message text</text>
  <text x="640" y="300" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#bc8cff">structured context (key=value)</text>
  <text x="26" y="318" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#ffa657">JSON log variant: {"ts":"2024...","level":"ERROR","msg":"Connection pool...","user_id":4521}</text>
</svg>
<p class="diagram-caption">Nginx log fields map to awk positional variables ($1–$10+). The status code is always <code>$9</code>, bytes is <code>$10</code>, URL is <code>$7</code> in combined log format. Syslog has no year in the timestamp — critical to remember when cross-referencing with application logs.</p>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 1 of 12 — Log file locations, structure, viewing large logs</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ KEY LOG FILE LOCATIONS ════════════════════════════════</span>
<span class="cb-cmt"># System logs:</span>
<span class="cb-cmt">/var/log/syslog        # General system messages (Debian/Ubuntu)</span>
<span class="cb-cmt">/var/log/messages      # General system messages (RHEL/CentOS)</span>
<span class="cb-cmt">/var/log/auth.log      # Authentication (sudo, ssh, su)</span>
<span class="cb-cmt">/var/log/kern.log      # Kernel messages</span>
<span class="cb-cmt">/var/log/dmesg         # Boot-time kernel ring buffer</span>
<span class="cb-cmt">/var/log/boot.log      # Boot process messages</span>
<span class="cb-cmt"># Web server logs:</span>
<span class="cb-cmt">/var/log/nginx/access.log    # nginx access (combined format)</span>
<span class="cb-cmt">/var/log/nginx/error.log     # nginx errors</span>
<span class="cb-cmt">/var/log/apache2/access.log  # Apache access</span>
<span class="cb-cmt"># App logs:</span>
<span class="cb-cmt">/var/log/app/*.log     # Application-specific logs</span>
<span class="cb-cmt">/var/log/postgresql/   # PostgreSQL</span>
<span class="cb-cmt">/var/log/redis/        # Redis</span>

<span class="cb-cmt">## ═══ VIEWING LOG FILES ══════════════════════════════════════</span>
<span class="cb-prompt">$</span> less /var/log/syslog             <span class="cb-cmt"># page through (G=end, g=start, /=search)</span>
<span class="cb-prompt">$</span> less +G /var/log/syslog          <span class="cb-cmt"># open at end</span>
<span class="cb-prompt">$</span> less +F /var/log/syslog          <span class="cb-cmt"># follow mode (like tail -f, F key toggles)</span>
<span class="cb-prompt">$</span> head -20 /var/log/nginx/access.log   <span class="cb-cmt"># first 20 lines</span>
<span class="cb-prompt">$</span> tail -50 /var/log/nginx/access.log   <span class="cb-cmt"># last 50 lines</span>
<span class="cb-prompt">$</span> wc -l /var/log/nginx/access.log      <span class="cb-cmt"># total line count</span>
<span class="cb-out">12543218 /var/log/nginx/access.log</span>

<span class="cb-cmt">## ═══ FINDING LOG FILES ══════════════════════════════════════</span>
<span class="cb-prompt">$</span> find /var/log -name "*.log" -newer /var/log/syslog   <span class="cb-cmt"># recently changed</span>
<span class="cb-prompt">$</span> find /var/log -size +100M                            <span class="cb-cmt"># large logs</span>
<span class="cb-prompt">$</span> du -sh /var/log/* | sort -rh | head -10              <span class="cb-cmt"># largest log dirs</span>
<span class="cb-prompt">$</span> ls -lhS /var/log/nginx/                              <span class="cb-cmt"># sorted by size</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 2 — tail -f: LIVE LOG MONITORING (ANIMATED)
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> <code>tail -f</code> &amp; <code>multitail</code> — Live Log Streaming</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 220" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="220" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">tail -f — inotify-Based Live File Following</text>

  <!-- Log file growing -->
  <rect x="14" y="40" width="260" height="148" rx="8" fill="#161b22" stroke="#30363d" stroke-width="1.5"/>
  <text x="144" y="60" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#8b949e">/var/log/nginx/access.log</text>
  <text x="24"  y="80" font-family="'Courier New',monospace" font-size="9" fill="#30363d">... 12.4M lines above ...</text>
  <text x="24"  y="98" font-family="'Courier New',monospace" font-size="9" fill="#e6edf3">192.168.1.1 - - [10:31:58] "GET /api 200</text>
  <text x="24" y="114" font-family="'Courier New',monospace" font-size="9" fill="#e6edf3">10.0.0.5 - - [10:31:59] "POST /data 201</text>
  <text x="24" y="130" font-family="'Courier New',monospace" font-size="9" fill="#e6edf3">192.168.1.42 - - [10:32:00] "GET / 200</text>
  <!-- New line appearing -->
  <rect x="18" y="138" width="248" height="20" rx="3" fill="#1a2a1a" stroke="#3fb950" stroke-width="1" class="la-pulse"/>
  <text x="24" y="152" font-family="'Courier New',monospace" font-size="9" fill="#3fb950">10.0.0.8 - - [10:32:01] "GET /api 500</text>
  <!-- Arrow showing new write -->
  <text x="144" y="178" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">↑ new line appended by nginx</text>

  <!-- inotify -->
  <rect x="294" y="80" width="140" height="48" rx="7" fill="#2a2a14" stroke="#ffa657" stroke-width="2"/>
  <text x="364" y="100" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#ffa657">inotify</text>
  <text x="364" y="116" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">IN_MODIFY event</text>

  <line x1="274" y1="148" x2="294" y2="104" stroke="#3fb950" stroke-width="2" marker-end="url(#la-grn)" class="la-flow"/>

  <!-- tail -f process -->
  <rect x="454" y="66" width="200" height="76" rx="8" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="554" y="88" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#3fb950">tail -f process</text>
  <text x="554" y="106" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Waits on inotify fd</text>
  <text x="554" y="122" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">On event: read new bytes</text>
  <text x="554" y="136" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">Write to stdout → pipe</text>

  <line x1="434" y1="104" x2="454" y2="104" stroke="#ffa657" stroke-width="2" marker-end="url(#la-orn)" class="la-flow"/>

  <!-- Output terminal -->
  <rect x="676" y="40" width="130" height="148" rx="8" fill="#0e1824" stroke="#58a6ff" stroke-width="2"/>
  <text x="741" y="60" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#58a6ff">Terminal</text>
  <text x="686" y="78" font-family="'Courier New',monospace" font-size="8.5" fill="#3fb950">10.32:01 "GET /api 200</text>
  <text x="686" y="94" font-family="'Courier New',monospace" font-size="8.5" fill="#3fb950">10.32:01 "POST / 201</text>
  <text x="686" y="110" font-family="'Courier New',monospace" font-size="8.5" fill="#f85149">10.32:01 "GET /api 500</text>
  <text x="686" y="126" font-family="'Courier New',monospace" font-size="8.5" fill="#3fb950">10.32:02 "GET / 200</text>
  <rect x="680" y="133" width="118" height="16" rx="2" fill="#1a2a1a" class="la-pulse"/>
  <text x="686" y="145" font-family="'Courier New',monospace" font-size="8.5" fill="#3fb950">10.32:02 "DELETE 204</text>
  <text x="741" y="175" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#58a6ff">live stream</text>

  <line x1="654" y1="104" x2="676" y2="104" stroke="#3fb950" stroke-width="2" marker-end="url(#la-grn)" class="la-flow"/>

  <!-- tail -F note -->
  <rect x="14" y="196" width="792" height="18" rx="4" fill="#1a1a2a" stroke="#bc8cff" stroke-width="1"/>
  <text x="26" y="210" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#bc8cff">tail -F</text>
  <text x="72" y="210" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> (capital F) follows by NAME — survives log rotation (inotify + polling fallback). Use -F for production monitoring.</text>
</svg>
</div>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 2 of 12 — tail -f, -F, multitail, live filtering pipelines</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ tail BASICS ═══════════════════════════════════════════</span>
<span class="cb-prompt">$</span> tail -f  /var/log/nginx/access.log    <span class="cb-cmt"># follow by inode</span>
<span class="cb-prompt">$</span> tail -F  /var/log/nginx/access.log    <span class="cb-cmt"># follow by NAME (survives rotation)</span>
<span class="cb-prompt">$</span> tail -n 100 /var/log/syslog           <span class="cb-cmt"># last 100 lines</span>
<span class="cb-prompt">$</span> tail -n +2 data.csv                   <span class="cb-cmt"># from line 2 to end (skip header)</span>
<span class="cb-prompt">$</span> tail -c 1024 file                     <span class="cb-cmt"># last 1024 bytes</span>

<span class="cb-cmt">## ═══ LIVE FILTERING PIPELINES ═══════════════════════════════</span>
<span class="cb-cmt"># Show only errors in real time:</span>
<span class="cb-prompt">$</span> tail -F /var/log/app/app.log | grep --line-buffered -E "ERROR|FATAL|CRITICAL"

<span class="cb-cmt"># Highlight errors while showing all lines (grep with color):</span>
<span class="cb-prompt">$</span> tail -F /var/log/app/app.log | grep --line-buffered --color=always -E "ERROR|$"

<span class="cb-cmt"># Live error rate counter (update every 10s):</span>
<span class="cb-prompt">$</span> tail -F /var/log/app/app.log | \
    grep --line-buffered "ERROR" | \
    awk 'BEGIN{ORS=""} {n++; if(n%100==0) print "100 errors\n"}'

<span class="cb-cmt"># Live nginx 5xx monitor:</span>
<span class="cb-prompt">$</span> tail -F /var/log/nginx/access.log | \
    awk '$9 >= 500 {print strftime("%H:%M:%S"), $1, $9, $7}'

<span class="cb-cmt">## ═══ MULTIPLE FILES SIMULTANEOUSLY ═════════════════════════</span>
<span class="cb-prompt">$</span> tail -F /var/log/nginx/access.log /var/log/nginx/error.log
<span class="cb-cmt"># Shows filename header before each file's output</span>

<span class="cb-cmt">## ═══ multitail — SPLIT-SCREEN LOG VIEWER ═══════════════════</span>
<span class="cb-prompt">$</span> multitail /var/log/nginx/access.log /var/log/app/app.log
<span class="cb-prompt">$</span> multitail -cT ANSI /var/log/app/app.log   <span class="cb-cmt"># colorize ANSI output</span>
<span class="cb-prompt">$</span> multitail -l "journalctl -f" /var/log/nginx/error.log  <span class="cb-cmt"># mix file + command</span>

<span class="cb-cmt">## ═══ TIMESTAMPING REALTIME OUTPUT ═══════════════════════════</span>
<span class="cb-prompt">$</span> tail -F /var/log/app/app.log | ts '[%Y-%m-%d %H:%M:%S]'
<span class="cb-out">[2024-01-15 10:32:01] ERROR: Connection pool exhausted</span>
<span class="cb-cmt"># ts: moreutils package — adds timestamp to each stdin line</span>

<span class="cb-cmt">## ═══ tail + grep IN SCRIPTS ════════════════════════════════</span>
<span class="cb-out">#!/bin/bash</span>
<span class="cb-out">monitor_errors() {</span>
<span class="cb-out">    tail -F /var/log/app/app.log |</span>
<span class="cb-out">        grep --line-buffered "ERROR" |</span>
<span class="cb-out">        while IFS= read -r line; do</span>
<span class="cb-out">            echo "$(date +%H:%M:%S) ALERT: $line" | tee -a /var/log/monitoring/errors.log</span>
<span class="cb-out">            # Count recent errors:</span>
<span class="cb-out">            COUNT=$(grep "$(date +%H:%M)" /var/log/monitoring/errors.log | wc -l)</span>
<span class="cb-out">            if (( COUNT > 10 )); then</span>
<span class="cb-out">                alert_slack "High error rate: $COUNT errors/minute"</span>
<span class="cb-out">            fi</span>
<span class="cb-out">        done</span>
<span class="cb-out">}</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 3 — GREP LOG ANALYSIS PATTERNS
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> grep Log Analysis — Pattern Cascade</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 230" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="230" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">grep Cascade — Filter → Extract → Count → Rank</text>

  <!-- 4 stages -->
  <rect x="14"  y="36" width="170" height="100" rx="8" fill="#0e1824" stroke="#58a6ff" stroke-width="2"/>
  <text x="99"  y="57" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#58a6ff">① FILTER</text>
  <text x="99"  y="73" text-anchor="middle" font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950">grep ' 500 '</text>
  <text x="99"  y="91" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">12.5M lines → 847 lines</text>
  <text x="99" y="107" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Fast: LC_ALL=C -F</text>
  <text x="99" y="126" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#58a6ff">Output: matching lines</text>

  <line x1="184" y1="86" x2="220" y2="86" stroke="#ffa657" stroke-width="2.5" marker-end="url(#la-orn)" class="la-flow"/>

  <rect x="220" y="36" width="170" height="100" rx="8" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="305" y="57" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#3fb950">② EXTRACT</text>
  <text x="305" y="73" text-anchor="middle" font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950">awk '{print $1}'</text>
  <text x="305" y="91" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">847 lines → 847 IPs</text>
  <text x="305" y="107" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Field extraction</text>
  <text x="305" y="126" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">Output: IP column</text>

  <line x1="390" y1="86" x2="426" y2="86" stroke="#ffa657" stroke-width="2.5" marker-end="url(#la-orn)" class="la-flow"/>

  <rect x="426" y="36" width="170" height="100" rx="8" fill="#2a2a14" stroke="#ffa657" stroke-width="2"/>
  <text x="511" y="57" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">③ COUNT</text>
  <text x="511" y="73" text-anchor="middle" font-family="'Courier New',monospace" font-size="9.5" fill="#ffa657">sort | uniq -c</text>
  <text x="511" y="91" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">847 IPs → 12 unique IPs</text>
  <text x="511" y="107" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">with counts</text>
  <text x="511" y="126" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">Output: count + IP</text>

  <line x1="596" y1="86" x2="632" y2="86" stroke="#ffa657" stroke-width="2.5" marker-end="url(#la-orn)" class="la-flow"/>

  <rect x="632" y="36" width="174" height="100" rx="8" fill="#1f1428" stroke="#bc8cff" stroke-width="2"/>
  <text x="719" y="57" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#bc8cff">④ RANK</text>
  <text x="719" y="73" text-anchor="middle" font-family="'Courier New',monospace" font-size="9.5" fill="#bc8cff">sort -rn | head -5</text>
  <text x="719" y="91" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">12 IPs → top 5 offenders</text>
  <text x="719" y="107" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">sorted by count</text>
  <text x="719" y="126" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#bc8cff">Output: ranked top-N</text>

  <!-- Example output -->
  <rect x="14" y="148" width="792" height="72" rx="6" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="26" y="166" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">Full command:</text>
  <text x="135" y="166" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">grep ' 500 ' access.log | awk '{print $1}' | sort | uniq -c | sort -rn | head -5</text>
  <text x="26" y="185" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">  813  </text><text x="72" y="185" font-family="'Courier New',monospace" font-size="10" fill="#f85149">203.0.113.42</text>
  <text x="180" y="185" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">   21  </text><text x="222" y="185" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">10.0.0.8</text>
  <text x="296" y="185" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">    8  </text><text x="338" y="185" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">192.168.1.15</text>
  <text x="460" y="185" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#f85149">203.0.113.42 responsible for 96% of errors!</text>
  <text x="26" y="208" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Replace $1 with $7 for URLs, $9 for status codes, $10 for bytes — same pattern, different field</text>
</svg>
</div>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 3 of 12 — grep log recipes: error rates, time windows, IPs, status codes</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ ERROR DETECTION ═══════════════════════════════════════</span>
<span class="cb-prompt">$</span> grep -c "ERROR" /var/log/app/app.log         <span class="cb-cmt"># count all errors</span>
<span class="cb-prompt">$</span> grep -i "error\|warn\|fatal" /var/log/app/app.log | tail -20
<span class="cb-prompt">$</span> grep -E "^2024-01-15 10:" /var/log/app/app.log | grep "ERROR" | wc -l
<span class="cb-cmt"># Errors in a specific hour (10:00-10:59)</span>

<span class="cb-cmt">## ═══ TIME WINDOW FILTERING ═══════════════════════════════════</span>
<span class="cb-cmt"># Last 5 minutes (from current HH:MM back 5 minutes):</span>
<span class="cb-prompt">$</span> grep "$(date -d '5 minutes ago' '+%d/%b/%Y:%H:%M')" /var/log/nginx/access.log

<span class="cb-cmt"># Specific time range:</span>
<span class="cb-prompt">$</span> awk '$4 >= "[15/Jan/2024:10:00" && $4 <= "[15/Jan/2024:11:00"' /var/log/nginx/access.log

<span class="cb-cmt"># Today only:</span>
<span class="cb-prompt">$</span> grep "$(date +'%d/%b/%Y')" /var/log/nginx/access.log | wc -l

<span class="cb-cmt">## ═══ NGINX ACCESS LOG RECIPES ══════════════════════════════</span>
<span class="cb-cmt"># All 5xx errors:</span>
<span class="cb-prompt">$</span> grep ' [5][0-9][0-9] ' /var/log/nginx/access.log
<span class="cb-prompt">$</span> awk '$9 >= 500' /var/log/nginx/access.log     <span class="cb-cmt"># more precise</span>

<span class="cb-cmt"># Top requested URLs:</span>
<span class="cb-prompt">$</span> awk '{print $7}' /var/log/nginx/access.log | sort | uniq -c | sort -rn | head -20

<span class="cb-cmt"># Top IPs by request count:</span>
<span class="cb-prompt">$</span> awk '{print $1}' /var/log/nginx/access.log | sort | uniq -c | sort -rn | head -10

<span class="cb-cmt"># Bandwidth by URL:</span>
<span class="cb-prompt">$</span> awk '$10 ~ /^[0-9]+$/ {bytes[$7]+=$10} END{for(u in bytes) print bytes[u], u}' \
    /var/log/nginx/access.log | sort -rn | head -10 | \
    awk '{printf "%-50s %8.1f MB\n", $2, $1/1024/1024}'

<span class="cb-cmt"># Status code distribution:</span>
<span class="cb-prompt">$</span> awk '{print $9}' /var/log/nginx/access.log | sort | uniq -c | sort -rn
<span class="cb-out">  8432142  200</span>
<span class="cb-out">   123456  304</span>
<span class="cb-out">    45678  404</span>
<span class="cb-out">     1234  500</span>

<span class="cb-cmt"># Requests per minute (last hour):</span>
<span class="cb-prompt">$</span> grep "$(date +'%d/%b/%Y')" /var/log/nginx/access.log |
    awk '{print substr($4,2,17)}' |
    cut -d: -f1-3 |
    sort | uniq -c |
    awk '{printf "%s  %6d req/min\n", $2, $1}'
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 4 — AWK LOG AGGREGATION (ANIMATED)
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> awk Log Aggregation — Time-Series, Error Rates, Dashboards</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 240" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="240" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">Error Rate Chart — Requests and Errors Per Hour (Built with awk)</text>

  <!-- Y axis -->
  <line x1="66" y1="36" x2="66" y2="200" stroke="#30363d" stroke-width="1"/>
  <text x="60" y="44"  text-anchor="end" font-family="'Courier New',monospace" font-size="9" fill="#8b949e">1000</text>
  <text x="60" y="80"  text-anchor="end" font-family="'Courier New',monospace" font-size="9" fill="#8b949e">750</text>
  <text x="60" y="116" text-anchor="end" font-family="'Courier New',monospace" font-size="9" fill="#8b949e">500</text>
  <text x="60" y="152" text-anchor="end" font-family="'Courier New',monospace" font-size="9" fill="#8b949e">250</text>
  <text x="60" y="200" text-anchor="end" font-family="'Courier New',monospace" font-size="9" fill="#8b949e">0</text>

  <!-- X axis -->
  <line x1="66" y1="200" x2="790" y2="200" stroke="#30363d" stroke-width="1"/>

  <!-- Hourly bars (requests in blue, errors in red) -->
  <!-- Hour blocks: each 60px wide -->
  <!-- 08:00 -->
  <rect x="74"  y="140" width="26" height="60" rx="2" fill="#1a2a4a" stroke="#58a6ff" stroke-width="1"/>
  <rect x="100" y="188" width="26" height="12" rx="2" fill="#3d0000" stroke="#f85149" stroke-width="1"/>
  <text x="95" y="215" text-anchor="middle" font-family="'Courier New',monospace" font-size="8" fill="#8b949e">08</text>

  <!-- 09:00 -->
  <rect x="136" y="120" width="26" height="80" rx="2" fill="#1a2a4a" stroke="#58a6ff" stroke-width="1"/>
  <rect x="162" y="185" width="26" height="15" rx="2" fill="#3d0000" stroke="#f85149" stroke-width="1"/>
  <text x="157" y="215" text-anchor="middle" font-family="'Courier New',monospace" font-size="8" fill="#8b949e">09</text>

  <!-- 10:00 SPIKE -->
  <rect x="198" y="44"  width="26" height="156" rx="2" fill="#0e3060" stroke="#58a6ff" stroke-width="1.5"/>
  <rect x="224" y="128" width="26" height="72" rx="2" fill="#5a0000" stroke="#f85149" stroke-width="2" class="la-alert"/>
  <text x="219" y="215" text-anchor="middle" font-family="'Courier New',monospace" font-size="8" fill="#ffa657">10⚠</text>

  <!-- 11:00 (recovering) -->
  <rect x="260" y="96"  width="26" height="104" rx="2" fill="#1a2a4a" stroke="#58a6ff" stroke-width="1"/>
  <rect x="286" y="170" width="26" height="30" rx="2" fill="#4a0000" stroke="#f85149" stroke-width="1"/>
  <text x="281" y="215" text-anchor="middle" font-family="'Courier New',monospace" font-size="8" fill="#8b949e">11</text>

  <!-- 12:00 -->
  <rect x="322" y="104" width="26" height="96" rx="2" fill="#1a2a4a" stroke="#58a6ff" stroke-width="1"/>
  <rect x="348" y="192" width="26" height="8" rx="2" fill="#3d0000" stroke="#f85149" stroke-width="1"/>
  <text x="343" y="215" text-anchor="middle" font-family="'Courier New',monospace" font-size="8" fill="#8b949e">12</text>

  <!-- 13:00-17:00 (normal) -->
  <rect x="384" y="116" width="26" height="84" rx="2" fill="#1a2a4a" stroke="#58a6ff" stroke-width="1"/>
  <rect x="410" y="194" width="26" height="6" rx="2" fill="#3d0000" stroke="#f85149" stroke-width="1"/>
  <text x="405" y="215" text-anchor="middle" font-family="'Courier New',monospace" font-size="8" fill="#8b949e">13</text>

  <rect x="446" y="108" width="26" height="92" rx="2" fill="#1a2a4a" stroke="#58a6ff" stroke-width="1"/>
  <rect x="472" y="193" width="26" height="7" rx="2" fill="#3d0000" stroke="#f85149" stroke-width="1"/>
  <text x="467" y="215" text-anchor="middle" font-family="'Courier New',monospace" font-size="8" fill="#8b949e">14</text>

  <rect x="508" y="112" width="26" height="88" rx="2" fill="#1a2a4a" stroke="#58a6ff" stroke-width="1"/>
  <rect x="534" y="194" width="26" height="6" rx="2" fill="#3d0000" stroke="#f85149" stroke-width="1"/>
  <text x="529" y="215" text-anchor="middle" font-family="'Courier New',monospace" font-size="8" fill="#8b949e">15</text>

  <rect x="570" y="120" width="26" height="80" rx="2" fill="#1a2a4a" stroke="#58a6ff" stroke-width="1"/>
  <rect x="596" y="195" width="26" height="5" rx="2" fill="#3d0000" stroke="#f85149" stroke-width="1"/>
  <text x="591" y="215" text-anchor="middle" font-family="'Courier New',monospace" font-size="8" fill="#8b949e">16</text>

  <rect x="632" y="132" width="26" height="68" rx="2" fill="#1a2a4a" stroke="#58a6ff" stroke-width="1"/>
  <rect x="658" y="196" width="26" height="4" rx="2" fill="#3d0000" stroke="#f85149" stroke-width="1"/>
  <text x="653" y="215" text-anchor="middle" font-family="'Courier New',monospace" font-size="8" fill="#8b949e">17</text>

  <!-- Legend -->
  <rect x="694" y="56" width="14" height="14" rx="2" fill="#1a2a4a" stroke="#58a6ff" stroke-width="1"/>
  <text x="714" y="68" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#58a6ff">Requests</text>
  <rect x="694" y="78" width="14" height="14" rx="2" fill="#5a0000" stroke="#f85149" stroke-width="1"/>
  <text x="714" y="90" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#f85149">5xx Errors</text>
  <text x="694" y="116" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">10:00 spike:</text>
  <text x="694" y="132" font-family="'Segoe UI',sans-serif" font-size="9" fill="#f85149">~1000 req</text>
  <text x="694" y="148" font-family="'Segoe UI',sans-serif" font-size="9" fill="#f85149">~320 errors</text>
  <text x="694" y="164" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">(32% error rate)</text>

  <!-- awk code snippet -->
  <rect x="14" y="222" width="792" height="12" rx="3" fill="#1a1a2a" stroke="#bc8cff" stroke-width="1"/>
  <text x="26" y="232" font-family="'Courier New',monospace" font-size="8.5" fill="#bc8cff">awk '{hr=substr($4,2,2); req[hr]++; if($9>=500)err[hr]++} END{for(h in req) printf "%s req=%-6d err=%-4d rate=%.1f%%\n",h,req[h],err[h]+0,(err[h]+0)*100/req[h]}'
</svg>
</div>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 4 of 12 — awk: hourly stats, error rates, response times, top-N reports</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ HOURLY REQUEST & ERROR RATE ════════════════════════════</span>
<span class="cb-prompt">$</span> awk '
{
    hr  = substr($4, 2, 2)          # extract hour from [15/Jan/2024:10:32:01
    req[hr]++
    if ($9 >= 500) err[hr]++
    bytes[hr] += ($10 ~ /^[0-9]+$/) ? $10 : 0
}
END {
    printf "%-5s %8s %8s %8s %10s\n", "Hour","Requests","Errors","ErrRate%","Bytes(MB)"
    for (h = 0; h <= 23; h++) {
        printf "%02d:00  %8d %8d   %6.2f%% %10.1f\n",
            h, req[h]+0, err[h]+0,
            (req[h]+0 ? (err[h]+0)*100/req[h] : 0),
            bytes[h]/1024/1024
    }
}' /var/log/nginx/access.log
<span class="cb-out">Hour  Requests   Errors  ErrRate%  Bytes(MB)</span>
<span class="cb-out">08:00     2340        5     0.21%      124.5</span>
<span class="cb-out">09:00     3120       12     0.38%      187.2</span>
<span class="cb-out">10:00     9847      321     3.26%      543.1</span>
<span class="cb-out">11:00     5430       45     0.83%      312.7</span>

<span class="cb-cmt">## ═══ RESPONSE TIME PERCENTILES ══════════════════════════════</span>
<span class="cb-cmt"># nginx: add $request_time to log format first
# Then: extract and calculate percentiles:</span>
<span class="cb-prompt">$</span> awk '{print $NF}' /var/log/nginx/access.log |
    sort -n |
    awk '
BEGIN{OFS="\t"}
{vals[NR]=$1}
END{
    n=NR
    printf "P50: %.3fs\nP90: %.3fs\nP99: %.3fs\nMax: %.3fs\n",
        vals[int(n*.50)], vals[int(n*.90)],
        vals[int(n*.99)], vals[n]
}'

<span class="cb-cmt">## ═══ SLOW REQUESTS (TOP BY LATENCY) ═════════════════════════</span>
<span class="cb-prompt">$</span> awk '{print $NF, $7}' /var/log/nginx/access.log |
    sort -rn | head -20 |
    awk '{printf "%.3fs  %s\n", $1, $2}'

<span class="cb-cmt">## ═══ REAL-TIME DASHBOARD SCRIPT ════════════════════════════</span>
<span class="cb-out">#!/bin/bash</span>
<span class="cb-out">while true; do</span>
<span class="cb-out">    clear</span>
<span class="cb-out">    echo "=== Live Dashboard: $(date) ==="</span>
<span class="cb-out">    echo ""</span>
<span class="cb-out">    echo "Last 60 seconds:"</span>
<span class="cb-out">    WINDOW=$(date -d '60 seconds ago' '+%d/%b/%Y:%H:%M')</span>
<span class="cb-out">    grep "$WINDOW" /var/log/nginx/access.log 2>/dev/null | awk '</span>
<span class="cb-out">        {req++; if($9>=500)err++; bytes+=$10+0}</span>
<span class="cb-out">        END{</span>
<span class="cb-out">            printf "  Requests: %d  Errors: %d (%.1f%%)  Bandwidth: %.1f MB\n",</span>
<span class="cb-out">                req+0, err+0, (req ? err*100/req : 0), bytes/1024/1024</span>
<span class="cb-out">        }' || echo "  (no data)"</span>
<span class="cb-out">    echo ""</span>
<span class="cb-out">    echo "Top 5 URLs (1 min):"</span>
<span class="cb-out">    grep "$WINDOW" /var/log/nginx/access.log 2>/dev/null |</span>
<span class="cb-out">        awk '{print $7}' | sort | uniq -c | sort -rn | head -5 |</span>
<span class="cb-out">        awk '{printf "  %6d  %s\n", $1, $2}'</span>
<span class="cb-out">    sleep 10</span>
<span class="cb-out">done</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 5 — journalctl: SYSTEMD JOURNAL
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> <code>journalctl</code> — Querying the systemd Journal</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 230" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="230" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">journalctl Filter Hierarchy — From Broad to Specific</text>

  <!-- All logs at top -->
  <rect x="310" y="36" width="200" height="36" rx="7" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="410" y="58" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#3fb950">journalctl</text>

  <!-- Three branches -->
  <line x1="410" y1="72" x2="134" y2="106" stroke="#3fb950" stroke-width="1.5" class="la-flow"/>
  <line x1="410" y1="72" x2="410" y2="106" stroke="#3fb950" stroke-width="1.5" class="la-flow"/>
  <line x1="410" y1="72" x2="686" y2="106" stroke="#3fb950" stroke-width="1.5" class="la-flow"/>

  <!-- By service -->
  <rect x="14"  y="106" width="240" height="36" rx="7" fill="#0e1824" stroke="#58a6ff" stroke-width="1.8"/>
  <text x="134" y="128" text-anchor="middle" font-family="'Courier New',monospace" font-size="10.5" fill="#58a6ff">-u nginx.service</text>

  <!-- By time -->
  <rect x="270" y="106" width="280" height="36" rx="7" fill="#2a2a14" stroke="#ffa657" stroke-width="1.8"/>
  <text x="410" y="128" text-anchor="middle" font-family="'Courier New',monospace" font-size="10.5" fill="#ffa657">--since "1 hour ago"</text>

  <!-- By priority -->
  <rect x="576" y="106" width="230" height="36" rx="7" fill="#2a1a14" stroke="#f85149" stroke-width="1.8"/>
  <text x="691" y="128" text-anchor="middle" font-family="'Courier New',monospace" font-size="10.5" fill="#f85149">-p err  (priority ≤ err)</text>

  <!-- Sub-filters -->
  <line x1="134" y1="142" x2="134" y2="162" stroke="#58a6ff" stroke-width="1.5"/>
  <rect x="14"  y="162" width="240" height="34" rx="6" fill="#0e1824" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="134" y="183" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#58a6ff">-u nginx -f  (follow live)</text>

  <line x1="410" y1="142" x2="410" y2="162" stroke="#ffa657" stroke-width="1.5"/>
  <rect x="270" y="162" width="280" height="34" rx="6" fill="#2a2a14" stroke="#ffa657" stroke-width="1.5"/>
  <text x="410" y="183" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">--since "today" --until "now"</text>

  <line x1="691" y1="142" x2="691" y2="162" stroke="#f85149" stroke-width="1.5"/>
  <rect x="566" y="162" width="240" height="34" rx="6" fill="#2a1a14" stroke="#f85149" stroke-width="1.5"/>
  <text x="686" y="183" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#f85149">-p 0..3  (emerg to err)</text>

  <!-- Priority legend -->
  <rect x="14" y="208" width="792" height="16" rx="4" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="26"  y="220" font-family="'Courier New',monospace" font-size="9" fill="#f85149">0=emerg</text>
  <text x="92"  y="220" font-family="'Courier New',monospace" font-size="9" fill="#f85149">1=alert</text>
  <text x="156" y="220" font-family="'Courier New',monospace" font-size="9" fill="#f85149">2=crit</text>
  <text x="214" y="220" font-family="'Courier New',monospace" font-size="9" fill="#f85149">3=err</text>
  <text x="262" y="220" font-family="'Courier New',monospace" font-size="9" fill="#ffa657">4=warning</text>
  <text x="350" y="220" font-family="'Courier New',monospace" font-size="9" fill="#8b949e">5=notice</text>
  <text x="428" y="220" font-family="'Courier New',monospace" font-size="9" fill="#3fb950">6=info</text>
  <text x="484" y="220" font-family="'Courier New',monospace" font-size="9" fill="#58a6ff">7=debug</text>
  <text x="554" y="220" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Default output: info and above (-p 6 = info+notice+warn+err+crit+alert+emerg)</text>
</svg>
</div>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 5 of 12 — journalctl: service logs, time filters, priority, JSON output</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ BASIC JOURNALCTL ═══════════════════════════════════════</span>
<span class="cb-prompt">$</span> journalctl                               <span class="cb-cmt"># all logs (paged)</span>
<span class="cb-prompt">$</span> journalctl -f                             <span class="cb-cmt"># follow (live)</span>
<span class="cb-prompt">$</span> journalctl -n 100                         <span class="cb-cmt"># last 100 lines</span>
<span class="cb-prompt">$</span> journalctl -e                             <span class="cb-cmt"># jump to end</span>
<span class="cb-prompt">$</span> journalctl --no-pager                     <span class="cb-cmt"># no pagination (for scripts)</span>

<span class="cb-cmt">## ═══ FILTER BY SERVICE ═══════════════════════════════════════</span>
<span class="cb-prompt">$</span> journalctl -u nginx.service               <span class="cb-cmt"># specific service</span>
<span class="cb-prompt">$</span> journalctl -u nginx -u postgresql         <span class="cb-cmt"># multiple services</span>
<span class="cb-prompt">$</span> journalctl -u "app-*.service"             <span class="cb-cmt"># wildcard pattern</span>
<span class="cb-prompt">$</span> journalctl -u nginx -f                    <span class="cb-cmt"># follow nginx live</span>
<span class="cb-prompt">$</span> journalctl -u nginx --since "10 min ago" --no-pager | grep -E "error|crit"

<span class="cb-cmt">## ═══ FILTER BY TIME ═════════════════════════════════════════</span>
<span class="cb-prompt">$</span> journalctl --since "today"
<span class="cb-prompt">$</span> journalctl --since "2024-01-15 10:00" --until "2024-01-15 11:00"
<span class="cb-prompt">$</span> journalctl --since "1 hour ago"
<span class="cb-prompt">$</span> journalctl --since "yesterday" --until "today"
<span class="cb-prompt">$</span> journalctl --since "2024-01-15" --until "2024-01-16"
<span class="cb-cmt"># Time formats: "YYYY-MM-DD HH:MM:SS", "today", "yesterday",
#               "1 hour ago", "10 min ago", "@UNIXTIME"</span>

<span class="cb-cmt">## ═══ FILTER BY PRIORITY ════════════════════════════════════</span>
<span class="cb-prompt">$</span> journalctl -p err                        <span class="cb-cmt"># error and above (0-3)</span>
<span class="cb-prompt">$</span> journalctl -p warning                    <span class="cb-cmt"># warning and above (0-4)</span>
<span class="cb-prompt">$</span> journalctl -p 0..3                       <span class="cb-cmt"># emerg to err range</span>
<span class="cb-prompt">$</span> journalctl -p err -u app.service --since "today"   <span class="cb-cmt"># combined</span>

<span class="cb-cmt">## ═══ STRUCTURED OUTPUT ═════════════════════════════════════</span>
<span class="cb-prompt">$</span> journalctl -o json -n 10                  <span class="cb-cmt"># JSON output (one object per line)</span>
<span class="cb-prompt">$</span> journalctl -o json-pretty -n 1            <span class="cb-cmt"># pretty JSON</span>
<span class="cb-prompt">$</span> journalctl -o cat -u nginx                <span class="cb-cmt"># message only (no metadata)</span>
<span class="cb-prompt">$</span> journalctl -o short-iso                   <span class="cb-cmt"># ISO 8601 timestamps</span>

<span class="cb-cmt"># Parse JSON output with jq or awk:</span>
<span class="cb-prompt">$</span> journalctl -u app.service --since "1 hour ago" -o json --no-pager |
    jq -r 'select(.PRIORITY | tonumber <= 4) | [.__REALTIME_TIMESTAMP, .MESSAGE] | @tsv'

<span class="cb-cmt">## ═══ DISK USAGE & MAINTENANCE ══════════════════════════════</span>
<span class="cb-prompt">$</span> journalctl --disk-usage                   <span class="cb-cmt"># journal size</span>
<span class="cb-out">Archived and active journals take up 2.1G in the file system.</span>
<span class="cb-prompt">$</span> journalctl --vacuum-size=500M             <span class="cb-cmt"># trim to 500MB</span>
<span class="cb-prompt">$</span> journalctl --vacuum-time=2weeks           <span class="cb-cmt"># remove older than 2 weeks</span>
<span class="cb-prompt">$</span> journalctl --list-boots                   <span class="cb-cmt"># list all boots</span>
<span class="cb-prompt">$</span> journalctl -b -1                          <span class="cb-cmt"># logs from previous boot</span>
<span class="cb-prompt">$</span> journalctl -k                             <span class="cb-cmt"># kernel messages only</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 6 — SYSLOG SEVERITY (VISUAL)
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Syslog Severity Levels &amp; Log Rotation</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 220" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="220" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">Syslog Priority Levels 0–7 — Alert Thresholds</text>

  <!-- Level 0 EMERG -->
  <rect x="14"  y="36" width="92" height="56" rx="6" fill="#3d0000" stroke="#f85149" stroke-width="2.5" class="la-alert"/>
  <text x="60"  y="60" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#f85149">0</text>
  <text x="60"  y="76" text-anchor="middle" font-family="'Courier New',monospace" font-size="9.5" fill="#f85149">emerg</text>
  <text x="60"  y="84" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8" fill="#8b949e">System unusable</text>

  <!-- Level 1 ALERT -->
  <rect x="116" y="36" width="92" height="56" rx="6" fill="#3d0000" stroke="#f85149" stroke-width="2"/>
  <text x="162" y="60" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#f85149">1</text>
  <text x="162" y="76" text-anchor="middle" font-family="'Courier New',monospace" font-size="9.5" fill="#f85149">alert</text>
  <text x="162" y="84" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8" fill="#8b949e">Act immediately</text>

  <!-- Level 2 CRIT -->
  <rect x="218" y="36" width="92" height="56" rx="6" fill="#3d1500" stroke="#f85149" stroke-width="1.8"/>
  <text x="264" y="60" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#f85149">2</text>
  <text x="264" y="76" text-anchor="middle" font-family="'Courier New',monospace" font-size="9.5" fill="#f85149">crit</text>
  <text x="264" y="84" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8" fill="#8b949e">Critical conditions</text>

  <!-- Level 3 ERR -->
  <rect x="320" y="36" width="92" height="56" rx="6" fill="#2a1a14" stroke="#ffa657" stroke-width="1.8"/>
  <text x="366" y="60" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#ffa657">3</text>
  <text x="366" y="76" text-anchor="middle" font-family="'Courier New',monospace" font-size="9.5" fill="#ffa657">err</text>
  <text x="366" y="84" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8" fill="#8b949e">Error conditions</text>

  <!-- Level 4 WARNING -->
  <rect x="422" y="36" width="92" height="56" rx="6" fill="#2a2414" stroke="#ffa657" stroke-width="1.5"/>
  <text x="468" y="60" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#ffa657">4</text>
  <text x="468" y="76" text-anchor="middle" font-family="'Courier New',monospace" font-size="9.5" fill="#ffa657">warning</text>
  <text x="468" y="84" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8" fill="#8b949e">Warning conditions</text>

  <!-- Level 5 NOTICE -->
  <rect x="524" y="36" width="92" height="56" rx="6" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.5"/>
  <text x="570" y="60" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#3fb950">5</text>
  <text x="570" y="76" text-anchor="middle" font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950">notice</text>
  <text x="570" y="84" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8" fill="#8b949e">Normal but notable</text>

  <!-- Level 6 INFO -->
  <rect x="626" y="36" width="92" height="56" rx="6" fill="#0e1824" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="672" y="60" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#58a6ff">6</text>
  <text x="672" y="76" text-anchor="middle" font-family="'Courier New',monospace" font-size="9.5" fill="#58a6ff">info</text>
  <text x="672" y="84" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8" fill="#8b949e">Informational</text>

  <!-- Level 7 DEBUG -->
  <rect x="718" y="36" width="88" height="56" rx="6" fill="#161b22" stroke="#30363d" stroke-width="1.5"/>
  <text x="762" y="60" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#30363d">7</text>
  <text x="762" y="76" text-anchor="middle" font-family="'Courier New',monospace" font-size="9.5" fill="#30363d">debug</text>
  <text x="762" y="84" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8" fill="#30363d">Debug messages</text>

  <!-- Alert threshold line -->
  <line x1="14" y1="102" x2="412" y2="102" stroke="#f85149" stroke-width="1.5" stroke-dasharray="6,3"/>
  <text x="208" y="116" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#f85149">↑ PagerDuty / wake-up alert threshold</text>

  <!-- Monitor threshold line -->
  <line x1="14" y1="118" x2="514" y2="118" stroke="#ffa657" stroke-width="1.5" stroke-dasharray="6,3"/>
  <text x="264" y="132" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#ffa657">↑ Ticket / Slack alert threshold</text>

  <!-- Log format examples -->
  <rect x="14" y="144" width="792" height="68" rx="6" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="26" y="163" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">How levels appear in logs:</text>
  <text x="26"  y="181" font-family="'Courier New',monospace" font-size="9.5" fill="#f85149">Jan 15 10:32:01 server kernel: [12345.678] EXT4-fs error (device sda3): ext4_validate_block_bitmap</text>
  <text x="26"  y="197" font-family="'Courier New',monospace" font-size="9.5" fill="#ffa657">Jan 15 10:32:01 server sshd[1234]: Invalid user admin from 203.0.113.42 port 54321</text>
  <text x="26"  y="208" font-family="'Courier New',monospace" font-size="9.5" fill="#58a6ff">Jan 15 10:32:01 server systemd[1]: Started nginx.service - A high performance web server.</text>
</svg>
</div>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 6 of 12 — logrotate, /var/log management, dmesg, kern logs</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ LOGROTATE CONFIGURATION ══════════════════════════════</span>
<span class="cb-cmt"># /etc/logrotate.d/nginx:</span>
<span class="cb-out">/var/log/nginx/*.log {</span>
<span class="cb-out">    daily             # rotate every day</span>
<span class="cb-out">    missingok         # don't error if log missing</span>
<span class="cb-out">    rotate 14         # keep 14 rotated logs</span>
<span class="cb-out">    compress          # gzip rotated logs</span>
<span class="cb-out">    delaycompress     # compress previous rotation (not current)</span>
<span class="cb-out">    notifempty        # skip rotation if file is empty</span>
<span class="cb-out">    create 640 www-data adm  # new file: permissions, owner, group</span>
<span class="cb-out">    sharedscripts     # run postrotate once (not per-file)</span>
<span class="cb-out">    postrotate</span>
<span class="cb-out">        nginx -s reopen   # tell nginx to reopen log files</span>
<span class="cb-out">    endscript</span>
<span class="cb-out">}</span>

<span class="cb-cmt">## ═══ LOGROTATE COMMANDS ════════════════════════════════════</span>
<span class="cb-prompt">$</span> sudo logrotate --debug /etc/logrotate.d/nginx    <span class="cb-cmt"># dry run</span>
<span class="cb-prompt">$</span> sudo logrotate --force /etc/logrotate.d/nginx    <span class="cb-cmt"># force rotate now</span>
<span class="cb-prompt">$</span> sudo logrotate /etc/logrotate.conf               <span class="cb-cmt"># run all</span>
<span class="cb-prompt">$</span> cat /var/lib/logrotate/status                    <span class="cb-cmt"># last rotation times</span>

<span class="cb-cmt">## ═══ READING ROTATED/COMPRESSED LOGS ═══════════════════════</span>
<span class="cb-prompt">$</span> ls /var/log/nginx/
<span class="cb-out">access.log  access.log.1  access.log.2.gz  access.log.3.gz  ...</span>

<span class="cb-prompt">$</span> zcat /var/log/nginx/access.log.2.gz | grep " 500 " | wc -l
<span class="cb-prompt">$</span> zgrep " 500 " /var/log/nginx/access.log*.gz        <span class="cb-cmt"># grep compressed</span>
<span class="cb-prompt">$</span> zless /var/log/nginx/access.log.2.gz              <span class="cb-cmt"># page compressed file</span>

<span class="cb-cmt"># Search ALL rotated logs (current + compressed):</span>
<span class="cb-prompt">$</span> { cat /var/log/nginx/access.log; \
  zcat /var/log/nginx/access.log.*.gz 2>/dev/null; } | \
  grep ' 500 ' | wc -l

<span class="cb-cmt">## ═══ KERNEL AND BOOT LOGS ══════════════════════════════════</span>
<span class="cb-prompt">$</span> dmesg                                <span class="cb-cmt"># kernel ring buffer</span>
<span class="cb-prompt">$</span> dmesg -T                             <span class="cb-cmt"># -T: human-readable timestamps</span>
<span class="cb-prompt">$</span> dmesg -l err,crit                    <span class="cb-cmt"># filter by level</span>
<span class="cb-prompt">$</span> dmesg --follow                       <span class="cb-cmt"># live follow</span>
<span class="cb-prompt">$</span> dmesg | grep -i "oom\|killed\|panic"  <span class="cb-cmt"># find OOM kills and panics</span>
<span class="cb-prompt">$</span> dmesg | grep -i "error\|fail"        <span class="cb-cmt"># hardware errors</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 7 — watch & vmstat: SYSTEM MONITORING
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> <code>watch</code>, <code>vmstat</code>, <code>sar</code> — System Monitoring</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="200" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">Monitoring Tools — Scope and Refresh Rate</text>

  <!-- Tool comparison grid -->
  <rect x="14" y="36" width="792" height="30" rx="4" fill="#1f2027"/>
  <text x="96"  y="56" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">Tool</text>
  <text x="260" y="56" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">Scope</text>
  <text x="440" y="56" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">Key Metrics</text>
  <text x="680" y="56" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">Refresh / History</text>

  <!-- watch -->
  <rect x="14" y="68" width="792" height="22" rx="2" fill="#0e1824"/>
  <text x="96"  y="84" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#58a6ff">watch</text>
  <text x="260" y="84" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">Any command</text>
  <text x="440" y="84" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">Whatever command returns</text>
  <text x="680" y="84" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">-n N seconds, live</text>

  <!-- vmstat -->
  <rect x="14" y="92" width="792" height="22" rx="2" fill="#161b22"/>
  <text x="96"  y="108" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">vmstat</text>
  <text x="260" y="108" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">System-wide</text>
  <text x="440" y="108" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">CPU, mem, swap, I/O, processes</text>
  <text x="680" y="108" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">vmstat 2 10 (2s, 10 samples)</text>

  <!-- sar -->
  <rect x="14" y="116" width="792" height="22" rx="2" fill="#0e1824"/>
  <text x="96"  y="132" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">sar</text>
  <text x="260" y="132" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">Historical system</text>
  <text x="440" y="132" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">CPU, mem, net, disk, avg per hour</text>
  <text x="680" y="132" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">28 days history, sadc daemon</text>

  <!-- atop -->
  <rect x="14" y="140" width="792" height="22" rx="2" fill="#161b22"/>
  <text x="96"  y="156" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#bc8cff">atop</text>
  <text x="260" y="156" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">Per-process + system</text>
  <text x="440" y="156" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">CPU, mem, disk, net per process</text>
  <text x="680" y="156" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">Daily logs, replay capability</text>

  <!-- free -->
  <rect x="14" y="164" width="792" height="22" rx="2" fill="#0e1824"/>
  <text x="96"  y="180" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">free / /proc</text>
  <text x="260" y="180" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">Memory</text>
  <text x="440" y="180" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">RAM/swap used, available, buffers</text>
  <text x="680" y="180" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">Instantaneous snapshot</text>
</svg>
</div>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 7 of 12 — watch, vmstat, sar, free, iostat in monitoring context</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ watch — RUN ANY COMMAND REPEATEDLY ════════════════════</span>
<span class="cb-prompt">$</span> watch -n 2 df -h                        <span class="cb-cmt"># disk usage every 2s</span>
<span class="cb-prompt">$</span> watch -n 1 'ss -tnp | wc -l'           <span class="cb-cmt"># connection count per second</span>
<span class="cb-prompt">$</span> watch -n 5 'tail -1 /var/log/nginx/access.log'  <span class="cb-cmt"># latest log entry</span>
<span class="cb-prompt">$</span> watch -d -n 2 free -h                   <span class="cb-cmt"># -d: highlight changes</span>
<span class="cb-prompt">$</span> watch -n 1 'cat /proc/loadavg'          <span class="cb-cmt"># load average</span>
<span class="cb-cmt"># Ctrl+C to exit. -t: no header. -e: exit on error.</span>

<span class="cb-cmt">## ═══ vmstat — CPU/MEMORY/IO OVERVIEW ════════════════════════</span>
<span class="cb-prompt">$</span> vmstat 2 10                              <span class="cb-cmt"># 10 samples, 2s interval</span>
<span class="cb-out">procs ----memory---- ---swap-- -----io---- -system-- -----cpu-----</span>
<span class="cb-out"> r  b   swpd  free  buff cache   si  so    bi    bo  in   cs us sy id wa</span>
<span class="cb-out"> 2  0      0 1234M  128M  3.2G    0   0     0    48 234 1234  8  2 89  1</span>
<span class="cb-cmt"># r = run queue (waiting for CPU)   b = blocked (IO wait)
# si/so = swap in/out (non-zero: memory pressure!)
# bi/bo = block in/out (disk I/O)
# us/sy/id/wa = user/system/idle/io-wait CPU %</span>

<span class="cb-cmt">## ═══ sar — HISTORICAL STATS ═════════════════════════════════</span>
<span class="cb-prompt">$</span> sar -u 1 5                               <span class="cb-cmt"># CPU every 1s, 5 samples</span>
<span class="cb-prompt">$</span> sar -u -f /var/log/sysstat/sa15          <span class="cb-cmt"># CPU history from file (day 15)</span>
<span class="cb-prompt">$</span> sar -r                                   <span class="cb-cmt"># memory usage history</span>
<span class="cb-prompt">$</span> sar -d                                   <span class="cb-cmt"># disk activity history</span>
<span class="cb-prompt">$</span> sar -n DEV                               <span class="cb-cmt"># network interface stats</span>
<span class="cb-prompt">$</span> sar -q                                   <span class="cb-cmt"># load average history (last 24h)</span>
<span class="cb-out">09:00:01 AM  runq-sz  plist-sz  ldavg-1  ldavg-5  ldavg-15</span>
<span class="cb-out">10:00:01 AM        2       245     0.12     0.08      0.05</span>
<span class="cb-out">11:00:01 AM       12       287     8.42     4.23      2.11   ← spike!</span>

<span class="cb-cmt">## ═══ MEMORY MONITORING ══════════════════════════════════════</span>
<span class="cb-prompt">$</span> free -h                                  <span class="cb-cmt"># human readable</span>
<span class="cb-out">              total    used    free  shared  buff/cache  available</span>
<span class="cb-out">Mem:          15.6G    4.2G    1.8G   128M       9.6G       10.8G</span>
<span class="cb-out">Swap:          2.0G     0B     2.0G</span>
<span class="cb-cmt"># "available" is what programs can actually use (free + reclaimable cache)
# Swap > 0: memory pressure. Check what's using RAM.</span>

<span class="cb-prompt">$</span> watch -n 1 'free -h && echo "---" && ps aux --sort=-%mem | head -5'
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 8 — ALERTING SCRIPTS (ANIMATED THRESHOLD)
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Alerting Scripts — Thresholds, Slack, Email</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="200" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">Alert Threshold Pattern — Collect → Evaluate → Alert → Silence</text>

  <!-- Collect -->
  <rect x="14"  y="40" width="150" height="60" rx="8" fill="#0e1824" stroke="#58a6ff" stroke-width="2"/>
  <text x="89"  y="62" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#58a6ff">Collect</text>
  <text x="89"  y="78" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">grep/awk counts</text>
  <text x="89"  y="94" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">over time window</text>

  <line x1="164" y1="70" x2="200" y2="70" stroke="#ffa657" stroke-width="2" marker-end="url(#la-orn)"/>

  <!-- Evaluate -->
  <rect x="200" y="40" width="160" height="60" rx="8" fill="#2a2a14" stroke="#ffa657" stroke-width="2"/>
  <text x="280" y="62" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">Evaluate</text>
  <text x="280" y="78" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">value > threshold?</text>
  <text x="280" y="94" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#ffa657">(( COUNT > 10 ))</text>

  <!-- NO path -->
  <line x1="360" y1="60" x2="400" y2="46" stroke="#3fb950" stroke-width="1.5" stroke-dasharray="4,2"/>
  <rect x="400" y="36" width="100" height="26" rx="6" fill="#1a2a1a" stroke="#3fb950" stroke-width="1"/>
  <text x="450" y="53" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">✓ Normal → sleep</text>

  <!-- YES path -->
  <line x1="360" y1="80" x2="400" y2="80" stroke="#f85149" stroke-width="2" marker-end="url(#la-red)"/>
  <text x="380" y="72" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8" fill="#f85149">YES</text>

  <!-- Check cooldown -->
  <rect x="400" y="62" width="160" height="60" rx="8" fill="#2a1a14" stroke="#f85149" stroke-width="2"/>
  <text x="480" y="84" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#f85149">Cooldown?</text>
  <text x="480" y="100" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Already alerted</text>
  <text x="480" y="113" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">in last 15 min?</text>

  <!-- Already alerted -->
  <line x1="560" y1="73" x2="600" y2="58" stroke="#30363d" stroke-width="1.5" stroke-dasharray="4,2"/>
  <rect x="600" y="46" width="110" height="26" rx="6" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="655" y="63" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#30363d">Yes → skip (silence)</text>

  <!-- Send alert -->
  <line x1="560" y1="92" x2="600" y2="92" stroke="#f85149" stroke-width="2" marker-end="url(#la-red)"/>
  <rect x="600" y="74" width="206" height="42" rx="8" fill="#3d0000" stroke="#f85149" stroke-width="2" class="la-alert"/>
  <text x="703" y="93" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#f85149">🚨 Send Alert</text>
  <text x="703" y="109" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Slack / email / PagerDuty</text>

  <!-- Note about state file -->
  <rect x="14" y="120" width="792" height="72" rx="6" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="26" y="138" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">State file for cooldown:</text>
  <text x="26" y="156" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">LAST_ALERT_FILE="/tmp/alert_last_sent"</text>
  <text x="26" y="172" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">LAST=$(cat "$LAST_ALERT_FILE" 2>/dev/null || echo 0)</text>
  <text x="26" y="188" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">(( $(date +%s) - LAST < 900 )) && echo "Cooldown active, skipping" && exit 0</text>
</svg>
</div>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 8 of 12 — Alert scripts: Slack webhook, error rate monitor, disk alert</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ SLACK WEBHOOK ALERT ════════════════════════════════════</span>
<span class="cb-out">#!/usr/bin/env bash</span>
<span class="cb-out">SLACK_WEBHOOK="\${SLACK_WEBHOOK_URL}"</span>
<span class="cb-out"></span>
<span class="cb-out">send_slack() {</span>
<span class="cb-out">    local MSG="$1" LEVEL="\${2:-info}"</span>
<span class="cb-out">    local ICON COLOUR</span>
<span class="cb-out">    case "$LEVEL" in</span>
<span class="cb-out">        critical)  ICON=":red_circle:";    COLOUR="#FF0000" ;;</span>
<span class="cb-out">        warning)   ICON=":warning:";       COLOUR="#FFA500" ;;</span>
<span class="cb-out">        *)         ICON=":information_source:"; COLOUR="#36A64F" ;;</span>
<span class="cb-out">    esac</span>
<span class="cb-out">    curl -s -X POST "$SLACK_WEBHOOK" \</span>
<span class="cb-out">        -H "Content-Type: application/json" \</span>
<span class="cb-out">        -d "$(jq -n \</span>
<span class="cb-out">            --arg icon "$ICON" \</span>
<span class="cb-out">            --arg msg "$MSG" \</span>
<span class="cb-out">            --arg colour "$COLOUR" \</span>
<span class="cb-out">            --arg ts "$(date '+%Y-%m-%d %H:%M:%S')" \</span>
<span class="cb-out">            '{attachments:[{color:$colour, text:($icon+" "+$msg), footer:("prod-server • "+$ts)}]}')"</span>
<span class="cb-out">}</span>

<span class="cb-cmt">## ═══ ERROR RATE MONITOR ════════════════════════════════════</span>
<span class="cb-out">#!/usr/bin/env bash</span>
<span class="cb-out">LOGFILE="/var/log/nginx/access.log"</span>
<span class="cb-out">THRESHOLD=50          # errors in last minute</span>
<span class="cb-out">WINDOW=60             # seconds</span>
<span class="cb-out">COOLDOWN_FILE="/tmp/.alert_cooldown"</span>
<span class="cb-out">COOLDOWN=900          # 15 minutes between alerts</span>
<span class="cb-out"></span>
<span class="cb-out">while true; do</span>
<span class="cb-out">    # Count 5xx in last $WINDOW seconds</span>
<span class="cb-out">    WINDOW_START=$(date -d "$WINDOW seconds ago" '+%d/%b/%Y:%H:%M')</span>
<span class="cb-out">    ERRORS=$(awk -v ws="$WINDOW_START" \</span>
<span class="cb-out">        '$4 >= "["ws && $9 >= 500' "$LOGFILE" 2>/dev/null | wc -l)</span>
<span class="cb-out"></span>
<span class="cb-out">    if (( ERRORS >= THRESHOLD )); then</span>
<span class="cb-out">        # Check cooldown</span>
<span class="cb-out">        LAST=$(cat "$COOLDOWN_FILE" 2>/dev/null || echo 0)</span>
<span class="cb-out">        NOW=$(date +%s)</span>
<span class="cb-out">        if (( NOW - LAST > COOLDOWN )); then</span>
<span class="cb-out">            TOP_URLS=$(awk -v ws="$WINDOW_START" \</span>
<span class="cb-out">                '$4 >= "["ws && $9 >= 500 {print $7}' "$LOGFILE" |</span>
<span class="cb-out">                sort | uniq -c | sort -rn | head -3 |</span>
<span class="cb-out">                awk '{printf "%d × %s\n", $1, $2}')</span>
<span class="cb-out">            send_slack "High 5xx rate: \${ERRORS} errors/min\n\${TOP_URLS}" critical</span>
<span class="cb-out">            echo "$NOW" > "$COOLDOWN_FILE"</span>
<span class="cb-out">        fi</span>
<span class="cb-out">    fi</span>
<span class="cb-out">    sleep 30</span>
<span class="cb-out">done</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 9 — MULTI-FILE LOG CORRELATION
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Multi-File Log Correlation — Connecting the Story</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 210" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="210" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">Correlate Logs Across Files — One Event, Multiple Traces</text>

  <!-- Event timeline -->
  <text x="410" y="46" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">Request ID: abc123  |  Time: 10:32:01  |  IP: 203.0.113.42</text>

  <!-- nginx log -->
  <rect x="14"  y="56" width="360" height="40" rx="6" fill="#0e1824" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="24"  y="72" font-family="'Segoe UI',sans-serif" font-size="9.5" font-weight="bold" fill="#58a6ff">nginx/access.log:</text>
  <text x="24"  y="88" font-family="'Courier New',monospace" font-size="9" fill="#e6edf3">203.0.113.42 - - [10:32:01] "POST /api/report" 500 0 - "abc123"</text>

  <!-- App log -->
  <rect x="446" y="56" width="360" height="40" rx="6" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.5"/>
  <text x="456" y="72" font-family="'Segoe UI',sans-serif" font-size="9.5" font-weight="bold" fill="#3fb950">app/app.log:</text>
  <text x="456" y="88" font-family="'Courier New',monospace" font-size="9" fill="#e6edf3">10:32:01.123 ERROR ConnectionPool - Exhausted {req_id=abc123}</text>

  <!-- db log -->
  <rect x="14"  y="106" width="360" height="40" rx="6" fill="#2a2a14" stroke="#ffa657" stroke-width="1.5"/>
  <text x="24"  y="122" font-family="'Segoe UI',sans-serif" font-size="9.5" font-weight="bold" fill="#ffa657">postgresql/postgresql.log:</text>
  <text x="24"  y="138" font-family="'Courier New',monospace" font-size="9" fill="#e6edf3">2024-01-15 10:31:58 FATAL: remaining conn slots reserved for non-replication</text>

  <!-- syslog -->
  <rect x="446" y="106" width="360" height="40" rx="6" fill="#2a1a14" stroke="#f85149" stroke-width="1.5"/>
  <text x="456" y="122" font-family="'Segoe UI',sans-serif" font-size="9.5" font-weight="bold" fill="#f85149">syslog:</text>
  <text x="456" y="138" font-family="'Courier New',monospace" font-size="9" fill="#e6edf3">Jan 15 10:31:55 prod kernel: Out of memory: Kill process 5001 (postgres)</text>

  <!-- Conclusion -->
  <rect x="14" y="158" width="792" height="44" rx="6" fill="#1a1a2a" stroke="#bc8cff" stroke-width="1.5"/>
  <text x="410" y="178" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#bc8cff">Root cause timeline:</text>
  <text x="410" y="196" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">10:31:55 OOM killer → postgres killed → 10:31:58 connection slots exhausted → 10:32:01 API returns 500</text>
</svg>
</div>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 9 of 12 — Multi-file correlation, timeline reconstruction, request tracing</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ CORRELATE BY REQUEST ID ════════════════════════════════</span>
<span class="cb-cmt"># Find all log entries for a specific request ID across all logs:</span>
<span class="cb-prompt">$</span> grep -r "abc123" /var/log/ 2>/dev/null | grep "2024-01-15" | sort -t: -k5

<span class="cb-cmt">## ═══ TIMELINE RECONSTRUCTION ═══════════════════════════════</span>
<span class="cb-cmt"># Build unified timeline from multiple log sources:</span>
<span class="cb-prompt">$</span> {
    awk '$9>=500 {printf "nginx\t%s\t%s %s\n", substr($4,2,20), $9, $7}' \
        /var/log/nginx/access.log;
    grep -E "ERROR|FATAL" /var/log/app/app.log |
        awk '{print "app\t"$1"T"$2"\t"$0}';
    grep "FATAL\|ERROR" /var/log/postgresql/postgresql.log 2>/dev/null |
        awk '{print "db\t"$1"T"$2"\t"substr($0,25)}';
    grep -i "oom\|kill" /var/log/syslog |
        awk '{print "kernel\ttoday T"$3"\t"substr($0,17)}';
} | sort -k2 | head -30

<span class="cb-cmt">## ═══ TRACK AN IP ACROSS ALL LOGS ════════════════════════════</span>
<span class="cb-out">SUSPECT_IP="203.0.113.42"</span>
<span class="cb-out">echo "=== Activity for $SUSPECT_IP ==="</span>
<span class="cb-out">echo "--- nginx access ---"</span>
<span class="cb-out">grep "$SUSPECT_IP" /var/log/nginx/access.log | wc -l</span>
<span class="cb-out">grep "$SUSPECT_IP" /var/log/nginx/access.log | awk '{print $9}' | sort | uniq -c</span>
<span class="cb-out">echo "--- auth log ---"</span>
<span class="cb-out">grep "$SUSPECT_IP" /var/log/auth.log | tail -10</span>
<span class="cb-out">echo "--- fail2ban ---"</span>
<span class="cb-out">fail2ban-client status nginx | grep "$SUSPECT_IP" 2>/dev/null</span>

<span class="cb-cmt">## ═══ FIND TIMESPAN OF AN INCIDENT ═══════════════════════════</span>
<span class="cb-cmt"># When did errors spike and when did they clear?</span>
<span class="cb-prompt">$</span> awk '$9>=500 {print substr($4,2,17)}' /var/log/nginx/access.log |
    cut -d: -f1-3 |
    sort | uniq -c |
    awk '$1 > 10 {print "ERROR SPIKE:", $2, "("$1" errors)"}'
<span class="cb-out">ERROR SPIKE: 15/Jan/2024:10 (321 errors)</span>
<span class="cb-out">ERROR SPIKE: 15/Jan/2024:11 (45 errors)</span>
<span class="cb-cmt"># Incident: 10:00 spike, recovering at 11:00</span>

<span class="cb-cmt">## ═══ AUTH LOG ANALYSIS ══════════════════════════════════════</span>
<span class="cb-cmt"># Failed SSH attempts (brute force detection):</span>
<span class="cb-prompt">$</span> grep "Failed password" /var/log/auth.log |
    awk '{print $(NF-3)}' |
    sort | uniq -c | sort -rn | head -10
<span class="cb-out">  842  203.0.113.42</span>
<span class="cb-out">   23  198.51.100.5</span>
<span class="cb-cmt"># 842 failed attempts from 203.0.113.42 → likely brute force!</span>

<span class="cb-cmt"># Sudo usage today:</span>
<span class="cb-prompt">$</span> grep "$(date +'%b %e')" /var/log/auth.log | grep "sudo:" | \
    awk '{print $5, $11, $13}' | sort -u
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 10 — ANOMALY DETECTION
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Anomaly Detection — Statistical Baselines &amp; Spike Detection</h2>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 10 of 12 — Baseline comparison, spike detection, new error types</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ COMPARE TODAY vs 7-DAY AVERAGE ════════════════════════</span>
<span class="cb-out">#!/usr/bin/env bash</span>
<span class="cb-out">LOGDIR="/var/log/nginx"</span>
<span class="cb-out">TODAY_ERRORS=$(awk '$9>=500' "$LOGDIR/access.log" | wc -l)</span>
<span class="cb-out"></span>
<span class="cb-out"># Collect last 7 days error counts from rotated logs:</span>
<span class="cb-out">DAILY_COUNTS=()</span>
<span class="cb-out">for i in 1 2 3 4 5 6 7; do</span>
<span class="cb-out">    LOG="$LOGDIR/access.log.$i"</span>
<span class="cb-out">    [[ -f "\${LOG}.gz" ]] && LOG="\${LOG}.gz"</span>
<span class="cb-out">    if [[ -f "$LOG" ]]; then</span>
<span class="cb-out">        N=$(zcat "$LOG" 2>/dev/null || cat "$LOG") 2>/dev/null | awk '$9>=500' | wc -l</span>
<span class="cb-out">        DAILY_COUNTS+=("$N")</span>
<span class="cb-out">    fi</span>
<span class="cb-out">done</span>
<span class="cb-out"></span>
<span class="cb-out">AVG=$(printf '%s\n' "\${DAILY_COUNTS[@]}" | awk '{sum+=$1} END{printf "%.0f", sum/NR}')</span>
<span class="cb-out">RATIO=$(awk "BEGIN{printf \"%.1f\", $TODAY_ERRORS / ($AVG > 0 ? $AVG : 1)}")</span>
<span class="cb-out"></span>
<span class="cb-out">echo "Today errors:   $TODAY_ERRORS"</span>
<span class="cb-out">echo "7-day average:  $AVG"</span>
<span class="cb-out">echo "Ratio:          \${RATIO}x"</span>
<span class="cb-out">(( $(echo "$RATIO > 2.0" | bc -l) )) && send_slack "Error spike: \${RATIO}x above baseline" critical</span>

<span class="cb-cmt">## ═══ DETECT NEW ERROR TYPES ═════════════════════════════════</span>
<span class="cb-out">KNOWN_ERRORS="/var/log/monitoring/known_errors.txt"</span>
<span class="cb-out">CURRENT_ERRORS=$(mktemp)</span>
<span class="cb-out">trap "rm -f $CURRENT_ERRORS" EXIT</span>
<span class="cb-out"></span>
<span class="cb-out"># Extract error signatures from last hour:</span>
<span class="cb-out">grep "ERROR" /var/log/app/app.log |</span>
<span class="cb-out">    grep "$(date -d '1 hour ago' '+%H:%M')" |</span>
<span class="cb-out">    sed 's/[0-9]\+/N/g' |               # normalize: replace numbers</span>
<span class="cb-out">    sed 's/[a-f0-9]\{8,\}/HASH/g' |     # normalize: replace hex IDs</span>
<span class="cb-out">    sort -u > "$CURRENT_ERRORS"</span>
<span class="cb-out"></span>
<span class="cb-out"># Find new error types (not seen before):</span>
<span class="cb-out">NEW_ERRORS=$(comm -23 "$CURRENT_ERRORS" <(sort "$KNOWN_ERRORS" 2>/dev/null))</span>
<span class="cb-out">if [[ -n "$NEW_ERRORS" ]]; then</span>
<span class="cb-out">    send_slack "NEW error types detected:\n$NEW_ERRORS" warning</span>
<span class="cb-out">    cat "$CURRENT_ERRORS" >> "$KNOWN_ERRORS"</span>
<span class="cb-out">    sort -u -o "$KNOWN_ERRORS" "$KNOWN_ERRORS"</span>
<span class="cb-out">fi</span>

<span class="cb-cmt">## ═══ RATE OF CHANGE ALERT ════════════════════════════════════</span>
<span class="cb-out">METRIC_FILE="/var/log/monitoring/error_counts.tsv"</span>
<span class="cb-out">NOW=$(date +%s)</span>
<span class="cb-out">CURRENT=$(awk '$9>=500' /var/log/nginx/access.log | \</span>
<span class="cb-out">    awk -v ts="$(date -d '5 minutes ago' '+%d/%b/%Y:%H:%M')" '$4>=ts' | wc -l)</span>
<span class="cb-out">echo "$NOW $CURRENT" >> "$METRIC_FILE"</span>
<span class="cb-out"></span>
<span class="cb-out"># Compare to 5 minutes ago:</span>
<span class="cb-out">PREV=$(tail -2 "$METRIC_FILE" | head -1 | awk '{print $2}')</span>
<span class="cb-out">if (( CURRENT > 0 && PREV > 0 )); then</span>
<span class="cb-out">    CHANGE=$(awk "BEGIN{printf \"%.1f\", ($CURRENT-$PREV)*100/$PREV}")</span>
<span class="cb-out">    echo "Error rate change: $CHANGE% (prev=$PREV, current=$CURRENT)"</span>
<span class="cb-out">    (( $(echo "\${CHANGE#-} > 100" | bc -l) )) && \</span>
<span class="cb-out">        send_slack "Error rate jumped \${CHANGE}% in 5 minutes" critical</span>
<span class="cb-out">fi</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 11 — lnav & goaccess: ADVANCED TOOLS
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Advanced Tools — <code>lnav</code>, <code>goaccess</code>, <code>fail2ban</code></h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 190" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="190" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">Specialised Log Analysis Tools</text>

  <!-- lnav -->
  <rect x="14"  y="36" width="244" height="100" rx="8" fill="#0e1824" stroke="#58a6ff" stroke-width="2"/>
  <text x="136" y="57" text-anchor="middle" font-family="'Courier New',monospace" font-size="13" font-weight="bold" fill="#58a6ff">lnav</text>
  <text x="136" y="73" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">Log File Navigator</text>
  <text x="24"  y="92" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">• Multi-file interleaved view</text>
  <text x="24" y="108" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">• SQL queries on log data</text>
  <text x="24" y="124" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">• Auto-detects 60+ formats</text>
  <text x="24" y="128" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#58a6ff">• Colorizes, timeline view</text>

  <!-- goaccess -->
  <rect x="290" y="36" width="244" height="100" rx="8" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="412" y="57" text-anchor="middle" font-family="'Courier New',monospace" font-size="13" font-weight="bold" fill="#3fb950">goaccess</text>
  <text x="412" y="73" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">Web Log Analyzer</text>
  <text x="300" y="92" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">• Real-time terminal dashboard</text>
  <text x="300" y="108" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">• Exports HTML report</text>
  <text x="300" y="124" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">• GeoIP, top URLs, browsers</text>
  <text x="300" y="128" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#3fb950">• Perfect for nginx/apache</text>

  <!-- fail2ban -->
  <rect x="566" y="36" width="240" height="100" rx="8" fill="#2a1a14" stroke="#f85149" stroke-width="2"/>
  <text x="686" y="57" text-anchor="middle" font-family="'Courier New',monospace" font-size="13" font-weight="bold" fill="#f85149">fail2ban</text>
  <text x="686" y="73" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">Log-Based IP Blocking</text>
  <text x="576" y="92" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">• Monitors auth/nginx logs</text>
  <text x="576" y="108" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">• Bans repeat offenders</text>
  <text x="576" y="124" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">• iptables integration</text>
  <text x="576" y="128" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#f85149">• Auto-unban after timeout</text>

  <rect x="14" y="148" width="792" height="32" rx="5" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="26" y="165" font-family="'Courier New',monospace" font-size="10" fill="#58a6ff">lnav /var/log/nginx/ /var/log/app/</text>
  <text x="320" y="165" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">goaccess /var/log/nginx/access.log -o report.html</text>
  <text x="640" y="165" font-family="'Courier New',monospace" font-size="10" fill="#f85149">fail2ban-client status nginx</text>
</svg>
</div>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 11 of 12 — lnav SQL queries, goaccess reports, fail2ban status</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ lnav USAGE ════════════════════════════════════════════</span>
<span class="cb-prompt">$</span> lnav /var/log/nginx/access.log             <span class="cb-cmt"># open single file</span>
<span class="cb-prompt">$</span> lnav /var/log/nginx/ /var/log/app/          <span class="cb-cmt"># multiple dirs (interleaved)</span>
<span class="cb-prompt">$</span> lnav /var/log/nginx/access.log*            <span class="cb-cmt"># all rotated files</span>

<span class="cb-cmt"># Inside lnav:
# / = search  q = quit  t = timezone  ; = SQL query  : = lnav command
# Tab = switch files  F = follow mode  p = toggle parser</span>

<span class="cb-cmt"># SQL queries in lnav (press ;):</span>
<span class="cb-out">lnav> ; SELECT cs_uri_stem, COUNT(*) AS cnt FROM access_log WHERE sc_status >= 500 GROUP BY cs_uri_stem ORDER BY cnt DESC LIMIT 10;</span>
<span class="cb-out">lnav> ; SELECT strftime('%H', log_time) AS hr, COUNT(*) AS req FROM access_log GROUP BY hr ORDER BY hr;</span>

<span class="cb-cmt">## ═══ goaccess — WEB ANALYTICS ══════════════════════════════</span>
<span class="cb-prompt">$</span> goaccess /var/log/nginx/access.log \
    --log-format=COMBINED \
    -o /var/www/html/report.html \
    --real-time-html
<span class="cb-cmt"># Generates self-contained HTML dashboard with:
# - Unique visitors, requests, bandwidth
# - Top URLs, IPs, countries (GeoIP)
# - Response codes, browsers, OS
# - Time distribution chart</span>

<span class="cb-cmt"># Terminal dashboard (live):</span>
<span class="cb-prompt">$</span> tail -F /var/log/nginx/access.log | \
    goaccess - --log-format=COMBINED
<span class="cb-cmt"># Real-time updating terminal dashboard</span>

<span class="cb-cmt">## ═══ fail2ban — AUTOMATED BLOCKING ═════════════════════════</span>
<span class="cb-prompt">$</span> sudo fail2ban-client status                <span class="cb-cmt"># all jails</span>
<span class="cb-prompt">$</span> sudo fail2ban-client status sshd           <span class="cb-cmt"># SSH jail details</span>
<span class="cb-out">Status for the jail: sshd</span>
<span class="cb-out">|- Filter</span>
<span class="cb-out">|  |- Currently failed:   3</span>
<span class="cb-out">|  |- Total failed:       42</span>
<span class="cb-out">|- Actions</span>
<span class="cb-out">   |- Currently banned:   2</span>
<span class="cb-out">   |- Total banned:       8</span>
<span class="cb-out">   |- Banned IP list:     203.0.113.42 198.51.100.5</span>

<span class="cb-prompt">$</span> sudo fail2ban-client set sshd unbanip 203.0.113.42   <span class="cb-cmt"># manual unban</span>
<span class="cb-prompt">$</span> sudo fail2ban-client set nginx-http-auth banip 10.0.0.5  <span class="cb-cmt"># manual ban</span>
<span class="cb-prompt">$</span> sudo fail2ban-client reload                              <span class="cb-cmt"># reload config</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 12 — COMPLETE MONITORING SCRIPT
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Complete Monitoring System</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="200" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">Monitoring Architecture — Data Sources → Checks → Alerts → Dashboard</text>

  <!-- Data sources -->
  <rect x="14"  y="40" width="130" height="128" rx="8" fill="#0e1824" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="79"  y="60" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#58a6ff">Sources</text>
  <text x="24"  y="80" font-family="'Courier New',monospace" font-size="9.5" fill="#8b949e">nginx logs</text>
  <text x="24"  y="96" font-family="'Courier New',monospace" font-size="9.5" fill="#8b949e">app logs</text>
  <text x="24" y="112" font-family="'Courier New',monospace" font-size="9.5" fill="#8b949e">syslog</text>
  <text x="24" y="128" font-family="'Courier New',monospace" font-size="9.5" fill="#8b949e">journalctl</text>
  <text x="24" y="144" font-family="'Courier New',monospace" font-size="9.5" fill="#8b949e">vmstat/sar</text>
  <text x="24" y="160" font-family="'Courier New',monospace" font-size="9.5" fill="#8b949e">ss/df/free</text>

  <line x1="144" y1="104" x2="178" y2="104" stroke="#ffa657" stroke-width="2" class="la-flow" marker-end="url(#la-orn)"/>

  <!-- Checks -->
  <rect x="178" y="40" width="168" height="128" rx="8" fill="#2a2a14" stroke="#ffa657" stroke-width="1.5"/>
  <text x="262" y="60" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">Checks (cron)</text>
  <text x="188" y="80" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">Error rate > 1%</text>
  <text x="188" y="96" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">Disk > 85%</text>
  <text x="188" y="112" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">Load avg > 8</text>
  <text x="188" y="128" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">RAM avail < 2GB</text>
  <text x="188" y="144" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">Service down</text>
  <text x="188" y="160" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">Cert expires < 14d</text>

  <line x1="346" y1="104" x2="380" y2="104" stroke="#f85149" stroke-width="2" class="la-flow" marker-end="url(#la-red)"/>

  <!-- Alerts -->
  <rect x="380" y="40" width="168" height="128" rx="8" fill="#2a1a14" stroke="#f85149" stroke-width="1.5"/>
  <text x="464" y="60" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#f85149">Alerts</text>
  <text x="390" y="80" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">Slack webhook</text>
  <text x="390" y="96" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">Email (sendmail)</text>
  <text x="390" y="112" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">PagerDuty API</text>
  <text x="390" y="128" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">Cooldown (15min)</text>
  <text x="390" y="144" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">Severity levels</text>
  <text x="390" y="160" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">Escalation logic</text>

  <line x1="548" y1="104" x2="582" y2="104" stroke="#3fb950" stroke-width="2" class="la-flow" marker-end="url(#la-grn)"/>

  <!-- Dashboard -->
  <rect x="582" y="40" width="224" height="128" rx="8" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.5"/>
  <text x="694" y="60" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#3fb950">Dashboard (watch)</text>
  <text x="592" y="80" font-family="'Courier New',monospace" font-size="9.5" fill="#8b949e">req/min + err%</text>
  <text x="592" y="96" font-family="'Courier New',monospace" font-size="9.5" fill="#8b949e">top URLs + IPs</text>
  <text x="592" y="112" font-family="'Courier New',monospace" font-size="9.5" fill="#8b949e">cpu/mem/disk</text>
  <text x="592" y="128" font-family="'Courier New',monospace" font-size="9.5" fill="#8b949e">active conns</text>
  <text x="592" y="144" font-family="'Courier New',monospace" font-size="9.5" fill="#8b949e">recent errors</text>
  <text x="592" y="160" font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950">goaccess HTML</text>
</svg>
</div>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 12 of 12 — Complete monitoring script, cron schedule, dashboard</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ COMPLETE SYSTEM HEALTH MONITOR ════════════════════════</span>
<span class="cb-out">#!/usr/bin/env bash</span>
<span class="cb-out">set -euo pipefail</span>
<span class="cb-out">SLACK_WEBHOOK="\${SLACK_WEBHOOK_URL:-}"</span>
<span class="cb-out">LOGFILE="/var/log/monitoring/health.log"</span>
<span class="cb-out">COOLDOWN_DIR="/tmp/monitoring_cooldowns"</span>
<span class="cb-out">mkdir -p "$COOLDOWN_DIR"</span>
<span class="cb-out"></span>
<span class="cb-out">alert() {</span>
<span class="cb-out">    local KEY="$1" MSG="$2" LEVEL="\${3:-warning}" COOLDOWN="\${4:-900}"</span>
<span class="cb-out">    local TS; TS=$(date '+%Y-%m-%d %H:%M:%S')</span>
<span class="cb-out">    echo "$TS $LEVEL: $MSG" | tee -a "$LOGFILE"</span>
<span class="cb-out">    local COOLDOWN_FILE="$COOLDOWN_DIR/$KEY"</span>
<span class="cb-out">    local LAST NOW; LAST=$(cat "$COOLDOWN_FILE" 2>/dev/null || echo 0); NOW=$(date +%s)</span>
<span class="cb-out">    (( NOW - LAST < COOLDOWN )) && return 0</span>
<span class="cb-out">    echo "$NOW" > "$COOLDOWN_FILE"</span>
<span class="cb-out">    [[ -n "$SLACK_WEBHOOK" ]] && curl -s -X POST "$SLACK_WEBHOOK" \</span>
<span class="cb-out">        -H "Content-Type: application/json" \</span>
<span class="cb-out">        -d "{\"text\":\"[$LEVEL] $MSG\"}"</span>
<span class="cb-out">}</span>
<span class="cb-out"></span>
<span class="cb-out">check_error_rate() {</span>
<span class="cb-out">    local WINDOW_START; WINDOW_START=$(date -d '1 minute ago' '+%d/%b/%Y:%H:%M')</span>
<span class="cb-out">    local REQ ERR PCT</span>
<span class="cb-out">    REQ=$(grep "$WINDOW_START" /var/log/nginx/access.log 2>/dev/null | wc -l)</span>
<span class="cb-out">    ERR=$(grep "$WINDOW_START" /var/log/nginx/access.log 2>/dev/null | awk '$9>=500' | wc -l)</span>
<span class="cb-out">    (( REQ == 0 )) && return</span>
<span class="cb-out">    PCT=$(awk "BEGIN{printf \"%.1f\", $ERR*100/$REQ}")</span>
<span class="cb-out">    echo "Error rate: \${PCT}% (\${ERR}/\${REQ})"</span>
<span class="cb-out">    (( ERR > 50 )) && alert "error_rate" "Error rate \${PCT}%: \${ERR} errors in last minute" critical</span>
<span class="cb-out">}</span>
<span class="cb-out"></span>
<span class="cb-out">check_disk() {</span>
<span class="cb-out">    while IFS= read -r line; do</span>
<span class="cb-out">        local PCT MOUNT</span>
<span class="cb-out">        PCT=$(echo "$line" | awk '{gsub(/%/,""); print $5}')</span>
<span class="cb-out">        MOUNT=$(echo "$line" | awk '{print $6}')</span>
<span class="cb-out">        (( PCT >= 90 )) && alert "disk_\${MOUNT}" "CRITICAL disk: $MOUNT at \${PCT}%" critical</span>
<span class="cb-out">        (( PCT >= 80 && PCT < 90 )) && alert "disk_\${MOUNT}" "Disk warning: $MOUNT at \${PCT}%" warning</span>
<span class="cb-out">    done < <(df -h | grep '^/dev')</span>
<span class="cb-out">}</span>
<span class="cb-out"></span>
<span class="cb-out">check_load() {</span>
<span class="cb-out">    local LOAD1 NCORES</span>
<span class="cb-out">    LOAD1=$(awk '{print $1}' /proc/loadavg)</span>
<span class="cb-out">    NCORES=$(nproc)</span>
<span class="cb-out">    (( $(echo "$LOAD1 > $NCORES * 2" | bc -l) )) && \</span>
<span class="cb-out">        alert "load" "High load: \${LOAD1} (\${NCORES} cores)" critical</span>
<span class="cb-out">}</span>
<span class="cb-out"></span>
<span class="cb-out">check_services() {</span>
<span class="cb-out">    for SVC in nginx postgresql redis app; do</span>
<span class="cb-out">        systemctl is-active --quiet "$SVC" || \</span>
<span class="cb-out">            alert "svc_\${SVC}" "Service DOWN: $SVC" critical 300</span>
<span class="cb-out">    done</span>
<span class="cb-out">}</span>
<span class="cb-out"></span>
<span class="cb-out">check_memory() {</span>
<span class="cb-out">    local AVAIL; AVAIL=$(awk '/MemAvailable/{print int($2/1024)}' /proc/meminfo)</span>
<span class="cb-out">    (( AVAIL < 512 )) && alert "memory" "Low memory: only \${AVAIL}MB available" critical</span>
<span class="cb-out">}</span>
<span class="cb-out"></span>
<span class="cb-out">check_error_rate</span>
<span class="cb-out">check_disk</span>
<span class="cb-out">check_load</span>
<span class="cb-out">check_services</span>
<span class="cb-out">check_memory</span>

<span class="cb-cmt">## ═══ CRON SCHEDULE ══════════════════════════════════════════</span>
<span class="cb-cmt"># Run every minute:</span>
<span class="cb-cmt"># */1 * * * * /opt/monitoring/health_check.sh 2>>/var/log/monitoring/cron_errors.log</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 13 — KERNEL DEEP DIVE
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Kernel Deep Dive — syslog, journald, inotify, Ring Buffer</h2>

<div class="deepdive-box">
<div class="deepdive-title">⚙️ How Linux Logging Works — From Kernel Ring Buffer to Disk</div>
<pre style="margin:0;padding:16px;font-family:monospace;font-size:12px;color:#e6edf3;background:#010409;border-radius:0 0 8px 8px;overflow-x:auto;">
1. KERNEL RING BUFFER — dmesg

   The kernel maintains a circular buffer (ring buffer) of
   log messages from drivers, subsystems, and the kernel itself.
   
   Size: typically 256KB to 512KB (configurable in kernel build)
   When full: oldest messages are overwritten (ring behaviour)
   Access: dmesg reads /dev/kmsg (character device)
   
   Message format: <priority>facility.severity: message
   Priority = (facility × 8) + severity
   e.g., <6>kern.info, <3>kern.err
   
   Persistence: non-persistent (lost on reboot unless collected)
   Collection: rsyslog/journald reads from /dev/kmsg

2. SYSLOG PROTOCOL (RFC 5424)

   Messages flow:
   - Application calls: syslog(3) or write to /dev/log (socket)
   - rsyslog/syslog-ng daemon receives messages
   - Daemon parses, filters, routes to files/network/database
   
   /dev/log: Unix domain socket (datagram type)
   Programs open /dev/log, send formatted syslog message
   Daemon listens on /dev/log, processes messages
   
   rsyslog configuration:
   - /etc/rsyslog.conf: main config
   - /etc/rsyslog.d/: per-service configs
   - Rule: facility.priority destination
   - kern.* /var/log/kern.log
   - *.err;kern.notice @remote-syslog-server:514

3. SYSTEMD-JOURNALD

   journald is a binary logging daemon that:
   - Collects from: /dev/kmsg, /dev/log, socket, stdout/stderr
     of all services (via stdout capture)
   - Stores in: /var/log/journal/ (binary format)
   - Provides: journalctl for structured querying
   
   Storage modes (journald.conf):
   - Storage=auto (default): persistent if /var/log/journal/ exists
   - Storage=persistent: always write to /var/log/journal/
   - Storage=volatile: only in /run/log/journal/ (lost on reboot)
   - Storage=none: disable journald storage
   
   Binary format advantages:
   - Indexed (fast queries by unit, priority, time)
   - Structured fields (unit, PID, UID, all queryable)
   - Tamper evidence (forward-secure sealing optional)
   - Compression of similar messages
   
   Binary format disadvantage:
   - Cannot grep directly (use journalctl -o cat for plain text)

4. INOTIFY — HOW tail -f WORKS

   inotify is a kernel subsystem that watches filesystem events:
   - inotify_init(): create inotify file descriptor
   - inotify_add_watch(fd, path, IN_MODIFY): watch for writes
   - read(fd): block until event occurs
   - Event struct: wd (watch descriptor), mask, cookie, name
   
   tail -f process:
   1. Open target file, seek to near-end
   2. inotify_add_watch(fd, filename, IN_MODIFY)
   3. Loop:
      a. read(inotify_fd) — block until IN_MODIFY
      b. read new bytes from log file
      c. write to stdout
   
   tail -F vs -f:
   - -f: follows by inode number (breaks on rotation)
   - -F: follows by name — polls for new file with same name,
         uses IN_MOVE_SELF and re-opens on rotation
   
   This is why tail -F is better for production monitoring.

5. LOGROTATE MECHANISM

   logrotate is called by cron daily (/etc/cron.daily/logrotate)
   
   Rotation process:
   1. Rename current log: access.log → access.log.1
   2. Create new empty access.log with same permissions
   3. Run postrotate script (e.g., nginx -s reopen)
      → nginx opens new access.log file
   
   Signal method (copytruncate):
   - Copy access.log → access.log.1
   - Truncate access.log to 0 bytes (in place)
   - No postrotate needed (nginx still writing to same inode)
   - Risk: small data loss during copy+truncate window
   
   File descriptor continuation:
   After rename, nginx still holds FD pointing to old inode.
   It continues writing to access.log.1 (by inode, not name).
   Only after SIGHUP/reopen does it open the new access.log.
   This is why postrotate is essential.
</pre>
</div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 14 — COMPLETE REFERENCE
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Complete Reference — Log Analysis Commands</h2>

<div class="table-wrap">
<table class="ref-table">
<thead><tr><th style="width:26%">Command</th><th>Purpose</th><th style="width:26%">Key Options</th></tr></thead>
<tbody>
<tr><td colspan="3" style="background:#1a2a1a;color:#3fb950;font-weight:bold;font-family:'Segoe UI',sans-serif;">Viewing &amp; Following</td></tr>
<tr><td style="font-family:monospace;">tail -F logfile</td><td>Follow log file by name (survives rotation)</td><td><code>-n N</code> lines, <code>-c N</code> bytes, multiple files</td></tr>
<tr><td style="font-family:monospace;">less +F logfile</td><td>Page + follow mode (F key to toggle)</td><td><code>+G</code> start at end, <code>/</code> search, <code>g/G</code> top/bottom</td></tr>
<tr><td style="font-family:monospace;">journalctl -u svc -f</td><td>Follow systemd service log live</td><td><code>--since</code> time, <code>-p err</code> priority, <code>-o json</code></td></tr>
<tr><td style="font-family:monospace;">dmesg -T -w</td><td>Kernel messages with timestamps, follow</td><td><code>-l err,crit</code> filter levels</td></tr>
<tr><td colspan="3" style="background:#0e1824;color:#58a6ff;font-weight:bold;font-family:'Segoe UI',sans-serif;">Filtering &amp; Extraction</td></tr>
<tr><td style="font-family:monospace;">grep -E 'ERROR|WARN'</td><td>Filter matching lines</td><td><code>-c</code> count, <code>-n</code> line#, <code>-A/-B/-C N</code> context</td></tr>
<tr><td style="font-family:monospace;">grep -oE 'pattern'</td><td>Extract matching parts only</td><td>Combine with <code>sort | uniq -c | sort -rn</code></td></tr>
<tr><td style="font-family:monospace;">awk '$9>=500 {print}'</td><td>Filter by field value (nginx 5xx)</td><td>Process multiple fields, arithmetic, aggregation</td></tr>
<tr><td style="font-family:monospace;">zgrep / zcat</td><td>Search/read compressed rotated logs</td><td>Works on .gz files; use with all grep flags</td></tr>
<tr><td colspan="3" style="background:#2a2a14;color:#ffa657;font-weight:bold;font-family:'Segoe UI',sans-serif;">Aggregation &amp; Analysis</td></tr>
<tr><td style="font-family:monospace;">sort | uniq -c | sort -rn</td><td>Count unique values, ranked by frequency</td><td>Classic top-N pattern for any log field</td></tr>
<tr><td style="font-family:monospace;">awk '{hr=$4; req[hr]++}'</td><td>Group by time, count per interval</td><td>Add error counting in same pass</td></tr>
<tr><td style="font-family:monospace;">watch -n N 'cmd'</td><td>Re-run command every N seconds (live)</td><td><code>-d</code> highlight changes, <code>-t</code> no header</td></tr>
<tr><td style="font-family:monospace;">vmstat 2 / sar -u</td><td>System resource monitoring</td><td><code>vmstat</code> live, <code>sar</code> historical records</td></tr>
<tr><td colspan="3" style="background:#2a1a14;color:#f85149;font-weight:bold;font-family:'Segoe UI',sans-serif;">Management &amp; Advanced</td></tr>
<tr><td style="font-family:monospace;">logrotate -d config</td><td>Test rotation config (dry run)</td><td><code>-f</code> force rotate now</td></tr>
<tr><td style="font-family:monospace;">lnav /var/log/dir/</td><td>Interactive multi-file log viewer with SQL</td><td>; for SQL query, / search, F follow</td></tr>
<tr><td style="font-family:monospace;">goaccess log -o html</td><td>Web analytics HTML/terminal dashboard</td><td><code>--real-time-html</code> live streaming</td></tr>
<tr><td style="font-family:monospace;">fail2ban-client status</td><td>Show banned IPs and jail status</td><td><code>set jail unbanip IP</code> to unban</td></tr>
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
    <h4>Exercise 1 — Log Basics</h4>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Use <code>tail -F</code> to follow <code>/var/log/syslog</code> live. Open another terminal and trigger a syslog event (<code>logger "test message"</code>) — verify it appears.</li>
      <li>Count total lines, lines with "error" (case-insensitive), and lines from the last hour in <code>/var/log/syslog</code></li>
      <li>Use <code>grep -o</code> to extract all IP addresses from <code>/var/log/auth.log</code> and count unique ones</li>
      <li>Find the 5 most recent entries for each log level (ERROR/WARN/INFO) in an application log</li>
      <li>Use <code>journalctl -u nginx --since "today"</code> and pipe to <code>grep -c "error"</code></li>
      <li>Read a gzipped rotated log with <code>zcat</code> — count its lines and find errors</li>
      <li>Use <code>dmesg -T</code> to find any hardware errors (grep for "error" or "fail")</li>
    </ol>
  </div>
</div>

<div class="exercise-panel easy">
  <div class="ex-badge easy-badge">Easy</div>
  <div class="ex-body">
    <h4>Exercise 2 — nginx Log Analysis</h4>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Count requests by HTTP status code (200, 301, 404, 500 etc.)</li>
      <li>Find the top 10 most requested URLs</li>
      <li>Find the top 10 IPs by request count</li>
      <li>Calculate total bytes served today</li>
      <li>Find all 5xx errors and which URLs they came from (top 10)</li>
      <li>Count requests per hour for the past 24 hours, format as a table</li>
      <li>Find requests that took more than 5 seconds (if request_time in log format)</li>
    </ol>
  </div>
</div>

<div class="exercise-panel medium">
  <div class="ex-badge medium-badge">Medium</div>
  <div class="ex-body">
    <h4>Exercise 3 — Aggregation and Dashboards</h4>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Build a live dashboard using <code>watch</code> that refreshes every 10 seconds, showing: requests in last 60s, error rate %, top 5 URLs, top 5 IPs, and current system load</li>
      <li>Write an awk script to calculate hourly error rates and flag any hour where error rate exceeds 1%</li>
      <li>Build a script that compares today's error count against the 7-day average and outputs a ratio</li>
      <li>Parse a multi-format log directory (nginx + app + db) and produce a unified timeline sorted by timestamp</li>
      <li>Write a brute-force detector: find any IP with more than 100 failed SSH attempts in <code>/var/log/auth.log</code> in the last hour</li>
      <li>Create a logrotate config for an application log: daily rotation, keep 30 days, compress, send SIGHUP to reload</li>
    </ol>
  </div>
</div>

<div class="exercise-panel medium">
  <div class="ex-badge medium-badge">Medium</div>
  <div class="ex-body">
    <h4>Exercise 4 — Alerting and Monitoring</h4>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Write <code>check_disk.sh</code>: check all mounted filesystems, send Slack alert if any exceeds 85% with cooldown of 30 minutes</li>
      <li>Write <code>check_errors.sh</code>: count 5xx errors in last 60 seconds, alert if &gt; 50, include top 3 error URLs in the message</li>
      <li>Write <code>check_services.sh</code>: verify that nginx, postgresql, redis are all running; alert with which service is down</li>
      <li>Write <code>check_memory.sh</code>: alert when available memory falls below 512MB; include top 5 memory consumers (from <code>ps</code>)</li>
      <li>Combine all four checks into a single <code>health_check.sh</code> that runs via cron every minute with proper logging and exit codes</li>
    </ol>
  </div>
</div>

<div class="exercise-panel hard">
  <div class="ex-badge hard-badge">Hard</div>
  <div class="ex-body">
    <h4>Exercise 5 — Production Monitoring System</h4>
    <p>Build a complete log-based monitoring and alerting system:</p>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li><strong>Metrics collector:</strong> Every minute, collect: req/min, error rate %, p50/p90 response time, top 10 URLs, top 10 IPs, bandwidth. Write to a TSV metrics file.</li>
      <li><strong>Anomaly detector:</strong> Compare current metrics to 7-day rolling averages. Alert if error rate is 3× above average, or request count drops to 10% of average (possible outage).</li>
      <li><strong>New error tracker:</strong> Extract error message patterns (normalised — strip numbers/IDs). Track new patterns never seen before. Alert on first occurrence.</li>
      <li><strong>Cross-file correlator:</strong> When a 5xx spike occurs, automatically pull: relevant nginx lines, app log errors, db log errors, and syslog warnings from the same time window.</li>
      <li><strong>Dashboard:</strong> A <code>watch</code>-based or separate script that shows a live terminal dashboard: current health status, last alert time, metrics sparklines for the past 24 hours.</li>
      <li><strong>Report generator:</strong> Daily at 07:00, generate a text report: yesterday's stats summary, top 10 anomalies, new error types, growth trends, attach to email.</li>
    </ol>
    <p><strong>Must handle: log rotation, compressed archives, missing files, format variations, high log volume (millions of lines/day), run continuously as a daemon, survive restarts.</strong></p>
  </div>
</div>

<div class="story-panel" style="margin-top:32px;">
  <div class="story-avatar">🧑‍💻</div>
  <div class="story-body">
    <div class="story-title">Ravi's Postmortem — Day 520</div>
    <p>The 3AM incident had taken four minutes to diagnose. The postmortem took four hours — not because the root cause was unclear, but because the team wanted to understand every step of the failure, in order.</p>
    <p>Ravi wrote the timeline. He pulled it entirely from logs. The OOM kill at 10:31:55 from dmesg. The connection pool exhaustion at 10:31:58 from postgresql.log. The first API error at 10:32:01 from nginx/access.log. The error message at 10:32:01.123 from app.log with the exact request ID. The new customer's first looping request at 10:31:42 from access.log — twenty seconds before the cascade.</p>
    <p>Nineteen events, seven different log files, two minutes of wall time, reconstructed to millisecond precision. The entire story was there, in the logs. It always had been.</p>
    <p>"The hardest part about incident response," Priya had said once, "is not finding the answer. It's knowing which log to look in and what question to ask." That was what Ravi had learned to do.</p>
    <p><strong>Logs are the audit trail of everything your system ever did. Learn to read them fast and you can diagnose anything — but only if you ask the right question of the right file.</strong></p>
  </div>
</div>

</div><!-- /section-block -->
\`

`
};